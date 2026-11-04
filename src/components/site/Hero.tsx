import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { Magnetic, scrollToId } from "./Effects";
import { goldBtn } from "./shared";

function BarberPole({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden>
      <div className="h-5 w-10 rounded-t-full bg-gold" />
      <div className="h-64 w-7 overflow-hidden rounded-sm border border-primary/40 barber-pole md:h-80" />
      <div className="h-5 w-10 rounded-b-full bg-gold" />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const letters = site.heroTitle.split("");
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-24 pt-32 md:px-12"
    >
      {/* TROCAR: foto/vídeo de fundo em site.images.hero */}
      <div className="absolute inset-0 vignette">
        <motion.img
          src={site.images.hero}
          alt="Interior da barbearia com cadeira clássica de couro"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: "easeOut", delay: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      <div className="relative z-10 flex w-full items-end justify-between gap-8">
        <div className="max-w-5xl">
          <motion.p
            className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {site.tagline}
          </motion.p>
          <h1
            className="font-display text-[19vw] font-medium leading-[0.85] md:text-[11vw]"
            aria-label={site.heroTitle}
          >
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
                <motion.span
                  className={`inline-block ${l === " " ? "w-[0.25em]" : ""} ${/\d/.test(l) ? "italic text-gold" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.5 + i * 0.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l === " " ? "\u00A0" : l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            className="mt-10 flex flex-col gap-8 md:flex-row md:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            <Magnetic>
              <button className={goldBtn} onClick={() => scrollToId("agendar")}>
                Agendar horário <span aria-hidden>→</span>
              </button>
            </Magnetic>
            <p className="max-w-sm text-muted-foreground">{site.heroSubtitle}</p>
          </motion.div>
        </div>
        <BarberPole className="hidden lg:flex" />
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Role
        <div className="relative h-10 w-px overflow-hidden bg-foreground/20">
          <motion.div
            className="absolute inset-x-0 top-0 h-4 bg-primary"
            animate={reduce ? {} : { y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
