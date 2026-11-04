import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { site, type Service } from "@/config/site";
import { Reveal } from "./Effects";
import { brl, Eyebrow } from "./shared";

export function Services({ onBook }: { onBook: (s: Service) => void }) {
  const [active, setActive] = useState<Service | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 25 });
  const sy = useSpring(y, { stiffness: 250, damping: 25 });

  return (
    <section id="servicos" className="relative px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <Eyebrow>01 — Serviços</Eyebrow>
        <h2 className="mb-20 max-w-3xl text-5xl leading-none md:text-8xl">
          O ofício, <em className="text-gold">sem pressa.</em>
        </h2>
      </Reveal>

      {/* Desktop */}
      <ul
        className="hidden md:block"
        onMouseMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onMouseLeave={() => setActive(null)}
      >
        {site.services.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <li
              onMouseEnter={() => setActive(s)}
              className={`group flex cursor-pointer items-baseline justify-between border-t border-border py-10 transition-all duration-500 last:border-b ${
                active && active.id !== s.id ? "opacity-30" : ""
              }`}
              onClick={() => onBook(s)}
              data-cursor
            >
              <span className="flex items-baseline gap-8">
                <span className="text-sm text-muted-foreground">0{i + 1}</span>
                <span className="font-display text-6xl transition-transform duration-500 group-hover:translate-x-4 lg:text-7xl">
                  {s.name}
                </span>
              </span>
              <span className="text-sm text-muted-foreground">{s.desc}</span>
            </li>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative h-72 w-56 overflow-hidden rounded-sm vignette">
              <img src={active.image} alt="" className="h-full w-full object-cover" />
            </div>
            <span className="absolute -bottom-5 -right-8 rounded-full bg-gold px-5 py-3 font-display text-2xl text-primary-foreground">
              {brl(active.price)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile accordion */}
      <ul className="md:hidden">
        {site.services.map((s) => {
          const isOpen = open === s.id;
          return (
            <li key={s.id} className="border-t border-border last:border-b">
              <button
                className="flex w-full items-center justify-between py-6 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.id)}
              >
                <span className="font-display text-4xl">{s.name}</span>
                <span className="text-primary">{brl(s.price)}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-4 pb-6">
                      <img
                        src={s.image}
                        alt={s.name}
                        loading="lazy"
                        className="h-28 w-24 rounded-sm object-cover"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                        <button
                          onClick={() => onBook(s)}
                          className="text-left text-xs uppercase tracking-[0.2em] text-primary"
                        >
                          Agendar →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
