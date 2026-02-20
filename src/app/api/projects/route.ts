import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug =
    body.slug ||
    body.titleRu
      .toLowerCase()
      .replace(/[^a-zа-я0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36);

  const project = await prisma.project.create({
    data: {
      slug,
      category: body.category || "design",
      titleRu: body.titleRu,
      titleEn: body.titleEn || null,
      descriptionRu: body.descriptionRu,
      descriptionEn: body.descriptionEn || null,
      contentRu: body.contentRu || null,
      contentEn: body.contentEn || null,
      coverImage: body.coverImage || null,
      images: JSON.stringify(body.images || []),
      order: body.order || 0,
      published: body.published ?? false,
    },
  });

  return NextResponse.json(project);
}
