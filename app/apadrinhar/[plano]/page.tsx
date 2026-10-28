import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Star } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SponsorFlow } from "@/components/donation/SponsorFlow";
import { Container } from "@/components/ui";
import { formatBRL, getPlan, plans } from "@/content/donation";
import { cn } from "@/lib/cn";

// Todos os slugs válidos são pré-gerados; slugs desconhecidos bloqueiam e caem no 404
export const instant = false;

export function generateStaticParams() {
  return plans.map((p) => ({ plano: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apadrinhar/[plano]">): Promise<Metadata> {
  const { plano } = await params;
  const p = getPlan(plano);
  if (!p) return {};
  return {
    title: `${p.name} · ${formatBRL(p.price)}/mês`,
    description: `Apadrinhe pelo plano ${p.short}: ${p.includes.join(", ").toLowerCase()}. ${formatBRL(p.price)} por mês para transformar a vida de uma criança na Guiné-Bissau.`,
    alternates: { canonical: `/apadrinhar/${p.slug}` },
  };
}

export default async function ApadrinharPage({ params }: PageProps<"/apadrinhar/[plano]">) {
  const { plano } = await params;
  const plan = getPlan(plano);
  if (!plan) notFound();

  return (
    <>
      <PageHero
        title={`Apadrinhamento ${plan.short}`}
        subtitle={`${formatBRL(plan.price)} por mês para mudar a história de uma criança.`}
        image="/img/projetos/educacao-infantil.jpg"
        crumbs={[{ label: "Apadrinhamento", href: "/apadrinhamento" }]}
      />
      <section className="relative z-10 -mt-10 pb-20 md:-mt-16 md:pb-28">
        <Container className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <SponsorFlow plan={plan} />
          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className={cn("rounded-[var(--radius-card)] p-6", plan.featured ? "grain bg-secondary text-white" : "bg-white shadow-[var(--shadow-card)]")}>
              {plan.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 font-ui text-[12px] font-bold uppercase text-ink">
                  <Star className="size-3.5 fill-current" aria-hidden /> Mais completo
                </span>
              )}
              <p className={cn("mt-3 font-display text-2xl font-black", plan.featured ? "text-white" : "text-primary")}>{plan.name}</p>
              <p className="mt-2 font-display text-4xl font-black">
                {formatBRL(plan.price)}
                <span className={cn("ml-1 font-ui text-sm font-semibold", plan.featured ? "text-white/70" : "text-muted")}>/mês</span>
              </p>
              <ul className={cn("mt-5 space-y-2.5 text-[15px]", plan.featured ? "text-white/90" : "text-ink/80")}>
                {plan.includes.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <Check className={cn("mt-0.5 size-5 shrink-0", plan.featured ? "text-sun" : "text-primary")} aria-hidden />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-label="Outros planos" className="rounded-[var(--radius-card)] bg-mist p-5">
              <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">Outros planos</p>
              <ul className="mt-3 space-y-1">
                {plans
                  .filter((p) => p.slug !== plan.slug)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={`/apadrinhar/${p.slug}`} className="flex justify-between rounded-xl px-3 py-2.5 text-[15px] font-semibold text-secondary transition-colors hover:bg-white">
                        {p.short} <span className="text-primary">{formatBRL(p.price)}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </section>
    </>
  );
}
