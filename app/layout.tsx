import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";
import { blurWarm } from "@/lib/placeholder";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import {
  pageOpenGraph,
  pageTwitter,
  siteGraphJsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ROOT_TITLE = "Sicherheitstrainer Obernburg & Aschaffenburg — Sven Zöller";
const ROOT_DESCRIPTION =
  "Anti-Aggressionstraining, Deeskalation und Gewaltprävention am bayerischen Untermain — praxisnah, direkt, wirksam. Jetzt kostenloses Erstgespräch sichern.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ROOT_TITLE,
    template: "%s — Sven Zöller | safe-untermain.de",
  },
  description: ROOT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Sven Zöller", url: SITE_URL }],
  creator: "Sven Zöller",
  publisher: SITE_NAME,
  category: "Sicherheitstraining",
  // Safari linkt Ziffernfolgen sonst eigenmächtig als Telefonnummern — u.a. die
  // Koordinaten im Footer und PLZ im Impressum.
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  keywords: [
    "Anti-Aggressionstraining",
    "Deeskalationstraining",
    "Gewaltprävention",
    "Sicherheitstrainer Obernburg",
    "Sicherheitstrainer Aschaffenburg",
    "Aggressionsmanagement",
    "Selbstbehauptungstraining",
    "Selbstverteidigungskurs",
    "Krav Maga RSC",
    "Konflikttraining Unternehmen",
    "Sicherheitstraining Bayern",
    "Sicherheitstraining Hessen",
    "Bayerischer Untermain",
  ],
  // PNG, not WebP: link unfurlers (WhatsApp, LinkedIn, Twitter) still handle WebP unreliably
  openGraph: pageOpenGraph({
    path: "/",
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  }),
  twitter: pageTwitter({ title: ROOT_TITLE, description: ROOT_DESCRIPTION }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Bestätigungs-Token aus der Google Search Console hier eintragen, sobald
  // die Property angelegt ist (Alternative: DNS-TXT-Record).
  // verification: { google: "<token>" },
};

export const viewport: Viewport = {
  themeColor: "#151412",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${bebasNeue.variable} ${ibmPlexSans.variable} antialiased`}
    >
      <body className="overflow-x-hidden">
        {/* Sitewide-Entitätengraph: Person, LocalBusiness und WebSite genau
            einmal ausgeliefert. Seiten referenzieren die Knoten per @id, statt
            sie zu duplizieren — konkurrierende Definitionen derselben Entität
            lassen Google raten, welche gilt. */}
        <JsonLd data={siteGraphJsonLd} />

        {/* FadeImage reveals each image once decoded, which needs JS. Without it they
            would stay at opacity 0 forever, so unhide them wholesale. */}
        <noscript>
          <style>{`[data-fade-image]{opacity:1!important}`}</style>
        </noscript>

        {/* Fixed background via DOM element — avoids background-attachment:fixed which
            forces CPU paint on every scroll frame and blocks GPU compositing.
            Routed through next/image so browsers receive AVIF instead of the raw WebP master.
            Not wrapped in FadeImage: this is the LCP element on every route, so it must paint
            as early as possible rather than wait out a crossfade. */}
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <Image
            src="/concrete.webp"
            alt=""
            fill
            quality={75}
            preload
            placeholder="blur"
            blurDataURL={blurWarm}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
