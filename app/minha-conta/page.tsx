import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AccountApp } from "@/components/account/AccountApp";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Minha Conta",
  description: "Área do padrinho e da madrinha do Geração do Saber: acompanhe seu apadrinhamento.",
  robots: { index: false },
};

export default function MinhaContaPage() {
  return (
    <>
      <PageHero title="Minha Conta" subtitle="Área do padrinho e da madrinha" image="/img/fotos/criancas-na-areia.jpg" />
      <section className="relative z-10 -mt-10 pb-24 md:-mt-14">
        <Container className="max-w-5xl">
          <AccountApp />
        </Container>
      </section>
    </>
  );
}
