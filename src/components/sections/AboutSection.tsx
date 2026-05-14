"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert mx-auto text-center"
        >
          <p className="text-muted leading-relaxed">
            {profile.bio}
          </p>
          <p className="text-muted leading-relaxed mt-4">
            從 2010 年成立 MakinoWorks 以來，持續探索空間設計、平面設計、動態影像與網站設計等多元領域。
            相信設計不只是視覺的呈現，更是解決問題與傳達理念的方式。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-8 text-muted">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">10+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm">Projects</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">20+</div>
              <div className="text-sm">Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}