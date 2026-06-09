import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Leistungen from "@/components/Leistungen";
import UeberSven from "@/components/UeberSven";
import Philosophie from "@/components/Philosophie";
import KontaktCTA from "@/components/KontaktCTA";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />

      <main>
        {/* Hero — full width, concrete texture visible */}
        <Hero />
        <TrustBar />

        {/* Gap between hero and first card — concrete shows here */}
        <div className="h-16 lg:h-20" aria-hidden="true" />

        {/* Section cards stack with 8px gap between — concrete peeks through */}
        <div className="flex flex-col gap-2 pb-16">
          <Leistungen />
          <UeberSven />
          <Philosophie />
          <KontaktCTA />
        </div>
      </main>
    </>
  );
}
