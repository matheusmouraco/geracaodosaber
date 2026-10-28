"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, X } from "lucide-react";
import { progressLabel, type Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui";
import { ProgressBar, Reveal } from "@/components/motion";
import { cn } from "@/lib/cn";

type Variant = "home" | "default";

const resolve = (p: Project, v: Variant) => ({
  ...p,
  title: (v === "home" && p.home?.title) || p.title,
  summary: (v === "home" && p.home?.summary) || p.summary,
  body: (v === "home" && p.home?.body) || p.body,
});

export function ProjectGrid({ projects, variant = "default", layout = "grid" }: { projects: Project[]; variant?: Variant; layout?: "grid" | "row" }) {
  const [active, setActive] = useState<ReturnType<typeof resolve> | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active) dialog.current?.showModal();
  }, [active]);

  return (
    <>
      <ul className={cn("grid gap-6 md:gap-8", layout === "row" ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {projects.map((raw, i) => {
          const p = resolve(raw, variant);
          return (
            <Reveal as="li" key={p.slug} delay={(i % (layout === "row" ? 3 : 2)) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className={cn("relative overflow-hidden", layout === "row" ? "aspect-[4/3]" : "aspect-[16/10]")}>
                  <Image
                    src={p.image}
                    alt={`Projeto ${p.title}`}
                    fill
                    sizes={layout === "row" ? "(min-width: 768px) 400px, 100vw" : "(min-width: 768px) 600px, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" aria-hidden />
                  <p className="absolute inset-x-5 bottom-4 font-display text-[17px] font-semibold italic leading-snug text-white md:text-lg">“{p.tagline}”</p>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-primary md:text-[26px]">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted md:text-base">{p.summary}</p>
                  <div className="mt-6">
                    <ProgressBar value={p.progress} label={progressLabel} />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <button
                      type="button"
                      onClick={() => setActive(p)}
                      aria-haspopup="dialog"
                      className="group/sm inline-flex items-center gap-2 font-ui text-[15px] font-semibold text-primary hover:text-secondary"
                    >
                      Saiba mais
                      <span className="sr-only"> sobre {p.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover/sm:translate-x-1" aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-labelledby="project-dialog-title"
        className="m-auto max-h-[92dvh] w-[min(94vw,760px)] overflow-y-auto rounded-[var(--radius-card)] bg-white p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div>
            <div className="relative aspect-[16/8]">
              <Image src={active.image} alt={`Projeto ${active.title}`} fill sizes="760px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 to-transparent" aria-hidden />
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Fechar"
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
              >
                <X className="size-5" />
              </button>
              <div className="absolute inset-x-6 bottom-5 text-white md:inset-x-8">
                <p className="font-display text-lg font-semibold italic text-sun">“{active.tagline}”</p>
                <h3 id="project-dialog-title" className="mt-1 font-display text-3xl font-black md:text-4xl">
                  {active.title}
                </h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[16px] leading-relaxed text-ink/85 md:text-[17px]">{active.body}</p>
              <div className="mt-6 max-w-sm">
                <ProgressBar value={active.progress} label={progressLabel} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/doacao">
                  <Heart className="size-4 fill-current" aria-hidden /> Apoiar este projeto
                </ButtonLink>
                <ButtonLink href="/apadrinhamento" variant="outline" arrow>
                  Apadrinhar
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
