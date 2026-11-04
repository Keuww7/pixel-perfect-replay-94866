import { site } from "@/config/site";
import { scrollToId } from "./Effects";

const links: [string, string][] = [
  ["servicos", "Serviços"],
  ["equipe", "Equipe"],
  ["agendar", "Agendar"],
  ["contato", "Contato"],
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <button
        onClick={() => scrollToId("top")}
        className="font-display text-2xl italic text-gold"
        aria-label={site.name}
      >
        {site.monogram}
      </button>
      <nav className="hidden gap-10 text-xs uppercase tracking-[0.25em] md:flex">
        {links.map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            className="text-foreground/80 transition-colors hover:text-primary"
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
