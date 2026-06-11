import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import UeberSven from "@/components/UeberSven";
import Philosophie from "@/components/Philosophie";
import KontaktCTA from "@/components/KontaktCTA";
import Footer from "@/components/Footer";

// Below-the-fold: separate JS chunk — HTML is SSR'd for crawling,
// client JS loads after Hero is rendered, reducing initial Long Tasks
const Leistungen = dynamic(() => import("@/components/Leistungen"), { ssr: true });

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://safe-untermain.de/",
    title: "Sven Zöller — Sicherheitstrainer | safe-untermain.de",
    description:
      "Anti-Aggression, Deeskalation und Gewaltprävention — praxisnah, direkt, wirksam. Zertifizierter Sicherheitstrainer aus Obernburg am Main.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sven Zöller",
  url: "https://safe-untermain.de",
  image: "https://safe-untermain.de/sven.png",
  jobTitle: "Sicherheitstrainer & Personalcoach",
  description:
    "Zertifizierter Deeskalations-, Antigewalt- und Anti-Aggressions-Trainer, Kommunikationscoach und Mediator mit über zwanzig Jahren Erfahrung.",
  email: "mailto:safe@sven-zoeller.de",
  telephone: "+4915119608040",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Buchenweg 9",
    addressLocality: "Obernburg",
    postalCode: "63785",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Aggressionsmanagement",
    "Deeskalation",
    "Gewaltprävention",
    "Krav Maga",
    "Anti-Aggressionstraining",
    "Kommunikationscoaching",
    "Mediation",
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://safe-untermain.de/#business",
  name: "SAFE Aggressionsmanagement — Sven Zöller",
  url: "https://safe-untermain.de",
  image: "https://safe-untermain.de/sven.png",
  description:
    "Anti-Aggression, Deeskalation und Gewaltprävention — praxisnah, direkt, wirksam.",
  telephone: "+4915119608040",
  email: "safe@sven-zoeller.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Buchenweg 9",
    addressLocality: "Obernburg",
    postalCode: "63785",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.8326,
    longitude: 9.1448,
  },
  areaServed: [
    { "@type": "State", name: "Bayern" },
    { "@type": "State", name: "Hessen" },
    { "@type": "State", name: "Baden-Württemberg" },
  ],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Trainingsangebote SAFE Aggressionsmanagement",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Anti-Aggressionstraining",
          description:
            "Impulse steuern — Warnsignale erkennen und regulieren, bevor Situationen eskalieren.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Deeskalationstraining",
          description:
            "Verbale und nonverbale Deeskalationstechniken für Hochdrucksituationen im öffentlichen Dienst.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gewaltprävention",
          description:
            "Gefahren früh erkennen, Risikobewusstsein schärfen, rechtliche Grundlagen der Notwehr.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Selbstbehauptung & Selbstverteidigung",
          description:
            "Mentale Stärke und Krav Maga Grundlagen. Einfache, stresserprobte Techniken für alle Fitnessstufen.",
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </script>
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        {/* Gap — concrete shows between hero and sections */}
        <div className="h-16 lg:h-20" aria-hidden="true" />

        {/* Sections — overflow-x-hidden clips horizontal animation overshoot without affecting vertical scroll */}
        <div className="mx-3 md:mx-5 lg:mx-9 overflow-x-hidden">
          <Leistungen />
          <UeberSven />
          <Philosophie />
          <KontaktCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}
