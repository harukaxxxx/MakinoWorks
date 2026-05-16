import { SkillsSection } from "@/components/sections/SkillsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";

export default function SkillsPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <SkillsSection />
      <ToolsSection />
    </div>
  );
}