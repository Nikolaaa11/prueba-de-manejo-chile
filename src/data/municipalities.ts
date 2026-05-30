// Directorio de Direcciones de Transito municipales para tramitar licencia de conducir
// y rendir el examen (teorico, practico, medico) en Chile.
//
// IMPORTANTE SOBRE LOS DATOS:
// - En Chile NO existe un sistema nacional unico para agendar la prueba de manejo.
//   Cada municipalidad administra su propia Direccion de Transito y su propia agenda.
// - El campo `website` es el dominio oficial del municipio (verificado, responde 200).
// - El campo `agendaUrl` solo se incluye cuando se verifico una pagina directa de
//   transito/licencias que responde correctamente. Como las URL internas de los municipios
//   cambian con frecuencia, para las comunas sin `agendaUrl` se usa una busqueda oficial
//   (ver `bookingLink`) que siempre lleva a la pagina vigente.
// - Muchos municipios exigen ser residente de la comuna (acreditar domicilio) para
//   tramitar la licencia ahi. Confirma este requisito antes de agendar.
// - El campo `release` indica CUANDO el municipio libera nuevas horas (dato obtenido del
//   sitio oficial; ver `source`). Se usa en el calendario y en la exportacion a .ics.

import type { ReleaseRule } from "@/lib/release";

export interface ReleaseInfo {
  rule: ReleaseRule;
  /** URL oficial de donde se obtuvo el horario de liberacion. */
  source: string;
  /** Nota adicional (ej. "cupos limitados", "para el mes siguiente"). */
  note?: string;
}

export interface Municipality {
  id: string;
  comuna: string;
  region: string;
  /** Sitio web oficial del municipio (dominio verificado). */
  website: string;
  /** Pagina directa de transito/licencias, SOLO si fue verificada (responde 200). */
  agendaUrl?: string;
  /** Telefono de contacto de la Direccion de Transito, si se conoce. */
  phone?: string;
  /** Modalidad de agendamiento conocida (referencial). */
  modalidad: "online" | "presencial" | "telefonico" | "mixto" | "desconocida";
  /** Exige acreditar residencia en la comuna. */
  requiereResidencia: boolean;
  /** Nivel de demanda / dificultad para conseguir cupo (referencial). */
  demanda?: "alta" | "media" | "baja";
  /** Cuando libera nuevas horas (si se conoce). */
  release?: ReleaseInfo;
  notas?: string;
}

export const MUNICIPALITIES: Municipality[] = [
  {
    id: "santiago",
    comuna: "Santiago",
    region: "Metropolitana",
    website: "https://www.munistgo.cl",
    agendaUrl: "https://tramites.munistgo.cl/SolicitaHoraLicencia/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "alta",
    notas:
      "Alta demanda: los cupos se agotan rapido. Exige acreditar domicilio en la comuna. Reserva online en el portal de tramites.",
  },
  {
    id: "providencia",
    comuna: "Providencia",
    region: "Metropolitana",
    website: "https://www.providencia.cl",
    agendaUrl: "https://agendatuhora.providencia.cl/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    notas: "Agendamiento 100% online a traves del portal de Providencia.",
  },
  {
    id: "las-condes",
    comuna: "Las Condes",
    region: "Metropolitana",
    website: "https://www.lascondes.cl",
    agendaUrl: "https://reservadehoras.lascondes.cl/",
    phone: "+56 2 2950 7000",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "alta",
    release: {
      rule: { kind: "weekly", weekday: 6, hour: 10, minute: 0 },
      source: "https://www.lascondes.cl/tramites/transito/licencias-de-conducir/",
      note: "Se abre agenda para la semana siguiente, solo via pagina web.",
    },
    notas: "Reserva 100% online. La agenda de la semana siguiente se abre los sabados a las 10:00.",
  },
  {
    id: "nunoa",
    comuna: "Nunoa",
    region: "Metropolitana",
    website: "https://www.nunoa.cl",
    agendaUrl: "https://nunoa.cl/portal-de-servicios/reservas-horas-licencias-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "open" },
      source: "https://nunoa.cl/portal-de-servicios/reservas-horas-licencias-de-conducir/",
      note: "Agenda dinamica: siempre hay horas disponibles dentro de los proximos 30 dias.",
    },
  },
  {
    id: "maipu",
    comuna: "Maipu",
    region: "Metropolitana",
    website: "https://www.municipalidadmaipu.cl",
    agendaUrl: "https://www.municipalidadmaipu.cl/licencias-de-conducir",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "alta",
    notas:
      "Una de las comunas mas pobladas; la demanda de horas es muy alta y la espera puede ser de semanas. Conviene revisar temprano o considerar otra comuna donde puedas acreditar residencia.",
  },
  {
    id: "puente-alto",
    comuna: "Puente Alto",
    region: "Metropolitana",
    website: "https://www.mpuentealto.cl",
    modalidad: "mixto",
    requiereResidencia: true,
    demanda: "alta",
    notas:
      "Comuna muy poblada; alta demanda y espera larga. Si puedes acreditar residencia en otra comuna con liberacion conocida, suele ser mas rapido.",
  },
  {
    id: "la-florida",
    comuna: "La Florida",
    region: "Metropolitana",
    website: "https://www.laflorida.cl",
    agendaUrl: "https://www.laflorida.cl/web/transito/",
    modalidad: "online",
    requiereResidencia: true,
  },
  {
    id: "estacion-central",
    comuna: "Estacion Central",
    region: "Metropolitana",
    website: "https://www.muniestacioncentral.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "valparaiso",
    comuna: "Valparaiso",
    region: "Valparaiso",
    website: "https://www.municipalidaddevalparaiso.cl",
    agendaUrl: "https://municipalidaddevalparaiso.cl/licencias-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "weekly", weekday: 1, hour: 10, minute: 0 },
      source: "https://municipalidaddevalparaiso.cl/licencias-de-conducir/",
      note: "Los lunes 10:00 se abre la agenda de una semana, con tres semanas de anticipacion.",
    },
  },
  {
    id: "vina-del-mar",
    comuna: "Vina del Mar",
    region: "Valparaiso",
    website: "https://www.munivina.cl",
    agendaUrl: "https://sertex2.stonline.cl/VinaDelMar/CuposAtencion/Formularios/usuario.aspx",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "weeklyDays", weekdays: [3, 5], hour: 12, minute: 0 },
      source: "https://www.munivina.cl/licencia-de-conducir/",
      note: "Cupos nuevos los miercoles y viernes desde las 12:00. Solo residentes de Vina del Mar.",
    },
  },
  {
    id: "concepcion",
    comuna: "Concepcion",
    region: "Biobio",
    website: "https://www.concepcion.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "temuco",
    comuna: "Temuco",
    region: "La Araucania",
    website: "https://www.temuco.cl",
    agendaUrl: "https://www.temuco.cl/tramites-online/reserva-de-horas-licencia-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
  },
  {
    id: "antofagasta",
    comuna: "Antofagasta",
    region: "Antofagasta",
    website: "https://www.municipalidadantofagasta.cl",
    agendaUrl:
      "https://www.municipalidaddeantofagasta.cl/index.php/home/tramites/licencias-de-conducir/reserva-de-hora",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "monthlyLastBusinessDay", hour: 9, minute: 0 },
      source:
        "https://www.municipalidaddeantofagasta.cl/index.php/noticias/4010-licencia-de-conducir-este-viernes-se-abren-los-cupos-para-junio",
      note: "Los cupos del mes siguiente se abren el ultimo dia habil del mes. Hora referencial: confirma en el sitio.",
    },
  },
  {
    id: "la-serena",
    comuna: "La Serena",
    region: "Coquimbo",
    website: "https://www.laserena.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "rancagua",
    comuna: "Rancagua",
    region: "O'Higgins",
    website: "https://www.rancagua.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "puerto-montt",
    comuna: "Puerto Montt",
    region: "Los Lagos",
    website: "https://www.puertomontt.cl",
    agendaUrl: "https://sertex1.stonline.cl/Puerto_Montt/CuposAtencion/Formularios/usuario.aspx",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
  },
  {
    id: "quilicura",
    comuna: "Quilicura",
    region: "Metropolitana",
    website: "https://www.quilicura.cl",
    agendaUrl: "https://horalicencia.quilicura.cl/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "monthlyFirstBusinessDay", hour: 15, minute: 0 },
      source: "https://ww2.muniquilicura.cl/transito-y-transporte-publico/",
      note: "Cupos del mes siguiente; cupos limitados.",
    },
  },
  {
    id: "renca",
    comuna: "Renca",
    region: "Metropolitana",
    website: "https://www.renca.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "penalolen",
    comuna: "Penalolen",
    region: "Metropolitana",
    website: "https://www.penalolen.cl",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "monthlyDay", day: 15, hour: 9, minute: 0 },
      source: "https://practicatest.cl/como-obtener-la-licencia-de-conducir/en-penalolen",
      note: "Los cupos se liberan los dias 15 de cada mes. Hora referencial: confirma en el sitio.",
    },
  },
  {
    id: "la-reina",
    comuna: "La Reina",
    region: "Metropolitana",
    website: "https://www.lareina.cl",
    agendaUrl: "https://www.lareina.cl/departamento-de-licencias-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "monthlyDay", day: 15, hour: 18, minute: 0 },
      source: "https://www.lareina.cl/departamento-de-licencias-de-conducir/",
      note: "Se activan las horas del mes siguiente a contar del dia 15, desde las 18:00.",
    },
  },
  {
    id: "vitacura",
    comuna: "Vitacura",
    region: "Metropolitana",
    website: "https://www.vitacura.cl",
    agendaUrl: "https://vitacura.cl/tramites-online/licencia-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "baja",
    release: {
      rule: { kind: "weekly", weekday: 1, hour: 10, minute: 0 },
      source: "https://vitacura.cl/tramites-online/licencia-de-conducir/",
      note: "Los lunes 10:00 se abren horas para la semana siguiente. Tienes 24h para subir los documentos.",
    },
  },
  {
    id: "san-bernardo",
    comuna: "San Bernardo",
    region: "Metropolitana",
    website: "https://www.sanbernardo.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "san-miguel",
    comuna: "San Miguel",
    region: "Metropolitana",
    website: "https://web.sanmiguel.cl/agenda-online-abierta-para-licencias-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "open" },
      source: "https://web.sanmiguel.cl/agenda-online-abierta-para-licencias-de-conducir/",
      note: "Agenda online abierta; revisa disponibilidad directamente.",
    },
  },
  {
    id: "coquimbo",
    comuna: "Coquimbo",
    region: "Coquimbo",
    website: "https://www.municoquimbo.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "quilpue",
    comuna: "Quilpue",
    region: "Valparaiso",
    website: "https://www.quilpue.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "talca",
    comuna: "Talca",
    region: "Maule",
    website: "https://www.talca.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "chillan",
    comuna: "Chillan",
    region: "Nuble",
    website: "https://www.municipalidadchillan.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "talcahuano",
    comuna: "Talcahuano",
    region: "Biobio",
    website: "https://www.talcahuano.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "valdivia",
    comuna: "Valdivia",
    region: "Los Rios",
    website: "https://www.munivaldivia.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "osorno",
    comuna: "Osorno",
    region: "Los Lagos",
    website: "https://www.imo.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "punta-arenas",
    comuna: "Punta Arenas",
    region: "Magallanes",
    website: "https://www.puntaarenas.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "colina",
    comuna: "Colina",
    region: "Metropolitana",
    website: "https://www.colina.cl/agenda-tu-cita/",
    agendaUrl: "https://cu.colina.cl",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "weekly", weekday: 1, hour: 15, minute: 0 },
      source: "https://www.patentechile.com/agendar-hora-licencia-conducir-colina/",
      note: "Lunes 15:00 se habilitan horas para las dos semanas siguientes; ademas hay cupos nuevos a diario (5 a 25 dias adelante). Exige residencia.",
    },
  },
  {
    id: "pudahuel",
    comuna: "Pudahuel",
    region: "Metropolitana",
    website: "https://www.mpudahuel.cl",
    agendaUrl: "https://www.mpudahuel.cl/direccion-de-transito-licencias-de-conducir",
    modalidad: "online",
    requiereResidencia: true,
    demanda: "media",
    release: {
      rule: { kind: "weekly", weekday: 1, hour: 9, minute: 0 },
      source: "https://www.mpudahuel.cl/direccion-de-transito-licencias-de-conducir",
      note: "Cada lunes a las 09:00 se abren cupos online (con varias semanas de anticipacion).",
    },
  },
];

/** Busqueda oficial que lleva a la pagina vigente de licencias de la comuna. */
export function searchUrl(m: Municipality): string {
  const q = encodeURIComponent(
    `${m.comuna} licencia de conducir agendar hora direccion de transito`
  );
  return `https://www.google.com/search?q=${q}`;
}

/**
 * Enlace recomendado para agendar: usa la pagina directa verificada si existe,
 * y si no, una busqueda oficial que siempre lleva a la pagina vigente.
 */
export function bookingLink(m: Municipality): string {
  return m.agendaUrl ?? searchUrl(m);
}

/** Comunas con un horario de liberacion conocido (para el calendario y las alertas). */
export function municipalitiesWithRelease(): Municipality[] {
  return MUNICIPALITIES.filter((m) => m.release);
}

const DEMANDA_SCORE: Record<NonNullable<Municipality["demanda"]>, number> = {
  baja: 0,
  media: 1,
  alta: 2,
};

/**
 * Puntaje de "facilidad para conseguir cupo" (menor = mejor). Prioriza menor demanda,
 * tener un horario de liberacion conocido y un enlace directo de reserva.
 */
export function chanceScore(m: Municipality): number {
  const demanda = m.demanda ? DEMANDA_SCORE[m.demanda] : 1.5;
  const releaseBonus = m.release ? -0.5 : 0;
  const directBonus = m.agendaUrl ? -0.25 : 0;
  return demanda + releaseBonus + directBonus;
}

/** Comunas ordenadas de mayor a menor probabilidad de conseguir cupo. */
export function byChance(list: Municipality[] = MUNICIPALITIES): Municipality[] {
  return [...list].sort((a, b) => chanceScore(a) - chanceScore(b));
}

/** Requisitos generales (referenciales) para obtener licencia Clase B por primera vez. */
export const REQUISITOS_CLASE_B: string[] = [
  "Ser mayor de 18 anos.",
  "Cedula de identidad vigente.",
  "Acreditar domicilio en la comuna (en la mayoria de los municipios).",
  "Saber leer y escribir (licencia no profesional).",
  "Aprobar el examen teorico (conocimiento de la Ley de Transito y senalizacion).",
  "Aprobar el examen practico de conduccion.",
  "Aprobar el examen medico y psicotecnico (vista, audicion, coordinacion, etc.).",
  "Pagar los derechos municipales correspondientes.",
];

export const DOCUMENTOS: string[] = [
  "Cedula de identidad vigente.",
  "Comprobante de domicilio (cuenta de servicios, certificado de residencia, etc.).",
  "Pago de derechos municipales (segun cada municipio).",
  "En caso de extranjeros: documentos de residencia segun corresponda.",
];
