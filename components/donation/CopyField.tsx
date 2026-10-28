"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyField({ label, value, display, mono, className }: { label: string; value: string; display?: string; mono?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pl-4", className)}>
      <div className="min-w-0 flex-1">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <p className={cn("mt-0.5 truncate font-semibold text-ink", mono ? "font-mono text-[13px]" : "text-[17px]")} title={value}>
          {display ?? value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 font-ui text-[13px] font-semibold transition-colors",
          copied ? "bg-[#1f9d55] text-white" : "bg-primary/10 text-primary hover:bg-primary hover:text-white",
        )}
        aria-label={`Copiar ${label}`}
      >
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        <span aria-live="polite">{copied ? "Copiado!" : "Copiar"}</span>
      </button>
    </div>
  );
}
