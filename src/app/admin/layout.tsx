import "@/app/globals.css";

export const metadata = {
  title: "Админка | Portfolio",
};

const sidebarLinks = [
  { href: "/admin", label: "📊 Дашборд" },
  { href: "/admin/posts", label: "📝 Посты" },
  { href: "/admin/posts/new", label: "✏️ Новый пост" },
  { href: "/admin/projects", label: "💼 Проекты" },
  { href: "/admin/cv", label: "📄 CV" },
  { href: "/admin/settings", label: "⚙️ Настройки" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        data-theme="dark"
        className="min-h-screen antialiased"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside
            className="w-64 border-r p-6 flex flex-col gap-1 shrink-0"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <h1 className="text-lg font-bold mb-6" style={{ color: "var(--color-accent)" }}>
              ⚡ Админка
            </h1>
            {sidebarLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--bg-card)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {label}
              </a>
            ))}
          </aside>

          {/* Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
