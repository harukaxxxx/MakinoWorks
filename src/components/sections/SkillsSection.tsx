"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SkillBar } from "@/components/ui/SkillBar";

export function SkillsSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "var(--sp-16)" }}
      >
        <div
          className="label"
          style={{ color: "var(--accent)", marginBottom: "var(--sp-4)" }}
        >
          Ability
        </div>
        <h2 className="heading-1">
          技能<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
      </motion.div>

      <div
        style={{
          maxWidth: "720px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--sp-8)",
        }}
      >
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </section>
  );
}