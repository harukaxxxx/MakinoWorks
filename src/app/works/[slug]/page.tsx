import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首頁
          </Link>
          <Link href="/" className="text-xl font-bold tracking-tight">
            Makino<span className="text-primary-500">Works</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title section */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-500 rounded-full mb-4">
              {work.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {work.title}
            </h1>
            {work.year && (
              <p className="text-muted">{work.year}</p>
            )}
          </div>

          {/* Main image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/10 mb-10">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted leading-relaxed">
              {work.description}
            </p>
          </div>

          {/* External link */}
          {work.url && (
            <div className="mt-10">
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
              >
                查看專案
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MakinoWorks. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}