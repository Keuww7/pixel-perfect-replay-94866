import { site } from "@/config/site";
import { Reveal } from "./Effects";
import { Eyebrow } from "./shared";

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
