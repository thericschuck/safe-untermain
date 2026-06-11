"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  id?: string;
  title: string;
  category: string;
  src: string;
  excerpt: string;
  children?: React.ReactNode;
  className?: string;
  objectPosition?: string;
  isTouch?: boolean;
  priority?: boolean;
}

export function FlipCard({
  id,
  title,
  category,
  src,
  excerpt,
  children,
  className,
  objectPosition = "center",
  isTouch = false,
  priority = false,
}: FlipCardProps) {
  const [active, setActive] = React.useState(() =>
    typeof window !== "undefined" && !!id && window.location.hash === `#leistung-${id}`
  );
  const modalRef = React.useRef<HTMLDivElement>(null);
  const idRef = React.useRef(id);
  idRef.current = id;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(false); };
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setActive(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, []);

  React.useEffect(() => {
    if (!id) return;
    const handler = (e: Event) => {
      if ((e as CustomEvent<{ id: string }>).detail.id === id) setActive(true);
    };
    window.addEventListener("open-leistung", handler);
    return () => window.removeEventListener("open-leistung", handler);
  }, [id]);

  // Open via URL hash change (initial value already set by the lazy useState initializer above).
  // On mount: just clear the hash from the URL if the card opened that way.
  React.useEffect(() => {
    if (idRef.current && window.location.hash === `#leistung-${idRef.current}`) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const onHashChange = () => {
      if (!idRef.current) return;
      const hashId = `#leistung-${idRef.current}`;
      if (window.location.hash === hashId) {
        setActive(true);
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  React.useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflowY = "";
    };
  }, [active]);

  return (
    <>
      {/* ── Full expanded modal ── */}
      <AnimatePresence>
        {active && (
          <>
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/75 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8">
              <m.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden bg-paper shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
              >
                {/* Modal image */}
                <div className="relative h-56 sm:h-72 shrink-0">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    className="object-cover"
                    style={{ objectPosition }}
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-paper/50 to-transparent" />
                  <button
                    type="button"
                    aria-label="Schließen"
                    onClick={() => setActive(false)}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-ink/80 backdrop-blur-sm text-paper hover:bg-rot transition-colors duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>

                {/* Modal content */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-none">
                  <div className="px-7 sm:px-9 pt-7 pb-2">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-rot mb-2">
                      {category}
                    </p>
                    <h3 className="font-display text-2xl sm:text-4xl tracking-wide text-ink uppercase leading-none wrap-break-word">
                      {title}
                    </h3>
                    <div className="mt-4 mb-6 h-px w-12 bg-rot" />
                  </div>
                  <div className="px-7 sm:px-9 pb-8 text-[15px] font-sans text-ink/65 leading-relaxed flex flex-col gap-4">
                    {children}
                  </div>
                  {/* Contact CTA */}
                  <div className="px-7 sm:px-9 pb-9 pt-5 border-t border-ink/8">
                    <Link
                      href="/kontakt"
                      onClick={() => setActive(false)}
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-ink text-paper text-[13px] font-sans tracking-wide hover:bg-rot transition-colors duration-200"
                    >
                      Kostenloses Erstgespräch anfragen
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </m.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Card: flat on touch devices, 3D flip on pointer devices ── */}
      {isTouch ? (
        /* Touch: no perspective/rotateY/backface — flat card, content visible, tap opens modal */
        <button
          type="button"
          aria-label={title}
          className={cn("block w-full h-96 lg:h-105 relative overflow-hidden appearance-none p-0 border-0", className)}
          onClick={() => setActive(true)}
        >
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={60}
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/45 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="w-8 h-0.5 bg-rot mb-3" />
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot/70 mb-1.5">
              {category}
            </p>
            <h3 className="font-display text-2xl tracking-wide text-paper uppercase leading-tight mb-2">
              {title}
            </h3>
            <p className="text-[12px] font-sans text-paper/60 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-rot">
              Mehr erfahren
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </button>
      ) : (
        /* Desktop: 3D flip on hover */
        <button
          type="button"
          aria-label={title}
          className={cn("group block w-full h-96 lg:h-105 perspective-distant appearance-none p-0 border-0", className)}
          onClick={() => setActive(true)}
        >
          <div
            className="relative w-full h-full transform-3d transition-[transform] duration-500 group-hover:transform-[rotateY(180deg)]"
            style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.6, 0.3, 1)" }}
          >
            {/* ── Front ── */}
            <div className="absolute inset-0 backface-hidden overflow-hidden">
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                quality={60}
                priority={priority}
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-1">
                  {category}
                </p>
                <h3 className="font-display text-xl lg:text-2xl tracking-wide text-paper uppercase leading-tight">
                  {title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-rot scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>

            {/* ── Back ── */}
            <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] bg-ink overflow-hidden flex flex-col p-5 lg:p-6">
              <div className="w-8 h-0.5 bg-rot mb-4" />
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot/70 mb-1.5 shrink-0">
                {category}
              </p>
              <h3 className="font-display text-2xl lg:text-[1.65rem] tracking-wide text-paper uppercase leading-tight mb-3 shrink-0">
                {title}
              </h3>
              <p className="text-[12.5px] font-sans text-paper/60 leading-relaxed min-h-0 flex-1 line-clamp-6">
                {excerpt}
              </p>
              <span className="mt-4 shrink-0 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-rot">
                Mehr erfahren
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </button>
      )}
    </>
  );
}
