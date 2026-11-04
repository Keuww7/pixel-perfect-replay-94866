import { useRef, useState } from "react";
import { site } from "@/config/site";
import { Reveal } from "./Effects";
import { Eyebrow } from "./shared";

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
          <img
            src={site.images.after}
            alt="Cliente depois do corte"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={site.images.before}
              alt="Cliente antes do corte"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.2em]">
            Antes
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-gold px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground">
            Depois
          </span>
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
