import "server-only";

/** Envio de e-mail via Resend (REST). Retorna false se não configurado ou se o envio falhar. */
export async function sendEmail({ to, subject, html, replyTo }: { to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.FORMS_FROM_EMAIL ?? "Geração do Saber <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  }).catch(() => null);
  if (!res?.ok) {
    console.error("[email] falha no envio", res?.status, await res?.text().catch(() => ""));
    return false;
  }
  return true;
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Layout simples e compatível com clientes de e-mail, nas cores da marca */
export function emailLayout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f8fc;font-family:Arial,Helvetica,sans-serif;color:#0f1010">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden">
<tr><td style="background:#062448;padding:24px 32px;color:#ffffff;font-size:20px;font-weight:bold">Geração do Saber <span style="font-weight:normal;font-size:13px;opacity:.75">· um projeto Cross Missions</span></td></tr>
<tr><td style="padding:32px"><h1 style="margin:0 0 16px;font-size:24px;color:#062448">${title}</h1>${body}</td></tr>
<tr><td style="padding:20px 32px;background:#f7f8fc;font-size:12px;color:#5b5e6b">“O que fizer a estes pequeninos a mim fizestes”</td></tr>
</table></td></tr></table></body></html>`;
}
