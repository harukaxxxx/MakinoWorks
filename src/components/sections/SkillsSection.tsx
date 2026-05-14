"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { skills } from "@/data/skills";
import { SkillBar } from "@/components/ui/SkillBar";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 mb-4">
            <Trophy className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Ability</h2>
          <p className="mt-2 text-muted">技能與專長</p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}