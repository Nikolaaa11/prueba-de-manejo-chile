"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { municipalitiesWithRelease, bookingLink } from "@/data/municipalities";
import { nextOccurrence, countdown, formatNext } from "@/lib/release";

interface Row {
  id: string;
  comuna: string;
  next: number; // epoch ms
  url: string;
}

export default function WeekReleases() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const compute = () => {
      const n = new Date();
      setNow(n.getTime());
      const horizon = n.getTime() + 7 * 24 * 3600 * 1000;
      const list: Row[] = [];
      for (const m of municipalitiesWithRelease()) {
        const next = nextOccurrence(m.release!.rule, n);
        if (next && next.getTime() <= horizon) {
          list.push({ id: m.id, comuna: m.comuna, next: next.getTime(), url: bookingLink(m) });
        }
      }
      list.sort((a, b) => a.next - b.next);
      setRows(list);
    };
    compute();
    const t = setInterval(compute, 60_000);
    return () => clearInterval(t);
  }, []);

  if (!rows) {
    return (
      <div className="card p-6">
        <div className="h-5 w-48 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          <span className="mr-2 animate-pulseGlow text-emerald-500">●</span>
          Liberan cupos esta semana
        </h2>
        <Link href="/calendario" className="text-sm font-medium text-brand hover:underline">
          Ver calendario →
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-neutral-500">
          No hay liberaciones programadas en los proximos 7 dias entre las comunas con
          horario conocido. Revisa el calendario o las de agenda abierta.
        </p>
      ) : (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {rows.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-black/[0.06] bg-neutral-50 px-4 py-3 transition hover:border-brand/40 hover:bg-white"
            >
              <div>
                <div className="font-semibold">{r.comuna}</div>
                <div className="text-xs text-neutral-500">{formatNext(new Date(r.next))}</div>
              </div>
              <span className="chip-cyan">{countdown(new Date(r.next), new Date(now))}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
