import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, licenseBadge, seatRiskBadge, ProgressBar, Modal, FormField, FormSelect } from "./SharedUI";
import { colleges as initialColleges } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: LICENSES (License Audit)
// ════════════════════════════════════════════════════════════════
export default function LicensesPage({ t }) {
  const [colleges, setColleges] = useState(initialColleges);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ collegeId: colleges[0]?.id || "", licenseType: "Standard", maxSeats: "" });

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.licenseType.toLowerCase().includes(search.toLowerCase())
  );

  const critical = colleges.filter(c => (c.studentsEnrolled / c.maxSeats) * 100 >= 90).length;

  function handleGrantLicense(e) {
    e.preventDefault();
    setColleges(colleges.map(c => c.id === form.collegeId
      ? { ...c, licenseType: form.licenseType, maxSeats: Number(form.maxSeats) || c.maxSeats }
      : c
    ));
    setForm({ collegeId: colleges[0]?.id || "", licenseType: "Standard", maxSeats: "" });
    setModalOpen(false);
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="🔑" label="Licensed Tenants" value={colleges.length}                     change="active audits" color="#6366F1" />
        <StatCard t={t} icon="⚠️" label="Critical Overflow" value={critical}                            change="near capacity" color="#EF4444" />
        <StatCard t={t} icon="📊" label="Fill Rate"        value={`${((colleges.reduce((s, c) => s + c.studentsEnrolled, 0) / colleges.reduce((s, c) => s + c.maxSeats, 0)) * 100).toFixed(1)}%`} change="global average" color="#06B6D4" />
      </div>

      <SectionCard t={t} title="License Audit" action="+ Grant License" onAction={() => setModalOpen(true)} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search college, ID, or license tier..." />
        </div>
        <Table
          t={t}
          cols={["UID", "Institution", "License Plan", "Seat Usage", "Risk", "Tenant Status"]}
          rows={filtered.map(c => {
            const fillRatio = (c.studentsEnrolled / c.maxSeats) * 100;
            return (
              <tr key={c.id} style={{ borderBottom: t.rowBorder }}>
                <TD t={t} color={t.textSecondary}>{c.id}</TD>
                <TD t={t} bold>{c.name}</TD>
                <td style={{ padding: "10px 10px" }}>{licenseBadge(c.licenseType)}</td>
                <td style={{ padding: "10px 10px" }}><ProgressBar t={t} value={c.studentsEnrolled} max={c.maxSeats} color={fillRatio >= 90 ? "#EF4444" : fillRatio >= 75 ? "#F59E0B" : t.accent} /></td>
                <td style={{ padding: "10px 10px" }}>{seatRiskBadge(fillRatio)}</td>
                <td style={{ padding: "10px 10px" }}>{statusBadge(c.status)}</td>
              </tr>
            );
          })}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No institutions found matching your search.</div>
        )}
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Issue & Allocate License Plan" t={t}>
        <form onSubmit={handleGrantLicense}>
          <FormSelect t={t} label="Target Institution" value={form.collegeId} onChange={e => setForm({ ...form, collegeId: e.target.value })}>
            {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </FormSelect>
          <FormSelect t={t} label="Subscription Tier" value={form.licenseType} onChange={e => setForm({ ...form, licenseType: e.target.value })}>
            <option>Basic Trial</option>
            <option>Standard</option>
            <option>Enterprise Premium</option>
          </FormSelect>
          <FormField t={t} label="Allocated Max Seats" type="number" required value={form.maxSeats} onChange={e => setForm({ ...form, maxSeats: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "8px 14px" }}>Cancel</button>
            <button type="submit" style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Grant License</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
