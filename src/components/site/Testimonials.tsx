import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { Eyebrow } from "./shared";

export function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const list = site.testimonials;
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [list.length, reduce]);
  const t = list[i]!;
  return (
    <section
      className="border-y border-border px-6 py-32 text-center md:px-12 md:py-48"
      aria-roledescription="carrossel"
    >
      <Eyebrow>05 — Clientes</Eyebrow>
      <div className="mx-auto min-h-[260px] max-w-4xl" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="mb-8 text-2xl tracking-[0.3em] text-primary"
              aria-label={`${t.stars} de 5 estrelas`}
            >
              {"★".repeat(t.stars)}
            </div>
            <blockquote className="font-display text-3xl italic leading-tight md:text-5xl">
              “{t.text}”
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {t.name}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        {list.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Depoimento ${k + 1}`}
            className={`h-1 rounded-full transition-all ${k === i ? "w-10 bg-primary" : "w-4 bg-foreground/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
