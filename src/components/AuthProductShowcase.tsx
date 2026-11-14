import React, { useEffect, useRef, useState } from "react";

type SceneId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface SceneMeta {
  id: SceneId;
  code: string;
  label: string;
  caption: string;
  navItem: string;
  url: string;
  durationMs: number;
  stepsMs: readonly number[];
}

const SCENES: readonly SceneMeta[] = [
  {
    id: 0,
    code: "01",
    label: "Registration",
    caption: "01 · Business registration",
    navItem: "Signup",
    url: "devenginepos.com/signup",
    durationMs: 5000,
    stepsMs: [0, 1200, 2600, 3850],
  },
  {
    id: 1,
    code: "02",
    label: "Workspace",
    caption: "02 · Workspace creation",
    navItem: "Setup",
    url: "selim-electronics.devenginepos.com/init",
    durationMs: 3000,
    stepsMs: [0, 950, 2000],
  },
  {
    id: 2,
    code: "03",
    label: "Dashboard",
    caption: "03 · POS dashboard",
    navItem: "Dashboard",
    url: "selim-electronics.devenginepos.com/dashboard",
    durationMs: 5000,
    stepsMs: [0, 900, 2200, 3600],
  },
  {
    id: 3,
    code: "04",
    label: "Inventory",
    caption: "04 · Product & inventory control",
    navItem: "Products",
    url: "selim-electronics.devenginepos.com/products",
    durationMs: 4000,
    stepsMs: [0, 950, 1950, 3000],
  },
  {
    id: 4,
    code: "05",
    label: "Checkout",
    caption: "05 · Point of sale checkout",
    navItem: "POS",
    url: "selim-electronics.devenginepos.com/pos",
    durationMs: 5000,
    stepsMs: [0, 950, 1950, 2950, 3950],
  },
  {
    id: 5,
    code: "06",
    label: "Storefront",
    caption: "06 · Branded online storefront",
    navItem: "Orders",
    url: "selim-electronics.devenginepos.com/store",
    durationMs: 5000,
    stepsMs: [0, 1050, 2150, 3300],
  },
  {
    id: 6,
    code: "07",
    label: "Analytics",
    caption: "07 · Analytics & reporting",
    navItem: "Reports",
    url: "selim-electronics.devenginepos.com/reports",
    durationMs: 4000,
    stepsMs: [0, 1000, 2200],
  },
  {
    id: 7,
    code: "08",
    label: "In Motion",
    caption: "08 · Your business, in motion.",
    navItem: "Dashboard",
    url: "selim-electronics.devenginepos.com",
    durationMs: 3000,
    stepsMs: [0, 1200],
  },
];

// Total loop duration: 5 + 3 + 5 + 4 + 5 + 5 + 4 + 3 = 34 seconds.
const TOTAL_LOOP_MS = SCENES.reduce((sum, s) => sum + s.durationMs, 0);

function useAnimatedNumber(target: number, active: boolean, durationMs = 700, reducedMotion = false): number {
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!active) {
      setValue(reducedMotion ? target : 0);
      return;
    }
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [target, active, durationMs, reducedMotion]);

  return value;
}

function formatBDT(amount: number): string {
  return `৳ ${amount.toLocaleString("en-IN")}`;
}

function ShowcaseNav({ activeNav }: { activeNav: string }) {
  const items = ["Dashboard", "POS", "Products", "Orders", "Reports"];
  return (
    <div className="hidden h-full w-[94px] shrink-0 flex-col justify-between border-r border-slate-800 bg-[#070e20] p-2.5 text-slate-400 sm:flex">
      <div>
        <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-slate-900/90 px-2 py-1.5 ring-1 ring-white/10">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-500 text-[8px] font-black text-slate-950">
            SE
          </span>
          <div className="min-w-0">
            <div className="truncate text-[8px] font-bold text-white">Selim</div>
            <div className="truncate text-[6px] font-semibold uppercase tracking-wider text-cyan-400">
              Growth
            </div>
          </div>
        </div>
        <div className="space-y-1">
          {items.map((item) => {
            const active = activeNav === item;
            return (
              <div
                key={item}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[8.5px] font-semibold transition-colors duration-300 ${
                  active
                    ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30"
                    : "text-slate-400"
                }`}
              >
                <span>{item}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
        <div className="text-[7px] font-semibold text-slate-400">DevEngine POS</div>
        <div className="mt-0.5 flex items-center gap-1 text-[7px] font-bold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Tenant isolated
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 01: BUSINESS REGISTRATION (5s) ────────────────────────────────── */
function SceneRegistration({ step }: { step: number }) {
  const showForm = step >= 1;
  const showReview = step === 2;
  const showSuccess = step >= 3;

  return (
    <div className="flex h-full flex-col bg-[#0b1224] p-3 sm:p-4 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-cyan-300 to-cyan-600 text-[9px] font-black text-slate-950">
            ▶
          </span>
          <div>
            <div className="text-[9.5px] font-extrabold tracking-tight text-white">
              DevEngine POS <span className="text-cyan-400">Onboarding</span>
            </div>
            <div className="text-[7px] text-slate-400">Create your independent retail workspace</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[7px] font-bold">
          {["1. Plan", "2. Business", "3. Review"].map((pill, idx) => {
            const active =
              (idx === 0 && step === 0) ||
              (idx === 1 && step === 1) ||
              (idx === 2 && step >= 2);
            const done = (idx === 0 && step >= 1) || (idx === 1 && step >= 2) || step >= 3;
            return (
              <span
                key={pill}
                className={`rounded-full px-2 py-0.5 transition-all duration-300 ${
                  done
                    ? "bg-emerald-500/20 text-emerald-300"
                    : active
                      ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/40"
                      : "bg-white/5 text-slate-500"
                }`}
              >
                {done ? "✓ " : ""}
                {pill}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden rounded-xl bg-white p-3 sm:p-3.5 text-slate-900 shadow-lg">
        {!showForm && (
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-cyan-700">
                Step 01 · Choose Subscription Plan
              </div>
              <div className="mt-0.5 text-[13px] font-black tracking-tight text-slate-950">
                Select a plan for your store
              </div>
            </div>

            <div className="my-2 grid grid-cols-3 gap-2">
              {[
                { name: "Starter", price: "৳ 1,500", sub: "1 branch · 3 staff", selected: false },
                { name: "Growth", price: "৳ 3,500", sub: "3 branches · Storefront", selected: true },
                { name: "Scale", price: "৳ 7,500", sub: "Unlimited branches", selected: false },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border p-2.5 transition-all duration-500 ${
                    plan.selected
                      ? "border-cyan-500 bg-cyan-50/70 shadow-md shadow-cyan-500/10 ring-2 ring-cyan-400/50"
                      : "border-slate-200 bg-slate-50/60 opacity-75"
                  }`}
                >
                  {plan.selected && (
                    <span className="absolute -top-2 right-2 rounded-full bg-slate-950 px-1.5 py-0.5 text-[6.5px] font-extrabold uppercase tracking-wider text-cyan-300">
                      Selected ✓
                    </span>
                  )}
                  <div className="text-[9.5px] font-extrabold text-slate-950">{plan.name}</div>
                  <div className="mt-1 text-[12px] font-black tracking-tight text-slate-950">
                    {plan.price}
                    <span className="text-[7.5px] font-medium text-slate-500">/mo</span>
                  </div>
                  <div className="mt-1 text-[7px] text-slate-500">{plan.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 text-[8.5px] font-bold text-white">
              <span>Selected: Growth Plan · 14-day free trial</span>
              <span className="text-cyan-300">Continue →</span>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex h-full flex-col justify-between auth-step-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-cyan-700">
                  Step 02 · Business Information
                </div>
                <div className="text-[13px] font-black tracking-tight text-slate-950">
                  Configure your business profile
                </div>
              </div>
              <span className="rounded-md bg-cyan-50 px-2 py-1 text-[7.5px] font-bold text-cyan-800 ring-1 ring-cyan-200">
                Growth Plan
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5">
                <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                  Business Name
                </div>
                <div className="mt-0.5 text-[10px] font-bold text-slate-950">
                  Selim Electronics
                </div>
              </div>
              <div className="rounded-lg border border-cyan-400 bg-cyan-50/40 px-2.5 py-1.5">
                <div className="text-[7px] font-semibold uppercase tracking-wider text-cyan-700">
                  Workspace Slug
                </div>
                <div className="mt-0.5 text-[10px] font-bold text-slate-950">
                  selim-electronics
                  <span className="ml-1 text-[7.5px] font-semibold text-emerald-600">✓ Available</span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
                <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                  Primary Branch
                </div>
                <div className="mt-0.5 text-[9.5px] font-semibold text-slate-800">
                  Dhaka Flagship Store
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
                <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                  Owner Email
                </div>
                <div className="mt-0.5 text-[9.5px] font-semibold text-slate-800">
                  owner@selimelectronics.com
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 text-[8.5px] font-bold text-white">
              <span>Workspace URL: selim-electronics.devenginepos.com</span>
              <span className="text-cyan-300">Review details →</span>
            </div>
          </div>
        )}

        {(showReview || showSuccess) && (
          <div className="flex h-full flex-col justify-between auth-step-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-cyan-700">
                  {showSuccess ? "Registration Complete" : "Step 03 · Verification & Review"}
                </div>
                <div className="text-[13px] font-black tracking-tight text-slate-950">
                  {showSuccess ? "Selim Electronics is registered" : "Review workspace summary"}
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[7.5px] font-extrabold transition-colors duration-300 ${
                  showSuccess
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {showSuccess ? "Verified ✓" : "Verifying..."}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-[8.5px]">
              <div className="flex justify-between border-b border-slate-200/70 pb-1">
                <span className="text-slate-500">Business</span>
                <span className="font-bold text-slate-950">Selim Electronics</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/70 pb-1">
                <span className="text-slate-500">Workspace</span>
                <span className="font-bold text-cyan-700">/selim-electronics</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500">Plan</span>
                <span className="font-bold text-slate-950">Growth · ৳ 3,500/mo</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500">KYC & Tax ID</span>
                <span className="font-bold text-emerald-700">Validated ✓</span>
              </div>
            </div>

            <div
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-[8.5px] font-bold transition-all duration-300 ${
                showSuccess
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-950 text-white"
              }`}
            >
              <span>
                {showSuccess
                  ? "✓ Registration successful — launching workspace setup"
                  : "Confirming workspace slug & tenant security..."}
              </span>
              <span className="text-cyan-200">{showSuccess ? "Ready" : "..."}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── SCENE 02: WORKSPACE CREATION (3s) ───────────────────────────────────── */
function SceneWorkspaceCreation({ step }: { step: number }) {
  const pct = step === 0 ? 38 : step === 1 ? 82 : 100;
  const done = step >= 2;

  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#020617] via-[#09132a] to-[#0f172a] p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[8px] font-bold text-emerald-300">
          <span>✓</span> Registration confirmed · Growth Plan
        </div>
        <span className="text-[8px] font-bold tracking-wider text-cyan-300">
          {pct}% COMPLETE
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-[410px] flex-col items-center text-center">
        <div
          className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-500 ${
            step >= 1
              ? "border-cyan-400/35 bg-white/[0.07] opacity-100"
              : "border-white/10 bg-white/[0.03] opacity-75"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-600 text-[13px] font-black text-slate-950 shadow-lg shadow-cyan-500/20">
            SE
          </div>
          <div className="text-left">
            <div className="text-[13px] font-black tracking-tight text-white">
              Selim Electronics
            </div>
            <div className="text-[8px] font-semibold text-cyan-300">
              selim-electronics.devenginepos.com
            </div>
          </div>
        </div>

        <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-3.5 grid w-full grid-cols-3 gap-2 text-left">
          {[
            { label: "Tenant Database", ready: step >= 0 },
            { label: "POS & Stock Modules", ready: step >= 1 },
            { label: "Dashboard & Store", ready: step >= 2 },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border px-2.5 py-2 transition-all duration-400 ${
                item.ready
                  ? "border-cyan-400/30 bg-cyan-500/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-400"
              }`}
            >
              <div className="text-[8px] font-bold">
                {item.ready ? "✓ " : "○ "}
                {item.label}
              </div>
              <div className="mt-1 h-1.5 w-3/4 rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex items-center justify-between rounded-xl border px-3.5 py-2 text-[8.5px] font-bold transition-all duration-400 ${
          done
            ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
            : "border-white/10 bg-white/5 text-slate-300"
        }`}
      >
        <span>
          {done
            ? "Workspace created successfully — entering Selim Electronics Dashboard"
            : "Provisioning registers, inventory ledgers and online storefront..."}
        </span>
        <span className="text-cyan-300">{done ? "Open →" : "Building"}</span>
      </div>
    </div>
  );
}

/* ─── SCENE 03: POS DASHBOARD (5s) ────────────────────────────────────────── */
function ScenePosDashboard({
  step,
  reducedMotion,
}: {
  step: number;
  reducedMotion: boolean;
}) {
  const salesToday = useAnimatedNumber(124850, true, 900, reducedMotion);
  const totalOrders = useAnimatedNumber(48, true, 800, reducedMotion);
  const inStock = useAnimatedNumber(1284, true, 850, reducedMotion);
  const revenue = useAnimatedNumber(1845000, true, 950, reducedMotion);

  const chartPoints = "10,64 52,50 94,55 136,36 178,42 220,20 262,12";
  const areaPoints = `10,74 ${chartPoints} 262,74`;

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900">
      <ShowcaseNav activeNav="Dashboard" />
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">
              Selim Electronics · Main Branch
            </div>
            <div className="text-[12px] font-black tracking-tight text-slate-950">
              Operations Dashboard
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[7.5px] font-bold text-amber-800">
              ⚠ Low stock: Walton Fridge (2)
            </span>
            <span className="rounded-md bg-slate-950 px-2 py-0.5 text-[7.5px] font-bold text-cyan-300">
              Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Sales Today", value: formatBDT(salesToday), delta: "+18.4%", show: step >= 0 },
            { label: "Total Orders", value: `${totalOrders}`, delta: "36 POS · 12 Web", show: step >= 0 },
            { label: "In Stock", value: inStock.toLocaleString("en-IN"), delta: "42 categories", show: step >= 1 },
            { label: "Monthly Rev", value: formatBDT(revenue), delta: "Net revenue", show: step >= 1 },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`rounded-lg border border-slate-200 bg-white p-2 shadow-xs transition-all duration-400 ${
                kpi.show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
              }`}
            >
              <div className="text-[7px] font-semibold text-slate-500">{kpi.label}</div>
              <div className="mt-0.5 truncate text-[10.5px] font-black tracking-tight text-slate-950">
                {kpi.value}
              </div>
              <div className="mt-0.5 text-[6.5px] font-bold text-cyan-700">{kpi.delta}</div>
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-[1.25fr_0.95fr] gap-2 pt-1.5">
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-extrabold text-slate-950">Sales Analytics</span>
              <span className="text-[7px] font-semibold text-slate-400">Last 7 days</span>
            </div>
            <svg viewBox="0 0 272 78" className="my-1 h-[74px] w-full overflow-visible">
              <defs>
                <linearGradient id="dashChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 42, 64].map((y) => (
                <line
                  key={y}
                  x1="6"
                  y1={y}
                  x2="266"
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                />
              ))}
              <polygon
                points={areaPoints}
                fill="url(#dashChartGrad)"
                className="auth-area-reveal"
              />
              <polyline
                points={chartPoints}
                fill="none"
                stroke="#0891b2"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="auth-line-draw"
              />
              <circle cx="262" cy="12" r="3.5" fill="#020617" stroke="#22d3ee" strokeWidth="1.5" />
            </svg>
            <div className="flex justify-between text-[6.5px] font-semibold text-slate-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-extrabold text-slate-950">
                Recent Transactions
              </span>
              <span className="text-[7px] font-bold text-cyan-700">Live feed</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: "#SE-2048", item: "Walton Fridge", amt: "৳ 42,500", pay: "Cash" },
                { id: "#SE-2047", item: "Samsung TV", amt: "৳ 54,000", pay: "Card" },
                { id: "#SE-2046", item: "Philips Blender", amt: "৳ 6,450", pay: "bKash" },
              ].map((tx, idx) => (
                <div
                  key={tx.id}
                  className={`flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[7.5px] transition-all duration-400 ${
                    step >= 1 || idx === 0 ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{tx.item}</div>
                    <div className="text-[6.5px] text-slate-400">
                      {tx.id} · {tx.pay}
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-950">{tx.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 04: PRODUCT & INVENTORY MANAGEMENT (4s) ───────────────────────── */
function SceneInventory({ step }: { step: number }) {
  const searching = step >= 1;
  const updating = step >= 2;
  const updated = step >= 3;

  const products = [
    { code: "WL", name: "Walton Refrigerator", cat: "Appliance", price: "৳ 42,500", stock: updated ? 22 : 2, tone: "bg-sky-100 text-sky-800" },
    { code: "SM", name: "Samsung Smart TV", cat: "Television", price: "৳ 54,000", stock: 14, tone: "bg-indigo-100 text-indigo-800" },
    { code: "PH", name: "Philips Blender", cat: "Kitchen", price: "৳ 6,450", stock: 22, tone: "bg-emerald-100 text-emerald-800" },
    { code: "SG", name: "Singer Washing Machine", cat: "Appliance", price: "৳ 36,800", stock: 9, tone: "bg-amber-100 text-amber-800" },
    { code: "XM", name: "Xiaomi Smart Device", cat: "Smart Home", price: "৳ 16,500", stock: 18, tone: "bg-cyan-100 text-cyan-800" },
  ];

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900">
      <ShowcaseNav activeNav="Products" />
      <div className="relative flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">
              Catalog & Stock Control
            </div>
            <div className="text-[12px] font-black tracking-tight text-slate-950">
              Products & Inventory
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[8px] transition-all duration-300 ${
              searching
                ? "border-cyan-500 bg-white text-slate-950 ring-2 ring-cyan-400/25"
                : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            <span>⌕</span>
            <span className="font-semibold">{searching ? "Walton" : "Search SKU or product..."}</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[1.35fr_0.85fr] gap-2 pt-2">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="grid grid-cols-[1.7fr_0.8fr_0.75fr] border-b border-slate-100 bg-slate-50 px-2.5 py-1.5 text-[7px] font-extrabold uppercase tracking-wider text-slate-500">
              <span>Product</span>
              <span>Price</span>
              <span className="text-right">Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {products.map((p, idx) => {
                const selected = idx === 0 && searching;
                const isLow = p.stock <= 5;
                return (
                  <div
                    key={p.name}
                    className={`grid grid-cols-[1.7fr_0.8fr_0.75fr] items-center px-2.5 py-1.5 text-[8px] transition-colors duration-300 ${
                      selected ? "bg-cyan-50/90 ring-1 ring-inset ring-cyan-400/40" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[7px] font-black ${p.tone}`}
                      >
                        {p.code}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-bold text-slate-950">{p.name}</div>
                        <div className="text-[6.5px] text-slate-400">{p.cat}</div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800">{p.price}</span>
                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-1.5 py-0.5 text-[6.5px] font-extrabold transition-colors duration-300 ${
                          isLow
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {p.stock} {isLow ? "Low" : "In Stock"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
            <div>
              <div className="text-[7px] font-extrabold uppercase tracking-wider text-cyan-700">
                {updating ? "Adjusting Stock" : "Selected Item"}
              </div>
              <div className="mt-0.5 text-[10px] font-black text-slate-950">
                Walton Refrigerator
              </div>
              <div className="text-[7px] text-slate-400">SKU: WL-REF-280L · ৳ 42,500</div>
            </div>

            <div className="rounded-lg bg-slate-50 p-2">
              <div className="flex items-center justify-between text-[7.5px]">
                <span className="text-slate-500">Current Stock</span>
                <span className="font-black text-slate-950">{updated ? "22 units" : "2 units"}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between rounded-md border border-cyan-300 bg-white px-2 py-1 text-[8px]">
                <span className="text-slate-500">Restock</span>
                <span className="font-extrabold text-cyan-700">
                  {updating ? "+20 units" : "+0"}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[7.5px]">
                <span className="text-slate-500">Status</span>
                <span
                  className={`font-extrabold transition-colors duration-300 ${
                    updated ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {updated ? "● In Stock" : "● Low Stock"}
                </span>
              </div>
            </div>

            <div
              className={`rounded-md px-2 py-1.5 text-center text-[7.5px] font-bold transition-all duration-300 ${
                updated
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-950 text-white"
              }`}
            >
              {updated ? "✓ Stock Updated (22)" : "Apply Stock Update"}
            </div>
          </div>
        </div>

        {updated && (
          <div className="auth-step-in absolute bottom-3 right-3 rounded-lg border border-emerald-400/40 bg-slate-950 px-3 py-1.5 text-[8px] font-bold text-white shadow-xl">
            <span className="text-emerald-400">✓</span> Inventory synced · Walton Refrigerator: 22 units
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── SCENE 05: POINT OF SALE CHECKOUT (5s) ───────────────────────────────── */
function ScenePosCheckout({ step }: { step: number }) {
  const hasTv = step >= 1;
  const hasBlender = step >= 2;
  const blenderQty = step >= 3 ? 2 : 1;
  const paid = step >= 4;

  const subtotal = (hasTv ? 54000 : 0) + (hasBlender ? 6450 * blenderQty : 0);

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900">
      <ShowcaseNav activeNav="POS" />
      <div className="grid min-w-0 flex-1 grid-cols-[1.2fr_0.95fr] gap-2.5 p-3">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between rounded-lg border border-cyan-400/60 bg-white px-2.5 py-1.5 text-[8px] shadow-xs">
            <span className="font-semibold text-slate-800">
              ⌕ {step === 0 ? "Searching catalog..." : "Samsung Smart TV · Philips"}
            </span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[6.5px] font-bold text-slate-500">
              BARCODE READY
            </span>
          </div>

          <div className="my-2 grid grid-cols-2 gap-1.5">
            {[
              { name: "Samsung Smart TV", price: "৳ 54,000", active: step >= 1 },
              { name: "Philips Blender", price: "৳ 6,450", active: step >= 2 },
              { name: "Walton Fridge", price: "৳ 42,500", active: false },
              { name: "Xiaomi Smart Device", price: "৳ 16,500", active: false },
            ].map((item) => (
              <div
                key={item.name}
                className={`rounded-lg border p-2 transition-all duration-300 ${
                  item.active
                    ? "border-cyan-500 bg-cyan-50/70 ring-1 ring-cyan-400/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="truncate text-[8px] font-extrabold text-slate-950">{item.name}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[8.5px] font-black text-slate-900">{item.price}</span>
                  <span className="rounded bg-slate-950 px-1.5 py-0.5 text-[6.5px] font-bold text-cyan-300">
                    {item.active ? "Added ✓" : "+ Add"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[7.5px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">Payment Method</span>
              <div className="flex gap-1">
                {["Cash", "Card", "bKash"].map((method) => (
                  <span
                    key={method}
                    className={`rounded px-2 py-0.5 font-bold transition-all duration-300 ${
                      method === "Cash" && step >= 3
                        ? "bg-slate-950 text-cyan-300 ring-1 ring-cyan-400"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-slate-950 p-3 text-white shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-cyan-300">
                {paid ? "Receipt #SE-2091" : "Active Cart"}
              </span>
              <span className="text-[7px] text-slate-400">Counter 01</span>
            </div>

            <div className="mt-2 space-y-1.5 text-[8px]">
              {!hasTv && (
                <div className="py-5 text-center text-[7.5px] text-slate-400">
                  Scan or select product to begin sale
                </div>
              )}
              {hasTv && (
                <div className="flex items-center justify-between rounded-md bg-white/[0.06] px-2 py-1.5">
                  <div>
                    <div className="font-bold">Samsung Smart TV</div>
                    <div className="text-[6.5px] text-slate-400">1 × ৳ 54,000</div>
                  </div>
                  <span className="font-extrabold">৳ 54,000</span>
                </div>
              )}
              {hasBlender && (
                <div className="flex items-center justify-between rounded-md bg-white/[0.06] px-2 py-1.5">
                  <div>
                    <div className="font-bold">Philips Blender</div>
                    <div className="text-[6.5px] text-cyan-300">
                      {blenderQty} × ৳ 6,450
                    </div>
                  </div>
                  <span className="font-extrabold">{formatBDT(6450 * blenderQty)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-2">
            <div className="flex justify-between text-[7.5px] text-slate-400">
              <span>Subtotal</span>
              <span>{formatBDT(subtotal)}</span>
            </div>
            <div className="mt-0.5 flex items-baseline justify-between">
              <span className="text-[8px] font-bold text-slate-300">Total</span>
              <span className="text-[14px] font-black tracking-tight text-white">
                {formatBDT(subtotal)}
              </span>
            </div>
            <div
              className={`mt-2 rounded-lg px-2.5 py-1.5 text-center text-[8px] font-extrabold transition-all duration-300 ${
                paid
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-cyan-400 text-slate-950"
              }`}
            >
              {paid ? "✓ Cash Paid · Receipt Printed" : "Collect Cash Payment →"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 06: ONLINE CUSTOMER ORDER (5s) ────────────────────────────────── */
function SceneCustomerStorefront({ step }: { step: number }) {
  const detailOpen = step >= 1 && step < 3;
  const checkout = step >= 2;
  const orderPlaced = step >= 3;

  return (
    <div className="relative flex h-full flex-col justify-between bg-[#f8fafc] p-3 text-slate-900">
      <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-400 text-[8px] font-black text-slate-950">
            SE
          </span>
          <div>
            <div className="text-[9.5px] font-black tracking-tight">Selim Electronics</div>
            <div className="text-[6.5px] text-cyan-300">Official Customer Storefront</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[7.5px]">
          <span className="text-slate-300">Shop · Deals</span>
          <span className="rounded-full bg-white px-2 py-0.5 font-extrabold text-slate-950">
            Cart ({step >= 2 ? 1 : 0})
          </span>
        </div>
      </div>

      <div className="my-2 grid flex-1 grid-cols-[1.2fr_0.9fr] gap-2">
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { name: "Xiaomi Smart Device", price: "৳ 16,500", tag: "Popular", selected: step >= 1 },
            { name: "Walton Refrigerator", price: "৳ 42,500", tag: "In Stock", selected: false },
            { name: "Samsung Smart TV", price: "৳ 54,000", tag: "4K UHD", selected: false },
            { name: "Singer Washer", price: "৳ 36,800", tag: "Warranty", selected: false },
          ].map((item) => (
            <div
              key={item.name}
              className={`flex flex-col justify-between rounded-lg border p-2 transition-all duration-300 ${
                item.selected
                  ? "border-cyan-500 bg-cyan-50/70 ring-1 ring-cyan-400/40"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[6.5px] font-bold text-slate-600">
                  {item.tag}
                </span>
                <div className="mt-1 truncate text-[8px] font-extrabold text-slate-950">
                  {item.name}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[8.5px] font-black text-slate-900">{item.price}</span>
                <span className="text-[7px] font-bold text-cyan-700">
                  {item.selected ? "Selected" : "View"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
          {!checkout ? (
            <>
              <div>
                <div className="text-[7px] font-extrabold uppercase tracking-wider text-cyan-700">
                  {detailOpen ? "Product Details" : "Online Store Ready"}
                </div>
                <div className="mt-0.5 text-[9.5px] font-black text-slate-950">
                  Xiaomi Smart Device
                </div>
                <div className="mt-1 text-[7px] leading-relaxed text-slate-500">
                  Smart Air Purifier · Official warranty · Same-day Dhaka delivery
                </div>
              </div>
              <div className="rounded-md bg-slate-50 p-2 text-[8px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Price</span>
                  <span className="font-black text-slate-950">৳ 16,500</span>
                </div>
              </div>
              <div className="rounded-md bg-slate-950 py-1.5 text-center text-[7.5px] font-bold text-white">
                {detailOpen ? "Add to Cart →" : "Browse Catalog"}
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-[7px] font-extrabold uppercase tracking-wider text-cyan-700">
                  {orderPlaced ? "Order Confirmed" : "Express Checkout"}
                </div>
                <div className="mt-0.5 text-[9.5px] font-black text-slate-950">
                  {orderPlaced ? "Order #OD-4829 Placed" : "Farhan Ahmed · Dhaka"}
                </div>
                <div className="mt-1 space-y-1 text-[7.5px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Xiaomi Smart Device × 1</span>
                    <span className="font-bold text-slate-900">৳ 16,500</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Payment</span>
                    <span className="font-bold text-slate-800">bKash Verified</span>
                  </div>
                </div>
              </div>
              <div
                className={`rounded-md py-1.5 text-center text-[7.5px] font-extrabold transition-colors duration-300 ${
                  orderPlaced ? "bg-emerald-600 text-white" : "bg-slate-950 text-cyan-300"
                }`}
              >
                {orderPlaced ? "✓ Sent to POS Dashboard" : "Place Order · ৳ 16,500"}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-[7.5px] font-bold transition-all duration-400 ${
          orderPlaced
            ? "bg-slate-950 text-white shadow-md ring-1 ring-cyan-400/50"
            : "border border-slate-200 bg-white text-slate-500"
        }`}
      >
        <span>
          {orderPlaced
            ? "🔔 POS Alert: New online order #OD-4829 from Farhan Ahmed (৳ 16,500)"
            : "Every DevEngine POS tenant includes a branded online store."}
        </span>
        {orderPlaced && <span className="text-cyan-300">Synced ✓</span>}
      </div>
    </div>
  );
}

/* ─── SCENE 07: ANALYTICS & BUSINESS REPORTING (4s) ───────────────────────── */
function SceneAnalytics({
  step,
  reducedMotion,
}: {
  step: number;
  reducedMotion: boolean;
}) {
  const rev = useAnimatedNumber(1845000, true, 850, reducedMotion);
  const profit = useAnimatedNumber(462800, true, 850, reducedMotion);
  const sales = useAnimatedNumber(642, true, 750, reducedMotion);
  const expenses = useAnimatedNumber(184200, true, 800, reducedMotion);
  const invVal = useAnimatedNumber(2490000, true, 900, reducedMotion);

  return (
    <div className="flex h-full bg-[#f8fafc] text-slate-900">
      <ShowcaseNav activeNav="Reports" />
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">
              Financial & Sales Intelligence
            </div>
            <div className="text-[12px] font-black tracking-tight text-slate-950">
              Business Reports & Analytics
            </div>
          </div>
          <span className="rounded-md bg-slate-950 px-2 py-0.5 text-[7px] font-bold text-cyan-300">
            This Month
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {[
            { label: "Revenue", val: formatBDT(rev) },
            { label: "Gross Profit", val: formatBDT(profit) },
            { label: "Total Sales", val: `${sales}` },
            { label: "Expenses", val: formatBDT(expenses) },
            { label: "Inventory Val", val: formatBDT(invVal) },
          ].map((k) => (
            <div key={k.label} className="rounded-lg border border-slate-200 bg-white p-1.5">
              <div className="truncate text-[6.5px] font-semibold text-slate-500">{k.label}</div>
              <div className="mt-0.5 truncate text-[8.5px] font-black text-slate-950">{k.val}</div>
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-[1.15fr_1fr] gap-2 pt-1.5">
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-extrabold text-slate-950">
                Revenue vs Expenses
              </span>
              <span className="text-[6.5px] font-bold text-emerald-600">+25.1% margin</span>
            </div>
            <svg viewBox="0 0 240 68" className="my-1 h-[66px] w-full overflow-visible">
              <polyline
                points="8,54 46,44 84,47 122,30 160,34 198,18 232,10"
                fill="none"
                stroke="#0891b2"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="auth-line-draw"
              />
              <polyline
                points="8,60 46,57 84,59 122,52 160,55 198,49 232,47"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            </svg>
            <div className="flex justify-between text-[6.5px] font-semibold text-slate-400">
              <span>W1</span>
              <span>W2</span>
              <span>W3</span>
              <span>W4</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="text-[8px] font-extrabold text-slate-950">Best-Selling Products</div>
            <div className="space-y-1 text-[7.5px]">
              {[
                { name: "Walton Refrigerator", val: "৳ 5,10,000", share: "86%" },
                { name: "Samsung Smart TV", val: "৳ 4,32,000", share: "72%" },
                { name: "Philips Blender", val: "৳ 1,80,600", share: "44%" },
              ].map((b, idx) => (
                <div
                  key={b.name}
                  className={`transition-opacity duration-400 ${
                    step >= 1 || idx === 0 ? "opacity-100" : "opacity-45"
                  }`}
                >
                  <div className="flex justify-between font-bold">
                    <span className="truncate text-slate-800">{b.name}</span>
                    <span className="text-slate-950">{b.val}</span>
                  </div>
                  <div className="mt-0.5 h-1 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1 rounded-full bg-cyan-500 transition-all duration-700"
                      style={{ width: step >= 1 ? b.share : "15%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-1 text-[6.5px] font-semibold text-slate-500">
              Latest: #SE-2091 · Cash · ৳ 66,900 · #OD-4829 · ৳ 16,500
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 08: RETURN TO DASHBOARD FINALE (3s) ───────────────────────────── */
function SceneDashboardFinale({ step }: { step: number }) {
  return (
    <div className="flex h-full bg-[#020617] text-white">
      <ShowcaseNav activeNav="Dashboard" />
      <div className="flex min-w-0 flex-1 flex-col justify-between bg-gradient-to-br from-[#020617] via-[#09152b] to-[#0f172a] p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[7.5px] font-bold uppercase tracking-[0.16em] text-cyan-400">
              DevEngine POS · Selim Electronics
            </div>
            <div className="text-[13px] font-black tracking-tight text-white">
              Unified Retail Command Center
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 text-[7px] font-bold text-emerald-300">
            All Systems Live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "POS & Online Sales", value: "৳ 1,41,350" },
            { label: "Inventory Synced", value: "1,304 units" },
            { label: "Gross Profit", value: "৳ 4,62,800" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-2.5"
            >
              <div className="text-[7px] text-slate-400">{stat.label}</div>
              <div className="mt-0.5 text-[11px] font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-500 ${
            step >= 1
              ? "border-cyan-400/50 bg-cyan-500/15 shadow-lg shadow-cyan-500/10"
              : "border-white/15 bg-white/[0.07]"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400 text-[11px] font-black text-slate-950">
              ✓
            </span>
            <div>
              <div className="text-[11px] font-black tracking-tight text-white">
                Your business, in motion.
              </div>
              <div className="text-[7.5px] text-cyan-200">
                Registration · Workspace · POS · Storefront · Analytics
              </div>
            </div>
          </div>
          <span className="text-[8px] font-bold text-cyan-300">DevEngine POS</span>
        </div>
      </div>
    </div>
  );
}

class ShowcaseErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ScenePosDashboard step={2} reducedMotion={true} />;
    }
    return this.props.children;
  }
}

function renderSceneContent(sceneIndex: SceneId, step: number, reducedMotion: boolean) {
  switch (sceneIndex) {
    case 0:
      return <SceneRegistration step={step} />;
    case 1:
      return <SceneWorkspaceCreation step={step} />;
    case 2:
      return <ScenePosDashboard step={step} reducedMotion={reducedMotion} />;
    case 3:
      return <SceneInventory step={step} />;
    case 4:
      return <ScenePosCheckout step={step} />;
    case 5:
      return <SceneCustomerStorefront step={step} />;
    case 6:
      return <SceneAnalytics step={step} reducedMotion={reducedMotion} />;
    case 7:
    default:
      return <SceneDashboardFinale step={step} />;
  }
}

export default function AuthProductShowcase() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [sceneIndex, setSceneIndex] = useState<SceneId>(0);
  const [prevScene, setPrevScene] = useState<{ id: SceneId; step: number } | null>(null);
  const [step, setStep] = useState<number>(0);

  const stateRef = useRef({ sceneIndex: 0 as SceneId, step: 0, elapsedInScene: 0 });
  const lastTickRef = useRef<number | null>(null);
  const clearPrevTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setSceneIndex(2);
      setStep(2);
      setPrevScene(null);
      return;
    }

    let timerId: number | null = null;

    const scheduleNextMilestone = () => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
      if (document.hidden) return;

      const current = SCENES[stateRef.current.sceneIndex];
      const currentStepIdx = stateRef.current.step;
      const nextStepIdx = currentStepIdx + 1;

      const nextBoundaryMs =
        nextStepIdx < current.stepsMs.length
          ? current.stepsMs[nextStepIdx]
          : current.durationMs;

      const delay = Math.max(40, nextBoundaryMs - stateRef.current.elapsedInScene);
      lastTickRef.current = performance.now();

      timerId = window.setTimeout(() => {
        if (document.hidden) return;

        if (nextStepIdx < current.stepsMs.length) {
          stateRef.current.step = nextStepIdx;
          stateRef.current.elapsedInScene = current.stepsMs[nextStepIdx];
          setStep(nextStepIdx);
        } else {
          const exitingId = stateRef.current.sceneIndex;
          const exitingStep = stateRef.current.step;
          const nextSceneId = ((exitingId + 1) % SCENES.length) as SceneId;

          setPrevScene({ id: exitingId, step: exitingStep });
          if (clearPrevTimerRef.current !== null) {
            window.clearTimeout(clearPrevTimerRef.current);
          }
          clearPrevTimerRef.current = window.setTimeout(() => {
            setPrevScene(null);
          }, 360);

          stateRef.current = { sceneIndex: nextSceneId, step: 0, elapsedInScene: 0 };
          setSceneIndex(nextSceneId);
          setStep(0);
        }

        scheduleNextMilestone();
      }, delay);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (lastTickRef.current !== null) {
          stateRef.current.elapsedInScene += performance.now() - lastTickRef.current;
          lastTickRef.current = null;
        }
        if (timerId !== null) {
          window.clearTimeout(timerId);
          timerId = null;
        }
      } else {
        scheduleNextMilestone();
      }
    };

    scheduleNextMilestone();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (timerId !== null) window.clearTimeout(timerId);
      if (clearPrevTimerRef.current !== null) window.clearTimeout(clearPrevTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  const activeMeta = SCENES[sceneIndex];

  return (
    <div
      className="auth-monitor-wrap"
      aria-label={`DevEngine POS animated product demo (${Math.round(TOTAL_LOOP_MS / 1000)} second loop)`}
    >
      <div className="auth-monitor-bezel">
        {/* Top browser / OS bar inside monitor */}
        <div className="auth-monitor-topbar">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
            <span className="h-2 w-2 rounded-full bg-slate-600" />
          </div>
          <div className="mx-2 flex max-w-[260px] flex-1 items-center justify-center truncate rounded-md bg-slate-900/90 px-2.5 py-0.5 text-[8.5px] font-semibold tracking-normal text-slate-300 ring-1 ring-white/10">
            {activeMeta.url}
          </div>
          <div className="flex items-center gap-1.5 text-[8px] font-extrabold tracking-[0.12em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>{activeMeta.code}/08</span>
          </div>
        </div>

        {/* Fixed-dimension viewport with overflow hidden */}
        <div className="auth-monitor-screen">
          <ShowcaseErrorBoundary>
            {prevScene && !reducedMotion && (
              <div
                key={`prev-${prevScene.id}`}
                className="auth-scene-layer auth-scene-exit"
                aria-hidden="true"
              >
                {renderSceneContent(prevScene.id, prevScene.step, reducedMotion)}
              </div>
            )}
            <div
              key={`curr-${sceneIndex}`}
              className={`auth-scene-layer ${reducedMotion ? "" : "auth-scene-enter"}`}
            >
              {renderSceneContent(sceneIndex, step, reducedMotion)}
            </div>
          </ShowcaseErrorBoundary>
        </div>

        {/* Bottom caption & deterministic scene timeline */}
        <div className="auth-monitor-footer">
          <span className="truncate text-[9px] font-bold tracking-[0.04em] text-slate-200">
            {activeMeta.caption}
          </span>
          <div className="flex items-center gap-1">
            {SCENES.map((s) => {
              const isCurrent = s.id === sceneIndex;
              const isDone = s.id < sceneIndex;
              return (
                <span
                  key={s.id}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    isCurrent ? "w-5 bg-slate-700" : isDone ? "w-2 bg-cyan-500/70" : "w-1.5 bg-slate-700"
                  }`}
                >
                  {isCurrent && (
                    <span
                      key={`fill-${sceneIndex}`}
                      className="auth-pill-fill block h-full rounded-full bg-cyan-400"
                      style={{
                        animationDuration: `${s.durationMs}ms`,
                      }}
                    />
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Static physical desktop monitor neck & base */}
      <div className="auth-monitor-neck" aria-hidden="true" />
      <div className="auth-monitor-base" aria-hidden="true" />
    </div>
  );
}

