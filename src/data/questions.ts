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
];

/** Devuelve `count` preguntas aleatorias (mezcladas) usando una semilla simple. */
export function pickRandom(count: number, seed = Date.now()): Question[] {
  const arr = [...QUESTIONS];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}
