"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Newspaper } from "lucide-react";

// Placeholder data — will be replaced with DB data
const placeholderPosts = [
  {
    id: "1",
    type: "post",
    slug: "first-post",
    title: "Первый пост",
    excerpt: "Это пример короткого поста в стиле Telegram. Мысли, наблюдения, быстрые заметки.",
    date: "2026-02-20",
    tags: ["мысли"],
  },
  {
    id: "2",
    type: "article",
    slug: "design-and-ai",
    title: "Дизайн и AI: как нейросети меняют продуктовый дизайн",
    excerpt: "Развёрнутая статья о том, как AI-инструменты трансформируют рабочие процессы дизайнеров и что нас ждёт дальше.",
    date: "2026-02-18",
    tags: ["AI", "дизайн"],
  },
  {
    id: "3",
    type: "post",
    slug: "tool-discovery",
    title: "Нашёл крутой инструмент",
    excerpt: "Краткий обзор нового AI-инструмента для прототипирования интерфейсов.",
    date: "2026-02-15",
    tags: ["инструменты"],
  },
];

export function LatestPosts() {
  const t = useTranslations("home");

  return (
    <section>
      <SectionHeading>{t("latestPosts")}</SectionHeading>

      <div className="space-y-4">
        {placeholderPosts.map((post, i) => (
          <AnimatedCard key={post.id} delay={i * 0.1}>
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {post.type === "article" ? "Статья" : "Пост"}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: "var(--text-muted)" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:gap-3"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-secondary)",
          }}
        >
          {t("allPosts")} <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
