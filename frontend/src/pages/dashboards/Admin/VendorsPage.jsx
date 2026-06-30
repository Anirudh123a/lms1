import { useState } from "react";
import { StatCard, SectionCard, TD, Table, SearchBar, statusBadge, planBadge } from "./SharedUI";
import { vendors } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: VENDORS
// ════════════════════════════════════════════════════════════════
export default function VendorsPage({ t }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const plans = ["All", "Enterprise", "Business", "Starter"];
  const filtered = vendors.filter(v =>
    (filter === "All" || v.plan === filter) &&
    v.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="🛒" label="Total Vendors"   value={vendors.length}                                        change="partners"    color="#3B6CF4" />
        <StatCard t={t} icon="🟢" label="Active"          value={vendors.filter(v => v.status === "Active").length}     change="active now"  color="#22C55E" />
        <StatCard t={t} icon="📦" label="Total Subs Sold" value={vendors.reduce((s, v) => s + v.sold, 0).toLocaleString()} change="all vendors" color="#8B5CF6" />
        <StatCard t={t} icon="💰" label="Total Revenue"   value="₹59,800"                                              change="from vendors" color="#06B6D4" />
      </div>
      <SectionCard t={t} title="All Vendors" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <SearchBar t={t} value={search} onChange={setSearch} placeholder="Search vendor..." />
          <div style={{ display: "flex", gap: 6 }}>
            {plans.map(opt => (
              <button key={opt} onClick={() => setFilter(opt)} style={{ padding: "5px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", border: "none", background: filter === opt ? t.accent : t.chipBg, color: filter === opt ? "#fff" : t.textBody }}>{opt}</button>
            ))}
          </div>
        </div>
        <Table
          t={t}
          cols={["#","Vendor Name","Plan","Subscriptions Sold","Revenue","Status"]}
          rows={filtered.map(v => (
            <tr key={v.id} style={{ borderBottom: t.rowBorder }}>
              <TD t={t}>{v.id}</TD>
              <TD t={t} bold>{v.name}</TD>
              <td style={{ padding: "10px 10px" }}>{planBadge(v.plan)}</td>
              <TD t={t} color="#3B6CF4">{v.sold.toLocaleString()}</TD>
              <TD t={t} color="#22C55E">{v.revenue}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(v.status)}</td>
            </tr>
          ))}
        />
      </SectionCard>
    </>
  );
}
