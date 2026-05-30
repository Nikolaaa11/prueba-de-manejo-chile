"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MUNICIPALITIES,
  municipalitiesWithRelease,
  bookingLink,
  type Municipality,
} from "@/data/municipalities";
import {
  buildICS,
  countdown,
  describeReleaseRule,
  formatNext,
  nextOccurrence,
  occursOnDate,
  type ICSEvent,
} from "@/lib/release";

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const WEEKDAYS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];

const DEMANDA_BADGE: Record<string, { label: string; cls: string }> = {
  baja: { label: "Demanda baja", cls: "bg-green-100 text-green-800" },
  media: { label: "Demanda media", cls: "bg-amber-100 text-amber-800" },
  alta: { label: "Demanda alta", cls: "bg-red-100 text-flag-red" },
};

function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function toICSEvents(list: Municipality[]): ICSEvent[] {
  return list
    .filter((m) => m.release)
    .map((m) => ({
      id: m.id,
      comuna: m.comuna,
      rule: m.release!.rule,
      url: bookingLink(m),
    }));
}

export default function CalendarioPage() {
  const withRelease = useMemo(() => municipalitiesWithRelease(), []);
  const [now, setNow] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null);
  const [notifyMsg, setNotifyMsg] = useState<string | null>(null);

  // Inicializar fecha en el cliente (evita desajustes de hidratacion).
  useEffect(() => {
    const d = new Date();
    setNow(d);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Proximas liberaciones ordenadas por cercania.
  const upcoming = useMemo(() => {
    if (!now) return [];
    return withRelease
      .map((m) => ({ m, next: nextOccurrence(m.release!.rule, now) }))
      .filter((x) => x.next)
      .sort((a, b) => a.next!.getTime() - b.next!.getTime());
  }, [withRelease, now]);

  const enableNotifications = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotifyMsg("Tu navegador no soporta notificaciones.");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm !== "granted") {
      setNotifyMsg("No se concedio el permiso de notificaciones.");
      return;
    }
    // Programa avisos para las proximas liberaciones (solo mientras la pestana siga abierta).
    let programadas = 0;
    const ahora = Date.now();
    for (const { m, next } of upcoming.slice(0, 5)) {
      const ms = next!.getTime() - ahora;
      // setTimeout admite hasta ~24.8 dias; programa las que caigan dentro de ese rango.
      if (ms > 0 && ms < 2_000_000_000) {
        window.setTimeout(() => {
          new Notification(`Cupos licencia - ${m.comuna}`, {
            body: `Ahora se liberan/abren cupos en ${m.comuna}. Entra a reservar.`,
          });
        }, ms);
        programadas++;
      }
    }
    setNotifyMsg(
      `Listo. Programe ${programadas} aviso(s) para esta sesion. Para alertas permanentes en tu telefono, usa el boton "Descargar calendario (.ics)".`
    );
  };

  if (!now || !cursor) {
    return <p className="text-gray-500">Cargando calendario…</p>;
  }

  // Construccion de la grilla del mes (lunes a domingo).
  const first = new Date(cursor.y, cursor.m, 1);
  const startOffset = (first.getDay() + 6) % 7; // 0=lunes
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.y, cursor.m, d));

  const releasesOn = (date: Date) =>
    withRelease.filter((m) => occursOnDate(m.release!.rule, date));

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const moveMonth = (delta: number) => {
    let m = cursor.m + delta;
    let y = cursor.y;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setCursor({ y, m });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Calendario de liberacion de cupos</h1>
        <p className="mt-1 text-gray-600">
          Cuando cada municipalidad abre nuevas horas para la prueba de manejo. Programa una
          alerta para entrar justo a tiempo a reservar.
        </p>
      </header>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Importante:</strong> estos horarios provienen de los sitios oficiales de cada
        municipio y fueron verificados al armar el proyecto, pero pueden cambiar sin aviso.
        Usalos como guia de <em>cuando entrar a revisar</em> y confirma siempre en el sitio
        oficial. La mayoria de las comunas exige acreditar residencia.
      </div>

      {/* Acciones de alerta */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() =>
            downloadICS("liberacion-cupos-licencia.ics", buildICS(toICSEvents(withRelease), now))
          }
          className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark"
        >
          📅 Descargar calendario (.ics)
        </button>
        <button
          onClick={enableNotifications}
          className="rounded-lg border border-black/15 px-5 py-2.5 font-semibold hover:bg-black/5"
        >
          🔔 Activar avisos en este navegador
        </button>
      </div>
      {notifyMsg && (
        <p className="rounded-lg bg-brand-light p-3 text-sm text-brand">{notifyMsg}</p>
      )}
      <p className="-mt-4 text-xs text-gray-500">
        El archivo .ics agrega recordatorios recurrentes (con alarma 30 min antes) a Google
        Calendar, Apple Calendar o el calendario de tu telefono — esa es la alerta mas
        confiable. Los avisos del navegador solo funcionan mientras esta pestana esta abierta.
      </p>

      {/* Proximas liberaciones */}
      <section>
        <h2 className="text-lg font-semibold">Proximas liberaciones</h2>
        <div className="mt-3 space-y-2">
          {upcoming.map(({ m, next }) => {
            const badge = m.demanda ? DEMANDA_BADGE[m.demanda] : null;
            return (
              <div
                key={m.id}
                className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{m.comuna}</h3>
                    <span className="rounded-full bg-brand text-white px-2.5 py-0.5 text-xs font-medium">
                      {countdown(next!, now)}
                    </span>
                    {badge && (
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.cls}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {describeReleaseRule(m.release!.rule)} · proxima: {formatNext(next!)}
                  </p>
                  {m.release!.note && (
                    <p className="mt-1 text-xs text-gray-400">{m.release!.note}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={bookingLink(m)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    Reservar →
                  </a>
                  <button
                    onClick={() =>
                      downloadICS(`liberacion-${m.id}.ics`, buildICS(toICSEvents([m]), now))
                    }
                    className="rounded-lg border border-black/15 px-3 py-2 text-sm font-medium hover:bg-black/5"
                    title="Descargar recordatorio de esta comuna"
                  >
                    .ics
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grilla del mes */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {MONTHS[cursor.m]} {cursor.y}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => moveMonth(-1)}
              className="rounded-lg border border-black/15 px-3 py-1 text-sm hover:bg-black/5"
            >
              ← Anterior
            </button>
            <button
              onClick={() => moveMonth(1)}
              className="rounded-lg border border-black/15 px-3 py-1 text-sm hover:bg-black/5"
            >
              Siguiente →
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={i} className="min-h-[64px] rounded-lg" />;
            const rels = releasesOn(date);
            const today = isSameDay(date, now);
            return (
              <div
                key={i}
                className={`min-h-[64px] rounded-lg border p-1 text-left ${
                  today ? "border-brand bg-brand-light" : "border-black/10 bg-white"
                }`}
              >
                <div className={`text-xs font-semibold ${today ? "text-brand" : "text-gray-500"}`}>
                  {date.getDate()}
                </div>
                <div className="mt-0.5 space-y-0.5">
                  {rels.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="truncate rounded bg-green-100 px-1 text-[10px] leading-tight text-green-800"
                      title={`${m.comuna} — ${describeReleaseRule(m.release!.rule)}`}
                    >
                      {m.comuna}
                    </div>
                  ))}
                  {rels.length > 3 && (
                    <div className="text-[10px] text-gray-400">+{rels.length - 3} mas</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Las comunas con &quot;agenda abierta&quot; (sin un dia fijo) no aparecen en la grilla;
          revisalas cuando quieras desde la pagina de agendar.
        </p>
      </section>
    </div>
  );
}
