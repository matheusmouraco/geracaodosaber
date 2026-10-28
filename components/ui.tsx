import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "outline" | "outline-light" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgb(236_114_42/0.7)] hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgb(236_114_42/0.8)]",
  light: "bg-white text-secondary hover:-translate-y-0.5 hover:bg-mist",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-secondary",
  ghost: "text-primary hover:text-secondary underline-offset-4 hover:underline px-0!",
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-btn)] px-6 py-3.5 font-ui text-[15px] font-semibold leading-none transition-all duration-200 md:px-7 md:py-[18px] md:text-[17px] disabled:pointer-events-none disabled:opacity-60";

type BtnProps = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  arrow,
  className,
  children,
  href,
  external,
  ...rest
}: BtnProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const cls = cn(base, variants[variant], className);
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="size-[18px] transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden />}
    </>
  );
  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({ variant = "primary", arrow, className, children, ...rest }: BtnProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="size-[18px] transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden />}
    </button>
  );
}

export function Container({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className, tone = "accent" }: { children: ReactNode; className?: string; tone?: "accent" | "sun" | "primary" }) {
  const tones = { accent: "text-accent-ink", sun: "text-sun", primary: "text-primary" };
  return (
    <p className={cn("flex items-center gap-3 font-ui text-[13px] font-semibold uppercase tracking-[0.18em]", tones[tone], className)}>
      <span className="h-[3px] w-7 rounded-full bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center [&>p:first-child]:justify-center", className)}>
      {eyebrow && <Eyebrow tone={tone === "light" ? "sun" : "accent"}>{eyebrow}</Eyebrow>}
      <As
        className={cn(
          "mt-4 font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.01em] sm:text-4xl lg:text-[52px]",
          tone === "light" ? "text-white" : "text-primary",
        )}
      >
        {title}
      </As>
      {intro && (
        <div className={cn("mt-5 space-y-4 text-[16px] leading-relaxed md:text-[18px]", tone === "light" ? "text-white/85" : "text-muted")}>
          {intro}
        </div>
      )}
    </div>
  );
}

/** Palavra destacada com sublinhado amarelo desenhado à mão */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.12em] left-[-2%] z-0 h-[0.32em] w-[104%] text-sun">
        <path d="M3 17 C 60 6, 140 4, 297 12" stroke="currentColor" strokeWidth="9" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}
