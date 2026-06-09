"use client";

import { FlipCard } from "@/components/ui/flip-card";

const LEISTUNGEN = [
  {
    title: "Anti-Aggressionstraining",
    category: "Impulse steuern",
    src: "/anti_agression.jpg",
    objectPosition: "center",
    excerpt:
      "Eigene Impulse frühzeitig erkennen, körperliche Warnsignale deuten und regulieren — bevor Situationen eskalieren. Für Fachkräfte, Sicherheitsdienste und soziale Berufe.",
  },
  {
    title: "Deeskalationstraining",
    category: "Konflikte entschärfen",
    src: "/Deeskalation.jpg",
    objectPosition: "top",
    excerpt:
      "Deeskalation beginnt Sekunden vor dem Konflikt: durch Körpersprache, Stimme und Distanz. Verbale und nonverbale Techniken für Hochdrucksituationen.",
  },
  {
    title: "Gewaltprävention",
    category: "Risiken vermeiden",
    src: "/gewaltprävention.jpg",
    objectPosition: "center 40%",
    excerpt:
      "Gefahren früh erkennen, gar nicht erst in sie geraten. Situationsanalyse, Risikobewusstsein und rechtliche Grundlagen der Notwehr im Alltag.",
  },
  {
    title: "Selbstbehauptung & Selbstverteidigung",
    category: "Grenzen setzen",
    src: "/selbstbehauptung.jpg",
    objectPosition: "center 35%",
    excerpt:
      "Mentale Stärke verbunden mit den physischen Grundlagen aus Krav Maga. Einfache, stresserprobte Techniken für Erwachsene aller Fitnessstufen.",
  },
];

export default function Leistungen() {
  return (
    <section id="leistungen" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-amber mb-3">
            Was ich anbiete
          </p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
            Leistungen
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEISTUNGEN.map((item) => (
            <FlipCard key={item.title} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
