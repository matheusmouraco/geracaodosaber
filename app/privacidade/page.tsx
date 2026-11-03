import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o New Generation coleta, usa e protege os dados pessoais enviados pelo site, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "Quem somos",
    body: [`Este site é do ${site.name}, projeto mantido pela ${site.legalName}. Para qualquer assunto sobre seus dados, fale com a gente pelo e-mail ${site.email} ou pelo WhatsApp ${site.phone}.`],
  },
  {
    title: "Quais dados coletamos",
    body: [
      "Apenas os dados que você informa nos formulários: nome, e-mail, telefone e, conforme o formulário, mensagem, profissão, data de nascimento, plano de apadrinhamento ou valor da doação.",
      "Não coletamos dados de cartão. Pagamentos por Pix, transferência, MB Way, IBAN ou PayPal acontecem diretamente no seu banco ou no PayPal.",
    ],
  },
  {
    title: "Para que usamos",
    body: [
      "Responder ao seu contato, organizar voluntários e eventos, identificar e agradecer doações, ativar e acompanhar apadrinhamentos e enviar notícias quando você assina a newsletter.",
      "Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais.",
    ],
  },
  {
    title: "Base legal e por quanto tempo guardamos",
    body: [
      "Tratamos os dados com base no seu consentimento e na execução do relacionamento que você pediu (apadrinhamento ou voluntariado), conforme a Lei 13.709/2018 (LGPD).",
      "Guardamos os dados enquanto o relacionamento estiver ativo ou até você pedir a exclusão.",
    ],
  },
  {
    title: "Seus direitos",
    body: [
      "Você pode pedir a qualquer momento acesso, correção, portabilidade ou exclusão dos seus dados, e cancelar o recebimento de notícias. Basta enviar o pedido pelos contatos acima.",
    ],
  },
  {
    title: "Cookies",
    body: ["O site não usa cookies de publicidade. Usamos apenas o armazenamento técnico necessário para o funcionamento das páginas."],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero title="Política de Privacidade" subtitle="Como cuidamos dos dados que você nos confia" image="/img/fotos/muro-pintado.jpg" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-2xl font-extrabold text-primary md:text-3xl">{s.title}</h2>
                <div className="mt-3 space-y-3 text-[17px] leading-relaxed text-ink/80">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
