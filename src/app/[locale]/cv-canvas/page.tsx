"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize,
  User,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────
// Edit these to update your CV canvas

type NodeType = "center" | "experience" | "skills" | "education" | "projects" | "contacts";

interface CanvasNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  data: Record<string, unknown>;
}

interface Connection {
  from: string;
  to: string;
}

const NODES: CanvasNode[] = [
  {
    id: "me",
    type: "center",
    x: 0,
    y: 0,
    data: {
      name: "Виталий",
      role: "Продуктовый дизайнер",
      subtitle: "UX/UI · AI · Design Systems",
      avatar: "/avatar.jpg",
    },
  },
  // Experience
  {
    id: "exp-heading",
    type: "experience",
    x: -520,
    y: -280,
    data: {
      heading: true,
      title: "Опыт работы",
    },
  },
  {
    id: "exp-1",
    type: "experience",
    x: -780,
    y: -160,
    data: {
      period: "2024 — н.в.",
      role: "Senior Product Designer",
      company: "Tech Company",
      desc: "Продуктовый дизайн, дизайн-система, AI-интеграции.",
    },
  },
  {
    id: "exp-2",
    type: "experience",
    x: -780,
    y: 10,
    data: {
      period: "2022 — 2024",
      role: "Product Designer",
      company: "Startup",
      desc: "Мобильное приложение от нуля до продакшна.",
    },
  },
  {
    id: "exp-3",
    type: "experience",
    x: -780,
    y: 180,
    data: {
      period: "2020 — 2022",
      role: "UI/UX Designer",
      company: "Agency",
      desc: "Веб-приложения для B2B клиентов.",
    },
  },
  // Skills
  {
    id: "skills-heading",
    type: "skills",
    x: 480,
    y: -280,
    data: {
      heading: true,
      title: "Навыки",
    },
  },
  {
    id: "skills-design",
    type: "skills",
    x: 700,
    y: -160,
    data: {
      category: "Дизайн",
      items: ["Figma", "Prototyping", "Design Systems", "UX Research", "UI Design"],
    },
  },
  {
    id: "skills-tech",
    type: "skills",
    x: 700,
    y: 10,
    data: {
      category: "AI & Tech",
      items: ["Prompt Engineering", "ComfyUI", "Python", "Next.js", "TypeScript"],
    },
  },
  {
    id: "skills-soft",
    type: "skills",
    x: 700,
    y: 160,
    data: {
      category: "Soft Skills",
      items: ["Product Thinking", "Communication", "Mentoring"],
    },
  },
  // Education
  {
    id: "edu-heading",
    type: "education",
    x: -400,
    y: 320,
    data: {
      heading: true,
      title: "Образование",
    },
  },
  {
    id: "edu-1",
    type: "education",
    x: -640,
    y: 450,
    data: {
      period: "2016 — 2020",
      degree: "Бакалавр дизайна",
      school: "Университет",
    },
  },
  {
    id: "edu-2",
    type: "education",
    x: -380,
    y: 470,
    data: {
      period: "2023",
      degree: "UX Certification",
      school: "Google / Coursera",
    },
  },
  // Projects
  {
    id: "proj-heading",
    type: "projects",
    x: 400,
    y: 320,
    data: {
      heading: true,
      title: "Проекты",
    },
  },
  {
    id: "proj-1",
    type: "projects",
    x: 350,
    y: 470,
    data: {
      title: "Design System",
      desc: "Компонентная библиотека для продуктовой команды",
      color: "#6A9955",
    },
  },
  {
    id: "proj-2",
    type: "projects",
    x: 620,
    y: 450,
    data: {
      title: "AI Dashboard",
      desc: "Аналитическая панель с ML-визуализациями",
      color: "#5599cc",
    },
  },
  // Contacts
  {
    id: "contacts",
    type: "contacts",
    x: 0,
    y: -360,
    data: {
      items: [
        { icon: "mail", label: "hello@example.com", href: "mailto:hello@example.com" },
        { icon: "phone", label: "+7 (999) 123-45-67", href: "tel:+79991234567" },
        { icon: "github", label: "github.com/vitaly", href: "https://github.com/vitaly" },
        { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/vitaly" },
        { icon: "map", label: "Москва, Россия" },
      ],
    },
  },
];

const CONNECTIONS: Connection[] = [
  { from: "me", to: "exp-heading" },
  { from: "me", to: "skills-heading" },
  { from: "me", to: "edu-heading" },
  { from: "me", to: "proj-heading" },
  { from: "me", to: "contacts" },
  { from: "exp-heading", to: "exp-1" },
  { from: "exp-heading", to: "exp-2" },
  { from: "exp-heading", to: "exp-3" },
  { from: "skills-heading", to: "skills-design" },
  { from: "skills-heading", to: "skills-tech" },
  { from: "skills-heading", to: "skills-soft" },
  { from: "edu-heading", to: "edu-1" },
  { from: "edu-heading", to: "edu-2" },
  { from: "proj-heading", to: "proj-1" },
  { from: "proj-heading", to: "proj-2" },
];

// ─── NODE SIZES (for connection endpoints) ───────────────────────────
const NODE_SIZES: Record<NodeType, { w: number; h: number }> = {
  center: { w: 220, h: 120 },
  experience: { w: 260, h: 120 },
  skills: { w: 240, h: 120 },
  education: { w: 240, h: 100 },
  projects: { w: 240, h: 110 },
  contacts: { w: 300, h: 200 },
};

// ─── HELPERS ─────────────────────────────────────────────────────────

function getNodeCenter(node: CanvasNode) {
  const s = NODE_SIZES[node.type];
  return { cx: node.x + s.w / 2, cy: node.y + s.h / 2 };
}

const contactIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
  map: MapPin,
};

// ─── CARD COMPONENTS ─────────────────────────────────────────────────

function CenterCard({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="flex flex-col items-center text-center p-6 min-w-[220px]">
      <div
        className="w-20 h-20 rounded-full mb-3 border-2 flex items-center justify-center overflow-hidden"
        style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--bg-secondary)" }}
      >
        <User size={36} style={{ color: "var(--text-muted)" }} />
      </div>
      <h2 className="font-heading text-2xl" style={{ color: "var(--text-primary)" }}>
        {data.name as string}
      </h2>
      <p className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>
        {data.role as string}
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        {data.subtitle as string}
      </p>
    </div>
  );
}

function HeadingCard({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3">
      {icon}
      <span className="font-heading text-lg" style={{ color: "var(--text-primary)" }}>
        {title}
      </span>
    </div>
  );
}

function ExperienceCard({ data }: { data: Record<string, unknown> }) {
  if (data.heading) {
    return <HeadingCard title={data.title as string} icon={<Briefcase size={20} style={{ color: "var(--color-accent)" }} />} />;
  }
  return (
    <div className="p-4 min-w-[240px] max-w-[260px]">
      <p className="text-[10px] font-mono mb-1" style={{ color: "var(--color-accent)" }}>
        {data.period as string}
      </p>
      <h3 className="font-heading text-base leading-tight">{data.role as string}</h3>
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {data.company as string}
      </p>
      <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
        {data.desc as string}
      </p>
    </div>
  );
}

function SkillsCard({ data }: { data: Record<string, unknown> }) {
  if (data.heading) {
    return <HeadingCard title={data.title as string} icon={<Wrench size={20} style={{ color: "var(--color-accent)" }} />} />;
  }
  const items = data.items as string[];
  return (
    <div className="p-4 min-w-[220px] max-w-[240px]">
      <h3 className="font-heading text-sm mb-2">{data.category as string}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className="text-[10px] px-2 py-1 rounded-full border"
            style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function EducationCard({ data }: { data: Record<string, unknown> }) {
  if (data.heading) {
    return <HeadingCard title={data.title as string} icon={<GraduationCap size={20} style={{ color: "var(--color-accent)" }} />} />;
  }
  return (
    <div className="p-4 min-w-[220px]">
      <p className="text-[10px] font-mono mb-1" style={{ color: "var(--color-accent)" }}>
        {data.period as string}
      </p>
      <h3 className="font-heading text-base">{data.degree as string}</h3>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        {data.school as string}
      </p>
    </div>
  );
}

function ProjectsCard({ data }: { data: Record<string, unknown> }) {
  if (data.heading) {
    return <HeadingCard title={data.title as string} icon={<FolderOpen size={20} style={{ color: "var(--color-accent)" }} />} />;
  }
  const color = (data.color as string) || "var(--color-accent)";
  return (
    <div className="p-4 min-w-[220px] max-w-[240px]">
      <div className="w-full h-16 rounded-lg mb-2 flex items-center justify-center" style={{ backgroundColor: color + "22" }}>
        <ExternalLink size={20} style={{ color }} />
      </div>
      <h3 className="font-heading text-sm">{data.title as string}</h3>
      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
        {data.desc as string}
      </p>
    </div>
  );
}

function ContactsCard({ data }: { data: Record<string, unknown> }) {
  const items = data.items as Array<{ icon: string; label: string; href?: string }>;
  return (
    <div className="p-5 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <Mail size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base">Контакты</span>
      </div>
      <div className="space-y-2">
        {items.map((c) => {
          const Icon = contactIcons[c.icon] || Mail;
          const inner = (
            <span className="flex items-center gap-2 text-xs" style={{ color: c.href ? "var(--text-secondary)" : "var(--text-muted)" }}>
              <Icon size={14} />
              {c.label}
            </span>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="block hover:underline">
              {inner}
            </a>
          ) : (
            <div key={c.label}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}

const CARD_RENDERERS: Record<NodeType, React.FC<{ data: Record<string, unknown> }>> = {
  center: CenterCard,
  experience: ExperienceCard,
  skills: SkillsCard,
  education: EducationCard,
  projects: ProjectsCard,
  contacts: ContactsCard,
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────

export default function CVCanvasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.75);
  const [isPanning, setIsPanning] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Center canvas on the "me" node
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: rect.height / 2 });
    }
    // Simulate initial load + let fonts/styles settle
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ─── MOUSE PAN ──────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  // ─── TOUCH PAN + PINCH ─────────────────────────────
  const lastTouches = useRef<{ x: number; y: number; dist: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouches.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 };
    } else if (e.touches.length === 2) {
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      lastTouches.current = { x: mx, y: my, dist };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (!lastTouches.current) return;
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastTouches.current.x;
      const dy = e.touches[0].clientY - lastTouches.current.y;
      lastTouches.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dist: 0 };
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    } else if (e.touches.length === 2) {
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const dx = mx - lastTouches.current.x;
      const dy = my - lastTouches.current.y;
      const scaleFactor = dist / (lastTouches.current.dist || dist);
      lastTouches.current = { x: mx, y: my, dist };
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
      setZoom((z) => Math.min(2, Math.max(0.2, z * scaleFactor)));
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    lastTouches.current = null;
  }, []);

  // ─── WHEEL ZOOM ────────────────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(2, Math.max(0.2, z + delta)));
  }, []);

  // ─── CONTROLS ──────────────────────────────────────
  const zoomIn = () => setZoom((z) => Math.min(2, z + 0.15));
  const zoomOut = () => setZoom((z) => Math.max(0.2, z - 0.15));
  const resetView = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPan({ x: rect.width / 2, y: rect.height / 2 });
    setZoom(0.75);
  };

  // Build node map for connections
  const nodeMap = new Map(NODES.map((n) => [n.id, n]));

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--bg-primary, #0a0a0a)" }}
          >
            {/* Animated nodes */}
            <div className="relative w-32 h-32 mb-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-xl border"
                  style={{
                    width: i === 0 ? 40 : 28,
                    height: i === 0 ? 40 : 28,
                    left: i === 0 ? "50%" : `${50 + Math.cos((i * Math.PI * 2) / 4) * 38}%`,
                    top: i === 0 ? "50%" : `${50 + Math.sin((i * Math.PI * 2) / 4) * 38}%`,
                    transform: "translate(-50%, -50%)",
                    borderColor: i === 0 ? "#3b82f6" : "rgba(255,255,255,0.2)",
                    backgroundColor: i === 0 ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Animated connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                {[1, 2, 3, 4].map((i) => (
                  <motion.line
                    key={i}
                    x1="64"
                    y1="64"
                    x2={64 + Math.cos((i * Math.PI * 2) / 4) * 48}
                    y2={64 + Math.sin((i * Math.PI * 2) / 4) * 48}
                    stroke="rgba(59,130,246,0.3)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </svg>
            </div>
            <motion.p
              className="text-sm tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading canvas…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{ backgroundColor: "var(--bg-primary)", cursor: isPanning ? "grabbing" : "grab", touchAction: "none" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: `${30 * zoom}px ${30 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          opacity: 0.4,
        }}
      />

      {/* Canvas content */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* SVG Connections */}
        <svg
          className="absolute pointer-events-none"
          style={{ overflow: "visible", top: 0, left: 0, width: 1, height: 1 }}
        >
          {CONNECTIONS.map((conn) => {
            const fromNode = nodeMap.get(conn.from);
            const toNode = nodeMap.get(conn.to);
            if (!fromNode || !toNode) return null;
            const a = getNodeCenter(fromNode);
            const b = getNodeCenter(toNode);
            // Bezier curve
            const mx = (a.cx + b.cx) / 2;
            const my = (a.cy + b.cy) / 2;
            const dx = Math.abs(a.cx - b.cx);
            const dy = Math.abs(a.cy - b.cy);
            const cp = dx > dy ? `${mx},${a.cy} ${mx},${b.cy}` : `${a.cx},${my} ${b.cx},${my}`;
            return (
              <motion.path
                key={`${conn.from}-${conn.to}`}
                d={`M ${a.cx},${a.cy} C ${cp} ${b.cx},${b.cy}`}
                fill="none"
                stroke="var(--border-color)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={mounted ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {NODES.map((node, i) => {
            const Renderer = CARD_RENDERERS[node.type];
            const isCenter = node.type === "center";
            return (
              <motion.div
                key={node.id}
                className="absolute rounded-xl border backdrop-blur-sm"
                style={{
                  left: node.x,
                  top: node.y,
                  backgroundColor: isCenter ? "var(--color-accent)" + "11" : "var(--bg-card)",
                  borderColor: isCenter ? "var(--color-accent)" : "var(--border-color)",
                  boxShadow: isCenter
                    ? "0 0 40px rgba(106,153,85,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.08)",
                  zIndex: isCenter ? 10 : 1,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: isCenter ? 0 : 0.1 + i * 0.04,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
              >
                <Renderer data={node.data} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Zoom Controls */}
      <div
        className="fixed bottom-6 right-6 flex flex-col gap-2 z-50"
      >
        {[
          { icon: <ZoomIn size={18} />, action: zoomIn },
          { icon: <ZoomOut size={18} />, action: zoomOut },
          { icon: <Maximize size={18} />, action: resetView },
        ].map((btn, i) => (
          <motion.button
            key={i}
            onClick={btn.action}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg border flex items-center justify-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            {btn.icon}
          </motion.button>
        ))}
        <div
          className="text-[10px] text-center font-mono mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Title */}
      <div className="fixed top-20 left-6 z-50">
        <h1
          className="font-heading text-2xl opacity-60"
          style={{ color: "var(--text-primary)" }}
        >
          CV Canvas
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Перетаскивайте для навигации · Скролл для зума
        </p>
      </div>
    </div>
    </>
  );
}
