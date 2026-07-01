import { StatCard, SectionCard, Table, TD, ProgressBar, statusBadge } from "./SharedUI";
import { stats, contractPipelines } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: OVERVIEW
// ════════════════════════════════════════════════════════════════
export default function OverviewPage({ t }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="📚" label="Total Courses"   value={stats.totalCourses}                              change="published" color="#6366F1" />
        <StatCard t={t} icon="👥" label="Total Students"  value={stats.totalStudents.toLocaleString()}            change="enrolled"  color="#8B5CF6" />
        <StatCard t={t} icon="💰" label="Total Revenue"   value={`₹${stats.totalRevenue.toLocaleString()}`}       change="all time"  color="#22C55E" />
        <StatCard t={t} icon="🏛" label="Colleges"        value={stats.totalCollegesBought}                       change="onboarded" color="#06B6D4" />
        <StatCard t={t} icon="🧑‍🏫" label="Trainers"       value={stats.totalTrainersDeployed}                     change="deployed"  color="#F59E0B" />
      </div>

      <SectionCard t={t} title="Institutional License Lifecycle" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contractPipelines.map(c => (
            <div key={c.id} style={{ border: t.cardBorder !== "none" ? t.cardBorder : `1px solid ${t.gridLine}`, borderRadius: 10, padding: 14, display: "grid", gridTemplateColumns: "2fr 1.3fr 1fr 1fr", gap: 14, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: t.textPrimary }}>{c.name}</span>
                  {statusBadge(c.status)}
                </div>
                <div style={{ fontSize: 11, color: t.textSecondary, marginTop: 3 }}>
                  Plan: <strong style={{ color: t.textBody }}>{c.plan}</strong> &nbsp;•&nbsp; MRR: <strong style={{ color: t.accent }}>₹{c.mrr.toLocaleString()}</strong>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textSecondary, marginBottom: 3, textTransform: "uppercase", fontWeight: 700 }}>Seat Usage</div>
                <ProgressBar t={t} value={c.seatsUsed} max={c.maxSeats} color={c.seatsUsed / c.maxSeats > 0.9 ? "#EF4444" : c.seatsUsed / c.maxSeats > 0.75 ? "#F59E0B" : t.accent} width={110} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: t.textSecondary, textTransform: "uppercase", fontWeight: 700 }}>Contract End</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: t.textPrimary }}>{c.expiryDate}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.daysLeft <= 7 ? "#EF4444" : c.daysLeft <= 30 ? "#D97706" : "#10B981" }}>{c.daysLeft} days left</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button style={{ background: "none", border: `1px solid ${t.gridLine}`, borderRadius: 6, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: t.textBody, cursor: "pointer" }}>Send Notice</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
