import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, licenseBadge, seatRiskBadge, ProgressBar, Modal, FormField, FormSelect } from "./SharedUI";
import { colleges as initialColleges } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: COLLEGES
// ════════════════════════════════════════════════════════════════
export default function CollegesPage({ t }) {
  const [colleges, setColleges] = useState(initialColleges);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", maxSeats: "", licenseType: "Standard" });

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalEnrolled = colleges.reduce((s, c) => s + c.studentsEnrolled, 0);
  const totalSeats = colleges.reduce((s, c) => s + c.maxSeats, 0);

  function handleOnboard(e) {
    e.preventDefault();
    const id = `C-50${colleges.length + 1}`;
    setColleges([...colleges, {
      id, name: form.name, location: form.location,
      maxSeats: Number(form.maxSeats) || 0, licenseType: form.licenseType,
      trainersCount: 0, studentsEnrolled: 0, status: "Active",
    }]);
    setForm({ name: "", location: "", maxSeats: "", licenseType: "Standard" });
    setModalOpen(false);
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="🏛" label="Total Colleges"  value={colleges.length}                                              change="onboarded"     color="#6366F1" />
        <StatCard t={t} icon="🟢" label="Active"          value={colleges.filter(c => c.status === "Active").length}          change="active tenants" color="#22C55E" />
        <StatCard t={t} icon="👥" label="Students Enrolled" value={totalEnrolled.toLocaleString()}                            change="across colleges" color="#8B5CF6" />
        <StatCard t={t} icon="📊" label="Fill Capacity"   value={`${((totalEnrolled / totalSeats) * 100).toFixed(1)}%`}        change="global average" color="#06B6D4" />
      </div>

      <SectionCard t={t} title="Institutional Tenants" action="+ Onboard College" onAction={() => setModalOpen(true)} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search college name or ID..." />
        </div>
        <Table
          t={t}
          cols={["UID", "Institution", "License Plan", "Seats", "Risk", "Status"]}
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
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No institutions found.</div>
        )}
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Register B2B College Account" t={t}>
        <form onSubmit={handleOnboard}>
          <FormField t={t} label="Institution Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <FormField t={t} label="Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <FormField t={t} label="Allocated Seats" type="number" required value={form.maxSeats} onChange={e => setForm({ ...form, maxSeats: e.target.value })} />
          <FormSelect t={t} label="License Type" value={form.licenseType} onChange={e => setForm({ ...form, licenseType: e.target.value })}>
            <option>Basic Trial</option>
            <option>Standard</option>
            <option>Enterprise Premium</option>
          </FormSelect>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "8px 14px" }}>Cancel</button>
            <button type="submit" style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Activate Tenant</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
