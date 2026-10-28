"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Ano dinâmico calculado no navegador (evita data fixa no HTML pré-renderizado) */
export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span>{year ?? 2026}</span>;
}
