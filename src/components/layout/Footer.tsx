import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "var(--sp-6) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap" as const,
          gap: "var(--sp-4)",
        }}
      >
        <Link
          href="/"
          className="footer-brand"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 300,
            letterSpacing: "0.04em",
            textDecoration: "none",
            color: "var(--fg)",
          }}
        >
          Makino<span style={{ color: "var(--accent)" }}>Works</span>
        </Link>

        <p className="label">
          &copy; 2010 MakinoWorks. All rights reserved.
        </p>

        <p className="label">間 — The Art of Space</p>
      </div>

      <style>{`
        .footer-brand:hover { color: var(--accent) !important; }
        .footer-link:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
}
