"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(var(--background-rgb), ${v})`
        ),
        backdropFilter: useTransform(scrollY, [0, 100], [0, 8]),
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Makino<span className="text-primary-500">Works</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}