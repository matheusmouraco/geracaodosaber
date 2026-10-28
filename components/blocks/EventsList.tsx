"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRight, CalendarX2, Clock, MapPin } from "lucide-react";
import { eventDayParts, events, formatEventRange } from "@/content/events";
import { site } from "@/content/site";
import { InstagramIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Tab = "proximos" | "passados";

// A data atual só é conhecida no navegador (a página é pré-renderizada)
let loadedAt: number | undefined;
const getNow = () => (loadedAt ??= Date.now());
const noop = () => () => {};

export function EventsList() {
  const now = useSyncExternalStore(noop, getNow, () => null);
  const [tab, setTab] = useState<Tab>("proximos");

  const { upcoming, past } = useMemo(() => {
    const t = now ?? 0;
    const sorted = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
    return {
      upcoming: sorted.filter((e) => +new Date(e.end) >= t),
      past: sorted.filter((e) => +new Date(e.end) < t).reverse(),
    };
  }, [now]);

  const list = tab === "proximos" ? upcoming : past;

  return (
    <div>
      <div role="tablist" aria-label="Filtrar eventos" className="inline-flex rounded-2xl bg-mist p-1.5">
        {(
          [
            ["proximos", `Próximos${now ? ` (${upcoming.length})` : ""}`],
            ["passados", `Passados${now ? ` (${past.length})` : ""}`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn("rounded-xl px-5 py-2.5 font-ui text-[14px] font-semibold transition-colors", tab === id ? "bg-white text-primary shadow-sm" : "text-muted hover:text-primary")}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10" role="tabpanel">
        {now === null ? (
          <div className="h-40 animate-pulse rounded-[var(--radius-card)] bg-mist" />
        ) : list.length === 0 ? (
          <div className="flex flex-col items-start gap-5 rounded-[var(--radius-card)] border-2 border-dashed border-line p-7 md:p-9">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-sun/20 text-primary">
              <CalendarX2 className="size-8" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-primary">Nenhum evento próximo por enquanto</h3>
              <p className="mt-1 text-muted">Novos cultos, conferências e viagens missionárias são anunciados primeiro no Instagram. Deixe seu cadastro nesta página para ser avisado.</p>
            </div>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-[10px] bg-primary px-5 py-3.5 font-ui font-semibold text-white transition-colors hover:bg-secondary"
            >
              <InstagramIcon className="size-5" /> Seguir {site.instagram.handle}
            </a>
          </div>
        ) : (
          <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[39px] before:top-6 before:w-px before:bg-line md:before:left-[47px]">
            {list.map((e) => {
              const d = eventDayParts(e);
              return (
                <li key={e.slug} className="relative">
                  <Link
                    href={`/agenda/${e.slug}`}
                    className="group flex gap-5 rounded-[var(--radius-card)] bg-white p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] md:gap-7 md:p-5"
                  >
                    <div className={cn("relative z-10 grid w-[64px] shrink-0 place-items-center rounded-2xl py-3 text-center md:w-[80px]", tab === "proximos" ? "bg-accent text-on-accent" : "bg-primary text-white")}>
                      <span className="font-display text-3xl font-black leading-none md:text-4xl">{d.day}</span>
                      <span className="font-ui text-[12px] font-semibold uppercase tracking-wider opacity-85">{d.month}</span>
                      <span className="font-ui text-[11px] opacity-70">{d.year}</span>
                    </div>
                    <div className="min-w-0 flex-1 self-center">
                      <h3 className="font-display text-xl font-extrabold text-secondary group-hover:text-primary md:text-2xl">{e.title}</h3>
                      <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-4 text-accent-ink" aria-hidden /> {e.location}, {e.country}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-4 text-accent-ink" aria-hidden /> {formatEventRange(e)} · {e.timeLabel}
                        </span>
                      </p>
                    </div>
                    <ArrowRight className="hidden size-5 shrink-0 self-center text-primary transition-transform group-hover:translate-x-1 sm:block" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
