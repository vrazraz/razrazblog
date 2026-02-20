"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function CaseStudyPage() {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm mb-8 hover:text-[var(--color-accent)] transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={16} /> Назад к портфолио
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cover */}
        <div
          className="aspect-video rounded-2xl mb-10 flex items-center justify-center"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <p style={{ color: "var(--text-muted)" }}>Обложка проекта</p>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl mb-6">
          Проект: {slug}
        </h1>

        {/* Case study sections */}
        {["Проблема", "Исследование", "Решение", "Результат"].map(
          (section, i) => (
            <motion.section
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="mb-12"
            >
              <h2
                className="font-heading text-2xl mb-4 pb-2 border-b"
                style={{ borderColor: "var(--border-color)" }}
              >
                {section}
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Контент кейс-стади будет управляться через админку. Здесь будет
                подробное описание этапа «{section}» с изображениями,
                прототипами и результатами.
              </p>
            </motion.section>
          )
        )}
      </motion.article>
    </div>
  );
}
