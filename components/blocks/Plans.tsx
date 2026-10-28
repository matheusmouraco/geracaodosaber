import { Check, Star } from "lucide-react";
import { formatBRL, plans } from "@/content/donation";
import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";

/** Cards de pricing dos planos de apadrinhamento (assinatura mensal em BRL) */
export function PlanCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {plans.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={i * 0.07}>
          <article
            className={cn(
              "relative flex h-full flex-col rounded-[var(--radius-card)] p-7 transition-transform duration-300 hover:-translate-y-1",
              p.featured ? "grain bg-secondary text-white shadow-[var(--shadow-lift)] ring-4 ring-sun" : "bg-white shadow-[var(--shadow-card)]",
            )}
          >
            {p.featured && (
              <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 font-ui text-[12px] font-bold uppercase tracking-wide text-ink">
                <Star className="size-3.5 fill-current" aria-hidden /> Mais completo
              </span>
            )}
            <p className={cn("font-ui text-[13px] font-semibold uppercase tracking-[0.14em]", p.featured ? "text-sun" : "text-accent-ink")}>Apadrinhamento</p>
            <h3 className={cn("mt-2 font-display text-[26px] font-black leading-tight", p.featured ? "text-white" : "text-primary")}>{p.short}</h3>
            {p.slug === "integral" && <p className="mt-1 text-[14px] text-white/75">Educacional + Nutricional</p>}
            <p className="mt-6 flex items-baseline gap-1">
              <span className={cn("font-display text-[44px] font-black leading-none tracking-[-0.02em]", p.featured ? "text-white" : "text-ink")}>{formatBRL(p.price).replace(",00", "")}</span>
              <span className={cn("font-ui text-[14px] font-semibold", p.featured ? "text-white/70" : "text-muted")}>/mês</span>
            </p>
            <ul className={cn("mt-6 flex-1 space-y-3 text-[15px]", p.featured ? "text-white/90" : "text-ink/80")}>
              {p.includes.map((inc) => (
                <li key={inc} className="flex gap-3">
                  <Check className={cn("mt-0.5 size-5 shrink-0", p.featured ? "text-sun" : "text-primary")} aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
            <ButtonLink href={`/apadrinhar/${p.slug}`} className="mt-8 w-full px-4!" arrow aria-label={`Apadrinhar: ${p.name}`}>
              Apadrinhar
            </ButtonLink>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
