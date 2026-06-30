// ════════════════════════════════════════════════════════════════
//  CREATE ADMIN MODAL
// ════════════════════════════════════════════════════════════════

/**
 * Props:
 *   open    {boolean}  — controls visibility
 *   onClose {fn}       — called when modal should close
 *   onSave  {fn(data)} — called with the new admin data object
 *   t       {object}   — theme tokens from getTokens()
 */
import { useState } from "react";

export default function CreateAdminModal({ open, onClose, onSave, t }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Admin", college: "", status: "Active" });

  if (!open) return null;

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    onSave?.({ ...form, id: Date.now(), joined: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) });
    setForm({ name: "", email: "", role: "Admin", college: "", status: "Active" });
    onClose?.();
  };

  return (
    /* Overlay */
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: t.cardBg, borderRadius: 16, padding: "28px 28px 24px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", border: t.cardBorder }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: t.textPrimary }}>Create Admin</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: t.textSecondary, lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Full Name",  key: "name",    placeholder: "e.g. Arjun Mehta",       type: "text"  },
            { label: "Email",      key: "email",   placeholder: "e.g. arjun@edu.com",     type: "email" },
            { label: "College",    key: "college", placeholder: "e.g. MIT OpenCourseWare", type: "text"  },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 5 }}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 5 }}>Role</label>
            <select
              value={form.role}
              onChange={e => set("role", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
            >
              {["Admin", "Instructor", "Staff"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: t.textSecondary, textTransform: "uppercase", letterSpacing: 0.8, display: "block", marginBottom: 5 }}>Status</label>
            <select
              value={form.status}
              onChange={e => set("status", e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: t.inputBorder, background: t.inputBg, color: t.textPrimary, fontSize: 13, outline: "none", boxSizing: "border-box" }}
            >
              {["Active", "Pending", "Inactive"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ padding: "9px 20px", borderRadius: 8, border: t.inputBorder, background: t.chipBg, color: t.textBody, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: t.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
}
