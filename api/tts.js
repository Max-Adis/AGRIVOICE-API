// Fonction serveur Vercel : synthèse vocale Yorùbá via ElevenLabs.
// La clé API est lue dans la variable d'environnement ELEVENLABS_API_KEY
// (jamais exposée dans le code du site ni dans le dépôt GitHub).

const MODEL_ID = 'eleven_v4_turbo';          // seul modèle (avec eleven_v4) à gérer le Yorùbá
const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // voix "Sarah" (premade, gratuite)
const MAX_CHARS = 600;                        // protège le quota gratuit (10 000 car./mois)

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'ELEVENLABS_API_KEY non configurée sur Vercel' });
    }

    const { text, language } = req.body || {};
    if (typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Texte manquant' });
    }
    if (language !== 'yo') {
        return res.status(400).json({ error: 'Langue non prise en charge (yo uniquement)' });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

    try {
        const upstream = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
            {
                method: 'POST',
                headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text.trim().slice(0, MAX_CHARS),
                    model_id: MODEL_ID,
                    language_code: 'yo'
                })
            }
        );

        if (!upstream.ok) {
            const detail = (await upstream.text()).slice(0, 300);
            return res.status(upstream.status).json({ error: 'ElevenLabs', detail });
        }

        const audio = Buffer.from(await upstream.arrayBuffer());
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).send(audio);
    } catch (err) {
        return res.status(502).json({ error: 'Service vocal injoignable', detail: String(err.message || err) });
    }
};
