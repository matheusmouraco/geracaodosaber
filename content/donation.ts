/* Planos de apadrinhamento e dados de doação por moeda */

export type Plan = {
  slug: string;
  name: string;
  short: string;
  price: number;
  includes: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "educacional",
    name: "Apadrinhamento Educacional",
    short: "Educacional",
    price: 35,
    includes: ["Uniforme", "Material escolar", "Ensino com princípios cristãos"],
  },
  {
    slug: "nutricional",
    name: "Apadrinhamento Nutricional",
    short: "Nutricional",
    price: 35,
    includes: ["Café da manhã diário", "Almoço completo diário"],
  },
  {
    slug: "integral",
    name: "Apadrinhamento Integral",
    short: "Integral",
    price: 70,
    includes: ["Café da manhã e almoço", "Uniforme e material escolar", "Ensino com princípios cristãos", "Atualizações sobre o afilhado"],
    featured: true,
  },
  {
    slug: "professor",
    name: "Apadrinhamento Professor",
    short: "Professor",
    price: 350,
    includes: ["Salário justo para um professor local", "Formação continuada", "Transporte e materiais pedagógicos"],
  },
];

export const getPlan = (slug: string) => plans.find((p) => p.slug === slug);

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export type Currency = "brl" | "eur" | "usd";

export const currencies: { id: Currency; symbol: string; label: string; flag: string; hint: string }[] = [
  { id: "brl", symbol: "R$", label: "Reais", flag: "br", hint: "Pix, transferência, PayPal ou apadrinhamento mensal" },
  { id: "eur", symbol: "€", label: "Euros", flag: "eu", hint: "PayPal, MB Way ou IBAN" },
  { id: "usd", symbol: "$", label: "Dólar", flag: "us", hint: "PayPal" },
];

export const suggestedAmounts: Record<Currency, number[]> = {
  brl: [35, 70, 150, 350],
  eur: [10, 25, 50, 100],
  usd: [10, 25, 50, 100],
};

export const paypal = {
  brl: "https://www.paypal.com/donate/?hosted_button_id=BVC7KCMTN9BTW",
  eur: "https://www.paypal.com/donate/?hosted_button_id=YY3AV953NNKBW",
  usd: "https://www.paypal.com/donate/?hosted_button_id=62VJPYQM788TQ",
};

export const bankBRL = {
  bank: "Banco Itaú",
  account: "19800-7",
  agency: "1268",
  holder: "Associação Cross Missions",
};

export const pixBRL = {
  key: "24.300.066/0001-65",
  keyType: "CNPJ",
  holder: "INSTITUTO MISSION",
  code: "00020126360014BR.GOV.BCB.PIX0114243000660001655204000053039865802BR5917INSTITUTO MISSION6009SAO PAULO622605226Z9RUAlTso0gUvdI9wEEvE63046DD5",
};

export const euro = {
  mbway: "931853927",
  iban: "PT50 0007 0000 0064 1237 319 23",
  mbwayLogo: "/img/marca/mbway.png",
};

export const donationWhatsapp =
  "https://api.whatsapp.com/send/?phone=5511989270283&text=Ol%C3%A1%20vim%20do%20seu%20site%20CFAC";
