import { SectionCard } from "./SharedUI";

// ════════════════════════════════════════════════════════════════
//  PAGE: SETTINGS
// ════════════════════════════════════════════════════════════════
export default function SettingsPage({ t }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <SectionCard t={t} title="Profile Settings">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Full Name", "Admin User"], ["Email", "admin@edu.com"], ["Role", "Administrator"]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{label}</div>
                <input
                  defaultValue={val}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <button style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4, alignSelf: "flex-start" }}>
              Save Changes
            </button>
          </div>
        </SectionCard>

        <SectionCard t={t} title="Notification Preferences">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "Email notifications for new enrollments",
              "Weekly analytics digest",
              "Vendor activity alerts",
              "Report generation completed",
              "System health alerts",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: t.textBody }}>{item}</span>
                <div style={{ width: 36, height: 20, borderRadius: 20, background: i % 2 === 0 ? t.accent : t.chipBg, cursor: "pointer", position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 3, left: i % 2 === 0 ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard t={t} title="Security">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Current Password", "password"], ["New Password", "password"], ["Confirm Password", "password"]].map(([label, type]) => (
              <div key={label}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{label}</div>
                <input
                  type={type}
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <button style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 4, alignSelf: "flex-start" }}>
              Update Password
            </button>
          </div>
        </SectionCard>

        <SectionCard t={t} title="Platform Preferences">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[["Default Language", "English"], ["Timezone", "IST (UTC+5:30)"], ["Date Format", "DD/MM/YYYY"]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>{label}</div>
                <select
                  defaultValue={val}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
                >
                  <option>{val}</option>
                </select>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
