"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function FloatingActions() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDonation = pathname.startsWith("/doacao");

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="pointer-events-auto grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.35)] transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      {!onDonation && (
        <Link
          href="/doacao"
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-ui text-[15px] font-semibold text-on-accent shadow-[0_12px_30px_-8px_rgb(236_114_42/0.7)] transition-all duration-300 hover:bg-accent-dark",
            visible ? "translate-y-0 opacity-100" : "pointer-events-none! translate-y-4 opacity-0",
          )}
          tabIndex={visible ? 0 : -1}
          aria-hidden={!visible}
        >
          <Heart className="size-4 fill-current" aria-hidden /> Doar
        </Link>
      )}
    </div>
  );
}
