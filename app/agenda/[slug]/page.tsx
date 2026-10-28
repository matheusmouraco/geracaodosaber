import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { ButtonLink, Container } from "@/components/ui";
import { events, formatEventRange, getEvent, type EventBlock } from "@/content/events";
import { site } from "@/content/site";

// Todos os slugs válidos são pré-gerados; slugs desconhecidos bloqueiam e caem no 404
export const instant = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/agenda/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return {
    title: `${e.title} · ${e.location}`,
    description: `${e.title} em ${e.location}, ${e.country} — ${formatEventRange(e)}. Evento da Cross Missions.`,
    alternates: { canonical: `/agenda/${e.slug}` },
  };
}

function Bold({ text, strong = [] }: { text: string; strong?: string[] }) {
  if (!strong.length) return <>{text}</>;
  const re = new RegExp(`(${strong.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) => (strong.includes(part) ? <strong key={i} className="font-bold text-secondary">{part}</strong> : <span key={i}>{part}</span>))}
    </>
  );
}

function Block({ b }: { b: EventBlock }) {
  switch (b.type) {
    case "lead":
      return <p className="font-display text-2xl font-extrabold leading-snug text-primary md:text-3xl">{b.text}</p>;
    case "verse":
      return (
        <blockquote className="rounded-r-2xl border-l-4 border-sun bg-mist px-6 py-5">
          <p className="font-display text-lg italic text-secondary">“{b.text}”</p>
          <cite className="mt-2 block font-ui text-[13px] font-semibold not-italic text-accent-ink">{b.ref}</cite>
        </blockquote>
      );
    case "p":
      return (
        <p>
          <Bold text={b.text} strong={b.strong} />
        </p>
      );
    case "list": {
      const L = b.ordered ? "ol" : "ul";
      return (
        <div>
          {b.title && <p className="font-semibold text-ink">{b.title}</p>}
          <L className={`mt-3 space-y-2 pl-6 ${b.ordered ? "list-decimal" : "list-disc"} marker:text-accent-ink`}>
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </L>
        </div>
      );
    }
    case "cta":
      return <p className="font-display text-xl font-extrabold text-accent-ink">{b.text}</p>;
  }
}

export default async function EventoPage({ params }: PageProps<"/agenda/[slug]">) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.start,
    endDate: e.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: `${e.location}, ${e.country}`, address: { "@type": "PostalAddress", addressLocality: e.location, addressCountry: e.country } },
    organizer: { "@type": "NGO", name: site.name, url: site.url },
    description: e.blocks.map((b) => ("text" in b ? b.text : "")).join(" ").slice(0, 300),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title={e.title} subtitle={`${e.location}, ${e.country}`} image="/img/fotos/festa-dia-feliz.jpg" crumbs={[{ label: "Agenda", href: "/agenda" }]} />
      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <article className="max-w-2xl space-y-6 text-[17px] leading-relaxed text-ink/85">
            {e.blocks.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)]">
              <dl className="space-y-4 text-[15px]">
                <div className="flex gap-3">
                  <CalendarDays className="size-5 shrink-0 text-accent-ink" aria-hidden />
                  <div>
                    <dt className="font-ui text-[12px] font-semibold uppercase tracking-wider text-muted">Data</dt>
                    <dd className="font-semibold text-secondary">{formatEventRange(e)}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="size-5 shrink-0 text-accent-ink" aria-hidden />
                  <div>
                    <dt className="font-ui text-[12px] font-semibold uppercase tracking-wider text-muted">Horário</dt>
                    <dd className="font-semibold text-secondary">{e.timeLabel}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="size-5 shrink-0 text-accent-ink" aria-hidden />
                  <div>
                    <dt className="font-ui text-[12px] font-semibold uppercase tracking-wider text-muted">Local</dt>
                    <dd className="font-semibold text-secondary">
                      {e.location}, {e.country}
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="mt-6 grid gap-3">
                <ButtonLink href="/doacao">Contribuir com a missão</ButtonLink>
                <ButtonLink href={site.whatsapp} variant="outline">
                  Falar no WhatsApp
                </ButtonLink>
              </div>
            </div>
            <Link href="/agenda" className="mt-5 inline-flex items-center gap-2 font-ui text-[14px] font-semibold text-primary hover:text-secondary">
              <ArrowLeft className="size-4" aria-hidden /> Voltar para a agenda
            </Link>
          </aside>
        </Container>
      </section>
      <Closing />
    </>
  );
}
