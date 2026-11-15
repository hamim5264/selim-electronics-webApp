import { useState } from "react";
import SuperAdminIcon from "./SuperAdminIcon";
import {
  AuditCategory,
  PlanCustomFeature,
  PlatformContentState,
  PlatformPlan,
  PlatformState,
  PlatformTenant,
  SupportTicket,
  TENANT_MODULE_META,
  TenantModuleKey,
  TenantStatus,
  VerificationStatus,
} from "../platform/platformState";

export type SuperAdminViewProps = {
  state: PlatformState;
  selectedTenantId: string;
  onSelectTenantId: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenNewTenant: () => void;
  onOpenNewTicket: () => void;
  onImpersonateTenant: (slug: string, route?: string) => void;
  onOpenStorefront: (slug: string) => void;
  onPatchTenant: (id: string, patch: Partial<PlatformTenant>, auditAction: string, category?: AuditCategory) => void;
  onUpdateState: (updater: (prev: PlatformState) => PlatformState, noticeText: string, category?: AuditCategory, target?: string) => void;
  onResetState: () => void;
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_18px_-8px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}

function PanelTitle({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{eyebrow}</p>}
        <h1 className="mt-1 text-[23px] font-bold tracking-[-0.025em] text-slate-950 sm:text-[25px]">{title}</h1>
        {text && <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-600">{text}</p>}
      </div>
      {action}
    </div>
  );
}

function ToggleControl({ checked, onChange, label }: { checked: boolean; onChange: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label || "Toggle setting"}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-slate-950" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-xs transition-all ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}

function StatusPill({ value }: { value: string }) {
  const positive = value === "Active" || value === "Verified" || value === "Published" || value === "Paid" || value === "Resolved" || value === "Live" || value === "Enabled";
  const violet = value === "Trialing" || value === "Trial" || value === "Open";
  const warning = value === "Pending" || value === "Awaiting review" || value === "Documents requested" || value === "Draft" || value === "Waiting" || value === "Retrying" || value === "Sandbox" || value === "High";
  const danger = value === "Overdue" || value === "Restricted" || value === "Rejected" || value === "Urgent" || value === "Paused";
  const teal = value === "Normal";

  const cls = positive
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : violet
      ? "border-violet-200 bg-violet-50 text-violet-700"
      : warning
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : danger
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : teal
            ? "border-teal-200 bg-teal-50 text-teal-700"
            : "border-slate-200 bg-slate-100 text-slate-600";

  const dot = positive
    ? "bg-emerald-500"
    : violet
      ? "bg-violet-500"
      : warning
        ? "bg-amber-500"
        : danger
          ? "bg-rose-500"
          : teal
            ? "bg-teal-500"
            : "bg-slate-400";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

function downloadTextFile(filename: string, mime: string, body: string) {
  const blob = new Blob([body], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function OverviewView(props: SuperAdminViewProps) {
  const {
    state,
    onSelectTenantId,
    onNavigateTab,
    onOpenNewTenant,
    onOpenNewTicket,
    onImpersonateTenant,
    onOpenStorefront,
    onPatchTenant,
    onUpdateState,
  } = props;
  const [range, setRange] = useState<"7D" | "30D" | "90D">("30D");
  const [pulseMode, setPulseMode] = useState<"mrr" | "gmv" | "orders">("mrr");
  const [tenantFilter, setTenantFilter] = useState<"all" | "active" | "review">("all");
  const [tenantSearch, setTenantSearch] = useState("");
  const [activeBarIdx, setActiveBarIdx] = useState<number | null>(null);

  const totalMrr = state.tenants.reduce((sum, item) => sum + (item.status === "Active" ? item.mrrNumeric : 0), 0);
  const totalGmv = state.tenants.reduce((sum, item) => sum + item.monthlySalesBdt, 0);
  const totalOnlineOrders = state.tenants.reduce((sum, item) => sum + item.onlineOrdersCount, 0);
  const totalSkus = state.tenants.reduce((sum, item) => sum + item.skusCount, 0);
  const totalBranches = state.tenants.reduce((sum, item) => sum + item.branches, 0);
  const totalBranchCap = state.tenants.reduce((sum, item) => sum + item.maxBranches, 0);
  const totalRegisters = state.tenants.reduce((sum, item) => sum + item.registers, 0);
  const totalStaff = state.tenants.reduce((sum, item) => sum + item.staff, 0);

  const activeCount = state.tenants.filter(item => item.status === "Active").length;
  const pendingTenants = state.tenants.filter(item => item.verification !== "Verified");
  const pendingKycCount = pendingTenants.length;
  const openTickets = state.tickets.filter(item => item.status !== "Resolved");
  const openTicketsCount = openTickets.length;
  const overdueInvoices = state.invoices.filter(item => item.status === "Overdue" || item.status === "Retrying");
  const paidInvoicesCount = state.invoices.filter(item => item.status === "Paid").length;
  const enabledChannelsCount = state.gateway.channels.filter(c => c.enabled).length;

  const seriesByMode: Record<"mrr" | "gmv" | "orders", Record<"7D" | "30D" | "90D", { label: string; height: number; val: string; sub: string }[]>> = {
    mrr: {
      "7D": [
        { label: "Mon", height: 64, val: "৳ 24.5K", sub: "Subscriptions collected" },
        { label: "Tue", height: 74, val: "৳ 26.8K", sub: "1 plan upgrade" },
        { label: "Wed", height: 82, val: "৳ 28.4K", sub: "SSLCommerz settled" },
        { label: "Thu", height: 78, val: "৳ 27.9K", sub: "Auto-renewals" },
        { label: "Fri", height: 96, val: "৳ 29.1K", sub: "New tenant add-on" },
        { label: "Sat", height: 108, val: "৳ 29.6K", sub: "Peak billing" },
        { label: "Sun", height: 118, val: `৳ ${totalMrr.toLocaleString()}`, sub: "Current live MRR" },
      ],
      "30D": [
        { label: "W1", height: 42, val: "৳ 18.2K", sub: "Baseline cohort" },
        { label: "W2", height: 54, val: "৳ 21.0K", sub: "3 new activations" },
        { label: "W3", height: 48, val: "৳ 19.6K", sub: "1 retry pending" },
        { label: "W4", height: 64, val: "৳ 22.9K", sub: "Growth tier inflow" },
        { label: "W5", height: 72, val: "৳ 24.1K", sub: "Scale add-ons" },
        { label: "W6", height: 68, val: "৳ 23.4K", sub: "Clean retention" },
        { label: "W7", height: 84, val: "৳ 25.8K", sub: "SSLCommerz batch" },
        { label: "W8", height: 92, val: "৳ 26.9K", sub: "Branch expansion" },
        { label: "W9", height: 88, val: "৳ 26.1K", sub: "Renewals settled" },
        { label: "W10", height: 104, val: "৳ 28.2K", sub: "Zero churn week" },
        { label: "W11", height: 98, val: "৳ 27.8K", sub: "Mid-cycle capture" },
        { label: "Now", height: 118, val: `৳ ${totalMrr.toLocaleString()}`, sub: "Active live MRR" },
      ],
      "90D": [
        { label: "Sep 1", height: 42, val: "৳ 19.4K", sub: "Q3 start" },
        { label: "Sep 15", height: 56, val: "৳ 21.8K", sub: "Merchant onboarding" },
        { label: "Oct 1", height: 70, val: "৳ 24.2K", sub: "SSLCommerz live check" },
        { label: "Oct 15", height: 84, val: "৳ 26.5K", sub: "Guest app rollout" },
        { label: "Nov 1", height: 100, val: "৳ 28.1K", sub: "Multi-branch surge" },
        { label: "Now", height: 118, val: `৳ ${totalMrr.toLocaleString()}`, sub: "Current MRR" },
      ],
    },
    gmv: {
      "7D": [
        { label: "Mon", height: 60, val: "৳ 8.9L", sub: "Counter + Web POS" },
        { label: "Tue", height: 72, val: "৳ 10.4L", sub: "Electronics & retail" },
        { label: "Wed", height: 84, val: "৳ 12.1L", sub: "Invoice settlement" },
        { label: "Thu", height: 80, val: "৳ 11.6L", sub: "Stock transfers synced" },
        { label: "Fri", height: 102, val: "৳ 14.8L", sub: "Weekend traffic" },
        { label: "Sat", height: 112, val: "৳ 16.2L", sub: "Peak retail checkout" },
        { label: "Sun", height: 118, val: `৳ ${(totalGmv / 100000).toFixed(1)}L`, sub: "30-day rolling GMV" },
      ],
      "30D": [
        { label: "W1", height: 48, val: "৳ 31.2L", sub: "All POS counters" },
        { label: "W2", height: 60, val: "৳ 36.8L", sub: "Multi-branch sync" },
        { label: "W3", height: 56, val: "৳ 34.9L", sub: "Storefront + walk-in" },
        { label: "W4", height: 74, val: "৳ 41.2L", sub: "Growth accounts" },
        { label: "W5", height: 80, val: "৳ 44.5L", sub: "B2B invoices" },
        { label: "W6", height: 76, val: "৳ 42.1L", sub: "Return adjustments ok" },
        { label: "W7", height: 90, val: "৳ 48.0L", sub: "SSLCommerz online" },
        { label: "W8", height: 96, val: "৳ 51.3L", sub: "Selim + Nova peak" },
        { label: "W9", height: 92, val: "৳ 49.8L", sub: "Consistent velocity" },
        { label: "W10", height: 108, val: "৳ 55.4L", sub: "Campaign boost" },
        { label: "W11", height: 102, val: "৳ 52.9L", sub: "Verified receipts" },
        { label: "Now", height: 118, val: `৳ ${(totalGmv / 100000).toFixed(1)}L`, sub: "Cumulative tenant GMV" },
      ],
      "90D": [
        { label: "Sep 1", height: 46, val: "৳ 38.0L", sub: "Early cohort" },
        { label: "Sep 15", height: 62, val: "৳ 43.2L", sub: "POS speed gains" },
        { label: "Oct 1", height: 76, val: "৳ 47.9L", sub: "Online store launches" },
        { label: "Oct 15", height: 90, val: "৳ 52.4L", sub: "Inventory control" },
        { label: "Nov 1", height: 104, val: "৳ 55.8L", sub: "Scale tier active" },
        { label: "Now", height: 118, val: `৳ ${(totalGmv / 100000).toFixed(1)}L`, sub: "Live monthly GMV" },
      ],
    },
    orders: {
      "7D": [
        { label: "Mon", height: 52, val: "168 orders", sub: "Web + delivery" },
        { label: "Tue", height: 66, val: "204 orders", sub: "98% dispatched" },
        { label: "Wed", height: 74, val: "229 orders", sub: "SSLCommerz + COD" },
        { label: "Thu", height: 70, val: "215 orders", sub: "Courier synced" },
        { label: "Fri", height: 94, val: "288 orders", sub: "Weekend surge" },
        { label: "Sat", height: 106, val: "326 orders", sub: "Storefront conversions" },
        { label: "Sun", height: 118, val: `${totalOnlineOrders} total`, sub: "30-day online orders" },
      ],
      "30D": [
        { label: "W1", height: 44, val: "720 orders", sub: "Storefronts online" },
        { label: "W2", height: 58, val: "860 orders", sub: "Automated tracking" },
        { label: "W3", height: 52, val: "810 orders", sub: "Verified receipts" },
        { label: "W4", height: 70, val: "990 orders", sub: "Courier dispatch" },
        { label: "W5", height: 78, val: "1,080 orders", sub: "bKash + Cards" },
        { label: "W6", height: 72, val: "1,020 orders", sub: "Zero failed webhooks" },
        { label: "W7", height: 86, val: "1,190 orders", sub: "High fill rate" },
        { label: "W8", height: 94, val: "1,280 orders", sub: "Guest app orders" },
        { label: "W9", height: 88, val: "1,220 orders", sub: "Same-day Dhaka" },
        { label: "W10", height: 104, val: "1,390 orders", sub: "Campaign peak" },
        { label: "W11", height: 98, val: "1,310 orders", sub: "Fulfilled on SLA" },
        { label: "Now", height: 118, val: `${totalOnlineOrders} live`, sub: "Monthly web orders" },
      ],
      "90D": [
        { label: "Sep 1", height: 40, val: "840 orders", sub: "Baseline" },
        { label: "Sep 15", height: 56, val: "990 orders", sub: "Storefront rollout" },
        { label: "Oct 1", height: 74, val: "1,180 orders", sub: "SSLCommerz active" },
        { label: "Oct 15", height: 88, val: "1,340 orders", sub: "Guest app traffic" },
        { label: "Nov 1", height: 104, val: "1,460 orders", sub: "Peak velocity" },
        { label: "Now", height: 118, val: `${totalOnlineOrders} live`, sub: "Current online load" },
      ],
    },
  };

  const activeSeries = seriesByMode[pulseMode][range];
  const inspectedBar = activeBarIdx !== null ? activeSeries[activeBarIdx] : activeSeries[activeSeries.length - 1];

  const filteredTenants = state.tenants.filter(tenant => {
    const matchesTab =
      tenantFilter === "all"
        ? true
        : tenantFilter === "active"
          ? tenant.status === "Active"
          : tenant.verification !== "Verified" || tenant.status !== "Active";
    const matchesSearch = `${tenant.name} ${tenant.owner} ${tenant.slug} ${tenant.city}`
      .toLowerCase()
      .includes(tenantSearch.trim().toLowerCase());
    return matchesTab && matchesSearch;
  });

  const firstPending = pendingTenants[0];
  const firstOverdue = overdueInvoices[0];
  const firstOpenTicket = openTickets[0];

  return (
    <>
      <PanelTitle
        eyebrow="DevEngine command center"
        title={`Good morning, ${state.profile.name}.`}
        text="Full executive oversight across tenant POS terminals, storefronts, KYC compliance, SSLCommerz billing, and platform policies."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onImpersonateTenant("selim-electronics", "dashboard")}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-slate-800 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50"
            >
              Inspect Selim POS →
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("verification")}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-slate-800 shadow-2xs transition hover:bg-slate-50"
            >
              Review KYC ({pendingKycCount})
            </button>
            <button
              type="button"
              onClick={onOpenNewTicket}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-semibold text-slate-800 shadow-2xs transition hover:bg-slate-50"
            >
              + Support ticket
            </button>
            <button
              type="button"
              onClick={onOpenNewTenant}
              className="rounded-xl bg-slate-950 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              + Add organisation
            </button>
          </div>
        }
      />

      {/* Row 1: 4 Crisp Executive KPI Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {(() => {
          const capPct = Math.round((totalBranches / Math.max(1, totalBranchCap)) * 100);
          const capTone =
            capPct >= 85
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : capPct >= 55
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-700";
          const queueCount = pendingKycCount + overdueInvoices.length + openTicketsCount;
          return [
            {
              label: "PLATFORM MRR",
              value: `৳ ${totalMrr.toLocaleString()}`,
              meta: `${activeCount} paid orgs · ARR ৳ ${((totalMrr * 12) / 100000).toFixed(2)}L`,
              badge: "+12.4% MoM",
              badgeTone: "border-emerald-200 bg-emerald-50 text-emerald-700",
              accentDot: "bg-emerald-500",
              tab: "subscriptions",
            },
            {
              label: "RETAIL POS GMV (30D)",
              value: `৳ ${(totalGmv / 100000).toFixed(2)}L`,
              meta: `${totalOnlineOrders.toLocaleString()} online orders · ${totalSkus.toLocaleString()} SKUs`,
              badge: "Counter + Web",
              badgeTone: "border-teal-200 bg-teal-50 text-teal-700",
              accentDot: "bg-teal-500",
              tab: "organisations",
            },
            {
              label: "WORKSPACES & POS LOAD",
              value: `${activeCount}/${state.tenants.length}`,
              meta: `${totalBranches}/${totalBranchCap} branches · ${totalRegisters} registers · ${totalStaff} staff`,
              badge: `${capPct}% capacity`,
              badgeTone: capTone,
              accentDot: capPct >= 85 ? "bg-rose-500" : capPct >= 55 ? "bg-amber-500" : "bg-emerald-500",
              tab: "organisations",
            },
            {
              label: "ACTION QUEUE & SLA",
              value: String(queueCount).padStart(2, "0"),
              meta: `${pendingKycCount} KYC · ${overdueInvoices.length} billing · ${openTicketsCount} support`,
              badge: queueCount > 0 ? "Needs review" : "On track",
              badgeTone:
                queueCount > 0
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700",
              accentDot: queueCount > 0 ? "bg-amber-500" : "bg-emerald-500",
              tab: "verification",
            },
          ];
        })().map(card => (
          <button key={card.label} type="button" onClick={() => onNavigateTab(card.tab)} className="text-left">
            <Card className="p-5 transition hover:-translate-y-0.5 hover:border-slate-300">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500">{card.label}</p>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${card.badgeTone}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${card.accentDot}`} />
                  {card.badge}
                </span>
              </div>
              <p className="mt-3.5 text-[28px] font-bold tracking-[-0.03em] text-slate-950">{card.value}</p>
              <p className="mt-2 truncate text-[12px] font-medium text-slate-600">{card.meta}</p>
            </Card>
          </button>
        ))}
      </div>

      {/* Row 2: Multi-Mode Telemetry + Direct Action Queue */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_0.95fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Platform telemetry</p>
              <h2 className="mt-0.5 text-[17px] font-bold text-slate-950">Revenue, POS velocity &amp; order pulse</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                {([
                  ["mrr", "MRR"],
                  ["gmv", "POS GMV"],
                  ["orders", "Orders"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setPulseMode(key); setActiveBarIdx(null); }}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${pulseMode === key ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                {(["7D", "30D", "90D"] as const).map(item => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setRange(item); setActiveBarIdx(null); }}
                    className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${range === item ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Selected bucket · {inspectedBar.label}
                </span>
                <div className="mt-0.5 flex items-center gap-2.5">
                  <span className="text-[20px] font-bold tracking-tight text-slate-950">{inspectedBar.val}</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Active trend
                  </span>
                </div>
              </div>
              <span className="text-[12px] font-medium text-slate-600">{inspectedBar.sub}</span>
            </div>

            <div className="flex h-36 items-end gap-2">
              {activeSeries.map((bar, index) => {
                const isSelected = (activeBarIdx ?? activeSeries.length - 1) === index;
                return (
                  <button
                    key={bar.label}
                    type="button"
                    onMouseEnter={() => setActiveBarIdx(index)}
                    onClick={() => setActiveBarIdx(index)}
                    className="group relative flex flex-1 flex-col items-center focus:outline-none"
                  >
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        isSelected
                          ? "bg-slate-950 shadow-[0_6px_14px_-4px_rgba(15,23,42,0.38)]"
                          : "bg-slate-200/90 group-hover:bg-slate-400"
                      }`}
                      style={{ height: bar.height }}
                    />
                    <span className={`mt-1.5 text-[10px] font-semibold ${isSelected ? "text-slate-950" : "text-slate-400"}`}>{bar.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <b className="block text-[16px] text-slate-950">{totalBranches}</b>
                <span className="text-[11px] text-slate-500">Live branches</span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <b className="block text-[16px] text-slate-950">{totalRegisters}</b>
                <span className="text-[11px] text-slate-500">POS counters</span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <b className="block text-[16px] text-slate-950">{paidInvoicesCount}/{state.invoices.length}</b>
                <span className="text-[11px] text-slate-500">Invoices settled</span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <b className="block text-[16px] text-slate-950">99.98%</b>
                <span className="text-[11px] text-slate-500">API SLA uptime</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Executive actions</p>
                <h2 className="mt-0.5 text-[17px] font-bold text-slate-950">Immediate priority queue</h2>
              </div>
              <button type="button" onClick={() => onNavigateTab("audit")} className="text-[12px] font-semibold text-slate-600 hover:text-slate-950">
                Audit ({state.audit.length}) →
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Inline 1-click KYC */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-slate-950">
                      {firstPending ? `KYC: ${firstPending.name}` : "KYC Verification Queue"}
                    </span>
                    <StatusPill value={firstPending ? firstPending.verification : "Verified"} />
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {firstPending
                      ? `${pendingKycCount} workspace(s) waiting · ${firstPending.plan} plan`
                      : "All tenant registrations verified."}
                  </p>
                </div>
                {firstPending ? (
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onPatchTenant(
                          firstPending.id,
                          {
                            verification: "Verified",
                            status: "Active",
                            access: true,
                            docs: { ownerId: true, tradeLicense: true, addressProof: true, taxCert: true },
                          },
                          `Quick-approved KYC and activated ${firstPending.name}`,
                          "KYC"
                        )
                      }
                      className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateTab("verification")}
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Queue
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateTab("verification")}
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Open
                  </button>
                )}
              </div>

              {/* Inline 1-click Billing Recovery */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-slate-950">
                      {firstOverdue ? `${firstOverdue.id}: ${firstOverdue.tenantName}` : "SSLCommerz Billing"}
                    </span>
                    <StatusPill value={firstOverdue ? firstOverdue.status : "Paid"} />
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {firstOverdue
                      ? `${firstOverdue.amount} due · ${overdueInvoices.length} pending invoice(s)`
                      : `All ${state.invoices.length} invoices settled via ${state.gateway.storeId}`}
                  </p>
                </div>
                {firstOverdue ? (
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateState(
                          prev => ({
                            ...prev,
                            invoices: prev.invoices.map(inv =>
                              inv.id === firstOverdue.id ? { ...inv, status: "Paid", trxId: `SSLC-OV-${Date.now().toString().slice(-5)}` } : inv
                            ),
                          }),
                          `Collected ${firstOverdue.id} (${firstOverdue.amount}) via SSLCommerz`,
                          "Billing",
                          firstOverdue.tenantName
                        )
                      }
                      className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-emerald-700"
                    >
                      Collect
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateTab("subscriptions")}
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Billing
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateTab("subscriptions")}
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Ledger
                  </button>
                )}
              </div>

              {/* Inline Support Ticket */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-slate-950">
                      {firstOpenTicket ? `${firstOpenTicket.id}: ${firstOpenTicket.tenant}` : "Support SLA Queue"}
                    </span>
                    <StatusPill value={firstOpenTicket ? firstOpenTicket.priority : "Resolved"} />
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-slate-500">
                    {firstOpenTicket ? firstOpenTicket.subject : "Zero open buyer escalations"}
                  </p>
                </div>
                {firstOpenTicket ? (
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateState(
                          prev => ({
                            ...prev,
                            tickets: prev.tickets.map(t => (t.id === firstOpenTicket.id ? { ...t, status: "Resolved" } : t)),
                          }),
                          `Resolved support ticket ${firstOpenTicket.id}`,
                          "Support",
                          firstOpenTicket.tenant
                        )
                      }
                      className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-emerald-700"
                    >
                      Resolve
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateTab("support")}
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Desk
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigateTab("support")}
                    className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Desk
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Direct Platform Switches inside Overview */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Quick platform switches</p>
            <div className="mt-2.5 space-y-2.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-slate-800">SSLCommerz Live Mode ({state.gateway.environment})</span>
                <ToggleControl
                  label="Toggle SSLCommerz live mode"
                  checked={state.gateway.environment === "Live"}
                  onChange={() => {
                    const nextEnv = state.gateway.environment === "Live" ? "Sandbox" : "Live";
                    onUpdateState(
                      prev => ({ ...prev, gateway: { ...prev.gateway, environment: nextEnv } }),
                      `Switched SSLCommerz gateway to ${nextEnv}`,
                      "Gateway",
                      state.gateway.storeId
                    );
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-slate-800">Public Maintenance Banner</span>
                <ToggleControl
                  label="Toggle maintenance banner"
                  checked={state.content.maintenanceBannerEnabled}
                  onChange={() =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        content: { ...prev.content, maintenanceBannerEnabled: !prev.content.maintenanceBannerEnabled },
                      }),
                      `Maintenance banner ${state.content.maintenanceBannerEnabled ? "hidden" : "published"}`,
                      "Content",
                      "Public Website"
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-slate-800">Manual KYC Hold on Signups</span>
                <ToggleControl
                  label="Toggle manual tenant activation"
                  checked={state.governance.manualTenantActivation}
                  onChange={() =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        governance: {
                          ...prev.governance,
                          manualTenantActivation: !prev.governance.manualTenantActivation,
                        },
                      }),
                      `Manual tenant KYC activation ${state.governance.manualTenantActivation ? "disabled" : "enabled"}`,
                      "Security",
                      "Onboarding"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Deep 3-Panel Operations Matrix */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
        {/* Tenant Workspaces Quick Command */}
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-[16px] font-bold text-slate-950">Tenant POS &amp; storefront command</h2>
              <p className="mt-0.5 text-[12px] text-slate-500">Toggle workspace access live, launch POS, or inspect storefronts.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-semibold">
                {([
                  ["all", "All"],
                  ["active", "Active"],
                  ["review", "Review"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTenantFilter(key)}
                    className={`rounded-md px-2 py-1 transition ${tenantFilter === key ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <input
                value={tenantSearch}
                onChange={e => setTenantSearch(e.target.value)}
                placeholder="Filter tenant..."
                className="h-8 w-36 rounded-lg border border-slate-200 px-2.5 text-[12px] outline-none focus:border-slate-950"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredTenants.map(tenant => (
              <div key={tenant.id} className="grid grid-cols-1 items-center gap-3 px-5 py-3.5 md:grid-cols-[1.25fr_0.75fr_0.65fr_0.95fr]">
                <button
                  type="button"
                  onClick={() => { onSelectTenantId(tenant.id); onNavigateTab("organisations"); }}
                  className="text-left"
                >
                  <div className="flex items-center gap-2">
                    <b className="text-[13px] font-bold text-slate-950 hover:underline">{tenant.name}</b>
                    <StatusPill value={tenant.status} />
                  </div>
                  <small className="mt-0.5 block text-[11px] text-slate-500">
                    /{tenant.slug} · {tenant.plan} ({tenant.mrr})
                  </small>
                </button>
                <div className="text-[12px] text-slate-600">
                  <div>{tenant.branches}/{tenant.maxBranches} branches · {tenant.registers} POS</div>
                  <div className="text-[11px] text-slate-400">৳ {(tenant.monthlySalesBdt / 100000).toFixed(1)}L sales · {tenant.onlineOrdersCount} web</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Access</span>
                  <ToggleControl
                    label={`Toggle ${tenant.name} access`}
                    checked={tenant.access}
                    onChange={() =>
                      onPatchTenant(
                        tenant.id,
                        { access: !tenant.access, status: !tenant.access ? "Active" : "Paused" },
                        `${tenant.name} workspace ${tenant.access ? "paused" : "activated"} from Overview`
                      )
                    }
                  />
                </div>
                <div className="flex flex-wrap justify-start gap-1.5 md:justify-end">
                  <button
                    type="button"
                    onClick={() => onImpersonateTenant(tenant.slug, "dashboard")}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  >
                    POS →
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenStorefront(tenant.slug)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  >
                    Store
                  </button>
                  <button
                    type="button"
                    onClick={() => { onSelectTenantId(tenant.id); onNavigateTab("organisations"); }}
                    className="rounded-lg bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-slate-800"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
            {filteredTenants.length === 0 && (
              <p className="px-5 py-6 text-center text-[12px] text-slate-500">No organisations match the current filter.</p>
            )}
          </div>
        </Card>

        {/* Right Column: POS Module Adoption + SSLCommerz + Live Audit Feed */}
        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Capabilities &amp; gateway</p>
                <h2 className="mt-0.5 text-[16px] font-bold text-slate-950">POS module adoption &amp; SSLCommerz</h2>
              </div>
              <button type="button" onClick={() => onNavigateTab("features")} className="text-[12px] font-semibold text-slate-600 hover:text-slate-950">
                Flags →
              </button>
            </div>
            <div className="mt-4 space-y-2.5">
              {TENANT_MODULE_META.slice(0, 6).map(mod => {
                const count = state.tenants.filter(t => t.modules[mod.key]).length;
                const pct = Math.round((count / Math.max(1, state.tenants.length)) * 100);
                const pctColor =
                  pct >= 90
                    ? { badge: "border-emerald-200 bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" }
                    : pct >= 50
                      ? { badge: "border-violet-200 bg-violet-50 text-violet-700", bar: "bg-violet-500" }
                      : { badge: "border-amber-200 bg-amber-50 text-amber-800", bar: "bg-amber-500" };
                return (
                  <div key={mod.key}>
                    <div className="flex items-center justify-between gap-2 text-[12px]">
                      <span className="font-medium text-slate-800">{mod.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500">{count}/{state.tenants.length} orgs</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${pctColor.badge}`}>{pct}%</span>
                      </div>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full transition-all ${pctColor.bar}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[12px]">
              <div>
                <b className="text-slate-950">SSLCommerz · {state.gateway.storeId}</b>
                <span className="block text-[11px] text-slate-500">{enabledChannelsCount}/{state.gateway.channels.length} channels · IPN {state.gateway.ipnEnabled ? "Enabled" : "Off"}</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("subscriptions")}
                className="rounded-lg bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-white"
              >
                Configure
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Live activity</p>
                <h2 className="mt-0.5 text-[16px] font-bold text-slate-950">Recent audit events</h2>
              </div>
              <button type="button" onClick={() => onNavigateTab("audit")} className="text-[12px] font-semibold text-slate-600 hover:text-slate-950">
                View all →
              </button>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {state.audit.slice(0, 4).map(entry => (
                <div key={entry.id} className="flex items-start justify-between gap-3 py-2.5 text-[12px] first:pt-1 last:pb-0">
                  <div className="min-w-0">
                    <span className="font-semibold text-slate-900">{entry.action}</span>
                    <div className="mt-0.5 text-[11px] text-slate-500">{entry.actor} · {entry.target}</div>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-slate-400">{entry.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export function OrganisationsView(props: SuperAdminViewProps) {
  const { state, selectedTenantId, onSelectTenantId, onOpenNewTenant, onPatchTenant, onUpdateState, onImpersonateTenant, onOpenStorefront } = props;
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | TenantStatus>("All");
  const [panelTab, setPanelTab] = useState<"controls" | "modules" | "guardrails">("controls");

  const selected = state.tenants.find(item => item.id === selectedTenantId) || state.tenants[0];
  const filteredTenants = state.tenants.filter(item => {
    const matchesQuery = `${item.name} ${item.owner} ${item.slug} ${item.city}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handlePlanChange = (nextPlanName: string) => {
    const matchedPlan = state.plans.find(p => p.name === nextPlanName);
    const maxBranches = matchedPlan?.locationsCap === "Unlimited" ? 99 : Number(matchedPlan?.locationsCap || 3);
    const maxRegisters = matchedPlan?.registersCap === "Unlimited" ? 99 : Number(matchedPlan?.registersCap || 8);
    const maxStaff = matchedPlan?.staffCap === "Unlimited" ? 120 : Number(matchedPlan?.staffCap || 20);
    onPatchTenant(
      selected.id,
      {
        plan: nextPlanName,
        mrr: matchedPlan?.price === "Custom" ? `৳ ${(matchedPlan.priceNumeric || 24000).toLocaleString()}` : matchedPlan?.price || selected.mrr,
        mrrNumeric: matchedPlan?.priceNumeric || selected.mrrNumeric,
        maxBranches,
        maxRegisters,
        maxStaff,
      },
      `${selected.name} switched to ${nextPlanName} plan & quotas updated`,
      "Tenant",
    );
  };

  const toggleModule = (key: TenantModuleKey, label: string) => {
    const nextValue = !selected.modules[key];
    onPatchTenant(
      selected.id,
      { modules: { ...selected.modules, [key]: nextValue } },
      `${label} ${nextValue ? "enabled" : "disabled"} for ${selected.name}`,
      "Feature",
    );
  };

  return (
    <>
      <PanelTitle
        eyebrow="Tenant lifecycle & POS control"
        title="Organisations"
        text="Control workspace access, subscription quotas, active Selim Electronics POS modules, storefront checkout, and policy guardrails for every tenant."
        action={
          <button type="button" onClick={onOpenNewTenant} className="rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-bold text-white">
            + New organisation
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.95fr]">
        <Card className="overflow-hidden">
          <div className="space-y-3 border-b border-slate-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search organisation, owner, slug, or city…"
                className="h-10 min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3.5 text-[13px] outline-none focus:border-slate-950"
              />
              <span className="text-[12px] font-semibold text-slate-500">{filteredTenants.length} of {state.tenants.length} orgs</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["All", "Active", "Trialing", "Pending", "Paused"] as const).map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setStatusFilter(chip)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${statusFilter === chip ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredTenants.map(tenant => (
              <button
                key={tenant.id}
                type="button"
                onClick={() => onSelectTenantId(tenant.id)}
                className={`grid w-full grid-cols-[1.35fr_0.65fr_0.65fr_0.65fr] items-center gap-3 px-5 py-4 text-left transition ${selected.id === tenant.id ? "bg-slate-950/[0.04]" : "hover:bg-slate-50"}`}
              >
                <span>
                  <b className="block text-[13px] text-slate-950">{tenant.name}</b>
                  <small className="mt-0.5 block text-[11px] text-slate-500">{tenant.owner} · /{tenant.slug}</small>
                </span>
                <span className="text-[12px] font-semibold text-slate-700">{tenant.plan}</span>
                <span className="text-[12px] text-slate-600">{tenant.branches} branches · {tenant.skusCount} SKUs</span>
                <span><StatusPill value={tenant.status} /></span>
              </button>
            ))}
            {filteredTenants.length === 0 && (
              <div className="p-8 text-center text-[13px] text-slate-500">No organisations match the current filter.</div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.17em] text-slate-500">Selected workspace</p>
              <h2 className="mt-1 text-[21px] font-black text-slate-950">{selected.name}</h2>
              <p className="mt-0.5 text-[12px] text-slate-500">/{selected.slug} · {selected.city}, {selected.country} · {selected.phone}</p>
            </div>
            <StatusPill value={selected.status} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
            {[
              { id: "controls", label: "Quotas & Access" },
              { id: "modules", label: "POS Modules" },
              { id: "guardrails", label: "Guardrails" },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPanelTab(tab.id as typeof panelTab)}
                className={`rounded-lg py-1.5 text-[11px] font-bold transition ${panelTab === tab.id ? "bg-white text-slate-950 shadow-xs" : "text-slate-600 hover:text-slate-950"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {panelTab === "controls" && (
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Branches", used: selected.branches, cap: selected.maxBranches },
                  { label: "POS Registers", used: selected.registers, cap: selected.maxRegisters },
                  { label: "Staff Seats", used: selected.staff, cap: selected.maxStaff },
                ].map(q => {
                  const pct = q.cap >= 99 ? 20 : Math.min(100, Math.round((q.used / Math.max(1, q.cap)) * 100));
                  const tone =
                    pct >= 85
                      ? { badge: "bg-rose-50 text-rose-700 border-rose-200", bar: "bg-rose-500" }
                      : pct >= 55
                        ? { badge: "bg-amber-50 text-amber-800 border-amber-200", bar: "bg-amber-500" }
                        : { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "bg-emerald-500" };
                  return (
                    <div key={q.label} className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{q.label}</span>
                        <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold ${tone.badge}`}>
                          {q.cap >= 99 ? "∞" : `${pct}%`}
                        </span>
                      </div>
                      <div className="mt-1 text-[14px] font-black text-slate-950">{q.used} / {q.cap >= 99 ? "∞" : q.cap}</div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                        <div className={`h-full rounded-full transition-all ${tone.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <label className="block text-[12px] font-semibold text-slate-800">
                Subscription tier
                <select
                  value={selected.plan}
                  onChange={event => handlePlanChange(event.target.value)}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] font-medium"
                >
                  {state.plans.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.price}/mo · {p.locationsCap === "Unlimited" ? "Unlimited" : `${p.locationsCap} branch(es)`})
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Max branches
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={selected.maxBranches}
                    onChange={event => onPatchTenant(selected.id, { maxBranches: Math.max(1, Number(event.target.value) || 1) }, `${selected.name} branch quota set to ${event.target.value}`)}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold text-slate-950"
                  />
                </label>
                <label className="block text-[11px] font-semibold text-slate-600">
                  Max registers
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={selected.maxRegisters}
                    onChange={event => onPatchTenant(selected.id, { maxRegisters: Math.max(1, Number(event.target.value) || 1) }, `${selected.name} register quota set to ${event.target.value}`)}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold text-slate-950"
                  />
                </label>
                <label className="block text-[11px] font-semibold text-slate-600">
                  Max staff
                  <input
                    type="number"
                    min={1}
                    max={250}
                    value={selected.maxStaff}
                    onChange={event => onPatchTenant(selected.id, { maxStaff: Math.max(1, Number(event.target.value) || 1) }, `${selected.name} staff quota set to ${event.target.value}`)}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold text-slate-950"
                  />
                </label>
              </div>

              <div className="space-y-3 rounded-xl border border-slate-200 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <b className="block text-[13px] text-slate-950">Workspace sign-in access</b>
                    <span className="text-[11px] text-slate-500">Allow {selected.owner} & {selected.staff} staff to open POS</span>
                  </div>
                  <ToggleControl
                    checked={selected.access}
                    onChange={() => onPatchTenant(selected.id, { access: !selected.access, status: !selected.access ? "Active" : "Paused" }, `${selected.name} access ${selected.access ? "suspended" : "restored"}`)}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <b className="block text-[13px] text-slate-950">Read-only maintenance mode</b>
                    <span className="text-[11px] text-slate-500">Show audit lock banner inside tenant POS</span>
                  </div>
                  <ToggleControl
                    checked={selected.maintenance}
                    onChange={() => onPatchTenant(selected.id, { maintenance: !selected.maintenance }, `${selected.name} maintenance mode ${selected.maintenance ? "disabled" : "enabled"}`)}
                  />
                </div>
              </div>
            </div>
          )}

          {panelTab === "modules" && (
            <div className="mt-4 max-h-[360px] space-y-2.5 overflow-y-auto pr-1">
              <p className="text-[11px] text-slate-500">Changes below take effect live inside {selected.name}&apos;s POS navigation & storefront.</p>
              {TENANT_MODULE_META.map(mod => (
                <div key={mod.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="min-w-0">
                    <b className="block text-[12px] text-slate-950">{mod.label}</b>
                    <span className="block text-[11px] text-slate-500">{mod.description}</span>
                  </div>
                  <ToggleControl checked={selected.modules[mod.key]} onChange={() => toggleModule(mod.key, mod.label)} />
                </div>
              ))}
            </div>
          )}

          {panelTab === "guardrails" && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="text-[11px] font-semibold text-slate-700">
                  Invoice prefix
                  <input
                    value={selected.policy.invoicePrefix}
                    onChange={event => onPatchTenant(selected.id, { policy: { ...selected.policy, invoicePrefix: event.target.value } }, `${selected.name} invoice prefix updated`)}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold"
                  />
                </label>
                <label className="text-[11px] font-semibold text-slate-700">
                  Low-stock alert threshold
                  <input
                    type="number"
                    min={1}
                    value={selected.policy.lowStockThreshold}
                    onChange={event => onPatchTenant(selected.id, { policy: { ...selected.policy, lowStockThreshold: Number(event.target.value) || 5 } }, `${selected.name} stock threshold updated`)}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold"
                  />
                </label>
              </div>
              {[
                { key: "allowNegativeStock" as const, label: "Allow negative stock sales", sub: "Permit checkout when SKU stock hits zero" },
                { key: "requireAdjustmentApproval" as const, label: "Stock adjustment approval", sub: "Require manager review for stock edits" },
                { key: "allowCustomerDue" as const, label: "Credit / customer due sales", sub: "Allow Due payment option in POS terminal" },
                { key: "enforceTwoStepStaff" as const, label: "Enforce staff 2-step verification", sub: "Require MFA for cashier & manager logins" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
                  <div>
                    <b className="block text-[12px] text-slate-950">{item.label}</b>
                    <span className="text-[11px] text-slate-500">{item.sub}</span>
                  </div>
                  <ToggleControl
                    checked={selected.policy[item.key]}
                    onChange={() => onPatchTenant(selected.id, { policy: { ...selected.policy, [item.key]: !selected.policy[item.key] } }, `${selected.name} guardrail ${item.label} updated`)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled={!state.governance.allowTenantImpersonation}
                onClick={() => onImpersonateTenant(selected.slug, "dashboard")}
                className="rounded-xl bg-slate-950 px-3 py-2.5 text-[12px] font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                View POS as tenant →
              </button>
              <button
                type="button"
                onClick={() => onOpenStorefront(selected.slug)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[12px] font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Open storefront ↗
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() =>
                  onPatchTenant(
                    selected.id,
                    { access: !selected.access, status: selected.access ? "Paused" : "Active" },
                    `${selected.name} ${selected.access ? "suspended" : "activated"} by Super Admin`,
                    "Tenant",
                  )
                }
                className={`rounded-xl border px-3 py-2 text-[11px] font-bold transition ${
                  selected.access
                    ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {selected.access ? "Suspend access" : "Activate access"}
              </button>
              <button
                type="button"
                disabled={state.tenants.length <= 1 || selected.slug === "selim-electronics"}
                onClick={() => {
                  const fallback = state.tenants.find(t => t.id !== selected.id);
                  onUpdateState(
                    prev => ({
                      ...prev,
                      tenants: prev.tenants.filter(t => t.id !== selected.id),
                      invoices: prev.invoices.filter(inv => inv.tenantName !== selected.name),
                    }),
                    `Deleted organisation ${selected.name}`,
                    "Tenant",
                    selected.name,
                  );
                  if (fallback) onSelectTenantId(fallback.id);
                }}
                title={selected.slug === "selim-electronics" ? "Primary demo workspace is protected" : "Remove tenant workspace"}
                className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Delete workspace
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export function VerificationView(props: SuperAdminViewProps) {
  const { state, onPatchTenant, onUpdateState } = props;
  const [filter, setFilter] = useState<"Pending" | "Verified" | "All">("Pending");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(state.tenants.find(t => t.verification !== "Verified")?.id || state.tenants[0]?.id || "");

  const pendingCount = state.tenants.filter(t => t.verification !== "Verified").length;
  const verifiedCount = state.tenants.filter(t => t.verification === "Verified").length;

  const visibleList = state.tenants.filter(item => {
    const matchesTab = filter === "All" ? true : filter === "Verified" ? item.verification === "Verified" : item.verification !== "Verified";
    const matchesQuery = `${item.name} ${item.owner} ${item.email} ${item.city} ${item.tradeLicense} ${item.slug}`.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesQuery;
  });
  const activeApplicant = state.tenants.find(t => t.id === selectedId) || visibleList[0] || state.tenants[0];
  const reg = activeApplicant?.registration;

  const toggleDoc = (docKey: keyof PlatformTenant["docs"], label: string) => {
    if (!activeApplicant) return;
    const nextDocs = { ...activeApplicant.docs, [docKey]: !activeApplicant.docs[docKey] };
    onPatchTenant(activeApplicant.id, { docs: nextDocs }, `${label} check marked ${nextDocs[docKey] ? "verified" : "pending"} for ${activeApplicant.name}`, "KYC");
  };

  const formatBillingMethod = (method?: string) => {
    if (!method) return "Not specified";
    if (method === "trial") return "14-day Free Trial";
    if (method === "card") return "Card Payment";
    if (method === "bank") return "Bank Transfer / Invoice";
    if (method === "mobile") return "Mobile Wallet (SSLCommerz)";
    return method;
  };

  const activeDocCount = activeApplicant ? Object.values(activeApplicant.docs).filter(Boolean).length : 0;

  return (
    <>
      <PanelTitle
        eyebrow="Onboarding &amp; KYC"
        title="Verification queue"
        text="Inspect every detail submitted during merchant registration — business identity, legal numbers, billing setup, and compliance documents — before activating workspaces."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
              {([
                { id: "Pending", label: `Pending (${pendingCount})` },
                { id: "Verified", label: `Verified (${verifiedCount})` },
                { id: "All", label: `All (${state.tenants.length})` },
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${filter === tab.id ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.15fr]">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 p-3.5">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search business, owner, email, license or slug…"
                className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-[12px] outline-none focus:border-slate-950 focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-[1.35fr_0.6fr_0.7fr_0.85fr] gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500">
              <span>Applicant / Owner</span>
              <span>Plan</span>
              <span>Docs</span>
              <span>Review state</span>
            </div>
            <div className="divide-y divide-slate-100">
              {visibleList.map(tenant => {
                const docCount = Object.values(tenant.docs).filter(Boolean).length;
                const docTone =
                  docCount === 4
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : docCount >= 2
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-rose-200 bg-rose-50 text-rose-700";
                const selectedRow = activeApplicant?.id === tenant.id;
                return (
                  <button
                    key={tenant.id}
                    type="button"
                    onClick={() => setSelectedId(tenant.id)}
                    className={`grid w-full grid-cols-[1.35fr_0.6fr_0.7fr_0.85fr] items-center gap-3 border-l-2 px-5 py-4 text-left text-[13px] transition ${
                      selectedRow ? "border-l-slate-950 bg-slate-950/[0.03]" : "border-l-transparent hover:bg-slate-50"
                    }`}
                  >
                    <span className="min-w-0">
                      <b className="block truncate text-slate-950">{tenant.name}</b>
                      <small className="mt-0.5 block truncate text-[11px] text-slate-500">
                        {tenant.owner} · {tenant.city} · {tenant.joinedAt}
                      </small>
                    </span>
                    <span className="text-[12px] font-semibold text-slate-700">{tenant.plan}</span>
                    <span>
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${docTone}`}>
                        {docCount}/4 docs
                      </span>
                    </span>
                    <span><StatusPill value={tenant.verification} /></span>
                  </button>
                );
              })}
              {visibleList.length === 0 && (
                <div className="p-8 text-center text-[13px] text-slate-500">No onboarding requests match this filter.</div>
              )}
            </div>
          </Card>

          <Card className="flex items-center justify-between gap-4 p-4">
            <div>
              <b className="block text-[13px] text-slate-950">Require manual Super Admin activation</b>
              <span className="text-[11px] text-slate-500">Hold every new /signup request in Pending until reviewed &amp; approved here</span>
            </div>
            <ToggleControl
              checked={state.governance.manualTenantActivation}
              onChange={() =>
                onUpdateState(
                  prev => ({ ...prev, governance: { ...prev.governance, manualTenantActivation: !prev.governance.manualTenantActivation } }),
                  `Manual tenant activation ${!state.governance.manualTenantActivation ? "enabled" : "disabled"}`,
                  "Security",
                  "Approval policy",
                )
              }
            />
          </Card>
        </div>

        {activeApplicant && (
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Registration dossier</p>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    /{activeApplicant.slug}/login
                  </span>
                  <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                    {activeApplicant.plan} · {activeApplicant.mrr || "Trial"}
                  </span>
                </div>
                <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-slate-950">{activeApplicant.name}</h2>
                <p className="mt-0.5 text-[12px] text-slate-500">
                  Submitted {reg?.submittedAt || activeApplicant.joinedAt} · {activeApplicant.entityType} · {activeApplicant.country}
                </p>
              </div>
              <StatusPill value={activeApplicant.verification} />
            </div>

            {/* Section 1: Owner & Contact */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">1. Account owner &amp; contact</p>
              <div className="grid gap-2.5 sm:grid-cols-3 text-[12px]">
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Full Legal Name</span>
                  <b className="mt-1 block truncate text-slate-950">{activeApplicant.owner}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Work Email</span>
                  <b className="mt-1 block truncate text-slate-950">{activeApplicant.email}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Mobile Number</span>
                  <b className="mt-1 block truncate text-slate-950">{activeApplicant.phone}</b>
                </div>
              </div>
            </div>

            {/* Section 2: Business & First Location */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">2. Business &amp; first store location</p>
              <div className="grid gap-2.5 sm:grid-cols-2 text-[12px]">
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Registered Legal Name</span>
                  <b className="mt-1 block truncate text-slate-950">{reg?.legalName || activeApplicant.name}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Entity Type &amp; Currency</span>
                  <b className="mt-1 block truncate text-slate-950">{activeApplicant.entityType} · {reg?.currency || "BDT"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">First Branch / Store</span>
                  <b className="mt-1 block truncate text-slate-950">{reg?.firstBranchName || "Main Store"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Operating Address</span>
                  <b className="mt-1 block truncate text-slate-950">{reg?.businessAddress || activeApplicant.city}</b>
                </div>
              </div>
            </div>

            {/* Section 3: Tax & Compliance Identifiers */}
            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">3. Compliance &amp; tax identifiers</p>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                  reg?.authorizedConfirmed !== false
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}>
                  {reg?.authorizedConfirmed !== false ? "Owner declaration signed" : "Declaration missing"}
                </span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 text-[12px]">
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Trade / Operating License</span>
                  <b className="mt-1 block truncate font-mono text-[11px] text-slate-950">{activeApplicant.tradeLicense || "Not provided"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">VAT / BIN Registration</span>
                  <b className="mt-1 block truncate font-mono text-[11px] text-slate-950">{activeApplicant.vatBin || "Not provided"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Taxpayer / Tax ID</span>
                  <b className="mt-1 block truncate font-mono text-[11px] text-slate-950">{reg?.taxId || "Not provided"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Incorporation / Reg. No</span>
                  <b className="mt-1 block truncate font-mono text-[11px] text-slate-950">{reg?.incorporationNumber || "Not provided"}</b>
                </div>
              </div>
            </div>

            {/* Section 4: Billing & Trial Preference */}
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">4. Trial &amp; billing details</p>
              <div className="grid gap-2.5 sm:grid-cols-2 text-[12px]">
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Billing Preference</span>
                  <b className="mt-1 block truncate text-slate-950">{formatBillingMethod(reg?.billingMethod)}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Payment Reference</span>
                  <b className="mt-1 block truncate font-mono text-[11px] text-slate-950">{reg?.paymentReference || "None"}</b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Billing Contact</span>
                  <b className="mt-1 block truncate text-slate-950">
                    {reg?.billingContact || activeApplicant.owner} · {reg?.billingEmail || activeApplicant.email}
                  </b>
                </div>
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Billing Address</span>
                  <b className="mt-1 block truncate text-slate-950">{reg?.billingAddress || reg?.businessAddress || activeApplicant.city}</b>
                </div>
              </div>
            </div>

            {/* Section 5: Document Checklist */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">5. Document verification checklist</p>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                  activeDocCount === 4
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : activeDocCount >= 2
                      ? "border-amber-200 bg-amber-50 text-amber-800"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                }`}>
                  {activeDocCount}/4 checked
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { key: "ownerId" as const, label: "Owner national ID / passport" },
                  { key: "tradeLicense" as const, label: "Valid trade / operating license" },
                  { key: "addressProof" as const, label: "Showroom / store address proof" },
                  { key: "taxCert" as const, label: "TIN / VAT registration certificate" },
                ].map(doc => (
                  <div key={doc.key} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-[12px]">
                    <span className="truncate font-medium text-slate-800">{doc.label}</span>
                    <ToggleControl checked={activeApplicant.docs[doc.key]} onChange={() => toggleDoc(doc.key, doc.label)} />
                  </div>
                ))}
              </div>
            </div>

            <label className="mt-4 block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Super Admin reviewer note
              <textarea
                rows={2}
                value={activeApplicant.verificationNote}
                onChange={event => onPatchTenant(activeApplicant.id, { verificationNote: event.target.value }, `Updated KYC note for ${activeApplicant.name}`, "KYC")}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-[12px] font-normal normal-case tracking-normal text-slate-900 outline-none focus:border-slate-950"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onPatchTenant(
                      activeApplicant.id,
                      { verification: "Verified" as VerificationStatus, status: "Active", access: true },
                      `${activeApplicant.name} approved & POS workspace activated`,
                      "KYC",
                    )
                  }
                  className="rounded-xl bg-emerald-600 px-3.5 py-2 text-[12px] font-bold text-white shadow-xs transition hover:bg-emerald-700"
                >
                  Approve &amp; activate
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onPatchTenant(
                      activeApplicant.id,
                      { verification: "Documents requested" as VerificationStatus },
                      `Requested compliance documents from ${activeApplicant.name}`,
                      "KYC",
                    )
                  }
                  className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-[12px] font-bold text-amber-800 transition hover:bg-amber-100"
                >
                  Request documents
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onPatchTenant(
                      activeApplicant.id,
                      { verification: "Rejected" as VerificationStatus, status: "Restricted", access: false },
                      `${activeApplicant.name} restricted pending compliance resolution`,
                      "KYC",
                    )
                  }
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-[12px] font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  Restrict
                </button>
              </div>
              {state.tenants.length > 1 && activeApplicant.slug !== "selim-electronics" && (
                <button
                  type="button"
                  onClick={() => {
                    const nextTenant = state.tenants.find(t => t.id !== activeApplicant.id);
                    onUpdateState(
                      prev => ({
                        ...prev,
                        tenants: prev.tenants.filter(t => t.id !== activeApplicant.id),
                        invoices: prev.invoices.filter(inv => inv.tenantName !== activeApplicant.name),
                      }),
                      `Deleted onboarding request for ${activeApplicant.name}`,
                      "KYC",
                      activeApplicant.name,
                    );
                    if (nextTenant) setSelectedId(nextTenant.id);
                  }}
                  className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-50"
                >
                  Delete request
                </button>
              )}
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

export function SubscriptionsView(props: SuperAdminViewProps) {
  const { state, onUpdateState, onPatchTenant } = props;
  const [subTab, setSubTab] = useState<"invoices" | "plans" | "sslcommerz">("invoices");
  const [newPlanOpen, setNewPlanOpen] = useState(false);
  const [newFeatureOpen, setNewFeatureOpen] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState<"All" | "Paid" | "Overdue" | "Retrying" | "Trial">("All");
  const [newInvoiceTenantId, setNewInvoiceTenantId] = useState(state.tenants[0]?.id || "selim");
  const [newInvoiceAmount, setNewInvoiceAmount] = useState("5900");

  const paidTotal = state.invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amountNumeric, 0);
  const overdueCount = state.invoices.filter(i => i.status === "Overdue" || i.status === "Retrying").length;
  const filteredInvoices = state.invoices.filter(inv => invoiceFilter === "All" || inv.status === invoiceFilter);

  const exportCsv = () => {
    const header = "Invoice ID,Tenant,Plan,Amount,Due Date,Method,Status,Transaction ID";
    const rows = state.invoices.map(i => `${i.id},"${i.tenantName}",${i.plan},${i.amountNumeric},${i.dueDate},${i.method},${i.status},${i.trxId}`);
    downloadTextFile("devengine-revenue-ledger.csv", "text/csv;charset=utf-8", [header, ...rows].join("\n"));
    onUpdateState(prev => prev, "Exported revenue & invoice CSV report", "Billing", "Revenue CSV");
  };

  const issueInvoice = () => {
    const tenant = state.tenants.find(t => t.id === newInvoiceTenantId) || state.tenants[0];
    const amt = Math.max(0, Number(newInvoiceAmount) || 0);
    const nextNum = 2410 + state.invoices.length;
    onUpdateState(
      prev => ({
        ...prev,
        invoices: [
          {
            id: `INV-${nextNum}`,
            tenantId: tenant.id,
            tenantName: tenant.name,
            plan: tenant.plan,
            amount: `৳ ${amt.toLocaleString()}`,
            amountNumeric: amt,
            dueDate: "30 Nov 2026",
            method: "SSLCommerz",
            status: "Retrying",
            trxId: `SSLCZ-INIT-${nextNum}`,
          },
          ...prev.invoices,
        ],
      }),
      `Issued INV-${nextNum} (৳ ${amt.toLocaleString()}) to ${tenant.name}`,
      "Billing",
      tenant.name,
    );
  };

  return (
    <>
      <PanelTitle
        eyebrow="Billing & gateway operations"
        title="Subscriptions & SSLCommerz"
        text="Manage tenant subscription invoices, retry failed collections, control live vs sandbox SSLCommerz credentials, and configure accepted payment channels."
        action={
          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              {[
                { id: "invoices", label: "Invoices & Recovery" },
                { id: "plans", label: "Plans & Feature Access" },
                { id: "sslcommerz", label: "SSLCommerz Gateway" },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSubTab(tab.id as typeof subTab)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${subTab === tab.id ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {subTab === "plans" ? (
              <>
                <button
                  type="button"
                  onClick={() => { setNewFeatureOpen(v => !v); setNewPlanOpen(false); }}
                  className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-bold text-violet-700 hover:bg-violet-100"
                >
                  + Add new feature
                </button>
                <button
                  type="button"
                  onClick={() => { setNewPlanOpen(v => !v); setNewFeatureOpen(false); }}
                  className="rounded-xl bg-slate-950 px-3 py-2 text-[11px] font-bold text-white hover:bg-slate-800"
                >
                  + Add new plan
                </button>
              </>
            ) : (
              <button type="button" onClick={exportCsv} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-bold text-slate-800 hover:bg-slate-50">
                Export CSV
              </button>
            )}
          </div>
        }
      />

      {subTab === "plans" ? (
        <div className="mt-6">
          <PlansManagerSection
            state={state}
            onUpdateState={onUpdateState}
            newPlanOpen={newPlanOpen}
            setNewPlanOpen={setNewPlanOpen}
            newFeatureOpen={newFeatureOpen}
            setNewFeatureOpen={setNewFeatureOpen}
          />
        </div>
      ) : subTab === "invoices" ? (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Collected this cycle", value: `৳ ${paidTotal.toLocaleString()}` },
              { label: "Invoices needing recovery", value: String(overdueCount) },
              { label: "Gateway mode", value: state.gateway.environment },
              { label: "Active payment channels", value: `${state.gateway.channels.filter(c => c.enabled).length} / ${state.gateway.channels.length}` },
            ].map(stat => (
              <Card key={stat.label} className="p-4">
                <p className="text-[11px] font-semibold text-slate-500">{stat.label}</p>
                <p className="mt-2.5 text-[24px] font-black text-slate-950">{stat.value}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-5 p-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {(["All", "Paid", "Overdue", "Retrying", "Trial"] as const).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setInvoiceFilter(f)}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${invoiceFilter === f ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={newInvoiceTenantId}
                  onChange={e => setNewInvoiceTenantId(e.target.value)}
                  className="h-9 rounded-lg border border-slate-200 px-2.5 text-[12px] font-semibold"
                >
                  {state.tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <input
                  type="number"
                  value={newInvoiceAmount}
                  onChange={e => setNewInvoiceAmount(e.target.value)}
                  placeholder="Amount (BDT)"
                  className="h-9 w-28 rounded-lg border border-slate-200 px-2.5 text-[12px] font-bold"
                />
                <button type="button" onClick={issueInvoice} className="h-9 rounded-lg bg-slate-950 px-3 text-[11px] font-bold text-white hover:bg-slate-800">
                  + Issue invoice
                </button>
              </div>
            </div>
          </Card>

          <Card className="mt-4 overflow-hidden">
            <div className="grid grid-cols-[0.75fr_1.2fr_0.65fr_0.8fr_0.7fr_1.1fr] gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
              <span>Invoice</span>
              <span>Organisation</span>
              <span>Amount</span>
              <span>Channel / Trx</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {filteredInvoices.map(inv => {
              const matchedTenant = state.tenants.find(t => t.id === inv.tenantId);
              return (
                <div key={inv.id} className="grid grid-cols-[0.75fr_1.2fr_0.65fr_0.8fr_0.7fr_1.1fr] items-center gap-3 border-b border-slate-100 px-5 py-4 text-[12px] last:border-0">
                  <b className="font-mono text-slate-950">{inv.id}</b>
                  <span>
                    <b className="block text-slate-900">{inv.tenantName}</b>
                    <small className="text-[11px] text-slate-500">{inv.plan} · Due {inv.dueDate}</small>
                  </span>
                  <span className="font-bold text-slate-950">{inv.amount}</span>
                  <span>
                    <span className="block font-medium text-slate-700">{inv.method}</span>
                    <small className="font-mono text-[10px] text-slate-400">{inv.trxId}</small>
                  </span>
                  <div><StatusPill value={inv.status} /></div>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.status !== "Paid" && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateState(
                            prev => ({
                              ...prev,
                              invoices: prev.invoices.map(item => item.id === inv.id ? { ...item, status: "Paid", trxId: `SSLCZ-${Math.floor(100000 + Math.random() * 899999)}` } : item),
                            }),
                            `Collected ${inv.id} (${inv.tenantName}) via SSLCommerz`,
                            "Billing",
                            inv.id,
                          )
                        }
                        className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-xs transition hover:bg-emerald-700"
                      >
                        Mark Paid
                      </button>
                    )}
                    {matchedTenant && (
                      <button
                        type="button"
                        onClick={() =>
                          onPatchTenant(
                            matchedTenant.id,
                            { status: matchedTenant.status === "Paused" ? "Active" : "Paused", access: matchedTenant.status === "Paused" },
                            `${matchedTenant.name} billing ${matchedTenant.status === "Paused" ? "resumed" : "paused"}`,
                            "Billing",
                          )
                        }
                        className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition ${
                          matchedTenant.status === "Paused"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                        }`}
                      >
                        {matchedTenant.status === "Paused" ? "Resume" : "Pause"}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={state.invoices.length <= 1}
                      onClick={() =>
                        onUpdateState(
                          prev => ({
                            ...prev,
                            invoices: prev.invoices.filter(item => item.id !== inv.id),
                          }),
                          `Voided & removed invoice ${inv.id} (${inv.tenantName})`,
                          "Billing",
                          inv.id,
                        )
                      }
                      className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </Card>
        </>
      ) : (
        <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Payment gateway configuration</p>
                <h2 className="mt-1 text-[20px] font-black text-slate-950">SSLCommerz Store & IPN</h2>
              </div>
              <StatusPill value={state.gateway.environment} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-[12px] font-semibold text-slate-700">
                Environment
                <select
                  value={state.gateway.environment}
                  onChange={e =>
                    onUpdateState(
                      prev => ({ ...prev, gateway: { ...prev.gateway, environment: e.target.value as "Sandbox" | "Live" } }),
                      `SSLCommerz environment switched to ${e.target.value}`,
                      "Gateway",
                      state.gateway.storeId,
                    )
                  }
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] font-bold"
                >
                  <option value="Sandbox">Sandbox (Testbox)</option>
                  <option value="Live">Live Production</option>
                </select>
              </label>
              <label className="text-[12px] font-semibold text-slate-700">
                Store ID
                <input
                  value={state.gateway.storeId}
                  onChange={e => onUpdateState(prev => ({ ...prev, gateway: { ...prev.gateway, storeId: e.target.value } }), "Updated SSLCommerz Store ID", "Gateway")}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 font-mono text-[12px]"
                />
              </label>
              <label className="text-[12px] font-semibold text-slate-700">
                Registered Store Name
                <input
                  value={state.gateway.storeName}
                  onChange={e => onUpdateState(prev => ({ ...prev, gateway: { ...prev.gateway, storeName: e.target.value } }), "Updated SSLCommerz store name", "Gateway")}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[12px]"
                />
              </label>
              <label className="text-[12px] font-semibold text-slate-700">
                Base URL
                <input
                  value={state.gateway.baseUrl}
                  onChange={e => onUpdateState(prev => ({ ...prev, gateway: { ...prev.gateway, baseUrl: e.target.value } }), "Updated SSLCommerz base URL", "Gateway")}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 font-mono text-[12px]"
                />
              </label>
            </div>

            <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <b className="block text-[13px] text-slate-950">HTTP IPN Listener</b>
                  <span className="text-[11px] text-slate-500">Verify instant payment notifications from SSLCommerz</span>
                </div>
                <ToggleControl
                  checked={state.gateway.ipnEnabled}
                  onChange={() =>
                    onUpdateState(
                      prev => ({ ...prev, gateway: { ...prev.gateway, ipnEnabled: !prev.gateway.ipnEnabled } }),
                      `SSLCommerz IPN listener ${!state.gateway.ipnEnabled ? "enabled" : "disabled"}`,
                      "Gateway",
                    )
                  }
                />
              </div>
              <input
                value={state.gateway.ipnUrl}
                onChange={e => onUpdateState(prev => ({ ...prev, gateway: { ...prev.gateway, ipnUrl: e.target.value } }), "Updated IPN callback URL", "Gateway")}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-[11px] text-slate-700"
              />
              <button
                type="button"
                onClick={() => onUpdateState(prev => prev, `Verified SSLCommerz ${state.gateway.environment} IPN handshake for ${state.gateway.storeId}`, "Gateway", state.gateway.storeId)}
                className="rounded-lg bg-slate-950 px-3.5 py-2 text-[11px] font-bold text-white hover:bg-slate-800"
              >
                Test IPN verification handshake
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Accepted payment channels</p>
                <h2 className="mt-1 text-[20px] font-black text-slate-950">SSLCommerz channel matrix</h2>
              </div>
              <span className="text-[12px] font-bold text-slate-500">
                {state.gateway.channels.filter(c => c.enabled).length} active
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {(["Cards", "Mobile Banking", "Internet Banking"] as const).map(group => (
                <div key={group}>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">{group}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {state.gateway.channels
                      .filter(c => c.group === group)
                      .map(ch => (
                        <div key={ch.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5">
                          <span className="text-[12px] font-bold text-slate-900">{ch.label}</span>
                          <ToggleControl
                            checked={ch.enabled}
                            onChange={() =>
                              onUpdateState(
                                prev => ({
                                  ...prev,
                                  gateway: {
                                    ...prev.gateway,
                                    channels: prev.gateway.channels.map(item => item.id === ch.id ? { ...item, enabled: !item.enabled } : item),
                                  },
                                }),
                                `${ch.label} payment channel ${ch.enabled ? "disabled" : "enabled"}`,
                                "Gateway",
                                ch.label,
                              )
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

function PlansManagerSection({
  state,
  onUpdateState,
  newPlanOpen,
  setNewPlanOpen,
  newFeatureOpen,
  setNewFeatureOpen,
}: {
  state: PlatformState;
  onUpdateState: SuperAdminViewProps["onUpdateState"];
  newPlanOpen: boolean;
  setNewPlanOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  newFeatureOpen: boolean;
  setNewFeatureOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const customFeatures = state.planFeatures || [];
  const [draftPlan, setDraftPlan] = useState({
    name: "",
    priceNumeric: "9900",
    priceLabel: "৳ 9,900",
    note: "Tailored multi-store retail operations.",
    locationsCap: "10",
    registersCap: "25",
    staffCap: "50",
    support: "Priority",
    popular: false,
    includedModules: ["posCheckout", "multiBranch", "storefront", "delivery", "supplierPayables", "customerCredit", "sslcommerzOnline"] as TenantModuleKey[],
  });
  const [draftFeature, setDraftFeature] = useState({
    name: "",
    description: "",
    category: "POS" as PlanCustomFeature["category"],
    enabledPlanIds: state.plans.filter(p => p.id !== "starter").map(p => p.id),
  });

  const updatePlanField = (planId: PlatformPlan["id"], patch: Partial<PlatformPlan>, message: string) => {
    onUpdateState(
      prev => ({
        ...prev,
        plans: prev.plans.map(p => (p.id === planId ? { ...p, ...patch } : p)),
      }),
      message,
      "Feature",
      planId,
    );
  };

  const togglePlanModule = (plan: PlatformPlan, moduleKey: TenantModuleKey) => {
    const exists = plan.includedModules.includes(moduleKey);
    const nextModules = exists
      ? plan.includedModules.filter(m => m !== moduleKey)
      : [...plan.includedModules, moduleKey];
    updatePlanField(plan.id, { includedModules: nextModules }, `${plan.name} plan module entitlements updated`);
  };

  const syncModulesToPlanTenants = (plan: PlatformPlan) => {
    const affected = state.tenants.filter(t => t.plan === plan.name);
    onUpdateState(
      prev => ({
        ...prev,
        tenants: prev.tenants.map(t => {
          if (t.plan !== plan.name) return t;
          const nextModules = { ...t.modules };
          for (const meta of TENANT_MODULE_META) {
            nextModules[meta.key] = plan.includedModules.includes(meta.key);
          }
          return {
            ...t,
            maxBranches: plan.locationsCap === "Unlimited" ? 99 : Math.max(t.branches, Number(plan.locationsCap) || t.maxBranches),
            maxRegisters: plan.registersCap === "Unlimited" ? 99 : Math.max(t.registers, Number(plan.registersCap) || t.maxRegisters),
            maxStaff: plan.staffCap === "Unlimited" ? 120 : Math.max(t.staff, Number(plan.staffCap) || t.maxStaff),
            modules: nextModules,
          };
        }),
      }),
      `Synced ${plan.name} capabilities & quotas to ${affected.length} subscribed organisation(s)`,
      "Tenant",
      plan.name,
    );
  };

  const toggleCustomFeatureForPlan = (feature: PlanCustomFeature, planId: string) => {
    const planObj = state.plans.find(p => p.id === planId);
    const currentlyEnabled = feature.enabledPlanIds.includes(planId);
    const nextPlanIds = currentlyEnabled
      ? feature.enabledPlanIds.filter(id => id !== planId)
      : [...feature.enabledPlanIds, planId];

    onUpdateState(
      prev => ({
        ...prev,
        planFeatures: (prev.planFeatures || []).map(f =>
          f.id === feature.id ? { ...f, enabledPlanIds: nextPlanIds } : f,
        ),
        plans: prev.plans.map(p => {
          if (p.id !== planId) return p;
          const hasFeature = p.features.includes(feature.name);
          if (!currentlyEnabled && !hasFeature) {
            return { ...p, features: [...p.features, feature.name] };
          }
          if (currentlyEnabled && hasFeature) {
            return { ...p, features: p.features.filter(label => label !== feature.name) };
          }
          return p;
        }),
      }),
      `${currentlyEnabled ? "Revoked" : "Granted"} "${feature.name}" ${currentlyEnabled ? "from" : "to"} ${planObj?.name || planId} plan`,
      "Feature",
      feature.name,
    );
  };

  const createPlan = () => {
    const cleanName = draftPlan.name.trim();
    if (!cleanName) return;
    const slugId = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `plan-${Date.now().toString().slice(-4)}`;
    const uniqueId = state.plans.some(p => p.id === slugId) ? `${slugId}-${Date.now().toString().slice(-3)}` : slugId;
    const numeric = Math.max(0, Number(draftPlan.priceNumeric) || 0);
    const locLabel = draftPlan.locationsCap === "Unlimited" ? "Unlimited locations" : `Up to ${draftPlan.locationsCap} location(s)`;
    const featureLabels = TENANT_MODULE_META.filter(m => draftPlan.includedModules.includes(m.key)).slice(0, 5).map(m => m.label);

    const newPlan: PlatformPlan = {
      id: uniqueId,
      name: cleanName,
      price: draftPlan.priceLabel.trim() || `৳ ${numeric.toLocaleString()}`,
      priceNumeric: numeric,
      note: draftPlan.note.trim() || "Custom subscription tier.",
      locations: locLabel,
      locationsCap: draftPlan.locationsCap.trim() || "5",
      registersCap: draftPlan.registersCap.trim() || "12",
      staffCap: draftPlan.staffCap.trim() || "25",
      support: draftPlan.support.trim() || "Priority",
      popular: draftPlan.popular,
      features: featureLabels.length ? featureLabels : ["POS Register & Barcode", `${draftPlan.support} support`],
      includedModules: draftPlan.includedModules,
    };

    onUpdateState(
      prev => ({
        ...prev,
        plans: [...prev.plans.map(p => (draftPlan.popular ? { ...p, popular: false } : p)), newPlan],
      }),
      `Created new subscription plan "${cleanName}" (${newPlan.price})`,
      "Feature",
      cleanName,
    );
    setDraftPlan({
      name: "",
      priceNumeric: "9900",
      priceLabel: "৳ 9,900",
      note: "Tailored multi-store retail operations.",
      locationsCap: "10",
      registersCap: "25",
      staffCap: "50",
      support: "Priority",
      popular: false,
      includedModules: ["posCheckout", "multiBranch", "storefront", "delivery", "supplierPayables", "customerCredit", "sslcommerzOnline"],
    });
    setNewPlanOpen(false);
  };

  const createCustomFeature = () => {
    const cleanName = draftFeature.name.trim();
    if (!cleanName) return;
    const id = `feat-${Date.now().toString().slice(-5)}`;
    const newFeature: PlanCustomFeature = {
      id,
      name: cleanName,
      description: draftFeature.description.trim() || "Custom plan entitlement configurable per subscription tier.",
      category: draftFeature.category,
      enabledPlanIds: draftFeature.enabledPlanIds,
    };

    onUpdateState(
      prev => ({
        ...prev,
        planFeatures: [...(prev.planFeatures || []), newFeature],
        plans: prev.plans.map(p =>
          draftFeature.enabledPlanIds.includes(p.id) && !p.features.includes(cleanName)
            ? { ...p, features: [...p.features, cleanName] }
            : p,
        ),
      }),
      `Added new feature "${cleanName}" and assigned to ${draftFeature.enabledPlanIds.length} plan(s)`,
      "Feature",
      cleanName,
    );
    setDraftFeature({
      name: "",
      description: "",
      category: "POS",
      enabledPlanIds: state.plans.filter(p => p.id !== "starter").map(p => p.id),
    });
    setNewFeatureOpen(false);
  };

  const deleteCustomPlan = (plan: PlatformPlan) => {
    if (["starter", "growth", "scale"].includes(plan.id)) return;
    onUpdateState(
      prev => ({
        ...prev,
        plans: prev.plans.filter(p => p.id !== plan.id),
        planFeatures: (prev.planFeatures || []).map(f => ({
          ...f,
          enabledPlanIds: f.enabledPlanIds.filter(id => id !== plan.id),
        })),
      }),
      `Removed custom subscription plan "${plan.name}"`,
      "Feature",
      plan.name,
    );
  };

  const deleteCustomFeature = (feature: PlanCustomFeature) => {
    onUpdateState(
      prev => ({
        ...prev,
        planFeatures: (prev.planFeatures || []).filter(f => f.id !== feature.id),
        plans: prev.plans.map(p => ({ ...p, features: p.features.filter(label => label !== feature.name) })),
      }),
      `Deleted custom feature "${feature.name}"`,
      "Feature",
      feature.name,
    );
  };

  return (
    <div className="space-y-6">
      {newPlanOpen && (
        <Card className="border-slate-950/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700">New subscription tier</p>
              <h3 className="mt-0.5 text-[17px] font-bold text-slate-950">Create custom plan &amp; entitlements</h3>
            </div>
            <button type="button" onClick={() => setNewPlanOpen(false)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-50">
              Close ×
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-[11px] font-semibold text-slate-700">
              Plan name *
              <input
                value={draftPlan.name}
                onChange={e => setDraftPlan(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Enterprise Plus"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Display price
              <input
                value={draftPlan.priceLabel}
                onChange={e => setDraftPlan(prev => ({ ...prev, priceLabel: e.target.value }))}
                placeholder="৳ 9,900 or Custom"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Monthly value (BDT)
              <input
                type="number"
                value={draftPlan.priceNumeric}
                onChange={e => setDraftPlan(prev => ({ ...prev, priceNumeric: e.target.value }))}
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Support SLA
              <input
                value={draftPlan.support}
                onChange={e => setDraftPlan(prev => ({ ...prev, support: e.target.value }))}
                placeholder="Priority / Dedicated"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Branches cap
              <input
                value={draftPlan.locationsCap}
                onChange={e => setDraftPlan(prev => ({ ...prev, locationsCap: e.target.value }))}
                placeholder="10 or Unlimited"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Registers cap
              <input
                value={draftPlan.registersCap}
                onChange={e => setDraftPlan(prev => ({ ...prev, registersCap: e.target.value }))}
                placeholder="25 or Unlimited"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Staff seats cap
              <input
                value={draftPlan.staffCap}
                onChange={e => setDraftPlan(prev => ({ ...prev, staffCap: e.target.value }))}
                placeholder="50 or Unlimited"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Plan summary note
              <input
                value={draftPlan.note}
                onChange={e => setDraftPlan(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Short positioning line"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] outline-none focus:border-slate-950"
              />
            </label>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Initial POS module access for this plan</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {TENANT_MODULE_META.map(mod => {
                const checked = draftPlan.includedModules.includes(mod.key);
                return (
                  <label
                    key={mod.key}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-[11px] font-semibold ${
                      checked ? "border-emerald-200 bg-emerald-50/50 text-slate-900" : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span className="truncate pr-2">{mod.label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraftPlan(prev => ({
                          ...prev,
                          includedModules: checked ? prev.includedModules.filter(k => k !== mod.key) : [...prev.includedModules, mod.key],
                        }))
                      }
                      className="h-3.5 w-3.5 accent-emerald-600"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-[12px] font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={draftPlan.popular}
                onChange={e => setDraftPlan(prev => ({ ...prev, popular: e.target.checked }))}
                className="h-4 w-4 accent-emerald-600"
              />
              Mark as &ldquo;Most popular&rdquo; featured plan
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setNewPlanOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button
                type="button"
                disabled={!draftPlan.name.trim()}
                onClick={createPlan}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-[12px] font-bold text-white shadow-xs transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Create plan
              </button>
            </div>
          </div>
        </Card>
      )}

      {newFeatureOpen && (
        <Card className="border-violet-200 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-700">New feature entitlement</p>
              <h3 className="mt-0.5 text-[17px] font-bold text-slate-950">Add new feature &amp; grant access to plans</h3>
            </div>
            <button type="button" onClick={() => setNewFeatureOpen(false)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-50">
              Close ×
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="text-[11px] font-semibold text-slate-700">
              Feature name *
              <input
                value={draftFeature.name}
                onChange={e => setDraftFeature(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Loyalty Points & Gift Cards"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              />
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Category
              <select
                value={draftFeature.category}
                onChange={e => setDraftFeature(prev => ({ ...prev, category: e.target.value as PlanCustomFeature["category"] }))}
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold outline-none focus:border-slate-950"
              >
                <option value="POS">POS</option>
                <option value="Commerce">Commerce</option>
                <option value="Platform">Platform</option>
                <option value="Security">Security</option>
              </select>
            </label>
            <label className="text-[11px] font-semibold text-slate-700">
              Description
              <input
                value={draftFeature.description}
                onChange={e => setDraftFeature(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Visible inside Super Admin & plan notes"
                className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 text-[12px] outline-none focus:border-slate-950"
              />
            </label>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Give access to subscription plans</p>
            <div className="flex flex-wrap gap-2">
              {state.plans.map(plan => {
                const checked = draftFeature.enabledPlanIds.includes(plan.id);
                return (
                  <label
                    key={plan.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-[12px] font-bold transition ${
                      checked ? "border-violet-200 bg-violet-50 text-violet-900" : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraftFeature(prev => ({
                          ...prev,
                          enabledPlanIds: checked ? prev.enabledPlanIds.filter(id => id !== plan.id) : [...prev.enabledPlanIds, plan.id],
                        }))
                      }
                      className="h-3.5 w-3.5 accent-violet-600"
                    />
                    {plan.name} ({plan.price})
                  </label>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => setNewFeatureOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="button"
              disabled={!draftFeature.name.trim()}
              onClick={createCustomFeature}
              className="rounded-xl bg-violet-600 px-4 py-2 text-[12px] font-bold text-white shadow-xs transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Add feature to plans
            </button>
          </div>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {state.plans.map(plan => {
          const isPopular = Boolean(plan.popular);
          const customAssigned = customFeatures.filter(f => f.enabledPlanIds.includes(plan.id));
          const totalAvailable = TENANT_MODULE_META.length + customFeatures.length;
          const totalEnabled = plan.includedModules.length + customAssigned.length;
          const modulePct = Math.round((totalEnabled / Math.max(1, totalAvailable)) * 100);
          const pctTone =
            modulePct >= 85
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : modulePct >= 50
                ? "border-violet-200 bg-violet-50 text-violet-700"
                : "border-amber-200 bg-amber-50 text-amber-800";
          const subscriberCount = state.tenants.filter(t => t.plan === plan.name).length;
          const isCustomTier = !["starter", "growth", "scale"].includes(plan.id);

          return (
            <Card
              key={plan.id}
              className={`flex flex-col overflow-hidden transition ${
                isPopular ? "border-slate-950 ring-2 ring-slate-950/90" : ""
              }`}
            >
              <div className={`flex items-center justify-between gap-2 border-b px-5 py-3.5 ${
                isPopular ? "border-slate-900 bg-slate-950 text-white" : "border-slate-100 bg-slate-50/70 text-slate-950"
              }`}>
                <div className="flex items-center gap-2">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${isPopular ? "text-white" : "text-slate-700"}`}>
                    {plan.name}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    isPopular ? "bg-white/15 text-slate-200" : "bg-slate-200/70 text-slate-600"
                  }`}>
                    {subscriberCount} orgs
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updatePlanField(plan.id, { popular: !plan.popular }, `${plan.name} highlight badge ${plan.popular ? "removed" : "enabled"}`)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                      plan.popular
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                    }`}
                  >
                    {plan.popular ? "Most popular" : "Set popular"}
                  </button>
                  {isCustomTier && (
                    <button
                      type="button"
                      onClick={() => deleteCustomPlan(plan)}
                      title="Delete custom plan"
                      className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Display price
                    <input
                      value={plan.price}
                      onChange={e => updatePlanField(plan.id, { price: e.target.value }, `Updated ${plan.name} display price`)}
                      className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] font-bold text-slate-950 outline-none focus:border-slate-950"
                    />
                  </label>
                  <label className="text-[11px] font-semibold text-slate-600">
                    Support SLA
                    <input
                      value={plan.support}
                      onChange={e => updatePlanField(plan.id, { support: e.target.value }, `Updated ${plan.name} support SLA`)}
                      className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-950 outline-none focus:border-slate-950"
                    />
                  </label>
                </div>

                <div className="mt-3.5 grid grid-cols-3 gap-2">
                  {[
                    { label: "Branches", key: "locationsCap" as const },
                    { label: "Registers", key: "registersCap" as const },
                    { label: "Staff", key: "staffCap" as const },
                  ].map(cap => (
                    <label key={cap.key} className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {cap.label}
                      <input
                        value={plan[cap.key]}
                        onChange={e => updatePlanField(plan.id, { [cap.key]: e.target.value }, `Updated ${plan.name} ${cap.label} cap`)}
                        className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 text-[12px] font-bold normal-case text-slate-950 outline-none focus:border-slate-950 focus:bg-white"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      POS capabilities &amp; access
                    </p>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${pctTone}`}>
                      {totalEnabled}/{totalAvailable} ({modulePct}%)
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {TENANT_MODULE_META.map(mod => {
                      const checked = plan.includedModules.includes(mod.key);
                      return (
                        <label
                          key={mod.key}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-[11px] transition ${
                            checked
                              ? "border-emerald-200/80 bg-emerald-50/40 font-semibold text-slate-900 hover:bg-emerald-50/70"
                              : "border-slate-200/70 bg-slate-50/60 font-medium text-slate-500 hover:bg-slate-100/70"
                          }`}
                        >
                          <span className="truncate pr-2">{mod.label}</span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => togglePlanModule(plan, mod.key)}
                            className="h-3.5 w-3.5 shrink-0 accent-emerald-600"
                          />
                        </label>
                      );
                    })}
                  </div>

                  {customFeatures.length > 0 && (
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-600">
                        Custom features access
                      </p>
                      <div className="space-y-1.5">
                        {customFeatures.map(feat => {
                          const granted = feat.enabledPlanIds.includes(plan.id);
                          return (
                            <label
                              key={feat.id}
                              className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-[11px] transition ${
                                granted
                                  ? "border-violet-200 bg-violet-50/50 font-semibold text-violet-950 hover:bg-violet-50"
                                  : "border-slate-200/70 bg-slate-50/60 font-medium text-slate-500 hover:bg-slate-100/70"
                              }`}
                            >
                              <span className="truncate pr-2">{feat.name}</span>
                              <input
                                type="checkbox"
                                checked={granted}
                                onChange={() => toggleCustomFeatureForPlan(feat, plan.id)}
                                className="h-3.5 w-3.5 shrink-0 accent-violet-600"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {subscriberCount > 0 && (
                  <button
                    type="button"
                    onClick={() => syncModulesToPlanTenants(plan)}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    Sync access to {subscriberCount} {plan.name} org(s)
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Feature Access Matrix */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Plan entitlement matrix</p>
            <h3 className="mt-0.5 text-[16px] font-bold text-slate-950">Custom features &amp; plan access control</h3>
          </div>
          <button
            type="button"
            onClick={() => setNewFeatureOpen(true)}
            className="rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2 text-[11px] font-bold text-violet-700 transition hover:bg-violet-100"
          >
            + Add new feature
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {customFeatures.map(feat => (
            <div key={feat.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
              <div className="min-w-[220px] flex-1">
                <div className="flex items-center gap-2">
                  <b className="text-[13px] text-slate-950">{feat.name}</b>
                  <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                    {feat.category}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">{feat.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {state.plans.map(plan => {
                  const granted = feat.enabledPlanIds.includes(plan.id);
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => toggleCustomFeatureForPlan(feat, plan.id)}
                      className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                        granted
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {granted ? "✓ " : "+ "}
                      {plan.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => deleteCustomFeature(feat)}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {customFeatures.length === 0 && (
            <div className="p-6 text-center text-[12px] text-slate-500">No custom features yet. Click &ldquo;+ Add new feature&rdquo; to create one.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

export function PlansView(props: SuperAdminViewProps) {
  const { state, onUpdateState } = props;
  const [newPlanOpen, setNewPlanOpen] = useState(false);
  const [newFeatureOpen, setNewFeatureOpen] = useState(false);

  return (
    <>
      <PanelTitle
        eyebrow="Entitlements &amp; pricing"
        title="Plans &amp; limits"
        text="Create custom subscription tiers, add new capabilities, grant feature access to any plan, and publish limits live to DevEngine POS pricing."
        action={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { setNewFeatureOpen(v => !v); setNewPlanOpen(false); }}
              className="rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 text-[12px] font-bold text-violet-700 transition hover:bg-violet-100"
            >
              + Add new feature
            </button>
            <button
              type="button"
              onClick={() => { setNewPlanOpen(v => !v); setNewFeatureOpen(false); }}
              className="rounded-xl bg-slate-950 px-3.5 py-2.5 text-[12px] font-bold text-white transition hover:bg-slate-800"
            >
              + Add new plan
            </button>
            <button
              type="button"
              onClick={() => onUpdateState(prev => prev, "Synced all subscription tier limits to public pricing", "Content", "Plans")}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-[12px] font-bold text-white shadow-xs transition hover:bg-emerald-700"
            >
              Publish plan changes
            </button>
          </div>
        }
      />

      <div className="mt-6">
        <PlansManagerSection
          state={state}
          onUpdateState={onUpdateState}
          newPlanOpen={newPlanOpen}
          setNewPlanOpen={setNewPlanOpen}
          newFeatureOpen={newFeatureOpen}
          setNewFeatureOpen={setNewFeatureOpen}
        />
      </div>
    </>
  );
}

export function FeaturesView(props: SuperAdminViewProps) {
  const { state, onUpdateState } = props;
  const [catFilter, setCatFilter] = useState<"All" | "POS" | "Commerce" | "Platform" | "Security">("All");
  const [search, setSearch] = useState("");

  const visibleFlags = state.flags.filter(flag => {
    const matchesCat = catFilter === "All" || flag.category === catFilter;
    const matchesText = `${flag.name} ${flag.detail} ${flag.scope}`.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesText;
  });

  return (
    <>
      <PanelTitle
        eyebrow="Global capability switches"
        title="Feature flags & entitlements"
        text="Enable or gate POS capabilities, online orders, SSLCommerz checkout, and branded guest app visibility platform-wide."
        action={
          <button
            type="button"
            onClick={() => onUpdateState(prev => prev, "Published global feature flag configuration", "Feature", "Global Flags")}
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-bold text-white"
          >
            Publish flags
          </button>
        }
      />

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search feature flags…"
            className="h-9 min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3 text-[12px] outline-none focus:border-slate-950"
          />
          <div className="flex flex-wrap gap-1.5">
            {(["All", "POS", "Commerce", "Platform", "Security"] as const).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCatFilter(c)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${catFilter === c ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mt-4 overflow-hidden">
        <div className="grid grid-cols-[1.2fr_0.65fr_1.4fr_0.65fr_0.45fr] gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
          <span>Capability</span>
          <span>Scope</span>
          <span>Behaviour across POS / Site</span>
          <span>Rollout %</span>
          <span>Active</span>
        </div>
        {visibleFlags.map(flag => (
          <div key={flag.id} className="grid grid-cols-[1.2fr_0.65fr_1.4fr_0.65fr_0.45fr] items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-0">
            <div>
              <b className="block text-[13px] text-slate-950">{flag.name}</b>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{flag.category}</span>
            </div>
            <span className="text-[12px] font-semibold text-slate-700">{flag.scope}</span>
            <span className="text-[12px] text-slate-500">{flag.detail}</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                step={25}
                value={flag.rolloutPct}
                onChange={e =>
                  onUpdateState(
                    prev => ({
                      ...prev,
                      flags: prev.flags.map(f => f.id === flag.id ? { ...f, rolloutPct: Number(e.target.value) } : f),
                    }),
                    `${flag.name} rollout set to ${e.target.value}%`,
                    "Feature",
                    flag.name,
                  )
                }
                className={`w-20 ${
                  flag.rolloutPct === 100
                    ? "accent-emerald-600"
                    : flag.rolloutPct > 0
                      ? "accent-violet-600"
                      : "accent-slate-400"
                }`}
              />
              <span
                className={`min-w-[44px] rounded-full border px-2 py-0.5 text-center text-[11px] font-bold ${
                  flag.rolloutPct === 100
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : flag.rolloutPct > 0
                      ? "border-violet-200 bg-violet-50 text-violet-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {flag.rolloutPct}%
              </span>
            </div>
            <ToggleControl
              checked={flag.enabled}
              onChange={() =>
                onUpdateState(
                  prev => ({
                    ...prev,
                    flags: prev.flags.map(f => f.id === flag.id ? { ...f, enabled: !f.enabled } : f),
                  }),
                  `${flag.name} ${flag.enabled ? "disabled" : "enabled"}`,
                  "Feature",
                  flag.name,
                )
              }
            />
          </div>
        ))}
      </Card>
    </>
  );
}

export function ContentView(props: SuperAdminViewProps) {
  const { state, onUpdateState } = props;
  const [selectedSectionId, setSelectedSectionId] = useState(state.content.sections[0]?.id || "hero");
  const activeSection = state.content.sections.find(s => s.id === selectedSectionId) || state.content.sections[0];

  const patchContent = (patch: Partial<PlatformContentState>, notice: string) => {
    onUpdateState(prev => ({ ...prev, content: { ...prev.content, ...patch } }), notice, "Content", activeSection.label);
  };

  return (
    <>
      <PanelTitle
        eyebrow="Live public CMS"
        title="Website content & customer app"
        text="Edit homepage hero copy, service maintenance banners, Play Store / App Store guest app links, and featured buyer apps — updates reflect live on the public DevEngine website."
        action={
          <button
            type="button"
            onClick={() =>
              onUpdateState(
                prev => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    sections: prev.content.sections.map(s => ({ ...s, state: "Published", updatedAt: "Just now" })),
                  },
                }),
                "Published all website CMS sections live",
                "Content",
                "All sections",
              )
            }
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-bold text-white"
          >
            Publish all live
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
              Public landing sections
            </div>
            {state.content.sections.map(sec => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedSectionId(sec.id)}
                className={`flex w-full items-center justify-between border-b border-slate-100 px-4 py-3.5 text-left last:border-0 ${selectedSectionId === sec.id ? "bg-slate-950/[0.04]" : "hover:bg-slate-50"}`}
              >
                <div>
                  <b className="block text-[13px] text-slate-950">{sec.label}</b>
                  <small className="text-[11px] text-slate-500">Updated {sec.updatedAt}</small>
                </div>
                <StatusPill value={sec.state} />
              </button>
            ))}
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <b className="block text-[13px] text-slate-950">Global maintenance banner</b>
                <span className="text-[11px] text-slate-500">Display notice across public landing & tenant POS</span>
              </div>
              <ToggleControl
                checked={state.content.maintenanceBannerEnabled}
                onChange={() =>
                  patchContent(
                    { maintenanceBannerEnabled: !state.content.maintenanceBannerEnabled },
                    `Platform maintenance banner ${!state.content.maintenanceBannerEnabled ? "shown" : "hidden"}`,
                  )
                }
              />
            </div>
            <textarea
              rows={2}
              value={state.content.maintenanceBannerText}
              onChange={e => patchContent({ maintenanceBannerText: e.target.value }, "Updated maintenance banner notice")}
              className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-[12px] outline-none focus:border-slate-950"
            />
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Live CMS editor</p>
              <h2 className="mt-1 text-[20px] font-black text-slate-950">{activeSection.label}</h2>
            </div>
            <button
              type="button"
              onClick={() =>
                onUpdateState(
                  prev => ({
                    ...prev,
                    content: {
                      ...prev.content,
                      sections: prev.content.sections.map(s =>
                        s.id === activeSection.id ? { ...s, state: s.state === "Published" ? "Draft" : "Published", updatedAt: "Just now" } : s,
                      ),
                    },
                  }),
                  `${activeSection.label} marked ${activeSection.state === "Published" ? "Draft" : "Published"}`,
                  "Content",
                  activeSection.label,
                )
              }
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-slate-50"
            >
              Toggle {activeSection.state === "Published" ? "Draft" : "Published"}
            </button>
          </div>

          {selectedSectionId === "hero" && (
            <div className="mt-5 space-y-4">
              <label className="block text-[12px] font-semibold text-slate-700">
                Announcement pill badge
                <input
                  value={state.content.heroBadge}
                  onChange={e => patchContent({ heroBadge: e.target.value }, "Updated homepage announcement badge")}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[13px]"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-[12px] font-semibold text-slate-700">
                  Headline line 1
                  <input
                    value={state.content.heroHeadlineTop}
                    onChange={e => patchContent({ heroHeadlineTop: e.target.value }, "Updated hero headline")}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[13px] font-bold"
                  />
                </label>
                <label className="block text-[12px] font-semibold text-slate-700">
                  Headline line 2 (muted)
                  <input
                    value={state.content.heroHeadlineMuted}
                    onChange={e => patchContent({ heroHeadlineMuted: e.target.value }, "Updated hero subtitle line")}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[13px] font-bold"
                  />
                </label>
              </div>
              <label className="block text-[12px] font-semibold text-slate-700">
                Hero lead description
                <textarea
                  rows={3}
                  value={state.content.heroDescription}
                  onChange={e => patchContent({ heroDescription: e.target.value }, "Updated homepage description")}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-[13px]"
                />
              </label>
            </div>
          )}

          {selectedSectionId === "apps" && (
            <div className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-[12px] font-semibold text-slate-700">
                  Global Google Play URL
                  <input
                    value={state.content.guestApp.playStoreUrl}
                    placeholder="https://play.google.com/store/apps/..."
                    onChange={e => patchContent({ guestApp: { ...state.content.guestApp, playStoreUrl: e.target.value } }, "Updated Google Play Store URL")}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[12px]"
                  />
                </label>
                <label className="block text-[12px] font-semibold text-slate-700">
                  Global App Store URL
                  <input
                    value={state.content.guestApp.appStoreUrl}
                    placeholder="https://apps.apple.com/app/..."
                    onChange={e => patchContent({ guestApp: { ...state.content.guestApp, appStoreUrl: e.target.value } }, "Updated App Store URL")}
                    className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[12px]"
                  />
                </label>
              </div>
              <label className="block text-[12px] font-semibold text-slate-700">
                Fallback unavailable dialog message
                <textarea
                  rows={2}
                  value={state.content.guestApp.unavailableMessage}
                  onChange={e => patchContent({ guestApp: { ...state.content.guestApp, unavailableMessage: e.target.value } }, "Updated guest app fallback message")}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-[12px]"
                />
              </label>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">BuyerAppCarousel featured tenants</p>
                <div className="space-y-2">
                  {state.content.buyerApps.map(app => (
                    <div key={app.tenantId} className="flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2.5">
                      <div>
                        <b className="block text-[12px] text-slate-950">{app.name}</b>
                        <span className="text-[11px] text-slate-500">{app.type}</span>
                      </div>
                      <ToggleControl
                        checked={app.featured}
                        onChange={() =>
                          patchContent(
                            {
                              buyerApps: state.content.buyerApps.map(item =>
                                item.tenantId === app.tenantId ? { ...item, featured: !item.featured } : item,
                              ),
                            },
                            `${app.name} showcase visibility ${app.featured ? "hidden" : "featured"}`,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSectionId !== "hero" && selectedSectionId !== "apps" && (
            <div className="mt-5 space-y-4">
              <label className="block text-[12px] font-semibold text-slate-700">
                Section title
                <input
                  value={activeSection.title}
                  onChange={e =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          sections: prev.content.sections.map(s => s.id === activeSection.id ? { ...s, title: e.target.value, updatedAt: "Just now" } : s),
                        },
                      }),
                      `Updated title for ${activeSection.label}`,
                      "Content",
                    )
                  }
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[13px] font-bold"
                />
              </label>
              <label className="block text-[12px] font-semibold text-slate-700">
                Summary note
                <textarea
                  rows={3}
                  value={activeSection.subtitle}
                  onChange={e =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          sections: prev.content.sections.map(s => s.id === activeSection.id ? { ...s, subtitle: e.target.value, updatedAt: "Just now" } : s),
                        },
                      }),
                      `Updated notes for ${activeSection.label}`,
                      "Content",
                    )
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-[13px]"
                />
              </label>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <div>
                  <b className="block text-[12px] text-slate-950">Section visible on public website</b>
                  <span className="text-[11px] text-slate-500">Hide section without removing configuration</span>
                </div>
                <ToggleControl
                  checked={activeSection.visible}
                  onChange={() =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        content: {
                          ...prev.content,
                          sections: prev.content.sections.map(s => s.id === activeSection.id ? { ...s, visible: !s.visible, updatedAt: "Just now" } : s),
                        },
                      }),
                      `${activeSection.label} ${activeSection.visible ? "hidden" : "shown"} on website`,
                      "Content",
                    )
                  }
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

export function SupportView(props: SuperAdminViewProps) {
  const { state, onOpenNewTicket, onUpdateState } = props;
  const [statusFilter, setStatusFilter] = useState<"All" | SupportTicket["status"]>("All");
  const [selectedTicketId, setSelectedTicketId] = useState(state.tickets[0]?.id || "");
  const [replyText, setReplyText] = useState("");

  const filteredTickets = state.tickets.filter(t => statusFilter === "All" || t.status === statusFilter);
  const currentTicket = state.tickets.find(t => t.id === selectedTicketId) || filteredTickets[0] || state.tickets[0];

  const sendReply = () => {
    if (!replyText.trim() || !currentTicket) return;
    const msg = replyText.trim();
    setReplyText("");
    onUpdateState(
      prev => ({
        ...prev,
        tickets: prev.tickets.map(t =>
          t.id === currentTicket.id
            ? {
                ...t,
                status: t.status === "Open" ? "Waiting" : t.status,
                messages: [...t.messages, { author: prev.profile.name, role: "Super Admin", text: msg, time: "Just now" }],
              }
            : t,
        ),
      }),
      `Replied to ${currentTicket.id} (${currentTicket.tenant})`,
      "Support",
      currentTicket.id,
    );
  };

  return (
    <>
      <PanelTitle
        eyebrow="Platform service desk"
        title="Support queue"
        text="Create tickets, assign platform engineers, reply to retail owners, and resolve incidents across Selim Electronics and all tenants."
        action={
          <button type="button" onClick={onOpenNewTicket} className="rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-bold text-white">
            + Create ticket
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.05fr]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap gap-1.5 border-b border-slate-200 p-4">
            {(["All", "Open", "Waiting", "Resolved"] as const).map(st => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-bold ${statusFilter === st ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {st}
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {filteredTickets.map(ticket => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`block w-full px-5 py-4 text-left transition ${currentTicket?.id === ticket.id ? "bg-slate-950/[0.04]" : "hover:bg-slate-50"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-500">{ticket.id} · {ticket.tenant}</span>
                  <div className="flex gap-1.5">
                    <StatusPill value={ticket.priority} />
                    <StatusPill value={ticket.status} />
                  </div>
                </div>
                <b className="mt-1.5 block text-[13px] text-slate-950">{ticket.subject}</b>
                <small className="mt-1 block text-[11px] text-slate-500">{ticket.category} · Owner: {ticket.owner}</small>
              </button>
            ))}
          </div>
        </Card>

        {currentTicket && (
          <Card className="flex flex-col p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{currentTicket.id} · {currentTicket.tenant}</p>
                <h2 className="mt-1 text-[18px] font-black text-slate-950">{currentTicket.subject}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateState(
                      prev => ({
                        ...prev,
                        tickets: prev.tickets.map(t =>
                          t.id === currentTicket.id ? { ...t, status: t.status === "Resolved" ? "Open" : "Resolved" } : t,
                        ),
                      }),
                      `${currentTicket.id} marked ${currentTicket.status === "Resolved" ? "Open" : "Resolved"}`,
                      "Support",
                      currentTicket.id,
                    )
                  }
                  className={`rounded-xl px-3.5 py-2 text-[11px] font-bold transition ${
                    currentTicket.status === "Resolved"
                      ? "border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                      : "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                  }`}
                >
                  {currentTicket.status === "Resolved" ? "Reopen ticket" : "Mark resolved"}
                </button>
                <button
                  type="button"
                  disabled={state.tickets.length <= 1}
                  onClick={() => {
                    const nextTicket = state.tickets.find(t => t.id !== currentTicket.id);
                    onUpdateState(
                      prev => ({
                        ...prev,
                        tickets: prev.tickets.filter(t => t.id !== currentTicket.id),
                      }),
                      `Deleted support ticket ${currentTicket.id}`,
                      "Support",
                      currentTicket.id,
                    );
                    if (nextTicket) setSelectedTicketId(nextTicket.id);
                  }}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="text-[11px] font-semibold text-slate-600">
                Assigned operator
                <select
                  value={currentTicket.owner}
                  onChange={e =>
                    onUpdateState(
                      prev => ({ ...prev, tickets: prev.tickets.map(t => t.id === currentTicket.id ? { ...t, owner: e.target.value } : t) }),
                      `Assigned ${currentTicket.id} to ${e.target.value}`,
                      "Support",
                      currentTicket.id,
                    )
                  }
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-bold"
                >
                  <option>Unassigned</option>
                  <option>Hamim Leon</option>
                  <option>A. Chowdhury</option>
                  <option>R. Karim</option>
                </select>
              </label>
              <label className="text-[11px] font-semibold text-slate-600">
                Priority level
                <select
                  value={currentTicket.priority}
                  onChange={e =>
                    onUpdateState(
                      prev => ({ ...prev, tickets: prev.tickets.map(t => t.id === currentTicket.id ? { ...t, priority: e.target.value as SupportTicket["priority"] } : t) }),
                      `Priority for ${currentTicket.id} set to ${e.target.value}`,
                      "Support",
                      currentTicket.id,
                    )
                  }
                  className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[12px] font-bold"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </label>
            </div>

            <div className="mt-4 max-h-[260px] flex-1 space-y-2.5 overflow-y-auto rounded-xl bg-slate-50 p-3">
              {currentTicket.messages.map((m, idx) => (
                <div
                  key={`${m.time}-${idx}`}
                  className={`rounded-xl p-3 text-[12px] ${m.role === "Super Admin" ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-800"}`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75">
                    <b>{m.author}</b>
                    <span>{m.time}</span>
                  </div>
                  <p className="mt-1.5 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendReply()}
                placeholder="Write a response or internal resolution note…"
                className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-[12px] outline-none focus:border-slate-950"
              />
              <button type="button" onClick={sendReply} className="rounded-xl bg-slate-950 px-4 text-[12px] font-bold text-white hover:bg-slate-800">
                Send reply
              </button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

export function AuditView(props: SuperAdminViewProps) {
  const { state, onUpdateState } = props;
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<"All" | AuditCategory>("All");

  const filtered = state.audit.filter(entry => {
    const matchesCat = cat === "All" || entry.category === cat;
    const matchesText = `${entry.actor} ${entry.action} ${entry.target} ${entry.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesText;
  });

  const exportAudit = (format: "json" | "csv") => {
    if (format === "json") {
      downloadTextFile("devengine-audit-log.json", "application/json", JSON.stringify(filtered, null, 2));
    } else {
      const header = "ID,Actor,Category,Action,Target,Time";
      const rows = filtered.map(e => `${e.id},"${e.actor}",${e.category},"${e.action}","${e.target}","${e.time}"`);
      downloadTextFile("devengine-audit-log.csv", "text/csv;charset=utf-8", [header, ...rows].join("\n"));
    }
    onUpdateState(prev => prev, `Exported ${filtered.length} audit record(s) as ${format.toUpperCase()}`, "Security", "Audit export");
  };

  return (
    <>
      <PanelTitle
        eyebrow="Traceability"
        title="Audit log"
        text="Immutable operational history across tenant quotas, KYC approvals, SSLCommerz billing, feature flags, and website publishing."
        action={
          <div className="flex gap-2">
            <button type="button" onClick={() => exportAudit("csv")} className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-bold text-slate-800 hover:bg-slate-50">
              Export CSV
            </button>
            <button type="button" onClick={() => exportAudit("json")} className="rounded-xl bg-slate-950 px-3.5 py-2 text-[12px] font-bold text-white hover:bg-slate-800">
              Export JSON
            </button>
          </div>
        }
      />

      <Card className="mt-6 overflow-hidden">
        <div className="space-y-3 border-b border-slate-200 p-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter by actor, organisation, action, or event ID…"
            className="h-10 w-full max-w-md rounded-xl border border-slate-200 px-3.5 text-[13px] outline-none focus:border-slate-950"
          />
          <div className="flex flex-wrap gap-1.5">
            {(["All", "Tenant", "KYC", "Billing", "Feature", "Gateway", "Content", "Support", "Security"] as const).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${cat === c ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map(entry => {
            const catTone =
              entry.category === "Billing"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : entry.category === "Gateway"
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : entry.category === "KYC"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : entry.category === "Security"
                      ? "border-rose-200 bg-rose-50 text-rose-700"
                      : entry.category === "Tenant" || entry.category === "Feature"
                        ? "border-violet-200 bg-violet-50 text-violet-700"
                        : "border-slate-200 bg-slate-100 text-slate-700";
            return (
              <div key={entry.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${catTone}`}>{entry.category}</span>
                    <b className="text-[13px] text-slate-950">{entry.action}</b>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{entry.actor} · Target: {entry.target} · {entry.id}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{entry.time}</span>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="p-8 text-center text-[13px] text-slate-500">No audit entries match that filter.</div>}
        </div>
      </Card>
    </>
  );
}

export function SettingsView(props: SuperAdminViewProps) {
  const { state, onUpdateState, onResetState } = props;
  const g = state.governance;

  const toggleGov = (key: "requireAdminMfa" | "manualTenantActivation" | "verifiedBillingWebhooks" | "allowTenantImpersonation" | "strictNegativeStockGuard", label: string) => {
    onUpdateState(
      prev => ({ ...prev, governance: { ...prev.governance, [key]: !prev.governance[key] } }),
      `${label} ${!g[key] ? "enabled" : "disabled"}`,
      "Security",
      label,
    );
  };

  return (
    <>
      <PanelTitle
        eyebrow="Platform governance"
        title="Platform settings & access policy"
        text="Control global security posture, POS impersonation permissions, billing webhook verification, and platform state persistence."
        action={
          <button
            type="button"
            onClick={onResetState}
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-[12px] font-bold text-rose-700 transition hover:bg-rose-100"
          >
            Reset demo platform data
          </button>
        }
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {[
          { key: "requireAdminMfa" as const, title: "Platform administrator MFA", copy: "Require MFA for Super Admin, Finance, Support and Content roles." },
          { key: "manualTenantActivation" as const, title: "Manual tenant activation", copy: "Hold newly registered retail workspaces pending Super Admin verification." },
          { key: "verifiedBillingWebhooks" as const, title: "Verified billing webhooks", copy: "Accept SSLCommerz IPN & billing transitions only with valid HMAC verification." },
          { key: "allowTenantImpersonation" as const, title: "Allow Super Admin POS inspection", copy: "Enable 'View POS as tenant' action inside Organisations controls." },
          { key: "strictNegativeStockGuard" as const, title: "Global negative stock guard", copy: "Block below-zero POS checkouts across all Starter & Trial plans." },
        ].map(row => (
          <Card key={row.key} className="flex items-center justify-between gap-5 p-5">
            <span>
              <b className="block text-[14px] text-slate-950">{row.title}</b>
              <small className="mt-1 block max-w-sm text-[12px] leading-relaxed text-slate-500">{row.copy}</small>
            </span>
            <ToggleControl checked={g[row.key]} onChange={() => toggleGov(row.key, row.title)} />
          </Card>
        ))}

        <Card className="p-5">
          <b className="block text-[14px] text-slate-950">Admin idle session timeout</b>
          <p className="mt-1 text-[12px] text-slate-500">Control inactive timeout window & webhook signing posture.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <select
              value={g.sessionTimeoutMins}
              onChange={e => onUpdateState(prev => ({ ...prev, governance: { ...prev.governance, sessionTimeoutMins: e.target.value } }), `Admin idle timeout set to ${e.target.value}`, "Security")}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold"
            >
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>2 hours</option>
            </select>
            <input
              value={g.webhookSigningNote}
              onChange={e => onUpdateState(prev => ({ ...prev, governance: { ...prev.governance, webhookSigningNote: e.target.value } }), "Updated webhook policy note", "Security")}
              className="h-10 rounded-xl border border-slate-200 px-3 text-[12px]"
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export function ProfileView(props: SuperAdminViewProps) {
  const { state, onUpdateState } = props;
  const p = state.profile;
  const initials = p.name.trim().split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "HL";

  return (
    <>
      <PanelTitle
        eyebrow="Platform identity"
        title="My profile & security"
        text="Manage your Super Admin identity, notification preferences, active sessions, and account-security controls."
        action={
          <button
            type="button"
            onClick={() => onUpdateState(prev => prev, "Saved Super Admin profile changes", "Security", p.name)}
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-[12px] font-bold text-white"
          >
            Save profile
          </button>
        }
      />

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-[18px] font-black text-white">{initials}</span>
            <div>
              <h2 className="text-[20px] font-black text-slate-950">{p.name}</h2>
              <p className="mt-0.5 text-[12px] text-slate-500">{p.role} · DevEngine POS</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full name", key: "name" as const, type: "text" },
              { label: "Platform email", key: "email" as const, type: "email" },
              { label: "Mobile number", key: "phone" as const, type: "text" },
            ].map(field => (
              <label key={field.key} className="block text-[12px] font-semibold text-slate-700">
                {field.label}
                <input
                  type={field.type}
                  value={p[field.key]}
                  onChange={e => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, [field.key]: e.target.value } }), `Updated profile ${field.label}`, "Security")}
                  className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 px-3 text-[13px]"
                />
              </label>
            ))}
            <label className="block text-[12px] font-semibold text-slate-700">
              Timezone
              <select
                value={p.timezone}
                onChange={e => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, timezone: e.target.value } }), `Updated timezone to ${e.target.value}`, "Security")}
                className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px]"
              >
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="UTC">UTC</option>
                <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
              </select>
            </label>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Security & sessions</p>
            <h2 className="mt-1 text-[19px] font-black text-slate-950">Account protection</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span>
                  <b className="block text-[13px] text-slate-950">Multi-factor authentication</b>
                  <small className="text-[11px] text-slate-500">Authenticator app connected</small>
                </span>
                <ToggleControl
                  checked={p.mfaEnabled}
                  onChange={() => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, mfaEnabled: !prev.profile.mfaEnabled } }), `Personal MFA ${!p.mfaEnabled ? "enabled" : "disabled"}`, "Security")}
                />
              </div>
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-[12px]">
                  <b className="text-slate-800">Active sessions ({p.sessions.length})</b>
                  {p.sessions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, sessions: prev.profile.sessions.filter(s => s.current) } }), "Signed out all other Super Admin sessions", "Security")}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100"
                    >
                      Sign out others
                    </button>
                  )}
                </div>
                {p.sessions.map(sess => (
                  <div key={sess.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-[11px]">
                    <div>
                      <b className="block text-slate-900">{sess.device}</b>
                      <span className="text-slate-500">{sess.location} · {sess.lastActive}</span>
                    </div>
                    {sess.current ? (
                      <StatusPill value="Active" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, sessions: prev.profile.sessions.filter(s => s.id !== sess.id) } }), `Revoked session ${sess.device}`, "Security")}
                        className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 transition hover:bg-rose-100"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Notifications</p>
            <div className="mt-3 space-y-3">
              {[
                { key: "alerts" as const, title: "Platform incident alerts", sub: "Availability, payment & KYC events" },
                { key: "digest" as const, title: "Daily operator digest", sub: "Queue, conversion & MRR summary" },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between">
                  <span>
                    <b className="block text-[13px] text-slate-950">{n.title}</b>
                    <small className="text-[11px] text-slate-500">{n.sub}</small>
                  </span>
                  <ToggleControl
                    checked={p[n.key]}
                    onChange={() => onUpdateState(prev => ({ ...prev, profile: { ...prev.profile, [n.key]: !prev.profile[n.key] } }), `Updated ${n.title}`, "Security")}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
