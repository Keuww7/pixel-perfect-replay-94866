import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { slotsFor } from "@/lib/hours";
import { Reveal } from "./Effects";
import { brl, Eyebrow, goldBtn, waLink } from "./shared";

type BookingProps = {
  serviceId: string | null;
  barberId: string | null;
  setServiceId: (v: string) => void;
  setBarberId: (v: string) => void;
};

export function Booking({ serviceId, barberId, setServiceId, setBarberId }: BookingProps) {
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
      if (site.hours[d.getDay()]?.open !== null) out.push(d);
    }
    return out;
  }, []);

  const service = site.services.find((s) => s.id === serviceId);
  const barber = site.team.find((b) => b.id === barberId);
  const slots = date ? slotsFor(date.getDay(), site.hours, site.slotMinutes) : [];
  const fmtDate = (d: Date) =>
    d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit" });

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
                    <img
                      src={b.photo}
                      alt=""
                      loading="lazy"
                      className="h-16 w-14 rounded-sm object-cover"
                    />
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
                <div
                  className="-mx-6 mb-8 flex gap-3 overflow-x-auto px-6 pb-2"
                  role="listbox"
                  aria-label="Dia"
                >
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
                      <button
                        key={t}
                        className={`${chip(time === t)} text-center`}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Escolha um dia para ver os horários.</p>
                )}

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 rounded-sm border border-primary/40 bg-card p-8"
                  >
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">
                      Sua mensagem
                    </p>
                    <pre className="whitespace-pre-wrap font-sans text-foreground/90">
                      {message}
                    </pre>
                    <a
                      href={waLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${goldBtn} mt-8`}
                    >
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
