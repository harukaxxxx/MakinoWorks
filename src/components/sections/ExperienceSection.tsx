"use client";

import { education } from "@/data/education";
import { work } from "@/data/work";
import { TimelineSection } from "./TimelineSection";

export function ExperienceSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      {/* Education */}
      <TimelineSection
        label="Education"
        title="學歷"
        data={education}
      />

      {/* Dashed divider with spacing */}
      <div
        style={{
          borderTop: "1px dashed var(--border)",
          margin: "var(--sp-24) 0",
          paddingTop: "var(--sp-24)",
        }}
      />

      {/* Work Experience */}
      <TimelineSection
        label="Work Experience"
        title="工作經歷"
        data={work}
        accentFirst
      />
    </section>
  );
}
