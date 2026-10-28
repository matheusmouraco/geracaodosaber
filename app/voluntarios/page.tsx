import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { Testimonials } from "@/components/blocks/Testimonials";
import { Pillars } from "@/components/blocks/Pillars";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPanel } from "@/components/FormPanel";
import { Container, Eyebrow, SectionTitle } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { pillars } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Voluntários",
  description:
    "Seja voluntário na Guiné-Bissau: saúde, educação, construção ou simplesmente amor e presença. Todas as profissões são bem-vindas na Cross Missions.",
  alternates: { canonical: "/voluntarios" },
  openGraph: { images: ["/img/projetos/voluntariado.jpg"] },
};

export default function VoluntariosPage() {
  return (
    <>
      <PageHero title="Voluntários" subtitle="Doe seu tempo, faça a diferença real" image="/img/fotos/voluntarias-com-criancas.jpg" />

      <section className="py-20 md:py-28" aria-labelledby="depo-titulo">
        <Container>
          <Eyebrow>Quem já foi</Eyebrow>
          <h2 id="depo-titulo" className="mt-3 font-display text-[28px] font-extrabold text-primary sm:text-4xl">
            Histórias de quem disse sim
          </h2>
          <div className="mt-12">
            <Testimonials />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionTitle
                eyebrow="Seja um voluntário"
                title="Seja Um Voluntário"
                intro={
                  <p>
                    Aqui todos são bem-vindos ao nosso time de voluntários! Sua dedicação será um exemplo de amor em ação, trazendo alegria e renovação tanto para as comunidades atendidas quanto para sua própria vida.
                  </p>
                }
              />
            </Reveal>
            <div className="mt-10">
              <Pillars items={pillars.voluntarios} variant="list" />
            </div>
          </div>
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <FormPanel title="Faça Seu Cadastro" text="Conte sua profissão e disponibilidade. Todas as áreas são bem-vindas.">
              <LeadForm type="voluntario" submitLabel="Inscreva-se" tone="dark" successTitle="Inscrição recebida!" successText="Obrigado por dizer sim. Nossa equipe vai entrar em contato com os próximos passos." />
            </FormPanel>
          </Reveal>
        </Container>
      </section>

      <Closing />
    </>
  );
}
