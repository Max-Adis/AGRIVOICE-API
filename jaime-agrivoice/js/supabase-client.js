/**
 * supabase-client.js
 * Client Supabase pour J'aime AgriVoice.
 *
 * CONFIGURATION (une seule fois) :
 *   1. Créez un projet sur https://supabase.com (gratuit)
 *   2. Remplacez SUPABASE_URL et SUPABASE_ANON_KEY ci-dessous
 *      (Settings → API dans votre dashboard Supabase)
 *   3. Lancez supabase_schema.sql dans l'éditeur SQL Supabase
 *   4. Créez le bucket "agrivoice-audios" en Storage (accès public activé)
 */

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
export const SUPABASE_URL      = "https://pxbvztliwjhnyyxrbhof.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnZ6dGxpd2pobnl5eHJiaG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjYzNjYsImV4cCI6MjEwNTEwMjM2Nn0.oaIkxdjfCl4Qx9hEG_d8DdKY25Oa-gOOxScHO7nNV3k";
export const AUDIO_BUCKET      = "agrivoice-audios";



// ─── INIT ─────────────────────────────────────────────────────────────────────
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── CONNEXION ────────────────────────────────────────────────────────────────
export async function checkConnection() {
  try {
    const { error } = await supabase.from("word_prompts").select("id").limit(1);
    return !error;
  } catch { return false; }
}

// ─── CONTRIBUTION ─────────────────────────────────────────────────────────────
/**
 * Upload audio + enregistrement DB.
 * @param {Blob}   audioBlob
 * @param {Object} prompt      — { id, word, language, edgeLabel, category }
 * @param {string} session     — ID anonyme
 * @param {number} durationMs
 * @param {string} [name]      — Prénom du contributeur (optionnel, lus depuis localStorage si absent)
 */
export async function uploadContribution(audioBlob, prompt, session, durationMs, name) {
  const ext         = audioBlob.type.includes("wav") ? "wav" : "webm";
  const ts          = Date.now();
  const fileName    = `${prompt.edgeLabel}_${ts}_${session.slice(0, 8)}.${ext}`;
  const storagePath = `${prompt.language}/${prompt.edgeLabel}/${fileName}`;

  const { error: uploadErr } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(storagePath, audioBlob, { contentType: audioBlob.type, upsert: false });

  if (uploadErr) return { data: null, error: uploadErr };

  const { data: urlData } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(storagePath);
  const audioUrl = urlData?.publicUrl || "";

  const { data, error } = await supabase
    .from("contributions")
    .insert([{
      word_id:             prompt.id,
      word:                prompt.word,
      language:            prompt.language,
      audio_url:           audioUrl,
      audio_format:        ext,
      duration_ms:         Math.round(durationMs),
      contributor_session: session,
      contributor_name:    name || getContributorName() || null,
      edge_label:          prompt.edgeLabel,
      status:              "pending",
    }])
    .select()
    .single();

  return { data, error };
}

// ─── STATISTIQUES ─────────────────────────────────────────────────────────────

/** Récupère toutes les lignes paginées (contourne le plafond de 1 000 lignes de Supabase) */
async function fetchAllRows(queryFn, chunkSize = 1000) {
  let allRows = [];
  let from = 0;
  while (true) {
    const { data, error } = await queryFn(from, from + chunkSize - 1);
    if (error) {
      console.error("Erreur fetchAllRows:", error);
      break;
    }
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < chunkSize) break;
    from += chunkSize;
  }
  return allRows;
}

/** Comptage de contributions par mot (pending + validated). */
export async function getContributionCounts() {
  const data = await fetchAllRows((from, to) =>
    supabase
      .from("contributions")
      .select("word_id")
      .in("status", ["pending", "validated"])
      .range(from, to)
  );

  const counts = {};
  (data || []).forEach(r => { counts[r.word_id] = (counts[r.word_id] || 0) + 1; });
  return counts;
}

/** Stats globales : total, validated, pending, today, byLang. */
export async function getGlobalStats() {
  const [totRes, valRes, pendRes, todayRes, allLangs] = await Promise.all([
    supabase.from("contributions").select("id", { count: "exact", head: true }),
    supabase.from("contributions").select("id", { count: "exact", head: true }).eq("status", "validated"),
    supabase.from("contributions").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("contributions").select("id", { count: "exact", head: true })
      .gte("created_at", new Date(Date.now() - 86400000).toISOString()),
    fetchAllRows((from, to) =>
      supabase
        .from("contributions")
        .select("language")
        .in("status", ["pending", "validated"])
        .range(from, to)
    )
  ]);

  const byLang = { fon: 0, yoruba: 0, french: 0 };
  (allLangs || []).forEach(r => { byLang[r.language] = (byLang[r.language] || 0) + 1; });

  return {
    total:     totRes.count   || 0,
    validated: valRes.count   || 0,
    pending:   pendRes.count  || 0,
    today:     todayRes.count || 0,
    byLang,
  };
}

/**
 * Top contributeurs — triés par audios VALIDÉS (puis par total/pending).
 * Inclut le count pending pour affichage "en attente de validation".
 * Récupère 100% de la base de données via pagination par tranches.
 */
export async function getTopContributors(limit = 100) {
  const data = await fetchAllRows((from, to) =>
    supabase
      .from("contributions")
      .select("contributor_session, contributor_name, language, status, created_at")
      .order("created_at", { ascending: true })
      .range(from, to)
  );

  const map = {};
  (data || []).forEach(r => {
    const rawName = (r.contributor_name || "").trim();
    const isNamed = rawName && rawName.toLowerCase() !== "anonyme" && !rawName.toLowerCase().startsWith("contributeur_");
    
    // Regroupement par pseudo si défini (insensible à la casse), sinon par session
    const key = isNamed ? `user_${rawName.toLowerCase()}` : `sess_${r.contributor_session}`;
    
    if (!map[key]) {
      map[key] = {
        session: r.contributor_session,
        sessions: new Set([r.contributor_session]),
        name: rawName || "Anonyme",
        isNamed: isNamed,
        validated: 0,
        pending: 0,
        total: 0,
        langs: new Set()
      };
    } else {
      map[key].sessions.add(r.contributor_session);
      // Prioriser un vrai prénom s'il a été mis à jour dans un enregistrement ultérieur
      if (isNamed) {
        map[key].name = rawName;
        map[key].isNamed = true;
      }
    }

    map[key].total++;
    if (r.status === "validated") {
      map[key].validated++;
      if (r.language) map[key].langs.add(r.language);
    }
    if (r.status === "pending") {
      map[key].pending++;
    }
  });

  return Object.values(map)
    .sort((a, b) => b.validated - a.validated || b.total - a.total || b.pending - a.pending)
    .slice(0, limit)
    .map(c => ({
      ...c,
      langs: [...c.langs],
      sessionList: [...c.sessions]
    }));
}

// ─── SESSION ANONYME & SYNCHRONISATION ────────────────────────────────────────

/** Génère ou récupère une session anonyme persistante. */
export function getOrCreateSession() {
  const KEY = "agrivoice_session_id";
  let sess  = localStorage.getItem(KEY);
  if (!sess) {
    sess = typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    localStorage.setItem(KEY, sess);
  }
  return sess;
}

/**
 * Score de la session courante (ou du pseudo).
 * @param {string}                    session
 * @param {'all'|'validated'|'pending'} [type='all']
 * @param {string}                    [contributorName]
 */
export async function getSessionScore(session, type = "all", contributorName = null) {
  const name = (contributorName || getContributorName() || "").trim();
  let q = supabase
    .from("contributions")
    .select("id", { count: "exact", head: true });

  if (name && name.toLowerCase() !== "anonyme" && !name.toLowerCase().startsWith("contributeur_")) {
    const safeName = encodeURIComponent(name.replace(/[,()]/g, ""));
    q = q.or(`contributor_session.eq.${session},contributor_name.ilike.%${safeName}%`);
  } else {
    q = q.eq("contributor_session", session);
  }

  if (type === "validated") q = q.eq("status", "validated");
  else if (type === "pending") q = q.eq("status", "pending");
  else if (type === "rejected") q = q.eq("status", "rejected");

  const { count, error } = await q;
  if (error) console.warn("Erreur getSessionScore:", error);
  return count || 0;
}

/**
 * Récupère les contributions rejetées pour la session ou le nom du contributeur.
 */
export async function getUserRejectedContributions(session, contributorName = null) {
  const name = (contributorName || getContributorName() || "").trim();
  let q = supabase
    .from("contributions")
    .select("id, word, language, created_at, status, edge_label")
    .eq("status", "rejected");

  if (name && name.toLowerCase() !== "anonyme" && !name.toLowerCase().startsWith("contributeur_")) {
    const safeName = encodeURIComponent(name.replace(/[,()]/g, ""));
    q = q.or(`contributor_session.eq.${session},contributor_name.ilike.%${safeName}%`);
  } else {
    q = q.eq("contributor_session", session);
  }

  q = q.order("created_at", { ascending: false });
  const { data, error } = await q;
  if (error) console.warn("Erreur getUserRejectedContributions:", error);
  return { data: data || [], error };
}

/** Sauvegarde le prénom du contributeur dans localStorage. */
export function saveContributorName(name) {
  localStorage.setItem("agrivoice_contributor_name", name.trim().slice(0, 40));
}

/** Récupère le prénom du contributeur depuis localStorage. */
export function getContributorName() {
  return localStorage.getItem("agrivoice_contributor_name") || "";
}

/**
 * Synchronise et met à jour rétroactivement le nom du contributeur en base de données.
 */
export async function syncContributorName(session, newName, oldName = "") {
  const cleanNew = (newName || "").trim().slice(0, 40);
  if (!cleanNew) return { error: "Nom invalide" };

  saveContributorName(cleanNew);

  const updates = [
    supabase
      .from("contributions")
      .update({ contributor_name: cleanNew })
      .eq("contributor_session", session)
  ];

  if (oldName && oldName.trim() && oldName.trim().toLowerCase() !== cleanNew.toLowerCase() && !oldName.toLowerCase().startsWith("contributeur_") && oldName.toLowerCase() !== "anonyme") {
    updates.push(
      supabase
        .from("contributions")
        .update({ contributor_name: cleanNew })
        .ilike("contributor_name", oldName.trim())
    );
  }

  try {
    updates.push(
      supabase
        .from("contributors")
        .upsert([{ username: cleanNew, session_id: session, last_active: new Date().toISOString() }], { onConflict: "username" })
    );
  } catch (e) {
    console.warn("Table contributors non accessible", e);
  }

  await Promise.allSettled(updates);
  return { success: true, name: cleanNew };
}

// ─── AUTHENTIFICATION LÉGÈRE (PSEUDO UNIQUE + CODE PIN) ─────────────────────

/** Hachage SHA-256 sécurisé pour le code PIN / mot de passe */
export async function hashPin(pin) {
  const enc = new TextEncoder().encode(pin + "_agrivoice_salt_2026");
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Vérifie l'état d'un pseudonyme.
 * @returns {{ exists: boolean, contributor?: object }}
 */
export async function checkUsername(username) {
  const clean = (username || "").trim().toLowerCase();
  if (!clean) return { exists: false };
  try {
    const { data, error } = await supabase
      .from("contributors")
      .select("username, pin_hash, session_id")
      .ilike("username", clean)
      .limit(1);

    if (error || !data || data.length === 0) {
      // Vérifier aussi dans la table historique contributions
      const { data: contribData, error: cErr } = await supabase
        .from("contributions")
        .select("contributor_name")
        .ilike("contributor_name", clean)
        .limit(1);

      if (!cErr && contribData && contribData.length > 0) {
        return { exists: true, contributor: { username: contribData[0].contributor_name, pin_hash: null } };
      }
      return { exists: false };
    }
    return { exists: true, contributor: data[0] };
  } catch (e) {
    console.warn("Erreur checkUsername:", e);
    return { exists: false };
  }
}

/**
 * Propose des pseudos alternatifs si le pseudo est déjà utilisé.
 */
export async function suggestUsernames(base) {
  const clean = (base || "").trim().replace(/\s+/g, "_");
  if (!clean) return [];
  const randomSuffix = () => Math.floor(10 + Math.random() * 89);
  const beninRegions = ["229", "Bohicon", "Parakou", "Kétou", "Ouidah", "Pobè", "Cotonou", "Abomey"];
  const randomReg = beninRegions[Math.floor(Math.random() * beninRegions.length)];

  const candidates = [
    `${clean}_${randomSuffix()}`,
    `${clean}_${randomReg}`,
    `${clean}${randomSuffix()}`,
  ];

  return candidates;
}

/**
 * Enregistre un nouveau contributeur avec pseudo + code PIN.
 */
export async function registerContributor(username, pin, sessionId) {
  const clean = username.trim();
  const pinHash = await hashPin(pin);
  saveContributorName(clean);

  let res = { data: null, error: null };
  try {
    res = await supabase
      .from("contributors")
      .insert([{
        username: clean,
        pin_hash: pinHash,
        session_id: sessionId,
      }])
      .select()
      .single();
  } catch(e) {
    console.warn("Table contributors insert avertissement:", e);
  }
  return res;
}

/**
 * Connecte un contributeur existant en vérifiant son code PIN.
 */
export async function loginContributor(contributor, pin) {
  // Si le compte existe (ex: ancien utilisateur) mais n'a pas encore de pin_hash configuré
  if (!contributor.pin_hash) {
    const pinHash = await hashPin(pin);
    saveContributorName(contributor.username);
    try {
      await supabase.from("contributors").upsert([{
        username: contributor.username,
        pin_hash: pinHash,
        last_active: new Date().toISOString()
      }], { onConflict: "username" });
    } catch(e) {}
    return { success: true };
  }

  const pinHash = await hashPin(pin);
  if (contributor.pin_hash === pinHash) {
    saveContributorName(contributor.username);
    // Mise à jour de dernière activité en tâche de fond (non bloquante)
    try {
      supabase.from("contributors").update({ last_active: new Date().toISOString() }).eq("username", contributor.username).then(() => {});
    } catch(e) {
      // Ignorer l'erreur pour ne jamais bloquer la connexion
    }
    return { success: true };
  }
  return { success: false, error: "Code PIN ou mot de passe incorrect." };
}


// ─── (Rétro-compat : validations communautaires) ──────────────────────────────

export async function getPendingContributions(voterSession, limit = 5) {
  const { data: voted } = await supabase
    .from("validations").select("contribution_id").eq("voter_session", voterSession);
  const excludeIds = (voted || []).map(v => v.contribution_id);
  let q = supabase.from("contributions").select("*").eq("status", "pending")
    .limit(limit).order("created_at", { ascending: true });
  if (excludeIds.length > 0) q = q.not("id", "in", `(${excludeIds.join(",")})`);
  const { data, error } = await q;
  return { data: data || [], error };
}

export async function submitVote(contributionId, voterSession, isGood) {
  const { error: voteErr } = await supabase.from("validations").insert([{
    contribution_id: contributionId, voter_session: voterSession, vote: isGood,
  }]);
  if (voteErr) return { error: voteErr };

  const { data: contrib } = await supabase.from("contributions")
    .select("vote_count, vote_positive").eq("id", contributionId).single();

  const newCount    = (contrib?.vote_count    || 0) + 1;
  const newPositive = (contrib?.vote_positive || 0) + (isGood ? 1 : 0);
  let newStatus = "pending";
  if (newPositive >= 5)                 newStatus = "validated";
  else if ((newCount - newPositive) >= 3) newStatus = "rejected";

  const { error } = await supabase.from("contributions")
    .update({ vote_count: newCount, vote_positive: newPositive, status: newStatus })
    .eq("id", contributionId);

  return { error };
}
