import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import Image from "next/image";
import { blurWarm } from "@/lib/placeholder";
import { MotionProvider } from "@/components/MotionProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://safe-untermain.de"),
  title: {
    default: "Sven Zöller — Sicherheitstrainer | safe-untermain.de",
    template: "%s — Sven Zöller | safe-untermain.de",
  },
  description:
    "Anti-Aggression, Deeskalation und Gewaltprävention — praxisnah, direkt, wirksam. Zertifizierter Sicherheitstrainer mit 20+ Jahren THW-Erfahrung und Krav Maga Zertifizierung.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "SAFE Aggressionsmanagement — Sven Zöller",
    // PNG, not WebP: link unfurlers (WhatsApp, LinkedIn, Twitter) still handle WebP unreliably
    images: [{ url: "/sven-og.png", alt: "Sven Zöller — Sicherheitstrainer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/sven-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
