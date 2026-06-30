import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import {
  StatCard, MonitorCard, SectionCard, SectionDivider, TD, Table, priorityBadge,
} from "./SharedUI";
import {
  enrollmentData, completionTrend, courseStatusData, COURSE_COLORS,
  monitoringStats, recentActivities, topCourses, pendingReports,
} from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: DASHBOARD
// ════════════════════════════════════════════════════════════════
export default function DashboardPage({ t }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
        <StatCard t={t} icon="👥" label="Total Users"       value="12,480" change="+5.1% registered"  color="#3B6CF4" />
        <StatCard t={t} icon="📚" label="Active Courses"    value="348"    change="+2.3% published"   color="#8B5CF6" />
        <StatCard t={t} icon="📋" label="Total Enrollments" value="28,940" change="+11% all time"     color="#06B6D4" />
        <StatCard t={t} icon="📄" label="Pending Reports"   value="14"     change="need review"       color="#F59E0B" />
      </div>

      <SectionDivider t={t} label="Monitoring Overview" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
        {monitoringStats.map(item => <MonitorCard key={item.label} item={item} t={t} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 14 }}>
        <SectionCard t={t} title="Enrollment Graph — Last 6 Months" action="Download CSV">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={enrollmentData} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Bar dataKey="value" fill="#3B6CF4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard t={t} title="Course Status Breakdown">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={courseStatusData} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                {courseStatusData.map((_, i) => <Cell key={i} fill={COURSE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 8px", marginTop: 4 }}>
            {courseStatusData.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COURSE_COLORS[i], flexShrink: 0 }} />
                <span style={{ color: t.textBody }}>{s.name} <strong>{s.value}%</strong></span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ marginBottom: 14 }}>
        <SectionCard t={t} title="Completion vs Pending vs Dropped — Trend">
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={completionTrend} margin={{ top: 4, right: 16, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2} dot={false} name="Completed" />
              <Line type="monotone" dataKey="pending"   stroke="#F59E0B" strokeWidth={2} dot={false} name="Pending" />
              <Line type="monotone" dataKey="dropped"   stroke="#EF4444" strokeWidth={2} dot={false} name="Dropped" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
            {[["Completed","#22C55E"],["Pending","#F59E0B"],["Dropped","#EF4444"]].map(([l,c]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
                <div style={{ width: 16, height: 3, background: c, borderRadius: 2 }} />
                <span style={{ color: t.textBody, fontWeight: 500 }}>{l}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div style={{ marginBottom: 14 }}>
        <SectionCard t={t} title="Top Courses — Completion Monitoring" action="View All">
          <Table
            t={t}
            cols={["Course Name","Enrolled","Completed","Pending","Dropped","Completion Rate"]}
            rows={topCourses.map((c, i) => (
              <tr key={i} style={{ borderBottom: t.rowBorder }}>
                <TD t={t} bold>{c.name}</TD>
                <TD t={t} color="#3B6CF4">{c.enrolled.toLocaleString()}</TD>
                <TD t={t} color="#22C55E">{c.completed.toLocaleString()}</TD>
                <TD t={t} color="#F59E0B">{c.pending}</TD>
                <TD t={t} color="#EF4444">{c.dropped}</TD>
                <td style={{ padding: "10px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: t.gridLine, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${c.rate}%`, height: "100%", background: "#22C55E", borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary, flexShrink: 0, minWidth: 28 }}>{c.rate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          />
        </SectionCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, paddingBottom: 20 }}>
        <SectionCard t={t} title="Recent Activities" action="View All">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentActivities.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: t.textSecondary, marginTop: 1 }}>{a.sub}</div>
                </div>
                <div style={{ fontSize: 10, color: t.textSecondary, flexShrink: 0, marginTop: 2 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </SectionCard>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <SectionCard t={t} title="Users Overview" action="Manage">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[{ label: "Students", value: "9,840", color: "#3B6CF4" }, { label: "Instructors", value: "892", color: "#22C55E" }, { label: "Staff", value: "1,748", color: "#8B5CF6" }].map(u => (
                <div key={u.label} style={{ background: t.chipBg, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: u.color }}>{u.value}</div>
                  <div style={{ fontSize: 10, color: t.textSecondary, marginTop: 3, fontWeight: 600 }}>{u.label}</div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard t={t} title="Pending Reports" action="View All">
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {pendingReports.filter(r => r.status === "Pending").slice(0, 4).map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: t.textSecondary, marginTop: 1 }}>{r.by} · Due {r.due}</div>
                  </div>
                  {priorityBadge(r.priority)}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
