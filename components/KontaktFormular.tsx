"use client";

import { useState, useTransition, useId } from "react";
import Link from "next/link";
import { sendeKontaktanfrage } from "@/app/kontakt/actions";

const INTERESSEN = [
  "Bitte wählen…",
  "Anti-Aggressionstraining",
  "Deeskalationstraining",
  "Gewaltprävention / Anti-Mobbing",
  "Selbstbehauptung & Selbstverteidigung",
  "Allgemeine Anfrage",
];

function Field({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/45">
        {label}
        {required && <span className="text-rot ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-transparent border border-ink/15 px-4 py-3 text-[14px] font-sans text-ink placeholder:text-ink/25 focus:outline-none focus:border-rot transition-colors duration-150";

export default function KontaktFormular() {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "erfolg" | "fehler">("idle");
  const [fehlerText, setFehlerText] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendeKontaktanfrage(formData);
      if (result.erfolg) {
        setStatus("erfolg");
      } else {
        setFehlerText(result.fehler ?? "Ein Fehler ist aufgetreten.");
        setStatus("fehler");
      }
    });
  }

  if (status === "erfolg") {
    return (
      <div className="section-card">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center border border-rot">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l5 5 7-9" stroke="#C0512C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
              Anfrage gesendet
            </p>
            <h2 className="font-display text-4xl lg:text-5xl tracking-wide text-ink uppercase leading-none mb-6">
              Vielen Dank
            </h2>
            <p className="text-ink/55 leading-relaxed text-base">
              Ihre Anfrage wurde übermittelt. Ich melde mich in Kürze bei Ihnen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: info ── */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
              Kostenloses Erstgespräch
            </p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none mb-8">
              Nehmen Sie<br />Kontakt auf
            </h2>
            <p className="text-ink/55 leading-relaxed mb-10">
              Ein unverbindliches Erstgespräch — direkt, diskret und ohne
              Umwege. Schildern Sie Ihre Situation, ich zeige Ihnen, was
              möglich ist.
            </p>

            <ul className="space-y-4 mb-12">
              {[
                ["Unverbindlich", "Keine Verpflichtung, kein Druck"],
                ["Diskret",       "Vertrauliche Behandlung aller Inhalte"],
                ["Individuell",   "Maßgeschneiderter Trainingsplan"],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="mt-1 w-1.5 h-1.5 rotate-45 bg-rot shrink-0" />
                  <div>
                    <p className="font-medium text-ink text-[14px]">{title}</p>
                    <p className="text-ink/45 text-[13px]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-ink/8 pt-8">
              <a
                href="mailto:safe@sven-zoeller.de"
                className="flex items-center gap-3 font-mono text-[12px] tracking-wider text-ink/50 hover:text-rot transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="3" width="12" height="8.5" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1 3.5l6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                safe@sven-zoeller.de
              </a>
              <a
                href="tel:+4915119608040"
                className="flex items-center gap-3 font-mono text-[12px] tracking-wider text-ink/50 hover:text-rot transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2.5C2 2.5 3.5 2 4.5 4.5c.5 1.5-.5 2-.5 2s1.5 3 4.5 4.5c0 0 .5-1 2-.5C13 11.5 12.5 13 12.5 13S6.5 13 2 6.5C2 6.5 1.5 3 2 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                0151 196 080 40
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Name" required htmlFor={`${uid}-name`}>
                  <input
                    id={`${uid}-name`}
                    aria-label="Ihr Name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Max Mustermann"
                    className={inputCls}
                  />
                </Field>
                <Field label="E-Mail" required htmlFor={`${uid}-email`}>
                  <input
                    id={`${uid}-email`}
                    aria-label="Ihre E-Mail-Adresse"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="max@beispiel.de"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Telefon" htmlFor={`${uid}-telefon`}>
                <input
                  id={`${uid}-telefon`}
                  aria-label="Ihre Telefonnummer"
                  type="tel"
                  name="telefon"
                  autoComplete="tel"
                  placeholder="+49 151 000 000 00"
                  className={inputCls}
                />
              </Field>

              <Field label="Interesse" required htmlFor={`${uid}-interesse`}>
                <select
                  id={`${uid}-interesse`}
                  name="interesse"
                  required
                  defaultValue="Bitte wählen…"
                  className={`${inputCls} cursor-pointer appearance-none`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23151412' stroke-opacity='.4' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  {INTERESSEN.map((interesse) => (
                    <option
                      key={interesse}
                      value={interesse}
                      disabled={interesse === "Bitte wählen…"}
                    >
                      {interesse}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Nachricht" required htmlFor={`${uid}-nachricht`}>
                <textarea
                  id={`${uid}-nachricht`}
                  aria-label="Ihre Nachricht"
                  name="nachricht"
                  required
                  rows={5}
                  placeholder="Bitte schildern Sie kurz Ihr Anliegen…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* DSGVO */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="datenschutz"
                  required
                  className="mt-0.5 shrink-0 accent-rot w-4 h-4"
                />
                <span className="text-[12px] font-sans text-ink/40 leading-relaxed group-hover:text-ink/60 transition-colors">
                  Ich habe die{" "}
                  <Link href="/datenschutz" className="underline underline-offset-2 hover:text-rot transition-colors">
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen und bin mit der Verarbeitung meiner Daten zur
                  Bearbeitung meiner Anfrage einverstanden.{" "}
                  <span className="text-rot">*</span>
                </span>
              </label>

              {status === "fehler" && (
                <p className="text-[13px] text-red-600 font-sans">{fehlerText}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper text-[13px] font-sans tracking-wide hover:bg-rot transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed self-start"
              >
                {isPending ? "Wird gesendet…" : "Anfrage absenden"}
                {!isPending && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
