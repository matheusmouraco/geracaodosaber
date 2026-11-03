import { fieldLabels, formTitles, type FieldName, type FormType } from "@/lib/forms";

export const WHATSAPP_NUMBER = "5511989270283";

export const waLink = (text: string) => `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

/** Monta a mensagem de WhatsApp com os dados de um formulário */
export function formToWhatsapp(type: FormType, data: Record<string, string | undefined>) {
  const lines = Object.entries(data)
    .filter(([k, v]) => v && k !== "moeda")
    .map(([k, v]) => `${fieldLabels[k as FieldName] ?? k}: ${v}`);
  return waLink(`Olá! Vim do site do New Generation.\n*${formTitles[type]}*\n${lines.join("\n")}`);
}
