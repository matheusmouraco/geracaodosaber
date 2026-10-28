"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, ArrowRight, Building2, CalendarHeart, Check, CreditCard, Gift, Heart, Landmark, Loader2, QrCode, Share2, Smartphone, UserRound, VenetianMask } from "lucide-react";
import { Flag } from "@/components/Flag";
import { CopyField } from "./CopyField";
import { Button } from "@/components/ui";
import { bankBRL, currencies, euro, formatBRL, paypal, pixBRL, plans, suggestedAmounts, type Currency } from "@/content/donation";
import { formatPhone, schemaFor, type FieldName } from "@/lib/forms";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Step = "moeda" | "tipo" | "dados" | "metodo" | "obrigado";
type Method = "pix" | "conta" | "paypal" | "mbway" | "iban";

const methodsBy: Record<Currency, { id: Method; label: string; hint: string; icon: typeof QrCode }[]> = {
  brl: [
    { id: "pix", label: "Pix", hint: "Na hora, sem taxas", icon: QrCode },
    { id: "conta", label: "Transferência", hint: "Banco Itaú", icon: Landmark },
    { id: "paypal", label: "PayPal", hint: "Cartão ou saldo", icon: CreditCard },
  ],
  eur: [
    { id: "mbway", label: "MB Way", hint: "Portugal", icon: Smartphone },
    { id: "iban", label: "IBAN", hint: "Transferência SEPA", icon: Landmark },
    { id: "paypal", label: "PayPal", hint: "Cartão ou saldo", icon: CreditCard },
  ],
  usd: [{ id: "paypal", label: "PayPal", hint: "Cartão ou saldo", icon: CreditCard }],
};

const symbol = (c: Currency) => currencies.find((x) => x.id === c)!.symbol;

export function DonationWizard() {
  const [step, setStep] = useState<Step>("moeda");
  const [currency, setCurrency] = useState<Currency>("brl");
  const [method, setMethod] = useState<Method>("pix");
  const [donor, setDonor] = useState<{ nome?: string; valor?: string } | null>(null);
  const reduce = useReducedMotion();
  const top = useRef<HTMLDivElement>(null);

  // Compatibilidade com as rotas antigas: /doacao?moeda=brl&metodo=pix ou &etapa=metodo
  // (lido no navegador porque a página é pré-renderizada sem searchParams)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const q = new URLSearchParams(window.location.search);
    const m = q.get("moeda") as Currency | null;
    if (!m || !["brl", "eur", "usd"].includes(m)) return;
    setCurrency(m);
    const met = q.get("metodo") as Method | null;
    if (met && methodsBy[m].some((x) => x.id === met)) {
      setMethod(met);
      setStep("metodo");
    } else if (q.get("etapa") === "metodo") {
      setMethod(methodsBy[m][0].id);
      setStep("metodo");
    } else {
      setStep(m === "brl" ? "tipo" : "dados");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const go = (s: Step) => {
    setStep(s);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
  };

  const flow: Step[] = currency === "brl" ? ["moeda", "tipo", "dados", "metodo"] : ["moeda", "dados", "metodo"];
  const labels: Record<Step, string> = { moeda: "Moeda", tipo: "Tipo", dados: "Seus dados", metodo: "Pagamento", obrigado: "Obrigado" };
  const current = step === "obrigado" ? flow.length : flow.indexOf(step);
  const back = () => go(flow[Math.max(0, current - 1)]);

  return (
    <div ref={top} className="scroll-mt-28 overflow-hidden rounded-[var(--radius-section)] bg-white shadow-[var(--shadow-lift)]">
      {/* Progresso */}
      <div className="border-b border-line bg-mist/70 px-5 py-4 sm:px-8">
        <ol className="flex items-center gap-2 sm:gap-3" aria-label="Etapas da doação">
          {flow.map((s, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li key={s} className="flex flex-1 items-center gap-2 sm:gap-3" aria-current={active ? "step" : undefined}>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full font-ui text-[13px] font-bold transition-colors",
                    done ? "bg-primary text-white" : active ? "bg-accent text-on-accent" : "bg-white text-muted ring-1 ring-line",
                  )}
                >
                  {done ? <Check className="size-4" aria-hidden /> : i + 1}
                </span>
                <span className={cn("hidden font-ui text-[13px] font-semibold sm:block", active ? "text-ink" : "text-muted")}>{labels[s]}</span>
                {i < flow.length - 1 && <span className={cn("h-0.5 flex-1 rounded-full", done ? "bg-primary" : "bg-line")} />}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-5 sm:p-8 md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step + method}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === "moeda" && (
              <StepShell title="Escolha o método de pagamento" text="Em qual moeda você quer contribuir?">
                <div className="grid gap-4 md:grid-cols-3">
                  {currencies.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCurrency(c.id);
                        setMethod(methodsBy[c.id][0].id);
                        go(c.id === "brl" ? "tipo" : "dados");
                      }}
                      className={cn(
                        "group flex items-center gap-4 rounded-[var(--radius-card)] border-2 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-card)] md:flex-col md:items-start md:p-6",
                        currency === c.id ? "border-primary" : "border-line",
                      )}
                    >
                      <Flag code={c.flag} className="w-12 md:w-14" />
                      <span className="flex-1">
                        <span className="block font-display text-2xl font-black text-secondary">
                          {c.symbol} <span className="text-muted">•</span> {c.label}
                        </span>
                        <span className="mt-1 block text-[14px] text-muted">{c.hint}</span>
                      </span>
                      <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1 md:hidden" aria-hidden />
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === "tipo" && (
              <StepShell title="Como você quer ajudar?" text="Doação única, de qualquer valor, ou apadrinhamento mensal de uma criança.">
                <div className="grid gap-4 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => go("dados")}
                    className="group flex flex-col items-start rounded-[var(--radius-card)] border-2 border-line p-6 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent text-on-accent">
                      <Gift className="size-6" aria-hidden />
                    </span>
                    <span className="mt-4 font-display text-2xl font-black text-secondary">Doação única</span>
                    <span className="mt-1 text-[15px] text-muted">Pix, transferência ou PayPal. Você escolhe o valor.</span>
                    <span className="mt-5 inline-flex items-center gap-2 font-ui text-[14px] font-semibold text-primary">
                      Continuar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </button>
                  <div className="grain flex flex-col rounded-[var(--radius-card)] bg-secondary p-6 text-white">
                    <span className="grid size-12 place-items-center rounded-2xl bg-sun text-ink">
                      <CalendarHeart className="size-6" aria-hidden />
                    </span>
                    <span className="mt-4 font-display text-2xl font-black">Apadrinhamento mensal</span>
                    <span className="mt-1 text-[15px] text-white/75">Assinatura mensal com cartão. Escolha o plano:</span>
                    <ul className="mt-4 grid gap-2">
                      {plans.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/apadrinhar/${p.slug}`}
                            className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 font-ui text-[14px] font-semibold transition-colors hover:bg-white hover:text-secondary"
                          >
                            <span>{p.short}</span>
                            <span className="text-sun">{formatBRL(p.price)}/mês</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StepShell>
            )}

            {step === "dados" && (
              <IdentifyStep
                currency={currency}
                onDone={(d) => {
                  setDonor(d);
                  go("metodo");
                }}
                onAnonymous={() => {
                  setDonor(null);
                  if (currency === "usd") {
                    window.open(paypal.usd, "_blank", "noopener");
                    go("obrigado");
                  } else go("metodo");
                }}
              />
            )}

            {step === "metodo" && (
              <StepShell
                title={donor?.nome ? `Obrigado, ${donor.nome.split(" ")[0]}!` : "Obrigado!"}
                text="Sua contribuição e amor será uma fonte de alegria e realização, e juntos faremos a diferença no mundo. Escolha como enviar:"
              >
                <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                  <div role="tablist" aria-label="Forma de pagamento" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                    {methodsBy[currency].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        role="tab"
                        aria-selected={method === m.id}
                        onClick={() => setMethod(m.id)}
                        className={cn(
                          "flex min-w-[150px] items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-colors lg:min-w-0",
                          method === m.id ? "border-primary bg-primary/5" : "border-line hover:border-primary/40",
                        )}
                      >
                        <m.icon className={cn("size-6 shrink-0", method === m.id ? "text-primary" : "text-muted")} aria-hidden />
                        <span>
                          <span className="block font-ui font-bold text-ink">{m.label}</span>
                          <span className="block text-[12px] text-muted">{m.hint}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div role="tabpanel" className="rounded-[var(--radius-card)] bg-mist p-5 sm:p-7">
                    <MethodPanel currency={currency} method={method} amount={donor?.valor} />
                    <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[14px] text-muted">Você pode doar qualquer valor!</p>
                      <Button type="button" onClick={() => go("obrigado")}>
                        <Check className="size-4" aria-hidden /> Já fiz minha doação
                      </Button>
                    </div>
                  </div>
                </div>
              </StepShell>
            )}

            {step === "obrigado" && <ThanksStep onRestart={() => go("moeda")} />}
          </motion.div>
        </AnimatePresence>

        {step !== "moeda" && step !== "obrigado" && (
          <button type="button" onClick={back} className="mt-8 inline-flex items-center gap-2 font-ui text-[14px] font-semibold text-muted hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden /> Voltar
          </button>
        )}
      </div>
    </div>
  );
}

function StepShell({ title, text, children }: { title: string; text?: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[28px] font-black leading-tight text-primary md:text-4xl">{title}</h2>
      {text && <p className="mt-2 max-w-2xl text-[16px] text-muted md:text-[17px]">{text}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function IdentifyStep({ currency, onDone, onAnonymous }: { currency: Currency; onDone: (d: { nome: string; valor?: string }) => void; onAnonymous: () => void }) {
  const [v, setV] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (k: FieldName, val: string) => {
    setV((s) => ({ ...s, [k]: k === "telefone" ? formatPhone(val) : val }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { ...v, moeda: currency };
    const parsed = schemaFor("doacao").safeParse(payload);
    if (!parsed.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as FieldName] ??= i.message;
      setErrors(errs);
      return;
    }
    setSending(true);
    const hp = (e.currentTarget.elements.namedItem("site") as HTMLInputElement | null)?.value ?? "";
    // A identificação é registrada quando há entrega configurada; a doação segue de qualquer forma
    await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "doacao", data: payload, site: hp, page: "/doacao" }),
    }).catch(() => null);
    setSending(false);
    if (currency === "usd") {
      window.open(paypal.usd, "_blank", "noopener");
    }
    onDone({ nome: v.nome ?? "", valor: v.valor });
  }

  const input = "w-full rounded-xl border border-line bg-mist px-4 py-3.5 text-[16px] outline-none transition-colors placeholder:text-ink/40 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15";
  const field = (k: FieldName, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`d-${k}`} className="mb-1.5 block font-ui text-[13px] font-semibold text-ink/80">
        {label}
      </label>
      <input id={`d-${k}`} value={v[k] ?? ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `d-${k}-e` : undefined} className={input} {...props} />
      {errors[k] && (
        <p id={`d-${k}-e`} className="mt-1.5 text-[13px] font-semibold text-accent-ink">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <StepShell title="Preencha os dados para identificarmos sua doação" text="Assim podemos agradecer e enviar notícias de como sua ajuda foi usada.">
      <form onSubmit={submit} noValidate className="relative grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="absolute -left-[9999px]" aria-hidden>
          <input name="site" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-4">
          {field("nome", "Nome", { autoComplete: "name", placeholder: "Seu nome completo" })}
          {field("email", "E-mail", { type: "email", autoComplete: "email", placeholder: "voce@email.com" })}
          {field("telefone", "Telefone", { type: "tel", autoComplete: "tel", placeholder: "+55 11 99999-9999" })}
        </div>
        <fieldset className="rounded-[var(--radius-card)] bg-mist p-5">
          <legend className="sr-only">Valor</legend>
          <p className="font-ui text-[13px] font-semibold text-ink/80">Valor ({symbol(currency)})</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {suggestedAmounts[currency].map((a) => {
              const val = String(a);
              const on = v.valor === val;
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("valor", val)}
                  className={cn("rounded-xl border-2 py-3 font-display text-xl font-black transition-colors", on ? "border-primary bg-primary text-white" : "border-line bg-white text-secondary hover:border-primary/50")}
                >
                  {symbol(currency)} {a}
                </button>
              );
            })}
          </div>
          <label htmlFor="d-valor" className="mt-4 block font-ui text-[13px] font-semibold text-ink/80">
            Outro valor
          </label>
          <div className="relative mt-1.5">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted">{symbol(currency)}</span>
            <input id="d-valor" inputMode="decimal" value={v.valor ?? ""} onChange={(e) => set("valor", e.target.value.replace(/[^\d.,]/g, ""))} placeholder="0,00" className={cn(input, "bg-white pl-12")} />
          </div>
        </fieldset>
        <div className="flex flex-col gap-4 lg:col-span-2 lg:flex-row lg:items-center">
          <Button type="submit" disabled={sending} arrow={!sending}>
            {sending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> Enviando…
              </>
            ) : (
              "Avançar para doação"
            )}
          </Button>
          <button type="button" onClick={onAnonymous} className="inline-flex items-center gap-2 font-ui text-[15px] font-semibold text-primary underline-offset-4 hover:underline">
            <VenetianMask className="size-4" aria-hidden /> Doação anônima, não quero me identificar
          </button>
        </div>
      </form>
    </StepShell>
  );
}

function MethodPanel({ currency, method, amount }: { currency: Currency; method: Method; amount?: string }) {
  if (method === "pix") {
    return (
      <div className="grid items-start gap-6 md:grid-cols-[auto_1fr]">
        <div className="mx-auto rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
          <QRCodeSVG value={pixBRL.code} size={184} level="M" fgColor="#0F1010" title="QR Code Pix do Geração do Saber" />
        </div>
        <div className="space-y-3">
          <h3 className="font-display text-2xl font-black text-secondary">Doar via Pix</h3>
          <p className="text-[14px] text-muted">Aponte a câmera do app do banco para o QR Code ou copie a chave. Favorecido: {pixBRL.holder}.</p>
          <CopyField label={`Chave Pix (${pixBRL.keyType})`} value={pixBRL.key} />
          <CopyField label="Pix copia e cola" value={pixBRL.code} display={`${pixBRL.code.slice(0, 34)}…`} mono />
          {amount && <p className="text-[14px] text-muted">Valor informado: {formatBRL(Number(amount.replace(",", ".")) || 0)}</p>}
        </div>
      </div>
    );
  }
  if (method === "conta") {
    return (
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-display text-2xl font-black text-secondary">
          <Building2 className="size-6 text-primary" aria-hidden /> Nossa conta
        </h3>
        <p className="text-[14px] text-muted">Doar em reais direto na conta — {bankBRL.bank}.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <CopyField label="Banco" value={bankBRL.bank} />
          <CopyField label="Agência" value={bankBRL.agency} />
          <CopyField label="Conta" value={bankBRL.account} />
          <CopyField label="Favorecido" value={bankBRL.holder} />
        </div>
      </div>
    );
  }
  if (method === "mbway") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Image src={euro.mbwayLogo} alt="MB Way" width={120} height={59} className="h-10 w-auto rounded-md bg-white p-1" />
          <h3 className="font-display text-2xl font-black text-secondary">Doação via MB Way</h3>
        </div>
        <p className="text-[14px] text-muted">Envie qualquer valor pelo app MB Way para o número abaixo.</p>
        <CopyField label="MB Way" value={euro.mbway} display="931 853 927" />
      </div>
    );
  }
  if (method === "iban") {
    return (
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-black text-secondary">Transferência para conta em euro</h3>
        <p className="text-[14px] text-muted">Transferência SEPA a partir de qualquer banco europeu.</p>
        <CopyField label="IBAN" value={euro.iban.replace(/\s/g, "")} display={euro.iban} />
      </div>
    );
  }
  // PayPal
  const url = paypal[currency];
  return (
    <div className="space-y-4">
      <h3 className="font-display text-2xl font-black text-secondary">Doar com PayPal</h3>
      <p className="text-[14px] text-muted">
        Clique no botão abaixo para fazer sua doação via PayPal em {currency === "brl" ? "reais" : currency === "eur" ? "euros" : "dólares"}, com cartão de crédito ou saldo. A página do PayPal abre em uma nova aba.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-[10px] bg-[#ffc439] px-6 py-4 font-ui font-bold text-[#003087] transition-transform hover:-translate-y-0.5"
      >
        Doar com PayPal <ArrowRight className="size-4" aria-hidden />
      </a>
      {currency === "usd" && <p className="text-[13px] text-muted">Para doações em dólar direto na conta, fale com a gente pelo WhatsApp.</p>}
    </div>
  );
}

function ThanksStep({ onRestart }: { onRestart: () => void }) {
  const [shared, setShared] = useState(false);
  async function share() {
    const data = { title: "Geração do Saber", text: "Acabei de apoiar o Geração do Saber. Juntos fazemos a diferença no mundo de cada criança!", url: site.url };
    if (navigator.share) {
      await navigator.share(data).catch(() => null);
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${data.text} ${data.url}`)}`, "_blank", "noopener");
    }
    setShared(true);
  }
  return (
    <div className="relative mx-auto max-w-2xl py-6 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-accent text-on-accent shadow-[0_16px_40px_-12px_rgb(236_114_42/0.7)]">
        <Heart className="size-9 fill-current" aria-hidden />
      </span>
      <h2 className="mt-6 font-display text-4xl font-black text-primary md:text-5xl">Deus Abençoe!</h2>
      <p className="mt-4 font-display text-xl italic text-secondary">“{site.verse}”</p>
      <p className="mt-4 text-muted">Obrigado por fazer esta história possível. Compartilhe e convide mais pessoas para essa missão.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button type="button" onClick={share}>
          <Share2 className="size-4" aria-hidden /> {shared ? "Compartilhado!" : "Compartilhar"}
        </Button>
        <Button type="button" variant="outline" onClick={onRestart}>
          <UserRound className="size-4" aria-hidden /> Fazer outra doação
        </Button>
      </div>
    </div>
  );
}
