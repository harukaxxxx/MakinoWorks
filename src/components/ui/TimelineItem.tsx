"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Experience } from "@/lib/types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:items-center`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block">
        <div className="w-4 h-4 rounded-full bg-primary-500 border-4 border-background shadow-lg" />
      </div>

      {/* Content */}
      <div className={`flex-1 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} w-full`}>
        <div className={`inline-block text-left ${isEven ? "md:text-right" : ""}`}>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-3">
            {experience.period}
          </span>
          <h3 className="text-xl font-bold text-foreground">
            {experience.title}
            {experience.organization && (
              <span className="text-muted font-normal">
                {" "}
                / {experience.organization}
              </span>
            )}
          </h3>
          <p className="mt-2 text-muted leading-relaxed">
            {experience.description}
          </p>
          {experience.image && (
            <div className="mt-4 inline-block">
              <Image
                src={experience.image}
                alt={experience.title}
                width={300}
                height={150}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />

      {/* Mobile timeline line */}
      {!isLast && (
        <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-border md:hidden" />
      )}
    </motion.div>
  );
}