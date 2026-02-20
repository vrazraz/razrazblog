import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  // AI translation via Anthropic/OpenAI
  // For now, returns a placeholder — configure API key in .env
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in .env" },
      { status: 500 }
    );
  }

  try {
    // Using Anthropic Claude
    if (process.env.ANTHROPIC_API_KEY) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: `Translate the following Russian text to English. Keep the markdown formatting. Return ONLY the translation, no explanations.\n\nTitle: ${title}\n\nContent:\n${content}`,
            },
          ],
        }),
      });

      const data = await res.json();
      const translated = data.content?.[0]?.text || "";

      // Parse title and content from response
      const lines = translated.split("\n");
      const translatedTitle = lines[0]?.replace(/^Title:\s*/i, "").trim() || title;
      const translatedContent = lines.slice(2).join("\n").trim() || translated;

      return NextResponse.json({
        title: translatedTitle,
        content: translatedContent,
      });
    }

    // Fallback: OpenAI
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Translate to English. Keep markdown. Return only translation.\n\nTitle: ${title}\n\nContent:\n${content}`,
          },
        ],
      }),
    });

    const data = await res.json();
    const translated = data.choices?.[0]?.message?.content || "";
    const lines = translated.split("\n");

    return NextResponse.json({
      title: lines[0]?.replace(/^Title:\s*/i, "").trim() || title,
      content: lines.slice(2).join("\n").trim() || translated,
    });
  } catch (e) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
