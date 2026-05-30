import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { MUNICIPALITIES, municipalitiesWithRelease } from "@/data/municipalities";
import WeekReleases from "@/components/WeekReleases";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 animate-aurora rounded-full bg-neon-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 animate-aurora-slow rounded-full bg-neon-cyan/30 blur-3xl" />
        <div className="relative">
          <span className="chip-cyan">🇨🇱 Clase B · datos reales · gratis</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Saca tu licencia <span className="gradient-text">a la primera</span>
            <br className="hidden sm:block" /> y consigue hora rapido
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            La plataforma todo-en-uno para preparar el examen teorico y cazar cupos de la
            prueba de manejo en Chile: {QUESTIONS.length} preguntas con señales, calendario
            de liberacion de horas y alertas para tu telefono.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/test" className="btn-primary">
              Empezar el test →
            </Link>
            <Link href="/calendario" className="btn-ghost">
              Ver cuando liberan cupos
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
            <Stat n={`${QUESTIONS.length}`} label="preguntas" />
            <Stat n={`${MUNICIPALITIES.length}`} label="comunas" />
            <Stat n={`${municipalitiesWithRelease().length}`} label="con horario de cupos" />
            <Stat n="100%" label="datos reales" />
          </div>
        </div>
      </section>

      {/* LIBERAN ESTA SEMANA */}
      <WeekReleases />

      {/* MODULOS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card href="/test" emoji="📝" title="Test teorico" desc={`${QUESTIONS.length} preguntas con señales, examen cronometrado y repaso de errores.`} accent="cyan" />
        <Card href="/agendamiento" emoji="📍" title="Agendar hora" desc={`${MUNICIPALITIES.length} comunas ordenadas por posibilidad de cupo, con enlace directo.`} accent="violet" />
        <Card href="/calendario" emoji="📅" title="Calendario" desc="Cuando libera cada comuna + alertas .ics para tu telefono." accent="cyan" />
        <Card href="/monitor" emoji="🔔" title="Monitor" desc="Revisa disponibilidad de horas en las paginas municipales." accent="violet" />
      </section>

      {/* COMO FUNCIONA */}
      <section className="grid gap-4 md:grid-cols-3">
        <Step n="1" title="Estudia inteligente" desc="Practica por tema, rinde examen real y repasa justo las preguntas que mas fallas." />
        <Step n="2" title="Sabe cuando entrar" desc="El calendario te dice el dia y hora en que tu comuna abre nuevas horas." />
        <Step n="3" title="Reserva al instante" desc="Recibe la alerta, abre el enlace directo de tu comuna y agenda antes que se agoten." />
      </section>

      {/* AVISO */}
      <section className="card p-5 text-sm text-amber-200">
        <h2 className="font-semibold text-amber-100">Lee esto antes de empezar</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-200/90">
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
    <div>
      <span className="text-2xl font-bold text-white">{n}</span>{" "}
      <span>{label}</span>
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
        className={`grid h-11 w-11 place-items-center rounded-xl text-2xl ${
          accent === "cyan" ? "bg-neon-cyan/15" : "bg-neon-violet/15"
        }`}
      >
        {emoji}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
      <span className="mt-3 inline-block text-sm text-neon-cyan opacity-0 transition group-hover:opacity-100">
        Abrir →
      </span>
    </Link>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="card p-5">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet font-bold text-ink">
        {n}
      </div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
    </div>
  );
}
