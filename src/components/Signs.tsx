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
  | "no-estacionar";

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
};

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

    default:
      return null;
  }
}
