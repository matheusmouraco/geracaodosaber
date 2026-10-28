"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { goals } from "@/content/blocks";
import { cn } from "@/lib/cn";

export function GoalsAccordion() {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <ul className="space-y-3">
      {goals.map((g, i) => {
        const isOpen = open === i;
        return (
          <li key={g.title} className={cn("overflow-hidden rounded-2xl border transition-colors", isOpen ? "border-primary/20 bg-white shadow-[var(--shadow-card)]" : "border-line bg-white/60")}>
            <h3>
              <button
                type="button"
                id={`${uid}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 p-4 text-left md:p-5"
              >
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl transition-colors", isOpen ? "bg-accent text-on-accent" : "bg-primary")}>
                  <Image src={g.icon} alt="" width={40} height={40} className="size-9" />
                </span>
                <span className="flex-1 font-display text-lg font-extrabold text-secondary md:text-xl">{g.title}</span>
                <ChevronDown className={cn("size-5 text-primary transition-transform", isOpen && "rotate-180")} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-p${i}`}
                  role="region"
                  aria-labelledby={`${uid}-h${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted md:pl-[84px] md:text-base">{g.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
