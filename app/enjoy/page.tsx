import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { Reveal } from "@/components/motion";
import { Container, SectionTitle } from "@/components/ui";
import { projects } from "@/content/projects";

const enjoy = projects.find((p) => p.slug === "enjoy")!;

export const metadata: Metadata = {
  title: "Enjoy",
  description: "Enjoy, projeto do New Generation: um encontro para famílias e amigos desacelerarem, conviverem e criarem memórias juntos.",
  alternates: { canonical: "/enjoy" },
  openGraph: { images: [enjoy.image] },
};

export default function EnjoyPage() {
  return (
    <>
      <PageHero title={enjoy.title} subtitle={enjoy.tagline} image={enjoy.image} crumbs={[{ label: "Nossos Projetos", href: "/o-que-fazemos" }]} />
      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-[420px]">
            <div className="relative aspect-[900/608] w-full">
              <Image src="/img/marca/enjoy.png" alt="Logotipo do projeto Enjoy" fill sizes="420px" className="object-contain" />
            </div>
          </Reveal>
          <Reveal>
            <SectionTitle eyebrow="Nossos projetos" title="Sobre o Enjoy" />
            <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-ink/85">
              {enjoy.body.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
      <Closing />
    </>
  );
}
