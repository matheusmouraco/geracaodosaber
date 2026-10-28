import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { CountriesMarquee } from "@/components/blocks/Marquees";
import { Gallery } from "@/components/blocks/Gallery";
import { VisionStrip } from "@/components/blocks/Vision";
import { TeamGrid } from "@/components/blocks/Team";
import { Achievements } from "@/components/blocks/Achievements";
import { PhotoFrame } from "@/components/PhotoFrame";
import { Container, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça o Geração do Saber e a Cross Missions: desde 2018 referência em transformação social nos países de língua portuguesa, com escolas, alimentação e saúde na Guiné-Bissau.",
  alternates: { canonical: "/sobre-nos" },
  openGraph: { images: ["/img/fotos/muro-pintado.jpg"] },
};

export default function SobrePage() {
  return (
    <>
      <PageHero title="Quem Somos" subtitle="Transformando vidas com amor, fé e esperança" image="/img/fotos/muro-pintado.jpg" />
      <CountriesMarquee />

      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Nossa história em fotos" title="A missão acontece no chão das aldeias" />
          <div className="mt-12">
            <Gallery />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <SectionTitle
              eyebrow="Nossa visão"
              title="Planos e alvos para o futuro"
              intro={
                <>
                  <p>
                    Cross Missions tem sido referência em ações sociais em várias nações, e desde 2018 nossa missão passou a ser referência em transformação social nos países de língua portuguesa, por meio da criação de centros de aprendizagem e ações que promovam dignidade, equidade e desenvolvimento integral. Acreditamos que a verdadeira mudança começa com oportunidades reais e relacionamentos construídos com empatia e respeito.
                  </p>
                  <p>
                    Nossas ações são guiadas por valores como compaixão, amor ao próximo e solidariedade. Cremos no poder da esperança e na capacidade de cada pessoa para superar desafios e construir um novo futuro. A fé que nos inspira se expressa no compromisso com a justiça, a ética e a colaboração com voluntários, doadores e lideranças locais. Trabalhamos por soluções sustentáveis, duradouras e que reflitam o cuidado com as pessoas e com o mundo ao nosso redor.
                  </p>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <PhotoFrame src="/img/fotos/voluntaria-na-aldeia.jpg" alt="Voluntária com um grupo de crianças em uma aldeia" corner="br" arc="accent" className="mx-auto max-w-[460px]" />
          </Reveal>
        </Container>
        <Container className="mt-16">
          <VisionStrip />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Nossa equipe" title="Dedicada a Deus e à Transformação" align="center" />
          <div className="mt-14">
            <TeamGrid />
          </div>
        </Container>
      </section>

      <Achievements intro="Com alegria e gratidão, celebramos tudo o que conquistamos ao longo dos nossos 12 anos de existência. Foram inúmeras crianças formadas, famílias alcançadas e vidas transformadas. Cada resultado é reflexo do amor, da dedicação e do empenho de todos que caminharam conosco." />
      <Closing />
    </>
  );
}
