"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const EYE_TRANSITION = { duration: 5.0, delay: 0.3, ease: "easeOut" } as const;

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // Lock scroll immediately on mount so the eye reveal plays uninterrupted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    };
  }, []);

  // DOMContentLoaded fires when HTML is parsed (~200-300ms), NOT window.load.
  // eye.jpg is preloaded via <link rel="preload"> (priority prop) so it's
  // available well before the 0.3s animation delay begins.
  useEffect(() => {
    const trigger = () => setTimeout(() => setLoaded(true), 60);
    if (document.readyState !== "loading") {
      trigger();
    } else {
      document.addEventListener("DOMContentLoaded", trigger, { once: true });
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    }, 5500);
    return () => clearTimeout(t);
  }, [loaded]);

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
            quality={75}
            sizes="(min-width: 1024px) 46vw, 60vw"
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

      {/* ── Left gradient (desktop) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 9,
          background:
            "linear-gradient(to right, rgba(242,237,232,0.78) 0%, rgba(242,237,232,0.38) 36%, transparent 58%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* ── Mobile: stronger paper overlay for text readability (gradient defined in globals.css) ── */}
      <div className="hero-mobile-overlay md:hidden absolute inset-0 pointer-events-none" style={{ zIndex: 10 }} />

      {/* ── Text content — parallax: moves up faster than scroll ── */}
      <motion.div className="relative flex-1 flex items-center pt-20" style={{ zIndex: 20, y: textY }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="max-w-lg space-y-6">

            <h1 className="font-display text-[clamp(2.5rem,11vw,4.5rem)] lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-wide text-ink uppercase">
              <span className="block">Sicherheit Beginnt</span>
              <span className="block italic text-rot">Im Kopf.</span>
            </h1>

            <p className="text-base lg:text-lg text-ink/65 leading-relaxed">
              Anti-Aggression, Deeskalation und Gewaltprävention —{" "}
              praxisnah, direkt, wirksam.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/kontakt"
                className="px-6 py-3 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200"
              >
                Kostenloses Erstgespräch
              </a>
              <a
                href="#leistungen"
                className="px-6 py-3 border border-ink/25 text-ink font-medium text-sm hover:border-rot hover:text-rot transition-colors duration-200"
              >
                Leistungen ansehen →
              </a>
            </div>

            <p className="font-mono text-xs text-muted/60 pt-2 tracking-wider">
              49° 46′ N / 9° 8′ O
            </p>

          </div>
        </div>
      </motion.div>

    </section>
  );
}
