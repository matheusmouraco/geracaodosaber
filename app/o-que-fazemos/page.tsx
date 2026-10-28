import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { ProjectGrid } from "@/components/blocks/Projects";
import { Container, SectionTitle } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "O Que Fazemos",
  description:
    "Educação infantil, alimentação, saúde, formação de professores, esporte e construção de casas e poços: conheça os projetos da Cross Missions na Guiné-Bissau.",
  alternates: { canonical: "/o-que-fazemos" },
  openGraph: { images: ["/img/projetos/educacao-infantil.jpg"] },
};

export default function OQueFazemosPage() {
  return (
    <>
      <PageHero title="O Que Fazemos" subtitle="Educação e apoio para comunidades vulneráveis" image="/img/fotos/equipe-na-aldeia.jpg" />
      <section className="py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Nossos projetos"
            title="Venha Fazer Parte dos Nossos Projetos!"
            intro={<p>Cada frente nasce de uma necessidade real das aldeias. Escolha uma causa, conheça a história e apoie com uma doação ou apadrinhamento.</p>}
          />
          <div className="mt-14">
            <ProjectGrid projects={projects} />
          </div>
        </Container>
      </section>
      <Closing />
    </>
  );
}
