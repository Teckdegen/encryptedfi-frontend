import Nav            from "@/components/Nav";
import Ticker         from "@/components/Ticker";
import Hero           from "@/components/Hero";
import ChainStrip     from "@/components/ChainStrip";
import Statement      from "@/components/Statement";
import UseCases       from "@/components/UseCases";
import Tech           from "@/components/Tech";
import CompareTable   from "@/components/CompareTable";
import ExplorerPreview from "@/components/ExplorerPreview";
import Updates        from "@/components/Updates";
import FAQ            from "@/components/FAQ";
import Footer         from "@/components/Footer";
import ScrollReveal   from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        {/* Hero — always visible, no reveal */}
        <Hero />

        {/* Chain logos strip — just below hero, no reveal (instant) */}
        <ChainStrip />

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

        {/* Competitor comparison */}
        <ScrollReveal delay={60}>
          <CompareTable />
        </ScrollReveal>

        {/* Block explorer preview */}
        <ScrollReveal delay={60}>
          <ExplorerPreview />
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
