import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "var(--sp-12) var(--content-padding) var(--sp-8)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      {/* Top section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sp-8)",
          paddingBottom: "var(--sp-8)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap" as const,
            gap: "var(--sp-8)",
          }}
        >
          <div>
            <Link
              href="/"
              className="footer-brand"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                fontWeight: 300,
                letterSpacing: "0.04em",
                textDecoration: "none",
                color: "var(--fg)",
                display: "block",
                marginBottom: "var(--sp-3)",
              }}
            >
              Makino<span style={{ color: "var(--accent)" }}>Works</span>
            </Link>
            <p
              className="label"
              style={{ lineHeight: 1.6 }}
            >
              Creative Design Portfolio
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--sp-10)",
              flexWrap: "wrap" as const,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
              <span className="label" style={{ marginBottom: "var(--sp-2)" }}>
                Navigation
              </span>
              {[
                { label: "Experience", href: "/experience" },
                { label: "Skills", href: "/skills" },
                { label: "Works", href: "/works" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                  style={{
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
              <span className="label" style={{ marginBottom: "var(--sp-2)" }}>
                Connect
              </span>
              {profile.socials.slice(0, 5).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={{
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                  }}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "var(--sp-6)",
          flexWrap: "wrap" as const,
          gap: "var(--sp-2)",
        }}
      >
        <p className="label">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="label">間 — The Art of Space</p>
      </div>

      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
        .footer-brand:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
}