/* -----------------------------------------------------
   LOGIQUE DE TRADUCTION (I18N)
------------------------------------------------------ */
const i18n = {
    fr: {
        "menu_title": "Menu", "nav_home": "Assistant Vocal", "nav_resources": "Guides & Fiches", "nav_profile": "Profil Producteur", "nav_settings": "Paramètres",
        "new_question": "Nouvelle discussion", "app_desc": "L'assistant agricole intelligent, en langues locales et en français.",
        "welcome_title": "Bonjour, Bio", "welcome_desc": "Comment puis-je vous aider pour vos récoltes aujourd'hui ?",
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
        "welcome_title": "Kú àbɔ̀, Bio", "welcome_desc": "Nɛ̌ un ka sixú d'alɔ we gbɔn nú gle towe lɛ égbé ?",
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
        "welcome_title": "Ẹ n lẹ́ o, Bio", "welcome_desc": "Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́ pẹ̀lú oko rẹ lónìí ?",
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
        "welcome_title": "Woezɔ, Bio", "welcome_desc": "Aleke mate ŋu akpe ɖe ŋuwò le wò agblede ŋuti egbe ?",
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

const LANG_CONFIG = {
    fr: { label: "Français", code: "FR" },
    fon: { label: "Fɔngbe", code: "FON" },
    yoruba: { label: "Yorùbá", code: "YO" },
    ewe: { label: "Éwé", code: "EWE" }
};

let currentLang = 'fr';

function changeLang(langCode) {
    if (!LANG_CONFIG[langCode]) return;
    currentLang = langCode;
    
    // Mise à jour des textes i18n
    const dictionary = i18n[langCode];
    if (dictionary) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) el.innerText = dictionary[key];
        });
    }

    // Mise à jour des badges et labels
    const langInfo = LANG_CONFIG[langCode];
    const mobilePill = document.getElementById('mobile-lang-pill');
    if (mobilePill) mobilePill.innerText = langInfo.code;
    
    const promptLabel = document.getElementById('prompt-lang-label');
    if (promptLabel) promptLabel.innerText = langInfo.label;

    const selector = document.getElementById('lang-selector');
    if (selector) selector.value = langCode;

    // Mise à jour des boutons desktop
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        
    });
    const activeDesktopBtn = document.getElementById(`btn-lang-${langCode}`);
    if (activeDesktopBtn) {
        activeDesktopBtn.classList.add('active');
        
    }

    showToast(`Langue changée : ${langInfo.label}`);
}

function switchNextLang() {
    const langs = ['fr', 'fon', 'yoruba', 'ewe'];
    const currentIndex = langs.indexOf(currentLang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    changeLang(nextLang);
}

// Toast de feedback
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.classList.add('show');
    

    setTimeout(() => {
        toast.classList.remove('show');
        
    }, 2400);
}

/* -----------------------------------------------------
   UI NAVIGATION & DISCUSSION RESET
------------------------------------------------------ */
// toggleSidebar / openSidebar / closeSidebar sont définis dans index.html (inline)
// Ce bloc gère uniquement la navigation entre vues.

function switchView(viewId, element) {
    // Mise à jour des styles nav-item (inline styles dans le nouveau HTML)
    document.querySelectorAll('.nav-item').forEach(el => {
        el.style.background = '';
        el.style.color = 'rgba(255,255,255,.65)';
        el.style.fontWeight = '';
    });
    if (element) {
        element.style.background = 'rgba(255,255,255,.15)';
        element.style.color = '#fff';
        element.style.fontWeight = '700';
    }

    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId)?.classList.add('active');
}

function resetConversation() {
    conversationHistory.length = 0;
    
    // Supprime tous les messages du chat
    const chat = document.getElementById('chat-container');
    const welcome = document.getElementById('welcome-screen');
    
    // Garde uniquement le welcome-screen et les templates
    const messages = chat.querySelectorAll('.chat-bubble-instance');
    messages.forEach(m => m.remove());

    if (welcome) welcome.style.display = 'block';

    // Réinitialise le champ
    const input = document.getElementById('user-input');
    if (input) {
        input.value = '';
        input.style.height = 'auto';
    }

    switchView('view-chat', document.querySelector('.nav-item'));
    showToast("Nouvelle discussion démarrée");
}

function usePromptSuggestion(text) {
    const input = document.getElementById('user-input');
    if (!input) return;
    input.value = text;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 140) + 'px';
    chatForm.dispatchEvent(new Event('submit'));
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

const MODELS = {
    'fr': 'openai/whisper-large-v3-turbo',
    'yoruba': 'openai/whisper-large-v3-turbo',
    'ewe': 'openai/whisper-large-v3-turbo',
    'fon': 'chrisjay/fonxlsr'
};

if (micBtn) {
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
                micBtn.classList.add('mic-recording');
                if (recStatus) recStatus.style.display = 'flex';
            } catch (err) {
                console.error("Erreur d'accès au micro:", err);
                alert("Accès au microphone refusé ou indisponible.");
            }
        } else {
            mediaRecorder.stop();
            isRecording = false;
            micBtn.classList.remove('mic-recording');
            if (recStatus) recStatus.style.display = 'none';
            
            if (userInput) userInput.value = `Transcription en cours (${currentLang.toUpperCase()})...`;
        }
    });
}

async function transcribeAudio(audioBlob) {
    const model = MODELS[currentLang];
    
    try {
        if (currentLang === 'fon') {
            const app = await window.gradioClient.connect("Max-Adis/agrivoice-fon-asr");
            const result = await app.predict("/transcrire", [audioBlob]);
            const text = result.data[0];
            if (userInput) {
                userInput.value = text;
                userInput.style.height = 'auto';
                userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
            }
            return text;
        } else {
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
            if (userInput) {
                userInput.value = text;
                userInput.style.height = 'auto';
                userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
            }
            return text;
        }
    } catch (error) {
        console.error("Erreur de transcription:", error);
        if (userInput) userInput.value = `Erreur de transcription: ${error.message}`;
        throw error;
    }
}

/* -----------------------------------------------------
   INTEGRATION GEMINI API (CERVEAU AGRICOLE)
------------------------------------------------------ */
const GEMINI_API_KEY = window.CONFIG?.GEMINI_API_KEY || "";

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
        this.style.height = Math.min(this.scrollHeight, 140) + 'px';
    });

    // Envoi avec Entrée (sauf shift+entrée)
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

        addMessage(text, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        const loaderId = addMessage('<div class="flex items-center gap-2.5 text-agrigreen font-semibold"><i class="fa-solid fa-sparkles fa-spin text-lg text-agriyellow"></i> <span class="gemini-gradient-text font-bold">AgriVoice analyse votre demande...</span></div>', 'assistant', true);

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
        conversationHistory.pop();
        throw finalErr;
    }
}

function formatMarkdown(text) {
    return text
        .replace(/### (.*?)\n/g, '<h3 class="text-base font-bold text-gray-900 mt-3 mb-1">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 class="text-lg font-bold text-gray-900 mt-4 mb-2">$1</h2>')
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
    clone.classList.add('chat-bubble-instance'); clone.style.display = 'flex';
    
    const contentDiv = clone.querySelector('.message-content');
    if (isHtml) {
        contentDiv.innerHTML = text;
    } else {
        contentDiv.innerHTML = formatMarkdown(text);
    }
    
    let createdTtsBtn = null;
    if (withTTS && role === 'assistant') {
        // Barre d'outils Style Google Gemini
        const actionToolbar = document.createElement('div');
        actionToolbar.style.cssText = 'margin-top:12px;padding-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid #f1f5f9';
        
        // 1. Bouton Écouter la voix IA
        const ttsBtn = document.createElement('button');
        ttsBtn.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#016a33;font-size:12px;font-weight:700;padding:5px 14px;border-radius:9999px;border:1px solid #bbf7d0;cursor:pointer;font-family:inherit;transition:all .15s';
        ttsBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Écouter la voix IA</span>';
        ttsBtn.onclick = () => speakText(text, currentLang, ttsBtn);
        actionToolbar.appendChild(ttsBtn);
        createdTtsBtn = ttsBtn;

        // 2. Bouton Copier
        const copyBtn = document.createElement('button');
        copyBtn.style.cssText = 'width:32px;height:32px;border-radius:50%;background:#f3f4f6;border:none;color:#6b7280;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .15s';
        copyBtn.title = 'Copier la réponse';
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        copyBtn.onclick = () => {
            const cleanText = text.replace(/[*#_`]/g, '').trim();
            navigator.clipboard.writeText(cleanText).then(() => {
                showToast('Réponse copiée dans le presse-papier');
                copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-600"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            });
        };
        actionToolbar.appendChild(copyBtn);

        // 3. Boutons Feedback (Pouce haut / bas)
        const thumbUp = document.createElement('button');
        thumbUp.style.cssText = 'width:32px;height:32px;border-radius:50%;background:#f3f4f6;border:none;color:#6b7280;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .15s';
        thumbUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
        thumbUp.onclick = () => {
            thumbUp.classList.toggle('text-agrigreen');
            showToast('Merci pour votre retour !');
        };
        actionToolbar.appendChild(thumbUp);

        contentDiv.appendChild(actionToolbar);
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
    if (currentAudioSource) {
        try { 
            if (typeof currentAudioSource.stop === 'function') currentAudioSource.stop();
            if (typeof currentAudioSource.pause === 'function') currentAudioSource.pause();
        } catch (e) {}
        currentAudioSource = null;
        if (btnElement) {
            btnElement.style.background = '#f0fdf4'; btnElement.style.color = '#016a33';
            
            btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Écouter la voix IA</span>';
        }
        return;
    }

    const cleanText = text
        .replace(/[*#_`]/g, '')
        .replace(/\n+/g, ' ')
        .trim();

    if (!cleanText) return;

    if (btnElement) {
        //noop
        btnElement.style.background = '#016a33'; btnElement.style.color = '#fff';
        btnElement.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Génération de la voix...</span>';
    }

    // 1. FON : Modèle Meta MMS-TTS
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
                    btnElement.innerHTML = '<span class="audio-wave-bar"></span><span class="audio-wave-bar"></span><span class="audio-wave-bar"></span> <span>Lecture Fon...</span>';
                }
                fonAudio.onended = () => {
                    currentAudioSource = null;
                    if (btnElement) {
                        btnElement.style.background = '#f0fdf4'; btnElement.style.color = '#016a33';
                        
                        btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Réécouter en Fon</span>';
                    }
                };
                return;
            }
        } catch (fonErr) {
            console.warn("Erreur Fon TTS:", fonErr);
            if (btnElement) {
                btnElement.style.background = '#f0fdf4'; btnElement.style.color = '#016a33';
                
                btnElement.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>Voix Fon indisponible</span>';
            }
            return;
        }
    }

    // 2. FRANÇAIS, YORÙBÁ, ÉWÉ : Gemini TTS Kore
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
            btnElement.innerHTML = '<span class="audio-wave-bar"></span><span class="audio-wave-bar"></span><span class="audio-wave-bar"></span> <span>Lecture en cours...</span>';
        }

        currentAudioSource.onended = () => {
            currentAudioSource = null;
            if (btnElement) {
                btnElement.style.background = '#f0fdf4'; btnElement.style.color = '#016a33';
                
                btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Réécouter la voix IA</span>';
            }
        };

        currentAudioSource.start();

    } catch (err) {
        console.warn("Erreur Gemini TTS:", err);
        if (btnElement) {
            btnElement.style.background = '#f0fdf4'; btnElement.style.color = '#016a33';
            
            btnElement.innerHTML = '<i class="fa-solid fa-clock"></i> <span>Quota TTS atteint (Demain)</span>';
        }
    }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    changeLang('fr');
});
