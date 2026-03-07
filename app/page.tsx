import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import UseCases from "@/components/UseCases";
import Tech from "@/components/Tech";
import ExplorerPreview from "@/components/ExplorerPreview";
import Updates from "@/components/Updates";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        <Hero />
        <Statement />
        <UseCases />
        <Tech />
        <ExplorerPreview />
        <Updates />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
