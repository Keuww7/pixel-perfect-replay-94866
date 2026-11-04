# Navalha 21 — Landing page para barbearia

Protótipo de site de alta conversão para barbearias, feito para ser **rebrandado e vendido** para clientes reais.
Tema escuro, tipografia editorial, animações no scroll e agendamento que termina no WhatsApp — sem painel, sem banco de dados, sem mensalidade.

- **Demo:** https://pixel-perfect-replay-94866.vercel.app
- **Stack:** React 19 + TanStack Start (SSR) + Vite + Tailwind CSS v4 + Framer Motion
- **Editor original:** [Lovable](https://lovable.dev/projects/65f5b5d3-d60a-4de6-aeb2-a48905cb2c9d)

## Rodando localmente

Requisitos: Node.js 20.19+ (ou 22.12+).

```sh
npm install
npm run dev        # a porta aparece no terminal
```

O projeto também tem `bun.lock` (é o gerenciador usado pelo Lovable). Se preferir Bun:

```sh
bun install
bun run dev
```

### Scripts

| Comando              | O que faz                          |
| -------------------- | ---------------------------------- |
| `npm run dev`        | sobe o servidor de desenvolvimento |
| `npm run build`      | build de produção                  |
| `npm run preview`    | serve o build localmente           |
| `npm run lint`       | análise estática (ESLint)          |
| `npm run format`     | formata tudo com Prettier          |
| `npm run test`       | roda os testes (Vitest)            |
| `npm run test:watch` | testes em modo watch               |

## Estrutura de pastas

```
.
├── public/                  # arquivos servidos na raiz (favicon, robots.txt)
├── src/
│   ├── assets/              # fotos do protótipo (hero, barbeiros, antes/depois)
│   ├── components/
│   │   ├── site/            # seções da landing page (uma por arquivo)
│   │   │   ├── Nav.tsx          # menu fixo
│   │   │   ├── Hero.tsx         # primeira dobra
│   │   │   ├── Marquee.tsx      # faixa animada de palavras
│   │   │   ├── Services.tsx     # serviços + preços (hover no desktop, acordeão no mobile)
│   │   │   ├── BeforeAfter.tsx  # comparador antes/depois
│   │   │   ├── Team.tsx         # equipe
│   │   │   ├── Booking.tsx      # agendamento em 3 passos → WhatsApp
│   │   │   ├── Testimonials.tsx # depoimentos
│   │   │   ├── Contact.tsx      # horários, endereço, mapa
│   │   │   ├── Footer.tsx
│   │   │   ├── WhatsAppFab.tsx  # botão flutuante (mobile)
│   │   │   ├── Effects.tsx      # cursor, preloader, smooth scroll, reveal, magnético
│   │   │   ├── shared.tsx       # utilidades comuns (formatação, link do WhatsApp, botão)
│   │   │   └── index.ts         # ponto único de importação das seções
│   │   └── ui/              # componentes base do shadcn/ui (não precisam ser mexidos)
│   ├── config/site.ts       # ⭐ TODOS os dados do cliente ficam aqui
│   ├── hooks/               # hooks reutilizáveis
│   ├── lib/                 # regras de horário, tratamento de erros, utils
│   ├── routes/              # rotas (TanStack Start — roteamento por arquivo)
│   ├── test/                # testes
│   ├── styles.css           # tema, cores e fontes (Tailwind v4)
│   ├── router.tsx           # configuração do router
│   ├── server.ts            # entrada SSR
│   └── start.ts             # bootstrap do TanStack Start
├── docs/
│   ├── REBRANDING.md        # passo a passo para adaptar a outro cliente
│   └── DEPLOY.md            # publicar na Vercel e conectar domínio
├── AGENTS.md                # instruções para o Lovable / agentes de código
└── package.json
```

> **Regra de ouro:** todo conteúdo que muda de cliente para cliente vive em `src/config/site.ts`.
> Nenhum texto de cliente deve ficar escrito dentro dos componentes.

## Personalizando para um cliente

Veja o checklist completo em [docs/REBRANDING.md](docs/REBRANDING.md). Resumo:

1. Edite `src/config/site.ts` (nome, serviços, preços, equipe, horários, contatos, depoimentos).
2. Troque as fotos em `src/assets/` mantendo os mesmos nomes de arquivo.
3. Ajuste as cores/fontes em `src/styles.css`, se o cliente tiver identidade própria.
4. Troque o favicon e o `robots.txt` em `public/`.
5. Rode `npm run build` para garantir que está tudo certo.

## Publicação

Deploy na Vercel e domínio próprio: [docs/DEPLOY.md](docs/DEPLOY.md).

## Sobre o Lovable

Este projeto está conectado ao Lovable. Commits enviados para a branch `main` aparecem no editor e vice-versa.
**Não reescreva o histórico publicado** (sem `force push`, rebase ou amend em commits já enviados) — isso quebra a sincronização.
