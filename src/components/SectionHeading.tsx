"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`font-heading text-3xl md:text-4xl mb-8 ${className}`}
    >
      {children}
    </motion.h2>
  );
}
