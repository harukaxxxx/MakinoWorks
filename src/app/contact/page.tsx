import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <AboutSection />
      <div style={{ width: "100%", height: "1px", background: "var(--border)" }} />
      <ContactSection />
    </div>
  );
}