/* -----------------------------------------------------
   LOGIQUE DE TRADUCTION (I18N)
------------------------------------------------------ */
const i18n = {
    fr: {
        "menu_title": "Menu", "nav_home": "Accueil (Chat)", "nav_resources": "Ressources", "nav_profile": "Profil", "nav_settings": "Paramètres",
        "new_question": "Nouvelle question", "app_desc": "L'assistant agricole intelligent, 100% hors ligne et en langues locales.",
        "welcome_title": "AgriVoice AI", "welcome_desc": "Posez votre question vocalement, je vous réponds en Fon ou Yorùbá.",
        "stt_local_title": "STT IA", "stt_local_desc": "Transcription via APIs intégrées.",
        "inrab_title": "Données INRAB", "inrab_desc": "Réponses fiables et validées.",
        "res_title": "Guides & Fiches pratiques audio", "res_desc": "Recherchez une culture, une maladie ou un engrais.",
        "btn_listen": "Écouter", "badge_offline": "Hors-ligne",
        "profile_crops": "Maïs & Soja • 5 Hectares", "jaime_title": "J'aime AgriVoice", "jaime_badge": "Nouveau",
        "jaime_desc": "Enregistrez votre voix pour enrichir l'IA agricole hors-ligne et aider votre communauté !",
        "set_lang_title": "Langue & Assistant Vocal", "set_lang_app": "Langue de l'application",
        "set_storage_title": "Stockage & Mode Hors-Ligne", "set_storage_model": "Modèle IA Vocal (Fon/Yorùbá)", "set_storage_ready": "Prêt pour usage"
    },
    fon: {
        "menu_title": "Nǔ e kàn we lɛ", "nav_home": "Xwégbe (Chat)", "nav_resources": "Wěma kpo Gbe kpo", "nav_profile": "Nyikɔ towe", "nav_settings": "Nǔ ɖagbe lɛ",
        "new_question": "Kàn nǔ yɔ́yɔ́", "app_desc": "Alɔgɔtɔ glezɔ watɔ tɔn.",
        "welcome_title": "AgriVoice AI", "welcome_desc": "Kàn nǔ we kpo gbe towe kpo, un na na gbe towe.",
        "stt_local_title": "Gbe sín zɔ", "stt_local_desc": "Transcription via IA.",
        "inrab_title": "INRAB sín wema", "inrab_desc": "Xó e sɔgbe lɛ.",
        "res_title": "Wěma kpo Gbe kpo", "res_desc": "Ba gle, azɔn, engrais...",
        "btn_listen": "Ðó tó", "badge_offline": "Kpò ɖo mɛ",
        "profile_crops": "Gbàdo & Soja • 5 Hectares", "jaime_title": "Un yiwǎn nu AgriVoice", "jaime_badge": "Yɔ́yɔ́",
        "jaime_desc": "D'alɔ bo na gbe towe bo na d'alɔ glezɔ́watɔ́ lɛ !",
        "set_lang_title": "Gbe kpo Xóɖiɖɔ kpo", "set_lang_app": "Gbe e a sɔ́ ɔ",
        "set_storage_title": "Gbe sín nǔɖókpɔ́", "set_storage_model": "Gbe sín IA", "set_storage_ready": "É ɖo gbesisɔ mɛ"
    },
    yoruba: {
        "menu_title": "Akojọ", "nav_home": "Ile (Chat)", "nav_resources": "Àwọn Ìtọ́sọ́nà", "nav_profile": "Profaili", "nav_settings": "Àwọn Ètò Mi",
        "new_question": "Ibeere tuntun", "app_desc": "Oluranlọwọ ogbin.",
        "welcome_title": "AgriVoice AI", "welcome_desc": "Beere ibeere rẹ pẹlu ohùn rẹ.",
        "stt_local_title": "STT IA", "stt_local_desc": "Transcription API.",
        "inrab_title": "Alaye INRAB", "inrab_desc": "Awọn idahun to peye.",
        "res_title": "Àwọn Ìtọ́sọ́nà Ohùn", "res_desc": "Wá ohun ọ̀gbìn, àrùn, ajílẹ̀...",
        "btn_listen": "Gbọ́ ohùn", "badge_offline": "Láìsí àkókò",
        "profile_crops": "Àgbàdo & Sòyà • 5 Hectares", "jaime_title": "Mo nifẹ AgriVoice", "jaime_badge": "Tuntun",
        "jaime_desc": "Kópa nínú gbígba ohùn sílẹ̀ láti ran àwọn àgbẹ̀ lọ́wọ́ !",
        "set_lang_title": "Èdè àti Ohùn", "set_lang_app": "Èdè tí a yàn",
        "set_storage_title": "Àkójọpọ̀ Ohùn", "set_storage_model": "Àwòṣe Ohùn IA", "set_storage_ready": "Lárọ̀ọ́wọ́tó"
    },
    ewe: {
        "menu_title": "Tutuɖo", "nav_home": "Aƒeme (Chat)", "nav_resources": "Agblenuwɔwɔ", "nav_profile": "Ŋkɔwò", "nav_settings": "Ðoɖowo",
        "new_question": "Biabia yeye", "app_desc": "Agblemenukuwɔlawo ƒe kpekpeɖeŋutɔ.",
        "welcome_title": "AgriVoice AI", "welcome_desc": "Bia wò biabia kple gbe, maɖo eŋu na wò le Eʋegbe (Mina) me.",
        "stt_local_title": "STT IA", "stt_local_desc": "Gbe gɔmeɖeɖe kple IA.",
        "inrab_title": "INRAB Ŋuti Nyawo", "inrab_desc": "Ŋuɖoɖo nyuitɔwo.",
        "res_title": "Agblenuwɔwɔ Ƒe Gbe", "res_desc": "Bia bli, agbeli, dɔvɔwo...",
        "btn_listen": "Se gbe", "badge_offline": "Offline",
        "profile_crops": "Bli & Soja • Hectares 5", "jaime_title": "Melɔ̃ AgriVoice", "jaime_badge": "Yeye",
        "jaime_desc": "Tsɔ wò gbe de eme hena kpekpeɖeŋu na agbletɔwo !",
        "set_lang_title": "Gbe kple Gbeɖiɖi", "set_lang_app": "Gbe si nàzã",
        "set_storage_title": "Nuŋlɔɖiwo", "set_storage_model": "Gbe Ƒe IA", "set_storage_ready": "Ele dzadzraɖo me"
    }
};

let currentLang = 'fr';

function changeLang(langCode) {
    currentLang = langCode;
    const dictionary = i18n[langCode];
    if (!dictionary) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) el.innerText = dictionary[key];
    });
    const activeNav = document.querySelector('.nav-item.font-bold span');
    if (activeNav) document.getElementById('mobile-header-title').innerText = activeNav.innerText;
}

/* -----------------------------------------------------
   UI NAVIGATION
------------------------------------------------------ */
const sidebar = document.getElementById('mobile-sidebar');
const overlay = document.getElementById('sidebar-overlay');
const titleEl = document.getElementById('mobile-header-title');

function toggleSidebar() {
    if (sidebar.classList.contains('sidebar-closed')) {
        sidebar.classList.remove('sidebar-closed');
        sidebar.classList.add('sidebar-open');
        overlay.classList.remove('hidden');
    } else {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-closed');
        overlay.classList.add('hidden');
    }
}

function switchView(viewId, element) {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-agrigreen-dark', 'font-bold');
        el.classList.add('text-gray-200');
    });
    element.classList.remove('text-gray-200');
    element.classList.add('bg-agrigreen-dark', 'font-bold');

    let titleSpan = element.querySelector('span');
    titleEl.innerText = titleSpan ? titleSpan.innerText : 'AgriVoice';

    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    if(window.innerWidth < 768) toggleSidebar();
}

/* -----------------------------------------------------
   INTEGRATION AUDIO & TRANSCRIPTION (WHISPER V3 & GRADIO FON)
------------------------------------------------------ */
const micBtn = document.getElementById('mic-btn');
const micIcon = document.getElementById('mic-icon');
const recStatus = document.getElementById('recording-status');
const userInput = document.getElementById('user-input');

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Configuration des Modèles de transcription par Langue
const MODELS = {
    'fr': 'openai/whisper-large-v3-turbo',
    'yoruba': 'openai/whisper-large-v3-turbo',
    'ewe': 'openai/whisper-large-v3-turbo',
    'fon': 'chrisjay/fonxlsr'
};

micBtn.addEventListener('click', async () => {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                await transcribeAudio(audioBlob);
            };

            mediaRecorder.start();
            isRecording = true;
            micBtn.classList.add('recording-pulse');
            recStatus.classList.remove('hidden');
        } catch (err) {
            console.error("Erreur d'accès au micro:", err);
            alert("Accès au microphone refusé ou indisponible.");
        }
    } else {
        mediaRecorder.stop();
        isRecording = false;
        micBtn.classList.remove('recording-pulse');
        recStatus.classList.add('hidden');
        
        userInput.value = "Transcription en cours (" + currentLang.toUpperCase() + ")...";
    }
});

async function transcribeAudio(audioBlob) {
    const model = MODELS[currentLang];
    
    try {
        if (currentLang === 'fon') {
            // Le Fon utilise votre serveur personnel Gradio
            const app = await window.gradioClient.connect("Max-Adis/agrivoice-fon-asr");
            const result = await app.predict("/transcrire", [
                audioBlob,
            ]);
            const text = result.data[0];
            userInput.value = text;
            return text;
        } else {
            // Le Français, le Yorùbá et l'Éwé utilisent Whisper V3
            const result = await window.hf.automaticSpeechRecognition({
                model: model,
                data: audioBlob
            });

            let text = "";
            if (result.text) {
                text = result.text;
            } else if (Array.isArray(result) && result[0]?.translation_text) {
                text = result[0]?.translation_text;
            } else {
                text = "Audio non reconnu.";
            }
            userInput.value = text;
            return text;
        }
    } catch (error) {
        console.error("Erreur de transcription:", error);
        userInput.value = `Erreur de transcription: ${error.message}`;
        throw error;
    }
}

/* -----------------------------------------------------
   INTEGRATION GEMINI API (CERVEAU AGRICOLE)
------------------------------------------------------ */
const GEMINI_API_KEY = window.CONFIG?.GEMINI_API_KEY || "";


// Modèles ordonnés par priorité (testés et opérationnels)
const GEMINI_MODELS = [
    "gemini-2.5-flash-lite",    // Rapide et quota généreux
    "gemini-flash-lite-latest", // Flash Lite le plus récent
    "gemini-3.5-flash-lite",    // 500 RPD gratuit
    "gemini-flash-latest",      // Flash standard
    "gemini-2.5-flash"          // Fallback
];

const conversationHistory = [];

const SYSTEM_PROMPTS = {
    fr: "Tu es AgriVoice, assistant agricole pour les paysans et agriculteurs au Bénin et en Afrique de l'Ouest. RÈGLE ABSOLUE : Fais des réponses TRÈS COURTES, SIMPLES et CONCISES (3 à 4 phrases maximum, pas de longs discours). Donne directement la cause principale et 1 ou 2 solutions pratiques immédiates (ex: bio-pesticide neem, cendre, arrosage, engrais). Utilise des mots simples que tout agriculteur peut comprendre.",
    fon: "A nyí AgriVoice, alɔgɔtɔ́ glezɔ́ tɔn Benɛ tɔn. RÈGLE ABSOLUE : Ðɔ xó KLÉWÚN DÍDÍ (wěɖexámɛ 2 alǒ 3 kpowun). Zán xógbe bɔbɔ e glezɔ́watɔ́ bǐ na sè gbɔn ganjí é. Na nǔ e na wà tlɔlɔ é (neem, zǒfin, tɔsinnú).",
    yoruba: "AgriVoice ni ọ́, oluranlọwọ awọn agbẹ. RÈGLE ABSOLUE : Fun ni idahun KUKURU pupọ (awọn gbolohun 3 si 4 nikan). Sọ ohun to fa a ati ọna abayọ 1 tabi 2 lẹsẹkẹsẹ pẹlu ede to rọrun pupọ fun gbogbo agbẹ.",
    ewe: "AgriVoice nye wò ŋkɔ, agbletɔwo ƒe kpekpeɖeŋutɔ le Togo kple Benin. RÈGLE ABSOLUE : Na ŋuɖoɖo KPUI ŋutɔ (gbolohun 3 va ɖo 4 pɛ). Gblɔ nusi he dɔlea vɛ kple aɖaŋu 1 alo 2 si woawɔ enumake le Eʋegbe (Mina) bɔbɔe me (neem, dzofi, tsi)."
};

const chatForm = document.getElementById('chat-form');
const chatContainer = document.getElementById('chat-container');
const templateAssistant = document.getElementById('template-assistant');
const templateUser = document.getElementById('template-user');

if (userInput) {
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 128) + 'px';
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        const welcome = document.getElementById('welcome-screen');
        if (welcome) welcome.style.display = 'none';

        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        const loaderId = addMessage('<div class="flex items-center gap-2 text-agrigreen font-medium"><i class="fa-solid fa-circle-notch fa-spin text-xl"></i> <span>AgriVoice réfléchit aux meilleures recommandations...</span></div>', 'assistant', true);

        try {
            const botReply = await askGemini(text, currentLang);
            document.getElementById(loaderId)?.remove();
            addMessage(botReply, 'assistant', false, true);
        } catch (err) {
            console.error("Erreur Gemini:", err);
            document.getElementById(loaderId)?.remove();
            addMessage(`Désolé, une erreur est survenue : ${err.message || "Vérifiez votre connexion internet."}`, 'assistant');
        }
    });
}

async function askGemini(userText, lang) {
    const sysPrompt = SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.fr;
    
    conversationHistory.push({
        role: "user",
        parts: [{ text: userText }]
    });

    const payload = {
        systemInstruction: {
            parts: [{ text: sysPrompt }]
        },
        contents: conversationHistory,
        generationConfig: {
            thinkingConfig: { thinkingBudget: 0 },
            temperature: 0.7,
            maxOutputTokens: 2048
        }
    };

    let lastError = null;

    try {
        // Bascule automatique de modèle en cas de quota dépassé (429)
        for (const modelName of GEMINI_MODELS) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (response.status === 429) {
                    console.warn(`Quota atteint pour ${modelName}, bascule sur le modèle suivant...`);
                    continue;
                }

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errText}`);
                }

                const data = await response.json();
                const candidate = data.candidates?.[0];
                const replyText = candidate?.content?.parts?.[0]?.text || "Je n'ai pas pu générer de réponse.";

                conversationHistory.push({
                    role: "model",
                    parts: [{ text: replyText }]
                });

                return replyText;
            } catch (err) {
                lastError = err;
                console.warn(`Tentative échouée sur ${modelName}:`, err);
            }
        }
        throw lastError || new Error("Tous les modèles Gemini ont épuisé leur quota.");
    } catch (finalErr) {
        // En cas d'échec total, retirer le message utilisateur orphelin
        conversationHistory.pop();
        throw finalErr;
    }
}

function formatMarkdown(text) {
    return text
        .replace(/### (.*?)\n/g, '<h3 class="text-base md:text-lg font-bold text-agrigreen-dark mt-3 mb-1">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 class="text-lg md:text-xl font-bold text-agrigreen-dark mt-4 mb-2">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
        .replace(/^[0-9]+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
        .replace(/\n\n/g, '<div class="h-2"></div>')
        .replace(/\n/g, '<br>');
}

function addMessage(text, role, isHtml = false, withTTS = false) {
    const template = role === 'user' ? templateUser : templateAssistant;
    const clone = template.cloneNode(true);
    clone.id = 'msg-' + Date.now();
    clone.classList.remove('hidden');
    
    const contentDiv = clone.querySelector('.message-content');
    if (isHtml) {
        contentDiv.innerHTML = text;
    } else {
        contentDiv.innerHTML = formatMarkdown(text);
    }
    
    let createdTtsBtn = null;
    if (withTTS && role === 'assistant') {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'mt-3 flex items-center gap-2';
        
        const ttsBtn = document.createElement('button');
        ttsBtn.className = 'inline-flex items-center gap-2 bg-agrigreen-light/15 hover:bg-agrigreen hover:text-white text-agrigreen-dark text-xs font-bold px-3.5 py-1.5 rounded-full border border-agrigreen/30 transition shadow-sm cursor-pointer';
        ttsBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Écouter la voix IA</span>';
        
        ttsBtn.onclick = () => speakText(text, currentLang, ttsBtn);
        btnContainer.appendChild(ttsBtn);
        contentDiv.appendChild(btnContainer);
        createdTtsBtn = ttsBtn;
    }
    
    chatContainer.appendChild(clone);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // LECTURE AUTOMATIQUE
    if (withTTS && role === 'assistant' && createdTtsBtn) {
        speakText(text, currentLang, createdTtsBtn);
    }

    return clone.id;
}

/* -----------------------------------------------------
   SYNTHESE VOCALE HUMAINE IA (GEMINI TTS & META MMS-TTS FON)
------------------------------------------------------ */
const GEMINI_TTS_MODELS = [
    "gemini-3.1-flash-tts-preview",
    "gemini-2.5-flash-preview-tts"
];

let currentAudioSource = null;
let currentAudioContext = null;

async function speakText(text, lang, btnElement) {
    // Si un son est déjà en cours de lecture, on l'arrête immédiatement
    if (currentAudioSource) {
        try { 
            if (typeof currentAudioSource.stop === 'function') currentAudioSource.stop();
            if (typeof currentAudioSource.pause === 'function') currentAudioSource.pause();
        } catch (e) {}
        currentAudioSource = null;
        if (btnElement) {
            btnElement.classList.remove('bg-agrigreen', 'text-white');
            btnElement.querySelector('span').innerText = 'Écouter la voix IA';
            btnElement.querySelector('i').className = 'fa-solid fa-volume-high';
        }
        return;
    }

    // Nettoyer le texte du markdown
    const cleanText = text
        .replace(/[*#_`]/g, '')
        .replace(/\n+/g, ' ')
        .trim();

    if (!cleanText) return;

    if (btnElement) {
        btnElement.classList.add('bg-agrigreen', 'text-white');
        btnElement.querySelector('span').innerText = 'Génération de la voix...';
        btnElement.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
    }

    // 1. SI LA LANGUE EST LE FON : Utiliser le modèle Meta MMS-TTS Fon sur le serveur Gradio
    if (lang === 'fon') {
        try {
            const app = await window.gradioClient.connect("Max-Adis/agrivoice-fon-asr");
            const result = await app.predict("/synthese", [cleanText]);
            const audioObj = result.data[0];
            const audioUrl = typeof audioObj === 'string' ? audioObj : (audioObj?.url || audioObj?.name);
            if (audioUrl) {
                const fonAudio = new Audio(audioUrl);
                currentAudioSource = fonAudio;
                fonAudio.play();
                if (btnElement) {
                    btnElement.querySelector('span').innerText = 'Lecture Fon en cours (Cliquer pour stopper)...';
                    btnElement.querySelector('i').className = 'fa-solid fa-volume-high fa-beat';
                }
                fonAudio.onended = () => {
                    currentAudioSource = null;
                    if (btnElement) {
                        btnElement.classList.remove('bg-agrigreen', 'text-white');
                        btnElement.querySelector('span').innerText = 'Réécouter en Fon';
                        btnElement.querySelector('i').className = 'fa-solid fa-volume-high';
                    }
                };
                return;
            }
        } catch (fonErr) {
            console.warn("Erreur Fon TTS:", fonErr);
            if (btnElement) {
                btnElement.classList.remove('bg-agrigreen', 'text-white');
                btnElement.querySelector('span').innerText = 'Voix Fon indisponible';
                btnElement.querySelector('i').className = 'fa-solid fa-triangle-exclamation';
            }
            return;
        }
    }

    // 2. POUR LE FRANÇAIS, LE YORÙBÁ ET L'ÉWÉ : Modèle Gemini TTS Haute Fidélité (Kore)
    try {
        const ttsPayload = {
            contents: [{
                parts: [{ text: `Read aloud the following text transcript in a friendly, clear, natural human voice: ${cleanText}` }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Kore"
                        }
                    }
                }
            }
        };

        let base64Audio = null;
        let lastTtsError = null;

        for (const ttsModel of GEMINI_TTS_MODELS) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ttsPayload)
                });

                if (response.status === 429) {
                    console.warn(`Quota TTS atteint sur ${ttsModel}, essai suivant...`);
                    continue;
                }

                if (!response.ok) {
                    const errText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errText}`);
                }

                const data = await response.json();
                base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                if (base64Audio) break;
            } catch (err) {
                lastTtsError = err;
                console.warn(`Erreur TTS sur ${ttsModel}:`, err);
            }
        }

        if (!base64Audio) {
            throw lastTtsError || new Error("Quota TTS journalier atteint. La voix humaine reviendra dès le renouvellement des quotas.");
        }

        // Décodage du PCM 16-bit 24kHz brut vers Web Audio API
        const binary = atob(base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const int16Array = new Int16Array(bytes.buffer);
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
        }

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        currentAudioContext = new AudioContextClass({ sampleRate: 24000 });
        const audioBuffer = currentAudioContext.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);

        currentAudioSource = currentAudioContext.createBufferSource();
        currentAudioSource.buffer = audioBuffer;
        currentAudioSource.connect(currentAudioContext.destination);

        if (btnElement) {
            btnElement.querySelector('span').innerText = 'Lecture en cours (Cliquer pour stopper)...';
            btnElement.querySelector('i').className = 'fa-solid fa-volume-high fa-beat';
        }

        currentAudioSource.onended = () => {
            currentAudioSource = null;
            if (btnElement) {
                btnElement.classList.remove('bg-agrigreen', 'text-white');
                btnElement.querySelector('span').innerText = 'Réécouter la voix IA';
                btnElement.querySelector('i').className = 'fa-solid fa-volume-high';
            }
        };

        currentAudioSource.start();

    } catch (err) {
        console.warn("Erreur Gemini TTS:", err);
        if (btnElement) {
            btnElement.classList.remove('bg-agrigreen', 'text-white');
            btnElement.querySelector('span').innerText = 'Quota TTS atteint (Réessayer demain)';
            btnElement.querySelector('i').className = 'fa-solid fa-clock';
        }
    }
}

// Clics sur les cartes de suggestion de l'écran d'accueil
document.querySelectorAll('#welcome-screen .cursor-pointer').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3')?.innerText;
        if (title) {
            userInput.value = title;
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
});



