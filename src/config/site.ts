/**
 * ============================================================
 *  CONFIGURAÇÃO DO CLIENTE — troque tudo aqui por barbearia.
 *  Fotos: substitua os arquivos em src/assets/ (mesmo nome)
 *  ou troque os imports abaixo pelas fotos reais do cliente.
 * ============================================================
 */
import hero from "@/assets/hero.webp"; // TROCAR: foto do ambiente
import barber1 from "@/assets/barber-1.webp"; // TROCAR: foto do barbeiro 1
import barber2 from "@/assets/barber-2.webp"; // TROCAR: foto do barbeiro 2
import barber3 from "@/assets/barber-3.webp"; // TROCAR: foto do barbeiro 3
import before from "@/assets/before.webp"; // TROCAR: foto "antes"
import after from "@/assets/after.webp"; // TROCAR: foto "depois"
import svcCorte from "@/assets/svc-corte.webp";
import svcBarba from "@/assets/svc-barba.webp";

export const site = {
  name: "Navalha 21",
  monogram: "N21",
  tagline: "Barbearia clássica na Zona Sul de São Paulo",
  heroTitle: "Navalha 21",
  heroSubtitle: "Corte preciso, barba feita na navalha e o ritual que todo homem merece.",
  whatsapp: "5511999999999",
  whatsappDisplay: "(11) 99999-9999",
  instagram: "navalha21",
  address: "Av. Santo Amaro, 2100 — Brooklin, São Paulo/SP",
  mapQuery: "Av. Santo Amaro, 2100, São Paulo",
  images: { hero, before, after },
  marquee: ["CORTE", "BARBA", "NAVALHA", "ESTILO"],
  services: [
    {
      id: "corte",
      name: "Corte",
      desc: "Tesoura, máquina e acabamento na navalha",
      price: 40,
      image: svcCorte,
    },
    {
      id: "barba",
      name: "Barba",
      desc: "Toalha quente, óleo e navalha",
      price: 30,
      image: svcBarba,
    },
    { id: "combo", name: "Corte e barba", desc: "O ritual completo", price: 60, image: after },
    {
      id: "sobrancelha",
      name: "Sobrancelha",
      desc: "Alinhamento na navalha",
      price: 15,
      image: barber2,
    },
    {
      id: "pigmentacao",
      name: "Pigmentação",
      desc: "Preenchimento natural de barba e cabelo",
      price: 35,
      image: barber1,
    },
  ],
  team: [
    { id: "rafa", name: "Rafael Souza", role: "Degradê e barba desenhada", photo: barber1 },
    { id: "dudu", name: "Eduardo Lima", role: "Cortes afro e freestyle", photo: barber2 },
    { id: "seu-ze", name: "Seu Zé", role: "Navalha clássica · 30 anos de ofício", photo: barber3 },
  ],
  // 0 = domingo ... 6 = sábado. null = fechado
  hours: [
    { day: "Domingo", open: null, close: null },
    { day: "Segunda", open: 9, close: 20 },
    { day: "Terça", open: 9, close: 20 },
    { day: "Quarta", open: 9, close: 20 },
    { day: "Quinta", open: 9, close: 20 },
    { day: "Sexta", open: 9, close: 20 },
    { day: "Sábado", open: 9, close: 18 },
  ] as { day: string; open: number | null; close: number | null }[],
  slotMinutes: 60,
  bookingDaysAhead: 10,
  testimonials: [
    {
      name: "Lucas M.",
      text: "Melhor degradê da Zona Sul. Ambiente top, café na hora e pontualidade.",
      stars: 5,
    },
    {
      name: "André P.",
      text: "A barba com toalha quente do Seu Zé é outro nível. Virei cliente fixo.",
      stars: 5,
    },
    {
      name: "Bruno C.",
      text: "Agendei pelo WhatsApp em 1 minuto. Atendimento impecável.",
      stars: 5,
    },
    { name: "Felipe R.", text: "Detalhe em tudo. Sai daqui me sentindo outro.", stars: 5 },
  ],
};

export type Service = (typeof site.services)[number];
export type Barber = (typeof site.team)[number];
