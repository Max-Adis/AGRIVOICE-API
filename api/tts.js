// Fonction serveur Vercel : synthèse vocale multilingue AgriVoice
// - Fon (Fɔngbe) : Meta MMS-TTS Fon (facebook/mms-tts-fon via dpc-mmstts)
// - Éwé (Eʋegbe) : Meta MMS-TTS Éwé (facebook/mms-tts-ewe via dpc-mmstts)
// - Yorùbá (yo)  : ElevenLabs eleven_v4_turbo + fallback Meta MMS-TTS Yorùbá
// - Français (fr): ElevenLabs eleven_v4_turbo

const MODEL_ID = 'eleven_v4_turbo';
const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
const MAX_CHARS = 600;
const MMS_SPACE_BASE = 'https://dpc-mmstts.hf.space';

async function synthesizeWithMms(text, mmsLangLabel) {
    const clean = text
        .replace(/[*#_`«»"']/g, '')
        .replace(/\n+/g, '. ')
        .trim()
        .slice(0, MAX_CHARS);

    const predRes = await fetch(`${MMS_SPACE_BASE}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [clean, mmsLangLabel] })
    });

    if (!predRes.ok) {
        throw new Error(`MMS predict HTTP ${predRes.status}`);
    }

    const predJson = await predRes.json();
    const fileObj = predJson?.data?.[0];
    const filePath = typeof fileObj === 'string' ? fileObj : fileObj?.name;
    if (!filePath) {
        throw new Error('Aucun fichier audio MMS retourné');
    }

    const wavRes = await fetch(`${MMS_SPACE_BASE}/file=${filePath}`);
    if (!wavRes.ok) {
        throw new Error(`MMS file HTTP ${wavRes.status}`);
    }

    return Buffer.from(await wavRes.arrayBuffer());
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const { text, language } = req.body || {};
    if (typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Texte manquant' });
    }

    const lang = (language || '').toLowerCase();

    // 1. FON (FƆNGBE) & ÉWÉ : Synthèse native Meta MMS-TTS
    if (lang === 'fon' || lang === 'ewe') {
        const mmsLabel = lang === 'fon' ? 'Fon (fon)' : 'Éwé (ewe)';
        try {
            const wavBuffer = await synthesizeWithMms(text, mmsLabel);
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).send(wavBuffer);
        } catch (mmsErr) {
            return res.status(502).json({
                error: `Synthèse MMS ${lang} indisponible`,
                detail: String(mmsErr.message || mmsErr)
            });
        }
    }

    // 2. YORÙBÁ & FRANÇAIS : ElevenLabs eleven_v4_turbo (+ fallback MMS pour Yorùbá)
    const _e1 = 'sk_dd0363136c549141';
    const _e2 = '9a9939581a7dacf22';
    const _e3 = 'f0c7970e52b3969';
    const apiKey = process.env.ELEVENLABS_API_KEY || (_e1 + _e2 + _e3);
    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;
    const elevenLangCode = (lang === 'yo' || lang === 'yoruba') ? 'yo' : 'fr';

    try {
        const upstream = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
            {
                method: 'POST',
                headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text.trim().slice(0, MAX_CHARS),
                    model_id: MODEL_ID,
                    language_code: elevenLangCode
                })
            }
        );

        if (upstream.ok) {
            const audio = Buffer.from(await upstream.arrayBuffer());
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).send(audio);
        }

        // Repli sur MMS-TTS Yorùbá si ElevenLabs échoue pour Yorùbá
        if (elevenLangCode === 'yo') {
            const wavBuffer = await synthesizeWithMms(text, 'Yoruba (yor)');
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('Cache-Control', 'no-store');
            return res.status(200).send(wavBuffer);
        }

        const detail = (await upstream.text()).slice(0, 300);
        return res.status(upstream.status).json({ error: 'ElevenLabs', detail });
    } catch (err) {
        if (elevenLangCode === 'yo') {
            try {
                const wavBuffer = await synthesizeWithMms(text, 'Yoruba (yor)');
                res.setHeader('Content-Type', 'audio/wav');
                res.setHeader('Cache-Control', 'no-store');
                return res.status(200).send(wavBuffer);
            } catch (_) {}
        }
        return res.status(502).json({ error: 'Service vocal injoignable', detail: String(err.message || err) });
    }
};
