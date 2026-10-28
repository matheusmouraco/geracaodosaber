import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Cliente com a chave secreta: só no servidor, ignora RLS. Retorna null se o Supabase não estiver configurado. */
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client ??= createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

export type PadrinhoRow = {
  id: string;
  email: string;
  nome: string | null;
  telefone: string | null;
  plano: string;
  valor_mensal: number;
  metodo: "pix" | "paypal" | "cartao";
  status: "pendente" | "ativo" | "cancelado";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  criado_em: string;
};
