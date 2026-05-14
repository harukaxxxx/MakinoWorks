"use client";

import { motion } from "framer-motion";
import { ExternalLink, Hammer } from "lucide-react";
import { tools } from "@/data/tools";

const categoryColors: Record<string, string> = {
  Design: "bg-blue-500/10 text-blue-500",
  Motion: "bg-purple-500/10 text-purple-500",
  "3D": "bg-emerald-500/10 text-emerald-500",
  Drawing: "bg-pink-500/10 text-pink-500",
  Code: "bg-orange-500/10 text-orange-500",
};

export function ToolsSection() {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 mb-4">
            <Hammer className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Tools</h2>
          <p className="mt-2 text-muted">使用的軟體與工具</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {tools.map((tool, index) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary-500/50 transition-colors bg-background"
            >
              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[tool.category || "Design"]}`}>
                {tool.category}
              </span>
              <span className="font-medium text-sm">{tool.name}</span>
              <ExternalLink className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}