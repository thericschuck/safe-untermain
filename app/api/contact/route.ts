import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit: IP → Timestamp letzter Versand
// Resets bei Cold-Start — ausreichend für ein kleines Kontaktformular
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30 * 60 * 1000; // 30 Minuten

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

interface KontaktBody {
  name: string;
  email: string;
  telefon?: string;
  interesse: string;
  nachricht: string;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function bestaetigung({ name, interesse, nachricht }: Pick<KontaktBody, "name" | "interesse" | "nachricht">) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eee9e4;font-family:Georgia,serif;color:#151412;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eee9e4;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#F2EDE8;border-top:3px solid #C0512C;">
      <tr><td style="padding:40px 40px 0;">
        <p style="margin:0 0 4px;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C0512C;">SAFE Aggressionsmanagement</p>
        <h1 style="margin:0 0 32px;font-size:26px;letter-spacing:0.08em;text-transform:uppercase;font-weight:400;">Anfrage eingegangen</h1>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Guten Tag ${esc(name)},</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;">vielen Dank für Ihre Kontaktanfrage. Ich habe Ihre Nachricht erhalten und werde mich schnellstmöglich bei Ihnen melden.</p>
        <p style="margin:0 0 28px;font-size:15px;line-height:1.7;">Bei dringenden Anliegen erreichen Sie mich direkt unter <a href="tel:+4915119608040" style="color:#C0512C;text-decoration:none;">0151 196 080 40</a>.</p>
      </td></tr>
      <tr><td style="padding:0 40px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="border-left:2px solid #C0512C;padding:0 0 0 16px;">
            <p style="margin:0 0 6px;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#A2B0BC;">Ihr Anliegen</p>
            <p style="margin:0 0 10px;font-family:monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#151412;">${esc(interesse)}</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#444;white-space:pre-wrap;">${esc(nachricht)}</p>
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:0 40px 36px;">
        <p style="margin:0 0 2px;font-size:15px;line-height:1.7;">Mit freundlichen Grüßen,</p>
        <p style="margin:0;font-size:15px;font-weight:bold;">Sven Zöller</p>
        <p style="margin:4px 0 0;font-family:monospace;font-size:11px;color:#A2B0BC;letter-spacing:0.08em;">SAFE Aggressionsmanagement</p>
      </td></tr>
      <tr><td style="padding:20px 40px 32px;border-top:1px solid #ddd;">
        <p style="margin:0;font-size:11px;color:#A2B0BC;line-height:1.9;">
          Buchenweg 9 · 63785 Obernburg am Main<br>
          <a href="https://safe-untermain.de" style="color:#C0512C;text-decoration:none;">safe-untermain.de</a>
          &nbsp;·&nbsp;
          <a href="mailto:info@safe-untermain.de" style="color:#C0512C;text-decoration:none;">info@safe-untermain.de</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function benachrichtigung({ name, email, telefon, interesse, nachricht }: KontaktBody) {
  const felder = [
    ["Name",    name],
    ["E-Mail",  email],
    ["Telefon", telefon || "–"],
  ] as const;

  const tabellenzeilen = felder
    .map(([label, value]) => `
      <tr>
        <td style="padding:11px 0;border-bottom:1px solid #2a2826;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;width:90px;vertical-align:top;">${label}</td>
        <td style="padding:11px 0;border-bottom:1px solid #2a2826;font-size:14px;color:#F2EDE8;">${esc(value)}</td>
      </tr>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:Georgia,serif;color:#F2EDE8;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#1a1917;border-top:3px solid #C0512C;">
      <tr><td style="padding:40px 40px 0;">
        <p style="margin:0 0 4px;font-family:monospace;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C0512C;">safe-untermain.de</p>
        <h1 style="margin:0 0 6px;font-size:24px;letter-spacing:0.08em;text-transform:uppercase;font-weight:400;color:#F2EDE8;">Neue Kontaktanfrage</h1>
        <p style="margin:0 0 32px;font-family:monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#C0512C;">${esc(interesse)}</p>
      </td></tr>
      <tr><td style="padding:0 40px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${tabellenzeilen}
        </table>
      </td></tr>
      <tr><td style="padding:0 40px 36px;">
        <p style="margin:0 0 10px;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#555;">Nachricht</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#bbb;white-space:pre-wrap;background:#111;padding:18px;">${esc(nachricht)}</p>
      </td></tr>
      <tr><td style="padding:20px 40px 32px;border-top:1px solid #2a2826;">
        <p style="margin:0;font-size:12px;color:#555;line-height:1.7;">
          Antworten Sie direkt auf diese E-Mail, um ${esc(name)} zu kontaktieren.
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const letzterVersand = rateLimitMap.get(ip);
  if (letzterVersand && Date.now() - letzterVersand < RATE_LIMIT_MS) {
    const restMinuten = Math.ceil((RATE_LIMIT_MS - (Date.now() - letzterVersand)) / 60_000);
    return NextResponse.json(
      { fehler: `Bitte warten Sie noch ${restMinuten} Minute${restMinuten !== 1 ? "n" : ""}, bevor Sie eine weitere Anfrage senden.` },
      { status: 429 }
    );
  }

  let body: KontaktBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ fehler: "Ungültige Anfrage." }, { status: 400 });
  }

  const { name, email, telefon, interesse, nachricht } = body;

  if (!name?.trim() || !email?.trim() || !nachricht?.trim() || !interesse?.trim() || interesse === "Bitte wählen…") {
    return NextResponse.json({ fehler: "Bitte alle Pflichtfelder ausfüllen." }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ fehler: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY nicht gesetzt");
    return NextResponse.json({ fehler: "E-Mail-Dienst nicht konfiguriert." }, { status: 503 });
  }

  try {
    rateLimitMap.set(ip, Date.now());

    await Promise.all([
      // "noreply@" is a known spam-filter signal for recipients we don't control, so this one
      // — going to whichever inbox the lead used — stays on kontakt@ to avoid that red flag.
      resend.emails.send({
        from: "SAFE Aggressionsmanagement <kontakt@safe-untermain.de>",
        to: email,
        replyTo: "info@safe-untermain.de",
        subject: "Ihre Anfrage ist eingegangen — SAFE Aggressionsmanagement",
        html: bestaetigung({ name, interesse, nachricht }),
      }),
      // This one always lands in info@safe-untermain.de, a mailbox we do control — a Sieve
      // rule there whitelists mail from @safe-untermain.de regardless of sender name, so
      // "noreply@" is safe here and keeps the original sender identity.
      resend.emails.send({
        from: "Kontaktformular <noreply@safe-untermain.de>",
        to: "info@safe-untermain.de",
        replyTo: email,
        subject: `Neue Anfrage: ${interesse} — ${name}`,
        html: benachrichtigung({ name, email, telefon, interesse, nachricht }),
      }),
    ]);

    return NextResponse.json({ erfolg: true });
  } catch (err) {
    console.error("[contact] Resend Fehler:", err);
    return NextResponse.json(
      { fehler: "Die E-Mail konnte nicht gesendet werden. Bitte versuchen Sie es später erneut." },
      { status: 500 }
    );
  }
}
