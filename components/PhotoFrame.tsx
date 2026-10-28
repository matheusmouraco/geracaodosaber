import Image from "next/image";
import type { ReactNode } from "react";
import { Arc } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Assinatura visual: foto com um canto em arco amplo (ecoa o "C" do logo)
 * e o quarto de anel amarelo/vermelho da marca saindo por trás.
 */
export function PhotoFrame({
  src,
  alt,
  className,
  corner = "tl",
  arc = "sun",
  sizes = "(min-width: 1024px) 560px, 100vw",
  aspect = "aspect-[4/5]",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  corner?: "tl" | "tr" | "bl" | "br";
  arc?: "sun" | "accent" | "none";
  sizes?: string;
  aspect?: string;
  children?: ReactNode;
}) {
  const radius = {
    tl: "rounded-[28px] rounded-tl-[160px]",
    tr: "rounded-[28px] rounded-tr-[160px]",
    bl: "rounded-[28px] rounded-bl-[160px]",
    br: "rounded-[28px] rounded-br-[160px]",
  }[corner];
  const arcPos = {
    tl: "-left-4 -top-4 rotate-180 md:-left-8 md:-top-8",
    tr: "-right-4 -top-4 -rotate-90 md:-right-8 md:-top-8",
    bl: "-bottom-4 -left-4 rotate-90 md:-bottom-8 md:-left-8",
    br: "-bottom-4 -right-4 md:-bottom-8 md:-right-8",
  }[corner];
  return (
    <div className={cn("relative", className)}>
      {arc !== "none" && (
        <Arc className={cn("absolute size-36 md:size-56", arcPos, arc === "sun" ? "text-sun" : "text-accent-ink")} weight={20} />
      )}
      <div className={cn("relative overflow-hidden shadow-[var(--shadow-lift)]", radius, aspect)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {children}
    </div>
  );
}
