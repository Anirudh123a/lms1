import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, Modal, FormField, FormSelect } from "./SharedUI";
import { trainers as initialTrainers, colleges } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: TRAINERS
// ════════════════════════════════════════════════════════════════
export default function TrainersPage({ t }) {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", organization: colleges[0]?.name || "", activeClasses: 0 });

  const filtered = trainers.filter(t1 =>
    t1.name.toLowerCase().includes(search.toLowerCase()) ||
    t1.organization.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddTrainer(e) {
    e.preventDefault();
    const id = `T-90${trainers.length + 1}`;
    setTrainers([...trainers, { id, name: form.name, organization: form.organization, activeClasses: Number(form.activeClasses) || 0, rating: 5.0 }]);
    setForm({ name: "", organization: colleges[0]?.name || "", activeClasses: 0 });
    setModalOpen(false);
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="🧑‍🏫" label="Total Trainers" value={trainers.length}                                                   change="deployed"   color="#6366F1" />
        <StatCard t={t} icon="🏫" label="Active Classes"   value={trainers.reduce((s, tr) => s + tr.activeClasses, 0)}                change="in session" color="#8B5CF6" />
        <StatCard t={t} icon="⭐" label="Avg. Rating"      value={(trainers.reduce((s, tr) => s + tr.rating, 0) / (trainers.length || 1)).toFixed(1)} change="out of 5" color="#F59E0B" />
      </div>

      <SectionCard t={t} title="Certified Trainer Roster" action="+ Add Trainer" onAction={() => setModalOpen(true)} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search trainer or institution..." />
        </div>
        <Table
          t={t}
          cols={["ID", "Trainer", "Institution", "Active Classes", "Rating"]}
          rows={filtered.map(tr => (
            <tr key={tr.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t} color={t.textSecondary}>{tr.id}</TD>
              <TD t={t} bold>{tr.name}</TD>
              <TD t={t}>{tr.organization}</TD>
              <TD t={t} color="#6366F1">{tr.activeClasses}</TD>
              <TD t={t}>⭐ {tr.rating.toFixed(1)}</TD>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No trainers found.</div>
        )}
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Onboard Certified Trainer" t={t}>
        <form onSubmit={handleAddTrainer}>
          <FormField t={t} label="Trainer Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <FormSelect t={t} label="Assigned Institution" value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })}>
            {colleges.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </FormSelect>
          <FormField t={t} label="Initial Assigned Batches" type="number" required value={form.activeClasses} onChange={e => setForm({ ...form, activeClasses: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "8px 14px" }}>Cancel</button>
            <button type="submit" style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Deploy Instructor</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
