"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const leistungen = [
  {
    nr: "01",
    title: "Anti-Aggressionstraining",
    desc: "Techniken zur Kontrolle und Kanalisierung aggressiver Impulse im Alltag und unter beruflichem Druck.",
  },
  {
    nr: "02",
    title: "Deeskalationstraining",
    desc: "Kommunikations- und Verhaltensstrategien zur Entschärfung gefährlicher Situationen, bevor sie eskalieren.",
  },
  {
    nr: "03",
    title: "Gewaltprävention",
    desc: "Sensibilisierung und Früherkennung von Gefahrenpotenzial — im sozialen Umfeld und im öffentlichen Raum.",
  },
  {
    nr: "04",
    title: "Selbstbehauptung & Selbstverteidigung",
    desc: "Körperliche und mentale Stärke für mehr Sicherheit, Klarheit und Selbstbewusstsein im Alltag.",
  },
];

export default function Leistungen() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="leistungen" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="mb-12 lg:mb-16">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-amber mb-3">
            Leistungen
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-ink">
            Was ich anbiete.
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {leistungen.map((item, i) => (
            <motion.div
              key={item.nr}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group relative p-6 border border-ink/10 bg-white/60 overflow-hidden hover:border-amber/20 transition-colors duration-300"
            >
              {/* Amber top line on hover */}
              <div className="absolute top-0 left-0 h-0.5 bg-amber w-0 group-hover:w-full transition-all duration-300 ease-out" />

              <span className="font-mono text-xs text-amber mb-5 block">
                {item.nr}
              </span>
              <h3 className="font-display text-base font-medium text-ink mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-ink/55 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
