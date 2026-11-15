# 🎙️ J'aime AgriVoice — Guide de Démarrage

Site de collecte massive de données vocales agricoles (Fɔngbe, Yorùbá, Français) pour entraîner le modèle TinyML d'AgriVoice.

---

## ⚡ Mise en Route (15 minutes)

### Étape 1 — Créer un projet Supabase (gratuit)

1. Aller sur **[https://supabase.com](https://supabase.com)** → *Start your project* → Créer un compte
2. Cliquer sur **New Project**
3. Nommer le projet : `agrivoice-crowdsource`
4. Choisir la région : **Europe West** (pour la latence)
5. Définir un mot de passe de base de données (notez-le)
6. Attendre ~2 minutes que le projet se crée

### Étape 2 — Récupérer les clés API

1. Dans le dashboard Supabase → **Settings → API**
2. Copier :
   - **Project URL** : `https://xxxxxxxxxxxx.supabase.co`
   - **anon public key** : `eyJhbGciOiJIUzI1NiIsIn...`

### Étape 3 — Configurer les clés dans le code

Ouvrir **[`js/supabase-client.js`](js/supabase-client.js)** et remplacer :

```js
export const SUPABASE_URL      = "https://YOUR_PROJECT_ID.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY";
```

par vos vraies valeurs.

### Étape 4 — Créer la base de données

1. Dans Supabase Dashboard → **SQL Editor** → *New Query*
2. Copier-coller **tout le contenu** de [`supabase_schema.sql`](supabase_schema.sql)
3. Cliquer **Run**
4. Vérifier : onglet **Table Editor** → vous devez voir 3 tables : `word_prompts`, `contributions`, `validations`

### Étape 5 — Créer le bucket de stockage audio

1. Dans Supabase → **Storage** → *New bucket*
2. Nom : `agrivoice-audios`
3. Cocher **Public bucket** ✅ (obligatoire pour que les audios soient accessibles)
4. Cliquer *Create bucket*

### Étape 6 — Lancer le site

Ouvrir **`index.html`** dans votre navigateur (ou utiliser un serveur local) :

```bash
# Option 1 : Python (dans le dossier jaime-agrivoice/)
python3 -m http.server 3000
# Ouvrir : http://localhost:3000

# Option 2 : Node.js
npx serve .
```

> **⚠️ Important** : Le site doit être servi via HTTP/HTTPS (pas `file://`)
> car l'API `MediaRecorder` et les modules ES6 requièrent un contexte sécurisé.

---

## 📁 Structure des fichiers

```
jaime-agrivoice/
├── index.html            ← Page principale d'enregistrement
├── validate.html         ← Page de validation communautaire (votes)
├── leaderboard.html      ← Classement des contributeurs + stats
├── supabase_schema.sql   ← Schéma SQL à exécuter dans Supabase
├── js/
│   ├── supabase-client.js ← Client Supabase (⚠️ CONFIGURER les clés ici)
│   ├── recorder.js        ← API audio MediaRecorder + visualiseur + WAV
│   ├── word-prompts.js    ← Dictionnaire complet des 42 mots à collecter
│   └── app.js             ← (réservé pour logique partagée future)
├── css/
│   └── custom.css         ← Styles spécifiques (animations, micro, votes)
└── assets/
    └── logo.png           ← Logo AgriVoice
```

---

## 🌐 Déploiement en ligne

### GitHub Pages (recommandé)

```bash
# Dans le dépôt racine AgriVoice
git add jaime-agrivoice/
git commit -m "Feat: Add J'aime AgriVoice crowdsource collection site"
git push

# Dans GitHub → Settings → Pages
# Source: "Deploy from a branch" → branch: main, folder: /jaime-agrivoice
# URL finale: https://max-adis.github.io/AgriVoice/jaime-agrivoice/
```

### Vercel (avec domaine personnalisé)

```bash
cd jaime-agrivoice/
npx vercel --prod
# Suivre les instructions → choisir "Other" comme framework
```

---

## 🗄️ Connexion avec le Dashboard Existant

Le fichier `dashboard/index.html` **n'est pas modifié**.

Pour afficher les vraies données Supabase dans le dashboard :
1. Ajouter les clés Supabase dans `dashboard/index.html` (variables JS en haut)
2. Remplacer les données statiques par des appels `supabase.from('global_stats').select('*')`

---

## 📊 Tables Supabase

| Table | Description |
|:---|:---|
| `word_prompts` | Les 42 mots à collecter (pré-rempli par le SQL) |
| `contributions` | Chaque enregistrement audio envoyé |
| `validations` | Les votes 👍/👎 de la communauté |
| **Vue** `word_stats` | Progression par mot (nb collectés / objectif) |
| **Vue** `global_stats` | Stats globales pour le dashboard |

---

## 📤 Export pour Edge Impulse

Dans le Dashboard Supabase → SQL Editor :

```sql
-- Exporter les audios validés en CSV
SELECT
  c.id,
  c.word,
  c.language,
  c.edge_label    AS "label",
  c.audio_url,
  c.audio_format,
  c.duration_ms,
  c.created_at
FROM contributions c
WHERE c.status = 'validated'
ORDER BY c.language, c.edge_label, c.created_at;
```

Le fichier CSV + les URLs audio peuvent être importés directement dans **Edge Impulse Studio** via l'outil d'ingestion de données.

---

## 👥 Équipe WinBanD — AgriVoice

*Max · Byll · Ibrahim · Esperencia*

> AgriVoice — Donnons une voix à chaque agriculteur. 🌱🇧🇯
