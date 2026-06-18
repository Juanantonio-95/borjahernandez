import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Lock, RefreshCw, Trash2, X, Check } from "lucide-react";
import {
  adminListAppointments,
  adminUpdateStatus,
  adminDeleteAppointment,
} from "@/lib/booking.functions";

type Appt = {
  id: string;
  service_name: string;
  service_price: number;
  service_duration: number;
  appointment_date: string;
  start_time: string;
  end_time: string;
  barber_index: number;
  customer_name: string;
  customer_phone: string;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Acceso equipo · Borja Hernández" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [appts, setAppts] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const list = useServerFn(adminListAppointments);
  const update = useServerFn(adminUpdateStatus);
  const del = useServerFn(adminDeleteAppointment);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await list({ data: { password } });
      setAppts(r.appointments as Appt[]);
      setAuthed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const r = await list({ data: { password } });
      setAppts(r.appointments as Appt[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id: string, status: "confirmed" | "cancelled" | "completed") {
    await update({ data: { password, id, status } });
    await refresh();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta cita?")) return;
    await del({ data: { password, id } });
    await refresh();
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-deep">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-center font-display text-2xl">Acceso equipo</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Introduce la contraseña para gestionar las citas.</p>

          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-6 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          {error && <div className="mt-3 text-sm text-destructive">{error}</div>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50"
          >
            {loading ? "Comprobando…" : "Entrar"}
          </button>
          <Link to="/" className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Volver a la web
          </Link>
        </form>
      </div>
    );
  }

  const grouped = appts.reduce<Record<string, Appt[]>>((acc, a) => {
    (acc[a.appointment_date] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-secondary py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Citas</h1>
            <p className="text-sm text-muted-foreground">{appts.length} reservas en total</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-foreground">
              <RefreshCw className="h-4 w-4" /> Actualizar
            </button>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
              <ArrowLeft className="h-4 w-4" /> Web
            </Link>
          </div>
        </div>

        {appts.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
            No hay citas todavía.
          </div>
        )}

        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([date, list]) => (
            <div key={date}>
              <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {new Date(date + "T00:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </h2>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-xs uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">Hora</th>
                      <th className="px-4 py-3 text-left">Cliente</th>
                      <th className="px-4 py-3 text-left">Servicio</th>
                      <th className="hidden px-4 py-3 text-left md:table-cell">Barbero</th>
                      <th className="px-4 py-3 text-left">Estado</th>
                      <th className="px-4 py-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((a) => (
                      <tr key={a.id} className="border-t border-border align-top">
                        <td className="px-4 py-3 font-medium">{a.start_time.slice(0, 5)}–{a.end_time.slice(0, 5)}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium">{a.customer_name}</div>
                          <a href={`tel:${a.customer_phone}`} className="text-xs text-muted-foreground hover:text-foreground">{a.customer_phone}</a>
                        </td>
                        <td className="px-4 py-3">
                          <div>{a.service_name}</div>
                          <div className="text-xs text-muted-foreground">{a.service_price}€ · {a.service_duration} min</div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">#{a.barber_index + 1}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-1 text-xs ${
                            a.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                            a.status === "completed" ? "bg-foreground/10 text-foreground" :
                            "bg-foreground text-background"
                          }`}>
                            {a.status === "confirmed" ? "Confirmada" : a.status === "cancelled" ? "Cancelada" : "Completada"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            {a.status !== "completed" && (
                              <button title="Marcar completada" onClick={() => setStatus(a.id, "completed")} className="rounded-md border border-border p-2 hover:border-foreground">
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {a.status !== "cancelled" && (
                              <button title="Cancelar" onClick={() => setStatus(a.id, "cancelled")} className="rounded-md border border-border p-2 hover:border-foreground">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button title="Eliminar" onClick={() => remove(a.id)} className="rounded-md border border-border p-2 text-destructive hover:border-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
