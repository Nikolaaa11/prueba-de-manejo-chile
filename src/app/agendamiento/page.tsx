"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MUNICIPALITIES,
  REQUISITOS_CLASE_B,
  DOCUMENTOS,
  EXAMENES,
  PASOS_AGENDAMIENTO,
  bookingLink,
  byChance,
  type Municipality,
} from "@/data/municipalities";
import MisDatos from "@/components/MisDatos";
import {
  describeReleaseRule,
  nextOccurrence,
  countdown,
  formatNext,
} from "@/lib/release";

const MODALIDAD_LABEL: Record<Municipality["modalidad"], string> = {
  online: "Online",
  presencial: "Presencial",
  telefonico: "Telefonico",
  mixto: "Online / Presencial",
  desconocida: "Por confirmar",
};

const DEMANDA_BADGE: Record<string, { label: string; cls: string }> = {
  baja: { label: "Demanda baja", cls: "bg-emerald-500/15 text-emerald-700" },
  media: { label: "Demanda media", cls: "bg-amber-500/15 text-amber-800" },
  alta: { label: "Demanda alta", cls: "bg-rose-500/15 text-flag-red" },
};

const TONE: Record<string, { box: string; dot: string }> = {
  green: { box: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800", dot: "bg-emerald-500" },
  amber: { box: "border-amber-500/20 bg-amber-500/10 text-amber-800", dot: "bg-amber-500" },
  blue: { box: "border-brand/20 bg-brand/10 text-brand", dot: "bg-brand" },
  gray: { box: "border-black/[0.06] bg-black/[0.04] text-neutral-600", dot: "bg-neutral-400" },
};

// Estado de cupos claro: si hay agenda abierta, cuando abre, o si hay que revisar.
function cupoEstado(m: Municipality, now: Date | null): { tone: string; label: string } {
  if (m.release) {
    if (m.release.rule.kind === "open")
      return { tone: "green", label: "Agenda abierta — suele haber horas" };
    const next = now ? nextOccurrence(m.release.rule, now) : null;
    if (next && now) {
      const soon = next.getTime() - now.getTime() < 48 * 3600 * 1000;
      return {
        tone: soon ? "green" : "amber",
        label: `Abre ${countdown(next, now)} · ${formatNext(next)}`,
      };
    }
    return { tone: "amber", label: `Abre: ${describeReleaseRule(m.release.rule).toLowerCase()}` };
  }
  if (m.agendaUrl)
    return { tone: "blue", label: "Reserva online directa — revisa disponibilidad" };
  return { tone: "gray", label: "Busca la pagina oficial y revisa disponibilidad" };
}

export default function AgendamientoPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [sortChance, setSortChance] = useState(true);
  const [onlyRelease, setOnlyRelease] = useState(false);
  const [hideAlta, setHideAlta] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const regions = useMemo(
    () => Array.from(new Set(MUNICIPALITIES.map((m) => m.region))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = MUNICIPALITIES.filter((m) => {
      const matchQ =
        !q ||
        m.comuna.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q);
      const matchR = !region || m.region === region;
      const matchRel = !onlyRelease || !!m.release;
      const matchAlta = !hideAlta || m.demanda !== "alta";
      return matchQ && matchR && matchRel && matchAlta;
    });
    list = sortChance
      ? byChance(list)
      : [...list].sort((a, b) => a.comuna.localeCompare(b.comuna));
    return list;
  }, [query, region, onlyRelease, hideAlta, sortChance]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Agendar tu hora para la prueba de manejo</h1>
        <p className="mt-1 text-neutral-600">
          Busca tu municipalidad, mira cuando libera cupos y ve directo a reservar. El
          agendamiento se realiza en el sitio oficial de cada municipio.
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neon-cyan">
          💡 <strong>¿Quieres una alerta para entrar justo cuando liberan cupos?</strong>{" "}
          Mira el calendario de liberaciones y descarga recordatorios para tu telefono.
        </p>
        <Link
          href="/calendario"
          className="shrink-0 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
        >
          Ver calendario →
        </Link>
      </div>

      <MisDatos />

      <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-900">
        <strong>Importante:</strong> en Chile no existe un sistema nacional unico de
        agendamiento. Cada municipalidad administra su propia agenda y la mayoria exige
        acreditar que vives en la comuna. Las URL y los horarios pueden cambiar; verifica
        siempre en el sitio oficial.
      </div>

      {/* Buscador */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Buscar comuna o region…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-neon-cyan"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-lg border border-black/10 px-4 py-2.5 outline-none focus:border-neon-cyan"
        >
          <option value="">Todas las regiones</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sortChance}
            onChange={(e) => setSortChance(e.target.checked)}
          />
          Ordenar por mas posibilidades de cupo
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyRelease}
            onChange={(e) => setOnlyRelease(e.target.checked)}
          />
          Solo con horario de liberacion conocido
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideAlta}
            onChange={(e) => setHideAlta(e.target.checked)}
          />
          Ocultar comunas de demanda alta
        </label>
      </div>

      {/* Resultados */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((m) => {
          const badge = m.demanda ? DEMANDA_BADGE[m.demanda] : null;
          const next = m.release && now ? nextOccurrence(m.release.rule, now) : null;
          const estado = cupoEstado(m, now);
          const tone = TONE[estado.tone];
          return (
            <div
              key={m.id}
              className="flex flex-col rounded-xl border border-black/[0.06] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{m.comuna}</h3>
                  <p className="text-sm text-neutral-500">Region {m.region}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan">
                    {MODALIDAD_LABEL[m.modalidad]}
                  </span>
                  {badge && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.cls}`}>
                      {badge.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Estado de cupos: claro de un vistazo */}
              <div className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${tone.box}`}>
                <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
                {estado.label}
              </div>

              {/* Liberacion de cupos (detalle) */}
              {m.release && (
                <div className="mt-3 rounded-lg bg-emerald-500/10 p-3 text-sm">
                  <p className="font-medium text-emerald-800">
                    🗓 Libera cupos: {describeReleaseRule(m.release.rule)}
                  </p>
                  {next && (
                    <p className="mt-0.5 text-emerald-700">
                      Proxima: {formatNext(next)}{" "}
                      <span className="font-semibold">({countdown(next, now!)})</span>
                    </p>
                  )}
                  {m.release.note && (
                    <p className="mt-1 text-xs text-emerald-700/80">{m.release.note}</p>
                  )}
                </div>
              )}

              {m.requiereResidencia && (
                <p className="mt-2 text-xs text-amber-700">
                  ⚠ Suele exigir acreditar residencia en la comuna.
                </p>
              )}
              {m.notas && <p className="mt-2 text-sm text-neutral-600">{m.notas}</p>}
              {m.phone && <p className="mt-2 text-sm text-neutral-600">📞 {m.phone}</p>}

              <details className="mt-3 rounded-lg border border-black/[0.06] bg-neutral-50 p-3 text-sm">
                <summary className="cursor-pointer list-none font-medium text-brand">
                  ¿Que necesitas y como agendar aqui?
                </summary>
                <div className="mt-2 space-y-2 text-neutral-700">
                  <div>
                    <p className="font-medium text-ink">Documentos a tener listos:</p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-neutral-600">
                      {DOCUMENTOS.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  {m.requisitosExtra && m.requisitosExtra.length > 0 && (
                    <div>
                      <p className="font-medium text-ink">Especifico de {m.comuna}:</p>
                      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-neutral-600">
                        {m.requisitosExtra.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {m.requiereResidencia && (
                    <p className="text-amber-700">
                      ⚠ Debes acreditar que vives en {m.comuna} (certificado de residencia o
                      cuenta de servicios a tu nombre).
                    </p>
                  )}
                  {m.release && (
                    <p className="text-emerald-700">
                      🗓 Entra a reservar {describeReleaseRule(m.release.rule).toLowerCase()},
                      que es cuando hay mas cupos.
                    </p>
                  )}
                  <p>
                    Para llenar el formulario mas rapido, copia tus datos desde{" "}
                    <strong>&quot;Mis datos para agendar&quot;</strong> (arriba). Mira la guia
                    de pasos al final de la pagina.
                  </p>
                </div>
              </details>

              <div className="mt-auto pt-4">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={bookingLink(m)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                  >
                    {m.agendaUrl ? "Ir a agendar →" : "Buscar pagina oficial →"}
                  </a>
                  {m.website && (
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/[0.04]"
                    >
                      Sitio del municipio
                    </a>
                  )}
                </div>
                {!m.agendaUrl && (
                  <p className="mt-2 text-xs text-neutral-400">
                    Sin enlace directo verificado: el boton abre una busqueda oficial que
                    lleva a la pagina vigente de la comuna.
                  </p>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-neutral-500">
            No encontramos comunas con esos filtros. Prueba quitando alguno o busca
            &quot;[tu comuna] licencia de conducir&quot; en Google.
          </p>
        )}
      </div>

      {/* Guia completa */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-ink">
          Guia para sacar tu licencia Clase B
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
            <h3 className="font-semibold">✅ Requisitos</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {REQUISITOS_CLASE_B.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
            <h3 className="font-semibold">📄 Documentos</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {DOCUMENTOS.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
            <h3 className="font-semibold">🧪 Examenes (presenciales)</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              {EXAMENES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-neutral-400">
              Tienes 2 oportunidades por examen; el repechaje es dentro de 25 dias habiles.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
          <h3 className="font-semibold">📝 Paso a paso para agendar (y llenar el formulario rapido)</h3>
          <ol className="mt-3 space-y-3">
            {PASOS_AGENDAMIENTO.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  {i + 1}
                </span>
                <span className="text-sm text-neutral-700">{p}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-neutral-400">
            Los requisitos y aranceles exactos los define cada municipalidad: confirma en el
            sitio oficial antes de asistir. El agendamiento es online, pero los examenes son
            presenciales.
          </p>
        </div>
      </section>
    </div>
  );
}
