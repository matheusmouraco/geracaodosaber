import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { events } from "@/content/events";
import { plans } from "@/content/donation";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sobre-nos", "/o-que-fazemos", "/apadrinhamento", "/voluntarios", "/agenda", "/doacao", "/privacidade"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : p === "/doacao" || p === "/apadrinhamento" ? 0.9 : 0.7 })),
    ...events.map((e) => ({ url: `${site.url}/agenda/${e.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
    ...plans.map((p) => ({ url: `${site.url}/apadrinhar/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
