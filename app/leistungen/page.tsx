import Image from "next/image";
import Link from "next/link";
import { blurWarm } from "@/lib/placeholder";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { LEISTUNGEN } from "@/lib/leistungen";
import {
  breadcrumbJsonLd,
  pageMetadata,
  webPageJsonLd,
  SITE_URL,
  BUSINESS_ID,
} from "@/lib/seo";

const PATH = "/leistungen";
const TITEL = "Leistungen — Trainings & Workshops | Sven Zöller";
const BESCHREIBUNG =
  "Alle Trainings im Überblick: Anti-Aggressionstraining, Deeskalation, Gewaltprävention und Selbstbehauptung — für Unternehmen, Schulen und Privatpersonen.";

export const metadata = pageMetadata({
  path: PATH,
  title: { absolute: TITEL },
  ogTitle: TITEL,
  description: BESCHREIBUNG,
  keywords: [
    "Sicherheitstraining Angebote",
    "Anti-Aggressionstraining",
    "Deeskalationstraining",
    "Gewaltprävention",
    "Selbstverteidigungskurs",
    "Aggressionsmanagement Untermain",
    "Sicherheitstrainer Obernburg",
    "Konflikttraining Unternehmen",
  ],
});

/** ItemList der vier Leistungen — signalisiert Google die Hub-Struktur. */
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Trainingsangebote SAFE Aggressionsmanagement",
  itemListOrder: "https://schema.org/ItemListUnordered",
  numberOfItems: LEISTUNGEN.length,
  itemListElement: LEISTUNGEN.map((l, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: l.title,
    url: `${SITE_URL}/leistungen/${l.slug}`,
    item: {
      "@type": "Service",
      "@id": `${SITE_URL}/leistungen/${l.slug}#service`,
      name: l.title,
      serviceType: l.serviceType,
      description: l.excerpt,
      provider: { "@id": BUSINESS_ID },
    },
  })),
};

export default function LeistungenPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <JsonLd
        data={webPageJsonLd({ path: PATH, name: TITEL, description: BESCHREIBUNG })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Leistungen", path: PATH },
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
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
              SAFE Aggressionsmanagement
            </p>
            <h1 className="font-display text-[clamp(2.2rem,10vw,5.5rem)] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
              Leistungen
            </h1>
          </div>
        </div>

        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

                <div className="max-w-3xl mb-16">
                  <h2 className="font-display text-4xl lg:text-5xl tracking-wide text-ink uppercase leading-none mb-8">
                    Vier Wege zu mehr Sicherheit
                  </h2>
                  <div className="space-y-4 text-ink/65 text-base leading-relaxed">
                    <p>
                      Ob unkontrollierte Impulse, aggressive Kunden am Schalter, Mobbing
                      im Klassenzimmer oder das Bedürfnis, sich im Ernstfall wehren zu
                      können — die Ursachen unterscheiden sich, das Ziel ist dasselbe:
                      handlungsfähig bleiben, wenn es eng wird.
                    </p>
                    <p>
                      Jedes Training wird auf die Teilnehmer zugeschnitten. Für
                      Unternehmen, Behörden, Kliniken und Schulen als Inhouse-Workshop,
                      für Privatpersonen im Einzelsetting. Schwerpunkt ist der
                      bayerische Untermain rund um Obernburg, Aschaffenburg und
                      Miltenberg.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/8">
                  {LEISTUNGEN.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/leistungen/${l.slug}`}
                      className="group bg-paper flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={l.src}
                          alt={`${l.title} — SAFE Aggressionsmanagement mit Sven Zöller`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: l.objectPosition }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          placeholder="blur"
                          blurDataURL={blurWarm}
                        />
                      </div>
                      <div className="p-8 lg:p-10 flex flex-col flex-1">
                        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-3">
                          {l.category}
                        </p>
                        <h3 className="font-display text-2xl lg:text-3xl tracking-[0.06em] text-ink uppercase leading-tight mb-4">
                          {l.title}
                        </h3>
                        <p className="text-[14px] font-sans text-ink/55 leading-relaxed flex-1">
                          {l.excerpt}
                        </p>
                        <span className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-ink group-hover:text-rot transition-colors duration-200">
                          Mehr erfahren →
                        </span>
                      </div>
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
                    Unsicher, was passt?
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
