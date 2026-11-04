import { site } from "@/config/site";

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
