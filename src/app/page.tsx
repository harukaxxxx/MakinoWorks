import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection />
      </main>
    </div>
  );
}