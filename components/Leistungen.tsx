"use client";

import type { ReactNode } from "react";
import { FlipCard } from "@/components/ui/flip-card";

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-[0.45em] w-1 h-1 rotate-45 bg-rot shrink-0 inline-block" />
      <span>{children}</span>
    </li>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-base tracking-[0.14em] text-ink uppercase mt-1">
      {children}
    </p>
  );
}

export default function Leistungen() {
  return (
    <section id="leistungen" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
            Was ich anbiete
          </p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
            Leistungen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {/* ── Anti-Aggressionstraining ── */}
          <FlipCard
            id="anti-aggressionstraining"
            title="Anti-Aggressionstraining"
            category="Impulse steuern"
            src="/anti_agression.jpg"
            objectPosition="center"
            excerpt="Eigene Impulse frühzeitig erkennen, körperliche Warnsignale deuten und regulieren — bevor Situationen eskalieren. Für Fachkräfte, Sicherheitsdienste und soziale Berufe."
          >
            <p>
              Gewalt und Aggression sind häufige Probleme in unserer Gesellschaft. Unkontrollierte
              Aggressionsausbrüche können Beziehungen zerstören, zu Isolation und rechtlichen
              Konsequenzen führen.
            </p>
            <p>
              Aggressives Verhalten ist oft die Folge tieferliegender Probleme. Durch offene und
              ehrliche Kommunikation helfe ich meinen Teilnehmern, die Ursachen von Konflikten
              anzusprechen und gemeinsam nach Lösungen zu suchen — alte Verhaltensmuster zu
              durchbrechen, neue konstruktive Handlungsweisen zu erproben.
            </p>
            <p>
              In meinem <strong className="text-ink/80 font-medium">SAFE Aggressionsmanagement
              Anti-Aggressionstraining (AAT)</strong> — u.a. gelistet als AAT beim AJSD Niedersachsen —
              vermittle ich Techniken zur Erkennung und Steuerung von Aggressionen. Die Teilnehmer
              lernen, Auslöser besser zu verstehen, Emotionen zu regulieren und Konflikte
              gewaltfrei auszutragen.
            </p>

            <Sub>Vorteile</Sub>
            <ul className="space-y-1.5">
              {[
                "Verbesserung sozialer Beziehungen",
                "Reduzierung von Stress",
                "Steigerung des Selbstvertrauens",
                "Verbesserung der Lebensqualität",
                "Prävention von Straftaten / Förderung der Resozialisierung",
                "Entwicklung positiver Perspektiven",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <Sub>Für wen ist das Training geeignet?</Sub>
            <ul className="space-y-1.5">
              {[
                "Personen mit behördlichen Auflagen (Gericht, Jugendamt, MPU etc.)",
                "Menschen, die freiwillig an sich arbeiten wollen",
                "AAT als präventive Maßnahme",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <Sub>Mein Angebot</Sub>
            <ul className="space-y-1.5">
              {[
                "Individuelle Beratung und maßgeschneiderter Trainingsplan im Einzelsetting",
                "Flexible Termine, die sich in den Alltag integrieren lassen",
                "Diskretion und Vertraulichkeit",
                "Langjährige Erfahrung mit Menschen unterschiedlicher Hintergründe",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>
          </FlipCard>

          {/* ── Deeskalationstraining ── */}
          <FlipCard
            id="deeskalationstraining"
            title="Deeskalationstraining"
            category="Konflikte entschärfen"
            src="/Deeskalation.jpg"
            objectPosition="top"
            excerpt="Deeskalation beginnt Sekunden vor dem Konflikt: durch Körpersprache, Stimme und Distanz. Verbale und nonverbale Techniken für Hochdrucksituationen."
          >
            <p>
              Verbale Angriffe bis zu tätlichen Übergriffen im öffentlichen Dienst nehmen mehr und
              mehr zu. Es gibt kaum eine Berufsgruppe, die nicht von Beleidigungen und Angriffen
              betroffen ist — selbst Feuerwehrmänner und Rettungssanitäter werden immer häufiger
              angegriffen.
            </p>
            <p>
              In meinem <strong className="text-ink/80 font-medium">SAFE Aggressionsmanagement
              Deeskalationstraining</strong> lernen die Teilnehmer, das Anbahnen schwieriger
              Situationen frühzeitig zu erkennen und die Ursachen von Gewalt zu verstehen.
            </p>
            <p>
              Das Training ist so aufgebaut, dass Sie lernen, Ihren Kunden, Patienten oder Klienten
              in ihrer Aggression abzuholen und durch gezielte Deeskalationskommunikation stufenweise
              zu deeskalieren.
            </p>

            <Sub>Was Sie lernen</Sub>
            <ul className="space-y-1.5">
              {[
                "Frühzeitig Aggressionen wahrnehmen und kontrollieren",
                "Bedeutung von Körpersprache und Mimik in der Kommunikation",
                "Eigensicherung und präventives Notfallmanagement",
                "Verbale und nonverbale Deeskalationstechniken",
                "Maßnahmen zur persönlichen Sicherheit",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <p>
              Das SAFE Aggressionsmanagement Deeskalationstraining für Unternehmen ist die Lösung zur
              Gewährleistung eines sicheren Arbeitsplatzes und damit zur Erfüllung der Fürsorgepflicht
              gegenüber Ihren Mitarbeitern.
            </p>
            <p>
              Die Workshops werden individuell auf die Bedürfnisse des jeweiligen Unternehmens
              konzipiert.
            </p>
          </FlipCard>

          {/* ── Gewaltprävention ── */}
          <FlipCard
            id="gewaltpravention"
            title="Gewaltprävention"
            category="Risiken vermeiden"
            src="/gewaltprävention.jpg"
            objectPosition="center 40%"
            excerpt="Gefahren früh erkennen, gar nicht erst in sie geraten. Situationsanalyse, Risikobewusstsein und rechtliche Grundlagen der Notwehr im Alltag."
          >
            <p>
              Die Ursachen für aggressives Verhalten, besonders im Kindes- und Jugendalter, sind
              vielfältig. Elterliches Erziehungsverhalten, Umweltfaktoren und individuelle
              Eigenschaften spielen eine entscheidende Rolle.
            </p>
            <p>
              In meinen <strong className="text-ink/80 font-medium">SAFE Aggressionsmanagement-
              Gewaltpräventionstrainings</strong> vermittle ich Kindern und Jugendlichen ein
              nachhaltiges Bewusstsein für eigene und fremde Aggressionen — und wie man sie
              erkennt, kontrolliert und konstruktiv kanalisiert.
            </p>

            <Sub>Zentrale Ziele</Sub>
            <ul className="space-y-1.5">
              {[
                "Verbesserung der Selbst- und Fremdwahrnehmung",
                "Steigerung der Kommunikationsfähigkeit",
                "Gewaltfreies Streiten lernen",
                "Stärkung der Persönlichkeit und sozialen Kompetenz",
                "Förderung mentaler Widerstandskraft",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <Sub>SAFE Anti-Mobbing Konzept</Sub>
            <p>
              Im Rahmen des Schulunterrichts, an Projekttagen oder in AGs arbeite ich mit Schülern
              und Lehrkräften zusammen, um ein wirksames Anti-Mobbing-Konzept zu entwickeln. Ich
              helfe Kindern und Jugendlichen, eine Sensibilität für Täter und Opfer zu entwickeln
              und gebe ihnen Werkzeuge an die Hand, um Mobbing zu erkennen und aktiv dagegen
              vorzugehen.
            </p>

            <Sub>Beispiele</Sub>
            <ul className="space-y-1.5">
              {[
                "Anti-Mobbing-Workshops in Schulen (ab Sekundarstufe)",
                "Workshops für (potenzielle) Gewalttäter",
                "Projekte für Schulklassen und AGs",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>
          </FlipCard>

          {/* ── Selbstbehauptung & Selbstverteidigung ── */}
          <FlipCard
            id="selbstbehauptung"
            title="Selbstbehauptung & Selbstverteidigung"
            category="Grenzen setzen"
            src="/selbstbehauptung.jpg"
            objectPosition="center 35%"
            excerpt="Mentale Stärke verbunden mit den physischen Grundlagen aus Krav Maga. Einfache, stresserprobte Techniken für Erwachsene aller Fitnessstufen."
          >
            <p>
              Die Welt um uns herum wird in manchen Bereichen unsicherer. Deshalb biete ich
              Selbstverteidigungs- und Selbstbehauptungs-Workshops an, die darauf abzielen, Menschen
              in ihrer Sicherheit und Selbstbestimmung zu stärken.
            </p>

            <Sub>Warum immer mehr Menschen diese Kurse wählen</Sub>
            <ul className="space-y-1.5">
              {[
                "Zunehmende Unsicherheit in öffentlichen Räumen",
                "Empowerment — ein Gefühl von Sicherheit und Eigenmacht",
                "Verbesserung von Fitness und Stressabbau",
                "Stärkung des Selbstvertrauens",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <p>
              Mein Konzept basiert auf <strong className="text-ink/80 font-medium">Krav Maga RSC
              (Real Selfdefence Concept)</strong> — einer realistischen, straßenbezogenen Form der
              Selbstverteidigung, die schnelle, intuitive und wirksame Reaktionen ermöglicht.
            </p>

            <Sub>Was die Workshops beinhalten</Sub>
            <ul className="space-y-1.5">
              {[
                "Effektive Selbstverteidigungstechniken für verschiedene Angriffssituationen",
                "Gefahrenabschätzung — gefährliche Situationen früh erkennen und vermeiden",
                "Stärkung von Selbstbewusstsein und persönlicher Ausstrahlung",
                "Verbesserung von Fitness und Koordination",
                "Disziplin, Fokus und Selbstkontrolle",
              ].map((v) => <Bullet key={v}>{v}</Bullet>)}
            </ul>

            <Sub>Zielgruppen</Sub>
            <ul className="space-y-1.5">
              {["Jugendliche", "Frauen", "Männer", "Spezielle Berufsgruppen", "Einzel- und Gruppentrainings"].map(
                (v) => <Bullet key={v}>{v}</Bullet>
              )}
            </ul>

            <p>
              Jeder Workshop wird individuell auf die Bedürfnisse der Teilnehmer angepasst —
              von reiner Selbstverteidigung bis zu Fitness mit Selbstverteidigungs-Elementen.
            </p>
          </FlipCard>

        </div>
      </div>
    </section>
  );
}
