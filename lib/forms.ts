import { z } from "zod";

export const formTypes = ["voluntario", "empresa", "agenda", "contato", "doacao", "newsletter", "apadrinhamento"] as const;
export type FormType = (typeof formTypes)[number];

export const formTitles: Record<FormType, string> = {
  voluntario: "Cadastro de voluntário",
  empresa: "Pré-cadastro de empresa parceira",
  agenda: "Cadastro para eventos",
  contato: "Fale conosco",
  doacao: "Identificação de doação",
  newsletter: "Assinatura da newsletter",
  apadrinhamento: "Novo padrinho / madrinha",
};

const phone = z
  .string()
  .trim()
  .min(8, "Informe um telefone com DDD/código do país")
  .max(25)
  .regex(/^[+\d\s()-]+$/, "Use apenas números, espaços e +");

export const fieldSchemas = {
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("Informe um e-mail válido").max(160),
  telefone: phone,
  mensagem: z.string().trim().max(2000).optional().or(z.literal("")),
  profissao: z.string().trim().max(120).optional().or(z.literal("")),
  nascimento: z.string().trim().max(10).optional().or(z.literal("")),
  empresa: z.string().trim().min(2, "Informe o nome da empresa").max(160),
  valor: z.string().trim().max(20).optional().or(z.literal("")),
  moeda: z.enum(["brl", "eur", "usd"]).optional(),
  plano: z.string().trim().max(80).optional(),
} as const;

export type FieldName = keyof typeof fieldSchemas;

export const formFields: Record<FormType, FieldName[]> = {
  voluntario: ["nome", "email", "telefone", "profissao", "nascimento", "mensagem"],
  empresa: ["nome", "empresa", "email", "telefone", "mensagem"],
  agenda: ["nome", "email", "telefone", "mensagem"],
  contato: ["nome", "email", "telefone", "mensagem"],
  doacao: ["nome", "email", "telefone", "valor", "moeda"],
  newsletter: ["email"],
  apadrinhamento: ["nome", "email", "telefone", "mensagem", "plano"],
};

export function schemaFor(type: FormType) {
  const shape = Object.fromEntries(formFields[type].map((f) => [f, fieldSchemas[f]]));
  return z.object(shape);
}

export const fieldLabels: Record<FieldName, string> = {
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone",
  mensagem: "Mensagem",
  profissao: "Profissão",
  nascimento: "Data de nascimento",
  empresa: "Empresa",
  valor: "Valor",
  moeda: "Moeda",
  plano: "Plano",
};

/** Máscara leve para telefones BR (+55) e PT (+351); demais países ficam livres */
export function formatPhone(raw: string) {
  const hasPlus = raw.trim().startsWith("+");
  const d = raw.replace(/\D/g, "");
  if (!hasPlus && d.length <= 11) {
    // Número brasileiro digitado sem código do país
    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  if (d.startsWith("55")) {
    const n = d.slice(2);
    if (n.length <= 2) return `+55 ${n}`.trim();
    if (n.length <= 7) return `+55 ${n.slice(0, 2)} ${n.slice(2)}`;
    return `+55 ${n.slice(0, 2)} ${n.slice(2, n.length - 4)}-${n.slice(-4)}`.slice(0, 19);
  }
  if (d.startsWith("351")) {
    const n = d.slice(3, 12);
    return `+351 ${n.replace(/(\d{3})(?=\d)/g, "$1 ")}`.trim();
  }
  return hasPlus ? `+${d}` : d;
}
