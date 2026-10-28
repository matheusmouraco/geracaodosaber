import { createServerClient, parseCookieHeader, serializeCookieHeader, type CookieOptions } from "@supabase/ssr";

/** Troca o token do link mágico por uma sessão (cookies) e leva o padrinho para a conta. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const tokenHash = url.searchParams.get("token_hash");
  const next = url.searchParams.get("next")?.startsWith("/") ? url.searchParams.get("next")! : "/minha-conta";

  const pending: { name: string; value: string; options: CookieOptions }[] = [];
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => parseCookieHeader(req.headers.get("cookie") ?? "").map((c) => ({ name: c.name, value: c.value ?? "" })),
      setAll: (cookies) => {
        pending.push(...cookies);
      },
    },
  });

  let target = `${next}?erro=link`;
  if (tokenHash) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "email" });
    if (!error) target = next;
  }

  const res = new Response(null, { status: 303, headers: { Location: new URL(target, url.origin).toString(), "Cache-Control": "no-store" } });
  for (const c of pending) res.headers.append("Set-Cookie", serializeCookieHeader(c.name, c.value, c.options));
  return res;
}
