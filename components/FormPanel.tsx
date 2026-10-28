import type { ReactNode } from "react";
import { Arc } from "@/components/icons";
import { Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";

/** Card azul com formulário (eyebrow "Aplicar" + título) */
export function FormPanel({ eyebrow = "Aplicar", title, text, children, className }: { eyebrow?: string; title: string; text?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grain relative overflow-hidden rounded-[var(--radius-section)] bg-secondary p-6 text-white shadow-[var(--shadow-lift)] sm:p-10", className)}>
      <Arc className="absolute -right-20 -top-20 size-40 text-sun" weight={16} />
      <div className="relative">
        <Eyebrow tone="sun">{eyebrow}</Eyebrow>
        <h2 className="mt-3 pr-16 font-display text-3xl font-black md:text-4xl">{title}</h2>
        {text && <p className="mt-2 max-w-md pr-10 text-white/75">{text}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
