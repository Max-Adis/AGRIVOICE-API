/**
 * word-prompts.js
 * Dictionnaire complet des mots agricoles à collecter.
 * Source : AgriCrowdsourceManager.kt (app Android)
 * Synchronisé avec les labels Edge Impulse du guide TinyML.
 */

export const WORD_PROMPTS = [

  // ─── FƆNGBE (15 mots) ──────────────────────────────────────────────────────
  { id: "f1",  word: "Gbadé",    language: "fon",    phonetic: "Gba-dé",     meaningFr: "Maïs",                    category: "Cultures",     edgeLabel: "fon_gbade",     targetCount: 300 },
  { id: "f2",  word: "Amàn",     language: "fon",    phonetic: "A-màn",      meaningFr: "Feuille (plante)",        category: "Cultures",     edgeLabel: "fon_ama",       targetCount: 300 },
  { id: "f3",  word: "Jǐ",       language: "fon",    phonetic: "Dji",        meaningFr: "Pluie / Météo",           category: "Météo",        edgeLabel: "fon_ji",        targetCount: 300 },
  { id: "f4",  word: "Wànvùn",   language: "fon",    phonetic: "Wan-voun",   meaningFr: "Vers / Chenilles ravageuses", category: "Ravageurs", edgeLabel: "fon_wanvoun",   targetCount: 300 },
  { id: "f5",  word: "Axi",      language: "fon",    phonetic: "A-hi",       meaningFr: "Prix / Marché",           category: "Commerce",     edgeLabel: "fon_axi",       targetCount: 300 },
  { id: "f6",  word: "Yovo djè", language: "fon",    phonetic: "Yo-vo-djè",  meaningFr: "Engrais / Urée",          category: "Fertilisation",edgeLabel: "fon_yovodje",   targetCount: 250 },
  { id: "f7",  word: "Soja",     language: "fon",    phonetic: "So-dja",     meaningFr: "Soja",                    category: "Cultures",     edgeLabel: "fon_soja",      targetCount: 250 },
  { id: "f8",  word: "Gari",     language: "fon",    phonetic: "Ga-ri",      meaningFr: "Gari (manioc transformé)",category: "Cultures",     edgeLabel: "fon_gari",      targetCount: 250 },
  { id: "f9",  word: "Dantokpa", language: "fon",    phonetic: "Dan-tok-pa", meaningFr: "Marché Dantokpa",         category: "Marchés",      edgeLabel: "fon_dantokpa",  targetCount: 300 },
  { id: "f10", word: "Saki",     language: "fon",    phonetic: "Sa-ki",      meaningFr: "Sac de stockage / récolte",category: "Stockage",     edgeLabel: "fon_saki",      targetCount: 250 },
  { id: "f11", word: "Yozǒ",     language: "fon",    phonetic: "Yo-zô",      meaningFr: "Chaleur / Sécheresse",    category: "Météo",        edgeLabel: "fon_yozo",      targetCount: 250 },
  { id: "f12", word: "Ðó tó",    language: "fon",    phonetic: "Dô-tô",      meaningFr: "Écoute / Active micro",   category: "Commandes",    edgeLabel: "cmd_fon_ecoute", targetCount: 250 },
  { id: "f13", word: "Sɛ́dó",    language: "fon",    phonetic: "Sɛ-dô",      meaningFr: "Envoyer / Valider",       category: "Commandes",    edgeLabel: "cmd_fon_envoyer",targetCount: 250 },
  { id: "f14", word: "Awanou",   language: "fon",    phonetic: "A-wa-nou",   meaningFr: "Merci / Fin",             category: "Commandes",    edgeLabel: "cmd_fon_awanou", targetCount: 250 },
  { id: "f15", word: "AgriVoice",language: "fon",    phonetic: "Agri-Voice", meaningFr: "Mot de réveil (Wake Word)", category: "Wake Word", edgeLabel: "wake_agrivoice", targetCount: 300 },

  // ─── YORÙBÁ (15 mots) ──────────────────────────────────────────────────────
  { id: "y1",  word: "Àgbàdo",   language: "yoruba", phonetic: "Àg-bà-do",   meaningFr: "Maïs",                    category: "Cultures",     edgeLabel: "yor_agbado",    targetCount: 300 },
  { id: "y2",  word: "Ewé",      language: "yoruba", phonetic: "E-wé",       meaningFr: "Feuille (plante)",        category: "Cultures",     edgeLabel: "yor_ewe",       targetCount: 250 },
  { id: "y3",  word: "Òjò",      language: "yoruba", phonetic: "O-djo",      meaningFr: "Pluie",                   category: "Météo",        edgeLabel: "yor_ojo",       targetCount: 300 },
  { id: "y4",  word: "Kòkòrò",   language: "yoruba", phonetic: "Ko-ko-ro",   meaningFr: "Chenille / Insecte ravageur", category: "Ravageurs", edgeLabel: "yor_kokoro", targetCount: 300 },
  { id: "y5",  word: "Owó",      language: "yoruba", phonetic: "O-wó",       meaningFr: "Prix / Argent",           category: "Commerce",     edgeLabel: "yor_owo",       targetCount: 300 },
  { id: "y6",  word: "Ajilẹ̀",   language: "yoruba", phonetic: "A-dji-lẹ̀",  meaningFr: "Engrais",                 category: "Fertilisation",edgeLabel: "yor_ajile",     targetCount: 250 },
  { id: "y7",  word: "Sòyà",     language: "yoruba", phonetic: "Sò-yà",      meaningFr: "Soja",                    category: "Cultures",     edgeLabel: "yor_soya",      targetCount: 250 },
  { id: "y8",  word: "Gáàrí",    language: "yoruba", phonetic: "Gáà-rí",     meaningFr: "Gari",                    category: "Cultures",     edgeLabel: "yor_gaari",     targetCount: 250 },
  { id: "y9",  word: "Dàntọ́kpà",language: "yoruba", phonetic: "Dàn-tọ́k-pà",meaningFr: "Marché Dantokpa",         category: "Marchés",      edgeLabel: "yor_dantokpa",  targetCount: 300 },
  { id: "y10", word: "Àpò",      language: "yoruba", phonetic: "À-pò",       meaningFr: "Sac de stockage",         category: "Stockage",     edgeLabel: "yor_apo",       targetCount: 250 },
  { id: "y11", word: "Oòrùn",    language: "yoruba", phonetic: "Oò-rùn",     meaningFr: "Soleil / Chaleur extrême",category: "Météo",        edgeLabel: "yor_oorun",     targetCount: 250 },
  { id: "y12", word: "Gbọ́",     language: "yoruba", phonetic: "G-bọ",       meaningFr: "Écoute / Active micro",   category: "Commandes",    edgeLabel: "cmd_yor_ecoute", targetCount: 250 },
  { id: "y13", word: "Firanṣẹ",  language: "yoruba", phonetic: "Fi-ran-ṣe",  meaningFr: "Envoyer / Valider",       category: "Commandes",    edgeLabel: "cmd_yor_envoyer",targetCount: 250 },
  { id: "y14", word: "Ẹ ṣé",    language: "yoruba", phonetic: "E-ché",      meaningFr: "Merci / Fin",             category: "Commandes",    edgeLabel: "cmd_yor_merci",  targetCount: 250 },
  { id: "y15", word: "AgriVoice",language: "yoruba", phonetic: "Agri-Voice", meaningFr: "Mot de réveil (Wake Word)", category: "Wake Word", edgeLabel: "wake_agrivoice", targetCount: 300 },

  // ─── FRANÇAIS (12 mots) ───────────────────────────────────────────────────
  { id: "fr1", word: "Maïs",     language: "french", phonetic: "Ma-ïs",      meaningFr: "Céréale maïs",            category: "Cultures",     edgeLabel: "fr_mais",       targetCount: 200 },
  { id: "fr2", word: "Feuille",  language: "french", phonetic: "Feuille",    meaningFr: "Feuillage / Plante",      category: "Cultures",     edgeLabel: "fr_feuille",    targetCount: 200 },
  { id: "fr3", word: "Pluie",    language: "french", phonetic: "Pluie",      meaningFr: "Précipitations / Semis",  category: "Météo",        edgeLabel: "fr_pluie",      targetCount: 200 },
  { id: "fr4", word: "Chenille", language: "french", phonetic: "Che-nille",  meaningFr: "Chenille / Vers ravageur",category: "Ravageurs",    edgeLabel: "fr_chenille",   targetCount: 200 },
  { id: "fr5", word: "Prix",     language: "french", phonetic: "Prix",       meaningFr: "Cours des marchés",       category: "Commerce",     edgeLabel: "fr_prix",       targetCount: 200 },
  { id: "fr6", word: "Engrais",  language: "french", phonetic: "En-grais",   meaningFr: "Fertilisation / Urée",    category: "Fertilisation",edgeLabel: "fr_engrais",    targetCount: 200 },
  { id: "fr7", word: "Soja",     language: "french", phonetic: "So-ja",      meaningFr: "Culture du soja",         category: "Cultures",     edgeLabel: "fr_soja",       targetCount: 200 },
  { id: "fr8", word: "Gari",     language: "french", phonetic: "Ga-ri",      meaningFr: "Gari / Manioc",           category: "Cultures",     edgeLabel: "fr_gari",       targetCount: 200 },
  { id: "fr9", word: "Marché",   language: "french", phonetic: "Mar-ché",    meaningFr: "Marché agricole",         category: "Marchés",      edgeLabel: "fr_marche",     targetCount: 200 },
  { id: "fr10",word: "Sac",      language: "french", phonetic: "Sac",        meaningFr: "Sac de stockage / récolte",category: "Stockage",     edgeLabel: "fr_sac",        targetCount: 200 },
  { id: "fr11",word: "Chaleur",  language: "french", phonetic: "Cha-leur",   meaningFr: "Forte chaleur / Canicule",category: "Météo",        edgeLabel: "fr_chaleur",    targetCount: 200 },
  { id: "fr12",word: "AgriVoice",language: "french", phonetic: "Agri-Voice", meaningFr: "Mot de réveil",          category: "Wake Word",    edgeLabel: "wake_agrivoice", targetCount: 300 },
];

/** Filtre par langue */
export function getPromptsByLanguage(lang) {
  return WORD_PROMPTS.filter(p => p.language === lang);
}

/** Récupère un mot par ID */
export function getPromptById(id) {
  return WORD_PROMPTS.find(p => p.id === id);
}

/** Catégories disponibles */
export const CATEGORIES = ["Tous", "Cultures", "Ravageurs", "Maladies", "Météo", "Commerce", "Marchés", "Stockage", "Fertilisation", "Commandes", "Wake Word"];

/** Config langues */
export const LANGUAGES = {
  fon:    { label: "Fɔngbe",   color: "#196E3F", bgLight: "#EBF5F0" },
  yoruba: { label: "Yorùbá",   color: "#D97706", bgLight: "#FEF3C7" },
  french: { label: "Français", color: "#2563EB", bgLight: "#EFF6FF" },
};

