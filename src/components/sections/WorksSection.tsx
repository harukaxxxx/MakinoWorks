"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { works } from "@/data/works";
import { WorkCard } from "@/components/ui/WorkCard";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Work } from "@/lib/types";

const categories = ["all", "design", "motion", "architecture"];

export function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxWork, setLightboxWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(() => {
    if (selectedCategory === "all") return works;
    return works.filter((work) => work.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <section id="works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/10 mb-4">
              <Briefcase className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Works</h2>
            <p className="mt-2 text-muted">作品集</p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-muted/10 text-muted hover:bg-muted/20 hover:text-foreground"
                }`}
              >
                {category === "all" ? "全部" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Works grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                index={index}
                onZoom={setLightboxWork}
              />
            ))}
          </motion.div>

          {filteredWorks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted">此分類暫無作品</p>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        work={lightboxWork}
        works={filteredWorks}
        onClose={() => setLightboxWork(null)}
        onNavigate={setLightboxWork}
      />
    </>
  );
}