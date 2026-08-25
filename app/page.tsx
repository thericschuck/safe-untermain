import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import UeberSven from "@/components/UeberSven";
import Philosophie from "@/components/Philosophie";
import KontaktCTA from "@/components/KontaktCTA";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

// Below-the-fold: separate JS chunk — HTML is SSR'd for crawling,
// client JS loads after Hero is rendered, reducing initial Long Tasks
const Leistungen = dynamic(() => import("@/components/Leistungen"), { ssr: true });

const TITEL = "Sicherheitstrainer Obernburg & Aschaffenburg — Sven Zöller";
const BESCHREIBUNG =
  "Anti-Aggressionstraining, Deeskalation und Gewaltprävention am bayerischen Untermain — praxisnah, direkt, wirksam. Jetzt kostenloses Erstgespräch sichern.";

export const metadata = pageMetadata({
  path: "/",
  // absolute: der Titel trägt "Sven Zöller" schon selbst — durch das
  // "%s"-Template des Root-Layouts stünde der Name zweimal im <title>.
  title: { absolute: TITEL },
  ogTitle: TITEL,
  description: BESCHREIBUNG,
  keywords: [
    "Sicherheitstrainer Obernburg",
    "Anti-Aggressionstraining Obernburg",
    "Deeskalationstraining Aschaffenburg",
    "Gewaltprävention Unternehmen",
    "Selbstverteidigungskurs Untermain",
    "Krav Maga RSC",
    "SAFE Aggressionsmanagement",
    "Konflikttraining Bayern",
  ],
});

/**
 * Startseiten-FAQ: deckt die Fragen ab, mit denen Interessenten tatsächlich
 * suchen ("was kostet", "wie lange", "für wen") und die Google für
 * FAQ-Rich-Results und AI-Overviews auswertet.
 */
const FAQ_ITEMS = [
  {
    frage: "Für wen sind die Trainings von SAFE Aggressionsmanagement geeignet?",
    antwort:
      "Für Unternehmen, Behörden, Kliniken, Pflegeeinrichtungen, Schulen und Vereine ebenso wie für Privatpersonen. Berufsgruppen mit Publikumsverkehr buchen meist Deeskalationstrainings, Schulen Gewaltpräventions- und Anti-Mobbing-Projekte, Privatpersonen Anti-Aggressionstraining oder Selbstbehauptung. Jedes Format wird auf die Teilnehmer zugeschnitten.",
  },
  {
    frage: "In welcher Region bieten Sie Sicherheitstrainings an?",
    antwort:
      "Schwerpunkt ist der bayerische Untermain: Obernburg am Main, Aschaffenburg, Miltenberg, Erlenbach, Klingenberg, Elsenfeld und Großwallstadt. Trainings im Rhein-Main-Gebiet, im Odenwald sowie in Bayern, Hessen und Baden-Württemberg sind nach Absprache möglich — Inhouse-Schulungen finden bei Ihnen vor Ort statt.",
  },
  {
    frage: "Was kostet ein Training?",
    antwort:
      "Die Kosten hängen von Format, Teilnehmerzahl und Dauer ab — ein Einzelsetting wird anders kalkuliert als ein Inhouse-Workshop für eine ganze Abteilung. Das Erstgespräch ist kostenlos und unverbindlich; darin erhalten Sie ein konkretes Angebot, bevor Sie sich festlegen.",
  },
  {
    frage: "Wie läuft das kostenlose Erstgespräch ab?",
    antwort:
      "Im Erstgespräch klären wir Anlass, Ziel und Rahmen: Worum geht es konkret, wer nimmt teil, gibt es Auflagen oder betriebliche Vorgaben? Daraus entsteht ein Vorschlag für Format und Umfang. Das Gespräch ist unverbindlich und kann telefonisch, per Video oder vor Ort stattfinden.",
  },
  {
    frage: "Welche Qualifikationen bringt Sven Zöller mit?",
    antwort:
      "Über zwanzig Jahre Erfahrung, davon über 20 Jahre aktiver Dienst beim Technischen Hilfswerk. Zertifizierter Krav-Maga-RSC-Trainer (Real Selfdefence Concept), Anti-Aggressionstrainer — als AAT beim AJSD Niedersachsen gelistet —, ausgebildeter Peer für psychosoziale Unterstützung, SbE (Stressbearbeitung nach belastenden Ereignissen) sowie Kommunikationscoach und zertifizierter Mediator.",
  },
  {
    frage: "Finden die Trainings bei Ihnen oder bei uns statt?",
    antwort:
      "Firmen- und Schulschulungen finden in der Regel bei Ihnen vor Ort statt. Das ist inhaltlich der bessere Weg: Geübt wird in genau der Umgebung, in der die Situationen auftreten. Einzeltrainings lassen sich flexibel vereinbaren.",
  },
  {
    frage: "Wird ein Anti-Aggressionstraining bei behördlichen Auflagen anerkannt?",
    antwort:
      "Das SAFE Anti-Aggressionstraining ist unter anderem als AAT beim AJSD Niedersachsen gelistet. Ob Ihre konkrete Auflage damit erfüllt ist, entscheidet die anordnende Stelle — Gericht, Jugendamt oder Bewährungshilfe. Bringen Sie den Bescheid zum Erstgespräch mit, dann klären wir das vorab.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={webPageJsonLd({ path: "/", name: TITEL, description: BESCHREIBUNG })} />
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />

      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        {/* Gap — concrete shows between hero and sections. None on mobile: the
            letterbox hero ends full-bleed in solid ink, so the concrete sliver
            just reads as a rendering glitch there. */}
        <div className="h-0 md:h-16 lg:h-20" aria-hidden="true" />

        {/* Sections — z=13 stacks above the hero's bottom arm (z=12) to hide it behind section backgrounds */}
        <div className="mx-3 md:mx-5 lg:mx-9 overflow-x-hidden" style={{ position: "relative", zIndex: 13 }}>
          <Leistungen />
          <UeberSven />
          <Philosophie />
          <FAQ items={FAQ_ITEMS} kicker="Häufige Fragen" titel="Gut zu wissen" />
          <KontaktCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}
