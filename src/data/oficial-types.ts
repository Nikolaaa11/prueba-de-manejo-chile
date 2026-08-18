// Tipos del "Cuestionario General Licencias Clase B" (Examen Teorico de Conduccion).
//
// A diferencia de `questions.ts` (banco propio redactado a partir de la Ley 18.290 y
// material CONASET), este banco reproduce el cuestionario de 280 preguntas que circula
// como material de estudio oficial, junto con su pauta de respuestas.
//
// La pauta de respuestas viene incluida en el propio documento y fue verificada contra
// las dos copias de la tabla de respuestas que trae el PDF (ambas coinciden).

export type OficialCategory =
  | "mecanica"
  | "seguridad"
  | "senales"
  | "normas"
  | "velocidad"
  | "alcohol"
  | "documentos"
  | "preferencia"
  | "emergencias"
  | "conduccion";

export const OFICIAL_CATEGORY_LABELS: Record<OficialCategory, string> = {
  mecanica: "Mecánica y mantenimiento",
  seguridad: "Seguridad activa y pasiva",
  senales: "Señales y demarcaciones",
  normas: "Normas de conducción",
  velocidad: "Velocidad y distancias",
  alcohol: "Alcohol y drogas",
  documentos: "Documentos y sanciones",
  preferencia: "Derecho preferente de paso",
  emergencias: "Emergencias y accidentes",
  conduccion: "Técnica de conducción",
};

/**
 * Temas que valen doble puntaje en el desafio, siguiendo el criterio del examen
 * oficial: alcohol, velocidad y retencion infantil son las materias criticas.
 */
export type CriticalTopic = "alcohol" | "velocidad" | "retencion";

export const CRITICAL_LABELS: Record<CriticalTopic, string> = {
  alcohol: "Alcohol y drogas",
  velocidad: "Velocidad",
  retencion: "Retención infantil",
};

export interface OficialQuestion {
  /** Numero de la pregunta dentro del cuestionario oficial (1 a 280). */
  n: number;
  question: string;
  options: { letter: string; text: string }[];
  /** Letras correctas, en minuscula. Puede ser mas de una. */
  correct: string[];
  /** Texto original de la instruccion ("Marque dos respuestas", etc.). */
  marca: string;
  category: OficialCategory;
  /** Si esta presente, la pregunta vale 2 puntos en el desafio. */
  critical?: CriticalTopic;
  /** Por que la alternativa correcta es la correcta. */
  explanation: string;
  /**
   * Presente cuando la pauta original del cuestionario quedo derogada y la respuesta se
   * actualizo a la norma vigente. Explica que decia el documento y que rige hoy.
   */
  legalNote?: string;
  /**
   * Presente cuando las alternativas se reescribieron porque en el documento original
   * eran dibujos (senales, senas con el brazo, escenas) que el PDF no incluye.
   */
  adaptada?: boolean;
  /**
   * El PDF original acompana la pregunta con una imagen (senal, foto o dibujo) que no
   * se pudo extraer. `imageDescription` describe en palabras lo que muestra la imagen
   * para que la pregunta siga siendo respondible.
   */
  imageDependent?: boolean;
  imageDescription?: string;
}

/** Una pregunta vale 2 puntos si toca un tema critico. */
export function questionPoints(q: OficialQuestion): number {
  return q.critical ? 2 : 1;
}

/** Compara la seleccion del usuario con la pauta (orden irrelevante). */
export function isCorrect(q: OficialQuestion, selected: string[]): boolean {
  if (selected.length !== q.correct.length) return false;
  const a = [...selected].sort();
  const b = [...q.correct].sort();
  return a.every((letter, i) => letter === b[i]);
}

/** Cuantas alternativas hay que marcar segun la instruccion original. */
export function requiredCount(q: OficialQuestion): number {
  return q.correct.length;
}

/** true si la pregunta admite mas de una alternativa correcta. */
export function isMulti(q: OficialQuestion): boolean {
  return q.correct.length > 1;
}
