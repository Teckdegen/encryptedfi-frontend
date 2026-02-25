import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import UseCases from "@/components/UseCases";
import Tech from "@/components/Tech";
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
      </main>
      <Footer />
    </>
  );
}
