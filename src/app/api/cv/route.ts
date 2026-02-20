import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const sections = await prisma.cvSection.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const section = await prisma.cvSection.create({
    data: {
      type: body.type,
      titleRu: body.titleRu,
      titleEn: body.titleEn || null,
      contentRu: body.contentRu,
      contentEn: body.contentEn || null,
      order: body.order || 0,
    },
  });

  return NextResponse.json(section);
}
