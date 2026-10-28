import { Arc } from "@/components/icons";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain dots relative isolate flex min-h-[80vh] items-center overflow-hidden bg-secondary pb-20 pt-36 text-white">
      <Arc className="absolute -right-24 top-24 -z-10 size-96 text-sun" weight={16} />
      <Container>
        <p className="font-ui text-[13px] font-semibold uppercase tracking-[0.18em] text-sun">Erro 404</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-black leading-none md:text-7xl">Esta página não foi encontrada</h1>
        <p className="mt-5 max-w-lg text-lg text-white/80">O endereço pode ter mudado com o novo site. Volte para o início ou vá direto para a doação.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="light" arrow>
            Ir para o início
          </ButtonLink>
          <ButtonLink href="/doacao">Doar agora</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
