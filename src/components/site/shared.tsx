import type { ReactNode } from "react";
import { site } from "@/config/site";

/** Formata um valor em reais. */
export const brl = (n: number) => `R$ ${n}`;

/** Monta um link de WhatsApp já com a mensagem codificada. */
export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/** Classes do botão principal (dourado). */
export const goldBtn =
  "inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]";

/** Rótulo pequeno que abre cada seção (ex.: "01 — Serviços"). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
      {children}
    </p>
  );
}
