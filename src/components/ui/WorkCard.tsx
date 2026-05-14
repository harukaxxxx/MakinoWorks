"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ZoomIn } from "lucide-react";
import type { Work } from "@/lib/types";

interface WorkCardProps {
  work: Work;
  index?: number;
  onZoom?: (work: Work) => void;
}

export function WorkCard({ work, index = 0, onZoom }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative aspect-square rounded-xl overflow-hidden bg-muted/10"
    >
      <Image
        src={work.thumbnail}
        alt={work.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-white font-semibold text-lg mb-3">{work.title}</h3>
          <div className="flex items-center justify-center gap-2">
            {onZoom && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onZoom(work);
                }}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                aria-label="Zoom"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            )}
            <Link
              href={`/works/${work.slug}`}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              aria-label="View details"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-full backdrop-blur-sm">
          {work.category}
        </span>
      </div>
    </motion.div>
  );
}