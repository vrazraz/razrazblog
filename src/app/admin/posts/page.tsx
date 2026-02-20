import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function PostsListPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">📝 Посты и статьи</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-lg text-sm text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          + Новый
        </Link>
      </div>

      {posts.length === 0 ? (
        <div
          className="rounded-xl border p-12 text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <p className="text-4xl mb-4">📭</p>
          <p style={{ color: "var(--text-muted)" }}>Пока нет публикаций</p>
          <Link
            href="/admin/posts/new"
            className="inline-block mt-4 px-4 py-2 rounded-lg text-sm text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Создать первый пост
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-xl border p-4"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: post.published
                        ? "var(--color-accent)"
                        : "var(--bg-secondary)",
                      color: post.published ? "white" : "var(--text-muted)",
                    }}
                  >
                    {post.published ? "Опубликован" : "Черновик"}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {post.type === "article" ? "Статья" : "Пост"}
                  </span>
                </div>
                <h3 className="font-bold">{post.titleRu}</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {post.createdAt.toLocaleDateString("ru-RU")}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`/admin/posts/${post.id}`}
                  className="px-3 py-1.5 rounded-lg text-xs border"
                  style={{
                    borderColor: "var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                >
                  ✏️ Ред.
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
