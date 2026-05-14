"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@makinoworks.com",
    href: "mailto:contact@makinoworks.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Taipei, Taiwan",
    href: null,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto" />
          <p className="mt-4 text-muted">Get in touch for collaborations or inquiries</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href || undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`group p-6 bg-background rounded-xl border border-border hover:border-primary-500/50 transition-colors ${
                item.href ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-muted">{item.label}</h3>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
                {item.href && (
                  <ExternalLink className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-sm font-medium text-muted mb-4">Or find me on social media</h3>
          <div className="flex justify-center gap-4">
            {profile.socials.slice(0, 4).map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-background border border-border hover:border-primary-500 hover:text-primary-500 transition-colors text-sm"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}