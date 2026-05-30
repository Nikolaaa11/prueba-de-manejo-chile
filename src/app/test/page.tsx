"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  QUESTIONS,
  CATEGORY_LABELS,
  pickRandom,
  frequentQuestions,
  type Question,
  type Category,
} from "@/data/questions";
import { Sign } from "@/components/Signs";
import {
  loadQStats,
  recordResults,
  worstQuestions,
  errorRate,
  type QStatsMap,
} from "@/lib/qstats";

type Mode = "menu" | "practica" | "examen" | "frecuentes" | "errores" | "resultado";

const EXAM_SIZE = Math.min(20, QUESTIONS.length);
const PASS_RATIO = 0.7;
const STORAGE_KEY = "licencia-chile-stats-v1";

interface Stats {
  examsTaken: number;
  bestPercent: number;
  lastPercent: number;
  totalCorrect: number;
  totalAnswered: number;
}
const EMPTY_STATS: Stats = {
  examsTaken: 0,
  bestPercent: 0,
  lastPercent: 0,
  totalCorrect: 0,
  totalAnswered: 0,
};

function loadStats(): Stats {
  if (typeof window === "undefined") return EMPTY_STATS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_STATS, ...JSON.parse(raw) } : EMPTY_STATS;
  } catch {
    return EMPTY_STATS;
  }
}
function saveStats(s: Stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const isPracticeLike = (m: Mode) =>
  m === "practica" || m === "frecuentes" || m === "errores";

export default function TestPage() {
  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [practiceCategory, setPracticeCategory] = useState<Category | "all">("all");

  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [qstats, setQStats] = useState<QStatsMap>({});
  const savedRef = useRef(false);
  const recordedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setStats(loadStats());
    setQStats(loadQStats());
  }, []);

  useEffect(() => {
    if (mode === "examen") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  const worst = useMemo(() => worstQuestions(QUESTIONS, qstats), [qstats]);

  const start = (m: Mode) => {
    let qs: Question[] = [];
    if (m === "examen") qs = pickRandom(EXAM_SIZE);
    else if (m === "frecuentes") {
      const fq = frequentQuestions();
      qs = pickRandom(fq.length, undefined, fq);
    } else if (m === "errores") qs = worst.map((w) => w.question);
    else {
      const pool =
        practiceCategory !== "all"
          ? QUESTIONS.filter((q) => q.category === practiceCategory)
          : QUESTIONS;
      qs = pickRandom(pool.length, undefined, pool);
    }
    if (qs.length === 0) return;
    setQuestions(qs);
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setElapsed(0);
    savedRef.current = false;
    recordedRef.current = new Set();
    setMode(m);
  };

  const current = questions[index];

  const choose = (qid: number, optionIdx: number) => {
    if (isPracticeLike(mode) && revealed[qid]) return;
    setAnswers((a) => ({ ...a, [qid]: optionIdx }));
    if (isPracticeLike(mode)) {
      setRevealed((r) => ({ ...r, [qid]: true }));
      const q = questions.find((x) => x.id === qid);
      if (q && !recordedRef.current.has(qid)) {
        recordedRef.current.add(qid);
        setQStats((prev) => recordResults([{ id: qid, correct: optionIdx === q.answer }], prev));
      }
    }
  };

  const correctCount = useMemo(
    () => questions.filter((q) => answers[q.id] === q.answer).length,
    [questions, answers]
  );

  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setQStats((prev) =>
      recordResults(
        questions.map((q) => ({ id: q.id, correct: answers[q.id] === q.answer })),
        prev
      )
    );
    setMode("resultado");
  };

  useEffect(() => {
    if (mode !== "resultado" || questions.length === 0 || savedRef.current) return;
    savedRef.current = true;
    const percent = Math.round((correctCount / questions.length) * 100);
    setStats((prev) => {
      const next: Stats = {
        examsTaken: prev.examsTaken + 1,
        bestPercent: Math.max(prev.bestPercent, percent),
        lastPercent: percent,
        totalCorrect: prev.totalCorrect + correctCount,
        totalAnswered: prev.totalAnswered + questions.length,
      };
      saveStats(next);
      return next;
    });
  }, [mode, correctCount, questions.length]);

  // ---- MENU ----
  if (mode === "menu") {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Test teorico — Licencia Clase B</h1>
          <p className="mt-1 text-gray-600">
            {QUESTIONS.length} preguntas basadas en la Ley de Transito 18.290, la
            senalizacion oficial y material de CONASET.
          </p>
        </header>

        {stats.examsTaken > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBox label="Examenes" value={String(stats.examsTaken)} />
            <StatBox label="Mejor puntaje" value={`${stats.bestPercent}%`} highlight />
            <StatBox label="Ultimo" value={`${stats.lastPercent}%`} />
            <StatBox label="Por repasar" value={String(worst.length)} />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <div className="text-3xl">📚</div>
            <h2 className="mt-2 text-lg font-semibold">Modo practica</h2>
            <p className="mt-1 text-sm text-gray-600">
              Responde y revisa de inmediato, con explicacion y referencia legal. Puedes
              enfocarte en un tema.
            </p>
            <label className="mt-3 block text-sm font-medium text-gray-700">
              Tema
              <select
                value={practiceCategory}
                onChange={(e) => setPracticeCategory(e.target.value as Category | "all")}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-brand"
              >
                <option value="all">Todos los temas ({QUESTIONS.length})</option>
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => {
                  const n = QUESTIONS.filter((q) => q.category === c).length;
                  return (
                    <option key={c} value={c}>
                      {CATEGORY_LABELS[c]} ({n})
                    </option>
                  );
                })}
              </select>
            </label>
            <button
              onClick={() => start("practica")}
              className="mt-4 w-full rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
            >
              Empezar practica
            </button>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6">
            <div className="text-3xl">🎯</div>
            <h2 className="mt-2 text-lg font-semibold">Modo examen</h2>
            <p className="mt-1 text-sm text-gray-600">
              {EXAM_SIZE} preguntas al azar, como el examen real, con temporizador. Apruebas
              con {Math.round(PASS_RATIO * 100)}% o mas.
            </p>
            <button
              onClick={() => start("examen")}
              className="mt-4 w-full rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
            >
              Comenzar examen
            </button>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6">
            <div className="text-3xl">⭐</div>
            <h2 className="mt-2 text-lg font-semibold">Preguntas frecuentes</h2>
            <p className="mt-1 text-sm text-gray-600">
              Las {frequentQuestions().length} preguntas clave sobre los temas que casi
              siempre aparecen. Ideal para un repaso rapido.
            </p>
            <button
              onClick={() => start("frecuentes")}
              className="mt-4 w-full rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
            >
              Repasar frecuentes
            </button>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6">
            <div className="text-3xl">🔁</div>
            <h2 className="mt-2 text-lg font-semibold">Repasa tus errores</h2>
            <p className="mt-1 text-sm text-gray-600">
              {worst.length > 0
                ? `Tienes ${worst.length} pregunta(s) que sueles fallar. Repasalas, ordenadas de la que mas fallas a la que menos.`
                : "Aun no hay errores registrados. Responde algunas preguntas y aqui apareceran las que mas fallas."}
            </p>
            <button
              onClick={() => start("errores")}
              disabled={worst.length === 0}
              className="mt-4 w-full rounded-lg bg-flag-red px-5 py-2.5 font-semibold text-white hover:opacity-90 disabled:opacity-40"
            >
              Repasar mis errores
            </button>
          </div>
        </div>

        <CategoryBreakdown />
      </div>
    );
  }

  // ---- RESULTADO ----
  if (mode === "resultado") {
    const passed = correctCount / questions.length >= PASS_RATIO;
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-8 text-white ${passed ? "bg-green-600" : "bg-flag-red"}`}>
          <h1 className="text-3xl font-bold">{passed ? "¡Aprobado! 🎉" : "Sigue practicando 💪"}</h1>
          <p className="mt-2 text-lg">
            Respondiste correctamente {correctCount} de {questions.length} (
            {Math.round((correctCount / questions.length) * 100)}%).
          </p>
          <p className="mt-1 text-white/90">Tiempo: {formatTime(elapsed)}</p>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const ok = userAns === q.answer;
            return (
              <div key={q.id} className="rounded-lg border border-black/10 bg-white p-4">
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
                {q.image && <Sign name={q.image} size={96} className="mt-2" />}
                <p className={`mt-1 text-sm ${ok ? "text-green-700" : "text-flag-red"}`}>
                  {ok ? "✓ Correcta" : "✗ Incorrecta"} — tu respuesta:{" "}
                  {userAns != null ? q.options[userAns] : "(sin responder)"}
                </p>
                {!ok && (
                  <p className="mt-1 text-sm text-gray-700">
                    Respuesta correcta: <strong>{q.options[q.answer]}</strong>
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-600">{q.explanation}</p>
                {q.reference && <p className="mt-1 text-xs text-gray-400">{q.reference}</p>}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => start("examen")}
            className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
          >
            Nuevo examen
          </button>
          <button
            onClick={() => setMode("menu")}
            className="rounded-lg border border-black/15 px-5 py-2.5 font-semibold hover:bg-black/5"
          >
            Volver al menu
          </button>
        </div>
      </div>
    );
  }

  // ---- PRACTICA / EXAMEN / FRECUENTES / ERRORES (una pregunta) ----
  if (!current) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600">No hay preguntas disponibles para esta seccion.</p>
        <button
          onClick={() => setMode("menu")}
          className="rounded-lg border border-black/15 px-5 py-2 font-semibold hover:bg-black/5"
        >
          Volver al menu
        </button>
      </div>
    );
  }

  const practiceLike = isPracticeLike(mode);
  const userAns = answers[current.id];
  const isRevealed = practiceLike && revealed[current.id];
  const answeredAll = questions.every((q) => answers[q.id] != null);
  const answeredCount = questions.filter((q) => answers[q.id] != null).length;
  const sectionLabel =
    mode === "examen"
      ? "Examen"
      : mode === "frecuentes"
      ? "Frecuentes"
      : mode === "errores"
      ? "Tus errores"
      : "Practica";
  const curStat = qstats[current.id];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {sectionLabel} · pregunta {index + 1} de {questions.length}
        </span>
        <div className="flex items-center gap-2">
          {mode === "examen" && (
            <span className="rounded-full bg-black/5 px-3 py-1 font-mono font-medium text-gray-700">
              ⏱ {formatTime(elapsed)}
            </span>
          )}
          <span className="rounded-full bg-brand-light px-3 py-1 font-medium text-brand">
            {CATEGORY_LABELS[current.category]}
          </span>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6">
        {current.image && (
          <div className="mb-4 flex justify-center">
            <Sign name={current.image} size={150} />
          </div>
        )}
        <p className="text-lg font-semibold">{current.question}</p>
        {mode === "errores" && curStat && (
          <p className="mt-1 text-xs text-flag-red">
            Has fallado esta {curStat.seen - curStat.correct} de {curStat.seen} veces
          </p>
        )}
        <div className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const selected = userAns === i;
            let cls = "w-full rounded-lg border px-4 py-3 text-left transition ";
            if (isRevealed) {
              if (i === current.answer) cls += "border-green-500 bg-green-50 text-green-800";
              else if (selected) cls += "border-flag-red bg-red-50 text-flag-red";
              else cls += "border-black/10 bg-white text-gray-500";
            } else {
              cls += selected
                ? "border-brand bg-brand-light"
                : "border-black/10 bg-white hover:border-brand/50";
            }
            return (
              <button key={i} className={cls} onClick={() => choose(current.id, i)}>
                <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {isRevealed && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
            <p className="text-gray-700">{current.explanation}</p>
            {current.reference && <p className="mt-1 text-xs text-gray-400">{current.reference}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-black/15 px-4 py-2 font-medium disabled:opacity-40"
        >
          ← Anterior
        </button>

        {mode === "examen" && (
          <span className="text-sm text-gray-500">
            {answeredCount}/{questions.length} respondidas
          </span>
        )}

        {index < questions.length - 1 ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-dark"
          >
            Siguiente →
          </button>
        ) : mode === "examen" ? (
          <button
            onClick={finishExam}
            disabled={!answeredAll}
            className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-40"
            title={answeredAll ? "" : "Responde todas las preguntas para terminar"}
          >
            Terminar y ver resultado
          </button>
        ) : (
          <button
            onClick={() => setMode("menu")}
            className="rounded-lg border border-black/15 px-5 py-2 font-semibold hover:bg-black/5"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center ${
        highlight ? "border-brand bg-brand-light" : "border-black/10 bg-white"
      }`}
    >
      <div className={`text-2xl font-bold ${highlight ? "text-brand" : "text-gray-800"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

function CategoryBreakdown() {
  const counts = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <div className="rounded-xl border border-black/10 bg-white p-5">
      <h3 className="font-semibold">Temas que cubre el test</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {Object.entries(counts).map(([cat, n]) => (
          <span key={cat} className="rounded-full bg-brand-light px-3 py-1 text-brand">
            {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]} · {n}
          </span>
        ))}
      </div>
    </div>
  );
}
