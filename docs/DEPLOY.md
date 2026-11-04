# Publicação (Vercel + domínio)

Este projeto já está configurado para deploy na [Vercel](https://vercel.com), com build automático a cada push na `main`.

## Primeiro deploy

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório do GitHub.
2. A Vercel detecta o projeto sozinho. Confirme:
   - **Framework preset:** TanStack Start (ou "Other")
   - **Build command:** `npm run build`
   - **Install command:** `npm install`
3. Clique em **Deploy**. A primeira build leva alguns minutos.

> Se o projeto foi criado pelo Lovable, ele já publica automaticamente. Nesse caso use a Vercel
> apenas para versões com domínio próprio.

## Domínio do cliente

1. No painel do projeto na Vercel: **Settings → Domains → Add**.
2. Digite o domínio (ex.: `barbearianavalha21.com.br`).
3. A Vercel mostra os registros de DNS. No painel do registrador (Registro.br, GoDaddy, Hostinger...):
   - `A` → `76.76.21.21` (domínio raiz)
   - `CNAME` → `cname.vercel-dns.com` (subdomínio `www`)
4. Aguarde a propagação (de minutos a algumas horas). O certificado HTTPS é emitido sozinho.

## Fluxo de trabalho sugerido

Como você vende protótipos, o padrão que funciona bem:

```
protótipo (repo original)  ──►  demo pública para mostrar ao cliente
        │
        └── "Use this template" / fork  ──►  repo do cliente  ──►  domínio do cliente
```

- **Demo:** mantenha um link público (Vercel) para mandar no WhatsApp.
- **Cliente fechou:** crie o repo do cliente a partir do protótipo, rebrande com o
  [checklist de rebranding](REBRANDING.md) e publique no domínio dele.
- **Nunca** rebrande a demo: ela é sua vitrine e precisa continuar funcionando.

## Checklist de entrega ao cliente

- [ ] Domínio apontando e HTTPS ativo.
- [ ] Link do WhatsApp testado no celular do cliente.
- [ ] Print do site no celular e no desktop enviado junto.
- [ ] Acesso ao repositório passado para o cliente (se fizer parte do combinado).
- [ ] Combinado por escrito o que está incluso (ex.: 1 rodada de ajustes, 30 dias de suporte).

## Custos

| Item                            | Custo                                 |
| ------------------------------- | ------------------------------------- |
| Hospedagem Vercel (plano Hobby) | grátis                                |
| Domínio `.com.br`               | ~R$ 40/ano                            |
| Domínio `.com`                  | ~R$ 60–80/ano                         |
| Lovable                         | plano gratuito já resolve o protótipo |

Um site assim costuma ser vendido entre **R$ 800 e R$ 2.500** dependendo da região e do que está incluso.
