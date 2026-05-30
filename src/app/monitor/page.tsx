"use client";

import { useState } from "react";
import { MUNICIPALITIES } from "@/data/municipalities";

interface CheckResult {
  municipalityId: string;
  comuna: string;
  availability: "disponible" | "sin-cupos" | "desconocido" | "error";
  message: string;
  url: string;
  checkedAt: string;
}

const BADGE: Record<CheckResult["availability"], { label: string; cls: string }> = {
  disponible: { label: "Posibles cupos", cls: "bg-green-100 text-green-800" },
  "sin-cupos": { label: "Sin cupos", cls: "bg-gray-100 text-gray-600" },
  desconocido: { label: "Por revisar", cls: "bg-amber-100 text-amber-800" },
  error: { label: "No accesible", cls: "bg-red-100 text-flag-red" },
};

export default function MonitorPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const qs = selected.length ? `?ids=${selected.join(",")}` : "";
      const res = await fetch(`/api/monitor${qs}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(data.results);
    } catch (e) {
      setError(
        "No se pudo completar el chequeo. Intenta de nuevo en unos momentos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Monitor de cupos</h1>
        <p className="mt-1 text-gray-600">
          Revisa la disponibilidad aproximada de horas en las paginas de las
          municipalidades.
        </p>
      </header>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Como leer estos resultados:</strong> el monitor intenta interpretar el
        contenido publico de cada sitio municipal, pero no hay una API oficial de cupos.
        Por eso muchos resultados saldran como <em>&quot;Por revisar&quot;</em> o
        <em> &quot;No accesible&quot;</em> (algunos sitios bloquean el acceso automatico).
        Un resultado de <em>&quot;Posibles cupos&quot;</em> es solo un indicio: confirma y
        agenda directamente en el sitio del municipio.
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Selecciona municipalidades{" "}
            <span className="text-sm font-normal text-gray-500">
              (o deja vacio para revisar todas)
            </span>
          </h2>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-sm text-brand underline"
            >
              Limpiar
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {MUNICIPALITIES.map((m) => (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              title={
                m.agendaUrl
                  ? "Monitoreo directo de la pagina de agenda"
                  : "Sin pagina directa: se deriva a busqueda manual"
              }
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selected.includes(m.id)
                  ? "border-brand bg-brand text-white"
                  : "border-black/15 bg-white hover:border-brand/50"
              }`}
            >
              {m.agendaUrl && <span className="mr-1 text-green-500">●</span>}
              {m.comuna}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          <span className="text-green-500">●</span> = monitoreo directo disponible. El resto
          se deriva a busqueda manual.
        </p>
        <button
          onClick={run}
          disabled={loading}
          className="mt-4 rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? "Revisando…" : "Revisar disponibilidad ahora"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-flag-red">{error}</p>
      )}

      {results && (
        <div className="space-y-3">
          <h2 className="font-semibold">
            Resultados ({results.length})
          </h2>
          {results.map((r) => {
            const badge = BADGE[r.availability];
            return (
              <div
                key={r.municipalityId}
                className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{r.comuna}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{r.message}</p>
                </div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-lg border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Abrir sitio →
                </a>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-xl border border-black/10 bg-white p-5 text-sm text-gray-600">
        <h2 className="font-semibold text-gray-800">
          ¿Quieres recibir un aviso automatico?
        </h2>
        <p className="mt-2">
          El proyecto incluye un cron en <code className="rounded bg-black/5 px-1">vercel.json</code>{" "}
          que ejecuta <code className="rounded bg-black/5 px-1">/api/monitor</code> cada 30
          minutos. Si defines la variable de entorno{" "}
          <code className="rounded bg-black/5 px-1">NOTIFY_WEBHOOK_URL</code> en Vercel
          (por ejemplo, un webhook de Telegram, Slack o correo), recibiras una notificacion
          cuando se detecten posibles cupos. Revisa el <code>README</code> para los pasos.
        </p>
      </div>
    </div>
  );
}
