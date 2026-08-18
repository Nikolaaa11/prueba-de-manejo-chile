// Senales de transito dibujadas como SVG propios (no son imagenes con copyright).
// Son representaciones geometricas genericas de senales de uso comun, para acompanar
// las preguntas del test. Cada senal se identifica por una clave (`SignName`).

export type SignName =
  | "pare"
  | "ceda"
  | "velocidad-max"
  | "no-entrar"
  | "no-adelantar"
  | "semaforo"
  | "peatones"
  | "ninos"
  | "linea-continua"
  | "no-estacionar"
  | "curva"
  | "cruce-ferroviario"
  | "no-virar-izquierda"
  | "no-virar-u"
  | "baden"
  | "doble-sentido"
  | "altura-maxima"
  | "rotonda"
  | "animales"
  | "ancho-maximo"
  | "angostamiento-derecha"
  | "brazo-viraje-derecha"
  | "ciclistas"
  | "cruce-ciclistas"
  | "cruce-ferroviario-sin-barreras"
  | "curvas-sucesivas-izquierda"
  | "demarcacion-achurado"
  | "demarcacion-cruce-ciclistas"
  | "demarcacion-no-bloquear-cruce"
  | "demarcacion-paso-ciclistas"
  | "demarcacion-paso-peatones"
  | "direccion-obligada"
  | "doble-linea-continua"
  | "estacionamiento-permitido"
  | "flecha-pavimento-derecha"
  | "flecha-pavimento-viraje-izquierda"
  | "linea-detencion"
  | "linea-eje-mixta"
  | "luz-intermitentes-emergencia"
  | "mantenga-su-derecha"
  | "pavimento-resbaladizo"
  | "prohibido-estacionar-y-detenerse"
  | "proximidad-ceda-el-paso"
  | "proximidad-cruce"
  | "proximidad-pare"
  | "proximidad-semaforo"
  | "puente-angosto"
  | "resalto"
  | "semaforo-flecha-verde-arriba"
  | "semaforo-flecha-verde-derecha"
  | "senal-luminosa-aspa-roja"
  | "silencio"
  | "zona-escuela"
  | "zona-escuela-rombo";

export const SIGN_LABELS: Record<SignName, string> = {
  "ancho-maximo": "Senal reglamentaria de ancho maximo permitido",
  "angostamiento-derecha": "Senal de advertencia de angostamiento de la calzada por la derecha",
  "brazo-viraje-derecha": "Sena con el brazo izquierdo horizontal y el antebrazo doblado hacia arriba",
  "ciclistas": "Senal de advertencia de ciclistas en la via",
  "cruce-ciclistas": "Senal de advertencia de cruce de ciclistas de fondo amarillo verde fluorescente",
  "cruce-ferroviario-sin-barreras": "Senal de advertencia de cruce ferroviario sin barreras",
  "curvas-sucesivas-izquierda": "Senal de advertencia de curvas sucesivas, la primera a la izquierda",
  "demarcacion-achurado": "Demarcacion de calzada con zona achurada de lineas diagonales blancas",
  "demarcacion-cruce-ciclistas": "Demarcacion de calzada con dos lineas segmentadas de cuadrados blancos que la cruzan de borde a borde",
  "demarcacion-no-bloquear-cruce": "Demarcacion de calzada con reticulado amarillo sobre el area de la interseccion",
  "demarcacion-paso-ciclistas": "Demarcacion de calzada con dos hileras de cuadrados blancos y una bicicleta pintada entre ellas",
  "demarcacion-paso-peatones": "Demarcacion de paso de peatones tipo cebra con franjas blancas",
  "direccion-obligada": "Senal reglamentaria de fondo azul con flecha blanca que sube y gira a la derecha",
  "doble-linea-continua": "Demarcacion de doble linea continua amarilla en el eje de la calzada",
  "estacionamiento-permitido": "Senal informativa de estacionamiento permitido",
  "flecha-pavimento-derecha": "Demarcacion de flecha de viraje obligado a la derecha en el pavimento",
  "flecha-pavimento-viraje-izquierda": "Demarcacion de flecha de viraje a la izquierda en el pavimento",
  "linea-detencion": "Demarcacion de linea de detencion antes del cruce peatonal",
  "linea-eje-mixta": "Demarcacion de linea de eje mixta, segmentada en la pista A y continua en la pista B",
  "luz-intermitentes-emergencia": "Testigo del tablero de las luces intermitentes de emergencia",
  "mantenga-su-derecha": "Senal reglamentaria de mantenga su derecha",
  "pavimento-resbaladizo": "Senal de advertencia de pavimento resbaladizo",
  "prohibido-estacionar-y-detenerse": "Senal reglamentaria de prohibido estacionar y detenerse",
  "proximidad-ceda-el-paso": "Senal de advertencia de proximidad de Ceda el Paso",
  "proximidad-cruce": "Senal de advertencia de proximidad de cruce de caminos",
  "proximidad-pare": "Senal de advertencia de proximidad de senal Pare",
  "proximidad-semaforo": "Senal de advertencia de proximidad de semaforo",
  "puente-angosto": "Senal de advertencia de puente angosto",
  "resalto": "Senal de advertencia de resalto en la calzada",
  "semaforo-flecha-verde-arriba": "Semaforo vehicular con flecha verde encendida hacia arriba",
  "semaforo-flecha-verde-derecha": "Semaforo vehicular con flecha verde encendida hacia la derecha",
  "senal-luminosa-aspa-roja": "Senal luminosa de control de pista con aspa roja",
  "silencio": "Senal reglamentaria de prohibido el uso de la bocina",
  "zona-escuela": "Senal pentagonal de zona de escuela con dos escolares",
  "zona-escuela-rombo": "Senal de advertencia en rombo de zona de escuela con dos escolares",
  pare: "Senal PARE (octogono rojo)",
  ceda: "Senal Ceda el paso (triangulo invertido)",
  "velocidad-max": "Senal de velocidad maxima",
  "no-entrar": "Senal No entrar",
  "no-adelantar": "Senal No adelantar",
  semaforo: "Semaforo con luz amarilla",
  peatones: "Senal preventiva de peatones",
  ninos: "Senal preventiva de ninos / zona escolar",
  "linea-continua": "Linea de eje continua en la calzada",
  "no-estacionar": "Senal No estacionar",
  curva: "Senal preventiva de curva peligrosa",
  "cruce-ferroviario": "Senal de cruce ferroviario (Cruz de San Andres)",
  "no-virar-izquierda": "Senal No virar a la izquierda",
  "no-virar-u": "Senal No virar en U",
  baden: "Senal preventiva de resalto / baden",
  "doble-sentido": "Senal preventiva de doble sentido de transito",
  "altura-maxima": "Senal de altura maxima permitida",
  rotonda: "Senal preventiva de rotonda",
  animales: "Senal preventiva de animales en la via",
};

// Marco de senal preventiva (rombo amarillo con borde negro) reutilizable.
function Diamond() {
  return (
    <polygon
      points="60,8 112,60 60,112 8,60"
      fill="#ffcc00"
      stroke="#111"
      strokeWidth={6}
      strokeLinejoin="round"
    />
  );
}

// Marco de senal reglamentaria (circulo blanco con borde rojo) reutilizable.
function RedCircle() {
  return <circle cx="60" cy="60" r="52" fill="#fff" stroke="#d52b1e" strokeWidth={10} />;
}

// Figura simple de peaton (stick figure) reutilizable.
function Pedestrian({ x = 60, scale = 1 }: { x?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} 60) scale(${scale})`} stroke="#111" strokeWidth={4} fill="#111" strokeLinecap="round">
      <circle cx={0} cy={-26} r={6} stroke="none" />
      <line x1={0} y1={-18} x2={0} y2={2} />
      <line x1={0} y1={-12} x2={-10} y2={-2} />
      <line x1={0} y1={-12} x2={10} y2={-6} />
      <line x1={0} y1={2} x2={-9} y2={20} />
      <line x1={0} y1={2} x2={9} y2={20} />
    </g>
  );
}

export function Sign({
  name,
  className = "",
  size = 120,
}: {
  name: SignName;
  className?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 120 120",
    role: "img" as const,
    "aria-label": SIGN_LABELS[name],
    className,
  };

  switch (name) {
    case "pare":
      return (
        <svg {...common}>
          <polygon
            points="38,8 82,8 112,38 112,82 82,112 38,112 8,82 8,38"
            fill="#d52b1e"
            stroke="#fff"
            strokeWidth={5}
          />
          <text x="60" y="73" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">
            PARE
          </text>
        </svg>
      );

    case "ceda":
      return (
        <svg {...common}>
          <polygon points="60,108 8,16 112,16" fill="#fff" stroke="#d52b1e" strokeWidth={10} strokeLinejoin="round" />
        </svg>
      );

    case "velocidad-max":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill="#fff" stroke="#d52b1e" strokeWidth={10} />
          <text x="60" y="78" textAnchor="middle" fontSize="46" fontWeight="bold" fill="#111" fontFamily="Arial, sans-serif">
            60
          </text>
        </svg>
      );

    case "no-entrar":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill="#d52b1e" stroke="#b71c0f" strokeWidth={3} />
          <rect x="24" y="50" width="72" height="20" rx="3" fill="#fff" />
        </svg>
      );

    case "no-adelantar":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill="#fff" stroke="#d52b1e" strokeWidth={10} />
          {/* auto izquierdo (rojo) */}
          <rect x="30" y="46" width="26" height="28" rx="4" fill="#d52b1e" />
          {/* auto derecho (negro) */}
          <rect x="64" y="46" width="26" height="28" rx="4" fill="#111" />
        </svg>
      );

    case "semaforo":
      return (
        <svg {...common}>
          <rect x="42" y="10" width="36" height="100" rx="8" fill="#222" />
          <circle cx="60" cy="32" r="11" fill="#7a1410" />
          <circle cx="60" cy="60" r="11" fill="#ffcc00" />
          <circle cx="60" cy="88" r="11" fill="#14491f" />
        </svg>
      );

    case "peatones":
      return (
        <svg {...common}>
          <polygon points="60,8 112,60 60,112 8,60" fill="#ffcc00" stroke="#111" strokeWidth={6} strokeLinejoin="round" />
          <Pedestrian x={60} scale={1} />
        </svg>
      );

    case "ninos":
      return (
        <svg {...common}>
          <polygon points="60,8 112,60 60,112 8,60" fill="#ffcc00" stroke="#111" strokeWidth={6} strokeLinejoin="round" />
          <Pedestrian x={48} scale={0.8} />
          <Pedestrian x={74} scale={0.62} />
        </svg>
      );

    case "linea-continua":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="104" height="104" rx="8" fill="#555" />
          {/* lineas de borde segmentadas (blancas) */}
          <g stroke="#fff" strokeWidth={4} strokeDasharray="10 8">
            <line x1="26" y1="10" x2="26" y2="110" />
            <line x1="94" y1="10" x2="94" y2="110" />
          </g>
          {/* linea de eje continua (amarilla) */}
          <line x1="60" y1="8" x2="60" y2="112" stroke="#ffcc00" strokeWidth={6} />
        </svg>
      );

    case "no-estacionar":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill="#0033a0" stroke="#d52b1e" strokeWidth={10} />
          <text x="60" y="78" textAnchor="middle" fontSize="46" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">
            E
          </text>
          <line x1="24" y1="24" x2="96" y2="96" stroke="#d52b1e" strokeWidth={10} strokeLinecap="round" />
        </svg>
      );

    case "curva":
      return (
        <svg {...common}>
          <Diamond />
          <path
            d="M48 88 C 48 64, 74 62, 74 44"
            fill="none"
            stroke="#111"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <polygon points="74,34 66,48 82,48" fill="#111" />
        </svg>
      );

    case "cruce-ferroviario":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill="#fff" stroke="#ffcc00" strokeWidth={4} />
          <g stroke="#d52b1e" strokeWidth={11} strokeLinecap="round">
            <line x1="24" y1="24" x2="96" y2="96" />
            <line x1="96" y1="24" x2="24" y2="96" />
          </g>
        </svg>
      );

    case "no-virar-izquierda":
      return (
        <svg {...common}>
          <RedCircle />
          <g fill="none" stroke="#111" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M70 86 L70 58 L46 58" />
          </g>
          <polygon points="36,58 50,50 50,66" fill="#111" />
          <line x1="26" y1="26" x2="94" y2="94" stroke="#d52b1e" strokeWidth={10} strokeLinecap="round" />
        </svg>
      );

    case "no-virar-u":
      return (
        <svg {...common}>
          <RedCircle />
          <path
            d="M46 84 L46 58 C46 44 74 44 74 58 L74 72"
            fill="none"
            stroke="#111"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <polygon points="74,82 66,68 82,68" fill="#111" />
          <line x1="26" y1="26" x2="94" y2="94" stroke="#d52b1e" strokeWidth={10} strokeLinecap="round" />
        </svg>
      );

    case "baden":
      return (
        <svg {...common}>
          <Diamond />
          <line x1="26" y1="78" x2="94" y2="78" stroke="#111" strokeWidth={6} strokeLinecap="round" />
          <path d="M30 78 q 15 -26 30 0" fill="none" stroke="#111" strokeWidth={7} />
          <path d="M60 78 q 15 -26 30 0" fill="none" stroke="#111" strokeWidth={7} />
        </svg>
      );

    case "doble-sentido":
      return (
        <svg {...common}>
          <Diamond />
          <g stroke="#111" strokeWidth={7} strokeLinecap="round">
            <line x1="48" y1="40" x2="48" y2="80" />
            <line x1="72" y1="40" x2="72" y2="80" />
          </g>
          <polygon points="48,32 40,46 56,46" fill="#111" />
          <polygon points="72,88 64,74 80,74" fill="#111" />
        </svg>
      );

    case "altura-maxima":
      return (
        <svg {...common}>
          <RedCircle />
          <g stroke="#111" strokeWidth={7} strokeLinecap="round">
            <line x1="38" y1="42" x2="82" y2="42" />
            <line x1="38" y1="78" x2="82" y2="78" />
            <line x1="60" y1="42" x2="60" y2="78" />
          </g>
          <polygon points="60,40 52,54 68,54" fill="#111" />
          <polygon points="60,80 52,66 68,66" fill="#111" />
        </svg>
      );

    case "rotonda":
      return (
        <svg {...common}>
          <Diamond />
          <g fill="none" stroke="#111" strokeWidth={7}>
            <path d="M60 36 A 24 24 0 1 1 38 52" strokeLinecap="round" />
            <path d="M78 70 A 24 24 0 1 1 82 60" strokeLinecap="round" />
          </g>
          <polygon points="38,44 32,58 46,56" fill="#111" />
          <polygon points="82,52 86,66 72,62" fill="#111" />
        </svg>
      );

    case "animales":
      return (
        <svg {...common}>
          <Diamond />
          <g fill="#111">
            <ellipse cx="58" cy="58" rx="22" ry="12" />
            <rect x="40" y="62" width="5" height="18" rx="2" />
            <rect x="52" y="64" width="5" height="16" rx="2" />
            <rect x="64" y="64" width="5" height="16" rx="2" />
            <rect x="74" y="62" width="5" height="18" rx="2" />
            <path d="M78 52 q 14 -4 12 -16 q -10 2 -12 10 z" />
            <rect x="33" y="48" width="12" height="9" rx="3" />
          </g>
        </svg>
      );

    case "ancho-maximo":
      return (
        <svg {...common}>
      <RedCircle />
      <g stroke="#111" strokeWidth={7} strokeLinecap="round">
        <line x1={32} y1={34} x2={32} y2={70} />
        <line x1={88} y1={34} x2={88} y2={70} />
      </g>
      <line x1={46} y1={52} x2={74} y2={52} stroke="#111" strokeWidth={6} strokeLinecap="round" />
      <polygon points="34,52 48,45 48,59" fill="#111" />
      <polygon points="86,52 72,45 72,59" fill="#111" />
      <text x="60" y="92" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#111" fontFamily="Arial, sans-serif">2,5 m</text>
        </svg>
      );

    case "angostamiento-derecha":
      return (
        <svg {...common}>
      <Diamond />
      <g fill="none" stroke="#111" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M45 78 L45 40" />
        <path d="M79 78 L79 60 L63 50 L63 40" />
      </g>
        </svg>
      );

    case "brazo-viraje-derecha":
      return (
        <svg {...common}>
      <g stroke="#111" strokeWidth={3} strokeLinejoin="round">
        <polygon points="72,40 44,30 44,90 72,98" fill="#8f8f8f" />
        <polygon points="44,30 28,22 28,84 44,90" fill="#7a7a7a" />
        <rect x={72} y={40} width={38} height={58} rx={3} fill="#b3b3b3" />
      </g>
      <g fill="#3a3a3a" stroke="#111" strokeWidth={2}>
        <ellipse cx={35} cy={87} rx={7} ry={6} />
        <ellipse cx={57} cy={95} rx={8} ry={6} />
      </g>
      <rect x={70} y={94} width={40} height={7} rx={2} fill="#555" stroke="#111" strokeWidth={2} />
      <line x1={91} y1={42} x2={91} y2={96} stroke="#111" strokeWidth={2} />
      <g fill="#d52b1e" stroke="#111" strokeWidth={2}>
        <rect x={76} y={84} width={9} height={7} rx={2} />
        <rect x={97} y={84} width={9} height={7} rx={2} />
      </g>
      <polygon points="31,29 41,34 41,50 31,45" fill="#26343d" stroke="#111" strokeWidth={2} />
      <path d="M38 41 L18 41 L18 25" fill="none" stroke="#111" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 41 L18 41 L18 25" fill="none" stroke="#e8b58a" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={9} y={5} width={18} height={21} rx={6} fill="#e8b58a" stroke="#111" strokeWidth={3} />
      <g stroke="#111" strokeWidth={1.5} strokeLinecap="round">
        <line x1={14} y1={9} x2={14} y2={19} />
        <line x1={18} y1={9} x2={18} y2={19} />
        <line x1={22} y1={9} x2={22} y2={19} />
      </g>
        </svg>
      );

    case "ciclistas":
      return (
        <svg {...common}>
      <Diamond />
      <g fill="none" stroke="#111" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={42} cy={66} r={12} />
        <circle cx={78} cy={66} r={12} />
        <path d="M42 66 L60 66 L53 47 Z" />
        <path d="M53 47 L74 47 L60 66" />
        <path d="M74 47 L78 66" />
        <path d="M74 47 L74 41" />
        <line x1={67} y1={41} x2={83} y2={41} />
        <line x1={47} y1={44} x2={59} y2={44} />
      </g>
      <circle cx={60} cy={66} r={3.5} fill="#111" />
        </svg>
      );

    case "cruce-ciclistas":
      return (
        <svg {...common}>
      <polygon points="60,8 112,60 60,112 8,60" fill="#c8e600" />
      <polygon points="60,13 107,60 60,107 13,60" fill="none" stroke="#111" strokeWidth={4} strokeLinejoin="round" />
      <g fill="none" stroke="#111" strokeWidth={4} strokeLinecap="round">
        <circle cx={43} cy={66} r={10} />
        <circle cx={77} cy={66} r={10} />
      </g>
      <g stroke="#111" strokeWidth={2} strokeLinecap="round">
        <line x1={43} y1={56} x2={43} y2={76} />
        <line x1={33} y1={66} x2={53} y2={66} />
        <line x1={77} y1={56} x2={77} y2={76} />
        <line x1={67} y1={66} x2={87} y2={66} />
      </g>
      <g fill="none" stroke="#111" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M77 66 L60 66 L67 47 Z" />
        <path d="M67 47 L46 47 L60 66" />
        <path d="M46 47 L43 66" />
        <path d="M46 47 L46 43" />
        <line x1={39} y1={43} x2={55} y2={43} />
        <line x1={61} y1={44} x2={73} y2={44} />
      </g>
      <circle cx={60} cy={66} r={3.5} fill="#111" />
        </svg>
      );

    case "cruce-ferroviario-sin-barreras":
      return (
        <svg {...common}>
      <Diamond />
      <g fill="#111">
        <rect x={30} y={52} width={40} height={20} rx={5} />
        <rect x={64} y={38} width={18} height={34} rx={3} />
        <polygon points="35,41 46,41 44,54 37,54" />
        <rect x={52} y={46} width={8} height={7} rx={2} />
        <rect x={32} y={72} width={50} height={5} rx={2} />
        <circle cx={43} cy={79} r={6} />
        <circle cx={59} cy={79} r={6} />
        <circle cx={75} cy={79} r={6} />
      </g>
        </svg>
      );

    case "curvas-sucesivas-izquierda":
      return (
        <svg {...common}>
      <Diamond />
      <path d="M60 96 L60 86 C60 72 38 74 38 60 C38 46 60 48 60 36" fill="none" stroke="#111" strokeWidth={9} strokeLinecap="round" />
      <polygon points="60,18 47,40 73,40" fill="#111" />
        </svg>
      );

    case "demarcacion-achurado":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={4}>
        <line x1={14} y1={8} x2={14} y2={112} />
        <line x1={106} y1={8} x2={106} y2={112} />
      </g>
      <g stroke="#f5f5f5" strokeWidth={4} strokeLinecap="butt">
        <line x1={62} y1={16} x2={68.9} y2={22.9} />
        <line x1={51.9} y1={16.9} x2={70.7} y2={35.7} />
        <line x1={50.6} y1={26.6} x2={72.4} y2={48.4} />
        <line x1={49.2} y1={36.2} x2={74.2} y2={61.2} />
        <line x1={47.9} y1={45.9} x2={75.9} y2={73.9} />
        <line x1={46.6} y1={55.6} x2={77.6} y2={86.6} />
        <line x1={45.3} y1={65.3} x2={79.4} y2={99.4} />
        <line x1={44} y1={75} x2={73} y2={104} />
        <line x1={42.6} y1={84.6} x2={62} y2={104} />
        <line x1={41.3} y1={94.3} x2={51} y2={104} />
      </g>
      <polygon points="52,16 68,16 80,104 40,104" fill="none" stroke="#f5f5f5" strokeWidth={5} strokeLinejoin="round" />
        </svg>
      );

    case "demarcacion-cruce-ciclistas":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#4a4a4a" />
      <g fill="#f5f5f5">
        <rect x={40} y={8} width={11} height={11} />
        <rect x={40} y={30} width={11} height={11} />
        <rect x={40} y={52} width={11} height={11} />
        <rect x={40} y={74} width={11} height={11} />
        <rect x={40} y={96} width={11} height={11} />
        <rect x={69} y={8} width={11} height={11} />
        <rect x={69} y={30} width={11} height={11} />
        <rect x={69} y={52} width={11} height={11} />
        <rect x={69} y={74} width={11} height={11} />
        <rect x={69} y={96} width={11} height={11} />
      </g>
        </svg>
      );

    case "demarcacion-no-bloquear-cruce":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={4} strokeDasharray="8 7">
        <line x1={60} y1={8} x2={60} y2={24} />
        <line x1={60} y1={96} x2={60} y2={112} />
        <line x1={8} y1={60} x2={24} y2={60} />
        <line x1={96} y1={60} x2={112} y2={60} />
      </g>
      <g stroke="#ffcc00" strokeWidth={3}>
        <line x1={77} y1={26} x2={94} y2={43} />
        <line x1={60} y1={26} x2={94} y2={60} />
        <line x1={43} y1={26} x2={94} y2={77} />
        <line x1={26} y1={26} x2={94} y2={94} />
        <line x1={26} y1={43} x2={77} y2={94} />
        <line x1={26} y1={60} x2={60} y2={94} />
        <line x1={26} y1={77} x2={43} y2={94} />
        <line x1={43} y1={26} x2={26} y2={43} />
        <line x1={60} y1={26} x2={26} y2={60} />
        <line x1={77} y1={26} x2={26} y2={77} />
        <line x1={94} y1={26} x2={26} y2={94} />
        <line x1={94} y1={43} x2={43} y2={94} />
        <line x1={94} y1={60} x2={60} y2={94} />
        <line x1={94} y1={77} x2={77} y2={94} />
      </g>
      <rect x={26} y={26} width={68} height={68} fill="none" stroke="#ffcc00" strokeWidth={5} />
        </svg>
      );

    case "demarcacion-paso-ciclistas":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#4a4a4a" />
      <g stroke="#ffcc00" strokeWidth={5}>
        <line x1={60} y1={8} x2={60} y2={28} />
        <line x1={60} y1={92} x2={60} y2={112} />
      </g>
      <g fill="#f5f5f5">
        <rect x={8} y={32} width={11} height={11} />
        <rect x={30} y={32} width={11} height={11} />
        <rect x={52} y={32} width={11} height={11} />
        <rect x={74} y={32} width={11} height={11} />
        <rect x={96} y={32} width={11} height={11} />
        <rect x={8} y={77} width={11} height={11} />
        <rect x={30} y={77} width={11} height={11} />
        <rect x={52} y={77} width={11} height={11} />
        <rect x={74} y={77} width={11} height={11} />
        <rect x={96} y={77} width={11} height={11} />
      </g>
      <g fill="none" stroke="#f5f5f5" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={26} cy={64} r={9} />
        <circle cx={54} cy={64} r={9} />
        <path d="M26 64 L34 47 L40 64 Z" />
        <path d="M34 47 L50 46 L54 64" />
        <line x1={29} y1={45} x2={37} y2={45} />
        <line x1={46} y1={44} x2={55} y2={45} />
      </g>
        </svg>
      );

    case "demarcacion-paso-peatones":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#9a9a9a" />
      <rect x={26} y={8} width={68} height={104} fill="#4a4a4a" />
      <g fill="#f5f5f5">
        <rect x={27} y={34} width={6} height={52} />
        <rect x={39} y={34} width={6} height={52} />
        <rect x={51} y={34} width={6} height={52} />
        <rect x={63} y={34} width={6} height={52} />
        <rect x={75} y={34} width={6} height={52} />
        <rect x={87} y={34} width={6} height={52} />
      </g>
      <g stroke="#d0d0d0" strokeWidth={2}>
        <line x1={26} y1={8} x2={26} y2={112} />
        <line x1={94} y1={8} x2={94} y2={112} />
      </g>
        </svg>
      );

    case "direccion-obligada":
      return (
        <svg {...common}>
      <circle cx={60} cy={60} r={50} fill="#0071e3" stroke="#fff" strokeWidth={5} />
      <path d="M48 100 L48 54 L74 54" fill="none" stroke="#fff" strokeWidth={13} strokeLinejoin="miter" />
      <polygon points="96,54 72,39 72,69" fill="#fff" />
        </svg>
      );

    case "doble-linea-continua":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={6} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={4}>
        <line x1={16} y1={8} x2={16} y2={112} />
        <line x1={104} y1={8} x2={104} y2={112} />
      </g>
      <g stroke="#ffcc00" strokeWidth={5}>
        <line x1={55} y1={8} x2={55} y2={112} />
        <line x1={65} y1={8} x2={65} y2={112} />
      </g>
      <g stroke="#f5f5f5" strokeWidth={6}>
        <line x1={35} y1={30} x2={35} y2={68} />
        <line x1={85} y1={90} x2={85} y2={52} />
      </g>
      <polygon points="35,84 25,66 45,66" fill="#f5f5f5" />
      <polygon points="85,36 75,54 95,54" fill="#f5f5f5" />
        </svg>
      );

    case "estacionamiento-permitido":
      return (
        <svg {...common}>
      <rect x={8} y={8} width={104} height={104} rx={10} fill="#0057A6" />
      <rect x={17} y={17} width={86} height={86} rx={5} fill="none" stroke="#fff" strokeWidth={4} />
      <text x={60} y={93} textAnchor="middle" fontSize={92} fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">E</text>
        </svg>
      );

    case "flecha-pavimento-derecha":
      return (
        <svg {...common}>
      <rect x={6} y={6} width={108} height={108} rx={8} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={5}>
        <line x1={10} y1={10} x2={10} y2={110} />
        <line x1={110} y1={10} x2={110} y2={110} />
      </g>
      <path d="M58 110 L58 66 Q58 46 78 46 L84 46" fill="none" stroke="#f5f5f5" strokeWidth={14} />
      <polygon points="100,46 78,32 78,60" fill="#f5f5f5" />
        </svg>
      );

    case "flecha-pavimento-viraje-izquierda":
      return (
        <svg {...common}>
      <rect x={6} y={6} width={108} height={108} rx={8} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={5}>
        <line x1={10} y1={10} x2={10} y2={110} />
        <line x1={110} y1={10} x2={110} y2={110} />
      </g>
      <path d="M62 110 L62 66 Q62 46 42 46 L36 46" fill="none" stroke="#f5f5f5" strokeWidth={14} />
      <polygon points="20,46 42,32 42,60" fill="#f5f5f5" />
        </svg>
      );

    case "linea-detencion":
      return (
        <svg {...common}>
      <rect x={6} y={6} width={108} height={108} rx={8} fill="#4a4a4a" />
      <g fill="#f5f5f5">
        <rect x={18} y={16} width={9} height={34} />
        <rect x={33} y={16} width={9} height={34} />
        <rect x={48} y={16} width={9} height={34} />
        <rect x={63} y={16} width={9} height={34} />
        <rect x={78} y={16} width={9} height={34} />
        <rect x={93} y={16} width={9} height={34} />
      </g>
      <rect x={11} y={66} width={98} height={13} fill="#f5f5f5" />
      <g stroke="#f5f5f5" strokeWidth={5}>
        <line x1={13} y1={82} x2={13} y2={112} />
        <line x1={107} y1={82} x2={107} y2={112} />
      </g>
        </svg>
      );

    case "linea-eje-mixta":
      return (
        <svg {...common}>
      <rect x={6} y={6} width={108} height={108} rx={8} fill="#4a4a4a" />
      <g stroke="#f5f5f5" strokeWidth={4}>
        <line x1={13} y1={10} x2={13} y2={110} />
        <line x1={107} y1={10} x2={107} y2={110} />
      </g>
      <line x1={55} y1={8} x2={55} y2={112} stroke="#ffcc00" strokeWidth={4} strokeDasharray="12 9" />
      <line x1={65} y1={8} x2={65} y2={112} stroke="#ffcc00" strokeWidth={4} />
      <line x1={34} y1={80} x2={34} y2={46} stroke="#f5f5f5" strokeWidth={7} />
      <polygon points="34,28 25,48 43,48" fill="#f5f5f5" />
      <text x={34} y={106} textAnchor="middle" fontSize={22} fontWeight="bold" fill="#f5f5f5" fontFamily="Arial, sans-serif">A</text>
      <line x1={86} y1={40} x2={86} y2={74} stroke="#f5f5f5" strokeWidth={7} />
      <polygon points="86,92 77,72 95,72" fill="#f5f5f5" />
      <text x={86} y={30} textAnchor="middle" fontSize={22} fontWeight="bold" fill="#f5f5f5" fontFamily="Arial, sans-serif">B</text>
        </svg>
      );

    case "luz-intermitentes-emergencia":
      return (
        <svg {...common}>
      <rect x={6} y={6} width={108} height={108} rx={16} fill="#15171a" stroke="#3a3d42" strokeWidth={3} />
      <polygon points="60,25 100,94 20,94" fill="#15171a" stroke="#d52b1e" strokeWidth={11} strokeLinejoin="round" />
        </svg>
      );

    case "mantenga-su-derecha":
      return (
        <svg {...common}>
      <circle cx={60} cy={60} r={52} fill="#0071e3" />
      <path d="M51 97 L51 63 L73 41" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="88,26 82,50 64,32" fill="#fff" />
        </svg>
      );

    case "pavimento-resbaladizo":
      return (
        <svg {...common}>
      <Diamond />
      <g transform="translate(60 50) rotate(-12)">
        <rect x={-14} y={-20} width={28} height={40} rx={8} fill="#111" />
        <rect x={-9} y={-9} width={18} height={15} rx={4} fill="#ffcc00" />
        <rect x={-18} y={-15} width={6} height={10} rx={2} fill="#111" />
        <rect x={12} y={-15} width={6} height={10} rx={2} fill="#111" />
        <rect x={-18} y={5} width={6} height={10} rx={2} fill="#111" />
        <rect x={12} y={5} width={6} height={10} rx={2} fill="#111" />
        <g fill="none" stroke="#111" strokeWidth={5} strokeLinecap="round">
          <path d="M -12 20 q -6 4 0 8 q 6 4 0 8" />
          <path d="M 12 20 q -6 4 0 8 q 6 4 0 8" />
        </g>
      </g>
        </svg>
      );

    case "prohibido-estacionar-y-detenerse":
      return (
        <svg {...common}>
      <circle cx={60} cy={60} r={52} fill="#0033a0" stroke="#d52b1e" strokeWidth={10} />
      <g stroke="#d52b1e" strokeWidth={10} strokeLinecap="round">
        <line x1={30} y1={30} x2={90} y2={90} />
        <line x1={90} y1={30} x2={30} y2={90} />
      </g>
        </svg>
      );

    case "proximidad-ceda-el-paso":
      return (
        <svg {...common}>
      <Diamond />
      <polygon points="39,41 81,41 60,77" fill="#fff" stroke="#d52b1e" strokeWidth={8} strokeLinejoin="round" />
        </svg>
      );

    case "proximidad-cruce":
      return (
        <svg {...common}>
      <Diamond />
      <g fill="#111">
        <rect x={52} y={22} width={16} height={76} rx={2} />
        <rect x={22} y={52} width={76} height={16} rx={2} />
      </g>
        </svg>
      );

    case "proximidad-pare":
      return (
        <svg {...common}>
      <Diamond />
      <polygon points="49,32 71,32 86,47 86,69 71,84 49,84 34,69 34,47" fill="#d52b1e" stroke="#fff" strokeWidth={4} strokeLinejoin="round" />
      <text x={60} y={63} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff" fontFamily="Arial, sans-serif">PARE</text>
        </svg>
      );

    case "proximidad-semaforo":
      return (
        <svg {...common}>
      <Diamond />
      <rect x={56} y={84} width={8} height={16} rx={2} fill="#111" />
      <rect x={47} y={26} width={26} height={60} rx={7} fill="#111" />
      <g stroke="#111" strokeWidth={2}>
        <circle cx={60} cy={39} r={8} fill="#d52b1e" />
        <circle cx={60} cy={55} r={8} fill="#ffcc00" />
        <circle cx={60} cy={71} r={8} fill="#1e8e3e" />
      </g>
        </svg>
      );

    case "puente-angosto":
      return (
        <svg {...common}>
      <Diamond />
      <g fill="none" stroke="#111" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M38 80 L46 68 L46 52 L38 40" />
        <path d="M82 80 L74 68 L74 52 L82 40" />
      </g>
      <g fill="#111">
        <rect x={40} y={50} width={12} height={20} rx={2} />
        <rect x={68} y={50} width={12} height={20} rx={2} />
      </g>
        </svg>
      );

    case "resalto":
      return (
        <svg {...common}>
      <Diamond />
      <path d="M30 72 L42 72 C49 72 51 44 60 44 C69 44 71 72 78 72 L90 72" fill="none" stroke="#111" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 72 C49 72 51 44 60 44 C69 44 71 72 78 72 Z" fill="#111" />
        </svg>
      );

    case "semaforo-flecha-verde-arriba":
      return (
        <svg {...common}>
      <rect x={30} y={8} width={60} height={104} rx={10} fill="#1b1b1b" stroke="#444" strokeWidth={3} />
      <g fill="#000">
        <rect x={24} y={9} width={72} height={7} rx={3} />
        <rect x={24} y={39} width={72} height={7} rx={3} />
        <rect x={24} y={69} width={72} height={7} rx={3} />
      </g>
      <circle cx={60} cy={30} r={13} fill="#333" stroke="#000" strokeWidth={2} />
      <circle cx={60} cy={60} r={13} fill="#333" stroke="#000" strokeWidth={2} />
      <circle cx={60} cy={90} r={17} fill="none" stroke="#00a650" strokeWidth={3} opacity={0.35} />
      <circle cx={60} cy={90} r={13} fill="#0c0c0c" stroke="#000" strokeWidth={2} />
      <path d="M60 79 L69 89 L64 89 L64 101 L56 101 L56 89 L51 89 Z" fill="#00a650" />
        </svg>
      );

    case "semaforo-flecha-verde-derecha":
      return (
        <svg {...common}>
      <rect x={30} y={8} width={60} height={104} rx={10} fill="#1b1b1b" stroke="#444" strokeWidth={3} />
      <g fill="#000">
        <rect x={24} y={9} width={72} height={7} rx={3} />
        <rect x={24} y={39} width={72} height={7} rx={3} />
        <rect x={24} y={69} width={72} height={7} rx={3} />
      </g>
      <circle cx={60} cy={30} r={13} fill="#333" stroke="#000" strokeWidth={2} />
      <circle cx={60} cy={60} r={13} fill="#333" stroke="#000" strokeWidth={2} />
      <circle cx={60} cy={90} r={17} fill="none" stroke="#00a650" strokeWidth={3} opacity={0.35} />
      <circle cx={60} cy={90} r={13} fill="#0c0c0c" stroke="#000" strokeWidth={2} />
      <path d="M72 90 L61 100 L61 94 L49 94 L49 86 L61 86 L61 80 Z" fill="#00a650" />
        </svg>
      );

    case "senal-luminosa-aspa-roja":
      return (
        <svg {...common}>
      <rect x={22} y={6} width={76} height={7} rx={3} fill="#8a8a8a" />
      <rect x={54} y={12} width={12} height={12} fill="#6e6e6e" />
      <rect x={10} y={22} width={100} height={90} rx={8} fill="#0d0d0d" stroke="#555" strokeWidth={5} />
      <g stroke="#e4002b" strokeWidth={13} strokeLinecap="round">
        <line x1={26} y1={38} x2={94} y2={96} />
        <line x1={94} y1={38} x2={26} y2={96} />
      </g>
        </svg>
      );

    case "silencio":
      return (
        <svg {...common}>
      <RedCircle />
      <g fill="#111">
        <path d="M36 40 L36 80 L60 66 L60 54 Z" />
        <rect x={58} y={54} width={16} height={12} />
        <circle cx={82} cy={60} r={10} />
      </g>
      <g fill="none" stroke="#111" strokeWidth={5} strokeLinecap="round">
        <path d="M32 52 A 12 12 0 0 0 32 68" />
        <path d="M24 48 A 16 16 0 0 0 24 72" />
      </g>
      <line x1={26} y1={26} x2={94} y2={94} stroke="#d52b1e" strokeWidth={10} strokeLinecap="round" />
        </svg>
      );

    case "zona-escuela":
      return (
        <svg {...common}>
      <polygon points="60,8 110,46 110,112 10,112 10,46" fill="#c8e600" stroke="#111" strokeWidth={4} strokeLinejoin="round" />
      <polygon points="60,21 100,52 100,102 20,102 20,52" fill="none" stroke="#111" strokeWidth={4} strokeLinejoin="round" />
      <g transform="translate(-4 -2)" fill="#111" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(72 94)">
          <circle cx={-3} cy={-46} r={9} />
          <path d="M-8 -38 L7 -38 L9 -15 L-9 -15 Z" />
          <path d="M-9 -16 L-1 -16 L-8 4 L-16 4 Z" />
          <path d="M1 -16 L9 -16 L10 4 L2 4 Z" />
          <line x1={4} y1={-35} x2={10} y2={-17} strokeWidth={5} />
          <rect x={9} y={-32} width={13} height={16} rx={3} />
          <line x1={-1} y1={-39} x2={12} y2={-31} strokeWidth={3} />
        </g>
        <g transform="translate(44 94) scale(0.78)">
          <circle cx={-3} cy={-46} r={9} />
          <path d="M-8 -38 L7 -38 L9 -15 L-9 -15 Z" />
          <path d="M-9 -16 L-1 -16 L-8 4 L-16 4 Z" />
          <path d="M1 -16 L9 -16 L10 4 L2 4 Z" />
          <line x1={-5} y1={-35} x2={-13} y2={-19} strokeWidth={6} />
        </g>
        <line x1={66} y1={58} x2={55} y2={74} strokeWidth={5} />
        <line x1={49} y1={66} x2={55} y2={74} strokeWidth={4} />
        <circle cx={55} cy={75} r={3} stroke="none" />
      </g>
        </svg>
      );

    case "zona-escuela-rombo":
      return (
        <svg {...common}>
      <Diamond />
      <g transform="translate(60 60) scale(0.7) translate(-63 -68)">
        <g fill="#111" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(72 94)">
            <circle cx={-3} cy={-46} r={9} />
            <path d="M-8 -38 L7 -38 L9 -15 L-9 -15 Z" />
            <path d="M-9 -16 L-1 -16 L-8 4 L-16 4 Z" />
            <path d="M1 -16 L9 -16 L10 4 L2 4 Z" />
            <line x1={4} y1={-35} x2={10} y2={-17} strokeWidth={5} />
            <rect x={9} y={-32} width={13} height={16} rx={3} />
            <line x1={-1} y1={-39} x2={12} y2={-31} strokeWidth={3} />
          </g>
          <g transform="translate(44 94) scale(0.78)">
            <circle cx={-3} cy={-46} r={9} />
            <path d="M-8 -38 L7 -38 L9 -15 L-9 -15 Z" />
            <path d="M-9 -16 L-1 -16 L-8 4 L-16 4 Z" />
            <path d="M1 -16 L9 -16 L10 4 L2 4 Z" />
            <line x1={-5} y1={-35} x2={-13} y2={-19} strokeWidth={6} />
          </g>
          <line x1={66} y1={58} x2={55} y2={74} strokeWidth={5} />
          <line x1={49} y1={66} x2={55} y2={74} strokeWidth={4} />
          <circle cx={55} cy={75} r={3} stroke="none" />
        </g>
      </g>
        </svg>
      );


    default:
      return null;
  }
}

/** true si la clave corresponde a una senal que sabemos dibujar. */
export function isSignName(name: string): name is SignName {
  return Object.prototype.hasOwnProperty.call(SIGN_LABELS, name);
}
