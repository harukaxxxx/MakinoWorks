import { WorksSection } from "@/components/sections/WorksSection";

export default function WorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col justify-center">
        <WorksSection />
      </main>
    </div>
  );
}