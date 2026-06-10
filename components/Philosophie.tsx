"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Philosophie() {
  return (
    <section className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32">

        {/* Dark card — slides in from the right */}
        <motion.div
          className="max-w-2xl mx-auto bg-ink shadow-[0_32px_80px_rgba(0,0,0,0.22)] p-7 sm:p-10 lg:p-14"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <blockquote className="relative pl-7 before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:rounded-full before:bg-rot">
            <p className="font-display text-2xl lg:text-[1.85rem] xl:text-[2rem] italic text-paper/90 leading-snug tracking-wide">
              &bdquo;Sicherheit ist kein Zufall.
              <br />
              Sie ist das Ergebnis von Vorbereitung.&ldquo;
            </p>

            <footer className="mt-8 flex items-center gap-3">
              <Avatar className="size-10 border border-paper/15 shrink-0">
                <AvatarImage src="/sven-klein.jpg" alt="Sven Zöller" />
                <AvatarFallback className="bg-paper/10 text-paper font-display text-[11px] tracking-wider">
                  SZ
                </AvatarFallback>
              </Avatar>
              <cite className="not-italic font-display text-[14px] tracking-[0.14em] text-paper uppercase">
                Sven Zöller
              </cite>
              <span aria-hidden className="size-1 rounded-full bg-paper/20" />
              <span className="font-mono text-[11px] tracking-wider text-rot/70 uppercase">
                SAFE
              </span>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
