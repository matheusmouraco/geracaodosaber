import { countries } from "@/content/blocks";
import { Flag } from "@/components/Flag";
import { cn } from "@/lib/cn";

export function CountriesMarquee({ className }: { className?: string }) {
  const row = [...countries, ...countries];
  return (
    <section aria-label="Países de língua portuguesa onde atuamos ou queremos alcançar" className={cn("border-y border-line bg-white py-5", className)}>
      <ul className="sr-only">
        {countries.map((c) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
      <div className="marquee-mask overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] md:gap-14">
          {row.map((c, i) => (
            <div key={`${c.code}-${i}`} className="flex shrink-0 items-center gap-3">
              <Flag code={c.code} className="w-9" />
              <span className="whitespace-nowrap font-ui text-[15px] font-semibold text-secondary">{c.name}</span>
              <span className="ml-6 size-1.5 rounded-full bg-sun md:ml-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

