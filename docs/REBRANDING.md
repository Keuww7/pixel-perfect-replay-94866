# Rebranding — de protótipo para cliente

Checklist para transformar este protótipo no site de um cliente real.
Tempo estimado: **30 a 60 minutos**.

> Antes de começar: crie uma cópia do projeto para o cliente (`Use this template` no GitHub, ou branch própria).
> Nunca rebrande o protótipo original na `main` — você perde a demo que usa para vender.

## 1. Dados do cliente — `src/config/site.ts`

Este é o único arquivo que você **obrigatoriamente** precisa editar.

| Campo              | O que é                                         | Exemplo                                  |
| ------------------ | ----------------------------------------------- | ---------------------------------------- |
| `name`             | Nome da barbearia                               | `"Navalha 21"`                           |
| `monogram`         | 1 a 3 letras para o menu/preloader              | `"N21"`                                  |
| `tagline`          | Frase curta acima do título                     | `"Barbearia clássica na Zona Sul"`       |
| `heroTitle`        | Título gigante da primeira dobra                | `"Navalha 21"`                           |
| `heroSubtitle`     | Texto de apoio                                  | `"Corte preciso, barba na navalha..."`   |
| `whatsapp`         | Número no formato internacional, **só dígitos** | `"5511999999999"`                        |
| `whatsappDisplay`  | Número como aparece na tela                     | `"(11) 99999-9999"`                      |
| `instagram`        | Perfil **sem @**                                | `"navalha21"`                            |
| `address`          | Endereço completo                               | `"Av. Santo Amaro, 2100 — Brooklin"`     |
| `mapQuery`         | Endereço que será buscado no Google Maps        | `"Av. Santo Amaro, 2100, São Paulo"`     |
| `marquee`          | Palavras da faixa animada                       | `["CORTE", "BARBA"]`                     |
| `services`         | Serviços, descrição, preço e foto               | ver abaixo                               |
| `team`             | Barbeiros, função e foto                        | ver abaixo                               |
| `hours`            | Horário por dia (`null` = fechado)              | `{ day: "Segunda", open: 9, close: 20 }` |
| `slotMinutes`      | Duração de cada horário na agenda               | `60`                                     |
| `bookingDaysAhead` | Quantos dias à frente o cliente pode agendar    | `10`                                     |
| `testimonials`     | Depoimentos (nome, texto, estrelas)             | ver abaixo                               |

### Serviços

```ts
services: [{ id: "corte", name: "Corte", desc: "Tesoura e máquina", price: 40, image: svcCorte }];
```

- `id`: identificador único, sem espaços ou acentos.
- `image`: importado no topo do arquivo (`import svcCorte from "@/assets/svc-corte.jpg"`).

### Equipe

```ts
team: [{ id: "rafa", name: "Rafael Souza", role: "Degradê e barba", photo: barber1 }];
```

- `id` é usado pelo botão "agendar com ele" — precisa ser único e igual ao que vai na mensagem.

### Horários

- Índice `0` = domingo, `6` = sábado (o array **precisa** ter os 7 dias, na ordem de domingo a sábado).
- `{ day: "Domingo", open: null, close: null }` = fechado.
- O badge "Aberto agora" usa o fuso de São Paulo e recalcula a cada 30s.

## 2. Fotos — `src/assets/`

Substitua os arquivos mantendo **os mesmos nomes** (aí não precisa mexer em import nenhum):

| Arquivo                                        | Onde aparece            | Proporção recomendada            |
| ---------------------------------------------- | ----------------------- | -------------------------------- |
| `hero.jpg`                                     | fundo da primeira dobra | 16:9 horizontal, 1920×1080       |
| `barber-1.jpg`, `barber-2.jpg`, `barber-3.jpg` | equipe                  | 3:4 vertical, 768×1024           |
| `before.jpg` / `after.jpg`                     | comparador antes/depois | 4:3 ou 16:8, mesmo enquadramento |
| `svc-corte.jpg`, `svc-barba.jpg`               | serviços                | 4:5 vertical                     |

Dicas:

- Comprima em [squoosh.app](https://squoosh.app) (JPG, qualidade ~80). Fotos de 300 KB carregam rápido; de 3 MB não.
- Use fotos **do próprio cliente**. Banco de imagens genérico derruba a percepção de valor na hora da venda.
- Se não tiver foto "antes/depois", peça duas ao cliente ou remova a seção `BeforeAfter` de `src/routes/index.tsx`.

## 3. Identidade visual — `src/styles.css`

As variáveis ficam em `:root`. Os principais pontos:

| Variável                        | O que controla                     |
| ------------------------------- | ---------------------------------- |
| `--background` / `--foreground` | fundo e cor do texto               |
| `--primary`                     | dourado (botões, destaques, links) |
| `--card` / `--muted`            | superfícies e textos secundários   |
| `--success` / `--destructive`   | badge "aberto" / "fechado"         |

As fontes são carregadas em `src/routes/__root.tsx` (Google Fonts): `Fraunces` (display) e `Manrope` (texto).
Para trocar, altere o link do Google Fonts e as variáveis `--font-display` / `--font-sans` no `styles.css`.

## 4. SEO e compartilhamento

- `src/routes/__root.tsx` — título e descrição padrão da página.
- `src/routes/index.tsx` — `title`, `description` e tags Open Graph (o que aparece ao compartilhar no WhatsApp).
- `public/favicon.ico` — troque pelo logo do cliente (32×32 ou 64×64, formato `.ico` ou `.png`).
- `public/robots.txt` — libera os buscadores; mantenha como está, a menos que o cliente peça o contrário.

## 5. Revisão final

- [ ] Todos os textos em `site.ts` são do cliente (nenhum "Navalha 21" sobrando).
- [ ] WhatsApp abre com a mensagem correta (teste no celular).
- [ ] Horários batem com a realidade e o badge abre/fecha na hora certa.
- [ ] Endereço no mapa aponta para o lugar certo.
- [ ] Instagram e telefone clicáveis funcionam.
- [ ] Fotos nítidas e leves.
- [ ] `npm run build` passa sem erro.
- [ ] Testado no celular (a maior parte do tráfego de barbearia é mobile).
