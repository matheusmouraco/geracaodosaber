import { z } from "zod";
import { fieldLabels, formTitles, formTypes, schemaFor, type FieldName } from "@/lib/forms";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { emailLayout, escapeHtml, sendEmail } from "@/lib/email";
import { getPlan } from "@/content/donation";
import { site } from "@/content/site";

/**
 * Endpoint único dos formulários.
 * 1. Grava o contato no Supabase (tabela leads; apadrinhamentos também em padrinhos).
 * 2. Avisa a equipe por e-mail (Resend) em FORMS_TO_EMAIL.
 * Se nada disso estiver disponível, devolve fallback para o navegador concluir pelo WhatsApp.
 */

const envelope = z.object({
  type: z.enum(formTypes),
  data: z.record(z.string(), z.unknown()),
  site: z.string().optional(),
  page: z.string().max(200).optional(),
});

// Rate limit simples em memória (por instância): 5 envios por minuto por IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json({ error: "Muitas tentativas em pouco tempo. Aguarde um minuto." }, { status: 429 });
  }

  const body = envelope.safeParse(await req.json().catch(() => null));
  if (!body.success) return Response.json({ error: "Requisição inválida." }, { status: 400 });

  // Honeypot preenchido: responde OK sem fazer nada
  if (body.data.site) return Response.json({ ok: true });

  const { type, page } = body.data;
  const parsed = schemaFor(type).safeParse(body.data.data);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 422 });
  }
  const data = parsed.data as Record<string, string | undefined>;
  const plan = type === "apadrinhamento" && data.plano ? getPlan(data.plano) : undefined;
  if (plan) data.plano = `${plan.name} (R$ ${plan.price}/mês)`;

  // 1. Banco
  let stored = false;
  let padrinhoId: string | undefined;
  const db = supabaseAdmin();
  if (db) {
    const { error } = await db.from("leads").insert({ tipo: type, dados: data, pagina: page ?? null });
    stored = !error;
    if (error) console.error("[forms] leads", error.message);
    if (plan && data.email) {
      const { data: row, error: e2 } = await db
        .from("padrinhos")
        .insert({ email: data.email.toLowerCase(), nome: data.nome, telefone: data.telefone, plano: plan.slug, valor_mensal: plan.price })
        .select("id")
        .single();
      if (e2) console.error("[forms] padrinhos", e2.message);
      padrinhoId = row?.id;
    }
  }

  // 2. E-mail para a equipe
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5b5e6b;vertical-align:top"><b>${fieldLabels[k as FieldName] ?? k}</b></td><td style="padding:6px 0">${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const emailed = await sendEmail({
    to: process.env.FORMS_TO_EMAIL ?? site.email,
    replyTo: data.email,
    subject: `[Site] ${formTitles[type]}${data.nome ? ` — ${data.nome}` : ""}`,
    html: emailLayout(formTitles[type], `<table style="font-size:14px">${rows}</table><p style="font-size:12px;color:#888">Página: ${escapeHtml(page ?? "-")}</p>`),
  });

  if (!stored && !emailed) {
    return Response.json({ ok: false, fallback: "whatsapp" }, { status: 202 });
  }
  return Response.json({ ok: true, padrinhoId });
}
