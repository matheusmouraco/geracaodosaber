"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Mail, Menu, Phone, X } from "lucide-react";
import { mainNav, site } from "@/content/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#conteudo" className="sr-only z-[100] rounded bg-white px-4 py-2 text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Pular para o conteúdo
      </a>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top bar */}
        <div
          className={cn(
            "hidden overflow-hidden bg-secondary text-white/90 transition-[max-height,opacity] duration-300 md:block",
            solid ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
          )}
        >
          <div className="mx-auto flex h-10 max-w-[1240px] items-center justify-between px-4 font-ui text-[13px] sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-sun">
                <Phone className="size-3.5" aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-sun">
                <Mail className="size-3.5" aria-hidden /> {site.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/60">Siga a missão</span>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram @crossmissionsorg" className="hover:text-sun">
                <InstagramIcon className="size-4" />
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-sun">
                <WhatsAppIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div
          className={cn(
            "transition-all duration-300",
            solid ? "bg-white/95 shadow-[0_8px_30px_-12px_rgb(6_36_72/0.25)] backdrop-blur-md" : "bg-gradient-to-b from-secondary/60 to-transparent",
          )}
        >
          <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[84px] lg:px-8">
            <Link href="/" aria-label="Geração do Saber, página inicial" className="relative h-[52px] w-[136px] shrink-0 lg:h-[62px] lg:w-[162px]">
              <Image src={site.logo.white} alt="" fill sizes="162px" loading="eager" className={cn("object-contain object-left transition-opacity duration-300", solid ? "opacity-0" : "opacity-100")} />
              <Image src={site.logo.color} alt="" fill sizes="162px" loading="eager" className={cn("object-contain object-left transition-opacity duration-300", solid ? "opacity-100" : "opacity-0")} />
            </Link>

            <ul className="hidden items-center gap-1 xl:flex">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-lg px-3 py-2 font-ui text-[14px] font-semibold transition-colors",
                      solid ? "text-ink/80 hover:text-primary" : "text-white/90 hover:text-white",
                      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-sun after:transition-transform hover:after:scale-x-100",
                      isActive(item.href) && "after:scale-x-100",
                      isActive(item.href) && (solid ? "text-primary" : "text-white"),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="/apadrinhamento"
                className={cn(
                  "hidden rounded-[10px] border-2 px-4 py-2.5 font-ui text-[14px] font-semibold transition-colors lg:inline-flex",
                  solid ? "border-primary text-primary hover:bg-primary hover:text-white" : "border-white/70 text-white hover:bg-white hover:text-secondary",
                )}
              >
                Apadrinhar
              </Link>
              <Link
                href="/doacao"
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-4 py-2.5 font-ui text-[14px] font-semibold text-on-accent shadow-[0_8px_20px_-8px_rgb(236_114_42/0.8)] transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                <Heart className="size-4 fill-current" aria-hidden /> Doar
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={open}
                aria-controls="menu-mobile"
                className={cn("ml-1 grid size-11 place-items-center rounded-[10px] xl:hidden", solid ? "text-primary hover:bg-mist" : "text-white hover:bg-white/10")}
              >
                <Menu className="size-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu off-canvas */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Fechar menu" className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              id="menu-mobile"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="grain dots absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-secondary px-6 pb-8 pt-5 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="relative h-[50px] w-[130px]">
                  <Image src={site.logo.white} alt="Geração do Saber" fill sizes="130px" className="object-contain object-left" />
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu" className="grid size-11 place-items-center rounded-[10px] hover:bg-white/10">
                  <X className="size-6" />
                </button>
              </div>
              <ul className="mt-8 space-y-1">
                {mainNav.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl font-bold transition-colors hover:bg-white/10",
                        isActive(item.href) && "bg-white/10 text-sun",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Link href="/doacao" className="flex items-center justify-center gap-2 rounded-[10px] bg-accent py-4 font-ui font-semibold hover:bg-accent-dark text-on-accent">
                  <Heart className="size-4 fill-current" aria-hidden /> Doar agora
                </Link>
                <Link href="/apadrinhamento" className="flex items-center justify-center rounded-[10px] border-2 border-white/70 py-3.5 font-ui font-semibold hover:bg-white hover:text-secondary">
                  Apadrinhar uma criança
                </Link>
              </div>
              <div className="mt-auto space-y-2 pt-10 font-ui text-sm text-white/80">
                <a href={site.phoneHref} className="flex items-center gap-2 hover:text-sun">
                  <Phone className="size-4" aria-hidden /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all hover:text-sun">
                  <Mail className="size-4 shrink-0" aria-hidden /> {site.email}
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sun">
                  <InstagramIcon className="size-4" /> {site.instagram.handle}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
