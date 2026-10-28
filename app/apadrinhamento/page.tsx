import type { Metadata } from "next";
import { CalendarHeart, HeartHandshake, MessageCircleHeart } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { PlanCards } from "@/components/blocks/Plans";
import { Pillars } from "@/components/blocks/Pillars";
import { PhotoFrame } from "@/components/PhotoFrame";
import { ButtonLink, Container, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { pillars } from "@/content/pillars";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Seja um Padrinho",
  description:
    "Apadrinhe uma criança na Guiné-Bissau a partir de R$ 35 por mês: café da manhã, almoço, uniforme, material escolar e ensino com princípios cristãos.",
  alternates: { canonical: "/apadrinhamento" },
  openGraph: { images: ["/img/projetos/educacao-infantil.jpg"] },
};

const steps = [
  { icon: HeartHandshake, title: "Escolha o plano", text: "Educacional, nutricional, integral ou apadrinhe um professor local." },
  { icon: CalendarHeart, title: "Contribua todo mês", text: "A assinatura mensal garante a continuidade do cuidado com a criança." },
  { icon: MessageCircleHeart, title: "Acompanhe o impacto", text: "Receba atualizações, fotos e relatos do progresso do seu afilhado(a)." },
];

export default function ApadrinhamentoPage() {
  return (
    <>
      <PageHero title="Seja um Padrinho" subtitle="Conecte-se e transforme o futuro de uma criança" image="/img/fotos/criancas-na-areia.jpg">
        <ButtonLink href="#planos" arrow>
          Ver planos
        </ButtonLink>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <PhotoFrame src="/img/projetos/educacao-infantil.jpg" alt="Madrinha da missão com uma criança no colo, em frente à escola" corner="tl" aspect="aspect-[5/4]" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle
              eyebrow="Programa de apadrinhamento"
              title="Muito mais do que apoio financeiro"
              intro={
                <p>
                  Apadrinhar uma criança na África significa muito mais do que oferecer apoio financeiro; é garantir dignidade, educação e a chance de sonhar com um futuro diferente. Essas crianças recebem café da manhã, almoço, uniforme, material escolar e ensino fundamentado em princípios cristãos.
                </p>
              }
            />
            <ol className="mt-10 grid gap-5 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="font-ui text-[12px] font-bold text-accent-ink">Passo {i + 1}</span>
                  <s.icon className="mt-2 size-7 text-primary" aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-extrabold text-secondary">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section id="planos" className="scroll-mt-24 bg-mist py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Planos mensais" title="Escolha como apadrinhar" align="center" intro={<p>Contribuição mensal em reais, por Pix ou PayPal. Escolha o plano e faça seu cadastro em menos de 2 minutos.</p>} />
          <div className="mt-16">
            <PlanCards />
          </div>
          <p className="mt-10 text-center text-[15px] text-muted">
            Está fora do Brasil? Você também pode contribuir em euro ou dólar pela{" "}
            <a href="/doacao" className="font-semibold text-primary underline underline-offset-4 hover:text-secondary">
              página de doação
            </a>{" "}
            ou falar com a gente pelo{" "}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4 hover:text-secondary">
              WhatsApp
            </a>
            .
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Por que apadrinhar" title="O que o seu sim provoca" />
          <div className="mt-12">
            <Pillars items={pillars.apadrinhamento} columns={4} />
          </div>
        </Container>
      </section>

      <Closing />
    </>
  );
}
