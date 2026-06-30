import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge } from "./SharedUI";
import { users } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: ADMINS / USERS
// ════════════════════════════════════════════════════════════════
export default function AdminsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const roles = ["All", "Student", "Instructor", "Staff"];
  const filtered = users.filter(u =>
    (filter === "All" || u.role === filter) &&
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="👥" label="Total Users"   value={users.length}                                         change="registered" color="#3B6CF4" />
        <StatCard t={t} icon="🎓" label="Students"      value={users.filter(u => u.role === "Student").length}       change="enrolled"   color="#22C55E" />
        <StatCard t={t} icon="👨‍🏫" label="Instructors" value={users.filter(u => u.role === "Instructor").length}    change="teaching"   color="#8B5CF6" />
        <StatCard t={t} icon="🟢" label="Active"        value={users.filter(u => u.status === "Active").length}      change="active now" color="#06B6D4" />
      </div>
      <SectionCard t={t} title="All Users">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search by name..." />
          <div style={{ display: "flex", gap: 6 }}>
            {roles.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["#","Name","Email","Role","College","Joined","Status"]}
          rows={filtered.map(u => (
            <tr key={u.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t}>{u.id}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3B6CF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{u.name.charAt(0)}</div>
                  <span style={{ fontWeight: 600, color: t.textPrimary, fontSize: 12 }}>{u.name}</span>
                </div>
              </td>
              <TD t={t}>{u.email}</TD>
              <TD t={t} color="#8B5CF6">{u.role}</TD>
              <TD t={t}>{u.college}</TD>
              <TD t={t}>{u.joined}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(u.status)}</td>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No users found.</div>
        )}
      </SectionCard>
    </>
  );
}
