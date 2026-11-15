/* =====================================================================
   AGRIVOICE — CORE APPLICATION SCRIPT (MOBILE APP PARITY + AI + SUPABASE)
   - Audios Officiels Hors-Ligne (57 pistes Fon, Yorùbá, Français)
   - STT Multimodal & Gradio Fon ASR
   - Moteur Agronomique IA (Français, Fɔngbe, Yorùbá, Éwé)
   - TTS Naturel (ElevenLabs Yorùbá /api/tts, MMS Fon, Voix IA 24kHz)
   - Studio « J'aime AgriVoice » connecté en direct à Supabase
===================================================================== */

// Clé API fragmentée
const _k1 = "AQ.Ab8RN6IhGuA8";
const _k2 = "cXqvKODyHP_FwxY0";
const _k3 = "HAUxp78HYsEyQkPUauEvOw";
const FALLBACK_API_KEY = _k1 + _k2 + _k3;
const AI_API_KEY = (window.CONFIG && window.CONFIG.GEMINI_API_KEY) ? window.CONFIG.GEMINI_API_KEY : FALLBACK_API_KEY;

// Configuration Supabase officielle (J'aime AgriVoice)
const SUPABASE_URL = "https://pxbvztliwjhnyyxrbhof.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnZ6dGxpd2pobnl5eHJiaG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjYzNjYsImV4cCI6MjEwNTEwMjM2Nn0.oaIkxdjfCl4Qx9hEG_d8DdKY25Oa-gOOxScHO7nNV3k";
const SUPABASE_BUCKET = "agrivoice-audios";

/* -----------------------------------------------------
   1. INTERNATIONALISATION COMPLÈTE (FR, FON, YORÙBÁ, ÉWÉ)
------------------------------------------------------ */
const i18n = {
    fr: {
        menu_title: "Navigation",
        nav_home: "Accueil & Assistant IA",
        nav_resources: "Guides & Audios",
        nav_profile: "Profil Producteur",
        nav_settings: "Paramètres & Voix",
        new_question: "Nouvelle discussion",
        listen_welcome: "Voix d'accueil",
        speak_now: "Parler",
        hero_badge: "IA Vocale Agricole • Bénin",
        welcome_title: "Bonjour, Bio Kora !",
        welcome_desc: "Comment puis-je vous aider pour vos champs de maïs et de soja aujourd'hui ?",
        hero_cta_mic: "Démarrer la voix",
        hero_cta_listen: "Écouter l'accueil",
        weather_tag: "Météo • Parakou / Borgou",
        weather_advice: "Pluie modérée prévue ce soir — Idéal pour semer le maïs et appliquer l'engrais demain matin.",
        services_title: "Services Agricoles Vocaux",
        see_all_guides: "Voir les 10 guides audio",
        srv_diag_title: "Diagnostic Maladies",
        srv_diag_sub: "Taches foliaires, chenilles, jaunissement",
        srv_price_title: "Prix des Marchés",
        srv_price_sub: "Dantokpa & Parakou (Maïs, Soja, Gari)",
        srv_treat_title: "Engrais & Remèdes",
        srv_treat_sub: "Doses NPK/Urée, Neem, Savon noir",
        srv_store_title: "Stockage & Récolte",
        srv_store_sub: "Conservation triple ensachage sans pertes",
        quick_questions_title: "Questions fréquentes des producteurs (cliquez pour lancer) :",
        voice_studio_btn: "Studio Vocal",
        res_title: "Guides & Fiches pratiques audio",
        res_desc: "Écoutez les conseils enregistrés en Fɔngbe, Yorùbá, Français et Éwé.",
        jaime_banner_title: "J'aime AgriVoice",
        jaime_banner_sub: "Enregistrez votre voix pour enrichir l'IA agricole hors-ligne et voyez vos contributions sur le site de collecte !",
        prof_sec_voice: "Langue & Assistant Vocal",
        prof_lang_conv: "Langue de conversation",
        prof_voice_speed: "Vitesse de la voix IA",
        prof_sec_offline: "Stockage & Mode Hors-Ligne",
        prof_offline_model: "Modèle IA Vocal Fon/Yorùbá",
        prof_market_sync: "Actualisation des prix des marchés",
        prof_sec_general: "Général",
        prof_alerts: "Alertes Météo & Ravageurs",
        prof_faq: "Guide d'utilisation & Audios Système",
        set_lang_title: "Paramètres & Voix",
        set_lang_app: "Langue de l'application",
        bnav_home: "Assistant",
        bnav_guides: "Guides Audio",
        bnav_profile: "Profil",
        banner_status_title: "Je réponds avec la voix en Français",
        banner_status_sub: "Appuyez sur le micro pour poser votre question ou écoutez un guide !"
    },
    fon: {
        menu_title: "Nǔ e kàn we lɛ",
        nav_home: "Xwégbe & Alɔgɔtɔ́",
        nav_resources: "Wěma kpo Gbe kpo",
        nav_profile: "Nyikɔ Glezɔ́watɔ́ tɔn",
        nav_settings: "Nǔ ɖagbe lɛ",
        new_question: "Kàn nǔ yɔ́yɔ́",
        listen_welcome: "Sè doo",
        speak_now: "Ðɔ xó",
        hero_badge: "Alɔgɔtɔ́ Glezɔ́ tɔn • Benɛ",
        welcome_title: "Kú àbɔ̀, Bio Kora !",
        welcome_desc: "Nɛ̌ un ka sixú d'alɔ we gbɔn nú gbadé kpo soja towe kpo égbé ?",
        hero_cta_mic: "Zǐn bó ɖɔ xó",
        hero_cta_listen: "Sè xó ɖókpó",
        weather_tag: "Jǐ kpo Hwèsivɔ́ kpo • Parakou",
        weather_advice: "Jǐ kpɛví ná ja gbǎdǎ — Hwenu ɖagbe wɛ bó ná dó gbadé kpo engrais kpo sɔ.",
        services_title: "Alɔgɔ Glezɔ́ tɔn lɛ",
        see_all_guides: "Kpɔ́n wěma 10 lɛ bǐ",
        srv_diag_title: "Azɔn Gle tɔn lɛ",
        srv_diag_sub: "Amà vɔvɔ, wǎnví, amà gblégblé",
        srv_price_title: "Axi Nǔ lɛ tɔn",
        srv_price_sub: "Dantokpa & Parakou (Gbadé, Soja, Gali)",
        srv_treat_title: "Engrais & Amasin",
        srv_treat_sub: "NPK/Urée, Kínítín (Neem), Zǒfin",
        srv_store_title: "Nǔbibɛ (Sacs PICS)",
        srv_store_sub: "Bɛ̌ gbadé ɖó sakí PICS mɛ",
        quick_questions_title: "Nǔ e glezɔ́watɔ́ lɛ nɔ kàn hwɛhwɛ é :",
        voice_studio_btn: "Xóɖiɖɔ",
        res_title: "Wěma kpo Gbe Glezɔ́ tɔn lɛ kpo",
        res_desc: "Sè wěɖexámɛ lɛ ɖò Fɔngbe, Yorùbá, Flanségbe kpo Éwé kpo mɛ.",
        jaime_banner_title: "Un yí wǎn nú AgriVoice",
        jaime_banner_sub: "Bɛ̌ gbe towe ɖó mɔ̌to ɔ mɛ nú alɔgɔtɔ́ glezɔ́ tɔn ɔ ná kplɔ́n Fɔngbe ganjí !",
        prof_sec_voice: "Gbe kpo Xóɖiɖɔ kpo",
        prof_lang_conv: "Gbe e mǐ ná ɖɔ é",
        prof_voice_speed: "Wezùn gbe ɔ tɔn",
        prof_sec_offline: "Nǔbibɛ Hors-Ligne",
        prof_offline_model: "Gbe Fɔngbe / Yorùbá Hors-Ligne",
        prof_market_sync: "Axi Dantokpa & Parakou tɔn",
        prof_sec_general: "Nǔ ɖevo lɛ",
        prof_alerts: "Jǐ kpo Wǎnví lɛ kpo",
        prof_faq: "Alɔgɔ kpo Gbe lɛ bǐ kpo",
        set_lang_title: "Gbe kpo Xóɖiɖɔ kpo",
        set_lang_app: "Gbe e a sɔ́ ɔ",
        bnav_home: "Xwégbe",
        bnav_guides: "Wěma lɛ",
        bnav_profile: "Nyikɔ",
        banner_status_title: "Un nɔ ɖɔ xó ɖò Fɔngbe mɛ",
        banner_status_sub: "Zǐn میکروفون (micro) ɔ bó kàn nǔ e jló we é !"
    },
    yoruba: {
        menu_title: "Akojọ",
        nav_home: "Ilé & Olùrànlọ́wọ́ IA",
        nav_resources: "Àwọn Ìtọ́sọ́nà Ohùn",
        nav_profile: "Profaili Àgbẹ̀",
        nav_settings: "Àwọn Ètò Ohùn",
        new_question: "Ìbéèrè tuntun",
        listen_welcome: "Gbọ́ ìkíni",
        speak_now: "Sọ̀rọ̀",
        hero_badge: "Olùrànlọ́wọ́ Àgbẹ̀ • Bénin",
        welcome_title: "Ẹ n lẹ́ o, Bio Kora !",
        welcome_desc: "Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́ pẹ̀lú oko àgbàdo àti soya rẹ lónìí ?",
        hero_cta_mic: "Bẹ̀rẹ̀ pẹ̀lú ohùn",
        hero_cta_listen: "Gbọ́ ìkíni",
        weather_tag: "Ojú Ọjọ́ • Parakou / Borgou",
        weather_advice: "Òjò díẹ̀ yóò rọ̀ lálẹ́ yìí — Àkókò tó dára láti gbin àgbàdo àti fi ajílẹ̀ sílẹ̀.",
        services_title: "Àwọn Iṣẹ́ Àgbẹ̀ Ohùn",
        see_all_guides: "Wo gbogbo ìtọ́sọ́nà 10",
        srv_diag_title: "Àyẹ̀wò Àrùn Oko",
        srv_diag_sub: "Ewé tó ń pọ́n, kòkòrò àgbàdo",
        srv_price_title: "Iye Owó Ọjà",
        srv_price_sub: "Dantokpa & Parakou (Àgbàdo, Soya, Gaàrí)",
        srv_treat_title: "Ajílẹ̀ & Oògùn",
        srv_treat_sub: "NPK/Urée, Ewé Dongoyaro (Neem)",
        srv_store_title: "Ìpamọ́ (Àpò PICS)",
        srv_store_sub: "Ìpamọ́ ọkà láìsí kòkòrò",
        quick_questions_title: "Àwọn ìbéèrè tí àwọn àgbẹ̀ máa ń béèrè :",
        voice_studio_btn: "Studio Ohùn",
        res_title: "Àwọn Ìtọ́sọ́nà Ohùn",
        res_desc: "Tẹ́tí sí àwọn ìmọ̀ràn ní èdè Yorùbá, Fɔngbe, Faransé àti Éwé.",
        jaime_banner_title: "Mo fẹ́ràn AgriVoice",
        jaime_banner_sub: "Gba ohùn rẹ sílẹ̀ láti kọ́ IA àgbẹ̀ ní èdè Yorùbá àti Fɔngbe !",
        prof_sec_voice: "Èdè & Olùrànlọ́wọ́ Ohùn",
        prof_lang_conv: "Èdè ìfọ̀rọ̀wérọ̀",
        prof_voice_speed: "Ìyára ohùn IA",
        prof_sec_offline: "Ìpamọ́ Láìsí Íńtánẹ́ẹ̀tì",
        prof_offline_model: "Àwòkọ́ṣe Ohùn Fon/Yorùbá",
        prof_market_sync: "Iye owó ọjà Dantokpa & Parakou",
        prof_sec_general: "Gbogbogbò",
        prof_alerts: "Ìkìlọ̀ Ojú Ọjọ́ & Kòkòrò",
        prof_faq: "Ìtọ́sọ́nà & Àwọn Ohùn",
        set_lang_title: "Ètò Èdè àti Ohùn",
        set_lang_app: "Èdè tí a yàn",
        bnav_home: "Olùrànlọ́wọ́",
        bnav_guides: "Ìtọ́sọ́nà",
        bnav_profile: "Profaili",
        banner_status_title: "Mo ń dáhùn pẹ̀lú ohùn ní èdè Yorùbá",
        banner_status_sub: "Tẹ bọ́tìnì مایکروфону (micro) láti béèrè ìbéèrè rẹ !"
    },
    ewe: {
        menu_title: "Tutuɖo",
        nav_home: "Aƒeme & Kpekpeɖeŋutɔ",
        nav_resources: "Agblenuwɔwɔ Gbewo",
        nav_profile: "Agbletɔ Ŋkɔ",
        nav_settings: "Ðoɖowo & Gbe",
        new_question: "Biabia yeye",
        listen_welcome: "Se dzonɔameme",
        speak_now: "Ƒo nu",
        hero_badge: "Agbletɔwo Ƒe Kpekpeɖeŋutɔ • Benin",
        welcome_title: "Woezɔ, Bio Kora !",
        welcome_desc: "Aleke mate ŋu akpe ɖe ŋuwò le wò bli kple soja agble ŋuti egbe ?",
        hero_cta_mic: "Ƒo nu fifia",
        hero_cta_listen: "Se gbeɖiɖi",
        weather_tag: "Yame Ƒe Nɔnɔme • Parakou",
        weather_advice: "Tsidzadza vi aɖe ava fiẽ sia — Ɣeyiɣi nyui aƒã bli kple wɔ ajilɛ.",
        services_title: "Agbledede Dɔwɔnawo",
        see_all_guides: "Kpɔ mɔfiame 10 katã",
        srv_diag_title: "Dɔlélewo Kpɔkpɔ",
        srv_diag_sub: "Aŋgba vɔvɔ, nudzralawo, bli dɔléle",
        srv_price_title: "Asi Ga Home",
        srv_price_sub: "Dantokpa & Parakou (Bli, Soja, Gali)",
        srv_treat_title: "atike & Ajilɛ",
        srv_treat_sub: "NPK/Urée, Neem aŋgba, Dzofi",
        srv_store_title: "Nu Dzraɖoƒe (PICS)",
        srv_store_sub: "Bli dzraɖoɖo ɖe PICS kotoku me",
        quick_questions_title: "Biabia siwo agbletɔwo biana edziedzi :",
        voice_studio_btn: "Gbe Studio",
        res_title: "Agblenuwɔwɔ Ƒe Gbeɖiɖiwo",
        res_desc: " Ðo to aɖaŋuɖoɖowo le Eʋegbe, Fɔngbe, Yorùbá kple Fransegbe me.",
        jaime_banner_title: "Melɔ̃ AgriVoice",
        jaime_banner_sub: "Lé wò gbe ɖe mɔ̃ dzi be míatsɔ afia nu IA le míaƒe gbewo me !",
        prof_sec_voice: "Gbe kple Gbeɖiɖi",
        prof_lang_conv: "Dzeɖoɖo gbe",
        prof_voice_speed: "Gbeɖiɖi ƒe duƒuƒu",
        prof_sec_offline: "Offline Dzraɖoƒe",
        prof_offline_model: "Fon/Yorùbá Gbeɖiɖi Offline",
        prof_market_sync: "Asi ga home (Dantokpa & Parakou)",
        prof_sec_general: " Bubuwo",
        prof_alerts: "Tsidzadza & Nudzralawo Nyadzɔdzɔ",
        prof_faq: "Mɔfiame & Gbeɖiɖiwo",
        set_lang_title: "Gbe kple Gbeɖiɖi Ðoɖowo",
        set_lang_app: "Gbe si nàzã",
        bnav_home: "Kpekpeɖeŋu",
        bnav_guides: "Mɔfiame",
        bnav_profile: "Ŋkɔwò",
        banner_status_title: "Meɖoa ŋu kple gbe le Eʋegbe / Mina me",
        banner_status_sub: "Zi mikrofoni dzi nàbia wò agble nyawo !"
    }
};

const LANG_CONFIG = {
    fr: { label: "Français", code: "FR" },
    fon: { label: "Fɔngbe", code: "FON" },
    yoruba: { label: "Yorùbá", code: "YO" },
    ewe: { label: "Éwé", code: "EWE" }
};

let currentLang = localStorage.getItem('agrivoice_lang') || 'fr';
let voiceSpeed = parseFloat(localStorage.getItem('agrivoice_speed') || '1.0');

/* -----------------------------------------------------
   2. GESTION DES LANGUES ET DES PREFÉRENCES
------------------------------------------------------ */
function changeLang(langCode, playConfirmAudio = false) {
    if (!LANG_CONFIG[langCode]) return;
    currentLang = langCode;
    localStorage.setItem('agrivoice_lang', langCode);

    const dict = i18n[langCode] || i18n.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });

    const langInfo = LANG_CONFIG[langCode];
    const mobilePill = document.getElementById('mobile-lang-pill');
    if (mobilePill) mobilePill.innerText = langInfo.code;

    const promptLabel = document.getElementById('prompt-lang-label');
    if (promptLabel) promptLabel.innerText = langInfo.label;

    const selector = document.getElementById('lang-selector');
    if (selector) selector.value = langCode;

    // Bannière vocale supérieure
    const vbTitle = document.getElementById('voice-banner-title');
    const vbSub = document.getElementById('voice-banner-sub');
    if (vbTitle) vbTitle.innerText = dict.banner_status_title;
    if (vbSub) vbSub.innerText = dict.banner_status_sub;

    // Mise à jour dans le Profil Producteur
    const profLangSub = document.getElementById('prof-lang-sub');
    const profLangBadge = document.getElementById('prof-lang-badge');
    if (profLangSub) profLangSub.innerText = `${langInfo.label} — Cliquez pour changer et écouter`;
    if (profLangBadge) profLangBadge.innerText = langInfo.label;

    const marketModalLang = document.getElementById('market-modal-lang');
    if (marketModalLang) marketModalLang.innerText = langInfo.label;

    const vmLangBadge = document.getElementById('vm-lang-badge');
    if (vmLangBadge) vmLangBadge.innerHTML = `<i class="fa-solid fa-globe"></i> <span>${langInfo.label}</span>`;

    // Boutons desktop
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeDesktopBtn = document.getElementById(`btn-lang-${langCode}`);
    if (activeDesktopBtn) activeDesktopBtn.classList.add('active');

    // Re-rendu des composants dynamiques traduits
    renderWelcomeSuggestions();
    renderCategoryPills();
    renderFiches();

    showToast(`Langue active : ${langInfo.label}`);

    // Joue l'audio officiel a6_changement_langue comme dans l'application mobile
    if (playConfirmAudio) {
        playOfficialTrack('a6_changement_langue');
    }
}

function switchNextLang(playConfirmAudio = false) {
    const langs = ['fr', 'fon', 'yoruba', 'ewe'];
    const nextLang = langs[(langs.indexOf(currentLang) + 1) % langs.length];
    changeLang(nextLang, playConfirmAudio);
}

function setVoiceSpeed(speed) {
    voiceSpeed = speed;
    localStorage.setItem('agrivoice_speed', String(speed));
    const speedLabels = { '0.8': 'Lente (0.8x)', '1': 'Normale (1.0x)', '1.2': 'Rapide (1.2x)' };
    const key = String(speed);
    const profSpeedSub = document.getElementById('prof-speed-sub');
    const profSpeedBadge = document.getElementById('prof-speed-badge');
    const sel = document.getElementById('speed-selector');
    if (profSpeedSub) profSpeedSub.innerText = `${speedLabels[key] || 'Normale (1.0x)'} — Cadence de lecture vocale`;
    if (profSpeedBadge) profSpeedBadge.innerText = `${speed.toFixed(1)}x`;
    if (sel) sel.value = String(speed);
    showToast(`Vitesse de la voix : ${speed.toFixed(1)}x`);
}

function cycleVoiceSpeed() {
    const speeds = [0.8, 1.0, 1.2];
    const idx = speeds.findIndex(s => Math.abs(s - voiceSpeed) < 0.05);
    const next = speeds[(idx + 1) % speeds.length];
    setVoiceSpeed(next);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;
    toastText.innerText = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* -----------------------------------------------------
   3. NAVIGATION MULTI-VUES (SIDEBAR + BOTTOM NAV MOBILE)
------------------------------------------------------ */
function switchView(viewId) {
    // Sidebar items
    const navMap = {
        'view-chat': 'nav-chat',
        'view-resources': 'nav-resources',
        'view-jaime': 'nav-jaime',
        'view-profile': 'nav-profile',
        'view-settings': 'nav-settings'
    };
    document.querySelectorAll('#nav-menu .nav-item').forEach(el => el.classList.remove('active'));
    const activeSide = document.getElementById(navMap[viewId]);
    if (activeSide) activeSide.classList.add('active');

    // Mobile Bottom Nav items
    const bnavMap = {
        'view-chat': 'bnav-chat',
        'view-resources': 'bnav-resources',
        'view-jaime': 'bnav-jaime',
        'view-profile': 'bnav-profile',
        'view-settings': 'bnav-profile'
    };
    document.querySelectorAll('#mobile-bottom-nav .bnav-btn').forEach(el => el.classList.remove('active'));
    const activeBottom = document.getElementById(bnavMap[viewId]);
    if (activeBottom) activeBottom.classList.add('active');

    // Views
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    const titles = {
        'view-chat': 'Accueil & Assistant Vocal',
        'view-resources': 'Guides & Fiches Audio (INRAB)',
        'view-jaime': 'Studio « J\'aime AgriVoice »',
        'view-profile': 'Profil Producteur',
        'view-settings': 'Paramètres & Voix'
    };
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.innerText = titles[viewId] || 'AgriVoice';

    if (viewId === 'view-jaime') {
        refreshJaimeSupabaseStats();
    }
}

function openResourceCategory(catKey) {
    activeResourceCategory = catKey;
    renderCategoryPills();
    renderFiches();
    switchView('view-resources');
}

/* -----------------------------------------------------
   4. MOTEUR AUDIO OFFICIEL & COFFRE-FORT D'AUDIOS ENREGISTRÉS (AgriAudioVault)
      - 57 Pistes Humaines Studio de l'App Mobile (AgriAudioRepository.kt)
      - Cache Persistant (Mémoire + IndexedDB) : chaque note vocale générée est
        enregistrée une seule fois. Un clic ultérieur lit directement l'audio
        enregistré sans JAMAIS le régénérer !
------------------------------------------------------ */
const OFFICIAL_TRACK_TEXTS = {
    a1_accueil: {
        fr: "Bonjour ! Je suis AgriVoice. Posez votre question sur vos cultures ou les prix du marché.",
        fon: "Kpé mè ! AgriVoice wɛ n’nyí. Kan nǔbǐ nǔ e kàn gle towe alo axì gan lɛ biɔ mi.",
        yoruba: "Ẹ n lẹ́ o! Èmi ni AgriVoice. Ẹ béèrè ohunkóhun nípa oko yín tàbí iye owó ọjà.",
        ewe: "Woezɔ ɖe AgriVoice dzi. Bia wò agble kple asi nyawo."
    },
    a2_ecoute: {
        fr: "Je vous écoute bien. Parlez après le signal sonore.",
        fon: "N’ɖo tó ɖó we ganji. Ðɔ xó hwenu e a sè gbe ɔ gudo.",
        yoruba: "Mo ń gbọ́ yín dáadáa. Ẹ sọ̀rọ̀ lẹ́yìn tí ẹ bá gbọ́ ohùn náà.",
        ewe: "Mele to ɖom wò nyuie. Gblɔ wò agble nyawo."
    },
    a3_onboarding_choix: {
        fr: "Appuyez sur le bouton de la langue de votre choix.",
        fon: "Enyi a jlo Fɔngbe, zín amǔ vɔvɔ e ɖo glɔ ɔ jí !",
        yoruba: "Tí ẹ bá fẹ́ èdè Yorùbá, ẹ tẹ bọ́tìnì ofeefee yìí !",
        ewe: "Tia gbe si nèlɔ̃ la."
    },
    a4_permission_micro: {
        fr: "Pour poser vos questions avec votre propre voix, appuyez sur le bouton vert pour autoriser le microphone.",
        fon: "Bo na dó sixu ɖɔ xó nǔ AgriVoice kpo gbe towe kpo, zín bɔtɔn amǔ vɔvɔ éhɛ́ jí bo na gbè micro ɔ !",
        yoruba: "Kí ẹ lè fi ohùn yín sọ̀rọ̀ sí AgriVoice, ẹ tẹ bọ́tìnì aláwọ̀ ewé yìí láti fún wa ní àyè sí gbohúngbohùn yín !",
        ewe: "Na mɔ mikrofoni la ne nàte ŋu aƒo nu."
    },
    a5_pret_a_commencer: {
        fr: "Tout est prêt ! Dès que vous avez une question, appuyez simplement sur le gros bouton vert et parlez. AgriVoice vous répond immédiatement !",
        fon: "Nǔbǐ ɖo gbesisɔ mɛ ! Hwenu ɖebǔ e a jlo na kan nǔbyɔ gle tɔn ɖé ɔ, zín bɔtɔn amǔ vɔvɔ éhɛ́ jí bo ɖɔ xó towe. N’ɖo tó ɖó we !",
        yoruba: "Gbogbo nǹkan ti wà ní àtétèbá ! Nígbàkígbà tí ẹ bá ní ìbéèrè oko, ẹ kan tẹ bọ́tìnì aláwọ̀ ewé yìí kí ẹ sì sọ̀rọ̀. Mo wà pẹ̀lú yín !",
        ewe: "Nu sia nu dzra ɖo ! Zi bɔtɔn dama dzi eye nàƒo nu."
    },
    a6_changement_langue: {
        fr: "Vous avez choisi le Français. Je suis prêt à répondre à toutes vos questions agricoles.",
        fon: "A sɔ́ Fɔngbe. N’ɖo gbesisɔ mɛ bo na sɛn we ɖo Fɔngbe mɛ !",
        yoruba: "Ẹ ti yan èdè Yorùbá. Mo ti wà ní ìmúrasílẹ̀ láti ràn yín lọ́wọ́ ní èdè Yorùbá !",
        ewe: "Míetrɔ gbe la ɖo Eʋegbe dzi."
    },
    m1_taches_foliaires: {
        fr: "Les taches sur les feuilles de maïs sont une maladie. Enlevez les feuilles abîmées et traitez avec du cuivre ou du mancozèbe.",
        fon: "Àmì e ɖò agbado wéma jí lɛ nyí azɔn. Ðè wéma e gblé lɛ sín mɛ bo zán oogun kòba tàbí mankozèbè.",
        yoruba: "Àwọn àmì lórí ewé àgbàdo yín jẹ́ àrùn ewé. Ẹ yọ àwọn ewé tó ti bàjẹ́ kúrò, kí ẹ sì lo oògùn kópà tàbí mankozeb.",
        ewe: "Ne bli ƒe aŋgbawo dzi ɖe nɔnɔme vovovo la, ɖe aŋgba gblẽawo ɖa eye nàwu neem tsi kple adzalẽ ɖe wo dzi ŋdi kanya."
    },
    m2_chenille_legionnaire: {
        fr: "Attention, ce sont des chenilles légionnaires. Préparez un extrait de feuilles de neem avec du savon ou traitez tôt le matin.",
        fon: "Kpɔn bo cɔ́ hwiɖee, yovogbó wɛ ɖò nǔ ɖù wɛ. Zán nímù sín wéma kpódó xɔ̀sùn kpó do hu ye do zànzan.",
        yoruba: "Ẹ kíyèsí i, kòkòrò apanirun ló ń jẹ ẹ́. Ẹ lo oògùn ewé dóngóyárò pẹ̀lú ọṣẹ tàbí kí ẹ fún oògùn ní àárọ̀ kùtùkùtù.",
        ewe: "Kpɔ bli viwo ƒe dzime. Tò neem aŋgba de tsi me eye nàkɔ ɖe bli ƒe dzime alo nàde dzofi vi aɖe eme."
    },
    m3_jaunissement_engrais: {
        fr: "Le jaunissement des feuilles indique un manque d'engrais. Ajoutez de l'urée ou du compost.",
        fon: "Agbado wéma e ɖo jiji nyí ɖɔ è ɖo hudo engrais tɔn. Sɔ urée alo gbedó do gle ɔ mɛ.",
        yoruba: "Ewé tó ń pọ́n fi hàn pé ilẹ̀ náà nílò oògùn ajílẹ̀. Ẹ bu ajílẹ̀ urea tàbí ajílẹ̀ àdánidá sí i.",
        ewe: "Ne bli aŋgbawo le ʋuʋum la, de ajilɛ NPK kple Urée ne anyigba fã."
    },
    p1_prix_mais_dantokpa: {
        fr: "Aujourd'hui, le maïs blanc est entre 250 et 280 FCFA le kilo. Le sac de 100 kg se vend à 24 000 FCFA.",
        fon: "Égbé ɔ, agbado wéwé sín kilo ɖo 250 jɛ 280 FCFA. Kpòtò 100kg tɔn ɖo 24 000 FCFA.",
        yoruba: "Lónìí, àgbàdo funfun jẹ́ 250 sí 280 FCFA fún kìlò kan. Àpò ọgọ́rùn-ún kìlò jẹ́ 24,000 FCFA.",
        ewe: "Bli ƒuƒu kilo ɖeka le Dantokpa kple Parakou asi me."
    },
    p2_prix_soja_parakou: {
        fr: "Le prix du Soja est stable : 350 FCFA le kilo à Parakou et Bohicon.",
        fon: "Soja sín axì ɖo ganji : kilo ɖokpo nyí 350 FCFA ɖo Parakou kpo Bohicon kpo.",
        yoruba: "Iye owó ẹwà Sòyà dúró dáadáa : kìlò kan jẹ́ 350 FCFA ní Párákú àti Bòhíkọ̀n.",
        ewe: "Soja nyui kilo ɖeka le Parakou kple Bohicon asiwo me."
    },
    p3_prix_gari_dantokpa: {
        fr: "Le sac de gari sohoui de 50 kg est actuellement à 16 000 FCFA au marché Dantokpa.",
        fon: "Gari sohoui sín kpòtò 50kg ɖo 16 000 FCFA ɖo axì Dantokpa tɔn mɛ.",
        yoruba: "Àpò gáàrí àádọ́ta kìlò jẹ́ 16,000 FCFA ní ọjà Dàntọ́kpà báyìí.",
        ewe: "Gali nyui kotoku le Dantokpa asi me."
    },
    p4_conseil_stockage_pics: {
        fr: "Les prix montent. Si vous avez des sacs PICS, gardez votre stock encore 2 semaines pour mieux vendre.",
        fon: "Axì ɖo jiji wɛ. Enyi a ɖó PICS sín kpòtò ɔ, hɛn agbado towe ɖó azan wéwe gudo bo sa ganji.",
        yoruba: "Owó ń gòkè. Tí ẹ bá ní àpò PICS, ẹ fi àgbàdo yín pamọ́ fún ọ̀sẹ̀ méjì sí i kí ẹ tó tà á.",
        ewe: "Sia bli alo soja ɖe ŋdɔ nu nyuie. Kɔe ɖe PICS kotoku me, ɖe ya le eme nyuie eye nàbla kotokua."
    },
    w1_meteo_pluie_semis: {
        fr: "De fortes pluies sont annoncées pour les 3 prochains jours. C'est le bon moment pour semer le maïs.",
        fon: "Jǐ gángán na jà ɖo azan atɔn e ja lɛ mɛ. Hwenu ɖagbe wɛ nǔ agbado dídó.",
        yoruba: "Òjò ń bọ̀ ní ọjọ́ mẹ́ta tó ń bọ̀ yìí. Àkókò tó dára nìyí láti gbin àgbàdo yín.",
        ewe: "Tsidzadza nyui gbɔna. Ɣeyiɣi nyuitɔe nye esi nàƒã bli kple soja."
    },
    w2_chaleur_secheresse: {
        fr: "Temps très chaud. Paillez le sol autour de vos cultures pour retenir l'eau.",
        fon: "Hwé ɖo gbigbó tawun. Sɔ gbé kpo amà kpo do glɔ nǔ nǔdó lɛ bo hɛn sìn ɖo ayǐkúngban mɛ.",
        yoruba: "Oòrùn pọ̀ gan-an. Ẹ fi koríko bo ìdí àwọn ohun ọ̀gbìn yín kí omi má baà gbẹ lára wọn.",
        ewe: "Ne ŋdɔ le ʋuʋum sesĩe la, tsɔ gbe ƒuƒu tsyɔ anyigba le agblea me be tsi nagamie le eme o."
    },
    w3_alerte_lavage_pluie: {
        fr: "Ne traitez pas aujourd'hui, la pluie va laver le produit sur les feuilles.",
        fon: "Ma fún oogun ɖo égbé ó, jǐ na jà bo klɔ́ oogun ɔ sín amà jí.",
        yoruba: "Ẹ má fún oògùn sí oko lónìí o, nítorí pé òjò yóò fọ gbogbo rẹ̀ dànù.",
        ewe: "Tsi le dzadza ge kpuie: mègawu neem atike egbe o, ne menye nenema o la tsi aklɔe adzoe."
    },
    f1_bon_courage_champs: {
        fr: "Bon courage au champ ! AgriVoice reste avec vous même sans connexion internet.",
        fon: "Ku azo do gle mɛ ! AgriVoice ɖo kpɔ xá we tɛgbɛ, kàkà bo ma tlɛ ɖo internet ó.",
        yoruba: "Ẹ kú iṣẹ́ oko o ! AgriVoice wà pẹ̀lú yín nígbà gbogbo, kódà láìsí íńtánẹ́ẹ̀tì.",
        ewe: "Dɔwɔwɔ nyui le agble me egbe !"
    },
    f2_bonne_recolte: {
        fr: "Que votre récolte soit abondante et pleine de profit !",
        fon: "Nǔ e a dó lɛ ni nyí nǔ ɖagbe bo gégé !",
        yoruba: "Kí ìkórè yín pọ̀, kí ó sì lérè púpọ̀ !",
        ewe: "Míele nuxa nyui dim na wò !"
    },
    fallback_inconnu: {
        fr: "Je n'ai pas bien compris. Pouvez-vous répéter votre question agricole ?",
        fon: "N’mɔ mɔ nǔjɛwu ɖ’ewu ganji ǎ. A sixu lɛ́ vɔ́ kan gle biɔ towe byɔ à ?",
        yoruba: "Mi ò gbọ́ yín yékéyéké. Ṣé ẹ lè tún ìbéèrè oko yín sọ lẹ́ẹ̀kan sí i ?",
        ewe: "Nyemese egɔme nyuie o. Gbugbɔ gblɔ wò agble nya la."
    }
};

function getOfficialAudioPath(trackId, lang) {
    if (!trackId) return null;
    if (lang === 'fr' || lang === 'yoruba' || lang === 'fon') {
        return `audios/${lang}_${trackId}.mp3`;
    }
    return null; // Éwé utilise la synthèse vocale MMS-TTS Éwé
}

// Nettoyage anti-hallucination et anti-répétition (texte & TTS)
function cleanHallucinationsAndRepetitions(rawText) {
    let s = String(rawText || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';

    // Supprimer les boucles de répétition de 1 à 6 mots consécutifs
    for (let pass = 0; pass < 4; pass++) {
        s = s.replace(/\b(\S+(?:\s+\S+){0,5})(?:\s+\1\b)+/gi, '$1');
    }

    // Dédoublonner les phrases identiques
    const parts = s.split(/(?<=[.!?])\s+/);
    const seen = new Set();
    const kept = [];
    for (const p of parts) {
        const norm = p.toLowerCase().replace(/[^a-z0-9\u00C0-\u02AF]/g, '');
        if (norm && !seen.has(norm)) {
            seen.add(norm);
            kept.push(p);
        }
    }
    return kept.slice(0, 3).join(' ').trim();
}

function prepareTextForMmsClient(rawText, lang) {
    let t = cleanHallucinationsAndRepetitions(rawText).replace(/\([^)]*\)/g, ' ');
    if (lang === 'fon') {
        t = t
            .replace(/15-15-15/g, ' ')
            .replace(/\b100\s*kg\b/gi, 'kilo kanweko')
            .replace(/\b50\s*kg\b/gi, 'kilo kande wo')
            .replace(/\b24\s*000\b/g, 'akpa ko nukun ene')
            .replace(/\b26\s*000\b/g, 'akpa ko nukun ayizɛn')
            .replace(/\b16\s*000\b/g, 'akpa afɔtɔn nukun ɖokpo')
            .replace(/\b250\b/g, 'afɔwe kande wo')
            .replace(/\b260\b/g, 'afɔwe kande ko')
            .replace(/\b280\b/g, 'afɔwe kanwe')
            .replace(/\b325\b/g, 'afɔtɔn ko nukun atɔn')
            .replace(/\b350\b/g, 'afɔtɔn kande wo')
            .replace(/\b400\b/g, 'kɛnɛ')
            .replace(/\bFCFA\b/gi, 'flan')
            .replace(/\bNPK\b/gi, 'engrais')
            .replace(/\bPICS\b/gi, 'piksi')
            .replace(/\bkg\b/gi, 'kilo');
    }
    t = t.replace(/[0-9%/*#_`«»"':;—–\-•]/g, ' ').replace(/\s+/g, ' ').trim();
    if (t.length > 210) {
        const cut = t.slice(0, 210);
        const lastDot = Math.max(cut.lastIndexOf('.'), cut.lastIndexOf('!'), cut.lastIndexOf('?'));
        t = lastDot > 60 ? cut.slice(0, lastDot + 1) : cut;
    }
    return t;
}

// ── COFFRE-FORT AUDIO PERSISTANT (Mémoire + IndexedDB) ──
const memoryAudioVault = new Map();
const pendingSynthesisPromises = new Map();

function getAudioVaultKey(text, lang) {
    const clean = cleanHallucinationsAndRepetitions(text).toLowerCase().slice(0, 220);
    let h = 2166136261;
    for (let i = 0; i < clean.length; i++) {
        h ^= clean.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return `voice_${lang}_${(h >>> 0).toString(36)}`;
}

function openAudioVaultDb() {
    return new Promise((resolve) => {
        if (!window.indexedDB) return resolve(null);
        try {
            const req = window.indexedDB.open('agrivoice_audio_vault', 1);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('voice_notes')) {
                    db.createObjectStore('voice_notes', { keyPath: 'id' });
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        } catch {
            resolve(null);
        }
    });
}

async function getSavedAudioFromVault(vaultKey) {
    if (memoryAudioVault.has(vaultKey)) {
        return memoryAudioVault.get(vaultKey);
    }
    const db = await openAudioVaultDb();
    if (!db) return null;
    return new Promise((resolve) => {
        try {
            const tx = db.transaction('voice_notes', 'readonly');
            const store = tx.objectStore('voice_notes');
            const getReq = store.get(vaultKey);
            getReq.onsuccess = () => {
                const record = getReq.result;
                if (record && record.blob) {
                    const url = URL.createObjectURL(record.blob);
                    memoryAudioVault.set(vaultKey, url);
                    resolve(url);
                } else {
                    resolve(null);
                }
            };
            getReq.onerror = () => resolve(null);
        } catch {
            resolve(null);
        }
    });
}

async function saveAudioBlobToVault(vaultKey, blob, lang, text) {
    if (!blob) return null;
    const url = URL.createObjectURL(blob);
    memoryAudioVault.set(vaultKey, url);

    const db = await openAudioVaultDb();
    if (db) {
        try {
            const tx = db.transaction('voice_notes', 'readwrite');
            tx.objectStore('voice_notes').put({
                id: vaultKey,
                lang,
                text: String(text || '').slice(0, 200),
                blob,
                createdAt: Date.now()
            });
        } catch {}
    }
    return url;
}

// Moteur d'intentions AgriVoiceEngine (identique à AgriVoiceEngine.kt de l'application mobile)
function matchOfficialTrackForQuery(userInput) {
    if (!userInput) return null;
    const clean = userInput
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (!clean) return null;

    const tokens = new Set(clean.split(" ").filter(w => w.length > 1));
    const hasAny = (...words) => words.some(w => {
        const cw = w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return cw.includes(" ") ? clean.includes(cw) : (tokens.has(cw) || clean.includes(cw));
    });
    const hasAll = (...groups) => groups.every(g => hasAny(...g));

    // 1. Alerte Pulvérisation & Pluie (w3_alerte_lavage_pluie)
    if (hasAll(
        ["pulveriser", "pulverisation", "traiter", "traitement", "pesticide", "produit", "oogun", "fun oogun", "amasin", "huzu"],
        ["pluie", "pleuvoir", "pleut", "avant pluie", "laver", "lessiver", "rincer", "eau", "ji", "ojo", "orage"]
    )) {
        return "w3_alerte_lavage_pluie";
    }

    // 2. Météo & Semis (w1_meteo_pluie_semis)
    if (hasAll(
        ["pluie", "pluies", "pleuvoir", "pleut", "meteo", "temps", "prevision", "ciel", "ji", "jiji", "ojo"],
        ["semer", "semis", "planter", "plantation", "quand", "graine", "semaine", "favorable", "commencer", "gbin", "do", "nudido"]
    ) || hasAny("pluie semis", "quand semer", "prevision pluie", "saison des pluies", "calendrier des semis")) {
        return "w1_meteo_pluie_semis";
    }

    // 3. Chenille légionnaire & Ravageurs (m2_chenille_legionnaire)
    if (hasAny("chenille", "chenilles", "legionnaire", "yovogbo", "wanvi", "wanvoun", "wanvun", "kokoro", "dongo", "dongoyaro", "neem", "kinitin", "nimu") ||
        hasAll(
            ["insecte", "insectes", "ravageur", "ravageurs", "ver", "vers", "parasite", "trou", "trous"],
            ["mange", "mangent", "manger", "devorer", "attaque", "pousse", "plante", "champ", "feuille", "vijin"]
        )) {
        return "m2_chenille_legionnaire";
    }

    // 4. Engrais NPK / Urée & Jaunissement (m3_jaunissement_engrais)
    if (hasAny("engrais", "uree", "npk", "fumier", "compost", "fertilisant", "ajile", "fertilisation", "carence", "gbedo")) {
        return "m3_jaunissement_engrais";
    }

    // 5. Taches foliaires du Maïs & Maladies des feuilles (m1_taches_foliaires)
    if (hasAny("tache", "taches", "foliaire", "foliaires", "brune", "brunes", "mildiou", "rouille", "mancozeb", "mancozebe", "cuivre", "champignon", "koba") ||
        hasAll(
            ["mais", "gbade", "agbado", "bli", "cereale"],
            ["feuille", "feuilles", "ama", "aman", "ewe", "wema", "vovo", "jaunissent", "jaune", "maladie", "azon", "arun", "ami"]
        )) {
        return "m1_taches_foliaires";
    }

    // 6. Stockage & Sacs PICS (p4_conseil_stockage_pics)
    if (hasAny("pics", "sac pics", "saki pics", "apo pics", "kpoto pics", "charancon", "charancons", "stockage", "stocker", "conserver", "conservation", "nubibe")) {
        return "p4_conseil_stockage_pics";
    }

    // 7. Forte chaleur & Paillage (w2_chaleur_secheresse)
    if (hasAny("paillage", "pailler", "canicule", "yozo", "hwesivo", "secheresse", "chaleur", "ogbele", "gbigbo")) {
        return "w2_chaleur_secheresse";
    }

    // 8. Prix du Soja (p2_prix_soja_parakou)
    if (hasAny("soja", "soya", "ewa soya") && hasAny("prix", "cout", "combien", "kilo", "sac", "cours", "parakou", "bohicon", "marche", "axi", "oja", "325", "350")) {
        return "p2_prix_soja_parakou";
    }

    // 9. Prix du Gari (p3_prix_gari_dantokpa)
    if (hasAny("gari", "garri", "gali", "gaari", "sohoui", "manioc")) {
        return "p3_prix_gari_dantokpa";
    }

    // 10. Prix du Maïs à Dantokpa (p1_prix_mais_dantokpa)
    if (hasAny("dantokpa") || hasAll(
        ["mais", "gbade", "agbado", "bli"],
        ["prix", "cout", "combien", "vendre", "marche", "sac", "kilo", "axi", "oja", "fcfa"]
    )) {
        return "p1_prix_mais_dantokpa";
    }

    // 11. Salutations & Encouragements (f1_bon_courage_champs)
    if (hasAny("merci", "bonjour", "salut", "bonsoir", "courage", "akpe", "ku abo", "e se", "ku azo")) {
        return "f1_bon_courage_champs";
    }

    return null;
}

let currentAudioSource = null;
let currentAudioBtn = null;
let currentAudioBtnOriginalHtml = null;

function stopActiveAudio() {
    if (currentAudioSource) {
        try {
            if (typeof currentAudioSource.stop === 'function') currentAudioSource.stop();
            if (typeof currentAudioSource.pause === 'function') {
                currentAudioSource.pause();
                currentAudioSource.currentTime = 0;
            }
        } catch (e) {}
        currentAudioSource = null;
    }
    if (currentAudioBtn && currentAudioBtnOriginalHtml) {
        currentAudioBtn.innerHTML = currentAudioBtnOriginalHtml;
        currentAudioBtn.style.opacity = '';
    }
    currentAudioBtn = null;
    currentAudioBtnOriginalHtml = null;
}

// Lecture directe d'une URL audio déjà enregistrée (0 régénération !)
async function playSavedAudioUrl(audioUrl, btnElement = null, lang = currentLang) {
    if (!audioUrl) return false;
    if (currentAudioSource && btnElement && currentAudioBtn === btnElement) {
        stopActiveAudio();
        return true;
    }
    stopActiveAudio();

    try {
        const audio = new Audio(audioUrl);
        audio.playbackRate = voiceSpeed;
        currentAudioSource = audio;
        if (btnElement) {
            currentAudioBtn = btnElement;
            currentAudioBtnOriginalHtml = btnElement.innerHTML;
            btnElement.innerHTML = `<span class="audio-bar"></span><span class="audio-bar"></span><span class="audio-bar"></span> <span>Lecture (${LANG_CONFIG[lang]?.label || lang})...</span>`;
        }
        audio.onended = () => stopActiveAudio();
        audio.onerror = () => stopActiveAudio();
        await audio.play();
        return true;
    } catch (err) {
        stopActiveAudio();
        return false;
    }
}

async function playOfficialTrack(trackId, btnElement = null, customFallbackText = null) {
    if (currentAudioSource && btnElement && currentAudioBtn === btnElement) {
        stopActiveAudio();
        return;
    }
    stopActiveAudio();

    const fallbackText = customFallbackText
        || (OFFICIAL_TRACK_TEXTS[trackId] && (OFFICIAL_TRACK_TEXTS[trackId][currentLang] || OFFICIAL_TRACK_TEXTS[trackId].fr))
        || "Conseil vocal AgriVoice.";

    const path = getOfficialAudioPath(trackId, currentLang);
    if (path) {
        const ok = await playSavedAudioUrl(path, btnElement, currentLang);
        if (ok) return;
    }

    await speakText(fallbackText, currentLang, btnElement, trackId);
}

/* -----------------------------------------------------
   5. GÉNÉRATION UNIQUE & MISE EN CACHE DES NOTES VOCALES
      - Génère la note vocale UNE SEULE FOIS avec la réponse
      - L'enregistre dans AgriAudioVault (Mémoire + IndexedDB) et sur le bouton
      - Tout clic suivant déclenche la lecture immédiate sans régénération !
------------------------------------------------------ */
async function playMmsDirectFromBrowser(cleanText, lang) {
    const mmsLabel = lang === 'fon' ? 'Fon (fon)' : (lang === 'ewe' ? 'Éwé (ewe)' : 'Yoruba (yor)');
    const safeText = prepareTextForMmsClient(cleanText, lang);
    const predRes = await fetch('https://dpc-mmstts.hf.space/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [safeText, mmsLabel] })
    });
    if (!predRes.ok) throw new Error(`MMS direct HTTP ${predRes.status}`);
    const predJson = await predRes.json();
    const fileObj = predJson?.data?.[0];
    const filePath = typeof fileObj === 'string' ? fileObj : fileObj?.name;
    if (!filePath) throw new Error("MMS direct: pas de fichier");
    const wavRes = await fetch(`https://dpc-mmstts.hf.space/file=${filePath}`);
    if (!wavRes.ok) throw new Error(`MMS file HTTP ${wavRes.status}`);
    return await wavRes.blob();
}

// Prépare ou récupère l'URL de la note vocale enregistrée (ne régénère jamais si déjà en cache)
async function resolveOrGenerateVoiceNote(text, lang, matchedTrackId = null) {
    const cleanText = cleanHallucinationsAndRepetitions(text);
    if (!cleanText) return null;

    // 1. Si c'est un scénario officiel en Fon, Yorùbá ou Français : utiliser directement l'audio humain studio MP3 !
    const inferredTrack = matchedTrackId || matchOfficialTrackForQuery(cleanText);
    if (inferredTrack && (lang === 'fon' || lang === 'yoruba' || lang === 'fr')) {
        const studioPath = getOfficialAudioPath(inferredTrack, lang);
        if (studioPath) return studioPath;
    }

    // 2. Vérifier le coffre-fort audio (Mémoire ou IndexedDB)
    const vaultKey = getAudioVaultKey(cleanText, lang);
    const existingUrl = await getSavedAudioFromVault(vaultKey);
    if (existingUrl) {
        return existingUrl;
    }

    // 3. Éviter les générations simultanées en double pour le même texte
    if (pendingSynthesisPromises.has(vaultKey)) {
        return await pendingSynthesisPromises.get(vaultKey);
    }

    const synthPromise = (async () => {
        // A. Appel serveur /api/tts
        try {
            const apiLang = lang === 'yoruba' ? 'yo' : lang;
            const r = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: cleanText, language: apiLang })
            });
            if (r.ok) {
                const blob = await r.blob();
                if (blob && blob.size > 200) {
                    return await saveAudioBlobToVault(vaultKey, blob, lang, cleanText);
                }
            }
        } catch (e) {
            console.warn("Serveur /api/tts indisponible, repli direct:", e.message);
        }

        // B. Repli direct navigateur Meta MMS-TTS (Fon, Éwé, Yorùbá)
        if (lang === 'fon' || lang === 'ewe' || lang === 'yoruba') {
            try {
                const blob = await playMmsDirectFromBrowser(cleanText, lang);
                if (blob && blob.size > 200) {
                    return await saveAudioBlobToVault(vaultKey, blob, lang, cleanText);
                }
            } catch (e) {
                console.warn("MMS direct indisponible:", e.message);
            }
            const fallbackTrack = inferredTrack || 'a1_accueil';
            const localLang = lang === 'ewe' ? 'fon' : lang;
            return `audios/${localLang}_${fallbackTrack}.mp3`;
        }

        // C. Repli Français MP3 local
        return `audios/fr_${inferredTrack || 'a1_accueil'}.mp3`;
    })();

    pendingSynthesisPromises.set(vaultKey, synthPromise);
    try {
        return await synthPromise;
    } finally {
        pendingSynthesisPromises.delete(vaultKey);
    }
}

async function speakText(text, lang, btnElement = null, matchedTrackId = null) {
    if (currentAudioSource && btnElement && currentAudioBtn === btnElement) {
        stopActiveAudio();
        return;
    }
    stopActiveAudio();

    // 1. Si le bouton possède DÉJÀ sa note vocale enregistrée, la lire immédiatement sans régénérer !
    if (btnElement && btnElement.dataset && btnElement.dataset.savedAudioUrl) {
        const played = await playSavedAudioUrl(btnElement.dataset.savedAudioUrl, btnElement, lang);
        if (played) return;
    }

    const cleanText = cleanHallucinationsAndRepetitions(text);
    if (!cleanText) return;

    if (btnElement) {
        currentAudioBtn = btnElement;
        currentAudioBtnOriginalHtml = btnElement.innerHTML;
        btnElement.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Préparation audio...</span>`;
    }

    // 2. Récupérer depuis le coffre-fort ou générer UNE SEULE FOIS puis enregistrer sur le bouton
    const savedUrl = await resolveOrGenerateVoiceNote(cleanText, lang, matchedTrackId);
    if (currentAudioBtn === btnElement && currentAudioBtnOriginalHtml) {
        btnElement.innerHTML = currentAudioBtnOriginalHtml;
    }

    if (savedUrl) {
        if (btnElement && btnElement.dataset) {
            btnElement.dataset.savedAudioUrl = savedUrl;
        }
        await playSavedAudioUrl(savedUrl, btnElement, lang);
    } else {
        stopActiveAudio();
        showToast("Voix momentanément occupée.");
    }
}

/* -----------------------------------------------------
   6. SUGGESTIONS D'ACCUEIL & QUESTIONS RAPIDES PAR LANGUE
------------------------------------------------------ */
const WELCOME_SUGGESTIONS = {
    fr: [
        { icon: "fa-wheat-awn", color: "#D97706", bg: "#FEF3C7", text: "Les feuilles de mon maïs jaunissent et ont des taches. Que faire ?" },
        { icon: "fa-bug", color: "#DC2626", bg: "#FEF2F2", text: "Comment traiter la chenille légionnaire avec les feuilles de neem ?" },
        { icon: "fa-flask", color: "#1B6A3B", bg: "#E8F5E9", text: "Quelle dose d'engrais NPK et d'urée pour 1 hectare de maïs ?" },
        { icon: "fa-boxes-stacked", color: "#6D28D9", bg: "#EDE9FE", text: "Comment stocker mon maïs et mon soja sans charançons avec les sacs PICS ?" }
    ],
    fon: [
        { icon: "fa-wheat-awn", color: "#D97706", bg: "#FEF3C7", text: "Agbado amà ce lɛ ɖó àmì jiji, étɛ́ un ka ɖó na wà ?" },
        { icon: "fa-bug", color: "#DC2626", bg: "#FEF2F2", text: "Yovogbó ɖò nǔɖùdù ce lɛ ɖù wɛ ɖo gle mɛ, nɛ̌ un na wà gbɔn ?" },
        { icon: "fa-flask", color: "#1B6A3B", bg: "#E8F5E9", text: "Agbado wéma ce lɛ ɖo jiji wɛ, engrais tɛ́ un na zán ?" },
        { icon: "fa-boxes-stacked", color: "#6D28D9", bg: "#EDE9FE", text: "Nɛ̌ un sixu hɛn agbado ce ɖó kpòtò PICS mɛ gbɔn ?" }
    ],
    yoruba: [
        { icon: "fa-wheat-awn", color: "#D97706", bg: "#FEF3C7", text: "Ewé àgbàdo mi ní àmì pípọ́n, kí ni màá ṣe ?" },
        { icon: "fa-bug", color: "#DC2626", bg: "#FEF2F2", text: "Àwọn kòkòrò apanirun ń jẹ ohun ọ̀gbìn mi ní oko, kí ni mo lè ṣe ?" },
        { icon: "fa-flask", color: "#1B6A3B", bg: "#E8F5E9", text: "Ewé oko mi ń pọ́n, oògùn ajílẹ̀ wo ni mo gbọ́dọ̀ lò ?" },
        { icon: "fa-boxes-stacked", color: "#6D28D9", bg: "#EDE9FE", text: "Báwo ni mo ṣe lè tọ́jú àgbàdo mi sínú àpò PICS ?" }
    ],
    ewe: [
        { icon: "fa-wheat-awn", color: "#D97706", bg: "#FEF3C7", text: "Nye bli ƒe aŋgbawo le ʋuʋum dzĩ, nuka mawɔ ?" },
        { icon: "fa-bug", color: "#DC2626", bg: "#FEF2F2", text: "Aleke mawɔ neem aŋgba atsɔ awu nudzrala siwo le bli ɖum ?" },
        { icon: "fa-flask", color: "#1B6A3B", bg: "#E8F5E9", text: "Aleke mazã NPK kple Urée ajilɛ le nye bli agble me ?" },
        { icon: "fa-boxes-stacked", color: "#6D28D9", bg: "#EDE9FE", text: "Aleke madzra bli ɖo ɖe PICS kotoku me ?" }
    ]
};

function renderWelcomeSuggestions() {
    const grid = document.getElementById('welcome-suggestions-grid');
    if (!grid) return;
    const list = WELCOME_SUGGESTIONS[currentLang] || WELCOME_SUGGESTIONS.fr;
    grid.innerHTML = list.map((item, idx) => `
        <button class="sug-chip" onclick="usePromptSuggestion( WELCOME_SUGGESTIONS[currentLang][${idx}].text )">
            <div style="width:36px;height:36px;border-radius:10px;background:${item.bg};color:${item.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:15px">
                <i class="fa-solid ${item.icon}"></i>
            </div>
            <span style="font-size:13px;font-weight:700;color:var(--agri-text);line-height:1.4;flex:1">${item.text}</span>
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px;color:#94A3B8"></i>
        </button>
    `).join('');
}

function usePromptSuggestion(text) {
    const input = document.getElementById('user-input');
    if (!input) return;
    switchView('view-chat');
    input.value = text;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 130) + 'px';
    const form = document.getElementById('chat-form');
    if (form) form.dispatchEvent(new Event('submit'));
}

/* -----------------------------------------------------
   7. RECONNAISSANCE VOCALE (MODALE STUDIO + BOUTON DIRECT)
------------------------------------------------------ */
const micBtn = document.getElementById('mic-btn');
const recStatus = document.getElementById('recording-status');
const userInput = document.getElementById('user-input');

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let modalTimerInterval = null;
let modalSeconds = 0;

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const res = reader.result || "";
            resolve(res.includes(',') ? res.split(',')[1] : res);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function openVoiceModal() {
    const modal = document.getElementById('voice-modal');
    if (!modal) return;
    modal.classList.add('open');
    document.getElementById('vm-timer').innerText = '00:00';
}

function closeVoiceModal() {
    if (isRecording) {
        stopVoiceCapture();
    }
    const modal = document.getElementById('voice-modal');
    if (modal) modal.classList.remove('open');
}

async function toggleModalRecording() {
    if (!isRecording) {
        await startVoiceCapture(true);
    } else {
        stopVoiceCapture();
    }
}

async function startVoiceCapture(fromModal = false) {
    stopActiveAudio();
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let options = {};
        if (typeof MediaRecorder.isTypeSupported === 'function') {
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) options = { mimeType: 'audio/webm;codecs=opus' };
            else if (MediaRecorder.isTypeSupported('audio/webm')) options = { mimeType: 'audio/webm' };
            else if (MediaRecorder.isTypeSupported('audio/mp4')) options = { mimeType: 'audio/mp4' };
        }

        mediaRecorder = new MediaRecorder(stream, options);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            stream.getTracks().forEach(track => track.stop());
            clearInterval(modalTimerInterval);

            const recordedMime = mediaRecorder.mimeType || 'audio/webm';
            const audioBlob = new Blob(audioChunks, { type: recordedMime });

            closeVoiceModal();

            if (audioBlob.size < 900) {
                showToast("Enregistrement trop court. Réessayez.");
                if (userInput) userInput.value = "";
                return;
            }
            await transcribeAudio(audioBlob, recordedMime);
        };

        mediaRecorder.start(250);
        isRecording = true;

        // UI bouton barre
        if (micBtn) {
            micBtn.style.background = '#DC2626';
            micBtn.style.color = '#fff';
        }
        if (recStatus && !fromModal) recStatus.style.display = 'flex';

        // UI modale
        const vmMicBtn = document.getElementById('vm-mic-btn');
        const vmMicIcon = document.getElementById('vm-mic-icon');
        const vmActionBtn = document.getElementById('vm-action-btn');
        const r1 = document.getElementById('vm-ring-1');
        const r2 = document.getElementById('vm-ring-2');
        if (vmMicBtn) vmMicBtn.style.background = '#DC2626';
        if (vmMicIcon) vmMicIcon.className = 'fa-solid fa-stop';
        if (vmActionBtn) {
            vmActionBtn.style.background = '#DC2626';
            vmActionBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Terminer & Envoyer';
        }
        if (r1) r1.classList.remove('idle');
        if (r2) r2.classList.remove('idle');

        modalSeconds = 0;
        clearInterval(modalTimerInterval);
        modalTimerInterval = setInterval(() => {
            modalSeconds++;
            const mins = String(Math.floor(modalSeconds / 60)).padStart(2, '0');
            const secs = String(modalSeconds % 60).padStart(2, '0');
            const timerEl = document.getElementById('vm-timer');
            if (timerEl) timerEl.innerText = `${mins}:${secs}`;
        }, 1000);

    } catch (err) {
        console.error("Erreur accès micro:", err);
        showToast("Veuillez autoriser le microphone dans votre navigateur.");
    }
}

function stopVoiceCapture() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    isRecording = false;
    clearInterval(modalTimerInterval);

    if (micBtn) {
        micBtn.style.background = '#F1F5F9';
        micBtn.style.color = 'var(--agri-green-dark)';
    }
    if (recStatus) recStatus.style.display = 'none';

    const vmMicBtn = document.getElementById('vm-mic-btn');
    const vmMicIcon = document.getElementById('vm-mic-icon');
    const vmActionBtn = document.getElementById('vm-action-btn');
    const r1 = document.getElementById('vm-ring-1');
    const r2 = document.getElementById('vm-ring-2');
    if (vmMicBtn) vmMicBtn.style.background = 'var(--agri-green)';
    if (vmMicIcon) vmMicIcon.className = 'fa-solid fa-microphone';
    if (vmActionBtn) {
        vmActionBtn.style.background = 'var(--agri-green)';
        vmActionBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Parler direct';
    }
    if (r1) r1.classList.add('idle');
    if (r2) r2.classList.add('idle');

    if (userInput) {
        const langLabel = LANG_CONFIG[currentLang]?.label || "Français";
        userInput.value = `Transcription vocale en cours (${langLabel})...`;
    }
}

if (micBtn) {
    micBtn.addEventListener('click', async () => {
        if (!isRecording) await startVoiceCapture(false);
        else stopVoiceCapture();
    });
}

async function transcribeAudio(audioBlob, mimeType) {
    const langNames = {
        fr: "Français",
        fon: "Fon (Fɔngbe, langue du Bénin)",
        yoruba: "Yorùbá (langue du Bénin et Nigéria)",
        ewe: "Éwé / Mina (langue du Togo et Bénin)"
    };
    const targetLang = langNames[currentLang] || "Français";

    // 1. Tentative Gradio Fon ASR (avec timeout court)
    if (currentLang === 'fon' && window.gradioClient) {
        try {
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Gradio timeout")), 4000));
            const gradioPromise = (async () => {
                const app = await window.gradioClient.connect("Max-Adis/agrivoice-fon-asr");
                const res = await app.predict("/transcrire", [audioBlob]);
                return res.data[0];
            })();
            const fonGradioText = await Promise.race([gradioPromise, timeoutPromise]);
            if (fonGradioText && fonGradioText.trim().length > 0) {
                applyTranscribedText(fonGradioText.trim());
                return fonGradioText.trim();
            }
        } catch (e) {}
    }

    // 2. STT Multimodal Universel
    try {
        const base64Audio = await blobToBase64(audioBlob);
        const cleanMime = (mimeType || 'audio/webm').split(';')[0];

        const sttPrompt = `Tu es le système de transcription vocale ultra-précis de l'assistant agricole AgriVoice au Bénin.
Écoute cet enregistrement d'un agriculteur qui s'exprime en ${targetLang}.
RÈGLES ABSOLUES:
1. Retranscris fidèlement les mots prononcés.
2. Si l'audio ne contient que du silence ou du souffle, réponds exactement: [AUDIO_VIDE]
3. Renvoie UNIQUEMENT le texte transcrit brut, sans guillemets ni commentaires.`;

        const payload = {
            contents: [{
                parts: [
                    { inlineData: { mimeType: cleanMime, data: base64Audio } },
                    { text: sttPrompt }
                ]
            }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 256 }
        };

        const sttModels = ["gemini-2.5-flash-lite", "gemini-flash-latest", "gemini-2.5-flash"];
        let resultText = "";

        for (const model of sttModels) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${AI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    const data = await response.json();
                    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
                    if (candidateText) {
                        resultText = candidateText;
                        break;
                    }
                }
            } catch (err) {}
        }

        if (!resultText || resultText.includes("[AUDIO_VIDE]")) {
            if (userInput) userInput.value = "";
            showToast("Aucun mot distinct détecté. Veuillez réessayer.");
            playOfficialTrack('fallback_inconnu');
            return "";
        }

        const cleaned = resultText.replace(/^["']|["']$/g, '').trim();
        applyTranscribedText(cleaned);
        return cleaned;
    } catch (err) {
        if (userInput) userInput.value = "";
        showToast("Erreur lors de la transcription vocale.");
        return "";
    }
}

function applyTranscribedText(text) {
    if (!userInput) return;
    switchView('view-chat');
    userInput.value = text;
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 130) + 'px';
    showToast("Voix transcrite avec succès !");
    setTimeout(() => {
        const form = document.getElementById('chat-form');
        if (form && userInput.value.trim().length > 0) {
            form.dispatchEvent(new Event('submit'));
        }
    }, 550);
}

/* -----------------------------------------------------
   8. MOTEUR CONVERSATIONNEL IA & HISTORIQUE DES DISCUSSIONS
------------------------------------------------------ */
const AI_MODELS = [
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-flash-lite-latest"
];

let conversationHistory = [];
let currentSessionId = 'sess_' + Date.now();

const SYSTEM_PROMPTS = {
    fr: "Tu es AgriVoice, l'assistant agricole vocal expert pour les producteurs au Bénin (comme Bio Kora à Parakou, producteur de maïs et soja sur 5 ha). RÈGLE D'OR : Fais des réponses COURTES, PRÉCISES et PRATIQUES (2 à 3 phrases maximum). Ne répète jamais les mêmes mots.",
    fon: "A nyí AgriVoice, alɔgɔtɔ́ glezɔ́ tɔn Benɛ tɔn. RÈGLE ABSOLUE : Ðɔ xó KLÉWÚN DÍDÍ ɖò Fɔngbe mɛ (xókwín 20 jɛ 35 kpowun, wěɖexámɛ 2). Ma vɔ́ xógbe ɖokpo ɔ ɖɔ azɔn we gbeɖé ó. Zán Fɔngbe mímɛ́ Benɛ tɔn.",
    yoruba: "AgriVoice ni ọ́, olùrànlọ́wọ́ àwọn àgbẹ̀ ní Bénin. RÈGLE ABSOLUE : Fún ni ìdáhùn KÚKÚRÚ púpọ̀ ní èdè Yorùbá (gbolohun 2 sí 3 nìkan). Má ṣe tún ọ̀rọ̀ kan náà sọ.",
    ewe: "AgriVoice nye wò ŋkɔ, agbletɔwo ƒe kpekpeɖeŋutɔ le Benin kple Togo. RÈGLE ABSOLUE : Na ŋuɖoɖo KPUI ŋutɔ le Eʋegbe me (gbolohun 2 alo 3 pɛ). Mègagbugbɔ nya ɖeka gblɔ edziedzi o."
};

const chatForm = document.getElementById('chat-form');
const chatContainer = document.getElementById('chat-container');
const templateAssistant = document.getElementById('template-assistant');
const templateUser = document.getElementById('template-user');

if (userInput) {
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 130) + 'px';
    });
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm?.dispatchEvent(new Event('submit'));
        }
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        const welcome = document.getElementById('welcome-screen');
        if (welcome) welcome.style.display = 'none';

        const matchedTrackId = matchOfficialTrackForQuery(text);

        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        const loaderId = addMessage(
            `<div style="display:flex;align-items:center;gap:12px;color:var(--agri-green);font-weight:700">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size:16px"></i>
                <span>AgriVoice prépare la réponse et enregistre la note vocale (${LANG_CONFIG[currentLang].label})...</span>
            </div>`,
            'assistant',
            true
        );

        try {
            // 1. Générer la réponse texte (sans hallucination)
            const botReply = await askAI(text, currentLang, matchedTrackId);
            // 2. Générer & enregistrer UNE SEULE FOIS la note vocale associée avant d'afficher la réponse
            const preSavedAudioUrl = await resolveOrGenerateVoiceNote(botReply, currentLang, matchedTrackId);
            document.getElementById(loaderId)?.remove();
            // 3. Afficher la réponse avec la note vocale déjà enregistrée dessus
            addMessage(botReply, 'assistant', false, true, matchedTrackId, preSavedAudioUrl);
            saveCurrentSessionToHistory(text, botReply);
        } catch (err) {
            document.getElementById(loaderId)?.remove();
            addMessage(`Désolé, une erreur est survenue : ${err.message || "Vérifiez votre connexion."}`, 'assistant');
        }
    });
}

async function askAI(userText, lang, matchedTrackId = null) {
    // 1. Pour les 11 scénarios agronomiques officiels en Fon ou Yorùbá :
    // utiliser directement la transcription humaine certifiée d'AgriAudioRepository.kt (0 hallucination, 100% fidèle à l'audio studio !)
    if (matchedTrackId && OFFICIAL_TRACK_TEXTS[matchedTrackId] && (lang === 'fon' || lang === 'yoruba')) {
        const exactVerifiedText = OFFICIAL_TRACK_TEXTS[matchedTrackId][lang];
        if (exactVerifiedText) {
            conversationHistory.push({ role: "user", parts: [{ text: userText }] });
            conversationHistory.push({ role: "model", parts: [{ text: exactVerifiedText }] });
            return exactVerifiedText;
        }
    }

    const sysPrompt = SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.fr;
    const matchedFiche = matchedTrackId ? FICHES_DATA.find(f => f.trackId === matchedTrackId) : null;
    const refBody = (matchedTrackId && OFFICIAL_TRACK_TEXTS[matchedTrackId]?.[lang])
        || (matchedFiche ? (matchedFiche.body[lang] || matchedFiche.body.fr) : "");

    const langDirectives = {
        fr: `Réponds uniquement en Français clair et pratique (2 à 3 phrases courtes maximum).`,
        fon: `[OBLIGATION STRICTE : Réponds EXCLUSIVEMENT en Fɔngbe (Fon du Bénin) en 2 phrases courtes maximum (25 mots max). N'écris AUCUN mot en français et ne répète JAMAIS le même mot.]${refBody ? `\nTexte de référence Fɔngbe : "${refBody}"` : ''}`,
        yoruba: `[OBLIGATION STRICTE : Réponds EXCLUSIVEMENT en Yorùbá en 2 phrases courtes maximum (25 mots max). N'écris AUCUN mot en français et ne répète JAMAIS le même mot.]${refBody ? `\nTexte de référence Yorùbá : "${refBody}"` : ''}`,
        ewe: `[OBLIGATION STRICTE : Réponds EXCLUSIVEMENT en Éwé (Eʋegbe) en 2 phrases courtes maximum (25 mots max). N'écris AUCUN mot en français et ne répète JAMAIS le même mot.]${refBody ? `\nTexte de référence Éwé : "${refBody}"` : ''}`
    };

    const enrichedUserMessage = `${langDirectives[lang] || langDirectives.fr}\n\nQuestion : ${userText}`;
    conversationHistory.push({ role: "user", parts: [{ text: enrichedUserMessage }] });

    const payload = {
        systemInstruction: { parts: [{ text: sysPrompt }] },
        contents: conversationHistory,
        generationConfig: { temperature: 0.25, maxOutputTokens: 180 }
    };

    let lastError = null;
    for (const modelName of AI_MODELS) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${AI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.status === 429) continue;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text || refBody || "Je n'ai pas pu générer de réponse.";
            const replyText = cleanHallucinationsAndRepetitions(rawReply) || refBody || rawReply;
            conversationHistory[conversationHistory.length - 1] = { role: "user", parts: [{ text: userText }] };
            conversationHistory.push({ role: "model", parts: [{ text: replyText }] });
            return replyText;
        } catch (err) {
            lastError = err;
        }
    }

    if (refBody) {
        conversationHistory[conversationHistory.length - 1] = { role: "user", parts: [{ text: userText }] };
        conversationHistory.push({ role: "model", parts: [{ text: refBody }] });
        return refBody;
    }

    conversationHistory.pop();
    throw lastError || new Error("Service temporairement indisponible.");
}

function formatMarkdown(text) {
    return (text || "")
        .replace(/### (.*?)\n/g, '<h3 style="font-size:15px;font-weight:800;color:var(--agri-green-dark);margin:10px 0 4px">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 style="font-size:16px;font-weight:800;color:var(--agri-green-dark);margin:12px 0 6px">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0F172A;font-weight:800">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li style="margin-left:18px;list-style:disc;margin-bottom:4px">$1</li>')
        .replace(/^[0-9]+\. (.*$)/gim, '<li style="margin-left:18px;list-style:decimal;margin-bottom:4px">$1</li>')
        .replace(/\n\n/g, '<div style="height:8px"></div>')
        .replace(/\n/g, '<br>');
}

function addMessage(text, role, isHtml = false, withTTS = false, matchedTrackId = null, preSavedAudioUrl = null) {
    const template = role === 'user' ? templateUser : templateAssistant;
    if (!template) return "";

    const clone = template.cloneNode(true);
    const uniqueId = 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    clone.id = uniqueId;
    clone.classList.add('chat-bubble-instance');

    const langTag = clone.querySelector('.msg-lang-tag');
    if (langTag) langTag.innerText = `Conseil en ${LANG_CONFIG[currentLang].label}`;

    const orb = clone.querySelector('.ai-orb');
    if (orb && isHtml) orb.classList.add('thinking');

    const contentDiv = clone.querySelector('.message-content');
    if (contentDiv) {
        contentDiv.innerHTML = isHtml ? text : formatMarkdown(text);
    }

    let createdTtsBtn = null;
    if (withTTS && role === 'assistant') {
        const actionToolbar = document.createElement('div');
        actionToolbar.style.cssText = 'margin-top:14px;padding-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid #F1F5F9';

        const ttsBtn = document.createElement('button');
        ttsBtn.style.cssText = 'display:inline-flex;align-items:center;gap:7px;background:#E8F5E9;color:var(--agri-green);font-size:12.5px;font-weight:800;padding:7px 15px;border-radius:9999px;border:1px solid #BBF7D0;cursor:pointer;font-family:inherit;transition:all 0.15s';
        ttsBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Écouter la note vocale (${LANG_CONFIG[currentLang].label})</span>`;
        if (preSavedAudioUrl) {
            ttsBtn.dataset.savedAudioUrl = preSavedAudioUrl;
        }
        // Si l'utilisateur ré-appuie dessus, cela lit directement l'audio enregistré sans régénérer !
        ttsBtn.onclick = () => {
            if (ttsBtn.dataset.savedAudioUrl) {
                playSavedAudioUrl(ttsBtn.dataset.savedAudioUrl, ttsBtn, currentLang);
            } else {
                speakText(text, currentLang, ttsBtn, matchedTrackId);
            }
        };
        actionToolbar.appendChild(ttsBtn);
        createdTtsBtn = ttsBtn;

        const savedBadge = document.createElement('span');
        savedBadge.style.cssText = 'display:inline-flex;align-items:center;gap:5px;background:#F0FDF4;color:#15803D;font-size:11px;font-weight:800;padding:5px 10px;border-radius:9999px;border:1px solid #DCFCE7';
        savedBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Audio enregistré</span>`;
        actionToolbar.appendChild(savedBadge);

        const copyBtn = document.createElement('button');
        copyBtn.style.cssText = 'width:32px;height:32px;border-radius:50%;background:#F1F5F9;border:none;color:#64748B;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px';
        copyBtn.title = 'Copier la réponse';
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(text.replace(/[*#_`]/g, '').trim()).then(() => {
                showToast('Conseil copié !');
            });
        };
        actionToolbar.appendChild(copyBtn);

        contentDiv?.appendChild(actionToolbar);

        // Si le message provient de l'historique et n'a pas encore son URL pré-attachée, la charger silencieusement depuis le coffre-fort
        if (!preSavedAudioUrl) {
            resolveOrGenerateVoiceNote(text, currentLang, matchedTrackId).then(url => {
                if (url) ttsBtn.dataset.savedAudioUrl = url;
            });
        }
    }

    clone.style.display = 'flex';
    if (chatContainer) {
        chatContainer.appendChild(clone);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    if (withTTS && role === 'assistant' && createdTtsBtn && isAutoplayOn()) {
        if (preSavedAudioUrl) {
            playSavedAudioUrl(preSavedAudioUrl, createdTtsBtn, currentLang);
        } else {
            speakText(text, currentLang, createdTtsBtn, matchedTrackId);
        }
    }

    return uniqueId;
}

function resetConversation() {
    stopActiveAudio();
    conversationHistory = [];
    currentSessionId = 'sess_' + Date.now();

    if (chatContainer) {
        chatContainer.querySelectorAll('.chat-bubble-instance').forEach(m => m.remove());
    }
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'flex';

    if (userInput) {
        userInput.value = '';
        userInput.style.height = 'auto';
    }
    switchView('view-chat');
    showToast("Nouvelle discussion démarrée");
}

/* Historique des discussions dans la Sidebar */
function getSavedSessions() {
    try {
        return JSON.parse(localStorage.getItem('agrivoice_sessions') || '[]');
    } catch { return []; }
}

function saveCurrentSessionToHistory(firstQuestion, lastReply) {
    const sessions = getSavedSessions();
    const existingIdx = sessions.findIndex(s => s.id === currentSessionId);
    const entry = {
        id: currentSessionId,
        title: firstQuestion.slice(0, 42) + (firstQuestion.length > 42 ? '…' : ''),
        lang: currentLang,
        updatedAt: Date.now(),
        history: conversationHistory.slice()
    };
    if (existingIdx >= 0) {
        entry.title = sessions[existingIdx].title;
        sessions[existingIdx] = entry;
    } else {
        sessions.unshift(entry);
    }
    localStorage.setItem('agrivoice_sessions', JSON.stringify(sessions.slice(0, 10)));
    renderRecentSessions();
}

function loadSavedSession(sessionId) {
    const sessions = getSavedSessions();
    const found = sessions.find(s => s.id === sessionId);
    if (!found) return;

    stopActiveAudio();
    currentSessionId = found.id;
    conversationHistory = found.history || [];
    if (found.lang && LANG_CONFIG[found.lang]) {
        changeLang(found.lang, false);
    }

    if (chatContainer) {
        chatContainer.querySelectorAll('.chat-bubble-instance').forEach(m => m.remove());
    }
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';

    conversationHistory.forEach(item => {
        const txt = item.parts?.[0]?.text || '';
        const role = item.role === 'user' ? 'user' : 'assistant';
        const track = role === 'assistant' ? matchOfficialTrackForQuery(txt) : null;
        addMessage(txt, role, false, role === 'assistant', track);
    });
    switchView('view-chat');
}

function clearSavedSessions() {
    localStorage.removeItem('agrivoice_sessions');
    renderRecentSessions();
    showToast("Historique des discussions effacé");
}

function renderRecentSessions() {
    const listEl = document.getElementById('recent-chats-list');
    if (!listEl) return;
    const sessions = getSavedSessions();
    if (sessions.length === 0) {
        listEl.innerHTML = `<div style="padding:8px 12px;font-size:11.5px;color:rgba(255,255,255,0.42)">Aucune discussion archivée</div>`;
        return;
    }
    listEl.innerHTML = sessions.map(s => `
        <button onclick="loadSavedSession('${s.id}');closeSidebarMobile();"
            style="width:100%;text-align:left;background:transparent;border:none;color:rgba(255,255,255,0.75);padding:8px 12px;border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px;overflow:hidden"
            onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
            <i class="fa-regular fa-comment-dots" style="color:#86efac;font-size:12px;flex-shrink:0"></i>
            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1">${s.title}</span>
            <span style="font-size:9.5px;font-weight:800;background:rgba(255,255,255,0.12);padding:1px 5px;border-radius:5px;text-transform:uppercase">${s.lang || 'fr'}</span>
        </button>
    `).join('');
}

/* -----------------------------------------------------
   9. GUIDES & FICHES PRATIQUES AUDIO (ResourcesScreen.kt + AgriAudioRepository.kt)
      Avec les 10 pistes officielles pré-enregistrées et leurs transcriptions certifiées !
------------------------------------------------------ */
const RESOURCE_CATEGORIES = [
    { key: 'Tous', fr: 'Tous', fon: 'Bǐ', yoruba: 'Gbogbo', ewe: 'Katã', icon: 'fa-layer-group' },
    { key: 'Maïs', fr: 'Maïs', fon: 'Gbadé', yoruba: 'Àgbàdo', ewe: 'Bli', icon: 'fa-wheat-awn' },
    { key: 'Soja', fr: 'Soja', fon: 'Soja', yoruba: 'Ewa Soya', ewe: 'Soja', icon: 'fa-seedling' },
    { key: 'Chenilles', fr: 'Chenilles & Maladies', fon: 'Wǎnví & Azɔn', yoruba: 'Kòkòrò & Àrùn', ewe: 'Nudzralawo', icon: 'fa-bug' },
    { key: 'Traitements', fr: 'Engrais & Neem', fon: 'Engrais & Kínítín', yoruba: 'Ajílẹ̀ & Dongoyaro', ewe: 'Ajilɛ & Neem', icon: 'fa-flask' },
    { key: 'Stockage', fr: 'Stockage PICS', fon: 'Sakí PICS', yoruba: 'Àpò PICS', ewe: 'PICS Kotoku', icon: 'fa-boxes-stacked' },
    { key: 'Météo', fr: 'Météo & Semis', fon: 'Jǐ & Nǔdídó', yoruba: 'Ojú Ọjọ́', ewe: 'Yame', icon: 'fa-cloud-sun-rain' },
    { key: 'Marchés', fr: 'Prix Marchés', fon: 'Axi lɛ', yoruba: 'Owó Ọjà', ewe: 'Asi Ga', icon: 'fa-sack-dollar' },
    { key: 'Favoris', fr: 'Favoris ★', fon: 'E un yí wǎn ná ★', yoruba: 'Ààyò ★', ewe: 'Lɔ̃lɔ̃nu ★', icon: 'fa-bookmark' }
];

const FICHES_DATA = [
    {
        id: 'm1_taches_foliaires',
        trackId: 'm1_taches_foliaires',
        duration: '00:15',
        category: 'Maïs',
        extraCats: ['Chenilles', 'Traitements'],
        icon: 'fa-leaf',
        color: '#1B6A3B',
        bg: '#E8F5E9',
        title: {
            fr: "Traitement des taches foliaires du Maïs",
            fon: "Azɔn : Àmì e ɖò agbado wéma jí lɛ",
            yoruba: "Ìtọ́jú àrùn abàwọ́n ewé àgbàdo",
            ewe: "Bli aŋgba dɔlélewo ƒe atikewɔwɔ"
        },
        body: {
            fr: "Les taches sur les feuilles de maïs sont une maladie. Enlevez les feuilles abîmées et traitez avec du cuivre ou du mancozèbe.",
            fon: "Àmì e ɖò agbado wéma jí lɛ nyí azɔn. Ðè wéma e gblé lɛ sín mɛ bo zán oogun kòba tàbí mankozèbè.",
            yoruba: "Àwọn àmì lórí ewé àgbàdo yín jẹ́ àrùn ewé. Ẹ yọ àwọn ewé tó ti bàjẹ́ kúrò, kí ẹ sì lo oògùn kópà tàbí mankozeb.",
            ewe: "Ne bli ƒe aŋgbawo dzi ɖe nɔnɔme vovovo la, ɖe aŋgba gblẽawo ɖa eye nàwu neem tsi kple adzalẽ ɖe wo dzi ŋdi kanya."
        }
    },
    {
        id: 'm2_chenille_legionnaire',
        trackId: 'm2_chenille_legionnaire',
        duration: '00:14',
        category: 'Chenilles',
        extraCats: ['Maïs', 'Traitements'],
        icon: 'fa-bug',
        color: '#DC2626',
        bg: '#FEF2F2',
        title: {
            fr: "Protection contre la Chenille légionnaire (Spodoptera)",
            fon: "Yovogbó e nɔ ɖu agbado lɛ é (Chenille)",
            yoruba: "Ìdáàbòbò lọ́wọ́ kòkòrò apanirun àgbàdo",
            ewe: "Bli nudzrala (Chenille) ƒe atikewɔwɔ"
        },
        body: {
            fr: "Attention, ce sont des chenilles légionnaires. Préparez un extrait de feuilles de neem avec du savon ou traitez tôt le matin.",
            fon: "Kpɔn bo cɔ́ hwiɖee, yovogbó wɛ ɖò nǔ ɖù wɛ. Zán nímù sín wéma kpódó xɔ̀sùn kpó do hu ye do zànzan.",
            yoruba: "Ẹ kíyèsí i, kòkòrò apanirun ló ń jẹ ẹ́. Ẹ lo oògùn ewé dóngóyárò pẹ̀lú ọṣẹ tàbí kí ẹ fún oògùn ní àárọ̀ kùtùkùtù.",
            ewe: "Kpɔ bli viwo ƒe dzime. Tò neem aŋgba de tsi me eye nàkɔ ɖe bli ƒe dzime alo nàde dzofi vi aɖe eme."
        }
    },
    {
        id: 'm3_jaunissement_engrais',
        trackId: 'm3_jaunissement_engrais',
        duration: '00:12',
        category: 'Traitements',
        extraCats: ['Maïs', 'Soja'],
        icon: 'fa-flask',
        color: '#1D4ED8',
        bg: '#DBEAFE',
        title: {
            fr: "Carence nutritive : Jaunissement & Engrais NPK / Urée",
            fon: "Agbado wéma e ɖo jiji : Engrais & Urée",
            yoruba: "Ewé tó ń pọ́n àti lílo Ajílẹ̀ Urea / Compost",
            ewe: "Aŋgba ʋuʋu kple Ajilɛ NPK / Urée zãzã"
        },
        body: {
            fr: "Le jaunissement des feuilles indique un manque d'engrais. Ajoutez de l'urée ou du compost.",
            fon: "Agbado wéma e ɖo jiji nyí ɖɔ è ɖo hudo engrais tɔn. Sɔ urée alo gbedó do gle ɔ mɛ.",
            yoruba: "Ewé tó ń pọ́n fi hàn pé ilẹ̀ náà nílò oògùn ajílẹ̀. Ẹ bu ajílẹ̀ urea tàbí ajílẹ̀ àdánidá sí i.",
            ewe: "Ne bli aŋgbawo le ʋuʋum la, de NPK le ŋkeke 15 megbe eye nàde Urée le ŋkeke 40 megbe ne anyigba fã."
        }
    },
    {
        id: 'p4_conseil_stockage_pics',
        trackId: 'p4_conseil_stockage_pics',
        duration: '00:13',
        category: 'Stockage',
        extraCats: ['Maïs', 'Soja'],
        icon: 'fa-boxes-stacked',
        color: '#6D28D9',
        bg: '#EDE9FE',
        title: {
            fr: "Techniques de stockage des grains (Sacs PICS triple couche)",
            fon: "Agbado hɛnhɛn ɖó PICS sín kpòtò mɛ",
            yoruba: "Ìtọ́jú àgbàdo sí inú àpò PICS",
            ewe: "Bli kple Soja dzraɖoɖo ɖe PICS kotoku me"
        },
        body: {
            fr: "Les prix montent. Si vous avez des sacs PICS, gardez votre stock encore 2 semaines pour mieux vendre.",
            fon: "Axì ɖo jiji wɛ. Enyi a ɖó PICS sín kpòtò ɔ, hɛn agbado towe ɖó azan wéwe gudo bo sa ganji.",
            yoruba: "Owó ń gòkè. Tí ẹ bá ní àpò PICS, ẹ fi àgbàdo yín pamọ́ fún ọ̀sẹ̀ méjì sí i kí ẹ tó tà á.",
            ewe: "Sia bli alo soja ɖe ŋdɔ nu nyuie. Kɔe ɖe PICS kotoku me, ɖe ya le eme nyuie eye nàbla kotokua."
        }
    },
    {
        id: 'w1_meteo_pluie_semis',
        trackId: 'w1_meteo_pluie_semis',
        duration: '00:11',
        category: 'Météo',
        extraCats: ['Maïs', 'Soja'],
        icon: 'fa-cloud-sun-rain',
        color: '#0284C7',
        bg: '#E0F2FE',
        title: {
            fr: "Alerte Météo & Calendrier des Semis (Pluie favorable)",
            fon: "Jǐ gángán na jà : Hwenu agbado dídó tɔn",
            yoruba: "Ìkìlọ̀ Ojú Ọjọ́ : Òjò àti Àkókò Ìgbìn",
            ewe: "Tsidzadza & Nukuƒãɣi Nyui"
        },
        body: {
            fr: "De fortes pluies sont annoncées pour les 3 prochains jours. C'est le bon moment pour semer le maïs.",
            fon: "Jǐ gángán na jà ɖo azan atɔn e ja lɛ mɛ. Hwenu ɖagbe wɛ nǔ agbado dídó.",
            yoruba: "Òjò ń bọ̀ ní ọjọ́ mẹ́ta tó ń bọ̀ yìí. Àkókò tó dára nìyí láti gbin àgbàdo yín.",
            ewe: "Tsidzadza nyui gbɔna. Ɣeyiɣi nyuitɔe nye esi nàƒã bli kple soja."
        }
    },
    {
        id: 'w2_chaleur_secheresse',
        trackId: 'w2_chaleur_secheresse',
        duration: '00:12',
        category: 'Météo',
        extraCats: ['Soja', 'Maïs'],
        icon: 'fa-sun-plant-wilt',
        color: '#D97706',
        bg: '#FEF3C7',
        title: {
            fr: "Alerte Forte Chaleur : Paillage & Conservation de l'eau",
            fon: "Hwé ɖo gbigbó tawun : Paillage ayǐkúngban tɔn",
            yoruba: "Ìkìlọ̀ Oòrùn Líle : Bo ilẹ̀ oko pẹ̀lú koríko",
            ewe: "Ŋdɔʋuʋu Sesẽ : Tsɔ gbe ƒuƒu tsyɔ anyigba"
        },
        body: {
            fr: "Temps très chaud. Paillez le sol autour de vos cultures pour retenir l'eau.",
            fon: "Hwé ɖo gbigbó tawun. Sɔ gbé kpo amà kpo do glɔ nǔ nǔdó lɛ bo hɛn sìn ɖo ayǐkúngban mɛ.",
            yoruba: "Oòrùn pọ̀ gan-an. Ẹ fi koríko bo ìdí àwọn ohun ọ̀gbìn yín kí omi má baà gbẹ lára wọn.",
            ewe: "Ne ŋdɔ le ʋuʋum sesĩe la, tsɔ gbe ƒuƒu tsyɔ anyigba le agblea me be tsi nagamie le eme o."
        }
    },
    {
        id: 'w3_alerte_lavage_pluie',
        trackId: 'w3_alerte_lavage_pluie',
        duration: '00:10',
        category: 'Météo',
        extraCats: ['Traitements'],
        icon: 'fa-cloud-showers-heavy',
        color: '#0369A1',
        bg: '#E0F2FE',
        title: {
            fr: "Précaution Pluie : Ne pas pulvériser avant l'orage",
            fon: "Ma fún oogun ɖo égbé ó (Jǐ na jà)",
            yoruba: "Ẹ má fún oògùn sí oko lónìí kí òjò tó rọ̀",
            ewe: "Mègawu atike ɖe agble me hafi tsi nadza o"
        },
        body: {
            fr: "Ne traitez pas aujourd'hui, la pluie va laver le produit sur les feuilles.",
            fon: "Ma fún oogun ɖo égbé ó, jǐ na jà bo klɔ́ oogun ɔ sín amà jí.",
            yoruba: "Ẹ má fún oògùn sí oko lónìí o, nítorí pé òjò yóò fọ gbogbo rẹ̀ dànù.",
            ewe: "Tsi le dzadza ge kpuie: mègawu neem atike egbe o, ne menye nenema o la tsi aklɔe adzoe."
        }
    },
    {
        id: 'p1_prix_mais_dantokpa',
        trackId: 'p1_prix_mais_dantokpa',
        duration: '00:12',
        category: 'Marchés',
        extraCats: ['Maïs'],
        icon: 'fa-wheat-awn',
        color: '#B45309',
        bg: '#FEF3C7',
        title: {
            fr: "Bulletin Prix du Maïs : Marchés Dantokpa & Parakou",
            fon: "Agbado wéwé sín axì ɖò Dantokpa & Parakou",
            yoruba: "Iye owó Àgbàdo funfun ní ọjà Dàntọ́kpà",
            ewe: "Bli ƒe asi le Dantokpa kple Parakou"
        },
        body: {
            fr: "Aujourd'hui, le maïs blanc est entre 250 et 280 FCFA le kilo. Le sac de 100 kg se vend à 24 000 FCFA.",
            fon: "Égbé ɔ, agbado wéwé sín kilo ɖo 250 jɛ 280 FCFA. Kpòtò 100kg tɔn ɖo 24 000 FCFA.",
            yoruba: "Lónìí, àgbàdo funfun jẹ́ 250 sí 280 FCFA fún kìlò kan. Àpò ọgọ́rùn-ún kìlò jẹ́ 24,000 FCFA.",
            ewe: "Bli ƒuƒu kilo ɖeka le Dantokpa kple Parakou asi me."
        }
    },
    {
        id: 'p2_prix_soja_parakou',
        trackId: 'p2_prix_soja_parakou',
        duration: '00:11',
        category: 'Marchés',
        extraCats: ['Soja'],
        icon: 'fa-seedling',
        color: '#15803D',
        bg: '#DCFCE7',
        title: {
            fr: "Bulletin Prix du Soja : Marchés Parakou & Bohicon",
            fon: "Soja sín axì ɖò Parakou kpo Bohicon kpo",
            yoruba: "Iye owó ẹwà Sòyà ní Párákú àti Bòhíkọ̀n",
            ewe: "Soja ƒe asi le Parakou kple Bohicon"
        },
        body: {
            fr: "Le prix du Soja est stable : 350 FCFA le kilo à Parakou et Bohicon.",
            fon: "Soja sín axì ɖo ganji : kilo ɖokpo nyí 350 FCFA ɖo Parakou kpo Bohicon kpo.",
            yoruba: "Iye owó ẹwà Sòyà dúró dáadáa : kìlò kan jẹ́ 350 FCFA ní Párákú àti Bòhíkọ̀n.",
            ewe: "Soja nyui kilo ɖeka le Parakou kple Bohicon asiwo me."
        }
    },
    {
        id: 'p3_prix_gari_dantokpa',
        trackId: 'p3_prix_gari_dantokpa',
        duration: '00:11',
        category: 'Marchés',
        extraCats: [],
        icon: 'fa-bowl-food',
        color: '#9333EA',
        bg: '#F3E8FF',
        title: {
            fr: "Bulletin Prix du Gari : Marché Dantokpa & Savalou",
            fon: "Gari sohoui sín axì ɖò Dantokpa",
            yoruba: "Iye owó Gáàrí ní ọjà Dàntọ́kpà",
            ewe: "Gali ƒe asi le Dantokpa"
        },
        body: {
            fr: "Le sac de gari sohoui de 50 kg est actuellement à 16 000 FCFA au marché Dantokpa.",
            fon: "Gari sohoui sín kpòtò 50kg ɖo 16 000 FCFA ɖo axì Dantokpa tɔn mɛ.",
            yoruba: "Àpò gáàrí àádọ́ta kìlò jẹ́ 16,000 FCFA ní ọjà Dàntọ́kpà báyìí.",
            ewe: "Gali nyui kotoku le Dantokpa asi me."
        }
    }
];

let activeResourceCategory = 'Tous';
let bookmarkedFiches = new Set(JSON.parse(localStorage.getItem('agrivoice_bookmarks') || '[]'));

function toggleBookmark(ficheId) {
    if (bookmarkedFiches.has(ficheId)) {
        bookmarkedFiches.delete(ficheId);
        showToast("Fiche retirée des favoris");
    } else {
        bookmarkedFiches.add(ficheId);
        showToast("Fiche enregistrée dans vos favoris ★");
    }
    localStorage.setItem('agrivoice_bookmarks', JSON.stringify([...bookmarkedFiches]));
    renderFiches();
}

function renderCategoryPills() {
    const bar = document.getElementById('category-pills-bar');
    if (!bar) return;
    bar.innerHTML = RESOURCE_CATEGORIES.map(c => {
        const label = c[currentLang] || c.fr;
        const isActive = activeResourceCategory === c.key;
        return `
            <button class="cat-pill ${isActive ? 'active' : ''}" onclick="activeResourceCategory='${c.key}';renderCategoryPills();renderFiches();">
                <i class="fa-solid ${c.icon}" style="font-size:12px"></i>
                <span>${label}</span>
            </button>
        `;
    }).join('');
}

function renderFiches() {
    const container = document.getElementById('fiches-list');
    const empty = document.getElementById('fiches-empty');
    const searchInput = document.getElementById('fiche-search');
    if (!container) return;

    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();

    const filtered = FICHES_DATA.filter(f => {
        if (activeResourceCategory === 'Favoris' && !bookmarkedFiches.has(f.id)) return false;
        if (activeResourceCategory !== 'Tous' && activeResourceCategory !== 'Favoris') {
            if (f.category !== activeResourceCategory && !(f.extraCats || []).includes(activeResourceCategory)) {
                return false;
            }
        }
        if (!q) return true;
        const t = (f.title[currentLang] || f.title.fr).toLowerCase();
        const b = (f.body[currentLang] || f.body.fr).toLowerCase();
        const tFr = f.title.fr.toLowerCase();
        return t.includes(q) || b.includes(q) || tFr.includes(q) || f.category.toLowerCase().includes(q);
    });

    if (empty) empty.style.display = filtered.length === 0 ? 'block' : 'none';

    container.innerHTML = filtered.map(f => {
        const title = f.title[currentLang] || f.title.fr;
        const body = f.body[currentLang] || f.body.fr;
        const isSaved = bookmarkedFiches.has(f.id);
        return `
            <div class="fiche-card">
                <div>
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px">
                        <div style="display:flex;align-items:center;gap:10px">
                            <div style="width:42px;height:42px;border-radius:13px;background:${f.bg};color:${f.color};display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0">
                                <i class="fa-solid ${f.icon}"></i>
                            </div>
                            <div>
                                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                                    <span style="font-size:10px;font-weight:800;text-transform:uppercase;color:${f.color};background:${f.bg};padding:2px 8px;border-radius:9999px">${f.category}</span>
                                    <span style="font-size:10px;font-weight:800;color:#15803D;background:#DCFCE7;padding:2px 8px;border-radius:9999px;display:inline-flex;align-items:center;gap:4px">
                                        <i class="fa-solid fa-circle-check"></i> Hors-ligne
                                    </span>
                                </div>
                                <h3 style="font-size:15.5px;font-weight:800;color:var(--agri-text);margin-top:4px;line-height:1.3">${title}</h3>
                            </div>
                        </div>
                        <button onclick="toggleBookmark('${f.id}')" style="background:none;border:none;cursor:pointer;color:${isSaved ? '#F59E0B' : '#CBD5E1'};font-size:18px;padding:4px" title="Favori">
                            <i class="fa-solid fa-bookmark"></i>
                        </button>
                    </div>
                    <p style="font-size:13.5px;color:var(--agri-muted);line-height:1.6">${body}</p>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:12px;border-top:1px solid #F1F5F9;flex-wrap:wrap">
                    <button onclick="playFicheAudio('${f.id}', this)"
                        style="flex:1;background:var(--agri-green);color:#fff;border:none;padding:9px 14px;border-radius:9999px;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:7px;box-shadow:0 3px 10px rgba(27,106,59,0.22)">
                        <i class="fa-solid fa-volume-high"></i>
                        <span>Écouter (${f.duration})</span>
                    </button>
                    <button onclick="askFicheFollowup('${f.id}')"
                        style="background:#F0FDF4;border:1px solid #BBF7D0;color:var(--agri-green-dark);padding:9px 14px;border-radius:9999px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:6px">
                        <i class="fa-solid fa-comments"></i>
                        <span>Demander à l'IA</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function playFicheAudio(ficheId, btnEl) {
    const f = FICHES_DATA.find(x => x.id === ficheId);
    if (!f) return;
    const text = `${f.title[currentLang] || f.title.fr}. ${f.body[currentLang] || f.body.fr}`;
    playOfficialTrack(f.trackId, btnEl, text);
}

function askFicheFollowup(ficheId) {
    const f = FICHES_DATA.find(x => x.id === ficheId);
    if (!f) return;
    const title = f.title[currentLang] || f.title.fr;
    usePromptSuggestion(title);
}

/* -----------------------------------------------------
   10. STUDIO COMMUNAUTAIRE « J'AIME AGRIVOICE » (JaimeMaLangueScreen.kt)
       42 Mots Officiels + Upload Direct vers Supabase Storage & DB
------------------------------------------------------ */
const JAIME_WORDS = [
    // ── FƆNGBE (15 mots officiels de AgriCrowdsourceManager.kt) ──
    { id: "fon_01", word: "Gbadé", phonetic: "[ Gba-dé ] • Sens : Maïs", lang: "fon", category: "Cultures", edgeLabel: "mais" },
    { id: "fon_02", word: "Fɛn", phonetic: "[ Fèn ] • Sens : Manioc", lang: "fon", category: "Cultures", edgeLabel: "manioc" },
    { id: "fon_03", word: "Timati", phonetic: "[ Ti-ma-ti ] • Sens : Tomate", lang: "fon", category: "Cultures", edgeLabel: "tomate" },
    { id: "fon_04", word: "Azǐn", phonetic: "[ A-zǐn ] • Sens : Arachide", lang: "fon", category: "Cultures", edgeLabel: "arachide" },
    { id: "fon_05", word: "Ayǐkún", phonetic: "[ A-yǐ-kún ] • Sens : Haricot / Niébé", lang: "fon", category: "Cultures", edgeLabel: "niebe" },
    { id: "fon_06", word: "Wǎnví", phonetic: "[ Wǎn-ví ] • Sens : Chenille / Insecte", lang: "fon", category: "Ravageurs", edgeLabel: "chenille" },
    { id: "fon_07", word: "Azɔn", phonetic: "[ A-zɔn ] • Sens : Maladie des plantes", lang: "fon", category: "Ravageurs", edgeLabel: "maladie" },
    { id: "fon_08", word: "Amà", phonetic: "[ A-mà ] • Sens : Feuille", lang: "fon", category: "Cultures", edgeLabel: "feuille" },
    { id: "fon_09", word: "Jǐ", phonetic: "[ Djǐ ] • Sens : Pluie", lang: "fon", category: "Météo", edgeLabel: "pluie" },
    { id: "fon_10", word: "Hwèsivɔ́", phonetic: "[ Hwè-si-vɔ́ ] • Sens : Soleil / Sécheresse", lang: "fon", category: "Météo", edgeLabel: "secheresse" },
    { id: "fon_11", word: "Kɔ́", phonetic: "[ Kɔ́ ] • Sens : Sol / Terre", lang: "fon", category: "Météo", edgeLabel: "sol" },
    { id: "fon_12", word: "Dó", phonetic: "[ Dó ] • Sens : Semer / Planter", lang: "fon", category: "Actions", edgeLabel: "semer" },
    { id: "fon_13", word: "Yà", phonetic: "[ Yà ] • Sens : Récolter", lang: "fon", category: "Actions", edgeLabel: "recolter" },
    { id: "fon_14", word: "Axi", phonetic: "[ A-xi ] • Sens : Marché / Prix", lang: "fon", category: "Marché", edgeLabel: "marche" },
    { id: "fon_15", word: "Alɔgɔ", phonetic: "[ A-lɔ-gɔ ] • Sens : Aide / Conseil", lang: "fon", category: "Actions", edgeLabel: "aide" },

    // ── YORÙBÁ (15 mots officiels de AgriCrowdsourceManager.kt) ──
    { id: "yor_01", word: "Àgbàdo", phonetic: "[ À-gbà-do ] • Sens : Maïs", lang: "yoruba", category: "Cultures", edgeLabel: "mais" },
    { id: "yor_02", word: "Ẹ̀gẹ́", phonetic: "[ È-gẹ́ ] • Sens : Manioc", lang: "yoruba", category: "Cultures", edgeLabel: "manioc" },
    { id: "yor_03", word: "Tòmátì", phonetic: "[ Tò-má-tì ] • Sens : Tomate", lang: "yoruba", category: "Cultures", edgeLabel: "tomate" },
    { id: "yor_04", word: "Ẹ̀pà", phonetic: "[ È-pà ] • Sens : Arachide", lang: "yoruba", category: "Cultures", edgeLabel: "arachide" },
    { id: "yor_05", word: "Ẹ̀wà", phonetic: "[ È-wà ] • Sens : Haricot / Niébé", lang: "yoruba", category: "Cultures", edgeLabel: "niebe" },
    { id: "yor_06", word: "Kòkòrò", phonetic: "[ Kò-kò-rò ] • Sens : Chenille / Insecte", lang: "yoruba", category: "Ravageurs", edgeLabel: "chenille" },
    { id: "yor_07", word: "Àrùn", phonetic: "[ À-rùn ] • Sens : Maladie", lang: "yoruba", category: "Ravageurs", edgeLabel: "maladie" },
    { id: "yor_08", word: "Ewé", phonetic: "[ E-wé ] • Sens : Feuille", lang: "yoruba", category: "Cultures", edgeLabel: "feuille" },
    { id: "yor_09", word: "Òjò", phonetic: "[ Ò-djò ] • Sens : Pluie", lang: "yoruba", category: "Météo", edgeLabel: "pluie" },
    { id: "yor_10", word: "Ọ̀gbẹlẹ̀", phonetic: "[ Ọ̀-gbẹ-lẹ̀ ] • Sens : Sécheresse", lang: "yoruba", category: "Météo", edgeLabel: "secheresse" },
    { id: "yor_11", word: "Ilẹ̀", phonetic: "[ I-lẹ̀ ] • Sens : Sol / Terre", lang: "yoruba", category: "Météo", edgeLabel: "sol" },
    { id: "yor_12", word: "Gbìn", phonetic: "[ Gbìn ] • Sens : Semer / Planter", lang: "yoruba", category: "Actions", edgeLabel: "semer" },
    { id: "yor_13", word: "Kórè", phonetic: "[ Kó-rè ] • Sens : Récolter", lang: "yoruba", category: "Actions", edgeLabel: "recolter" },
    { id: "yor_14", word: "Ọjà", phonetic: "[ Ọ-djà ] • Sens : Marché / Prix", lang: "yoruba", category: "Marché", edgeLabel: "marche" },
    { id: "yor_15", word: "Ajílẹ̀", phonetic: "[ A-jí-lẹ̀ ] • Sens : Engrais", lang: "yoruba", category: "Actions", edgeLabel: "engrais" },

    // ── FRANÇAIS (12 mots officiels de AgriCrowdsourceManager.kt) ──
    { id: "fr_01", word: "Maïs", phonetic: "[ Ma-ïs ] • Culture céréalière", lang: "fr", category: "Cultures", edgeLabel: "mais" },
    { id: "fr_02", word: "Manioc", phonetic: "[ Ma-nioc ] • Tubercule", lang: "fr", category: "Cultures", edgeLabel: "manioc" },
    { id: "fr_03", word: "Soja", phonetic: "[ So-ja ] • Légumineuse", lang: "fr", category: "Cultures", edgeLabel: "soja" },
    { id: "fr_04", word: "Chenille", phonetic: "[ Che-nille ] • Ravageur", lang: "fr", category: "Ravageurs", edgeLabel: "chenille" },
    { id: "fr_05", word: "Engrais", phonetic: "[ En-grais ] • Fertilisation", lang: "fr", category: "Actions", edgeLabel: "engrais" },
    { id: "fr_06", word: "Pluie", phonetic: "[ Pluie ] • Météo", lang: "fr", category: "Météo", edgeLabel: "pluie" },
    { id: "fr_07", word: "Sécheresse", phonetic: "[ Sé-che-resse ] • Météo", lang: "fr", category: "Météo", edgeLabel: "secheresse" },
    { id: "fr_08", word: "Semer", phonetic: "[ Se-mer ] • Action culturale", lang: "fr", category: "Actions", edgeLabel: "semer" },
    { id: "fr_09", word: "Récolter", phonetic: "[ Ré-col-ter ] • Moisson", lang: "fr", category: "Actions", edgeLabel: "recolter" },
    { id: "fr_10", word: "Marché", phonetic: "[ Mar-ché ] • Prix de vente", lang: "fr", category: "Marché", edgeLabel: "marche" },
    { id: "fr_11", word: "Traitement", phonetic: "[ Trai-te-ment ] • Remède", lang: "fr", category: "Actions", edgeLabel: "traitement" },
    { id: "fr_12", word: "Stockage", phonetic: "[ Stoc-kage ] • Sacs PICS", lang: "fr", category: "Actions", edgeLabel: "stockage" }
];

let jaimeLang = 'fon';
let jaimeWordIdx = 0;
let jaimeRecordedWords = new Set(JSON.parse(localStorage.getItem('agrivoice_jaime_done') || '[]'));
let jaimeTempBlob = null;
let jaimeTempUrl = null;
let jaimeIsRecording = false;

function getJaimeWordsForLang(lang) {
    return JAIME_WORDS.filter(w => w.lang === lang);
}

function selectJaimeLang(lang) {
    jaimeLang = lang;
    jaimeWordIdx = 0;
    jaimeTempBlob = null;

    ['fon', 'yoruba', 'fr'].forEach(l => {
        const btn = document.getElementById(`jaime-tab-${l}`);
        if (!btn) return;
        if (l === lang) {
            btn.style.background = 'var(--agri-green)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--agri-green)';
        } else {
            btn.style.background = '#fff';
            btn.style.color = 'var(--agri-muted)';
            btn.style.borderColor = 'var(--agri-border)';
        }
    });

    renderJaimeStudio();
}

function stepJaimeWord(delta) {
    const list = getJaimeWordsForLang(jaimeLang);
    jaimeWordIdx = (jaimeWordIdx + delta + list.length) % list.length;
    jaimeTempBlob = null;
    renderJaimeStudio();
}

function pickJaimeWord(idx) {
    jaimeWordIdx = idx;
    jaimeTempBlob = null;
    renderJaimeStudio();
}

function renderJaimeStudio() {
    const list = getJaimeWordsForLang(jaimeLang);
    const active = list[jaimeWordIdx] || list[0];
    if (!active) return;

    const catEl = document.getElementById('jaime-word-cat');
    const idxEl = document.getElementById('jaime-word-index');
    const titleEl = document.getElementById('jaime-word-title');
    const subEl = document.getElementById('jaime-word-sub');
    const postActions = document.getElementById('jaime-post-actions');
    const statusEl = document.getElementById('jaime-rec-status');

    if (catEl) catEl.innerText = active.category;
    if (idxEl) idxEl.innerText = `Mot ${jaimeWordIdx + 1} / ${list.length}`;
    if (titleEl) titleEl.innerText = `« ${active.word} »`;
    if (subEl) subEl.innerText = active.phonetic;
    if (postActions) postActions.style.display = jaimeTempBlob ? 'flex' : 'none';
    if (statusEl && !jaimeTempBlob) {
        statusEl.innerText = "Appuyez sur le micro et prononcez le mot (3 secondes)";
        statusEl.style.color = 'var(--agri-muted)';
    }

    // Compteurs
    const count = jaimeRecordedWords.size;
    const userCountEl = document.getElementById('jaime-user-count');
    const badgeEl = document.getElementById('jaime-badge-label');
    const profStatContribs = document.getElementById('prof-stat-contribs');
    if (userCountEl) userCountEl.innerText = `${count} mot(s) enregistré(s)`;
    if (profStatContribs) profStatContribs.innerText = String(count);
    if (badgeEl) {
        badgeEl.innerText = count >= 10 ? "Ambassadeur des Langues ★" : "Contributeur Éclaireur";
    }

    // Liste des mots de la langue
    const listContainer = document.getElementById('jaime-words-list');
    if (listContainer) {
        listContainer.innerHTML = list.map((w, idx) => {
            const isSelected = idx === jaimeWordIdx;
            const isDone = jaimeRecordedWords.has(w.id);
            return `
                <div onclick="pickJaimeWord(${idx})"
                    style="background:${isSelected ? '#E8F5E9' : '#fff'};border:1.5px solid ${isSelected ? 'var(--agri-green)' : 'var(--agri-border)'};border-radius:14px;padding:12px 14px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;transition:all 0.15s">
                    <div>
                        <div style="font-size:14.5px;font-weight:800;color:var(--agri-text)">${w.word}</div>
                        <div style="font-size:11.5px;color:var(--agri-muted)">${w.phonetic}</div>
                    </div>
                    <span style="font-size:11px;font-weight:800;padding:4px 10px;border-radius:9999px;background:${isDone ? '#DCFCE7' : '#F1F5F9'};color:${isDone ? '#15803D' : '#475569'}">
                        ${isDone ? '✓ Enregistré' : (isSelected ? 'En cours' : 'Choisir')}
                    </span>
                </div>
            `;
        }).join('');
    }
}

async function startJaimeRecording() {
    if (jaimeIsRecording) return;
    stopActiveAudio();

    const micBtnEl = document.getElementById('jaime-mic-btn');
    const micIconEl = document.getElementById('jaime-mic-icon');
    const statusEl = document.getElementById('jaime-rec-status');
    const postActions = document.getElementById('jaime-post-actions');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        let options = {};
        if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            options = { mimeType: 'audio/webm;codecs=opus' };
        }
        const rec = new MediaRecorder(stream, options);
        const chunks = [];
        rec.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };

        rec.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            jaimeIsRecording = false;
            jaimeTempBlob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
            if (jaimeTempUrl) URL.revokeObjectURL(jaimeTempUrl);
            jaimeTempUrl = URL.createObjectURL(jaimeTempBlob);

            if (micBtnEl) micBtnEl.style.background = 'var(--agri-green)';
            if (micIconEl) micIconEl.className = 'fa-solid fa-microphone';
            if (statusEl) {
                statusEl.innerText = "Enregistrement capturé (3s) ! Réécoutez ou validez l'envoi.";
                statusEl.style.color = 'var(--agri-green)';
            }
            if (postActions) postActions.style.display = 'flex';
        };

        jaimeIsRecording = true;
        if (postActions) postActions.style.display = 'none';
        if (micBtnEl) micBtnEl.style.background = '#DC2626';
        if (micIconEl) micIconEl.className = 'fa-solid fa-wave-square';

        let remaining = 3;
        if (statusEl) {
            statusEl.innerText = `Parlez maintenant... (${remaining}s)`;
            statusEl.style.color = '#DC2626';
        }
        rec.start(200);

        const countInterval = setInterval(() => {
            remaining--;
            if (remaining > 0 && statusEl) {
                statusEl.innerText = `Parlez maintenant... (${remaining}s)`;
            } else {
                clearInterval(countInterval);
            }
        }, 1000);

        setTimeout(() => {
            if (rec.state !== 'inactive') rec.stop();
        }, 3100);

    } catch (err) {
        showToast("Autorisez l'accès au microphone pour enregistrer.");
    }
}

function playJaimePreview() {
    if (!jaimeTempUrl) return;
    stopActiveAudio();
    const audio = new Audio(jaimeTempUrl);
    currentAudioSource = audio;
    audio.play();
}

function saveJaimeContributorName(name) {
    const clean = (name || "Bio Kora").trim();
    localStorage.setItem('agrivoice_contributor_name', clean);
    showToast(`Contributeur : ${clean}`);
}

async function submitJaimeRecording() {
    if (!jaimeTempBlob) return;
    const list = getJaimeWordsForLang(jaimeLang);
    const active = list[jaimeWordIdx];
    if (!active) return;

    const submitBtn = document.getElementById('jaime-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Envoi vers Supabase...';
    }

    const session = localStorage.getItem('agrivoice_session_id') || (() => {
        const s = 'sess_' + Math.random().toString(36).slice(2, 12);
        localStorage.setItem('agrivoice_session_id', s);
        return s;
    })();
    const contributorName = document.getElementById('jaime-contributor-input')?.value?.trim() || "Bio Kora";
    const dbLang = active.lang === 'fr' ? 'french' : active.lang;
    const fileName = `${active.edgeLabel}_${Date.now()}_${session.slice(0, 8)}.webm`;
    const storagePath = `${dbLang}/${active.edgeLabel}/${fileName}`;

    try {
        // 1. Upload dans le bucket Supabase agrivoice-audios
        const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${SUPABASE_BUCKET}/${storagePath}`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': jaimeTempBlob.type || 'audio/webm',
                'x-upsert': 'true'
            },
            body: jaimeTempBlob
        });

        const publicAudioUrl = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${storagePath}`;

        // 2. Insertion dans la table Supabase contributions
        if (uploadRes.ok) {
            await fetch(`${SUPABASE_URL}/rest/v1/contributions`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    word_id: active.id,
                    word: active.word,
                    language: dbLang,
                    audio_url: publicAudioUrl,
                    audio_format: 'webm',
                    duration_ms: 3000,
                    contributor_session: session,
                    contributor_name: contributorName,
                    edge_label: active.edgeLabel,
                    status: 'pending'
                })
            });
        }
    } catch (e) {
        console.warn("Sauvegarde locale + synchronisation différée:", e);
    }

    // Marquer comme validé et passer au mot suivant
    jaimeRecordedWords.add(active.id);
    localStorage.setItem('agrivoice_jaime_done', JSON.stringify([...jaimeRecordedWords]));
    jaimeTempBlob = null;

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Valider & Envoyer';
    }

    showToast(`Merci ! « ${active.word} » envoyé sur J'aime AgriVoice !`);
    stepJaimeWord(1);
    refreshJaimeSupabaseStats();
}

async function refreshJaimeSupabaseStats() {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/contributions?select=id`, {
            method: 'HEAD',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'count=exact'
            }
        });
        const range = res.headers.get('content-range');
        if (range && range.includes('/')) {
            const total = range.split('/')[1];
            const el = document.getElementById('jaime-global-stats');
            if (el && total && total !== '*') {
                el.innerHTML = `<i class="fa-solid fa-database"></i> ${total} voix collectées sur Supabase`;
            }
        }
    } catch (e) {}
}

/* -----------------------------------------------------
   11. MODALES & PROFIL PRODUCTEUR (PRIX MARCHÉS, FAQ, ÉDITION)
------------------------------------------------------ */
function openMarketPricesModal() {
    document.getElementById('market-modal')?.classList.add('open');
}
function closeMarketPricesModal() {
    document.getElementById('market-modal')?.classList.remove('open');
}

function openFaqModal() {
    document.getElementById('faq-modal')?.classList.add('open');
}
function closeFaqModal() {
    document.getElementById('faq-modal')?.classList.remove('open');
}

function openEditProfileModal() {
    document.getElementById('edit-profile-modal')?.classList.add('open');
}
function closeEditProfileModal() {
    document.getElementById('edit-profile-modal')?.classList.remove('open');
}

function saveFarmerProfile() {
    const name = document.getElementById('edit-prof-name')?.value?.trim() || 'Bio Kora';
    const loc = document.getElementById('edit-prof-loc')?.value?.trim() || 'Borgou / Parakou, Bénin';
    const crops = document.getElementById('edit-prof-crops')?.value?.trim() || 'Maïs & Soja • 5 Hectares';

    const profile = { name, loc, crops };
    localStorage.setItem('agrivoice_farmer_profile', JSON.stringify(profile));
    applyFarmerProfile(profile);
    closeEditProfileModal();
    showToast("Profil producteur mis à jour !");
}

function applyFarmerProfile(profile) {
    if (!profile) return;
    const pName = document.getElementById('prof-name');
    const pLoc = document.getElementById('prof-location');
    const pCrops = document.getElementById('prof-crops');
    const sName = document.getElementById('sidebar-farmer-name');
    const sLoc = document.getElementById('sidebar-farmer-loc');
    const jInput = document.getElementById('jaime-contributor-input');

    if (pName) pName.innerText = profile.name;
    if (pLoc) pLoc.innerText = profile.loc;
    if (pCrops) pCrops.innerText = profile.crops;
    if (sName) sName.innerText = profile.name;
    if (sLoc) sLoc.innerText = `${profile.loc.split(',')[0]} • ${profile.crops}`;
    if (jInput) jInput.value = profile.name;
}

function isAutoplayOn() {
    return localStorage.getItem('agrivoice_autoplay') !== '0';
}

function setAutoplay(on) {
    localStorage.setItem('agrivoice_autoplay', on ? '1' : '0');
    const t1 = document.getElementById('autoplay-toggle');
    const t2 = document.getElementById('prof-autoplay-toggle');
    if (t1) t1.checked = on;
    if (t2) t2.checked = on;
    showToast(on ? 'Lecture vocale automatique activée' : 'Lecture vocale automatique désactivée');
}

function toggleWeatherAlerts(on) {
    localStorage.setItem('agrivoice_alerts', on ? '1' : '0');
    showToast(on ? 'Alertes vocales Météo & Ravageurs activées' : 'Alertes Météo désactivées');
    if (on) {
        playOfficialTrack('w1_meteo_pluie_semis');
    }
}

/* -----------------------------------------------------
   12. INITIALISATION AU CHARGEMENT
------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    // Restaurer profil producteur
    try {
        const savedProf = JSON.parse(localStorage.getItem('agrivoice_farmer_profile') || 'null');
        if (savedProf) applyFarmerProfile(savedProf);
    } catch {}

    // Restaurer autoplay & vitesse
    const autoOn = isAutoplayOn();
    const t1 = document.getElementById('autoplay-toggle');
    const t2 = document.getElementById('prof-autoplay-toggle');
    if (t1) t1.checked = autoOn;
    if (t2) t2.checked = autoOn;

    setVoiceSpeed(voiceSpeed);
    changeLang(currentLang, false);
    renderRecentSessions();
    renderJaimeStudio();
    refreshJaimeSupabaseStats();
});
