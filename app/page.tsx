import Nav          from "@/components/Nav";
import Ticker        from "@/components/Ticker";
import Hero          from "@/components/Hero";
import Statement     from "@/components/Statement";
import UseCases      from "@/components/UseCases";
import Tech          from "@/components/Tech";
import Updates       from "@/components/Updates";
import FAQ           from "@/components/FAQ";
import Footer        from "@/components/Footer";
import ScrollReveal  from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Ticker />
      <main>
        <Hero />

        <ScrollReveal>
          <Statement />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <UseCases />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <Tech />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <Updates />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <FAQ />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
