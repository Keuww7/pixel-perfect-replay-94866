import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site } from "@/config/site";
import { Cursor, Preloader, SmoothScroll, scrollToId } from "@/components/site/Effects";
import { BeforeAfter, Booking, Contact, Footer, Hero, Marquee, Nav, Services, Team, Testimonials, WhatsAppFab } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Barbearia na Zona Sul de São Paulo` },
      { name: "description", content: `${site.name}: corte, barba na navalha e estilo. Agende pelo WhatsApp.` },
      { property: "og:title", content: `${site.name} — Barbearia` },
      { property: "og:description", content: site.heroSubtitle },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null);
  return (
    <div className="grain relative">
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services
          onBook={(s) => {
            setServiceId(s.id);
            scrollToId("agendar");
          }}
        />
        <BeforeAfter />
        <Team
          onBook={(id) => {
            setBarberId(id);
            scrollToId("agendar");
          }}
        />
        <Booking serviceId={serviceId} barberId={barberId} setServiceId={setServiceId} setBarberId={setBarberId} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
