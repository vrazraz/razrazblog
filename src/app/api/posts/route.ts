import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => {
      const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
        ж: "zh", з: "z", и: "i", й: "j", к: "k", л: "l", м: "m",
        н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
        ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
        ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
      };
      return map[c] || c;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = slugify(body.titleRu) + "-" + Date.now().toString(36);

  const post = await prisma.post.create({
    data: {
      type: body.type || "post",
      slug,
      titleRu: body.titleRu,
      titleEn: body.titleEn || null,
      contentRu: body.contentRu,
      contentEn: body.contentEn || null,
      excerptRu: body.contentRu?.substring(0, 200) || null,
      excerptEn: body.contentEn?.substring(0, 200) || null,
      tags: JSON.stringify(body.tags || []),
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
    },
  });

  return NextResponse.json(post);
}
