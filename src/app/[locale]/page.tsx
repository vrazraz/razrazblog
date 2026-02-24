"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  FileText,
  FolderOpen,
  BookOpen,
  Mail,
  Wrench,
  ZoomIn,
  ZoomOut,
  Maximize,
  X,
  GripVertical,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────

type NodeId = "about" | "cv" | "portfolio" | "blog" | "contacts" | "skills";

interface CanvasNode {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Connection {
  from: NodeId;
  to: NodeId;
}

// ─── LAYOUT ──────────────────────────────────────────────────────────

const NODES: CanvasNode[] = [
  { id: "about", x: -140, y: -100, w: 280, h: 200 },
  { id: "cv", x: -480, y: -220, w: 260, h: 160 },
  { id: "portfolio", x: 260, y: -200, w: 280, h: 200 },
  { id: "blog", x: -460, y: 160, w: 260, h: 200 },
  { id: "contacts", x: 280, y: 180, w: 240, h: 200 },
  { id: "skills", x: -120, y: 260, w: 240, h: 160 },
];

const CONNECTIONS: Connection[] = [
  { from: "about", to: "cv" },
  { from: "about", to: "portfolio" },
  { from: "about", to: "blog" },
  { from: "about", to: "contacts" },
  { from: "about", to: "skills" },
];

// ─── STUB DATA ───────────────────────────────────────────────────────

const PROJECTS = [
  { title: "Design System", desc: "Компонентная библиотека для продуктовой команды из 40+ компонентов", color: "#6A9955" },
  { title: "AI Dashboard", desc: "Аналитическая панель с ML-визуализациями и real-time данными", color: "#5599cc" },
  { title: "Mobile Banking App", desc: "Мобильное приложение для необанка от концепта до релиза", color: "#cc7755" },
  { title: "E-commerce Redesign", desc: "Редизайн интернет-магазина, конверсия +32%", color: "#9966cc" },
];

const BLOG_POSTS = [
  { title: "Как я строил дизайн-систему с нуля", date: "15 фев 2025" },
  { title: "AI в продуктовом дизайне: практический гайд", date: "2 фев 2025" },
  { title: "Figma vs Sketch в 2025: честное сравнение", date: "18 янв 2025" },
  { title: "Почему Product Thinking важнее пикселей", date: "5 янв 2025" },
];

const SKILLS = [
  "Figma", "Prototyping", "Design Systems", "UX Research", "UI Design",
  "Prompt Engineering", "ComfyUI", "Python", "Next.js", "TypeScript",
  "Product Thinking", "Communication", "Mentoring",
];

// ─── HELPERS ─────────────────────────────────────────────────────────

function getCenter(n: CanvasNode) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}

// ─── NODE RENDERERS ──────────────────────────────────────────────────

function AboutNode() {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div
        className="w-20 h-20 rounded-full mb-3 border-2 flex items-center justify-center"
        style={{ borderColor: "var(--color-accent)", backgroundColor: "var(--bg-secondary)" }}
      >
        <User size={36} style={{ color: "var(--text-muted)" }} />
      </div>
      <h2 className="font-heading text-2xl" style={{ color: "var(--text-primary)" }}>Виталий</h2>
      <p className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>Продуктовый дизайнер</p>
      <p className="text-xs mt-2 max-w-[220px]" style={{ color: "var(--text-muted)" }}>
        UX/UI · AI · Design Systems. Создаю продукты, которые решают реальные задачи.
      </p>
    </div>
  );
}

function CVNode({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base" style={{ color: "var(--text-primary)" }}>CV / Резюме</span>
      </div>
      <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Senior Product Designer</p>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>5+ лет опыта в продуктовом дизайне</p>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
        className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
        style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
      >
        Открыть →
      </button>
    </div>
  );
}

function PortfolioNode({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <FolderOpen size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base" style={{ color: "var(--text-primary)" }}>Портфолио</span>
      </div>
      <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{PROJECTS.length} проектов</p>
      <div className="flex gap-1.5 mb-3">
        {PROJECTS.slice(0, 3).map((p) => (
          <div
            key={p.title}
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: p.color + "22" }}
          >
            <ExternalLink size={14} style={{ color: p.color }} />
          </div>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
        className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
        style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
      >
        Открыть →
      </button>
    </div>
  );
}

function BlogNode({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base" style={{ color: "var(--text-primary)" }}>Блог</span>
      </div>
      <div className="space-y-1.5 mb-3">
        {BLOG_POSTS.slice(0, 3).map((p) => (
          <p key={p.title} className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
            {p.title}
          </p>
        ))}
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(); }}
        className="text-xs px-3 py-1.5 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
        style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
      >
        Открыть →
      </button>
    </div>
  );
}

function ContactsNode() {
  const links = [
    { icon: Mail, label: "hello@example.com", href: "mailto:hello@example.com" },
    { icon: Github, label: "github.com/vitaly", href: "https://github.com/vitaly" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vitaly" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/vitaly" },
  ];
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Mail size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base" style={{ color: "var(--text-primary)" }}>Контакты</span>
      </div>
      <div className="space-y-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs hover:underline"
            style={{ color: "var(--text-secondary)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <l.icon size={14} />
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function SkillsNode() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Wrench size={18} style={{ color: "var(--color-accent)" }} />
        <span className="font-heading text-base" style={{ color: "var(--text-primary)" }}>Навыки</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
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

// ─── MODAL ───────────────────────────────────────────────────────────

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-4 md:inset-12 z-[201] rounded-2xl border overflow-hidden flex flex-col"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)" }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
              <h2 className="font-heading text-xl" style={{ color: "var(--text-primary)" }}>{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={20} />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MODAL CONTENTS ──────────────────────────────────────────────────

function CVModalContent() {
  return (
    <iframe
      src="/cv-canvas"
      className="w-full rounded-xl border"
      style={{ height: "80vh", borderColor: "var(--border-color)" }}
    />
  );
}

function PortfolioModalContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PROJECTS.map((p) => (
        <div key={p.title} className="rounded-xl border p-5" style={{ borderColor: "var(--border-color)" }}>
          <div
            className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
            style={{ backgroundColor: p.color + "22" }}
          >
            <ExternalLink size={28} style={{ color: p.color }} />
          </div>
          <h3 className="font-heading text-lg mb-1" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function BlogModalContent() {
  return (
    <div className="space-y-4">
      {BLOG_POSTS.map((p) => (
        <div key={p.title} className="rounded-xl border p-5 hover:scale-[1.01] transition-transform" style={{ borderColor: "var(--border-color)" }}>
          <h3 className="font-heading text-lg mb-1" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
          <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{p.date}</p>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85);
  const [isPanning, setIsPanning] = useState(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"cv" | "portfolio" | "blog" | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(
    () => Object.fromEntries(NODES.map((n) => [n.id, { x: n.x, y: n.y }]))
  );
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0, nodeX: 0, nodeY: 0 });

  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: rect.height / 2 });
    }
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ─── NODE DRAG ──────────────────────────────────────
  const handleNodeDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, nodeId: string) => {
    e.stopPropagation();
    e.preventDefault();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDraggingNode(nodeId);
    setNodePositions((prev) => {
      const pos = prev[nodeId];
      dragStartPos.current = { x: clientX, y: clientY, nodeX: pos.x, nodeY: pos.y };
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!draggingNode) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = (clientX - dragStartPos.current.x) / zoom;
      const dy = (clientY - dragStartPos.current.y) / zoom;
      setNodePositions((prev) => ({
        ...prev,
        [draggingNode]: {
          x: dragStartPos.current.nodeX + dx,
          y: dragStartPos.current.nodeY + dy,
        },
      }));
    };
    const handleUp = () => setDraggingNode(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [draggingNode, zoom]);

  // ─── MOUSE PAN ──────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || draggingNode) return;
    setIsPanning(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, [draggingNode]);

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

  const handleTouchEnd = useCallback(() => { lastTouches.current = null; }, []);

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
    setZoom(0.85);
  };

  const nodeMap = new Map(NODES.map((n) => [n.id, { ...n, ...nodePositions[n.id] }]));

  const renderNode = (node: CanvasNode) => {
    switch (node.id) {
      case "about": return <AboutNode />;
      case "cv": return <CVNode onOpen={() => setModal("cv")} />;
      case "portfolio": return <PortfolioNode onOpen={() => setModal("portfolio")} />;
      case "blog": return <BlogNode onOpen={() => setModal("blog")} />;
      case "contacts": return <ContactsNode />;
      case "skills": return <SkillsNode />;
    }
  };

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
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                {[1, 2, 3, 4].map((i) => (
                  <motion.line
                    key={i}
                    x1="64" y1="64"
                    x2={64 + Math.cos((i * Math.PI * 2) / 4) * 48}
                    y2={64 + Math.sin((i * Math.PI * 2) / 4) * 48}
                    stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4 4"
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

      {/* Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden select-none z-[100]"
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
        {/* Dot grid */}
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
          <svg className="absolute pointer-events-none" style={{ overflow: "visible", top: 0, left: 0, width: 1, height: 1 }}>
            {CONNECTIONS.map((conn) => {
              const fromNode = nodeMap.get(conn.from);
              const toNode = nodeMap.get(conn.to);
              if (!fromNode || !toNode) return null;
              const a = getCenter(fromNode);
              const b = getCenter(toNode);
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
          {NODES.map((node, i) => {
            const isCenter = node.id === "about";
            const pos = nodePositions[node.id];
            const isHovered = hoveredNode === node.id;
            const isDragging = draggingNode === node.id;
            return (
              <motion.div
                key={node.id}
                className="absolute rounded-xl border backdrop-blur-sm group"
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: node.w,
                  backgroundColor: isCenter ? "var(--color-accent)" + "11" : "var(--bg-card)",
                  borderColor: isDragging ? "var(--color-accent)" : isCenter ? "var(--color-accent)" : "var(--border-color)",
                  boxShadow: isDragging
                    ? "0 8px 32px rgba(0,0,0,0.25)"
                    : isCenter
                    ? "0 0 40px rgba(106,153,85,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.08)",
                  zIndex: isDragging ? 100 : isCenter ? 10 : 1,
                  cursor: isDragging ? "grabbing" : "default",
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={mounted ? { opacity: 1, scale: isDragging ? 1.05 : 1, y: 0 } : {}}
                transition={{ duration: isDragging ? 0 : 0.5, delay: isCenter ? 0 : 0.1 + i * 0.06, ease: "easeOut" }}
                whileHover={isDragging ? {} : { scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Grip handle */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-0 pt-1.5 pb-1 px-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ cursor: "grab", zIndex: 20 }}
                  onMouseDown={(e) => handleNodeDragStart(e, node.id)}
                  onTouchStart={(e) => handleNodeDragStart(e, node.id)}
                >
                  <div className="flex gap-[2px]">
                    {[0,1,2].map(r => (
                      <div key={r} className="flex flex-col gap-[2px]">
                        {[0,1].map(c => (
                          <div key={c} className="w-[3px] h-[3px] rounded-full" style={{ backgroundColor: "var(--text-muted)" }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {renderNode(node)}
              </motion.div>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-[150]">
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
              className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
              {btn.icon}
            </motion.button>
          ))}
          <div className="text-[10px] text-center font-mono mt-1" style={{ color: "var(--text-muted)" }}>
            {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Hint */}
        <div className="fixed bottom-6 left-6 z-[150]">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Перетаскивайте для навигации · Скролл для зума
          </p>
        </div>
      </div>

      {/* Modals */}
      <Modal open={modal === "cv"} onClose={() => setModal(null)} title="CV / Резюме">
        <CVModalContent />
      </Modal>
      <Modal open={modal === "portfolio"} onClose={() => setModal(null)} title="Портфолио">
        <PortfolioModalContent />
      </Modal>
      <Modal open={modal === "blog"} onClose={() => setModal(null)} title="Блог">
        <BlogModalContent />
      </Modal>
    </>
  );
}
