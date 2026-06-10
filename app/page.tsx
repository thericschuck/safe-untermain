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

export default function Home() {
  return (
    <>
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
