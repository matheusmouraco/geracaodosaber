import { HandHeart, Scale, Sparkles, Gift } from "lucide-react";
import type { Pillar } from "@/content/pillars";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";

const icons = { impacto: HandHeart, responsabilidade: Scale, transformacao: Sparkles, beneficios: Gift };
const accents = {
  impacto: "bg-accent text-on-accent",
  responsabilidade: "bg-primary text-white",
  transformacao: "bg-sun text-ink",
  beneficios: "bg-secondary text-white",
};

/** Bloco dos 4 pilares (Impacto / Responsabilidade / Transformação / Benefícios) */
export function Pillars({ items, columns = 2, tone = "light", variant = "cards" }: { items: Pillar[]; columns?: 2 | 4; tone?: "light" | "dark"; variant?: "cards" | "list" }) {
  if (variant === "list") {
    return (
      <ul className="divide-y divide-line">
        {items.map((p, i) => {
          const Icon = icons[p.key];
          return (
            <Reveal as="li" key={p.key} delay={i * 0.06} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", accents[p.key])}>
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold leading-tight text-primary">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className={cn("grid gap-5", columns === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2")}>
      {items.map((p, i) => {
        const Icon = icons[p.key];
        return (
          <Reveal as="li" key={p.key} delay={i * 0.07}>
            <article
              className={cn(
                "h-full rounded-[var(--radius-card)] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7",
                tone === "dark" ? "bg-white/[0.07] text-white ring-1 ring-white/10" : "bg-white shadow-[var(--shadow-card)]",
              )}
            >
              <span className={cn("grid size-12 place-items-center rounded-2xl", accents[p.key])}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className={cn("mt-5 font-display text-[22px] font-extrabold leading-tight", tone === "dark" ? "text-white" : "text-primary")}>{p.title}</h3>
              <p className={cn("mt-3 text-[15px] leading-relaxed", tone === "dark" ? "text-white/80" : "text-muted")}>{p.text}</p>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
