import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { isOpenAt } from "@/lib/hours";
import { Reveal } from "./Effects";
import { Eyebrow, waLink } from "./shared";

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
            <p
              className={`mb-8 inline-flex items-center gap-3 rounded-full border px-5 py-2 text-sm ${open ? "border-success text-success" : "border-destructive text-destructive"}`}
            >
              <span
                className={`h-2 w-2 animate-pulse rounded-full ${open ? "bg-success" : "bg-destructive"}`}
              />
              {open ? "Aberto agora" : "Fechado agora"}
            </p>
          )}
          <dl className="mb-10">
            {order.map((d) => {
              const h = site.hours[d]!;
              return (
                <div
                  key={d}
                  className={`flex justify-between border-b border-border py-3 ${today === d ? "text-primary" : ""}`}
                >
                  <dt>{h.day}</dt>
                  <dd className={h.open === null ? "text-muted-foreground" : ""}>
                    {h.open === null ? "Fechado" : `${h.open}h às ${h.close}h`}
                  </dd>
                </div>
              );
            })}
          </dl>
          <p className="mb-2 text-muted-foreground">{site.address}</p>
          <p className="mb-8 text-muted-foreground">{site.whatsappDisplay}</p>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em]">
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-primary pb-1 text-primary"
            >
              Instagram @{site.instagram}
            </a>
            <a
              href={waLink(`Olá, ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-primary pb-1 text-primary"
            >
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
