import { useState, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Calendar as CalIcon, Check, Clock, Scissors, User } from "lucide-react";
import { SERVICES, getDaySchedule, type Service } from "@/lib/services";
import { createAppointment, getAvailableSlots } from "@/lib/booking.functions";

type Step = 1 | 2 | 3 | 4 | 5;

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function formatLongDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingSection() {
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<Service | null>(null);
  const [dateISO, setDateISO] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useServerFn(getAvailableSlots);
  const create = useServerFn(createAppointment);

  const categories = useMemo(() => {
    const map = new Map<string, Service[]>();
    SERVICES.forEach((s) => {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    });
    return Array.from(map.entries());
  }, []);

  // Calendar: next 30 days
  const days = useMemo(() => {
    const arr: { iso: string; label: string; weekday: string; closed: boolean }[] = [];
    for (let i = 0; i < 30; i++) {
      const iso = todayISO(i);
      const d = new Date(iso + "T00:00:00");
      arr.push({
        iso,
        label: String(d.getDate()),
        weekday: d.toLocaleDateString("es-ES", { weekday: "short" }),
        closed: getDaySchedule(iso).length === 0,
      });
    }
    return arr;
  }, []);

  async function pickDate(iso: string) {
    if (!service) return;
    setDateISO(iso);
    setTime(null);
    setSlots(null);
    setStep(3);
    setLoading(true);
    setError(null);
    try {
      const r = await fetchSlots({ data: { dateISO: iso, serviceId: service.id } });
      setSlots(r.slots);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function submit() {
    if (!service || !dateISO || !time) return;
    setLoading(true);
    setError(null);
    try {
      await create({ data: { serviceId: service.id, dateISO, time, name, phone } });
      setStep(5);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al reservar");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(1);
    setService(null);
    setDateISO(null);
    setTime(null);
    setName("");
    setPhone("");
    setSlots(null);
    setError(null);
  }

  return (
    <section id="reservar" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reserva online</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Reserva tu cita <span className="italic">en 4 pasos</span>
          </h2>
        </div>

        {/* Stepper */}
        <div className="mt-12 flex items-center justify-center gap-2 md:gap-4">
          {[
            { n: 1, label: "Servicio", icon: Scissors },
            { n: 2, label: "Día", icon: CalIcon },
            { n: 3, label: "Hora", icon: Clock },
            { n: 4, label: "Datos", icon: User },
          ].map(({ n, label, icon: Icon }) => {
            const active = step === n;
            const done = step > n || step === 5;
            return (
              <div key={n} className="flex items-center gap-2 md:gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                    done
                      ? "border-foreground bg-foreground text-background"
                      : active
                        ? "border-foreground bg-background text-foreground"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={`hidden text-sm md:inline ${active ? "font-medium" : "text-muted-foreground"}`}>
                  {label}
                </span>
                {n < 4 && <div className="h-px w-6 bg-border md:w-10" />}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-deep md:p-10">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl">Elige el servicio</h3>
              <div className="mt-6 space-y-8">
                {categories.map(([cat, items]) => (
                  <div key={cat}>
                    <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{cat}</div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {items.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setService(s);
                            setStep(2);
                          }}
                          className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-background p-4 text-left transition hover:border-foreground"
                        >
                          <div>
                            <div className="font-medium">{s.name}</div>
                            <div className="mt-1 text-xs text-muted-foreground">{s.duration} min</div>
                          </div>
                          <div className="font-display text-lg">{s.price}€</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && service && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">Elige el día</h3>
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Cambiar servicio
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.name} · {service.duration} min · {service.price}€
              </p>
              <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    disabled={d.closed}
                    onClick={() => pickDate(d.iso)}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-sm transition ${
                      d.closed
                        ? "cursor-not-allowed border-border bg-background/50 text-muted-foreground/40"
                        : "border-border bg-background hover:border-foreground"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.weekday}</span>
                    <span className="font-display text-xl">{d.label}</span>
                    {d.closed && <span className="text-[9px] uppercase text-muted-foreground/60">cerrado</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && service && dateISO && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">Elige la hora</h3>
                <button onClick={() => setStep(2)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Cambiar día
                </button>
              </div>
              <p className="mt-2 text-sm capitalize text-muted-foreground">{formatLongDate(dateISO)}</p>

              {loading && <div className="mt-8 text-center text-sm text-muted-foreground">Cargando horarios disponibles…</div>}
              {error && <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

              {!loading && slots && slots.length === 0 && (
                <div className="mt-8 rounded-lg border border-border bg-background p-6 text-center text-sm text-muted-foreground">
                  No hay horas disponibles este día. Prueba con otra fecha.
                </div>
              )}

              {!loading && slots && slots.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTime(t);
                        setStep(4);
                      }}
                      className="rounded-lg border border-border bg-background px-3 py-3 text-sm font-medium transition hover:border-foreground"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && service && dateISO && time && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">Tus datos</h3>
                <button onClick={() => setStep(3)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Cambiar hora
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-border bg-background p-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Servicio</span><span>{service.name}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Día</span><span className="capitalize">{formatLongDate(dateISO)}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Hora</span><span>{time}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Precio</span><span className="font-display">{service.price}€</span></div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Nombre completo</label>
                  <input
                    required
                    minLength={2}
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                    placeholder="Ej: Juan García"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Teléfono</label>
                  <input
                    required
                    type="tel"
                    minLength={6}
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                    placeholder="Ej: 600 123 456"
                  />
                </div>

                {error && <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-medium text-background transition disabled:opacity-50"
                >
                  {loading ? "Reservando…" : "Confirmar reserva"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 5: confirmation */}
          {step === 5 && service && dateISO && time && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-3xl">¡Cita confirmada!</h3>
              <p className="mt-3 text-muted-foreground">
                Hemos reservado tu <span className="font-medium text-foreground">{service.name}</span> el{" "}
                <span className="capitalize text-foreground">{formatLongDate(dateISO)}</span> a las{" "}
                <span className="text-foreground">{time}</span>.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Te esperamos en el local. Si necesitas cambiarla, llámanos.</p>
              <button
                onClick={reset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/40 px-6 py-3 text-sm font-medium hover:bg-foreground/5"
              >
                Reservar otra cita
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
