import type { NextConfig } from "next";

const r = (source: string, destination: string) => ({ source, destination, permanent: true });

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Fluxo de doação antigo → wizard único em /doacao
      r("/doacao-real-0", "/doacao?moeda=brl"),
      r("/doacao-real-1", "/doacao?moeda=brl&etapa=metodo"),
      r("/doacao-real-conta-2", "/doacao?moeda=brl&metodo=conta"),
      r("/doacao-real-pix-2", "/doacao?moeda=brl&metodo=pix"),
      r("/doacao-euro-0", "/doacao?moeda=eur"),
      r("/doacao-euro-1", "/doacao?moeda=eur&etapa=metodo"),
      r("/doacao-euro-conta-2", "/doacao?moeda=eur&metodo=mbway"),
      r("/doacao-dolar-0", "/doacao?moeda=usd"),
      r("/doacao-dolar-conta-1", "/doacao?moeda=usd&etapa=metodo"),
      // Loja e carrinho antigos → planos de apadrinhamento
      r("/loja", "/apadrinhamento#planos"),
      r("/carrinho", "/apadrinhamento#planos"),
      r("/finalizacao-de-apadrinhamento", "/apadrinhamento#planos"),
      // Programa Empresa Parceira retirado
      r("/empresa-parceira", "/"),
      // Clube Padrinho+ e páginas de empresas parceiras retirados
      r("/padrinho", "/minha-conta"),
      r("/parceiros/:slug", "/"),
      ...["matistudio", "onore", "rocha-real", "sweet-ganache", "tribosurf", "vittapraia"].map((s) => r(`/${s}`, "/")),
    ];
  },
};

export default nextConfig;
