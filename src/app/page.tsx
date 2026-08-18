import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { MUNICIPALITIES, municipalitiesWithRelease } from "@/data/municipalities";
import WeekReleases from "@/components/WeekReleases";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white px-6 py-14 text-center shadow-soft sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[42rem] max-w-full rounded-full bg-gradient-to-r from-brand/15 to-neon-violet/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <span className="chip-cyan">Clase B · datos reales · gratis</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Saca tu licencia <span className="gradient-text">a la primera</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600 sm:text-xl">
            La plataforma todo-en-uno para preparar el examen teorico y conseguir hora para
            la prueba de manejo en Chile. {QUESTIONS.length} preguntas con señales,
            calendario de liberacion de cupos y alertas para tu telefono.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/test" className="btn-primary">
              Empezar el test
            </Link>
            <Link href="/calendario" className="btn-ghost">
              Ver cuando liberan cupos
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-neutral-500">
            <Stat n={`${QUESTIONS.length}`} label="preguntas" />
            <Stat n={`${MUNICIPALITIES.length}`} label="comunas" />
            <Stat n={`${municipalitiesWithRelease().length}`} label="con horario de cupos" />
            <Stat n="100%" label="datos reales" />
          </div>
        </div>
      </section>

      {/* LIBERAN ESTA SEMANA */}
      <WeekReleases />

      {/* EL DESAFIO */}
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-brand to-neon-violet p-8 text-white shadow-glow-violet sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Nuevo
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              🎰 El Desafio — 280 preguntas oficiales
            </h2>
            <p className="mt-2 text-white/90">
              El Cuestionario General Clase B completo, con su pauta oficial y una
              explicacion en cada respuesta. Estudialo, gira la ruleta y rinde el test
              real: 32 preguntas, 40 minutos y maximo 2 malas.
            </p>
          </div>
          <Link
            href="/desafio"
            className="rounded-full bg-white px-6 py-3 font-semibold text-brand shadow-sm transition hover:bg-white/90"
          >
            Aceptar el desafio →
          </Link>
        </div>
      </section>

      {/* MODULOS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card href="/test" emoji="📝" title="Test teorico" desc={`${QUESTIONS.length} preguntas con señales, examen cronometrado y repaso de errores.`} accent="cyan" />
        <Card href="/conaset" emoji="🚦" title="CONASET" desc="Preguntas de los cuestionarios oficiales de CONASET y del libro Clase B, con la misma ruleta." accent="violet" />
        <Card href="/agendamiento" emoji="📍" title="Agendar hora" desc={`${MUNICIPALITIES.length} comunas ordenadas por posibilidad de cupo, con enlace directo.`} accent="violet" />
        <Card href="/calendario" emoji="📅" title="Calendario" desc="Cuando libera cada comuna + alertas .ics para tu telefono." accent="cyan" />
        <Card href="/monitor" emoji="🔔" title="Monitor" desc="Revisa disponibilidad de horas en las paginas municipales." accent="violet" />
      </section>

      {/* COMO FUNCIONA */}
      <section>
        <h2 className="text-center text-2xl font-bold tracking-tight text-ink">
          Como funciona
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Step n="1" title="Estudia inteligente" desc="Practica por tema, rinde examen real y repasa justo las preguntas que mas fallas." />
          <Step n="2" title="Sabe cuando entrar" desc="El calendario te dice el dia y hora en que tu comuna abre nuevas horas." />
          <Step n="3" title="Reserva al instante" desc="Recibe la alerta, abre el enlace directo de tu comuna y agenda antes que se agoten." />
        </div>
      </section>

      {/* AVISO */}
      <section className="rounded-2xl border border-amber-300/60 bg-amber-50 p-5 text-sm text-amber-900">
        <h2 className="font-semibold">Lee esto antes de empezar</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>En Chile cada municipalidad administra su propia agenda; no hay un sistema nacional unico.</li>
          <li>La mayoria de los municipios exige acreditar que vives en la comuna para tramitar la licencia ahi.</li>
          <li>Los horarios de liberacion provienen de fuentes oficiales pero pueden cambiar: confirma en el sitio del municipio.</li>
        </ul>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-ink">{n}</div>
      <div className="mt-0.5">{label}</div>
    </div>
  );
}

function Card({
  href,
  emoji,
  title,
  desc,
  accent,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
  accent: "cyan" | "violet";
}) {
  return (
    <Link href={href} className="card card-hover group p-5">
      <div
        className={`grid h-11 w-11 place-items-center rounded-2xl text-2xl ${
          accent === "cyan" ? "bg-brand/10" : "bg-neon-violet/10"
        }`}
      >
        {emoji}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600">{desc}</p>
      <span className="mt-3 inline-block text-sm font-medium text-brand opacity-0 transition group-hover:opacity-100">
        Abrir →
      </span>
    </Link>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="card p-5">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-neon-violet font-bold text-white">
        {n}
      </div>
      <h3 className="mt-3 font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600">{desc}</p>
    </div>
  );
}
