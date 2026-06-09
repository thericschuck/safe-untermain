"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-medium text-ink tracking-tight"
        >
          Sven <span className="italic text-amber">Zöller</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-ink/70">
            <Link
              href="#leistungen"
              className="hover:text-amber transition-colors duration-200"
            >
              Leistungen
            </Link>
            <Link
              href="#ueber"
              className="hover:text-amber transition-colors duration-200"
            >
              Über mich
            </Link>
            <Link
              href="#kontakt"
              className="hover:text-amber transition-colors duration-200"
            >
              Kontakt
            </Link>
          </div>
          <Link
            href="#kontakt"
            className="px-4 py-2 bg-ink text-paper text-sm font-medium hover:bg-amber transition-colors duration-200"
          >
            Erstgespräch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
        >
          <span
            className={`block h-px w-6 bg-ink transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur-md border-t border-ink/10 px-6 py-6 flex flex-col gap-4 text-sm font-medium text-ink/80">
          <Link href="#leistungen" onClick={() => setMenuOpen(false)} className="hover:text-amber transition-colors">
            Leistungen
          </Link>
          <Link href="#ueber" onClick={() => setMenuOpen(false)} className="hover:text-amber transition-colors">
            Über mich
          </Link>
          <Link href="#kontakt" onClick={() => setMenuOpen(false)} className="hover:text-amber transition-colors">
            Kontakt
          </Link>
          <Link
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 bg-ink text-paper text-sm font-medium text-center hover:bg-amber transition-colors"
          >
            Erstgespräch
          </Link>
        </div>
      )}
    </nav>
  );
}
