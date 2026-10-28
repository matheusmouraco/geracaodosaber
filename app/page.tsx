import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { GoalsAccordion } from "@/components/home/GoalsAccordion";
import { CountriesMarquee } from "@/components/blocks/Marquees";
import { ProjectGrid } from "@/components/blocks/Projects";
import { Achievements } from "@/components/blocks/Achievements";
import { Testimonials } from "@/components/blocks/Testimonials";
import { VisionStrip } from "@/components/blocks/Vision";
import { Pillars } from "@/components/blocks/Pillars";
import { TeamGrid } from "@/components/blocks/Team";
import { LeadForm } from "@/components/forms/LeadForm";
import { Closing } from "@/components/layout/Closing";
import { PhotoFrame } from "@/components/PhotoFrame";
import { FormPanel } from "@/components/FormPanel";
import { ButtonLink, Container, Eyebrow, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { homeProjectSlugs, projects } from "@/content/projects";
import { pillars } from "@/content/pillars";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Geração do Saber | Juntos fazemos a diferença no mundo de cada criança" },
  description:
    "Apadrinhe uma criança, doe ou seja voluntário na Guiné-Bissau. O Geração do Saber, projeto da Cross Missions, leva educação, alimentação, saúde e fé a comunidades vulneráveis nos países de língua portuguesa.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}${site.logo.color}`,
  description: site.description,
  email: site.email,
  telephone: "+5511989270283",
  areaServed: ["Guiné-Bissau", "Brasil", "Portugal"],
  sameAs: [site.instagram.url],
  parentOrganization: { "@type": "NGO", name: site.parent },
  contactPoint: { "@type": "ContactPoint", telephone: "+5511989270283", email: site.email, contactType: "customer support", availableLanguage: ["Portuguese"] },
  potentialAction: { "@type": "DonateAction", target: `${site.url}/doacao`, recipient: { "@type": "NGO", name: site.name } },
};

export default function HomePage() {
  const homeProjects = homeProjectSlugs.map((s) => projects.find((p) => p.slug === s)!);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <CountriesMarquee className="mt-16 md:mt-20" />

      {/* Nosso Alvo */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <PhotoFrame src="/img/fotos/aluno-formado.jpg" alt="Aluno formado segurando seu certificado" corner="tl" className="mx-auto max-w-[520px]">
              <div className="absolute -bottom-6 right-4 max-w-[260px] rounded-2xl bg-white p-5 shadow-[var(--shadow-lift)] md:-right-6">
                <p className="font-display text-4xl font-black text-accent-ink">30.000</p>
                <p className="mt-1 text-[14px] font-semibold leading-snug text-secondary">crianças por dia é o alvo do nosso apadrinhamento</p>
              </div>
            </PhotoFrame>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <SectionTitle
              eyebrow="Nosso alvo"
              title="Paixão desta missão"
              intro={
                <p>
                  O objetivo é expandir projetos em países lusófonos, alcançando mais crianças, famílias e comunidades. Planeja-se oferecer educação, alimentação e apoio emocional, construir centros de aprendizagem, unidades de saúde e espaços comunitários, capacitar professores e líderes locais, além de ampliar campanhas sociais para ajudar famílias vulneráveis. Uma rede global de voluntários será mobilizada, promovendo habilidades e dedicação, com foco em amor, esperança e fé.
                </p>
              }
            />
            <div className="mt-8">
              <GoalsAccordion />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* O Que Fazemos */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="O que fazemos" title="Projetos que mudam o dia a dia das aldeias" />
            <ButtonLink href="/o-que-fazemos" variant="outline" arrow className="shrink-0 self-start md:self-auto">
              Ver todos os projetos
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ProjectGrid projects={homeProjects} variant="home" layout="row" />
          </div>
        </Container>
      </section>



      <Achievements />

      {/* Depoimentos */}
      <section className="py-20 md:py-28" aria-labelledby="depo-titulo">
        <Container>
          <Eyebrow>Depoimentos</Eyebrow>
          <h2 id="depo-titulo" className="sr-only">
            Depoimentos
          </h2>
          <div className="mt-8">
            <Testimonials />
          </div>
        </Container>
      </section>

      {/* Nossa Visão */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionTitle eyebrow="Nossa visão" title="Planos e alvos para o futuro" />
            </Reveal>
            <Reveal delay={0.1} className="space-y-4 text-[16px] leading-relaxed text-muted md:text-[18px]">
              <p>
                Nosso objetivo é transformar comunidades vulneráveis, oferecendo educação, saúde e apoio espiritual, capacitando crianças, famílias e líderes locais para um futuro mais digno. Buscamos ser reconhecidos por fazer Jesus conhecido, impactando vidas e comunidades através do amor, fé e solidariedade.
              </p>
              <p>
                Nossas ações são guiadas por valores como o amor ao próximo, agindo com compaixão e empatia. Acreditamos na esperança transformadora, confiando no potencial de cada pessoa para mudar sua realidade. Nossa fé é a base de nossas iniciativas, e prezamos pela transparência, ética e colaboração com voluntários, doadores e líderes locais, promovendo sempre ações sustentáveis e duradouras.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <VisionStrip />
          </div>
        </Container>
      </section>

      {/* Voluntário */}
      <section id="voluntario" className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionTitle
                eyebrow="Seja um voluntário"
                title="Pronto para escrever esta história conosco?"
                intro={
                  <p>
                    Será uma honra tê-lo conosco nesta missão! Ao dizer “sim” a esse chamado, você leva amor e esperança às comunidades, refletindo um coração generoso e comprometido.
                  </p>
                }
              />
            </Reveal>
            <div className="mt-10">
              <Pillars items={pillars.home} variant="list" />
            </div>
          </div>
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <FormPanel title="Faça Seu Cadastro" text="Conte quem você é e como gostaria de servir. Retornamos pelo WhatsApp ou e-mail.">
              <LeadForm type="voluntario" submitLabel="Enviar" tone="dark" successTitle="Cadastro recebido!" successText="Obrigado por dizer sim. Nossa equipe vai entrar em contato com os próximos passos." />
            </FormPanel>
          </Reveal>
        </Container>
      </section>

      {/* Equipe */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Nossa equipe" title="Dedicada a Deus e à Transformação" align="center" />
          <div className="mt-14">
            <TeamGrid />
          </div>
        </Container>
      </section>

      <Closing />
    </>
  );
}
