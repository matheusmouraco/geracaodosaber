import Image from "next/image";
import { visionStrip } from "@/content/blocks";
import { Reveal } from "@/components/motion";

/** Faixa "Visão": 4 frases com os ícones amarelos da marca */
export function VisionStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {visionStrip.map((v, i) => (
        <Reveal as="li" key={v.text} delay={i * 0.07}>
          <div className="group flex h-full flex-row items-center gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 sm:flex-col sm:items-start sm:gap-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]">
            <span className="grid size-14 shrink-0 place-items-center sm:size-16 rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-line transition-transform duration-300 group-hover:-rotate-6">
              <Image src={v.icon} alt="" width={44} height={44} className="size-11" />
            </span>
            <p className="font-display text-[17px] font-bold leading-snug text-secondary sm:text-[19px]">{v.text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
