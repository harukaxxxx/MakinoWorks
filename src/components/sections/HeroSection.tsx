"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Image as ImageIcon,
  Video,
  Palette,
  ArrowDown,
} from "lucide-react";
import { profile } from "@/data/profile";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  image: ImageIcon,
  video: Video,
  palette: Palette,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* Atmospheric background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, var(--accent) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, var(--bg-tertiary) 0%, transparent 40%)",
          opacity: 0.15,
        }}
      />

      {/* Decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{
          position: "absolute",
          left: "var(--content-padding)",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background: "var(--border)",
          transformOrigin: "top",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "var(--content-max)",
          padding: "var(--sp-32) var(--content-padding)",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-16)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — Typography powerhouse */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-8)" }}>
          {/* Overline */}
          <motion.div variants={staggerItem} className="label" style={{ color: "var(--accent)" }}>
            Creative Designer
          </motion.div>

          {/* Name — the architectural element */}
          <motion.div variants={staggerItem}>
            <h1 className="heading-display" style={{ color: "var(--fg)" }}>
              牧野
              <br />
              <span style={{ color: "var(--accent)" }}>春香</span>
            </h1>
          </motion.div>

          {/* Japanese subtitle */}
          <motion.p
            variants={staggerItem}
            className="body-lg"
            style={{
              maxWidth: "32ch",
              lineHeight: 1.85,
            }}
          >
            {profile.bio}
          </motion.p>

          {/* Social row */}
          <motion.div
            variants={staggerItem}
            style={{
              display: "flex",
              gap: "var(--sp-4)",
              flexWrap: "wrap",
            }}
          >
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon] || ImageIcon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={staggerItem}
            style={{
              display: "flex",
              gap: "var(--sp-4)",
              flexWrap: "wrap",
              marginTop: "var(--sp-2)",
            }}
          >
            <Link
              href="/works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--sp-2)",
                padding: "var(--sp-3) var(--sp-6)",
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                border: "1px solid var(--accent)",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
              }}
            >
              View Works
              <ArrowDown
                style={{ width: "0.875rem", height: "0.875rem", transform: "rotate(-45deg)" }}
              />
            </Link>
            <Link
              href="/experience"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--sp-2)",
                padding: "var(--sp-3) var(--sp-6)",
                backgroundColor: "transparent",
                color: "var(--fg)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                textDecoration: "none",
                border: "1px solid var(--border)",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--fg)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              Experience
            </Link>
          </motion.div>
        </div>

        {/* Right — Photo composition */}
        <motion.div
          variants={staggerItem}
          className="hero-photo-container"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Photo frame with offset border */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
              aspectRatio: "3/4",
            }}
          >
            {/* Decorative offset border */}
            <div
              style={{
                position: "absolute",
                inset: "0.75rem",
                border: "1px solid var(--border)",
                pointerEvents: "none",
                transform: "translate(8px, -8px)",
                zIndex: 0,
              }}
            />

            {/* The photo */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                style={{
                  objectFit: "cover",
                  filter: "saturate(0.85) contrast(1.05)",
                }}
                priority
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, var(--bg) 100%)",
                  opacity: 0.15,
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "var(--sp-8)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--sp-2)",
        }}
      >
        <span className="label" style={{ fontSize: "0.6rem" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "2rem",
            background: "var(--muted)",
          }}
        />
      </motion.div>

      {/* Responsive overrides */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding-top: 8rem !important;
          }
          .hero-photo-container {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}