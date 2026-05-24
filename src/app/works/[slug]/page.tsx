import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { works } from "@/data/works";
import type { Metadata } from "next";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return { title: "Work Not Found" };
  }

  return {
    title: `${work.title} — MakinoWorks`,
    description: work.description,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed" as const,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
        className="work-header"
      >
        <div
          style={{
            maxWidth: "var(--content-max)",
            padding: "0 var(--content-padding)",
            margin: "0 auto",
            height: "var(--nav-height)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/works"
            className="hover-accent"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            <ArrowLeft style={{ width: "0.875rem", height: "0.875rem" }} />
            Back
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              fontWeight: 300,
              letterSpacing: "0.04em",
              textDecoration: "none",
              color: "var(--fg)",
            }}
          >
            Makino<span style={{ color: "var(--accent)" }}>Works</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "calc(var(--nav-height) + var(--sp-16)) var(--content-padding) var(--sp-20)",
        }}
      >
        {/* Title section */}
        <div style={{ marginBottom: "var(--sp-10)" }}>
          <div
            className="label"
            style={{ color: "var(--accent)", marginBottom: "var(--sp-3)" }}
          >
            {work.category}
          </div>
          <h1
            className="heading-display"
            style={{
              color: "var(--fg)",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 0.95,
            }}
          >
            {work.title}
          </h1>
          {work.year && (
            <div
              className="label"
              style={{ marginTop: "var(--sp-4)", color: "var(--muted)" }}
            >
              {work.year}
            </div>
          )}
        </div>

        {/* Main image */}
        <div
          style={{
            position: "relative" as const,
            aspectRatio: "16/9",
            overflow: "hidden",
            border: "1px solid var(--border)",
            marginBottom: "var(--sp-10)",
          }}
        >
          <Image
            src={work.image}
            alt={work.title}
            fill
            style={{
              objectFit: "cover",
              filter: "saturate(0.85) contrast(1.05)",
            }}
            sizes="(max-width: 1400px) 100vw, 1400px"
            priority
          />
        </div>

        {/* Description */}
        <div style={{ maxWidth: "64ch" }}>
          <p
            className="body-lg"
            style={{ lineHeight: 1.85 }}
          >
            {work.description}
          </p>
        </div>

        {/* External link */}
        {work.url && (
          <div style={{ marginTop: "var(--sp-10)" }}>
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
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
            >
              查看專案 →
            </a>
          </div>
        )}
      </article>

      <style>{`
        .work-header {
          background: rgba(var(--bg-rgb, 250,246,239), 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--border);
        }
        .hover-accent:hover { color: var(--accent) !important; }
        .cta-button:hover {
          background-color: transparent !important;
          color: var(--accent) !important;
        }
      `}</style>
    </main>
  );
}