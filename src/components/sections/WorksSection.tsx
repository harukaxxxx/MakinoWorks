"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { works } from "@/data/works";
import { WorkCard } from "@/components/ui/WorkCard";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Work } from "@/lib/types";

const categories = ["all", "design", "motion", "architecture"];

export function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxWork, setLightboxWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(() => {
    if (selectedCategory === "all") return works;
    return works.filter((work) => work.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <section
        style={{
          padding: "var(--sp-32) 0",
          position: "relative",
        }}
      >
        {/* Section header */}
        <div
          style={{
            maxWidth: "var(--content-max)",
            padding: "0 var(--content-padding)",
            marginBottom: "var(--sp-12)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="label"
              style={{ color: "var(--accent)", marginBottom: "var(--sp-4)" }}
            >
              Selected Works
            </div>
            <h2 className="heading-1">
              作品<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              gap: "var(--sp-3)",
              marginTop: "var(--sp-8)",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="label"
                style={{
                  padding: "var(--sp-2) var(--sp-4)",
                  border: `1px solid ${
                    selectedCategory === category
                      ? "var(--accent)"
                      : "var(--border)"
                  }`,
                  background:
                    selectedCategory === category
                      ? "var(--accent)"
                      : "transparent",
                  color:
                    selectedCategory === category
                      ? "var(--bg)"
                      : "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }
                }}
              >
                {category === "all"
                  ? "全部"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Works grid */}
        <div
          style={{
            maxWidth: "var(--content-max)",
            padding: "0 var(--content-padding)",
          }}
        >
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "var(--sp-4)",
            }}
          >
            {filteredWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                index={index}
                onZoom={setLightboxWork}
              />
            ))}
          </motion.div>

          {filteredWorks.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "var(--sp-20) 0",
                color: "var(--muted)",
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
              }}
            >
              此分類暫無作品
            </div>
          )}
        </div>
      </section>

      <Lightbox
        work={lightboxWork}
        works={filteredWorks}
        onClose={() => setLightboxWork(null)}
        onNavigate={setLightboxWork}
      />
    </>
  );
}