"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  QUESTIONS,
  CATEGORY_LABELS,
  pickRandom,
  frequentQuestions,
  commonlyFailedQuestions,
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

type Mode =
  | "menu"
  | "practica"
  | "examen"
  | "oficial"
  | "frecuentes"
  | "fallan"
  | "errores"
  | "resultado";

const EXAM_SIZE = Math.min(20, QUESTIONS.length);
const PASS_RATIO = 0.7;
// Examen oficial referencial: 35 preguntas, 3 de doble puntaje (alcohol, velocidad,
// retencion infantil), maximo 38 puntos, se aprueba con 33, 45 minutos.
const OFICIAL_SIZE = Math.min(35, QUESTIONS.length);
const OFICIAL_SECONDS = 45 * 60;
const OFICIAL_PASS = 33;
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
  m === "practica" || m === "frecuentes" || m === "errores" || m === "fallan";

export default function TestPage() {
  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [practiceCategory, setPracticeCategory] = useState<Category | "all">("all");

  const [elapsed, setElapsed] = useState(0);
  const [oficial, setOficial] = useState(false);
  const doubleRef = useRef<Set<number>>(new Set());
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
    if (mode === "examen" || mode === "oficial") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  const worst = useMemo(() => worstQuestions(QUESTIONS, qstats), [qstats]);

  const mastery = useMemo(() => {
    const cats = Object.keys(CATEGORY_LABELS) as Category[];
    return cats.map((c) => {
      const qs = QUESTIONS.filter((q) => q.category === c);
      let seen = 0,
        correct = 0,
        attempted = 0;
      for (const q of qs) {
        const s = qstats[q.id];
        if (s) {
          seen += s.seen;
          correct += s.correct;
          attempted += 1;
        }
      }
      return { cat: c, total: qs.length, attempted, acc: seen ? correct / seen : 0 };
    });
  }, [qstats]);

  const overall = useMemo(() => {
    let seen = 0,
      correct = 0,
      attempted = 0;
    for (const q of QUESTIONS) {
      const s = qstats[q.id];
      if (s) {
        seen += s.seen;
        correct += s.correct;
        attempted += 1;
      }
    }
    const acc = seen ? correct / seen : 0;
    const coverage = attempted / QUESTIONS.length;
    const readiness = Math.round(acc * 100 * Math.min(1, coverage / 0.5));
    return { seen, correct, attempted, acc, coverage, readiness };
  }, [qstats]);

  const start = (m: Mode) => {
    let qs: Question[] = [];
    const dbl = new Set<number>();
    if (m === "examen") qs = pickRandom(EXAM_SIZE);
    else if (m === "oficial") {
      qs = pickRandom(OFICIAL_SIZE);
      // 3 preguntas de doble puntaje: una de alcohol, una de velocidad y una de seguridad.
      for (const cat of ["alcohol", "velocidad", "seguridad"] as Category[]) {
        const found = qs.find((q) => q.category === cat && !dbl.has(q.id));
        if (found) dbl.add(found.id);
      }
    } else if (m === "frecuentes") {
      const fq = frequentQuestions();
      qs = pickRandom(fq.length, undefined, fq);
    } else if (m === "fallan") {
      const cf = commonlyFailedQuestions();
      qs = pickRandom(cf.length, undefined, cf);
    } else if (m === "errores") qs = worst.map((w) => w.question);
    else {
      const pool =
        practiceCategory !== "all"
          ? QUESTIONS.filter((q) => q.category === practiceCategory)
          : QUESTIONS;
      qs = pickRandom(pool.length, undefined, pool);
    }
    if (qs.length === 0) return;
    doubleRef.current = dbl;
    setOficial(m === "oficial");
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

  // Puntaje del examen oficial (las preguntas de doble puntaje valen 2).
  const points = useMemo(() => {
    let p = 0;
    for (const q of questions)
      if (answers[q.id] === q.answer) p += doubleRef.current.has(q.id) ? 2 : 1;
    return p;
  }, [questions, answers]);
  const maxPoints = questions.length + doubleRef.current.size;

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

  // Auto-termina el examen oficial al agotarse el tiempo.
  useEffect(() => {
    if (mode === "oficial" && elapsed >= OFICIAL_SECONDS) finishExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, elapsed]);

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
          <p className="mt-1 text-neutral-600">
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

        {overall.attempted > 0 && (
          <div className="card p-5">
            <div className="flex items-center gap-5">
              <ReadinessRing value={overall.readiness} />
              <div>
                <h2 className="text-lg font-semibold">Tu preparacion</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {overall.attempted} de {QUESTIONS.length} preguntas practicadas ·{" "}
                  {Math.round(overall.acc * 100)}% de aciertos
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  Practica mas temas para subir tu nivel de preparacion.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {mastery.map((m) => (
                <div key={m.cat}>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-600">{CATEGORY_LABELS[m.cat]}</span>
                    <span className="text-neutral-400">
                      {m.attempted}/{m.total} · {Math.round(m.acc * 100)}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-all"
                      style={{ width: `${Math.round(m.acc * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-black/[0.06] bg-white p-6">
            <div className="text-3xl">📚</div>
            <h2 className="mt-2 text-lg font-semibold">Modo practica</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Responde y revisa de inmediato, con explicacion y referencia legal. Puedes
              enfocarte en un tema.
            </p>
            <label className="mt-3 block text-sm font-medium text-neutral-800">
              Tema
              <select
                value={practiceCategory}
                onChange={(e) => setPracticeCategory(e.target.value as Category | "all")}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-neon-cyan"
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
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-5 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Empezar practica
            </button>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-6">
            <div className="text-3xl">🎯</div>
            <h2 className="mt-2 text-lg font-semibold">Modo examen</h2>
            <p className="mt-1 text-sm text-neutral-600">
              {EXAM_SIZE} preguntas al azar, como el examen real, con temporizador. Apruebas
              con {Math.round(PASS_RATIO * 100)}% o mas.
            </p>
            <button
              onClick={() => start("examen")}
              className="mt-4 w-full rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Comenzar examen
            </button>
          </div>

          <div className="rounded-xl border border-neon-violet/30 bg-neon-violet/[0.06] p-6 sm:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-3xl">🏁</div>
                <h2 className="mt-2 text-lg font-semibold">Examen oficial (simulacro real)</h2>
                <p className="mt-1 max-w-2xl text-sm text-neutral-600">
                  {OFICIAL_SIZE} preguntas y 45 minutos, igual que el examen teorico real. 3
                  preguntas valen doble puntaje (alcohol, velocidad y retencion infantil);
                  apruebas con {OFICIAL_PASS} de {OFICIAL_SIZE + 3} puntos.
                </p>
              </div>
              <button
                onClick={() => start("oficial")}
                className="shrink-0 rounded-full bg-gradient-to-r from-brand to-neon-violet px-5 py-2.5 font-semibold text-white shadow-sm hover:brightness-110"
              >
                Rendir simulacro
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-6">
            <div className="text-3xl">⭐</div>
            <h2 className="mt-2 text-lg font-semibold">Preguntas frecuentes</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Las {frequentQuestions().length} preguntas clave sobre los temas que casi
              siempre aparecen. Ideal para un repaso rapido.
            </p>
            <button
              onClick={() => start("frecuentes")}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-5 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Repasar frecuentes
            </button>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-6">
            <div className="text-3xl">🔁</div>
            <h2 className="mt-2 text-lg font-semibold">Repasa tus errores</h2>
            <p className="mt-1 text-sm text-neutral-600">
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

          {/* Las que mas se fallan en el examen real */}
          <div className="rounded-xl border border-flag-red/40 bg-rose-500/10 p-6 sm:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-3xl">📉</div>
                <h2 className="mt-2 text-lg font-semibold">
                  Las que mas se fallan en el examen real
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-neutral-600">
                  {commonlyFailedQuestions().length} preguntas sobre los temas que mas
                  reprueban en la prueba teorica (distancia de frenado, estacionar cerca de
                  un paradero, clasificacion de senales, autopistas y pistas de viraje).
                  Datos reportados por CONASET, La Tercera y portales de practica.
                </p>
              </div>
              <button
                onClick={() => start("fallan")}
                className="shrink-0 rounded-lg bg-flag-red px-5 py-2.5 font-semibold text-white hover:opacity-90"
              >
                Practicar estas
              </button>
            </div>
          </div>
        </div>

        <CategoryBreakdown />
      </div>
    );
  }

  // ---- RESULTADO ----
  if (mode === "resultado") {
    const passed = oficial
      ? points >= OFICIAL_PASS
      : correctCount / questions.length >= PASS_RATIO;
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl p-8 text-white ${passed ? "bg-emerald-500" : "bg-flag-red"}`}>
          <h1 className="text-3xl font-bold">{passed ? "¡Aprobado! 🎉" : "Sigue practicando 💪"}</h1>
          {oficial ? (
            <p className="mt-2 text-lg">
              Obtuviste {points} de {maxPoints} puntos (apruebas con {OFICIAL_PASS}).{" "}
              {correctCount}/{questions.length} preguntas correctas.
            </p>
          ) : (
            <p className="mt-2 text-lg">
              Respondiste correctamente {correctCount} de {questions.length} (
              {Math.round((correctCount / questions.length) * 100)}%).
            </p>
          )}
          <p className="mt-1 text-white/90">Tiempo: {formatTime(elapsed)}</p>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const ok = userAns === q.answer;
            return (
              <div key={q.id} className="rounded-lg border border-black/[0.06] bg-white p-4">
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
                {q.image && (
                  <span className="sign-plate mt-2">
                    <Sign name={q.image} size={84} />
                  </span>
                )}
                <p className={`mt-1 text-sm ${ok ? "text-emerald-700" : "text-flag-red"}`}>
                  {ok ? "✓ Correcta" : "✗ Incorrecta"} — tu respuesta:{" "}
                  {userAns != null ? q.options[userAns] : "(sin responder)"}
                </p>
                {!ok && (
                  <p className="mt-1 text-sm text-neutral-800">
                    Respuesta correcta: <strong>{q.options[q.answer]}</strong>
                  </p>
                )}
                <p className="mt-2 text-sm text-neutral-600">{q.explanation}</p>
                {q.reference && <p className="mt-1 text-xs text-neutral-400">{q.reference}</p>}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => start("examen")}
            className="rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-5 py-2.5 font-semibold text-white hover:brightness-110"
          >
            Nuevo examen
          </button>
          <button
            onClick={() => setMode("menu")}
            className="rounded-lg border border-black/10 px-5 py-2.5 font-semibold hover:bg-black/[0.04]"
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
        <p className="text-neutral-600">No hay preguntas disponibles para esta seccion.</p>
        <button
          onClick={() => setMode("menu")}
          className="rounded-lg border border-black/10 px-5 py-2 font-semibold hover:bg-black/[0.04]"
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
      : mode === "oficial"
      ? "Examen oficial"
      : mode === "frecuentes"
      ? "Frecuentes"
      : mode === "errores"
      ? "Tus errores"
      : mode === "fallan"
      ? "Las que mas se fallan"
      : "Practica";
  const remaining = OFICIAL_SECONDS - elapsed;
  const isDouble = oficial && doubleRef.current.has(current.id);
  const curStat = qstats[current.id];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>
          {sectionLabel} · pregunta {index + 1} de {questions.length}
        </span>
        <div className="flex items-center gap-2">
          {mode === "examen" && (
            <span className="rounded-full bg-neutral-100 px-3 py-1 font-mono font-medium text-neutral-800">
              ⏱ {formatTime(elapsed)}
            </span>
          )}
          {mode === "oficial" && (
            <span
              className={`rounded-full px-3 py-1 font-mono font-medium ${
                remaining <= 300 ? "bg-rose-500/15 text-flag-red" : "bg-neutral-100 text-neutral-800"
              }`}
            >
              ⏱ {formatTime(Math.max(0, remaining))}
            </span>
          )}
          {isDouble && (
            <span className="rounded-full bg-neon-violet/15 px-3 py-1 text-xs font-semibold text-neon-violet">
              ×2 doble puntaje
            </span>
          )}
          <span className="rounded-full bg-neon-cyan/10 px-3 py-1 font-medium text-neon-cyan">
            {CATEGORY_LABELS[current.category]}
          </span>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-black/[0.06] bg-white p-6">
        {current.image && (
          <div className="mb-4 flex justify-center">
            <span className="sign-plate">
              <Sign name={current.image} size={150} />
            </span>
          </div>
        )}
        <p className="text-lg font-semibold">{current.question}</p>
        {mode === "errores" && curStat && (
          <p className="mt-1 text-xs text-flag-red">
            Has fallado esta {curStat.seen - curStat.correct} de {curStat.seen} veces
          </p>
        )}
        {mode === "fallan" && current.failNote && (
          <p className="mt-2 rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-flag-red">
            ⚠ {current.failNote}
          </p>
        )}
        <div className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const selected = userAns === i;
            let cls = "w-full rounded-lg border px-4 py-3 text-left transition ";
            if (isRevealed) {
              if (i === current.answer) cls += "border-emerald-500 bg-emerald-500/10 text-emerald-700";
              else if (selected) cls += "border-flag-red bg-rose-500/10 text-flag-red";
              else cls += "border-black/[0.06] bg-white text-neutral-500";
            } else {
              cls += selected
                ? "border-neon-cyan bg-neon-cyan/10"
                : "border-black/[0.06] bg-white hover:border-neon-cyan/50";
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
          <div className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm">
            <p className="text-neutral-800">{current.explanation}</p>
            {current.reference && <p className="mt-1 text-xs text-neutral-400">{current.reference}</p>}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-black/10 px-4 py-2 font-medium disabled:opacity-40"
        >
          ← Anterior
        </button>

        {(mode === "examen" || mode === "oficial") && (
          <span className="text-sm text-neutral-500">
            {answeredCount}/{questions.length} respondidas
          </span>
        )}

        {index < questions.length - 1 ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-5 py-2 font-semibold text-white hover:brightness-110"
          >
            Siguiente →
          </button>
        ) : mode === "examen" || mode === "oficial" ? (
          <button
            onClick={finishExam}
            disabled={mode === "examen" && !answeredAll}
            className="rounded-lg bg-emerald-500 px-5 py-2 font-semibold text-white hover:brightness-110 disabled:opacity-40"
            title={mode === "examen" && !answeredAll ? "Responde todas las preguntas para terminar" : ""}
          >
            Terminar y ver resultado
          </button>
        ) : (
          <button
            onClick={() => setMode("menu")}
            className="rounded-lg border border-black/10 px-5 py-2 font-semibold hover:bg-black/[0.04]"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}

function ReadinessRing({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  const color = value >= 70 ? "#34d399" : value >= 40 ? "#22d3ee" : "#fb7185";
  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center">
      <svg width="80" height="80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold">{value}%</div>
        <div className="-mt-1 text-[9px] text-neutral-500">listo</div>
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
        highlight ? "border-neon-cyan bg-neon-cyan/10" : "border-black/[0.06] bg-white"
      }`}
    >
      <div className={`text-2xl font-bold ${highlight ? "text-neon-cyan" : "text-ink"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function CategoryBreakdown() {
  const counts = QUESTIONS.reduce<Record<string, number>>((acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1;
    return acc;
  }, {});
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-5">
      <h3 className="font-semibold">Temas que cubre el test</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {Object.entries(counts).map(([cat, n]) => (
          <span key={cat} className="rounded-full bg-neon-cyan/10 px-3 py-1 text-neon-cyan">
            {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]} · {n}
          </span>
        ))}
      </div>
    </div>
  );
}
