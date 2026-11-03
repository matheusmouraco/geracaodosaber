import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans, Raleway } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { site } from "@/content/site";
import "./globals.css";

const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin"], weight: ["600", "700", "800", "900"], display: "swap" });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "New Generation | Juntos fazemos a diferença no mundo de cada criança", template: "%s | New Generation" },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    images: [{ url: "/img/fotos/voluntarias-com-criancas.jpg", width: 2560, height: 1440, alt: "Voluntárias com crianças na Guiné-Bissau" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#062448" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${raleway.variable} ${openSans.variable} ${montserrat.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
