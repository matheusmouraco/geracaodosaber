"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { CalendarHeart, CreditCard, Loader2, LogOut, Mail, QrCode, ShieldCheck } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Button, ButtonLink } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { formatBRL, getPlan } from "@/content/donation";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Sponsorship = {
  id: string;
  plano: string;
  valor_mensal: number;
  metodo: "pix" | "paypal" | "cartao";
  status: "pendente" | "ativo" | "cancelado";
  stripe_customer_id: string | null;
  criado_em: string;
};

const noop = () => () => {};
const getLinkError = () => new URLSearchParams(window.location.search).get("erro") === "link";

export function AccountApp() {
  const linkError = useSyncExternalStore(noop, getLinkError, () => false);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (user === undefined) {
    return <div className="h-72 animate-pulse rounded-[var(--radius-section)] bg-mist" aria-label="Carregando" />;
  }
  return user ? <Dashboard user={user} /> : <Login linkError={linkError} />;
}

function Login({ linkError }: { linkError: boolean }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(linkError ? "O link expirou ou já foi usado. Peça um novo acesso abaixo." : "");

  async function requestAccess(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/auth/link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const json = await res?.json().catch(() => ({}));
    setBusy(false);
    if (res?.ok) setStep("code");
    else setMsg(json?.error ?? "Não foi possível enviar agora.");
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const { error } = await supabaseBrowser().auth.verifyOtp({ email: email.trim().toLowerCase(), token: code.trim(), type: "email" });
    setBusy(false);
    if (error) setMsg("Código inválido ou expirado. Confira o e-mail ou peça um novo.");
  }

  const input = "w-full rounded-xl border border-line bg-mist px-4 py-3.5 text-[16px] outline-none transition-colors focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15";

  return (
    <div className="mx-auto max-w-lg rounded-[var(--radius-section)] bg-white p-7 shadow-[var(--shadow-lift)] sm:p-10">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary text-white">
        {step === "email" ? <Mail className="size-7" aria-hidden /> : <ShieldCheck className="size-7" aria-hidden />}
      </span>
      {step === "email" ? (
        <form onSubmit={requestAccess} className="mt-6">
          <h2 className="font-display text-3xl font-black text-primary">Entrar</h2>
          <p className="mt-2 text-muted">Sem senha: enviamos um link e um código para o e-mail do seu apadrinhamento.</p>
          <label htmlFor="acc-email" className="mb-1.5 mt-7 block font-ui text-[13px] font-semibold text-ink/80">
            E-mail cadastrado
          </label>
          <input id="acc-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={input} />
          <Button type="submit" disabled={busy} className="mt-5 w-full">
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null} Receber acesso
          </Button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-6">
          <h2 className="font-display text-3xl font-black text-primary">Confira seu e-mail</h2>
          <p className="mt-2 text-muted">
            Enviamos um link e um código de 6 dígitos para <strong className="text-ink">{email}</strong>. Toque no link ou digite o código.
          </p>
          <label htmlFor="acc-code" className="mb-1.5 mt-7 block font-ui text-[13px] font-semibold text-ink/80">
            Código
          </label>
          <input
            id="acc-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className={cn(input, "text-center font-display text-2xl font-black tracking-[0.5em]")}
          />
          <Button type="submit" disabled={busy || code.length < 6} className="mt-5 w-full">
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null} Entrar
          </Button>
          <button type="button" onClick={() => setStep("email")} className="mt-4 w-full font-ui text-[14px] font-semibold text-primary hover:underline">
            Usar outro e-mail
          </button>
        </form>
      )}
      <p aria-live="polite" className="mt-4 min-h-5 text-[14px] font-semibold text-accent-ink">
        {msg}
      </p>
      <p className="mt-4 border-t border-line pt-5 text-[14px] text-muted">
        Ainda não apadrinha?{" "}
        <Link href="/apadrinhamento#planos" className="font-semibold text-primary hover:underline">
          Conheça os planos
        </Link>
      </p>
    </div>
  );
}

const statusLabel = { ativo: "Ativo", pendente: "Aguardando confirmação", cancelado: "Cancelado" };
const statusTone = { ativo: "bg-[#1f9d55]/10 text-[#1f7a45]", pendente: "bg-sun/25 text-[#7a5a00]", cancelado: "bg-line text-muted" };
const methodLabel = { pix: "Pix", paypal: "PayPal", cartao: "Cartão (automático)" };

function Dashboard({ user }: { user: User }) {
  const [items, setItems] = useState<Sponsorship[] | null>(null);
  const [portalBusy, setPortalBusy] = useState(false);
  const [portalMsg, setPortalMsg] = useState("");

  useEffect(() => {
    let alive = true;
    const sb = supabaseBrowser();
    sb.from("padrinhos")
      .select("id, plano, valor_mensal, metodo, status, stripe_customer_id, criado_em")
      .order("criado_em", { ascending: false })
      .then(({ data: s }) => {
        if (alive) setItems((s as Sponsorship[]) ?? []);
      });
    return () => {
      alive = false;
    };
  }, [user.id]);

  async function openPortal() {
    setPortalBusy(true);
    setPortalMsg("");
    const { data } = await supabaseBrowser().auth.getSession();
    const res = await fetch("/api/stripe/portal", { method: "POST", headers: { Authorization: `Bearer ${data.session?.access_token ?? ""}` } }).catch(() => null);
    const json = await res?.json().catch(() => ({}));
    if (res?.ok && json?.url) window.location.href = json.url;
    else {
      setPortalBusy(false);
      setPortalMsg(json?.error ?? "Não foi possível abrir agora.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-ui text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-ink">Área do padrinho</p>
          <h2 className="mt-1 font-display text-3xl font-black text-primary md:text-4xl">Olá! Que bom ter você aqui.</h2>
          <p className="mt-1 text-muted">{user.email}</p>
        </div>
        <Button variant="outline" onClick={() => supabaseBrowser().auth.signOut()} className="self-start">
          <LogOut className="size-4" aria-hidden /> Sair
        </Button>
      </div>

      <section aria-labelledby="meus-apadrinhamentos" className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <h3 id="meus-apadrinhamentos" className="flex items-center gap-2 font-display text-2xl font-extrabold text-secondary">
          <CalendarHeart className="size-6 text-accent-ink" aria-hidden /> Meus apadrinhamentos
        </h3>
        {items === null ? (
          <div className="mt-6 h-24 animate-pulse rounded-2xl bg-mist" />
        ) : items.length === 0 ? (
          <p className="mt-4 text-muted">Nenhum apadrinhamento encontrado para este e-mail.</p>
        ) : (
          <ul className="mt-6 divide-y divide-line">
            {items.map((i) => {
              const plan = getPlan(i.plano);
              return (
                <li key={i.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <p className="font-display text-lg font-extrabold text-ink">{plan?.name ?? i.plano}</p>
                    <p className="text-[14px] text-muted">
                      {formatBRL(Number(i.valor_mensal))}/mês · {methodLabel[i.metodo]} · desde {new Date(i.criado_em).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span className={cn("self-start rounded-full px-3 py-1 font-ui text-[12px] font-bold sm:self-center", statusTone[i.status])}>{statusLabel[i.status]}</span>
                  {i.status === "pendente" && i.metodo !== "cartao" && plan && (
                    <Link href={`/apadrinhar/${plan.slug}`} className="inline-flex items-center gap-1.5 font-ui text-[14px] font-semibold text-primary hover:underline">
                      <QrCode className="size-4" aria-hidden /> Ver dados do Pix
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {items?.some((i) => i.stripe_customer_id) && (
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center">
            <Button variant="outline" onClick={openPortal} disabled={portalBusy}>
              {portalBusy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <CreditCard className="size-4" aria-hidden />} Gerenciar cartão e assinatura
            </Button>
            <p className="text-[14px] font-semibold text-accent-ink">{portalMsg}</p>
          </div>
        )}
      </section>


      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/apadrinhamento#planos" variant="outline">
          Apadrinhar mais uma criança
        </ButtonLink>
        <ButtonLink href={waLink(`Olá! Sou padrinho/madrinha (${user.email}) e preciso de ajuda.`)} variant="ghost">
          <WhatsAppIcon className="size-5" /> Falar com a equipe
        </ButtonLink>
      </div>
    </div>
  );
}
