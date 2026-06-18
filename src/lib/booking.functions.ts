import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  SERVICES,
  NUM_BARBERS,
  getDaySchedule,
  minutesToTime,
  timeToMinutes,
  formatTime,
} from "./services";

const ADMIN_PASSWORD = "borja2026";
const SLOT_STEP = 30; // minutes

// ---------- Public: available slots for a date+service ----------
export const getAvailableSlots = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ dateISO: z.string(), serviceId: z.string() }).parse(input),
  )
  .handler(async ({ data }) => {
    const service = SERVICES.find((s) => s.id === data.serviceId);
    if (!service) throw new Error("Servicio no encontrado");

    const schedule = getDaySchedule(data.dateISO);
    if (schedule.length === 0) return { slots: [] as string[] };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: appts, error } = await supabaseAdmin
      .from("appointments")
      .select("start_time, end_time, barber_index, status")
      .eq("appointment_date", data.dateISO)
      .neq("status", "cancelled");
    if (error) throw new Error(error.message);

    const busy: Array<Array<[number, number]>> = Array.from({ length: NUM_BARBERS }, () => []);
    for (const a of appts ?? []) {
      busy[a.barber_index].push([timeToMinutes(a.start_time), timeToMinutes(a.end_time)]);
    }

    const slots: string[] = [];
    for (const [open, close] of schedule) {
      for (let t = open; t + service.duration <= close; t += SLOT_STEP) {
        const end = t + service.duration;
        const free = busy.some((b) => b.every(([bs, be]) => end <= bs || t >= be));
        if (free) slots.push(formatTime(t));
      }
    }
    return { slots };
  });

// ---------- Public: create appointment ----------
export const createAppointment = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        serviceId: z.string(),
        dateISO: z.string(),
        time: z.string().regex(/^\d{2}:\d{2}$/),
        name: z.string().trim().min(2).max(80),
        phone: z.string().trim().min(6).max(20),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const service = SERVICES.find((s) => s.id === data.serviceId);
    if (!service) throw new Error("Servicio no encontrado");

    const schedule = getDaySchedule(data.dateISO);
    if (schedule.length === 0) throw new Error("Día cerrado");

    const startMin = timeToMinutes(data.time + ":00");
    const endMin = startMin + service.duration;
    const insideHours = schedule.some(([o, c]) => startMin >= o && endMin <= c);
    if (!insideHours) throw new Error("Hora fuera de horario");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: appts, error: fetchErr } = await supabaseAdmin
      .from("appointments")
      .select("start_time, end_time, barber_index, status")
      .eq("appointment_date", data.dateISO)
      .neq("status", "cancelled");
    if (fetchErr) throw new Error(fetchErr.message);

    let assigned: number | null = null;
    for (let b = 0; b < NUM_BARBERS; b++) {
      const overlap = (appts ?? [])
        .filter((a) => a.barber_index === b)
        .some((a) => {
          const as = timeToMinutes(a.start_time);
          const ae = timeToMinutes(a.end_time);
          return startMin < ae && endMin > as;
        });
      if (!overlap) {
        assigned = b;
        break;
      }
    }
    if (assigned === null) throw new Error("Sin disponibilidad para esa hora");

    const { error: insertErr } = await supabaseAdmin.from("appointments").insert({
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      service_duration: service.duration,
      appointment_date: data.dateISO,
      start_time: minutesToTime(startMin),
      end_time: minutesToTime(endMin),
      barber_index: assigned,
      customer_name: data.name,
      customer_phone: data.phone,
    });
    if (insertErr) throw new Error(insertErr.message);

    return { ok: true, barberIndex: assigned };
  });

// ---------- Admin (password-gated) ----------
export const adminListAppointments = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) throw new Error("Contraseña incorrecta");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("start_time", { ascending: true });
    if (error) throw new Error(error.message);
    return { appointments: rows ?? [] };
  });

export const adminUpdateStatus = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        password: z.string(),
        id: z.string().uuid(),
        status: z.enum(["confirmed", "cancelled", "completed"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) throw new Error("Contraseña incorrecta");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("appointments")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteAppointment = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ password: z.string(), id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASSWORD) throw new Error("Contraseña incorrecta");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("appointments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
