import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { MonitorCard, SectionCard } from "./SharedUI";
import { monitoringStats, enrollmentData, completionTrend } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: MONITORING
// ════════════════════════════════════════════════════════════════
export default function MonitoringPage({ t }) {
  const systemHealth = [
    { name: "API Gateway",     uptime: "99.98%", status: "Operational" },
    { name: "Auth Service",    uptime: "99.95%", status: "Operational" },
    { name: "Video CDN",       uptime: "97.20%", status: "Degraded"    },
    { name: "DB Cluster",      uptime: "99.99%", status: "Operational" },
    { name: "Email Service",   uptime: "98.50%", status: "Operational" },
    { name: "Storage Service", uptime: "99.91%", status: "Operational" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
        {monitoringStats.map(item => <MonitorCard key={item.label} item={item} t={t} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <SectionCard t={t} title="System Health">
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {systemHealth.map(s => (
              <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.status === "Operational" ? "#22C55E" : "#F59E0B", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: t.textBody, fontWeight: 500 }}>{s.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "#64748B" }}>{s.uptime}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: s.status === "Operational" ? "#F0FDF4" : "#FFFBEB", color: s.status === "Operational" ? "#16A34A" : "#D97706" }}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard t={t} title="Enrollment Trend">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={enrollmentData} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#3B6CF4" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
      <SectionCard t={t} title="Completion vs Pending vs Dropped" style={{ paddingBottom: 20 }}>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={completionTrend} margin={{ top: 4, right: 16, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={t.gridLine} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
            <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2} dot={false} name="Completed" />
            <Line type="monotone" dataKey="pending"   stroke="#F59E0B" strokeWidth={2} dot={false} name="Pending"   />
            <Line type="monotone" dataKey="dropped"   stroke="#EF4444" strokeWidth={2} dot={false} name="Dropped"   />
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
    </>
  );
}
