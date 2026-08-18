"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  OFICIAL_CATEGORY_LABELS,
  CRITICAL_LABELS,
  isCorrect,
  isMulti,
  questionPoints,
  type CriticalTopic,
  type OficialCategory,
  type OficialQuestion,
} from "@/data/oficial-types";
import { Sign, isSignName } from "@/components/Signs";
import * as sfx from "@/lib/sfx";

/**
 * Motor del desafio, compartido por las pestanas que tienen banco de preguntas.
 *
 * Cada pestana define su banco y sus reglas; el flujo es el mismo: estudio con
 * correccion inmediata (verde/rojo mas explicacion), ruleta que sortea las preguntas
 * del test, anuncio con sonido y cuenta regresiva, reloj y resultado con revision.
 */
export interface QuizConfig {
  /** Titulo de la portada. */
  titulo: ReactNode;
  /** Bajada de la portada. */
  descripcion: ReactNode;
  /** Nota al pie de la portada sobre el origen del banco. */
  aviso?: ReactNode;
  banco: OficialQuestion[];
  /** Cuantas preguntas saca la ruleta. */
  ruletaPicks: number;
  /** Duracion del test real, en segundos. */
  segundos: number;
  /** Maximo de respuestas incorrectas con el que todavia se aprueba. */
  maxErrores: number;
  /** Clave de localStorage: distinta por pestana para no mezclar progresos. */
  storageKey: string;
}

const QuizCtx = createContext<QuizConfig | null>(null);

function useQuiz(): QuizConfig {
  const cfg = useContext(QuizCtx);
  if (!cfg) throw new Error("QuizDesafio: falta la configuracion del desafio");
  return cfg;
}

/** Minutos del reloj, para los textos de la portada. */
const minutos = (segundos: number) => Math.round(segundos / 60);

type Fase = "inicio" | "estudio" | "ruleta" | "anuncio" | "test" | "resultado";

/** Respuestas del modo estudio: numero de pregunta -> letras marcadas. */
type Marcadas = Record<number, string[]>;

interface Guardado {
  estudio: Marcadas;
  desafiosTotales: number;
  desafiosAprobados: number;
  mejorPuntaje: number;
}

const VACIO: Guardado = {
  estudio: {},
  desafiosTotales: 0,
  desafiosAprobados: 0,
  mejorPuntaje: 0,
};

function cargar(storageKey: string): Guardado {
  if (typeof window === "undefined") return VACIO;
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? { ...VACIO, ...JSON.parse(raw) } : VACIO;
  } catch {
    return VACIO;
  }
}

function guardar(storageKey: string, g: Guardado) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(g));
  } catch {
    /* ignore */
  }
}

function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function barajar<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Saca `cfg.ruletaPicks` preguntas al azar, asegurando que aparezca al menos una de cada
 * tema critico para que el desafio siempre tenga preguntas de doble puntaje.
 */
function sortearPreguntas(cfg: QuizConfig): OficialQuestion[] {
  const pool = barajar(cfg.banco);
  const elegidas: OficialQuestion[] = [];
  const usadas = new Set<number>();

  (["alcohol", "velocidad", "retencion"] as CriticalTopic[]).forEach((tema) => {
    const q = pool.find((x) => x.critical === tema && !usadas.has(x.n));
    if (q) {
      elegidas.push(q);
      usadas.add(q.n);
    }
  });

  for (const q of pool) {
    if (elegidas.length >= cfg.ruletaPicks) break;
    if (usadas.has(q.n)) continue;
    elegidas.push(q);
    usadas.add(q.n);
  }
  return elegidas.sort((a, b) => a.n - b.n);
}

export default function QuizDesafio({ config }: { config: QuizConfig }) {
  return (
    <QuizCtx.Provider value={config}>
      <Desafio />
    </QuizCtx.Provider>
  );
}

function Desafio() {
  const cfg = useQuiz();
  const [fase, setFase] = useState<Fase>("inicio");
  const [datos, setDatos] = useState<Guardado>(VACIO);
  const [listo, setListo] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    setDatos(cargar(cfg.storageKey));
    setMute(sfx.loadMuted());
    setListo(true);
  }, [cfg.storageKey]);

  const persistir = useCallback(
    (next: Guardado) => {
      setDatos(next);
      guardar(cfg.storageKey, next);
    },
    [cfg.storageKey]
  );

  const alternarSonido = () => {
    const next = !mute;
    setMute(next);
    sfx.setMuted(next);
  };

  const respondidas = Object.keys(datos.estudio).length;
  const total = cfg.banco.length;
  const completo = respondidas >= total;

  // ---- estado del desafio ----
  const [sorteadas, setSorteadas] = useState<OficialQuestion[]>([]);
  const [respuestasTest, setRespuestasTest] = useState<Marcadas>({});
  const [restante, setRestante] = useState(cfg.segundos);

  const iniciarRuleta = () => {
    setSorteadas([]);
    setRespuestasTest({});
    setRestante(cfg.segundos);
    setFase("ruleta");
  };

  const alTerminarRuleta = (qs: OficialQuestion[]) => {
    setSorteadas(qs);
    setFase("anuncio");
  };

  const alTerminarAnuncio = () => setFase("test");

  const alTerminarTest = useCallback(
    (respuestas: Marcadas) => {
      setRespuestasTest(respuestas);
      const errores = sorteadas.filter((q) => !isCorrect(q, respuestas[q.n] ?? [])).length;
      const puntaje = sorteadas.reduce(
        (acc, q) => acc + (isCorrect(q, respuestas[q.n] ?? []) ? questionPoints(q) : 0),
        0
      );
      const aprobado = errores <= cfg.maxErrores;
      persistir({
        ...datos,
        desafiosTotales: datos.desafiosTotales + 1,
        desafiosAprobados: datos.desafiosAprobados + (aprobado ? 1 : 0),
        mejorPuntaje: Math.max(datos.mejorPuntaje, puntaje),
      });
      setFase("resultado");
    },
    [sorteadas, datos, persistir, cfg.maxErrores]
  );

  if (!listo) {
    return (
      <div className="card p-8 text-center text-neutral-500">Cargando el desafío…</div>
    );
  }

  return (
    <div className="space-y-6">
      <BotonSonido mute={mute} onToggle={alternarSonido} />

      {fase === "inicio" && (
        <Inicio
          datos={datos}
          respondidas={respondidas}
          total={total}
          completo={completo}
          onEstudiar={() => setFase("estudio")}
          onRuleta={iniciarRuleta}
        />
      )}

      {fase === "estudio" && (
        <Estudio
          marcadas={datos.estudio}
          onMarcar={(n, letras) =>
            persistir({ ...datos, estudio: { ...datos.estudio, [n]: letras } })
          }
          onReiniciar={() => persistir({ ...datos, estudio: {} })}
          onVolver={() => setFase("inicio")}
          onRuleta={iniciarRuleta}
        />
      )}

      {fase === "ruleta" && <Ruleta onListo={alTerminarRuleta} />}

      {fase === "anuncio" && <Anuncio cantidad={sorteadas.length} onListo={alTerminarAnuncio} />}

      {fase === "test" && (
        <Test
          preguntas={sorteadas}
          restante={restante}
          setRestante={setRestante}
          onTerminar={alTerminarTest}
        />
      )}

      {fase === "resultado" && (
        <Resultado
          preguntas={sorteadas}
          respuestas={respuestasTest}
          tiempoUsado={cfg.segundos - restante}
          onReintentar={iniciarRuleta}
          onInicio={() => setFase("inicio")}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sonido                                                              */
/* ------------------------------------------------------------------ */

function BotonSonido({ mute, onToggle }: { mute: boolean; onToggle: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onToggle}
        className="chip transition hover:bg-black/[0.06]"
        aria-pressed={mute}
        title={mute ? "Activar sonido" : "Silenciar"}
      >
        {mute ? "🔇 Sonido apagado" : "🔊 Sonido activo"}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pantalla inicial                                                    */
/* ------------------------------------------------------------------ */

function Inicio({
  datos,
  respondidas,
  total,
  completo,
  onEstudiar,
  onRuleta,
}: {
  datos: Guardado;
  respondidas: number;
  total: number;
  completo: boolean;
  onEstudiar: () => void;
  onRuleta: () => void;
}) {
  const cfg = useQuiz();
  const dobles = cfg.banco.filter((q) => q.critical).length;
  const pct = Math.round((respondidas / total) * 100);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{cfg.titulo}</h1>
        <p className="mt-2 max-w-3xl text-neutral-600">{cfg.descripcion}</p>
        {cfg.aviso && (
          <p className="mt-2 max-w-3xl text-xs text-neutral-400">{cfg.aviso}</p>
        )}
      </header>

      <div className="card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Paso 1 · Estudia el banco completo</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Cada respuesta se corrige al instante: verde si acertaste, rojo si no, y una
              explicación de por qué la verde es la correcta.
            </p>
          </div>
          <span className="chip-cyan">
            {respondidas} / {total}
          </span>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-neon-violet transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button type="button" onClick={onEstudiar} className="btn-primary mt-5">
          {respondidas === 0 ? "Empezar a estudiar" : "Seguir estudiando"}
        </button>
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Paso 2 · La ruleta y el test real</h2>
            <p className="mt-1 text-sm text-neutral-500">
              La ruleta gira con las {total} preguntas y saca {cfg.ruletaPicks}. Tienes{" "}
              <strong>{minutos(cfg.segundos)} minutos</strong> y apruebas con un máximo de{" "}
              <strong>{cfg.maxErrores} respuestas incorrectas</strong>.
            </p>
          </div>
        </div>

        <ul className="mt-4 grid gap-2 text-sm text-neutral-600 sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <span>⏱️</span> {minutos(cfg.segundos)} minutos corridos para las {cfg.ruletaPicks} preguntas.
          </li>
          <li className="flex items-start gap-2">
            <span>❌</span> Máximo {cfg.maxErrores} malas para aprobar.
          </li>
          <li className="flex items-start gap-2">
            <span>✖️2</span> Alcohol, velocidad y retención infantil valen doble punto (
            {dobles} preguntas del banco).
          </li>
          <li className="flex items-start gap-2">
            <span>🎯</span> Sin corrección hasta el final, como en el examen real.
          </li>
        </ul>

        <div className="mt-5 space-y-2">
          <button type="button" onClick={onRuleta} className="btn-primary">
            🎰 Girar la ruleta
          </button>
          {!completo && (
            <p className="text-xs text-neutral-500">
              Puedes rendirlo cuando quieras. Llevas {respondidas} de {total}{" "}
              estudiadas.
            </p>
          )}
        </div>
      </div>

      {datos.desafiosTotales > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <Caja label="Desafíos" value={String(datos.desafiosTotales)} />
          <Caja label="Aprobados" value={String(datos.desafiosAprobados)} destacado />
          <Caja label="Mejor puntaje" value={String(datos.mejorPuntaje)} />
        </div>
      )}
    </div>
  );
}

function Caja({
  label,
  value,
  destacado,
}: {
  label: string;
  value: string;
  destacado?: boolean;
}) {
  return (
    <div className="card p-4 text-center">
      <div className={`text-2xl font-bold ${destacado ? "gradient-text" : "text-ink"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modo estudio: corrige al instante y explica                         */
/* ------------------------------------------------------------------ */

function Estudio({
  marcadas,
  onMarcar,
  onReiniciar,
  onVolver,
  onRuleta,
}: {
  marcadas: Marcadas;
  onMarcar: (n: number, letras: string[]) => void;
  onReiniciar: () => void;
  onVolver: () => void;
  onRuleta: () => void;
}) {
  const cfg = useQuiz();
  const [filtro, setFiltro] = useState<OficialCategory | "all" | "pendientes">("all");
  const [idx, setIdx] = useState(0);
  const [seleccion, setSeleccion] = useState<string[]>([]);

  const lista = useMemo(() => {
    if (filtro === "all") return cfg.banco;
    if (filtro === "pendientes")
      return cfg.banco.filter((q) => !marcadas[q.n]);
    return cfg.banco.filter((q) => q.category === filtro);
    // `marcadas` a proposito solo se usa para "pendientes": al responder no queremos
    // que la lista se reordene bajo los pies del usuario.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  const q: OficialQuestion | undefined = lista[Math.min(idx, lista.length - 1)];

  useEffect(() => {
    setIdx(0);
  }, [filtro]);

  useEffect(() => {
    setSeleccion([]);
  }, [q?.n]);

  const respondida = q ? marcadas[q.n] : undefined;
  const revelada = Boolean(respondida);
  const multi = q ? isMulti(q) : false;

  const respondidas = Object.keys(marcadas).length;
  const aciertos = useMemo(
    () =>
      cfg.banco.filter((x) => marcadas[x.n] && isCorrect(x, marcadas[x.n])).length,
    [marcadas, cfg.banco]
  );

  const elegir = (letra: string) => {
    if (!q || revelada) return;
    if (!multi) {
      onMarcar(q.n, [letra]);
      if (isCorrect(q, [letra])) sfx.playCorrect();
      else sfx.playWrong();
      return;
    }
    setSeleccion((prev) =>
      prev.includes(letra) ? prev.filter((l) => l !== letra) : [...prev, letra]
    );
  };

  const comprobar = () => {
    if (!q || revelada) return;
    onMarcar(q.n, seleccion);
    if (isCorrect(q, seleccion)) sfx.playCorrect();
    else sfx.playWrong();
  };

  const avanzar = (delta: number) =>
    setIdx((i) => Math.max(0, Math.min(lista.length - 1, i + delta)));

  if (!q) {
    return (
      <div className="card p-8 text-center">
        <p className="text-neutral-600">No quedan preguntas con este filtro.</p>
        <button type="button" onClick={() => setFiltro("all")} className="btn-ghost mt-4">
          Ver todas
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onVolver} className="chip">
          ← Volver
        </button>
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <span className="chip-cyan">
            {respondidas} / {cfg.banco.length} respondidas
          </span>
          <span className="chip">
            {respondidas ? Math.round((aciertos / respondidas) * 100) : 0}% de aciertos
          </span>
          <button type="button" onClick={onRuleta} className="btn-primary !px-4 !py-1.5 !text-xs">
            🎰 A la ruleta
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Filtro activo={filtro === "all"} onClick={() => setFiltro("all")}>
          Todas ({cfg.banco.length})
        </Filtro>
        <Filtro activo={filtro === "pendientes"} onClick={() => setFiltro("pendientes")}>
          Pendientes ({cfg.banco.length - respondidas})
        </Filtro>
        {(Object.keys(OFICIAL_CATEGORY_LABELS) as OficialCategory[]).map((c) => {
          const n = cfg.banco.filter((x) => x.category === c).length;
          if (!n) return null;
          return (
            <Filtro key={c} activo={filtro === c} onClick={() => setFiltro(c)}>
              {OFICIAL_CATEGORY_LABELS[c]} ({n})
            </Filtro>
          );
        })}
      </div>

      <TarjetaPregunta
        q={q}
        posicion={`${idx + 1} de ${lista.length}`}
        seleccion={revelada ? respondida ?? [] : seleccion}
        revelada={revelada}
        onElegir={elegir}
      />

      {multi && !revelada && (
        <button
          type="button"
          onClick={comprobar}
          disabled={seleccion.length === 0}
          className="btn-primary"
        >
          Comprobar {seleccion.length > 0 && `(${seleccion.length} marcada${seleccion.length > 1 ? "s" : ""})`}
        </button>
      )}

      {revelada && respondida && <Explicacion q={q} elegidas={respondida} />}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => avanzar(-1)}
          disabled={idx === 0}
          className="btn-ghost disabled:opacity-40"
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={() => avanzar(1)}
          disabled={idx >= lista.length - 1}
          className="btn-primary disabled:opacity-40"
        >
          Siguiente →
        </button>
      </div>

      <Navegador
        lista={lista}
        actual={idx}
        marcadas={marcadas}
        onIr={(i) => setIdx(i)}
      />

      <div className="pt-2 text-right">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("¿Borrar todas tus respuestas de estudio?")) onReiniciar();
          }}
          className="text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-600"
        >
          Reiniciar mi progreso de estudio
        </button>
      </div>
    </div>
  );
}

function Filtro({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        activo
          ? "bg-brand text-white"
          : "border border-black/[0.06] bg-black/[0.04] text-neutral-600 hover:bg-black/[0.07]"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Tarjeta de pregunta (compartida por estudio y test)                 */
/* ------------------------------------------------------------------ */

function TarjetaPregunta({
  q,
  posicion,
  seleccion,
  revelada,
  onElegir,
}: {
  q: OficialQuestion;
  posicion: string;
  seleccion: string[];
  revelada: boolean;
  onElegir: (letra: string) => void;
}) {
  const multi = isMulti(q);
  // Solo se pintan las claves que el catalogo sabe dibujar; el resto se ignora.
  const senales = (q.images ?? []).filter(isSignName);

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="chip">Pregunta {q.n}</span>
        <span className="chip">{OFICIAL_CATEGORY_LABELS[q.category]}</span>
        {q.critical && (
          <span className="rounded-full bg-neon-violet/10 px-3 py-1 font-semibold text-neon-violet">
            ✖️2 {CRITICAL_LABELS[q.critical]}
          </span>
        )}
        <span className="ml-auto text-neutral-400">{posicion}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold leading-snug text-ink">{q.question}</h2>

      {senales.length > 0 && (
        <div className="mt-4 flex flex-wrap items-end gap-4">
          {senales.map((name, i) => (
            <div key={`${name}-${i}`} className="text-center">
              <div className="sign-plate">
                <Sign name={name} size={104} />
              </div>
              {senales.length > 1 && (
                <div className="mt-1 text-xs font-semibold text-neutral-500">{i + 1}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {senales.length === 0 && q.imageDependent && q.imageDescription && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <strong className="font-semibold">🖼️ Imagen descrita: </strong>
          {q.imageDescription}
        </div>
      )}

      {q.adaptada && (
        <p className="mt-3 text-xs text-neutral-400">
          En el documento original esta pregunta se respondía mirando una lámina de
          dibujos que el PDF no incluye. Se reescribió en texto conservando el tema y la
          respuesta oficial.
        </p>
      )}

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-neutral-400">
        {q.marca}
        {multi && ` · marca ${q.correct.length}`}
      </p>

      <div className="mt-3 space-y-2">
        {q.options.map((op) => {
          const elegida = seleccion.includes(op.letter);
          const esCorrecta = q.correct.includes(op.letter);

          let clases =
            "border-black/[0.08] bg-white hover:border-brand/40 hover:bg-brand/[0.03]";
          if (revelada) {
            if (esCorrecta)
              clases = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium";
            else if (elegida) clases = "border-rose-500 bg-rose-50 text-rose-900";
            else clases = "border-black/[0.06] bg-white text-neutral-400";
          } else if (elegida) {
            clases = "border-brand bg-brand/[0.06] text-ink";
          }

          return (
            <button
              key={op.letter}
              type="button"
              onClick={() => onElegir(op.letter)}
              disabled={revelada}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${clases} ${
                revelada ? "cursor-default" : ""
              }`}
            >
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                  revelada && esCorrecta
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : revelada && elegida
                      ? "border-rose-500 bg-rose-500 text-white"
                      : elegida
                        ? "border-brand bg-brand text-white"
                        : "border-black/15 text-neutral-500"
                }`}
              >
                {op.letter}
              </span>
              <span className="flex-1">{op.text}</span>
              {revelada && esCorrecta && <span className="text-emerald-600">✓</span>}
              {revelada && !esCorrecta && elegida && <span className="text-rose-600">✕</span>}
            </button>
          );
        })}
      </div>

      {q.options.length === 0 && (
        <p className="mt-3 rounded-xl bg-neutral-100 p-3 text-sm text-neutral-500">
          Esta pregunta del cuestionario original se responde sobre dibujos que no vienen
          en el texto del documento.
        </p>
      )}
    </div>
  );
}

function Explicacion({ q, elegidas }: { q: OficialQuestion; elegidas: string[] }) {
  const acerto = isCorrect(q, elegidas);
  const correctas = q.correct
    .map((l) => `${l}) ${q.options.find((o) => o.letter === l)?.text ?? ""}`)
    .join("  ·  ");

  return (
    <div
      className={`rounded-2xl border p-5 animate-fadeUp ${
        acerto ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
      }`}
    >
      <p
        className={`text-sm font-bold ${acerto ? "text-emerald-700" : "text-rose-700"}`}
      >
        {acerto ? "✅ ¡Correcto!" : "❌ Incorrecto"}
      </p>
      <p className="mt-2 text-sm font-medium text-ink">
        Respuesta correcta: {correctas}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
        <strong className="font-semibold">Por qué: </strong>
        {q.explanation}
      </p>
      {q.legalNote && (
        <p className="mt-3 rounded-xl border border-sky-300 bg-sky-50 p-3 text-sm leading-relaxed text-sky-900">
          <strong className="font-semibold">🔄 Actualizado a la norma vigente: </strong>
          {q.legalNote}
        </p>
      )}
      {q.fuente && (
        <p className="mt-3 text-xs text-neutral-500">Fuente: {q.fuente}</p>
      )}
    </div>
  );
}

function Navegador({
  lista,
  actual,
  marcadas,
  onIr,
}: {
  lista: OficialQuestion[];
  actual: number;
  marcadas: Marcadas;
  onIr: (i: number) => void;
}) {
  return (
    <div className="card p-4">
      <p className="mb-2 text-xs font-medium text-neutral-500">Ir a una pregunta</p>
      <div className="flex flex-wrap gap-1">
        {lista.map((q, i) => {
          const r = marcadas[q.n];
          let color = "bg-neutral-100 text-neutral-500 hover:bg-neutral-200";
          if (r) {
            color = isCorrect(q, r)
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white";
          }
          return (
            <button
              key={q.n}
              type="button"
              onClick={() => onIr(i)}
              className={`h-7 w-7 rounded-md text-[10px] font-semibold transition ${color} ${
                i === actual ? "ring-2 ring-brand ring-offset-1" : ""
              }`}
              title={`Pregunta ${q.n}`}
            >
              {q.n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ruleta                                                              */
/* ------------------------------------------------------------------ */

function Ruleta({ onListo }: { onListo: (qs: OficialQuestion[]) => void }) {
  const cfg = useQuiz();
  const [girando, setGirando] = useState(false);
  const [numero, setNumero] = useState(1);
  const [angulo, setAngulo] = useState(0);
  const [elegidas, setElegidas] = useState<OficialQuestion[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Se copia la referencia dentro del efecto: en la limpieza `timers.current` ya
    // podria apuntar a otra cosa.
    const pendientes = timers.current;
    return () => pendientes.forEach(clearTimeout);
  }, []);

  const girar = () => {
    if (girando) return;
    setGirando(true);
    setElegidas([]);
    setAngulo((a) => a + 1440 + Math.floor(Math.random() * 360));

    let paso = 0;
    const total = cfg.banco.length;
    // El intervalo va creciendo para simular la ruleta que frena.
    const cicla = (retraso: number) => {
      const t = setTimeout(() => {
        paso += 1;
        setNumero(1 + Math.floor(Math.random() * total));
        sfx.playTick(paso);
        if (retraso < 130) cicla(retraso * 1.11);
        else {
          const qs = sortearPreguntas(cfg);
          setElegidas(qs);
          const t2 = setTimeout(() => onListo(qs), 900 + qs.length * 25);
          timers.current.push(t2);
        }
      }, retraso);
      timers.current.push(t);
    };
    cicla(30);
  };

  return (
    <div className="card p-8 text-center">
      <h1 className="text-2xl font-bold">
        🎰 La ruleta de las {cfg.banco.length} preguntas
      </h1>
      <p className="mt-2 text-neutral-600">
        Gira y saca {cfg.ruletaPicks} preguntas al azar para tu test real.
      </p>

      <div className="relative mx-auto mt-8 h-56 w-56">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-3xl">▼</div>
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-md"
          style={{
            transform: `rotate(${angulo}deg)`,
            transition: "transform 4.5s cubic-bezier(0.17, 0.67, 0.16, 1)",
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const a0 = (i * 360) / 16;
            const a1 = ((i + 1) * 360) / 16;
            const rad = (d: number) => ((d - 90) * Math.PI) / 180;
            const x0 = 100 + 92 * Math.cos(rad(a0));
            const y0 = 100 + 92 * Math.sin(rad(a0));
            const x1 = 100 + 92 * Math.cos(rad(a1));
            const y1 = 100 + 92 * Math.sin(rad(a1));
            return (
              <path
                key={i}
                d={`M100,100 L${x0},${y0} A92,92 0 0,1 ${x1},${y1} Z`}
                fill={i % 2 === 0 ? "#0071e3" : "#5e5ce6"}
                opacity={i % 4 === 0 ? 1 : 0.82}
              />
            );
          })}
          <circle cx="100" cy="100" r="42" fill="#fff" />
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="text-3xl font-bold tabular-nums text-ink">{numero}</span>
        </div>
      </div>

      {elegidas.length === 0 ? (
        <button type="button" onClick={girar} disabled={girando} className="btn-primary mt-8">
          {girando ? "Girando…" : "🎲 Girar la ruleta"}
        </button>
      ) : (
        <div className="mt-8">
          <p className="text-sm font-semibold text-ink">
            ¡{elegidas.length} preguntas seleccionadas!
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {elegidas.map((q, i) => (
              <span
                key={q.n}
                className={`animate-pop rounded-lg px-2 py-1 text-xs font-semibold ${
                  q.critical
                    ? "bg-neon-violet/15 text-neon-violet"
                    : "bg-brand/10 text-brand"
                }`}
                style={{ animationDelay: `${i * 25}ms` }}
              >
                {q.n}
                {q.critical && " ✖️2"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Anuncio: "empieza el desafio" + cuenta regresiva                    */
/* ------------------------------------------------------------------ */

function Anuncio({ cantidad, onListo }: { cantidad: number; onListo: () => void }) {
  const cfg = useQuiz();
  const [etapa, setEtapa] = useState<"desafio" | "real" | 3 | 2 | 1>("desafio");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    sfx.playFanfare();
    // Se copia la referencia dentro del efecto para poder limpiarla con seguridad.
    const pendientes = timers.current;
    const push = (fn: () => void, ms: number) => {
      pendientes.push(setTimeout(fn, ms));
    };
    push(() => setEtapa("real"), 2200);
    push(() => {
      setEtapa(3);
      sfx.playCountdownBeep(false);
    }, 4000);
    push(() => {
      setEtapa(2);
      sfx.playCountdownBeep(false);
    }, 5000);
    push(() => {
      setEtapa(1);
      sfx.playCountdownBeep(true);
    }, 6000);
    push(onListo, 7000);
    return () => {
      pendientes.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colores = ["#0071e3", "#5e5ce6", "#ff375f", "#ffcc00", "#34c759"];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-neon-violet p-10 text-center text-white shadow-glow-violet">
      {/* papelillos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-2.5 w-2.5 animate-confetti rounded-[2px]"
            style={{
              left: `${(i * 97) % 100}%`,
              backgroundColor: colores[i % colores.length],
              animationDelay: `${(i % 12) * 0.18}s`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {etapa === "desafio" && (
          <div className="animate-fadeUp">
            <p className="text-6xl">🏁</p>
            <h1 className="mt-4 animate-heartbeat text-4xl font-black tracking-tight sm:text-5xl">
              ¡EMPIEZA EL DESAFÍO!
            </h1>
            <p className="mt-3 text-white/90">
              {cantidad} preguntas salieron en la ruleta. Que no te tiemble la mano.
            </p>
          </div>
        )}

        {etapa === "real" && (
          <div className="animate-fadeUp">
            <p className="text-6xl">⏱️</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              ¡EMPIEZA EL TEST REAL!
            </h1>
            <p className="mt-3 text-white/90">
              {minutos(cfg.segundos)} minutos · máximo {cfg.maxErrores} malas · las de ✖️2 valen doble
            </p>
          </div>
        )}

        {typeof etapa === "number" && (
          <div className="py-6">
            <span key={etapa} className="animate-countIn block text-8xl font-black">
              {etapa}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Test real contra reloj                                              */
/* ------------------------------------------------------------------ */

function Test({
  preguntas,
  restante,
  setRestante,
  onTerminar,
}: {
  preguntas: OficialQuestion[];
  restante: number;
  setRestante: Dispatch<SetStateAction<number>>;
  onTerminar: (r: Marcadas) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Marcadas>({});
  const avisos = useRef<Set<number>>(new Set());
  const terminado = useRef(false);

  const finalizar = useCallback(() => {
    if (terminado.current) return;
    terminado.current = true;
    onTerminar(respuestas);
  }, [respuestas, onTerminar]);

  // Reloj de 40 minutos.
  useEffect(() => {
    const id = setInterval(() => {
      setRestante((n) => {
        const next = n - 1;
        if (next === 300 && !avisos.current.has(300)) {
          avisos.current.add(300);
          sfx.playWarning();
        }
        if (next === 60 && !avisos.current.has(60)) {
          avisos.current.add(60);
          sfx.playWarning();
        }
        return next <= 0 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [setRestante]);

  useEffect(() => {
    if (restante <= 0 && !terminado.current) {
      sfx.playTimeUp();
      finalizar();
    }
  }, [restante, finalizar]);

  const q = preguntas[idx];
  if (!q) return null;

  const multi = isMulti(q);
  const marcadas = respuestas[q.n] ?? [];

  const elegir = (letra: string) => {
    setRespuestas((prev) => {
      const actuales = prev[q.n] ?? [];
      if (!multi) return { ...prev, [q.n]: [letra] };
      const next = actuales.includes(letra)
        ? actuales.filter((l) => l !== letra)
        : [...actuales, letra];
      return { ...prev, [q.n]: next };
    });
  };

  const contestadas = Object.values(respuestas).filter((v) => v.length > 0).length;
  const urgente = restante <= 300;

  return (
    <div className="space-y-5">
      <div
        className={`sticky top-16 z-40 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl ${
          urgente
            ? "border-rose-300 bg-rose-50/90"
            : "border-black/[0.06] bg-white/85"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{urgente ? "⏰" : "⏱️"}</span>
          <span
            className={`text-2xl font-bold tabular-nums ${
              urgente ? "animate-pulseGlow text-rose-600" : "text-ink"
            }`}
          >
            {mmss(restante)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="chip">
            {contestadas} / {preguntas.length} contestadas
          </span>
          <button type="button" onClick={finalizar} className="btn-primary !px-4 !py-1.5 !text-xs">
            Terminar
          </button>
        </div>
      </div>

      <TarjetaPregunta
        q={q}
        posicion={`${idx + 1} de ${preguntas.length}`}
        seleccion={marcadas}
        revelada={false}
        onElegir={elegir}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="btn-ghost disabled:opacity-40"
        >
          ← Anterior
        </button>
        {idx < preguntas.length - 1 ? (
          <button
            type="button"
            onClick={() => setIdx((i) => i + 1)}
            className="btn-primary"
          >
            Siguiente →
          </button>
        ) : (
          <button type="button" onClick={finalizar} className="btn-primary">
            Entregar el test
          </button>
        )}
      </div>

      <div className="card p-4">
        <p className="mb-2 text-xs font-medium text-neutral-500">
          Preguntas del desafío (las moradas valen doble)
        </p>
        <div className="flex flex-wrap gap-1">
          {preguntas.map((p, i) => {
            const hecha = (respuestas[p.n] ?? []).length > 0;
            return (
              <button
                key={p.n}
                type="button"
                onClick={() => setIdx(i)}
                className={`h-8 w-8 rounded-md text-[10px] font-semibold transition ${
                  hecha
                    ? p.critical
                      ? "bg-neon-violet text-white"
                      : "bg-brand text-white"
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                } ${i === idx ? "ring-2 ring-ink ring-offset-1" : ""}`}
                title={`Pregunta ${p.n}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Resultado                                                           */
/* ------------------------------------------------------------------ */

function Resultado({
  preguntas,
  respuestas,
  tiempoUsado,
  onReintentar,
  onInicio,
}: {
  preguntas: OficialQuestion[];
  respuestas: Marcadas;
  tiempoUsado: number;
  onReintentar: () => void;
  onInicio: () => void;
}) {
  const cfg = useQuiz();
  const detalle = preguntas.map((q) => ({
    q,
    elegidas: respuestas[q.n] ?? [],
    ok: isCorrect(q, respuestas[q.n] ?? []),
  }));

  const errores = detalle.filter((d) => !d.ok).length;
  const puntaje = detalle.reduce((a, d) => a + (d.ok ? questionPoints(d.q) : 0), 0);
  const maximo = preguntas.reduce((a, q) => a + questionPoints(q), 0);
  const aprobado = errores <= cfg.maxErrores;

  const sonado = useRef(false);
  useEffect(() => {
    if (sonado.current) return;
    sonado.current = true;
    if (aprobado) sfx.playWin();
    else sfx.playLose();
  }, [aprobado]);

  return (
    <div className="space-y-6">
      <div
        className={`rounded-3xl p-8 text-center text-white ${
          aprobado
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
            : "bg-gradient-to-br from-rose-500 to-rose-600"
        }`}
      >
        <p className="text-6xl">{aprobado ? "🎉" : "💪"}</p>
        <h1 className="mt-3 text-4xl font-black">
          {aprobado ? "¡APROBADO!" : "REPROBADO"}
        </h1>
        <p className="mt-2 text-white/90">
          {errores} {errores === 1 ? "respuesta incorrecta" : "respuestas incorrectas"} de{" "}
          {preguntas.length} · se permiten hasta {cfg.maxErrores}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
          <span className="rounded-full bg-white/20 px-4 py-1.5 font-semibold">
            Puntaje {puntaje} / {maximo}
          </span>
          <span className="rounded-full bg-white/20 px-4 py-1.5 font-semibold">
            Tiempo {mmss(tiempoUsado)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onReintentar} className="btn-primary">
          🎰 Girar de nuevo
        </button>
        <button type="button" onClick={onInicio} className="btn-ghost">
          Volver al inicio
        </button>
      </div>

      <h2 className="text-lg font-semibold">Revisión de las {preguntas.length} preguntas</h2>
      <div className="space-y-4">
        {detalle.map(({ q, elegidas, ok }) => (
          <div key={q.n} className="space-y-2">
            <TarjetaPregunta
              q={q}
              posicion={ok ? "✅ Correcta" : "❌ Incorrecta"}
              seleccion={elegidas}
              revelada
              onElegir={() => undefined}
            />
            <Explicacion q={q} elegidas={elegidas} />
          </div>
        ))}
      </div>
    </div>
  );
}
