import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { EventsList } from "@/components/blocks/EventsList";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPanel } from "@/components/FormPanel";
import { Container, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Cultos missionários, conferências e viagens à Guiné-Bissau. Veja a agenda de eventos da Cross Missions e cadastre-se para participar.",
  alternates: { canonical: "/agenda" },
};

export default function AgendaPage() {
  return (
    <>
      <PageHero title="Agenda" subtitle="Eventos que transformam vidas – junte-se a nós" image="/img/fotos/festa-dia-feliz.jpg" />
      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="Eventos" title="Cultos, conferências e viagens" />
            <div className="mt-10">
              <EventsList />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FormPanel title="Faça Seu Cadastro" text="Receba os convites dos próximos eventos e viagens missionárias.">
              <LeadForm type="agenda" submitLabel="Enviar" tone="dark" successTitle="Cadastro feito!" successText="Você vai receber os convites dos próximos eventos." />
            </FormPanel>
          </div>
        </Container>
      </section>
      <Closing />
    </>
  );
}
