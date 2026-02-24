import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import UseCases from "@/components/UseCases";
import Tech from "@/components/Tech";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
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
