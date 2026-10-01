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
- 📱 **Interface 100% Responsive** : Optimisée pour smartphones, tablettes et ordinateurs de bureau.
- ⚡ **Latence Ultra-Faible** : Décodage PCM direct 24 kHz via Web Audio API.

---

## 🚀 Démarrage Rapide

### Prérequis
- Python 3.8+ (ou Node.js 18+)
- Un navigateur web moderne (Chrome, Edge, Firefox, Safari)

### 1. Cloner le dépôt
```bash
git clone https://github.com/Max-Adis/AGRIVOICE-API.git
cd AGRIVOICE-API
```

### 2. Lancer le serveur

**Avec Python :**
```bash
python3 server.py 8000
```

**Ou avec Node.js :**
```bash
npm install
npm start
```

### 3. Accéder à l'application
Ouvrez votre navigateur sur :
```
http://localhost:8000
```

---

## 📂 Structure du Projet

```text
├── index.html       # Interface utilisateur web complète
├── script.js        # Logique client : STT, Gemini LLM, Gemini/MMS TTS, i18n
├── style.css        # Styles et animations
├── server.py        # Serveur HTTP local Python
├── server.js        # Serveur Express Node.js alternatif
├── logo.png         # Logo AgriVoice
├── package.json     # Dépendances Node.js
└── README.md        # Documentation
```

---

## 🔒 Sécurité & Licences
Développé avec ❤️ pour l'agriculture africaine intelligente.
