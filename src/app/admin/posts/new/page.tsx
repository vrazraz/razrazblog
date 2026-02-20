"use client";

import { useState } from "react";

export default function NewPostPage() {
  const [type, setType] = useState<"post" | "article">("post");
  const [titleRu, setTitleRu] = useState("");
  const [contentRu, setContentRu] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!titleRu && !contentRu) return;
    setTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleRu, content: contentRu }),
      });
      const data = await res.json();
      if (data.title) setTitleEn(data.title);
      if (data.content) setContentEn(data.content);
    } catch (e) {
      alert("Ошибка перевода");
    }
    setTranslating(false);
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          titleRu,
          contentRu,
          titleEn: titleEn || null,
          contentEn: contentEn || null,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          published: publish,
        }),
      });
      const data = await res.json();
      if (data.id) {
        window.location.href = "/admin/posts";
      }
    } catch (e) {
      alert("Ошибка сохранения");
    }
    setSaving(false);
  };

  const inputStyle = {
    backgroundColor: "var(--bg-secondary)",
    borderColor: "var(--border-color)",
    color: "var(--text-primary)",
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">
        {type === "post" ? "✏️ Новый пост" : "📄 Новая статья"}
      </h1>

      {/* Type selector */}
      <div className="flex gap-2 mb-6">
        {(["post", "article"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className="px-4 py-2 rounded-lg text-sm border transition-colors"
            style={{
              backgroundColor: type === t ? "var(--color-accent)" : "transparent",
              color: type === t ? "white" : "var(--text-secondary)",
              borderColor: type === t ? "var(--color-accent)" : "var(--border-color)",
            }}
          >
            {t === "post" ? "Пост" : "Статья"}
          </button>
        ))}
      </div>

      {/* Russian content */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>🇷🇺 Русский</h2>
        <input
          type="text"
          placeholder="Заголовок"
          value={titleRu}
          onChange={(e) => setTitleRu(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border text-lg"
          style={inputStyle}
        />
        <textarea
          placeholder={type === "post" ? "Текст поста..." : "Текст статьи (Markdown)..."}
          value={contentRu}
          onChange={(e) => setContentRu(e.target.value)}
          rows={type === "post" ? 4 : 15}
          className="w-full px-4 py-3 rounded-lg border resize-y"
          style={inputStyle}
        />
      </div>

      {/* Translate button */}
      <div className="mb-8">
        <button
          onClick={handleTranslate}
          disabled={translating || (!titleRu && !contentRu)}
          className="px-4 py-2 rounded-lg text-sm border transition-colors disabled:opacity-50"
          style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
        >
          {translating ? "⏳ Переводим..." : "🤖 Перевести на English"}
        </button>
      </div>

      {/* English content */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-bold" style={{ color: "var(--text-muted)" }}>🇬🇧 English</h2>
        <input
          type="text"
          placeholder="Title"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border"
          style={inputStyle}
        />
        <textarea
          placeholder="Content..."
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows={type === "post" ? 4 : 15}
          className="w-full px-4 py-3 rounded-lg border resize-y"
          style={inputStyle}
        />
      </div>

      {/* Tags */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Теги (через запятую): AI, дизайн, мысли"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border"
          style={inputStyle}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => handleSave(true)}
          disabled={saving || !titleRu}
          className="px-6 py-2.5 rounded-lg text-sm text-white disabled:opacity-50"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {saving ? "⏳ Сохраняем..." : "🚀 Опубликовать"}
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={saving || !titleRu}
          className="px-6 py-2.5 rounded-lg text-sm border disabled:opacity-50"
          style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
        >
          💾 Черновик
        </button>
      </div>
    </div>
  );
}
