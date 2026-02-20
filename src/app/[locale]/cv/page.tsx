"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Download, Briefcase, GraduationCap, Wrench, Award, Mic } from "lucide-react";

const experience = [
  { period: "2024 — н.в.", role: "Senior Product Designer", company: "Tech Company", description: "Продуктовый дизайн, дизайн-система, AI-интеграции." },
  { period: "2022 — 2024", role: "Product Designer", company: "Startup", description: "Дизайн мобильного приложения от нуля до продакшна." },
  { period: "2020 — 2022", role: "UI/UX Designer", company: "Agency", description: "Дизайн веб-приложений для B2B клиентов." },
];

const skills = [
  { category: "Дизайн", items: ["Figma", "Prototyping", "Design Systems", "UX Research", "UI Design"] },
  { category: "AI & Tech", items: ["Prompt Engineering", "ComfyUI", "Python", "Next.js", "TypeScript"] },
  { category: "Soft Skills", items: ["Product Thinking", "Communication", "Mentoring", "Stakeholder Management"] },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function CVPage() {
  const t = useTranslations("cv");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-heading text-4xl md:text-5xl">{t("title")}</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <Download size={16} /> {t("download")}
        </motion.button>
      </div>

      {/* Experience */}
      <section className="mb-16">
        <SectionHeading>
          <span className="inline-flex items-center gap-3">
            <Briefcase size={28} className="text-[var(--color-accent)]" />
            {t("experience")}
          </span>
        </SectionHeading>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5" style={{ backgroundColor: "var(--border-color)" }} />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div key={i} variants={item} className="flex gap-6">
                <div className="relative z-10 mt-1.5 w-[10px] h-[10px] rounded-full shrink-0 ring-4" style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 0 4px var(--bg-primary)" }} />
                <div>
                  <p className="text-xs mb-1" style={{ color: "var(--color-accent)" }}>{exp.period}</p>
                  <h3 className="font-heading text-lg">{exp.role}</h3>
                  <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{exp.company}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <SectionHeading>
          <span className="inline-flex items-center gap-3">
            <Wrench size={28} className="text-[var(--color-accent)]" />
            {t("skills")}
          </span>
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="rounded-xl border p-6"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
            >
              <h3 className="font-heading text-lg mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05, backgroundColor: "var(--color-accent)", color: "white" }}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors cursor-default"
                    style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education placeholder */}
      <section className="mb-16">
        <SectionHeading>
          <span className="inline-flex items-center gap-3">
            <GraduationCap size={28} className="text-[var(--color-accent)]" />
            {t("education")}
          </span>
        </SectionHeading>
        <div className="rounded-xl border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <p style={{ color: "var(--text-muted)" }}>Данные об образовании управляются через админку.</p>
        </div>
      </section>
    </div>
  );
}
