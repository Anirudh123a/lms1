// ════════════════════════════════════════════════════════════════
//  INSTITUTIONS PAGE  —  Colleges & Organizations (merged)
// ════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import {
  StatCard,
  SectionCard,
  SearchBar,
  Table,
  TD,
  planBadge,
  statusBadge,
} from "./SharedUI";
import { organizations as initialOrgs } from "./constants";
import CreateAdminModal from "./CreateAdminModal";

// ── Tab Bar ───────────────────────────────────────────────────
function TabBar({ active, onChange, isDark }) {
  const tabs = [
    { key: "colleges",      label: "🏫 Colleges" },
    { key: "organizations", label: "🏢 Organizations" },
  ];
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: isDark ? "2px solid rgba(255,255,255,0.08)" : "2px solid #E2E8F0", paddingBottom: 0 }}>
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 700,
            color: active === t.key ? "#623E98" : (isDark ? "#A692C4" : "#94A3B8"),
            borderBottom: active === t.key ? "2px solid #623E98" : "2px solid transparent",
            marginBottom: -2,
            transition: "color 0.15s, border-color 0.15s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Create College Modal ───────────────────────────────────────
function CreateCollegeModal({ onClose, onCreated }) {
  const isDark = useTheme().palette.mode === "dark";
  const [form, setForm] = useState({ collegeName: "", collegeCode: "", email: "", phone: "", address: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.collegeName || !form.collegeCode || !form.email || !form.password) {
      toast.error("College name, code, email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/superadmin/create-college`, form);
      toast.success("College created successfully!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create college.");
    } finally {
      setLoading(false);
    }
  };

  const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center" };
  const box = { background: isDark ? "#1E0A3C" : "#fff", borderRadius: 14, padding: 28, width: "100%", maxWidth: 480, border: "1px solid rgba(155,117,201,0.3)" };
  const input = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(155,117,201,0.4)", background: isDark ? "rgba(255,255,255,0.06)" : "#F8F4FF", color: isDark ? "#fff" : "#1a1a1a", fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: isDark ? "#CBB6E6" : "#623E98" };

  return (
    <div style={overlay}>
      <div style={box}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: isDark ? "#fff" : "#1a1a1a", fontSize: 17, fontWeight: 800 }}>🏫 Create College</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9B75C9", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "College Name *", name: "collegeName", placeholder: "e.g. MIT College" },
            { label: "College Code *", name: "collegeCode", placeholder: "e.g. MIT001" },
            { label: "Email *",        name: "email",       placeholder: "college@email.com" },
            { label: "Phone",          name: "phone",       placeholder: "10-digit number" },
            { label: "Password *",     name: "password",    placeholder: "Login password", type: "password" },
            { label: "Address",        name: "address",     placeholder: "City, State" },
          ].map(f => (
            <div key={f.name} style={f.name === "collegeName" || f.name === "address" ? { gridColumn: "1 / -1" } : {}}>
              <label style={labelStyle}>{f.label}</label>
              <input name={f.name} type={f.type || "text"} placeholder={f.placeholder} value={form[f.name]} onChange={handle} style={input} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "1px solid rgba(155,117,201,0.4)", background: "none", color: "#9B75C9", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={submit} disabled={loading} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "none", background: "linear-gradient(90deg,#623E98,#9B75C9)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Creating..." : "Create College"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Create Organization Modal ─────────────────────────────────
function CreateOrganizationModal({ onClose, onCreated }) {
  const isDark = useTheme().palette.mode === "dark";
  const [form, setForm] = useState({ name: "", type: "", plan: "Institutional", email: "", phone: "", address: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.type || !form.email || !form.password) {
      toast.error("Organization name, type, email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/superadmin/create-organization`, form);
      toast.success("Organization created successfully!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create organization.");
    } finally {
      setLoading(false);
    }
  };

  const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center" };
  const box = { background: isDark ? "#1E0A3C" : "#fff", borderRadius: 14, padding: 28, width: "100%", maxWidth: 480, border: "1px solid rgba(155,117,201,0.3)" };
  const input = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid rgba(155,117,201,0.4)", background: isDark ? "rgba(255,255,255,0.06)" : "#F8F4FF", color: isDark ? "#fff" : "#1a1a1a", fontSize: 13, outline: "none", boxSizing: "border-box", marginTop: 4 };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: isDark ? "#CBB6E6" : "#623E98" };
  const selectStyle = { ...input, cursor: "pointer" };

  return (
    <div style={overlay}>
      <div style={box}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0, color: isDark ? "#fff" : "#1a1a1a", fontSize: 17, fontWeight: 800 }}>🏢 Create Organization</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9B75C9", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Organization Name *</label>
            <input name="name" placeholder="e.g. Harvard Online" value={form.name} onChange={handle} style={input} />
          </div>

          <div>
            <label style={labelStyle}>Type *</label>
            <input name="type" placeholder="e.g. University" value={form.type} onChange={handle} style={input} />
          </div>

          <div>
            <label style={labelStyle}>Plan</label>
            <select name="plan" value={form.plan} onChange={handle} style={selectStyle}>
              <option value="Institutional">Institutional</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <input name="email" placeholder="org@email.com" value={form.email} onChange={handle} style={input} />
          </div>

          <div>
            <label style={labelStyle}>Phone</label>
            <input name="phone" placeholder="10-digit number" value={form.phone} onChange={handle} style={input} />
          </div>

          <div>
            <label style={labelStyle}>Password *</label>
            <input name="password" type="password" placeholder="Login password" value={form.password} onChange={handle} style={input} />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Address</label>
            <input name="address" placeholder="City, State" value={form.address} onChange={handle} style={input} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "1px solid rgba(155,117,201,0.4)", background: "none", color: "#9B75C9", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={submit} disabled={loading} style={{ flex: 1, padding: "9px", borderRadius: 8, border: "none", background: "linear-gradient(90deg,#3B6CF4,#623E98)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Creating..." : "Create Organization"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Colleges Tab ──────────────────────────────────────────────
function CollegesTab({ isDark }) {
  const [colleges, setColleges]   = useState([]);
  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [loading, setLoading]     = useState(true);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/superadmin/colleges`);
      setColleges(res.data.colleges || []);
    } catch {
      toast.error("Failed to load colleges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchColleges(); }, []);

  const filtered = colleges.filter(c =>
    c.college_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.college_code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 18 }}>
        <StatCard icon="🏫" label="Total Colleges" value={colleges.length} change="registered" color="#623E98" />
        <StatCard icon="✅" label="Active Colleges" value={colleges.filter(c => c.status === "ACTIVE" || !c.status).length} change="active" color="#10B981" />
      </div>

      <SectionCard title="All Colleges">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or code..." />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowAdminModal(true)}
              style={{ background: "linear-gradient(90deg,#3B6CF4,#623E98)", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13 }}
            >
              + Add Institution Admin
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{ background: "linear-gradient(90deg,#623E98,#9B75C9)", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13 }}
            >
              + Add College
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "#9B75C9", textAlign: "center", padding: 20 }}>Loading colleges...</p>
        ) : (
          <Table
            cols={["#", "College Name", "Code", "Email", "Phone", "Created"]}
            rows={filtered.length === 0
              ? [<tr key="empty"><td colSpan={6} style={{ textAlign: "center", padding: 20, color: "#94A3B8" }}>No colleges found</td></tr>]
              : filtered.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <TD>{i + 1}</TD>
                  <TD bold>{c.college_name}</TD>
                  <TD color="#9B75C9">{c.college_code}</TD>
                  <TD>{c.company_email || c.email || "—"}</TD>
                  <TD>{c.phone || "—"}</TD>
                  <TD>{c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}</TD>
                </tr>
              ))
            }
          />
        )}
      </SectionCard>

      {showModal && <CreateCollegeModal onClose={() => setShowModal(false)} onCreated={fetchColleges} />}
      {showAdminModal && (
        <CreateAdminModal
          roleType="org"
          onClose={() => setShowAdminModal(false)}
          onCreated={() => toast.success("Institution admin created!")}
        />
      )}
    </>
  );
}

// ── Organizations Tab ─────────────────────────────────────────
function OrganizationsTab({ isDark }) {
  const [orgs, setOrgs]           = useState(initialOrgs);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const plans = ["All", "Institutional", "Enterprise", "Premium"];

  const filtered = orgs.filter(o =>
    (filter === "All" || o.plan === filter) &&
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreated = () => {
    toast.success("Organization added!");
  };

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 18 }}>
        <StatCard icon="🏢" label="Total Orgs"     value={orgs.length}                                                change="registered" color="#3B6CF4" />
        <StatCard icon="🟢" label="Active"          value={orgs.filter(o => o.status === "Active").length}            change="subscribed" color="#22C55E" />
        <StatCard icon="📚" label="Total Courses"  value={orgs.reduce((s, o) => s + o.courses, 0)}                   change="published"  color="#8B5CF6" />
        <StatCard icon="👥" label="Total Students" value={orgs.reduce((s, o) => s + o.students, 0).toLocaleString()}  change="across all" color="#06B6D4" />
      </div>

      <SectionCard title="All Organizations">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search organization..." />
            <div style={{ display: "flex", gap: 6 }}>
              {plans.map(opt => (
                <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? "#623E98" : "#F1F5F9", color: filter === opt ? "#fff" : "#475569" }}>{opt}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowAdminModal(true)}
              style={{ background: "linear-gradient(90deg,#3B6CF4,#623E98)", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}
            >
              + Add Institution Admin
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{ background: "linear-gradient(90deg,#3B6CF4,#623E98)", color: "#fff", border: "none", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}
            >
              + Add Organization
            </button>
          </div>
        </div>

        <Table
          cols={["#", "Organization", "Type", "Plan", "Admins", "Courses", "Students", "Revenue", "Joined", "Status"]}
          rows={filtered.map(o => (
            <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <TD>{o.id}</TD>
              <td style={{ padding: "10px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#623E98", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{o.name.charAt(0)}</div>
                  <span style={{ fontWeight: 600, fontSize: 12, color: isDark ? "#fff" : "#0F172A" }}>{o.name}</span>
                </div>
              </td>
              <TD>{o.type}</TD>
              <td style={{ padding: "10px 10px" }}>{planBadge(o.plan)}</td>
              <TD color="#9B75C9">{o.admins}</TD>
              <TD color="#3B6CF4">{o.courses}</TD>
              <TD>{o.students.toLocaleString()}</TD>
              <TD color="#22C55E">{o.revenue}</TD>
              <TD>{o.joined}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(o.status)}</td>
            </tr>
          ))}
        />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#94A3B8", fontSize: 13 }}>No organizations found.</div>
        )}
      </SectionCard>

      {showModal && (
        <CreateOrganizationModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
      {showAdminModal && (
        <CreateAdminModal
          roleType="org"
          onClose={() => setShowAdminModal(false)}
          onCreated={() => toast.success("Institution admin created!")}
        />
      )}
    </>
  );
}

// ── Main Export ───────────────────────────────────────────────
export default function InstitutionsPage() {
  const isDark = useTheme().palette.mode === "dark";
  const [tab, setTab] = useState("colleges");

  return (
    <>
      <TabBar active={tab} onChange={setTab} isDark={isDark} />
      {tab === "colleges"      && <CollegesTab      isDark={isDark} />}
      {tab === "organizations" && <OrganizationsTab isDark={isDark} />}
    </>
  );
}