import Image from "next/image";
import Link from "next/link";
import { Heart, Mail, Phone } from "lucide-react";
import { footerNav, site } from "@/content/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { CurrentYear } from "./CurrentYear";

export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-navy text-white">
      <div className="dots pointer-events-none absolute -right-20 -top-20 size-80 opacity-60" aria-hidden />
      <Container className="relative grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] lg:py-20">
        <div className="max-w-sm">
          <div className="relative h-[77px] w-[200px]">
            <Image src={site.logo.white} alt="Geração do Saber" fill sizes="200px" className="object-contain object-left" />
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-white/75">
            Escolas, alimentação, saúde e esperança para crianças e famílias na Guiné-Bissau.
          </p>
          <p className="mt-3 text-[14px] font-semibold text-sun">Este site faz parte dos projetos da {site.parent}.</p>
          <Link
            href="/doacao"
            className="mt-7 inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3.5 font-ui font-semibold transition-all hover:-translate-y-0.5 hover:bg-accent-dark text-on-accent"
          >
            <Heart className="size-4 fill-current" aria-hidden /> Doar Agora
          </Link>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-ui text-[13px] font-semibold uppercase tracking-[0.18em] text-sun">Navegue</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
            {footerNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-[15px] text-white/80 transition-colors hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-ui text-[13px] font-semibold uppercase tracking-[0.18em] text-sun">Contatos</h2>
          <ul className="mt-5 space-y-4 text-[15px] text-white/80">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                <InstagramIcon className="size-5 shrink-0 text-sun" /> {site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Phone className="size-5 shrink-0 text-sun" aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                <WhatsAppIcon className="size-5 shrink-0 text-sun" /> Fale no WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="size-5 shrink-0 text-sun" aria-hidden /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 pb-28 pt-6 text-center text-[13px] text-white/60 sm:flex-row sm:pb-6 sm:pr-44 sm:text-left lg:pr-48">
          <p>
            Copyright © <CurrentYear /> {site.name}. Todos os direitos reservados.
          </p>
          <p>Um projeto {site.parent}</p>
        </Container>
      </div>
    </footer>
  );
}
