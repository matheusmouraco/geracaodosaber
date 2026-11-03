import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { emailLayout, sendEmail } from "@/lib/email";

/**
 * Envia o acesso à área do padrinho: link mágico + código de 6 dígitos, por e-mail próprio (Resend).
 * Só envia para e-mails que têm apadrinhamento cadastrado.
 */

const hits = new Map<string, number[]>();
const limited = (key: string, max: number) => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const parsed = z.object({ email: z.string().trim().toLowerCase().email() }).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Informe um e-mail válido." }, { status: 422 });
  const { email } = parsed.data;
  if (limited(`ip:${ip}`, 10) || limited(`mail:${email}`, 3)) {
    return Response.json({ error: "Muitas tentativas. Aguarde alguns minutos e tente de novo." }, { status: 429 });
  }

  const db = supabaseAdmin();
  if (!db) return Response.json({ error: "Área do padrinho indisponível no momento." }, { status: 503 });

  const { data: rows } = await db.from("padrinhos").select("id").ilike("email", email).limit(1);
  if (!rows?.length) {
    return Response.json({ error: "Não encontramos apadrinhamento com este e-mail. Use o mesmo e-mail do cadastro ou fale com a gente pelo WhatsApp." }, { status: 404 });
  }

  const { data, error } = await db.auth.admin.generateLink({ type: "magiclink", email });
  if (error || !data.properties) {
    console.error("[auth] generateLink", error?.message);
    return Response.json({ error: "Não foi possível gerar o acesso agora." }, { status: 500 });
  }

  const origin = new URL(req.url).origin;
  const link = `${origin}/auth/confirm?token_hash=${encodeURIComponent(data.properties.hashed_token)}&next=/minha-conta`;
  const code = data.properties.email_otp;
  const sent = await sendEmail({
    to: email,
    subject: `${code} é o seu código de acesso — New Generation`,
    html: emailLayout(
      "Seu acesso à área do padrinho",
      `<p style="font-size:15px;line-height:1.6">Toque no botão para entrar. O acesso vale por 1 hora e só pode ser usado uma vez.</p>
<p style="margin:24px 0"><a href="${link}" style="background:#ec722a;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:bold;display:inline-block">Entrar na minha conta</a></p>
<p style="font-size:15px">Ou digite este código no site:</p>
<p style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#062448;margin:8px 0 24px">${code}</p>
<p style="font-size:12px;color:#888">Se você não pediu este acesso, ignore este e-mail.</p>`,
    ),
  });
  if (!sent) return Response.json({ error: "Não conseguimos enviar o e-mail agora. Tente de novo em instantes." }, { status: 502 });
  return Response.json({ ok: true });
}
