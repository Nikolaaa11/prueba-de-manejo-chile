import Link from "next/link";
import { QUESTIONS } from "@/data/questions";
import { MUNICIPALITIES } from "@/data/municipalities";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-8 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Saca tu licencia de conducir Clase B
        </h1>
        <p className="mt-3 max-w-2xl text-white/90">
          Practica el examen teorico con preguntas basadas en la Ley de Transito 18.290 y
          la senalizacion oficial, y encuentra rapido donde agendar tu hora para la prueba
          de manejo en tu comuna.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/test"
            className="rounded-lg bg-white px-5 py-2.5 font-semibold text-brand hover:bg-white/90"
          >
            Empezar el test teorico
          </Link>
          <Link
            href="/agendamiento"
            className="rounded-lg border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10"
          >
            Buscar donde agendar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          href="/test"
          emoji="📝"
          title="Test teorico"
          desc={`${QUESTIONS.length} preguntas con explicaciones y modo examen cronometrado.`}
        />
        <Card
          href="/agendamiento"
          emoji="📍"
          title="Agendar hora"
          desc={`Directorio de ${MUNICIPALITIES.length} municipalidades, ordenadas por posibilidad de cupo.`}
        />
        <Card
          href="/calendario"
          emoji="📅"
          title="Calendario"
          desc="Cuando libera cupos cada comuna + alertas (.ics) para tu telefono."
        />
        <Card
          href="/monitor"
          emoji="🔔"
          title="Monitor de cupos"
          desc="Revisa la disponibilidad de horas y entiende como funciona el sistema."
        />
      </section>

      <section className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
        <h2 className="font-semibold">Lee esto antes de empezar</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            En Chile cada municipalidad administra su propia agenda. No hay un sistema
            nacional unico para reservar la prueba de manejo.
          </li>
          <li>
            La mayoria de los municipios exige acreditar que vives en la comuna para
            tramitar la licencia ahi.
          </li>
          <li>
            Este sitio te ayuda a estudiar y a encontrar donde agendar, pero el tramite y la
            reserva se hacen en el portal oficial de cada municipio.
          </li>
        </ul>
      </section>
    </div>
  );
}

function Card({
  href,
  emoji,
  title,
  desc,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-black/10 bg-white p-5 transition hover:border-brand hover:shadow-md"
    >
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </Link>
  );
}
