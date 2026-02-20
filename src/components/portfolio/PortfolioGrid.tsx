"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AnimatedCard } from "@/components/AnimatedCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Sparkles, Palette } from "lucide-react";

const placeholderProjects = {
  ai: [
    {
      slug: "ai-assistant",
      title: "AI-ассистент Кузьма",
      description: "Персональный AI-ассистент на базе OpenClaw с голосовым управлением и автоматизацией.",
      cover: null,
    },
    {
      slug: "image-gen-pipeline",
      title: "Pipeline генерации изображений",
      description: "Локальный пайплайн для генерации изображений на базе Flux + ComfyUI.",
      cover: null,
    },
  ],
  design: [
    {
      slug: "fintech-app",
      title: "Fintech App Redesign",
      description: "Редизайн мобильного приложения для управления финансами. UX-исследование, прототипирование, UI.",
      cover: null,
    },
    {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      description: "Дизайн-система и дашборд для B2B SaaS продукта. От wireframes до production.",
      cover: null,
    },
    {
      slug: "ecommerce",
      title: "E-commerce Platform",
      description: "Полный редизайн e-commerce платформы. Увеличение конверсии на 40%.",
      cover: null,
    },
  ],
};

export function PortfolioGrid() {
  const t = useTranslations("portfolio");

  return (
    <div className="space-y-16">
      {/* AI Projects */}
      <section>
        <SectionHeading>
          <span className="inline-flex items-center gap-3">
            <Sparkles size={28} className="text-[var(--color-accent)]" />
            {t("aiProjects")}
          </span>
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {placeholderProjects.ai.map((project, i) => (
            <AnimatedCard key={project.slug} delay={i * 0.1}>
              <Link href={`/portfolio/${project.slug}`} className="block group">
                {/* Cover placeholder */}
                <div
                  className="aspect-video rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <Sparkles size={32} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3 className="font-heading text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Design Projects */}
      <section>
        <SectionHeading>
          <span className="inline-flex items-center gap-3">
            <Palette size={28} className="text-[var(--color-accent)]" />
            {t("designProjects")}
          </span>
        </SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderProjects.design.map((project, i) => (
            <AnimatedCard key={project.slug} delay={i * 0.1}>
              <Link href={`/portfolio/${project.slug}`} className="block group">
                <div
                  className="aspect-video rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <Palette size={32} style={{ color: "var(--text-muted)" }} />
                </div>
                <h3 className="font-heading text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </section>
    </div>
  );
}
