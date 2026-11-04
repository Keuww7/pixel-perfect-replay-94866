import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { site, type Service } from "@/config/site";
import { isOpenAt, slotsFor } from "@/lib/hours";
import { Magnetic, Reveal, scrollToId } from "./Effects";

const brl = (n: number) => `R$ ${n}`;
const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

const goldBtn =
  "inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-gold transition-transform hover:scale-[1.03]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary">{children}</p>;
}

/* ---------------- NAV ---------------- */
export function Nav() {
  const links = [
    ["servicos", "Serviços"],
    ["equipe", "Equipe"],
    ["agendar", "Agendar"],
    ["contato", "Contato"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <button onClick={() => scrollToId("top")} className="font-display text-2xl italic text-gold" aria-label={site.name}>
        {site.monogram}
      </button>
      <nav className="hidden gap-10 text-xs uppercase tracking-[0.25em] md:flex">
        {links.map(([id, label]) => (
          <button key={id} onClick={() => scrollToId(id)} className="text-foreground/80 transition-colors hover:text-primary">
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

/* ---------------- HERO ---------------- */
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
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-24 pt-32 md:px-12">
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
          <h1 className="font-display text-[19vw] font-medium leading-[0.85] md:text-[11vw]" aria-label={site.heroTitle}>
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
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
export function Marquee() {
  const row = Array.from({ length: 4 }, () => site.marquee).flat();
  return (
    <div className="overflow-hidden border-y border-border py-8" aria-hidden>
      <div className="flex w-max marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((w, i) => (
              <span key={i} className="flex items-center font-display text-5xl md:text-7xl">
                <span className={i % 2 ? "italic text-gold" : ""}>{w}</span>
                <span className="mx-8 text-primary">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SERVICES ---------------- */
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
                      <img src={s.image} alt={s.name} loading="lazy" className="h-28 w-24 rounded-sm object-cover" />
                      <div className="flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                        <button onClick={() => onBook(s)} className="text-left text-xs uppercase tracking-[0.2em] text-primary">
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

/* ---------------- BEFORE / AFTER ---------------- */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <Eyebrow>02 — Antes e depois</Eyebrow>
        <h2 className="mb-16 text-5xl leading-none md:text-8xl">
          A diferença <em className="text-gold">é visível.</em>
        </h2>
      </Reveal>
      <Reveal>
        {/* TROCAR: fotos em site.images.before / site.images.after */}
        <div
          ref={ref}
          className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm md:aspect-[16/8]"
          onPointerDown={(e) => {
            dragging.current = true;
            update(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
          style={{ touchAction: "pan-y" }}
          data-cursor
        >
          <img src={site.images.after} alt="Cliente depois do corte" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={site.images.before} alt="Cliente antes do corte" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.2em]">Antes</span>
          <span className="absolute right-4 top-4 rounded-full bg-gold px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground">Depois</span>
          <div className="absolute inset-y-0 w-px bg-primary" style={{ left: `${pos}%` }}>
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold">
              ⟷
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar antes e depois"
            className="absolute inset-x-0 bottom-0 h-1 w-full opacity-0 focus:opacity-100"
          />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- TEAM ---------------- */
export function Team({ onBook }: { onBook: (barberId: string) => void }) {
  return (
    <section id="equipe" className="px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <Eyebrow>03 — Equipe</Eyebrow>
        <h2 className="mb-16 text-5xl leading-none md:text-8xl">
          Mãos <em className="text-gold">de mestre.</em>
        </h2>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-3">
        {site.team.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.12}>
            <article className="group">
              {/* TROCAR: foto do barbeiro em site.team[].photo */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm vignette">
                <img
                  src={b.photo}
                  alt={`Retrato de ${b.name}`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <h3 className="mt-6 text-3xl">{b.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.role}</p>
              <button
                onClick={() => onBook(b.id)}
                className="mt-5 border-b border-primary pb-1 text-xs uppercase tracking-[0.25em] text-primary transition-opacity hover:opacity-70"
              >
                Agendar com ele →
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BOOKING ---------------- */
export function Booking({
  serviceId,
  barberId,
  setServiceId,
  setBarberId,
}: {
  serviceId: string | null;
  barberId: string | null;
  setServiceId: (v: string) => void;
  setBarberId: (v: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (serviceId && barberId) setStep((s) => Math.max(s, 2));
    else if (serviceId) setStep((s) => Math.max(s, 1));
  }, [serviceId, barberId]);

  const days = useMemo(() => {
    const out: Date[] = [];
    const now = new Date();
    for (let i = 0; i < 21 && out.length < site.bookingDaysAhead; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      if (site.hours[d.getDay()].open !== null) out.push(d);
    }
    return out;
  }, []);

  const service = site.services.find((s) => s.id === serviceId);
  const barber = site.team.find((b) => b.id === barberId);
  const slots = date ? slotsFor(date.getDay(), site.hours, site.slotMinutes) : [];
  const fmtDate = (d: Date) => d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" });

  const message =
    service && barber && date && time
      ? `Olá, ${site.name}! Quero agendar:\n✂️ Serviço: ${service.name} (${brl(service.price)})\n💈 Barbeiro: ${barber.name}\n📅 Dia: ${fmtDate(date)}\n🕐 Horário: ${time}`
      : "";

  const steps = ["Serviço", "Barbeiro", "Dia e horário"];
  const chip = (on: boolean) =>
    `rounded-sm border px-5 py-4 text-left transition-colors ${on ? "border-primary bg-primary/10" : "border-border hover:border-primary/60"}`;

  return (
    <section id="agendar" className="px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow>04 — Agendamento</Eyebrow>
          <h2 className="mb-12 text-5xl leading-none md:text-8xl">
            Seu horário, <em className="text-gold">em 3 passos.</em>
          </h2>
        </Reveal>

        <ol className="mb-12 flex gap-2" aria-label="Etapas">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <button
                onClick={() => i <= step && setStep(i)}
                className={`w-full border-t-2 pt-3 text-left text-xs uppercase tracking-[0.2em] ${
                  i <= step ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
                aria-current={i === step ? "step" : undefined}
              >
                0{i + 1} · {s}
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {site.services.map((s) => (
                  <button
                    key={s.id}
                    className={chip(serviceId === s.id)}
                    onClick={() => {
                      setServiceId(s.id);
                      setStep(1);
                    }}
                  >
                    <span className="flex justify-between font-display text-2xl">
                      {s.name} <span className="text-primary">{brl(s.price)}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{s.desc}</span>
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {site.team.map((b) => (
                  <button
                    key={b.id}
                    className={`${chip(barberId === b.id)} flex items-center gap-4`}
                    onClick={() => {
                      setBarberId(b.id);
                      setStep(2);
                    }}
                  >
                    <img src={b.photo} alt="" loading="lazy" className="h-16 w-14 rounded-sm object-cover" />
                    <span>
                      <span className="block font-display text-xl">{b.name}</span>
                      <span className="text-xs text-muted-foreground">{b.role}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="-mx-6 mb-8 flex gap-3 overflow-x-auto px-6 pb-2" role="listbox" aria-label="Dia">
                  {days.map((d) => {
                    const on = date?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        role="option"
                        aria-selected={on}
                        onClick={() => {
                          setDate(d);
                          setTime(null);
                        }}
                        className={`${chip(on)} min-w-[88px] shrink-0 text-center`}
                      >
                        <span className="block text-xs uppercase text-muted-foreground">
                          {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                        </span>
                        <span className="font-display text-3xl">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
                {date ? (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {slots.map((t) => (
                      <button key={t} className={`${chip(time === t)} text-center`} onClick={() => setTime(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Escolha um dia para ver os horários.</p>
                )}

                {message && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 rounded-sm border border-primary/40 bg-card p-8">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">Sua mensagem</p>
                    <pre className="whitespace-pre-wrap font-sans text-foreground/90">{message}</pre>
                    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`${goldBtn} mt-8`}>
                      Enviar no WhatsApp →
                    </a>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const list = site.testimonials;
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [list.length, reduce]);
  const t = list[i];
  return (
    <section className="border-y border-border px-6 py-32 text-center md:px-12 md:py-48" aria-roledescription="carrossel">
      <Eyebrow>05 — Clientes</Eyebrow>
      <div className="mx-auto min-h-[260px] max-w-4xl" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
            <div className="mb-8 text-2xl tracking-[0.3em] text-primary" aria-label={`${t.stars} de 5 estrelas`}>
              {"★".repeat(t.stars)}
            </div>
            <blockquote className="font-display text-3xl italic leading-tight md:text-5xl">“{t.text}”</blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.25em] text-muted-foreground">{t.name}</figcaption>
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

/* ---------------- CONTACT ---------------- */
export function Contact() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      setOpen(isOpenAt(new Date(), site.hours));
      setToday(new Date().getDay());
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <section id="contato" className="px-6 py-32 md:px-12 md:py-48">
      <Reveal>
        <Eyebrow>06 — Contato</Eyebrow>
        <h2 className="mb-16 text-5xl leading-none md:text-8xl">
          Passa <em className="text-gold">aqui.</em>
        </h2>
      </Reveal>
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          {open !== null && (
            <p className={`mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2 text-sm ${open ? "border-success text-success" : "border-destructive text-destructive"}`}>
              <span className={`h-2 w-2 animate-pulse rounded-full ${open ? "bg-success" : "bg-destructive"}`} />
              {open ? "Aberto agora" : "Fechado agora"}
            </p>
          )}
          <dl className="mb-10">
            {order.map((d) => {
              const h = site.hours[d];
              return (
                <div key={d} className={`flex justify-between border-b border-border py-3 ${today === d ? "text-primary" : ""}`}>
                  <dt>{h.day}</dt>
                  <dd className={h.open === null ? "text-muted-foreground" : ""}>{h.open === null ? "Fechado" : `${h.open}h às ${h.close}h`}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mb-2 text-muted-foreground">{site.address}</p>
          <p className="mb-8 text-muted-foreground">{site.whatsappDisplay}</p>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em]">
            <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">
              Instagram @{site.instagram}
            </a>
            <a href={waLink(`Olá, ${site.name}!`)} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">
              WhatsApp
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <iframe
            title={`Mapa — ${site.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
            loading="lazy"
            className="h-[420px] w-full rounded-sm border border-border grayscale invert-[0.9] hue-rotate-180"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer className="overflow-hidden px-6 pb-10 pt-20 md:px-12">
      <p className="font-display text-[22vw] leading-none tracking-tight">
        Navalha<span className="italic text-gold">21</span>
      </p>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.address}</span>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={waLink(`Olá, ${site.name}! Quero agendar um horário.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-gold md:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" />
      </svg>
    </a>
  );
}
