// Banco de preguntas para el examen teorico de licencia de conducir Clase B en Chile.
//
// Fuente del contenido: Ley de Transito N 18.290 (texto refundido), Reglamento de
// senales de transito (Manual de Senalizacion de Transito, MTT), y material de estudio
// publicado por CONASET (Comision Nacional de Seguridad de Transito).
//
// IMPORTANTE: estas preguntas reproducen los CONTENIDOS y el estilo del examen teorico
// oficial, pero NO son el banco textual de ninguna municipalidad. El examen real lo toma
// cada Direccion de Transito municipal y sus preguntas exactas pueden variar. Verifica
// siempre la normativa vigente en https://www.conaset.cl y https://www.bcn.cl (Ley 18.290).

import type { SignName } from "@/components/Signs";

export type Category =
  | "senales"
  | "normas"
  | "velocidad"
  | "alcohol"
  | "documentos"
  | "seguridad"
  | "preferencia";

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: string[];
  /** indice (0-based) de la opcion correcta dentro de `options` */
  answer: number;
  explanation: string;
  /** referencia normativa, ej. "Ley 18.290 art. 145" */
  reference?: string;
  /** senal de transito asociada (se dibuja como imagen sobre la pregunta) */
  image?: SignName;
  /** marcada como pregunta frecuente / clave que casi siempre aparece */
  frequent?: boolean;
  /** entre las que mas se fallan en el examen real (segun fuentes reportadas) */
  commonlyFailed?: boolean;
  /** nota sobre por que suele fallarse (con dato/porcentaje si se conoce) */
  failNote?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  senales: "Senales de transito",
  normas: "Normas de conduccion",
  velocidad: "Limites de velocidad",
  alcohol: "Alcohol y drogas",
  documentos: "Documentos y requisitos",
  seguridad: "Seguridad activa y pasiva",
  preferencia: "Derecho preferente de paso",
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "velocidad",
    question:
      "Salvo senalizacion que indique lo contrario, la velocidad maxima para vehiculos livianos en zona urbana es de:",
    options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    answer: 1,
    explanation:
      "En zona urbana el limite general para vehiculos livianos es 50 km/h, salvo que la senalizacion indique algo distinto.",
    reference: "Ley 18.290, art. 145",
  },
  {
    id: 2,
    category: "velocidad",
    question:
      "En zonas de escuelas, hospitales y de alta presencia de peatones, cuando esta senalizado, la velocidad maxima suele ser de:",
    options: ["30 km/h", "50 km/h", "60 km/h", "25 km/h"],
    answer: 0,
    explanation:
      "Las zonas escolares y de alta circulacion peatonal se senalizan habitualmente con limite de 30 km/h para proteger a los peatones.",
    reference: "Ley 18.290, art. 150",
  },
  {
    id: 3,
    category: "velocidad",
    question:
      "Salvo senalizacion en contrario, la velocidad maxima para vehiculos livianos en caminos (zona rural, no autopista) es de:",
    options: ["80 km/h", "100 km/h", "120 km/h", "90 km/h"],
    answer: 1,
    explanation:
      "En caminos de zona rural el limite general para vehiculos livianos es 100 km/h, salvo senalizacion distinta.",
    reference: "Ley 18.290, art. 147",
  },
  {
    id: 4,
    category: "velocidad",
    question:
      "Salvo senalizacion en contrario, la velocidad maxima para vehiculos livianos en autopistas es de:",
    options: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
    answer: 2,
    explanation:
      "En autopistas el limite general para vehiculos livianos es 120 km/h, salvo que la senalizacion indique un valor menor.",
    reference: "Ley 18.290, art. 147",
  },
  {
    id: 5,
    category: "alcohol",
    question:
      "Se considera que una persona conduce 'bajo la influencia del alcohol' cuando su alcoholemia esta entre:",
    options: [
      "0,0 y 0,3 gramos por litro de sangre",
      "0,3 y 0,79 gramos por litro de sangre",
      "0,8 y 1,5 gramos por litro de sangre",
      "1,5 gramos por litro de sangre o mas",
    ],
    answer: 1,
    explanation:
      "Entre 0,3 y 0,79 g/L se conduce 'bajo la influencia del alcohol'. Desde 0,8 g/L se configura 'estado de ebriedad'.",
    reference: "Ley 18.290, art. 110 (Ley Tolerancia Cero)",
  },
  {
    id: 6,
    category: "alcohol",
    question: "Se configura 'estado de ebriedad' al conducir cuando la alcoholemia es de:",
    options: [
      "0,3 gramos por litro o mas",
      "0,5 gramos por litro o mas",
      "0,8 gramos por litro o mas",
      "1,0 gramo por litro o mas",
    ],
    answer: 2,
    explanation:
      "Desde 0,8 g/L de alcohol en la sangre se considera 'estado de ebriedad', con sanciones mas graves.",
    reference: "Ley 18.290, art. 110",
  },
  {
    id: 7,
    category: "documentos",
    question: "La edad minima para obtener licencia de conducir Clase B es:",
    options: ["16 anos", "17 anos", "18 anos", "21 anos"],
    answer: 2,
    explanation:
      "La licencia Clase B (vehiculos motorizados particulares) se otorga a personas mayores de 18 anos.",
    reference: "Ley 18.290, art. 13",
  },
  {
    id: 8,
    category: "documentos",
    question:
      "Para circular legalmente, ademas de la licencia de conducir, el vehiculo debe contar con:",
    options: [
      "Solo permiso de circulacion",
      "Permiso de circulacion, revision tecnica al dia y seguro obligatorio (SOAP)",
      "Solo el seguro obligatorio (SOAP)",
      "Solo la revision tecnica",
    ],
    answer: 1,
    explanation:
      "El vehiculo debe tener permiso de circulacion vigente, certificado de revision tecnica al dia y el Seguro Obligatorio de Accidentes Personales (SOAP).",
    reference: "Ley 18.290, art. 4 y art. 51",
  },
  {
    id: 9,
    category: "seguridad",
    question: "El uso del cinturon de seguridad es obligatorio para:",
    options: [
      "Solo el conductor",
      "Solo los ocupantes de los asientos delanteros",
      "El conductor y todos los pasajeros del vehiculo",
      "Solo en carretera",
    ],
    answer: 2,
    explanation:
      "El cinturon de seguridad es obligatorio para el conductor y todos los ocupantes del vehiculo, en todos sus asientos.",
    reference: "Ley 18.290, art. 75",
  },
  {
    id: 10,
    category: "seguridad",
    question:
      "Los ninos menores de la edad o estatura definida por la ley deben viajar:",
    options: [
      "En el asiento delantero junto al conductor",
      "En los asientos traseros y con sistema de retencion infantil adecuado",
      "En brazos de un adulto en el asiento trasero",
      "En cualquier asiento sin restricciones",
    ],
    answer: 1,
    explanation:
      "Los menores deben viajar en los asientos traseros utilizando un sistema de retencion infantil acorde a su edad, peso y estatura.",
    reference: "Ley 18.290, art. 76 y normativa de sillas infantiles",
  },
  {
    id: 11,
    category: "preferencia",
    question:
      "En una interseccion no regulada por senales ni semaforos, tiene preferencia de paso:",
    options: [
      "El vehiculo que viene por la izquierda",
      "El vehiculo que viene por la derecha",
      "El vehiculo de mayor tamano",
      "El que llegue primero, sin importar la direccion",
    ],
    answer: 1,
    explanation:
      "Cuando no hay senalizacion que regule la interseccion, tiene preferencia el vehiculo que enfrenta a otro por su derecha.",
    reference: "Ley 18.290, art. 137",
  },
  {
    id: 12,
    category: "preferencia",
    question: "Frente a un peaton que cruza por un paso de cebra (paso peatonal), el conductor debe:",
    options: [
      "Tocar la bocina para que se apure",
      "Detenerse y cederle el paso",
      "Avanzar lentamente sin detenerse",
      "Pasar primero si no viene nadie atras",
    ],
    answer: 1,
    explanation:
      "El peaton tiene preferencia en los pasos peatonales; el conductor debe detenerse y cederle el paso.",
    reference: "Ley 18.290, art. 168",
  },
  {
    id: 13,
    category: "senales",
    question: "Una senal de transito de forma octogonal (8 lados) de color rojo significa:",
    options: ["Ceda el paso", "Pare / Alto (detencion obligatoria)", "Prohibido estacionar", "Curva peligrosa"],
    answer: 1,
    explanation:
      "La senal octogonal roja 'PARE' obliga a detener completamente el vehiculo antes de la linea de detencion.",
    reference: "Manual de Senalizacion de Transito (senales reglamentarias)",
  },
  {
    id: 14,
    category: "senales",
    question: "Una senal triangular con el vertice hacia abajo, borde rojo y fondo blanco significa:",
    options: ["Pare", "Ceda el paso", "Velocidad maxima", "No entrar"],
    answer: 1,
    explanation:
      "El triangulo invertido con borde rojo es la senal 'CEDA EL PASO': se debe reducir la velocidad y, si es necesario, detenerse para dar preferencia.",
    reference: "Manual de Senalizacion de Transito",
  },
  {
    id: 15,
    category: "senales",
    question: "Las senales de transito de fondo amarillo (o verde limon) y simbolos negros son principalmente:",
    options: [
      "Reglamentarias (obligaciones y prohibiciones)",
      "Preventivas (advierten un peligro o condicion del camino)",
      "Informativas de servicios",
      "De obras en la via",
    ],
    answer: 1,
    explanation:
      "Las senales preventivas, de fondo amarillo y simbolos negros, advierten sobre peligros o condiciones especiales del camino mas adelante.",
    reference: "Manual de Senalizacion de Transito (senales de advertencia)",
  },
  {
    id: 16,
    category: "senales",
    question: "Una linea continua de eje (central) en la calzada indica que:",
    options: [
      "Se puede adelantar con precaucion",
      "Esta prohibido adelantar y cruzar esa linea",
      "Es una zona de estacionamiento",
      "Indica el fin de la via",
    ],
    answer: 1,
    explanation:
      "La linea continua prohibe adelantar y cruzarla; solo la linea segmentada permite el adelantamiento cuando es seguro.",
    reference: "Manual de Senalizacion de Transito (demarcaciones)",
  },
  {
    id: 17,
    category: "normas",
    question: "Al aproximarse a un semaforo con luz amarilla (ambar) fija, el conductor debe:",
    options: [
      "Acelerar para pasar antes del rojo",
      "Detenerse si puede hacerlo con seguridad; la luz advierte que viene el rojo",
      "Continuar a la misma velocidad siempre",
      "Tocar la bocina y avanzar",
    ],
    answer: 1,
    explanation:
      "La luz amarilla advierte que la senal cambiara a roja; se debe detener si es posible hacerlo de forma segura.",
    reference: "Ley 18.290, art. 104",
  },
  {
    id: 18,
    category: "normas",
    question: "Esta permitido adelantar a otro vehiculo:",
    options: [
      "En curvas y al acercarse a la cima de una cuesta",
      "Por la derecha siempre",
      "Por la izquierda, cuando la via lo permite y hay visibilidad y espacio seguro",
      "En cruces peatonales",
    ],
    answer: 2,
    explanation:
      "El adelantamiento se realiza por la izquierda, solo cuando la senalizacion lo permite y existe visibilidad y distancia suficientes. Esta prohibido en curvas, cimas y cruces.",
    reference: "Ley 18.290, art. 128 y siguientes",
  },
  {
    id: 19,
    category: "normas",
    question: "El uso del telefono celular mientras se conduce:",
    options: [
      "Esta permitido solo para llamadas cortas",
      "Esta permitido si se sostiene con la mano",
      "Esta prohibido sostenerlo con la mano; solo se permite con sistema de manos libres",
      "Esta permitido en semaforos en rojo",
    ],
    answer: 2,
    explanation:
      "Esta prohibido conducir sosteniendo o manipulando el celular con la mano. Solo se permite mediante dispositivo de manos libres.",
    reference: "Ley 18.290, art. 200",
  },
  {
    id: 20,
    category: "normas",
    question: "Las luces del vehiculo en una via interurbana (carretera) deben usarse:",
    options: [
      "Solo de noche",
      "Encendidas de dia y de noche en caminos rurales/interurbanos",
      "Solo cuando llueve",
      "Nunca durante el dia",
    ],
    answer: 1,
    explanation:
      "En vias interurbanas se deben mantener las luces encendidas durante todo el dia para mejorar la visibilidad del vehiculo.",
    reference: "Ley 18.290, art. 96",
  },
  {
    id: 21,
    category: "normas",
    question: "Ante la presencia de un vehiculo de emergencia con sirena y luces encendidas, usted debe:",
    options: [
      "Seguirlo de cerca para avanzar mas rapido",
      "Detenerse en medio de la via",
      "Cederle el paso, orillandose a la derecha y deteniendose si es necesario",
      "Acelerar para no estorbar",
    ],
    answer: 2,
    explanation:
      "Se debe ceder el paso a los vehiculos de emergencia, orillandose hacia la derecha y deteniendose de ser necesario.",
    reference: "Ley 18.290, art. 141",
  },
  {
    id: 22,
    category: "normas",
    question: "La distancia con el vehiculo que va adelante debe ser:",
    options: [
      "La menor posible para aprovechar el espacio",
      "Suficiente para detenerse a tiempo segun la velocidad y el estado del camino",
      "Fija de 2 metros siempre",
      "Solo importante en ciudad",
    ],
    answer: 1,
    explanation:
      "Hay que mantener una distancia prudente que permita frenar a tiempo, la cual aumenta con la velocidad y empeora con la lluvia o mala visibilidad.",
    reference: "Ley 18.290, art. 130",
  },
  {
    id: 23,
    category: "seguridad",
    question: "Si las ruedas del vehiculo se bloquean al frenar bruscamente y derrapa, lo recomendable es:",
    options: [
      "Seguir frenando con mas fuerza",
      "Girar el volante bruscamente",
      "Soltar levemente el freno y dirigir el volante hacia donde se quiere ir, sin movimientos bruscos",
      "Acelerar para recuperar el control",
    ],
    answer: 2,
    explanation:
      "Ante un derrape se debe aliviar la presion del freno y corregir suavemente la direccion hacia donde se quiere ir, evitando maniobras bruscas.",
    reference: "Tecnicas de conduccion defensiva (CONASET)",
  },
  {
    id: 24,
    category: "seguridad",
    question: "La conduccion a la defensiva consiste principalmente en:",
    options: [
      "Conducir lo mas rapido posible para evitar congestion",
      "Anticiparse a las acciones de otros y prevenir situaciones de riesgo",
      "Confiar en que los demas respetaran siempre las normas",
      "Usar la bocina con frecuencia",
    ],
    answer: 1,
    explanation:
      "Conducir a la defensiva implica anticiparse a posibles errores de otros conductores y peatones para evitar accidentes.",
    reference: "Manual de conduccion (CONASET)",
  },
  {
    id: 25,
    category: "alcohol",
    question: "El consumo de alcohol al conducir afecta principalmente:",
    options: [
      "Solo la vision",
      "Los reflejos, la coordinacion, el tiempo de reaccion y la percepcion de riesgo",
      "Solo el equilibrio al caminar",
      "No afecta la conduccion en dosis bajas",
    ],
    answer: 1,
    explanation:
      "El alcohol disminuye los reflejos, la coordinacion, el tiempo de reaccion y la capacidad de evaluar riesgos, aumentando la probabilidad de accidentes.",
    reference: "CONASET - efectos del alcohol",
  },
  {
    id: 26,
    category: "senales",
    question: "Una senal circular con borde rojo, fondo blanco y un numero (ej. '60') indica:",
    options: [
      "Distancia al proximo pueblo",
      "Velocidad maxima permitida en km/h",
      "Velocidad minima obligatoria",
      "Numero de la ruta",
    ],
    answer: 1,
    explanation:
      "Las senales reglamentarias circulares con borde rojo y un numero indican la velocidad maxima permitida en ese tramo.",
    reference: "Manual de Senalizacion de Transito (senales reglamentarias)",
  },
  {
    id: 27,
    category: "senales",
    question: "Una senal de fondo azul es generalmente:",
    options: [
      "Una prohibicion",
      "Una advertencia de peligro",
      "Informativa (servicios, indicaciones o informacion al conductor)",
      "Una senal de pare",
    ],
    answer: 2,
    explanation:
      "Las senales de fondo azul son informativas: indican servicios, direcciones u otra informacion util para el conductor.",
    reference: "Manual de Senalizacion de Transito (senales informativas)",
  },
  {
    id: 28,
    category: "normas",
    question: "Para realizar un viraje o cambio de pista, el conductor debe:",
    options: [
      "Hacerlo de inmediato sin avisar",
      "Senalizar con anticipacion usando las luces direccionales (intermitentes)",
      "Solo mirar por el espejo retrovisor",
      "Tocar la bocina",
    ],
    answer: 1,
    explanation:
      "Todo viraje o cambio de pista debe anunciarse con anticipacion mediante las luces direccionales, ademas de verificar los espejos y el punto ciego.",
    reference: "Ley 18.290, art. 124",
  },
  {
    id: 29,
    category: "normas",
    question: "Esta prohibido estacionar:",
    options: [
      "En cualquier calle de la ciudad",
      "Sobre la vereda, en pasos peatonales, frente a grifos y en intersecciones",
      "Solo de noche",
      "Solo en autopistas",
    ],
    answer: 1,
    explanation:
      "No se puede estacionar sobre la acera, en cruces peatonales, en intersecciones, frente a grifos, ni donde se obstaculice el transito o la visibilidad.",
    reference: "Ley 18.290, art. 154 y 159",
  },
  {
    id: 30,
    category: "documentos",
    question: "El Seguro Obligatorio de Accidentes Personales (SOAP) cubre:",
    options: [
      "Los danos materiales del vehiculo propio",
      "Danos corporales (muerte y lesiones) de personas afectadas en accidentes de transito",
      "El robo del vehiculo",
      "Multas de transito",
    ],
    answer: 1,
    explanation:
      "El SOAP cubre danos corporales (muerte o lesiones) de las personas afectadas en un accidente de transito; no cubre danos materiales.",
    reference: "Ley 18.490 (Seguro Obligatorio)",
  },
  {
    id: 31,
    category: "documentos",
    question: "La revision tecnica de un vehiculo sirve para:",
    options: [
      "Pagar un impuesto anual",
      "Verificar que el vehiculo esta en condiciones mecanicas y de seguridad para circular",
      "Renovar la licencia de conducir",
      "Inscribir el vehiculo por primera vez",
    ],
    answer: 1,
    explanation:
      "La revision tecnica certifica que el vehiculo cumple las condiciones mecanicas, de seguridad y de emisiones para circular.",
    reference: "Ley 18.290, art. 4 letra g",
  },
  {
    id: 32,
    category: "preferencia",
    question: "En una rotonda (glorieta), por regla general tiene preferencia:",
    options: [
      "El vehiculo que va a ingresar a la rotonda",
      "El vehiculo que ya circula dentro de la rotonda",
      "El vehiculo mas grande",
      "Quien toque primero la bocina",
    ],
    answer: 1,
    explanation:
      "En las rotondas tiene preferencia quien ya circula dentro de ella; quien va a ingresar debe ceder el paso.",
    reference: "Ley 18.290, art. 137 y senalizacion local",
  },
  {
    id: 33,
    category: "preferencia",
    question: "Ante la luz roja intermitente de un semaforo o de un cruce ferroviario, el conductor debe:",
    options: [
      "Disminuir un poco la velocidad y seguir",
      "Detenerse totalmente y avanzar solo cuando sea seguro",
      "Avanzar sin detenerse si no viene tren",
      "Tocar la bocina y pasar",
    ],
    answer: 1,
    explanation:
      "La luz roja intermitente obliga a detenerse completamente y avanzar solo cuando se verifique que es seguro hacerlo.",
    reference: "Ley 18.290, art. 104",
  },
  {
    id: 34,
    category: "seguridad",
    question: "El 'punto ciego' del vehiculo es:",
    options: [
      "Una falla en los frenos",
      "La zona que el conductor no puede ver directamente ni a traves de los espejos",
      "El angulo de giro de las ruedas",
      "La luz de freno trasera",
    ],
    answer: 1,
    explanation:
      "El punto ciego es el area alrededor del vehiculo que no se ve por los espejos; por eso hay que girar la cabeza antes de cambiar de pista.",
    reference: "Tecnicas de conduccion (CONASET)",
  },
  {
    id: 35,
    category: "normas",
    question: "En condiciones de lluvia o pavimento mojado, el conductor debe:",
    options: [
      "Mantener la misma velocidad de siempre",
      "Reducir la velocidad y aumentar la distancia de seguimiento",
      "Frenar bruscamente para probar el agarre",
      "Apagar las luces para ahorrar bateria",
    ],
    answer: 1,
    explanation:
      "Con lluvia disminuye la adherencia y la visibilidad; se debe reducir la velocidad, encender las luces y aumentar la distancia con el vehiculo de adelante.",
    reference: "Conduccion defensiva (CONASET)",
  },
  {
    id: 36,
    category: "senales",
    question: "Una senal con simbolo de un peaton dentro de un triangulo de borde rojo advierte:",
    options: [
      "Prohibido el paso de peatones",
      "Zona de cruce de peatones mas adelante",
      "Paradero de buses",
      "Fin de zona urbana",
    ],
    answer: 1,
    explanation:
      "Es una senal preventiva que advierte la proximidad de un cruce o zona de circulacion de peatones; se debe disminuir la velocidad.",
    reference: "Manual de Senalizacion de Transito",
  },
  {
    id: 37,
    category: "alcohol",
    question: "Negarse a realizar el examen de alcoholemia o la prueba respiratoria cuando lo solicita Carabineros:",
    options: [
      "No tiene ninguna consecuencia",
      "Es un derecho del conductor sin sancion",
      "Constituye una infraccion y puede presumirse el estado de ebriedad, con sanciones",
      "Solo aplica a conductores profesionales",
    ],
    answer: 2,
    explanation:
      "La negativa injustificada a someterse a las pruebas respiratorias o de alcoholemia es sancionada y puede presumirse el estado de ebriedad.",
    reference: "Ley 18.290, art. 182 y 183",
  },
  {
    id: 38,
    category: "documentos",
    question: "Si un conductor acumula infracciones graves o gravisimas, puede ocurrir que:",
    options: [
      "Nunca pase nada",
      "Se le suspenda o cancele la licencia de conducir segun la gravedad y reincidencia",
      "Solo se le cambie de clase de licencia",
      "Pierda el vehiculo automaticamente",
    ],
    answer: 1,
    explanation:
      "Las infracciones graves y gravisimas, especialmente reiteradas, pueden derivar en la suspension o cancelacion de la licencia de conducir.",
    reference: "Ley 18.290, art. 200 y siguientes",
  },
  {
    id: 39,
    category: "normas",
    question: "Al circular, la regla general es conducir:",
    options: [
      "Por el centro de la calzada",
      "Por la pista derecha, usando las de la izquierda para adelantar o virar",
      "Por la pista izquierda siempre",
      "Por donde haya menos autos sin importar la pista",
    ],
    answer: 1,
    explanation:
      "Se circula por la pista derecha; las pistas de la izquierda se utilizan para adelantar o para preparar un viraje a la izquierda.",
    reference: "Ley 18.290, art. 119",
  },
  {
    id: 40,
    category: "seguridad",
    question: "El apoyacabezas (reposacabezas) del asiento sirve principalmente para:",
    options: [
      "Descansar comodamente en viajes largos",
      "Reducir lesiones cervicales (latigazo) en caso de impacto, especialmente por detras",
      "Sostener objetos",
      "Mejorar la vision trasera",
    ],
    answer: 1,
    explanation:
      "El apoyacabezas, bien regulado, reduce el riesgo de lesiones cervicales (efecto latigazo) ante un impacto, sobre todo en colisiones por detras.",
    reference: "Seguridad pasiva (CONASET)",
  },
  {
    id: 41,
    category: "velocidad",
    question: "Conducir muy por debajo de la velocidad minima o a una velocidad anormalmente baja sin causa justificada:",
    options: [
      "Siempre es mas seguro y esta permitido",
      "Puede entorpecer el transito y constituir una infraccion",
      "Esta permitido en autopistas",
      "Solo afecta de noche",
    ],
    answer: 1,
    explanation:
      "Circular a una velocidad anormalmente baja sin justificacion entorpece la marcha normal del transito y puede ser sancionado.",
    reference: "Ley 18.290, art. 149",
  },
  {
    id: 42,
    category: "normas",
    question: "Antes de abrir la puerta del vehiculo estacionado en la calle, el conductor o pasajero debe:",
    options: [
      "Abrirla rapidamente",
      "Verificar que no vengan vehiculos, ciclistas ni peatones para no provocar un accidente",
      "Abrirla solo del lado de la vereda siempre",
      "No es necesario verificar nada",
    ],
    answer: 1,
    explanation:
      "Antes de abrir una puerta hacia la calzada hay que verificar que no se aproximen vehiculos, ciclistas ni peatones para evitar atropellos o colisiones.",
    reference: "Conduccion segura (CONASET)",
  },
  {
    id: 43,
    category: "preferencia",
    question: "Respecto de los ciclistas, el conductor de un vehiculo motorizado debe:",
    options: [
      "Adelantarlos lo mas cerca posible",
      "Respetar una distancia minima de seguridad al adelantar (al menos 1,5 metros) y su prioridad cuando corresponde",
      "Tocar la bocina para que se aparten",
      "Considerarlos siempre culpables",
    ],
    answer: 1,
    explanation:
      "La Ley de Convivencia Vial exige mantener al menos 1,5 metros de distancia al adelantar a un ciclista y respetar su seguridad.",
    reference: "Ley 18.290 (Ley de Convivencia de Modos), art. 196 ter",
  },
  {
    id: 44,
    category: "senales",
    question: "Una linea de color amarillo en el borde de la calzada (solera) generalmente indica:",
    options: [
      "Zona de estacionamiento permitido",
      "Prohibicion de estacionar o detenerse en ese sector",
      "Pista exclusiva para buses",
      "Ciclovia",
    ],
    answer: 1,
    explanation:
      "La demarcacion amarilla en la solera o borde de la calzada indica generalmente prohibicion de estacionar o detenerse.",
    reference: "Manual de Senalizacion de Transito (demarcaciones)",
  },
  {
    id: 45,
    category: "normas",
    question: "El uso de la bocina (claxon) esta permitido para:",
    options: [
      "Apurar a otros conductores en un taco",
      "Advertir una situacion de peligro inminente y evitar accidentes",
      "Saludar a conocidos",
      "Manifestar molestia con otros conductores",
    ],
    answer: 1,
    explanation:
      "La bocina debe usarse solo para advertir peligros y evitar accidentes, no para apresurar o molestar a otros usuarios de la via.",
    reference: "Ley 18.290, art. 82",
  },
  {
    id: 46,
    category: "senales",
    question:
      "Una senal circular de fondo blanco con borde rojo y una linea horizontal blanca al centro significa:",
    options: ["Prohibido adelantar", "Prohibido el ingreso (no entrar)", "Via de un solo sentido", "Ceda el paso"],
    answer: 1,
    explanation:
      "Es la senal reglamentaria 'No entrar': prohibe el ingreso de vehiculos a esa via o sentido de circulacion.",
    reference: "Manual de Senalizacion de Transito (senales reglamentarias)",
  },
  {
    id: 47,
    category: "senales",
    question: "Una linea de eje segmentada (discontinua) en la calzada indica que:",
    options: [
      "Esta prohibido adelantar",
      "Se permite adelantar y cruzarla cuando es seguro hacerlo",
      "Es el limite de la berma",
      "Es una zona de detencion prohibida",
    ],
    answer: 1,
    explanation:
      "La linea segmentada permite el adelantamiento y el cruce siempre que haya visibilidad y sea seguro; la linea continua lo prohibe.",
    reference: "Manual de Senalizacion de Transito (demarcaciones)",
  },
  {
    id: 48,
    category: "normas",
    question:
      "Al cruzarse con un vehiculo que viene en sentido contrario de noche, usted debe:",
    options: [
      "Mantener las luces altas para ver mejor",
      "Cambiar a luces bajas para no encandilar al otro conductor",
      "Apagar todas las luces",
      "Encender las luces de emergencia",
    ],
    answer: 1,
    explanation:
      "Al cruzarse con otro vehiculo de frente (o seguir a uno de cerca) se deben usar las luces bajas para no encandilar y evitar accidentes.",
    reference: "Ley 18.290, art. 96 y 97",
  },
  {
    id: 49,
    category: "seguridad",
    question: "Las luces intermitentes de emergencia (balizas) se deben usar para:",
    options: [
      "Estacionar en un lugar prohibido por un momento",
      "Indicar que el vehiculo esta detenido por emergencia o representa un peligro",
      "Avisar que vas con prisa",
      "Circular mas rapido en autopista",
    ],
    answer: 1,
    explanation:
      "Las luces de emergencia advierten que el vehiculo esta detenido o constituye un peligro; no autorizan a estacionar donde esta prohibido.",
    reference: "Ley 18.290, art. 98",
  },
  {
    id: 50,
    category: "seguridad",
    question:
      "Si su vehiculo queda detenido en una carretera por una falla, lo correcto es:",
    options: [
      "Quedarse dentro del auto sin senalizar",
      "Encender las balizas y colocar los triangulos o dispositivos de seguridad a una distancia prudente",
      "Empujarlo solo hasta el centro de la pista",
      "Esperar de noche sin luces para ahorrar bateria",
    ],
    answer: 1,
    explanation:
      "Ante una detencion de emergencia se deben encender las balizas y ubicar los triangulos reflectantes a una distancia prudente para advertir a los demas conductores.",
    reference: "Ley 18.290, art. 99",
  },
  {
    id: 51,
    category: "velocidad",
    question:
      "Respecto de los vehiculos livianos, los buses y camiones generalmente tienen limites de velocidad:",
    options: ["Mayores", "Iguales", "Menores", "Sin limite en carretera"],
    answer: 2,
    explanation:
      "Por su mayor peso y distancia de frenado, los vehiculos pesados y de transporte de pasajeros tienen limites de velocidad menores que los livianos.",
    reference: "Ley 18.290, art. 146 y 147",
  },
  {
    id: 52,
    category: "documentos",
    question:
      "Para postular a una licencia profesional (Clase A), por regla general se exige:",
    options: [
      "Ser mayor de 16 anos",
      "Ser mayor de 20 anos y haber tenido previamente licencia Clase B por cierto tiempo",
      "Solo aprobar el examen teorico",
      "No se exige experiencia previa",
    ],
    answer: 1,
    explanation:
      "Las licencias profesionales Clase A exigen mayor edad (sobre 20 anos) y haber sido titular de licencia Clase B durante un periodo previo, ademas de cursos y examenes especificos.",
    reference: "Ley 18.290, art. 13 y 14",
  },
  {
    id: 53,
    category: "documentos",
    question: "La licencia de conducir no profesional (Clase B) debe ser controlada (renovada):",
    options: ["Cada ano", "Cada 6 anos", "Cada 10 anos", "Nunca, es permanente"],
    answer: 1,
    explanation:
      "La licencia no profesional se somete a un control cada 6 anos, donde se repiten examenes (medico, etc.) para confirmar la aptitud para conducir.",
    reference: "Ley 18.290, art. 19",
  },
  {
    id: 54,
    category: "normas",
    question:
      "Si usted se ve involucrado en un accidente de transito con personas lesionadas, debe:",
    options: [
      "Retirarse del lugar para evitar problemas",
      "Detenerse, prestar o procurar auxilio y dar aviso a la autoridad",
      "Mover de inmediato a los heridos sin precaucion",
      "Continuar la marcha si el dano es menor",
    ],
    answer: 1,
    explanation:
      "Ante un accidente con lesionados se debe detener, prestar o procurar la ayuda posible y avisar a la autoridad. Darse a la fuga es un delito.",
    reference: "Ley 18.290, art. 168 y 176",
  },
  {
    id: 55,
    category: "documentos",
    question: "Conducir un vehiculo sin haber obtenido nunca licencia de conducir es:",
    options: [
      "Una falta sin importancia",
      "Una infraccion grave/gravisima que puede implicar multa y retiro del vehiculo",
      "Permitido si vas acompanado",
      "Permitido en calles sin transito",
    ],
    answer: 1,
    explanation:
      "Conducir sin licencia es una infraccion seria; puede acarrear multa, citacion al juzgado y retiro del vehiculo de circulacion.",
    reference: "Ley 18.290, art. 196 y 200",
  },
  {
    id: 56,
    category: "seguridad",
    question: "El uso del cinturon de seguridad en una mujer embarazada:",
    options: [
      "Esta prohibido",
      "Es obligatorio, ubicando la banda inferior bajo el abdomen, sobre las caderas",
      "Es opcional",
      "Solo se usa la banda superior",
    ],
    answer: 1,
    explanation:
      "La embarazada debe usar cinturon; la banda inferior va por debajo del abdomen, ajustada sobre las caderas, y la diagonal entre los senos, hacia el costado del abdomen.",
    reference: "Recomendaciones de seguridad (CONASET)",
  },
  {
    id: 57,
    category: "normas",
    question: "Cuando un semaforo muestra una flecha verde hacia la izquierda, significa que:",
    options: [
      "Esta prohibido virar a la izquierda",
      "Se autoriza virar a la izquierda con preferencia en ese momento",
      "Solo pueden pasar los peatones",
      "Debes detenerte obligatoriamente",
    ],
    answer: 1,
    explanation:
      "La flecha verde autoriza el movimiento en esa direccion (en este caso, virar a la izquierda) con preferencia mientras este encendida.",
    reference: "Manual de Senalizacion (semaforos)",
  },
  {
    id: 58,
    category: "normas",
    question: "En Chile, virar a la derecha cuando el semaforo esta en rojo:",
    options: [
      "Esta siempre permitido tras detenerse",
      "Esta prohibido, salvo que una senal lo autorice expresamente",
      "Esta permitido solo de noche",
      "Esta permitido si no vienen peatones",
    ],
    answer: 1,
    explanation:
      "A diferencia de otros paises, en Chile no se permite virar con luz roja salvo que exista una senal especifica que lo autorice.",
    reference: "Ley 18.290, art. 104",
  },
  {
    id: 59,
    category: "normas",
    question: "El viraje en 'U' (cambio de sentido) esta prohibido:",
    options: [
      "En cualquier calle ancha",
      "En curvas, puentes, tuneles, cruces y donde haya linea continua o lo prohiba la senalizacion",
      "Solo en autopistas",
      "Nunca esta prohibido",
    ],
    answer: 1,
    explanation:
      "El viraje en U esta prohibido donde compromete la seguridad o la visibilidad: curvas, cimas, puentes, tuneles, intersecciones y donde haya linea continua o senal que lo impida.",
    reference: "Ley 18.290, art. 138",
  },
  {
    id: 60,
    category: "preferencia",
    question: "Frente a un vehiculo que circula sobre rieles (tren o tranvia), usted debe:",
    options: [
      "Cruzar rapido antes que pase",
      "Cederle siempre el paso, pues no puede maniobrar para esquivar",
      "Tocar la bocina para que se detenga",
      "Avanzar en paralelo",
    ],
    answer: 1,
    explanation:
      "Los vehiculos que circulan sobre rieles tienen preferencia porque no pueden desviarse ni frenar con facilidad; siempre se les cede el paso.",
    reference: "Ley 18.290, art. 137",
  },
  {
    id: 61,
    category: "velocidad",
    question:
      "En condiciones de neblina densa, tunel o baja visibilidad, lo recomendable es:",
    options: [
      "Aumentar la velocidad para salir pronto",
      "Reducir la velocidad, encender las luces y aumentar la distancia de seguimiento",
      "Usar las luces altas",
      "Apagar las luces para ver mejor",
    ],
    answer: 1,
    explanation:
      "Con neblina o baja visibilidad se reduce la velocidad, se encienden luces bajas (y antiniebla si se tienen) y se aumenta la distancia con el vehiculo de adelante. Las luces altas empeoran la vision con neblina.",
    reference: "Conduccion defensiva (CONASET)",
  },
  {
    id: 62,
    category: "seguridad",
    question: "Las luces antiniebla se deben utilizar:",
    options: [
      "Siempre, junto con las luces altas",
      "Solo en condiciones de baja visibilidad (niebla, lluvia intensa, polvo)",
      "Para circular mas rapido de noche",
      "Como reemplazo de las luces bajas siempre",
    ],
    answer: 1,
    explanation:
      "Las luces antiniebla son un apoyo para condiciones de baja visibilidad; usarlas sin necesidad puede encandilar a otros conductores.",
    reference: "Ley 18.290, art. 96",
  },
  {
    id: 63,
    category: "normas",
    question:
      "Si transporta carga que sobresale por la parte trasera del vehiculo, debe:",
    options: [
      "No es necesario senalizarla",
      "Senalizarla (banderola roja de dia y luz o reflectante de noche) y respetar los limites permitidos",
      "Conducir mas rapido para llegar pronto",
      "Llevarla solo en la noche",
    ],
    answer: 1,
    explanation:
      "La carga que sobresale debe ir debidamente senalizada con una banderola roja de dia y luz/elemento reflectante de noche, sin exceder lo permitido.",
    reference: "Ley 18.290, art. 71",
  },
  {
    id: 64,
    category: "documentos",
    question: "Conducir un vehiculo sin portar la licencia de conducir:",
    options: [
      "No tiene sancion si la tienes vigente en casa",
      "Es una infraccion: la licencia debe portarse siempre mientras se conduce",
      "Esta permitido los fines de semana",
      "Solo se exige en carretera",
    ],
    answer: 1,
    explanation:
      "La licencia de conducir debe portarse siempre al conducir; no llevarla constituye una infraccion aunque la licencia este vigente.",
    reference: "Ley 18.290, art. 5",
  },
  {
    id: 65,
    category: "seguridad",
    question: "El airbag (bolsa de aire) del vehiculo:",
    options: [
      "Reemplaza al cinturon de seguridad",
      "Complementa al cinturon, pero no lo reemplaza; sin cinturon puede causar lesiones",
      "Se debe desactivar siempre",
      "Solo sirve en choques traseros",
    ],
    answer: 1,
    explanation:
      "El airbag es un complemento del cinturon de seguridad. Sin cinturon, su despliegue puede provocar lesiones; ambos sistemas funcionan en conjunto.",
    reference: "Seguridad pasiva (CONASET)",
  },
  {
    id: 66,
    category: "normas",
    question: "La diferencia entre 'detencion' y 'estacionamiento' es que:",
    options: [
      "Son lo mismo",
      "La detencion es una parada breve para subir/bajar pasajeros o carga; el estacionamiento es dejar el vehiculo inmovil por mas tiempo",
      "La detencion solo ocurre en semaforos",
      "El estacionamiento siempre es gratis",
    ],
    answer: 1,
    explanation:
      "La detencion es una parada momentanea (por ejemplo para que baje un pasajero); el estacionamiento implica dejar el vehiculo inmovilizado por un periodo mayor.",
    reference: "Ley 18.290, art. 2 (definiciones)",
  },
  {
    id: 67,
    category: "normas",
    question: "Una pista demarcada como 'solo bus' o de uso exclusivo:",
    options: [
      "Puede ser usada por cualquier vehiculo",
      "Solo puede ser utilizada por los vehiculos autorizados (buses), salvo las excepciones senalizadas",
      "Es para estacionar",
      "Es para ciclistas",
    ],
    answer: 1,
    explanation:
      "Las pistas exclusivas (solo bus) estan reservadas a los vehiculos autorizados; circular por ellas indebidamente es una infraccion.",
    reference: "Ley 18.290 y ordenanzas locales",
  },
  {
    id: 68,
    category: "preferencia",
    question: "Al incorporarse desde una via secundaria a una via principal o de mayor flujo, usted debe:",
    options: [
      "Ingresar sin detenerse",
      "Ceder el paso a los vehiculos que circulan por la via principal",
      "Tocar la bocina y avanzar",
      "Tener siempre la preferencia",
    ],
    answer: 1,
    explanation:
      "Quien se incorpora desde una via secundaria debe ceder el paso a los vehiculos que ya circulan por la via principal.",
    reference: "Ley 18.290, art. 137 y senalizacion",
  },
  {
    id: 69,
    category: "seguridad",
    question: "A mayor velocidad, la distancia necesaria para detener el vehiculo:",
    options: [
      "Disminuye",
      "Aumenta de forma considerable",
      "Se mantiene igual",
      "No depende de la velocidad",
    ],
    answer: 1,
    explanation:
      "La distancia de frenado aumenta fuertemente con la velocidad (la energia crece con el cuadrado de la velocidad), por eso a mayor rapidez se necesita mucho mas espacio para detenerse.",
    reference: "Fisica de la conduccion (CONASET)",
  },
  {
    id: 70,
    category: "seguridad",
    question: "Si siente sueno o fatiga mientras conduce en carretera, lo correcto es:",
    options: [
      "Seguir conduciendo y tomar cafe sin detenerse",
      "Detenerse en un lugar seguro y descansar antes de continuar",
      "Aumentar la velocidad para llegar antes",
      "Abrir la ventana y continuar muchas horas",
    ],
    answer: 1,
    explanation:
      "La fatiga y la somnolencia reducen los reflejos y la atencion como el alcohol. Ante los primeros sintomas hay que detenerse en un lugar seguro y descansar.",
    reference: "Conduccion segura (CONASET)",
  },
  {
    id: 71,
    category: "alcohol",
    question: "Ademas del alcohol, conducir bajo el efecto de drogas o ciertos medicamentos:",
    options: [
      "No esta regulado",
      "Esta prohibido y sancionado, pues alteran la capacidad de conducir",
      "Esta permitido con receta",
      "Solo afecta de noche",
    ],
    answer: 1,
    explanation:
      "Esta prohibido conducir bajo la influencia de sustancias estupefacientes o psicotropicas, y se debe tener precaucion con medicamentos que provoquen somnolencia.",
    reference: "Ley 18.290, art. 110 y 115 A",
  },
  {
    id: 72,
    category: "senales",
    question: "Una senal preventiva con dos ninos caminando (figuras) advierte:",
    options: [
      "Prohibido el paso de ninos",
      "Proximidad de una escuela o zona de ninos: reduzca la velocidad y extreme precaucion",
      "Zona de juegos prohibida",
      "Fin de zona escolar",
    ],
    answer: 1,
    explanation:
      "Es una senal preventiva que advierte la cercania de una escuela o zona con presencia de ninos; se debe reducir la velocidad y conducir con maxima precaucion.",
    reference: "Manual de Senalizacion de Transito",
  },
  {
    id: 73,
    category: "normas",
    question: "Frente a un transporte escolar detenido mientras suben o bajan ninos, usted debe:",
    options: [
      "Adelantarlo a alta velocidad",
      "Disminuir la velocidad y extremar la precaucion, pues pueden cruzar ninos",
      "Tocar la bocina para que avance",
      "Ignorarlo si vas por otra pista",
    ],
    answer: 1,
    explanation:
      "Cerca de un transporte escolar detenido pueden aparecer ninos cruzando inesperadamente; hay que reducir la velocidad y conducir con maxima precaucion.",
    reference: "Conduccion segura (CONASET)",
  },
  {
    id: 74,
    category: "senales",
    question: "Un resalto o lomo de toro (badén) en la via tiene como objetivo:",
    options: [
      "Adornar la calle",
      "Obligar a reducir la velocidad en sectores de riesgo (cerca de colegios, pasos peatonales, etc.)",
      "Marcar el fin de la via",
      "Indicar estacionamiento",
    ],
    answer: 1,
    explanation:
      "Los resaltos reductores de velocidad obligan a aminorar la marcha en sectores sensibles; deben estar debidamente senalizados.",
    reference: "Manual de Senalizacion de Transito",
  },
  {
    id: 75,
    category: "normas",
    question: "Conducir en sentido contrario al transito establecido en una via:",
    options: [
      "Esta permitido si no viene nadie",
      "Esta prohibido y constituye una infraccion grave por el alto riesgo de colision frontal",
      "Esta permitido de noche",
      "Solo se sanciona en autopista",
    ],
    answer: 1,
    explanation:
      "Circular en contra del sentido del transito es una infraccion grave por el riesgo de colision frontal; siempre debe respetarse el sentido senalizado.",
    reference: "Ley 18.290, art. 119 y 200",
  },
  {
    id: 76,
    category: "seguridad",
    question: "El estado de los neumaticos (presion y dibujo/labrado) influye en:",
    options: [
      "Solo en el consumo de combustible",
      "La adherencia, la frenada y la estabilidad del vehiculo, afectando la seguridad",
      "Nada importante",
      "Solo en la comodidad",
    ],
    answer: 1,
    explanation:
      "Neumaticos en mal estado o con presion incorrecta reducen la adherencia y alargan la frenada, especialmente con pavimento mojado, aumentando el riesgo.",
    reference: "Seguridad activa (CONASET)",
  },
  {
    id: 77,
    category: "preferencia",
    question: "Cuando un peaton con discapacidad o un adulto mayor cruza lentamente la calzada, usted debe:",
    options: [
      "Apurarlo con la bocina",
      "Esperar con paciencia y cederle el paso hasta que termine de cruzar",
      "Avanzar rodeandolo",
      "Pasar primero si alcanzas",
    ],
    answer: 1,
    explanation:
      "Se debe dar preferencia y esperar a que las personas con movilidad reducida, adultos mayores o ninos terminen de cruzar con seguridad.",
    reference: "Ley 18.290, art. 168",
  },
  {
    id: 78,
    category: "normas",
    question: "Antes de retroceder (dar marcha atras) con el vehiculo, el conductor debe:",
    options: [
      "Hacerlo rapido sin mirar",
      "Asegurarse de que la maniobra no representa peligro, mirando hacia atras y verificando que no haya personas ni obstaculos",
      "Confiar solo en los sensores",
      "Tocar la bocina y avanzar",
    ],
    answer: 1,
    explanation:
      "La marcha atras solo se realiza cuando es segura: hay que verificar que no haya peatones (especialmente ninos), vehiculos ni obstaculos detras.",
    reference: "Ley 18.290, art. 139",
  },
  {
    id: 79,
    category: "velocidad",
    question:
      "Cuando la senalizacion indica una velocidad maxima menor que el limite general de la via, usted debe:",
    options: [
      "Mantener el limite general porque es ley",
      "Respetar la velocidad indicada por la senal, que prima sobre el limite general",
      "Promediar ambas velocidades",
      "Ignorar la senal si no hay fiscalizacion",
    ],
    answer: 1,
    explanation:
      "La senalizacion especifica de un tramo prima sobre el limite general: si una senal indica una velocidad menor, esa es la que se debe respetar.",
    reference: "Ley 18.290, art. 148",
  },
  {
    id: 80,
    category: "senales",
    question: "Ante la senal 'PARE', el conductor debe detenerse:",
    options: [
      "Solo si viene otro vehiculo",
      "Totalmente, siempre, antes de la linea de detencion, aunque no venga nadie",
      "Solo disminuir la velocidad",
      "Solo de noche",
    ],
    answer: 1,
    explanation:
      "La senal 'PARE' obliga a una detencion total antes de la linea de detencion en todos los casos, incluso si no se aproximan otros vehiculos.",
    reference: "Ley 18.290, art. 135",
  },
  {
    id: 81,
    category: "documentos",
    question: "El permiso de circulacion de un vehiculo es:",
    options: [
      "Un seguro contra accidentes",
      "Un pago anual obligatorio que autoriza al vehiculo a circular por las vias publicas",
      "La licencia del conductor",
      "El certificado de revision tecnica",
    ],
    answer: 1,
    explanation:
      "El permiso de circulacion es un tributo anual que habilita al vehiculo para transitar; es distinto de la revision tecnica, del SOAP y de la licencia de conducir.",
    reference: "Ley de Rentas Municipales / Ley 18.290",
  },
  {
    id: 82,
    category: "preferencia",
    question: "En un cruce ferroviario con barreras bajadas o luces encendidas, usted debe:",
    options: [
      "Rodear las barreras si no ve el tren",
      "Detenerse y esperar; nunca cruzar con las barreras bajas o las luces activas",
      "Cruzar rapido",
      "Tocar la bocina y pasar",
    ],
    answer: 1,
    explanation:
      "Jamas se debe cruzar un paso ferroviario con las barreras bajas o las senales activas; hay que detenerse y esperar a que se autorice el cruce.",
    reference: "Ley 18.290, art. 143",
  },
  {
    id: 83,
    category: "normas",
    question: "El uso de luces direccionales (intermitentes de viraje) sirve para:",
    options: [
      "Decorar el vehiculo",
      "Anunciar con anticipacion a los demas la intencion de virar o cambiar de pista",
      "Indicar que vas con apuro",
      "Reemplazar a los espejos",
    ],
    answer: 1,
    explanation:
      "Las luces direccionales comunican con anticipacion la intencion de virar o cambiar de pista, permitiendo que otros usuarios reaccionen a tiempo.",
    reference: "Ley 18.290, art. 124",
  },
  {
    id: 84,
    category: "seguridad",
    question: "Si debe bajar de su vehiculo detenido en la berma de una carretera de noche, conviene:",
    options: [
      "Vestir ropa oscura",
      "Usar elementos reflectantes o ropa clara y mantenerse alejado de la pista de circulacion",
      "Caminar por el centro de la pista",
      "Apagar todas las luces del auto",
    ],
    answer: 1,
    explanation:
      "Para ser visible y seguro, conviene usar elementos reflectantes o ropa clara, mantener las balizas encendidas y alejarse de la pista por la que circulan los vehiculos.",
    reference: "Conduccion segura (CONASET)",
  },
  {
    id: 85,
    category: "normas",
    question: "La berma (acotamiento) de una carretera esta destinada principalmente a:",
    options: [
      "Adelantar por la derecha",
      "Detenciones de emergencia, no para circular ni adelantar",
      "Estacionar libremente",
      "Circular cuando hay congestion",
    ],
    answer: 1,
    explanation:
      "La berma sirve para detenciones de emergencia. Circular o adelantar por ella esta prohibido y es muy peligroso.",
    reference: "Ley 18.290, art. 119 y 128",
  },
  {
    id: 86,
    category: "alcohol",
    question:
      "Segun la 'Ley Emilia', conducir en estado de ebriedad y causar lesiones graves, gravisimas o la muerte de una persona:",
    options: [
      "Solo implica una multa",
      "Constituye un delito que contempla pena de carcel efectiva",
      "No tiene consecuencias si se paga la indemnizacion",
      "Solo suspende la licencia por un mes",
    ],
    answer: 1,
    explanation:
      "La Ley Emilia establece carcel efectiva (minimo de un ano) para quien, conduciendo en estado de ebriedad, causa lesiones graves, gravisimas o la muerte; ademas sanciona la fuga y la negativa al examen.",
    reference: "Ley 20.770 (Ley Emilia)",
  },
  {
    id: 87,
    category: "preferencia",
    question: "Una ciclovia es:",
    options: [
      "Una pista mas para los automoviles en horario punta",
      "Una via de uso exclusivo para ciclistas; los vehiculos motorizados no deben circular ni estacionar en ella",
      "Una zona de estacionamiento",
      "Un paso peatonal",
    ],
    answer: 1,
    explanation:
      "La ciclovia es de uso exclusivo de las bicicletas; los vehiculos motorizados no pueden circular, detenerse ni estacionar sobre ella.",
    reference: "Ley 18.290 (Ley de Convivencia de Modos)",
  },
  {
    id: 88,
    category: "seguridad",
    question: "El uso del casco para conductores y acompanantes de motocicletas y bicicletas:",
    options: [
      "Es opcional para adultos",
      "Es obligatorio y debe estar correctamente abrochado",
      "Solo se exige en carretera",
      "Solo lo usa el conductor",
    ],
    answer: 1,
    explanation:
      "El casco es obligatorio y debe ir bien sujeto. En motocicletas es obligatorio para conductor y acompanante; reduce drasticamente el riesgo de lesiones graves en la cabeza.",
    reference: "Ley 18.290, art. 92 y normativa de motos",
  },
  {
    id: 89,
    category: "normas",
    question:
      "En las ciudades con restriccion vehicular por contaminacion, los vehiculos afectados:",
    options: [
      "Pueden circular igual pagando una tarifa",
      "No pueden circular en el horario y dia indicados segun el ultimo digito de su patente",
      "Solo se restringen los fines de semana",
      "La restriccion es voluntaria",
    ],
    answer: 1,
    explanation:
      "Durante la restriccion vehicular (o episodios de alerta/preemergencia/emergencia ambiental), los vehiculos cuyos digitos de patente esten restringidos no pueden circular en la zona y horario definidos.",
    reference: "Planes de descontaminacion (MMA / autoridad regional)",
  },
  {
    id: 90,
    category: "preferencia",
    question:
      "Cuando el semaforo peatonal esta en verde para los peatones, el conductor que vira debe:",
    options: [
      "Avanzar primero porque el vehiculo tiene prioridad",
      "Ceder el paso a los peatones que cruzan con su luz a favor",
      "Tocar la bocina",
      "Cruzar entre los peatones",
    ],
    answer: 1,
    explanation:
      "Aunque el conductor tenga luz para virar, debe ceder el paso a los peatones que cruzan con su senal a favor.",
    reference: "Ley 18.290, art. 104 y 168",
  },
  {
    id: 91,
    category: "seguridad",
    question:
      "El 'aquaplaning' (hidroplaneo) ocurre cuando:",
    options: [
      "El motor se sobrecalienta",
      "Una capa de agua se interpone entre los neumaticos y el pavimento y el vehiculo pierde adherencia",
      "Se empanan los vidrios",
      "Fallan los frenos por el frio",
    ],
    answer: 1,
    explanation:
      "El aquaplaning sucede cuando el agua impide el contacto del neumatico con el pavimento; para prevenirlo hay que reducir la velocidad con lluvia y mantener los neumaticos en buen estado.",
    reference: "Conduccion en lluvia (CONASET)",
  },
  {
    id: 92,
    category: "seguridad",
    question:
      "Ante un accidente, respecto de una persona lesionada que no corre peligro inmediato, lo recomendable es:",
    options: [
      "Moverla rapidamente para sacarla del auto",
      "No moverla innecesariamente y esperar a personal especializado, salvo riesgo de incendio u otro peligro",
      "Darle agua y levantarla",
      "Dejarla sola e irse",
    ],
    answer: 1,
    explanation:
      "Mover a un lesionado sin necesidad puede agravar lesiones (por ejemplo de columna). Salvo peligro inminente, se espera a personal especializado tras dar aviso de emergencia.",
    reference: "Primeros auxilios basicos (CONASET)",
  },
  {
    id: 93,
    category: "documentos",
    question: "Las infracciones de transito se clasifican en:",
    options: [
      "Unicas",
      "Leves, graves y gravisimas, segun su gravedad",
      "Solo graves",
      "Civiles y penales unicamente",
    ],
    answer: 1,
    explanation:
      "La Ley de Transito clasifica las infracciones en leves, graves y gravisimas; a mayor gravedad, mayores sanciones (multas, suspension o cancelacion de la licencia).",
    reference: "Ley 18.290, art. 200",
  },
  {
    id: 94,
    category: "senales",
    question:
      "Una senal reglamentaria circular con borde rojo que muestra dos autos (uno negro y uno rojo) lado a lado indica:",
    options: [
      "Pista doble",
      "Prohibido adelantar",
      "Estacionamiento para dos autos",
      "Zona de carga",
    ],
    answer: 1,
    explanation:
      "Esa senal reglamentaria indica 'No adelantar' en el tramo; debe respetarse hasta que una senal indique el termino de la prohibicion.",
    reference: "Manual de Senalizacion de Transito",
  },
  {
    id: 95,
    category: "normas",
    question:
      "Si al conducir se aproxima a un cruce de peatones y un peaton espera en la acera para cruzar, lo correcto es:",
    options: [
      "Acelerar para pasar antes",
      "Reducir la velocidad y permitir que el peaton cruce con seguridad",
      "Mantener la velocidad si tienes prioridad",
      "Tocar la bocina para que no cruce",
    ],
    answer: 1,
    explanation:
      "En la aproximacion a un paso peatonal se debe reducir la velocidad y dar al peaton la oportunidad de cruzar con seguridad.",
    reference: "Ley 18.290, art. 168",
  },
  {
    id: 96,
    category: "normas",
    question:
      "¿A que distancia minima de la senal que indica un paradero de locomocion colectiva esta prohibido estacionar?",
    options: ["5 metros", "10 metros", "20 metros", "50 metros"],
    answer: 2,
    explanation:
      "Esta prohibido estacionar a menos de 20 metros de la senal vertical que indica un paradero de transporte publico. Las municipalidades pueden aumentar esa distancia.",
    reference: "Ley 18.290, art. 160",
  },
  {
    id: 97,
    category: "normas",
    question: "En una autopista, la pista (o carril) de desaceleracion sirve para:",
    options: [
      "Adelantar a mayor velocidad",
      "Reducir la velocidad antes de tomar una salida, sin frenar bruscamente en la pista principal",
      "Estacionar momentaneamente",
      "Aumentar la velocidad para incorporarse",
    ],
    answer: 1,
    explanation:
      "La pista de desaceleracion permite disminuir la velocidad para tomar una salida sin frenar en la via principal. La de aceleracion, en cambio, sirve para incorporarse a la autopista.",
    reference: "Manual de Senalizacion de Transito / conduccion en autopista",
  },
  {
    id: 98,
    category: "normas",
    question:
      "Si la pista por la que circulas esta obstruida (un vehiculo detenido, una obra o un obstaculo), debes:",
    options: [
      "Tocar la bocina hasta que se libere",
      "Senalizar con anticipacion y cambiarte de pista solo cuando sea seguro, cediendo el paso a quienes ya circulan por ella",
      "Cambiarte de inmediato sin mirar los espejos",
      "Adelantar por la berma",
    ],
    answer: 1,
    explanation:
      "Ante una pista obstruida debes anunciar la maniobra con la senal direccional, revisar espejos y punto ciego, y cambiarte solo cuando sea seguro, dando preferencia a los vehiculos que ya circulan por la pista de destino.",
    reference: "Ley 18.290, art. 124 y 128",
  },
  {
    id: 99,
    category: "normas",
    question:
      "En una autopista de varias pistas, la pista de mas a la izquierda debe usarse principalmente para:",
    options: [
      "Circular siempre por ella",
      "Adelantar o realizar virajes a la izquierda, no para circular de forma permanente",
      "Los vehiculos mas lentos",
      "Estacionar en emergencias",
    ],
    answer: 1,
    explanation:
      "La pista izquierda se usa para adelantar; una vez hecho, se regresa a la pista derecha. Circular permanentemente por la izquierda entorpece el transito y puede ser sancionado.",
    reference: "Ley 18.290, art. 119 y 128",
  },
  {
    id: 100,
    category: "senales",
    question:
      "Si te encuentras en una pista demarcada como 'solo viraje' (por ejemplo, solo viraje a la derecha), debes:",
    options: [
      "Seguir derecho si lo prefieres",
      "Realizar obligatoriamente el viraje indicado por la demarcacion o senal",
      "Detenerte y esperar indicaciones",
      "Cambiarte de pista dentro de la interseccion",
    ],
    answer: 1,
    explanation:
      "Las pistas de 'solo viraje' obligan a girar en el sentido indicado por la flecha o senal; no se puede continuar de frente desde esa pista.",
    reference: "Manual de Senalizacion de Transito (demarcaciones y flechas)",
  },
  {
    id: 101,
    category: "senales",
    question: "Las senales de transito se clasifican principalmente en:",
    options: [
      "Grandes, medianas y pequenas",
      "Reglamentarias, preventivas (de advertencia) e informativas",
      "Urbanas y rurales",
      "Solo verticales y horizontales",
    ],
    answer: 1,
    explanation:
      "Se clasifican en reglamentarias (obligaciones y prohibiciones), preventivas o de advertencia (avisan un peligro) e informativas (servicios e indicaciones). Confundir el tipo de senal es uno de los errores mas comunes del examen.",
    reference: "Manual de Senalizacion de Transito",
  },
];

// Senales de transito asociadas a ciertas preguntas (se dibujan como imagen).
const QUESTION_IMAGES: Partial<Record<number, SignName>> = {
  13: "pare",
  14: "ceda",
  16: "linea-continua",
  17: "semaforo",
  26: "velocidad-max",
  29: "no-estacionar",
  36: "peatones",
  46: "no-entrar",
  72: "ninos",
  94: "no-adelantar",
};

// Preguntas clave / de alta frecuencia: los temas que casi siempre aparecen en el examen.
// Seleccion curada (no son estadisticas oficiales) de los contenidos mas esenciales.
const FREQUENT_IDS = new Set<number>([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 17, 18, 19, 21, 26, 28, 30, 39, 80,
]);

// Preguntas/temas que MAS SE FALLAN en el examen real, segun datos reportados por
// portales de practica (practicatest.cl), prensa (La Tercera) y CONASET. NO son
// estadisticas oficiales por pregunta de las municipalidades; el campo `failNote`
// indica el dato o la razon del error frecuente cuando se conoce.
const COMMONLY_FAILED: Partial<Record<number, string>> = {
  69: "El tema mas fallado: cerca del 79% responde mal lo relativo a la distancia de frenado. Recuerda que crece con el CUADRADO de la velocidad.",
  22: "La distancia de seguimiento segura es un tema con muchos errores: depende de la velocidad y del estado del camino.",
  96: "Cerca del 65% la falla: son 20 metros desde la senal del paradero (art. 160).",
  101: "CONASET la situa entre las 5 mas dificiles: muchos confunden reglamentarias, preventivas e informativas.",
  15: "Clasificar las senales (preventivas vs reglamentarias vs informativas) es un error muy comun.",
  27: "Clasificar las senales por su color/forma confunde a muchos postulantes.",
  11: "La preferencia en intersecciones sin semaforo ni Carabineros se responde mal con frecuencia.",
  32: "La preferencia en rotondas suele prestarse a confusion.",
  97: "Senalada por CONASET entre las mas dificiles: comportamiento en autovias/autopistas (pistas de desaceleracion).",
  98: "Senalada por CONASET entre las mas dificiles: como actuar ante una pista obstruida.",
  99: "Senalada por CONASET entre las mas dificiles: cuando usar la pista de mas a la izquierda en autopista.",
  100: "Senalada por CONASET entre las mas dificiles: comportamiento en pistas 'solo viraje'.",
};

// Aplica imagenes, marca de frecuente y de 'mas fallada' sobre las preguntas.
for (const q of QUESTIONS) {
  const img = QUESTION_IMAGES[q.id];
  if (img) q.image = img;
  if (FREQUENT_IDS.has(q.id)) q.frequent = true;
  const fn = COMMONLY_FAILED[q.id];
  if (fn) {
    q.commonlyFailed = true;
    q.failNote = fn;
  }
}

/** Preguntas marcadas como frecuentes / clave. */
export function frequentQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.frequent);
}

/** Preguntas que mas se fallan en el examen real (segun fuentes reportadas). */
export function commonlyFailedQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.commonlyFailed);
}

/**
 * Devuelve `count` preguntas aleatorias (mezcladas) usando una semilla simple.
 * Opcionalmente se puede acotar a un subconjunto de preguntas mediante `pool`.
 */
export function pickRandom(
  count: number,
  seed: number = Date.now(),
  pool: Question[] = QUESTIONS
): Question[] {
  const arr = [...pool];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}
