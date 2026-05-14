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
} from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  image: ImageIcon,
  video: Video,
  palette: Palette,
};

export function HeroSection() {
  return (
    <section
      id="profile"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30 dark:from-primary-950/20 dark:to-accent-950/10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="mt-2 text-xl md:text-2xl text-primary-600 dark:text-primary-400 font-medium">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-lg text-muted leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {profile.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {profile.socials.map((social) => {
                const Icon = iconMap[social.icon] || ImageIcon;
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted/10 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap justify-center md:justify-start gap-4"
            >
              <Button asChild size="lg">
                <Link href="#works">View Works</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#resume">My Experience</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}