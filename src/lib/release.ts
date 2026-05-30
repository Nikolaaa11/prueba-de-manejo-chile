// Logica de "liberacion de cupos": cuando cada municipalidad abre nuevas horas para
// licencia de conducir. Se usa para el calendario, la cuenta regresiva y la exportacion
// a .ics (alertas en el calendario del telefono).
//
// IMPORTANTE: estos horarios provienen de los sitios oficiales de cada municipio
// (ver `source` en municipalities.ts) y fueron verificados al momento de armar este
// proyecto, pero los municipios pueden cambiarlos sin aviso. El calendario es una AYUDA
// para saber CUANDO conviene entrar a revisar; confirma siempre en el sitio oficial.

const WEEKDAY_NAMES = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

// Codigos de dia de la semana para RRULE (iCalendar). 0=domingo..6=sabado
const RRULE_DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export type ReleaseRule =
  // Cada semana, un dia fijo a una hora fija (ej. Las Condes: sabado 10:00)
  | { kind: "weekly"; weekday: number; hour: number; minute?: number }
  // Un dia fijo del mes (ej. La Reina: dia 15 a las 18:00)
  | { kind: "monthlyDay"; day: number; hour: number; minute?: number }
  // El primer dia habil del mes (ej. Quilicura: 1er dia habil 15:00)
  | { kind: "monthlyFirstBusinessDay"; hour: number; minute?: number }
  // Todos los dias a una hora (ej. apertura diaria)
  | { kind: "daily"; hour: number; minute?: number }
  // Agenda siempre abierta (no hay un momento puntual de liberacion)
  | { kind: "open" }
  // Atencion presencial (no online); referencia de hora de inicio
  | { kind: "inperson"; hour?: number; minute?: number };

function atTime(d: Date, hour: number, minute: number): Date {
  const r = new Date(d);
  r.setHours(hour, minute, 0, 0);
  return r;
}

function isBusinessDay(d: Date): boolean {
  const wd = d.getDay();
  return wd >= 1 && wd <= 5;
}

function firstBusinessDayOfMonth(year: number, month: number): Date {
  const d = new Date(year, month, 1);
  while (!isBusinessDay(d)) d.setDate(d.getDate() + 1);
  return d;
}

/**
 * Devuelve la proxima fecha/hora de liberacion a partir de `from`, o null si la regla
 * no tiene un momento puntual (open).
 */
export function nextOccurrence(rule: ReleaseRule, from: Date = new Date()): Date | null {
  const minute = "minute" in rule && rule.minute != null ? rule.minute : 0;

  switch (rule.kind) {
    case "weekly": {
      const candidate = new Date(from);
      const delta = (rule.weekday - candidate.getDay() + 7) % 7;
      candidate.setDate(candidate.getDate() + delta);
      let next = atTime(candidate, rule.hour, minute);
      if (next.getTime() <= from.getTime()) next.setDate(next.getDate() + 7);
      return next;
    }
    case "monthlyDay": {
      let y = from.getFullYear();
      let m = from.getMonth();
      let next = atTime(new Date(y, m, rule.day), rule.hour, minute);
      if (next.getTime() <= from.getTime()) {
        m += 1;
        if (m > 11) {
          m = 0;
          y += 1;
        }
        next = atTime(new Date(y, m, rule.day), rule.hour, minute);
      }
      return next;
    }
    case "monthlyFirstBusinessDay": {
      let y = from.getFullYear();
      let m = from.getMonth();
      let fbd = firstBusinessDayOfMonth(y, m);
      let next = atTime(fbd, rule.hour, minute);
      if (next.getTime() <= from.getTime()) {
        m += 1;
        if (m > 11) {
          m = 0;
          y += 1;
        }
        next = atTime(firstBusinessDayOfMonth(y, m), rule.hour, minute);
      }
      return next;
    }
    case "daily": {
      let next = atTime(new Date(from), rule.hour, minute);
      if (next.getTime() <= from.getTime()) next.setDate(next.getDate() + 1);
      return next;
    }
    case "inperson": {
      const candidate = new Date(from);
      const next = atTime(candidate, rule.hour ?? 9, rule.minute ?? 0);
      if (next.getTime() <= from.getTime()) next.setDate(next.getDate() + 1);
      while (!isBusinessDay(next)) next.setDate(next.getDate() + 1);
      return next;
    }
    case "open":
    default:
      return null;
  }
}

/** Indica si la regla libera cupos en la fecha dada (ignora la hora). */
export function occursOnDate(rule: ReleaseRule, date: Date): boolean {
  switch (rule.kind) {
    case "weekly":
      return date.getDay() === rule.weekday;
    case "monthlyDay":
      return date.getDate() === rule.day;
    case "monthlyFirstBusinessDay": {
      const fbd = firstBusinessDayOfMonth(date.getFullYear(), date.getMonth());
      return date.getDate() === fbd.getDate();
    }
    case "daily":
      return true;
    case "open":
    case "inperson":
    default:
      return false;
  }
}

function hhmm(hour: number, minute = 0): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

/** Descripcion legible en espanol de la regla de liberacion. */
export function describeReleaseRule(rule: ReleaseRule): string {
  const minute = "minute" in rule && rule.minute != null ? rule.minute : 0;
  switch (rule.kind) {
    case "weekly":
      return `Todos los ${WEEKDAY_NAMES[rule.weekday]} a las ${hhmm(rule.hour, minute)}`;
    case "monthlyDay":
      return `El dia ${rule.day} de cada mes a las ${hhmm(rule.hour, minute)}`;
    case "monthlyFirstBusinessDay":
      return `El primer dia habil de cada mes a las ${hhmm(rule.hour, minute)}`;
    case "daily":
      return `Todos los dias (apertura cerca de las ${hhmm(rule.hour, minute)})`;
    case "inperson":
      return `Atencion presencial${
        rule.hour != null ? ` desde las ${hhmm(rule.hour, rule.minute ?? 0)}` : ""
      }`;
    case "open":
      return "Agenda siempre abierta (revisa cuando quieras)";
  }
}

/** RRULE de iCalendar para la regla, o null si no es un evento recurrente con hora fija. */
export function toRRule(rule: ReleaseRule): string | null {
  switch (rule.kind) {
    case "weekly":
      return `FREQ=WEEKLY;BYDAY=${RRULE_DAYS[rule.weekday]}`;
    case "monthlyDay":
      return `FREQ=MONTHLY;BYMONTHDAY=${rule.day}`;
    case "monthlyFirstBusinessDay":
      return "FREQ=MONTHLY;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=1";
    case "daily":
      return "FREQ=DAILY";
    case "open":
    case "inperson":
    default:
      return null;
  }
}

function icsStamp(d: Date): string {
  // Formato de fecha-hora local "flotante": YYYYMMDDTHHMMSS
  const p = (n: number) => n.toString().padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `T${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  );
}

export interface ICSEvent {
  id: string; // identificador estable (ej. id de comuna)
  comuna: string;
  rule: ReleaseRule;
  url: string;
  /** minutos de antelacion para la alarma (default 30) */
  alarmMinutes?: number;
}

/**
 * Construye un archivo iCalendar (.ics) con eventos recurrentes para cada comuna que
 * tenga un horario de liberacion. Incluye una alarma (VALARM) para que el telefono avise.
 * Los eventos sin regla recurrente (open/inperson) se omiten.
 */
export function buildICS(events: ICSEvent[], stamp: Date = new Date()): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Licencia Chile//Calendario de liberacion de cupos//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  const dtstamp = icsStamp(stamp);

  for (const ev of events) {
    const rrule = toRRule(ev.rule);
    const first = nextOccurrence(ev.rule, stamp);
    if (!rrule || !first) continue;
    const alarm = ev.alarmMinutes ?? 30;

    lines.push(
      "BEGIN:VEVENT",
      `UID:liberacion-${ev.id}-${rrule.replace(/[^A-Z0-9]/gi, "")}@licencia-chile`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${icsStamp(first)}`,
      "DURATION:PT30M",
      `RRULE:${rrule}`,
      `SUMMARY:Cupos licencia - ${ev.comuna}`,
      `DESCRIPTION:Entra a revisar/reservar hora en ${ev.comuna}. ${ev.url}`,
      ...(ev.url ? [`URL:${ev.url}`] : []),
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `TRIGGER:-PT${alarm}M`,
      `DESCRIPTION:Pronto se liberan cupos en ${ev.comuna}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  // iCalendar usa CRLF como separador de linea.
  return lines.join("\r\n");
}

/** Formatea una fecha en espanol corto, ej. "sab 31 may, 10:00". */
export function formatNext(d: Date): string {
  return d.toLocaleString("es-CL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Texto de cuenta regresiva, ej. "en 2d 4h" o "en 35 min". */
export function countdown(target: Date, from: Date = new Date()): string {
  const ms = target.getTime() - from.getTime();
  if (ms <= 0) return "ahora";
  const mins = Math.floor(ms / 60000);
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (days > 0) return `en ${days}d ${hours}h`;
  if (hours > 0) return `en ${hours}h ${m}min`;
  return `en ${m} min`;
}
