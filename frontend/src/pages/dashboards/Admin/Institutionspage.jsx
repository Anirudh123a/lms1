import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, planBadge } from "./SharedUI";
import { colleges } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: INSTITUTIONS (Colleges)
// ════════════════════════════════════════════════════════════════
export default function InstitutionsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const plans = ["All", "Institutional", "Premium"];
  const filtered = colleges.filter(c =>
    (filter === "All" || c.plan === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="🎓" label="Total Colleges"      value={colleges.length}                                                   change="institutions"    color="#3B6CF4" />
        <StatCard t={t} icon="🟢" label="Active"              value={colleges.filter(c => c.status === "Active").length}                change="subscribed"      color="#22C55E" />
        <StatCard t={t} icon="📋" label="Institutional Plans" value={colleges.filter(c => c.plan === "Institutional").length}           change="enterprise tier" color="#8B5CF6" />
        <StatCard t={t} icon="👥" label="Total Students"      value={colleges.reduce((s, c) => s + c.students, 0).toLocaleString()}     change="across all"      color="#06B6D4" />
      </div>
      <SectionCard t={t} title="All Colleges" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search college..." />
          <div style={{ display: "flex", gap: 6 }}>
            {plans.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["#","College Name","Plan","Courses","Students","Revenue","Status"]}
          rows={filtered.map(c => (
            <tr key={c.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t}>{c.id}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#3B6CF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{c.name.charAt(0)}</div>
                  <span style={{ fontWeight: 600, color: t.textPrimary, fontSize: 12 }}>{c.name}</span>
                </div>
              </td>
              <td style={{ padding: "10px 10px" }}>{planBadge(c.plan)}</td>
              <TD t={t} color="#8B5CF6">{c.courses}</TD>
              <TD t={t} color="#3B6CF4">{c.students.toLocaleString()}</TD>
              <TD t={t} color="#22C55E">{c.revenue}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(c.status)}</td>
            </tr>
          ))}
        />
      </SectionCard>
    </>
  );
}
