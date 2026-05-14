"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";

interface SkillBarProps {
  skill: Skill;
  index?: number;
}

export function SkillBar({ skill, index = 0 }: SkillBarProps) {
  const { name, level, maxLevel } = skill;
  const percentage = (level / maxLevel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-muted text-sm">
          {level}/{maxLevel}
        </span>
      </div>
      <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
          className="h-full bg-primary-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}