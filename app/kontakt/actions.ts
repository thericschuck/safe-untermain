"use server";

export interface KontaktDaten {
  name: string;
  email: string;
  telefon?: string;
  interesse: string;
  nachricht: string;
}

export async function sendeKontaktanfrage(
  formData: FormData
): Promise<{ erfolg: boolean; fehler?: string }> {
  const daten: KontaktDaten = {
    name: (formData.get("name") as string)?.trim(),
    email: (formData.get("email") as string)?.trim(),
    telefon: (formData.get("telefon") as string)?.trim() || undefined,
    interesse: (formData.get("interesse") as string) ?? "Allgemeine Anfrage",
    nachricht: (formData.get("nachricht") as string)?.trim(),
  };

  if (!daten.name || !daten.email || !daten.nachricht) {
    return { erfolg: false, fehler: "Bitte alle Pflichtfelder ausfüllen." };
  }

  // TODO: E-Mail versenden, z.B. mit Resend (resend.com):
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "noreply@safe-untermain.de",
  //   to: "kontakt@safe-untermain.de",
  //   subject: `Kontaktanfrage: ${daten.interesse}`,
  //   text: `Name: ${daten.name}\nE-Mail: ${daten.email}\nTelefon: ${daten.telefon ?? "–"}\nNachricht:\n${daten.nachricht}`,
  // });

  console.log("[Kontaktanfrage]", daten);

  return { erfolg: true };
}
