import Nav              from "@/components/Nav";
import Ticker           from "@/components/Ticker";
import Hero             from "@/components/Hero";
import Statement        from "@/components/Statement";
import UseCases         from "@/components/UseCases";
import Tech             from "@/components/Tech";
import ExplorerPreview  from "@/components/ExplorerPreview";
import Ecosystem        from "@/components/Ecosystem";
import Updates          from "@/components/Updates";
import FAQ              from "@/components/FAQ";
import Footer           from "@/components/Footer";
import ScrollReveal     from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        {/* Hero — always visible, no reveal */}
        <Hero />

        {/* Statement — THE PROBLEM + WRAP/TRANSACT/UNWRAP */}
        <ScrollReveal>
          <Statement />
        </ScrollReveal>

        {/* Use Cases */}
        <ScrollReveal delay={60}>
          <UseCases />
        </ScrollReveal>

        {/* Technology stack */}
        <ScrollReveal delay={60}>
          <Tech />
        </ScrollReveal>

        {/* Block explorer preview */}
        <ScrollReveal delay={60}>
          <ExplorerPreview />
        </ScrollReveal>

        {/* Ecosystem */}
        <ScrollReveal delay={60}>
          <Ecosystem />
        </ScrollReveal>

        {/* Updates / blog */}
        <ScrollReveal delay={60}>
          <Updates />
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={60}>
          <FAQ />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
