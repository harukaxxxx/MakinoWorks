"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { tools } from "@/data/tools";

const categoryStyles: Record<string, { border: string; text: string }> = {
  Design: { border: "var(--accent)", text: "var(--accent)" },
  Motion: { border: "#9b7bc4", text: "#9b7bc4" },
  "3D": { border: "#7bb4a4", text: "#7bb4a4" },
  Drawing: { border: "#c47b94", text: "#c47b94" },
  Code: { border: "#7b94c4", text: "#7b94c4" },
};

export function ToolsSection() {
  return (
    <section
      style={{
        padding: "var(--sp-24) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        borderTop: "1px solid var(--border)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "var(--sp-10)" }}
      >
        <div
          className="label"
          style={{ color: "var(--accent)", marginBottom: "var(--sp-4)" }}
        >
          Tools
        </div>
        <h3
          className="heading-3"
          style={{ color: "var(--fg)", fontWeight: 400 }}
        >
          使用的軟體與工具
        </h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--sp-2)",
        }}
      >
        {tools.map((tool, index) => {
          const style = categoryStyles[tool.category || "Design"] || categoryStyles.Design;
          return (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
              }}
              whileHover={{ y: -2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                border: `1px solid var(--border)`,
                textDecoration: "none",
                background: "transparent",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = style.border;
                e.currentTarget.style.color = style.text;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--fg-secondary)";
              }}
            >
              <span
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: style.text,
                }}
              >
                {tool.category}
              </span>
              <span style={{ fontSize: "0.875rem", color: "var(--fg)" }}>
                {tool.name}
              </span>
              <ExternalLink
                style={{
                  width: "0.625rem",
                  height: "0.625rem",
                  opacity: 0.4,
                }}
              />
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}