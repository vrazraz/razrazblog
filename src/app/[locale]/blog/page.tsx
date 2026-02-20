"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { AnimatedCard } from "@/components/AnimatedCard";
import { motion } from "framer-motion";
import { FileText, Newspaper, Search } from "lucide-react";

const placeholderPosts = [
  { id: "1", type: "post", slug: "first-post", title: "Первый пост", excerpt: "Пример короткого поста в стиле Telegram.", date: "2026-02-20", tags: ["мысли"] },
  { id: "2", type: "article", slug: "design-and-ai", title: "Дизайн и AI: как нейросети меняют продуктовый дизайн", excerpt: "Развёрнутая статья о том, как AI-инструменты трансформируют рабочие процессы дизайнеров.", date: "2026-02-18", tags: ["AI", "дизайн"] },
  { id: "3", type: "post", slug: "tool-discovery", title: "Нашёл крутой инструмент", excerpt: "Краткий обзор нового AI-инструмента для прототипирования.", date: "2026-02-15", tags: ["инструменты"] },
  { id: "4", type: "article", slug: "ux-research-guide", title: "Гайд по UX-исследованиям в 2026", excerpt: "Практическое руководство по проведению UX-исследований с использованием AI-инструментов.", date: "2026-02-10", tags: ["UX", "гайд"] },
  { id: "5", type: "post", slug: "design-systems", title: "О дизайн-системах", excerpt: "Мысли о том, как правильно строить дизайн-систему.", date: "2026-02-08", tags: ["дизайн-системы"] },
];

type Filter = "all" | "post" | "article";

export default function BlogPage() {
  const t = useTranslations("blog");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? placeholderPosts
    : placeholderPosts.filter((p) => p.type === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("all") },
    { key: "post", label: t("posts") },
    { key: "article", label: t("articles") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl md:text-5xl mb-8">{t("title")}</h1>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-10">
        {filters.map(({ key, label }) => (
          <motion.button
            key={key}
            onClick={() => setFilter(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg text-sm transition-colors border"
            style={{
              backgroundColor: filter === key ? "var(--color-accent)" : "transparent",
              color: filter === key ? "white" : "var(--text-secondary)",
              borderColor: filter === key ? "var(--color-accent)" : "var(--border-color)",
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((post, i) => (
          <AnimatedCard key={post.id} delay={i * 0.05}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="flex items-start gap-4">
                <div
                  className="mt-1 p-2 rounded-lg shrink-0"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                    color: "var(--color-accent)",
                  }}
                >
                  {post.type === "article" ? <FileText size={18} /> : <Newspaper size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
                    >
                      {post.type === "article" ? "Статья" : "Пост"}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{post.date}</span>
                  </div>
                  <h3 className="font-heading text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedCard>
        ))}

        {filtered.length === 0 && (
          <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            {t("noPosts")}
          </p>
        )}
      </div>
    </div>
  );
}
