"use client";

import { useEffect, useState } from "react";

// "Mis datos para agendar": el usuario guarda sus datos una sola vez (en su navegador)
// y luego los copia con un toque para pegarlos en el formulario de la municipalidad.
// No se envia nada a ningun servidor: todo queda en localStorage de este dispositivo.

interface Datos {
  rut: string;
  nombre: string;
  nacimiento: string;
  email: string;
  telefono: string;
  direccion: string;
  comuna: string;
}

const EMPTY: Datos = {
  rut: "",
  nombre: "",
  nacimiento: "",
  email: "",
  telefono: "",
  direccion: "",
  comuna: "",
};

const KEY = "licencia-chile-misdatos-v1";

const FIELDS: { key: keyof Datos; label: string; placeholder: string; type?: string }[] = [
  { key: "rut", label: "RUT", placeholder: "12.345.678-9" },
  { key: "nombre", label: "Nombre completo", placeholder: "Nombre y apellidos" },
  { key: "nacimiento", label: "Fecha de nacimiento", placeholder: "dd/mm/aaaa", type: "text" },
  { key: "email", label: "Correo electronico", placeholder: "tucorreo@mail.com", type: "email" },
  { key: "telefono", label: "Telefono", placeholder: "+569 1234 5678" },
  { key: "direccion", label: "Direccion (calle y numero)", placeholder: "Av. Siempre Viva 123" },
  { key: "comuna", label: "Comuna de residencia", placeholder: "Tu comuna" },
];

export default function MisDatos() {
  const [datos, setDatos] = useState<Datos>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDatos({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const update = (k: keyof Datos, v: string) => {
    setDatos((d) => {
      const next = { ...d, [k]: v };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const copy = async (label: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied((c) => (c === label ? null : c)), 1500);
    } catch {
      /* ignore */
    }
  };

  const copyAll = () => {
    const text = FIELDS.filter((f) => datos[f.key])
      .map((f) => `${f.label}: ${datos[f.key]}`)
      .join("\n");
    copy("__all__", text);
  };

  const filled = FIELDS.filter((f) => datos[f.key]).length;

  return (
    <details className="card overflow-hidden" open={loaded && filled === 0}>
      <summary className="flex cursor-pointer list-none items-center justify-between p-5">
        <div>
          <h2 className="font-semibold">⚡ Mis datos para agendar mas rapido</h2>
          <p className="mt-0.5 text-sm text-neutral-500">
            Guarda tus datos una vez (quedan solo en este dispositivo) y copialos con un
            toque al llenar el formulario de tu comuna.
          </p>
        </div>
        <span className="chip ml-3 shrink-0">{filled}/{FIELDS.length}</span>
      </summary>

      <div className="border-t border-black/[0.06] p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-medium text-neutral-500">{f.label}</label>
              <div className="mt-1 flex gap-2">
                <input
                  type={f.type ?? "text"}
                  value={datos[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="input flex-1"
                />
                <button
                  type="button"
                  onClick={() => copy(f.label, datos[f.key])}
                  disabled={!datos[f.key]}
                  className="shrink-0 rounded-xl border border-black/10 bg-white px-3 text-sm font-medium text-brand transition hover:bg-black/[0.03] disabled:opacity-40"
                  title="Copiar"
                >
                  {copied === f.label ? "✓" : "Copiar"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" onClick={copyAll} className="btn-primary" disabled={filled === 0}>
            {copied === "__all__" ? "✓ Copiado" : "Copiar todos mis datos"}
          </button>
          <p className="text-xs text-neutral-500">
            Tus datos se guardan automaticamente en este navegador. No se envian a ningun
            servidor.
          </p>
        </div>
      </div>
    </details>
  );
}
