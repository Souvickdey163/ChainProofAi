import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { CyberBackground } from "@/components/ui/CyberBackground";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <CyberBackground />
      <Navbar />
      <section className="relative mx-auto flex max-w-7xl gap-8 px-6 pb-16 pt-28">
        <Sidebar />
        <DashboardClient />
      </section>
      <Footer />
    </main>
  );
}
