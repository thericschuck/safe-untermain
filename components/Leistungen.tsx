"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FlipCard } from "@/components/ui/flip-card";
import { LeistungBlocks } from "@/components/LeistungBlocks";
import { LEISTUNGEN } from "@/lib/leistungen";

export default function Leistungen() {
  // Starts false to match the server render, then syncs to the real value after
  // mount — reading matchMedia during the initial render would mismatch SSR HTML.
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  return (
    <section id="leistungen" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
            Was ich anbiete
          </p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
            Leistungen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {LEISTUNGEN.map((l) => (
            <FlipCard
              key={l.slug}
              id={l.slug}
              isTouch={isTouch}
              title={l.title}
              category={l.category}
              src={l.src}
              objectPosition={l.objectPosition}
              excerpt={l.excerpt}
              href={`/leistungen/${l.slug}`}
            >
              <LeistungBlocks blocks={l.blocks} />
            </FlipCard>
          ))}
        </div>

        {/* Crawlbare Textlinks auf die Detailseiten. Die Karten selbst sind
            <button>-Elemente, die ein Modal öffnen — deren Inhalt steht in
            keinem ausgelieferten HTML und ist für Crawler kein Pfad. Diese
            Zeile ist die einzige Verbindung von der Startseite zu den
            Leistungsseiten und trägt deren Link-Equity. */}
        <nav
          aria-label="Alle Leistungen im Detail"
          className="mt-10 pt-8 border-t border-ink/10"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-4">
            Alle Trainings im Detail
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LEISTUNGEN.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/leistungen/${l.slug}`}
                  className="text-[14px] font-sans text-ink/60 hover:text-rot transition-colors duration-150 underline decoration-ink/20 underline-offset-4 hover:decoration-rot"
                >
                  {l.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/leistungen"
                className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink hover:text-rot transition-colors duration-150"
              >
                Übersicht →
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </section>
  );
}
