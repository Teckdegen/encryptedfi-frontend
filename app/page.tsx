import Nav          from "@/components/Nav";
import Hero          from "@/components/Hero";
import Statement     from "@/components/Statement";
import Tech          from "@/components/Tech";
import FAQ           from "@/components/FAQ";
import Footer        from "@/components/Footer";
import ScrollReveal  from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <ScrollReveal>
          <Statement />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <Tech />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <FAQ />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
