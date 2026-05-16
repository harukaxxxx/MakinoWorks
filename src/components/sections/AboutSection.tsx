"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function AboutSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Decorative number */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="label"
        style={{
          color: "var(--accent)",
          marginBottom: "var(--sp-8)",
          display: "block",
        }}
      >
        About
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-16)",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left — Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="heading-1" style={{ marginBottom: "var(--sp-6)" }}>
            Design is
            <br />
            <span style={{ color: "var(--accent)" }}>Problem Solving</span>
          </h2>
          <div
            style={{
              width: "4rem",
              height: "1px",
              background: "var(--accent)",
              marginBottom: "var(--sp-6)",
            }}
          />
          <p className="body-lg" style={{ maxWidth: "42ch" }}>
            從 2010 年成立 MakinoWorks 以來，持續探索空間設計、平面設計、動態影像與網站設計等多元領域。
            相信設計不只是視覺的呈現，更是解決問題與傳達理念的方式。
          </p>
        </motion.div>

        {/* Right — Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--sp-10)",
            paddingTop: "var(--sp-8)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { number: "10+", label: "Years of\nExperience" },
            { number: "50+", label: "Projects\nCompleted" },
            { number: "7", label: "Disciplines\nMastered" },
            { number: "∞", label: "Creative\nPassion" },
          ].map((stat) => (
            <div key={stat.label} style={{ marginBottom: "var(--sp-4)" }}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--fg)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.number}
              </div>
              <div
                className="label"
                style={{
                  marginTop: "var(--sp-2)",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}