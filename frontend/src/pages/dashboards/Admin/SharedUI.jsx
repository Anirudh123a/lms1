// ════════════════════════════════════════════════════════════════
//  SHARED UI — theme tokens + reusable components
// ════════════════════════════════════════════════════════════════

// ── Theme Tokens (light / dark) ──────────────────────────────────
export function getTokens(isDark) {
  return {
    pageBg:        isDark ? "#0B0420"                    : "#F8FAFC",
    sidebarBg:     isDark ? "#16062B"                    : "#0F172A",
    sidebarBorder: isDark ? "rgba(255,255,255,0.08)"     : "#1E293B",
    navActiveBg:   isDark ? "rgba(98,62,152,0.4)"        : "#1E40AF",
    navActiveBorder: isDark ? "#9B75C9"                  : "#60A5FA",
    navInactive:   isDark ? "#A692C4"                    : "#94A3B8",
    cardBg:        isDark ? "rgba(50,14,94,0.4)"         : "#fff",
    cardBorder:    isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
    textPrimary:   isDark ? "#fff"                       : "#0F172A",
    textSecondary: isDark ? "#A692C4"                    : "#94A3B8",
    textBody:      isDark ? "#CBB6E6"                    : "#475569",
    topBarBg:      isDark ? "rgba(22,6,43,0.6)"          : "#F8FAFC",
    topBarBorder:  isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E2E8F0",
    inputBg:       isDark ? "rgba(255,255,255,0.05)"     : "#fff",
    inputBorder:   isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E2E8F0",
    chipBg:        isDark ? "rgba(255,255,255,0.05)"     : "#F1F5F9",
    rowBorder:     isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #F8FAFC",
    gridLine:      isDark ? "rgba(255,255,255,0.05)"     : "#F1F5F9",
    accent:        "#3B6CF4",
  };
}

// ── Stat Card ────────────────────────────────────────────────────
export function StatCard({ icon, label, value, change, color, t }) {
  return (
    <div style={{ background: t.cardBg, borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderTop: `3px solid ${color}`, border: t.cardBorder, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: t.textSecondary, textTransform: "uppercase" }}>{label}</span>
        <div style={{ background: color + "18", borderRadius: 8, width: 30, height: 30, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: t.textPrimary, marginTop: 8, letterSpacing: -1 }}>{value}</div>
      {change && <div style={{ fontSize: 11, marginTop: 3, color: t.textSecondary, fontWeight: 500 }}>{change}</div>}
    </div>
  );
}

// ── Monitor Card ─────────────────────────────────────────────────
export function MonitorCard({ item, t }) {
  const isPositive = item.change.startsWith("+");
  return (
    <div style={{ background: t.cardBg, borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", borderLeft: `4px solid ${item.color}`, border: t.cardBorder, minWidth: 0, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ background: item.bg, borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8 }}>{item.label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: t.textPrimary, letterSpacing: -0.5, marginTop: 2 }}>{item.value}</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: isPositive ? "#22C55E" : "#EF4444", background: isPositive ? "#F0FDF4" : "#FEF2F2", padding: "3px 8px", borderRadius: 20, flexShrink: 0 }}>{item.change}</div>
    </div>
  );
}

// ── Section Card ─────────────────────────────────────────────────
export function SectionCard({ title, children, action, style, t }) {
  return (
    <div style={{ background: t.cardBg, borderRadius: 12, padding: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", border: t.cardBorder, minWidth: 0, ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: t.textPrimary }}>{title}</h3>
        {action && <button style={{ fontSize: 12, color: t.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>{action}</button>}
      </div>
      {children}
    </div>
  );
}

// ── Table Cell ───────────────────────────────────────────────────
export function TD({ children, bold, color, t }) {
  return (
    <td style={{ padding: "10px 10px", color: bold ? t.textPrimary : (color || t.textBody), fontWeight: bold ? 600 : 400 }}>
      {children}
    </td>
  );
}

// ── Badge ────────────────────────────────────────────────────────
export function Badge({ label, color, bg }) {
  return <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: bg, color }}>{label}</span>;
}

export function statusBadge(status) {
  const map = {
    Active:     { color: "#1D4ED8", bg: "#DBEAFE" },
    Completed:  { color: "#15803D", bg: "#DCFCE7" },
    Completing: { color: "#15803D", bg: "#DCFCE7" },
    Pending:    { color: "#B45309", bg: "#FEF3C7" },
    Inactive:   { color: "#64748B", bg: "#F1F5F9" },
    Dropped:    { color: "#B91C1C", bg: "#FEE2E2" },
  };
  const s = map[status] || { color: "#64748B", bg: "#F1F5F9" };
  return <Badge label={status} color={s.color} bg={s.bg} />;
}

export function priorityBadge(priority) {
  const map = {
    High:   { color: "#B91C1C", bg: "#FEE2E2" },
    Medium: { color: "#B45309", bg: "#FEF3C7" },
    Low:    { color: "#15803D", bg: "#DCFCE7" },
  };
  const p = map[priority] || { color: "#64748B", bg: "#F1F5F9" };
  return <Badge label={priority} color={p.color} bg={p.bg} />;
}

export function planBadge(plan) {
  const map = {
    Institutional: { color: "#1D4ED8", bg: "#DBEAFE" },
    Enterprise:    { color: "#15803D", bg: "#DCFCE7" },
    Business:      { color: "#7C3AED", bg: "#EDE9FE" },
    Premium:       { color: "#B45309", bg: "#FEF3C7" },
    Starter:       { color: "#64748B", bg: "#F1F5F9" },
  };
  const p = map[plan] || { color: "#64748B", bg: "#F1F5F9" };
  return <Badge label={plan} color={p.color} bg={p.bg} />;
}

// ── Table ────────────────────────────────────────────────────────
export function Table({ cols, rows, t }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: t.rowBorder }}>
            {cols.map(c => (
              <th key={c} style={{ padding: "6px 10px", textAlign: "left", color: t.textSecondary, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// ── Search Bar ───────────────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, background: t.inputBg, border: t.inputBorder, borderRadius: 8, padding: "7px 12px", width: 220 }}>
      <span style={{ color: "#94A3B8", fontSize: 13 }}>🔍</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || "Search..."} style={{ border: "none", outline: "none", fontSize: 12, color: t.textPrimary, background: "none", width: "100%" }} />
    </div>
  );
}

// ── Section Divider ───────────────────────────────────────────────
export function SectionDivider({ label, t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{ width: 4, height: 20, background: t.accent, borderRadius: 4 }} />
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: t.textPrimary }}>{label}</h2>
      <div style={{ flex: 1, height: 1, background: t.gridLine }} />
    </div>
  );
}
