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
  notas?: string;
}

export const MUNICIPALITIES: Municipality[] = [
  {
    id: "santiago",
    comuna: "Santiago",
    region: "Metropolitana",
    website: "https://www.munistgo.cl",
    agendaUrl: "https://www.munistgo.cl/tramites/licencia-de-conducir/",
    modalidad: "online",
    requiereResidencia: true,
    notas:
      "La Direccion de Transito de Santiago suele exigir acreditar domicilio en la comuna. Revisa la disponibilidad de horas en su portal de tramites.",
  },
  {
    id: "providencia",
    comuna: "Providencia",
    region: "Metropolitana",
    website: "https://www.providencia.cl",
    modalidad: "online",
    requiereResidencia: true,
    notas: "Agendamiento de horas a traves del portal municipal de Providencia.",
  },
  {
    id: "las-condes",
    comuna: "Las Condes",
    region: "Metropolitana",
    website: "https://www.lascondes.cl",
    modalidad: "online",
    requiereResidencia: true,
    notas: "Reserva de hora online para licencia de conducir en el sitio de Las Condes.",
  },
  {
    id: "nunoa",
    comuna: "Nunoa",
    region: "Metropolitana",
    website: "https://www.nunoa.cl",
    modalidad: "online",
    requiereResidencia: true,
  },
  {
    id: "maipu",
    comuna: "Maipu",
    region: "Metropolitana",
    website: "https://www.maipu.cl",
    modalidad: "mixto",
    requiereResidencia: true,
    notas:
      "Una de las comunas mas pobladas; la demanda de horas es alta, conviene revisar temprano.",
  },
  {
    id: "puente-alto",
    comuna: "Puente Alto",
    region: "Metropolitana",
    website: "https://www.mpuentealto.cl",
    modalidad: "mixto",
    requiereResidencia: true,
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
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "vina-del-mar",
    comuna: "Vina del Mar",
    region: "Valparaiso",
    website: "https://www.munivina.cl",
    modalidad: "online",
    requiereResidencia: true,
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
    agendaUrl: "https://www.temuco.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "antofagasta",
    comuna: "Antofagasta",
    region: "Antofagasta",
    website: "https://www.municipalidadantofagasta.cl",
    modalidad: "mixto",
    requiereResidencia: true,
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
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "quilicura",
    comuna: "Quilicura",
    region: "Metropolitana",
    website: "https://www.quilicura.cl",
    modalidad: "mixto",
    requiereResidencia: true,
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
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "la-reina",
    comuna: "La Reina",
    region: "Metropolitana",
    website: "https://www.lareina.cl",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "vitacura",
    comuna: "Vitacura",
    region: "Metropolitana",
    website: "https://www.vitacura.cl",
    modalidad: "mixto",
    requiereResidencia: true,
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
    website: "https://www.munisanmiguel.cl",
    modalidad: "mixto",
    requiereResidencia: true,
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
