import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blurWarm } from "@/lib/placeholder";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { LeistungBlocks } from "@/components/LeistungBlocks";
import {
  LEISTUNGEN,
  getLeistung,
  serviceJsonLd,
  type Leistung,
} from "@/lib/leistungen";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webPageJsonLd,
  NAP,
} from "@/lib/seo";

/** Alle vier Leistungen zur Buildzeit vorrendern — statisches HTML für Crawler. */
export function generateStaticParams() {
  return LEISTUNGEN.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLeistung(slug);
  if (!l) return {};

  return pageMetadata({
    path: `/leistungen/${l.slug}`,
    // absolute: metaTitle ist bereits auf SERP-Länge inkl. Marke gebaut.
    // Über das "%s"-Template des Root-Layouts käme er auf 80–96 Zeichen und
    // würde von Google mitten im Keyword abgeschnitten.
    title: { absolute: l.metaTitle },
    ogTitle: l.metaTitle,
    description: l.metaDescription,
    keywords: l.keywords,
    image: { url: l.src, alt: `${l.title} bei Sven Zöller — SAFE Aggressionsmanagement` },
  });
}

function Breadcrumb({ l }: { l: Leistung }) {
  return (
    <nav aria-label="Brotkrumennavigation" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-paper/50">
        <li>
          <Link href="/" className="hover:text-paper transition-colors duration-150">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-rot">/</li>
        <li>
          <Link
            href="/leistungen"
            className="hover:text-paper transition-colors duration-150"
          >
            Leistungen
          </Link>
        </li>
        <li aria-hidden="true" className="text-rot">/</li>
        <li aria-current="page" className="text-paper/80">
          {l.title}
        </li>
      </ol>
    </nav>
  );
}

export default async function LeistungPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLeistung(slug);
  if (!l) notFound();

  const weitere = LEISTUNGEN.filter((x) => x.slug !== l.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(l)} />
      <JsonLd data={faqJsonLd(l.faq)} />
      <JsonLd
        data={webPageJsonLd({
          path: `/leistungen/${l.slug}`,
          name: l.metaTitle,
          description: l.metaDescription,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: "/leistungen" },
          { name: l.title, path: `/leistungen/${l.slug}` },
        ])}
      />

      <ScrollProgress />
      <Nav />

      <main className="relative">
        {/* Overlay */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "95vh",
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.62) 0%, rgba(21,20,18,0.42) 28%, rgba(21,20,18,0.18) 62%, transparent 100%)",
          }}
        />

        {/* Hero */}
        <div className="relative z-10 flex items-end min-h-[40vh] pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32">
            <Breadcrumb l={l} />
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
              {l.category}
            </p>
            <h1 className="font-display text-[clamp(2rem,8vw,4rem)] lg:text-[5.5rem] xl:text-[6.5rem] tracking-wide text-paper uppercase leading-[0.95] max-w-5xl">
              {l.h1}
            </h1>
          </div>
        </div>

        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            {/* Inhalt */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

                  {/* Bild + Fakten */}
                  <div className="lg:sticky lg:top-28">
                    <div className="aspect-4/5 relative overflow-hidden">
                      <Image
                        src={l.src}
                        alt={`${l.title} — SAFE Aggressionsmanagement mit Sven Zöller`}
                        fill
                        className="object-cover"
                        style={{ objectPosition: l.objectPosition }}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        loading="eager"
                        fetchPriority="high"
                        placeholder="blur"
                        blurDataURL={blurWarm}
                      />
                    </div>

                    <dl className="mt-8 border-t border-ink/10 pt-6 space-y-4">
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-1.5">
                          Für wen
                        </dt>
                        <dd className="text-[14px] font-sans text-ink/60 leading-relaxed">
                          {l.zielgruppe.join(" · ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-1.5">
                          Einzugsgebiet
                        </dt>
                        <dd className="text-[14px] font-sans text-ink/60 leading-relaxed">
                          {NAP.city}, Aschaffenburg, Miltenberg und der bayerische
                          Untermain — Inhouse-Trainings deutschlandweit nach Absprache.
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Fließtext */}
                  <div className="text-[15px] lg:text-base font-sans text-ink/65 leading-relaxed flex flex-col gap-4">
                    <p className="text-lg lg:text-xl text-ink/80 leading-relaxed">
                      {l.excerpt}
                    </p>
                    <div className="h-px w-12 bg-rot my-2" />
                    <LeistungBlocks blocks={l.blocks} subAs="h2" />

                    <div className="pt-6">
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center gap-3 px-7 py-4 bg-ink text-paper text-[13px] font-sans tracking-wide hover:bg-rot transition-colors duration-200"
                      >
                        Kostenloses Erstgespräch anfragen
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <FAQ
              items={l.faq}
              titel="Häufige Fragen"
              kicker={l.title}
            />

            {/* Weitere Leistungen — interne Verlinkung zwischen den Money-Pages */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
                  Weitere Leistungen
                </p>
                <h2 className="font-display text-4xl lg:text-5xl tracking-wide text-ink uppercase leading-none mb-10">
                  Das könnte auch passen
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/8">
                  {weitere.map((w) => (
                    <Link
                      key={w.slug}
                      href={`/leistungen/${w.slug}`}
                      className="group bg-paper p-8 hover:bg-ink transition-colors duration-200"
                    >
                      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-3">
                        {w.category}
                      </p>
                      <h3 className="font-display text-xl tracking-[0.06em] text-ink uppercase mb-3 group-hover:text-paper transition-colors duration-200">
                        {w.title}
                      </h3>
                      <p className="text-[14px] font-sans text-ink/55 leading-relaxed group-hover:text-paper/55 transition-colors duration-200">
                        {w.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-dark">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="font-display text-3xl lg:text-4xl tracking-wide text-paper uppercase leading-none">
                    Nehmen Sie Kontakt auf.
                  </p>
                  <Link
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-rot text-paper font-medium text-sm hover:bg-paper hover:text-ink transition-colors duration-200 tracking-wide"
                  >
                    Kostenloses Erstgespräch
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
