"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, Check, CreditCard, QrCode } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { WhatsAppIcon } from "@/components/icons";
import { CopyField } from "./CopyField";
import { formatBRL, paypal, pixBRL, type Plan } from "@/content/donation";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/** Cadastro do padrinho → contribuição mensal (Pix ou PayPal) → confirmação pelo WhatsApp */
export function SponsorFlow({ plan }: { plan: Plan }) {
  const [donor, setDonor] = useState<{ nome: string; whatsapp?: string } | null>(null);
  const [method, setMethod] = useState<"pix" | "paypal">("pix");
  const reduce = useReducedMotion();

  const confirmText = `Olá! Acabei de me cadastrar no site como padrinho/madrinha no plano ${plan.name} (${formatBRL(plan.price)}/mês)${donor?.nome ? `. Meu nome é ${donor.nome}` : ""}.`;

  return (
    <div className="overflow-hidden rounded-[var(--radius-section)] bg-white shadow-[var(--shadow-lift)]">
      <ol className="flex border-b border-line bg-mist/70 px-5 py-4 font-ui text-[13px] font-semibold sm:px-8" aria-label="Etapas">
        {["Seus dados", "Contribuição mensal"].map((label, i) => {
          const active = (donor ? 1 : 0) === i;
          const done = donor && i === 0;
          return (
            <li key={label} className="flex flex-1 items-center gap-2.5" aria-current={active ? "step" : undefined}>
              <span className={cn("grid size-8 place-items-center rounded-full", done ? "bg-primary text-white" : active ? "bg-accent text-on-accent" : "bg-white text-muted ring-1 ring-line")}>
                {done ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={active ? "text-ink" : "text-muted"}>{label}</span>
              {i === 0 && <span className={cn("mx-3 h-0.5 flex-1 rounded-full", donor ? "bg-primary" : "bg-line")} />}
            </li>
          );
        })}
      </ol>

      <div className="p-5 sm:p-8 md:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {!donor ? (
            <motion.div key="dados" initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }}>
              <h2 className="font-display text-[28px] font-black leading-tight text-primary md:text-4xl">Faça seu cadastro</h2>
              <p className="mt-2 text-muted">Com seus dados enviamos as atualizações, fotos e relatos do seu afilhado(a).</p>
              <LeadForm
                type="apadrinhamento"
                extra={{ plano: plan.slug }}
                submitLabel="Continuar para a contribuição"
                className="mt-8"
                onSuccess={(d, meta) => setDonor({ nome: d.nome ?? "", whatsapp: meta.whatsapp })}
              />
            </motion.div>
          ) : (
            <motion.div key="pagamento" initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-display text-[28px] font-black leading-tight text-primary md:text-4xl">
                Obrigado{donor.nome ? `, ${donor.nome.split(" ")[0]}` : ""}! Agora a contribuição mensal
              </h2>
              <p className="mt-2 text-muted">
                Valor do plano: <strong className="text-ink">{formatBRL(plan.price)} por mês</strong>. Escolha como contribuir:
              </p>

              <div role="tablist" aria-label="Forma de contribuição" className="mt-7 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["pix", "Pix mensal", "Agende um Pix recorrente no seu banco", QrCode],
                    ["paypal", "PayPal", "Cartão de crédito, com opção mensal", CreditCard],
                  ] as const
                ).map(([id, label, hint, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={method === id}
                    onClick={() => setMethod(id)}
                    className={cn("flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors", method === id ? "border-primary bg-primary/5" : "border-line hover:border-primary/40")}
                  >
                    <Icon className={cn("size-6 shrink-0", method === id ? "text-primary" : "text-muted")} aria-hidden />
                    <span>
                      <span className="block font-ui font-bold text-ink">{label}</span>
                      <span className="block text-[13px] text-muted">{hint}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div role="tabpanel" className="mt-5 rounded-[var(--radius-card)] bg-mist p-5 sm:p-7">
                {method === "pix" ? (
                  <div className="grid items-start gap-6 md:grid-cols-[auto_1fr]">
                    <div className="mx-auto rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
                      <QRCodeSVG value={pixBRL.code} size={168} level="M" title="QR Code Pix do New Generation" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[14px] text-muted">
                        Faça o primeiro Pix de {formatBRL(plan.price)} e agende a repetição mensal no app do seu banco (opção “Pix agendado recorrente”). Favorecido: {pixBRL.holder}.
                      </p>
                      <CopyField label={`Chave Pix (${pixBRL.keyType})`} value={pixBRL.key} />
                      <CopyField label="Pix copia e cola" value={pixBRL.code} display={`${pixBRL.code.slice(0, 34)}…`} mono />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-[14px] text-muted">
                      No PayPal, informe {formatBRL(plan.price)} e, se aparecer, marque a opção de doação mensal. A página abre em uma nova aba.
                    </p>
                    <a href={paypal.brl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[10px] bg-[#ffc439] px-6 py-4 font-ui font-bold text-[#003087] transition-transform hover:-translate-y-0.5">
                      Contribuir com PayPal <ArrowRight className="size-4" aria-hidden />
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-4 rounded-[var(--radius-card)] border-2 border-dashed border-[#25D366]/50 p-5 sm:flex-row sm:items-center">
                <p className="flex-1 text-[15px] text-ink/80">
                  <strong className="text-ink">Último passo:</strong> envie o comprovante pelo WhatsApp para ativarmos seu apadrinhamento e enviarmos as primeiras notícias.
                </p>
                <a
                  href={donor.whatsapp ? `${donor.whatsapp}${encodeURIComponent("\n\nJá fiz a contribuição mensal e vou enviar o comprovante.")}` : waLink(confirmText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-5 py-3.5 font-ui font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="size-5" /> Enviar comprovante
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
