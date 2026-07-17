import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-background">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
