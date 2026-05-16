import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MakinoWorks. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/experience" className="text-sm text-muted hover:text-foreground transition-colors">
              Experience
            </Link>
            <Link href="/skills" className="text-sm text-muted hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="/works" className="text-sm text-muted hover:text-foreground transition-colors">
              Works
            </Link>
            <Link href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}