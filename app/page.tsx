import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
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
        <Hero />

        {/* Gap — concrete shows between hero and sections */}
        <div className="h-16 lg:h-20" aria-hidden="true" />

        {/* Sections wrapper — side margins let concrete show, connected internally */}
        <div className="mx-3 md:mx-5 lg:mx-9 pb-16">
          <div className="overflow-hidden rounded-[20px] shadow-[0_4px_40px_rgba(0,0,0,0.10)]">
            <Leistungen />
            <UeberSven />
            <Philosophie />
            <KontaktCTA />
          </div>
        </div>
      </main>
    </>
  );
}
