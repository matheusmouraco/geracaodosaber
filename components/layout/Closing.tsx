import { Heart } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Arc } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { site } from "@/content/site";

/** CTA final em laranja + newsletter. Aparece no fim de quase todas as páginas. */
export function Closing({ cta = true }: { cta?: boolean }) {
  return (
    <section aria-label="Participe" className="relative bg-white pb-0 pt-16 md:pt-24">
      {cta && (
        <Container>
          <Reveal className="grain relative overflow-hidden rounded-[var(--radius-section)] bg-accent px-6 py-14 text-on-accent sm:px-12 md:py-20">
            <Arc className="absolute -right-20 -top-24 size-80 text-white/15" weight={20} />
            <Arc className="absolute -bottom-28 -left-16 size-72 rotate-180 text-sun/70" weight={18} />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="font-ui text-[13px] font-semibold uppercase tracking-[0.2em] text-on-accent/80">“{site.verse}”</p>
              <h2 className="mt-5 font-display text-[34px] font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                Uma história escrita a muitas mãos
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] font-medium text-on-accent md:text-lg">
                Sua doação ou apadrinhamento coloca comida no prato, caderno na mochila e um professor na sala de aula.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/doacao" variant="light" className="bg-primary! text-white! hover:bg-navy!">
                  <Heart className="size-4 fill-current" aria-hidden /> Doar agora
                </ButtonLink>
                <ButtonLink href="/apadrinhamento" variant="outline" arrow>
                  Apadrinhar uma criança
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      )}

      <div className="relative mt-16 md:mt-24">
        <div className="grain dots relative overflow-hidden rounded-t-[var(--radius-section)] bg-primary">
          <Container className="grid items-center gap-6 py-12 md:grid-cols-2 md:gap-12 md:py-16">
            <h2 className="max-w-xl font-display text-2xl font-extrabold leading-tight text-white md:text-[30px]">
              Assine nossa newsletter e fique por dentro das nossas últimas novidades
            </h2>
            <NewsletterForm />
          </Container>
        </div>
      </div>
    </section>
  );
}
