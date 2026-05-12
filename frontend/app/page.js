import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { Features } from "@/components/landing/Features";
import { BlockchainVisual } from "@/components/landing/BlockchainVisual";
import { CTASection } from "@/components/landing/CTASection";
import { CyberBackground } from "@/components/ui/CyberBackground";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <CyberBackground />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <Features />
      <BlockchainVisual />
      <CTASection />
      <Footer />
    </main>
  );
}
