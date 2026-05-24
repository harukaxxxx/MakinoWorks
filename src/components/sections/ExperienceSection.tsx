"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { education } from "@/data/education";
import { career } from "@/data/career";
import { TimelineSection } from "./TimelineSection";

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  const tabs = [
    { key: "work" as const, label: "工作", en: "Work" },
    { key: "education" as const, label: "學歷", en: "Education" },
  ];

  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      {/* Header with Tabs */}
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
          Experience
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-8)", flexWrap: "wrap" }}>
          <h2 className="heading-1">
            經歷<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <div style={{ display: "flex", gap: "var(--sp-6)" }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === tab.key
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  color:
                    activeTab === tab.key ? "var(--fg)" : "var(--muted)",
                  cursor: "pointer",
                  padding: "var(--sp-2) 0",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  letterSpacing: "0.05em",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.color = "var(--muted)";
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        {activeTab === "work" ? (
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TimelineSection
              data={career}
              accentFirst
              showHeader={false}
            />
          </motion.div>
        ) : (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <TimelineSection
              data={education}
              showHeader={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
