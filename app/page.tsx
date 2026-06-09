import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Leistungen from "@/components/Leistungen";
import UeberSven from "@/components/UeberSven";
import Philosophie from "@/components/Philosophie";
import KontaktCTA from "@/components/KontaktCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />

        {/* Gap — concrete shows between hero and sections */}
        <div className="h-16 lg:h-20" aria-hidden="true" />

        {/* Sections — side margins, no overflow-hidden so slide-in animations aren't clipped */}
        <div className="mx-3 md:mx-5 lg:mx-9">
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
