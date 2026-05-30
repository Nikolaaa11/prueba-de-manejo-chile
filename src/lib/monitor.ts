// Monitor de disponibilidad de horas para la prueba de manejo.
//
// COMO FUNCIONA Y SUS LIMITES (lee esto con atencion):
// - No existe una API oficial para consultar cupos de las Direcciones de Transito.
// - La unica forma "automatica" de saber si hay horas es leer (scraping) la pagina de
//   agendamiento de cada municipio e interpretar su HTML. Esto es FRAGIL: si el municipio
//   cambia su sitio, el adaptador deja de funcionar; ademas algunos sitios bloquean el
//   acceso automatizado o lo prohiben en sus terminos de uso.
// - Por eso el monitor se implementa con un patron de ADAPTADORES: cada municipio puede
//   tener su propia funcion de chequeo. Sin un adaptador especifico, el resultado es
//   "desconocido" y se entrega el enlace para revisar manualmente.
//
// Usa este modulo de forma responsable: respeta los robots.txt y los terminos de uso de
// cada sitio, y no lo configures para hacer consultas con demasiada frecuencia.

import { MUNICIPALITIES, type Municipality } from "@/data/municipalities";

export type Availability = "disponible" | "sin-cupos" | "desconocido" | "error";

export interface CheckResult {
  municipalityId: string;
  comuna: string;
  availability: Availability;
  /** Mensaje legible sobre el resultado */
  message: string;
  /** Enlace para que la persona revise/agende manualmente */
  url: string;
  /** ISO timestamp del chequeo */
  checkedAt: string;
}

/**
 * Un adaptador recibe el HTML (o texto) de la pagina del municipio y decide si hay cupos.
 * Devuelve `null` si no puede determinarlo.
 */
type Adapter = (html: string) => boolean | null;

// Pistas genericas en el texto de una pagina que sugieren NO disponibilidad.
const SIN_CUPO_HINTS = [
  "no hay horas",
  "sin horas disponibles",
  "no existen horas",
  "agenda no disponible",
  "no hay cupos",
  "sin cupos",
  "no se encuentran horas",
];

// Pistas que sugieren disponibilidad.
const CON_CUPO_HINTS = [
  "horas disponibles",
  "seleccione una hora",
  "seleccione fecha",
  "reservar hora",
  "agendar hora",
  "cupos disponibles",
];

/**
 * Adaptador generico por defecto: busca pistas en el texto. Es solo una aproximacion;
 * para precision real hay que escribir un adaptador especifico por municipio.
 */
const genericAdapter: Adapter = (html) => {
  const text = html.toLowerCase();
  if (SIN_CUPO_HINTS.some((h) => text.includes(h))) return false;
  if (CON_CUPO_HINTS.some((h) => text.includes(h))) return true;
  return null;
};

// Registro de adaptadores especificos por municipio.
// Agrega aqui funciones a medida cuando conozcas el HTML real de cada portal.
const ADAPTERS: Record<string, Adapter> = {
  // ejemplo:
  // "providencia": (html) => html.includes("data-cupos=\"1\""),
};

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      // Identificate honestamente y respeta los limites del servidor.
      headers: { "User-Agent": "licencia-chile-monitor/1.0 (educativo)" },
      // Evita quedarte colgado: 10s.
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function checkMunicipality(m: Municipality): Promise<CheckResult> {
  const checkedAt = new Date().toISOString();
  const base: Omit<CheckResult, "availability" | "message"> = {
    municipalityId: m.id,
    comuna: m.comuna,
    url: m.agendaUrl,
    checkedAt,
  };

  const html = await fetchPage(m.agendaUrl);
  if (html == null) {
    return {
      ...base,
      availability: "error",
      message:
        "No se pudo leer la pagina del municipio (puede bloquear el acceso automatico o estar caida). Revisa manualmente.",
    };
  }

  const adapter = ADAPTERS[m.id] ?? genericAdapter;
  const result = adapter(html);

  if (result === true)
    return { ...base, availability: "disponible", message: "Posible disponibilidad de horas. Verifica y agenda rapido." };
  if (result === false)
    return { ...base, availability: "sin-cupos", message: "Al parecer no hay horas disponibles por ahora." };
  return {
    ...base,
    availability: "desconocido",
    message:
      "No fue posible determinar la disponibilidad automaticamente. Revisa directamente en el sitio del municipio.",
  };
}

export async function checkAll(ids?: string[]): Promise<CheckResult[]> {
  const targets = ids?.length
    ? MUNICIPALITIES.filter((m) => ids.includes(m.id))
    : MUNICIPALITIES;
  // Chequeos en paralelo pero acotados.
  return Promise.all(targets.map(checkMunicipality));
}
