// Efectos de sonido generados con la Web Audio API.
//
// No se cargan archivos externos: todos los sonidos se sintetizan con osciladores, asi
// el sitio sigue funcionando offline (PWA) y no hay assets que descargar.
//
// Los navegadores exigen un gesto del usuario antes de reproducir audio, por eso el
// AudioContext se crea de forma perezosa en la primera llamada (que siempre nace de un
// click) y se reanuda si quedo suspendido.

let ctx: AudioContext | null = null;
let muted = false;

const MUTE_KEY = "licencia-chile-sfx-muted";

export function loadMuted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    muted = window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    muted = false;
  }
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function isMuted(): boolean {
  return muted;
}

function audio(): AudioContext | null {
  if (muted || typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface ToneOptions {
  freq: number;
  /** segundos desde ahora */
  at?: number;
  duration?: number;
  type?: OscillatorType;
  gain?: number;
  /** desliza hasta esta frecuencia durante la nota */
  slideTo?: number;
}

function tone({
  freq,
  at = 0,
  duration = 0.18,
  type = "triangle",
  gain = 0.18,
  slideTo,
}: ToneOptions) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + at;
  const osc = ac.createOscillator();
  const vol = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo !== undefined) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);

  // Envolvente sencilla para evitar los "clicks" de encendido/apagado.
  vol.gain.setValueAtTime(0.0001, t0);
  vol.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(vol);
  vol.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Respuesta correcta: dos notas ascendentes. */
export function playCorrect() {
  tone({ freq: 660, duration: 0.11, gain: 0.14 });
  tone({ freq: 990, at: 0.1, duration: 0.16, gain: 0.14 });
}

/** Respuesta incorrecta: zumbido grave y corto. */
export function playWrong() {
  tone({ freq: 200, duration: 0.22, type: "sawtooth", gain: 0.1, slideTo: 120 });
}

/** Giro de la ruleta: chasquido breve (se llama muchas veces seguidas). */
export function playTick(step: number) {
  tone({
    freq: 420 + (step % 6) * 55,
    duration: 0.035,
    type: "square",
    gain: 0.05,
  });
}

/** Fanfarria de "empieza el desafio". */
export function playFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // Do - Mi - Sol - Do
  notes.forEach((f, i) =>
    tone({ freq: f, at: i * 0.13, duration: 0.22, type: "triangle", gain: 0.2 })
  );
  tone({ freq: 1046.5, at: 0.55, duration: 0.5, type: "triangle", gain: 0.22 });
  tone({ freq: 1567.98, at: 0.55, duration: 0.5, type: "sine", gain: 0.12 });
}

/** Cuenta regresiva 3-2-1 antes de arrancar el reloj. */
export function playCountdownBeep(last: boolean) {
  tone({
    freq: last ? 880 : 440,
    duration: last ? 0.4 : 0.14,
    type: "square",
    gain: 0.16,
  });
}

/** Aviso de tiempo (quedan 5 min / 1 min). */
export function playWarning() {
  tone({ freq: 700, duration: 0.14, type: "square", gain: 0.15 });
  tone({ freq: 700, at: 0.2, duration: 0.14, type: "square", gain: 0.15 });
}

/** Se acabo el tiempo. */
export function playTimeUp() {
  tone({ freq: 440, duration: 0.5, type: "sawtooth", gain: 0.18, slideTo: 110 });
}

/** Resultado aprobado. */
export function playWin() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((f, i) =>
    tone({ freq: f, at: i * 0.11, duration: 0.3, type: "triangle", gain: 0.18 })
  );
}

/** Resultado reprobado. */
export function playLose() {
  [392, 349.23, 293.66].forEach((f, i) =>
    tone({ freq: f, at: i * 0.18, duration: 0.35, type: "sawtooth", gain: 0.14 })
  );
}
