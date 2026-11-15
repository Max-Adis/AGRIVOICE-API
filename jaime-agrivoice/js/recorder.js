/**
 * recorder.js
 * Gestion de l'enregistrement audio via l'API MediaRecorder du navigateur.
 * Optimisé pour la collecte Edge Impulse : 16 kHz mono, durée 1-3s.
 * Inclut un visualiseur de barres sonores en temps réel.
 */

export class AgriRecorder {
  constructor({ canvasId = null, onStart, onStop, onError, maxDurationMs = 3000 } = {}) {
    this.canvasId      = canvasId;
    this.onStart       = onStart  || (() => {});
    this.onStop        = onStop   || (() => {});
    this.onError       = onError  || ((e) => console.error(e));
    this.maxDurationMs = maxDurationMs;

    this._mediaRecorder  = null;
    this._audioChunks    = [];
    this._stream         = null;
    this._audioCtx       = null;
    this._analyser       = null;
    this._animFrame      = null;
    this._startTime      = null;
    this._autoStopTimer  = null;
    this.isRecording     = false;
    this.isSupported     = !!(navigator.mediaDevices?.getUserMedia);
  }

  // ── Démarrer l'enregistrement ─────────────────────────────────────────────
  async start() {
    if (this.isRecording) return;
    if (!this.isSupported) {
      this.onError(new Error("MediaRecorder non supporté dans ce navigateur."));
      return;
    }

    try {
      // Demander accès au micro avec contraintes adaptées à TinyML
      this._stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,          // Mono
          sampleRate:   16000,      // 16 kHz
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Préférer WebM/Opus, fallback sur ce que le navigateur propose
      const mimeType = this._getBestMimeType();
      this._mediaRecorder = new MediaRecorder(this._stream, { mimeType });
      this._audioChunks   = [];

      this._mediaRecorder.ondataavailable = (e) => {
        if (e.data?.size > 0) this._audioChunks.push(e.data);
      };

      const recordedMimeType = mimeType || "audio/webm";
      this._mediaRecorder.onstop = () => {
        const blob = new Blob(this._audioChunks, { type: recordedMimeType });
        const durationMs = Date.now() - this._startTime;
        this._cleanup();
        this.onStop(blob, durationMs);
      };

      this._mediaRecorder.start(100); // collect toutes les 100ms
      this._startTime  = Date.now();
      this.isRecording = true;

      // Visualiseur
      if (this.canvasId) this._startVisualizer();

      // Auto-stop après maxDurationMs
      this._autoStopTimer = setTimeout(() => this.stop(), this.maxDurationMs);

      this.onStart();
    } catch (err) {
      this._cleanup();
      this.onError(err);
    }
  }

  // ── Arrêter l'enregistrement ──────────────────────────────────────────────
  stop() {
    if (!this.isRecording) return;
    clearTimeout(this._autoStopTimer);
    if (this._mediaRecorder?.state !== "inactive") {
      this._mediaRecorder.stop();
    }
    this.isRecording = false;
  }

  // ── Cleanup interne ───────────────────────────────────────────────────────
  _cleanup() {
    cancelAnimationFrame(this._animFrame);
    this._audioCtx?.close().catch(() => {});
    this._stream?.getTracks().forEach(t => t.stop());
    this._audioCtx    = null;
    this._analyser    = null;
    this._stream      = null;
    this.isRecording  = false;
  }

  // ── Meilleur format supporté ──────────────────────────────────────────────
  _getBestMimeType() {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
      "audio/mp4",
      "",
    ];
    return candidates.find(t => !t || MediaRecorder.isTypeSupported(t)) || "";
  }

  // ── Visualiseur barres sonores ────────────────────────────────────────────
  _startVisualizer() {
    const canvas = document.getElementById(this.canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this._analyser = this._audioCtx.createAnalyser();
    this._analyser.fftSize = 64;

    const source = this._audioCtx.createMediaStreamSource(this._stream);
    source.connect(this._analyser);

    const bufferLength = this._analyser.frequencyBinCount;
    const dataArray    = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.isRecording) return;
      this._animFrame = requestAnimationFrame(draw);
      this._analyser.getByteFrequencyData(dataArray);

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const barCount  = 20;
      const barWidth  = (W / barCount) * 0.6;
      const barGap    = (W / barCount) * 0.4;
      const stride    = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        const value    = dataArray[i * stride] / 255;
        const barH     = Math.max(4, value * H * 0.85);
        const x        = i * (barWidth + barGap);
        const y        = (H - barH) / 2;

        // Dégradé vert → orange selon amplitude
        const r = Math.round(25  + (211 - 25)  * value);
        const g = Math.round(110 + (119 - 110) * value);
        const b = Math.round(63  + (0   - 63)  * value);
        ctx.fillStyle = `rgb(${r},${g},${b})`;

        const radius = barWidth / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.arcTo(x + barWidth, y, x + barWidth, y + radius, radius);
        ctx.lineTo(x + barWidth, y + barH - radius);
        ctx.arcTo(x + barWidth, y + barH, x + barWidth - radius, y + barH, radius);
        ctx.lineTo(x + radius, y + barH);
        ctx.arcTo(x, y + barH, x, y + barH - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
        ctx.fill();
      }
    };
    draw();
  }
}

// ── Helpers lecture audio ──────────────────────────────────────────────────────

let _previewAudio = null;

/**
 * Joue un Blob audio (prévisualisation avant envoi)
 */
export function playBlob(blob, onEnd = () => {}) {
  stopPreview();
  if (!blob || blob.size === 0) {
    console.warn("playBlob: audio blob vide ou inexistant");
    onEnd();
    return null;
  }
  try {
    const url = URL.createObjectURL(blob);
    _previewAudio = new Audio(url);
    _previewAudio.preload = "auto";
    
    _previewAudio.onended = () => {
      URL.revokeObjectURL(url);
      _previewAudio = null;
      onEnd();
    };
    
    _previewAudio.onerror = (e) => {
      console.error("Erreur de lecture audio :", e);
      URL.revokeObjectURL(url);
      _previewAudio = null;
      onEnd();
    };

    const playPromise = _previewAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("Lecture bloquée ou échouée :", err);
        URL.revokeObjectURL(url);
        _previewAudio = null;
        onEnd();
      });
    }
    return _previewAudio;
  } catch (err) {
    console.error("Impossible d'initialiser Audio :", err);
    onEnd();
    return null;
  }
}

/**
 * Joue une URL distante (audios de référence Supabase)
 */
export function playUrl(url, onEnd = () => {}) {
  stopPreview();
  _previewAudio = new Audio(url);
  _previewAudio.onended = onEnd;
  _previewAudio.onerror = onEnd;
  _previewAudio.play().catch(() => onEnd());
  return _previewAudio;
}

export function stopPreview() {
  if (_previewAudio) {
    _previewAudio.pause();
    _previewAudio.src = "";
    _previewAudio = null;
  }
}

export function isPreviewPlaying() {
  return _previewAudio && !_previewAudio.paused;
}

/**
 * Convertit un Blob WebM en WAV 16kHz mono via OfflineAudioContext.
 * Utile si Edge Impulse requiert strictement du WAV.
 */
export async function convertToWav(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const audioCtx    = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
  const decoded     = await audioCtx.decodeAudioData(arrayBuffer);
  await audioCtx.close();

  const samples    = decoded.getChannelData(0); // Mono
  const bufferWav  = encodeWAV(samples, 16000);
  return new Blob([bufferWav], { type: "audio/wav" });
}

function encodeWAV(samples, sampleRate) {
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign     = bytesPerSample;
  const byteRate       = sampleRate * blockAlign;
  const dataLength     = samples.length * bytesPerSample;
  const buffer         = new ArrayBuffer(44 + dataLength);
  const view           = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0,  "RIFF");
  view.setUint32(4,  36 + dataLength, true);
  writeString(8,  "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1,  true);  // PCM
  view.setUint16(22, 1,  true);  // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate,   true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, "data");
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}
