import { useState } from "react";

const roadmapData = {
  navigators: [
    {
      id: "root",
      name: "Root Navigator",
      type: "Stack",
      color: "#0A0A0A",
      accent: "#FF6B35",
      children: ["auth", "main"],
    },
    {
      id: "auth",
      name: "Auth Navigator",
      type: "Stack",
      color: "#111",
      accent: "#FF6B35",
      screens: [
        { name: "Splash", icon: "⚡", desc: "Boot screen & asset loading" },
        { name: "Onboarding", icon: "👋", desc: "Feature walkthrough slides" },
        { name: "Login", icon: "🔑", desc: "Email / social sign-in" },
        { name: "Register", icon: "📝", desc: "Account creation form" },
        { name: "ForgotPassword", icon: "🔒", desc: "Password reset flow" },
        { name: "OTPVerify", icon: "📱", desc: "SMS / email verification" },
      ],
    },
    {
      id: "main",
      name: "Main Navigator",
      type: "Tab",
      color: "#111",
      accent: "#4ECDC4",
      children: ["home", "explore", "activity", "profile"],
    },
    {
      id: "home",
      name: "Home Stack",
      type: "Stack",
      color: "#111",
      accent: "#4ECDC4",
      tab: { icon: "🏠", label: "Home" },
      screens: [
        { name: "Feed", icon: "📰", desc: "Main content feed" },
        { name: "PostDetail", icon: "📄", desc: "Single post view" },
        { name: "Comments", icon: "💬", desc: "Comment thread modal" },
        { name: "Notifications", icon: "🔔", desc: "Alerts & updates" },
      ],
    },
    {
      id: "explore",
      name: "Explore Stack",
      type: "Stack",
      color: "#111",
      accent: "#FFE66D",
      tab: { icon: "🔍", label: "Explore" },
      screens: [
        { name: "Search", icon: "🔎", desc: "Search & discovery" },
        { name: "Category", icon: "📂", desc: "Browseable categories" },
        { name: "Results", icon: "📋", desc: "Search results list" },
        { name: "ItemDetail", icon: "🔬", desc: "Deep item view" },
        { name: "Map", icon: "🗺️", desc: "Location-based view" },
      ],
    },
    {
      id: "activity",
      name: "Activity Stack",
      type: "Stack",
      color: "#111",
      accent: "#A8DADC",
      tab: { icon: "⚡", label: "Activity" },
      screens: [
        { name: "ActivityFeed", icon: "📊", desc: "Recent actions log" },
        { name: "Stats", icon: "📈", desc: "Analytics dashboard" },
        { name: "History", icon: "🕐", desc: "Historical records" },
      ],
    },
    {
      id: "profile",
      name: "Profile Stack",
      type: "Stack",
      color: "#111",
      accent: "#C77DFF",
      tab: { icon: "👤", label: "Profile" },
      screens: [
        { name: "Profile", icon: "🪪", desc: "User profile overview" },
        { name: "EditProfile", icon: "✏️", desc: "Edit info & avatar" },
        { name: "Settings", icon: "⚙️", desc: "App preferences" },
        { name: "Notifications Settings", icon: "🔔", desc: "Alert preferences" },
        { name: "Privacy", icon: "🛡️", desc: "Privacy & data controls" },
        { name: "Help", icon: "❓", desc: "Support & FAQs" },
      ],
    },
  ],
  modals: [
    { name: "Camera", icon: "📷", desc: "Photo / video capture" },
    { name: "ImagePicker", icon: "🖼️", desc: "Gallery selection" },
    { name: "ShareSheet", icon: "📤", desc: "Native share flow" },
    { name: "FilterDrawer", icon: "🎛️", desc: "Filter / sort bottom sheet" },
    { name: "ConfirmDialog", icon: "✅", desc: "Destructive action gate" },
    { name: "Toast / Snackbar", icon: "💡", desc: "Non-blocking feedback" },
  ],
};

const typeColors = {
  Stack: { bg: "#1A1A1A", border: "#333", badge: "#FF6B35" },
  Tab: { bg: "#161616", border: "#2A2A2A", badge: "#4ECDC4" },
  Modal: { bg: "#131313", border: "#252525", badge: "#C77DFF" },
};

function ScreenPill({ screen, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 14px",
        borderRadius: 8,
        background: hovered ? `${accent}15` : "#1C1C1C",
        border: `1px solid ${hovered ? accent + "50" : "#2A2A2A"}`,
        cursor: "default",
        transition: "all 0.18s ease",
      }}
    >
      <span style={{ fontSize: 15 }}>{screen.icon}</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#E8E8E8", fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em" }}>
          {screen.name}
        </div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>
          {screen.desc}
        </div>
      </div>
    </div>
  );
}

function NavigatorCard({ nav, isActive, onClick }) {
  const tc = typeColors[nav.type] || typeColors.Stack;
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "#1E1E1E" : tc.bg,
        border: `1px solid ${isActive ? nav.accent + "70" : tc.border}`,
        borderRadius: 12,
        padding: "14px 18px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isActive ? `0 0 0 1px ${nav.accent}40, 0 4px 24px ${nav.accent}15` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: nav.screens ? 14 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {nav.tab && (
            <span style={{
              fontSize: 18,
              background: `${nav.accent}20`,
              padding: "4px 8px",
              borderRadius: 6,
            }}>{nav.tab.icon}</span>
          )}
          <div>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: isActive ? nav.accent : "#D0D0D0",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}>
              {nav.name}
            </div>
            {nav.tab && (
              <div style={{ fontSize: 11, color: "#555", fontFamily: "'DM Sans', sans-serif", marginTop: 1 }}>
                Tab: "{nav.tab.label}"
              </div>
            )}
          </div>
        </div>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.12em",
          padding: "3px 8px",
          borderRadius: 4,
          background: `${nav.accent}20`,
          color: nav.accent,
          fontFamily: "'DM Mono', monospace",
          border: `1px solid ${nav.accent}30`,
        }}>
          {nav.type.toUpperCase()}
        </span>
      </div>

      {nav.screens && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {nav.screens.map((s) => (
            <ScreenPill key={s.name} screen={s} accent={nav.accent} />
          ))}
        </div>
      )}

      {nav.children && (
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {nav.children.map((c) => (
            <span key={c} style={{
              fontSize: 11,
              color: "#888",
              background: "#222",
              border: "1px solid #333",
              padding: "3px 10px",
              borderRadius: 20,
              fontFamily: "'DM Mono', monospace",
            }}>
              → {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RNRoadmap() {
  const [activeNav, setActiveNav] = useState("home");

  const mainNavigators = roadmapData.navigators.filter(n => !["root", "main"].includes(n.id));
  const rootNav = roadmapData.navigators.find(n => n.id === "root");
  const mainNav = roadmapData.navigators.find(n => n.id === "main");

  const totalScreens = roadmapData.navigators.reduce((acc, n) => acc + (n.screens?.length || 0), 0);
  const totalModals = roadmapData.modals.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      color: "#E8E8E8",
      fontFamily: "'DM Sans', sans-serif",
      padding: "40px 32px",
      maxWidth: 1100,
      margin: "0 auto",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 12,
        }}>
          <div style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #FF6B35, #FF3366)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}>📱</div>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.02em",
              color: "#F0F0F0",
            }}>
              Frontend Roadmap
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#666", marginTop: 2 }}>
              React Native · Navigation Architecture
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { label: "Navigators", value: roadmapData.navigators.length, color: "#FF6B35" },
            { label: "Screens", value: totalScreens, color: "#4ECDC4" },
            { label: "Modals / Overlays", value: totalModals, color: "#C77DFF" },
            { label: "Tab Items", value: 4, color: "#FFE66D" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px 18px",
              background: "#111",
              border: "1px solid #222",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>
                {s.value}
              </span>
              <span style={{ fontSize: 12, color: "#666" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <div style={{ marginBottom: 36 }}>
        <SectionLabel label="NAVIGATION TREE" />
        <div style={{
          background: "#0F0F0F",
          border: "1px solid #1E1E1E",
          borderRadius: 12,
          padding: 24,
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: "#888",
          lineHeight: 1.9,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "30%",
            background: "linear-gradient(90deg, transparent, #0F0F0F80)",
            pointerEvents: "none",
          }} />
          <TreeLine depth={0} label="RootNavigator" type="Stack" color="#FF6B35" />
          <TreeLine depth={1} label="AuthNavigator" type="Stack" color="#FF9F1C" note="6 screens" />
          <TreeLine depth={1} label="MainNavigator" type="Tab" color="#4ECDC4" />
          <TreeLine depth={2} label="HomeStack" type="Stack" color="#4ECDC4" note="4 screens" />
          <TreeLine depth={2} label="ExploreStack" type="Stack" color="#FFE66D" note="5 screens" />
          <TreeLine depth={2} label="ActivityStack" type="Stack" color="#A8DADC" note="3 screens" />
          <TreeLine depth={2} label="ProfileStack" type="Stack" color="#C77DFF" note="6 screens" />
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #1E1E1E" }}>
            <TreeLine depth={0} label="Modal Group" type="Modal" color="#C77DFF" note="6 overlays · global" />
          </div>
        </div>
      </div>

      {/* Root & Main */}
      <div style={{ marginBottom: 28 }}>
        <SectionLabel label="ROOT & TAB NAVIGATORS" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <NavigatorCard nav={rootNav} isActive={activeNav === rootNav.id} onClick={() => setActiveNav(rootNav.id)} />
          <NavigatorCard nav={mainNav} isActive={activeNav === mainNav.id} onClick={() => setActiveNav(mainNav.id)} />
        </div>
      </div>

      {/* Stack Navigators */}
      <div style={{ marginBottom: 36 }}>
        <SectionLabel label="STACK NAVIGATORS" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {mainNavigators.map(nav => (
            <NavigatorCard
              key={nav.id}
              nav={nav}
              isActive={activeNav === nav.id}
              onClick={() => setActiveNav(nav.id)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <div>
        <SectionLabel label="MODALS & OVERLAYS" />
        <div style={{
          background: "#0F0F0F",
          border: "1px solid #1E1E1E",
          borderRadius: 12,
          padding: 18,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {roadmapData.modals.map(m => (
              <ScreenPill key={m.name} screen={m} accent="#C77DFF" />
            ))}
          </div>
          <div style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid #1E1E1E",
            fontSize: 11,
            color: "#555",
            fontFamily: "'DM Mono', monospace",
          }}>
            ↑ Registered as presentation: "modal" or bottom-sheet in Root Stack
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: "1px solid #1A1A1A",
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
        fontSize: 11,
        color: "#444",
        fontFamily: "'DM Mono', monospace",
      }}>
        {[
          ["Library", "@react-navigation/native v7"],
          ["Stack", "@react-navigation/native-stack"],
          ["Tabs", "@react-navigation/bottom-tabs"],
          ["Platform", "iOS · Android · Web"],
        ].map(([k, v]) => (
          <div key={k}>
            <span style={{ color: "#555" }}>{k}: </span>
            <span style={{ color: "#666" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.18em",
      color: "#444",
      fontFamily: "'DM Mono', monospace",
      marginBottom: 12,
      paddingLeft: 2,
    }}>
      {label}
    </div>
  );
}

function TreeLine({ depth, label, type, color, note }) {
  const typeShort = { Stack: "STK", Tab: "TAB", Modal: "MOD" }[type] || type;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: depth * 20 }}>
      <span style={{ color: "#2A2A2A" }}>
        {depth > 0 ? "└─ " : ""}
      </span>
      <span style={{ color }}>{label}</span>
      <span style={{
        fontSize: 9,
        padding: "1px 5px",
        borderRadius: 3,
        background: `${color}18`,
        color: `${color}99`,
        border: `1px solid ${color}25`,
      }}>{typeShort}</span>
      {note && <span style={{ color: "#444", fontSize: 11 }}>· {note}</span>}
    </div>
  );
}
