import { AREA_SERVED, BUSINESS_ID, SITE_URL } from "@/lib/seo";

/* ═══════════════════════════════════════════════════════════════════
   Leistungs-Content — eine Quelle für Flip-Card-Modal (Startseite) und
   Detailseite (/leistungen/<slug>).

   Warum zentral: die Modal-Inhalte der Startseite rendern nur bei
   `active === true`, stehen also in KEINEM ausgelieferten HTML. Der
   gesamte Fließtext war damit für Crawler unsichtbar. Die Detailseiten
   servern denselben Text server-seitig — das ist die eigentliche
   Ranking-Substanz für die Money-Keywords.
   ═══════════════════════════════════════════════════════════════════ */

/** `**fett**` ist die einzige erlaubte Inline-Auszeichnung (siehe RichText). */
export type Block =
  | { typ: "text"; inhalt: string }
  | { typ: "sub"; inhalt: string }
  | { typ: "liste"; inhalt: string[] };

export type Leistung = {
  slug: string;
  /** Kartentitel — kurz, wie im Design. */
  title: string;
  /** H1 der Detailseite — Keyword vorne, Ort hinten. */
  h1: string;
  category: string;
  src: string;
  objectPosition: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** schema.org/Service.serviceType */
  serviceType: string;
  zielgruppe: string[];
  blocks: Block[];
  faq: { frage: string; antwort: string }[];
};

export const LEISTUNGEN: Leistung[] = [
  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "anti-aggressionstraining",
    title: "Anti-Aggressionstraining",
    h1: "Anti-Aggressionstraining",
    category: "Impulse steuern",
    src: "/anti_agression.webp",
    objectPosition: "center",
    excerpt:
      "Eigene Impulse frühzeitig erkennen, körperliche Warnsignale deuten und regulieren — bevor Situationen eskalieren. Für Fachkräfte, Sicherheitsdienste und soziale Berufe.",
    metaTitle: "Anti-Aggressionstraining (AAT) Obernburg | Sven Zöller",
    metaDescription:
      "Anti-Aggressionstraining (AAT) bei Sven Zöller: Impulse erkennen, Emotionen regulieren, Konflikte gewaltfrei lösen. Einzelsetting, diskret, auch bei Auflagen.",
    keywords: [
      "Anti-Aggressionstraining",
      "Anti-Aggressionstraining Obernburg",
      "Anti-Aggressionstraining Aschaffenburg",
      "AAT Training",
      "Aggressionsbewältigung",
      "Anti-Aggressionstraining gerichtliche Auflage",
      "Aggressionstraining MPU",
      "Aggressionsmanagement Einzeltraining",
    ],
    serviceType: "Anti-Aggressionstraining",
    zielgruppe: [
      "Personen mit behördlichen Auflagen",
      "Erwachsene und Jugendliche in Eigeninitiative",
      "Fachkräfte in sozialen Berufen",
    ],
    blocks: [
      {
        typ: "text",
        inhalt:
          "Gewalt und Aggression sind häufige Probleme in unserer Gesellschaft. Unkontrollierte Aggressionsausbrüche können Beziehungen zerstören, zu Isolation und rechtlichen Konsequenzen führen.",
      },
      {
        typ: "text",
        inhalt:
          "Aggressives Verhalten ist oft die Folge tieferliegender Probleme. Durch offene und ehrliche Kommunikation helfe ich meinen Teilnehmern, die Ursachen von Konflikten anzusprechen und gemeinsam nach Lösungen zu suchen — alte Verhaltensmuster zu durchbrechen, neue konstruktive Handlungsweisen zu erproben.",
      },
      {
        typ: "text",
        inhalt:
          "In meinem **SAFE Aggressionsmanagement Anti-Aggressionstraining (AAT)** — u.a. gelistet als AAT beim AJSD Niedersachsen — vermittle ich Techniken zur Erkennung und Steuerung von Aggressionen. Die Teilnehmer lernen, Auslöser besser zu verstehen, Emotionen zu regulieren und Konflikte gewaltfrei auszutragen.",
      },
      { typ: "sub", inhalt: "Vorteile" },
      {
        typ: "liste",
        inhalt: [
          "Verbesserung sozialer Beziehungen",
          "Reduzierung von Stress",
          "Steigerung des Selbstvertrauens",
          "Verbesserung der Lebensqualität",
          "Prävention von Straftaten / Förderung der Resozialisierung",
          "Entwicklung positiver Perspektiven",
        ],
      },
      { typ: "sub", inhalt: "Für wen ist das Training geeignet?" },
      {
        typ: "liste",
        inhalt: [
          "Personen mit behördlichen Auflagen (Gericht, Jugendamt, MPU etc.)",
          "Menschen, die freiwillig an sich arbeiten wollen",
          "AAT als präventive Maßnahme",
        ],
      },
      { typ: "sub", inhalt: "Mein Angebot" },
      {
        typ: "liste",
        inhalt: [
          "Individuelle Beratung und maßgeschneiderter Trainingsplan im Einzelsetting",
          "Flexible Termine, die sich in den Alltag integrieren lassen",
          "Diskretion und Vertraulichkeit",
          "Langjährige Erfahrung mit Menschen unterschiedlicher Hintergründe",
        ],
      },
      { typ: "sub", inhalt: "So läuft das Training ab" },
      {
        typ: "liste",
        inhalt: [
          "Kostenloses Erstgespräch — Anliegen, Auflagen und Ziel klären",
          "Anamnese: Auslöser, Muster und bisherige Eskalationsverläufe",
          "Trainingsplan im Einzelsetting, abgestimmt auf Ihren Alltag",
          "Praxisphase: Impulskontrolle, Selbstregulation, Konfliktkommunikation",
          "Transfer und Abschluss, auf Wunsch mit Teilnahmebestätigung",
        ],
      },
    ],
    faq: [
      {
        frage:
          "Wird das Anti-Aggressionstraining bei einer gerichtlichen Auflage anerkannt?",
        antwort:
          "Das SAFE Anti-Aggressionstraining ist unter anderem als AAT beim AJSD Niedersachsen gelistet. Ob Ihre konkrete Auflage damit erfüllt wird, entscheidet die anordnende Stelle — Gericht, Jugendamt oder Bewährungshilfe. Bringen Sie den Auflagenbescheid zum kostenlosen Erstgespräch mit, dann klären wir vorab, was gefordert ist, und Sie erhalten auf Wunsch eine Teilnahmebestätigung.",
      },
      {
        frage: "Wie lange dauert ein Anti-Aggressionstraining?",
        antwort:
          "Das hängt vom Anlass ab. Ein präventives Training ist nach wenigen Einheiten wirksam, ein Training bei behördlicher Auflage folgt dem geforderten Umfang. Der Trainingsplan wird im Erstgespräch individuell festgelegt — es gibt kein starres Paket.",
      },
      {
        frage: "Findet das Training in der Gruppe oder einzeln statt?",
        antwort:
          "Standard ist das Einzelsetting. Es ermöglicht Diskretion, ein offenes Gespräch über die tatsächlichen Auslöser und ein Tempo, das zu Ihnen passt. Gruppentrainings biete ich für Unternehmen, Einrichtungen und Schulen an.",
      },
      {
        frage: "Was kostet ein Anti-Aggressionstraining?",
        antwort:
          "Der Preis richtet sich nach Umfang und Setting. Das Erstgespräch ist kostenlos und unverbindlich; darin erhalten Sie ein konkretes Angebot, bevor Sie sich festlegen.",
      },
      {
        frage: "Ist das Training vertraulich?",
        antwort:
          "Ja. Inhalte aus dem Training werden nicht weitergegeben. Eine Rückmeldung an Dritte — etwa Gericht oder Jugendamt — erfolgt nur in dem Umfang, den Sie ausdrücklich beauftragen.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "deeskalationstraining",
    title: "Deeskalationstraining",
    h1: "Deeskalationstraining",
    category: "Konflikte entschärfen",
    src: "/Deeskalation.webp",
    objectPosition: "50% 30%",
    excerpt:
      "Deeskalation beginnt Sekunden vor dem Konflikt: durch Körpersprache, Stimme und Distanz. Verbale und nonverbale Techniken für Hochdrucksituationen.",
    metaTitle: "Deeskalationstraining für Unternehmen | Sven Zöller",
    metaDescription:
      "Deeskalationstraining für Unternehmen, Kliniken und Behörden am Untermain: verbale Techniken, Eigensicherung, Notfallmanagement. Inhouse und individuell.",
    keywords: [
      "Deeskalationstraining",
      "Deeskalationstraining Unternehmen",
      "Deeskalationstraining Aschaffenburg",
      "Deeskalationsschulung Mitarbeiter",
      "Deeskalationstraining Pflege",
      "Deeskalationstraining Behörden",
      "Umgang mit aggressiven Kunden",
      "Inhouse Schulung Deeskalation",
    ],
    serviceType: "Deeskalationstraining",
    zielgruppe: [
      "Unternehmen und Behörden",
      "Kliniken, Pflege und soziale Einrichtungen",
      "Rettungsdienst, Feuerwehr und Sicherheitsdienste",
    ],
    blocks: [
      {
        typ: "text",
        inhalt:
          "Verbale Angriffe bis zu tätlichen Übergriffen im öffentlichen Dienst nehmen mehr und mehr zu. Es gibt kaum eine Berufsgruppe, die nicht von Beleidigungen und Angriffen betroffen ist — selbst Feuerwehrmänner und Rettungssanitäter werden immer häufiger angegriffen.",
      },
      {
        typ: "text",
        inhalt:
          "In meinem **SAFE Aggressionsmanagement Deeskalationstraining** lernen die Teilnehmer, das Anbahnen schwieriger Situationen frühzeitig zu erkennen und die Ursachen von Gewalt zu verstehen.",
      },
      {
        typ: "text",
        inhalt:
          "Das Training ist so aufgebaut, dass Sie lernen, Ihren Kunden, Patienten oder Klienten in ihrer Aggression abzuholen und durch gezielte Deeskalationskommunikation stufenweise zu deeskalieren.",
      },
      { typ: "sub", inhalt: "Was Sie lernen" },
      {
        typ: "liste",
        inhalt: [
          "Frühzeitig Aggressionen wahrnehmen und kontrollieren",
          "Bedeutung von Körpersprache und Mimik in der Kommunikation",
          "Eigensicherung und präventives Notfallmanagement",
          "Verbale und nonverbale Deeskalationstechniken",
          "Maßnahmen zur persönlichen Sicherheit",
        ],
      },
      {
        typ: "text",
        inhalt:
          "Das SAFE Aggressionsmanagement Deeskalationstraining für Unternehmen ist die Lösung zur Gewährleistung eines sicheren Arbeitsplatzes und damit zur Erfüllung der Fürsorgepflicht gegenüber Ihren Mitarbeitern.",
      },
      {
        typ: "text",
        inhalt:
          "Die Workshops werden individuell auf die Bedürfnisse des jeweiligen Unternehmens konzipiert.",
      },
      { typ: "sub", inhalt: "Typische Einsatzbereiche" },
      {
        typ: "liste",
        inhalt: [
          "Kliniken, Pflegeheime und ambulante Dienste",
          "Jobcenter, Bürgerbüros und kommunale Verwaltung",
          "Schulen, Jugendhilfe und soziale Einrichtungen",
          "Rettungsdienst, Feuerwehr und THW",
          "Einzelhandel, Gastronomie und Sicherheitsdienste",
          "Kundenservice und Empfang mit Publikumsverkehr",
        ],
      },
      { typ: "sub", inhalt: "Ablauf einer Inhouse-Schulung" },
      {
        typ: "liste",
        inhalt: [
          "Bedarfsanalyse: reale Vorfälle und Risikostellen im Betrieb",
          "Konzeption des Workshops auf Ihre Berufsgruppe zugeschnitten",
          "Training vor Ort in Ihren Räumen, mit Szenarien aus Ihrem Alltag",
          "Praxisteil: Kommunikation, Distanz, Eigensicherung",
          "Auswertung und Handlungsempfehlungen für den Betrieb",
        ],
      },
    ],
    faq: [
      {
        frage: "Findet das Deeskalationstraining bei uns im Unternehmen statt?",
        antwort:
          "Ja. Die Trainings finden in der Regel als Inhouse-Schulung in Ihren Räumen statt. Das hat einen praktischen Vorteil: Wir üben in der Umgebung, in der die Situationen tatsächlich auftreten — am Empfang, im Stationszimmer, am Schalter.",
      },
      {
        frage: "Wie viele Teilnehmer sind sinnvoll?",
        antwort:
          "Für Praxisanteile haben sich Gruppen von etwa 8 bis 15 Personen bewährt. Kleinere Gruppen erlauben mehr Übungszeit pro Person, größere sind bei rein vermittelnden Inhalten möglich. Die Gruppengröße stimmen wir bei der Konzeption ab.",
      },
      {
        frage: "Wie lange dauert ein Deeskalationstraining?",
        antwort:
          "Üblich ist ein Tagesworkshop; für tiefergehende Themen oder mehrere Schichtgruppen sind Mehrtages- oder Modulformate sinnvoll. Der Umfang ergibt sich aus der Bedarfsanalyse.",
      },
      {
        frage: "Erfüllt das Training die Fürsorgepflicht des Arbeitgebers?",
        antwort:
          "Ein Deeskalationstraining ist ein zentraler Baustein, um Beschäftigte mit Publikumsverkehr auf Übergriffe vorzubereiten, und unterstützt Sie bei der Umsetzung Ihrer Fürsorgepflicht. Es ersetzt keine Gefährdungsbeurteilung, ergänzt sie aber um den praktischen Teil.",
      },
      {
        frage: "In welchem Umkreis bieten Sie Trainings an?",
        antwort:
          "Schwerpunkt ist der bayerische Untermain — Obernburg, Aschaffenburg, Miltenberg, Erlenbach und Umgebung — sowie das Rhein-Main-Gebiet. Trainings in Bayern, Hessen und Baden-Württemberg sind nach Absprache möglich.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "gewaltpraevention",
    title: "Gewaltprävention",
    h1: "Gewaltprävention",
    category: "Risiken vermeiden",
    src: "/gewaltpraevention.webp",
    objectPosition: "center 40%",
    excerpt:
      "Gefahren früh erkennen, gar nicht erst in sie geraten. Situationsanalyse, Risikobewusstsein und rechtliche Grundlagen der Notwehr im Alltag.",
    metaTitle: "Gewaltprävention & Anti-Mobbing Schulen | Sven Zöller",
    metaDescription:
      "Gewaltprävention und Anti-Mobbing für Schulen, Jugendhilfe und Vereine: Projekttage, AGs und Klassenprojekte am bayerischen Untermain. Jetzt anfragen.",
    keywords: [
      "Gewaltprävention",
      "Gewaltprävention Schule",
      "Anti-Mobbing Workshop",
      "Gewaltprävention Jugendliche",
      "Projekttag Gewaltprävention",
      "Mobbing Prävention Schule",
      "Gewaltprävention Aschaffenburg",
      "Sozialkompetenztraining Schule",
    ],
    serviceType: "Gewaltprävention",
    zielgruppe: [
      "Schulen ab Sekundarstufe",
      "Jugendhilfe und Jugendarbeit",
      "Vereine und Eltern",
    ],
    blocks: [
      {
        typ: "text",
        inhalt:
          "Die Ursachen für aggressives Verhalten, besonders im Kindes- und Jugendalter, sind vielfältig. Elterliches Erziehungsverhalten, Umweltfaktoren und individuelle Eigenschaften spielen eine entscheidende Rolle.",
      },
      {
        typ: "text",
        inhalt:
          "In meinen **SAFE Aggressionsmanagement-Gewaltpräventionstrainings** vermittle ich Kindern und Jugendlichen ein nachhaltiges Bewusstsein für eigene und fremde Aggressionen — und wie man sie erkennt, kontrolliert und konstruktiv kanalisiert.",
      },
      { typ: "sub", inhalt: "Zentrale Ziele" },
      {
        typ: "liste",
        inhalt: [
          "Verbesserung der Selbst- und Fremdwahrnehmung",
          "Steigerung der Kommunikationsfähigkeit",
          "Gewaltfreies Streiten lernen",
          "Stärkung der Persönlichkeit und sozialen Kompetenz",
          "Förderung mentaler Widerstandskraft",
        ],
      },
      { typ: "sub", inhalt: "SAFE Anti-Mobbing Konzept" },
      {
        typ: "text",
        inhalt:
          "Im Rahmen des Schulunterrichts, an Projekttagen oder in AGs arbeite ich mit Schülern und Lehrkräften zusammen, um ein wirksames Anti-Mobbing-Konzept zu entwickeln. Ich helfe Kindern und Jugendlichen, eine Sensibilität für Täter und Opfer zu entwickeln und gebe ihnen Werkzeuge an die Hand, um Mobbing zu erkennen und aktiv dagegen vorzugehen.",
      },
      { typ: "sub", inhalt: "Beispiele" },
      {
        typ: "liste",
        inhalt: [
          "Anti-Mobbing-Workshops in Schulen (ab Sekundarstufe)",
          "Workshops für (potenzielle) Gewalttäter",
          "Projekte für Schulklassen und AGs",
        ],
      },
      { typ: "sub", inhalt: "Formate für Schulen" },
      {
        typ: "liste",
        inhalt: [
          "Einzelner Projekttag für eine Klassenstufe",
          "Fortlaufende AG über ein Schulhalbjahr",
          "Workshop-Reihe zu Mobbing und Konfliktkultur",
          "Fortbildung für Lehrkräfte und pädagogisches Personal",
          "Elternabend zum Thema Aggression und Mediennutzung",
        ],
      },
    ],
    faq: [
      {
        frage: "Ab welchem Alter sind die Workshops geeignet?",
        antwort:
          "Die Anti-Mobbing- und Gewaltpräventions-Workshops sind ab der Sekundarstufe konzipiert. Für jüngere Jahrgänge passe ich Sprache, Übungen und Dauer entsprechend an — sprechen Sie mich auf Ihre konkrete Klassenstufe an.",
      },
      {
        frage: "Wie lange dauert ein Projekttag an der Schule?",
        antwort:
          "Ein Projekttag umfasst üblicherweise vier bis sechs Schulstunden pro Klasse. Alternativ sind kürzere Module über mehrere Wochen möglich, wenn das besser in den Stundenplan passt.",
      },
      {
        frage: "Arbeiten Sie auch mit den Lehrkräften?",
        antwort:
          "Ja. Ein Anti-Mobbing-Konzept trägt nur, wenn es nach dem Projekttag weitergeführt wird. Deshalb biete ich begleitende Fortbildungen für Lehrkräfte und pädagogisches Personal sowie Elternabende an.",
      },
      {
        frage: "Was kostet ein Schulprojekt?",
        antwort:
          "Das hängt von Format, Klassenzahl und Dauer ab. Für Schulen erstelle ich ein schriftliches Angebot, das sich für Förderanträge und Budgetplanung verwenden lässt. Das Vorgespräch ist kostenlos.",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────── */
  {
    slug: "selbstbehauptung",
    title: "Selbstbehauptung & Selbstverteidigung",
    h1: "Selbstbehauptung & Selbstverteidigung",
    category: "Grenzen setzen",
    src: "/selbstbehauptung.webp",
    objectPosition: "center 35%",
    excerpt:
      "Mentale Stärke verbunden mit den physischen Grundlagen aus Krav Maga. Einfache, stresserprobte Techniken für Erwachsene aller Fitnessstufen.",
    metaTitle: "Selbstverteidigung & Selbstbehauptung | Sven Zöller",
    metaDescription:
      "Selbstverteidigung und Selbstbehauptung auf Basis von Krav Maga RSC — für Frauen, Jugendliche und Berufsgruppen. Einzel- und Gruppentraining am Untermain.",
    keywords: [
      "Selbstverteidigungskurs",
      "Selbstbehauptungstraining",
      "Krav Maga",
      "Krav Maga RSC",
      "Selbstverteidigung Frauen",
      "Selbstverteidigungskurs Aschaffenburg",
      "Selbstbehauptung Jugendliche",
      "Selbstverteidigung Obernburg",
    ],
    serviceType: "Selbstverteidigungstraining",
    zielgruppe: [
      "Frauen und Jugendliche",
      "Männer aller Fitnessstufen",
      "Berufsgruppen mit erhöhtem Risiko",
    ],
    blocks: [
      {
        typ: "text",
        inhalt:
          "Die Welt um uns herum wird in manchen Bereichen unsicherer. Deshalb biete ich Selbstverteidigungs- und Selbstbehauptungs-Workshops an, die darauf abzielen, Menschen in ihrer Sicherheit und Selbstbestimmung zu stärken.",
      },
      { typ: "sub", inhalt: "Warum immer mehr Menschen diese Kurse wählen" },
      {
        typ: "liste",
        inhalt: [
          "Zunehmende Unsicherheit in öffentlichen Räumen",
          "Empowerment — ein Gefühl von Sicherheit und Eigenmacht",
          "Verbesserung von Fitness und Stressabbau",
          "Stärkung des Selbstvertrauens",
        ],
      },
      {
        typ: "text",
        inhalt:
          "Mein Konzept basiert auf **Krav Maga RSC (Real Selfdefence Concept)** — einer realistischen, straßenbezogenen Form der Selbstverteidigung, die schnelle, intuitive und wirksame Reaktionen ermöglicht.",
      },
      { typ: "sub", inhalt: "Was die Workshops beinhalten" },
      {
        typ: "liste",
        inhalt: [
          "Effektive Selbstverteidigungstechniken für verschiedene Angriffssituationen",
          "Gefahrenabschätzung — gefährliche Situationen früh erkennen und vermeiden",
          "Stärkung von Selbstbewusstsein und persönlicher Ausstrahlung",
          "Verbesserung von Fitness und Koordination",
          "Disziplin, Fokus und Selbstkontrolle",
        ],
      },
      { typ: "sub", inhalt: "Zielgruppen" },
      {
        typ: "liste",
        inhalt: [
          "Jugendliche",
          "Frauen",
          "Männer",
          "Spezielle Berufsgruppen",
          "Einzel- und Gruppentrainings",
        ],
      },
      {
        typ: "text",
        inhalt:
          "Jeder Workshop wird individuell auf die Bedürfnisse der Teilnehmer angepasst — von reiner Selbstverteidigung bis zu Fitness mit Selbstverteidigungs-Elementen.",
      },
    ],
    faq: [
      {
        frage: "Brauche ich Vorkenntnisse oder eine bestimmte Fitness?",
        antwort:
          "Nein. Krav Maga RSC setzt bewusst auf einfache, grobmotorische Reaktionen, die auch unter Stress funktionieren — unabhängig von Kraft, Größe oder Trainingsstand. Die Übungen werden an die Teilnehmer angepasst, nicht umgekehrt.",
      },
      {
        frage: "Bieten Sie reine Frauenkurse an?",
        antwort:
          "Ja. Selbstbehauptungs-Workshops für Frauen sind ein fester Bestandteil des Angebots und lassen sich als geschlossene Gruppe buchen — für Vereine, Unternehmen oder private Gruppen.",
      },
      {
        frage: "Was ist der Unterschied zwischen Selbstbehauptung und Selbstverteidigung?",
        antwort:
          "Selbstbehauptung setzt früher an: Haltung, Stimme, Grenzen setzen und Gefahren erkennen, bevor es körperlich wird. Selbstverteidigung ist die körperliche Antwort, wenn das nicht mehr reicht. In meinen Workshops gehören beide zusammen — die meisten Situationen enden, bevor die zweite Stufe nötig wird.",
      },
      {
        frage: "Kann ich einen Kurs als Einzeltraining buchen?",
        antwort:
          "Ja, Einzel- und Gruppentrainings sind beide möglich. Einzeltraining eignet sich besonders nach belastenden Erfahrungen oder wenn Sie in Ihrem eigenen Tempo arbeiten möchten.",
      },
      {
        frage: "Wie realistisch ist Krav Maga RSC im Ernstfall?",
        antwort:
          "Krav Maga RSC (Real Selfdefence Concept) ist straßenbezogen ausgelegt und arbeitet mit Szenarien statt mit Wettkampfregeln. Trainiert wird unter Stress, mit Distanzarbeit und Gefahrenabschätzung — der beste Ausgang bleibt immer der, in den Ernstfall gar nicht erst zu geraten.",
      },
    ],
  },
];

export const LEISTUNG_SLUGS = LEISTUNGEN.map((l) => l.slug);

export function getLeistung(slug: string): Leistung | undefined {
  return LEISTUNGEN.find((l) => l.slug === slug);
}

/** Service JSON-LD einer Detailseite, verknüpft mit dem LocalBusiness-Knoten. */
export function serviceJsonLd(l: Leistung) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/leistungen/${l.slug}#service`,
    name: l.title,
    serviceType: l.serviceType,
    description: l.excerpt,
    url: `${SITE_URL}/leistungen/${l.slug}`,
    image: `${SITE_URL}${l.src}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
    audience: l.zielgruppe.map((name) => ({ "@type": "Audience", audienceType: name })),
    // Kein `price`: Trainings werden individuell kalkuliert. Ein erfundener
    // Preis wäre ein Rich-Results-Verstoß, ein `priceRange` liegt bereits am
    // LocalBusiness-Knoten.
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: `${SITE_URL}/kontakt`,
    },
  };
}
