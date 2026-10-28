"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Heart, Pause, Play } from "lucide-react";
import { heroPhotos } from "@/content/site";
import { stats } from "@/content/blocks";
import { Arc } from "@/components/icons";
import { ButtonLink, Container, Highlight } from "@/components/ui";
import { Counter } from "@/components/motion";

export function HomeHero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const playing = !reduce && !paused;

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((n) => (n + 1) % heroPhotos.length), 6500);
    return () => clearInterval(t);
  }, [playing]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section aria-label="Apresentação" className="relative isolate">
      <div className="relative isolate overflow-hidden bg-secondary pb-32 pt-32 text-white md:min-h-[760px] md:pb-44 md:pt-48 lg:min-h-[860px]">
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0 -z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
            <Image
              src={heroPhotos[i].src}
              alt={heroPhotos[i].alt}
              fill
              loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"}
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-secondary/80 to-secondary/30" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" aria-hidden />
        <Arc className="absolute -right-28 top-28 -z-10 hidden size-[520px] text-sun lg:block" weight={14} />

        <Container>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-xl font-ui text-[13px] font-semibold uppercase tracking-[0.2em] text-sun md:text-[14px]"
          >
            Seja a esperança e transforme o futuro da próxima geração.
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="mt-5 max-w-[15ch] font-display text-[44px] font-black leading-[0.98] tracking-[-0.025em] sm:text-7xl lg:text-[88px]"
          >
            Juntos fazemos a diferença no mundo de cada <Highlight>criança</Highlight>.
          </motion.h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/doacao">
              <Heart className="size-4 fill-current" aria-hidden /> Doar agora
            </ButtonLink>
            <ButtonLink href="/apadrinhamento" variant="outline-light" arrow>
              Apadrinhar uma criança
            </ButtonLink>
            <Link href="/o-que-fazemos" className="mt-2 inline-flex items-center gap-2 font-ui font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline sm:ml-3 sm:mt-0">
              O Que Fazemos <ArrowDown className="size-4 -rotate-90" aria-hidden />
            </Link>
          </motion.div>

          <div className="mt-10 flex items-center gap-2 md:mt-14" role="tablist" aria-label="Fotos do destaque">
            <button
              type="button"
              onClick={() => setPaused((v) => !v)}
              aria-label={playing ? "Pausar troca de fotos" : "Retomar troca de fotos"}
              className="mr-2 grid size-9 place-items-center rounded-full border border-white/30 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
            </button>
            {heroPhotos.map((p, n) => (
              <button
                key={p.src}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={`Foto ${n + 1}: ${p.alt}`}
                onClick={() => setI(n)}
                className="group py-2"
              >
                <span className={`block h-1 rounded-full transition-all duration-500 ${n === i ? "w-10 bg-sun" : "w-5 bg-white/40 group-hover:bg-white/70"}`} />
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Barra flutuante com os contadores */}
      <Container className="relative z-10 -mt-20 md:-mt-24">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-lift)] lg:grid-cols-4">
          {stats.map((s, n) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 p-5 md:p-7 ${n % 2 === 0 ? "border-r border-line" : ""} ${n < 2 ? "border-b border-line lg:border-b-0" : ""} ${n === 1 ? "lg:border-r" : ""}`}
            >
              <dt className="order-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-muted md:text-[13px]">{s.label}</dt>
              <dd className="order-1 font-display text-3xl font-black tracking-[-0.02em] text-primary md:text-[44px] md:leading-none">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
