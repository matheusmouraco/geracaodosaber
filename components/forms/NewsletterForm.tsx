"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { fieldSchemas } from "@/lib/forms";
import { formToWhatsapp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "whatsapp" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = fieldSchemas.email.safeParse(email);
    if (!ok.success) {
      setStatus("error");
      setMsg("Informe um e-mail válido.");
      return;
    }
    setStatus("sending");
    const hp = (e.currentTarget.elements.namedItem("site") as HTMLInputElement | null)?.value ?? "";
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", data: { email }, site: hp, page: window.location.pathname }),
    }).catch(() => null);
    const json = res?.ok ? await res.json().catch(() => ({})) : null;
    if (json?.fallback === "whatsapp") {
      setStatus("whatsapp");
    } else if (res?.ok) {
      setStatus("ok");
    } else {
      setStatus("error");
      setMsg("Não foi possível assinar agora. Tente novamente em instantes.");
    }
  }

  if (status === "whatsapp") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-2xl bg-white/10 p-5 text-white sm:flex-row sm:items-center">
        <p className="flex-1 font-semibold">Confirme sua inscrição pelo WhatsApp para receber as novidades.</p>
        <a
          href={formToWhatsapp("newsletter", { email })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-ui font-semibold text-white"
        >
          <WhatsAppIcon className="size-5" /> Confirmar
        </a>
      </div>
    );
  }

  if (status === "ok") {
    return (
      <p role="status" className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 font-semibold text-white">
        <CheckCircle2 className="size-6 text-sun" aria-hidden /> Inscrição confirmada. Você vai receber nossas novidades!
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative w-full">
      <div className="absolute -left-[9999px]" aria-hidden>
        <input name="site" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="newsletter-email" className="sr-only">
        Seu e-mail
      </label>
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.4)] sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-msg"
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3.5 text-[16px] text-ink outline-none placeholder:text-ink/45 focus:bg-mist"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-ui font-semibold text-on-accent transition-colors hover:bg-accent-dark disabled:opacity-70"
        >
          {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          Assine Agora
        </button>
      </div>
      <p id="newsletter-msg" aria-live="polite" className="mt-2 text-[14px] font-semibold text-sun empty:hidden">
        {status === "error" ? msg : ""}
      </p>
    </form>
  );
}
