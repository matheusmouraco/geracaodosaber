import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Closing } from "@/components/layout/Closing";
import { Container } from "@/components/ui";

// Página reservada: o título e o texto de apresentação do projeto ainda serão enviados
export const metadata: Metadata = {
  title: "Enjoy",
  description: "Enjoy, um dos projetos do New Generation.",
  alternates: { canonical: "/enjoy" },
  robots: { index: false },
};

export default function EnjoyPage() {
  return (
    <>
      <PageHero
        title="Enjoy"
        subtitle="Em breve, a apresentação completa deste projeto."
        image="/img/fotos/voluntarias-com-criancas.jpg"
        crumbs={[{ label: "Nossos Projetos", href: "/o-que-fazemos" }]}
      />
      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-center text-center">
          <div className="relative aspect-[900/608] w-full max-w-[420px]">
            <Image src="/img/marca/enjoy.png" alt="Logotipo do projeto Enjoy" fill sizes="420px" className="object-contain" />
          </div>
          <p className="mt-10 max-w-lg text-lg leading-relaxed text-muted">Estamos preparando o conteúdo do Enjoy. Volte em breve para conhecer o projeto.</p>
        </Container>
      </section>
      <Closing />
    </>
  );
}
