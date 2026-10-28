"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { team, teamClosing, type TeamMember } from "@/content/team";
import { InstagramIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";

export function TeamGrid() {
  const [active, setActive] = useState<TeamMember | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active) dialog.current?.showModal();
  }, [active]);

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-6">
        {team.map((m, i) => (
          <Reveal as="li" key={m.name} delay={(i % 3) * 0.08} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/4.2]">
                <Image src={m.photo} alt={`Foto de ${m.name}`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-secondary/80 to-transparent" aria-hidden />
                <a
                  href={m.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram de ${m.name}`}
                  className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-primary backdrop-blur transition-colors hover:bg-sun hover:text-ink"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </div>
              <div className="relative -mt-12 mx-4 mb-4 rounded-2xl bg-white p-5">
                <h3 className="font-display text-[22px] font-extrabold leading-tight text-primary">{m.name}</h3>
                <p className="mt-1 text-[14px] font-semibold text-muted">{m.role}</p>
                <button
                  type="button"
                  onClick={() => setActive(m)}
                  className="mt-4 inline-flex items-center gap-2 font-ui text-[14px] font-semibold text-accent-ink transition-colors hover:underline"
                  aria-haspopup="dialog"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-accent/10">
                    <Plus className="size-3.5" aria-hidden />
                  </span>
                  Leia mais
                  <span className="sr-only"> sobre {m.name}</span>
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-14 max-w-3xl space-y-4 text-center text-[16px] leading-relaxed text-muted md:text-[18px]">
        {teamClosing.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </Reveal>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(92vw,720px)] overflow-hidden rounded-[var(--radius-card)] bg-white p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
        aria-labelledby="team-dialog-title"
      >
        {active && (
          <div className="grid sm:grid-cols-[240px_1fr]">
            <div className="relative aspect-square sm:aspect-auto">
              <Image src={active.photo} alt={`Foto de ${active.name}`} fill sizes="240px" className="object-cover" />
            </div>
            <div className="relative p-6 sm:p-8">
              <button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar" className="absolute right-3 top-3 grid size-10 place-items-center rounded-full text-muted hover:bg-mist hover:text-ink">
                <X className="size-5" />
              </button>
              <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-ink">{active.role}</p>
              <h3 id="team-dialog-title" className="mt-2 pr-8 font-display text-3xl font-extrabold text-primary">
                {active.name}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{active.bio}</p>
              <a href={active.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-ui text-[14px] font-semibold text-primary hover:text-secondary">
                <InstagramIcon className="size-4" /> Seguir no Instagram
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
