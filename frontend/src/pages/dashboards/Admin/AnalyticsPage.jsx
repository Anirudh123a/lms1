import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge } from "./SharedUI";
import { courses, enrollments } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: ANALYTICS (Courses)
// ════════════════════════════════════════════════════════════════
export default function AnalyticsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Active", "Completing"];
  const filtered = courses.filter(c =>
    (filter === "All" || c.status === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="📚" label="Total Courses"  value={courses.length}                                           change="all colleges"  color="#3B6CF4" />
        <StatCard t={t} icon="🟢" label="Active"         value={courses.filter(c => c.status === "Active").length}        change="in delivery"   color="#22C55E" />
        <StatCard t={t} icon="✅" label="Completing"     value={courses.filter(c => c.status === "Completing").length}    change="wrapping up"   color="#06B6D4" />
        <StatCard t={t} icon="👥" label="Total Enrolled" value={courses.reduce((s, c) => s + c.enrolled, 0).toLocaleString()} change="across all" color="#8B5CF6" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 14 }}>
        <SectionCard t={t} title="Completion Rate by Course">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={courses.map(c => ({ name: c.name.split(" ").slice(0,2).join(" "), rate: c.completion }))} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Bar dataKey="rate" name="Completion %" fill="#3B6CF4" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard t={t} title="Enrollment per Course">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
            {courses.map((c, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: t.textPrimary, fontWeight: 600 }}>{c.name.split(" ").slice(0,2).join(" ")}</span>
                  <span style={{ color: "#3B6CF4", fontWeight: 700 }}>{c.enrolled.toLocaleString()}</span>
                </div>
                <div style={{ height: 5, background: t.gridLine, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${c.completion}%`, height: "100%", background: "#3B6CF4", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <SectionCard t={t} title="All Courses" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search course..." />
          <div style={{ display: "flex", gap: 6 }}>
            {statuses.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["Course Name","College","Instructor","Modules","Duration","Enrolled","Completion","Status"]}
          rows={filtered.map(c => (
            <tr key={c.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t} bold>{c.name}</TD>
              <TD t={t}>{c.college}</TD>
              <TD t={t}>{c.instructor}</TD>
              <TD t={t} color="#8B5CF6">{c.modules}</TD>
              <TD t={t}>{c.duration}</TD>
              <TD t={t} color="#3B6CF4">{c.enrolled.toLocaleString()}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 60, height: 5, background: t.gridLine, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${c.completion}%`, height: "100%", background: "#22C55E", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary }}>{c.completion}%</span>
                </div>
              </td>
              <td style={{ padding: "10px 10px" }}>{statusBadge(c.status)}</td>
            </tr>
          ))}
        />
      </SectionCard>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE: ENROLLMENTS (named export — used in Layout.jsx)
// ════════════════════════════════════════════════════════════════
export function EnrollmentsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Active", "Completed", "Pending", "Dropped"];
  const filtered = enrollments.filter(e =>
    (filter === "All" || e.status === filter) &&
    e.student.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="📋" label="Total Enrollments" value={enrollments.length}                                              change="all time"    color="#3B6CF4" />
        <StatCard t={t} icon="🟢" label="Active"            value={enrollments.filter(e => e.status === "Active").length}           change="in progress" color="#22C55E" />
        <StatCard t={t} icon="✅" label="Completed"         value={enrollments.filter(e => e.status === "Completed").length}        change="finished"    color="#06B6D4" />
        <StatCard t={t} icon="❌" label="Dropped"           value={enrollments.filter(e => e.status === "Dropped").length}          change="discontinued" color="#EF4444" />
      </div>
      <SectionCard t={t} title="All Enrollments" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search student..." />
          <div style={{ display: "flex", gap: 6 }}>
            {statuses.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["#","Student","Course","College","Enrolled On","Progress","Status"]}
          rows={filtered.map(e => (
            <tr key={e.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t}>{e.id}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3B6CF4", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{e.student.charAt(0)}</div>
                  <span style={{ fontWeight: 600, color: t.textPrimary, fontSize: 12 }}>{e.student}</span>
                </div>
              </td>
              <TD t={t}>{e.course}</TD>
              <TD t={t}>{e.college}</TD>
              <TD t={t}>{e.date}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 70, height: 5, background: t.gridLine, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${e.progress}%`, height: "100%", background: e.progress === 100 ? "#22C55E" : e.progress > 50 ? "#3B6CF4" : "#F59E0B", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: t.textBody }}>{e.progress}%</span>
                </div>
              </td>
              <td style={{ padding: "10px 10px" }}>{statusBadge(e.status)}</td>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No enrollments found.</div>
        )}
      </SectionCard>
    </>
  );
}
