# 🚗 Licencia Chile — Prepara tu prueba de manejo

Plataforma web (Next.js) para **estudiar el examen teórico de licencia de conducir Clase B en Chile** y **encontrar dónde agendar tu hora para la prueba de manejo**. Lista para desplegar en **Vercel**.

> ⚠️ **Aviso importante.** Este es un proyecto educativo de código abierto. **No es un sitio oficial** del Estado de Chile ni de ninguna municipalidad. El contenido del test se basa en la Ley de Tránsito 18.290 y material de CONASET, pero puede contener errores: verifica siempre la normativa vigente en [conaset.cl](https://www.conaset.cl) y [bcn.cl](https://www.bcn.cl).

## Qué incluye

| Módulo | Descripción |
| --- | --- |
| **Test teórico** (`/test`) | 95 preguntas Clase B con explicaciones y referencia legal. Modo *práctica* (feedback inmediato + filtro por tema) y modo *examen* (20 preguntas al azar, **temporizador real** y resultado al final). Tus **estadísticas** (mejor puntaje, intentos) se guardan en el navegador. |
| **Agendar hora** (`/agendamiento`) | Directorio de Direcciones de Tránsito municipales con dominios **verificados**, enlaces directos confirmados (y búsqueda oficial de respaldo), modalidad, requisitos y documentos. Buscador por comuna/región. |
| **Monitor de cupos** (`/monitor` + `/api/monitor`) | Revisa la disponibilidad aproximada leyendo las páginas municipales (solo comunas con página directa verificada), con patrón de adaptadores. Incluye cron de Vercel y notificaciones opcionales por webhook. |

## La verdad sobre "conseguir hora rápido"

No te quiero vender humo. En Chile:

- **No existe un sistema nacional único** para agendar la prueba de manejo. **Cada municipalidad** administra su propia agenda (su propio sitio, su propio software).
- **No hay una API pública oficial** de cupos. La única vía "automática" es leer el HTML de cada sitio municipal (*scraping*), lo cual es **frágil** (se rompe si el municipio cambia su web) y puede **violar los términos de uso** de algunos sitios.
- La mayoría de los municipios **exige acreditar residencia** en la comuna.

Por eso este proyecto prioriza lo que **sí** ayuda de verdad y de forma sostenible:

1. **Estudiar bien** para aprobar a la primera (lo que más tiempo ahorra).
2. **Un directorio** que te lleva en un clic al portal correcto de tu comuna.
3. **Un monitor honesto** que da indicios de disponibilidad, dejando claro cuándo no puede determinarlo, y que puede avisarte por webhook — sin pretender reservar automáticamente por ti.

> Sobre la **auto-reserva** automática: no se incluye un bot que reserve por ti. Hacerlo de forma genérica no es confiable (cada municipio es distinto) y puede infringir los términos de uso de los portales. La arquitectura de adaptadores en `src/lib/monitor.ts` es el punto por donde extenderías, bajo tu responsabilidad y respetando cada sitio.

## Desarrollo local

Requisitos: Node.js 18.18+ (probado con Node 22).

```bash
npm install
npm run dev
# abre http://localhost:3000
```

Build de producción:

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Sube este proyecto a GitHub (ver más abajo).
2. Entra a [vercel.com](https://vercel.com) → **Add New… → Project** → importa el repo.
3. Framework: **Next.js** (autodetectado). No requiere configuración extra.
4. **Deploy**.

El archivo [`vercel.json`](./vercel.json) define un **cron** que llama a `/api/monitor` una vez al día (mediodía UTC):

```json
{ "crons": [{ "path": "/api/monitor", "schedule": "0 12 * * *" }] }
```

> **Plan Hobby (gratis):** Vercel solo permite cron jobs **diarios**. Por eso el schedule es `0 12 * * *` (una vez al día). Si tienes plan **Pro**, puedes cambiarlo a `*/30 * * * *` (cada 30 min) u otra frecuencia. Si no quieres cron, borra `vercel.json`; el monitor seguirá funcionando manualmente desde la página `/monitor`.

### Notificaciones cuando aparezcan cupos (opcional)

Define en Vercel (**Settings → Environment Variables**) la variable:

- `NOTIFY_WEBHOOK_URL` — una URL que reciba un `POST` con JSON. Sirve un webhook de Slack, Telegram (vía bot), Discord, o cualquier endpoint propio.

Cuando el cron detecte posibles cupos, hará un `POST` con `{ text, disponibles }` a esa URL.

## Cómo extender

### Agregar tu comuna al directorio
Edita [`src/data/municipalities.ts`](./src/data/municipalities.ts) y añade un objeto al arreglo `MUNICIPALITIES`.

### Agregar/editar preguntas del test
Edita [`src/data/questions.ts`](./src/data/questions.ts). Cada pregunta tiene `question`, `options`, `answer` (índice de la correcta), `explanation` y `reference`.

### Mejorar la detección de cupos de un municipio
En [`src/lib/monitor.ts`](./src/lib/monitor.ts), agrega una función al registro `ADAPTERS` con el `id` del municipio. Recibe el HTML de la página y devuelve `true`/`false`/`null`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Plataforma licencia de conducir Chile: test teorico + agendamiento + monitor"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

(O usa `gh repo create` si tienes la CLI de GitHub instalada.)

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18
- TypeScript
- Tailwind CSS

## Licencia

MIT. Úsalo, modifícalo y compártelo. Las marcas y sitios municipales pertenecen a sus respectivos titulares.
