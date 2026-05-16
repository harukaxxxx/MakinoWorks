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

export function ContactSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-16)",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left — CTA */}
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
            Contact
          </div>
          <h2 className="heading-1">
            Let&apos;s Create
            <br />
            <span style={{ color: "var(--accent)" }}>Together</span>
          </h2>
          <div
            style={{
              width: "4rem",
              height: "1px",
              background: "var(--accent)",
              margin: "var(--sp-8) 0",
            }}
          />
          <p className="body-lg" style={{ maxWidth: "40ch" }}>
            無論是空間設計、平面設計、動態影像還是網站設計的合作需求，
            歡迎隨時聯繫。
          </p>
        </motion.div>

        {/* Right — Info + Socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-8)",
            paddingTop: "var(--sp-8)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {contactInfo.map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "var(--sp-1)" }}>
              <div className="label" style={{ color: "var(--accent)" }}>
                {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.125rem",
                    color: "var(--fg)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg)")}
                >
                  {item.value}
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.125rem",
                    color: "var(--fg)",
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
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}