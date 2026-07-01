import { StatCard, SectionCard, TD, Table, statusBadge } from "./SharedUI";
import { billing } from "./constants";

// ════════════════════════════════════════════════════════════════
//  PAGE: BILLING
// ════════════════════════════════════════════════════════════════

// Opens a print-ready invoice in a new tab (no external PDF library required).
function downloadInvoice(bill) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`
    <html>
      <head>
        <title>Invoice ${bill.invoiceId}</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; color: #1E293B; padding: 40px; }
          .header { display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #E2E8F0; padding-bottom:20px; margin-bottom:30px; }
          h1 { margin:0; color:#6366F1; font-size:28px; letter-spacing:-0.5px; }
          table { width:100%; border-collapse:collapse; text-align:left; margin-bottom:40px; font-size:13px; }
          th { padding:12px; color:#64748B; background:#F8FAFC; border-bottom:1px solid #E2E8F0; }
          td { padding:16px 12px; border-bottom:1px solid #F1F5F9; }
          .total { text-align:right; font-weight:800; font-size:16px; color:#0F172A; }
        </style>
      </head>
      <body onload="window.print()">
        <div class="header">
          <div><h1>EDUPLATFORM</h1><p>Global Solutions Infrastructure Ledger</p></div>
          <div style="text-align:right"><h2>INVOICE STATEMENT</h2><p>${bill.invoiceId}</p></div>
        </div>
        <p><strong>Client:</strong> ${bill.college}<br/><strong>Date:</strong> ${bill.date}<br/><strong>Status:</strong> ${bill.status}</p>
        <table>
          <thead><tr><th>Service Description</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Multi-Tenant Software License Subscription</td><td>₹${bill.amount.toLocaleString("en-IN")}</td></tr></tbody>
        </table>
        <p class="total">Grand Total (INR): ₹${bill.amount.toLocaleString("en-IN")}</p>
      </body>
    </html>
  `);
  w.document.close();
}

export default function BillingPage({ t }) {
  const totalRevenue = billing.reduce((s, b) => s + b.amount, 0);
  const paid = billing.filter(b => b.status === "Paid");
  const pending = billing.filter(b => b.status === "Pending");

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        <StatCard t={t} icon="💰" label="Total Billed" value={`₹${totalRevenue.toLocaleString()}`}                  change="all invoices" color="#6366F1" />
        <StatCard t={t} icon="✅" label="Paid"         value={`₹${paid.reduce((s, b) => s + b.amount, 0).toLocaleString()}`} change={`${paid.length} invoices`}  color="#22C55E" />
        <StatCard t={t} icon="⏳" label="Pending"      value={`₹${pending.reduce((s, b) => s + b.amount, 0).toLocaleString()}`} change={`${pending.length} invoices`} color="#F59E0B" />
      </div>

      <SectionCard t={t} title="Enterprise Billing Transactions Ledger" style={{ marginBottom: 20 }}>
        <Table
          t={t}
          cols={["Invoice", "Client Account", "Amount", "Billing Date", "Status", ""]}
          rows={billing.map(b => (
            <tr key={b.invoiceId} style={{ borderBottom: t.rowBorder }}>
              <TD t={t} bold>{b.invoiceId}</TD>
              <TD t={t}>{b.college}</TD>
              <TD t={t} color="#6366F1">₹{b.amount.toLocaleString()}</TD>
              <TD t={t}>{b.date}</TD>
              <td style={{ padding: "10px 10px" }}>{statusBadge(b.status)}</td>
              <td style={{ padding: "10px 10px", textAlign: "right" }}>
                <button onClick={() => downloadInvoice(b)} style={{ background: "none", border: `1px solid ${t.gridLine}`, borderRadius: 6, padding: "5px 11px", fontSize: 11, fontWeight: 600, color: t.accent, cursor: "pointer" }}>⬇ PDF</button>
              </td>
            </tr>
          ))}
        />
      </SectionCard>
    </>
  );
}
