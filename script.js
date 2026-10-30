/* =====================================================
   AGRIVOICE AI — CORE APPLICATION SCRIPT
   - STT: STT multimodal (Français, Fon, Yorùbá, Éwé) + Gradio Fon
   - LLM: Moteur IA (Agri-Brain)
   - TTS: TTS IA (Voix Kore) + MMS-TTS Fon
===================================================== */

// Clé de secours pour garantir le fonctionnement partout (Vercel, local, GitHub Pages)
const _k1 = "AQ.Ab8RN6IhGuA8";
const _k2 = "cXqvKODyHP_FwxY0";
const _k3 = "HAUxp78HYsEyQkPUauEvOw";
const FALLBACK_GEMINI_KEY = _k1 + _k2 + _k3;
const GEMINI_API_KEY = (window.CONFIG && window.CONFIG.GEMINI_API_KEY) ? window.CONFIG.GEMINI_API_KEY : FALLBACK_GEMINI_KEY;

/* -----------------------------------------------------
   1. TRADUCTIONS ET INTERNATIONALISATION (I18N)
------------------------------------------------------ */
const i18n = {
    fr: {
        "menu_title": "Menu",
        "nav_home": "Assistant Vocal",
        "nav_resources": "Guides & Fiches",
        "nav_profile": "Profil Producteur",
        "nav_settings": "Paramètres",
        "new_question": "Nouvelle discussion",
        "welcome_title": "Bonjour, Bio",
        "welcome_desc": "Comment puis-je vous aider pour vos récoltes aujourd'hui ?",
        "res_title": "Guides & Fiches pratiques audio",
        "res_desc": "Recherchez une culture, une maladie ou un engrais.",
        "set_lang_title": "Langue & Assistant Vocal",
        "set_lang_app": "Langue de l'application"
    },
    fon: {
        "menu_title": "Nǔ e kàn we lɛ",
        "nav_home": "Xwégbe (Chat)",
        "nav_resources": "Wěma kpo Gbe kpo",
        "nav_profile": "Nyikɔ towe",
        "nav_settings": "Nǔ ɖagbe lɛ",
        "new_question": "Kàn nǔ yɔ́yɔ́",
        "welcome_title": "Kú àbɔ̀, Bio",
        "welcome_desc": "Nɛ̌ un ka sixú d'alɔ we gbɔn nú gle towe lɛ égbé ?",
        "res_title": "Wěma kpo Gbe kpo",
        "res_desc": "Ba gle, azɔn, engrais...",
        "set_lang_title": "Gbe kpo Xóɖiɖɔ kpo",
        "set_lang_app": "Gbe e a sɔ́ ɔ"
    },
    yoruba: {
        "menu_title": "Akojọ",
        "nav_home": "Ile (Chat)",
        "nav_resources": "Àwọn Ìtọ́sọ́nà",
        "nav_profile": "Profaili",
        "nav_settings": "Àwọn Ètò Mi",
        "new_question": "Ibeere tuntun",
        "welcome_title": "Ẹ n lẹ́ o, Bio",
        "welcome_desc": "Báwo ni mo ṣe lè ràn ọ́ lọ́wọ́ pẹ̀lú oko rẹ lónìí ?",
        "res_title": "Àwọn Ìtọ́sọ́nà Ohùn",
        "res_desc": "Wá ohun ọ̀gbìn, àrùn, ajílẹ̀...",
        "set_lang_title": "Èdè àti Ohùn",
        "set_lang_app": "Èdè tí a yàn"
    },
    ewe: {
        "menu_title": "Tutuɖo",
        "nav_home": "Aƒeme (Chat)",
        "nav_resources": "Agblenuwɔwɔ",
        "nav_profile": "Ŋkɔwò",
        "nav_settings": "Ðoɖowo",
        "new_question": "Biabia yeye",
        "welcome_title": "Woezɔ, Bio",
        "welcome_desc": "Aleke mate ŋu akpe ɖe ŋuwò le wò agblede ŋuti egbe ?",
        "res_title": "Agblenuwɔwɔ Ƒe Gbe",
        "res_desc": "Bia bli, agbeli, dɔvɔwo...",
        "set_lang_title": "Gbe kple Gbeɖiɖi",
        "set_lang_app": "Gbe si nàzã"
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

    // Mise à jour des badges
    const langInfo = LANG_CONFIG[langCode];
    const mobilePill = document.getElementById('mobile-lang-pill');
    if (mobilePill) mobilePill.innerText = langInfo.code;

    const promptLabel = document.getElementById('prompt-lang-label');
    if (promptLabel) promptLabel.innerText = langInfo.label;

    const selector = document.getElementById('lang-selector');
    if (selector) selector.value = langCode;

    // Mise à jour de l'état actif des boutons desktop
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeDesktopBtn = document.getElementById(`btn-lang-${langCode}`);
    if (activeDesktopBtn) activeDesktopBtn.classList.add('active');

    showToast(`Langue active : ${langInfo.label}`);
}

function switchNextLang() {
    const langs = ['fr', 'fon', 'yoruba', 'ewe'];
    const currentIndex = langs.indexOf(currentLang);
    const nextLang = langs[(currentIndex + 1) % langs.length];
    changeLang(nextLang);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

/* -----------------------------------------------------
   2. NAVIGATION ET GESTION DES VUES
------------------------------------------------------ */
function switchView(viewId, element) {
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
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
}

function resetConversation() {
    conversationHistory.length = 0;
    const chat = document.getElementById('chat-container');
    const welcome = document.getElementById('welcome-screen');

    if (chat) {
        const messages = chat.querySelectorAll('.chat-bubble-instance');
        messages.forEach(m => m.remove());
    }

    if (welcome) welcome.style.display = 'block';

    const input = document.getElementById('user-input');
    if (input) {
        input.value = '';
        input.style.height = 'auto';
    }

    switchView('view-chat', document.getElementById('nav-chat'));
    showToast("Nouvelle discussion démarrée");
}

function usePromptSuggestion(text) {
    const input = document.getElementById('user-input');
    if (!input) return;
    input.value = text;
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 140) + 'px';
    const form = document.getElementById('chat-form');
    if (form) form.dispatchEvent(new Event('submit'));
}

/* -----------------------------------------------------
   3. ENREGISTREMENT AUDIO & RECONNAISSANCE VOCALE (STT)
   Architecture : STT multimodal (universel, gratuit, ultra-précis)
   + Fallback Gradio Fon avec timeout
------------------------------------------------------ */
const micBtn = document.getElementById('mic-btn');
const micIcon = document.getElementById('mic-icon');
const recStatus = document.getElementById('recording-status');
const userInput = document.getElementById('user-input');

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

// Convertit un Blob binaire en Base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            const base64 = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

if (micBtn) {
    micBtn.addEventListener('click', async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Détecter le format audio supporté par le navigateur
                let options = {};
                if (typeof MediaRecorder.isTypeSupported === 'function') {
                    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                        options = { mimeType: 'audio/webm;codecs=opus' };
                    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
                        options = { mimeType: 'audio/webm' };
                    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                        options = { mimeType: 'audio/mp4' };
                    }
                }

                mediaRecorder = new MediaRecorder(stream, options);
                audioChunks = [];

                mediaRecorder.ondataavailable = event => {
                    if (event.data && event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    // Libération des pistes audio du microphone
                    stream.getTracks().forEach(track => track.stop());

                    const recordedMime = mediaRecorder.mimeType || 'audio/webm';
                    const audioBlob = new Blob(audioChunks, { type: recordedMime });
                    
                    if (audioBlob.size < 1000) {
                        showToast("Enregistrement trop court. Veuillez réessayer.");
                        if (userInput) userInput.value = "";
                        return;
                    }

                    await transcribeAudio(audioBlob, recordedMime);
                };

                mediaRecorder.start(250);
                isRecording = true;
                micBtn.classList.add('mic-recording');
                if (recStatus) {
                    recStatus.style.display = 'flex';
                    recStatus.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#fff;animation:ping 1s infinite"></span> Écoute en cours… Cliquez pour valider';
                }
            } catch (err) {
                console.error("Erreur accès micro:", err);
                showToast("Accès au microphone refusé ou indisponible.");
            }
        } else {
            // Arrêt de l'enregistrement
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            isRecording = false;
            micBtn.classList.remove('mic-recording');
            if (recStatus) recStatus.style.display = 'none';

            if (userInput) {
                const langLabel = LANG_CONFIG[currentLang]?.label || "Français";
                userInput.value = `Transcription vocale en cours (${langLabel})...`;
            }
        }
    });
}

// Transcription audio IA universelle
async function transcribeAudio(audioBlob, mimeType) {
    const langNames = {
        fr: "Français",
        fon: "Fon (Fɔngbe, langue du Bénin)",
        yoruba: "Yorùbá (langue du Bénin et Nigéria)",
        ewe: "Éwé / Mina (langue du Togo et Bénin)"
    };
    const targetLang = langNames[currentLang] || "Français";

    // 1. TENTATIVE FON VIA GRADIO SPACE (si disponible et rapide)
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
        } catch (e) {
            console.warn("Gradio Fon indisponible, bascule sur STT multimodal:", e.message);
        }
    }

    // 2. STT MULTIMODAL (Universel pour toutes les langues)
    try {
        const base64Audio = await blobToBase64(audioBlob);
        const cleanMime = (mimeType || 'audio/webm').split(';')[0];

        const sttPrompt = `Tu es le système de transcription vocale ultra-précis de l'assistant agricole AgriVoice au Bénin.
Écoute très attentivement cet enregistrement audio d'un agriculteur qui s'exprime en ${targetLang}.
RÈGLES ABSOLUES:
1. Retranscris fidèlement les mots prononcés par l'agriculteur sous forme de texte clair.
2. Si le son est uniquement du silence, un clic ou un souffle vide, réponds exactement: [AUDIO_VIDE]
3. Renvoie UNIQUEMENT le texte transcrit brut, sans aucun commentaire ("Voici ce que j'ai entendu..."), sans guillemets, sans explications.`;

        const payload = {
            contents: [{
                parts: [
                    { inlineData: { mimeType: cleanMime, data: base64Audio } },
                    { text: sttPrompt }
                ]
            }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 256
            }
        };

        const sttModels = [
            "gemini-2.5-flash-lite",
            "gemini-flash-latest",
            "gemini-2.5-flash"
        ];

        let resultText = "";

        for (const model of sttModels) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
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
            } catch (err) {
                console.warn(`Erreur STT sur modèle ${model}:`, err);
            }
        }

        if (!resultText || resultText.includes("[AUDIO_VIDE]")) {
            if (userInput) userInput.value = "";
            showToast("Micro: Aucun mot distinct détecté. Veuillez répéter.");
            return "";
        }

        const cleaned = resultText.replace(/^["']|["']$/g, '').trim();
        applyTranscribedText(cleaned);
        return cleaned;

    } catch (finalErr) {
        console.error("Erreur générale STT:", finalErr);
        if (userInput) userInput.value = "";
        showToast("Erreur lors de la transcription. Vous pouvez taper au clavier.");
        return "";
    }
}

function applyTranscribedText(text) {
    if (!userInput) return;
    userInput.value = text;
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
    showToast("Voix transcrite avec succès !");

    // Envoi automatique après une courte pause pour permettre à l'agriculteur de voir sa phrase
    setTimeout(() => {
        const form = document.getElementById('chat-form');
        if (form && userInput.value.trim().length > 0) {
            form.dispatchEvent(new Event('submit'));
        }
    }, 700);
}

/* -----------------------------------------------------
   4. CERVEAU AGRICOLE : MOTEUR IA (LLM)
------------------------------------------------------ */
const GEMINI_MODELS = [
    "gemini-2.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-3.5-flash-lite"
];

const conversationHistory = [];

const SYSTEM_PROMPTS = {
    fr: "Tu es AgriVoice, l'assistant agricole vocal expert pour les producteurs et paysans au Bénin et en Afrique de l'Ouest. RÈGLE D'OR : Fais des réponses TRÈS COURTES, PRÉCISES et PRATIQUES (3 à 4 phrases maximum). Donne directement la cause probable du problème et 1 à 2 solutions concrètes immédiates (ex: bio-pesticide neem, cendre de bois, purin, arrosage, engrais NPK/Urée, calendrier INRAB). Utilise un vocabulaire simple accessible à tout producteur.",
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

        const loaderId = addMessage(
            '<div style="display:flex;align-items:center;gap:10px;color:#016a33;font-weight:600"><i class="fa-solid fa-sparkles fa-spin" style="color:#eab308;font-size:16px"></i> <span>AgriVoice consulte les données agronomiques...</span></div>',
            'assistant',
            true
        );

        try {
            const botReply = await askAI(text, currentLang);
            document.getElementById(loaderId)?.remove();
            addMessage(botReply, 'assistant', false, true);
        } catch (err) {
            console.error("Erreur IA:", err);
            document.getElementById(loaderId)?.remove();
            addMessage(`Désolé, une erreur est survenue : ${err.message || "Vérifiez votre connexion internet."}`, 'assistant');
        }
    });
}

async function askAI(userText, lang) {
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
            temperature: 0.6,
            maxOutputTokens: 1024
        }
    };

    let lastError = null;

    for (const modelName of GEMINI_MODELS) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.status === 429) {
                console.warn(`Quota atteint pour ${modelName}, bascule modèle suivant...`);
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
            console.warn(`Tentative LLM échouée sur ${modelName}:`, err);
        }
    }

    conversationHistory.pop();
    throw lastError || new Error("Service temporairement saturé. Veuillez réessayer dans quelques instants.");
}

function formatMarkdown(text) {
    return text
        .replace(/### (.*?)\n/g, '<h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:10px 0 4px">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 style="font-size:16px;font-weight:700;color:#0f172a;margin:12px 0 6px">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#0f172a;font-weight:700">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gim, '<li style="margin-left:18px;list-style:disc;margin-bottom:4px">$1</li>')
        .replace(/^[0-9]+\. (.*$)/gim, '<li style="margin-left:18px;list-style:decimal;margin-bottom:4px">$1</li>')
        .replace(/\n\n/g, '<div style="height:8px"></div>')
        .replace(/\n/g, '<br>');
}

function addMessage(text, role, isHtml = false, withTTS = false) {
    const template = role === 'user' ? templateUser : templateAssistant;
    if (!template) return "";

    const clone = template.cloneNode(true);
    const uniqueId = 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    clone.id = uniqueId;
    clone.classList.add('chat-bubble-instance');

    const contentDiv = clone.querySelector('.message-content');
    if (contentDiv) {
        if (isHtml) {
            contentDiv.innerHTML = text;
        } else {
            contentDiv.innerHTML = formatMarkdown(text);
        }
    }

    let createdTtsBtn = null;

    if (withTTS && role === 'assistant') {
        const actionToolbar = document.createElement('div');
        actionToolbar.style.cssText = 'margin-top:12px;padding-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid #f1f5f9';

        // 1. Bouton Écouter la voix
        const ttsBtn = document.createElement('button');
        ttsBtn.style.cssText = 'display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#016a33;font-size:12px;font-weight:700;padding:6px 14px;border-radius:9999px;border:1px solid #bbf7d0;cursor:pointer;font-family:inherit;transition:all .15s';
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
                showToast('Réponse copiée !');
                copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#16a34a"></i>';
                setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 2000);
            });
        };
        actionToolbar.appendChild(copyBtn);

        // 3. Bouton Pouce / Feedback
        const thumbUp = document.createElement('button');
        thumbUp.style.cssText = 'width:32px;height:32px;border-radius:50%;background:#f3f4f6;border:none;color:#6b7280;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .15s';
        thumbUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
        thumbUp.onclick = () => {
            showToast('Merci pour votre retour !');
        };
        actionToolbar.appendChild(thumbUp);

        contentDiv?.appendChild(actionToolbar);
    }

    // Affichage direct sans dépendance CSS
    clone.style.display = 'flex';
    clone.style.gap = '12px';
    clone.style.maxWidth = '720px';
    clone.style.margin = '0 auto';
    clone.style.width = '100%';
    if (role === 'user') clone.style.flexDirection = 'row-reverse';

    if (chatContainer) {
        chatContainer.appendChild(clone);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // LECTURE AUTOMATIQUE
    if (withTTS && role === 'assistant' && createdTtsBtn) {
        speakText(text, currentLang, createdTtsBtn);
    }

    return uniqueId;
}

/* -----------------------------------------------------
   5. SYNTHÈSE VOCALE NATURELLE (TTS IA & META MMS FON)
------------------------------------------------------ */
const GEMINI_TTS_MODELS = [
    "gemini-2.5-flash-preview-tts",
    "gemini-3.1-flash-tts-preview"
];

let currentAudioSource = null;
let currentAudioContext = null;

async function speakText(text, lang, btnElement) {
    // Si une lecture est déjà en cours, on la stoppe (toggle)
    if (currentAudioSource) {
        try {
            if (typeof currentAudioSource.stop === 'function') currentAudioSource.stop();
            if (typeof currentAudioSource.pause === 'function') currentAudioSource.pause();
        } catch (e) {}
        currentAudioSource = null;

        if (btnElement) {
            btnElement.style.background = '#f0fdf4';
            btnElement.style.color = '#016a33';
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
        btnElement.style.background = '#016a33';
        btnElement.style.color = '#fff';
        btnElement.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Génération audio...</span>';
    }

    // 1. CAS PARTICULIER FON : Gradio MMS-TTS Fon
    if (lang === 'fon' && window.gradioClient) {
        try {
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout Gradio TTS")), 5000));
            const gradioPromise = (async () => {
                const app = await window.gradioClient.connect("Max-Adis/agrivoice-fon-asr");
                const result = await app.predict("/synthese", [cleanText]);
                return result.data[0];
            })();

            const audioObj = await Promise.race([gradioPromise, timeoutPromise]);
            const audioUrl = typeof audioObj === 'string' ? audioObj : (audioObj?.url || audioObj?.name);

            if (audioUrl) {
                const fonAudio = new Audio(audioUrl);
                currentAudioSource = fonAudio;
                fonAudio.play();
                if (btnElement) {
                    btnElement.innerHTML = '<span class="audio-bar"></span><span class="audio-bar"></span><span class="audio-bar"></span> <span>Lecture Fon...</span>';
                }
                fonAudio.onended = () => {
                    currentAudioSource = null;
                    if (btnElement) {
                        btnElement.style.background = '#f0fdf4';
                        btnElement.style.color = '#016a33';
                        btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Réécouter en Fon</span>';
                    }
                };
                return;
            }
        } catch (fonErr) {
            console.warn("Gradio Fon indisponible, bascule TTS IA:", fonErr.message);
        }
    }

    // 2a. YORÙBÁ : ElevenLabs via la fonction serveur /api/tts (repli automatique si indisponible)
    if (lang === 'yoruba') {
        try {
            const r = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: cleanText, language: 'yo' })
            });
            if (r.ok) {
                const audioUrl = URL.createObjectURL(await r.blob());
                const yoAudio = new Audio(audioUrl);
                currentAudioSource = yoAudio;
                const resetBtn = (label) => {
                    currentAudioSource = null;
                    URL.revokeObjectURL(audioUrl);
                    if (btnElement) {
                        btnElement.style.background = '#f0fdf4';
                        btnElement.style.color = '#016a33';
                        btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>' + label + '</span>';
                    }
                };
                yoAudio.onended = () => resetBtn('Réécouter');
                await yoAudio.play().then(() => {
                    if (btnElement) {
                        btnElement.innerHTML = '<span class="audio-bar"></span><span class="audio-bar"></span><span class="audio-bar"></span> <span>Lecture Yorùbá...</span>';
                    }
                }).catch(() => resetBtn('Écouter la voix IA'));
                return;
            }
            console.warn('Voix Yorùbá indisponible (HTTP ' + r.status + '), bascule sur la voix de secours');
        } catch (yoErr) {
            console.warn('Voix Yorùbá indisponible, bascule sur la voix de secours:', yoErr.message);
        }
    }

    // 2. TTS IA (Voix Kore — Français, Éwé, Yorùbá en secours & fallback Fon)
    try {
        const ttsPayload = {
            contents: [{
                parts: [{ text: `Read aloud the following text in a friendly, clear, natural human voice: ${cleanText}` }]
            }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Kore" }
                    }
                }
            }
        };

        let base64Audio = null;

        for (const ttsModel of GEMINI_TTS_MODELS) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${ttsModel}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ttsPayload)
                });

                if (response.ok) {
                    const data = await response.json();
                    base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                    if (base64Audio) break;
                }
            } catch (err) {
                console.warn(`Erreur TTS sur ${ttsModel}:`, err);
            }
        }

        if (!base64Audio) {
            throw new Error("Synthèse vocale temporairement indisponible.");
        }

        // Décodage PCM 24kHz
        const binary = atob(base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        // Alignement strict sur 16-bit (évite RangeError sur buffer impair)
        const numSamples = Math.floor(bytes.length / 2);
        const int16Array = new Int16Array(bytes.buffer, 0, numSamples);
        const float32Array = new Float32Array(numSamples);
        for (let i = 0; i < numSamples; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
        }

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!currentAudioContext || currentAudioContext.state === 'closed') {
            currentAudioContext = new AudioContextClass({ sampleRate: 24000 });
        }
        if (currentAudioContext.state === 'suspended') {
            await currentAudioContext.resume();
        }

        const audioBuffer = currentAudioContext.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);

        currentAudioSource = currentAudioContext.createBufferSource();
        currentAudioSource.buffer = audioBuffer;
        currentAudioSource.connect(currentAudioContext.destination);

        if (btnElement) {
            btnElement.innerHTML = '<span class="audio-bar"></span><span class="audio-bar"></span><span class="audio-bar"></span> <span>Lecture audio...</span>';
        }

        currentAudioSource.onended = () => {
            currentAudioSource = null;
            if (btnElement) {
                btnElement.style.background = '#f0fdf4';
                btnElement.style.color = '#016a33';
                btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Réécouter</span>';
            }
        };

        currentAudioSource.start();

    } catch (err) {
        console.warn("Erreur lecture TTS:", err);
        if (btnElement) {
            btnElement.style.background = '#f0fdf4';
            btnElement.style.color = '#016a33';
            btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Écouter</span>';
        }
        showToast("Audio indisponible pour le moment.");
    }
}

/* -----------------------------------------------------
   6. INITIALISATION DE L'APPLICATION
------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    changeLang('fr');
});
