"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@makinoworks.com",
    href: "mailto:contact@makinoworks.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Taipei, Taiwan",
    href: null,
  },
];

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
          <p className="body-lg" style={{ maxWidth: "44ch", textAlign: "justify" }}>
            從 2010 年成立 MakinoWorks 以來，持續探索空間設計、平面設計、動態影像與網站設計等多元領域。
            相信設計不只是視覺的呈現，更是解決問題與傳達理念的方式。
          </p>
        </motion.div>

        {/* Right — Info + Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: "var(--sp-24)",
          }}
        >
          {contactInfo.map((item, index) => (
            <div 
              key={item.label} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "var(--sp-1)",
                marginTop: index > 0 ? "var(--sp-4)" : undefined,
              }}
            >
              <div className="label" style={{ color: "var(--accent)" }}>
                {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {item.value}
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    color: "var(--muted)",
                  }}
                >
                  {item.value}
                </span>
              )}
            </div>
          ))}

          {/* Social links */}
          <div style={{ marginTop: "var(--sp-4)" }}>
            <div className="label" style={{ color: "var(--accent)", marginBottom: "var(--sp-3)" }}>
              Social
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
              {profile.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "var(--sp-3)",
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em", minWidth: "6rem" }}>
                    {social.platform}
                  </span>
                  <span style={{ opacity: 0.4 }}>→</span>
                </a>
              ))}
            </div>
          </div>
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
