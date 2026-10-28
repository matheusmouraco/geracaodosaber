-- Cross Missions: contatos do site, padrinhos e benefícios do Padrinho+
-- Escritas acontecem só no servidor (chave de serviço). O navegador lê apenas os próprios dados.

create extension if not exists pgcrypto;

-- Contatos enviados pelos formulários do site
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  dados jsonb not null,
  pagina text,
  criado_em timestamptz not null default now()
);
create index if not exists leads_tipo_criado_idx on public.leads (tipo, criado_em desc);
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;

-- Padrinhos e madrinhas (um registro por apadrinhamento)
create table if not exists public.padrinhos (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  nome text,
  telefone text,
  plano text not null,
  valor_mensal numeric(10, 2) not null,
  metodo text not null default 'pix' check (metodo in ('pix', 'paypal', 'cartao')),
  status text not null default 'pendente' check (status in ('pendente', 'ativo', 'cancelado')),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create index if not exists padrinhos_email_idx on public.padrinhos (lower(email));
alter table public.padrinhos enable row level security;
revoke all on public.padrinhos from anon, authenticated;
grant select on public.padrinhos to authenticated;

drop policy if exists "padrinho lê os próprios apadrinhamentos" on public.padrinhos;
create policy "padrinho lê os próprios apadrinhamentos" on public.padrinhos
  for select to authenticated
  using (lower(email) = lower((select auth.jwt() ->> 'email')));

-- Benefícios das empresas parceiras: visíveis só para padrinhos ativos
create table if not exists public.beneficios (
  parceiro_slug text primary key,
  descricao text not null,
  cupom text,
  atualizado_em timestamptz not null default now()
);
alter table public.beneficios enable row level security;
revoke all on public.beneficios from anon, authenticated;
grant select on public.beneficios to authenticated;

drop policy if exists "padrinho ativo vê benefícios" on public.beneficios;
create policy "padrinho ativo vê benefícios" on public.beneficios
  for select to authenticated
  using (
    exists (
      select 1 from public.padrinhos p
      where lower(p.email) = lower((select auth.jwt() ->> 'email'))
        and p.status = 'ativo'
    )
  );
