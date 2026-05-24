"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";

interface SkillBarProps {
  skill: Skill;
  index?: number;
}

export function SkillBar({ skill: { name, level, maxLevel }, index = 0 }: SkillBarProps) {
  const percentage = (level / maxLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "var(--sp-2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "var(--fg)",
          }}
        >
          {name}
        </span>
        <span className="label" style={{ color: "var(--accent)" }}>
          {level}/{maxLevel}
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: "var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            height: "100%",
            background: "var(--accent)",
          }}
        />
      </div>
    </motion.div>
  );
}