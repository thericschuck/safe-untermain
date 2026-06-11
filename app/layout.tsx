import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
    images: [{ url: "/sven.png", alt: "Sven Zöller — Sicherheitstrainer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/sven.png"],
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
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
