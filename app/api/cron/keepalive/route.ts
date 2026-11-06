import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Ping diário (Vercel Cron, ver vercel.json) para o Supabase do plano grátis
 * não pausar por inatividade. Faz uma consulta leve na tabela leads.
 * A Vercel envia "Authorization: Bearer $CRON_SECRET" automaticamente.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }

  const db = supabaseAdmin();
  if (!db) return Response.json({ ok: false, error: "Supabase não configurado." }, { status: 500 });

  const { count, error } = await db.from("leads").select("id", { count: "exact", head: true });
  if (error) {
    console.error("keepalive: falha ao consultar o Supabase", error);
    return Response.json({ ok: false, error: error.message }, { status: 502 });
  }
  return Response.json({ ok: true, leads: count, at: new Date().toISOString() });
}
