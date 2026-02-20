"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Sun, Moon, Globe } from "lucide-react";

const navItems = [
  { href: "/", label: "home" },
  { href: "/portfolio", label: "portfolio" },
  { href: "/blog", label: "blog" },
  { href: "/cv", label: "cv" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const { theme, toggle } = useTheme();
  const locale = params.locale as string;

  const switchLocale = () => {
    const next = locale === "ru" ? "en" : "ru";
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: "var(--border-color)", backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link href="/" className="font-heading text-xl tracking-tight">
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="inline-block"
          >
            V.
          </motion.span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="relative px-3 py-2 text-sm transition-colors rounded-lg hover:text-[var(--color-accent)]"
                style={{ color: isActive ? "var(--color-accent)" : "var(--text-secondary)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(label)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={switchLocale}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Switch language"
          >
            <Globe size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
