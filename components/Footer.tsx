import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink">

      {/* ── Knockout SAFE ── */}
      <div className="overflow-hidden select-none pointer-events-none">
        <span
          className="font-display block text-center uppercase leading-none text-transparent bg-clip-text bg-fixed bg-cover bg-center text-[clamp(5.5rem,22vw,22rem)] tracking-[0.06em] pt-[clamp(1.5rem,4vw,4rem)] pb-[clamp(0.5rem,2vw,2rem)]"
          style={{ backgroundImage: "image-set(url('/concrete.webp') type('image/webp'), url('/concrete.jpg') type('image/jpeg'))" }}
        >
          SAFE
        </span>
      </div>

      {/* ── Thin separator ── */}
      <div className="h-px bg-paper/8 mx-6 lg:mx-10" />

      {/* ── Footer content ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <p className="font-display text-3xl tracking-[0.25em] text-paper mb-4">SAFE</p>
            <p className="text-[13px] font-sans text-paper/40 leading-relaxed">
              Sicherheit beginnt im Kopf.<br />
              Sven Zöller — Sicherheitstrainer,<br />
              THW &amp; Krav Maga.
            </p>
            <p className="font-mono text-[11px] text-muted/50 mt-4 tracking-wider">
              49° 46′ N / 9° 8′ O
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-5">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Über mich", href: "#ueber" },
                { label: "Leistungen", href: "#leistungen" },
                { label: "Konzept", href: "#philosophie" },
                { label: "Kontakt", href: "#kontakt" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] text-paper/45 hover:text-paper transition-colors duration-150 font-sans"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-5">
              Kontakt
            </p>
            <ul className="space-y-2.5 text-[13px] font-sans">
              <li>
                <a
                  href="mailto:safe@sven-zoeller.de"
                  className="text-paper/45 hover:text-paper transition-colors duration-150"
                >
                  safe@sven-zoeller.de
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915119608040"
                  className="text-paper/45 hover:text-paper transition-colors duration-150 font-mono text-[12px] tracking-wider"
                >
                  0151 196 080 40
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/kontakt"
                  className="inline-block px-5 py-2.5 bg-rot text-paper font-medium text-[12px] hover:bg-paper hover:text-ink transition-colors duration-200 tracking-wide"
                >
                  Erstgespräch anfragen
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-paper/8">
          <p className="font-mono text-[11px] text-paper/20 tracking-wide">
            © 2026 Sven Zöller — safe-untermain.de
          </p>
          <div className="flex gap-6">
            <Link
              href="/impressum"
              className="font-mono text-[11px] text-paper/20 hover:text-paper/50 transition-colors duration-150 tracking-wide"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="font-mono text-[11px] text-paper/20 hover:text-paper/50 transition-colors duration-150 tracking-wide"
            >
              Datenschutz
            </Link>
          </div>
        </div>

        {/* ── Agency credit ── */}
        <a
          href="https://schuck-webdesign.de"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-paper/12 hover:text-paper/30 transition-colors duration-150"
        >
          Website by Schuck Webdesign
        </a>

      </div>
    </footer>
  );
}
