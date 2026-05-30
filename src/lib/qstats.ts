// Estadisticas por pregunta guardadas en el navegador (localStorage).
// Permiten construir la seccion "preguntas con mayor tasa de error" de forma PERSONAL y
// empirica: registra cuantas veces respondiste cada pregunta y cuantas acertaste.

import type { Question } from "@/data/questions";

export interface QStat {
  seen: number;
  correct: number;
}
export type QStatsMap = Record<number, QStat>;

const KEY = "licencia-chile-qstats-v1";

export function loadQStats(): QStatsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QStatsMap) : {};
  } catch {
    return {};
  }
}

export function saveQStats(map: QStatsMap) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

/** Registra una tanda de resultados y devuelve el mapa actualizado. */
export function recordResults(
  results: { id: number; correct: boolean }[],
  base?: QStatsMap
): QStatsMap {
  const map: QStatsMap = { ...(base ?? loadQStats()) };
  for (const r of results) {
    const cur = map[r.id] ?? { seen: 0, correct: 0 };
    map[r.id] = {
      seen: cur.seen + 1,
      correct: cur.correct + (r.correct ? 1 : 0),
    };
  }
  saveQStats(map);
  return map;
}

export function errorRate(stat: QStat): number {
  if (stat.seen === 0) return 0;
  return (stat.seen - stat.correct) / stat.seen;
}

/**
 * Devuelve las preguntas que el usuario mas falla, ordenadas por tasa de error
 * descendente. Solo incluye preguntas respondidas al menos una vez y con algun error.
 */
export function worstQuestions(
  all: Question[],
  map: QStatsMap
): { question: Question; stat: QStat; rate: number }[] {
  return all
    .map((q) => ({ question: q, stat: map[q.id] }))
    .filter((x) => x.stat && x.stat.seen > 0 && x.stat.correct < x.stat.seen)
    .map((x) => ({ ...x, rate: errorRate(x.stat) }))
    .sort((a, b) => b.rate - a.rate || b.stat.seen - a.stat.seen);
}
