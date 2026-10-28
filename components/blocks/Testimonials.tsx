"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/blocks";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => api && setIndex(api.selectedScrollSnap()), [api]);
  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={ref} role="region" aria-roledescription="carrossel" aria-label="Depoimentos">
        <div className="-ml-6 flex">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${testimonials.length}`}
              className="min-w-0 shrink-0 grow-0 basis-full pl-6"
            >
              <div className="grid items-center gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
                <div className="relative mx-auto mt-3 w-56 md:ml-3 md:w-[calc(100%-24px)]">
                  <div className="absolute -inset-3 rounded-[32px] rounded-tl-[120px] bg-sun" aria-hidden />
                  <Image src={t.photo} alt={`Foto de ${t.name}`} width={640} height={640} sizes="(min-width: 768px) 320px, 224px" className="relative aspect-square w-full rounded-[28px] rounded-tl-[112px] object-cover" />
                </div>
                <div className="pr-1 md:pr-4">
                  <svg viewBox="0 0 64 48" className="h-12 w-16 text-sun md:h-16 md:w-20" aria-hidden>
                    <path fill="currentColor" d="M0 48V28C0 12 8 2 24 0l3 7c-9 3-13 9-13 17h12v24H0Zm37 0V28c0-16 8-26 24-28l3 7c-9 3-13 9-13 17h12v24H37Z" />
                  </svg>
                  <blockquote className="mt-5 font-display text-xl font-semibold leading-snug text-secondary md:text-[28px] md:leading-[1.35]">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="h-[3px] w-8 rounded-full bg-accent text-on-accent" aria-hidden />
                    <span className="font-ui font-bold text-ink">{t.name}</span>
                    <span className="text-muted">· {t.context}</span>
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-4 md:justify-end">
        <button type="button" onClick={() => api?.scrollPrev()} aria-label="Depoimento anterior" className="grid size-12 place-items-center rounded-full border-2 border-primary/20 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir para depoimento de ${t.name}`}
              aria-current={i === index}
              className={cn("h-2.5 rounded-full transition-all", i === index ? "w-8 bg-accent text-on-accent" : "w-2.5 bg-primary/20 hover:bg-primary/40")}
            />
          ))}
        </div>
        <button type="button" onClick={() => api?.scrollNext()} aria-label="Próximo depoimento" className="grid size-12 place-items-center rounded-full border-2 border-primary/20 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
