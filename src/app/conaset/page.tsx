"use client";

import QuizDesafio from "@/components/QuizDesafio";
import { CONASET_QUESTIONS } from "@/data/conaset-questions";

/**
 * Pestana CONASET: banco armado con las preguntas de los cuestionarios oficiales de
 * CONASET que le aplican a un automovilista, mas preguntas redactadas desde el Libro
 * para la Conduccion en Chile Clase B.
 *
 * Misma mecanica que /desafio: estudio con correccion inmediata, ruleta de 32 y test
 * de 40 minutos que se aprueba con un maximo de 2 respuestas incorrectas.
 */
export default function ConasetPage() {
  const oficiales = CONASET_QUESTIONS.filter((q) =>
    (q.fuente ?? "").startsWith("Cuestionario")
  ).length;

  return (
    <QuizDesafio
      config={{
        titulo: (
          <>
            <span className="gradient-text">CONASET</span> —{" "}
            {CONASET_QUESTIONS.length} preguntas
          </>
        ),
        descripcion: (
          <>
            Banco basado en material oficial de CONASET: {oficiales} preguntas vienen
            textuales de sus Cuestionarios Base de Examen Teórico, con su pauta oficial, y
            el resto está redactado a partir del Libro para la Conducción en Chile Clase B.
            Misma mecánica: corrección inmediata, ruleta de 32 y 40 minutos contra reloj.
          </>
        ),
        aviso: (
          <>
            CONASET no publica el banco de la Clase B: ese examen se rinde en el sistema
            Nexteo con más de 1.000 preguntas reservadas. Lo que sí publica son los
            cuestionarios de otras clases y el libro de estudio, y de ahí sale esta
            pestaña. Cada pregunta indica su fuente al corregirla.
          </>
        ),
        banco: CONASET_QUESTIONS,
        ruletaPicks: 32,
        segundos: 40 * 60,
        maxErrores: 2,
        storageKey: "licencia-chile-conaset-v1",
      }}
    />
  );
}
