-- =============================================================================
-- SCHÉMA SQL SUPABASE — J'aime AgriVoice
-- À exécuter dans : Supabase Dashboard → SQL Editor
-- =============================================================================

-- 0. Table des contributeurs identifiés (pseudo unique + code PIN sécurisé)
-- =============================================================================
CREATE TABLE IF NOT EXISTS contributors (
  username     TEXT PRIMARY KEY,
  pin_hash     TEXT NOT NULL,
  session_id   TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  last_active  TIMESTAMPTZ DEFAULT NOW()
);

-- 1. Table des mots à collecter (référentiel)
-- =============================================================================
CREATE TABLE IF NOT EXISTS word_prompts (

  id            TEXT PRIMARY KEY,          -- ex: "f1", "y3", "fr2"
  word          TEXT NOT NULL,             -- ex: "Agbado"
  language      TEXT NOT NULL              -- 'fon' | 'yoruba' | 'french'
                  CHECK (language IN ('fon','yoruba','french')),
  phonetic      TEXT,                      -- ex: "Ag-ba-do"
  meaning_fr    TEXT,                      -- ex: "Maïs"
  category      TEXT DEFAULT 'Autre',      -- ex: "Cultures"
  edge_label    TEXT,                      -- ex: "fon_agbado" (label Edge Impulse)
  target_count  INT  DEFAULT 300,          -- objectif d'enregistrements
  is_active     BOOL DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des contributions audio
-- =============================================================================
CREATE TABLE IF NOT EXISTS contributions (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word_id              TEXT REFERENCES word_prompts(id) ON DELETE SET NULL,
  word                 TEXT NOT NULL,
  language             TEXT NOT NULL
                         CHECK (language IN ('fon','yoruba','french')),
  edge_label           TEXT,              -- pour nommage fichiers Edge Impulse
  audio_url            TEXT NOT NULL,     -- URL publique Supabase Storage
  audio_format         TEXT DEFAULT 'webm'
                         CHECK (audio_format IN ('webm','wav','opus','mp4')),
  duration_ms          INT,              -- durée en millisecondes
  contributor_session  TEXT NOT NULL,    -- fingerprint anonyme (UUID navigateur)
  contributor_name     TEXT,             -- prénom optionnel
  status               TEXT DEFAULT 'pending'
                         CHECK (status IN ('pending','validated','rejected')),
  vote_count           INT DEFAULT 0,
  vote_positive        INT DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_contributions_language ON contributions(language);
CREATE INDEX IF NOT EXISTS idx_contributions_status   ON contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_word_id  ON contributions(word_id);
CREATE INDEX IF NOT EXISTS idx_contributions_session  ON contributions(contributor_session);
CREATE INDEX IF NOT EXISTS idx_contributions_created  ON contributions(created_at DESC);

-- 3. Table des votes de validation
-- =============================================================================
CREATE TABLE IF NOT EXISTS validations (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contribution_id  UUID NOT NULL REFERENCES contributions(id) ON DELETE CASCADE,
  voter_session    TEXT NOT NULL,
  vote             BOOLEAN NOT NULL,     -- TRUE = 👍, FALSE = 👎
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(contribution_id, voter_session) -- Un vote par personne par audio
);

CREATE INDEX IF NOT EXISTS idx_validations_contrib ON validations(contribution_id);
CREATE INDEX IF NOT EXISTS idx_validations_voter   ON validations(voter_session);

-- =============================================================================
-- VUES PRATIQUES
-- =============================================================================

-- Vue : stats par mot (utile pour le dashboard)
CREATE OR REPLACE VIEW word_stats AS
SELECT
  wp.id,
  wp.word,
  wp.language,
  wp.category,
  wp.edge_label,
  wp.target_count,
  COUNT(c.id) FILTER (WHERE c.status IN ('pending','validated')) AS collected,
  COUNT(c.id) FILTER (WHERE c.status = 'validated')              AS validated,
  ROUND(
    COUNT(c.id) FILTER (WHERE c.status IN ('pending','validated'))::numeric
    / NULLIF(wp.target_count, 0) * 100, 1
  ) AS progress_pct
FROM word_prompts wp
LEFT JOIN contributions c ON c.word_id = wp.id
GROUP BY wp.id, wp.word, wp.language, wp.category, wp.edge_label, wp.target_count
ORDER BY wp.language, wp.id;

-- Vue : stats globales (pour le leaderboard et le dashboard)
CREATE OR REPLACE VIEW global_stats AS
SELECT
  COUNT(*) FILTER (WHERE status IN ('pending','validated'))       AS total_contributions,
  COUNT(*) FILTER (WHERE status = 'validated')                    AS total_validated,
  COUNT(*) FILTER (WHERE status = 'pending')                      AS total_pending,
  COUNT(*) FILTER (WHERE status IN ('pending','validated')
                    AND created_at >= NOW() - INTERVAL '24 hours') AS today_contributions,
  COUNT(*) FILTER (WHERE language = 'fon'
                    AND status IN ('pending','validated'))         AS fon_count,
  COUNT(*) FILTER (WHERE language = 'yoruba'
                    AND status IN ('pending','validated'))         AS yoruba_count,
  COUNT(*) FILTER (WHERE language = 'french'
                    AND status IN ('pending','validated'))         AS french_count
FROM contributions;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE contributors  ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_prompts  ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE validations   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contributors_read_all" ON contributors;
CREATE POLICY "contributors_read_all"
  ON contributors FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "contributors_insert_anon" ON contributors;
CREATE POLICY "contributors_insert_anon"
  ON contributors FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "contributors_update_anon" ON contributors;
CREATE POLICY "contributors_update_anon"
  ON contributors FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "word_prompts_read_all" ON word_prompts;

CREATE POLICY "word_prompts_read_all"
  ON word_prompts FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "contributions_read_all" ON contributions;
CREATE POLICY "contributions_read_all"
  ON contributions FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "contributions_insert_anon" ON contributions;
CREATE POLICY "contributions_insert_anon"
  ON contributions FOR INSERT TO anon
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "contributions_update_anon" ON contributions;
CREATE POLICY "contributions_update_anon"
  ON contributions FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "validations_read_all" ON validations;
CREATE POLICY "validations_read_all"
  ON validations FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "validations_insert_anon" ON validations;
CREATE POLICY "validations_insert_anon"
  ON validations FOR INSERT TO anon
  WITH CHECK (true);

-- 3. STORAGE RLS (permettre l'upload d'audios par les contributeurs anonymes)
DROP POLICY IF EXISTS "Allow anon uploads to agrivoice-audios" ON storage.objects;
CREATE POLICY "Allow anon uploads to agrivoice-audios"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'agrivoice-audios');

DROP POLICY IF EXISTS "Allow public reads on agrivoice-audios" ON storage.objects;
CREATE POLICY "Allow public reads on agrivoice-audios"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'agrivoice-audios');



-- =============================================================================
-- DONNÉES INITIALES (seed word_prompts depuis le code)
-- =============================================================================

INSERT INTO word_prompts (id, word, language, phonetic, meaning_fr, category, edge_label, target_count) VALUES
  ('f1',  'Gbadé',     'fon',    'Gba-dé',     'Maïs',                     'Cultures',      'fon_gbade',     300),
  ('f2',  'Amàn',      'fon',    'A-màn',      'Feuille (plante)',         'Cultures',      'fon_ama',       300),
  ('f3',  'Jǐ',        'fon',    'Dji',        'Pluie / Météo',            'Météo',         'fon_ji',        300),
  ('f4',  'Wànvùn',    'fon',    'Wan-voun',   'Vers / Chenilles ravageuses','Ravageurs',   'fon_wanvoun',   300),
  ('f5',  'Axi',       'fon',    'A-hi',       'Prix / Marché',            'Commerce',      'fon_axi',       300),
  ('f6',  'Yovo djè',  'fon',    'Yo-vo-djè',  'Engrais / Urée',           'Fertilisation', 'fon_yovodje',   250),
  ('f7',  'Soja',      'fon',    'So-dja',     'Soja',                     'Cultures',      'fon_soja',      250),
  ('f8',  'Gari',      'fon',    'Ga-ri',      'Gari (manioc transformé)', 'Cultures',      'fon_gari',      250),
  ('f9',  'Dantokpa',  'fon',    'Dan-tok-pa', 'Marché Dantokpa',          'Marchés',       'fon_dantokpa',  300),
  ('f10', 'Saki',      'fon',    'Sa-ki',      'Sac de stockage / récolte','Stockage',      'fon_saki',      250),
  ('f11', 'Yozǒ',      'fon',    'Yo-zô',      'Chaleur / Sécheresse',     'Météo',         'fon_yozo',      250),
  ('f12', 'Ðó tó',     'fon',    'Dô-tô',      'Écoute / Active micro',    'Commandes',     'cmd_fon_ecoute',250),
  ('f13', 'Sɛ́dó',    'fon',    'Sɛ-dô',      'Envoyer / Valider',        'Commandes',     'cmd_fon_envoyer',250),
  ('f14', 'Awanou',    'fon',    'A-wa-nou',   'Merci / Fin',              'Commandes',     'cmd_fon_awanou',250),
  ('f15', 'AgriVoice', 'fon',    'Agri-Voice', 'Mot de réveil (Wake Word)','Wake Word',     'wake_agrivoice',300),
  ('y1',  'Àgbàdo',    'yoruba', 'Àg-bà-do',   'Maïs',                     'Cultures',      'yor_agbado',    300),
  ('y2',  'Ewé',       'yoruba', 'E-wé',       'Feuille (plante)',         'Cultures',      'yor_ewe',       250),
  ('y3',  'Òjò',       'yoruba', 'O-djo',      'Pluie',                    'Météo',         'yor_ojo',       300),
  ('y4',  'Kòkòrò',    'yoruba', 'Ko-ko-ro',   'Chenille / Insecte ravageur','Ravageurs',   'yor_kokoro',    300),
  ('y5',  'Owó',       'yoruba', 'O-wó',       'Prix / Argent',            'Commerce',      'yor_owo',       300),
  ('y6',  'Ajilẹ̀',    'yoruba', 'A-dji-lẹ̀',  'Engrais',                  'Fertilisation', 'yor_ajile',     250),
  ('y7',  'Sòyà',      'yoruba', 'Sò-yà',      'Soja',                     'Cultures',      'yor_soya',      250),
  ('y8',  'Gáàrí',     'yoruba', 'Gáà-rí',     'Gari',                     'Cultures',      'yor_gaari',     250),
  ('y9',  'Dàntọ́kpà', 'yoruba', 'Dàn-tọ́k-pà','Marché Dantokpa',          'Marchés',       'yor_dantokpa',  300),
  ('y10', 'Àpò',       'yoruba', 'À-pò',       'Sac de stockage',          'Stockage',      'yor_apo',       250),
  ('y11', 'Oòrùn',     'yoruba', 'Oò-rùn',     'Soleil / Chaleur extrême', 'Météo',         'yor_oorun',     250),
  ('y12', 'Gbọ́',      'yoruba', 'G-bọ',       'Écoute / Active micro',    'Commandes',     'cmd_yor_ecoute',250),
  ('y13', 'Firanṣẹ',   'yoruba', 'Fi-ran-ṣe',  'Envoyer / Valider',        'Commandes',     'cmd_yor_envoyer',250),
  ('y14', 'Ẹ ṣé',     'yoruba', 'E-ché',      'Merci / Fin',              'Commandes',     'cmd_yor_merci', 250),
  ('y15', 'AgriVoice', 'yoruba', 'Agri-Voice', 'Mot de réveil (Wake Word)','Wake Word',     'wake_agrivoice',300),
  ('fr1', 'Maïs',      'french', 'Ma-ïs',      'Céréale maïs',             'Cultures',      'fr_mais',       200),
  ('fr2', 'Feuille',   'french', 'Feuille',    'Feuillage / Plante',       'Cultures',      'fr_feuille',    200),
  ('fr3', 'Pluie',     'french', 'Pluie',      'Précipitations / Semis',   'Météo',         'fr_pluie',      200),
  ('fr4', 'Chenille',  'french', 'Che-nille',  'Chenille / Vers ravageur', 'Ravageurs',     'fr_chenille',   200),
  ('fr5', 'Prix',      'french', 'Prix',       'Cours des marchés',        'Commerce',      'fr_prix',       200),
  ('fr6', 'Engrais',   'french', 'En-grais',   'Fertilisation / Urée',     'Fertilisation', 'fr_engrais',    200),
  ('fr7', 'Soja',      'french', 'So-ja',      'Culture du soja',          'Cultures',      'fr_soja',       200),
  ('fr8', 'Gari',      'french', 'Ga-ri',      'Gari / Manioc',            'Cultures',      'fr_gari',       200),
  ('fr9', 'Marché',    'french', 'Mar-ché',    'Marché agricole',          'Marchés',       'fr_marche',     200),
  ('fr10','Sac',       'french', 'Sac',        'Sac de stockage / récolte','Stockage',      'fr_sac',        200),
  ('fr11','Chaleur',   'french', 'Cha-leur',   'Forte chaleur / Canicule', 'Météo',         'fr_chaleur',    200),
  ('fr12','AgriVoice', 'french', 'Agri-Voice', 'Mot de réveil',           'Wake Word',     'wake_agrivoice',300)
ON CONFLICT (id) DO UPDATE SET
  word = EXCLUDED.word,
  meaning_fr = EXCLUDED.meaning_fr,
  phonetic = EXCLUDED.phonetic,
  category = EXCLUDED.category,
  edge_label = EXCLUDED.edge_label,
  target_count = EXCLUDED.target_count;

-- =============================================================================
-- TABLE : questions sans réponse (télémétrie depuis app Android + web)
-- =============================================================================
CREATE TABLE IF NOT EXISTS unanswered_questions (
  id            TEXT PRIMARY KEY,              -- UUID généré côté client (offline-safe)
  user_query    TEXT NOT NULL,                 -- Question posée par l'agriculteur
  language      TEXT NOT NULL                  -- 'fon' | 'yoruba' | 'french'
                  CHECK (language IN ('fon','yoruba','french')),
  language_name TEXT,                          -- Nom lisible : "Fɔngbe", "Yorùbá", "Français"
  source        TEXT DEFAULT 'web'             -- 'web' | 'android_app'
                  CHECK (source IN ('web','android_app')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unanswered_language ON unanswered_questions(language);
CREATE INDEX IF NOT EXISTS idx_unanswered_source   ON unanswered_questions(source);
CREATE INDEX IF NOT EXISTS idx_unanswered_created  ON unanswered_questions(created_at DESC);

ALTER TABLE unanswered_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "unanswered_insert_anon" ON unanswered_questions;
CREATE POLICY "unanswered_insert_anon"
  ON unanswered_questions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "unanswered_read_auth" ON unanswered_questions;
CREATE POLICY "unanswered_read_auth"
  ON unanswered_questions FOR SELECT TO authenticated
  USING (true);

-- Ajouter la colonne "source" dans contributions (si elle n'existe pas encore)
ALTER TABLE contributions ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'web'
  CHECK (source IN ('web','android_app'));
