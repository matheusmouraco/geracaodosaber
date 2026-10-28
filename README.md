# Geração do Saber — site

Site do Geração do Saber, projeto da Cross Missions na Guiné-Bissau. Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Framer Motion · Embla · zod · Supabase.
Publicado na Vercel em https://geracaodosaber.vercel.app (crossmissions.vercel.app redireciona).

```bash
npm install
npx vercel@latest env pull   # variáveis do Supabase
npm run dev
```

## Estrutura

- `content/` — conteúdo editável: projetos, equipe, depoimentos, contadores, pilares por página, eventos, planos e dados de doação.
- `components/` — layout global, blocos reutilizáveis, wizard de doação, fluxo de apadrinhamento e área do padrinho.
- `public/img/` — imagens otimizadas com nomes semânticos.
- `supabase/migrations/` — schema do banco (tabelas `leads` e `padrinhos`, com RLS).
- Endereços antigos redirecionam para as páginas novas em `next.config.ts`.

## Fluxos

| Fluxo | Funcionamento |
|---|---|
| Doação | Wizard em `/doacao`: Pix (QR em SVG), Itaú, PayPal BRL/EUR/USD, MB Way e IBAN. |
| Apadrinhamento | `/apadrinhar/<plano>`: cadastro (salvo em `padrinhos`, status pendente) → Pix mensal ou PayPal → comprovante pelo WhatsApp. A equipe muda o status para `ativo` no Supabase. |
| Formulários | `POST /api/forms`: grava em `leads` e avisa por e-mail quando `RESEND_API_KEY` existir. Sem banco nem e-mail, conclui pelo WhatsApp. |
| Área do padrinho | `/minha-conta`: login sem senha (link + código por e-mail, requer Resend) e lista dos apadrinhamentos. |

## Pendências

1. Aceitar os termos do Stripe e do Resend na Vercel para ativar assinatura por cartão e os e-mails (login e avisos de formulário).
2. Fotos em alta e significado das barras de progresso ("Meta alcançada").
3. Dados bancários em USD; novos eventos; revisão jurídica da Política de Privacidade.
