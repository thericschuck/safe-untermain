"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, []);

  // Lock body scroll when expanded
  React.useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* ── Expanded panel ── */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4 sm:p-8">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className="w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden bg-paper shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            >
              {/* Image */}
              <motion.div layoutId={`image-${title}-${id}`} className="relative shrink-0">
                <img
                  src={src}
                  alt={title}
                  className="w-full h-56 sm:h-72 object-cover"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-linear-to-t from-paper/60 to-transparent" />
                {/* Close button */}
                <motion.button
                  layoutId={`button-${title}-${id}`}
                  aria-label="Schließen"
                  onClick={() => setActive(false)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-ink/80 backdrop-blur-sm text-paper hover:bg-amber transition-colors duration-200"
                >
                  <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Content */}
              <div className="overflow-y-auto scrollbar-none">
                <div className="px-8 pt-6 pb-2">
                  <motion.p
                    layoutId={`description-${description}-${id}`}
                    className="font-mono text-[11px] tracking-[0.2em] uppercase text-amber mb-2"
                  >
                    {description}
                  </motion.p>
                  <motion.h3
                    layoutId={`title-${title}-${id}`}
                    className="font-display text-4xl sm:text-5xl tracking-wide text-ink uppercase leading-none"
                  >
                    {title}
                  </motion.h3>
                  {/* Amber separator */}
                  <div className="mt-4 mb-6 h-px w-12 bg-amber" />
                </div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-8 pb-10 text-[15px] font-sans text-ink/65 leading-relaxed flex flex-col gap-4"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Collapsed card ── */}
      <motion.div
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "group relative flex flex-col overflow-hidden bg-ink cursor-pointer",
          className,
        )}
      >
        {/* Image */}
        <motion.div layoutId={`image-${title}-${id}`} className="relative overflow-hidden">
          <img
            src={src}
            alt={title}
            className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/20 to-transparent" />
        </motion.div>

        {/* Text + button */}
        <div className="relative flex items-end justify-between gap-3 px-5 py-4">
          <div>
            <motion.p
              layoutId={`description-${description}-${id}`}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber/80 mb-1"
            >
              {description}
            </motion.p>
            <motion.h3
              layoutId={`title-${title}-${id}`}
              className="font-display text-2xl tracking-wide text-paper uppercase leading-tight"
            >
              {title}
            </motion.h3>
          </div>
          <motion.button
            layoutId={`button-${title}-${id}`}
            aria-label="Mehr erfahren"
            className="shrink-0 w-9 h-9 flex items-center justify-center border border-paper/20 text-paper/50 group-hover:border-amber group-hover:text-amber transition-colors duration-300"
          >
            <motion.div animate={{ rotate: active ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14" /><path d="M12 5v14" />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Amber bottom line on hover */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </motion.div>
    </>
  );
}
