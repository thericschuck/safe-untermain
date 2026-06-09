"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

type WordDef = {
  text: string;
  delay: number;
  duration: number;
  italic?: boolean;
  ease: [number, number, number, number];
};

const LINE_1: WordDef[] = [
  { text: "SICHERHEIT", delay: 0.1,  duration: 1.5,  ease: [0.06, 1, 0.16, 1] },
  { text: "BEGINNT",    delay: 1.4,  duration: 0.95, ease: [0.16, 1, 0.30, 1] },
];
const LINE_2: WordDef[] = [
  { text: "IM",    delay: 2.45, duration: 1.05, italic: true, ease: [0.16, 1, 0.30, 1] },
  { text: "KOPF.", delay: 3.2,  duration: 0.9,  italic: true, ease: [0.22, 1, 0.36, 1] },
];

const EYE_TRANSITION = { duration: 5.0, delay: 0.3, ease: "easeOut" } as const;
const AFTER_TEXT = (extra: number) => ({
  duration: 0.65,
  delay: 3.4 + extra,
  ease: "easeOut" as const,
});

function WordReveal({ word, loaded }: { word: WordDef; loaded: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] pr-[0.1em] align-bottom mr-[0.14em]">
      <motion.span
        className={`inline-block${word.italic ? " italic text-amber" : ""}`}
        initial={{ y: "110%", opacity: 0.05 }}
        animate={loaded ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: word.duration, delay: word.delay, ease: word.ease }}
      >
        {word.text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const trigger = () => setTimeout(() => setLoaded(true), 60);
    if (document.readyState === "complete") {
      trigger();
    } else {
      window.addEventListener("load", trigger, { once: true });
    }
  }, []);

  // Parallax — text moves up faster than scroll, feels like foreground layer
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -90]);
  const textY = useSpring(rawY, { stiffness: 70, damping: 22 });

  return (
    <section className="relative min-h-screen flex flex-col">

      {/* ── Eye — parallax + slow fade-in ── */}
      <motion.div
        className="absolute right-0 top-0 h-full w-[60%] lg:w-[46%] pointer-events-none"
        style={{
          zIndex: 5,
          maskImage:
            "radial-gradient(ellipse 68% 60% at 52% 50%, black 8%, rgba(0,0,0,0.85) 32%, rgba(0,0,0,0.25) 58%, transparent 76%)",
        }}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={EYE_TRANSITION}
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
      </motion.div>

      {/* ── Right vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 8,
          background:
            "linear-gradient(to left, rgba(21,20,18,0.74) 0%, rgba(21,20,18,0.30) 38%, transparent 62%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* ── Left gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 9,
          background:
            "linear-gradient(to right, rgba(242,237,232,0.78) 0%, rgba(242,237,232,0.38) 36%, transparent 58%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* ── Text content — parallax: moves up faster than scroll ── */}
      <motion.div className="relative flex-1 flex items-center pt-20" style={{ zIndex: 20, y: textY }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-lg space-y-6">

            <h1 className="font-display text-[4.5rem] lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-wide text-ink uppercase">
              <span className="block">
                {LINE_1.map((w) => <WordReveal key={w.text} word={w} loaded={loaded} />)}
              </span>
              <span className="block">
                {LINE_2.map((w) => <WordReveal key={w.text} word={w} loaded={loaded} />)}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={AFTER_TEXT(0.2)}
              className="text-base lg:text-lg text-ink/65 leading-relaxed"
            >
              Anti-Aggression, Deeskalation und Gewaltprävention —{" "}
              praxisnah, direkt, wirksam.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={AFTER_TEXT(0.4)}
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
              animate={loaded ? { opacity: 1 } : {}}
              transition={AFTER_TEXT(0.8)}
              className="font-mono text-xs text-muted/60 pt-2 tracking-wider"
            >
              49° 46′ N / 9° 8′ O
            </motion.p>

          </div>
        </div>
      </motion.div>

    </section>
  );
}
