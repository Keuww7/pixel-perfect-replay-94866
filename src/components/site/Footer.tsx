import { site } from "@/config/site";

export function Footer() {
  // Última palavra do nome em itálico dourado (ex.: "Navalha" + "21").
  const parts = site.name.trim().split(/\s+/);
  const accent = parts.pop();
  const head = parts.join(" ");
  return (
    <footer className="overflow-hidden px-6 pb-10 pt-20 md:px-12">
      <p className="font-display text-[22vw] leading-none tracking-tight">
        {head}
        {head && " "}
        <span className="italic text-gold">{accent}</span>
      </p>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.address}</span>
      </div>
    </footer>
  );
}
