"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Work } from "@/lib/types";

interface WorkCardProps {
  work: Work;
  index?: number;
  onZoom?: (work: Work) => void;
}

export function WorkCard({ work, index = 0, onZoom }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        position: "relative",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--bg-secondary)",
      }}
      onClick={() => onZoom?.(work)}
    >
      <Image
        src={work.thumbnail}
        alt={work.title}
        fill
        style={{
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onMouseOver={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          (e.target as HTMLElement).style.transform = "scale(1)";
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 40%, rgba(12,11,9,0.85) 100%)",
          opacity: 0,
          transition: "opacity 0.35s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "var(--sp-5)",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0";
        }}
      >
        <div
          className="label"
          style={{ color: "var(--accent)", marginBottom: "var(--sp-1)" }}
        >
          {work.category}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 400,
            color: "#f0ece4",
            lineHeight: 1.2,
          }}
        >
          {work.title}
        </h3>
        <Link
          href={`/works/${work.slug}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: "var(--sp-4)",
            right: "var(--sp-4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            border: "1px solid rgba(240,236,228,0.4)",
            color: "#f0ece4",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgba(240,236,228,0.4)";
            e.currentTarget.style.color = "#f0ece4";
          }}
        >
          <ArrowUpRight style={{ width: "0.875rem", height: "0.875rem" }} />
        </Link>
      </div>

      {/* Category badge — always visible */}
      <div
        className="label"
        style={{
          position: "absolute",
          top: "var(--sp-3)",
          left: "var(--sp-3)",
          padding: "0.25rem 0.5rem",
          background: "rgba(12,11,9,0.6)",
          backdropFilter: "blur(8px)",
          color: "#f0ece4",
        }}
      >
        {work.category}
      </div>
    </motion.div>
  );
}