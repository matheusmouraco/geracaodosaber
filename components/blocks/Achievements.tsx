import { achievementsText, stats } from "@/content/blocks";
import { Container, Eyebrow } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";

export function StatsRow({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <dl className="grid grid-cols-2 gap-3 md:gap-4">
      {stats.map((s) => (
        <div key={s.label} className={`flex min-w-0 flex-col rounded-[var(--radius-card)] p-5 md:p-7 ${tone === "dark" ? "bg-white/[0.07] ring-1 ring-white/10" : "bg-white shadow-[var(--shadow-card)]"}`}>
          <dt className={`order-2 mt-2 font-ui text-[12px] font-semibold uppercase leading-snug tracking-[0.12em] md:text-[13px] ${tone === "dark" ? "text-white/70" : "text-muted"}`}>{s.label}</dt>
          <dd className={`order-1 font-display text-[30px] font-black leading-none tracking-[-0.02em] sm:text-4xl xl:text-5xl ${tone === "dark" ? "text-sun" : "text-primary"}`}>
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Achievements({ intro }: { intro?: string }) {
  return (
    <section className="grain dots relative overflow-hidden bg-secondary py-20 text-white md:py-28">
      <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <Eyebrow tone="sun">Nossas conquistas</Eyebrow>
          <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.08] sm:text-4xl lg:text-[50px]">
            Muito além de números: vidas transformadas
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-white/80 md:text-[17px]">
            {intro && <p>{intro}</p>}
            {achievementsText.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <StatsRow />
        </Reveal>
      </Container>
    </section>
  );
}
