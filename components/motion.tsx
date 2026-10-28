"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];
  return (
    <Cmp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Cmp>
  );
}

const nf = new Intl.NumberFormat("pt-BR");

export function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="whitespace-nowrap tabular-nums">
      {`${prefix}${nf.format(reduce || !inView ? value : n)}${suffix}`}
    </span>
  );
}

export function ProgressBar({ value, label, tone = "light" }: { value: number; label: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  return (
    <div ref={ref}>
      <div className={`mb-2 flex items-baseline justify-between font-ui text-[13px] font-semibold ${tone === "dark" ? "text-white/80" : "text-muted"}`}>
        <span>{label}</span>
        <span className={tone === "dark" ? "text-sun" : "text-primary"}>{value}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={`h-2.5 overflow-hidden rounded-full ${tone === "dark" ? "bg-white/15" : "bg-primary/10"}`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sun to-[#ffb800]"
          initial={reduce ? false : { width: 0 }}
          animate={inView ? { width: `${Math.max(value, 3)}%` } : undefined}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={reduce ? { width: `${Math.max(value, 3)}%` } : undefined}
        />
      </div>
    </div>
  );
}
