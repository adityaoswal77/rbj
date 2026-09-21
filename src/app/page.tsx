import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Collections } from "@/components/sections/Collections";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { MadeToOrder } from "@/components/sections/MadeToOrder";
import { VisitUs } from "@/components/sections/VisitUs";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Collections />
        <MadeToOrder />
        <About />
        <Instagram />
        <VisitUs />
      </main>
      <Footer />
    </>
  );
}
