// Shared services catalog (client + server safe)
export type Service = {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  category: string;
};

export const SERVICES: Service[] = [
  // Cortes
  { id: "corte-clasico-sin-maquina", name: "Corte clásico sin máquina", price: 11, duration: 30, category: "Cortes" },
  { id: "corte-degradado", name: "Corte degradado con afeitadora o navaja", price: 12, duration: 30, category: "Cortes" },
  { id: "corte-tijera", name: "Corte clásico a tijera", price: 15, duration: 30, category: "Cortes" },
  { id: "corte-premium", name: "Corte premium", price: 20, duration: 60, category: "Cortes" },
  { id: "corte-jubilado", name: "Corte jubilado", price: 11, duration: 20, category: "Cortes" },
  // Packs
  { id: "corte-barba", name: "Corte + barba", price: 15, duration: 40, category: "Packs" },
  { id: "corte-peinado", name: "Corte + peinado", price: 13, duration: 30, category: "Packs" },
  { id: "corte-lavado", name: "Corte + lavado", price: 14, duration: 40, category: "Packs" },
  { id: "corte-peinado-lavado", name: "Corte + peinado + lavado", price: 16, duration: 40, category: "Packs" },
  // Extras
  { id: "arreglo-barba", name: "Arreglo de barba", price: 6, duration: 10, category: "Extras" },
  { id: "arreglo-cejas", name: "Arreglo y perfilado de cejas", price: 3, duration: 10, category: "Extras" },
  { id: "tratamiento-facial", name: "Tratamiento facial", price: 20, duration: 30, category: "Extras" },
  // Niños
  { id: "corte-nino", name: "Corte niño (0-10)", price: 11, duration: 30, category: "Niños" },
  { id: "corte-nino-degradado", name: "Corte niño degradado (0-10)", price: 12, duration: 30, category: "Niños" },
  // Decoloración
  { id: "decoloracion", name: "Decoloración (desde)", price: 30, duration: 180, category: "Decoloración" },
  { id: "color-fantasia", name: "Color fantasía (desde)", price: 30, duration: 120, category: "Decoloración" },
  { id: "mechas", name: "Mechas (desde)", price: 20, duration: 60, category: "Decoloración" },
];

export const NUM_BARBERS = 3;

// Schedule in minutes since 00:00
// Mon-Fri: 9:30-13:30, 16:00-20:00. Sat: 9:30-14:00. Sun: closed.
export function getDaySchedule(dateISO: string): Array<[number, number]> {
  const d = new Date(dateISO + "T00:00:00");
  const day = d.getDay(); // 0 sun .. 6 sat
  if (day === 0) return [];
  if (day === 6) return [[9 * 60 + 30, 14 * 60]];
  return [
    [9 * 60 + 30, 13 * 60 + 30],
    [16 * 60, 20 * 60],
  ];
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function formatTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
