"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, Linkedin, Github } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socials = [
  { icon: Send, href: "https://t.me/nafanyah", label: "Telegram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="py-20 md:py-32"
    >
      <motion.p
        variants={item}
        className="text-lg mb-2"
        style={{ color: "var(--color-accent)" }}
      >
        {t("greeting")}
      </motion.p>

      <motion.h1
        variants={item}
        className="font-heading text-5xl md:text-7xl tracking-tight mb-6"
      >
        Виталий
      </motion.h1>

      <motion.p
        variants={item}
        className="text-xl md:text-2xl font-heading mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        {t("role")}
      </motion.p>

      <motion.p
        variants={item}
        className="text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {t("bio")}
      </motion.p>

      <motion.div variants={item} className="flex items-center gap-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            <Icon size={16} />
            {label}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
