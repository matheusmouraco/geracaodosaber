import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { DonationWizard } from "@/components/donation/DonationWizard";
import { Pillars } from "@/components/blocks/Pillars";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPanel } from "@/components/FormPanel";
import { WhatsAppIcon } from "@/components/icons";
import { Container, SectionTitle } from "@/components/ui";
import { donationWhatsapp } from "@/content/donation";
import { pillars } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Doações & Apadrinhamento",
  description: "Doe em reais (Pix, transferência ou PayPal), euros (MB Way, IBAN ou PayPal) ou dólares, ou apadrinhe uma criança na Guiné-Bissau a partir de R$ 35 por mês.",
  alternates: { canonical: "/doacao" },
};

export default function DoacaoPage() {
  return (
    <>
      <PageHero title="Doações & Apadrinhamento" subtitle="Uma história escrita a muitas mãos – junte-se a nós." image="/img/fotos/construcao-tijolos.jpg" />

      <section className="relative z-10 -mt-10 pb-20 md:-mt-16 md:pb-28">
        <Container>
          <DonationWizard />
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="Para onde vai sua doação" title="Cada contribuição vira obra, comida e estudo" />
          <div className="mt-12">
            <Pillars items={pillars.doacao} columns={4} />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionTitle
              eyebrow="Dúvidas sobre doação"
              title="Fale conosco"
              intro={<p>Quer doar de outro jeito, receber recibo ou apoiar um projeto específico? Mande uma mensagem ou chame no WhatsApp.</p>}
            />
            <a
              href={donationWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-[10px] bg-[#25D366] px-6 py-4 font-ui font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-5" /> WhatsApp
            </a>
          </div>
          <FormPanel eyebrow="Contato" title="Fale Conosco">
            <LeadForm type="contato" submitLabel="Enviar" tone="dark" />
          </FormPanel>
        </Container>
      </section>

      <Closing cta={false} />
    </>
  );
}
