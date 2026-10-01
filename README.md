# 🌾 AgriVoice API & Web Interface

**AgriVoice** est un assistant vocal et textuel intelligent conçu pour accompagner les agriculteurs et producteurs agricoles d'Afrique de l'Ouest (Bénin, Togo, Nigéria...) en langues locales et en français.

---

## 🌍 Langues Prises en Charge

| Langue | Code | Reconnaissance Vocale (STT) | Cerveau IA (LLM) | Synthèse Vocale (TTS) |
| :--- | :---: | :---: | :---: | :---: |
| **Français** | `fr` | Whisper Large V3 Turbo | Gemini Flash Lite | Gemini TTS (Voix "Kore" 24 kHz) |
| **Yorùbá** | `yoruba` | Whisper Large V3 Turbo | Gemini Flash Lite | Gemini TTS (Voix "Kore" 24 kHz) |
| **Éwé / Mina** | `ewe` | Whisper Large V3 Turbo | Gemini Flash Lite | Gemini TTS (Voix "Kore" 24 kHz) |
| **Fongbè (Fon)** | `fon` | MMS-ASR Fon (`Max-Adis/agrivoice-fon-asr`) | Gemini Flash Lite | MMS-TTS Fon |

---

## ✨ Fonctionnalités Clés

- 🎙️ **Interaction Vocale Naturelle** : Posez votre question en parlant, AgriVoice vous écoute et vous répond oralement.
- 🌾 **Recommandations Agricoles Spécialisées** : Traitements phytosanitaires, bio-pesticides (neem, cendre), calendrier cultural, fertilisation, stockage hermétique (sacs PICS), données INRAB.
- 📚 **Guides & Fiches Pratiques Audio** : Conseils audio par culture (Maïs, Soja, Manioc...) et thématique.
- 📱 **Interface 100% Responsive Style Google Gemini** : Optimisée pour smartphones, tablettes et ordinateurs.
- ⚡ **Latence Ultra-Faible** : Décodage PCM direct 24 kHz via Web Audio API.

---

## 🚀 Démarrage Rapide

### Prérequis
- Un navigateur web moderne (Chrome, Edge, Safari, Firefox).
- Python 3.8+ (pour le serveur local de test).

### 1. Cloner le dépôt
```bash
git clone https://github.com/Max-Adis/AGRIVOICE-API.git
cd AGRIVOICE-API
```

### 2. Lancer le serveur local
```bash
python3 server/server.py 8000
```

### 3. Accéder à l'application
Ouvrez votre navigateur sur :
```
http://localhost:8000
```

---

## 📂 Structure du Projet

```text
├── index.html          # Interface utilisateur web moderne (Style Google Gemini)
├── script.js           # Logique IA : STT, Gemini LLM, Gemini/MMS TTS, i18n
├── style.css           # Thème graphique et animations
├── logo.png            # Logo AgriVoice
├── vercel.json         # Configuration déploiement Vercel (Static Web App)
├── config.example.js   # Modèle de configuration pour clés API
├── server/
│   └── server.py       # Serveur HTTP local Python
└── README.md           # Documentation
```

---

## 🔒 Sécurité & Licences
Développé avec ❤️ pour l'agriculture africaine intelligente.
