"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const headline = ["Sicherheit", "beginnt"];
const headlineItalic = ["im", "Kopf."];

export default function Hero() {
  const { scrollY } = useScroll();

  // Gloves rise from below the hero as user scrolls
  const gloveY = useTransform(scrollY, [0, 420, 900], [380, 0, -90]);
  const gloveOpacity = useTransform(scrollY, [0, 140], [0, 1]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Eye — base layer, radial mask reveals iris ── */}
      <div
        className="absolute right-0 top-0 h-full w-[60%] lg:w-[46%] pointer-events-none"
        style={{
          zIndex: 5,
          maskImage:
            "radial-gradient(ellipse 68% 60% at 52% 50%, black 8%, rgba(0,0,0,0.85) 32%, rgba(0,0,0,0.25) 58%, transparent 76%)",
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/eye.jpg"
            alt=""
            fill
            className="object-cover object-[44%_48%]"
            priority
          />
        </div>
      </div>

      {/* ── Right vignette — frames the eye in darkness ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 8,
          background:
            "linear-gradient(to left, rgba(21,20,18,0.74) 0%, rgba(21,20,18,0.30) 38%, transparent 62%)",
        }}
      />

      {/* ── Left gradient — text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 9,
          background:
            "linear-gradient(to right, rgba(242,237,232,0.78) 0%, rgba(242,237,232,0.38) 36%, transparent 58%)",
        }}
      />

      {/* ── Text content ── */}
      <div className="relative flex-1 flex items-center pt-16" style={{ zIndex: 20 }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-lg space-y-6">

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-mono text-xs tracking-[0.18em] uppercase text-amber"
            >
              Personalcoach · THW · Krav Maga
            </motion.p>

            <h1 className="font-display text-[4.5rem] lg:text-[6rem] xl:text-[7rem] leading-[0.9] tracking-wide text-ink uppercase">
              {headline.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                  className="inline-block mr-[0.15em]"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              {headlineItalic.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: (headline.length + i) * 0.08,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-[0.15em] italic text-amber"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: "easeOut" }}
              className="text-base lg:text-lg text-ink/65 leading-relaxed"
            >
              Anti-Aggression, Deeskalation und Gewaltprävention —{" "}
              praxisnah, direkt, wirksam.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <a
                href="#kontakt"
                className="px-6 py-3 bg-ink text-paper font-medium text-sm hover:bg-amber transition-colors duration-200"
              >
                Kostenloses Erstgespräch
              </a>
              <a
                href="#leistungen"
                className="px-6 py-3 border border-ink/25 text-ink font-medium text-sm hover:border-amber hover:text-amber transition-colors duration-200"
              >
                Leistungen ansehen →
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="font-mono text-xs text-muted/60 pt-2 tracking-wider"
            >
              49° 46′ N / 9° 8′ O
            </motion.p>

          </div>
        </div>
      </div>

      {/* ── Gloves — scroll-parallax from bottom-right ── */}
      <motion.div
        style={{ y: gloveY, opacity: gloveOpacity, zIndex: 12 }}
        className="absolute bottom-0 right-0 lg:right-12 pointer-events-none"
      >
        <div
          style={{
            rotate: "-12deg",
            filter: "drop-shadow(0 24px 64px rgba(0,0,0,0.32))",
          }}
        >
          <Image
            src="/gloves.png"
            alt="Boxhandschuhe"
            width={500}
            height={500}
            className="object-contain select-none w-[220px] sm:w-[300px] lg:w-[400px] xl:w-[460px]"
            priority
          />
        </div>
      </motion.div>

    </section>
  );
}
