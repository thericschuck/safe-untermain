"use client";

import { useEffect } from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blurWarm } from "@/lib/placeholder";

const EYE_TRANSITION = { duration: 5.0, delay: 0.3, ease: "easeOut" } as const;

// Biometric scan sequence — starts after eye is fully visible (~5.3s)
const IRIS_DELAY = 5.5;   // blue tint fades in
const CROSSHAIR_DELAY = 5.8;  // crosshair fades in as iris turns blue, stays permanently
// CH_GAP / CH_W moved to CSS variables --ch-gap / --ch-w in globals.css

export default function Hero() {
  // Lock scroll on mount; release after eye animation completes (~5.3s = delay 0.3 + duration 5.0)
  // Desktop-only — the mobile hero has no scan animation, so there's nothing to wait out.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflowY = "hidden";
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    }, 5600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    };
  }, []);

  // Parallax — text moves up faster than scroll, feels like foreground layer
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -90]);
  const textY = useSpring(rawY, { stiffness: 70, damping: 22 });

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          Mobile hero — letterbox: fixed-height photo band, then a
          solid ink panel for the text. No gradient math, no risk of
          copy running into a fade zone.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative md:hidden">
        <div className="relative h-[42vh] min-h-[17rem] overflow-hidden">
          <Image
            src="/eye.webp"
            alt=""
            fill
            className="object-cover object-[60%_42%]"
            loading="eager"
            quality={75}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurWarm}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, var(--color-ink) 100%)",
            }}
          />
        </div>

        <div className="bg-ink px-6 py-10">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
            safe-untermain.de
          </p>
          <h1 className="font-display text-[clamp(2.4rem,11vw,3.2rem)] leading-[0.95] tracking-wide text-paper uppercase mb-4">
            <span className="block">Sicherheit Beginnt</span>
            <span className="block italic text-rot">Im Kopf.</span>
          </h1>
          <p className="text-[15px] text-paper/60 leading-relaxed mb-6 max-w-sm">
            Anti-Aggression, Deeskalation und Gewaltprävention —{" "}
            praxisnah, direkt, wirksam.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="px-6 py-3 bg-paper text-ink font-medium text-sm hover:bg-rot hover:text-paper transition-colors duration-200"
            >
              Kostenloses Erstgespräch
            </Link>
            <a
              href="#leistungen"
              className="px-6 py-3 border border-paper/25 text-paper font-medium text-sm hover:border-rot hover:text-rot transition-colors duration-200"
            >
              Leistungen ansehen →
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          Desktop hero — unchanged: full eye + biometric scan sequence.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen hidden md:flex md:flex-col">

      {/* ── Eye — parallax + slow fade-in ── */}
      <m.div
        className="absolute right-0 top-0 h-full w-[60%] lg:w-[46%] pointer-events-none"
        style={{
          zIndex: 5,
          maskImage:
            "radial-gradient(ellipse 68% 60% at 52% 50%, black 8%, rgba(0,0,0,0.85) 32%, rgba(0,0,0,0.25) 58%, transparent 76%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={EYE_TRANSITION}
      >
        <div className="relative h-full w-full">
          <Image
            src="/eye.webp"
            alt=""
            fill
            className="object-cover object-[44%_48%]"
            /* lazy, not eager: this section is display:none below md, and a lazy image
               inside a display:none element never fires its IntersectionObserver — so
               mobile never fetches it. On desktop it's above the fold and visible at
               load, so the observer fires immediately anyway; no perceptible delay
               against the 0.3s-delayed, 5s fade-in. */
            loading="lazy"
            quality={75}
            sizes="(min-width: 1024px) 46vw, 60vw"
            placeholder="blur"
            blurDataURL={blurWarm}
          />

          {/* ── Blue iris tint — biometric activation after eye fades in ── */}
          <m.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 44% 34% at 52% 50%, rgba(40,130,255,0.52) 0%, rgba(20,80,220,0.22) 5%, transparent 100%)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: IRIS_DELAY, duration: 0.9, ease: "easeOut" }}
          />

        </div>
      </m.div>

      {/* ── Crosshair: 4 arms meeting at pupil — no overlap, no opacity compounding ── */}
      <m.div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 12, pointerEvents: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: CROSSHAIR_DELAY, duration: 0.8, ease: "easeOut" }}
      >
        {/* Left arm — bright at outer edge, fades toward pupil */}
        <div style={{
          position: "absolute",
          left: 0,
          right: "calc(100% - var(--ch-x) + var(--ch-gap))",
          height: "var(--ch-w)",
          top: "var(--ch-y)",
          transform: "translateY(-50%)",
          background: "linear-gradient(to right, rgba(175,228,255,0.65) 0%, rgba(140,215,255,0.50) 40%, rgba(80,190,255,0.20) 80%, transparent 100%)",
          filter: "drop-shadow(0 0 12px rgba(100,200,255,0.55))",
        }} />
        {/* Right arm — fades from pupil, bright at outer edge */}
        <div style={{
          position: "absolute",
          left: "calc(var(--ch-x) + var(--ch-gap))",
          right: 0,
          height: "var(--ch-w)",
          top: "var(--ch-y)",
          transform: "translateY(-50%)",
          background: "linear-gradient(to right, transparent 0%, rgba(80,190,255,0.20) 20%, rgba(140,215,255,0.50) 60%, rgba(175,228,255,0.65) 100%)",
          filter: "drop-shadow(0 0 12px rgba(100,200,255,0.55))",
        }} />
        {/* Top arm — bright at outer edge, fades toward pupil */}
        <div style={{
          position: "absolute",
          top: 0,
          bottom: "calc(100% - var(--ch-y) + var(--ch-gap))",
          width: "var(--ch-w)",
          left: "var(--ch-x)",
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, rgba(175,228,255,0.65) 0%, rgba(140,215,255,0.50) 40%, rgba(80,190,255,0.20) 80%, transparent 100%)",
          filter: "drop-shadow(0 0 12px rgba(100,200,255,0.55))",
        }} />
        {/* Bottom arm — height overflows hero section (overflow:visible); sections wrapper
            at z=13 in page.tsx paints over it below the hero. */}
        <div style={{
          position: "absolute",
          top: "calc(var(--ch-y) + var(--ch-gap))",
          height: "300vh",
          width: "var(--ch-w)",
          left: "var(--ch-x)",
          transform: "translateX(-50%)",
          background: "linear-gradient(to bottom, transparent 0%, rgba(80,190,255,0.20) 6%, rgba(140,215,255,0.50) 12%, rgba(175,228,255,0.65) 20%, rgba(175,228,255,0.65) 100%)",
          filter: "drop-shadow(0 0 12px rgba(100,200,255,0.55))",
        }} />
      </m.div>

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

      {/* ── Text content — parallax: moves up faster than scroll ── */}
      <m.div className="relative flex-1 flex items-center pt-20" style={{ zIndex: 20, y: textY }}>
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
              <Link
                href="/kontakt"
                className="px-6 py-3 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200"
              >
                Kostenloses Erstgespräch
              </Link>
              <a
                href="#leistungen"
                className="px-6 py-3 border border-ink/25 text-ink font-medium text-sm hover:border-rot hover:text-rot transition-colors duration-200"
              >
                Leistungen ansehen →
              </a>
            </div>
          </div>
        </div>
      </m.div>

      </section>
    </>
  );
}
