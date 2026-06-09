"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const leistungenItems = [
  { label: "Anti-Aggressionstraining",        href: "/#leistung-anti-aggressionstraining", id: "anti-aggressionstraining" },
  { label: "Deeskalationstraining",            href: "/#leistung-deeskalationstraining",    id: "deeskalationstraining" },
  { label: "Gewaltprävention",                 href: "/#leistung-gewaltpravention",         id: "gewaltpravention" },
  { label: "Selbstbehauptung & Selbstverteidigung", href: "/#leistung-selbstbehauptung",   id: "selbstbehauptung" },
];

const mainLinks = [
  { label: "Home",         href: "/" },
  { label: "Unser Konzept", href: "#konzept" },
  { label: "Über mich",    href: "#ueber" },
  { label: "Kontakt",      href: "/kontakt" },
  { label: "Partner",      href: "#partner" },
];

// Diamond crosshatch — dark grey, subtle metallic texture
const CROSSHATCH = `
  repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px,
    transparent 1px, transparent 9px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px,
    transparent 1px, transparent 9px
  )
`.replace(/\s+/g, " ").trim();

function HoverLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="relative inline-block group">
      <span className="relative z-10 block font-display text-[19px] tracking-[0.14em] uppercase text-paper group-hover:text-paper transition-colors duration-300 py-2 px-4">
        {children}
      </span>
      <span className="absolute inset-0 border-t border-b border-amber scale-y-[2.5] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100 pointer-events-none" />
      <span className="absolute top-px left-0 w-full h-[calc(100%-2px)] bg-amber scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100 pointer-events-none" />
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leistungenOpen, setLeistungenOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setLeistungenOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setLeistungenOpen(false), 120);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "bg-linear-to-b from-ink/60 to-transparent"
      }`}
    >
      {/* ── Metallic crosshatch — fades in on scroll ── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: CROSSHATCH }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="shrink-0 leading-none">
          <span className="font-display text-2xl lg:text-3xl tracking-[0.32em] text-paper uppercase">
            SAFE
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">

          {mainLinks.slice(0, 3).map((l) => (
            <HoverLink key={l.label} href={l.href}>
              {l.label}
            </HoverLink>
          ))}

          {/* ── Leistungen dropdown ── */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            {/* Click navigates to the section; hover opens dropdown */}
            <Link href="/#leistungen" className="relative inline-block group">
              <span className="relative z-10 flex items-center gap-1.5 font-display text-[19px] tracking-[0.14em] uppercase text-paper group-hover:text-paper transition-colors duration-300 py-2 px-4">
                Leistungen
                <svg
                  className={`w-2.5 h-2.5 transition-transform duration-300 ${leistungenOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 10 6"
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="absolute inset-0 border-t border-b border-amber scale-y-[2.5] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100 pointer-events-none" />
              <span className="absolute top-px left-0 w-full h-[calc(100%-2px)] bg-amber scale-0 opacity-0 transition-all duration-300 origin-top group-hover:scale-100 group-hover:opacity-100 pointer-events-none" />
            </Link>

            {leistungenOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-68 bg-ink/96 backdrop-blur-md border border-paper/10 shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleClose}
              >
                <div className="h-px bg-amber/70 w-full" />
                {leistungenItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setLeistungenOpen(false);
                      window.dispatchEvent(new CustomEvent("open-leistung", { detail: { id: item.id } }));
                    }}
                    className="flex items-center gap-3.5 px-5 py-3.5 text-[13px] font-sans tracking-wide text-paper/60 hover:text-paper hover:bg-paper/5 transition-all duration-150 border-b border-paper/6 last:border-0 group/item"
                  >
                    <span className="w-1.25 h-1.25 shrink-0 rotate-45 bg-amber/35 group-hover/item:bg-amber transition-colors duration-150" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {mainLinks.slice(3).map((l) => (
            <HoverLink key={l.label} href={l.href}>
              {l.label}
            </HoverLink>
          ))}

          {/* CTA */}
          <div className="relative inline-block group ml-4">
            <Link href="/kontakt">
              <span className="relative z-10 block font-display text-[19px] tracking-[0.14em] uppercase text-paper group-hover:text-ink transition-colors duration-300 py-2 px-5">
                Erstgespräch
              </span>
              <span className="absolute inset-0 border border-paper/40 group-hover:border-paper transition-colors duration-300 pointer-events-none" />
              <span className="absolute inset-0 bg-paper scale-x-0 opacity-0 transition-all duration-300 origin-left group-hover:scale-x-100 group-hover:opacity-100 pointer-events-none" />
            </Link>
          </div>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span className={`block h-[1.5px] w-6 bg-paper transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-paper transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-6 bg-paper transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-ink/98 backdrop-blur-md border-t border-paper/8">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {mainLinks.slice(0, 3).map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-display text-base tracking-[0.16em] uppercase text-paper hover:text-amber py-4 border-b border-paper/8 transition-colors">
                {l.label}
              </Link>
            ))}

            {/* Mobile Leistungen — label navigates, chevron toggles sub-items */}
            <div className="border-b border-paper/8">
              <div className="flex items-center">
                <Link
                  href="/#leistungen"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-base tracking-[0.16em] uppercase text-paper hover:text-amber py-4 flex-1 transition-colors"
                >
                  Leistungen
                </Link>
                <button
                  onClick={() => setMobileLeistungenOpen((v) => !v)}
                  className="p-3 text-paper/50 hover:text-amber transition-colors"
                  aria-label="Untermenü öffnen"
                >
                  <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${mobileLeistungenOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 10 6">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {mobileLeistungenOpen && (
                <div className="pb-3 pl-4 flex flex-col">
                  {leistungenItems.map((item) => (
                    <Link key={item.label} href={item.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileLeistungenOpen(false);
                        window.dispatchEvent(new CustomEvent("open-leistung", { detail: { id: item.id } }));
                      }}
                      className="text-[13px] font-sans text-paper/70 hover:text-amber py-2 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainLinks.slice(3).map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-display text-base tracking-[0.16em] uppercase text-paper hover:text-amber py-4 border-b border-paper/8 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt" onClick={() => setMenuOpen(false)}
              className="font-display text-base tracking-[0.16em] uppercase mt-5 py-4 border border-paper/25 text-paper hover:border-amber hover:text-amber text-center transition-colors">
              Erstgespräch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
