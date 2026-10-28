"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { fieldLabels, formFields, formatPhone, schemaFor, type FieldName, type FormType } from "@/lib/forms";
import { Button } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { formToWhatsapp } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type Props = {
  type: FormType;
  submitLabel: string;
  successTitle?: string;
  successText?: string;
  tone?: "light" | "dark";
  extra?: Record<string, string>;
  /** Campos a ocultar (ex.: moeda é enviada via `extra`) */
  hidden?: FieldName[];
  onSuccess?: (data: Record<string, string>, meta: { whatsapp?: string; padrinhoId?: string }) => void;
  className?: string;
};

const placeholders: Partial<Record<FieldName, string>> = {
  nome: "Seu nome completo",
  email: "voce@email.com",
  telefone: "+55 11 99999-9999",
  mensagem: "Conte um pouco sobre você ou sua dúvida",
  profissao: "Ex.: professora, enfermeiro, engenheira",
  empresa: "Nome da empresa",
  valor: "Ex.: 100",
};

const optional: FieldName[] = ["mensagem", "profissao", "nascimento", "valor"];

export function LeadForm({ type, submitLabel, successTitle = "Recebemos sua mensagem!", successText = "Em breve nossa equipe entra em contato. Deus abençoe!", tone = "light", extra, hidden = [], onSuccess, className }: Props) {
  const uid = useId();
  const fields = formFields[type].filter((f) => f !== "moeda" && f !== "plano" && !hidden.includes(f));
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "whatsapp" | "error">("idle");
  const [wa, setWa] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const set = (f: FieldName, v: string) => {
    setValues((s) => ({ ...s, [f]: f === "telefone" ? formatPhone(v) : v }));
    if (errors[f]) setErrors((e) => ({ ...e, [f]: undefined }));
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { ...values, ...extra };
    const parsed = schemaFor(type).safeParse(payload);
    if (!parsed.success) {
      const errs: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as FieldName] ??= issue.message;
      setErrors(errs);
      const first = fields.find((f) => errs[f]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const hp = (e.currentTarget.elements.namedItem("site") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data: payload, site: hp, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Não foi possível enviar agora.");
      if (json.fallback === "whatsapp") {
        const link = formToWhatsapp(type, payload);
        setWa(link);
        setStatus("whatsapp");
        onSuccess?.(payload as Record<string, string>, { whatsapp: link });
        return;
      }
      setStatus("ok");
      onSuccess?.(payload as Record<string, string>, { padrinhoId: json.padrinhoId });
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : "Não foi possível enviar agora.");
    }
  }

  const dark = tone === "dark";
  const inputCls = cn(
    "w-full rounded-xl border px-4 py-3.5 text-[16px] transition-colors outline-none focus:ring-4",
    dark
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-sun focus:ring-sun/25"
      : "border-line bg-mist text-ink placeholder:text-ink/40 focus:border-primary focus:bg-white focus:ring-primary/15",
  );

  if (status === "whatsapp" && !onSuccess) {
    return (
      <div role="status" className={cn("flex flex-col items-start gap-3 rounded-2xl p-6", dark ? "bg-white/10 text-white" : "bg-ice text-ink", className)}>
        <WhatsAppIcon className={cn("size-9", dark ? "text-sun" : "text-[#1f9d55]")} />
        <p className="font-display text-2xl font-bold">Quase lá!</p>
        <p className={dark ? "text-white/80" : "text-muted"}>Toque no botão para enviar seus dados direto para a nossa equipe pelo WhatsApp. A mensagem já vai preenchida.</p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-5 py-3.5 font-ui font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="size-5" /> Enviar pelo WhatsApp
        </a>
      </div>
    );
  }

  if (status === "ok" && !onSuccess) {
    return (
      <div role="status" className={cn("flex flex-col items-start gap-3 rounded-2xl p-6", dark ? "bg-white/10 text-white" : "bg-ice text-ink", className)}>
        <CheckCircle2 className={cn("size-9", dark ? "text-sun" : "text-primary")} aria-hidden />
        <p className="font-display text-2xl font-bold">{successTitle}</p>
        <p className={dark ? "text-white/80" : "text-muted"}>{successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cn("relative grid gap-4 sm:grid-cols-2", className)}>
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Site <input name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {fields.map((f) => {
        const id = `${uid}-${f}`;
        const full = f === "mensagem" || f === "email" || fields.length < 4 || (f === "nome" && type !== "empresa");
        const err = errors[f];
        return (
          <div key={f} className={cn(full && "sm:col-span-2")}>
            <label htmlFor={id} className={cn("mb-1.5 block font-ui text-[13px] font-semibold", dark ? "text-white/85" : "text-ink/80")}>
              {fieldLabels[f]}
              {optional.includes(f) ? <span className={dark ? "text-white/50" : "text-ink/40"}> (opcional)</span> : null}
            </label>
            {f === "mensagem" ? (
              <textarea id={id} rows={4} value={values[f] ?? ""} onChange={(e) => set(f, e.target.value)} placeholder={placeholders[f]} className={cn(inputCls, "resize-y")} aria-invalid={!!err} aria-describedby={err ? `${id}-e` : undefined} />
            ) : (
              <input
                id={id}
                type={f === "email" ? "email" : f === "telefone" ? "tel" : f === "nascimento" ? "date" : f === "valor" ? "text" : "text"}
                inputMode={f === "valor" ? "decimal" : f === "telefone" ? "tel" : undefined}
                autoComplete={f === "nome" ? "name" : f === "email" ? "email" : f === "telefone" ? "tel" : f === "empresa" ? "organization" : f === "nascimento" ? "bday" : undefined}
                value={values[f] ?? ""}
                onChange={(e) => set(f, e.target.value)}
                placeholder={placeholders[f]}
                className={inputCls}
                aria-invalid={!!err}
                aria-describedby={err ? `${id}-e` : undefined}
              />
            )}
            {err && (
              <p id={`${id}-e`} className={cn("mt-1.5 text-[13px] font-semibold", dark ? "text-sun" : "text-accent-ink")}>
                {err}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex flex-col gap-3 sm:col-span-2">
        <Button type="submit" disabled={status === "sending"} arrow={status !== "sending"} className="w-full sm:w-auto sm:self-start">
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Enviando…
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <p aria-live="polite" className={cn("text-[14px] font-semibold", dark ? "text-sun" : "text-accent-ink")}>
          {status === "error" ? `${serverMsg} Tente novamente ou fale conosco pelo WhatsApp.` : ""}
        </p>
        <p className={cn("text-[12px]", dark ? "text-white/55" : "text-ink/50")}>
          Usamos seus dados apenas para responder ao seu contato, conforme a{" "}
          <a href="/privacidade" className="underline underline-offset-2 hover:opacity-80">
            política de privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
}
