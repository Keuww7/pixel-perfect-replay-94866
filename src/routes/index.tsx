import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site } from "@/config/site";
import {
  BeforeAfter,
  Booking,
  Contact,
  Cursor,
  Footer,
  Hero,
  Marquee,
  Nav,
  Preloader,
  scrollToId,
  Services,
  SmoothScroll,
  Team,
  Testimonials,
  WhatsAppFab,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Barbearia na Zona Sul de São Paulo` },
      {
        name: "description",
        content: `${site.name}: corte, barba na navalha e estilo. Agende pelo WhatsApp.`,
      },
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
        <Booking
          serviceId={serviceId}
          barberId={barberId}
          setServiceId={setServiceId}
          setBarberId={setBarberId}
        />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
