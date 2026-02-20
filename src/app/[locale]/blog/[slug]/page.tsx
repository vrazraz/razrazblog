"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm mb-8 hover:text-[var(--color-accent)] transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={16} /> Назад к блогу
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            Статья
          </span>
          <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <Calendar size={12} /> 2026-02-20
          </span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl mb-6">
          {slug}
        </h1>

        <div className="flex gap-2 mb-10">
          {["AI", "дизайн"].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        {/* Article content placeholder */}
        <div
          className="prose prose-lg max-w-none space-y-6"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            Контент статьи будет загружаться из базы данных и управляться через
            админку. Поддерживается Markdown-разметка с изображениями, видео и
            интерактивными вставками.
          </p>
          <p>
            Короткие посты будут отображаться в более компактном формате,
            аналогичном Telegram-постам. Статьи — в полноценном лонгрид-формате
            с удобной навигацией.
          </p>
        </div>
      </motion.article>
    </div>
  );
}
