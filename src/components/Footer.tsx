"use client";

import { motion } from "framer-motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-8 mt-20"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {year}
        </p>
        <div className="flex items-center gap-4">
          {[
            { href: "https://t.me/nafanyah", label: "Telegram" },
            { href: "https://linkedin.com", label: "LinkedIn" },
            { href: "https://github.com", label: "GitHub" },
          ].map(({ href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-[var(--color-accent)]"
              style={{ color: "var(--text-muted)" }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
