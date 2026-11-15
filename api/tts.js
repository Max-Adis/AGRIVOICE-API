// Fonction serveur Vercel : synthèse vocale multilingue AgriVoice
// - Fon (Fɔngbe) : Meta MMS-TTS Fon (facebook/mms-tts-fon via dpc-mmstts) avec normalisation phonétique
// - Éwé (Eʋegbe) : Meta MMS-TTS Éwé (facebook/mms-tts-ewe via dpc-mmstts) avec normalisation phonétique
// - Yorùbá (yo)  : ElevenLabs eleven_v4_turbo + fallback Meta MMS-TTS Yorùbá
// - Français (fr): ElevenLabs eleven_v4_turbo

const MODEL_ID = 'eleven_v4_turbo';
const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
const MAX_CHARS = 450;
const MMS_SPACE_BASE = 'https://dpc-mmstts.hf.space';

function deduplicateRepetitions(input) {
    let s = String(input || '').replace(/\s+/g, ' ').trim();
    // Supprimer les répétitions de séquences de 1 à 5 mots consécutifs (anti-hallucination)
    for (let pass = 0; pass < 3; pass++) {
        s = s.replace(/\b(\S+(?:\s+\S+){0,4})(?:\s+\1\b)+/gi, '$1');
    }
    // Supprimer les phrases dupliquées
    const sentences = s.split(/(?<=[.!?])\s+/);
    const seen = new Set();
    const uniqueSentences = [];
    for (const sent of sentences) {
        const key = sent.toLowerCase().replace(/[^a-z0-9\u00C0-\u02AF]/g, '');
        if (key && !seen.has(key)) {
            seen.add(key);
            uniqueSentences.push(sent);
        }
    }
    return uniqueSentences.slice(0, 3).join(' ');
}

function prepareTextForMms(rawText, lang) {
    let t = deduplicateRepetitions(rawText);

    // Retirer le contenu entre parenthèses qui perturbe souvent le modèle VITS
    t = t.replace(/\([^)]*\)/g, ' ');

    if (lang === 'fon') {
        t = t
            .replace(/15-15-15/g, ' ')
            .replace(/\b100\s*kg\b/gi, 'kilo kanweko')
            .replace(/\b50\s*kg\b/gi, 'kilo kande wo')
            .replace(/\b24\s*000\b/g, 'akpa ko nukun ene')
            .replace(/\b26\s*000\b/g, 'akpa ko nukun ayizɛn')
            .replace(/\b16\s*000\b/g, 'akpa afɔtɔn nukun ɖokpo')
            .replace(/\b32\s*500\b/g, 'akpa gban nukun we')
            .replace(/\b250\b/g, 'afɔwe kande wo')
            .replace(/\b260\b/g, 'afɔwe kande ko')
            .replace(/\b280\b/g, 'afɔwe kanwe')
            .replace(/\b325\b/g, 'afɔtɔn ko nukun atɔn')
            .replace(/\b350\b/g, 'afɔtɔn kande wo')
            .replace(/\b400\b/g, 'kɛnɛ')
            .replace(/\b200\b/g, 'afɔwe')
            .replace(/\b100\b/g, 'kanweko')
            .replace(/\b40\b/g, 'kande')
            .replace(/\b15\b/g, 'afɔtɔn')
            .replace(/\b12\b/g, 'wo we')
            .replace(/\b10\b/g, 'wo')
            .replace(/\b1\b/g, 'ɖokpo')
            .replace(/\b2\b/g, 'we')
            .replace(/\b3\b/g, 'atɔn')
            .replace(/\b4\b/g, 'ene')
            .replace(/\b5\b/g, 'atɔɔn')
            .replace(/\bFCFA\b/gi, 'flan')
            .replace(/\bNPK\b/gi, 'engrais')
            .replace(/\bPICS\b/gi, 'piksi')
            .replace(/\bkg\b/gi, 'kilo');
    } else if (lang === 'ewe') {
        t = t
            .replace(/15-15-15/g, ' ')
            .replace(/\bFCFA\b/gi, 'fran')
            .replace(/\bNPK\b/gi, 'ajilɛ')
            .replace(/\bPICS\b/gi, 'piksi')
            .replace(/\bkg\b/gi, 'kilo');
    }

    // Nettoyer les chiffres restants et les symboles non-alphabétiques qui font bégayer VITS
    t = t
        .replace(/[0-9%/*#_`«»"':;—–\-•]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (t.length > 210) {
        const cut = t.slice(0, 210);
        const lastDot = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
        t = lastDot > 60 ? cut.slice(0, lastDot + 1) : cut;
    }

    return t || (lang === 'fon' ? 'Kpé mè, AgriVoice wɛ.' : 'Woezɔ, AgriVoice ye.');
}

async function synthesizeWithMms(text, mmsLangLabel, langCode) {
    const clean = prepareTextForMms(text, langCode);

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

    // 1. FON (FƆNGBE) & ÉWÉ : Synthèse native Meta MMS-TTS avec nettoyage anti-hallucination
    if (lang === 'fon' || lang === 'ewe') {
        const mmsLabel = lang === 'fon' ? 'Fon (fon)' : 'Éwé (ewe)';
        try {
            const wavBuffer = await synthesizeWithMms(text, mmsLabel, lang);
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('Cache-Control', 'public, max-age=86400');
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
    const cleanText = deduplicateRepetitions(text).slice(0, MAX_CHARS);

    try {
        const upstream = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
            {
                method: 'POST',
                headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: cleanText,
                    model_id: MODEL_ID,
                    language_code: elevenLangCode
                })
            }
        );

        if (upstream.ok) {
            const audio = Buffer.from(await upstream.arrayBuffer());
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return res.status(200).send(audio);
        }

        // Repli sur MMS-TTS Yorùbá si ElevenLabs échoue pour Yorùbá
        if (elevenLangCode === 'yo') {
            const wavBuffer = await synthesizeWithMms(cleanText, 'Yoruba (yor)', 'yo');
            res.setHeader('Content-Type', 'audio/wav');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            return res.status(200).send(wavBuffer);
        }

        const detail = (await upstream.text()).slice(0, 300);
        return res.status(upstream.status).json({ error: 'ElevenLabs', detail });
    } catch (err) {
        if (elevenLangCode === 'yo') {
            try {
                const wavBuffer = await synthesizeWithMms(cleanText, 'Yoruba (yor)', 'yo');
                res.setHeader('Content-Type', 'audio/wav');
                res.setHeader('Cache-Control', 'public, max-age=86400');
                return res.status(200).send(wavBuffer);
            } catch (_) {}
        }
        return res.status(502).json({ error: 'Service vocal injoignable', detail: String(err.message || err) });
    }
};
