"use client";

import { useMemo, useState } from "react";
import {
  QUESTIONS,
  CATEGORY_LABELS,
  pickRandom,
  type Question,
} from "@/data/questions";

type Mode = "menu" | "practica" | "examen" | "resultado";

// Configuracion del examen oficial referencial: el examen teorico real suele tener
// alrededor de 20 preguntas y se aprueba con un alto porcentaje de aciertos.
const EXAM_SIZE = Math.min(20, QUESTIONS.length);
const PASS_RATIO = 0.7; // 70% para aprobar (referencial)

export default function TestPage() {
  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const start = (m: "practica" | "examen") => {
    const qs = m === "examen" ? pickRandom(EXAM_SIZE) : pickRandom(QUESTIONS.length);
    setQuestions(qs);
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setMode(m);
  };

  const current = questions[index];

  const choose = (qid: number, optionIdx: number) => {
    if (mode === "practica" && revealed[qid]) return; // ya respondio
    setAnswers((a) => ({ ...a, [qid]: optionIdx }));
    if (mode === "practica") setRevealed((r) => ({ ...r, [qid]: true }));
  };

  const correctCount = useMemo(
    () => questions.filter((q) => answers[q.id] === q.answer).length,
    [questions, answers]
  );

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

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => start("practica")}
            className="rounded-xl border border-black/10 bg-white p-6 text-left transition hover:border-brand hover:shadow-md"
          >
            <div className="text-3xl">📚</div>
            <h2 className="mt-2 text-lg font-semibold">Modo practica</h2>
            <p className="mt-1 text-sm text-gray-600">
              Responde y revisa de inmediato la respuesta correcta con su explicacion y
              referencia legal. Recorre las {QUESTIONS.length} preguntas a tu ritmo.
            </p>
          </button>

          <button
            onClick={() => start("examen")}
            className="rounded-xl border border-black/10 bg-white p-6 text-left transition hover:border-brand hover:shadow-md"
          >
            <div className="text-3xl">🎯</div>
            <h2 className="mt-2 text-lg font-semibold">Modo examen</h2>
            <p className="mt-1 text-sm text-gray-600">
              {EXAM_SIZE} preguntas al azar, como el examen real. Recibes tu resultado al
              final (apruebas con {Math.round(PASS_RATIO * 100)}% o mas).
            </p>
          </button>
        </div>

        <CategoryBreakdown />
      </div>
    );
  }

  if (mode === "resultado") {
    const passed = correctCount / questions.length >= PASS_RATIO;
    return (
      <div className="space-y-6">
        <div
          className={`rounded-2xl p-8 text-white ${
            passed ? "bg-green-600" : "bg-flag-red"
          }`}
        >
          <h1 className="text-3xl font-bold">
            {passed ? "¡Aprobado! 🎉" : "Sigue practicando 💪"}
          </h1>
          <p className="mt-2 text-lg">
            Respondiste correctamente {correctCount} de {questions.length} (
            {Math.round((correctCount / questions.length) * 100)}%).
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const ok = userAns === q.answer;
            return (
              <div
                key={q.id}
                className="rounded-lg border border-black/10 bg-white p-4"
              >
                <p className="font-medium">
                  {i + 1}. {q.question}
                </p>
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
                {q.reference && (
                  <p className="mt-1 text-xs text-gray-400">{q.reference}</p>
                )}
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

  // modo practica / examen — vista de una pregunta
  const userAns = answers[current.id];
  const isRevealed = mode === "practica" && revealed[current.id];
  const answeredAll = questions.every((q) => answers[q.id] != null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Pregunta {index + 1} de {questions.length}
        </span>
        <span className="rounded-full bg-brand-light px-3 py-1 font-medium text-brand">
          {CATEGORY_LABELS[current.category]}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full bg-brand transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6">
        <p className="text-lg font-semibold">{current.question}</p>
        <div className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const selected = userAns === i;
            let cls =
              "w-full rounded-lg border px-4 py-3 text-left transition ";
            if (isRevealed) {
              if (i === current.answer)
                cls += "border-green-500 bg-green-50 text-green-800";
              else if (selected)
                cls += "border-flag-red bg-red-50 text-flag-red";
              else cls += "border-black/10 bg-white text-gray-500";
            } else {
              cls += selected
                ? "border-brand bg-brand-light"
                : "border-black/10 bg-white hover:border-brand/50";
            }
            return (
              <button key={i} className={cls} onClick={() => choose(current.id, i)}>
                <span className="mr-2 font-semibold">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {isRevealed && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
            <p className="text-gray-700">{current.explanation}</p>
            {current.reference && (
              <p className="mt-1 text-xs text-gray-400">{current.reference}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-black/15 px-4 py-2 font-medium disabled:opacity-40"
        >
          ← Anterior
        </button>

        {index < questions.length - 1 ? (
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-dark"
          >
            Siguiente →
          </button>
        ) : mode === "examen" ? (
          <button
            onClick={() => setMode("resultado")}
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
            Finalizar practica
          </button>
        )}
      </div>
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
          <span
            key={cat}
            className="rounded-full bg-brand-light px-3 py-1 text-brand"
          >
            {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]} · {n}
          </span>
        ))}
      </div>
    </div>
  );
}
