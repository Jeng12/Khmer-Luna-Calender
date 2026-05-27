import { useState } from "react";

const C = {
  bg: "#0B0B0D",
  surface: "#131316",
  card: "#18181C",
  border: "#242428",
  text: "#F0EEF8",
  sub: "#8888A0",
  dim: "#44444E",
  gold: "#C8973A",
  purple: "#8B3A8B",
  orange: "#FF6B35",
  teal: "#4ECDC4",
  yellow: "#FFE66D",
  sky: "#A8DADC",
  violet: "#C77DFF",
};

const PHASES = [
  {
    id: "project",
    emoji: "🏗️",
    label: "Project Overview",
    accent: C.gold,
    summary: "Khmer Lunar Calendar — a full-stack mobile application",
    items: [
      { icon: "📱", title: "Product", desc: "A Khmer Lunar Calendar app that converts Gregorian dates to Khmer lunar format, shows holidays, moon phases, and personal events." },
      { icon: "⚙️", title: "Backend", desc: "Laravel (PHP) REST API using the asorasoft/chhankitek package for all lunar math. MySQL database, Sanctum auth, bilingual KH/EN responses." },
      { icon: "📲", title: "Frontend", desc: "React Native app with TypeScript, React Navigation v6, and a Khmer-first design system (Noto Serif Khmer font, gold/red/dark palette)." },
    ],
  },
  {
    id: "research",
    emoji: "📜",
    label: "Research & Algorithm",
    accent: C.gold,
    summary: "Chhankitek (ចន្ទគតិ) — the Khmer lunisolar calendar system",
    items: [
      { icon: "🌙", title: "The System", desc: "Khmer calendar is lunisolar — lunar months aligned to the solar year via intercalary months (Adhikameas) or an extra day (Adhikavas). Buddhist Era (BE) is 544 years ahead of CE." },
      { icon: "🔢", title: "Core Algorithm", desc: "Three key values: Aharkun, Avoman (leap-day check), and Bodithey (leap-month check, triggered if >24 or <6). Determines if a year is 354, 355, or 384 days." },
      { icon: "🌕", title: "Moon Phases", desc: "Each month has two halves — Kaet (កើត, waxing, days 1–15) and Roch (រោច, waning, days 1–14/15). Leap month is always inserted at Ashad (month 8)." },
      { icon: "⚡", title: "Key Decision", desc: "Using composer package asorasoft/chhankitek — handles all lunar math, zodiac, holidays, and moon phases with built-in caching. No need to build the algorithm from scratch." },
    ],
  },
  {
    id: "backend",
    emoji: "🖥️",
    label: "Backend API",
    accent: C.orange,
    summary: "Laravel REST API — 18 endpoints across 5 resource groups",
    items: [
      { icon: "🔐", title: "Auth (3 endpoints)", desc: "POST /register, POST /login, POST /logout — Sanctum token-based auth. Consistent { success, data } response envelope." },
      { icon: "📅", title: "Calendar (5 endpoints)", desc: "GET /today, GET /calendar/{year}/{month}, POST /convert (Gregorian↔Khmer), GET /auspicious-days. Monthly view is cached for performance." },
      { icon: "🎉", title: "Holidays (3 endpoints)", desc: "GET /holidays (filter: year, type, public_only), GET /holidays/{id}, POST /holidays (admin only). Includes Khmer New Year, Pchum Ben, Visak Bochea, Water Festival." },
      { icon: "📝", title: "Events (4 endpoints)", desc: "Full CRUD for user personal events. Create only needs gregorian_date — backend auto-maps to Khmer date + moon phase snapshot at creation time." },
      { icon: "👤", title: "User (3 endpoints)", desc: "GET/PATCH /user/settings (language, view, notification prefs), POST /user/device-token (FCM push with upsert). Accept-Language: km header for bilingual output." },
    ],
  },
  {
    id: "frontend-arch",
    emoji: "🗺️",
    label: "Frontend Navigation Architecture",
    accent: C.teal,
    summary: "React Navigation v7 — 6 navigators, 24 screens, 6 modals",
    items: [
      { icon: "🔱", title: "Root Stack", desc: "Top-level Stack navigator splits into AuthNavigator (unauthenticated) and MainNavigator (authenticated tab shell)." },
      { icon: "🔑", title: "Auth Stack (6 screens)", desc: "Splash → Onboarding → Login → Register → ForgotPassword → OTPVerify. Linear flow with no tab bar." },
      { icon: "🏠", title: "Home Stack (4 screens)", desc: "Feed → PostDetail → Comments → Notifications. Accent: teal (#4ECDC4)." },
      { icon: "🔍", title: "Explore Stack (5 screens)", desc: "Search → Category → Results → ItemDetail → Map. Accent: yellow (#FFE66D)." },
      { icon: "⚡", title: "Activity Stack (3 screens)", desc: "ActivityFeed → Stats (bar chart) → History. Accent: sky (#A8DADC)." },
      { icon: "👤", title: "Profile Stack (6 screens)", desc: "Profile → EditProfile → Settings → Notif.Settings → Privacy → Help. Accent: violet (#C77DFF)." },
      { icon: "🎛️", title: "Modal Group (6 overlays)", desc: "Camera, ImagePicker, ShareSheet, FilterDrawer, ConfirmDialog, Toast/Snackbar — registered globally in Root Stack." },
    ],
  },
  {
    id: "screens",
    emoji: "📱",
    label: "Screen Mockups",
    accent: C.violet,
    summary: "24 fully designed screen mockups with realistic content",
    items: [
      { icon: "⚡", title: "Splash", desc: "Boot screen with logo, version, and progress bar asset loading indicator." },
      { icon: "👋", title: "Onboarding", desc: "3-slide feature walkthrough with large illustration, dot pagination, and skip option." },
      { icon: "🔑", title: "Login / Register", desc: "Email + password fields, social auth buttons (Google/Apple/X), and inline validation states." },
      { icon: "🔒", title: "ForgotPassword + OTP", desc: "Email input with reset link CTA; OTP screen with 6 individual digit boxes and countdown resend timer." },
      { icon: "📰", title: "Feed", desc: "Infinite scroll post cards with avatar, timestamp, like/comment/share actions. Filter pills: For You / Following / Trending." },
      { icon: "📄", title: "PostDetail + Comments", desc: "Full post view with image placeholder, reaction counts. Comment thread with nested reply capability and bottom input bar." },
      { icon: "🔔", title: "Notifications", desc: "Activity list with unread dot indicators, icon type badges, and 'Mark all read' action." },
      { icon: "🔎", title: "Search + Category + Results", desc: "Discovery search bar, trending grid, category header, and full-text results list with sub-snippets." },
      { icon: "🔬", title: "ItemDetail", desc: "Hero header with gradient, tab bar (Overview/Docs/Examples), stat grid (rating, downloads, version), CTA button." },
      { icon: "🗺️", title: "Map", desc: "Grid-based map canvas with color-coded pins, user location dot with pulse ring, and horizontal place cards." },
      { icon: "📊", title: "ActivityFeed + Stats + History", desc: "Activity log with icon badges; Stats with 2×2 stat grid + 7-day bar chart; History grouped by date." },
      { icon: "🪪", title: "Profile + Edit", desc: "Cover gradient, avatar with edit badge, follower stats, post grid. Edit form with photo change shortcut." },
      { icon: "⚙️", title: "Settings + Privacy + Help", desc: "Grouped list cells; toggle switches for notification prefs; privacy control rows; help search + FAQ list." },
    ],
  },
  {
    id: "deliverables",
    emoji: "📦",
    label: "Deliverables So Far",
    accent: C.sky,
    summary: "3 interactive artifacts built and ready",
    items: [
      { icon: "📋", title: "Project Roadmap", desc: "Full development roadmap with 6 phases (Foundation → Research → Backend → Frontend → Testing → Deployment), tasks, and tech stack breakdown." },
      { icon: "📖", title: "API Documentation", desc: "Interactive HTML docs with sidebar navigation, expandable endpoints, and Parameter / Request / Response tabs for all 18 endpoints." },
      { icon: "🗺️", title: "Frontend Navigation Roadmap", desc: "Visual navigation tree, stack cards with screen lists, modal group, and library references (@react-navigation/native v7)." },
      { icon: "📱", title: "Screen Library", desc: "24 phone-frame mockups with zoom-in overlay, stack filter tabs, and per-stack color coding. Fully interactive React artifact." },
    ],
  },
  {
    id: "next",
    emoji: "🚀",
    label: "Suggested Next Steps",
    accent: C.yellow,
    summary: "What to build next",
    items: [
      { icon: "1️⃣", title: "Laravel Migrations", desc: "Generate migration files for all tables: users, personal_events, holidays, notifications, device_tokens." },
      { icon: "2️⃣", title: "Core Converter Endpoint", desc: "Wire up asorasoft/chhankitek into the /calendar and /convert endpoints with caching and bilingual output." },
      { icon: "3️⃣", title: "React Native Project Init", desc: "Scaffold the RN project with TypeScript, install React Navigation v7, set up the auth stack, and wire the Sanctum token store." },
      { icon: "4️⃣", title: "Calendar UI Component", desc: "Build the main Khmer calendar grid component with month navigation, moon phase indicators, and holiday highlighting." },
      { icon: "5️⃣", title: "Khmer Font & Design Tokens", desc: "Install Noto Serif Khmer, set up the design token file (colors, spacing, typography) and build the shared component library." },
    ],
  },
];

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: `${color}20`, color, border: `1px solid ${color}40`,
      fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function PhaseSection({ phase, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: `1px solid ${open ? phase.accent + "50" : C.border}`,
      borderRadius: 14,
      overflow: "hidden",
      background: C.card,
      transition: "border-color 0.2s",
      boxShadow: open ? `0 0 0 1px ${phase.accent}18, 0 4px 24px ${phase.accent}10` : "none",
    }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 18px", cursor: "pointer",
          background: open ? `${phase.accent}08` : "transparent",
          transition: "background 0.2s",
        }}
      >
        <span style={{ fontSize: 20 }}>{phase.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: open ? phase.accent : C.text, fontFamily: "'DM Mono', monospace", letterSpacing: "0.03em", transition: "color 0.2s" }}>
            {phase.label}
          </div>
          <div style={{ fontSize: 10, color: C.sub, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>
            {phase.summary}
          </div>
        </div>
        <Tag label={`${phase.items.length} items`} color={phase.accent} />
        <span style={{ fontSize: 12, color: C.dim, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </div>

      {/* Body */}
      {open && (
        <div style={{ padding: "4px 18px 18px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {phase.items.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "12px 14px",
                borderRadius: 10, background: C.surface,
                border: "1px solid #242428",
              }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: C.sub, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectSummary() {
  const totalScreens = 24;
  const totalEndpoints = 18;
  const totalNavigators = 6;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "44px 28px 80px" }}>

        {/* Hero */}
        <div style={{
          padding: "28px 28px",
          borderRadius: 18,
          background: `linear-gradient(135deg, ${C.gold}18 0%, ${C.purple}10 50%, ${C.teal}08 100%)`,
          border: `1px solid ${C.gold}30`,
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, fontSize: 120, opacity: 0.04, pointerEvents: "none" }}>🌙</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `linear-gradient(135deg, ${C.gold}, ${C.purple})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0,
            }}>🌙</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'DM Mono', monospace", color: C.text, letterSpacing: "0.02em" }}>
                Khmer Lunar Calendar
              </div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>
                Full-stack mobile app · Laravel + React Native · Project Summary
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              ["📱", totalScreens, "Screens", C.violet],
              ["🔗", totalEndpoints, "API Endpoints", C.orange],
              ["🗺️", totalNavigators, "Navigators", C.teal],
              ["📦", 4, "Artifacts Built", C.gold],
              ["📐", 6, "Dev Phases", C.sky],
            ].map(([ic, v, l, col]) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 14px", borderRadius: 10,
                background: "#0B0B0D", border: `1px solid ${col}30`,
              }}>
                <span style={{ fontSize: 14 }}>{ic}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: col, fontFamily: "'DM Mono', monospace" }}>{v}</span>
                <span style={{ fontSize: 10, color: C.sub }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack row */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {[
            ["Laravel 11", C.orange], ["PHP 8.3", C.orange], ["MySQL", C.orange],
            ["Sanctum Auth", C.orange], ["asorasoft/chhankitek", C.gold],
            ["React Native", C.teal], ["TypeScript", C.teal],
            ["React Navigation v7", C.teal], ["Noto Serif Khmer", C.violet],
          ].map(([t, c]) => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600,
              background: `${c}12`, color: c, border: `1px solid ${c}30`,
              fontFamily: "'DM Mono', monospace",
            }}>{t}</span>
          ))}
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PHASES.map((p, i) => (
            <PhaseSection key={p.id} phase={p} defaultOpen={i === 0} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 40, paddingTop: 24,
          borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <div style={{ fontSize: 11, color: C.dim, fontFamily: "'DM Mono', monospace" }}>
            Last updated · May 2026
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Tag label="Backend ✓" color={C.orange} />
            <Tag label="Frontend ✓" color={C.teal} />
            <Tag label="Screens ✓" color={C.violet} />
            <Tag label="Docs ✓" color={C.gold} />
          </div>
        </div>
      </div>
    </div>
  );
}
