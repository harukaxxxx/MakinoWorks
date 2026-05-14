"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Work } from "@/lib/types";

interface LightboxProps {
  work: Work | null;
  works: Work[];
  onClose: () => void;
  onNavigate: (work: Work) => void;
}

export function Lightbox({ work, works, onClose, onNavigate }: LightboxProps) {
  const currentIndex = work ? works.findIndex((w) => w.id === work.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(works[currentIndex - 1]);
    } else {
      onNavigate(works[works.length - 1]);
    }
  }, [currentIndex, works, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < works.length - 1) {
      onNavigate(works[currentIndex + 1]);
    } else {
      onNavigate(works[0]);
    }
  }, [currentIndex, works, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!work) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [work, onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (work) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [work]);

  if (!work) return null;

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <motion.div
            key={work.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </motion.div>

          {/* Info */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <h3 className="text-lg font-semibold">{work.title}</h3>
            <p className="text-sm text-white/60">
              {currentIndex + 1} / {works.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}