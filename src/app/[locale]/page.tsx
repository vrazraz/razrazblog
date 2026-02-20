import { useTranslations } from "next-intl";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestPosts } from "@/components/home/LatestPosts";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <HeroSection />
      <LatestPosts />
    </div>
  );
}
