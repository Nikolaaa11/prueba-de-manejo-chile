"use client";

import { useMemo, useState } from "react";
import {
  MUNICIPALITIES,
  REQUISITOS_CLASE_B,
  DOCUMENTOS,
  bookingLink,
  type Municipality,
} from "@/data/municipalities";

const MODALIDAD_LABEL: Record<Municipality["modalidad"], string> = {
  online: "Online",
  presencial: "Presencial",
  telefonico: "Telefonico",
  mixto: "Online / Presencial",
  desconocida: "Por confirmar",
};

export default function AgendamientoPage() {
  const [query, setQuery] = useState("");
  const regions = useMemo(
    () => Array.from(new Set(MUNICIPALITIES.map((m) => m.region))).sort(),
    []
  );
  const [region, setRegion] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MUNICIPALITIES.filter((m) => {
      const matchQ =
        !q ||
        m.comuna.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q);
      const matchR = !region || m.region === region;
      return matchQ && matchR;
    });
  }, [query, region]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Agendar tu hora para la prueba de manejo</h1>
        <p className="mt-1 text-gray-600">
          Busca tu municipalidad para ir directo a su pagina de tramites de licencia de
          conducir. Recuerda: el agendamiento se realiza en el sitio oficial de cada
          municipio.
        </p>
      </header>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Importante:</strong> en Chile no existe un sistema nacional unico de
        agendamiento. Cada municipalidad administra su propia agenda y la mayoria exige
        acreditar que vives en la comuna. Las URL pueden cambiar; verifica siempre en el
        sitio oficial.
      </div>

      {/* Buscador */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Buscar comuna o region…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-brand"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-brand"
        >
          <option value="">Todas las regiones</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Resultados */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="flex flex-col rounded-xl border border-black/10 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{m.comuna}</h3>
                <p className="text-sm text-gray-500">Region {m.region}</p>
              </div>
              <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
                {MODALIDAD_LABEL[m.modalidad]}
              </span>
            </div>

            {m.requiereResidencia && (
              <p className="mt-2 text-xs text-amber-700">
                ⚠ Suele exigir acreditar residencia en la comuna.
              </p>
            )}
            {m.notas && <p className="mt-2 text-sm text-gray-600">{m.notas}</p>}
            {m.phone && (
              <p className="mt-2 text-sm text-gray-600">📞 {m.phone}</p>
            )}

            <div className="mt-auto pt-4">
              <div className="flex flex-wrap gap-2">
                <a
                  href={bookingLink(m)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                >
                  {m.agendaUrl ? "Ir a agendar →" : "Buscar pagina oficial →"}
                </a>
                <a
                  href={m.website}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Sitio del municipio
                </a>
              </div>
              {!m.agendaUrl && (
                <p className="mt-2 text-xs text-gray-400">
                  Sin enlace directo verificado: el boton abre una busqueda oficial que
                  lleva a la pagina vigente de la comuna.
                </p>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500">
            No encontramos esa comuna en el directorio todavia. Puedes buscar
            &quot;[tu comuna] licencia de conducir&quot; en Google para llegar al sitio
            oficial de tu municipalidad.
          </p>
        )}
      </div>

      {/* Requisitos y documentos */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-white p-5">
          <h2 className="font-semibold">Requisitos (Clase B, primera vez)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {REQUISITOS_CLASE_B.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-5">
          <h2 className="font-semibold">Documentos que suelen pedir</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {DOCUMENTOS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-400">
            Los requisitos exactos los define cada municipalidad. Confirma en el sitio
            oficial antes de asistir.
          </p>
        </div>
      </div>
    </div>
  );
}
