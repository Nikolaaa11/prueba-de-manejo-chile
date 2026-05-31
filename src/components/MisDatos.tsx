"use client";

import { useEffect, useRef, useState } from "react";

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
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDatos({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
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

  // Bookmarklet de autocompletado: rellena campos comunes del formulario municipal con tus
  // datos. El usuario lo arrastra a su barra de marcadores y lo clickea EN el sitio del
  // municipio. Es una herramienta de uso personal: revisa siempre lo que rellena.
  const bookmarklet =
    "javascript:(function(){var d=" +
    JSON.stringify(datos) +
    ";function s(e,v){try{e.focus();var p=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value');if(p&&p.set){p.set.call(e,v)}else{e.value=v}e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){}}" +
    "var n=0;document.querySelectorAll('input,textarea').forEach(function(e){var k=((e.name||'')+' '+(e.id||'')+' '+(e.placeholder||'')+' '+(e.getAttribute('aria-label')||'')).toLowerCase();var v='';if(/(rut|run)/.test(k))v=d.rut;else if(/(mail|correo)/.test(k))v=d.email;else if(/(fono|tel|celular|movil|whats)/.test(k))v=d.telefono;else if(/(nombre|name)/.test(k))v=d.nombre;else if(/(direcc|domicil|calle)/.test(k))v=d.direccion;else if(/(comuna)/.test(k))v=d.comuna;else if(/(nacim|birth)/.test(k))v=d.nacimiento;if(v){s(e,v);n++}});alert('Licencia Chile: rellene '+n+' campo(s). Revisa y completa el resto.')})();";

  const bmRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (bmRef.current) bmRef.current.setAttribute("href", bookmarklet);
  }, [bookmarklet]);

  return (
    <details
      className="card overflow-hidden"
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
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

        {/* Bookmarklet de autocompletado */}
        {filled > 0 && (
          <div className="mt-5 rounded-xl border border-brand/20 bg-brand/[0.04] p-4">
            <h3 className="text-sm font-semibold text-ink">
              🔖 Boton magico: autocompletar el formulario
            </h3>
            <p className="mt-1 text-xs text-neutral-600">
              Arrastra este boton a tu barra de marcadores. Luego, estando en el formulario
              de tu comuna, haz clic en el y rellenara los campos (RUT, nombre, correo,
              telefono, direccion) con tus datos.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {/* href se asigna por ref para evitar el saneamiento de javascript: de React */}
              <a
                ref={bmRef}
                onClick={(e) => e.preventDefault()}
                className="cursor-grab rounded-full bg-gradient-to-r from-brand to-neon-violet px-4 py-2 text-sm font-semibold text-white shadow-sm active:cursor-grabbing"
                title="Arrastrame a tus marcadores"
              >
                ⚡ Autocompletar licencia
              </a>
              <button
                type="button"
                onClick={() => copy("__bm__", bookmarklet)}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-brand hover:bg-black/[0.03]"
              >
                {copied === "__bm__" ? "✓ Copiado" : "Copiar codigo"}
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Herramienta de uso personal. Revisa siempre lo que rellena: los formularios
              municipales varian y puede que algunos campos no coincidan.
            </p>
          </div>
        )}
      </div>
    </details>
  );
}
