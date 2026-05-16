"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import Image from "next/image";

export function ExperienceSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      {/* Header */}
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
        <h2 className="heading-1">
          經歷<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "var(--sp-5)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "var(--border)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-12)",
          }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                paddingLeft: "var(--sp-12)",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "calc(var(--sp-5) - 4px)",
                  top: "0.35rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background:
                    index === 0 ? "var(--accent)" : "var(--border-strong)",
                  border:
                    index === 0
                      ? "2px solid var(--accent)"
                      : "2px solid var(--bg)",
                  boxShadow:
                    index === 0
                      ? "0 0 0 4px rgba(196,162,101,0.2)"
                      : "none",
                }}
              />

              {/* Period */}
              <div
                className="label"
                style={{
                  color: "var(--accent)",
                  marginBottom: "var(--sp-1)",
                }}
              >
                {exp.period}
              </div>

              {/* Title & Org */}
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.375rem",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "var(--fg)",
                }}
              >
                {exp.title}
                {exp.organization && (
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 300,
                      marginLeft: "0.5rem",
                    }}
                  >
                    / {exp.organization}
                  </span>
                )}
              </h3>

              {/* Description */}
              <p
                className="body-lg"
                style={{
                  marginTop: "var(--sp-2)",
                  maxWidth: "60ch",
                }}
              >
                {exp.description}
              </p>

              {/* Image */}
              {exp.image && (
                <div
                  style={{
                    marginTop: "var(--sp-4)",
                    maxWidth: "320px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    width={320}
                    height={160}
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.8) contrast(1.05)",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}