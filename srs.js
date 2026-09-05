// Tarea S3.5 del roadmap: Repaso Espaciado Ligero (SM-2 simplificado).
//
// Esta es la CAPA DE PROGRAMACIÓN TEMPORAL, separada a propósito de la capa de dominio
// (`cardStatuses`, sincronizada con Google Drive y consultada por el tutor de IA). Este
// módulo SOLO decide cuándo tocar repasar cada verbo (`interval`/`dueDate`); nunca decide
// por sí mismo el estado 🔴/🟡/🟢 — quien llama a `srsRateItem` es responsable de aplicar
// `newStatus` con `applyCardStatus()` (index.html) para que el rating llegue también a
// Drive y al tutor de IA por el mismo camino que ya usa el quiz de latencia.

const SRS_STORAGE_KEY = 'phrasal_srs_data';

function srsLoad() {
  try {
    return JSON.parse(localStorage.getItem(SRS_STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function srsSave(data) {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
}

// rating: 1 Otra vez, 2 Difícil, 3 Bien, 4 Fácil
function srsRateItem(verbId, rating) {
  const data = srsLoad();
  const entry = data[verbId] || { interval: 0, repetitions: 0, easeFactor: 2.5, dueDate: null };
  let { repetitions, easeFactor } = entry;

  if (rating <= 2) {
    repetitions = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    repetitions += 1;
    if (rating === 4) easeFactor = Math.min(2.8, easeFactor + 0.15);
  }

  const baseIntervalByRating = { 1: 1, 2: 2, 3: 4, 4: 7 };
  const baseInterval = baseIntervalByRating[rating] || 1;
  const interval = repetitions > 1 ? Math.round(baseInterval * easeFactor) : baseInterval;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  const statusByRating = {
    1: 'focus',
    2: repetitions < 2 ? 'focus' : 'in_progress',
    3: 'in_progress',
    4: repetitions >= 2 ? 'mastered' : 'in_progress',
  };

  data[verbId] = { interval, repetitions, easeFactor, dueDate: dueDate.toISOString() };
  srsSave(data);

  return { newStatus: statusByRating[rating], entry: data[verbId] };
}

// Un verbo nunca repasado cuenta como pendiente (dueDate nula = vencida por defecto).
function srsIsDueToday(verbId) {
  const entry = srsLoad()[verbId];
  if (!entry || !entry.dueDate) return true;
  return new Date(entry.dueDate) <= new Date();
}

function srsDueCount(ids) {
  return ids.filter(id => srsIsDueToday(id)).length;
}
