"use client";

import QuizDesafio from "@/components/QuizDesafio";
import { OFICIAL_QUESTIONS } from "@/data/oficial-questions";

/**
 * El Desafio: las 280 preguntas del Cuestionario General Licencias Clase B.
 *
 * Todas son respondibles y todas entran al sorteo; las diez que en el documento original
 * se contestaban mirando una lamina de dibujos fueron reescritas con alternativas de
 * texto y quedan marcadas con `adaptada`.
 */
export default function DesafioPage() {
  return (
    <QuizDesafio
      config={{
        titulo: (
          <>
            El <span className="gradient-text">Desafío</span> —{" "}
            {OFICIAL_QUESTIONS.length} preguntas oficiales
          </>
        ),
        descripcion: (
          <>
            Cuestionario General de Licencias Clase B: las {OFICIAL_QUESTIONS.length}{" "}
            preguntas del examen teórico, con las respuestas puestas al día según la Ley
            de Tránsito vigente. Primero respóndelas con corrección inmediata, y después
            la ruleta sortea 32 para el test real contra reloj.
          </>
        ),
        aviso: <>Las {OFICIAL_QUESTIONS.length} entran al sorteo: ninguna queda fuera.</>,
        banco: OFICIAL_QUESTIONS,
        ruletaPicks: 32,
        segundos: 40 * 60,
        maxErrores: 2,
        storageKey: "licencia-chile-desafio-v1",
      }}
    />
  );
}
