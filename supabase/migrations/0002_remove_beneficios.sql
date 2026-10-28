-- Clube Padrinho+ retirado do site: a tabela de benefícios das empresas parceiras não é mais usada
drop policy if exists "padrinho ativo vê benefícios" on public.beneficios;
drop table if exists public.beneficios;
