import { SkillsSection } from "@/components/sections/SkillsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";

export default function SkillsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col justify-center">
        <SkillsSection />
        <ToolsSection />
      </main>
    </div>
  );
}