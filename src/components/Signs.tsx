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
  | "animales";

export const SIGN_LABELS: Record<SignName, string> = {
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

    default:
      return null;
  }
}
