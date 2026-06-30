import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, priorityBadge } from "./SharedUI";
import { pendingReports } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: REPORTS
// ════════════════════════════════════════════════════════════════
export default function ReportsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Completed", "Pending"];
  const filtered = pendingReports.filter(r =>
    (filter === "All" || r.status === filter) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );
  const typeColors = { Enrollment: "#3B6CF4", Progress: "#22C55E", Analytics: "#8B5CF6", Certificate: "#F59E0B" };
  const monthlyReports = [
    { month:"Jan", completed:6,  pending:2 },
    { month:"Feb", completed:8,  pending:3 },
    { month:"Mar", completed:5,  pending:4 },
    { month:"Apr", completed:9,  pending:2 },
    { month:"May", completed:11, pending:1 },
    { month:"Jun", completed:4,  pending:4 },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="📊" label="Total Reports" value={pendingReports.length}                                         change="all time"       color="#3B6CF4" />
        <StatCard t={t} icon="✅" label="Completed"     value={pendingReports.filter(r => r.status === "Completed").length}   change="ready"          color="#22C55E" />
        <StatCard t={t} icon="⏳" label="Pending"       value={pendingReports.filter(r => r.status === "Pending").length}     change="need attention" color="#F59E0B" />
        <StatCard t={t} icon="🔴" label="High Priority" value={pendingReports.filter(r => r.priority === "High").length}      change="urgent"         color="#EF4444" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 14 }}>
        <SectionCard t={t} title="Monthly Report Activity">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyReports} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Bar dataKey="completed" name="Completed" fill="#22C55E" radius={[4,4,0,0]} />
              <Bar dataKey="pending"   name="Pending"   fill="#F59E0B" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {[["Completed","#22C55E"],["Pending","#F59E0B"]].map(([l,c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                <span style={{ color: t.textBody }}>{l}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard t={t} title="Quick Report Cards">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { title: "Enrollment Report", icon: "📋", color: "#3B6CF4" },
              { title: "Attendance Report", icon: "📅", color: "#22C55E" },
              { title: "Progress Report",   icon: "📈", color: "#8B5CF6" },
              { title: "Analytics Export",  icon: "📊", color: "#06B6D4" },
            ].map((q, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: t.chipBg, borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ fontSize: 18 }}>{q.icon}</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: t.textPrimary }}>{q.title}</span>
                <button style={{ fontSize: 10, color: q.color, background: q.color + "18", border: "none", borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontWeight: 600 }}>Generate</button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard t={t} title="All Reports" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search report..." />
          <div style={{ display: "flex", gap: 6 }}>
            {statuses.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["#","Title","Type","By","Due","Priority","Status","Action"]}
          rows={filtered.map(r => (
            <tr key={r.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t}>{r.id}</TD>
              <TD t={t} bold>{r.title}</TD>
              <td style={{ padding: "10px 10px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: (typeColors[r.type] || "#3B6CF4") + "20", color: typeColors[r.type] || "#3B6CF4" }}>{r.type}</span>
              </td>
              <TD t={t}>{r.by}</TD>
              <TD t={t}>{r.due}</TD>
              <td style={{ padding: "10px 10px" }}>{priorityBadge(r.priority)}</td>
              <td style={{ padding: "10px 10px" }}>{statusBadge(r.status)}</td>
              <td style={{ padding: "10px 10px" }}>
                <button style={{ fontSize: 11, color: "#1D4ED8", background: "#DBEAFE", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
                  {r.status === "Completed" ? "⬇ Download" : "👁 View"}
                </button>
              </td>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No reports found.</div>
        )}
      </SectionCard>
    </>
  );
}
