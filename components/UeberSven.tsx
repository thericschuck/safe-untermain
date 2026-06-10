"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const KOMPETENZEN = ["Konfliktmanagement", "Deeskalation", "Gewaltprävention", "Kommunikation"];

export default function UeberSven() {
  return (
    <section id="ueber" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Foto — slides in from the left */}
          <motion.div
            className="aspect-4/5 relative overflow-hidden"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/sven.png"
              alt="Sven Zöller"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <div className="space-y-6">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot">
              Wer steckt dahinter?
            </p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
              20 Jahre<br />Erfahrung.<br />Kein Lehrbuch.
            </h2>

            <div className="space-y-4 text-ink/65 text-base leading-relaxed">
              <p>
                Mein Name ist Sven Zöller — zertifizierter Deeskalations-,
                Antigewalt- und Anti-Aggressions-Trainer, Kommunikationscoach
                und Mediator.
              </p>
              <p>
                Seit über zwanzig Jahren beschäftige ich mich mit den Themen
                Aggressionen und Gewalt am Arbeitsplatz, in Schulen und anderen
                Bereichen. Mit Hilfe des SAFE Aggressionsmanagements gebe ich
                diese Erfahrungen weiter.
              </p>
            </div>

            {/* Kompetenzen */}
            <div className="flex flex-wrap gap-2 pt-2">
              {KOMPETENZEN.map((k) => (
                <span
                  key={k}
                  className="px-3 py-1 border border-rot/50 text-rot font-mono text-xs tracking-wider"
                >
                  {k}
                </span>
              ))}
            </div>

            {/* Mehr lesen */}
            <div className="pt-2">
              <Link
                href="/ueber"
                className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper text-[13px] font-sans tracking-wide hover:bg-rot transition-colors duration-200"
              >
                Mehr erfahren
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
