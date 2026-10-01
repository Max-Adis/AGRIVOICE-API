require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Aucun fichier audio fourni" });
        }
        const modelId = req.body.model;
        if (!modelId) {
            return res.status(400).json({ error: "Modèle non spécifié" });
        }

        const API_URL = `https://api-inference.huggingface.co/models/${modelId}`;
        const hfToken = process.env.HF_TOKEN;

        if (!hfToken) {
            return res.status(500).json({ error: "La clé API n'est pas configurée dans .env" });
        }

        // Fix for Node fetch if not native (Node < 18). We assume Node 18+ where fetch is native.
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${hfToken}`,
                "Content-Type": req.file.mimetype || "audio/wav"
            },
            method: "POST",
            body: req.file.buffer,
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error("Erreur serveur lors de la transcription:", error);
        res.status(500).json({ error: "Erreur lors de la communication avec l'API IA." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur AgriVoice démarré sur http://localhost:${PORT}`);
    console.log(`Clé API sécurisée et chargée depuis .env`);
});
