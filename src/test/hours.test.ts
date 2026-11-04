import { describe, it, expect } from "vitest";
import { isOpenAt, slotsFor } from "@/lib/hours";
import { site } from "@/config/site";

// São Paulo is UTC-3
describe("horário de funcionamento", () => {
  it("aberto segunda às 10h", () => {
    expect(isOpenAt(new Date("2026-11-02T13:00:00Z"), site.hours)).toBe(true);
  });
  it("fechado segunda às 20h", () => {
    expect(isOpenAt(new Date("2026-11-02T23:00:00Z"), site.hours)).toBe(false);
  });
  it("fechado sábado às 18h", () => {
    expect(isOpenAt(new Date("2026-11-07T21:00:00Z"), site.hours)).toBe(false);
  });
  it("aberto sábado às 17h", () => {
    expect(isOpenAt(new Date("2026-11-07T20:00:00Z"), site.hours)).toBe(true);
  });
  it("fechado domingo", () => {
    expect(isOpenAt(new Date("2026-11-08T15:00:00Z"), site.hours)).toBe(false);
  });
  it("sábado tem horários de 09:00 a 17:00", () => {
    const s = slotsFor(6, site.hours, 60);
    expect(s[0]).toBe("09:00");
    expect(s[s.length - 1]).toBe("17:00");
  });
});
