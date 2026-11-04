import type { site } from "@/config/site";

type Hours = typeof site.hours;

/** Returns weekday and decimal hour in São Paulo time. */
export function spNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return { day: days.indexOf(get("weekday")), hour: (Number(get("hour")) % 24) + Number(get("minute")) / 60 };
}

export function isOpenAt(date: Date, hours: Hours) {
  const { day, hour } = spNow(date);
  const h = hours[day];
  if (!h || h.open === null || h.close === null) return false;
  return hour >= h.open && hour < h.close;
}

export function slotsFor(day: number, hours: Hours, slotMinutes: number) {
  const h = hours[day];
  if (!h || h.open === null || h.close === null) return [];
  const out: string[] = [];
  for (let m = h.open * 60; m + slotMinutes <= h.close * 60; m += slotMinutes) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}
