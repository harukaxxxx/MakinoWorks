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
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(12, 11, 9, 0.92)",
            backdropFilter: "blur(20px)",
          }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "1px solid rgba(240,236,228,0.3)",
              color: "rgba(240,236,228,0.8)",
              padding: "0.5rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
            aria-label="Close"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,236,228,0.3)";
              e.currentTarget.style.color = "rgba(240,236,228,0.8)";
            }}
          >
            <X style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>

          {/* Nav */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{
              position: "absolute",
              left: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid rgba(240,236,228,0.3)",
              color: "rgba(240,236,228,0.8)",
              padding: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
            aria-label="Previous"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,236,228,0.3)";
              e.currentTarget.style.color = "rgba(240,236,228,0.8)";
            }}
          >
            <ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{
              position: "absolute",
              right: "1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid rgba(240,236,228,0.3)",
              color: "rgba(240,236,228,0.8)",
              padding: "0.75rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              zIndex: 10,
            }}
            aria-label="Next"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(240,236,228,0.3)";
              e.currentTarget.style.color = "rgba(240,236,228,0.8)";
            }}
          >
            <ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>

          {/* Image */}
          <motion.div
            key={work.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxWidth: "80rem",
              maxHeight: "80vh",
              margin: "0 4rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </motion.div>

          {/* Info */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#f0ece4",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
                fontWeight: 400,
              }}
            >
              {work.title}
            </h3>
            <div
              className="label"
              style={{ marginTop: "0.25rem" }}
            >
              {currentIndex + 1} / {works.length}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}