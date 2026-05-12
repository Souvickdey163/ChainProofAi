import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { UploadBox } from "@/components/upload/UploadBox";
import { CyberBackground } from "@/components/ui/CyberBackground";

export default function UploadPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <CyberBackground />
      <Navbar />
      <section className="relative mx-auto flex max-w-7xl gap-8 px-6 pb-16 pt-28">
        <Sidebar />
        <div className="flex-1">
          <UploadBox />
        </div>
      </section>
      <Footer />
    </main>
  );
}
