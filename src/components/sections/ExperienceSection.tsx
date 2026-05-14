"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function ExperienceSection() {
  return (
    <section id="resume" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            從 2006 年至今的設計與創作歷程
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}