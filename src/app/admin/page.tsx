import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Посты", count: 0, icon: "📝" },
          { label: "Статьи", count: 0, icon: "📄" },
          { label: "Проекты", count: 0, icon: "💼" },
        ].map(({ label, count, icon }) => (
          <div
            key={label}
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-8 rounded-xl border p-6"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
      >
        <h2 className="text-lg font-bold mb-4">Быстрые действия</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            ✏️ Новый пост
          </Link>
          <Link
            href="/admin/posts/new?type=article"
            className="px-4 py-2 rounded-lg text-sm border"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            📄 Новая статья
          </Link>
        </div>
      </div>
    </div>
  );
}
