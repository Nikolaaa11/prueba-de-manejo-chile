// Directorio de Direcciones de Transito municipales para tramitar licencia de conducir
// y rendir el examen (teorico, practico, medico) en Chile.
//
// IMPORTANTE SOBRE LOS DATOS:
// - En Chile NO existe un sistema nacional unico para agendar la prueba de manejo.
//   Cada municipalidad administra su propia Direccion de Transito y su propia agenda.
// - Los enlaces apuntan al sitio oficial de cada municipio. La URL exacta de la pagina
//   de agendamiento puede cambiar; por eso se enlaza el sitio del municipio y/o su
//   seccion de transito. Verifica siempre el dato directamente en el sitio oficial.
// - Muchos municipios exigen ser residente de la comuna (acreditar domicilio) para
//   tramitar la licencia ahi. Confirma este requisito antes de agendar.

export interface Municipality {
  id: string;
  comuna: string;
  region: string;
  /** Sitio web oficial del municipio */
  website: string;
  /** URL de la pagina de transito / licencias / agendamiento (puede ser la misma del sitio) */
  agendaUrl: string;
  /** Telefono de contacto de la Direccion de Transito, si se conoce */
  phone?: string;
  /** Modalidad de agendamiento conocida */
  modalidad: "online" | "presencial" | "telefonico" | "mixto" | "desconocida";
  /** Exige acreditar residencia en la comuna */
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
    agendaUrl: "https://www.providencia.cl/transito",
    modalidad: "online",
    requiereResidencia: true,
    notas: "Agendamiento de horas a traves del portal municipal de Providencia.",
  },
  {
    id: "las-condes",
    comuna: "Las Condes",
    region: "Metropolitana",
    website: "https://www.lascondes.cl",
    agendaUrl: "https://www.lascondes.cl/vecinos/licencias-de-conducir.html",
    modalidad: "online",
    requiereResidencia: true,
    notas: "Reserva de hora online para licencia de conducir en el sitio de Las Condes.",
  },
  {
    id: "nunoa",
    comuna: "Nunoa",
    region: "Metropolitana",
    website: "https://www.nunoa.cl",
    agendaUrl: "https://www.nunoa.cl/transito/",
    modalidad: "online",
    requiereResidencia: true,
  },
  {
    id: "maipu",
    comuna: "Maipu",
    region: "Metropolitana",
    website: "https://www.maipu.cl",
    agendaUrl: "https://www.maipu.cl/direccion-de-transito-y-transporte-publico/",
    modalidad: "mixto",
    requiereResidencia: true,
    notas: "Una de las comunas mas pobladas; la demanda de horas es alta, conviene revisar temprano.",
  },
  {
    id: "puente-alto",
    comuna: "Puente Alto",
    region: "Metropolitana",
    website: "https://www.mpuentealto.cl",
    agendaUrl: "https://www.mpuentealto.cl/transito/",
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
    website: "https://www.estacioncentral.cl",
    agendaUrl: "https://www.estacioncentral.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "valparaiso",
    comuna: "Valparaiso",
    region: "Valparaiso",
    website: "https://www.municipalidaddevalparaiso.cl",
    agendaUrl: "https://www.municipalidaddevalparaiso.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "vina-del-mar",
    comuna: "Vina del Mar",
    region: "Valparaiso",
    website: "https://www.munivina.cl",
    agendaUrl: "https://www.munivina.cl/transito/",
    modalidad: "online",
    requiereResidencia: true,
  },
  {
    id: "concepcion",
    comuna: "Concepcion",
    region: "Biobio",
    website: "https://www.concepcion.cl",
    agendaUrl: "https://www.concepcion.cl/transito/",
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
    agendaUrl: "https://www.municipalidadantofagasta.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "la-serena",
    comuna: "La Serena",
    region: "Coquimbo",
    website: "https://www.laserena.cl",
    agendaUrl: "https://www.laserena.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "rancagua",
    comuna: "Rancagua",
    region: "O'Higgins",
    website: "https://www.rancagua.cl",
    agendaUrl: "https://www.rancagua.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
  {
    id: "puerto-montt",
    comuna: "Puerto Montt",
    region: "Los Lagos",
    website: "https://www.puertomonttciudad.cl",
    agendaUrl: "https://www.puertomonttciudad.cl/transito/",
    modalidad: "mixto",
    requiereResidencia: true,
  },
];

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
