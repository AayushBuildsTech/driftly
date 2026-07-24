import { CallbackProvider } from "@/components/CallbackProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DestinationGrid } from "@/components/DestinationGrid";
import { ValueProps } from "@/components/ValueProps";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <CallbackProvider>
      {/* Safe padding so the mobile sticky bar never overlaps content */}
      <div id="top" className="pb-[72px] md:pb-0">
        <Header />
        <main>
          <Hero />
          <DestinationGrid />
          <ValueProps />
          <HowItWorks />
        </main>
        <Footer />
      </div>
      <MobileStickyBar />
    </CallbackProvider>
  );
}
