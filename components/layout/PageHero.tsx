import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Arc } from "@/components/icons";
import { Container } from "@/components/ui";

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt = "",
  crumbs = [],
  children,
}: {
  title: string;
  subtitle: string;
  image: string;
  imageAlt?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  const trail = [{ label: "Início", href: "/" }, ...crumbs, { label: title }];
  return (
    <section className="relative isolate overflow-hidden bg-secondary pb-20 pt-36 text-white md:pb-28 md:pt-48">
      <Image src={image} alt={imageAlt} fill loading="eager" fetchPriority="high" sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/55" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-secondary/70 to-transparent" aria-hidden />
      <Arc className="absolute -bottom-24 -right-16 -z-10 size-72 text-sun/90 md:size-[420px]" weight={18} />
      <Container>
        <nav aria-label="Trilha de navegação">
          <ol className="flex flex-wrap items-center gap-1.5 font-ui text-[13px] text-white/70">
            {trail.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-sun">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl font-display text-[38px] font-black leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[76px]">{title}</h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/85 md:text-xl">{subtitle}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
      <svg className="absolute inset-x-0 -bottom-px h-10 w-full text-white md:h-16" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
        <path d="M0 64h1440V18C1180 58 920 64 720 46S240 0 0 30Z" fill="currentColor" />
      </svg>
    </section>
  );
}
