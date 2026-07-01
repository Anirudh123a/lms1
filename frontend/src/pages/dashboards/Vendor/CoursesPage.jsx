import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, Modal, FormField, FormSelect } from "./SharedUI";
import { courses as initialCourses } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: COURSES (Course Factory)
// ════════════════════════════════════════════════════════════════
export default function CoursesPage({ t }) {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Software Development", price: "" });

  const categories = ["All", ...new Set(courses.map(c => c.category))];
  const filtered = courses.filter(c =>
    (category === "All" || c.category === category) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddCourse(e) {
    e.preventDefault();
    const nextId = 101 + courses.length;
    setCourses([...courses, { id: nextId, title: form.title, category: form.category, globalEnrollments: 0, price: Number(form.price) || 0, status: "Published" }]);
    setForm({ title: "", category: "Software Development", price: "" });
    setModalOpen(false);
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="📚" label="Total Courses"  value={courses.length}                                                  change="published"  color="#6366F1" />
        <StatCard t={t} icon="👥" label="Enrollments"    value={courses.reduce((s, c) => s + c.globalEnrollments, 0).toLocaleString()} change="global"     color="#8B5CF6" />
        <StatCard t={t} icon="💰" label="Avg. Price"     value={`₹${Math.round(courses.reduce((s, c) => s + c.price, 0) / (courses.length || 1)).toLocaleString()}`} change="per course" color="#22C55E" />
        <StatCard t={t} icon="🗂" label="Categories"     value={new Set(courses.map(c => c.category)).size}                       change="domains"    color="#06B6D4" />
      </div>

      <SectionCard t={t} title="Course Catalog" action="+ Add Course" onAction={() => setModalOpen(true)} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search course..." />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: category === cat ? t.accent : t.chipBg, color: category === cat ? "#fff" : t.textBody }}>{cat}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["Course Title", "Category", "Enrollments", "Price", "Status"]}
          rows={filtered.map(c => (
            <tr key={c.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t} bold>{c.title}</TD>
              <TD t={t}>{c.category}</TD>
              <TD t={t} color="#6366F1">{c.globalEnrollments.toLocaleString()}</TD>
              <TD t={t}>₹{c.price.toLocaleString()}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(c.status)}</td>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: t.textSecondary, fontSize: 13 }}>No courses found.</div>
        )}
      </SectionCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Publish New Course" t={t}>
        <form onSubmit={handleAddCourse}>
          <FormField t={t} label="Course Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <FormSelect t={t} label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option>Software Development</option>
            <option>Data Science</option>
            <option>Web Development</option>
            <option>Cloud Computing</option>
          </FormSelect>
          <FormField t={t} label="Price (₹)" type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
            <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: t.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "8px 14px" }}>Cancel</button>
            <button type="submit" style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Deploy Course</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
