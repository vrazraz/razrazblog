import { useTranslations } from "next-intl";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  const t = useTranslations("portfolio");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl md:text-5xl mb-12">{t("title")}</h1>
      <PortfolioGrid />
    </div>
  );
}
