"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/content/blocks";

/** Galeria masonry com lightbox acessível (dialog nativo + setas do teclado) */
export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (idx !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [idx]);

  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go]);

  const current = idx !== null ? gallery[idx] : null;

  return (
    <>
      <ul className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {gallery.map((g, i) => (
          <li key={g.src} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={`Ampliar foto: ${g.alt}`}
            >
              <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]" />
              <span className="absolute inset-0 bg-secondary/0 transition-colors group-hover:bg-secondary/20" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setIdx(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label="Foto ampliada"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy/90"
      >
        {current && (
          <div className="relative flex h-[100dvh] w-[100vw] items-center justify-center p-4 md:p-16" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
            <Image src={current.src} alt={current.alt} width={current.w} height={current.h} sizes="90vw" className="max-h-full w-auto max-w-full rounded-xl object-contain" />
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Fechar" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-6" />
            </button>
            <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="size-6" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-ui text-sm text-white/70">
              {(idx ?? 0) + 1} / {gallery.length}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
