import { useState, useRef, useEffect } from "react";
import appIconImg from "../asstes/images/Selim-Electronics-App-Icon.png";
import logoLandscapeWhiteImg from "../asstes/images/logo_landscape_white.png";
import logoLandscapeBlackImg from "../asstes/images/logo_landscape_black.png";
import playstoreImg from "../asstes/images/playstore.png";
import appleLogoImg from "../asstes/images/apple-logo.png";
import devEngineFaviconImg from "../asstes/images/devengine_favicons.png";
import devEngineLandscapeImg from "../asstes/images/devengine_pos_landscape.png";
import devEngineLandscapeWhiteImg from "../asstes/images/devengine_pos_landscape_white.png";
import devEnginePortraitImg from "../asstes/images/devengine_pos_portrait.png";
import devEnginePortraitWhiteImg from "../asstes/images/devengine_pos_portrait_white.png";
import AuthProductShowcase from "./components/AuthProductShowcase";
import LogoStorytellingSection from "./components/LogoStorytellingSection";
import PaymentAcceptedStrip from "./components/PaymentAcceptedStrip";
import SuperAdminIcon, { type SuperAdminIconName } from "./components/SuperAdminIcon";
import {
  AuditView,
  ContentView,
  FeaturesView,
  OrganisationsView,
  OverviewView,
  PlansView,
  ProfileView,
  SettingsView,
  SubscriptionsView,
  SuperAdminViewProps,
  SupportView,
  VerificationView,
} from "./components/SuperAdminViews";
import {
  AuditCategory,
  AuditEntry,
  clearPlatformState,
  loadPlatformState,
  PlanId,
  PlatformContentState,
  PlatformPlan,
  PlatformState,
  PlatformTenant,
  savePlatformState,
  SupportTicket,
  TENANT_MODULE_META,
  TenantModuleKey,
} from "./platform/platformState";

// ─── Icon primitive ───────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, stroke = 1.5 }: { d: string; size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons: Record<string, string> = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  pos: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  products: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  inventory: "M4 7h16M4 12h16M4 17h10",
  purchases: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  sales: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  customers: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  suppliers: "M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4 M9 9v.01 M9 12v.01 M9 15v.01 M9 18v.01",
  orders: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2 M12 12h4 M12 16h4 M8 12h.01 M8 16h.01",
  delivery: "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3 M9 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M19 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M14 17h1a2 2 0 0 1 2 2v0 M16 11l2 6h4l-2-6",
  expenses: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  finance: "M2 20h.01 M7 20v-4 M12 20v-8 M17 20V8 M22 4v16",
  reports: "M3 3v18h18 M18 9l-5-5-4 4-3-3",
  employees: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87",
  notifications: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  arrowDown: "M12 5v14M19 12l-7 7-7-7",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  package: "M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
  alertCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8v4 M12 16h.01",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  barcode: "M4 7V4a1 1 0 0 1 1-1h2M4 17v3a1 1 0 0 0 1 1h2M17 4h2a1 1 0 0 1 1 1v3M17 20h2a1 1 0 0 0 1-1v-3 M7 8v8M10 8v8M13 8v8M16 8v8",
  trash: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  moreVertical: "M12 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M12 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  sort: "M3 6h18M6 12h12M9 18h6",
  printer: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  receipt: "M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V4a2 2 0 0 0-2-2z M8 10h8M8 14h4",
  userPlus: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M20 8v6M23 11h-6",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01",
  boxOpen: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  shoppingCart: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18",
  truck: "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  undo: "M3 7v6h6M3 13A9 9 0 1 0 6 5.1",
  trendUp: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  trendDown: "M23 18l-9.5-9.5-5 5L1 6 M17 18h6v-6",
  check: "M20 6L9 17l-5-5",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z",
  rotateCcw: "M1 4v6h6M3.51 15a9 9 0 1 0 .49-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  wallet: "M21 12V7H5a2 2 0 0 1 0-4h14v4 M3 5v14a2 2 0 0 0 2 2h16v-5 M18 12a2 2 0 0 0 0 4h4v-4z",
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const fmt = (n: number) => "৳ " + n.toLocaleString("en-BD");

// ─── Primitives ───────────────────────────────────────────────────────────────

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
function Btn({ variant = "primary", size = "md", loading, iconLeft, iconRight, children, className = "", disabled, ...props }: BtnProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium tracking-tight select-none transition-all duration-150 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes: Record<string, string> = { sm: "h-[34px] px-3 text-[13px]", md: "h-[40px] px-4 text-[14px]", lg: "h-[46px] px-5 text-[15px]" };
  const variants: Record<string, string> = {
    primary: "bg-[var(--foreground)] text-[var(--background)] hover:opacity-80",
    secondary: "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--secondary)]",
    tertiary: "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--border)]",
    ghost: "bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
    destructive: "bg-[var(--error)] text-white hover:opacity-80",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <Spinner size={14} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

function IconBtn({ icon, label, size = "md", active }: { icon: React.ReactNode; label: string; size?: "sm" | "md"; active?: boolean }) {
  const sz = size === "sm" ? "size-[28px]" : "size-[34px]";
  return (
    <button title={label} className={`${sz} inline-flex items-center justify-center rounded-md transition-all duration-150 ${active ? "bg-[var(--secondary)] text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"}`}>
      {icon}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; success?: boolean; iconLeft?: React.ReactNode; iconRight?: React.ReactNode;
}
function Input({ label, error, success, iconLeft, iconRight, className = "", ...props }: InputProps) {
  const border = error ? "border-[var(--error)] focus:ring-[var(--error)]/20" : success ? "border-[var(--success)] focus:ring-[var(--success)]/20" : "border-[var(--border)] focus:border-[var(--foreground)] focus:ring-[var(--foreground)]/10";
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-medium text-[var(--foreground)]">{label}</label>}
      <div className="relative">
        {iconLeft && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{iconLeft}</span>}
        <input className={`h-[40px] w-full rounded-lg border bg-[var(--background)] text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-150 focus:outline-none focus:ring-2 disabled:opacity-50 ${iconLeft ? "pl-9" : "px-3"} ${iconRight ? "pr-9" : "pr-3"} ${border} ${className}`} {...props} />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{iconRight}</span>}
      </div>
      {error && <span className="text-[11px] text-[var(--error)]">{error}</span>}
    </div>
  );
}

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "muted" | "partial";
function Badge({ variant = "default", children, dot }: { variant?: BadgeVariant; children: React.ReactNode; dot?: boolean }) {
  const styles: Record<BadgeVariant, string> = {
    default: "bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)]",
    success: "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-border)]",
    warning: "bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-border)]",
    error: "bg-[var(--error-bg)] text-[var(--error)] border-[var(--error-border)]",
    info: "bg-[var(--info-bg)] text-[var(--info)] border-[var(--info-border)]",
    muted: "bg-transparent text-[var(--muted-foreground)] border-[var(--border)]",
    partial: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const dotColor: Record<BadgeVariant, string> = {
    default: "bg-[var(--foreground)]", success: "bg-[var(--success)]", warning: "bg-[var(--warning)]",
    error: "bg-[var(--error)]", info: "bg-[var(--info)]", muted: "bg-[var(--muted-foreground)]", partial: "bg-amber-500",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide ${styles[variant]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotColor[variant]}`} />}
      {children}
    </span>
  );
}

function Modal({ open, onClose, title, children, size = "md" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: "sm" | "md" | "lg" | "xl" }) {
  if (!open) return null;
  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative w-full ${widths[size]} bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.x} size={16} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function Spinner({ size = 16 }: { size?: number }) {
  return <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="50 30" /></svg>;
}
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[var(--secondary)] ${className}`} />;
}
function Checkbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="checkbox" aria-checked={checked} onClick={() => onChange(!checked)} className={`h-4 w-4 shrink-0 rounded border transition-all duration-150 flex items-center justify-center ${checked ? "bg-[var(--foreground)] border-[var(--foreground)]" : "border-[var(--border)]"}`}>
      {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
    </button>
  );
}

// ─── Global Search ────────────────────────────────────────────────────────────
const searchSuggestions = [
  { type: "product", label: "Walton Ceiling Fan 56\"", sub: "SKU: WAL-CF-56 · 18 in stock", nav: "inventory" },
  { type: "product", label: "Philips LED Bulb 12W", sub: "SKU: PHI-LED-12W · 86 in stock", nav: "products" },
  { type: "product", label: "Vision Table Fan 12\"", sub: "SKU: VIS-TF-12 · 24 in stock", nav: "products" },
  { type: "customer", label: "Rahim Electronics", sub: "Customer · Due: ৳ 12,300", nav: "customers" },
  { type: "customer", label: "City Electric House", sub: "Customer · Regular", nav: "customers" },
  { type: "order", label: "Order #ORD-4821", sub: "New · ৳ 14,200", nav: "orders" },
  { type: "order", label: "Sale #SE-20483", sub: "Completed · ৳ 8,450", nav: "sales" },
  { type: "supplier", label: "Walton Distributor — Dhaka", sub: "Supplier · 240 units purchased", nav: "suppliers" },
  { type: "supplier", label: "Philips Bangladesh Ltd.", sub: "Supplier · 124 products", nav: "suppliers" },
  { type: "purchase", label: "PO-2048", sub: "Received · ৳ 86,000", nav: "purchases" },
];
function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  const results = query.length > 0 ? searchSuggestions.filter(s => s.label.toLowerCase().includes(query.toLowerCase()) || s.sub.toLowerCase().includes(query.toLowerCase())) : searchSuggestions.slice(0, 5);
  const typeIcon: Record<string, string> = { product: icons.package, customer: icons.customers, order: icons.orders, supplier: icons.suppliers, purchase: icons.purchases };
  const typeLabel: Record<string, string> = { product: "Products", customer: "Customers", order: "Orders", supplier: "Suppliers", purchase: "Purchases" };
  const grouped = results.reduce((acc, r) => { (acc[r.type] = acc[r.type] || []).push(r); return acc; }, {} as Record<string, typeof results>);

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(true)}
        className={`flex items-center h-[34px] rounded-[10px] border cursor-text transition-all duration-150 ${
          open
            ? "w-[280px] border-[var(--foreground)] bg-[var(--background)] shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
            : "w-[220px] border-[var(--border)] bg-[var(--secondary)] hover:border-[var(--foreground)] hover:bg-[var(--background)]"
        }`}
      >
        <span className="flex items-center justify-center w-8 shrink-0 text-[var(--muted-foreground)]">
          <Icon d={icons.search} size={13} stroke={1.75} />
        </span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onBlur={() => { setTimeout(() => { setOpen(false); setQuery(""); }, 150); }}
          placeholder="Search anything…"
          className="flex-1 min-w-0 bg-transparent text-[12.5px] leading-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] placeholder:font-normal outline-none"
        />
        {!open && (
          <span className="flex items-center gap-0.5 mr-2.5 shrink-0">
            <kbd className="inline-flex items-center h-[18px] px-[5px] rounded-[5px] border border-[var(--border)] bg-[var(--background)] text-[10px] font-medium text-[var(--muted-foreground)] leading-none shadow-[0_1px_0_0_var(--border)]">⌘K</kbd>
          </span>
        )}
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden z-50 max-h-80 overflow-y-auto">
          {!query && <div className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Quick jump</div>}
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <div className="px-3 pt-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">{typeLabel[type] || type}</div>
              {items.map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                  {r.type === "product" ? (
                    <div className="h-7 w-7 rounded-md bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0 text-[8px] font-bold">{r.label.slice(0, 2).toUpperCase()}</div>
                  ) : (
                    <span className="h-7 w-7 rounded-md bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0"><Icon d={typeIcon[r.type]} size={12} /></span>
                  )}
                  <div><div className="text-[12px] font-medium text-[var(--foreground)]">{r.label}</div><div className="text-[11px] text-[var(--muted-foreground)]">{r.sub}</div></div>
                </div>
              ))}
            </div>
          ))}
          {results.length === 0 && <div className="px-3 py-6 text-center text-[12px] text-[var(--muted-foreground)]">No results for "{query}"</div>}
        </div>
      )}
    </div>
  );
}

// ─── User Menu ────────────────────────────────────────────────────────────────
function NotifBell({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const unread = sampleNotifications.filter(n => !n.read).length;
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="relative h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[var(--secondary)] transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
        <Icon d={icons.bell} size={15} />
        {unread > 0 && <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[var(--error)] ring-2 ring-[var(--background)]" />}
      </button>
      {open && <NotifDropdown onNavigate={id => { onNavigate(id); setOpen(false); }} onClose={() => setOpen(false)} />}
    </div>
  );
}

function UserMenu({ onSignOut, onNavigate, businessName = "Your business" }: { onSignOut: () => void; onNavigate: (id: string) => void; businessName?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[var(--secondary)] transition-colors duration-150">
        <div className="h-7 w-7 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] text-[11px] font-bold shrink-0">{businessName.slice(0, 2).toUpperCase()}</div>
        <div className="text-left leading-tight">
          <div className="text-[12px] font-semibold text-[var(--foreground)] whitespace-nowrap">Workspace Owner</div>
          <div className="text-[10px] text-[var(--muted-foreground)]">Owner</div>
        </div>
        <span className={`text-[var(--muted-foreground)] transition-transform duration-150 ${open ? "rotate-180" : ""}`}><Icon d={icons.chevronDown} size={13} /></span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden z-50 py-1">
          <div className="px-3 py-2.5 border-b border-[var(--border)]">
            <div className="text-[12px] font-semibold text-[var(--foreground)]">Workspace Owner</div>
            <div className="text-[11px] text-[var(--muted-foreground)]">Owner · {businessName}</div>
          </div>
          {[{ icon: icons.user, label: "Profile", nav: "employees" }, { icon: icons.sliders, label: "Settings", nav: "settings" }, { icon: icons.shield, label: "Security", nav: "settings" }].map(item => (
            <button key={item.label} onClick={() => { onNavigate(item.nav); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
              <span className="text-[var(--muted-foreground)]"><Icon d={item.icon} size={14} /></span>{item.label}
            </button>
          ))}
          <div className="border-t border-[var(--border)] mt-1">
            <button onClick={onSignOut} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--error)] hover:bg-[var(--error-bg)] transition-colors">
              <Icon d={icons.logout} size={14} />Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navigation = [
  { group: "MAIN", items: [{ id: "dashboard", label: "Dashboard", icon: "dashboard" }, { id: "pos", label: "POS", icon: "pos" }, { id: "products", label: "Products", icon: "products" }, { id: "inventory", label: "Inventory", icon: "inventory" }, { id: "purchases", label: "Purchases", icon: "purchases" }, { id: "sales", label: "Sales", icon: "sales" }] },
  { group: "RELATIONSHIPS", items: [{ id: "customers", label: "Customers", icon: "customers" }, { id: "suppliers", label: "Suppliers", icon: "suppliers" }] },
  { group: "OPERATIONS", items: [{ id: "orders", label: "Orders", icon: "orders" }, { id: "delivery", label: "Delivery", icon: "delivery" }, { id: "expenses", label: "Expenses", icon: "expenses" }] },
  { group: "MULTI-LOCATION", items: [{ id: "branches", label: "Branches", icon: "mapPin" }, { id: "transfers", label: "Stock Transfers", icon: "truck" }, { id: "registers", label: "Registers & Shifts", icon: "receipt" }] },
  { group: "INSIGHTS", items: [{ id: "finance", label: "Finance", icon: "finance" }, { id: "reports", label: "Reports", icon: "reports" }] },
  { group: "ADMINISTRATION", items: [{ id: "employees", label: "Employees", icon: "employees" }, { id: "subscription", label: "Plan & Billing", icon: "wallet" }, { id: "notifications", label: "Notifications", icon: "notifications" }, { id: "settings", label: "Settings", icon: "settings" }] },
];

function Sidebar({ collapsed, activeItem, onNavigate, onToggle, businessName = "Your business", restrictedIds = [] }: { collapsed: boolean; activeItem: string; onNavigate: (id: string) => void; onToggle: () => void; businessName?: string; restrictedIds?: string[] }) {
  return (
    <aside className="h-full border-r border-[var(--border)] bg-[var(--background)] flex flex-col transition-all duration-200 ease-in-out overflow-hidden shrink-0" style={{ width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)" }}>
      <div className={`flex items-center border-b border-[var(--border)] shrink-0 h-16 ${collapsed ? "justify-center" : "justify-between px-4"}`}>
        {!collapsed && <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--foreground)] text-[10px] font-black text-[var(--background)]">{businessName.slice(0, 2).toUpperCase()}</div><div><div className="max-w-[135px] truncate text-[13px] font-bold tracking-[0.02em] text-[var(--foreground)] leading-tight">{businessName}</div><div className="text-[9px] font-semibold tracking-[0.18em] text-[var(--muted-foreground)]">DEVENGINE POS</div></div></div>}
        <button onClick={onToggle} className="h-7 w-7 flex items-center justify-center rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all duration-150" title={collapsed ? "Expand" : "Collapse"}>
          <Icon d={collapsed ? icons.chevronRight : icons.chevronLeft} size={14} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navigation.map((group, gi) => (
          <div key={group.group} className={gi > 0 ? "mt-1" : ""}>
            {!collapsed && <div className="px-2 pt-3 pb-1 text-[9px] font-semibold tracking-[0.16em] text-[var(--muted-foreground)]/50">{group.group}</div>}
            {collapsed && gi > 0 && <div className="my-2 border-t border-[var(--border)]/50 mx-1" />}
            {group.items.map(item => {
              const isActive = activeItem === item.id;
              const isRestricted = restrictedIds.includes(item.id);
              return (
                <button key={item.id} onClick={() => onNavigate(item.id)} title={collapsed ? (isRestricted ? `${item.label} (gated by Super Admin)` : item.label) : undefined} className={`w-full flex items-center gap-2.5 rounded-lg transition-all duration-150 mb-0.5 ${collapsed ? "justify-center h-9 w-9 mx-auto" : "h-9 px-2.5"} ${isActive ? "bg-[var(--foreground)] text-[var(--background)]" : isRestricted ? "text-[var(--muted-foreground)]/60 hover:bg-[var(--secondary)]/60" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"}`}>
                  <span className="shrink-0"><Icon d={icons[item.icon]} size={15} /></span>
                  {!collapsed && <span className={`text-[13px] font-medium truncate flex-1 text-left ${isActive ? "text-[var(--background)]" : ""}`}>{item.label}</span>}
                  {!collapsed && isRestricted && <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide ${isActive ? "bg-white/20 text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"}`}>Off</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      {!collapsed && (
        <div className="border-t border-[var(--border)] p-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] text-[11px] font-bold shrink-0">{businessName.slice(0, 2).toUpperCase()}</div>
            <div className="flex-1 min-w-0"><div className="text-[12px] font-semibold text-[var(--foreground)] truncate">Workspace Owner</div><div className="text-[10px] text-[var(--muted-foreground)]">Owner · Main location</div></div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ activeItem, onSignOut, onNavigate, businessName = "Your business" }: { activeItem: string; onSignOut: () => void; onNavigate: (id: string) => void; businessName?: string }) {
  const pageInfo: Record<string, { breadcrumb: string[] }> = {
    dashboard: { breadcrumb: ["Home"] }, pos: { breadcrumb: ["Home", "POS"] }, products: { breadcrumb: ["Home", "Products"] }, categories: { breadcrumb: ["Home", "Products", "Categories & Brands"] }, inventory: { breadcrumb: ["Home", "Inventory"] }, suppliers: { breadcrumb: ["Home", "Suppliers"] }, purchases: { breadcrumb: ["Home", "Purchases"] }, "supplier-payables": { breadcrumb: ["Home", "Finance", "Supplier Payables"] }, customers: { breadcrumb: ["Home", "Customers"] }, "customer-dues": { breadcrumb: ["Home", "Finance", "Customer Dues"] }, orders: { breadcrumb: ["Home", "Orders"] }, delivery: { breadcrumb: ["Home", "Delivery"] }, expenses: { breadcrumb: ["Home", "Expenses"] },
    sales: { breadcrumb: ["Home", "Sales"] },
    finance: { breadcrumb: ["Home", "Finance"] },
    reports: { breadcrumb: ["Home", "Reports"] }, branches: { breadcrumb: ["Home", "Multi-location", "Branches"] }, transfers: { breadcrumb: ["Home", "Multi-location", "Stock Transfers"] }, registers: { breadcrumb: ["Home", "Multi-location", "Registers & Shifts"] }, subscription: { breadcrumb: ["Home", "Plan & Billing"] }, employees: { breadcrumb: ["Home", "Admin", "Employees"] }, notifications: { breadcrumb: ["Home", "Notifications"] }, activity: { breadcrumb: ["Home", "Notifications", "Activity"] }, settings: { breadcrumb: ["Home", "Settings"] },
  };
  const info = pageInfo[activeItem] || { breadcrumb: ["Home"] };
  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted-foreground)]">
        {info.breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <Icon d={icons.chevronRight} size={10} />}
            <span className={i === info.breadcrumb.length - 1 ? "text-[var(--foreground)] font-medium" : "hover:text-[var(--foreground)] cursor-pointer transition-colors"}>{crumb}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <GlobalSearch />
        <div className="w-px h-5 bg-[var(--border)]" />
        <NotifBell onNavigate={onNavigate} />
        <div className="w-px h-5 bg-[var(--border)]" />
        <UserMenu onSignOut={onSignOut} onNavigate={onNavigate} businessName={businessName} />
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 02 — AUTHENTICATION
// ══════════════════════════════════════════════════════════════════════════════
type AuthScreen = "login" | "forgot" | "loading" | "error" | "network" | "pending" | "disabled" | "unauthorized" | "setup";

function AuthCard({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-[460px] bg-[var(--background)] border border-[var(--border)] rounded-[28px] shadow-[0_24px_70px_rgba(15,23,42,0.12)] px-7 py-8 sm:px-10 sm:py-10">{children}</div>;
}
function AuthBrand() {
  return (
    <div className="auth-brand-reveal mb-9 text-center">
      <DevEnginePortraitLogo tone="dark" className="mx-auto mb-5 w-[132px]" />
      <div className="text-[24px] font-bold tracking-[0.035em] text-[var(--foreground)]">DEVENGINE POS</div>
      <div className="mt-2 text-[15px] text-[var(--muted-foreground)]">The operating system for growing businesses.</div>
    </div>
  );
}

type PublicPage = "about" | "blog" | "contact" | "support" | "pricing" | "privacy" | "terms" | "cookies" | "accessibility";
type GuestAppConfig = { playStoreUrl: string; appStoreUrl: string; unavailableMessage: string };

const publicPageContent: Record<PublicPage, { eyebrow: string; title: string; lead: string; summary: string; points: string[] }> = {
  about: { eyebrow: "About DevEngine POS", title: "Retail technology that powers independent businesses.", lead: "DevEngine POS is the connected operating system for ambitious retailers and multi-branch teams, created by DevEngine.", summary: "DevEngine POS brings the critical moments of a retail business into one secure platform: the sale at the counter, the product in the stockroom, and the decision behind the next move.", points: ["One platform for independent retail businesses", "Built around real operations, not busy dashboards", "Designed to grow from one store to many"] },
  blog: { eyebrow: "DevEngine POS insights", title: "Better retail thinking, one practical note at a time.", lead: "Guides, product updates and practical perspectives for businesses building healthier retail operations with DevEngine POS.", summary: "The DevEngine POS Journal shares playbooks for inventory discipline, customer service, sales performance and scalable business systems.", points: ["Retail operations playbooks", "DevEngine POS product releases", "Stories from growing businesses"] },
  contact: { eyebrow: "Contact DevEngine POS", title: "A helpful conversation starts here.", lead: "Talk with the DevEngine POS team about plans, your business workspace, customer-app add-ons or your next operational challenge.", summary: "For product, billing and account questions, reach the DevEngine POS support team. We will route your request to the right specialist.", points: ["Email: hello@devenginepos.com", "Support: support@devenginepos.com", "Dhaka, Bangladesh"] },
  pricing: { eyebrow: "Pricing", title: "A plan that meets your business where it is.", lead: "Start with one store, then add branches, people and advanced controls as your operation becomes more connected.", summary: "Starter, Growth and Scale plans are designed around practical retail capacity: locations, registers, team access and operational support.", points: ["14-day trial with no payment required", "Clear branch and team capacity", "Upgrade paths managed from your workspace"] },
  support: { eyebrow: "DevEngine POS support", title: "Help when your business needs it.", lead: "Find guidance for launching your workspace, managing a subscription and resolving operational questions.", summary: "DevEngine POS support keeps product guidance current for every subscribed business and its workspace members.", points: ["Business onboarding and workspace setup", "Subscription, billing and access help", "Sales, inventory and payment guidance"] },
  privacy: { eyebrow: "DevEngine POS privacy", title: "Privacy built into the platform.", lead: "We respect information entrusted to DevEngine POS and use it only to operate, support and improve the service for each independent business.", summary: "This policy explains how DevEngine POS collects, protects and processes platform information, while keeping each business workspace separated.", points: ["Clear data-use practices", "Tenant and role-based safeguards", "Privacy requests handled by DevEngine POS support"] },
  terms: { eyebrow: "DevEngine POS terms of service", title: "Clear terms for a dependable platform.", lead: "These terms explain the responsibilities that keep DevEngine POS useful, secure and fair for every subscribed business.", summary: "The final legal terms cover account ownership, subscriptions, accepted use, service availability and product updates.", points: ["Business account responsibilities", "Subscription and payment obligations", "Platform and support expectations"] },
  cookies: { eyebrow: "DevEngine POS cookie notice", title: "Simple choices about cookies.", lead: "Cookies help DevEngine POS keep the platform secure, remember preferences and understand product performance.", summary: "This notice explains the categories used across DevEngine POS public pages and business workspaces, plus how visitors can control optional cookies.", points: ["Essential security cookies", "Preference and performance choices", "No surprises in tracking"] },
  accessibility: { eyebrow: "DevEngine POS accessibility", title: "A platform designed for more people.", lead: "We aim to make DevEngine POS clear, usable and considerate across devices and assistive technologies.", summary: "Accessibility feedback and improvement requests can be sent directly to the DevEngine POS support team and tracked from the platform.", points: ["Keyboard and focus support", "Motion-reduction support", "A clear feedback path"] },
};

function LandscapeLogo({ tone = "dark", size = "standard", className = "" }: { tone?: "dark" | "light"; size?: "hero" | "standard" | "footer" | "panel"; className?: string }) {
  if (size === "panel") return <div className={`flex h-[52px] w-[180px] items-center px-1 ${className}`}><DevEngineLogo tone={tone} className="w-[155px]" /></div>;
  const sizes = {
    hero: { frame: "h-[128px] w-full max-w-[520px] sm:h-[148px]", image: "w-[920px] -translate-x-[56%] sm:w-[1040px]" },
    standard: { frame: "h-[76px] w-[270px]", image: "w-[540px] -translate-x-[56%]" },
    footer: { frame: "h-[76px] w-[320px]", image: "w-[560px] -translate-x-[58%]" },
    panel: { frame: "h-[52px] w-[180px]", image: "w-[360px] -translate-x-[56%]" },
  }[size];
  return <div className={`relative shrink-0 overflow-hidden ${sizes.frame} ${className}`}><img src={tone === "light" ? logoLandscapeWhiteImg : logoLandscapeBlackImg} alt="Selim Electronics" className={`absolute left-1/2 top-1/2 max-w-none -translate-y-1/2 ${sizes.image}`} /></div>;
}

function DevEngineLogo({ tone = "dark", sharpnessLoop = false, className = "" }: { tone?: "dark" | "light"; sharpnessLoop?: boolean; className?: string }) {
  const src = tone === "light" ? devEngineLandscapeWhiteImg : devEngineLandscapeImg;
  const img = <img src={src} alt="DevEngine POS" className={`h-auto w-[178px] object-contain ${sharpnessLoop ? "devengine-logo-sharpness" : ""} ${className}`} />;
  if (!sharpnessLoop) return img;
  return (
    <span className="devengine-logo-sharpness-wrap">
      {img}
      <span
        aria-hidden="true"
        className="devengine-logo-glint"
        style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
      />
    </span>
  );
}

function DevEnginePortraitLogo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return <img src={tone === "light" ? devEnginePortraitWhiteImg : devEnginePortraitImg} alt="DevEngine POS" className={`h-auto w-[124px] object-contain ${className}`} />;
}

function DevEnginePosWordmark({ tone = "dark", sharpnessLoop = true }: { tone?: "dark" | "light"; sharpnessLoop?: boolean }) {
  return <div className="flex items-center" aria-label="DevEngine POS"><DevEngineLogo tone={tone} sharpnessLoop={sharpnessLoop} className="w-[190px]" /></div>;
}

function PublicInfoPage({ page, onBack, onContinue }: { page: PublicPage; onBack: () => void; onContinue: () => void }) {
  const content = publicPageContent[page];
  return (
    <main className="landing-page min-h-[100dvh] overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <div className="landing-orb landing-orb-one" /><div className="landing-orb landing-orb-two" />
      <div className="landing-inner relative mx-auto flex min-h-[100dvh] max-w-[1120px] flex-col px-6 sm:px-10 lg:px-16">
        <nav className="flex h-24 items-center justify-between"><button onClick={onBack} className="text-left transition hover:opacity-80"><DevEngineLogo tone="dark" sharpnessLoop className="w-[160px]" /><span className="sr-only">DevEngine POS</span></button><button onClick={onContinue} className="rounded-full bg-slate-950 px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">Business sign in →</button></nav>
        <section className="landing-reveal flex flex-1 items-center py-16 sm:py-24"><div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"><div><button onClick={onBack} className="mb-9 text-[13px] font-semibold text-slate-500 transition hover:text-slate-950">← Back to DevEngine POS</button><div className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">{content.eyebrow}</div><h1 className="mt-5 text-[clamp(3.2rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.065em]">{content.title}</h1><p className="mt-7 max-w-2xl text-[18px] leading-relaxed text-slate-600">{content.lead}</p></div><aside className="self-center rounded-[28px] border border-slate-200 bg-white/85 p-7 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:p-8"><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-cyan-700">DevEngine POS platform</div><p className="mt-4 text-[16px] leading-relaxed text-slate-700">{content.summary}</p><div className="mt-7 space-y-3 border-t border-slate-100 pt-6">{content.points.map(point => <div key={point} className="flex gap-3 text-[14px] font-medium text-slate-800"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] text-emerald-600">✓</span>{point}</div>)}</div></aside></div></section>
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-5 border-t border-slate-200 py-6 text-[12px] text-slate-500"><div><DevEngineLogo tone="dark" className="w-[165px]" /></div><div className="text-right"><div>© {new Date().getFullYear()} DevEngine POS</div><div className="mt-1 font-medium text-slate-700">Retail, built to scale.</div></div></footer>
      </div>
    </main>
  );
}

function LandingPage({
  onContinue,
  onOpenPage,
  onStartTrial,
  guestApp,
  platformContent,
  platformPlans,
  disabledPaymentChannels,
  paymentEnvironment,
}: {
  onContinue: () => void;
  onOpenPage: (page: PublicPage) => void;
  onStartTrial: (plan?: string) => void;
  guestApp: GuestAppConfig;
  platformContent?: PlatformContentState;
  platformPlans?: PlatformPlan[];
  disabledPaymentChannels?: string[];
  paymentEnvironment?: "Sandbox" | "Live";
}) {
  const [storeNotice, setStoreNotice] = useState<"play" | "apple" | null>(null);
  const openStore = (store: "play" | "apple") => {
    const url = store === "play" ? guestApp.playStoreUrl : guestApp.appStoreUrl;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    else setStoreNotice(store);
  };
  const isSectionVisible = (id: string) => platformContent?.sections.find(s => s.id === id)?.visible ?? true;
  return (
    <main className="landing-page min-h-[100dvh] overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />
      {platformContent?.maintenanceBannerEnabled && (
        <div className="relative z-20 border-b border-amber-300/60 bg-amber-50 px-6 py-2.5 text-center text-[12px] font-semibold text-amber-900">
          {platformContent.maintenanceBannerText}
        </div>
      )}
      <div className="landing-inner relative mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col px-6 sm:px-10 lg:px-20">
        <nav className="flex h-24 items-center justify-between gap-5">
          <DevEnginePosWordmark />
          <div className="hidden items-center gap-6 text-[13px] font-semibold text-slate-600 lg:flex"><button onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-950">Product</button><button onClick={() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-950">Multi-location</button><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-slate-950">Pricing</button></div>
          <div className="flex items-center gap-3"><button onClick={() => onStartTrial()} className="hidden rounded-full bg-slate-950 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-slate-800 sm:block">Start free trial</button><button onClick={onContinue} className="rounded-full border border-slate-300 bg-white/80 px-4 py-2.5 text-[13px] font-semibold text-slate-900 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white">Sign in <span aria-hidden="true">→</span></button></div>
        </nav>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.12fr_0.88fr] lg:py-20">
          <div className="landing-reveal max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/75 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{platformContent?.heroBadge || "Built for modern retail operations"}</div>
            <h1 className="max-w-5xl text-[clamp(4.2rem,9.4vw,10.25rem)] font-black leading-[0.84] tracking-[-0.085em] text-slate-950">{platformContent?.heroHeadlineTop || "Run retail"}<br /><span className="text-slate-400">{platformContent?.heroHeadlineMuted || "with clarity."}</span></h1>
            <p className="mt-9 max-w-2xl text-[clamp(1.12rem,1.8vw,1.42rem)] leading-relaxed text-slate-600">{platformContent?.heroDescription || "DevEngine POS gives every retailer a secure, scalable workspace for sales, inventory, customers and finance — so every decision feels faster, clearer and in control."}</p>
            <div className="mt-11 flex flex-wrap items-center gap-5">
              <button onClick={() => onStartTrial("growth")} className="group inline-flex h-[68px] items-center gap-3 rounded-2xl bg-slate-950 px-8 text-[16px] font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800">Start your free trial <span className="text-[19px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></button>
              <div className="flex h-[68px] items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-cyan-50 px-5 text-[14px] font-semibold text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.10)]"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black tracking-tight text-cyan-300">24/7</span><span><span className="block text-[11px] uppercase tracking-[0.12em] text-slate-400">Always on</span>Business visibility</span><span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" /></div>
            </div>
          </div>

          <div className="landing-panel landing-reveal-delayed relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/25 sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-6"><div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Your workspace at a glance</div><div className="mt-2 text-[20px] font-semibold">Your business, in motion</div></div><DevEngineLogo tone="light" className="w-[130px]" /></div>
            <div className="relative grid grid-cols-2 gap-3 py-7">
              {[{ value: "৳ 86,450", label: "Sales today" }, { value: "128", label: "Items in stock" }, { value: "24", label: "Orders in progress" }, { value: "98.4%", label: "Inventory accuracy" }].map((stat) => <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm"><div className="text-[clamp(1.15rem,2vw,1.6rem)] font-bold tracking-tight">{stat.value}</div><div className="mt-1 text-[12px] text-slate-400">{stat.label}</div></div>)}
            </div>
            <div className="relative rounded-2xl bg-white p-5 text-slate-950"><div className="flex items-center justify-between"><div><div className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Connected retail</div><div className="mt-1 text-[17px] font-semibold">Every team, one source of truth.</div></div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">✓</span></div></div>
          </div>
        </section>

        <section id="product" className="border-t border-slate-200 py-20 sm:py-24">
          <div className="max-w-2xl"><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-emerald-600">One operating system</div><h2 className="mt-3 text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.95] tracking-[-0.055em]">Everything a growing retailer needs.</h2><p className="mt-5 text-[17px] leading-relaxed text-slate-600">A clean system for selling, buying, stock control, financial visibility and teams — designed to grow from one counter to a connected retail group.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[{ icon: "pos", title: "Fast checkout", text: "Barcode, discounts, split payment, returns and shift-ready receipts." }, { icon: "inventory", title: "Inventory truth", text: "Serialised stock, stocktakes, purchase receiving and alerts." }, { icon: "finance", title: "Clear money", text: "Cash flow, expenses, dues, tax-ready sales and profit reporting." }, { icon: "customers", title: "Customer growth", text: "Profiles, loyalty-ready history, credit limits and targeted follow-up." }].map(card => <div key={card.title} className="rounded-2xl border border-slate-200 bg-white/75 p-6 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white"><Icon d={icons[card.icon]} size={18} /></span><h3 className="mt-5 text-[17px] font-bold">{card.title}</h3><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{card.text}</p></div>)}</div>
        </section>
        <section id="locations" className="rounded-[36px] bg-slate-950 px-7 py-14 text-white shadow-2xl shadow-slate-900/15 sm:px-12 sm:py-20"><div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">Made for multi-branch retail</div><h2 className="mt-4 text-[clamp(2.8rem,5vw,5rem)] font-black leading-[0.9] tracking-[-0.065em]">One business.<br />Every location accountable.</h2><p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-300">Give every branch its own stock, registers, staff access and performance view while owners see consolidated results in real time.</p><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="mt-9 rounded-xl bg-white px-5 py-3 text-[14px] font-bold text-slate-950 transition hover:bg-slate-200">Compare multi-location plans →</button></div><div className="grid gap-3 sm:grid-cols-2">{[{ value: "03", label: "Branch workspaces" }, { value: "12", label: "POS registers" }, { value: "02", label: "Transfers in transit" }, { value: "Live", label: "Consolidated reporting" }].map(item => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-6"><div className="text-[32px] font-bold">{item.value}</div><div className="mt-1 text-[13px] text-slate-400">{item.label}</div></div>)}</div></div></section>
        {isSectionVisible("pricing") && <section id="pricing" className="py-20 sm:py-24"><div className="mx-auto max-w-2xl text-center"><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-emerald-600">Simple, scalable pricing</div><h2 className="mt-3 text-[clamp(2.4rem,5vw,4.4rem)] font-black leading-[0.95] tracking-[-0.055em]">Start small. Scale with confidence.</h2><p className="mt-5 text-[16px] leading-relaxed text-slate-600">Explore each plan first. Begin registration only when you have chosen the right fit for your business.</p></div><SaasPricingExplorer onStartRegistration={onStartTrial} livePlans={platformPlans} /></section>}
        <section className="border-t border-slate-200 py-20"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-emerald-600">Your subscription journey</div><h2 className="mt-3 text-[clamp(2.2rem,4vw,3.8rem)] font-black leading-[0.96] tracking-[-0.055em]">From plan to a live business workspace.</h2><p className="mt-5 text-[16px] leading-relaxed text-slate-600">Each buyer gets an independent organisation URL, private data boundary, controlled plan limits and their own branded customer-app option.</p><button onClick={() => onStartTrial("growth")} className="mt-7 rounded-xl bg-slate-950 px-5 py-3 text-[14px] font-bold text-white transition hover:bg-slate-800">Begin buyer setup →</button></div><div className="grid gap-3 sm:grid-cols-2">{[{ no: "01", title: "Select a plan", text: "Choose Starter, Growth or Scale based on locations, staff and features." }, { no: "02", title: "Create your business", text: "Set your business name and first branch. Your unique workspace URL is reserved." }, { no: "03", title: "Confirm subscription", text: "Review billing and activate the paid plan after the trial or sales approval." }, { no: "04", title: "Launch your workspace", text: "Invite staff, configure products, POS registers and your optional customer app." }].map(step => <div key={step.no} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-[12px] font-black tracking-[0.14em] text-emerald-600">{step.no}</div><h3 className="mt-4 text-[17px] font-bold">{step.title}</h3><p className="mt-2 text-[13px] leading-relaxed text-slate-600">{step.text}</p></div>)}</div></div></section>
        <LogoStorytellingSection />
        {isSectionVisible("apps") && <BuyerAppCarousel onStore={openStore} apps={platformContent?.buyerApps.filter(a => a.featured)} />}
        <TrustedBrandsMarquee />
        <TrustedBuyersShowcase />
        {isSectionVisible("reviews") && <BuyerReviews />}
        <footer className="landing-footer mt-auto pt-12 pb-7">
          <div className="overflow-hidden rounded-[32px] bg-slate-950 px-7 py-10 text-white shadow-2xl shadow-slate-900/15 sm:px-10 sm:py-12">
            <div className="grid gap-11 lg:grid-cols-[1.45fr_repeat(3,1fr)]"><div className="max-w-sm"><DevEngineLogo tone="light" className="w-[210px]" /><p className="mt-6 text-[15px] leading-relaxed text-slate-300">DevEngine POS gives independent businesses a calm, connected way to operate, grow and stay in control.</p><button onClick={() => onStartTrial("growth")} className="mt-7 rounded-xl bg-white px-4 py-3 text-[13px] font-bold text-slate-950 transition hover:bg-slate-200">Explore your workspace →</button><div className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-400"><span className="h-2 w-2 rounded-full bg-white animate-pulse" />Platform systems operational</div></div>
              <FooterColumn dark title="Platform" links={[{ label: "Product overview", page: "about" }, { label: "Plans & pricing", page: "pricing" }, { label: "Customer stories", page: "blog" }]} onOpenPage={onOpenPage} />
              <FooterColumn dark title="Support" links={[{ label: "Support centre", page: "support" }, { label: "Accessibility", page: "accessibility" }, { label: "Business sign in", action: onContinue }]} onOpenPage={onOpenPage} />
              <FooterColumn dark title="Legal" links={[{ label: "Privacy policy", page: "privacy" }, { label: "Terms of service", page: "terms" }, { label: "Cookie notice", page: "cookies" }]} onOpenPage={onOpenPage} />
            </div>
            {isSectionVisible("payments") && <PaymentAcceptedStrip disabledChannelIds={disabledPaymentChannels} environment={paymentEnvironment} />}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-slate-400"><span>© {new Date().getFullYear()} DevEngine POS. All rights reserved.</span><span>Built for retail teams, from one counter to every branch.</span></div>
          </div>
        </footer>
      </div>
      <Modal open={storeNotice !== null} onClose={() => setStoreNotice(null)} title={storeNotice === "play" ? "Google Play availability" : "App Store availability"} size="sm"><div className="text-center py-2"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--secondary)]"><img src={storeNotice === "play" ? playstoreImg : appleLogoImg} alt="" className="h-7 w-7 object-contain" /></div><p className="text-[15px] font-semibold text-[var(--foreground)]">The guest app is coming soon.</p><p className="mt-2 text-[13px] leading-relaxed text-[var(--muted-foreground)]">{guestApp.unavailableMessage}</p><Btn className="mt-6 w-full" onClick={() => setStoreNotice(null)}>Got it</Btn></div></Modal>
    </main>
  );
}

function StoreButton({ store, onClick }: { store: "play" | "apple"; onClick: () => void }) {
  const play = store === "play";
  return <button onClick={onClick} className="flex min-w-[148px] items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-left transition hover:-translate-y-0.5 hover:bg-white/15"><img src={play ? playstoreImg : appleLogoImg} alt="" className="h-7 w-7 object-contain" /><span><span className="block text-[9px] font-medium uppercase tracking-[0.08em] text-slate-300">{play ? "Get it on" : "Download on the"}</span><span className="block text-[15px] font-semibold leading-tight">{play ? "Google Play" : "App Store"}</span></span></button>;
}

function BuyerAppCarousel({
  onStore,
  apps: customApps,
}: {
  onStore: (store: "play" | "apple") => void;
  apps?: { name: string; type: string }[];
}) {
  const [active, setActive] = useState(0);
  const colors = ["from-slate-950 via-slate-800 to-black", "from-zinc-900 via-slate-700 to-black", "from-black via-slate-800 to-slate-950"];
  const defaultApps = [{ name: "Selim Electronics", type: "Electronics" }, { name: "Nova Homeware", type: "Home & living" }, { name: "Urban Mart", type: "Everyday retail" }];
  const apps = (customApps && customApps.length ? customApps : defaultApps).map((a, idx) => ({ ...a, color: colors[idx % colors.length] }));
  useEffect(() => {
    setActive(current => current % Math.max(1, apps.length));
  }, [apps.length]);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % apps.length), 4600);
    return () => window.clearInterval(timer);
  }, [apps.length]);
  const app = apps[active] || apps[0];
  return <section className="mb-10 overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/15 sm:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-300">Built on DevEngine POS</div><h2 className="mt-3 text-[clamp(1.9rem,3.5vw,3rem)] font-black leading-[0.98] tracking-[-0.045em]">Discover buyer apps, powered by the platform.</h2><p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-300">A rotating showcase for subscribed businesses with the branded customer-app add-on. App visibility and store links are controlled only by DevEngine POS Super Admin.</p><div className="mt-6 flex flex-wrap gap-2">{apps.map((item, index) => <button key={item.name} onClick={() => setActive(index)} className={`rounded-full px-3 py-2 text-[12px] font-semibold transition ${active === index ? "bg-white text-slate-950 shadow-lg shadow-white/10" : "bg-white/10 text-slate-300 hover:bg-white/15"}`}>{item.name}</button>)}</div><div className="mt-5 flex items-center gap-2" aria-label="Carousel position">{apps.map((item, index) => <button key={`${item.name}-dot`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${active === index ? "w-7 bg-white" : "w-1.5 bg-white/25"}`} aria-label={`Show ${item.name}`} />)}</div></div><div className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${app.color} p-6 shadow-xl transition-all duration-700`}><div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/20 blur-2xl" /><div className="relative flex items-start justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">Featured customer app · Auto rotating</div><div className="mt-2 text-[24px] font-bold">{app.name}</div><div className="mt-1 text-[13px] text-white/80">{app.type}</div></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-[18px] font-black">{app.name.slice(0, 2).toUpperCase()}</div></div><div className="relative mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur"><div className="text-[13px] font-semibold">Shop, track orders and get updates.</div><div className="mt-4 flex flex-wrap gap-2"><StoreButton store="play" onClick={() => onStore("play")} /><StoreButton store="apple" onClick={() => onStore("apple")} /></div></div></div></div></section>;
}

type SaasPlanCard = {
  id: string;
  name: string;
  price: string;
  note: string;
  locations: string;
  popular?: boolean;
  features: readonly string[];
};

const saasPlans: readonly SaasPlanCard[] = [
  { id: "starter", name: "Starter", price: "৳ 2,500", note: "For a single store getting organised.", locations: "1 location included", features: ["POS, products & inventory", "Sales and cash reporting", "3 staff accounts", "Email support"] },
  { id: "growth", name: "Growth", price: "৳ 5,900", note: "For growing retail teams.", locations: "Up to 3 locations", popular: true, features: ["Everything in Starter", "Transfers and branch reporting", "10 staff accounts", "Purchase orders & supplier dues", "Priority support"] },
  { id: "scale", name: "Scale", price: "Custom", note: "For connected retail groups.", locations: "Unlimited locations", features: ["Everything in Growth", "Advanced roles and approval controls", "Consolidated finance & exports", "Dedicated success manager", "Custom integrations"] },
];

function SaasPricing({ onSelect }: { onSelect: (plan?: string) => void }) {
  return <div className="mt-12 grid gap-5 lg:grid-cols-3">{saasPlans.map(plan => <div key={plan.id} className={`relative flex flex-col rounded-[24px] border p-7 ${plan.popular ? "border-slate-950 bg-slate-950 text-white shadow-2xl shadow-slate-900/20" : "border-slate-200 bg-white/80 text-slate-950 shadow-sm"}`}>
    {plan.popular && <div className="absolute -top-3 left-6 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950">Most popular</div>}
    <div className={`text-[12px] font-bold uppercase tracking-[0.16em] ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.name}</div><div className="mt-4 text-[37px] font-black tracking-[-0.055em]">{plan.price}<span className={`ml-1 text-[14px] font-medium ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.price === "Custom" ? "" : "/ month"}</span></div><p className={`mt-3 text-[14px] leading-relaxed ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>{plan.note}</p><div className={`mt-6 rounded-xl border px-3 py-2 text-[12px] font-semibold ${plan.popular ? "border-white/15 bg-white/10 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>{plan.locations}</div><div className="mt-6 space-y-3">{plan.features.map(feature => <div key={feature} className={`flex gap-2 text-[13px] ${plan.popular ? "text-slate-200" : "text-slate-700"}`}><span className="font-bold text-emerald-500">✓</span>{feature}</div>)}</div><button onClick={() => onSelect(plan.id)} className={`mt-8 w-full rounded-xl px-4 py-3 text-[14px] font-bold transition ${plan.popular ? "bg-white text-slate-950 hover:bg-slate-200" : "bg-slate-950 text-white hover:bg-slate-800"}`}>{plan.id === "scale" ? "Talk to sales" : "Start 14-day trial"}</button></div>)}</div>;
}

function SaasPricingExplorer({ onStartRegistration, livePlans }: { onStartRegistration: (plan?: string) => void; livePlans?: PlatformPlan[] }) {
  const displayPlans: readonly SaasPlanCard[] = livePlans?.length
    ? livePlans.map(p => ({ id: p.id, name: p.name, price: p.price, note: p.note, locations: p.locationsCap === "Unlimited" ? "Unlimited locations" : `Up to ${p.locationsCap} location(s)`, popular: p.popular, features: p.features }))
    : saasPlans;
  const [selectedPlan, setSelectedPlan] = useState<SaasPlanCard | null>(null);
  return <><div className="mt-12 grid gap-5 lg:grid-cols-3">{displayPlans.map(plan => <button key={plan.id} onClick={() => setSelectedPlan(plan)} className={`relative flex min-h-[440px] flex-col rounded-[24px] border p-7 text-left transition duration-200 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-950/10 ${plan.popular ? "border-slate-950 bg-slate-950 text-white shadow-2xl shadow-slate-900/20" : "border-slate-200 bg-white/80 text-slate-950 shadow-sm hover:border-slate-400"}`}>
    {plan.popular && <div className="absolute -top-3 left-6 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-950">Most popular</div>}
    <div className={`text-[12px] font-bold uppercase tracking-[0.16em] ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.name}</div><div className="mt-4 text-[37px] font-black tracking-[-0.055em]">{plan.price}<span className={`ml-1 text-[14px] font-medium ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>{plan.price === "Custom" ? "" : "/ month"}</span></div><p className={`mt-3 text-[14px] leading-relaxed ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>{plan.note}</p><div className={`mt-6 rounded-xl border px-3 py-2 text-[12px] font-semibold ${plan.popular ? "border-white/15 bg-white/10 text-white" : "border-slate-200 bg-slate-50 text-slate-700"}`}>{plan.locations}</div><div className="mt-6 space-y-3">{plan.features.map(feature => <div key={feature} className={`flex gap-2 text-[13px] ${plan.popular ? "text-slate-200" : "text-slate-700"}`}><span className="font-bold text-emerald-500">✓</span>{feature}</div>)}</div><span className={`mt-auto pt-8 text-[14px] font-bold ${plan.popular ? "text-white" : "text-slate-950"}`}>Explore plan details →</span></button>)}</div>
  <Modal open={selectedPlan !== null} onClose={() => setSelectedPlan(null)} title={selectedPlan ? `${selectedPlan.name} plan details` : "Plan details"} size="lg">{selectedPlan && <div><div className="rounded-2xl bg-slate-950 p-6 text-white"><div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">DevEngine POS subscription</div><div className="mt-3 flex flex-wrap items-end justify-between gap-3"><div><div className="text-[30px] font-black tracking-tight">{selectedPlan.price}{selectedPlan.price === "Custom" ? "" : <span className="ml-1 text-[14px] font-medium text-slate-400">/ month</span>}</div><div className="mt-1 text-[13px] text-slate-300">{selectedPlan.locations}</div></div><span className="rounded-full bg-white/10 px-3 py-2 text-[12px] font-semibold">No purchase on this page</span></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{selectedPlan.features.map((feature, index) => <div key={feature} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[13px] font-medium text-slate-700"><span className="mr-2 text-slate-950">0{index + 1}.</span>{feature}</div>)}</div><div className="mt-6 rounded-xl border border-slate-200 p-4 text-[13px] leading-relaxed text-slate-600">Registration will collect business, compliance and billing information. A trial starts only after you finish that guided process; no payment is captured in this UI preview.</div><div className="mt-6 flex flex-wrap justify-end gap-3"><button onClick={() => setSelectedPlan(null)} className="rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-bold text-slate-700">Keep exploring</button><button onClick={() => onStartRegistration(selectedPlan.id)} className="rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-bold text-white">Continue to registration →</button></div></div>}</Modal></>;
}

const trustedBrands = [
  { name: "Walton", mark: "W", color: "#e11d48" },
  { name: "Philips", mark: "P", color: "#0f4cbd" },
  { name: "Vision", mark: "V", color: "#2563eb" },
  { name: "Singer", mark: "S", color: "#0284c7" },
  { name: "LG", mark: "LG", color: "#a50034" },
  { name: "Xiaomi", mark: "MI", color: "#f97316" },
  { name: "Panasonic", mark: "P", color: "#1d4ed8" },
  { name: "Sharp", mark: "S", color: "#dc2626" },
] as const;

function TrustedBrandsMarquee() {
  const loopedBrands = [...trustedBrands, ...trustedBrands];
  return <section className="mt-10 border-y border-slate-200 py-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-500">Trusted brands</div><h2 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-950">Brands our customers know and trust.</h2></div><div className="flex items-center gap-2 text-[12px] font-medium text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" />Curated retail partners</div></div><div className="brand-marquee overflow-hidden"><div className="brand-marquee-track">{loopedBrands.map((brand, index) => <div key={`${brand.name}-${index}`} className="brand-tile"><div className="brand-mark" style={{ backgroundColor: brand.color }}>{brand.mark}</div><span>{brand.name}</span></div>)}</div></div></section>;
}

const trustedBuyers = ["Selim Electronics", "Nova Homeware", "Urban Mart", "City Gadgets", "Bengal Lifestyle", "Prime Traders", "Nexora Retail", "Rupali Mart"];
function TrustedBuyersMarquee() {
  const buyers = [...trustedBuyers, ...trustedBuyers];
  return <section className="mt-10 overflow-hidden rounded-[26px] border border-slate-200 bg-white/70 p-6 shadow-sm sm:p-8"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-cyan-700">Trusted buyers</div><h2 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-950">Growing businesses choosing DevEngine POS.</h2></div><div className="rounded-full bg-cyan-50 px-3 py-1.5 text-[11px] font-semibold text-cyan-800">One platform · many independent businesses</div></div><div className="buyer-marquee"><div className="buyer-marquee-track">{buyers.map((buyer, index) => <div key={`${buyer}-${index}`} className="buyer-tile"><div className="buyer-avatar">{buyer.slice(0, 2).toUpperCase()}</div><div><div className="font-semibold">{buyer}</div><div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-slate-400">DevEngine POS buyer</div></div></div>)}</div></div></section>;
}

function TrustedBuyersShowcase() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % trustedBuyers.length), 2200);
    return () => window.clearInterval(timer);
  }, []);
  return <section className="trusted-buyers-showcase mt-12 overflow-hidden rounded-[34px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] sm:p-10"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-500">Trusted buyers</div><h2 className="mt-3 max-w-md text-[clamp(2.4rem,4.2vw,4.5rem)] font-black leading-[0.92] tracking-[-0.065em] text-slate-950">Built with businesses that keep moving.</h2><p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-600">Every business receives its own workspace, team controls and a path to grow from a single location to a connected retail group.</p><div className="mt-8 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.13em] text-slate-500"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[11px] text-white">{String(active + 1).padStart(2, "0")}</span> Currently spotlighting a platform buyer</div></div><div className="buyer-showcase-grid">{trustedBuyers.map((buyer, index) => <button key={buyer} onClick={() => setActive(index)} className={`buyer-showcase-card ${active === index ? "is-active" : ""}`} style={{ animationDelay: `${index * 70}ms` }}><span className="buyer-showcase-monogram">{buyer.split(" ").map(word => word[0]).join("").slice(0, 2)}</span><span><span className="block text-[15px] font-bold text-slate-950">{buyer}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Independent retail buyer</span></span><span className="buyer-showcase-status" /></button>)}</div></div></section>;
}

const buyerReviews = [
  { business: "Urban Mart", initials: "UM", quote: "We opened our second branch without rebuilding our process. Inventory and daily sales now stay in one clear view.", person: "A. Rahman · Founder", result: "2 branches connected" },
  { business: "Nova Homeware", initials: "NH", quote: "The checkout flow is quick for staff, while our owner dashboard gives us the numbers we need before closing each day.", person: "N. Sultana · Operations lead", result: "31% faster checkout" },
  { business: "City Gadgets", initials: "CG", quote: "Product serials, customer history and stock movements are much easier to follow across our growing retail team.", person: "M. Hossain · Director", result: "1,200+ products managed" },
];

function BuyerReviews() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(current => (current + 1) % buyerReviews.length), 3600);
    return () => window.clearInterval(timer);
  }, []);
  const review = buyerReviews[active];
  return <section className="buyer-reviews mt-10 border-y border-slate-200 py-12 sm:py-14" aria-label="Customer reviews"><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-500">Buyer reviews</div><h2 className="mt-2 max-w-sm text-[clamp(1.9rem,3.3vw,3.1rem)] font-black leading-[0.98] tracking-[-0.05em] text-slate-950">Retailers sharing real momentum.</h2><p className="mt-4 max-w-sm text-[14px] leading-relaxed text-slate-600">A rotating preview of the businesses building their operations on DevEngine POS.</p><div className="mt-6 flex gap-2" aria-label="Review position">{buyerReviews.map((item, index) => <button key={item.business} onClick={() => setActive(index)} aria-label={`Show ${item.business} review`} className={`h-2 rounded-full transition-all ${active === index ? "w-8 bg-slate-950" : "w-2 bg-slate-300 hover:bg-slate-500"}`} />)}</div></div><article key={review.business} className="buyer-review-card rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:p-8" aria-live="polite"><div className="flex items-start justify-between gap-5"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-[12px] font-black tracking-tight text-white">{review.initials}</span><div><div className="font-bold text-slate-950">{review.business}</div><div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">DevEngine POS customer</div></div></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700">{review.result}</span></div><blockquote className="mt-7 max-w-3xl text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em] text-slate-800">“{review.quote}”</blockquote><div className="mt-6 text-[13px] font-medium text-slate-500">{review.person}</div></article></div></section>;
}

function FooterColumn({ title, links, onOpenPage, dark = false }: { title: string; links: { label: string; page?: PublicPage; action?: () => void }[]; onOpenPage: (page: PublicPage) => void; dark?: boolean }) {
  return <div><div className={`text-[12px] font-bold uppercase tracking-[0.14em] ${dark ? "text-slate-300" : "text-slate-950"}`}>{title}</div><div className="mt-5 flex flex-col items-start gap-3">{links.map(link => <button key={link.label} onClick={() => link.page ? onOpenPage(link.page) : link.action?.()} className={`group text-left text-[14px] transition hover:translate-x-0.5 ${dark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-950"}`}>{link.label}<span className="ml-1 opacity-0 transition group-hover:opacity-100">→</span></button>)}</div></div>;
}

// ─── Onboarding flow (setup screen) ──────────────────────────────────────────

type StepStatus = "pending" | "done" | "skipped";

const STEP_LABELS = [
  "Business Profile",
  "Store Information",
  "Product Catalog",
  "Employees",
  "Payment Settings",
] as const;

function StepDot({ status, active }: { status: StepStatus; active: boolean }) {
  const base = "h-5 w-5 rounded-full flex items-center justify-center shrink-0 border transition-all";
  if (status === "done") return (
    <div className={`${base} bg-[var(--foreground)] border-[var(--foreground)]`}>
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="var(--background)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
  if (status === "skipped") return (
    <div className={`${base} border-[var(--border)] bg-[var(--secondary)]`}>
      <span className="text-[9px] text-[var(--muted-foreground)]">—</span>
    </div>
  );
  return (
    <div className={`${base} ${active ? "border-[var(--foreground)] bg-[var(--foreground)]" : "border-[var(--border)]"}`}>
      {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--background)]" />}
    </div>
  );
}

function OnboardingProgress({ statuses, current, onJump }: {
  statuses: StepStatus[]; current: number; onJump: (i: number) => void;
}) {
  const doneCount = statuses.filter(s => s === "done" || s === "skipped").length;
  const pct = Math.round((doneCount / 5) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">{doneCount} of 5 steps complete</span>
        <span className="text-[11px] text-[var(--muted-foreground)]">{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-[var(--secondary)] overflow-hidden mb-4">
        <div className="h-full rounded-full bg-[var(--foreground)] transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-1.5">
        {STEP_LABELS.map((label, i) => {
          const st = statuses[i];
          const isActive = i === current;
          const canClick = st !== "pending" || i <= current;
          return (
            <button key={label} disabled={!canClick} onClick={() => canClick && onJump(i)}
              className={`w-full flex items-center gap-3 py-2 px-2.5 rounded-lg border text-left transition-colors ${isActive ? "border-[var(--foreground)] bg-[var(--secondary)]" : "border-transparent hover:border-[var(--border)] hover:bg-[var(--secondary)]"} ${!canClick ? "cursor-default" : "cursor-pointer"}`}>
              <StepDot status={isActive ? "pending" : st} active={isActive} />
              <span className={`text-[13px] ${isActive ? "font-semibold text-[var(--foreground)]" : st === "done" ? "text-[var(--muted-foreground)] line-through" : st === "skipped" ? "text-[var(--muted-foreground)] italic" : "text-[var(--muted-foreground)]"}`}>{label}</span>
              {st === "skipped" && !isActive && <span className="ml-auto text-[10px] text-[var(--muted-foreground)]">Skipped</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OnboardingFlow({ onFinish }: { onFinish: () => void }) {
  const [current, setCurrent] = useState(0);
  const [statuses, setStatuses] = useState<StepStatus[]>(["pending","pending","pending","pending","pending"]);
  const [complete, setComplete] = useState(false);

  // Per-step form state (minimal — real values go to Settings after login)
  const [biz, setBiz] = useState({ name: "Selim Electronics", phone: "01712 345678", email: "info@selimelectronics.com", city: "Dhaka" });
  const [store, setStore] = useState({ name: "Main Store", address: "Bangla Bazar, Dhaka", openTime: "09:00", closeTime: "21:00" });
  const [catalog, setCatalog] = useState({ category: "Electronics", lowStock: "10" });
  const [emp, setEmp] = useState({ name: "", phone: "", role: "Cashier" });
  const [pay, setPay] = useState({ defaultMethod: "Cash", sslEnabled: true });

  const advance = (skipped = false) => {
    const next = [...statuses];
    next[current] = skipped ? "skipped" : "done";
    setStatuses(next);
    if (current === 4) { setComplete(true); } else { setCurrent(current + 1); }
  };

  const jump = (i: number) => { setCurrent(i); setComplete(false); };

  const SkipLink = () => (
    <div className="text-center mt-3">
      <button onClick={() => advance(true)} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors underline underline-offset-2">
        Skip for now
      </button>
      <div className="text-[11px] text-[var(--muted-foreground)] mt-1">You can complete this later in Settings.</div>
    </div>
  );

  if (complete) {
    return (
      <AuthCard>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--foreground)] mb-4">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M1 9L7.5 15.5L21 1" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 className="text-[17px] font-bold text-[var(--foreground)] tracking-tight mb-1">Setup complete</h2>
          <p className="text-[12px] text-[var(--muted-foreground)]">Selim Electronics is ready to use.</p>
        </div>
        <div className="space-y-1.5 mb-6">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-3 py-2 px-2.5 rounded-lg border border-[var(--border)]">
              <StepDot status={statuses[i]} active={false} />
              <span className={`text-[13px] ${statuses[i] === "done" ? "text-[var(--foreground)] font-medium" : "text-[var(--muted-foreground)] italic"}`}>{label}</span>
              <span className="ml-auto text-[11px] text-[var(--muted-foreground)]">{statuses[i] === "done" ? "Complete" : "Skipped"}</span>
            </div>
          ))}
        </div>
        {statuses.some(s => s === "skipped") && (
          <div className="mb-4 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[11px] text-[var(--muted-foreground)]">
            Skipped steps can be completed anytime from <strong className="text-[var(--foreground)]">Settings</strong>.
          </div>
        )}
        <Btn variant="primary" className="w-full" onClick={onFinish} iconRight={<Icon d={icons.arrowRight} size={14} />}>Go to Dashboard</Btn>
      </AuthCard>
    );
  }

  const renderStep = () => {
    switch (current) {
      case 0: return (
        <>
          <OnboardingProgress statuses={statuses} current={current} onJump={jump} />
          <h2 className="text-[15px] font-bold text-[var(--foreground)] mb-1 tracking-tight">Business Profile</h2>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Basic information about your business.</p>
          <div className="space-y-3 mb-5">
            <Input label="Business Name" value={biz.name} onChange={e => setBiz(p => ({ ...p, name: e.target.value }))} />
            <Input label="Phone" value={biz.phone} onChange={e => setBiz(p => ({ ...p, phone: e.target.value }))} />
            <Input label="Email" type="email" value={biz.email} onChange={e => setBiz(p => ({ ...p, email: e.target.value }))} />
            <Input label="City" value={biz.city} onChange={e => setBiz(p => ({ ...p, city: e.target.value }))} />
          </div>
          <Btn variant="primary" className="w-full" onClick={() => advance(false)} iconRight={<Icon d={icons.arrowRight} size={14} />}>Save & Continue</Btn>
          <SkipLink />
        </>
      );
      case 1: return (
        <>
          <OnboardingProgress statuses={statuses} current={current} onJump={jump} />
          <h2 className="text-[15px] font-bold text-[var(--foreground)] mb-1 tracking-tight">Store Information</h2>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Details about your primary store location.</p>
          <div className="space-y-3 mb-5">
            <Input label="Store Name" value={store.name} onChange={e => setStore(p => ({ ...p, name: e.target.value }))} />
            <Input label="Address" value={store.address} onChange={e => setStore(p => ({ ...p, address: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Opening" type="time" value={store.openTime} onChange={e => setStore(p => ({ ...p, openTime: e.target.value }))} />
              <Input label="Closing" type="time" value={store.closeTime} onChange={e => setStore(p => ({ ...p, closeTime: e.target.value }))} />
            </div>
          </div>
          <Btn variant="primary" className="w-full" onClick={() => advance(false)} iconRight={<Icon d={icons.arrowRight} size={14} />}>Save & Continue</Btn>
          <SkipLink />
        </>
      );
      case 2: return (
        <>
          <OnboardingProgress statuses={statuses} current={current} onJump={jump} />
          <h2 className="text-[15px] font-bold text-[var(--foreground)] mb-1 tracking-tight">Product Catalog</h2>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Configure your catalog defaults. You can add products after setup.</p>
          <div className="space-y-3 mb-4">
            <SelectField label="Primary category" value={catalog.category} onChange={v => setCatalog(p => ({ ...p, category: v }))} options={[{ value: "Electronics", label: "Electronics" }, { value: "Lighting", label: "Lighting" }, { value: "Fans", label: "Fans" }, { value: "Cables & Accessories", label: "Cables & Accessories" }]} />
            <Input label="Low stock alert threshold" value={catalog.lowStock} onChange={e => setCatalog(p => ({ ...p, lowStock: e.target.value }))} />
          </div>
          <div className="mb-5 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[11px] text-[var(--muted-foreground)]">
            Add your products from <strong className="text-[var(--foreground)]">Products → Add Product</strong> after completing setup.
          </div>
          <Btn variant="primary" className="w-full" onClick={() => advance(false)} iconRight={<Icon d={icons.arrowRight} size={14} />}>Save & Continue</Btn>
          <SkipLink />
        </>
      );
      case 3: return (
        <>
          <OnboardingProgress statuses={statuses} current={current} onJump={jump} />
          <h2 className="text-[15px] font-bold text-[var(--foreground)] mb-1 tracking-tight">Employees</h2>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Invite your first staff member. You can add more later.</p>
          <div className="space-y-3 mb-4">
            <Input label="Full Name" value={emp.name} onChange={e => setEmp(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Mahbub Rahman" />
            <Input label="Phone" value={emp.phone} onChange={e => setEmp(p => ({ ...p, phone: e.target.value }))} placeholder="01712 345678" />
            <SelectField label="Role" value={emp.role} onChange={v => setEmp(p => ({ ...p, role: v }))} options={[{ value: "Manager", label: "Manager" }, { value: "Cashier", label: "Cashier" }, { value: "Inventory Staff", label: "Inventory Staff" }, { value: "Delivery Staff", label: "Delivery Staff" }]} />
          </div>
          <div className="mb-5 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[11px] text-[var(--muted-foreground)]">
            Manage all employees and permissions from <strong className="text-[var(--foreground)]">Employees</strong> after setup.
          </div>
          <Btn variant="primary" className="w-full" onClick={() => advance(false)} iconRight={<Icon d={icons.arrowRight} size={14} />}>Save & Continue</Btn>
          <SkipLink />
        </>
      );
      case 4: return (
        <>
          <OnboardingProgress statuses={statuses} current={current} onJump={jump} />
          <h2 className="text-[15px] font-bold text-[var(--foreground)] mb-1 tracking-tight">Payment Settings</h2>
          <p className="text-[12px] text-[var(--muted-foreground)] mb-4">Configure how you accept payments.</p>
          <div className="space-y-3 mb-4">
            <SelectField label="Default payment method" value={pay.defaultMethod} onChange={v => setPay(p => ({ ...p, defaultMethod: v }))} options={[{ value: "Cash", label: "Cash" }, { value: "bKash", label: "bKash" }, { value: "Nagad", label: "Nagad" }, { value: "Bank", label: "Bank Transfer" }]} />
            <div className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-[var(--border)]">
              <div>
                <div className="text-[13px] font-medium text-[var(--foreground)]">SSLCommerz</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">Online customer payments</div>
              </div>
              <Toggle checked={pay.sslEnabled} onChange={v => setPay(p => ({ ...p, sslEnabled: v }))} />
            </div>
          </div>
          <div className="mb-5 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[11px] text-[var(--muted-foreground)]">
            SSLCommerz credentials can be added from <strong className="text-[var(--foreground)]">Settings → Payments</strong>.
          </div>
          <Btn variant="primary" className="w-full" onClick={() => advance(false)} iconRight={<Icon d={icons.arrowRight} size={14} />}>Finish Setup</Btn>
          <SkipLink />
        </>
      );
    }
  };

  return (
    <div className="w-full max-w-[540px]">
      <div className="mb-7 text-center">
        <img src={appIconImg} alt="Selim Electronics" className="h-14 w-14 rounded-2xl shadow-lg mx-auto mb-4" />
        <div className="text-[18px] font-bold tracking-[0.05em] text-[var(--foreground)]">SELIM ELECTRONICS</div>
        <div className="text-[14px] text-[var(--muted-foreground)] mt-1">Let&apos;s set up your retail workspace</div>
      </div>
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-[28px] shadow-[0_24px_70px_rgba(15,23,42,0.12)] px-6 py-7 sm:px-9 sm:py-9">
        {renderStep()}
      </div>
    </div>
  );
}

function AuthPage({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [screen, setScreen] = useState<AuthScreen>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const handleSignIn = () => {
    if (!email || !password) { setLoginError("Please enter your email and password."); return; }
    setLoginError(""); setScreen("loading"); setTimeout(() => setScreen("setup"), 1600);
  };

  const renderScreen = (s: AuthScreen) => {
    if (s === "login") return (
      <AuthCard>
        <AuthBrand />
        {/* Email + Password */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-[12px] font-semibold text-[var(--muted-foreground)] mb-2">Work email</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setLoginError(""); }} placeholder="you@selimelectronics.com" className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[14px] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:ring-4 focus:ring-black/5 transition-colors" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-[12px] font-semibold text-[var(--muted-foreground)]">Password</label><button onClick={() => setScreen("forgot" as AuthScreen)} className="text-[12px] font-semibold text-[var(--foreground)] hover:opacity-60 transition-colors">Forgot password?</button></div>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setLoginError(""); }} placeholder="••••••••" className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[14px] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:ring-4 focus:ring-black/5 transition-colors" />
          </div>
          {loginError && <div className="text-[12px] text-[var(--error)] flex items-center gap-1.5"><Icon d={icons.x} size={11} />{loginError}</div>}
          <button onClick={handleSignIn} className="w-full h-12 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-[14px] font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-black/10">Sign In to Workspace</button>
        </div>
        <div className="relative mb-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border)]" /></div><div className="relative flex justify-center"><span className="bg-[var(--background)] px-3 text-[11px] text-[var(--muted-foreground)]">or</span></div></div>
        <button onClick={handleSignIn} className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-[var(--border)] text-[14px] font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-all duration-150">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <div className="mt-5 pt-4 border-t border-[var(--border)] text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--muted-foreground)]"><Icon d={icons.lock} size={11} />Restricted to authorized employees only.</div>
        </div>
      </AuthCard>
    );
    if ((s as string) === "forgot") return (
      <AuthCard>
        <AuthBrand />
        <h2 className="text-[15px] font-semibold text-[var(--foreground)] mb-1 tracking-tight">Reset your password</h2>
        <p className="text-[12px] text-[var(--muted-foreground)] mb-5">Enter your email to receive a password reset link.</p>
        {resetSent ? (
          <div className="p-4 rounded-xl border border-[var(--success-border)] bg-[var(--success-bg)] text-center mb-4">
            <div className="text-[13px] font-semibold text-[var(--success)] mb-1">Reset link sent</div>
            <div className="text-[12px] text-[var(--muted-foreground)]">Check your email at {resetEmail}</div>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="you@selimelectronics.com" className="w-full h-[38px] px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] transition-colors" />
            <button onClick={() => setResetSent(true)} className="w-full h-[40px] rounded-lg bg-[var(--foreground)] text-[var(--background)] text-[13px] font-semibold hover:opacity-90 transition-opacity">Send Reset Link</button>
          </div>
        )}
        <button onClick={() => setScreen("login")} className="w-full text-center text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">← Back to sign in</button>
      </AuthCard>
    );
    if (s === "loading") return <AuthCard><AuthBrand /><div className="py-4 flex flex-col items-center gap-4"><div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center"><Spinner size={18} /></div><div className="text-[13px] text-[var(--muted-foreground)]">Signing you in…</div></div></AuthCard>;
    if (s === "error") return <AuthCard><AuthBrand /><div className="mb-5 p-3 rounded-lg bg-[var(--error-bg)] border border-[var(--error-border)]"><div className="text-[13px] font-medium text-[var(--error)]">Unable to sign in</div><div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">Please try again or contact your administrator.</div></div><button onClick={() => setScreen("login")} className="w-full h-[40px] rounded-lg border border-[var(--border)] text-[13px] font-medium hover:bg-[var(--secondary)] transition-all">Try again</button></AuthCard>;
    if (s === "network") return <AuthCard><AuthBrand /><div className="mb-5 p-3 rounded-lg bg-[var(--warning-bg)] border border-[var(--warning-border)]"><div className="text-[13px] font-medium text-[var(--warning)]">Connection issue</div><div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">Something went wrong. Please check your connection.</div></div><Btn variant="secondary" className="w-full" onClick={() => setScreen("login")}>Retry</Btn></AuthCard>;
    if (s === "pending") return <AuthCard><div className="text-center"><div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-5"><Icon d={icons.clock} size={18} /></div><h2 className="text-[15px] font-semibold text-[var(--foreground)] tracking-tight mb-2">Account access pending</h2><p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">Your account is awaiting approval from a business administrator.</p><div className="mt-6 pt-5 border-t border-[var(--border)]"><button onClick={() => setScreen("login")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Sign in with a different account</button></div></div></AuthCard>;
    if (s === "disabled") return <AuthCard><div className="text-center"><div className="h-10 w-10 rounded-xl bg-[var(--error-bg)] border border-[var(--error-border)] flex items-center justify-center mx-auto mb-5"><Icon d={icons.lock} size={16} /></div><h2 className="text-[15px] font-semibold text-[var(--foreground)] tracking-tight mb-2">Account unavailable</h2><p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">Your account has been disabled. Please contact a business administrator.</p><div className="mt-6 pt-5 border-t border-[var(--border)]"><button onClick={() => setScreen("login")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Use a different account</button></div></div></AuthCard>;
    if (s === "unauthorized") return <div className="w-full max-w-[400px] text-center"><div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-5"><Icon d={icons.shield} size={18} /></div><h2 className="text-[18px] font-semibold text-[var(--foreground)] tracking-tight mb-2">Access restricted</h2><p className="text-[13px] text-[var(--muted-foreground)] mb-6">You don&apos;t have permission to view this page.</p><Btn variant="secondary" onClick={onSuccess} iconLeft={<Icon d={icons.arrowRight} size={13} />}>Back to dashboard</Btn></div>;
    if (s === "setup") {
      // Onboarding state lives here so it resets only on fresh "setup" entry
      return <OnboardingFlow onFinish={onSuccess} />;
    }
    return null;
  };

  return (
    <div className="auth-page min-h-full overflow-y-auto bg-[#f8fafc]">
      <div className="min-h-screen lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 opacity-30 auth-grid" /><div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="relative"><LandscapeLogo tone="light" size="standard" /></div>
          <div className="relative max-w-lg"><div className="mb-6 text-[12px] font-bold uppercase tracking-[0.18em] text-slate-400">Retail operations platform</div><h1 className="text-[clamp(3rem,4vw,5rem)] font-black leading-[0.93] tracking-[-0.06em]">A sharper way to run your business.</h1><p className="mt-7 max-w-md text-[17px] leading-relaxed text-slate-300">Everything your team needs to sell, stock and grow - thoughtfully connected in one workspace.</p></div>
          <div className="relative flex items-center gap-3 text-[13px] text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />Secure access for authorized teams</div>
        </div>
        <div className="relative flex min-h-screen items-center justify-center p-5 sm:p-8 lg:p-12"><div className="absolute inset-0 lg:hidden auth-grid opacity-30" /><button onClick={onBack} className="absolute left-5 top-5 z-10 rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-[13px] font-semibold text-[var(--foreground)] shadow-sm backdrop-blur transition hover:bg-[var(--secondary)] sm:left-8 sm:top-8">← Back to landing</button><div className="relative w-full max-w-[540px]">{renderScreen(screen)}</div></div>
      </div>
    </div>
  );
}

function TenantWorkspaceSignIn({ tenant, onSuccess, onBack, onRegister }: { tenant: string; onSuccess: () => void; onBack: () => void; onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pending = new URLSearchParams(window.location.search).get("pending") === "true";
  const businessName = "Your business";
  const signIn = () => {
    if (!email || !password) { setError("Enter your work email and password to continue."); return; }
    onSuccess();
  };
  return <main className="min-h-[100dvh] bg-[#f8fafc] text-slate-950"><div className="grid min-h-[100dvh] lg:grid-cols-[0.9fr_1.1fr]"><aside className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col"><div className="absolute inset-0 auth-grid opacity-30" /><div className="relative"><div><DevEngineLogo tone="light" className="w-[205px]" /></div><div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-red-300">Secure business workspace</div></div><div className="relative my-auto max-w-xl"><h1 className="text-[clamp(3rem,5vw,5.8rem)] font-black leading-[0.9] tracking-[-0.07em]">Your business.<br />One clear system.</h1><p className="mt-7 max-w-md text-[17px] leading-relaxed text-slate-300">Sign in to your private DevEngine POS workspace to manage daily operations, teams, branches and subscriptions.</p><div className="mt-8 flex items-center gap-3 text-[13px] text-slate-400"><span className="h-2 w-2 rounded-full bg-red-400" />Tenant-separated access and role-based permissions</div></div><div className="relative text-[12px] text-slate-400">© {new Date().getFullYear()} DevEngine POS · Built by DevEngine</div></aside><section className="relative flex min-h-[100dvh] items-center justify-center p-5 sm:p-10"><button onClick={onBack} className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold shadow-sm transition hover:border-slate-950 sm:left-10 sm:top-10">← Back to DevEngine POS</button><div className="w-full max-w-[460px]"><div className="mb-8 lg:hidden"><DevEnginePosWordmark /></div><div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-9"><div className="flex items-start justify-between gap-4"><div><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-600">Workspace access</div><h2 className="mt-2 text-[29px] font-black tracking-tight">Sign in</h2><p className="mt-2 text-[13px] leading-relaxed text-slate-500">{businessName} workspace</p></div><span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-950 px-2 text-[11px] font-bold text-white">POS</span></div>{pending && <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[12px] leading-relaxed text-amber-900"><span className="font-bold">Registration under review.</span> Your business profile and verification documents are waiting for DevEngine POS Super Admin approval. You can return here once activation is confirmed.</div>}<div className="mt-7 space-y-4"><div><label className="mb-2 block text-[12px] font-semibold text-slate-600">Work email</label><input value={email} onChange={event => { setEmail(event.target.value); setError(""); }} type="email" placeholder="you@business.com" className="h-12 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" /></div><div><div className="mb-2 flex items-center justify-between"><label className="text-[12px] font-semibold text-slate-600">Password</label><button className="text-[12px] font-semibold text-slate-950 hover:underline">Forgot password?</button></div><input value={password} onChange={event => { setPassword(event.target.value); setError(""); }} type="password" placeholder="••••••••" className="h-12 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" /></div>{error && <p className="text-[12px] font-medium text-red-600">{error}</p>}<button onClick={signIn} className="h-12 w-full rounded-xl bg-slate-950 text-[14px] font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-red-700">Sign in to workspace →</button></div><div className="my-6 flex items-center gap-3 text-[11px] text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">or</div><button onClick={onRegister} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-bold text-slate-800 transition hover:border-red-300 hover:bg-red-50">Register a new business on DevEngine POS</button><p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">Workspace owners approve team access. Platform account activation is handled by DevEngine POS Super Admin.</p></div></div></section></div></main>;
}

function RegistrationJourneyPreview() {
  const [stage, setStage] = useState(0);
  const stages = ["Business profile", "Verification ready", "Enter workspace"];
  useEffect(() => {
    const timer = window.setInterval(() => setStage(current => (current + 1) % stages.length), 1350);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="registration-journey" aria-label="Registration to POS workspace animation"><div className="registration-journey-top"><span>DEVENGINE POS</span><span>4× SETUP FLOW</span></div><div className="registration-journey-body" key={stage}>{stage === 0 && <><div className="registration-journey-kicker">STEP 01 · REGISTER</div><strong>Create your business</strong><div className="registration-journey-field"><span>Business name</span><b>Urban Mart</b></div><div className="registration-journey-field delay"><span>Workspace URL</span><b>/urban-mart</b></div></>}{stage === 1 && <><div className="registration-journey-kicker">STEP 02 · VERIFY</div><strong>Profile submitted</strong><div className="registration-journey-check"><span>Business profile</span><b>✓</b></div><div className="registration-journey-check"><span>Compliance review</span><b>✓</b></div><div className="registration-journey-check"><span>Account activation</span><b>Ready</b></div></>}{stage === 2 && <><div className="registration-journey-kicker">STEP 03 · OPERATE</div><strong>Welcome to your POS</strong><div className="registration-journey-stats"><span><b>৳ 42,700</b>Sales today</span><span><b>126</b>Items in stock</span></div><div className="registration-journey-ready">Workspace live <b>→</b></div></>}</div><div className="registration-journey-footer"><span>{stages[stage]}</span><div>{stages.map((item, index) => <i key={item} className={index === stage ? "active" : ""} />)}</div></div></div>;
}

function TenantWorkspaceSignInV2({ tenant, onSuccess, onBack, onRegister }: { tenant: string; onSuccess: () => void; onBack: () => void; onRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pending = new URLSearchParams(window.location.search).get("pending") === "true";
  const businessName = tenant === "your-business" ? "Your business" : tenant.replace(/-/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
  const signIn = () => { if (!email || !password) { setError("Enter your work email and password to continue."); return; } onSuccess(); };
  return <main className="min-h-[100dvh] overflow-x-hidden bg-slate-50 text-slate-950"><div className="grid min-h-[100dvh] lg:grid-cols-[1.04fr_0.96fr]"><aside className="relative order-2 flex flex-col overflow-hidden bg-slate-950 p-6 text-white sm:p-10 lg:order-1 lg:p-12"><div className="absolute inset-0 auth-grid" /><div className="relative"><div><DevEngineLogo tone="light" className="w-[205px]" /></div><div className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">Secure business workspace</div></div><div className="relative my-auto py-8 lg:py-6"><AuthProductShowcase /><h1 className="mt-7 max-w-2xl text-[clamp(2.4rem,4.6vw,5.4rem)] font-black leading-[0.9] tracking-[-0.07em]">Your business.<br />One clear system.</h1><p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-[16px]">A fast product preview of registration, stock control and checkout—built into every DevEngine POS workspace.</p></div><div className="relative text-[12px] text-slate-400">© {new Date().getFullYear()} DevEngine POS · Built by DevEngine</div></aside><section className="relative order-1 flex min-h-[100dvh] items-center justify-center p-5 sm:p-10 lg:order-2"><button onClick={onBack} className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold shadow-sm transition hover:border-slate-950 sm:left-10 sm:top-10">← Back to DevEngine POS</button><div className="w-full max-w-[460px]"><div className="mb-8 lg:hidden"><DevEnginePosWordmark /></div><div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-9"><div className="flex items-start justify-between gap-4"><div><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">Workspace access</div><h2 className="mt-2 text-[29px] font-black tracking-tight">Sign in</h2><p className="mt-2 text-[13px] leading-relaxed text-slate-500">{businessName} workspace</p></div><span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-950 px-2 text-[11px] font-bold text-white">POS</span></div>{pending && <div className="mt-6 rounded-xl border border-slate-300 bg-slate-50 p-4 text-[12px] leading-relaxed text-slate-700"><span className="font-bold">Registration under review.</span> Your business profile and verification documents are waiting for DevEngine POS Super Admin approval.</div>}<div className="mt-7 space-y-4"><Input label="Work email" value={email} onChange={event => { setEmail(event.target.value); setError(""); }} type="email" placeholder="you@business.com" /><div><div className="mb-2 flex items-center justify-between"><label className="text-[12px] font-semibold text-slate-600">Password</label><button className="text-[12px] font-semibold text-slate-950 hover:underline">Forgot password?</button></div><input value={password} onChange={event => { setPassword(event.target.value); setError(""); }} type="password" placeholder="••••••••" className="h-12 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" /></div>{error && <p className="text-[12px] font-medium text-slate-700">{error}</p>}<button onClick={signIn} className="h-12 w-full rounded-xl bg-slate-950 text-[14px] font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800">Sign in to workspace →</button></div><div className="my-6 flex items-center gap-3 text-[11px] text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">or</div><button onClick={onRegister} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-50">Register a new business on DevEngine POS</button><p className="mt-5 text-center text-[11px] leading-relaxed text-slate-400">Workspace owners approve team access. Platform account activation is handled by DevEngine POS Super Admin.</p></div></div></section></div></main>;
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 03 — DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const salesChartData = [18200,24500,19800,32100,28400,15600,22300,35800,41200,38600,29400,44100,52300,48700,39200,33600,45800,58200,62400,55100,49800,43200,38900,52700,61300,57800,48200,53400,67800,71200];

function SalesChart({ period }: { period: string }) {
  const w = 680, h = 180, pad = { top: 16, right: 16, bottom: 32, left: 52 };
  const iw = w - pad.left - pad.right, ih = h - pad.top - pad.bottom;
  const slices: Record<string, number[]> = { Today: salesChartData.slice(-1), "7d": salesChartData.slice(-7), "30d": salesChartData, "3m": salesChartData, "1y": salesChartData };
  const data = slices[period] || salesChartData;
  const min = Math.min(...data) * 0.9, max = Math.max(...data) * 1.05;
  const x = (i: number) => pad.left + (i / Math.max(data.length - 1, 1)) * iw;
  const y = (v: number) => pad.top + ih - ((v - min) / (max - min)) * ih;
  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const areaPath = `${linePath} L${x(data.length - 1)},${h - pad.bottom} L${x(0)},${h - pad.bottom} Z`;
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) * i) / ticks).reverse();
  const xLabels = data.length > 7 ? [0, 7, 14, 21, 29].filter(i => i < data.length) : data.map((_, i) => i);
  const getLabel = (i: number) => { if (data.length <= 7) return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i % 7]; const d = new Date(2026, 7, i + 5); return `${d.getDate()} ${d.toLocaleString("en", { month: "short" })}`; };
  const fmtK = (v: number) => v >= 100000 ? `৳${(v / 100000).toFixed(1)}L` : `৳${(v / 1000).toFixed(0)}k`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.08" /><stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" /></linearGradient></defs>
      {yTicks.map((v, i) => <g key={i}><line x1={pad.left} y1={y(v)} x2={w - pad.right} y2={y(v)} stroke="var(--border)" strokeWidth={0.8} strokeDasharray="4 4" /><text x={pad.left - 8} y={y(v)} textAnchor="end" dominantBaseline="middle" fontSize={10} fill="var(--muted-foreground)">{fmtK(v)}</text></g>)}
      {xLabels.map(i => <text key={i} x={x(i)} y={h - 4} textAnchor="middle" fontSize={10} fill="var(--muted-foreground)">{getLabel(i)}</text>)}
      <path d={areaPath} fill="url(#cg)" />
      <path d={linePath} fill="none" stroke="var(--foreground)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r={3} fill="var(--foreground)" />
    </svg>
  );
}

const topProducts = [
  { name: "Walton Ceiling Fan 56\"", category: "Fan", units: 142, revenue: "৳ 7,10,000" },
  { name: "Philips LED Bulb 12W", category: "Lighting", units: 896, revenue: "৳ 4,48,000" },
  { name: "Vision Table Fan", category: "Fan", units: 204, revenue: "৳ 3,26,400" },
  { name: "Super Star LED Tube Light", category: "Lighting", units: 512, revenue: "৳ 2,56,000" },
  { name: "Walton Switch 2 Gang", category: "Electrical", units: 738, revenue: "৳ 2,21,400" },
];
const recentSalesDash = [
  { invoice: "#SE-20483", customer: "Walk-in Customer", amount: "৳ 8,450", payment: "Cash", status: "paid" as const, time: "11:42 AM" },
  { invoice: "#SE-20482", customer: "Rahim Electronics", amount: "৳ 12,300", payment: "bKash", status: "paid" as const, time: "10:58 AM" },
  { invoice: "#SE-20481", customer: "MD. Karim", amount: "৳ 3,200", payment: "Cash", status: "paid" as const, time: "10:21 AM" },
  { invoice: "#SE-20480", customer: "City Electric House", amount: "৳ 28,500", payment: "Credit", status: "due" as const, time: "9:45 AM" },
];
const onlineOrders = [
  { id: "#OD-4821", customer: "Farhan Ahmed", amount: "৳ 14,200", payment: "bKash", status: "new" as const },
  { id: "#OD-4820", customer: "Nusrat Jahan", amount: "৳ 6,800", payment: "Card", status: "confirmed" as const },
  { id: "#OD-4819", customer: "Tanvir Islam", amount: "৳ 22,500", payment: "bKash", status: "preparing" as const },
];
const invAlerts = [
  { name: "Philips LED Bulb 12W", qty: 6, level: "low" as const },
  { name: "Walton Fan 56\"", qty: 2, level: "critical" as const },
  { name: "Super Star LED Tube 36W", qty: 0, level: "out" as const },
  { name: "Vision Table Fan 12\"", qty: 4, level: "low" as const },
];
const activityFeed = [
  { icon: icons.boxOpen, title: "Purchase order received", desc: "PO-2048 from Walton Bangladesh — 240 units", time: "12 min ago" },
  { icon: icons.shoppingCart, title: "New online order", desc: "#OD-4821 · Farhan Ahmed · ৳ 14,200", time: "28 min ago" },
  { icon: icons.package, title: "Stock adjusted", desc: "Walton Fan 56\" — quantity corrected to 18", time: "1 hr ago" },
  { icon: icons.receipt, title: "Payment received", desc: "Rahim Electronics settled ৳ 12,300 due", time: "2 hr ago" },
];
const orderBadge: Record<string, { v: BadgeVariant; l: string }> = { new: { v: "info", l: "New" }, confirmed: { v: "default", l: "Confirmed" }, preparing: { v: "warning", l: "Preparing" }, out_for_delivery: { v: "warning", l: "Out for delivery" }, delivered: { v: "success", l: "Delivered" }, paid: { v: "success", l: "Paid" }, due: { v: "error", l: "Due" } };

type DashView = "populated" | "loading" | "empty";
function DashboardPage({ onNavigate, businessName }: { onNavigate: (id: string) => void; businessName: string }) {
  const [period, setPeriod] = useState("30d");
  const [view, setView] = useState<DashView>("populated");
  const periods = ["Today", "7d", "30d", "3m", "1y"];
  if (view === "loading") return <div className="flex-1 overflow-y-auto p-6 space-y-5"><div className="flex justify-between"><div className="space-y-2"><Skeleton className="h-7 w-56" /><Skeleton className="h-4 w-72" /></div><div className="flex gap-2"><Skeleton className="h-8 w-24" /><Skeleton className="h-8 w-28" /></div></div><div className="grid grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="border border-[var(--border)] rounded-xl p-5 space-y-3"><Skeleton className="h-3 w-20" /><Skeleton className="h-8 w-32" /><Skeleton className="h-3 w-16" /></div>)}</div><div className="border border-[var(--border)] rounded-xl p-5 space-y-4"><Skeleton className="h-4 w-40" /><Skeleton className="h-44 w-full" /></div></div>;
  if (view === "empty") return <div className="flex-1 flex items-center justify-center p-12"><div className="text-center max-w-xs"><div className="h-12 w-12 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.activity} size={20} /></div><div className="text-[15px] font-semibold text-[var(--foreground)] mb-1 tracking-tight">No business activity yet</div><div className="text-[13px] text-[var(--muted-foreground)] mb-5">Start by adding products and recording your first sale.</div><div className="flex gap-2 justify-center"><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />}>Add Product</Btn><Btn variant="secondary" size="sm" onClick={() => onNavigate("pos")}>New Sale</Btn></div></div></div>;
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <div className="flex items-center gap-2 p-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[11px] text-[var(--muted-foreground)] w-fit">
          {(["populated","loading","empty"] as DashView[]).map(v => <button key={v} onClick={() => setView(v)} className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${view === v ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm" : "hover:text-[var(--foreground)]"}`}>{v}</button>)}
          <span className="pl-1 opacity-50">state preview</span>
        </div>
        <div className="flex items-start justify-between">
          <div><h1 className="text-[22px] font-semibold tracking-tight text-[var(--foreground)] leading-tight">Good morning, {businessName}.</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Here&apos;s what&apos;s happening across your business today — <span className="text-[var(--foreground)]">Thursday, 4 September 2026</span></p></div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors"><Icon d={icons.mapPin} size={12} /><span>Main Store</span><Icon d={icons.chevronDown} size={12} /></div>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />}>Add Product</Btn>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.zap} size={13} />} onClick={() => onNavigate("pos")}>New Sale</Btn>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[{ label: "Today's Sales", value: "৳ 2,84,500", change: "12.4%", pos: true }, { label: "Today's Orders", value: "47", change: "3.1%", pos: true }, { label: "Gross Profit", value: "৳ 62,800", change: "8.6%", pos: true }, { label: "Outstanding Dues", value: "৳ 6,12,300", change: "4.2%", pos: false }].map(c => (
            <div key={c.label} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="text-[10px] font-semibold tracking-widest text-[var(--muted-foreground)] uppercase mb-3">{c.label}</div>
              <div className="text-[26px] font-semibold tracking-tight text-[var(--foreground)] leading-none mb-2">{c.value}</div>
              <div className={`flex items-center gap-1 text-[12px] font-medium ${c.pos ? "text-[var(--success)]" : "text-[var(--error)]"}`}><Icon d={c.pos ? icons.arrowUp : icons.arrowDown} size={12} />{c.change} vs last month</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[{ label: "Products in stock", value: "1,248" }, { label: "Low stock", value: "18", warn: true }, { label: "Out of stock", value: "7", err: true }, { label: "Pending orders", value: "12" }, { label: "Pending deliveries", value: "8" }].map(s => (
            <div key={s.label} className="flex items-center justify-between border border-[var(--border)] rounded-lg px-4 py-3">
              <span className="text-[12px] text-[var(--muted-foreground)]">{s.label}</span>
              <span className={`text-[15px] font-semibold ml-2 ${s.err ? "text-[var(--error)]" : s.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{s.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-widest text-[var(--muted-foreground)] uppercase mr-1">Quick actions</span>
          {[{ label: "New Sale", icon: icons.zap, nav: "pos" }, { label: "Add Product", icon: icons.plus }, { label: "Create Purchase", icon: icons.purchases }, { label: "Add Customer", icon: icons.customers }].map(a => (
            <Btn key={a.label} variant="tertiary" size="sm" iconLeft={<Icon d={a.icon} size={12} />} onClick={() => a.nav ? onNavigate(a.nav) : undefined}>{a.label}</Btn>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Sales performance</h2><div className="text-[12px] text-[var(--muted-foreground)]">Revenue overview</div></div>
              <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] rounded-lg border border-[var(--border)]">
                {periods.map(p => <button key={p} onClick={() => setPeriod(p)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${period === p ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm border border-[var(--border)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{p}</button>)}
              </div>
            </div>
            <SalesChart period={period} />
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-4"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Financial snapshot</h2><span className="text-[11px] text-[var(--muted-foreground)]">Today</span></div>
            <div className="space-y-0">
              {[{ label: "Revenue", value: "৳ 2,84,500", cls: "text-[var(--foreground)]" }, { label: "Expenses", value: "৳ 48,200", cls: "text-[var(--error)]" }, { label: "Gross profit", value: "৳ 62,800", cls: "text-[var(--foreground)]" }, { label: "Customer dues", value: "৳ 3,41,200", cls: "text-[var(--warning)]" }, { label: "Supplier dues", value: "৳ 2,71,100", cls: "text-[var(--warning)]" }].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-b-0"><span className="text-[13px] text-[var(--muted-foreground)]">{item.label}</span><span className={`text-[13px] font-semibold ${item.cls}`}>{item.value}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Top selling products</h2><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1" onClick={() => onNavigate("sales")}>View all <Icon d={icons.arrowRight} size={11} /></button></div>
            <div className="divide-y divide-[var(--border)]">{topProducts.map((p, i) => <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--secondary)] transition-colors"><span className="text-[11px] font-mono text-[var(--muted-foreground)] w-4 shrink-0">{i + 1}</span><div className="flex-1 min-w-0"><div className="text-[12px] font-medium text-[var(--foreground)] truncate">{p.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.category} · {p.units} units</div></div><div className="text-[12px] font-semibold text-[var(--foreground)] shrink-0">{p.revenue}</div></div>)}</div>
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Recent sales</h2><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1" onClick={() => onNavigate("sales")}>View all <Icon d={icons.arrowRight} size={11} /></button></div>
            <div className="divide-y divide-[var(--border)]">{recentSalesDash.map((s, i) => <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--secondary)] transition-colors"><div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="font-mono text-[11px] text-[var(--foreground)]">{s.invoice}</span><Badge variant={orderBadge[s.status].v} dot>{orderBadge[s.status].l}</Badge></div><div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{s.customer} · {s.payment}</div></div><div className="text-right shrink-0"><div className="text-[12px] font-semibold text-[var(--foreground)]">{s.amount}</div><div className="text-[10px] text-[var(--muted-foreground)]">{s.time}</div></div></div>)}</div>
          </div>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Online orders</h2><Badge variant="info" dot>{onlineOrders.length} new</Badge></div>
              <div className="divide-y divide-[var(--border)]">{onlineOrders.map((o, i) => <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--secondary)] transition-colors"><div className="flex-1 min-w-0"><div className="flex items-center justify-between gap-2"><span className="font-mono text-[11px] text-[var(--foreground)]">{o.id}</span><Badge variant={orderBadge[o.status].v}>{orderBadge[o.status].l}</Badge></div><div className="text-[11px] text-[var(--muted-foreground)] mt-0.5 truncate">{o.customer} · {o.payment}</div></div><div className="text-[12px] font-semibold text-[var(--foreground)] shrink-0">{o.amount}</div></div>)}</div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Inventory alerts</h2><Badge variant="warning" dot>{invAlerts.length} items</Badge></div>
              <div className="divide-y divide-[var(--border)]">{invAlerts.map((a, i) => <div key={i} className="flex items-center justify-between px-5 py-2.5 hover:bg-[var(--secondary)] transition-colors"><div className="flex-1 min-w-0"><div className="text-[12px] font-medium text-[var(--foreground)] truncate">{a.name}</div><div className={`text-[11px] font-medium ${a.level === "out" || a.level === "critical" ? "text-[var(--error)]" : "text-[var(--warning)]"}`}>{a.level === "out" ? "Out of stock" : `Only ${a.qty} left`}</div></div><Badge variant={a.level === "out" || a.level === "critical" ? "error" : "warning"}>{a.level === "out" ? "Out" : a.level === "critical" ? "Critical" : "Low"}</Badge></div>)}</div>
            </div>
          </div>
        </div>
        <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]"><h2 className="text-[14px] font-semibold text-[var(--foreground)] tracking-tight">Recent activity</h2></div>
          <div className="divide-y divide-[var(--border)]">{activityFeed.map((a, i) => <div key={i} className="flex items-start gap-4 px-5 py-3.5 hover:bg-[var(--secondary)] transition-colors"><div className="h-7 w-7 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0 mt-0.5"><Icon d={a.icon} size={13} /></div><div className="flex-1 min-w-0"><div className="text-[13px] font-medium text-[var(--foreground)]">{a.title}</div><div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{a.desc}</div></div><div className="text-[11px] text-[var(--muted-foreground)] shrink-0 mt-0.5">{a.time}</div></div>)}</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 04 — POS / NEW SALE
// ══════════════════════════════════════════════════════════════════════════════

const posProducts = [
  { id: 1, name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", price: 150, stock: 86, category: "Lighting" },
  { id: 2, name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", price: 4800, stock: 18, category: "Fan" },
  { id: 3, name: "Vision Table Fan 12\"", sku: "VIS-TF-12", price: 2450, stock: 24, category: "Fan" },
  { id: 4, name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", price: 380, stock: 0, category: "Lighting" },
  { id: 5, name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", price: 180, stock: 3, category: "Electrical" },
  { id: 6, name: "Electrical Holder B22", sku: "EH-B22-STD", price: 45, stock: 210, category: "Electrical" },
  { id: 7, name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", price: 620, stock: 45, category: "Cable" },
  { id: 8, name: "Butterfly Socket 3Pin", sku: "BUT-SOC-3P", price: 130, stock: 92, category: "Electrical" },
];

const quickCategories = ["LED Bulbs", "Fans", "Switches", "Sockets", "Cables", "Holders", "Tubes", "All"];

type CartItem = { id: number; name: string; sku: string; price: number; qty: number; discount: number; stock: number };
type PayMethod = "Cash" | "bKash" | "Nagad" | "Card" | "Bank" | "Due";

function POSPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [searchQ, setSearchQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", price: 150, qty: 3, discount: 0, stock: 86 },
    { id: 2, name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", price: 4800, qty: 1, discount: 200, stock: 18 },
  ]);
  const [customer, setCustomer] = useState<{ name: string; phone?: string; due?: number } | null>(null);
  const [payMethod, setPayMethod] = useState<PayMethod>("Cash");
  const [received, setReceived] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHold, setShowHold] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);

  const searchResults = searchQ.length > 1 ? posProducts.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.sku.toLowerCase().includes(searchQ.toLowerCase())) : [];

  const addToCart = (p: typeof posProducts[0]) => {
    if (p.stock === 0) return;
    setCart(prev => {
      const ex = prev.find(c => c.id === p.id);
      if (ex) return prev.map(c => c.id === p.id ? { ...c, qty: Math.min(c.qty + 1, p.stock) } : c);
      return [...prev, { id: p.id, name: p.name, sku: p.sku, price: p.price, qty: 1, discount: 0, stock: p.stock }];
    });
    setSearchQ(""); setSearchOpen(false);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, Math.min(c.qty + delta, c.stock)) } : c).filter(c => c.qty > 0));
  };
  const removeItem = (id: number) => setCart(prev => prev.filter(c => c.id !== id));

  const subtotal = cart.reduce((s, c) => s + (c.price * c.qty), 0);
  const totalDiscount = cart.reduce((s, c) => s + (c.discount * c.qty), 0);
  const grandTotal = subtotal - totalDiscount;
  const change = Math.max(0, Number(received) - grandTotal);
  const due = payMethod === "Due" ? Math.max(0, grandTotal - Number(received || 0)) : 0;

  const payMethods: PayMethod[] = ["Cash", "bKash", "Nagad", "Card", "Bank", "Due"];

  const holdSales = [
    { id: "H-1024", customer: "City Electric House", items: 4, total: 12400, time: "10:32 AM" },
    { id: "H-1023", customer: "Walk-in Customer", items: 2, total: 5200, time: "9:15 AM" },
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* POS toolbar */}
      <div className="border-b border-[var(--border)] px-5 py-3 flex items-center justify-between bg-[var(--background)] shrink-0">
        <div className="flex items-center gap-4">
          <div><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">New Sale</div><div className="text-[11px] text-[var(--muted-foreground)]">Create a counter sale</div></div>
          <div className="w-px h-8 bg-[var(--border)]" />
          <div className="flex items-center gap-3 text-[12px] text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5"><Icon d={icons.mapPin} size={12} /> Main Store</span>
            <span className="opacity-40">·</span>
            <span>Cashier: <strong className="text-[var(--foreground)]">MD. SELIM</strong></span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-[11px]">Invoice: <strong className="text-[var(--foreground)]">#SE-20484</strong></span>
            <span className="opacity-40">·</span>
            <span>4 Sep 2026, 2:14 PM</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.pause} size={13} />} onClick={() => setShowHold(true)}>Hold Sale</Btn>
          <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.receipt} size={13} />} onClick={() => setShowHold(true)}>Held ({holdSales.length})</Btn>
          <Btn variant="secondary" size="sm" onClick={() => onNavigate("sales")}>Sales History</Btn>
        </div>
      </div>

      {/* Main POS layout */}
      <div className="flex-1 overflow-hidden flex">

        {/* LEFT: Product search + quick add */}
        <div className="flex-1 flex flex-col border-r border-[var(--border)] overflow-hidden">

          {/* Search */}
          <div className="p-4 border-b border-[var(--border)] shrink-0">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"><Icon d={icons.search} size={14} /></span>
              <input
                ref={searchRef}
                value={searchQ}
                onChange={e => { setSearchQ(e.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                placeholder="Search product by name, SKU or barcode…"
                className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-9 pr-10 text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:ring-2 focus:ring-[var(--foreground)]/10 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" title="Scan barcode"><Icon d={icons.barcode} size={15} /></button>
              <kbd className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] text-[var(--muted-foreground)] font-mono border border-[var(--border)] rounded px-1 hidden md:block">F2</kbd>
            </div>

            {/* Search results dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute z-30 mt-1 left-4 right-4 max-w-[calc(100%-2rem)] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden" style={{ width: "calc(55% - 2rem)" }}>
                {searchResults.map(p => (
                  <button key={p.id} onMouseDown={() => addToCart(p)} className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--secondary)] transition-colors text-left ${p.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-[var(--foreground)] truncate">{p.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px] text-[var(--muted-foreground)]">{p.sku}</span>
                        <span className="opacity-40">·</span>
                        <span className={`text-[11px] font-medium ${p.stock === 0 ? "text-[var(--error)]" : p.stock <= 5 ? "text-[var(--warning)]" : "text-[var(--muted-foreground)]"}`}>
                          {p.stock === 0 ? "Out of stock" : p.stock <= 5 ? `Low stock — ${p.stock} left` : `Stock: ${p.stock}`}
                        </span>
                      </div>
                    </div>
                    <div className="text-[14px] font-semibold text-[var(--foreground)] shrink-0">{fmt(p.price)}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick categories */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border)] overflow-x-auto shrink-0">
            {quickCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-[var(--foreground)] text-[var(--background)]" : "border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{cat}</button>
            ))}
          </div>

          {/* Product grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {posProducts.filter(p => activeCategory === "All" || p.category === activeCategory || (activeCategory === "LED Bulbs" && p.category === "Lighting")).map(p => (
                <button key={p.id} onClick={() => addToCart(p)} disabled={p.stock === 0} className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-150 ${p.stock === 0 ? "opacity-40 cursor-not-allowed border-[var(--border)]" : "border-[var(--border)] hover:border-[var(--foreground)]/30 hover:bg-[var(--secondary)] active:scale-[0.98]"}`}>
                  <div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mb-3 text-[var(--muted-foreground)]">
                    <Icon d={p.category === "Fan" ? icons.activity : p.category === "Lighting" ? icons.zap : icons.package} size={15} />
                  </div>
                  <div className="text-[13px] font-medium text-[var(--foreground)] leading-snug mb-1">{p.name}</div>
                  <div className="font-mono text-[10px] text-[var(--muted-foreground)] mb-2">{p.sku}</div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[13px] font-semibold text-[var(--foreground)]">{fmt(p.price)}</span>
                    <span className={`text-[10px] font-medium ${p.stock === 0 ? "text-[var(--error)]" : p.stock <= 5 ? "text-[var(--warning)]" : "text-[var(--muted-foreground)]"}`}>
                      {p.stock === 0 ? "Out" : p.stock <= 5 ? `${p.stock} left` : `${p.stock} in stock`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Cart + Summary + Payment */}
        <div className="w-[400px] xl:w-[420px] flex flex-col bg-[var(--background)] shrink-0 overflow-hidden">

          {/* Customer */}
          <div className="px-4 py-3 border-b border-[var(--border)] shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Customer <kbd className="text-[9px] border border-[var(--border)] rounded px-1 font-mono ml-1">F4</kbd></div>
                {customer ? (
                  <div><div className="text-[13px] font-medium text-[var(--foreground)]">{customer.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{customer.phone}{customer.due ? <span className="text-[var(--warning)] ml-2">Due: {fmt(customer.due)}</span> : null}</div></div>
                ) : (
                  <div className="text-[13px] text-[var(--muted-foreground)]">Walk-in Customer</div>
                )}
              </div>
              <div className="flex gap-1.5">
                <Btn variant="secondary" size="sm" onClick={() => setCustomer({ name: "Rahim Electronics", phone: "01712 345678", due: 12300 })}>Change</Btn>
                {customer && <Btn variant="ghost" size="sm" onClick={() => setCustomer(null)}><Icon d={icons.x} size={12} /></Btn>}
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="h-12 w-12 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mb-4 text-[var(--muted-foreground)]"><Icon d={icons.shoppingCart} size={20} /></div>
                <div className="text-[14px] font-medium text-[var(--foreground)] mb-1">No products added</div>
                <div className="text-[12px] text-[var(--muted-foreground)]">Search for a product or scan a barcode to start a sale.</div>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {cart.map(item => (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-[var(--foreground)] truncate">{item.name}</div>
                        <div className="font-mono text-[10px] text-[var(--muted-foreground)]">{item.sku}</div>
                        {item.stock <= 5 && item.stock > 0 && <div className="text-[10px] text-[var(--warning)] font-medium mt-0.5">Only {item.stock} units available</div>}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[var(--muted-foreground)] hover:text-[var(--error)] transition-colors mt-0.5 shrink-0"><Icon d={icons.trash} size={13} /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0 border border-[var(--border)] rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.id, -1)} className="h-7 w-7 flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors"><Icon d={icons.minus} size={12} /></button>
                        <input type="number" value={item.qty} onChange={e => setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: Math.max(1, Math.min(Number(e.target.value) || 1, c.stock)) } : c))} className="w-10 h-7 text-center text-[13px] font-medium text-[var(--foreground)] bg-transparent outline-none border-x border-[var(--border)]" />
                        <button onClick={() => updateQty(item.id, 1)} className="h-7 w-7 flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors"><Icon d={icons.plus} size={12} /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-[12px] text-[var(--muted-foreground)]">{fmt(item.price)} × {item.qty}</div>
                        <div className="text-[13px] font-semibold text-[var(--foreground)] w-20 text-right">{fmt(item.price * item.qty - item.discount * item.qty)}</div>
                      </div>
                    </div>
                    {item.discount > 0 && <div className="text-[10px] text-[var(--success)] mt-1">Discount: −{fmt(item.discount)} per unit</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary + Payment */}
          <div className="border-t border-[var(--border)] shrink-0">
            {/* Totals */}
            <div className="px-4 py-3 space-y-1 border-b border-[var(--border)]">
              <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Subtotal</span><span className="text-[var(--foreground)]">{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(totalDiscount)}</span></div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)] mt-1">
                <span className="text-[15px] font-bold text-[var(--foreground)]">Total</span>
                <span className="text-[18px] font-bold text-[var(--foreground)]">{fmt(grandTotal)}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Payment <kbd className="text-[9px] border border-[var(--border)] rounded px-1 font-mono ml-1">F8</kbd></div>
              <div className="flex flex-wrap gap-1.5">
                {payMethods.map(m => (
                  <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>
                ))}
              </div>
            </div>

            {/* Cash/Due fields */}
            {payMethod === "Cash" && (
              <div className="px-4 py-3 border-b border-[var(--border)] space-y-2">
                <Input label="Amount received" type="number" placeholder={String(grandTotal)} value={received} onChange={e => setReceived(e.target.value)} />
                {Number(received) >= grandTotal && Number(received) > 0 && (
                  <div className="flex justify-between bg-[var(--secondary)] rounded-lg px-3 py-2">
                    <span className="text-[12px] text-[var(--muted-foreground)]">Change</span>
                    <span className="text-[14px] font-bold text-[var(--foreground)]">{fmt(change)}</span>
                  </div>
                )}
              </div>
            )}
            {payMethod === "Due" && (
              <div className="px-4 py-3 border-b border-[var(--border)] space-y-2">
                <Input label="Paid now" type="number" placeholder="0" value={received} onChange={e => setReceived(e.target.value)} />
                <div className="flex justify-between bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-lg px-3 py-2">
                  <span className="text-[12px] text-[var(--warning)]">Remaining due</span>
                  <span className="text-[14px] font-bold text-[var(--warning)]">{fmt(due)}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-4 space-y-2">
              <Btn variant="primary" className="w-full !h-11 text-[14px]" iconLeft={<Icon d={icons.check} size={15} />} onClick={() => setShowSuccess(true)} disabled={cart.length === 0}>
                Complete Sale <kbd className="text-[11px] border border-[var(--background)]/30 rounded px-1.5 font-mono ml-1 opacity-70">Enter</kbd>
              </Btn>
              <div className="flex gap-2">
                <Btn variant="secondary" size="sm" className="flex-1" iconLeft={<Icon d={icons.trash} size={12} />} onClick={() => setCart([])}>Clear Cart</Btn>
                <Btn variant="secondary" size="sm" className="flex-1" iconLeft={<Icon d={icons.pause} size={12} />} onClick={() => setShowHold(true)}>Hold Sale</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sale success modal */}
      <Modal open={showSuccess} onClose={() => { setShowSuccess(false); setCart([]); setReceived(""); }} title="Sale completed" size="sm">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-4"><Icon d={icons.checkCircle} size={22} /></div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Invoice</div>
          <div className="text-[20px] font-bold text-[var(--foreground)] mb-4 font-mono">#SE-20484</div>
          <div className="space-y-2 text-left bg-[var(--secondary)] rounded-xl p-4 mb-5">
            <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Total</span><span className="font-semibold text-[var(--foreground)]">{fmt(grandTotal)}</span></div>
            <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Payment</span><span className="text-[var(--foreground)]">{payMethod}</span></div>
            {payMethod === "Cash" && Number(received) > 0 && <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Change</span><span className="text-[var(--foreground)]">{fmt(change)}</span></div>}
            {payMethod === "Due" && <div className="flex justify-between text-[13px]"><span className="text-[var(--warning)]">Due remaining</span><span className="text-[var(--warning)] font-semibold">{fmt(due)}</span></div>}
          </div>
          <div className="flex gap-2">
            <Btn variant="secondary" size="sm" className="flex-1" iconLeft={<Icon d={icons.printer} size={13} />}>Print</Btn>
            <Btn variant="secondary" size="sm" className="flex-1" iconLeft={<Icon d={icons.send} size={13} />}>Send</Btn>
            <Btn variant="primary" size="sm" className="flex-1" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => { setShowSuccess(false); setCart([]); setReceived(""); }}>New Sale</Btn>
          </div>
        </div>
      </Modal>

      {/* Hold sales modal */}
      <Modal open={showHold} onClose={() => setShowHold(false)} title="Held sales" size="sm">
        <div className="space-y-2 mb-4">
          {holdSales.map(h => (
            <div key={h.id} className="flex items-center gap-3 border border-[var(--border)] rounded-xl p-3">
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-[var(--foreground)] font-mono">#{h.id}</div>
                <div className="text-[12px] text-[var(--muted-foreground)]">{h.customer} · {h.items} items · {h.time}</div>
                <div className="text-[13px] font-semibold text-[var(--foreground)] mt-1">{fmt(h.total)}</div>
              </div>
              <div className="flex flex-col gap-1">
                <Btn variant="primary" size="sm" onClick={() => setShowHold(false)}>Resume</Btn>
                <Btn variant="ghost" size="sm"><Icon d={icons.trash} size={13} /></Btn>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="pt-3 border-t border-[var(--border)]">
            <div className="text-[12px] text-[var(--muted-foreground)] mb-2">Hold current sale ({cart.length} items · {fmt(grandTotal)})?</div>
            <Btn variant="secondary" size="sm" className="w-full" onClick={() => { setShowHold(false); setCart([]); }}>Hold and clear</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 05 — SALES MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type SaleStatus = "paid" | "partial" | "due" | "returned" | "refunded" | "cancelled";
interface Sale {
  id: string; customer: string; phone?: string; address?: string; customerDue?: number;
  items: { name: string; sku: string; qty: number; price: number; discount: number }[];
  payment: string; cashier: string; date: string; time: string;
  status: SaleStatus; paid: number; grandTotal: number;
}

const salesStatusBadge: Record<SaleStatus, { v: BadgeVariant; l: string }> = {
  paid: { v: "success", l: "Paid" }, partial: { v: "partial", l: "Partially Paid" }, due: { v: "error", l: "Due" },
  returned: { v: "muted", l: "Returned" }, refunded: { v: "info", l: "Refunded" }, cancelled: { v: "muted", l: "Cancelled" },
};

const allSales: Sale[] = [
  { id: "#SE-20483", customer: "Walk-in Customer", items: [{ name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 3, price: 150, discount: 0 }, { name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 1, price: 4800, discount: 200 }, { name: "Electrical Holder B22", sku: "EH-B22-STD", qty: 6, price: 45, discount: 0 }], payment: "Cash", cashier: "MD. SELIM", date: "4 Sep 2026", time: "11:42 AM", status: "paid", paid: 5320, grandTotal: 5320 },
  { id: "#SE-20482", customer: "Rahim Electronics", phone: "01712 345678", address: "123 Mirpur Road, Dhaka", customerDue: 12300, items: [{ name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", qty: 5, price: 380, discount: 50 }, { name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", qty: 10, price: 180, discount: 0 }, { name: "Butterfly Socket 3Pin", sku: "BUT-SOC-3P", qty: 8, price: 130, discount: 0 }, { name: "Electrical Holder B22", sku: "EH-B22-STD", qty: 20, price: 45, discount: 5 }, { name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", qty: 2, price: 620, discount: 0 }], payment: "bKash", cashier: "Mahbub", date: "4 Sep 2026", time: "10:58 AM", status: "paid", paid: 5990, grandTotal: 5990 },
  { id: "#SE-20481", customer: "City Electric House", phone: "01811 234567", address: "45 Banani, Dhaka", items: [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 4, price: 4800, discount: 200 }, { name: "Vision Table Fan 12\"", sku: "VIS-TF-12", qty: 2, price: 2450, discount: 100 }, { name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 12, price: 150, discount: 10 }], payment: "Due", cashier: "MD. SELIM", date: "4 Sep 2026", time: "9:45 AM", status: "partial", paid: 20000, grandTotal: 28500 },
  { id: "#SE-20480", customer: "MD. Karim", items: [{ name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 6, price: 150, discount: 0 }, { name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", qty: 2, price: 180, discount: 0 }], payment: "Cash", cashier: "Mahbub", date: "4 Sep 2026", time: "9:12 AM", status: "paid", paid: 1260, grandTotal: 1260 },
  { id: "#SE-20479", customer: "Noor Lighting", phone: "01613 456789", items: [{ name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", qty: 8, price: 380, discount: 30 }, { name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", qty: 3, price: 620, discount: 0 }], payment: "Nagad", cashier: "MD. SELIM", date: "3 Sep 2026", time: "5:30 PM", status: "paid", paid: 4700, grandTotal: 4700 },
  { id: "#SE-20478", customer: "Walk-in Customer", items: [{ name: "Vision Table Fan 12\"", sku: "VIS-TF-12", qty: 1, price: 2450, discount: 0 }], payment: "Card", cashier: "Mahbub", date: "3 Sep 2026", time: "4:15 PM", status: "returned", paid: 2450, grandTotal: 2450 },
];

type SalesView = "list" | "detail" | "invoice" | "return" | "payment";

function SalesPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<SalesView>("list");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState("Today");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [returnQtys, setReturnQtys] = useState<Record<string, number>>({});
  const [returnReason, setReturnReason] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Cash");

  const filtered = allSales.filter(s => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || s.id.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q) || s.phone?.includes(q) || s.items.some(i => i.name.toLowerCase().includes(q));
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchQ && matchStatus;
  });

  const openDetail = (sale: Sale) => { setSelectedSale(sale); setView("detail"); };

  const saleCalc = (s: Sale) => {
    const sub = s.items.reduce((acc, i) => acc + i.price * i.qty, 0);
    const disc = s.items.reduce((acc, i) => acc + i.discount * i.qty, 0);
    return { sub, disc, grand: sub - disc };
  };

  if (view === "invoice" && selectedSale) {
    const c = saleCalc(selectedSale);
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[680px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("detail")}>Back to sale</Btn>
            <div className="flex-1" />
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.printer} size={13} />}>Print</Btn>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.send} size={13} />}>Send</Btn>
          </div>
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-md)]">
            <div className="px-10 py-8 border-b border-[var(--border)]">
              <div className="flex items-start justify-between">
                <div><div className="text-[16px] font-bold tracking-[0.08em] text-[var(--foreground)]">SELIM ELECTRONICS</div><div className="text-[11px] text-[var(--muted-foreground)] mt-1">Main Store · Mirpur, Dhaka, Bangladesh</div><div className="text-[11px] text-[var(--muted-foreground)]">+880 1712 000000 · selimelectronics@email.com</div></div>
                <div className="text-right"><div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Invoice</div><div className="text-[22px] font-bold font-mono text-[var(--foreground)] mt-1">{selectedSale.id}</div></div>
              </div>
            </div>
            <div className="px-10 py-6 border-b border-[var(--border)] grid grid-cols-2 gap-6">
              <div><div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Bill to</div><div className="text-[13px] font-medium text-[var(--foreground)]">{selectedSale.customer}</div>{selectedSale.phone && <div className="text-[12px] text-[var(--muted-foreground)]">{selectedSale.phone}</div>}{selectedSale.address && <div className="text-[12px] text-[var(--muted-foreground)]">{selectedSale.address}</div>}</div>
              <div className="text-right"><div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Details</div><div className="text-[12px] text-[var(--muted-foreground)]">Date: <span className="text-[var(--foreground)]">{selectedSale.date}</span></div><div className="text-[12px] text-[var(--muted-foreground)]">Time: <span className="text-[var(--foreground)]">{selectedSale.time}</span></div><div className="text-[12px] text-[var(--muted-foreground)]">Cashier: <span className="text-[var(--foreground)]">{selectedSale.cashier}</span></div></div>
            </div>
            <div className="px-10 py-6 border-b border-[var(--border)]">
              <table className="w-full text-[13px]">
                <thead><tr className="border-b border-[var(--border)]"><th className="text-left py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Product</th><th className="text-center py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Qty</th><th className="text-right py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Unit Price</th><th className="text-right py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Discount</th><th className="text-right py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Total</th></tr></thead>
                <tbody>{selectedSale.items.map((item, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0"><td className="py-3"><div className="font-medium text-[var(--foreground)]">{item.name}</div><div className="font-mono text-[10px] text-[var(--muted-foreground)]">{item.sku}</div></td><td className="py-3 text-center text-[var(--muted-foreground)]">{item.qty}</td><td className="py-3 text-right text-[var(--foreground)]">{fmt(item.price)}</td><td className="py-3 text-right text-[var(--success)]">{item.discount > 0 ? `−${fmt(item.discount)}` : "—"}</td><td className="py-3 text-right font-semibold text-[var(--foreground)]">{fmt(item.price * item.qty - item.discount * item.qty)}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="px-10 py-6 border-b border-[var(--border)]">
              <div className="flex justify-end"><div className="w-60 space-y-1.5">
                <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{fmt(c.sub)}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(c.disc)}</span></div>
                <div className="flex justify-between text-[15px] font-bold border-t border-[var(--border)] pt-2 mt-2"><span>Grand Total</span><span>{fmt(c.grand)}</span></div>
                <div className="flex justify-between text-[13px] pt-1"><span className="text-[var(--muted-foreground)]">Paid</span><span className="text-[var(--success)]">{fmt(selectedSale.paid)}</span></div>
                {selectedSale.grandTotal - selectedSale.paid > 0 && <div className="flex justify-between text-[13px]"><span className="text-[var(--warning)]">Due</span><span className="text-[var(--warning)] font-semibold">{fmt(selectedSale.grandTotal - selectedSale.paid)}</span></div>}
              </div></div>
            </div>
            <div className="px-10 py-5 text-center"><div className="text-[12px] text-[var(--muted-foreground)]">Thank you for shopping with Selim Electronics.</div></div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "detail" && selectedSale) {
    const c = saleCalc(selectedSale);
    const dueAmount = c.grand - selectedSale.paid;
    const payments = selectedSale.payment === "Due"
      ? [{ method: "Due", amount: selectedSale.paid, time: `${selectedSale.date} · ${selectedSale.time}` }]
      : [{ method: selectedSale.payment, amount: selectedSale.paid, time: `${selectedSale.date} · ${selectedSale.time}` }];
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Sales</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-medium text-[var(--foreground)] font-mono">{selectedSale.id}</span>
            <Badge variant={salesStatusBadge[selectedSale.status].v} dot>{salesStatusBadge[selectedSale.status].l}</Badge>
            <div className="flex-1" />
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.eye} size={13} />} onClick={() => setView("invoice")}>Invoice</Btn>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.printer} size={13} />}>Print</Btn>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.rotateCcw} size={13} />} onClick={() => setShowReturnModal(true)}>Return</Btn>
            {dueAmount > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => setShowPaymentModal(true)}>Record payment</Btn>}
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Sale info */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Sale information</div>
                <div className="grid grid-cols-3 gap-4 text-[13px]">
                  {[{ label: "Invoice", value: selectedSale.id, mono: true }, { label: "Date", value: selectedSale.date }, { label: "Time", value: selectedSale.time }, { label: "Cashier", value: selectedSale.cashier }, { label: "Store", value: "Main Store" }, { label: "Payment", value: selectedSale.payment }].map(f => (
                    <div key={f.label}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className={`font-medium text-[var(--foreground)] ${f.mono ? "font-mono" : ""}`}>{f.value}</div></div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Sale items</div></div>
                <table className="w-full text-[13px]">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]"><th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Product</th><th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Qty</th><th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Unit Price</th><th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Discount</th><th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Total</th></tr></thead>
                  <tbody>{selectedSale.items.map((item, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-5 py-3"><div className="font-medium text-[var(--foreground)]">{item.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{item.sku}</div></td><td className="px-4 py-3 text-center text-[var(--foreground)]">{item.qty}</td><td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(item.price)}</td><td className="px-4 py-3 text-right text-[var(--success)]">{item.discount > 0 ? `−${fmt(item.discount)}` : "—"}</td><td className="px-5 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(item.price * item.qty - item.discount * item.qty)}</td></tr>)}</tbody>
                </table>
                <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--secondary)]">
                  <div className="flex justify-end"><div className="w-56 space-y-1.5 text-[13px]">
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{fmt(c.sub)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(c.disc)}</span></div>
                    <div className="flex justify-between text-[15px] font-bold border-t border-[var(--border)] pt-2"><span>Grand Total</span><span>{fmt(c.grand)}</span></div>
                  </div></div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Totals */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment summary</div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Grand Total</span><span className="font-bold text-[var(--foreground)]">{fmt(c.grand)}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Paid</span><span className="text-[var(--success)] font-semibold">{fmt(selectedSale.paid)}</span></div>
                  {dueAmount > 0 && <div className="flex justify-between border-t border-[var(--border)] pt-2"><span className="text-[var(--warning)]">Due remaining</span><span className="text-[var(--warning)] font-bold">{fmt(dueAmount)}</span></div>}
                </div>
                {dueAmount > 0 && <Btn variant="primary" size="sm" className="w-full mt-3" onClick={() => setShowPaymentModal(true)}>Record payment</Btn>}
              </div>

              {/* Payment history */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment history</div>
                <div className="space-y-2">
                  {payments.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-b-0">
                      <div><div className="text-[13px] font-medium text-[var(--foreground)]">{p.method}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.time}</div></div>
                      <div className="text-[13px] font-semibold text-[var(--foreground)]">{fmt(p.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Customer</div>
                <div className="text-[13px] font-medium text-[var(--foreground)]">{selectedSale.customer}</div>
                {selectedSale.phone && <div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{selectedSale.phone}</div>}
                {selectedSale.address && <div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{selectedSale.address}</div>}
                {selectedSale.customerDue && <div className="mt-2 text-[12px] font-medium text-[var(--warning)]">Outstanding due: {fmt(selectedSale.customerDue)}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Return modal */}
        <Modal open={showReturnModal} onClose={() => setShowReturnModal(false)} title="Return items" size="md">
          <div className="space-y-3 mb-4">
            {selectedSale.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 border border-[var(--border)] rounded-lg p-3">
                <div className="flex-1 min-w-0"><div className="text-[13px] font-medium text-[var(--foreground)]">{item.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">Purchased: {item.qty}</div></div>
                <div className="flex items-center gap-2 text-[12px] text-[var(--muted-foreground)]">Return:
                  <div className="flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                    <button onClick={() => setReturnQtys(p => ({ ...p, [item.sku]: Math.max(0, (p[item.sku] || 0) - 1) }))} className="h-7 w-7 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"><Icon d={icons.minus} size={11} /></button>
                    <span className="w-8 text-center text-[13px] font-medium text-[var(--foreground)]">{returnQtys[item.sku] || 0}</span>
                    <button onClick={() => setReturnQtys(p => ({ ...p, [item.sku]: Math.min(item.qty, (p[item.sku] || 0) + 1) }))} className="h-7 w-7 flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"><Icon d={icons.plus} size={11} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Return reason</div>
            <div className="flex flex-wrap gap-2">{["Damaged", "Customer request", "Wrong item", "Other"].map(r => <button key={r} onClick={() => setReturnReason(r)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${returnReason === r ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{r}</button>)}</div>
          </div>
          <div className="bg-[var(--secondary)] rounded-lg p-3 mb-4">
            <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Return value</span><span className="font-semibold text-[var(--foreground)]">{fmt(selectedSale.items.reduce((s, i) => s + (i.price - i.discount) * (returnQtys[i.sku] || 0), 0))}</span></div>
          </div>
          <div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Refund method</div>
          <div className="flex flex-wrap gap-2 mb-4">{["Original payment", "Cash", "bKash", "Nagad"].map(m => <button key={m} className="px-3 py-1.5 rounded-lg text-[12px] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all">{m}</button>)}</div>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setShowReturnModal(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setShowReturnModal(false)}>Confirm return</Btn></div>
        </Modal>

        {/* Record payment modal */}
        <Modal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Record payment" size="sm">
          <div className="bg-[var(--secondary)] rounded-lg p-3 mb-4 space-y-1.5 text-[13px]">
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Invoice total</span><span className="font-semibold">{fmt(c.grand)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Paid</span><span className="text-[var(--success)] font-semibold">{fmt(selectedSale.paid)}</span></div>
            <div className="flex justify-between border-t border-[var(--border)] pt-1.5"><span className="text-[var(--warning)]">Remaining due</span><span className="text-[var(--warning)] font-bold">{fmt(dueAmount)}</span></div>
          </div>
          <div className="space-y-3">
            <Input label="Amount" type="number" placeholder={String(dueAmount)} value={payAmount} onChange={e => setPayAmount(e.target.value)} />
            <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-2">{["Cash", "bKash", "Nagad", "Card", "Bank"].map(m => <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
          </div>
          <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setShowPaymentModal(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setShowPaymentModal(false)}>Record payment</Btn></div>
        </Modal>
      </div>
    );
  }

  // Sales list view
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div><h1 className="text-[20px] font-semibold tracking-tight text-[var(--foreground)]">Sales</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">View and manage completed sales.</p></div>
          <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.zap} size={13} />} onClick={() => onNavigate("pos")}>New Sale</Btn>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {[{ label: "Today's Sales", value: "৳ 2,84,500" }, { label: "Transactions", value: "47" }, { label: "Paid", value: "৳ 2,56,000" }, { label: "Due", value: "৳ 28,500" }].map(c => (
            <div key={c.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{c.label}</div>
              <div className="text-[22px] font-semibold text-[var(--foreground)] tracking-tight">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search invoice, customer, product…" iconLeft={<Icon d={icons.search} size={13} />} className="w-64" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["Today", "Yesterday", "7 days", "30 days"].map(d => <button key={d} onClick={() => setFilterDate(d)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${filterDate === d ? "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{d}</button>)}
          </div>
          <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors">
            Status <Icon d={icons.chevronDown} size={12} />
          </div>
          <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors">
            Payment <Icon d={icons.chevronDown} size={12} />
          </div>
          <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors">
            Cashier <Icon d={icons.chevronDown} size={12} />
          </div>
          <div className="flex-1" />
          <div className="text-[12px] text-[var(--muted-foreground)]">
            <strong className="text-[var(--foreground)]">{filtered.length} sales</strong>
            {(searchQ || filterDate !== "Today") && <span> · Filtered: {[filterDate, searchQ].filter(Boolean).join(" · ")}</span>}
          </div>
          {searchQ && <button onClick={() => setSearchQ("")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"><Icon d={icons.x} size={12} />Clear</button>}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.receipt} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No sales found</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Try changing your filters or create a new sale.</div>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.zap} size={13} />} onClick={() => onNavigate("pos")}>New Sale</Btn>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="w-9 px-4 py-3"><Checkbox checked={selectedRows.length === filtered.length} onChange={() => setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(s => s.id))} /></th>
                  {["Invoice", "Customer", "Items", "Total", "Paid", "Due", "Payment", "Cashier", "Time", "Status", ""].map(h => (
                    <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Total" || h === "Paid" || h === "Due" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const c = saleCalc(s);
                  const dueAmt = c.grand - s.paid;
                  return (
                    <tr key={s.id} onClick={() => openDetail(s)} className={`border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors ${i % 2 === 0 ? "" : ""}`}>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}><Checkbox checked={selectedRows.includes(s.id)} onChange={() => setSelectedRows(p => p.includes(s.id) ? p.filter(x => x !== s.id) : [...p, s.id])} /></td>
                      <td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)] whitespace-nowrap">{s.id}</td>
                      <td className="px-4 py-3"><div className="text-[var(--foreground)] font-medium truncate max-w-[140px]">{s.customer}</div>{s.phone && <div className="text-[11px] text-[var(--muted-foreground)]">{s.phone}</div>}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.items.length} items</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(c.grand)}</td>
                      <td className="px-4 py-3 text-right text-[var(--success)]">{fmt(s.paid)}</td>
                      <td className="px-4 py-3 text-right">{dueAmt > 0 ? <span className="text-[var(--warning)] font-medium">{fmt(dueAmt)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.payment}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.cashier}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{s.time}</td>
                      <td className="px-4 py-3"><Badge variant={salesStatusBadge[s.status].v} dot>{salesStatusBadge[s.status].l}</Badge></td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">
              <span className="text-[12px] text-[var(--muted-foreground)]">Showing {filtered.length} of 47 sales today</span>
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-colors disabled:opacity-40" disabled><Icon d={icons.chevronLeft} size={13} /></button>
                {[1, 2, 3].map(p => <button key={p} className={`h-7 min-w-7 px-2 flex items-center justify-center rounded-md text-[12px] transition-colors ${p === 1 ? "bg-[var(--foreground)] text-[var(--background)]" : "border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]"}`}>{p}</button>)}
                <span className="text-[12px] text-[var(--muted-foreground)] px-1">…</span>
                <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-colors"><Icon d={icons.chevronRight} size={13} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════
function SelectField({ label, value, onChange, options }: { label?: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[12px] font-medium text-[var(--foreground)]">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)] transition-all">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div><h1 className="text-[20px] font-semibold tracking-tight text-[var(--foreground)]">{title}</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">{subtitle}</p></div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}

function KpiRow({ cards }: { cards: { label: string; value: string; sub?: string; warn?: boolean; err?: boolean }[] }) {
  return (
    <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cards.length}, minmax(0,1fr))` }}>
      {cards.map(c => (
        <div key={c.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{c.label}</div>
          <div className={`text-[22px] font-semibold tracking-tight ${c.err ? "text-[var(--error)]" : c.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{c.value}</div>
          {c.sub && <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{c.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function FilterBar({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 flex-wrap">{children}</div>;
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${active ? "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{label}</button>;
}

function DropFilter({ label }: { label: string }) {
  return <div className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors">{label} <Icon d={icons.chevronDown} size={12} /></div>;
}

function TableWrap({ head, children, footer }: { head: { label: string; right?: boolean }[]; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden">
      <table className="w-full text-[13px]">
        <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
          {head.map(h => <th key={h.label} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h.right ? "text-right" : "text-left"}`}>{h.label}</th>)}
        </tr></thead>
        <tbody>{children}</tbody>
      </table>
      {footer && <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">{footer}</div>}
    </div>
  );
}

function Pagination({ total, current = 1 }: { total: number; current?: number }) {
  return (
    <div className="flex items-center gap-1">
      <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] disabled:opacity-40" disabled={current === 1}><Icon d={icons.chevronLeft} size={13} /></button>
      {[1, 2, 3].map(p => <button key={p} className={`h-7 min-w-7 px-2 flex items-center justify-center rounded-md text-[12px] transition-colors ${p === current ? "bg-[var(--foreground)] text-[var(--background)]" : "border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]"}`}>{p}</button>)}
      <span className="text-[12px] text-[var(--muted-foreground)] px-1">…</span>
      <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={13} /></button>
    </div>
  );
}

function PaymentModal({ open, onClose, title, outstanding }: { open: boolean; onClose: () => void; title: string; outstanding: number }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [ref, setRef] = useState("");
  const methods = ["Cash", "Bank", "bKash", "Nagad", "Other"];
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between text-[13px]">
        <span className="text-[var(--muted-foreground)]">Outstanding payable</span>
        <span className="font-bold text-[var(--warning)]">{fmt(outstanding)}</span>
      </div>
      <div className="space-y-3">
        <Input label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={String(outstanding)} />
        <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-1.5">{methods.map(m => <button key={m} onClick={() => setMethod(m)} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${method === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
        <Input label="Reference (optional)" value={ref} onChange={e => setRef(e.target.value)} placeholder="e.g. PAY-0083" />
        <Input label="Date" type="date" defaultValue="2026-09-04" />
      </div>
      <div className="flex gap-2 justify-end mt-5">
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" onClick={onClose}>Record Payment</Btn>
      </div>
    </Modal>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TOGGLE PRIMITIVE
// ══════════════════════════════════════════════════════════════════════════════
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 transition-colors duration-200 ${checked ? "bg-[var(--foreground)] border-[var(--foreground)]" : "bg-[var(--secondary)] border-[var(--border)]"}`}>
        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-3.5" : "translate-x-0.5"}`} />
      </button>
      {label && <span className="text-[13px] text-[var(--foreground)]">{label}</span>}
    </label>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 06 — PRODUCTS / CATALOG MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type ProductStatus = "active" | "low_stock" | "out_of_stock" | "archived";
interface Product {
  id: number; name: string; sku: string; barcode: string; brand: string;
  category: string; subcategory: string; model: string; unit: string;
  stock: number; lowStockThreshold: number; buyingPrice: number; sellingPrice: number;
  status: ProductStatus; posAvailable: boolean; onlineAvailable: boolean; description: string;
}

const allProducts: Product[] = [
  { id: 1, name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", barcode: "8901234567890", brand: "Philips", category: "Lighting", subcategory: "LED Bulb", model: "PH-12W", unit: "Piece", stock: 86, lowStockThreshold: 20, buyingPrice: 100, sellingPrice: 150, status: "active", posAvailable: true, onlineAvailable: true, description: "12W LED bulb for general household and commercial lighting." },
  { id: 2, name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", barcode: "8801234567891", brand: "Walton", category: "Fans", subcategory: "Ceiling Fan", model: "WCF-56", unit: "Piece", stock: 18, lowStockThreshold: 10, buyingPrice: 4300, sellingPrice: 4800, status: "active", posAvailable: true, onlineAvailable: true, description: "56-inch ceiling fan for residential and commercial use." },
  { id: 3, name: "Vision Table Fan 12\"", sku: "VIS-TF-12", barcode: "8801234567892", brand: "Vision", category: "Fans", subcategory: "Table Fan", model: "VTF-12", unit: "Piece", stock: 24, lowStockThreshold: 10, buyingPrice: 2100, sellingPrice: 2450, status: "active", posAvailable: true, onlineAvailable: false, description: "12-inch portable table fan." },
  { id: 4, name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", barcode: "8801234567893", brand: "Super Star", category: "Lighting", subcategory: "Tube Light", model: "SSL-T36", unit: "Piece", stock: 0, lowStockThreshold: 10, buyingPrice: 320, sellingPrice: 380, status: "out_of_stock", posAvailable: false, onlineAvailable: false, description: "36W LED tube light for commercial spaces." },
  { id: 5, name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", barcode: "8801234567894", brand: "Walton", category: "Switches & Sockets", subcategory: "Switch", model: "WSW-2G", unit: "Piece", stock: 3, lowStockThreshold: 15, buyingPrice: 140, sellingPrice: 180, status: "low_stock", posAvailable: true, onlineAvailable: true, description: "2-gang modular switch for residential wiring." },
  { id: 6, name: "Electrical Holder B22", sku: "EH-B22-STD", barcode: "8801234567895", brand: "Standard", category: "Lighting", subcategory: "Holder", model: "EH-B22", unit: "Piece", stock: 210, lowStockThreshold: 30, buyingPrice: 32, sellingPrice: 45, status: "active", posAvailable: true, onlineAvailable: true, description: "B22 standard electrical bulb holder." },
  { id: 7, name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", barcode: "8801234567896", brand: "Havells", category: "Wires & Cables", subcategory: "House Wire", model: "HC-2.5", unit: "Meter", stock: 45, lowStockThreshold: 20, buyingPrice: 520, sellingPrice: 620, status: "active", posAvailable: true, onlineAvailable: false, description: "2.5mm copper house wire, per meter." },
  { id: 8, name: "Butterfly Socket 3 Pin", sku: "BUT-SOC-3P", barcode: "8801234567897", brand: "Butterfly", category: "Switches & Sockets", subcategory: "Socket", model: "BS-3P", unit: "Piece", stock: 92, lowStockThreshold: 20, buyingPrice: 95, sellingPrice: 130, status: "active", posAvailable: true, onlineAvailable: true, description: "3-pin electrical socket for home use." },
  { id: 9, name: "Panasonic Wall Fan 16\"", sku: "PAN-WF-16", barcode: "8901234567898", brand: "Panasonic", category: "Fans", subcategory: "Wall Fan", model: "PWF-16", unit: "Piece", stock: 11, lowStockThreshold: 8, buyingPrice: 3100, sellingPrice: 3600, status: "active", posAvailable: true, onlineAvailable: true, description: "16-inch wall-mounted fan for space-saving installation." },
  { id: 10, name: "Philips LED Bulb 7W", sku: "PHI-LED-7W", barcode: "8901234567899", brand: "Philips", category: "Lighting", subcategory: "LED Bulb", model: "PH-7W", unit: "Piece", stock: 142, lowStockThreshold: 25, buyingPrice: 70, sellingPrice: 110, status: "active", posAvailable: true, onlineAvailable: true, description: "7W energy-saving LED bulb." },
];

const productStatusMap: Record<ProductStatus, { v: BadgeVariant; l: string }> = {
  active: { v: "success", l: "Active" },
  low_stock: { v: "warning", l: "Low Stock" },
  out_of_stock: { v: "error", l: "Out of Stock" },
  archived: { v: "muted", l: "Archived" },
};

type ProductView = "list" | "detail" | "form";

function ProductsPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<ProductView>("list");
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchQ, setSearchQ] = useState("");
  const [filterStock, setFilterStock] = useState("All");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");

  // Form state
  const [form, setForm] = useState({ name: "", sku: "", barcode: "", brand: "", category: "", subcategory: "", model: "", unit: "Piece", sellingPrice: "", lowStockThreshold: "10", description: "", posAvailable: true, onlineAvailable: true, featuredProduct: false, active: true });

  const stockFilters = ["All", "In Stock", "Low Stock", "Out of Stock"];
  const filtered = allProducts.filter(p => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q) || p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchStock = filterStock === "All" || (filterStock === "In Stock" && p.stock > p.lowStockThreshold) || (filterStock === "Low Stock" && p.status === "low_stock") || (filterStock === "Out of Stock" && p.status === "out_of_stock");
    return matchQ && matchStock;
  });

  const openAdd = () => { setFormMode("add"); setForm({ name: "", sku: "", barcode: "", brand: "", category: "", subcategory: "", model: "", unit: "Piece", sellingPrice: "", lowStockThreshold: "10", description: "", posAvailable: true, onlineAvailable: true, featuredProduct: false, active: true }); setView("form"); };
  const openEdit = (p: Product) => { setFormMode("edit"); setSelected(p); setForm({ name: p.name, sku: p.sku, barcode: p.barcode, brand: p.brand, category: p.category, subcategory: p.subcategory, model: p.model, unit: p.unit, sellingPrice: String(p.sellingPrice), lowStockThreshold: String(p.lowStockThreshold), description: p.description, posAvailable: p.posAvailable, onlineAvailable: p.onlineAvailable, featuredProduct: false, active: p.status !== "archived" }); setView("form"); };

  // Detail view
  if (view === "detail" && selected) {
    const margin = selected.sellingPrice - selected.buyingPrice;
    const marginPct = ((margin / selected.sellingPrice) * 100).toFixed(1);
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Products</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-medium text-[var(--foreground)] truncate">{selected.name}</span>
            <Badge variant={productStatusMap[selected.status].v} dot>{productStatusMap[selected.status].l}</Badge>
            <div className="flex-1" />
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />}>Adjust Stock</Btn>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.trash} size={13} />} onClick={() => setArchiveOpen(true)}>Archive</Btn>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />} onClick={() => openEdit(selected)}>Edit Product</Btn>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Product info */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="flex items-start gap-5">
                  <div className="h-20 w-20 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0">
                    <Icon d={icons.package} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-[18px] font-semibold text-[var(--foreground)] tracking-tight mb-1">{selected.name}</h1>
                    <div className="flex items-center gap-3 text-[12px] text-[var(--muted-foreground)] mb-3">
                      <span className="font-mono">{selected.sku}</span><span className="opacity-40">·</span>
                      <span>{selected.brand}</span><span className="opacity-40">·</span>
                      <span>{selected.category} / {selected.subcategory}</span>
                    </div>
                    <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{selected.description}</p>
                  </div>
                </div>
              </div>
              {/* Info grid */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Product information</div>
                <div className="grid grid-cols-3 gap-4 text-[13px]">
                  {[{ label: "Brand", value: selected.brand }, { label: "Category", value: `${selected.category} / ${selected.subcategory}` }, { label: "Model", value: selected.model }, { label: "Unit", value: selected.unit }, { label: "Barcode", value: selected.barcode }, { label: "SKU", value: selected.sku }].map(f => (
                    <div key={f.label}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className="font-medium text-[var(--foreground)] font-mono text-[12px]">{f.value}</div></div>
                  ))}
                </div>
              </div>
              {/* Availability */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Availability</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)]">
                    <div><div className="text-[13px] font-medium text-[var(--foreground)]">Available in POS</div><div className="text-[11px] text-[var(--muted-foreground)]">Show this product in the point of sale terminal</div></div>
                    <Toggle checked={selected.posAvailable} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div><div className="text-[13px] font-medium text-[var(--foreground)]">Available Online</div><div className="text-[11px] text-[var(--muted-foreground)]">List this product in the customer-facing store</div></div>
                    <Toggle checked={selected.onlineAvailable} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </div>
            {/* Right column */}
            <div className="space-y-4">
              {/* Pricing */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Pricing</div>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Buying cost</span><span className="text-[var(--foreground)] font-medium">{fmt(selected.buyingPrice)}</span></div>
                  <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Selling price</span><span className="text-[var(--foreground)] font-semibold text-[15px]">{fmt(selected.sellingPrice)}</span></div>
                  <div className="pt-2 border-t border-[var(--border)]">
                    <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Gross margin</span><span className="text-[var(--success)] font-semibold">{fmt(margin)} · {marginPct}%</span></div>
                  </div>
                </div>
              </div>
              {/* Inventory */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Inventory</div>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Current stock</span><span className={`font-bold text-[18px] ${selected.stock === 0 ? "text-[var(--error)]" : selected.stock <= selected.lowStockThreshold ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{selected.stock}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Low stock at</span><span className="text-[var(--foreground)]">{selected.lowStockThreshold} {selected.unit}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Unit</span><span className="text-[var(--foreground)]">{selected.unit}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Location</span><span className="text-[var(--foreground)]">Main Store</span></div>
                </div>
                <Btn variant="secondary" size="sm" className="w-full mt-3" iconLeft={<Icon d={icons.plus} size={12} />}>Adjust Stock</Btn>
              </div>
              {/* Status */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Status</div>
                <Badge variant={productStatusMap[selected.status].v} dot>{productStatusMap[selected.status].l}</Badge>
              </div>
            </div>
          </div>
        </div>
        <Modal open={archiveOpen} onClose={() => setArchiveOpen(false)} title="Archive product?" size="sm">
          <p className="text-[13px] text-[var(--muted-foreground)] mb-5">This product will no longer appear as an active product, but its historical records will remain available.</p>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setArchiveOpen(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => { setArchiveOpen(false); setView("list"); }}>Archive Product</Btn></div>
        </Modal>
      </div>
    );
  }

  // Add / Edit form view
  if (view === "form") {
    const ff = (field: keyof typeof form) => (val: string | boolean) => setForm(f => ({ ...f, [field]: val }));
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[880px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Products</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-medium text-[var(--foreground)]">{formMode === "add" ? "Add Product" : "Edit Product"}</span>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Basic info */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Basic information</div>
                <Input label="Product Name" value={form.name} onChange={e => ff("name")(e.target.value)} placeholder="e.g. Philips LED Bulb 12W" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Brand" value={form.brand} onChange={e => ff("brand")(e.target.value)} placeholder="e.g. Philips" />
                  <Input label="Model" value={form.model} onChange={e => ff("model")(e.target.value)} placeholder="e.g. PH-12W" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[var(--foreground)]">Category</label>
                    <select value={form.category} onChange={e => ff("category")(e.target.value)} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)]">
                      <option value="">Select category</option>
                      {["Lighting", "Fans", "Switches & Sockets", "Wires & Cables", "Home Appliances"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[var(--foreground)]">Subcategory</label>
                    <select value={form.subcategory} onChange={e => ff("subcategory")(e.target.value)} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)]">
                      <option value="">Select subcategory</option>
                      {["LED Bulb", "Tube Light", "Panel Light", "Ceiling Fan", "Table Fan", "Wall Fan", "Switch", "Socket", "House Wire", "Cable"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-[var(--foreground)]">Description</label>
                  <textarea value={form.description} onChange={e => ff("description")(e.target.value)} rows={3} placeholder="Short product description…" className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)] transition-all" />
                </div>
              </div>
              {/* SKU / Barcode */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">SKU & Barcode</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input label="SKU" value={form.sku} onChange={e => ff("sku")(e.target.value)} placeholder="e.g. PHI-LED-12W" iconRight={<Icon d={icons.zap} size={13} />} />
                    <button className="mt-1 text-[11px] text-[var(--info)] hover:underline">Generate SKU</button>
                  </div>
                  <div>
                    <Input label="Barcode" value={form.barcode} onChange={e => ff("barcode")(e.target.value)} placeholder="e.g. 8901234567890" iconRight={<Icon d={icons.barcode} size={13} />} />
                    <button className="mt-1 text-[11px] text-[var(--info)] hover:underline">Scan barcode</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-[var(--foreground)]">Unit</label>
                    <select value={form.unit} onChange={e => ff("unit")(e.target.value)} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)]">
                      {["Piece", "Meter", "Box", "Roll", "Set", "Dozen"].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  <Input label="Low Stock Threshold" type="number" value={form.lowStockThreshold} onChange={e => ff("lowStockThreshold")(e.target.value)} placeholder="10" />
                </div>
              </div>
              {/* Pricing */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Pricing</div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Selling Price (৳)" type="number" value={form.sellingPrice} onChange={e => ff("sellingPrice")(e.target.value)} placeholder="0" />
                  <div className="flex flex-col gap-1.5 justify-end">
                    <div className="h-9 px-3 rounded-lg border border-dashed border-[var(--border)] bg-[var(--secondary)] flex items-center text-[12px] text-[var(--muted-foreground)]">Buying cost set via Purchases module</div>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Product image</div>
                <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--foreground)]/30 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center mx-auto mb-3 text-[var(--muted-foreground)]"><Icon d={icons.package} size={18} /></div>
                  <div className="text-[13px] font-medium text-[var(--foreground)] mb-1">Upload product image</div>
                  <div className="text-[12px] text-[var(--muted-foreground)]">JPG, PNG or WEBP · Max 5MB</div>
                  <Btn variant="secondary" size="sm" className="mt-4">Choose file</Btn>
                </div>
              </div>
            </div>
            {/* Right sidebar */}
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-3">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Status</div>
                <Toggle checked={form.active} onChange={v => ff("active")(v)} label={form.active ? "Active" : "Archived"} />
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Availability</div>
                <div className="space-y-3">
                  <div><Toggle checked={form.posAvailable} onChange={v => ff("posAvailable")(v)} label="Show in POS" /><div className="text-[11px] text-[var(--muted-foreground)] ml-[44px] mt-0.5">Display in counter sales</div></div>
                  <div><Toggle checked={form.onlineAvailable} onChange={v => ff("onlineAvailable")(v)} label="Available Online" /><div className="text-[11px] text-[var(--muted-foreground)] ml-[44px] mt-0.5">List in customer store</div></div>
                  <div><Toggle checked={form.featuredProduct} onChange={v => ff("featuredProduct")(v)} label="Featured Product" /><div className="text-[11px] text-[var(--muted-foreground)] ml-[44px] mt-0.5">Highlight in online store</div></div>
                </div>
              </div>
              <div className="space-y-2">
                <Btn variant="primary" className="w-full" iconLeft={<Icon d={icons.check} size={14} />} onClick={() => setView("list")}>{formMode === "add" ? "Add Product" : "Save Changes"}</Btn>
                <Btn variant="secondary" className="w-full" onClick={() => setView("list")}>Cancel</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Products list
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div><h1 className="text-[20px] font-semibold tracking-tight text-[var(--foreground)]">Products</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Manage your product catalog, pricing and availability.</p></div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" size="sm" onClick={() => onNavigate("categories")}>Categories & Brands</Btn>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowUp} size={13} />}>Import Products</Btn>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Product</Btn>
          </div>
        </div>
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4">
          {[{ label: "Total Products", value: "1,248" }, { label: "Active", value: "1,182" }, { label: "Low Stock", value: "18" }, { label: "Out of Stock", value: "7" }].map(c => (
            <div key={c.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">{c.label}</div>
              <div className="text-[22px] font-semibold text-[var(--foreground)] tracking-tight">{c.value}</div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name, SKU, barcode or model…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" iconRight={<Icon d={icons.barcode} size={13} />} />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {stockFilters.map(f => <button key={f} onClick={() => setFilterStock(f)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${filterStock === f ? "bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{f}</button>)}
          </div>
          {["Category", "Brand", "Price Range"].map(f => (
            <div key={f} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] text-[12px] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)] transition-colors">{f} <Icon d={icons.chevronDown} size={12} /></div>
          ))}
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> products</span>
          {searchQ && <button onClick={() => setSearchQ("")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"><Icon d={icons.x} size={12} />Clear</button>}
        </div>
        {/* Bulk action bar */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl">
            <span className="text-[13px] font-medium">{selectedRows.length} selected</span>
            <div className="flex-1" />
            {["Archive", "Update Status", "Export"].map(a => <button key={a} className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-[var(--background)]/20 hover:bg-[var(--background)]/10 transition-colors">{a}</button>)}
            <button onClick={() => setSelectedRows([])} className="text-[var(--background)]/60 hover:text-[var(--background)] transition-colors ml-1"><Icon d={icons.x} size={15} /></button>
          </div>
        )}
        {/* Table */}
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.package} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No products found</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Try changing your filters or add a new product.</div>
            <div className="flex gap-2 justify-center">
              <Btn variant="secondary" size="sm" onClick={() => { setSearchQ(""); setFilterStock("All"); }}>Clear filters</Btn>
              <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Product</Btn>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  <th className="w-9 px-4 py-3"><Checkbox checked={selectedRows.length === filtered.length && filtered.length > 0} onChange={() => setSelectedRows(selectedRows.length === filtered.length ? [] : filtered.map(p => p.id))} /></th>
                  {["Product", "SKU", "Brand", "Category", "Stock", "Buying Price", "Selling Price", "Status", ""].map(h => (
                    <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Stock", "Buying Price", "Selling Price"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => { setSelected(p); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><Checkbox checked={selectedRows.includes(p.id)} onChange={() => setSelectedRows(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0"><Icon d={icons.package} size={13} /></div>
                        <div className="font-medium text-[var(--foreground)] truncate max-w-[180px]">{p.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{p.sku}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{p.brand}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{p.category}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${p.stock === 0 ? "text-[var(--error)]" : p.stock <= p.lowStockThreshold ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{fmt(p.buyingPrice)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.sellingPrice)}</td>
                    <td className="px-4 py-3"><Badge variant={productStatusMap[p.status].v} dot>{productStatusMap[p.status].l}</Badge></td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">
              <span className="text-[12px] text-[var(--muted-foreground)]">Showing {filtered.length} of 1,248 products</span>
              <div className="flex items-center gap-1">
                <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-colors disabled:opacity-40" disabled><Icon d={icons.chevronLeft} size={13} /></button>
                {[1, 2, 3].map(p => <button key={p} className={`h-7 min-w-7 px-2 flex items-center justify-center rounded-md text-[12px] transition-colors ${p === 1 ? "bg-[var(--foreground)] text-[var(--background)]" : "border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)]"}`}>{p}</button>)}
                <span className="text-[12px] text-[var(--muted-foreground)] px-1">…</span>
                <button className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--background)] transition-colors"><Icon d={icons.chevronRight} size={13} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 07 — CATEGORIES & BRANDS MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

interface Category { id: number; name: string; parent: string | null; level: number; products: number; status: "active" | "inactive"; children?: Category[]; }
interface Brand { id: number; name: string; description: string; products: number; status: "active" | "inactive"; }

const categoryTree: Category[] = [
  { id: 1, name: "Electrical", parent: null, level: 0, products: 624, status: "active", children: [
    { id: 2, name: "Lighting", parent: "Electrical", level: 1, products: 184, status: "active", children: [
      { id: 5, name: "LED Bulb", parent: "Lighting", level: 2, products: 86, status: "active" },
      { id: 6, name: "Tube Light", parent: "Lighting", level: 2, products: 52, status: "active" },
      { id: 7, name: "Panel Light", parent: "Lighting", level: 2, products: 18, status: "active" },
      { id: 8, name: "Holder", parent: "Lighting", level: 2, products: 28, status: "active" },
    ]},
    { id: 3, name: "Switches & Sockets", parent: "Electrical", level: 1, products: 138, status: "active", children: [
      { id: 9, name: "Switch", parent: "Switches & Sockets", level: 2, products: 64, status: "active" },
      { id: 10, name: "Socket", parent: "Switches & Sockets", level: 2, products: 42, status: "active" },
      { id: 11, name: "Extension", parent: "Switches & Sockets", level: 2, products: 32, status: "active" },
    ]},
    { id: 4, name: "Wires & Cables", parent: "Electrical", level: 1, products: 96, status: "active", children: [
      { id: 12, name: "House Wire", parent: "Wires & Cables", level: 2, products: 48, status: "active" },
      { id: 13, name: "Cable", parent: "Wires & Cables", level: 2, products: 30, status: "active" },
    ]},
  ]},
  { id: 14, name: "Home Appliances", parent: null, level: 0, products: 412, status: "active", children: [
    { id: 15, name: "Fans", parent: "Home Appliances", level: 1, products: 142, status: "active", children: [
      { id: 18, name: "Ceiling Fan", parent: "Fans", level: 2, products: 48, status: "active" },
      { id: 19, name: "Wall Fan", parent: "Fans", level: 2, products: 24, status: "active" },
      { id: 20, name: "Table Fan", parent: "Fans", level: 2, products: 36, status: "active" },
      { id: 21, name: "Pedestal Fan", parent: "Fans", level: 2, products: 14, status: "active" },
    ]},
    { id: 16, name: "Other Appliances", parent: "Home Appliances", level: 1, products: 270, status: "active" },
  ]},
  { id: 17, name: "Batteries & Accessories", parent: null, level: 0, products: 98, status: "active" },
];

const allBrands: Brand[] = [
  { id: 1, name: "Walton", description: "Bangladeshi consumer electronics and appliances", products: 126, status: "active" },
  { id: 2, name: "Philips", description: "Global lighting and electronics brand", products: 94, status: "active" },
  { id: 3, name: "Vision", description: "Bangladesh-based electronics manufacturer", products: 78, status: "active" },
  { id: 4, name: "Super Star", description: "Bangladeshi electrical products brand", products: 62, status: "active" },
  { id: 5, name: "Havells", description: "Electrical equipment and cables", products: 48, status: "active" },
  { id: 6, name: "Panasonic", description: "Japanese multinational electronics corporation", products: 36, status: "active" },
  { id: 7, name: "Butterfly", description: "Electrical accessories and fittings", products: 44, status: "active" },
  { id: 8, name: "Standard", description: "Electrical components and accessories", products: 30, status: "active" },
];

function CatRow({ cat, searchQ, onEdit, onArchive, expanded, onToggle }: { cat: Category; searchQ: string; onEdit: (c: Category) => void; onArchive: (c: Category) => void; expanded: Set<number>; onToggle: (id: number) => void }) {
  const indentPx = cat.level * 20;
  const hasChildren = cat.children && cat.children.length > 0;
  const isExpanded = expanded.has(cat.id);
  const q = searchQ.toLowerCase();
  const visible = !q || cat.name.toLowerCase().includes(q);
  if (!visible && !cat.children?.some(c => c.name.toLowerCase().includes(q) || c.children?.some(cc => cc.name.toLowerCase().includes(q)))) return null;
  return (
    <>
      <tr className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors group">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${indentPx}px` }}>
            {hasChildren ? (
              <button onClick={() => onToggle(cat.id)} className="h-5 w-5 flex items-center justify-center rounded text-[var(--muted-foreground)] hover:bg-[var(--border)] transition-colors shrink-0">
                <Icon d={isExpanded ? icons.chevronDown : icons.chevronRight} size={12} />
              </button>
            ) : <span className="w-5 shrink-0" />}
            <span className={`text-[13px] font-medium text-[var(--foreground)] ${cat.level === 0 ? "font-semibold" : ""}`}>{cat.name}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-[12px] text-[var(--muted-foreground)]">{cat.parent || <span className="opacity-40">—</span>}</td>
        <td className="px-4 py-3 text-[13px] text-[var(--muted-foreground)] text-right">{cat.products.toLocaleString()}</td>
        <td className="px-4 py-3"><Badge variant={cat.status === "active" ? "success" : "muted"} dot>{cat.status === "active" ? "Active" : "Inactive"}</Badge></td>
        <td className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1">
            <Btn variant="ghost" size="sm" onClick={() => onEdit(cat)}>Edit</Btn>
            <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"><Icon d={icons.moreVertical} size={14} /></button>
          </div>
        </td>
      </tr>
      {isExpanded && cat.children?.map(child => (
        <CatRow key={child.id} cat={child} searchQ={searchQ} onEdit={onEdit} onArchive={onArchive} expanded={expanded} onToggle={onToggle} />
      ))}
    </>
  );
}

function CategoriesBrandsPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [tab, setTab] = useState<"categories" | "brands">("categories");
  const [searchQ, setSearchQ] = useState("");
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1, 14]));
  const [catModal, setCatModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | Brand | null>(null);
  const [catForm, setCatForm] = useState({ name: "", parent: "", description: "", status: "active" });
  const [brandForm, setBrandForm] = useState({ name: "", description: "", status: "active" });

  const toggleExpand = (id: number) => setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const openCatEdit = (c: Category) => { setEditTarget(c); setCatForm({ name: c.name, parent: c.parent || "", description: "", status: c.status }); setCatModal(true); };
  const openCatAdd = () => { setEditTarget(null); setCatForm({ name: "", parent: "", description: "", status: "active" }); setCatModal(true); };
  const openBrandEdit = (b: Brand) => { setEditTarget(b); setBrandForm({ name: b.name, description: b.description, status: b.status }); setBrandModal(true); };
  const openBrandAdd = () => { setEditTarget(null); setBrandForm({ name: "", description: "", status: "active" }); setBrandModal(true); };

  const filteredBrands = allBrands.filter(b => !searchQ || b.name.toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1100px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => onNavigate("products")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Products</button>
              <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={11} /></span>
              <span className="text-[12px] text-[var(--foreground)] font-medium">Categories & Brands</span>
            </div>
            <h1 className="text-[20px] font-semibold tracking-tight text-[var(--foreground)]">Categories & Brands</h1>
            <p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Organize your product catalog.</p>
          </div>
          <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => tab === "categories" ? openCatAdd() : openBrandAdd()}>
            {tab === "categories" ? "Add Category" : "Add Brand"}
          </Btn>
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-[var(--border)]">
          {(["categories", "brands"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setSearchQ(""); }} className={`px-4 py-2.5 text-[13px] font-medium capitalize transition-all border-b-2 -mb-px ${tab === t ? "border-[var(--foreground)] text-[var(--foreground)]" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{t}</button>
          ))}
        </div>
        {/* Search */}
        <div className="flex items-center gap-3">
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={tab === "categories" ? "Search categories…" : "Search brands…"} iconLeft={<Icon d={icons.search} size={13} />} className="w-64" />
          {searchQ && <button onClick={() => setSearchQ("")} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"><Icon d={icons.x} size={12} />Clear</button>}
          {tab === "categories" && (
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setExpanded(new Set([1, 14, 2, 3, 4, 15]))} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Expand all</button>
              <span className="opacity-40 text-[12px]">·</span>
              <button onClick={() => setExpanded(new Set())} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Collapse all</button>
            </div>
          )}
        </div>

        {tab === "categories" ? (
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  {["Category", "Parent", "Products", "Status", ""].map(h => (
                    <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Products" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categoryTree.map(cat => (
                  <CatRow key={cat.id} cat={cat} searchQ={searchQ} onEdit={openCatEdit} onArchive={c => { setEditTarget(c); setArchiveModal(true); }} expanded={expanded} onToggle={toggleExpand} />
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">
              <span className="text-[12px] text-[var(--muted-foreground)]">{categoryTree.length} parent categories · {categoryTree.reduce((s, c) => s + (c.children?.length || 0), 0)} subcategories</span>
            </div>
          </div>
        ) : (
          filteredBrands.length === 0 ? (
            <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
              <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.package} size={18} /></div>
              <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No brands found</div>
              <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Create a brand to organize your products.</div>
              <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openBrandAdd}>Add Brand</Btn>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    {["Brand", "Description", "Products", "Status", ""].map(h => (
                      <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Products" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBrands.map(b => (
                    <tr key={b.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] shrink-0 text-[10px] font-bold">{b.name.slice(0, 2).toUpperCase()}</div>
                          <span className="font-semibold text-[var(--foreground)]">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)] max-w-[280px] truncate">{b.description}</td>
                      <td className="px-4 py-3 text-right font-medium text-[var(--foreground)]">{b.products}</td>
                      <td className="px-4 py-3"><Badge variant={b.status === "active" ? "success" : "muted"} dot>{b.status === "active" ? "Active" : "Inactive"}</Badge></td>
                      <td className="px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1">
                          <Btn variant="ghost" size="sm" onClick={() => openBrandEdit(b)}>Edit</Btn>
                          <Btn variant="ghost" size="sm" onClick={() => onNavigate("products")}>View products</Btn>
                          <button onClick={() => { setEditTarget(b); setArchiveModal(true); }} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"><Icon d={icons.moreVertical} size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--secondary)]">
                <span className="text-[12px] text-[var(--muted-foreground)]">{filteredBrands.length} brands</span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Add/Edit Category modal */}
      <Modal open={catModal} onClose={() => setCatModal(false)} title={editTarget ? "Edit Category" : "Add Category"} size="sm">
        <div className="space-y-3">
          <Input label="Category Name" value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. LED Bulb" />
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[var(--foreground)]">Parent Category</label>
            <select value={catForm.parent} onChange={e => setCatForm(f => ({ ...f, parent: e.target.value }))} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)]">
              <option value="">None (top-level)</option>
              {["Electrical", "Lighting", "Switches & Sockets", "Wires & Cables", "Home Appliances", "Fans"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[var(--foreground)]">Description</label>
            <textarea value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Optional description…" className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
          </div>
          <div className="flex items-center justify-between"><span className="text-[13px] text-[var(--foreground)]">Status</span><Toggle checked={catForm.status === "active"} onChange={v => setCatForm(f => ({ ...f, status: v ? "active" : "inactive" }))} label={catForm.status === "active" ? "Active" : "Inactive"} /></div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Btn variant="secondary" onClick={() => setCatModal(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setCatModal(false)}>{editTarget ? "Save Changes" : "Add Category"}</Btn>
        </div>
      </Modal>

      {/* Add/Edit Brand modal */}
      <Modal open={brandModal} onClose={() => setBrandModal(false)} title={editTarget ? "Edit Brand" : "Add Brand"} size="sm">
        <div className="space-y-3">
          <Input label="Brand Name" value={brandForm.name} onChange={e => setBrandForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Walton" />
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-[var(--foreground)]">Description</label>
            <textarea value={brandForm.description} onChange={e => setBrandForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Short description…" className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
          </div>
          <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center hover:border-[var(--foreground)]/20 transition-colors cursor-pointer">
            <div className="text-[12px] text-[var(--muted-foreground)] mb-1">Brand logo (optional)</div>
            <Btn variant="secondary" size="sm">Upload logo</Btn>
          </div>
          <div className="flex items-center justify-between"><span className="text-[13px] text-[var(--foreground)]">Status</span><Toggle checked={brandForm.status === "active"} onChange={v => setBrandForm(f => ({ ...f, status: v ? "active" : "inactive" }))} label={brandForm.status === "active" ? "Active" : "Inactive"} /></div>
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Btn variant="secondary" onClick={() => setBrandModal(false)}>Cancel</Btn>
          <Btn variant="primary" onClick={() => setBrandModal(false)}>{editTarget ? "Save Changes" : "Add Brand"}</Btn>
        </div>
      </Modal>

      {/* Archive confirmation */}
      <Modal open={archiveModal} onClose={() => setArchiveModal(false)} title={tab === "categories" ? "Archive category?" : "Archive brand?"} size="sm">
        <p className="text-[13px] text-[var(--muted-foreground)] mb-5">
          {tab === "categories" ? "Products in this category will remain available, but the category will no longer be active." : "Products under this brand will remain available, but the brand will no longer be active."}
        </p>
        <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setArchiveModal(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => setArchiveModal(false)}>Archive</Btn></div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 08 — INVENTORY MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type InvStatus = "in_stock" | "low_stock" | "out_of_stock";
interface InvItem { id: number; name: string; sku: string; barcode: string; category: string; brand: string; stock: number; reserved: number; threshold: number; buyingPrice: number; sellingPrice: number; status: InvStatus; lastSupplier: string; }

const invStatusMap: Record<InvStatus, { v: BadgeVariant; l: string }> = {
  in_stock: { v: "success", l: "In Stock" }, low_stock: { v: "warning", l: "Low Stock" }, out_of_stock: { v: "error", l: "Out of Stock" },
};

const inventoryData: InvItem[] = [
  { id: 1, name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", barcode: "8901234567890", category: "Lighting", brand: "Philips", stock: 86, reserved: 4, threshold: 20, buyingPrice: 100, sellingPrice: 150, status: "in_stock", lastSupplier: "Philips Bangladesh Ltd." },
  { id: 2, name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", barcode: "8801234567891", category: "Fans", brand: "Walton", stock: 18, reserved: 2, threshold: 10, buyingPrice: 4300, sellingPrice: 4800, status: "in_stock", lastSupplier: "Walton Distributor — Dhaka" },
  { id: 3, name: "Vision Table Fan 12\"", sku: "VIS-TF-12", barcode: "8801234567892", category: "Fans", brand: "Vision", stock: 24, reserved: 1, threshold: 10, buyingPrice: 2100, sellingPrice: 2450, status: "in_stock", lastSupplier: "Vision Electronics Dist." },
  { id: 4, name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", barcode: "8801234567893", category: "Lighting", brand: "Super Star", stock: 0, reserved: 0, threshold: 10, buyingPrice: 320, sellingPrice: 380, status: "out_of_stock", lastSupplier: "Super Star Trading" },
  { id: 5, name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", barcode: "8801234567894", category: "Switches & Sockets", brand: "Walton", stock: 3, reserved: 0, threshold: 15, buyingPrice: 140, sellingPrice: 180, status: "low_stock", lastSupplier: "Walton Distributor — Dhaka" },
  { id: 6, name: "Electrical Holder B22", sku: "EH-B22-STD", barcode: "8801234567895", category: "Lighting", brand: "Standard", stock: 210, reserved: 0, threshold: 30, buyingPrice: 32, sellingPrice: 45, status: "in_stock", lastSupplier: "Butterfly Electric Co." },
  { id: 7, name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", barcode: "8801234567896", category: "Wires & Cables", brand: "Havells", stock: 45, reserved: 3, threshold: 20, buyingPrice: 520, sellingPrice: 620, status: "in_stock", lastSupplier: "Havells Bangladesh" },
  { id: 8, name: "Butterfly Socket 3 Pin", sku: "BUT-SOC-3P", barcode: "8801234567897", category: "Switches & Sockets", brand: "Butterfly", stock: 92, reserved: 0, threshold: 20, buyingPrice: 95, sellingPrice: 130, status: "in_stock", lastSupplier: "Butterfly Electric Co." },
  { id: 9, name: "Panasonic Wall Fan 16\"", sku: "PAN-WF-16", barcode: "8901234567898", category: "Fans", brand: "Panasonic", stock: 8, reserved: 0, threshold: 8, buyingPrice: 3100, sellingPrice: 3600, status: "low_stock", lastSupplier: "Walton Distributor — Dhaka" },
];

const movementHistory = [
  { date: "4 Sep", type: "Purchase Received", ref: "PO-2048", qty: 50, after: 86, user: "MD. SELIM" },
  { date: "4 Sep", type: "POS Sale", ref: "SE-20483", qty: -3, after: 83, user: "Mahbub" },
  { date: "4 Sep", type: "POS Sale", ref: "SE-20481", qty: -2, after: 81, user: "MD. SELIM" },
  { date: "3 Sep", type: "Stock Adjustment", ref: "ADJ-018", qty: -1, after: 83, user: "MD. SELIM" },
  { date: "28 Aug", type: "Purchase Received", ref: "PO-2041", qty: 30, after: 84, user: "Mahbub" },
  { date: "22 Aug", type: "Customer Return", ref: "RET-012", qty: 1, after: 54, user: "MD. SELIM" },
];

const mvTypeStyle: Record<string, string> = {
  "Purchase Received": "text-[var(--success)]", "POS Sale": "text-[var(--foreground)]",
  "Stock Adjustment": "text-[var(--warning)]", "Customer Return": "text-[var(--info)]", "Supplier Return": "text-[var(--info)]",
};

function InventoryPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selected, setSelected] = useState<InvItem | null>(null);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustTarget, setAdjustTarget] = useState<InvItem | null>(null);
  const [adjType, setAdjType] = useState<"increase" | "decrease">("decrease");
  const [adjQty, setAdjQty] = useState("");
  const [adjReason, setAdjReason] = useState("Damaged");
  const [adjNotes, setAdjNotes] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [filterStock, setFilterStock] = useState("All");

  const filtered = inventoryData.filter(p => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q);
    const matchS = filterStock === "All" || (filterStock === "In Stock" && p.status === "in_stock") || (filterStock === "Low Stock" && p.status === "low_stock") || (filterStock === "Out of Stock" && p.status === "out_of_stock");
    return matchQ && matchS;
  });

  const openAdjust = (item: InvItem) => { setAdjustTarget(item); setAdjQty(""); setAdjNotes(""); setAdjReason("Damaged"); setAdjType("decrease"); setAdjustOpen(true); };
  const newStock = adjustTarget ? Math.max(0, adjustTarget.stock + (adjType === "increase" ? 1 : -1) * (Number(adjQty) || 0)) : 0;

  if (view === "detail" && selected) {
    const value = selected.stock * selected.buyingPrice;
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Inventory</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-medium text-[var(--foreground)] truncate">{selected.name}</span>
            <Badge variant={invStatusMap[selected.status].v} dot>{invStatusMap[selected.status].l}</Badge>
            <div className="flex-1" />
            <Btn variant="secondary" size="sm" onClick={() => onNavigate("products")}>View Product</Btn>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />} onClick={() => openAdjust(selected)}>Adjust Stock</Btn>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Stock summary */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Stock summary</div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[{ label: "Current Stock", value: selected.stock, big: true }, { label: "Reserved", value: selected.reserved }, { label: "Available", value: selected.stock - selected.reserved }, { label: "Low Stock At", value: selected.threshold }].map(f => (
                    <div key={f.label} className="border border-[var(--border)] rounded-lg p-3">
                      <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</div>
                      <div className={`font-bold ${f.big ? "text-[28px]" : "text-[18px]"} ${f.value === 0 && f.label !== "Reserved" ? "text-[var(--error)]" : "text-[var(--foreground)]"}`}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Movement history */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Stock movement history</div></div>
                <table className="w-full text-[13px]">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    {["Date", "Type", "Reference", "Quantity", "Stock After", "User"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Quantity", "Stock After"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {movementHistory.map((m, i) => (
                      <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                        <td className="px-4 py-3 text-[var(--muted-foreground)]">{m.date}</td>
                        <td className="px-4 py-3"><span className={`font-medium ${mvTypeStyle[m.type] || "text-[var(--foreground)]"}`}>{m.type}</span></td>
                        <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{m.ref}</td>
                        <td className="px-4 py-3 text-right"><span className={`font-semibold ${m.qty > 0 ? "text-[var(--success)]" : "text-[var(--foreground)]"}`}>{m.qty > 0 ? `+${m.qty}` : m.qty}</span></td>
                        <td className="px-4 py-3 text-right text-[var(--foreground)]">{m.after}</td>
                        <td className="px-4 py-3 text-[var(--muted-foreground)]">{m.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Right panel */}
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-2.5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Valuation</div>
                <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Buying cost</span><span>{fmt(selected.buyingPrice)}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Selling price</span><span>{fmt(selected.sellingPrice)}</span></div>
                <div className="flex justify-between text-[13px] border-t border-[var(--border)] pt-2"><span className="text-[var(--muted-foreground)]">Inventory value</span><span className="font-bold text-[var(--foreground)]">{fmt(value)}</span></div>
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-2.5 text-[13px]">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Activity</div>
                {[{ label: "Last Purchase", value: "4 Sep 2026", sub: "PO-2048" }, { label: "Last Sale", value: "4 Sep 2026", sub: "SE-20483" }, { label: "Last Adjustment", value: "3 Sep 2026", sub: "ADJ-018" }].map(a => (
                  <div key={a.label} className="border-b border-[var(--border)] pb-2 last:border-b-0 last:pb-0">
                    <div className="text-[11px] text-[var(--muted-foreground)]">{a.label}</div>
                    <div className="font-medium text-[var(--foreground)]">{a.value}</div>
                    <div className="font-mono text-[10px] text-[var(--muted-foreground)]">{a.sub}</div>
                  </div>
                ))}
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Last supplier</div>
                <div className="text-[13px] font-medium text-[var(--foreground)]">{selected.lastSupplier}</div>
                <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] mt-1 transition-colors" onClick={() => onNavigate("suppliers")}>View supplier →</button>
              </div>
            </div>
          </div>
        </div>
        {/* Stock adjustment modal */}
        <Modal open={adjustOpen} onClose={() => setAdjustOpen(false)} title="Adjust Stock" size="sm">
          {adjustTarget && (
            <>
              <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
                <div><div className="text-[13px] font-medium text-[var(--foreground)]">{adjustTarget.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{adjustTarget.sku}</div></div>
                <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Current stock</div><div className="text-[20px] font-bold text-[var(--foreground)]">{adjustTarget.stock}</div></div>
              </div>
              <div className="space-y-3">
                <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Adjustment type</div>
                  <div className="flex gap-2">{(["increase", "decrease"] as const).map(t => <button key={t} onClick={() => setAdjType(t)} className={`flex-1 h-9 rounded-lg border text-[13px] font-medium capitalize transition-all ${adjType === t ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{t}</button>)}</div>
                </div>
                <Input label="Quantity" type="number" value={adjQty} onChange={e => setAdjQty(e.target.value)} placeholder="0" />
                <SelectField label="Reason" value={adjReason} onChange={setAdjReason} options={["Damaged", "Lost", "Found", "Counting correction", "Internal use", "Other"].map(r => ({ value: r, label: r }))} />
                <div className="flex flex-col gap-1.5"><label className="text-[12px] font-medium text-[var(--foreground)]">Notes (optional)</label><textarea value={adjNotes} onChange={e => setAdjNotes(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" placeholder="Optional details…" /></div>
              </div>
              {adjQty && (
                <div className={`mt-3 px-4 py-3 rounded-lg border flex justify-between text-[13px] ${adjType === "increase" ? "bg-[var(--success-bg)] border-[var(--success-border)]" : "bg-[var(--warning-bg)] border-[var(--warning-border)]"}`}>
                  <span className="text-[var(--muted-foreground)]">New stock after adjustment</span>
                  <span className="font-bold text-[var(--foreground)]">{newStock}</span>
                </div>
              )}
              <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setAdjustOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setAdjustOpen(false)} disabled={!adjQty}>Confirm Adjustment</Btn></div>
            </>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Inventory" subtitle="Monitor stock levels and inventory movement." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />} onClick={() => openAdjust(inventoryData[0])}>Adjust Stock</Btn></>} />
        <KpiRow cards={[{ label: "Total Units", value: "4,826" }, { label: "Inventory Value", value: "৳ 1,84,50,000" }, { label: "Low Stock", value: "18", warn: true }, { label: "Out of Stock", value: "7", err: true }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name, SKU or barcode…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All", "In Stock", "Low Stock", "Out of Stock"].map(f => <FilterChip key={f} label={f} active={filterStock === f} onClick={() => setFilterStock(f)} />)}
          </div>
          <DropFilter label="Category" /><DropFilter label="Brand" /><DropFilter label="Supplier" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> products</span>
        </FilterBar>
        {/* Alerts row */}
        <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Needs attention</div>
          <div className="flex flex-wrap gap-3">
            {inventoryData.filter(p => p.status !== "in_stock").map(p => (
              <div key={p.id} className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${p.status === "out_of_stock" ? "border-[var(--error-border)] bg-[var(--error-bg)]" : "border-[var(--warning-border)] bg-[var(--warning-bg)]"}`}>
                <div><div className={`text-[12px] font-medium ${p.status === "out_of_stock" ? "text-[var(--error)]" : "text-[var(--warning)]"}`}>{p.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.status === "out_of_stock" ? "Out of stock" : `${p.stock} remaining`}</div></div>
                <button className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] whitespace-nowrap transition-colors" onClick={() => { setSelected(p); setView("detail"); }}>View →</button>
              </div>
            ))}
          </div>
        </div>
        <TableWrap
          head={[{ label: "" }, { label: "Product" }, { label: "SKU" }, { label: "Category" }, { label: "Stock", right: true }, { label: "Reserved", right: true }, { label: "Available", right: true }, { label: "Threshold", right: true }, { label: "Value", right: true }, { label: "Status" }, { label: "" }]}
          footer={<><span className="text-[12px] text-[var(--muted-foreground)]">Showing {filtered.length} of 1,248 products</span><Pagination total={1248} /></>}
        >
          {filtered.map(p => (
            <tr key={p.id} onClick={() => { setSelected(p); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
              <td className="px-4 py-3"><div className="h-7 w-7 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)]"><Icon d={icons.package} size={12} /></div></td>
              <td className="px-4 py-3 font-medium text-[var(--foreground)] max-w-[180px] truncate">{p.name}</td>
              <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{p.sku}</td>
              <td className="px-4 py-3 text-[var(--muted-foreground)]">{p.category}</td>
              <td className="px-4 py-3 text-right"><span className={`font-bold ${p.stock === 0 ? "text-[var(--error)]" : p.status === "low_stock" ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{p.stock}</span></td>
              <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{p.reserved}</td>
              <td className="px-4 py-3 text-right font-medium text-[var(--foreground)]">{p.stock - p.reserved}</td>
              <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{p.threshold}</td>
              <td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(p.stock * p.buyingPrice)}</td>
              <td className="px-4 py-3"><Badge variant={invStatusMap[p.status].v} dot>{invStatusMap[p.status].l}</Badge></td>
              <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                <button onClick={() => openAdjust(p)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors text-[12px]">Adjust</button>
              </td>
            </tr>
          ))}
        </TableWrap>
      </div>
      <Modal open={adjustOpen && !selected} onClose={() => setAdjustOpen(false)} title="Adjust Stock" size="sm">
        {adjustTarget && (
          <>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
              <div><div className="text-[13px] font-medium text-[var(--foreground)]">{adjustTarget.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{adjustTarget.sku}</div></div>
              <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Current stock</div><div className="text-[20px] font-bold text-[var(--foreground)]">{adjustTarget.stock}</div></div>
            </div>
            <div className="space-y-3">
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Adjustment type</div><div className="flex gap-2">{(["increase", "decrease"] as const).map(t => <button key={t} onClick={() => setAdjType(t)} className={`flex-1 h-9 rounded-lg border text-[13px] font-medium capitalize transition-all ${adjType === t ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{t}</button>)}</div></div>
              <Input label="Quantity" type="number" value={adjQty} onChange={e => setAdjQty(e.target.value)} placeholder="0" />
              <SelectField label="Reason" value={adjReason} onChange={setAdjReason} options={["Damaged", "Lost", "Found", "Counting correction", "Internal use", "Other"].map(r => ({ value: r, label: r }))} />
            </div>
            {adjQty && <div className={`mt-3 px-4 py-3 rounded-lg border flex justify-between text-[13px] ${adjType === "increase" ? "bg-[var(--success-bg)] border-[var(--success-border)]" : "bg-[var(--warning-bg)] border-[var(--warning-border)]"}`}><span className="text-[var(--muted-foreground)]">New stock</span><span className="font-bold text-[var(--foreground)]">{newStock}</span></div>}
            <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setAdjustOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setAdjustOpen(false)} disabled={!adjQty}>Confirm Adjustment</Btn></div>
          </>
        )}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 09 — SUPPLIERS / DEALERS MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type SupplierStatus = "active" | "inactive" | "on_hold";
interface Supplier {
  id: number; name: string; contact: string; phone: string; altPhone?: string; email?: string;
  address: string; city: string; type: string; products: number; totalPurchased: number;
  totalPaid: number; outstanding: number; lastPurchase: string; status: SupplierStatus; notes: string;
}

const supplierStatusMap: Record<SupplierStatus, { v: BadgeVariant; l: string }> = {
  active: { v: "success", l: "Active" }, inactive: { v: "muted", l: "Inactive" }, on_hold: { v: "warning", l: "On Hold" },
};

const allSuppliers: Supplier[] = [
  { id: 1, name: "Walton Distributor — Dhaka", contact: "Abdul Karim", phone: "01712 345678", altPhone: "01712 345679", email: "walton.dist@email.com", address: "35 Mirpur Road", city: "Dhaka", type: "Distributor", products: 126, totalPurchased: 1850000, totalPaid: 1600000, outstanding: 250000, lastPurchase: "4 Sep 2026", status: "active", notes: "Usually supplies Walton fans and switches. Payment terms: 30 days." },
  { id: 2, name: "Philips Bangladesh Ltd.", contact: "Rahman Ahmed", phone: "01812 456789", email: "philips@email.com", address: "12 Gulshan Ave", city: "Dhaka", type: "Distributor", products: 48, totalPurchased: 920000, totalPaid: 920000, outstanding: 0, lastPurchase: "28 Aug 2026", status: "active", notes: "Philips branded LED and lighting products." },
  { id: 3, name: "Vision Electronics Dist.", contact: "Mizanur Rahman", phone: "01911 567890", email: "", address: "78 Banani", city: "Dhaka", type: "Dealer", products: 78, totalPurchased: 680000, totalPaid: 360000, outstanding: 320000, lastPurchase: "1 Sep 2026", status: "active", notes: "" },
  { id: 4, name: "Havells Bangladesh", contact: "Tariq Islam", phone: "01611 678901", email: "havells@email.com", address: "Chittagong Road", city: "Dhaka", type: "Distributor", products: 36, totalPurchased: 450000, totalPaid: 450000, outstanding: 0, lastPurchase: "15 Aug 2026", status: "active", notes: "Cable and electrical components." },
  { id: 5, name: "Super Star Trading", contact: "Nurul Haque", phone: "01511 789012", email: "", address: "Old Town", city: "Dhaka", type: "Dealer", products: 62, totalPurchased: 380000, totalPaid: 280000, outstanding: 100000, lastPurchase: "20 Aug 2026", status: "active", notes: "" },
  { id: 6, name: "Butterfly Electric Co.", contact: "Kamal Ahmed", phone: "01712 890123", email: "", address: "Narayanganj", city: "Narayanganj", type: "Manufacturer", products: 44, totalPurchased: 210000, totalPaid: 210000, outstanding: 0, lastPurchase: "10 Aug 2026", status: "inactive", notes: "Manufacturer of sockets and fittings." },
];

const supplierProducts = [
  { name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", lastPrice: 4300, lastDate: "4 Sep 2026", totalPurchased: 120 },
  { name: "Walton Table Fan 12\"", sku: "WAL-TF-12", lastPrice: 2100, lastDate: "28 Aug 2026", totalPurchased: 80 },
  { name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", lastPrice: 140, lastDate: "4 Sep 2026", totalPurchased: 350 },
  { name: "Walton Socket 3 Pin", sku: "WAL-SOC-3P", lastPrice: 95, lastDate: "28 Aug 2026", totalPurchased: 280 },
];
const supplierPurchaseHistory = [
  { id: "PO-2048", date: "4 Sep 2026", items: 24, total: 450000, paid: 400000, due: 50000, status: "partial" as const },
  { id: "PO-2031", date: "28 Aug 2026", items: 18, total: 280000, paid: 280000, due: 0, status: "paid" as const },
  { id: "PO-2019", date: "15 Aug 2026", items: 12, total: 320000, paid: 320000, due: 0, status: "paid" as const },
];
const supplierPayments = [
  { date: "4 Sep 2026", ref: "PAY-0091", amount: 300000, method: "Bank", user: "MD. SELIM" },
  { date: "2 Sep 2026", ref: "PAY-0082", amount: 100000, method: "Cash", user: "MD. SELIM" },
  { date: "28 Aug 2026", ref: "PAY-0078", amount: 280000, method: "Bank", user: "Mahbub" },
];

const supPurchaseStatusBadge: Record<string, { v: BadgeVariant; l: string }> = {
  paid: { v: "success", l: "Paid" }, partial: { v: "partial", l: "Partially Paid" }, unpaid: { v: "error", l: "Unpaid" },
};

function SuppliersPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<"list" | "detail" | "form">("list");
  const [selected, setSelected] = useState<Supplier | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState({ name: "", contact: "", phone: "", altPhone: "", email: "", address: "", city: "", type: "Dealer", notes: "", status: "active" });

  const filtered = allSuppliers.filter(s => {
    const q = searchQ.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.phone.includes(q);
  });

  const openAdd = () => { setFormMode("add"); setForm({ name: "", contact: "", phone: "", altPhone: "", email: "", address: "", city: "", type: "Dealer", notes: "", status: "active" }); setView("form"); };
  const openEdit = (s: Supplier) => { setFormMode("edit"); setSelected(s); setForm({ name: s.name, contact: s.contact, phone: s.phone, altPhone: s.altPhone || "", email: s.email || "", address: s.address, city: s.city, type: s.type, notes: s.notes, status: s.status }); setView("form"); };
  const ff = (field: string) => (v: string) => setForm(f => ({ ...f, [field]: v }));

  if (view === "form") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[800px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Suppliers</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{formMode === "add" ? "Add Supplier" : "Edit Supplier"}</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Supplier information</div>
              <Input label="Supplier / Company Name" value={form.name} onChange={e => ff("name")(e.target.value)} placeholder="e.g. Walton Distributor — Dhaka" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Contact Person" value={form.contact} onChange={e => ff("contact")(e.target.value)} placeholder="Full name" />
                <SelectField label="Supplier Type" value={form.type} onChange={ff("type")} options={["Dealer", "Distributor", "Manufacturer", "Other"].map(t => ({ value: t, label: t }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Phone" value={form.phone} onChange={e => ff("phone")(e.target.value)} placeholder="01712 345678" />
                <Input label="Alternative Phone" value={form.altPhone} onChange={e => ff("altPhone")(e.target.value)} placeholder="Optional" />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={e => ff("email")(e.target.value)} placeholder="supplier@email.com" />
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Address</div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Address" value={form.address} onChange={e => ff("address")(e.target.value)} placeholder="Street address" />
                <Input label="City" value={form.city} onChange={e => ff("city")(e.target.value)} placeholder="e.g. Dhaka" />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Notes</div>
              <textarea value={form.notes} onChange={e => ff("notes")(e.target.value)} rows={3} placeholder="Internal notes about this supplier…" className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Status</div>
              <SelectField value={form.status} onChange={ff("status")} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }, { value: "on_hold", label: "On Hold" }]} />
            </div>
            <div className="space-y-2">
              <Btn variant="primary" className="w-full" onClick={() => setView("list")} iconLeft={<Icon d={icons.check} size={14} />}>{formMode === "add" ? "Add Supplier" : "Save Changes"}</Btn>
              <Btn variant="secondary" className="w-full" onClick={() => setView("list")}>Cancel</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === "detail" && selected) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Suppliers</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{selected.name}</span>
          <Badge variant={supplierStatusMap[selected.status].v} dot>{supplierStatusMap[selected.status].l}</Badge>
          <div className="flex-1" />
          {selected.outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => setPaymentOpen(true)}>Record Payment</Btn>}
          <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />} onClick={() => openEdit(selected)}>Edit</Btn>
          <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => onNavigate("purchases")}>New Purchase</Btn>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Financial summary */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Financial summary</div>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[{ label: "Total Purchases", value: fmt(selected.totalPurchased) }, { label: "Paid", value: fmt(selected.totalPaid) }, { label: "Outstanding", value: fmt(selected.outstanding), warn: selected.outstanding > 0 }, { label: "Last Purchase", value: selected.lastPurchase }].map(f => (
                  <div key={f.label} className="border border-[var(--border)] rounded-lg p-3">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</div>
                    <div className={`text-[14px] font-bold ${f.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Products */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Products supplied</div><span className="text-[12px] text-[var(--muted-foreground)]">{selected.products} products</span></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Product", "SKU", "Last Price", "Last Date", "Total Purchased"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Last Price", "Total Purchased"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{supplierProducts.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.name}</td><td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{p.sku}</td><td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(p.lastPrice)}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.lastDate}</td><td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{p.totalPurchased} units</td></tr>)}</tbody>
              </table>
            </div>
            {/* Purchase history */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Purchase history</div><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]" onClick={() => onNavigate("purchases")}>View all →</button></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Purchase", "Date", "Items", "Total", "Paid", "Due", "Status"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Total", "Paid", "Due"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{supplierPurchaseHistory.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors cursor-pointer" onClick={() => onNavigate("purchases")}><td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{p.id}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.items} items</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.total)}</td><td className="px-4 py-3 text-right text-[var(--success)]">{fmt(p.paid)}</td><td className="px-4 py-3 text-right">{p.due > 0 ? <span className="text-[var(--warning)] font-medium">{fmt(p.due)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td><td className="px-4 py-3"><Badge variant={supPurchaseStatusBadge[p.status].v} dot>{supPurchaseStatusBadge[p.status].l}</Badge></td></tr>)}</tbody>
              </table>
            </div>
          </div>
          {/* Right panel */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Contact information</div>
              <div className="space-y-2.5 text-[13px]">
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Contact person</div><div className="font-medium text-[var(--foreground)]">{selected.contact}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Phone</div><div className="font-medium text-[var(--foreground)]">{selected.phone}</div></div>
                {selected.altPhone && <div><div className="text-[11px] text-[var(--muted-foreground)]">Alternative</div><div className="text-[var(--foreground)]">{selected.altPhone}</div></div>}
                {selected.email && <div><div className="text-[11px] text-[var(--muted-foreground)]">Email</div><div className="text-[var(--foreground)]">{selected.email}</div></div>}
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Address</div><div className="text-[var(--foreground)]">{selected.address}, {selected.city}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Type</div><div className="text-[var(--foreground)]">{selected.type}</div></div>
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment history</div>
              <div className="space-y-2">
                {supplierPayments.map((p, i) => <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-b-0">
                  <div><div className="text-[12px] font-medium text-[var(--foreground)]">{p.method} · {p.ref}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.date} · {p.user}</div></div>
                  <span className="text-[13px] font-semibold text-[var(--foreground)]">{fmt(p.amount)}</span>
                </div>)}
              </div>
            </div>
            {selected.notes && <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Notes</div>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{selected.notes}</p>
            </div>}
          </div>
        </div>
      </div>
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} title={`Record payment — ${selected.name}`} outstanding={selected.outstanding} />
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Suppliers" subtitle="Manage dealers, distributors and supplier relationships." actions={<><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Supplier</Btn></>} />
        <KpiRow cards={[{ label: "Total Suppliers", value: "48" }, { label: "Active", value: "42" }, { label: "Outstanding Payables", value: "৳ 27,10,000", warn: true }, { label: "Purchases This Month", value: "৳ 48,50,000" }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name, phone or company…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <DropFilter label="Status" /><DropFilter label="Type" /><DropFilter label="Outstanding Balance" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> suppliers</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.suppliers} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No suppliers yet</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Add your first dealer or supplier to start tracking purchases.</div>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Supplier</Btn>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Supplier" }, { label: "Contact" }, { label: "Phone" }, { label: "Products", right: true }, { label: "Purchases", right: true }, { label: "Paid", right: true }, { label: "Outstanding", right: true }, { label: "Last Purchase" }, { label: "Status" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} suppliers</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(s => (
              <tr key={s.id} onClick={() => { setSelected(s); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted-foreground)] shrink-0">{s.name.slice(0, 2).toUpperCase()}</div><div className="font-semibold text-[var(--foreground)] truncate max-w-[160px]">{s.name}</div></div>
                </td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{s.contact}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--muted-foreground)]">{s.phone}</td>
                <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{s.products}</td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(s.totalPurchased)}</td>
                <td className="px-4 py-3 text-right text-[var(--success)]">{fmt(s.totalPaid)}</td>
                <td className="px-4 py-3 text-right">{s.outstanding > 0 ? <span className="text-[var(--warning)] font-semibold">{fmt(s.outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{s.lastPurchase}</td>
                <td className="px-4 py-3"><Badge variant={supplierStatusMap[s.status].v} dot>{supplierStatusMap[s.status].l}</Badge></td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}><button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button></td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 10 — PURCHASES / PROCUREMENT MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type ReceivingStatus = "draft" | "ordered" | "partial" | "received" | "cancelled";
type PurchasePayStatus = "unpaid" | "partial" | "paid";

interface PurchaseItem { name: string; sku: string; qty: number; ordered: number; received: number; unitCost: number; discount: number; }
interface Purchase { id: string; supplier: string; supplierId: number; items: PurchaseItem[]; total: number; paid: number; date: string; receivingStatus: ReceivingStatus; paymentStatus: PurchasePayStatus; notes?: string; }

const recvStatusMap: Record<ReceivingStatus, { v: BadgeVariant; l: string }> = {
  draft: { v: "muted", l: "Draft" }, ordered: { v: "info", l: "Ordered" }, partial: { v: "warning", l: "Partially Received" },
  received: { v: "success", l: "Received" }, cancelled: { v: "error", l: "Cancelled" },
};
const payStatusMap: Record<PurchasePayStatus, { v: BadgeVariant; l: string }> = {
  unpaid: { v: "error", l: "Unpaid" }, partial: { v: "partial", l: "Partially Paid" }, paid: { v: "success", l: "Paid" },
};

const allPurchases: Purchase[] = [
  { id: "PO-2048", supplier: "Walton Distributor — Dhaka", supplierId: 1, items: [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 20, ordered: 20, received: 20, unitCost: 4300, discount: 0 }, { name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", qty: 50, ordered: 50, received: 50, unitCost: 140, discount: 500 }], total: 450000, paid: 400000, date: "4 Sep 2026", receivingStatus: "received", paymentStatus: "partial" },
  { id: "PO-2047", supplier: "Philips Bangladesh Ltd.", supplierId: 2, items: [{ name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 100, ordered: 100, received: 100, unitCost: 100, discount: 0 }, { name: "Philips LED Bulb 7W", sku: "PHI-LED-7W", qty: 80, ordered: 80, received: 80, unitCost: 70, discount: 0 }], total: 180000, paid: 180000, date: "3 Sep 2026", receivingStatus: "received", paymentStatus: "paid" },
  { id: "PO-2046", supplier: "Vision Electronics Dist.", supplierId: 3, items: [{ name: "Vision Table Fan 12\"", sku: "VIS-TF-12", qty: 30, ordered: 30, received: 20, unitCost: 2100, discount: 0 }], total: 320000, paid: 0, date: "1 Sep 2026", receivingStatus: "partial", paymentStatus: "unpaid" },
  { id: "PO-2045", supplier: "Havells Bangladesh", supplierId: 4, items: [{ name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", qty: 60, ordered: 60, received: 60, unitCost: 520, discount: 1200 }], total: 180000, paid: 180000, date: "28 Aug 2026", receivingStatus: "received", paymentStatus: "paid" },
  { id: "PO-2044", supplier: "Super Star Trading", supplierId: 5, items: [{ name: "Super Star LED Tube 36W", sku: "SSL-TUB-36", qty: 50, ordered: 50, received: 0, unitCost: 320, discount: 0 }], total: 160000, paid: 60000, date: "20 Aug 2026", receivingStatus: "ordered", paymentStatus: "partial" },
];

const purchPayments = [
  { date: "4 Sep 2026", ref: "PAY-0091", method: "Cash", amount: 300000 },
  { date: "2 Sep 2026", ref: "PAY-0082", method: "Bank", amount: 100000 },
];
const purchReceiving = [
  { date: "4 Sep 2026", by: "MD. SELIM", product: "Walton Ceiling Fan 56\"", qty: 20 },
  { date: "4 Sep 2026", by: "MD. SELIM", product: "Walton Switch 2 Gang", qty: 50 },
];

type PurchasesView = "list" | "detail" | "new";

function PurchasesPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<PurchasesView>("list");
  const [selected, setSelected] = useState<Purchase | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [receiveOpen, setReceiveOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [filterRecv, setFilterRecv] = useState("all");
  const [filterPay, setFilterPay] = useState("all");

  // New purchase form state
  const [newSupplier, setNewSupplier] = useState(allSuppliers[0]);
  const [newRef, setNewRef] = useState("PO-2049");
  const [newDate, setNewDate] = useState("2026-09-04");
  const [newItems, setNewItems] = useState<PurchaseItem[]>([{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 10, ordered: 10, received: 0, unitCost: 4300, discount: 0 }]);
  const [addingItem, setAddingItem] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const [newPaid, setNewPaid] = useState("");
  const [newPayMethod, setNewPayMethod] = useState("Bank");

  const filtered = allPurchases.filter(p => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || p.id.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q);
    const matchR = filterRecv === "all" || p.receivingStatus === filterRecv;
    const matchP = filterPay === "all" || p.paymentStatus === filterPay;
    return matchQ && matchR && matchP;
  });

  const newSubtotal = newItems.reduce((s, i) => s + i.qty * i.unitCost, 0);
  const newDiscount = newItems.reduce((s, i) => s + i.discount, 0);
  const newTotal = newSubtotal - newDiscount;

  const itemResults = [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", stock: 18, lastCost: 4200 }, { name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", stock: 86, lastCost: 98 }, { name: "Vision Table Fan 12\"", sku: "VIS-TF-12", stock: 24, lastCost: 2050 }].filter(p => p.name.toLowerCase().includes(itemSearch.toLowerCase()) && itemSearch);

  const addItem = (p: typeof itemResults[0]) => { setNewItems(prev => [...prev, { name: p.name, sku: p.sku, qty: 1, ordered: 1, received: 0, unitCost: p.lastCost, discount: 0 }]); setItemSearch(""); setAddingItem(false); };

  // New Purchase view
  if (view === "new") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1000px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Purchases</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">New Purchase</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Supplier */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Supplier</div>
              <div className="flex flex-col gap-1.5 mb-3">
                <select value={newSupplier.id} onChange={e => setNewSupplier(allSuppliers.find(s => s.id === Number(e.target.value)) || allSuppliers[0])} className="h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] text-[var(--foreground)] focus:outline-none focus:border-[var(--foreground)]">
                  {allSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-[var(--muted-foreground)] bg-[var(--secondary)] rounded-lg px-4 py-3">
                <span>{newSupplier.contact} · {newSupplier.phone}</span>
                {newSupplier.outstanding > 0 && <span className="text-[var(--warning)]">Outstanding: {fmt(newSupplier.outstanding)}</span>}
              </div>
            </div>
            {/* Purchase info */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Purchase information</div>
              <div className="grid grid-cols-3 gap-3">
                <Input label="Purchase Reference" value={newRef} onChange={e => setNewRef(e.target.value)} />
                <Input label="Purchase Date" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                <SelectField label="Store" value="Main Store" onChange={() => {}} options={[{ value: "Main Store", label: "Main Store" }]} />
              </div>
            </div>
            {/* Items */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Purchase items</div><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.plus} size={12} />} onClick={() => setAddingItem(true)}>Add Product</Btn></div>
              {/* Item search */}
              {addingItem && (
                <div className="border-b border-[var(--border)] p-4 bg-[var(--secondary)]">
                  <div className="relative">
                    <Input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Search products to add…" iconLeft={<Icon d={icons.search} size={13} />} />
                    {itemResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden">
                        {itemResults.map(p => (
                          <button key={p.sku} onMouseDown={() => addItem(p)} className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[var(--secondary)] transition-colors text-left">
                            <div className="flex-1"><div className="text-[13px] font-medium text-[var(--foreground)]">{p.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.sku} · Stock: {p.stock} · Last cost: {fmt(p.lastCost)}</div></div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Btn variant="ghost" size="sm" className="mt-2" onClick={() => { setAddingItem(false); setItemSearch(""); }}>Cancel</Btn>
                </div>
              )}
              <table className="w-full text-[13px]">
                <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Product", "SKU", "Qty", "Unit Cost (৳)", "Discount (৳)", "Total", ""].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Qty", "Unit Cost (৳)", "Discount (৳)", "Total"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>
                  {newItems.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{item.name}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{item.sku}</td>
                      <td className="px-4 py-3"><input type="number" value={item.qty} onChange={e => setNewItems(p => p.map((x, j) => j === i ? { ...x, qty: Number(e.target.value) || 1, ordered: Number(e.target.value) || 1 } : x))} className="w-16 h-7 text-center rounded border border-[var(--border)] bg-[var(--background)] text-[13px] focus:outline-none focus:border-[var(--foreground)]" /></td>
                      <td className="px-4 py-3"><input type="number" value={item.unitCost} onChange={e => setNewItems(p => p.map((x, j) => j === i ? { ...x, unitCost: Number(e.target.value) || 0 } : x))} className="w-24 h-7 text-right rounded border border-[var(--border)] bg-[var(--background)] text-[13px] px-2 focus:outline-none focus:border-[var(--foreground)]" /></td>
                      <td className="px-4 py-3"><input type="number" value={item.discount} onChange={e => setNewItems(p => p.map((x, j) => j === i ? { ...x, discount: Number(e.target.value) || 0 } : x))} className="w-20 h-7 text-right rounded border border-[var(--border)] bg-[var(--background)] text-[13px] px-2 focus:outline-none focus:border-[var(--foreground)]" /></td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(item.qty * item.unitCost - item.discount)}</td>
                      <td className="px-4 py-3"><button onClick={() => setNewItems(p => p.filter((_, j) => j !== i))} className="text-[var(--muted-foreground)] hover:text-[var(--error)] transition-colors"><Icon d={icons.trash} size={13} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--secondary)]">
                <div className="flex justify-end"><div className="w-56 space-y-1.5 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{fmt(newSubtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(newDiscount)}</span></div>
                  <div className="flex justify-between text-[15px] font-bold border-t border-[var(--border)] pt-2"><span>Grand Total</span><span>{fmt(newTotal)}</span></div>
                </div></div>
              </div>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Initial payment</div>
              <Input label="Amount paid" type="number" value={newPaid} onChange={e => setNewPaid(e.target.value)} placeholder="0" />
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Method</div><div className="flex flex-wrap gap-1.5">{["Cash", "Bank", "bKash", "Nagad"].map(m => <button key={m} onClick={() => setNewPayMethod(m)} className={`px-2.5 py-1 rounded-lg text-[12px] border transition-all ${newPayMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
              {newPaid && <div className="bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-lg px-3 py-2 text-[12px] text-[var(--warning)]">Outstanding: {fmt(newTotal - Number(newPaid))}</div>}
            </div>
            <div className="space-y-2">
              <Btn variant="primary" className="w-full" iconLeft={<Icon d={icons.check} size={14} />} onClick={() => setView("list")}>Save Purchase</Btn>
              <Btn variant="secondary" className="w-full" iconLeft={<Icon d={icons.check} size={14} />} onClick={() => setView("list")}>Save as Draft</Btn>
              <Btn variant="ghost" className="w-full" onClick={() => setView("list")}>Cancel</Btn>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] p-4 text-[12px] text-[var(--muted-foreground)]">
              <span className="inline-block mr-1"><Icon d={icons.info} size={13} /></span>
              Historical purchase prices are preserved per item. Saving this purchase will not overwrite previous cost records.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Purchase detail view
  if (view === "detail" && selected) {
    const outstanding = selected.total - selected.paid;
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Purchases</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-mono font-medium text-[var(--foreground)]">{selected.id}</span>
            <Badge variant={recvStatusMap[selected.receivingStatus].v} dot>{recvStatusMap[selected.receivingStatus].l}</Badge>
            <Badge variant={payStatusMap[selected.paymentStatus].v}>{payStatusMap[selected.paymentStatus].l}</Badge>
            <div className="flex-1" />
            {selected.receivingStatus !== "received" && selected.receivingStatus !== "cancelled" && <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.checkCircle} size={13} />} onClick={() => setReceiveOpen(true)}>Receive Stock</Btn>}
            {outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => setPaymentOpen(true)}>Record Payment</Btn>}
            {selected.receivingStatus !== "cancelled" && <Btn variant="ghost" size="sm" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Info */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Purchase information</div>
                <div className="grid grid-cols-3 gap-4 text-[13px]">
                  {[{ label: "Reference", value: selected.id, mono: true }, { label: "Date", value: selected.date }, { label: "Store", value: "Main Store" }, { label: "Supplier", value: selected.supplier }, { label: "Receiving", value: recvStatusMap[selected.receivingStatus].l }, { label: "Payment", value: payStatusMap[selected.paymentStatus].l }].map(f => (
                    <div key={f.label}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className={`font-medium text-[var(--foreground)] ${f.mono ? "font-mono text-[12px]" : ""}`}>{f.value}</div></div>
                  ))}
                </div>
              </div>
              {/* Items */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Purchase items</div></div>
                <table className="w-full text-[13px]">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Product", "SKU", "Ordered", "Received", "Unit Cost", "Discount", "Total"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Ordered","Received","Unit Cost","Discount","Total"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                  <tbody>{selected.items.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{item.name}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{item.sku}</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">{item.ordered}</td>
                      <td className="px-4 py-3 text-right"><span className={item.received < item.ordered ? "text-[var(--warning)] font-medium" : "text-[var(--success)] font-medium"}>{item.received}</span></td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(item.unitCost)}</td>
                      <td className="px-4 py-3 text-right text-[var(--success)]">{item.discount > 0 ? `−${fmt(item.discount)}` : "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(item.qty * item.unitCost - item.discount)}</td>
                    </tr>
                  ))}</tbody>
                </table>
                <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--secondary)]">
                  <div className="flex justify-end"><div className="w-56 space-y-1.5 text-[13px]">
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{fmt(selected.items.reduce((s, i) => s + i.qty * i.unitCost, 0))}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(selected.items.reduce((s, i) => s + i.discount, 0))}</span></div>
                    <div className="flex justify-between text-[15px] font-bold border-t border-[var(--border)] pt-2"><span>Grand Total</span><span>{fmt(selected.total)}</span></div>
                  </div></div>
                </div>
              </div>
              {/* Receiving history */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Receiving history</div></div>
                <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Date", "Received by", "Product", "Qty"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Qty" ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                  <tbody>{purchReceiving.map((r, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 text-[var(--muted-foreground)]">{r.date}</td><td className="px-4 py-3 text-[var(--foreground)]">{r.by}</td><td className="px-4 py-3 font-medium text-[var(--foreground)]">{r.product}</td><td className="px-4 py-3 text-right text-[var(--success)] font-semibold">+{r.qty}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
            {/* Right */}
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 space-y-2.5 text-[13px]">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">Payment summary</div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Grand Total</span><span className="font-bold text-[var(--foreground)]">{fmt(selected.total)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Paid</span><span className="text-[var(--success)] font-semibold">{fmt(selected.paid)}</span></div>
                {outstanding > 0 && <div className="flex justify-between border-t border-[var(--border)] pt-2"><span className="text-[var(--warning)]">Outstanding payable</span><span className="text-[var(--warning)] font-bold">{fmt(outstanding)}</span></div>}
                {outstanding > 0 && <Btn variant="primary" size="sm" className="w-full mt-2" onClick={() => setPaymentOpen(true)}>Record Payment</Btn>}
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment history</div>
                <div className="space-y-2">
                  {purchPayments.map((p, i) => <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-b-0">
                    <div><div className="text-[12px] font-medium text-[var(--foreground)]">{p.method} · {p.ref}</div><div className="text-[11px] text-[var(--muted-foreground)]">{p.date}</div></div>
                    <span className="text-[13px] font-semibold text-[var(--foreground)]">{fmt(p.amount)}</span>
                  </div>)}
                </div>
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Supplier</div>
                <div className="text-[13px] font-medium text-[var(--foreground)] mb-0.5">{selected.supplier}</div>
                <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" onClick={() => onNavigate("suppliers")}>View supplier →</button>
              </div>
            </div>
          </div>
        </div>
        <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} title={`Record payment — ${selected.id}`} outstanding={selected.total - selected.paid} />
        {/* Receive stock modal */}
        <Modal open={receiveOpen} onClose={() => setReceiveOpen(false)} title="Receive Stock" size="md">
          <div className="space-y-3 mb-4">
            {selected.items.map((item, i) => (
              <div key={i} className="border border-[var(--border)] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div><div className="text-[13px] font-medium text-[var(--foreground)]">{item.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{item.sku}</div></div>
                </div>
                <div className="grid grid-cols-4 gap-3 text-center text-[12px]">
                  {[{ label: "Ordered", value: item.ordered }, { label: "Previously received", value: item.received }, { label: "Remaining", value: item.ordered - item.received }].map(f => (
                    <div key={f.label} className="border border-[var(--border)] rounded-lg p-2"><div className="text-[10px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className="font-bold text-[var(--foreground)]">{f.value}</div></div>
                  ))}
                  <div className="border border-[var(--foreground)]/20 rounded-lg p-2 bg-[var(--secondary)]"><div className="text-[10px] text-[var(--muted-foreground)] mb-0.5">Receive now</div><input type="number" defaultValue={item.ordered - item.received} className="w-full text-center font-bold text-[var(--foreground)] bg-transparent outline-none text-[14px]" /></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[var(--info-bg)] border border-[var(--info-border)] rounded-lg px-4 py-3 text-[12px] text-[var(--info)] mb-4">Confirming receiving will increase inventory by the received quantities.</div>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setReceiveOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setReceiveOpen(false)}>Confirm Receiving</Btn></div>
        </Modal>
        {/* Cancel modal */}
        <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel purchase?" size="sm">
          <p className="text-[13px] text-[var(--muted-foreground)] mb-5">This purchase will be marked as cancelled. Received stock and historical records will remain traceable.</p>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep purchase</Btn><Btn variant="destructive" onClick={() => { setCancelOpen(false); setView("list"); }}>Cancel Purchase</Btn></div>
        </Modal>
      </div>
    );
  }

  // Purchases list
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Purchases" subtitle="Track purchases, stock receiving and supplier payables." actions={<><Btn variant="secondary" size="sm" onClick={() => onNavigate("suppliers")}>Suppliers</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => setView("new")}>New Purchase</Btn></>} />
        <KpiRow cards={[{ label: "This Month", value: "৳ 48,50,000" }, { label: "Pending Receiving", value: "6", warn: true }, { label: "Paid", value: "৳ 41,20,000" }, { label: "Outstanding", value: "৳ 7,30,000", warn: true }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by PO number, supplier or product…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[11px]">
            <span className="px-2 text-[var(--muted-foreground)]">Receiving:</span>
            {["all", "ordered", "partial", "received"].map(f => <FilterChip key={f} label={f === "all" ? "All" : recvStatusMap[f as ReceivingStatus]?.l || f} active={filterRecv === f} onClick={() => setFilterRecv(f)} />)}
          </div>
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[11px]">
            <span className="px-2 text-[var(--muted-foreground)]">Payment:</span>
            {["all", "unpaid", "partial", "paid"].map(f => <FilterChip key={f} label={f === "all" ? "All" : payStatusMap[f as PurchasePayStatus]?.l || f} active={filterPay === f} onClick={() => setFilterPay(f)} />)}
          </div>
          <DropFilter label="Supplier" /><DropFilter label="Date" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> purchases</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.purchases} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No purchases yet</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Record your first purchase from a supplier to begin tracking procurement.</div>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => setView("new")}>New Purchase</Btn>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Purchase" }, { label: "Supplier" }, { label: "Items" }, { label: "Total", right: true }, { label: "Paid", right: true }, { label: "Outstanding", right: true }, { label: "Receiving" }, { label: "Payment" }, { label: "Date" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} purchases</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(p => {
              const outstanding = p.total - p.paid;
              return (
                <tr key={p.id} onClick={() => { setSelected(p); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                  <td className="px-4 py-3 font-mono text-[12px] font-semibold text-[var(--foreground)]">{p.id}</td>
                  <td className="px-4 py-3 text-[var(--foreground)] max-w-[160px] truncate">{p.supplier}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{p.items.reduce((s, i) => s + i.qty, 0)} units</td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.total)}</td>
                  <td className="px-4 py-3 text-right text-[var(--success)]">{fmt(p.paid)}</td>
                  <td className="px-4 py-3 text-right">{outstanding > 0 ? <span className="text-[var(--warning)] font-medium">{fmt(outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                  <td className="px-4 py-3"><Badge variant={recvStatusMap[p.receivingStatus].v} dot>{recvStatusMap[p.receivingStatus].l}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={payStatusMap[p.paymentStatus].v}>{payStatusMap[p.paymentStatus].l}</Badge></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}><button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button></td>
                </tr>
              );
            })}
          </TableWrap>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 11 — SUPPLIER PAYABLES & PAYMENTS
// ══════════════════════════════════════════════════════════════════════════════

type PayableDueStatus = "outstanding" | "paid" | "overdue";
interface SupplierPayable { id: number; name: string; contact: string; phone: string; totalPurchased: number; totalPaid: number; outstanding: number; lastPayment: string; dueStatus: PayableDueStatus; }

const payableDueMap: Record<PayableDueStatus, { v: BadgeVariant; l: string }> = {
  outstanding: { v: "warning", l: "Outstanding" }, paid: { v: "success", l: "Paid" }, overdue: { v: "error", l: "Overdue" },
};

const supplierPayables: SupplierPayable[] = [
  { id: 1, name: "Walton Distributor — Dhaka", contact: "Abdul Karim", phone: "01712 345678", totalPurchased: 1850000, totalPaid: 1600000, outstanding: 250000, lastPayment: "2 Sep 2026", dueStatus: "outstanding" },
  { id: 2, name: "Philips Bangladesh Ltd.", contact: "Rahman Ahmed", phone: "01812 456789", totalPurchased: 920000, totalPaid: 920000, outstanding: 0, lastPayment: "28 Aug 2026", dueStatus: "paid" },
  { id: 3, name: "Vision Electronics Dist.", contact: "Mizanur Rahman", phone: "01911 567890", totalPurchased: 680000, totalPaid: 360000, outstanding: 320000, lastPayment: "1 Sep 2026", dueStatus: "overdue" },
  { id: 4, name: "Havells Bangladesh", contact: "Tariq Islam", phone: "01611 678901", totalPurchased: 450000, totalPaid: 450000, outstanding: 0, lastPayment: "15 Aug 2026", dueStatus: "paid" },
  { id: 5, name: "Super Star Trading", contact: "Nurul Haque", phone: "01511 789012", totalPurchased: 380000, totalPaid: 280000, outstanding: 100000, lastPayment: "20 Aug 2026", dueStatus: "outstanding" },
];

const supplierStatement = [
  { date: "4 Sep 2026", ref: "PO-2048", type: "Purchase", debit: 450000, credit: 0, balance: 450000 },
  { date: "4 Sep 2026", ref: "PAY-0091", type: "Payment", debit: 0, credit: 300000, balance: 150000 },
  { date: "2 Sep 2026", ref: "PAY-0082", type: "Payment", debit: 0, credit: 100000, balance: 50000 },
  { date: "28 Aug 2026", ref: "PO-2031", type: "Purchase", debit: 280000, credit: 0, balance: 330000 },
  { date: "28 Aug 2026", ref: "PAY-0078", type: "Payment", debit: 0, credit: 280000, balance: 50000 },
];

function SupplierPayablesPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<"list" | "statement">("list");
  const [selected, setSelected] = useState<SupplierPayable | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [payTarget, setPayTarget] = useState<SupplierPayable | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Bank");
  const [payRef, setPayRef] = useState("");
  const [payNotes, setPayNotes] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = supplierPayables.filter(s => {
    const q = searchQ.toLowerCase();
    const mQ = !q || s.name.toLowerCase().includes(q) || s.phone.includes(q);
    const mS = filterStatus === "All" || s.dueStatus === filterStatus.toLowerCase();
    return mQ && mS;
  });

  const openPay = (s: SupplierPayable) => { setPayTarget(s); setPayAmount(""); setPayRef(""); setPayNotes(""); setPayMethod("Bank"); setPaySuccess(false); setPayOpen(true); };
  const payAmtNum = Number(payAmount) || 0;
  const payExceeds = payTarget ? payAmtNum > payTarget.outstanding : false;
  const remaining = payTarget ? payTarget.outstanding - payAmtNum : 0;

  if (view === "statement" && selected) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1000px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Payables</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)] truncate">{selected.name}</span>
          <Badge variant={payableDueMap[selected.dueStatus].v} dot>{payableDueMap[selected.dueStatus].l}</Badge>
          <div className="flex-1" />
          {selected.outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => openPay(selected)}>Record Payment</Btn>}
          <Btn variant="secondary" size="sm" onClick={() => onNavigate("suppliers")}>View Supplier</Btn>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Financial summary */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Account summary</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ label: "Total Purchases", value: fmt(selected.totalPurchased) }, { label: "Total Paid", value: fmt(selected.totalPaid) }, { label: "Outstanding Payable", value: fmt(selected.outstanding), warn: selected.outstanding > 0 }].map(f => (
                  <div key={f.label} className="border border-[var(--border)] rounded-lg p-4">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</div>
                    <div className={`text-[16px] font-bold ${f.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Statement */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
                <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Account statement</div>
                <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Export</button>
              </div>
              <table className="w-full text-[13px]">
                <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  {["Date", "Reference", "Type", "Debit", "Credit", "Balance"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Debit","Credit","Balance"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {supplierStatement.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-3">
                        <button className="font-mono text-[12px] text-[var(--foreground)] hover:underline" onClick={() => onNavigate(row.type === "Purchase" ? "purchases" : "suppliers")}>{row.ref}</button>
                      </td>
                      <td className="px-4 py-3"><Badge variant={row.type === "Purchase" ? "default" : "success"}>{row.type}</Badge></td>
                      <td className="px-4 py-3 text-right">{row.debit > 0 ? <span className="text-[var(--foreground)] font-medium">{fmt(row.debit)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-right">{row.credit > 0 ? <span className="text-[var(--success)] font-medium">{fmt(row.credit)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-[var(--border)] px-5 py-3 bg-[var(--secondary)] flex justify-end">
                <div className="flex items-center gap-8 text-[13px]">
                  <div className="text-[var(--muted-foreground)]">Total debits: <span className="font-semibold text-[var(--foreground)]">{fmt(supplierStatement.reduce((s, r) => s + r.debit, 0))}</span></div>
                  <div className="text-[var(--muted-foreground)]">Total credits: <span className="font-semibold text-[var(--success)]">{fmt(supplierStatement.reduce((s, r) => s + r.credit, 0))}</span></div>
                  <div className="text-[var(--muted-foreground)]">Current balance: <span className={`font-bold ${selected.outstanding > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(selected.outstanding)}</span></div>
                </div>
              </div>
            </div>
            {/* Payment history */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Payment history</div></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Date","Reference","Amount","Method","Recorded by"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Amount" ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{supplierPayments.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td><td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{p.ref}</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.amount)}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.method}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.user}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          {/* Right panel */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Contact</div>
              <div className="space-y-2 text-[13px]">
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Contact person</div><div className="font-medium text-[var(--foreground)]">{selected.contact}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Phone</div><div className="font-medium text-[var(--foreground)]">{selected.phone}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Last payment</div><div className="text-[var(--foreground)]">{selected.lastPayment}</div></div>
              </div>
            </div>
            {selected.dueStatus === "overdue" && (
              <div className="border border-[var(--warning-border)] bg-[var(--warning-bg)] rounded-xl p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--warning)] mb-2">Overdue</div>
                <div className="text-[13px] text-[var(--foreground)]">Outstanding: <span className="font-bold">{fmt(selected.outstanding)}</span></div>
                <div className="text-[12px] text-[var(--muted-foreground)] mt-1">Due date: 31 Aug 2026</div>
              </div>
            )}
            {selected.outstanding > 0 && (
              <Btn variant="primary" className="w-full" onClick={() => openPay(selected)}>Record Payment</Btn>
            )}
          </div>
        </div>
      </div>
      {/* Payment modal */}
      <Modal open={payOpen} onClose={() => setPayOpen(false)} title={paySuccess ? "Payment recorded" : "Record supplier payment"} size="sm">
        {paySuccess && payTarget ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-4"><Icon d={icons.checkCircle} size={22} /></div>
            <div className="text-[15px] font-semibold text-[var(--foreground)] mb-1">Payment recorded</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">{payTarget.name}</div>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 text-[13px] mb-5">
              <div className="flex justify-between mb-1"><span className="text-[var(--muted-foreground)]">Amount paid</span><span className="font-bold text-[var(--foreground)]">{fmt(payAmtNum)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Remaining payable</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(remaining)}</span></div>
            </div>
            <div className="flex gap-2"><Btn variant="secondary" className="flex-1" onClick={() => { setPayOpen(false); setView("statement"); }}>View Statement</Btn><Btn variant="primary" className="flex-1" onClick={() => setPayOpen(false)}>Done</Btn></div>
          </div>
        ) : payTarget ? (
          <>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between">
              <div><div className="text-[13px] font-medium text-[var(--foreground)]">{payTarget.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{payTarget.contact}</div></div>
              <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Outstanding</div><div className="text-[16px] font-bold text-[var(--warning)]">{fmt(payTarget.outstanding)}</div></div>
            </div>
            <div className="space-y-3">
              <Input label="Payment amount (৳)" type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="0" error={payExceeds ? "Payment exceeds outstanding balance." : undefined} />
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-1.5">{["Cash","Bank","bKash","Nagad","Other"].map(m => <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg border text-[12px] transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
              <Input label="Reference" value={payRef} onChange={e => setPayRef(e.target.value)} placeholder="e.g. TRX-123456" />
              <Input label="Notes (optional)" value={payNotes} onChange={e => setPayNotes(e.target.value)} placeholder="Optional" />
            </div>
            {payAmount && !payExceeds && (
              <div className="mt-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 flex justify-between text-[13px]">
                <span className="text-[var(--muted-foreground)]">Remaining after payment</span>
                <span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(remaining)}</span>
              </div>
            )}
            <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setPayOpen(false)}>Cancel</Btn><Btn variant="primary" disabled={!payAmount || payExceeds} onClick={() => setPaySuccess(true)}>Record Payment</Btn></div>
          </>
        ) : null}
      </Modal>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Supplier Payables" subtitle="Track outstanding supplier balances and payments." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => openPay(supplierPayables[0])}>Record Payment</Btn></>} />
        <KpiRow cards={[{ label: "Total Payables", value: "৳ 27,10,000", warn: true }, { label: "Due This Month", value: "৳ 8,50,000" }, { label: "Paid This Month", value: "৳ 41,20,000" }, { label: "Overdue", value: "৳ 3,20,000", err: true }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search suppliers…" iconLeft={<Icon d={icons.search} size={13} />} className="w-64" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Outstanding","Paid","Overdue"].map(f => <FilterChip key={f} label={f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />)}
          </div>
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> suppliers</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--success)]"><Icon d={icons.checkCircle} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No outstanding supplier payments</div>
            <div className="text-[13px] text-[var(--muted-foreground)]">All supplier balances are currently settled.</div>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Supplier" }, { label: "Total Purchases", right: true }, { label: "Paid", right: true }, { label: "Outstanding", right: true }, { label: "Last Payment" }, { label: "Status" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} suppliers</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(s => (
              <tr key={s.id} onClick={() => { setSelected(s); setView("statement"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted-foreground)] shrink-0">{s.name.slice(0,2).toUpperCase()}</div><div><div className="font-semibold text-[var(--foreground)]">{s.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{s.contact} · {s.phone}</div></div></div>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(s.totalPurchased)}</td>
                <td className="px-4 py-3 text-right text-[var(--success)]">{fmt(s.totalPaid)}</td>
                <td className="px-4 py-3 text-right">{s.outstanding > 0 ? <span className={`font-bold ${s.dueStatus === "overdue" ? "text-[var(--error)]" : "text-[var(--warning)]"}`}>{fmt(s.outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{s.lastPayment}</td>
                <td className="px-4 py-3"><Badge variant={payableDueMap[s.dueStatus].v} dot>{payableDueMap[s.dueStatus].l}</Badge></td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  {s.outstanding > 0 && <button onClick={() => openPay(s)} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">Pay →</button>}
                </td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
      <Modal open={payOpen && !selected} onClose={() => setPayOpen(false)} title={paySuccess ? "Payment recorded" : "Record supplier payment"} size="sm">
        {paySuccess && payTarget ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-4"><Icon d={icons.checkCircle} size={22} /></div>
            <div className="text-[15px] font-semibold text-[var(--foreground)] mb-1">Payment recorded</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">{payTarget.name}</div>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 text-[13px] mb-5">
              <div className="flex justify-between mb-1"><span className="text-[var(--muted-foreground)]">Amount paid</span><span className="font-bold text-[var(--foreground)]">{fmt(payAmtNum)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Remaining payable</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(remaining)}</span></div>
            </div>
            <div className="flex gap-2"><Btn variant="secondary" className="flex-1" onClick={() => { setPayOpen(false); setSelected(supplierPayables.find(x => x.id === payTarget.id) || null); setView("statement"); }}>View Statement</Btn><Btn variant="primary" className="flex-1" onClick={() => setPayOpen(false)}>Done</Btn></div>
          </div>
        ) : payTarget ? (
          <>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between">
              <div><div className="text-[13px] font-medium text-[var(--foreground)]">{payTarget.name}</div><div className="text-[11px] text-[var(--muted-foreground)]">{payTarget.contact}</div></div>
              <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Outstanding</div><div className="text-[16px] font-bold text-[var(--warning)]">{fmt(payTarget.outstanding)}</div></div>
            </div>
            <div className="space-y-3">
              <Input label="Payment amount (৳)" type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="0" error={payExceeds ? "Payment exceeds outstanding balance." : undefined} />
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-1.5">{["Cash","Bank","bKash","Nagad","Other"].map(m => <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg border text-[12px] transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
              <Input label="Reference" value={payRef} onChange={e => setPayRef(e.target.value)} placeholder="e.g. TRX-123456" />
            </div>
            {payAmount && !payExceeds && <div className="mt-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Remaining after payment</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(remaining)}</span></div>}
            <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setPayOpen(false)}>Cancel</Btn><Btn variant="primary" disabled={!payAmount || payExceeds} onClick={() => setPaySuccess(true)}>Record Payment</Btn></div>
          </>
        ) : null}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 12 — CUSTOMER MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type CustomerStatus = "active" | "inactive";
type CustomerType = "Regular" | "Business";
interface Customer {
  id: number; customerId: string; name: string; phone: string; email?: string;
  address?: string; city?: string; area?: string; postalCode?: string; addressType?: string;
  type: CustomerType; orders: number; totalSpent: number; totalPaid: number;
  outstanding: number; lastPurchase: string; status: CustomerStatus; notes?: string;
}

const custStatusMap: Record<CustomerStatus, { v: BadgeVariant; l: string }> = {
  active: { v: "success", l: "Active" }, inactive: { v: "muted", l: "Inactive" },
};

const allCustomers: Customer[] = [
  { id: 1, customerId: "CUS-002841", name: "Rahim Electronics", phone: "01712 345678", email: "rahim@email.com", address: "House 12, Road 4", city: "Dhaka", area: "Mirpur", postalCode: "1216", addressType: "Business", type: "Business", orders: 84, totalSpent: 1850000, totalPaid: 1837700, outstanding: 12300, lastPurchase: "4 Sep 2026", status: "active", notes: "Regular business client. Usually pays within 7 days." },
  { id: 2, customerId: "CUS-002840", name: "Nusrat Jahan", phone: "01812 456789", email: "", address: "Flat 3A, Block C", city: "Dhaka", area: "Dhanmondi", postalCode: "1209", addressType: "Home", type: "Regular", orders: 12, totalSpent: 48500, totalPaid: 48500, outstanding: 0, lastPurchase: "3 Sep 2026", status: "active" },
  { id: 3, customerId: "CUS-002839", name: "City Electric House", phone: "01912 567890", email: "city@email.com", address: "78 Main Road", city: "Chittagong", area: "Agrabad", postalCode: "4100", addressType: "Business", type: "Business", orders: 46, totalSpent: 720000, totalPaid: 691500, outstanding: 28500, lastPurchase: "1 Sep 2026", status: "active" },
  { id: 4, customerId: "CUS-002838", name: "Karim Traders", phone: "01611 678901", email: "", address: "Plot 5", city: "Dhaka", area: "Uttara", postalCode: "1230", addressType: "Business", type: "Business", orders: 23, totalSpent: 340000, totalPaid: 340000, outstanding: 0, lastPurchase: "28 Aug 2026", status: "active" },
  { id: 5, customerId: "CUS-002837", name: "Mohammad Hasan", phone: "01511 789012", email: "", address: "", city: "Dhaka", area: "Mohammadpur", postalCode: "1207", addressType: "Home", type: "Regular", orders: 4, totalSpent: 18600, totalPaid: 18600, outstanding: 0, lastPurchase: "20 Aug 2026", status: "inactive" },
];

const custPurchaseHistory = [
  { ref: "SE-20483", date: "4 Sep 2026", items: 3, total: 8450, paid: 8450, due: 0, status: "paid" as SaleStatus },
  { ref: "SE-20420", date: "29 Aug 2026", items: 5, total: 12300, paid: 0, due: 12300, status: "due" as SaleStatus },
  { ref: "SE-20381", date: "14 Aug 2026", items: 2, total: 5200, paid: 5200, due: 0, status: "paid" as SaleStatus },
];
const custPaymentHistory = [
  { date: "4 Sep 2026", ref: "PAY-C-0081", amount: 5000, method: "Cash", remaining: 7300 },
  { date: "28 Aug 2026", ref: "PAY-C-0074", amount: 8450, method: "bKash", remaining: 0 },
];

type CustomerView = "list" | "detail" | "form";

function CustomersPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<CustomerView>("list");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "Regular", address: "", city: "", area: "", postalCode: "", notes: "", status: "active" });

  const filtered = allCustomers.filter(c => {
    const q = searchQ.toLowerCase();
    const mQ = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.customerId.toLowerCase().includes(q);
    const mS = filterStatus === "All" || c.status === filterStatus.toLowerCase();
    const mT = filterType === "All" || c.type === filterType;
    return mQ && mS && mT;
  });

  const ff = (f: string) => (v: string) => setForm(p => ({ ...p, [f]: v }));
  const openAdd = () => { setFormMode("add"); setForm({ name: "", phone: "", email: "", type: "Regular", address: "", city: "", area: "", postalCode: "", notes: "", status: "active" }); setView("form"); };
  const openEdit = (c: Customer) => { setFormMode("edit"); setSelected(c); setForm({ name: c.name, phone: c.phone, email: c.email || "", type: c.type, address: c.address || "", city: c.city || "", area: c.area || "", postalCode: c.postalCode || "", notes: c.notes || "", status: c.status }); setView("form"); };

  if (view === "form") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[800px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Customers</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{formMode === "add" ? "Add Customer" : "Edit Customer"}</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Customer information</div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" value={form.name} onChange={e => ff("name")(e.target.value)} placeholder="Customer or company name" />
                <SelectField label="Customer Type" value={form.type} onChange={ff("type")} options={[{ value: "Regular", label: "Regular" }, { value: "Business", label: "Business" }]} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Phone" value={form.phone} onChange={e => ff("phone")(e.target.value)} placeholder="01712 345678" />
                <Input label="Email" type="email" value={form.email} onChange={e => ff("email")(e.target.value)} placeholder="Optional" />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Address</div>
              <Input label="Street address" value={form.address} onChange={e => ff("address")(e.target.value)} placeholder="House/building, road" />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Area" value={form.area} onChange={e => ff("area")(e.target.value)} placeholder="e.g. Mirpur" />
                <Input label="City" value={form.city} onChange={e => ff("city")(e.target.value)} placeholder="e.g. Dhaka" />
                <Input label="Postal code" value={form.postalCode} onChange={e => ff("postalCode")(e.target.value)} placeholder="1216" />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Internal notes</div>
              <textarea value={form.notes} onChange={e => ff("notes")(e.target.value)} rows={3} placeholder="Optional internal notes…" className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Status</div>
              <SelectField value={form.status} onChange={ff("status")} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
            </div>
            {formMode === "add" && (
              <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] p-4 text-[12px] text-[var(--muted-foreground)]">
                Customer ID will be generated automatically (e.g. CUS-002842).
              </div>
            )}
            <div className="space-y-2">
              <Btn variant="primary" className="w-full" onClick={() => setView("list")} iconLeft={<Icon d={icons.check} size={14} />}>{formMode === "add" ? "Add Customer" : "Save Changes"}</Btn>
              <Btn variant="secondary" className="w-full" onClick={() => setView("list")}>Cancel</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === "detail" && selected) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Customers</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{selected.name}</span>
          <Badge variant={custStatusMap[selected.status].v} dot>{custStatusMap[selected.status].l}</Badge>
          <Badge variant="default">{selected.type}</Badge>
          <div className="flex-1" />
          {selected.outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => { setPayOpen(true); }}>Record Payment</Btn>}
          <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.sliders} size={13} />} onClick={() => openEdit(selected)}>Edit</Btn>
          <Btn variant="ghost" size="sm" onClick={() => setDeactivateOpen(true)}>Deactivate</Btn>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Financial summary</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ label: "Total Purchases", value: fmt(selected.totalSpent) }, { label: "Total Paid", value: fmt(selected.totalPaid) }, { label: "Outstanding", value: fmt(selected.outstanding), warn: selected.outstanding > 0 }].map(f => (
                  <div key={f.label} className="border border-[var(--border)] rounded-lg p-4">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</div>
                    <div className={`text-[15px] font-bold ${f.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Purchase history */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Purchase history</div><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]" onClick={() => onNavigate("sales")}>View all →</button></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Reference","Date","Items","Total","Paid","Due","Status"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Total","Paid","Due"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{custPurchaseHistory.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors cursor-pointer" onClick={() => onNavigate("sales")}><td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{p.ref}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.items} items</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.total)}</td><td className="px-4 py-3 text-right text-[var(--success)]">{fmt(p.paid)}</td><td className="px-4 py-3 text-right">{p.due > 0 ? <span className="text-[var(--warning)] font-medium">{fmt(p.due)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td><td className="px-4 py-3"><Badge variant={salesStatusBadge[p.status].v} dot>{salesStatusBadge[p.status].l}</Badge></td></tr>)}</tbody>
              </table>
            </div>
            {/* Payment history */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Payment history</div></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Date","Reference","Amount","Method","Remaining Due"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Amount","Remaining Due"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{custPaymentHistory.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td><td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{p.ref}</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.amount)}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.method}</td><td className="px-4 py-3 text-right">{p.remaining > 0 ? <span className="text-[var(--warning)]">{fmt(p.remaining)}</span> : <span className="text-[var(--success)]">Settled</span>}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          {/* Right panel */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Contact information</div>
              <div className="space-y-2.5 text-[13px]">
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Customer ID</div><div className="font-mono font-medium text-[var(--foreground)]">{selected.customerId}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Phone</div><div className="font-medium text-[var(--foreground)]">{selected.phone}</div></div>
                {selected.email && <div><div className="text-[11px] text-[var(--muted-foreground)]">Email</div><div className="text-[var(--foreground)]">{selected.email}</div></div>}
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Type</div><div className="text-[var(--foreground)]">{selected.type}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Member since</div><div className="text-[var(--foreground)]">Jan 2024</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Total orders</div><div className="font-medium text-[var(--foreground)]">{selected.orders} orders</div></div>
              </div>
            </div>
            {selected.address && (
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Address</div>
                <div className="text-[13px] text-[var(--foreground)]">{selected.address}</div>
                <div className="text-[13px] text-[var(--muted-foreground)]">{selected.area}, {selected.city} {selected.postalCode}</div>
                <div className="text-[11px] text-[var(--muted-foreground)] mt-1">{selected.addressType}</div>
              </div>
            )}
            {selected.notes && (
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Notes</div>
                <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{selected.notes}</p>
              </div>
            )}
            <Btn variant="secondary" className="w-full" size="sm" onClick={() => onNavigate("customer-dues")}>View Due Statement</Btn>
          </div>
        </div>
      </div>
      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} title={`Record payment — ${selected.name}`} outstanding={selected.outstanding} />
      <Modal open={deactivateOpen} onClose={() => setDeactivateOpen(false)} title="Deactivate customer?" size="sm">
        <p className="text-[13px] text-[var(--muted-foreground)] mb-5">The customer will no longer be available for new transactions, but historical records will remain available.</p>
        <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setDeactivateOpen(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => { setDeactivateOpen(false); setView("list"); }}>Deactivate</Btn></div>
      </Modal>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Customers" subtitle="Manage customer profiles, purchase history and outstanding balances." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Customer</Btn></>} />
        <KpiRow cards={[{ label: "Total Customers", value: "2,840" }, { label: "Active", value: "2,610" }, { label: "Customers with Due", value: "184", warn: true }, { label: "Outstanding Dues", value: "৳ 34,10,200", warn: true }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name, phone or customer ID…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Active","Inactive"].map(f => <FilterChip key={f} label={f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />)}
          </div>
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Regular","Business"].map(f => <FilterChip key={f} label={f} active={filterType === f} onClick={() => setFilterType(f)} />)}
          </div>
          <DropFilter label="Outstanding" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> customers</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.customers} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No customers found</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Add a customer or change your search and filters.</div>
            <div className="flex gap-2 justify-center"><Btn variant="secondary" size="sm" onClick={() => { setSearchQ(""); setFilterStatus("All"); setFilterType("All"); }}>Clear Filters</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Customer</Btn></div>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Customer" }, { label: "Phone" }, { label: "Type" }, { label: "Orders", right: true }, { label: "Total Spent", right: true }, { label: "Outstanding", right: true }, { label: "Last Purchase" }, { label: "Status" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} of 2,840 customers</span><Pagination total={2840} /></>}
          >
            {filtered.map(c => (
              <tr key={c.id} onClick={() => { setSelected(c); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted-foreground)] shrink-0">{c.name.slice(0,2).toUpperCase()}</div><div><div className="font-semibold text-[var(--foreground)]">{c.name}</div><div className="font-mono text-[10px] text-[var(--muted-foreground)]">{c.customerId}</div></div></div>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--muted-foreground)]">{c.phone}</td>
                <td className="px-4 py-3"><Badge variant="default">{c.type}</Badge></td>
                <td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{c.orders}</td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(c.totalSpent)}</td>
                <td className="px-4 py-3 text-right">{c.outstanding > 0 ? <span className="text-[var(--warning)] font-semibold">{fmt(c.outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{c.lastPurchase}</td>
                <td className="px-4 py-3"><Badge variant={custStatusMap[c.status].v} dot>{custStatusMap[c.status].l}</Badge></td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}><button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button></td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 13 — CUSTOMER DUES & COLLECTIONS
// ══════════════════════════════════════════════════════════════════════════════

type DueStatus = "outstanding" | "paid" | "overdue";
interface CustomerDue { id: number; customerId: string; name: string; phone: string; type: CustomerType; totalPurchases: number; totalPaid: number; outstanding: number; lastPayment: string; dueStatus: DueStatus; }

const dueStatusMap: Record<DueStatus, { v: BadgeVariant; l: string }> = {
  outstanding: { v: "warning", l: "Outstanding" }, paid: { v: "success", l: "Paid" }, overdue: { v: "error", l: "Overdue" },
};

const customerDues: CustomerDue[] = [
  { id: 1, customerId: "CUS-002841", name: "Rahim Electronics", phone: "01712 345678", type: "Business", totalPurchases: 1850000, totalPaid: 1837700, outstanding: 12300, lastPayment: "4 Sep 2026", dueStatus: "outstanding" },
  { id: 2, customerId: "CUS-002839", name: "City Electric House", phone: "01912 567890", type: "Business", totalPurchases: 720000, totalPaid: 691500, outstanding: 28500, lastPayment: "1 Sep 2026", dueStatus: "overdue" },
  { id: 3, customerId: "CUS-002840", name: "Nusrat Jahan", phone: "01812 456789", type: "Regular", totalPurchases: 48500, totalPaid: 48500, outstanding: 0, lastPayment: "3 Sep 2026", dueStatus: "paid" },
  { id: 4, customerId: "CUS-002835", name: "Al-Amin Hardware", phone: "01711 234567", type: "Business", totalPurchases: 285000, totalPaid: 248000, outstanding: 37000, lastPayment: "25 Aug 2026", dueStatus: "overdue" },
  { id: 5, customerId: "CUS-002820", name: "Farid Traders", phone: "01612 345678", type: "Business", totalPurchases: 420000, totalPaid: 405800, outstanding: 14200, lastPayment: "28 Aug 2026", dueStatus: "outstanding" },
];

const custStatement = [
  { date: "29 Aug 2026", ref: "SE-20420", type: "Sale", debit: 12300, credit: 0, balance: 12300 },
  { date: "4 Sep 2026", ref: "PAY-C-0081", type: "Payment", debit: 0, credit: 5000, balance: 7300 },
  { date: "4 Sep 2026", ref: "SE-20483", type: "Sale", debit: 8450, credit: 0, balance: 15750 },
  { date: "4 Sep 2026", ref: "PAY-C-0082", type: "Payment", debit: 0, credit: 3450, balance: 12300 },
];

const custDuePayments = [
  { date: "4 Sep 2026", ref: "PAY-C-0081", amount: 5000, method: "Cash", recordedBy: "MD. SELIM" },
  { date: "4 Sep 2026", ref: "PAY-C-0082", amount: 3450, method: "bKash", recordedBy: "Mahbub" },
];

function CustomerDuesPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<"list" | "statement">("list");
  const [selected, setSelected] = useState<CustomerDue | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [payTarget, setPayTarget] = useState<CustomerDue | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Cash");
  const [payRef, setPayRef] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = customerDues.filter(c => {
    const q = searchQ.toLowerCase();
    const mQ = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.customerId.toLowerCase().includes(q);
    const mS = filterStatus === "All" || c.dueStatus === filterStatus.toLowerCase();
    return mQ && mS;
  });

  const openPay = (c: CustomerDue) => { setPayTarget(c); setPayAmount(""); setPayRef(""); setPayMethod("Cash"); setPaySuccess(false); setPayOpen(true); };
  const payAmtNum = Number(payAmount) || 0;
  const payExceeds = payTarget ? payAmtNum > payTarget.outstanding : false;
  const remaining = payTarget ? payTarget.outstanding - payAmtNum : 0;

  if (view === "statement" && selected) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1000px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Customer Dues</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{selected.name}</span>
          <Badge variant={dueStatusMap[selected.dueStatus].v} dot>{dueStatusMap[selected.dueStatus].l}</Badge>
          <div className="flex-1" />
          {selected.outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => openPay(selected)}>Record Payment</Btn>}
          <Btn variant="secondary" size="sm" onClick={() => onNavigate("customers")}>View Customer</Btn>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Summary */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Account summary</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[{ label: "Total Purchases", value: fmt(selected.totalPurchases) }, { label: "Total Paid", value: fmt(selected.totalPaid) }, { label: "Outstanding Due", value: fmt(selected.outstanding), warn: selected.outstanding > 0 }].map(f => (
                  <div key={f.label} className="border border-[var(--border)] rounded-lg p-4">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{f.label}</div>
                    <div className={`text-[16px] font-bold ${f.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Statement */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between items-center">
                <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Customer statement</div>
                <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Export</button>
              </div>
              <table className="w-full text-[13px]">
                <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                  {["Date","Reference","Type","Debit","Credit","Balance"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Debit","Credit","Balance"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {custStatement.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-3"><button className="font-mono text-[12px] text-[var(--foreground)] hover:underline" onClick={() => onNavigate(row.type === "Sale" ? "sales" : "customers")}>{row.ref}</button></td>
                      <td className="px-4 py-3"><Badge variant={row.type === "Sale" ? "default" : "success"}>{row.type}</Badge></td>
                      <td className="px-4 py-3 text-right">{row.debit > 0 ? <span className="text-[var(--foreground)] font-medium">{fmt(row.debit)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-right">{row.credit > 0 ? <span className="text-[var(--success)] font-medium">{fmt(row.credit)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-[var(--border)] px-5 py-3 bg-[var(--secondary)] flex justify-end">
                <div className="flex items-center gap-8 text-[13px]">
                  <div className="text-[var(--muted-foreground)]">Total sales: <span className="font-semibold text-[var(--foreground)]">{fmt(custStatement.reduce((s, r) => s + r.debit, 0))}</span></div>
                  <div className="text-[var(--muted-foreground)]">Total received: <span className="font-semibold text-[var(--success)]">{fmt(custStatement.reduce((s, r) => s + r.credit, 0))}</span></div>
                  <div className="text-[var(--muted-foreground)]">Current due: <span className={`font-bold ${selected.outstanding > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{fmt(selected.outstanding)}</span></div>
                </div>
              </div>
            </div>
            {/* Payment history */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Payment history</div></div>
              <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Date","Reference","Amount","Method","Recorded by"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Amount" ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>{custDuePayments.map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.date}</td><td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{p.ref}</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.amount)}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.method}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">{p.recordedBy}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          {/* Right panel */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Customer</div>
              <div className="space-y-2 text-[13px]">
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Customer ID</div><div className="font-mono font-medium text-[var(--foreground)]">{selected.customerId}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Phone</div><div className="font-medium text-[var(--foreground)]">{selected.phone}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Type</div><div className="text-[var(--foreground)]">{selected.type}</div></div>
                <div><div className="text-[11px] text-[var(--muted-foreground)]">Last payment</div><div className="text-[var(--foreground)]">{selected.lastPayment}</div></div>
              </div>
            </div>
            {selected.dueStatus === "overdue" && (
              <div className="border border-[var(--warning-border)] bg-[var(--warning-bg)] rounded-xl p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--warning)] mb-2">Overdue</div>
                <div className="text-[13px] text-[var(--foreground)]">Outstanding: <span className="font-bold">{fmt(selected.outstanding)}</span></div>
                <div className="text-[12px] text-[var(--muted-foreground)] mt-1">Due date: 31 Aug 2026</div>
              </div>
            )}
            {selected.outstanding > 0 && <Btn variant="primary" className="w-full" onClick={() => openPay(selected)}>Record Payment</Btn>}
          </div>
        </div>
      </div>
      {/* Payment modal */}
      <Modal open={payOpen} onClose={() => setPayOpen(false)} title={paySuccess ? "Payment recorded" : "Record customer payment"} size="sm">
        {paySuccess && payTarget ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-4"><Icon d={icons.checkCircle} size={22} /></div>
            <div className="text-[15px] font-semibold text-[var(--foreground)] mb-1">Payment recorded</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">{payTarget.name}</div>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 text-[13px] mb-5">
              <div className="flex justify-between mb-1"><span className="text-[var(--muted-foreground)]">Received</span><span className="font-bold text-[var(--foreground)]">{fmt(payAmtNum)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Remaining due</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{remaining > 0 ? fmt(remaining) : "Settled"}</span></div>
            </div>
            <div className="flex gap-2"><Btn variant="secondary" className="flex-1" onClick={() => { setPayOpen(false); }}>View Statement</Btn><Btn variant="primary" className="flex-1" onClick={() => setPayOpen(false)}>Done</Btn></div>
          </div>
        ) : payTarget ? (
          <>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between">
              <div><div className="text-[13px] font-medium text-[var(--foreground)]">{payTarget.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{payTarget.customerId}</div></div>
              <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Outstanding due</div><div className="text-[16px] font-bold text-[var(--warning)]">{fmt(payTarget.outstanding)}</div></div>
            </div>
            <div className="space-y-3">
              <Input label="Payment amount (৳)" type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="0" error={payExceeds ? "Payment exceeds outstanding due." : undefined} />
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-1.5">{["Cash","Bank","bKash","Nagad","Other"].map(m => <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg border text-[12px] transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
              <Input label="Reference" value={payRef} onChange={e => setPayRef(e.target.value)} placeholder="e.g. PAY-C-0083" />
            </div>
            {payAmount && !payExceeds && <div className="mt-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Remaining after payment</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{remaining > 0 ? fmt(remaining) : "Settled"}</span></div>}
            <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setPayOpen(false)}>Cancel</Btn><Btn variant="primary" disabled={!payAmount || payExceeds} onClick={() => setPaySuccess(true)}>Record Payment</Btn></div>
          </>
        ) : null}
      </Modal>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Customer Dues" subtitle="Track outstanding customer balances and collections." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => customerDues[0].outstanding > 0 && openPay(customerDues[0])}>Record Payment</Btn></>} />
        <KpiRow cards={[{ label: "Total Outstanding", value: "৳ 34,10,200", warn: true }, { label: "Due Customers", value: "184", warn: true }, { label: "Collected This Month", value: "৳ 12,80,000" }, { label: "Overdue", value: "৳ 4,20,000", err: true }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search customers…" iconLeft={<Icon d={icons.search} size={13} />} className="w-64" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Outstanding","Paid","Overdue"].map(f => <FilterChip key={f} label={f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />)}
          </div>
          <DropFilter label="Customer Type" /><DropFilter label="Due Date" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> customers</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--success)]"><Icon d={icons.checkCircle} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No outstanding customer dues</div>
            <div className="text-[13px] text-[var(--muted-foreground)]">All customer balances are currently settled.</div>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Customer" }, { label: "Total Purchases", right: true }, { label: "Paid", right: true }, { label: "Outstanding", right: true }, { label: "Last Payment" }, { label: "Status" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} customers with balances</span><Pagination total={184} /></>}
          >
            {filtered.map(c => (
              <tr key={c.id} onClick={() => { setSelected(c); setView("statement"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted-foreground)] shrink-0">{c.name.slice(0,2).toUpperCase()}</div><div><div className="font-semibold text-[var(--foreground)]">{c.name}</div><div className="font-mono text-[10px] text-[var(--muted-foreground)]">{c.customerId} · {c.phone}</div></div></div>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(c.totalPurchases)}</td>
                <td className="px-4 py-3 text-right text-[var(--success)]">{fmt(c.totalPaid)}</td>
                <td className="px-4 py-3 text-right">{c.outstanding > 0 ? <span className={`font-bold ${c.dueStatus === "overdue" ? "text-[var(--error)]" : "text-[var(--warning)]"}`}>{fmt(c.outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{c.lastPayment}</td>
                <td className="px-4 py-3"><Badge variant={dueStatusMap[c.dueStatus].v} dot>{dueStatusMap[c.dueStatus].l}</Badge></td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  {c.outstanding > 0 && <button onClick={() => openPay(c)} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">Collect →</button>}
                </td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
      <Modal open={payOpen} onClose={() => setPayOpen(false)} title={paySuccess ? "Payment recorded" : "Record customer payment"} size="sm">
        {paySuccess && payTarget ? (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-[var(--success-bg)] border border-[var(--success-border)] flex items-center justify-center mx-auto mb-4"><Icon d={icons.checkCircle} size={22} /></div>
            <div className="text-[15px] font-semibold text-[var(--foreground)] mb-1">Payment recorded</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">{payTarget.name}</div>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 text-[13px] mb-5">
              <div className="flex justify-between mb-1"><span className="text-[var(--muted-foreground)]">Received</span><span className="font-bold text-[var(--foreground)]">{fmt(payAmtNum)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Remaining due</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{remaining > 0 ? fmt(remaining) : "Settled"}</span></div>
            </div>
            <div className="flex gap-2"><Btn variant="secondary" className="flex-1" onClick={() => { setPayOpen(false); setSelected(customerDues.find(x => x.id === payTarget.id) || null); setView("statement"); }}>View Statement</Btn><Btn variant="primary" className="flex-1" onClick={() => setPayOpen(false)}>Done</Btn></div>
          </div>
        ) : payTarget ? (
          <>
            <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between">
              <div><div className="text-[13px] font-medium text-[var(--foreground)]">{payTarget.name}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{payTarget.customerId}</div></div>
              <div className="text-right"><div className="text-[11px] text-[var(--muted-foreground)]">Outstanding due</div><div className="text-[16px] font-bold text-[var(--warning)]">{fmt(payTarget.outstanding)}</div></div>
            </div>
            <div className="space-y-3">
              <Input label="Payment amount (৳)" type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} placeholder="0" error={payExceeds ? "Payment exceeds outstanding due." : undefined} />
              <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Payment method</div><div className="flex flex-wrap gap-1.5">{["Cash","Bank","bKash","Nagad","Other"].map(m => <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-1.5 rounded-lg border text-[12px] transition-all ${payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
              <Input label="Reference" value={payRef} onChange={e => setPayRef(e.target.value)} placeholder="e.g. PAY-C-0083" />
            </div>
            {payAmount && !payExceeds && <div className="mt-3 bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 flex justify-between text-[13px]"><span className="text-[var(--muted-foreground)]">Remaining after payment</span><span className={`font-bold ${remaining > 0 ? "text-[var(--warning)]" : "text-[var(--success)]"}`}>{remaining > 0 ? fmt(remaining) : "Settled"}</span></div>}
            <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setPayOpen(false)}>Cancel</Btn><Btn variant="primary" disabled={!payAmount || payExceeds} onClick={() => setPaySuccess(true)}>Record Payment</Btn></div>
          </>
        ) : null}
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 14 — ONLINE ORDERS MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled" | "payment_failed";
type OrderPayStatus = "paid" | "pending" | "failed" | "due";
type DeliveryMethod = "Home Delivery" | "Express" | "Store Pickup";

interface OrderItem { name: string; sku: string; qty: number; unitPrice: number; discount: number; }
interface OnlineOrder {
  id: string; customer: string; customerId: string; phone: string;
  address: string; area: string; city: string; postalCode: string;
  items: OrderItem[]; subtotal: number; deliveryFee: number; discount: number; total: number;
  payMethod: string; payStatus: OrderPayStatus; payRef: string;
  deliveryMethod: DeliveryMethod; status: OrderStatus; date: string; time: string;
  notes?: string;
}

const orderStatusMap: Record<OrderStatus, { v: BadgeVariant; l: string }> = {
  new: { v: "info", l: "New" }, confirmed: { v: "default", l: "Confirmed" },
  preparing: { v: "warning", l: "Preparing" }, ready: { v: "partial", l: "Ready" },
  out_for_delivery: { v: "info", l: "Out for Delivery" }, delivered: { v: "success", l: "Delivered" },
  cancelled: { v: "error", l: "Cancelled" }, payment_failed: { v: "error", l: "Payment Failed" },
};
const orderPayMap: Record<OrderPayStatus, { v: BadgeVariant; l: string }> = {
  paid: { v: "success", l: "Paid" }, pending: { v: "warning", l: "Pending" },
  failed: { v: "error", l: "Failed" }, due: { v: "partial", l: "Due" },
};

const orderNextAction: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
  new: { label: "Confirm Order", next: "confirmed" },
  confirmed: { label: "Start Preparing", next: "preparing" },
  preparing: { label: "Mark Ready", next: "ready" },
  ready: { label: "Assign Delivery", next: "out_for_delivery" },
  out_for_delivery: { label: "Mark Delivered", next: "delivered" },
};

const allOrders: OnlineOrder[] = [
  { id: "ORD-4821", customer: "Farhan Ahmed", customerId: "CUS-002844", phone: "01712 345678", address: "House 12, Road 4", area: "Mirpur", city: "Dhaka", postalCode: "1216", items: [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 1, unitPrice: 4800, discount: 0 }, { name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 3, unitPrice: 150, discount: 0 }, { name: "Walton Switch 2 Gang", sku: "WAL-SW-2G", qty: 2, unitPrice: 180, discount: 0 }], subtotal: 5610, deliveryFee: 100, discount: 0, total: 5710, payMethod: "SSLCommerz", payStatus: "paid", payRef: "SSL-20260904-4821", deliveryMethod: "Home Delivery", status: "new", date: "4 Sep 2026", time: "2:14 PM", notes: "Customer requested delivery after 6 PM." },
  { id: "ORD-4820", customer: "Nusrat Jahan", customerId: "CUS-002840", phone: "01812 456789", address: "Flat 3A, Block C", area: "Dhanmondi", city: "Dhaka", postalCode: "1209", items: [{ name: "Vision Table Fan 12\"", sku: "VIS-TF-12", qty: 1, unitPrice: 2450, discount: 200 }, { name: "Electrical Holder B22", sku: "EH-B22-STD", qty: 4, unitPrice: 45, discount: 0 }], subtotal: 2630, deliveryFee: 80, discount: 200, total: 2510, payMethod: "SSLCommerz", payStatus: "paid", payRef: "SSL-20260904-4820", deliveryMethod: "Home Delivery", status: "confirmed", date: "4 Sep 2026", time: "1:52 PM" },
  { id: "ORD-4819", customer: "Tanvir Islam", customerId: "CUS-002843", phone: "01912 567890", address: "Plot 5, Sector 7", area: "Uttara", city: "Dhaka", postalCode: "1230", items: [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 2, unitPrice: 4800, discount: 0 }, { name: "Butterfly Socket 3 Pin", sku: "BUT-SOC-3P", qty: 4, unitPrice: 130, discount: 0 }, { name: "Havells Cable 2.5mm", sku: "HAV-CAB-25", qty: 2, unitPrice: 620, discount: 0 }], subtotal: 11400, deliveryFee: 150, discount: 0, total: 11550, payMethod: "SSLCommerz", payStatus: "paid", payRef: "SSL-20260904-4819", deliveryMethod: "Express", status: "preparing", date: "4 Sep 2026", time: "11:30 AM" },
  { id: "ORD-4818", customer: "Karim Traders", customerId: "CUS-002838", phone: "01611 678901", address: "Plot 5", area: "Uttara", city: "Dhaka", postalCode: "1230", items: [{ name: "Philips LED Bulb 12W", sku: "PHI-LED-12W", qty: 10, unitPrice: 150, discount: 0 }], subtotal: 1500, deliveryFee: 0, discount: 0, total: 1500, payMethod: "SSLCommerz", payStatus: "paid", payRef: "SSL-20260904-4818", deliveryMethod: "Store Pickup", status: "ready", date: "3 Sep 2026", time: "4:00 PM" },
  { id: "ORD-4817", customer: "Salma Begum", customerId: "CUS-002842", phone: "01511 789012", address: "House 8, Lane 3", area: "Mohammadpur", city: "Dhaka", postalCode: "1207", items: [{ name: "Panasonic Wall Fan 16\"", sku: "PAN-WF-16", qty: 1, unitPrice: 3600, discount: 0 }], subtotal: 3600, deliveryFee: 100, discount: 0, total: 3700, payMethod: "SSLCommerz", payStatus: "failed", payRef: "", deliveryMethod: "Home Delivery", status: "payment_failed", date: "3 Sep 2026", time: "10:15 AM" },
  { id: "ORD-4816", customer: "Rahim Electronics", customerId: "CUS-002841", phone: "01712 345678", address: "House 12, Road 4", area: "Mirpur", city: "Dhaka", postalCode: "1216", items: [{ name: "Walton Ceiling Fan 56\"", sku: "WAL-FAN-56", qty: 3, unitPrice: 4800, discount: 0 }], subtotal: 14400, deliveryFee: 200, discount: 0, total: 14600, payMethod: "SSLCommerz", payStatus: "paid", payRef: "SSL-20260903-4816", deliveryMethod: "Home Delivery", status: "out_for_delivery", date: "3 Sep 2026", time: "9:00 AM" },
];

const orderTimeline = [
  { time: "4 Sep · 2:14 PM", label: "Order placed", done: true },
  { time: "4 Sep · 2:16 PM", label: "Payment confirmed", done: true },
  { time: "4 Sep · 2:25 PM", label: "Order confirmed", done: true },
  { time: "4 Sep · 3:10 PM", label: "Preparing", done: false },
  { time: "Pending", label: "Out for Delivery", done: false },
  { time: "Pending", label: "Delivered", done: false },
];

type OrderView = "list" | "detail";

function OnlineOrdersPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<OrderView>("list");
  const [selected, setSelected] = useState<OnlineOrder | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<Record<string, OrderStatus>>({});
  const [cancelOpen, setCancelOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatus = (o: OnlineOrder): OrderStatus => orderStatuses[o.id] ?? o.status;

  const filtered = allOrders.filter(o => {
    const q = searchQ.toLowerCase();
    const mQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.phone.includes(q);
    const mS = filterStatus === "all" || getStatus(o) === filterStatus;
    return mQ && mS;
  });

  const advance = (o: OnlineOrder) => {
    const next = orderNextAction[getStatus(o)];
    if (next) setOrderStatuses(p => ({ ...p, [o.id]: next.next }));
  };

  if (view === "detail" && selected) {
    const status = getStatus(selected);
    const nextAction = orderNextAction[status];
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Orders</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-mono font-medium text-[var(--foreground)]">#{selected.id}</span>
            <Badge variant={orderStatusMap[status].v} dot>{orderStatusMap[status].l}</Badge>
            <Badge variant={orderPayMap[selected.payStatus].v}>{orderPayMap[selected.payStatus].l}</Badge>
            <div className="flex-1" />
            {status !== "cancelled" && status !== "delivered" && status !== "payment_failed" && (
              <Btn variant="ghost" size="sm" onClick={() => setCancelOpen(true)}>Cancel</Btn>
            )}
            {nextAction && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.check} size={13} />} onClick={() => { advance(selected); setSelected({ ...selected }); }}>{nextAction.label}</Btn>}
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {/* Payment failed banner */}
              {selected.payStatus === "failed" && (
                <div className="border border-[var(--error-border)] bg-[var(--error-bg)] rounded-xl px-5 py-4">
                  <div className="text-[13px] font-semibold text-[var(--error)] mb-1">Payment Failed</div>
                  <div className="text-[12px] text-[var(--muted-foreground)]">The payment could not be confirmed. Amount: {fmt(selected.total)}. The order will not be processed until payment is resolved.</div>
                </div>
              )}
              {/* Order items */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Order items</div></div>
                <table className="w-full text-[13px]">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Product","SKU","Qty","Unit Price","Discount","Total"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Qty","Unit Price","Discount","Total"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                  <tbody>{selected.items.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--foreground)]">{item.name}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">{item.sku}</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">{item.qty}</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-right">{item.discount > 0 ? <span className="text-[var(--success)]">−{fmt(item.discount)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(item.qty * item.unitPrice - item.discount)}</td>
                    </tr>
                  ))}</tbody>
                </table>
                <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--secondary)] flex justify-end">
                  <div className="w-52 space-y-1.5 text-[13px]">
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{fmt(selected.subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Delivery fee</span><span>{fmt(selected.deliveryFee)}</span></div>
                    {selected.discount > 0 && <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Discount</span><span className="text-[var(--success)]">−{fmt(selected.discount)}</span></div>}
                    <div className="flex justify-between font-bold text-[15px] border-t border-[var(--border)] pt-2"><span>Grand Total</span><span>{fmt(selected.total)}</span></div>
                  </div>
                </div>
              </div>
              {/* Timeline */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Order timeline</div>
                <div className="space-y-0">
                  {orderTimeline.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${step.done ? "bg-[var(--foreground)] border-[var(--foreground)]" : "bg-[var(--background)] border-[var(--border)]"}`}>
                          {step.done && <Icon d={icons.check} size={10} stroke={2.5} />}
                        </div>
                        {i < orderTimeline.length - 1 && <div className={`w-px flex-1 min-h-[24px] ${step.done ? "bg-[var(--foreground)]" : "bg-[var(--border)]"}`} />}
                      </div>
                      <div className="pb-5">
                        <div className={`text-[13px] font-medium ${step.done ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>{step.label}</div>
                        <div className="text-[11px] text-[var(--muted-foreground)]">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right panel */}
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Customer</div>
                <div className="space-y-2 text-[13px]">
                  <div className="font-semibold text-[var(--foreground)]">{selected.customer}</div>
                  <div className="font-mono text-[12px] text-[var(--muted-foreground)]">{selected.phone}</div>
                  <div className="font-mono text-[10px] text-[var(--muted-foreground)]">{selected.customerId}</div>
                  <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" onClick={() => onNavigate("customers")}>View customer →</button>
                </div>
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Delivery</div>
                <div className="space-y-2 text-[13px]">
                  <div><div className="text-[11px] text-[var(--muted-foreground)]">Method</div><div className="font-medium text-[var(--foreground)]">{selected.deliveryMethod}</div></div>
                  <div><div className="text-[11px] text-[var(--muted-foreground)]">Address</div><div className="text-[var(--foreground)]">{selected.address}</div><div className="text-[var(--muted-foreground)]">{selected.area}, {selected.city} {selected.postalCode}</div></div>
                  <div><div className="text-[11px] text-[var(--muted-foreground)]">Fee</div><div className="text-[var(--foreground)]">{fmt(selected.deliveryFee)}</div></div>
                </div>
                {(status === "ready" || status === "out_for_delivery") && <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] mt-2 transition-colors" onClick={() => onNavigate("delivery")}>View in delivery →</button>}
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment</div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Method</span><span>{selected.payMethod}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Status</span><Badge variant={orderPayMap[selected.payStatus].v}>{orderPayMap[selected.payStatus].l}</Badge></div>
                  {selected.payRef && <div><div className="text-[11px] text-[var(--muted-foreground)]">Transaction</div><div className="font-mono text-[11px] text-[var(--foreground)]">{selected.payRef}</div></div>}
                </div>
              </div>
              {selected.notes && (
                <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Internal notes</div>
                  <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel order?" size="sm">
          <p className="text-[13px] text-[var(--muted-foreground)] mb-3">Are you sure you want to cancel this order?</p>
          {selected.payStatus === "paid" && <div className="bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-lg px-4 py-3 text-[12px] text-[var(--warning)] mb-4">Any eligible refund will be handled through the payment/refund workflow.</div>}
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep Order</Btn><Btn variant="destructive" onClick={() => { setCancelOpen(false); setOrderStatuses(p => ({ ...p, [selected.id]: "cancelled" })); setView("list"); }}>Cancel Order</Btn></div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Orders" subtitle="Manage online customer orders and fulfillment." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.filter} size={13} />}>Filter</Btn><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn></>} />
        <KpiRow cards={[{ label: "New Orders", value: "12", warn: true }, { label: "Preparing", value: "8" }, { label: "Out for Delivery", value: "5" }, { label: "Today's Online Sales", value: "৳ 1,84,500" }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search order, customer or phone…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["all","new","confirmed","preparing","ready","out_for_delivery","delivered","cancelled"].map(f => (
              <FilterChip key={f} label={f === "all" ? "All" : orderStatusMap[f as OrderStatus]?.l || f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />
            ))}
          </div>
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> orders</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.orders} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No online orders</div>
            <div className="text-[13px] text-[var(--muted-foreground)]">New orders from the customer app will appear here.</div>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Order" }, { label: "Customer" }, { label: "Items" }, { label: "Total", right: true }, { label: "Payment" }, { label: "Delivery" }, { label: "Status" }, { label: "Date" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} orders</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(o => {
              const status = getStatus(o);
              return (
                <tr key={o.id} onClick={() => { setSelected(o); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] font-semibold text-[var(--foreground)]">#{o.id}</span>
                      {status === "new" && <span className="h-1.5 w-1.5 rounded-full bg-[var(--info)] animate-pulse" />}
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="font-medium text-[var(--foreground)]">{o.customer}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{o.phone}</div></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(o.total)}</td>
                  <td className="px-4 py-3"><Badge variant={orderPayMap[o.payStatus].v}>{orderPayMap[o.payStatus].l}</Badge></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{o.deliveryMethod}</td>
                  <td className="px-4 py-3"><Badge variant={orderStatusMap[status].v} dot>{orderStatusMap[status].l}</Badge></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap text-[12px]">{o.date}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    {orderNextAction[status] && <button onClick={() => advance(o)} className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] whitespace-nowrap transition-colors">{orderNextAction[status]!.label} →</button>}
                  </td>
                </tr>
              );
            })}
          </TableWrap>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 15 — DELIVERY MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type DeliveryStatus = "pending" | "assigned" | "out_for_delivery" | "delivered" | "failed" | "rescheduled" | "cancelled";
interface Delivery {
  id: string; orderId: string; customer: string; phone: string;
  address: string; area: string; city: string; postalCode: string;
  items: number; total: number; payStatus: OrderPayStatus;
  deliveryMethod: DeliveryMethod; assignedTo: string;
  status: DeliveryStatus; expected: string; notes?: string;
  cashOnDelivery?: boolean; codAmount?: number;
}

const deliveryStatusMap: Record<DeliveryStatus, { v: BadgeVariant; l: string }> = {
  pending: { v: "muted", l: "Pending" }, assigned: { v: "info", l: "Assigned" },
  out_for_delivery: { v: "warning", l: "Out for Delivery" }, delivered: { v: "success", l: "Delivered" },
  failed: { v: "error", l: "Failed" }, rescheduled: { v: "partial", l: "Rescheduled" }, cancelled: { v: "error", l: "Cancelled" },
};

const allDeliveries: Delivery[] = [
  { id: "DEL-004821", orderId: "ORD-4821", customer: "Farhan Ahmed", phone: "01712 345678", address: "House 12, Road 4", area: "Mirpur", city: "Dhaka", postalCode: "1216", items: 4, total: 5710, payStatus: "paid", deliveryMethod: "Home Delivery", assignedTo: "Rahim", status: "out_for_delivery", expected: "Today · 6 PM" },
  { id: "DEL-004820", orderId: "ORD-4820", customer: "Nusrat Jahan", phone: "01812 456789", address: "Flat 3A, Block C", area: "Dhanmondi", city: "Dhaka", postalCode: "1209", items: 2, total: 2510, payStatus: "paid", deliveryMethod: "Home Delivery", assignedTo: "Mahbub", status: "assigned", expected: "Today · 4 PM" },
  { id: "DEL-004819", orderId: "ORD-4819", customer: "Tanvir Islam", phone: "01912 567890", address: "Plot 5, Sector 7", area: "Uttara", city: "Dhaka", postalCode: "1230", items: 6, total: 11550, payStatus: "paid", deliveryMethod: "Express", assignedTo: "Karim", status: "pending", expected: "Today · 2 PM" },
  { id: "DEL-004815", orderId: "ORD-4815", customer: "Ratan Das", phone: "01611 234567", address: "House 3, Rd 12", area: "Mohammadpur", city: "Dhaka", postalCode: "1207", items: 2, total: 8400, payStatus: "due", deliveryMethod: "Home Delivery", assignedTo: "Rahim", status: "failed", expected: "3 Sep · 3 PM", cashOnDelivery: true, codAmount: 8400, notes: "Customer unavailable at address." },
  { id: "DEL-004813", orderId: "ORD-4813", customer: "Salim Mia", phone: "01512 345678", address: "House 8A", area: "Motijheel", city: "Dhaka", postalCode: "1000", items: 1, total: 4200, payStatus: "paid", deliveryMethod: "Home Delivery", assignedTo: "Karim", status: "delivered", expected: "3 Sep · 1 PM" },
];

const deliveryTimeline = [
  { time: "4 Sep · 3:00 PM", label: "Order ready", done: true },
  { time: "4 Sep · 3:15 PM", label: "Assigned to Rahim", done: true },
  { time: "4 Sep · 3:40 PM", label: "Picked up", done: true },
  { time: "4 Sep · 3:45 PM", label: "Out for delivery", done: true },
  { time: "Pending", label: "Delivered", done: false },
];

const deliveryStaff = ["Rahim", "Mahbub", "Karim"];

type DeliveryView = "list" | "detail";

function DeliveryPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<DeliveryView>("list");
  const [selected, setSelected] = useState<Delivery | null>(null);
  const [deliveryStatuses, setDeliveryStatuses] = useState<Record<string, DeliveryStatus>>({});
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignTarget, setAssignTarget] = useState<Delivery | null>(null);
  const [markDeliveredOpen, setMarkDeliveredOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [assignStaff, setAssignStaff] = useState("Rahim");
  const [assignMethod, setAssignMethod] = useState<DeliveryMethod>("Home Delivery");
  const [assignDate, setAssignDate] = useState("2026-09-04");
  const [assignTime, setAssignTime] = useState("18:00");
  const [deliveredBy, setDeliveredBy] = useState("");
  const [deliveredNote, setDeliveredNote] = useState("");
  const [failReason, setFailReason] = useState("Customer unavailable");
  const [reschedDate, setReschedDate] = useState("2026-09-05");
  const [reschedTime, setReschedTime] = useState("14:00");

  const getStatus = (d: Delivery): DeliveryStatus => deliveryStatuses[d.id] ?? d.status;

  const filtered = allDeliveries.filter(d => {
    const q = searchQ.toLowerCase();
    const mQ = !q || d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.phone.includes(q) || d.orderId.toLowerCase().includes(q);
    const mS = filterStatus === "all" || getStatus(d) === filterStatus;
    return mQ && mS;
  });

  const openAssign = (d: Delivery) => { setAssignTarget(d); setAssignOpen(true); };

  if (view === "detail" && selected) {
    const status = getStatus(selected);
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Delivery</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-mono font-medium text-[var(--foreground)]">#{selected.id}</span>
            <Badge variant={deliveryStatusMap[status].v} dot>{deliveryStatusMap[status].l}</Badge>
            <div className="flex-1" />
            {status === "assigned" && <Btn variant="secondary" size="sm" onClick={() => setDeliveryStatuses(p => ({ ...p, [selected.id]: "out_for_delivery" }))}>Start Delivery</Btn>}
            {status === "out_for_delivery" && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.check} size={13} />} onClick={() => setMarkDeliveredOpen(true)}>Mark Delivered</Btn>}
            {(status === "pending" || status === "assigned") && <Btn variant="primary" size="sm" onClick={() => openAssign(selected)}>Assign Delivery</Btn>}
            {status === "out_for_delivery" && <Btn variant="ghost" size="sm" onClick={() => setFailOpen(true)}>Mark Failed</Btn>}
            {status === "failed" && <Btn variant="secondary" size="sm" onClick={() => setRescheduleOpen(true)}>Reschedule</Btn>}
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              {status === "failed" && (
                <div className="border border-[var(--error-border)] bg-[var(--error-bg)] rounded-xl px-5 py-4">
                  <div className="text-[13px] font-semibold text-[var(--error)] mb-1">Delivery Failed</div>
                  <div className="text-[12px] text-[var(--muted-foreground)] mb-3">{selected.notes || "Delivery could not be completed."}</div>
                  <div className="flex gap-2"><Btn variant="secondary" size="sm" onClick={() => setRescheduleOpen(true)}>Reschedule</Btn></div>
                </div>
              )}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Delivery information</div>
                <div className="grid grid-cols-3 gap-4 text-[13px]">
                  {[{ label: "Delivery ID", value: `#${selected.id}`, mono: true }, { label: "Order", value: `#${selected.orderId}`, mono: true }, { label: "Method", value: selected.deliveryMethod }, { label: "Assigned to", value: selected.assignedTo }, { label: "Expected", value: selected.expected }, { label: "Payment", value: <Badge variant={orderPayMap[selected.payStatus].v}>{orderPayMap[selected.payStatus].l}</Badge> }].map((f, i) => (
                    <div key={i}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className={`font-medium text-[var(--foreground)] ${f.mono ? "font-mono text-[12px]" : ""}`}>{f.value}</div></div>
                  ))}
                </div>
                {selected.cashOnDelivery && (
                  <div className="mt-4 bg-[var(--warning-bg)] border border-[var(--warning-border)] rounded-lg px-4 py-3 flex justify-between items-center">
                    <div className="text-[12px] font-medium text-[var(--warning)]">Cash on Delivery</div>
                    <div className="text-[14px] font-bold text-[var(--foreground)]">{fmt(selected.codAmount || 0)} to collect</div>
                  </div>
                )}
              </div>
              {/* Timeline */}
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Delivery timeline</div>
                <div className="space-y-0">
                  {deliveryTimeline.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${step.done ? "bg-[var(--foreground)] border-[var(--foreground)]" : "bg-[var(--background)] border-[var(--border)]"}`}>
                          {step.done && <Icon d={icons.check} size={10} stroke={2.5} />}
                        </div>
                        {i < deliveryTimeline.length - 1 && <div className={`w-px flex-1 min-h-[24px] ${step.done ? "bg-[var(--foreground)]" : "bg-[var(--border)]"}`} />}
                      </div>
                      <div className="pb-5"><div className={`text-[13px] font-medium ${step.done ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}`}>{step.label}</div><div className="text-[11px] text-[var(--muted-foreground)]">{step.time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right panel */}
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Customer</div>
                <div className="space-y-2 text-[13px]">
                  <div className="font-semibold text-[var(--foreground)]">{selected.customer}</div>
                  <div className="font-mono text-[12px] text-[var(--muted-foreground)]">{selected.phone}</div>
                  <div className="text-[var(--muted-foreground)] text-[12px] leading-relaxed">{selected.address}<br />{selected.area}, {selected.city} {selected.postalCode}</div>
                </div>
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Order</div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Order</span><span className="font-mono text-[12px] font-medium text-[var(--foreground)]">#{selected.orderId}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Items</span><span>{selected.items} items</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Total</span><span className="font-bold">{fmt(selected.total)}</span></div>
                </div>
                <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] mt-2 transition-colors" onClick={() => onNavigate("orders")}>View order →</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modals */}
        <Modal open={markDeliveredOpen} onClose={() => setMarkDeliveredOpen(false)} title="Mark as Delivered" size="sm">
          <div className="space-y-3 mb-5">
            <Input label="Received by (optional)" value={deliveredBy} onChange={e => setDeliveredBy(e.target.value)} placeholder="e.g. Farhan Ahmed" />
            <div><label className="text-[12px] font-medium text-[var(--foreground)]">Delivery note</label><textarea value={deliveredNote} onChange={e => setDeliveredNote(e.target.value)} rows={2} placeholder="Delivered successfully." className="mt-1.5 w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" /></div>
          </div>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setMarkDeliveredOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => { setMarkDeliveredOpen(false); setDeliveryStatuses(p => ({ ...p, [selected.id]: "delivered" })); setView("list"); }}>Mark Delivered</Btn></div>
        </Modal>
        <Modal open={failOpen} onClose={() => setFailOpen(false)} title="Mark delivery as failed" size="sm">
          <SelectField label="Reason" value={failReason} onChange={setFailReason} options={["Customer unavailable","Wrong address","Customer refused","Other"].map(r => ({ value: r, label: r }))} />
          <div className="flex gap-2 justify-end mt-5"><Btn variant="secondary" onClick={() => setFailOpen(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => { setFailOpen(false); setDeliveryStatuses(p => ({ ...p, [selected.id]: "failed" })); }}>Confirm Failed</Btn></div>
        </Modal>
        <Modal open={rescheduleOpen} onClose={() => setRescheduleOpen(false)} title="Reschedule Delivery" size="sm">
          <div className="space-y-3 mb-5">
            <Input label="New date" type="date" value={reschedDate} onChange={e => setReschedDate(e.target.value)} />
            <Input label="Time" type="time" value={reschedTime} onChange={e => setReschedTime(e.target.value)} />
            <SelectField label="Reason" value={failReason} onChange={setFailReason} options={["Customer unavailable","Customer request","Staff unavailable","Other"].map(r => ({ value: r, label: r }))} />
          </div>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setRescheduleOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => { setRescheduleOpen(false); setDeliveryStatuses(p => ({ ...p, [selected.id]: "rescheduled" })); }}>Reschedule Delivery</Btn></div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Delivery" subtitle="Manage online order deliveries and fulfillment." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.filter} size={13} />}>Filter</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => assignTarget && setAssignOpen(true)}>Assign Delivery</Btn></>} />
        <KpiRow cards={[{ label: "Pending", value: "8", warn: true }, { label: "Ready for Delivery", value: "5" }, { label: "Out for Delivery", value: "7" }, { label: "Delivered Today", value: "32" }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search order, customer or phone…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["all","pending","assigned","out_for_delivery","delivered","failed"].map(f => (
              <FilterChip key={f} label={f === "all" ? "All" : deliveryStatusMap[f as DeliveryStatus]?.l || f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />
            ))}
          </div>
          <DropFilter label="Method" /><DropFilter label="Staff" /><DropFilter label="Area" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> deliveries</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.delivery} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No deliveries found</div>
            <div className="text-[13px] text-[var(--muted-foreground)]">Assigned online orders will appear here.</div>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Order" }, { label: "Customer" }, { label: "Area" }, { label: "Method" }, { label: "Assigned To" }, { label: "Status" }, { label: "Expected" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} deliveries</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(d => {
              const status = getStatus(d);
              return (
                <tr key={d.id} onClick={() => { setSelected(d); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                  <td className="px-4 py-3"><div className="font-mono text-[12px] font-semibold text-[var(--foreground)]">#{d.orderId}</div><div className="font-mono text-[10px] text-[var(--muted-foreground)]">#{d.id}</div></td>
                  <td className="px-4 py-3"><div className="font-medium text-[var(--foreground)]">{d.customer}</div><div className="font-mono text-[11px] text-[var(--muted-foreground)]">{d.phone}</div></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{d.area}, {d.city}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{d.deliveryMethod}</td>
                  <td className="px-4 py-3 text-[var(--foreground)] font-medium">{d.assignedTo}</td>
                  <td className="px-4 py-3"><Badge variant={deliveryStatusMap[status].v} dot>{deliveryStatusMap[status].l}</Badge></td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px] whitespace-nowrap">{d.expected}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    {status === "pending" && <button onClick={() => openAssign(d)} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">Assign →</button>}
                    {status === "out_for_delivery" && <button onClick={() => { setSelected(d); setMarkDeliveredOpen(true); }} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">Delivered →</button>}
                  </td>
                </tr>
              );
            })}
          </TableWrap>
        )}
      </div>
      {/* Assign modal */}
      <Modal open={assignOpen} onClose={() => setAssignOpen(false)} title="Assign Delivery" size="sm">
        {assignTarget && <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4 flex justify-between"><div className="font-mono text-[12px] font-medium text-[var(--foreground)]">#{assignTarget.orderId}</div><div className="text-[12px] text-[var(--muted-foreground)]">{assignTarget.customer} · {assignTarget.area}</div></div>}
        <div className="space-y-3 mb-5">
          <SelectField label="Delivery Staff" value={assignStaff} onChange={setAssignStaff} options={deliveryStaff.map(s => ({ value: s, label: s }))} />
          <div><div className="text-[12px] font-medium text-[var(--foreground)] mb-2">Delivery method</div><div className="flex gap-2">{(["Home Delivery","Store Pickup"] as const).map(m => <button key={m} onClick={() => setAssignMethod(m)} className={`flex-1 h-9 rounded-lg border text-[12px] transition-all ${assignMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div></div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Expected date" type="date" value={assignDate} onChange={e => setAssignDate(e.target.value)} />
            <Input label="Expected time" type="time" value={assignTime} onChange={e => setAssignTime(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setAssignOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => { setAssignOpen(false); if (assignTarget) setDeliveryStatuses(p => ({ ...p, [assignTarget.id]: "assigned" })); }}>Assign Delivery</Btn></div>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 16 — EXPENSE MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

type ExpenseStatus = "paid" | "unpaid" | "partial";
interface Expense {
  id: string; title: string; category: string; payee: string; amount: number;
  paid: number; payMethod: string; date: string; reference: string; status: ExpenseStatus;
  recordedBy: string; notes?: string; store: string;
}

const expenseStatusMap: Record<ExpenseStatus, { v: BadgeVariant; l: string }> = {
  paid: { v: "success", l: "Paid" }, unpaid: { v: "error", l: "Unpaid" }, partial: { v: "partial", l: "Partially Paid" },
};

const expenseCategories = ["Rent","Utilities","Salaries","Delivery","Transport","Maintenance","Packaging","Marketing","Internet","Office","Other"];

const allExpenses: Expense[] = [
  { id: "EXP-00991", title: "Shop Rent", category: "Rent", payee: "Building Owner", amount: 80000, paid: 80000, payMethod: "Bank", date: "1 Sep 2026", reference: "RENT-SEP-2026", status: "paid", recordedBy: "MD. SELIM", store: "Main Store" },
  { id: "EXP-00990", title: "Electricity Bill", category: "Utilities", payee: "DESCO", amount: 18500, paid: 18500, payMethod: "bKash", date: "2 Sep 2026", reference: "DESCO-SEP-2026", status: "paid", recordedBy: "MD. SELIM", store: "Main Store" },
  { id: "EXP-00989", title: "Delivery Fuel", category: "Delivery", payee: "Rahim", amount: 4800, paid: 4800, payMethod: "Cash", date: "4 Sep 2026", reference: "", status: "paid", recordedBy: "Mahbub", store: "Main Store" },
  { id: "EXP-00988", title: "Internet Bill", category: "Internet", payee: "Banglalink Business", amount: 3500, paid: 3500, payMethod: "bKash", date: "3 Sep 2026", reference: "BL-SEP-2026", status: "paid", recordedBy: "MD. SELIM", store: "Main Store" },
  { id: "EXP-00987", title: "Office Supplies", category: "Office", payee: "Stationery Shop", amount: 3200, paid: 1500, payMethod: "Cash", date: "2 Sep 2026", reference: "", status: "partial", recordedBy: "Mahbub", store: "Main Store", notes: "Remaining ৳1,700 to be paid next week." },
  { id: "EXP-00986", title: "Security Guard Salary", category: "Salaries", payee: "Jamal Uddin", amount: 12000, paid: 0, payMethod: "", date: "1 Sep 2026", reference: "", status: "unpaid", recordedBy: "MD. SELIM", store: "Main Store" },
  { id: "EXP-00985", title: "Packaging Materials", category: "Packaging", payee: "Pak World", amount: 8500, paid: 8500, payMethod: "Cash", date: "28 Aug 2026", reference: "PAK-082026", status: "paid", recordedBy: "Mahbub", store: "Main Store" },
];

type ExpenseView = "list" | "detail" | "form";

function ExpensesPage({ onNavigate: _ }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<ExpenseView>("list");
  const [selected, setSelected] = useState<Expense | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [removeOpen, setRemoveOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [payTarget, setPayTarget] = useState<Expense | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Cash");
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const [form, setForm] = useState({ title: "", category: "Utilities", payee: "", amount: "", payMethod: "Cash", date: "2026-09-04", reference: "", notes: "", store: "Main Store" });

  const ff = (f: string) => (v: string) => setForm(p => ({ ...p, [f]: v }));
  const filtered = allExpenses.filter(e => {
    const q = searchQ.toLowerCase();
    const mQ = !q || e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.payee.toLowerCase().includes(q) || e.reference.toLowerCase().includes(q);
    const mS = filterStatus === "All" || e.status === filterStatus.toLowerCase();
    const mC = filterCat === "All" || e.category === filterCat;
    return mQ && mS && mC;
  });

  const openAdd = () => { setFormMode("add"); setForm({ title: "", category: "Utilities", payee: "", amount: "", payMethod: "Cash", date: "2026-09-04", reference: "", notes: "", store: "Main Store" }); setView("form"); };
  const openEdit = (e: Expense) => { setFormMode("edit"); setSelected(e); setForm({ title: e.title, category: e.category, payee: e.payee, amount: String(e.amount), payMethod: e.payMethod || "Cash", date: e.date, reference: e.reference, notes: e.notes || "", store: e.store }); setView("form"); };
  const openPay = (e: Expense) => { setPayTarget(e); setPayAmount(""); setPayMethod("Cash"); setPayOpen(true); };

  if (view === "form") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[800px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView(selected ? "detail" : "list")}>{selected ? "Expense" : "Expenses"}</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{formMode === "add" ? "Add Expense" : "Edit Expense"}</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Expense details</div>
              <Input label="Expense title" value={form.title} onChange={e => ff("title")(e.target.value)} placeholder="e.g. Electricity Bill" />
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Category" value={form.category} onChange={ff("category")} options={expenseCategories.map(c => ({ value: c, label: c }))} />
                <Input label="Payee" value={form.payee} onChange={e => ff("payee")(e.target.value)} placeholder="e.g. DESCO" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Amount (৳)" type="number" value={form.amount} onChange={e => ff("amount")(e.target.value)} placeholder="0" />
                <Input label="Expense date" type="date" value={form.date} onChange={e => ff("date")(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Reference" value={form.reference} onChange={e => ff("reference")(e.target.value)} placeholder="e.g. DESCO-SEP-2026" />
                <SelectField label="Store" value={form.store} onChange={ff("store")} options={[{ value: "Main Store", label: "Main Store" }]} />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Notes</div>
              <textarea value={form.notes} onChange={e => ff("notes")(e.target.value)} rows={2} placeholder="Optional notes…" className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Payment method</div>
              <div className="flex flex-wrap gap-1.5">{["Cash","Bank","bKash","Nagad","Other"].map(m => <button key={m} onClick={() => ff("payMethod")(m)} className={`px-2.5 py-1.5 rounded-lg border text-[12px] transition-all ${form.payMethod === m ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{m}</button>)}</div>
            </div>
            <div className="space-y-2">
              <Btn variant="primary" className="w-full" onClick={() => setView("list")} iconLeft={<Icon d={icons.check} size={14} />}>Save Expense</Btn>
              <Btn variant="secondary" className="w-full" onClick={() => setView(selected ? "detail" : "list")}>Cancel</Btn>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] p-4 text-[12px] text-[var(--muted-foreground)]">Expenses track operating costs only. Products purchased for resale are recorded under Purchases.</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === "detail" && selected) {
    const outstanding = selected.amount - selected.paid;
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Expenses</Btn>
            <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
            <span className="text-[13px] font-medium text-[var(--foreground)] truncate">{selected.title}</span>
            <Badge variant={expenseStatusMap[selected.status].v} dot>{expenseStatusMap[selected.status].l}</Badge>
            <div className="flex-1" />
            {outstanding > 0 && <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={() => openPay(selected)}>Record Payment</Btn>}
            <Btn variant="secondary" size="sm" onClick={() => openEdit(selected)}>Edit</Btn>
            <Btn variant="ghost" size="sm" onClick={() => setRemoveOpen(true)}>Remove</Btn>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-5">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Expense information</div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[13px]">
                  {[{ label: "Title", value: selected.title }, { label: "Category", value: selected.category }, { label: "Payee", value: selected.payee }, { label: "Date", value: selected.date }, { label: "Payment method", value: selected.payMethod || "—" }, { label: "Reference", value: selected.reference || "—" }, { label: "Recorded by", value: selected.recordedBy }, { label: "Store", value: selected.store }].map(f => (
                    <div key={f.label}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.label}</div><div className="font-medium text-[var(--foreground)]">{f.value}</div></div>
                  ))}
                </div>
                {selected.notes && <div className="mt-4 pt-4 border-t border-[var(--border)]"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">Notes</div><p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">{selected.notes}</p></div>}
              </div>
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Payment summary</div>
                <div className="space-y-2 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Total amount</span><span className="font-bold text-[var(--foreground)]">{fmt(selected.amount)}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Paid</span><span className="text-[var(--success)] font-semibold">{fmt(selected.paid)}</span></div>
                  {outstanding > 0 && <div className="flex justify-between border-t border-[var(--border)] pt-2"><span className="text-[var(--warning)]">Outstanding</span><span className="text-[var(--warning)] font-bold">{fmt(outstanding)}</span></div>}
                </div>
                {outstanding > 0 && <Btn variant="primary" size="sm" className="w-full mt-4" onClick={() => openPay(selected)}>Record Payment</Btn>}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 text-center">
                <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{selected.category}</div>
                <div className="text-[28px] font-bold text-[var(--foreground)]">{fmt(selected.amount)}</div>
                <div className="mt-2"><Badge variant={expenseStatusMap[selected.status].v} dot>{expenseStatusMap[selected.status].l}</Badge></div>
              </div>
            </div>
          </div>
        </div>
        <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} title={`Record payment — ${selected.title}`} outstanding={outstanding} />
        <Modal open={removeOpen} onClose={() => setRemoveOpen(false)} title="Remove expense?" size="sm">
          <p className="text-[13px] text-[var(--muted-foreground)] mb-5">This expense record will no longer be included in expense totals.</p>
          <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setRemoveOpen(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => { setRemoveOpen(false); setView("list"); }}>Remove Expense</Btn></div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1280px] mx-auto space-y-5">
        <PageHeader title="Expenses" subtitle="Track operating costs and business expenses." actions={<><Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Expense</Btn></>} />
        <KpiRow cards={[{ label: "This Month", value: "৳ 2,48,500" }, { label: "Today", value: "৳ 12,800" }, { label: "Unpaid", value: "৳ 35,000", warn: true }, { label: "Largest Category", value: "Rent" }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by description, category or reference…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Paid","Unpaid","Partially Paid"].map(f => <FilterChip key={f} label={f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />)}
          </div>
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            <span className="px-2 text-[11px] text-[var(--muted-foreground)]">Category:</span>
            <FilterChip label="All" active={filterCat === "All"} onClick={() => setFilterCat("All")} />
            {["Rent","Utilities","Salaries","Delivery","Office"].map(c => <FilterChip key={c} label={c} active={filterCat === c} onClick={() => setFilterCat(c)} />)}
          </div>
          <DropFilter label="Date" /><DropFilter label="Payment" />
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> expenses</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.expenses} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No expenses recorded</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Add an expense to start tracking business operating costs.</div>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Expense</Btn>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Expense" }, { label: "Category" }, { label: "Payee" }, { label: "Amount", right: true }, { label: "Paid", right: true }, { label: "Payment" }, { label: "Status" }, { label: "Date" }, { label: "Recorded by" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} expenses</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(e => (
              <tr key={e.id} onClick={() => { setSelected(e); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3"><div className="font-medium text-[var(--foreground)]">{e.title}</div><div className="font-mono text-[10px] text-[var(--muted-foreground)]">{e.id}</div></td>
                <td className="px-4 py-3"><Badge variant="default">{e.category}</Badge></td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">{e.payee}</td>
                <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(e.amount)}</td>
                <td className="px-4 py-3 text-right text-[var(--success)]">{e.paid > 0 ? fmt(e.paid) : <span className="text-[var(--muted-foreground)]">—</span>}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{e.payMethod || "—"}</td>
                <td className="px-4 py-3"><Badge variant={expenseStatusMap[e.status].v} dot>{expenseStatusMap[e.status].l}</Badge></td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap text-[12px]">{e.date}</td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{e.recordedBy}</td>
                <td className="px-4 py-3" onClick={ev => ev.stopPropagation()}><button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button></td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
      <PaymentModal open={payOpen && !selected} onClose={() => setPayOpen(false)} title={payTarget ? `Record payment — ${payTarget.title}` : "Record payment"} outstanding={payTarget ? payTarget.amount - payTarget.paid : 0} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 17 — FINANCE MANAGEMENT
// ══════════════════════════════════════════════════════════════════════════════

const finPeriods = ["Today", "7 Days", "30 Days", "3 Months", "1 Year"];

const finTransactions = [
  { date: "4 Sep", ref: "SE-20483", type: "Sale", desc: "POS Sale — Mahbub", amount: 8450, positive: true },
  { date: "4 Sep", ref: "ORD-4821", type: "Online Sale", desc: "Online Order — Farhan Ahmed", amount: 5710, positive: true },
  { date: "4 Sep", ref: "PAY-C-0081", type: "Customer Payment", desc: "Rahim Electronics", amount: 5000, positive: true },
  { date: "4 Sep", ref: "PAY-0091", type: "Supplier Payment", desc: "Walton Distributor — Dhaka", amount: 300000, positive: false },
  { date: "4 Sep", ref: "EXP-00990", type: "Expense", desc: "Electricity Bill — DESCO", amount: 18500, positive: false },
  { date: "3 Sep", ref: "SE-20481", type: "Sale", desc: "POS Sale — MD. SELIM", amount: 14200, positive: true },
  { date: "3 Sep", ref: "PAY-C-0080", type: "Customer Payment", desc: "City Electric House", amount: 12000, positive: true },
  { date: "2 Sep", ref: "EXP-00989", type: "Expense", desc: "Internet Bill", amount: 3500, positive: false },
];

// Minimal SVG sparkline for finance chart
function FinanceChart({ period }: { period: string }) {
  const W = 700; const H = 160; const P = 32;
  const rev =    [180, 220, 195, 240, 210, 284, 260, 275, 310, 284];
  const exp =    [ 60,  70,  65,  80,  72,  85,  78,  82,  90,  85];
  const profit = rev.map((r, i) => r - exp[i]);
  const all = [...rev, ...exp, ...profit];
  const maxV = Math.max(...all); const minV = Math.min(...all);
  const scaleY = (v: number) => P + (H - 2 * P) * (1 - (v - minV) / (maxV - minV));
  const scaleX = (i: number) => P + (i / (rev.length - 1)) * (W - 2 * P);
  const line = (data: number[]) => data.map((v, i) => `${i === 0 ? "M" : "L"}${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(" ");
  const labels = period === "Today" ? ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM"]
    : period === "7 Days" ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun","","",""]
    : ["1","","","","7","","","","","30"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
      <path d={line(rev)} fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={line(exp)} fill="none" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={line(profit)} fill="none" stroke="var(--success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {rev.map((_, i) => i % 3 === 0 && (
        <line key={i} x1={scaleX(i)} y1={P} x2={scaleX(i)} y2={H - P} stroke="var(--border)" strokeWidth="0.5" />
      ))}
      {labels.filter(Boolean).map((l, i) => i % 2 === 0 && <text key={i} x={scaleX(i * 1)} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" fontFamily="var(--font-sans)">{l}</text>)}
    </svg>
  );
}

function FinancePage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [period, setPeriod] = useState("30 Days");
  const [txFilter, setTxFilter] = useState("All");

  const filteredTx = finTransactions.filter(t => txFilter === "All" || t.type === txFilter || (txFilter === "Sales" && t.type.includes("Sale")) || (txFilter === "Customer Payments" && t.type === "Customer Payment") || (txFilter === "Supplier Payments" && t.type === "Supplier Payment") || (txFilter === "Expenses" && t.type === "Expense"));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1200px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div><h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">Finance</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Monitor revenue, expenses, profit and outstanding balances.</p></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
              {finPeriods.map(p => <FilterChip key={p} label={p} active={period === p} onClick={() => setPeriod(p)} />)}
            </div>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn>
          </div>
        </div>

        {/* KPI row — 5 cards */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Revenue", value: "৳ 2,84,500", sub: "↑ 8.6% vs prev" },
            { label: "Cost of Goods Sold", value: "৳ 2,21,700", sub: "" },
            { label: "Gross Profit", value: "৳ 62,800", sub: "22.1% margin" },
            { label: "Expenses", value: "৳ 18,500", sub: "" },
            { label: "Net Profit", value: "৳ 44,300", sub: "15.6% margin" },
          ].map(c => (
            <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3">
              <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div>
              <div className="text-[18px] font-bold text-[var(--foreground)] leading-tight">{c.value}</div>
              {c.sub && <div className="text-[11px] text-[var(--success)] mt-0.5">{c.sub}</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Financial Overview chart */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Financial overview</div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-px w-5 bg-[var(--foreground)]" /> Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-px w-5 border-t border-dashed border-[var(--muted-foreground)]" /> Expenses</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-px w-5 bg-[var(--success)]" /> Net Profit</span>
                </div>
              </div>
              <FinanceChart period={period} />
            </div>

            {/* Cash flow */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight mb-4">Cash flow</div>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: "Money In", value: "৳ 31,20,000", sub: "Customer payments · Sales", pos: true },
                  { label: "Money Out", value: "৳ 26,80,000", sub: "Supplier payments · Expenses", pos: false },
                  { label: "Net Cash Flow", value: "৳ 4,40,000", sub: "Positive cash position", pos: true }].map(c => (
                  <div key={c.label} className="border border-[var(--border)] rounded-lg p-4">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div>
                    <div className={`text-[17px] font-bold ${c.label === "Net Cash Flow" ? "text-[var(--success)]" : "text-[var(--foreground)]"}`}>{c.value}</div>
                    <div className="text-[11px] text-[var(--muted-foreground)] mt-1">{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Recent financial activity</div>
                <div className="flex items-center gap-1 p-0.5 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
                  {["All","Sales","Customer Payments","Supplier Payments","Expenses"].map(f => <FilterChip key={f} label={f === "All" ? "All" : f.replace(" Payments","").replace("Supplier","Supplier")} active={txFilter === f} onClick={() => setTxFilter(f)} />)}
                </div>
              </div>
              <table className="w-full text-[13px]">
                <thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Date","Reference","Type","Description","Amount"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${h === "Amount" ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredTx.map((t, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                      <td className="px-4 py-3 text-[var(--muted-foreground)] whitespace-nowrap">{t.date}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--foreground)]">{t.ref}</td>
                      <td className="px-4 py-3"><Badge variant={t.positive ? "success" : "default"}>{t.type}</Badge></td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{t.desc}</td>
                      <td className="px-4 py-3 text-right"><span className={`font-semibold ${t.positive ? "text-[var(--success)]" : "text-[var(--foreground)]"}`}>{t.positive ? "+" : "−"}{fmt(t.amount)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Business position */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Business position</div>
              <div className="space-y-3">
                {[{ label: "Customer Receivables", value: "৳ 34,10,200", action: "View Customer Dues", nav: "customer-dues", color: "text-[var(--warning)]" },
                  { label: "Supplier Payables", value: "৳ 27,10,000", action: "View Supplier Payables", nav: "supplier-payables", color: "text-[var(--warning)]" },
                  { label: "Inventory Value", value: "৳ 1,84,50,000", action: "View Inventory", nav: "inventory", color: "text-[var(--foreground)]" }].map(item => (
                  <div key={item.label} className="border border-[var(--border)] rounded-lg p-3">
                    <div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{item.label}</div>
                    <div className={`text-[15px] font-bold mb-2 ${item.color}`}>{item.value}</div>
                    <button className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" onClick={() => onNavigate(item.nav)}>{item.action} →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick breakdown */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Revenue by channel</div>
              <div className="space-y-2.5">
                {[{ label: "POS Sales", value: 240000, pct: 84 }, { label: "Online Orders", value: 44500, pct: 16 }].map(c => (
                  <div key={c.label}>
                    <div className="flex justify-between text-[12px] mb-1"><span className="text-[var(--muted-foreground)]">{c.label}</span><span className="font-medium text-[var(--foreground)]">{fmt(c.value)}</span></div>
                    <div className="h-1.5 rounded-full bg-[var(--secondary)] border border-[var(--border)]"><div className="h-full rounded-full bg-[var(--foreground)]" style={{ width: `${c.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Expense breakdown</div>
              <div className="space-y-2">
                {[{ label: "Rent", pct: 61 }, { label: "Utilities", pct: 14 }, { label: "Salaries", pct: 16 }, { label: "Other", pct: 9 }].map(e => (
                  <div key={e.label} className="flex items-center gap-2 text-[12px]">
                    <span className="text-[var(--muted-foreground)] w-20 shrink-0">{e.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--secondary)] border border-[var(--border)]"><div className="h-full rounded-full bg-[var(--muted-foreground)]" style={{ width: `${e.pct}%` }} /></div>
                    <span className="text-[var(--muted-foreground)] w-8 text-right">{e.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 18 — REPORTS & ANALYTICS
// ══════════════════════════════════════════════════════════════════════════════

type ReportTab = "sales" | "products" | "inventory" | "purchases" | "customers" | "expenses" | "finance";

const reportTabLabels: Record<ReportTab, string> = {
  sales: "Sales", products: "Products", inventory: "Inventory",
  purchases: "Purchases", customers: "Customers", expenses: "Expenses", finance: "Finance",
};

// Simple horizontal bar helper
function HBar({ label, value, max, formatted }: { label: string; value: number; max: number; formatted: string }) {
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <span className="text-[var(--muted-foreground)] w-28 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[var(--secondary)] border border-[var(--border)]"><div className="h-full rounded-full bg-[var(--foreground)]" style={{ width: `${(value / max) * 100}%` }} /></div>
      <span className="font-medium text-[var(--foreground)] w-24 text-right">{formatted}</span>
    </div>
  );
}

// Compact sparkline for sales report
function ReportSparkline() {
  const data = [420, 580, 510, 640, 720, 680, 810, 750, 920, 840, 1080, 960];
  const W = 600; const H = 100; const P = 16;
  const max = Math.max(...data); const min = Math.min(...data);
  const sx = (i: number) => P + (i / (data.length - 1)) * (W - 2 * P);
  const sy = (v: number) => P + (H - 2 * P) * (1 - (v - min) / (max - min));
  const d = data.map((v, i) => `${i === 0 ? "M" : "L"}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");
  const area = d + ` L${sx(data.length - 1).toFixed(1)},${H - P} L${sx(0).toFixed(1)},${H - P} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 100 }}>
      <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.06" /><stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill="url(#rg)" />
      <path d={d} fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportsPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [tab, setTab] = useState<ReportTab>("sales");
  const [period, setPeriod] = useState("This Month");

  const reportPeriods = ["Today", "This Week", "This Month", "Last Month", "3 Months", "1 Year"];

  const renderReport = () => {
    switch (tab) {
      case "sales": return (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[{ label: "Total Sales", value: "৳ 84,20,000" }, { label: "Orders", value: "1,284" }, { label: "Avg. Order Value", value: "৳ 6,557" }, { label: "Total Discounts", value: "৳ 1,84,500" }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className="text-[18px] font-bold text-[var(--foreground)]">{c.value}</div></div>
            ))}
          </div>
          {/* Sales trend */}
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-3"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Sales performance</div><div className="flex items-center gap-1 p-0.5 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">{["7d","30d","3m","1y"].map(p => <FilterChip key={p} label={p} active={p === "30d"} onClick={() => {}} />)}</div></div>
            <ReportSparkline />
          </div>
          {/* Top products */}
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Top products by revenue</div><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]" onClick={() => setTab("products")}>See product report →</button></div>
            <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["#","Product","Units Sold","Revenue","Profit"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Units Sold","Revenue","Profit"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
              <tbody>{[{ n: "Walton Ceiling Fan 56\"", u: 142, rev: 681600, profit: 71000 }, { n: "Philips LED Bulb 12W", u: 896, rev: 134400, profit: 44800 }, { n: "Vision Table Fan 12\"", u: 204, rev: 499800, profit: 71400 }, { n: "Butterfly Socket 3 Pin", u: 418, rev: 54340, profit: 14630 }, { n: "Havells Cable 2.5mm", u: 88, rev: 54560, profit: 8800 }].map((p, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 text-[var(--muted-foreground)] font-mono text-[11px]">{i + 1}</td><td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.n}</td><td className="px-4 py-3 text-right text-[var(--foreground)]">{p.u.toLocaleString()}</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(p.rev)}</td><td className="px-4 py-3 text-right text-[var(--success)]">{fmt(p.profit)}</td></tr>
              ))}</tbody>
            </table>
          </div>
          {/* Sales channel */}
          <div className="grid grid-cols-2 gap-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight mb-4">Sales by channel</div>
              <div className="space-y-3">
                <HBar label="POS" value={6840000} max={8420000} formatted="৳ 68,40,000" />
                <HBar label="Online" value={1580000} max={8420000} formatted="৳ 15,80,000" />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight mb-4">Payment method distribution</div>
              <div className="space-y-3">
                {[{ l: "Cash", v: 3200000 }, { l: "bKash", v: 2100000 }, { l: "Bank", v: 1480000 }, { l: "SSLCommerz", v: 1080000 }, { l: "Nagad", v: 560000 }].map(r => <HBar key={r.l} label={r.l} value={r.v} max={3200000} formatted={fmt(r.v)} />)}
              </div>
            </div>
          </div>
        </div>
      );

      case "products": return (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[{ label: "Total Products", value: "248" }, { label: "Top Sellers", value: "28" }, { label: "Slow Moving", value: "42" }, { label: "Out of Stock", value: "7" }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className="text-[18px] font-bold text-[var(--foreground)]">{c.value}</div></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Top selling products</div>
              <div className="space-y-3">{[{ l: "Walton Ceiling Fan 56\"", v: 142 }, { l: "Philips LED Bulb 12W", v: 896 }, { l: "Vision Table Fan 12\"", v: 204 }, { l: "Butterfly Socket 3 Pin", v: 418 }].map(p => <HBar key={p.l} label={p.l} value={p.v} max={896} formatted={`${p.v} units`} />)}</div>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Slow-moving items</div>
              <div className="space-y-2 text-[13px]">{[{ name: "Panasonic Wall Fan 16\"", days: 38 }, { name: "Super Star LED Tube 36W", days: 52 }, { name: "Standard Holder B22", days: 61 }].map(p => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-b-0"><span className="text-[var(--foreground)] font-medium">{p.name}</span><Badge variant="warning">{p.days}d no sale</Badge></div>
              ))}</div>
            </div>
          </div>
        </div>
      );

      case "inventory": return (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[{ label: "Total Inventory Value", value: "৳ 1,84,50,000" }, { label: "Total Units", value: "4,826" }, { label: "Low Stock Items", value: "18", warn: true }, { label: "Out of Stock", value: "7", err: true }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className={`text-[18px] font-bold ${c.err ? "text-[var(--error)]" : c.warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{c.value}</div></div>
            ))}
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Inventory by product</div><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]" onClick={() => onNavigate("inventory")}>Open inventory →</button></div>
            <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Product","Stock","Inventory Value","Last Sale","Status"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Stock","Inventory Value"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
              <tbody>{inventoryData.slice(0, 6).map((p, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.name}</td><td className="px-4 py-3 text-right"><span className={p.status === "out_of_stock" ? "text-[var(--error)] font-bold" : p.status === "low_stock" ? "text-[var(--warning)] font-bold" : "text-[var(--foreground)]"}>{p.stock}</span></td><td className="px-4 py-3 text-right text-[var(--foreground)]">{fmt(p.stock * p.buyingPrice)}</td><td className="px-4 py-3 text-[var(--muted-foreground)]">4 Sep 2026</td><td className="px-4 py-3"><Badge variant={invStatusMap[p.status].v} dot>{invStatusMap[p.status].l}</Badge></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      );

      case "purchases": return (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[{ label: "Total Purchases", value: "৳ 35,80,000" }, { label: "Purchase Orders", value: "86" }, { label: "Avg. PO Value", value: "৳ 41,628" }, { label: "Outstanding Payables", value: "৳ 27,10,000", warn: true }].map(c => (
              <div key={c.label} className={`border rounded-xl bg-[var(--card)] px-4 py-3 ${(c as any).warn ? "border-[var(--warning-border)]" : "border-[var(--border)]"}`}><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className={`text-[18px] font-bold ${(c as any).warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{c.value}</div></div>
            ))}
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
            <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Top suppliers by purchase value</div>
            <div className="space-y-3">{[{ l: "Walton Distributor — Dhaka", v: 1850000, p: 1600000, d: 250000 }, { l: "Philips Bangladesh Ltd.", v: 920000, p: 920000, d: 0 }, { l: "Vision Electronics Dist.", v: 680000, p: 360000, d: 320000 }, { l: "Havells Bangladesh", v: 450000, p: 450000, d: 0 }].map(s => (
              <div key={s.l} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-b-0 text-[13px]">
                <div className="w-48 truncate text-[var(--foreground)] font-medium">{s.l}</div>
                <div className="flex gap-8 text-right"><div><div className="text-[10px] text-[var(--muted-foreground)]">Purchased</div><div className="font-semibold text-[var(--foreground)]">{fmt(s.v)}</div></div><div><div className="text-[10px] text-[var(--muted-foreground)]">Paid</div><div className="text-[var(--success)]">{fmt(s.p)}</div></div><div><div className="text-[10px] text-[var(--muted-foreground)]">Outstanding</div><div className={s.d > 0 ? "text-[var(--warning)] font-semibold" : "text-[var(--muted-foreground)]"}>{s.d > 0 ? fmt(s.d) : "—"}</div></div></div>
              </div>
            ))}</div>
          </div>
        </div>
      );

      case "customers": return (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[{ label: "Total Customers", value: "2,840" }, { label: "New This Month", value: "48" }, { label: "Active", value: "2,610" }, { label: "Customers With Due", value: "184", warn: true }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className={`text-[18px] font-bold ${(c as any).warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{c.value}</div></div>
            ))}
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--border)] flex justify-between"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Top customers by spending</div><button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]" onClick={() => onNavigate("customers")}>Open customers →</button></div>
            <table className="w-full text-[13px]"><thead><tr className="border-b border-[var(--border)] bg-[var(--secondary)]">{["Customer","Orders","Total Spent","Outstanding"].map(h => <th key={h} className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] ${["Orders","Total Spent","Outstanding"].includes(h) ? "text-right" : "text-left"}`}>{h}</th>)}</tr></thead>
              <tbody>{allCustomers.map((c, i) => <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors"><td className="px-4 py-3 font-medium text-[var(--foreground)]">{c.name}<div className="text-[10px] font-mono text-[var(--muted-foreground)]">{c.customerId}</div></td><td className="px-4 py-3 text-right text-[var(--muted-foreground)]">{c.orders}</td><td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">{fmt(c.totalSpent)}</td><td className="px-4 py-3 text-right">{c.outstanding > 0 ? <span className="text-[var(--warning)] font-semibold">{fmt(c.outstanding)}</span> : <span className="text-[var(--muted-foreground)]">—</span>}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      );

      case "expenses": return (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[{ label: "Total Expenses", value: "৳ 2,48,500" }, { label: "Unpaid", value: "৳ 35,000", warn: true }, { label: "Largest Category", value: "Rent · ৳ 80,000" }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className={`text-[18px] font-bold ${(c as any).warn ? "text-[var(--warning)]" : "text-[var(--foreground)]"}`}>{c.value}</div></div>
            ))}
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
            <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Expenses by category</div>
            <div className="space-y-3">{[{ l: "Rent", v: 80000 }, { l: "Utilities", v: 18500 }, { l: "Salaries", v: 12000 }, { l: "Delivery", v: 4800 }, { l: "Internet", v: 3500 }, { l: "Office", v: 1700 }, { l: "Packaging", v: 0 }].filter(e => e.v > 0).map(e => <HBar key={e.l} label={e.l} value={e.v} max={80000} formatted={fmt(e.v)} />)}</div>
          </div>
        </div>
      );

      case "finance": return (
        <div className="space-y-5">
          <div className="grid grid-cols-5 gap-4">
            {[{ label: "Revenue", value: "৳ 2,84,500" }, { label: "COGS", value: "৳ 2,21,700" }, { label: "Gross Profit", value: "৳ 62,800" }, { label: "Expenses", value: "৳ 18,500" }, { label: "Net Profit", value: "৳ 44,300" }].map(c => (
              <div key={c.label} className="border border-[var(--border)] rounded-xl bg-[var(--card)] px-4 py-3"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">{c.label}</div><div className="text-[16px] font-bold text-[var(--foreground)]">{c.value}</div></div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Receivables</div>
              <div className="text-[24px] font-bold text-[var(--warning)] mb-1">৳ 34,10,200</div>
              <div className="text-[12px] text-[var(--muted-foreground)] mb-3">Outstanding dues from 184 customers</div>
              <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" onClick={() => onNavigate("customer-dues")}>View Customer Dues →</button>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[13px] font-semibold text-[var(--foreground)] mb-4">Payables</div>
              <div className="text-[24px] font-bold text-[var(--warning)] mb-1">৳ 27,10,000</div>
              <div className="text-[12px] text-[var(--muted-foreground)] mb-3">Outstanding amounts owed to suppliers</div>
              <button className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" onClick={() => onNavigate("supplier-payables")}>View Supplier Payables →</button>
            </div>
          </div>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] px-5 py-4 flex items-center gap-3">
            <Icon d={icons.info} size={14} />
            <p className="text-[12px] text-[var(--muted-foreground)]">This report is a read-only summary. To modify transactions, navigate to the source module.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1200px] mx-auto space-y-5">
        <div className="flex items-start justify-between">
          <div><h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">Reports</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Analyze sales, inventory, purchases and financial performance.</p></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
              {reportPeriods.map(p => <FilterChip key={p} label={p} active={period === p} onClick={() => setPeriod(p)} />)}
            </div>
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export Report</Btn>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-xl w-fit">
          {(Object.keys(reportTabLabels) as ReportTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${tab === t ? "bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] shadow-sm" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>
              {reportTabLabels[t]}
            </button>
          ))}
        </div>

        {renderReport()}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 19 — EMPLOYEES, ROLES & PERMISSIONS
// ══════════════════════════════════════════════════════════════════════════════

type EmployeeRole = "Owner" | "Manager" | "Cashier" | "Inventory Staff" | "Delivery Staff";
type EmployeeStatus = "active" | "inactive";

interface Employee {
  id: number; employeeId: string; name: string; phone: string; email?: string;
  role: EmployeeRole; status: EmployeeStatus; lastActive: string; notes?: string;
}

const empStatusMap: Record<EmployeeStatus, { v: BadgeVariant; l: string }> = {
  active: { v: "success", l: "Active" }, inactive: { v: "muted", l: "Inactive" },
};
const empRoleMap: Record<EmployeeRole, BadgeVariant> = {
  Owner: "default", Manager: "info", Cashier: "default", "Inventory Staff": "default", "Delivery Staff": "default",
};

const allEmployees: Employee[] = [
  { id: 1, employeeId: "EMP-00001", name: "MD. SELIM", phone: "01712 000001", email: "selim@selimelectronics.com", role: "Owner", status: "active", lastActive: "Today" },
  { id: 2, employeeId: "EMP-00012", name: "Mahbub Rahman", phone: "01712 345678", email: "mahbub@email.com", role: "Cashier", status: "active", lastActive: "Today" },
  { id: 3, employeeId: "EMP-00013", name: "Rahim Ahmed", phone: "01812 456789", email: "", role: "Delivery Staff", status: "active", lastActive: "Today" },
  { id: 4, employeeId: "EMP-00014", name: "Karim Hasan", phone: "01912 567890", email: "", role: "Inventory Staff", status: "inactive", lastActive: "28 Aug 2026", notes: "On leave until Oct 2026." },
  { id: 5, employeeId: "EMP-00011", name: "Nasrin Akter", phone: "01611 678901", email: "nasrin@email.com", role: "Manager", status: "active", lastActive: "3 Sep 2026" },
  { id: 6, employeeId: "EMP-00015", name: "Jamal Uddin", phone: "01511 789012", email: "", role: "Delivery Staff", status: "active", lastActive: "Today" },
];

const recentActivity = [
  { action: "Created Sale SE-20483", time: "4 Sep · 2:14 PM" },
  { action: "Updated Customer CUS-002841", time: "4 Sep · 1:48 PM" },
  { action: "Recorded payment PAY-C-0081", time: "4 Sep · 1:30 PM" },
  { action: "Applied discount on SE-20480", time: "3 Sep · 4:22 PM" },
];

// Permission matrix data
type PermLevel = "full" | "view" | "none";
const permMatrix: { module: string; Owner: PermLevel; Manager: PermLevel; Cashier: PermLevel; "Inventory Staff": PermLevel; "Delivery Staff": PermLevel }[] = [
  { module: "Dashboard", Owner: "full", Manager: "full", Cashier: "view", "Inventory Staff": "view", "Delivery Staff": "view" },
  { module: "POS", Owner: "full", Manager: "full", Cashier: "full", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Products", Owner: "full", Manager: "full", Cashier: "view", "Inventory Staff": "full", "Delivery Staff": "none" },
  { module: "Inventory", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "full", "Delivery Staff": "none" },
  { module: "Purchases", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "full", "Delivery Staff": "none" },
  { module: "Suppliers", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "view", "Delivery Staff": "none" },
  { module: "Sales", Owner: "full", Manager: "full", Cashier: "full", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Customers", Owner: "full", Manager: "full", Cashier: "full", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Customer Dues", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Orders", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "view" },
  { module: "Delivery", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "full" },
  { module: "Expenses", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Finance", Owner: "full", Manager: "view", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Reports", Owner: "full", Manager: "full", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Employees", Owner: "full", Manager: "none", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
  { module: "Notifications", Owner: "full", Manager: "full", Cashier: "view", "Inventory Staff": "view", "Delivery Staff": "view" },
  { module: "Settings", Owner: "full", Manager: "none", Cashier: "none", "Inventory Staff": "none", "Delivery Staff": "none" },
];

const permCell = (level: PermLevel) => {
  if (level === "full") return <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-[var(--foreground)]"><Icon d={icons.check} size={10} stroke={2.5} /></span>;
  if (level === "view") return <span className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-[var(--border)]"><Icon d={icons.eye} size={10} /></span>;
  return <span className="inline-flex items-center justify-center h-6 w-6 rounded-md text-[var(--border)]"><Icon d={icons.x} size={10} /></span>;
};

type EmpView = "list" | "detail" | "form" | "roles";

function EmployeesPage({ onNavigate: _ }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<EmpView>("list");
  const [selected, setSelected] = useState<Employee | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [roleChangeOpen, setRoleChangeOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<EmployeeRole>("Manager");
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "Cashier" as EmployeeRole, status: "active" as EmployeeStatus, notes: "" });

  const ff = (f: string) => (v: string) => setForm(p => ({ ...p, [f]: v }));

  const filtered = allEmployees.filter(e => {
    const q = searchQ.toLowerCase();
    const mQ = !q || e.name.toLowerCase().includes(q) || e.phone.includes(q) || e.employeeId.toLowerCase().includes(q);
    const mR = filterRole === "All" || e.role === filterRole;
    const mS = filterStatus === "All" || e.status === filterStatus.toLowerCase();
    return mQ && mR && mS;
  });

  const openAdd = () => { setFormMode("add"); setForm({ name: "", phone: "", email: "", role: "Cashier", status: "active", notes: "" }); setView("form"); };
  const openEdit = (e: Employee) => { setFormMode("edit"); setSelected(e); setForm({ name: e.name, phone: e.phone, email: e.email || "", role: e.role, status: e.status, notes: e.notes || "" }); setView("form"); };

  // Roles & Permissions view
  if (view === "roles") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Employees</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">Roles & Permissions</span>
        </div>
        {/* Role cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {(["Owner","Manager","Cashier","Inventory Staff","Delivery Staff"] as EmployeeRole[]).map(role => {
            const count = allEmployees.filter(e => e.role === role).length;
            const fullCount = permMatrix.filter(m => m[role] === "full").length;
            return (
              <div key={role} className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
                <div className="text-[12px] font-semibold text-[var(--foreground)] mb-1">{role}</div>
                <div className="text-[11px] text-[var(--muted-foreground)] mb-3">{count} employee{count !== 1 ? "s" : ""}</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">{fullCount} full access modules</div>
              </div>
            );
          })}
        </div>
        {/* Permission matrix */}
        <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)]">
            <div className="text-[13px] font-semibold text-[var(--foreground)]">Permission matrix</div>
            <div className="flex items-center gap-4 mt-2 text-[11px] text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5"><span className="inline-flex h-4 w-4 rounded bg-[var(--foreground)] items-center justify-center"><Icon d={icons.check} size={8} stroke={2.5} /></span> Full access</span>
              <span className="flex items-center gap-1.5"><span className="inline-flex h-4 w-4 rounded border border-[var(--border)] items-center justify-center"><Icon d={icons.eye} size={8} /></span> View only</span>
              <span className="flex items-center gap-1.5"><span className="inline-flex h-4 w-4 rounded items-center justify-center text-[var(--border)]"><Icon d={icons.x} size={8} /></span> No access</span>
            </div>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] w-36">Module</th>
                {(["Owner","Manager","Cashier","Inventory Staff","Delivery Staff"] as EmployeeRole[]).map(r => (
                  <th key={r} className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permMatrix.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] transition-colors">
                  <td className="px-4 py-2.5 text-[var(--foreground)] font-medium text-[12px]">{row.module}</td>
                  {(["Owner","Manager","Cashier","Inventory Staff","Delivery Staff"] as EmployeeRole[]).map(r => (
                    <td key={r} className="px-4 py-2.5 text-center">{permCell(row[r])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 border border-[var(--border)] rounded-xl bg-[var(--secondary)] px-5 py-4 text-[12px] text-[var(--muted-foreground)]">
          Permissions are enforced by the backend. Hiding navigation items alone is not a security boundary. This matrix represents the intended access model.
        </div>
      </div>
    </div>
  );

  // Add/Edit form
  if (view === "form") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[700px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView(selected ? "detail" : "list")}>{selected ? "Employee" : "Employees"}</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{formMode === "add" ? "Add Employee" : "Edit Employee"}</span>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Employee information</div>
              <Input label="Full Name" value={form.name} onChange={e => ff("name")(e.target.value)} placeholder="Employee full name" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Phone" value={form.phone} onChange={e => ff("phone")(e.target.value)} placeholder="01712 345678" />
                <Input label="Email" type="email" value={form.email} onChange={e => ff("email")(e.target.value)} placeholder="Optional" />
              </div>
              <SelectField label="Role" value={form.role} onChange={v => ff("role")(v)} options={(["Owner","Manager","Cashier","Inventory Staff","Delivery Staff"] as EmployeeRole[]).map(r => ({ value: r, label: r }))} />
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5 space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Notes</div>
              <textarea value={form.notes} onChange={e => ff("notes")(e.target.value)} rows={2} placeholder="Internal notes…" className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Account status</div>
              <SelectField value={form.status} onChange={v => ff("status")(v)} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />
            </div>
            {formMode === "add" && <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] p-4 text-[12px] text-[var(--muted-foreground)]">Employee ID will be generated automatically. Login credentials will be set up separately.</div>}
            <div className="space-y-2">
              <Btn variant="primary" className="w-full" onClick={() => setView("list")} iconLeft={<Icon d={icons.check} size={14} />}>{formMode === "add" ? "Add Employee" : "Save Changes"}</Btn>
              <Btn variant="secondary" className="w-full" onClick={() => setView(selected ? "detail" : "list")}>Cancel</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Detail view
  if (view === "detail" && selected) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[900px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Employees</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">{selected.name}</span>
          <Badge variant={empStatusMap[selected.status].v} dot>{empStatusMap[selected.status].l}</Badge>
          <Badge variant={empRoleMap[selected.role]}>{selected.role}</Badge>
          <div className="flex-1" />
          <Btn variant="secondary" size="sm" onClick={() => openEdit(selected)}>Edit</Btn>
          {selected.status === "active" && <Btn variant="ghost" size="sm" onClick={() => setDeactivateOpen(true)}>Deactivate</Btn>}
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            {/* Info */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-5">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">Employee information</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                {[{ l: "Employee ID", v: selected.employeeId, mono: true }, { l: "Full Name", v: selected.name }, { l: "Phone", v: selected.phone, mono: true }, { l: "Email", v: selected.email || "—" }, { l: "Role", v: selected.role }, { l: "Last Active", v: selected.lastActive }].map(f => (
                  <div key={f.l}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.l}</div><div className={`font-medium text-[var(--foreground)] ${f.mono ? "font-mono text-[12px]" : ""}`}>{f.v}</div></div>
                ))}
              </div>
              {selected.notes && <div className="mt-4 pt-4 border-t border-[var(--border)]"><div className="text-[11px] text-[var(--muted-foreground)] mb-1">Notes</div><p className="text-[13px] text-[var(--muted-foreground)]">{selected.notes}</p></div>}
            </div>
            {/* Recent activity */}
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)] tracking-tight">Recent activity</div></div>
              <div className="divide-y divide-[var(--border)]">
                {recentActivity.map((a, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-[13px] text-[var(--foreground)]">{a.action}</span>
                    <span className="text-[11px] text-[var(--muted-foreground)]">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="space-y-4">
            <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Role permissions</div>
              <div className="text-[13px] font-semibold text-[var(--foreground)] mb-2">{selected.role}</div>
              <div className="space-y-1.5 text-[12px]">
                {permMatrix.filter(m => m[selected.role] !== "none").map(m => (
                  <div key={m.module} className="flex items-center justify-between">
                    <span className="text-[var(--muted-foreground)]">{m.module}</span>
                    <span className="text-[var(--foreground)] font-medium">{m[selected.role] === "full" ? "Full" : "View"}</span>
                  </div>
                ))}
              </div>
              <button className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] mt-3 transition-colors" onClick={() => setView("roles")}>View permission matrix →</button>
            </div>
            <Btn variant="secondary" size="sm" className="w-full" onClick={() => { setPendingRole(selected.role === "Cashier" ? "Manager" : "Cashier"); setRoleChangeOpen(true); }}>Change Role</Btn>
          </div>
        </div>
      </div>
      {/* Modals */}
      <Modal open={deactivateOpen} onClose={() => setDeactivateOpen(false)} title="Deactivate employee?" size="sm">
        <p className="text-[13px] text-[var(--muted-foreground)] mb-5">The employee will lose access to the system. Historical activity will remain available.</p>
        <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setDeactivateOpen(false)}>Cancel</Btn><Btn variant="destructive" onClick={() => { setDeactivateOpen(false); setView("list"); }}>Deactivate</Btn></div>
      </Modal>
      <Modal open={roleChangeOpen} onClose={() => setRoleChangeOpen(false)} title="Change role?" size="sm">
        <div className="bg-[var(--secondary)] rounded-lg px-4 py-3 mb-4">
          <div className="text-[13px] font-medium text-[var(--foreground)] mb-2">{selected.name}</div>
          <div className="flex items-center gap-3 text-[12px]"><span className="text-[var(--muted-foreground)]">Current: <strong className="text-[var(--foreground)]">{selected.role}</strong></span><Icon d={icons.arrowRight} size={12} /><span className="text-[var(--muted-foreground)]">New: <strong className="text-[var(--foreground)]">{pendingRole}</strong></span></div>
        </div>
        <p className="text-[12px] text-[var(--muted-foreground)] mb-5">Changing this role will update the employee's system access.</p>
        <SelectField label="New role" value={pendingRole} onChange={v => setPendingRole(v as EmployeeRole)} options={(["Owner","Manager","Cashier","Inventory Staff","Delivery Staff"] as EmployeeRole[]).filter(r => r !== selected.role).map(r => ({ value: r, label: r }))} />
        <div className="flex gap-2 justify-end mt-4"><Btn variant="secondary" onClick={() => setRoleChangeOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => setRoleChangeOpen(false)}>Update Role</Btn></div>
      </Modal>
    </div>
  );

  // List view
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1200px] mx-auto space-y-5">
        <PageHeader title="Employees" subtitle="Manage staff access and system permissions." actions={<><Btn variant="secondary" size="sm" onClick={() => setView("roles")}>Roles & Permissions</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Employee</Btn></>} />
        <KpiRow cards={[{ label: "Total Employees", value: "12" }, { label: "Active", value: "10" }, { label: "Inactive", value: "2" }, { label: "Roles", value: "5" }]} />
        <FilterBar>
          <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name, phone or employee ID…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Active","Inactive"].map(f => <FilterChip key={f} label={f} active={filterStatus === f} onClick={() => setFilterStatus(f)} />)}
          </div>
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            <span className="px-2 text-[11px] text-[var(--muted-foreground)]">Role:</span>
            {["All","Owner","Manager","Cashier","Inventory Staff","Delivery Staff"].map(f => <FilterChip key={f} label={f} active={filterRole === f} onClick={() => setFilterRole(f)} />)}
          </div>
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> employees</span>
        </FilterBar>
        {filtered.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.employees} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">No employees found</div>
            <div className="text-[13px] text-[var(--muted-foreground)] mb-4">Add an employee to start managing system access.</div>
            <Btn variant="primary" size="sm" iconLeft={<Icon d={icons.plus} size={13} />} onClick={openAdd}>Add Employee</Btn>
          </div>
        ) : (
          <TableWrap
            head={[{ label: "Employee" }, { label: "Employee ID" }, { label: "Role" }, { label: "Phone" }, { label: "Status" }, { label: "Last Active" }, { label: "" }]}
            footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filtered.length} employees</span><Pagination total={filtered.length} /></>}
          >
            {filtered.map(e => (
              <tr key={e.id} onClick={() => { setSelected(e); setView("detail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--muted-foreground)] shrink-0">{e.name.slice(0,2).toUpperCase()}</div><div className="font-semibold text-[var(--foreground)]">{e.name}</div></div>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--muted-foreground)]">{e.employeeId}</td>
                <td className="px-4 py-3"><Badge variant={empRoleMap[e.role]}>{e.role}</Badge></td>
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--muted-foreground)]">{e.phone}</td>
                <td className="px-4 py-3"><Badge variant={empStatusMap[e.status].v} dot>{empStatusMap[e.status].l}</Badge></td>
                <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{e.lastActive}</td>
                <td className="px-4 py-3" onClick={ev => ev.stopPropagation()}><button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"><Icon d={icons.moreVertical} size={15} /></button></td>
              </tr>
            ))}
          </TableWrap>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 20 — NOTIFICATIONS & ACTIVITY/AUDIT
// ══════════════════════════════════════════════════════════════════════════════

interface Notification {
  id: number; type: "order" | "inventory" | "payment" | "purchase" | "delivery" | "customer" | "system";
  title: string; body: string; time: string; read: boolean; nav?: string;
}

const notifTypeIcon: Record<Notification["type"], string> = {
  order: icons.orders, inventory: icons.inventory, payment: icons.wallet,
  purchase: icons.purchases, delivery: icons.delivery, customer: icons.customers, system: icons.settings,
};

const sampleNotifications: Notification[] = [
  { id: 1, type: "order", title: "New online order", body: "#ORD-4821 · ৳14,200", time: "2 min ago", read: false, nav: "orders" },
  { id: 2, type: "inventory", title: "Low stock alert", body: "Philips LED Bulb 12W has only 6 units remaining.", time: "18 min ago", read: false, nav: "inventory" },
  { id: 3, type: "payment", title: "Payment received", body: "Rahim Electronics paid ৳5,000.", time: "42 min ago", read: false, nav: "customer-dues" },
  { id: 4, type: "purchase", title: "Purchase received", body: "PO-2048 was received and inventory updated.", time: "1 hr ago", read: false, nav: "purchases" },
  { id: 5, type: "delivery", title: "Delivery update", body: "Order #ORD-4818 is out for delivery.", time: "2 hr ago", read: true, nav: "delivery" },
  { id: 6, type: "inventory", title: "Out of stock", body: "Vision Table Fan 12\" is now out of stock.", time: "3 hr ago", read: true, nav: "inventory" },
  { id: 7, type: "order", title: "New online order", body: "#ORD-4819 · ৳8,500", time: "4 hr ago", read: true, nav: "orders" },
  { id: 8, type: "system", title: "System update", body: "System was backed up successfully.", time: "Yesterday", read: true },
];

interface AuditEvent {
  id: number; time: string; employee: string; action: string; module: string; ref: string; details: string;
  extra?: { label: string; value: string }[];
}

const auditData: AuditEvent[] = [
  { id: 1, time: "4 Sep · 2:14 PM", employee: "Mahbub Rahman", action: "Created Sale", module: "Sales", ref: "SE-20483", details: "POS sale ৳8,450", extra: [{ label: "Channel", value: "POS" }, { label: "Payment", value: "Cash" }, { label: "Items", value: "3 products" }] },
  { id: 2, time: "4 Sep · 1:50 PM", employee: "MD. SELIM", action: "Received Purchase", module: "Purchases", ref: "PO-2048", details: "240 units received", extra: [{ label: "Supplier", value: "Walton Distributor" }, { label: "Total", value: "৳86,000" }] },
  { id: 3, time: "4 Sep · 1:30 PM", employee: "MD. SELIM", action: "Recorded Payment", module: "Customers", ref: "PAY-C-0081", details: "৳5,000 received", extra: [{ label: "Customer", value: "Rahim Electronics" }, { label: "Method", value: "bKash" }] },
  { id: 4, time: "4 Sep · 1:20 PM", employee: "Rahim Ahmed", action: "Stock Adjustment", module: "Inventory", ref: "ADJ-018", details: "Walton Fan −1", extra: [{ label: "Product", value: "Walton Ceiling Fan 56\"" }, { label: "Change", value: "18 → 17" }, { label: "Reason", value: "Damaged" }] },
  { id: 5, time: "4 Sep · 12:40 PM", employee: "Mahbub Rahman", action: "Updated Customer", module: "Customers", ref: "CUS-002841", details: "Contact info updated", extra: [] },
  { id: 6, time: "4 Sep · 11:15 AM", employee: "MD. SELIM", action: "Created Employee", module: "Employees", ref: "EMP-00015", details: "Jamal Uddin added", extra: [{ label: "Role", value: "Delivery Staff" }] },
  { id: 7, time: "4 Sep · 10:48 AM", employee: "Nasrin Akter", action: "Order Status Changed", module: "Orders", ref: "ORD-4818", details: "Confirmed → Preparing", extra: [{ label: "Order", value: "#ORD-4818" }, { label: "Customer", value: "Farhan Ahmed" }] },
  { id: 8, time: "3 Sep · 5:22 PM", employee: "MD. SELIM", action: "Settings Changed", module: "Settings", ref: "SYS", details: "Low stock threshold updated", extra: [{ label: "Changed", value: "Low stock threshold" }, { label: "From", value: "5" }, { label: "To", value: "10" }] },
];

const actionBadgeVariant = (action: string): BadgeVariant => {
  if (action.startsWith("Created") || action.startsWith("Received")) return "success";
  if (action.startsWith("Deleted") || action.startsWith("Removed") || action.startsWith("Cancelled")) return "error";
  if (action.startsWith("Updated") || action.startsWith("Changed") || action.startsWith("Adjusted")) return "warning";
  return "default";
};

type NotifView = "list" | "activity" | "auditDetail";

function NotificationsPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [view, setView] = useState<NotifView>("list");
  const [notifFilter, setNotifFilter] = useState("All");
  const [activitySearch, setActivitySearch] = useState("");
  const [activityModule, setActivityModule] = useState("All");
  const [selectedAudit, setSelectedAudit] = useState<AuditEvent | null>(null);
  const [notifs, setNotifs] = useState(sampleNotifications);

  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const filteredNotifs = notifs.filter(n => {
    if (notifFilter === "All") return true;
    if (notifFilter === "Unread") return !n.read;
    return n.type === notifFilter.toLowerCase();
  });

  const filteredAudit = auditData.filter(a => {
    const q = activitySearch.toLowerCase();
    const mQ = !q || a.employee.toLowerCase().includes(q) || a.ref.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.module.toLowerCase().includes(q);
    const mM = activityModule === "All" || a.module === activityModule;
    return mQ && mM;
  });

  // Audit detail view
  if (view === "auditDetail" && selectedAudit) return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[700px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("activity")}>Activity</Btn>
          <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
          <span className="text-[13px] font-medium text-[var(--foreground)]">Activity Detail</span>
        </div>
        <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={actionBadgeVariant(selectedAudit.action)}>{selectedAudit.action}</Badge>
              <span className="text-[12px] text-[var(--muted-foreground)]">{selectedAudit.module}</span>
            </div>
            <span className="font-mono text-[12px] text-[var(--muted-foreground)]">{selectedAudit.ref}</span>
          </div>
          <div className="px-5 py-5 grid grid-cols-2 gap-x-8 gap-y-4">
            {[{ l: "Employee", v: selectedAudit.employee }, { l: "Date & Time", v: selectedAudit.time }, { l: "Module", v: selectedAudit.module }, { l: "Reference", v: selectedAudit.ref }, { l: "Description", v: selectedAudit.details }].map(f => (
              <div key={f.l}><div className="text-[11px] text-[var(--muted-foreground)] mb-0.5">{f.l}</div><div className="text-[13px] font-medium text-[var(--foreground)]">{f.v}</div></div>
            ))}
          </div>
          {selectedAudit.extra && selectedAudit.extra.length > 0 && (
            <div className="px-5 pb-5 border-t border-[var(--border)] pt-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Additional details</div>
              <div className="space-y-2">
                {selectedAudit.extra.map(e => (
                  <div key={e.label} className="flex items-center justify-between text-[13px]">
                    <span className="text-[var(--muted-foreground)]">{e.label}</span>
                    <span className="font-medium text-[var(--foreground)]">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 border border-[var(--border)] rounded-xl bg-[var(--secondary)] px-4 py-3 text-[12px] text-[var(--muted-foreground)] flex items-center gap-2">
          <Icon d={icons.shield} size={13} />
          Activity records are read-only. Historical actions cannot be modified.
        </div>
      </div>
    </div>
  );

  // Activity/audit view
  if (view === "activity") return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[1100px] mx-auto space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Btn variant="ghost" size="sm" iconLeft={<Icon d={icons.chevronLeft} size={13} />} onClick={() => setView("list")}>Notifications</Btn>
              <span className="text-[var(--muted-foreground)]"><Icon d={icons.chevronRight} size={12} /></span>
              <span className="text-[13px] font-medium text-[var(--foreground)]">Activity</span>
            </div>
            <h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">Activity</h1>
            <p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Review important actions and changes across the business.</p>
          </div>
          <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.arrowDown} size={13} />}>Export</Btn>
        </div>
        <FilterBar>
          <Input value={activitySearch} onChange={e => setActivitySearch(e.target.value)} placeholder="Search activity…" iconLeft={<Icon d={icons.search} size={13} />} className="w-72" />
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            <span className="px-2 text-[11px] text-[var(--muted-foreground)]">Module:</span>
            {["All","Sales","Inventory","Purchases","Customers","Orders","Delivery","Expenses","Employees","Settings"].map(m => (
              <FilterChip key={m} label={m} active={activityModule === m} onClick={() => setActivityModule(m)} />
            ))}
          </div>
          <div className="flex-1" />
          <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filteredAudit.length}</strong> events</span>
        </FilterBar>
        <TableWrap head={[{ label: "Date & Time" }, { label: "Employee" }, { label: "Action" }, { label: "Module" }, { label: "Reference" }, { label: "Details" }, { label: "" }]} footer={<><span className="text-[12px] text-[var(--muted-foreground)]">{filteredAudit.length} events</span><Pagination total={filteredAudit.length} /></>}>
          {filteredAudit.map(a => (
            <tr key={a.id} onClick={() => { setSelectedAudit(a); setView("auditDetail"); }} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--secondary)] cursor-pointer transition-colors">
              <td className="px-4 py-3 text-[12px] text-[var(--muted-foreground)] whitespace-nowrap font-mono">{a.time}</td>
              <td className="px-4 py-3 font-medium text-[var(--foreground)] text-[13px]">{a.employee}</td>
              <td className="px-4 py-3"><Badge variant={actionBadgeVariant(a.action)}>{a.action}</Badge></td>
              <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{a.module}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-[var(--foreground)]">{a.ref}</td>
              <td className="px-4 py-3 text-[var(--muted-foreground)] text-[12px]">{a.details}</td>
              <td className="px-4 py-3"><Icon d={icons.chevronRight} size={12} /></td>
            </tr>
          ))}
        </TableWrap>
      </div>
    </div>
  );

  // Notifications list view
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 max-w-[900px] mx-auto space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">Notifications</h1>
            <p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Stay updated on important business activity.</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && <Btn variant="secondary" size="sm" onClick={markAllRead}>Mark all as read</Btn>}
            <Btn variant="secondary" size="sm" iconLeft={<Icon d={icons.activity} size={13} />} onClick={() => setView("activity")}>Activity log</Btn>
          </div>
        </div>

        {/* Filter chips */}
        <FilterBar>
          <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] border border-[var(--border)] rounded-lg">
            {["All","Unread","order","inventory","payment","purchase","delivery"].map(f => (
              <FilterChip key={f} label={f === "All" || f === "Unread" ? f : f.charAt(0).toUpperCase() + f.slice(1) + "s"} active={notifFilter === f} onClick={() => setNotifFilter(f)} />
            ))}
          </div>
          {unreadCount > 0 && <span className="text-[12px] text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{unreadCount}</strong> unread</span>}
        </FilterBar>

        {filteredNotifs.length === 0 ? (
          <div className="border border-[var(--border)] rounded-xl p-16 text-center bg-[var(--card)]">
            <div className="h-10 w-10 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons.bell} size={18} /></div>
            <div className="text-[14px] font-semibold text-[var(--foreground)] mb-1">You"re all caught up</div>
            <div className="text-[13px] text-[var(--muted-foreground)]">No new notifications.</div>
          </div>
        ) : (
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
            <div className="divide-y divide-[var(--border)]">
              {filteredNotifs.map(n => (
                <div key={n.id} onClick={() => { markRead(n.id); if (n.nav) onNavigate(n.nav); }} className={`flex items-start gap-4 px-5 py-4 hover:bg-[var(--secondary)] cursor-pointer transition-colors ${n.read ? "" : "bg-[var(--secondary)]"}`}>
                  <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${n.read ? "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)]" : "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)]"}`}>
                    <Icon d={notifTypeIcon[n.type]} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[13px] font-semibold ${n.read ? "text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)] shrink-0" />}
                    </div>
                    <div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{n.body}</div>
                  </div>
                  <div className="text-[11px] text-[var(--muted-foreground)] whitespace-nowrap shrink-0">{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Notification dropdown (rendered inside Header)
function NotifDropdown({ onNavigate, onClose }: { onNavigate: (id: string) => void; onClose: () => void }) {
  const [notifs, setNotifs] = useState(sampleNotifications.slice(0, 6));
  const markAllRead = (e: React.MouseEvent) => { e.stopPropagation(); setNotifs(prev => prev.map(n => ({ ...n, read: true }))); };
  const unread = notifs.filter(n => !n.read).length;
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden z-50">
      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--foreground)]">Notifications</span>
          {unread > 0 && <span className="text-[10px] font-bold bg-[var(--foreground)] text-[var(--background)] rounded-full px-1.5 py-0.5">{unread}</span>}
        </div>
        {unread > 0 && <button onClick={markAllRead} className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Mark all read</button>}
      </div>
      <div className="max-h-[320px] overflow-y-auto divide-y divide-[var(--border)]">
        {notifs.map(n => (
          <div key={n.id} onClick={() => { setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x)); if (n.nav) { onNavigate(n.nav); onClose(); } }} className={`flex items-start gap-3 px-4 py-3 hover:bg-[var(--secondary)] cursor-pointer transition-colors ${n.read ? "" : "bg-[var(--secondary)]"}`}>
            <div className={`h-7 w-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${n.read ? "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)]" : "bg-[var(--foreground)] border-[var(--foreground)] text-[var(--background)]"}`}>
              <Icon d={notifTypeIcon[n.type]} size={12} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-[12px] font-semibold leading-snug ${n.read ? "text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>{n.title}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5 leading-snug">{n.body}</div>
            </div>
            <div className="text-[10px] text-[var(--muted-foreground)] whitespace-nowrap shrink-0">{n.time}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border)] px-4 py-2.5">
        <button onClick={() => { onNavigate("notifications"); onClose(); }} className="text-[12px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">View all notifications →</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PROMPT 21 — SETTINGS & BUSINESS CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════════

type SettingsSection = "business" | "store" | "branding" | "sales" | "inventory" | "orders" | "delivery" | "payments" | "notifications" | "security";

const settingsSections: { id: SettingsSection; label: string; icon: string }[] = [
  { id: "business", label: "Business", icon: icons.dashboard },
  { id: "store", label: "Store", icon: icons.pos },
  { id: "branding", label: "Branding", icon: icons.star },
  { id: "sales", label: "Sales", icon: icons.sales },
  { id: "inventory", label: "Inventory", icon: icons.inventory },
  { id: "orders", label: "Orders", icon: icons.orders },
  { id: "delivery", label: "Delivery", icon: icons.delivery },
  { id: "payments", label: "Payments", icon: icons.wallet },
  { id: "notifications", label: "Notifications", icon: icons.bell },
  { id: "security", label: "Security", icon: icons.shield },
];

function SettingsSectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)]"><div className="text-[13px] font-semibold text-[var(--foreground)]">{title}</div></div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function SettingsRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-8">
      <div className="shrink-0"><div className="text-[13px] font-medium text-[var(--foreground)]">{label}</div>{sub && <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{sub}</div>}</div>
      <div className="flex-1 max-w-xs text-right">{children}</div>
    </div>
  );
}

function SettingsPage({ onNavigate: _, guestApp, onGuestAppChange }: { onNavigate: (id: string) => void; guestApp: GuestAppConfig; onGuestAppChange: (next: GuestAppConfig) => void }) {
  const [section, setSection] = useState<SettingsSection>("business");
  const [saved, setSaved] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);

  // Business info state
  const [biz, setBiz] = useState({ name: "Selim Electronics", phone: "01712 345678", email: "info@selimelectronics.com", address: "Shop 12, Bangla Bazar", city: "Dhaka", country: "Bangladesh" });
  const setBizF = (f: string) => (v: string) => setBiz(p => ({ ...p, [f]: v }));

  // Store state
  const [store, setStore] = useState({ name: "Main Store", address: "Bangla Bazar, Dhaka", phone: "01712 345678", openTime: "09:00", closeTime: "21:00" });
  const setStoreF = (f: string) => (v: string) => setStore(p => ({ ...p, [f]: v }));

  // Sales settings
  const [sales, setSales] = useState({ invoicePrefix: "SE-", receiptPrefix: "RC-", allowDue: true, defaultDiscount: "0", defaultPayment: "Cash" });
  const setSalesF = (f: string) => (v: string | boolean) => setSales(p => ({ ...p, [f]: v }));

  // Inventory settings
  const [inv, setInv] = useState({ lowStockThreshold: "10", allowNegative: false, adjustApproval: false });
  const setInvF = (f: string) => (v: string | boolean) => setInv(p => ({ ...p, [f]: v }));

  // Orders
  const [orders, setOrders] = useState({ autoConfirm: false, allowCancel: true, orderPrefix: "ORD-" });
  const setOrdersF = (f: string) => (v: string | boolean) => setOrders(p => ({ ...p, [f]: v }));

  // Delivery
  const [delivery, setDelivery] = useState({ fee: "100", freeAbove: "2000", method: "Home Delivery" });
  const setDeliveryF = (f: string) => (v: string) => setDelivery(p => ({ ...p, [f]: v }));

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({ newOrder: true, lowStock: true, outOfStock: true, paymentReceived: true, purchaseReceived: true, deliveryUpdate: true });
  const setNotifF = (f: string) => (v: boolean) => setNotifPrefs(p => ({ ...p, [f]: v }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const renderSection = () => {
    switch (section) {
      case "business": return (
        <SettingsSectionCard title="Business information">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Business Name" value={biz.name} onChange={e => setBizF("name")(e.target.value)} />
            <Input label="Phone" value={biz.phone} onChange={e => setBizF("phone")(e.target.value)} />
            <Input label="Email" type="email" value={biz.email} onChange={e => setBizF("email")(e.target.value)} />
            <Input label="City" value={biz.city} onChange={e => setBizF("city")(e.target.value)} />
          </div>
          <Input label="Address" value={biz.address} onChange={e => setBizF("address")(e.target.value)} />
          <SelectField label="Country" value={biz.country} onChange={setBizF("country")} options={[{ value: "Bangladesh", label: "Bangladesh" }]} />
        </SettingsSectionCard>
      );

      case "store": return (
        <SettingsSectionCard title="Store information">
          <Input label="Store Name" value={store.name} onChange={e => setStoreF("name")(e.target.value)} />
          <Input label="Store Address" value={store.address} onChange={e => setStoreF("address")(e.target.value)} />
          <Input label="Store Phone" value={store.phone} onChange={e => setStoreF("phone")(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Opening Time" type="time" value={store.openTime} onChange={e => setStoreF("openTime")(e.target.value)} />
            <Input label="Closing Time" type="time" value={store.closeTime} onChange={e => setStoreF("closeTime")(e.target.value)} />
          </div>
        </SettingsSectionCard>
      );

      case "branding": return (
        <div className="space-y-4">
          <SettingsSectionCard title="Logo">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center bg-[var(--secondary)]">
                <div className="text-center"><div className="text-[10px] font-bold tracking-widest text-[var(--foreground)]">SE</div><div className="text-[8px] text-[var(--muted-foreground)]">Logo</div></div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-2"><Btn variant="secondary" size="sm">Update Logo</Btn><Btn variant="ghost" size="sm">Remove</Btn></div>
                <div className="text-[11px] text-[var(--muted-foreground)]">PNG, SVG, or JPG · Recommended 512×512px</div>
              </div>
            </div>
          </SettingsSectionCard>
          <SettingsSectionCard title="Brand identity">
            <Input label="Business Name (Display)" value={biz.name} onChange={e => setBizF("name")(e.target.value)} />
            <div>
              <div className="text-[11px] font-medium text-[var(--muted-foreground)] mb-1.5">Short description</div>
              <textarea defaultValue="Electronics retail and distribution — Dhaka, Bangladesh." rows={2} className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[13px] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:border-[var(--foreground)]" />
            </div>
          </SettingsSectionCard>
        </div>
      );

      case "public-site" as SettingsSection: return (
        <div className="space-y-4">
          <SettingsSectionCard title="Landing page footer">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4"><div className="flex items-start justify-between gap-4"><div><div className="text-[13px] font-semibold text-[var(--foreground)]">Public information centre</div><p className="mt-1 text-[12px] leading-relaxed text-[var(--muted-foreground)]">Manage the company, support and legal destinations shown in the public landing-page footer.</p></div><Badge variant="success" dot>Published</Badge></div></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[{ label: "About us", sub: "Company story and positioning" }, { label: "Journal", sub: "News, guides and retail insights" }, { label: "Contact", sub: "Business and sales contact details" }, { label: "Support centre", sub: "Customer and workspace support guidance" }, { label: "Privacy policy", sub: "Data and privacy notice" }, { label: "Terms of service", sub: "Service terms and conditions" }, { label: "Cookie notice", sub: "Cookie preference information" }, { label: "Accessibility", sub: "Accessibility commitment and feedback" }].map(item => <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] px-4 py-3"><div><div className="text-[13px] font-medium text-[var(--foreground)]">{item.label}</div><div className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">{item.sub}</div></div><Toggle checked={true} onChange={() => {}} /></div>)}
            </div>
            <div className="flex flex-wrap justify-end gap-2"><Btn variant="secondary" size="sm">Preview public site</Btn><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.check} size={13} />}>Save footer changes</Btn></div>
          </SettingsSectionCard>
          <SettingsSectionCard title="Support & contact details">
            <div className="grid grid-cols-2 gap-4"><Input label="Support email" value="support@selimelectronics.com" readOnly /><Input label="Contact email" value="hello@selimelectronics.com" readOnly /></div>
            <Input label="Footer status message" value="Systems operational" readOnly />
            <div className="rounded-lg border border-[var(--info-border)] bg-[var(--info-bg)] px-4 py-3 text-[12px] leading-relaxed text-[var(--info)]">Changes here will be published to the public landing footer after the workspace is connected to the production content service.</div>
          </SettingsSectionCard>
          <SettingsSectionCard title="Branded customer-app add-on">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4"><div className="flex items-center gap-3"><img src={playstoreImg} alt="" className="h-8 w-8 object-contain" /><img src={appleLogoImg} alt="" className="h-8 w-8 object-contain" /><div><div className="text-[13px] font-semibold text-[var(--foreground)]">Customer app availability</div><div className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">This is a paid add-on managed by DevEngine. Once enabled, your business can publish its own Google Play and App Store links; until then, visitors see your formal availability message.</div></div></div></div>
            <div className="grid grid-cols-2 gap-4"><Input label="Google Play URL" value={guestApp.playStoreUrl} onChange={e => onGuestAppChange({ ...guestApp, playStoreUrl: e.target.value })} placeholder="https://play.google.com/..." /><Input label="App Store URL" value={guestApp.appStoreUrl} onChange={e => onGuestAppChange({ ...guestApp, appStoreUrl: e.target.value })} placeholder="https://apps.apple.com/..." /></div>
            <div><label className="mb-1.5 block text-[13px] font-medium text-[var(--foreground)]">Unavailable button message</label><textarea value={guestApp.unavailableMessage} onChange={e => onGuestAppChange({ ...guestApp, unavailableMessage: e.target.value })} rows={3} className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-[13px] text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none" /></div>
            <div className="flex justify-end"><Btn variant="primary" size="sm" iconLeft={<Icon d={icons.check} size={13} />}>Save guest app settings</Btn></div>
          </SettingsSectionCard>
        </div>
      );

      case "sales": return (
        <SettingsSectionCard title="Sales settings">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Invoice prefix" value={sales.invoicePrefix} onChange={e => setSalesF("invoicePrefix")(e.target.value)} />
            <Input label="Receipt prefix" value={sales.receiptPrefix} onChange={e => setSalesF("receiptPrefix")(e.target.value)} />
          </div>
          <SelectField label="Default payment method" value={sales.defaultPayment} onChange={setSalesF("defaultPayment")} options={[{ value: "Cash", label: "Cash" }, { value: "bKash", label: "bKash" }, { value: "Nagad", label: "Nagad" }, { value: "Bank", label: "Bank Transfer" }]} />
          <Input label="Default discount (%)" value={sales.defaultDiscount} onChange={e => setSalesF("defaultDiscount")(e.target.value)} />
          <SettingsRow label="Allow customer due" sub="Let customers make purchases on credit"><Toggle checked={sales.allowDue} onChange={v => setSalesF("allowDue")(v)} /></SettingsRow>
        </SettingsSectionCard>
      );

      case "inventory": return (
        <SettingsSectionCard title="Inventory settings">
          <Input label="Low stock threshold" value={inv.lowStockThreshold} onChange={e => setInvF("lowStockThreshold")(e.target.value)} />
          <SettingsRow label="Allow negative stock" sub="Let stock go below zero during sales"><Toggle checked={inv.allowNegative as boolean} onChange={v => setInvF("allowNegative")(v)} /></SettingsRow>
          <SettingsRow label="Stock adjustment approval" sub="Require manager approval for manual adjustments"><Toggle checked={inv.adjustApproval as boolean} onChange={v => setInvF("adjustApproval")(v)} /></SettingsRow>
        </SettingsSectionCard>
      );

      case "orders": return (
        <SettingsSectionCard title="Order settings">
          <Input label="Order number prefix" value={orders.orderPrefix} onChange={e => setOrdersF("orderPrefix")(e.target.value)} />
          <SettingsRow label="Auto-confirm online orders" sub="Automatically move new orders to Confirmed"><Toggle checked={orders.autoConfirm as boolean} onChange={v => setOrdersF("autoConfirm")(v)} /></SettingsRow>
          <SettingsRow label="Allow order cancellation" sub="Let staff cancel confirmed orders"><Toggle checked={orders.allowCancel as boolean} onChange={v => setOrdersF("allowCancel")(v)} /></SettingsRow>
        </SettingsSectionCard>
      );

      case "delivery": return (
        <SettingsSectionCard title="Delivery settings">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Default delivery fee (৳)" value={delivery.fee} onChange={e => setDeliveryF("fee")(e.target.value)} />
            <Input label="Free delivery above (৳)" value={delivery.freeAbove} onChange={e => setDeliveryF("freeAbove")(e.target.value)} />
          </div>
          <SelectField label="Default delivery method" value={delivery.method} onChange={setDeliveryF("method")} options={[{ value: "Home Delivery", label: "Home Delivery" }, { value: "Store Pickup", label: "Store Pickup" }]} />
        </SettingsSectionCard>
      );

      case "payments": return (
        <div className="space-y-4">
          <SettingsSectionCard title="Online payment gateway">
            <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg">
              <div><div className="text-[13px] font-semibold text-[var(--foreground)]">SSLCommerz</div><div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">Online customer payments</div></div>
              <Badge variant="success" dot>Configured</Badge>
            </div>
            <div className="border border-[var(--border)] rounded-xl bg-[var(--secondary)] px-4 py-3 text-[12px] text-[var(--muted-foreground)]">API credentials are stored securely and not visible here. Contact support to update gateway configuration.</div>
          </SettingsSectionCard>
          <SettingsSectionCard title="Offline payment methods">
            <div className="space-y-2">
              {["Cash", "Bank Transfer", "bKash", "Nagad"].map(m => (
                <div key={m} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-b-0 text-[13px]"><span className="font-medium text-[var(--foreground)]">{m}</span><Badge variant="success" dot>Enabled</Badge></div>
              ))}
            </div>
          </SettingsSectionCard>
        </div>
      );

      case "notifications": return (
        <SettingsSectionCard title="Notification preferences">
          <div className="space-y-4">
            {[
              { key: "newOrder", label: "New online order", sub: "Alert when a new order is placed" },
              { key: "lowStock", label: "Low stock", sub: "Alert when product reaches threshold" },
              { key: "outOfStock", label: "Out of stock", sub: "Alert when product reaches zero" },
              { key: "paymentReceived", label: "Payment received", sub: "Alert when customer payment is recorded" },
              { key: "purchaseReceived", label: "Purchase received", sub: "Alert when a purchase order is received" },
              { key: "deliveryUpdate", label: "Delivery update", sub: "Alert on delivery status changes" },
            ].map(({ key, label, sub }) => (
              <SettingsRow key={key} label={label} sub={sub}>
                <Toggle checked={(notifPrefs as any)[key] as boolean} onChange={v => setNotifF(key)(v)} />
              </SettingsRow>
            ))}
          </div>
        </SettingsSectionCard>
      );

      case "security": return (
        <div className="space-y-4">
          <SettingsSectionCard title="Password">
            <Input label="Current password" type="password" placeholder="••••••••" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="New password" type="password" placeholder="••••••••" />
              <Input label="Confirm new password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex justify-end"><Btn variant="primary" size="sm">Update password</Btn></div>
          </SettingsSectionCard>
          <SettingsSectionCard title="Sessions & security">
            <SettingsRow label="Two-step verification" sub="Add an extra layer of login security"><Toggle checked={false} onChange={() => {}} /></SettingsRow>
            <div className="border border-[var(--border)] rounded-lg p-4">
              <div className="text-[12px] font-semibold text-[var(--foreground)] mb-3">Active sessions</div>
              <div className="space-y-2">
                {[{ device: "Chrome · Windows 11", loc: "Dhaka, BD", time: "Current session", active: true }, { device: "Firefox · Windows 10", loc: "Dhaka, BD", time: "2 hr ago", active: false }].map(s => (
                  <div key={s.device} className="flex items-center justify-between text-[12px]">
                    <div><div className="font-medium text-[var(--foreground)]">{s.device}</div><div className="text-[var(--muted-foreground)]">{s.loc} · {s.time}</div></div>
                    {s.active ? <Badge variant="success" dot>Current</Badge> : <button className="text-[var(--error)] hover:text-[var(--error)] text-[11px]">Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end"><Btn variant="ghost" size="sm" onClick={() => {}}>Sign out all other sessions</Btn></div>
          </SettingsSectionCard>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Settings sidebar nav */}
      <div className="w-44 shrink-0 border-r border-[var(--border)] bg-[var(--secondary)] py-4 overflow-y-auto">
        <div className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Settings</div>
        {settingsSections.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors rounded-lg mx-0 ${section === s.id ? "bg-[var(--background)] text-[var(--foreground)] font-medium shadow-sm border border-[var(--border)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"}`} style={{ margin: "0 4px 2px", width: "calc(100% - 8px)" }}>
            <span className={section === s.id ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}><Icon d={s.icon} size={13} /></span>
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[640px] space-y-5">
          <div className="flex items-start justify-between">
            <div><h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">Settings</h1><p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">Manage your business configuration and system preferences.</p></div>
          </div>
          {renderSection()}
          <div className="flex items-center justify-between pt-2">
            <Btn variant="ghost" size="sm" onClick={() => setDiscardOpen(true)}>Discard changes</Btn>
            <div className="flex items-center gap-3">
              {saved && <span className="text-[12px] text-[var(--success)]">Changes saved successfully.</span>}
              <Btn variant="primary" onClick={handleSave} iconLeft={<Icon d={icons.check} size={13} />}>Save Changes</Btn>
            </div>
          </div>
        </div>
      </div>

      <Modal open={discardOpen} onClose={() => setDiscardOpen(false)} title="Discard unsaved changes?" size="sm">
        <p className="text-[13px] text-[var(--muted-foreground)] mb-5">Your unsaved changes will be lost. This cannot be undone.</p>
        <div className="flex gap-2 justify-end"><Btn variant="secondary" onClick={() => setDiscardOpen(false)}>Keep Editing</Btn><Btn variant="destructive" onClick={() => { setDiscardOpen(false); }}>Discard Changes</Btn></div>
      </Modal>
    </div>
  );
}

// MODULE PLACEHOLDER
// ══════════════════════════════════════════════════════════════════════════════
function ModulePlaceholder({ id, onNavigate }: { id: string; onNavigate: (id: string) => void }) {
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center max-w-xs">
        <div className="h-12 w-12 rounded-xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--muted-foreground)]"><Icon d={icons[id] || icons.dashboard} size={20} /></div>
        <div className="text-[15px] font-semibold text-[var(--foreground)] mb-1 tracking-tight capitalize">{id}</div>
        <div className="text-[13px] text-[var(--muted-foreground)] mb-5">This module will be built in an upcoming design prompt.</div>
        <Btn variant="secondary" size="sm" onClick={() => onNavigate("dashboard")}>Back to Dashboard</Btn>
      </div>
    </div>
  );
}

function WorkspacePageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div>{eyebrow && <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted-foreground)]">{eyebrow}</div>}<h1 className="text-[24px] font-bold tracking-tight text-[var(--foreground)]">{title}</h1><p className="mt-1 text-[13px] text-[var(--muted-foreground)]">{description}</p></div>{action}</div>;
}

function BranchesPage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [selected, setSelected] = useState("Main Store");
  const branches = [
    { name: "Main Store", code: "DHK-01", place: "Bangla Bazar, Dhaka", staff: 8, sales: "৳ 2,84,500", stock: "1,248 SKUs", status: "Open" },
    { name: "Mirpur Branch", code: "DHK-02", place: "Mirpur 10, Dhaka", staff: 5, sales: "৳ 1,16,800", stock: "842 SKUs", status: "Open" },
    { name: "Uttara Branch", code: "DHK-03", place: "Sector 7, Uttara", staff: 4, sales: "৳ 86,400", stock: "611 SKUs", status: "Open" },
  ];
  return <div className="flex-1 overflow-y-auto bg-[var(--background)]"><div className="mx-auto max-w-[1280px] space-y-6 p-6"><WorkspacePageHeader eyebrow="Multi-location operations" title="Branches" description="Each branch has its own stock, POS devices, team access and daily close." action={<Btn iconLeft={<Icon d={icons.plus} size={14} />}>Add branch</Btn>} />
    <div className="grid gap-4 md:grid-cols-4">{[{ label: "Active branches", value: "3", note: "All locations online" }, { label: "Registers open", value: "7", note: "2 awaiting close" }, { label: "Network stock", value: "2,701", note: "Across 3 locations" }, { label: "Transfers in transit", value: "2", note: "৳ 1,46,200 at cost" }].map(stat => <div key={stat.label} className="rounded-xl border border-[var(--border)] p-4"><div className="text-[11px] font-medium text-[var(--muted-foreground)]">{stat.label}</div><div className="mt-2 text-[25px] font-bold tracking-tight text-[var(--foreground)]">{stat.value}</div><div className="mt-1 text-[11px] text-[var(--success)]">{stat.note}</div></div>)}</div>
    <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr]"><section className="overflow-hidden rounded-xl border border-[var(--border)]"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div><h2 className="text-[15px] font-semibold text-[var(--foreground)]">Your branch network</h2><p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">Select a branch to view its operating status.</p></div><Btn variant="secondary" size="sm" onClick={() => onNavigate("transfers")}>Transfers</Btn></div><div className="divide-y divide-[var(--border)]">{branches.map(branch => <button key={branch.name} onClick={() => setSelected(branch.name)} className={`flex w-full items-center gap-4 px-5 py-4 text-left transition ${selected === branch.name ? "bg-[var(--secondary)]" : "hover:bg-[var(--secondary)]/60"}`}><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)]"><Icon d={icons.mapPin} size={17} /></span><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="text-[14px] font-semibold text-[var(--foreground)]">{branch.name}</span><Badge variant="success" dot>{branch.status}</Badge></span><span className="mt-1 block text-[12px] text-[var(--muted-foreground)]">{branch.code} · {branch.place}</span></span><span className="hidden text-right sm:block"><span className="block text-[13px] font-semibold text-[var(--foreground)]">{branch.sales}</span><span className="text-[11px] text-[var(--muted-foreground)]">today</span></span><Icon d={icons.chevronRight} size={15} /></button>)}</div></section>
      <aside className="rounded-xl border border-[var(--border)] p-5"><div className="flex items-start justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Branch control</div><h2 className="mt-1 text-[18px] font-bold text-[var(--foreground)]">{selected}</h2></div><Badge variant="success" dot>Open</Badge></div><div className="mt-5 grid grid-cols-2 gap-3">{[{ label: "Registers", value: "3 open" }, { label: "Team members", value: "8 assigned" }, { label: "Stock value", value: "৳ 18.4L" }, { label: "Low-stock alerts", value: "6 items" }].map(item => <div key={item.label} className="rounded-lg bg-[var(--secondary)] p-3"><div className="text-[11px] text-[var(--muted-foreground)]">{item.label}</div><div className="mt-1 text-[13px] font-semibold text-[var(--foreground)]">{item.value}</div></div>)}</div><div className="mt-5 rounded-lg border border-[var(--warning-border)] bg-[var(--warning-bg)] p-3 text-[12px] text-[var(--warning)]"><span className="font-semibold">Control note:</span> Managers can see only their assigned location unless they have an organisation-level role.</div><div className="mt-5 flex gap-2"><Btn variant="secondary" size="sm" className="flex-1">Manage team</Btn><Btn variant="secondary" size="sm" className="flex-1">Branch settings</Btn></div></aside></div>
  </div></div>;
}

function TransfersPage() {
  const transfers = [{ id: "TR-2048", route: "Main Store → Mirpur", items: "36 items · 122 units", value: "৳ 86,400", state: "In transit", date: "Today, 10:40 AM" }, { id: "TR-2047", route: "Main Store → Uttara", items: "18 items · 55 units", value: "৳ 42,800", state: "Ready to ship", date: "Today, 9:15 AM" }, { id: "TR-2046", route: "Mirpur → Main Store", items: "12 items · 20 units", value: "৳ 16,900", state: "Partially received", date: "Yesterday" }];
  return <div className="flex-1 overflow-y-auto"><div className="mx-auto max-w-[1280px] space-y-6 p-6"><WorkspacePageHeader eyebrow="Multi-location operations" title="Stock transfers" description="Move inventory between branches with clear sending, in-transit and receiving accountability." action={<Btn iconLeft={<Icon d={icons.plus} size={14} />}>Create transfer</Btn>} /><div className="grid gap-4 md:grid-cols-3">{[{ title: "Awaiting shipment", value: "1", color: "warning" }, { title: "In transit", value: "2", color: "info" }, { title: "Awaiting receive", value: "3", color: "default" }].map(item => <div key={item.title} className="rounded-xl border border-[var(--border)] p-4"><div className="flex justify-between"><span className="text-[12px] text-[var(--muted-foreground)]">{item.title}</span><Badge variant={item.color as BadgeVariant}>{item.value}</Badge></div><div className="mt-3 text-[20px] font-bold text-[var(--foreground)]">{item.value} transfers</div></div>)}</div><section className="overflow-hidden rounded-xl border border-[var(--border)]"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4"><div className="text-[15px] font-semibold text-[var(--foreground)]">Transfer activity</div><div className="flex gap-2"><Btn variant="secondary" size="sm">All branches</Btn><Btn variant="secondary" size="sm">Export</Btn></div></div><div className="divide-y divide-[var(--border)]">{transfers.map(transfer => <div key={transfer.id} className="flex flex-wrap items-center gap-4 px-5 py-4"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--secondary)] text-[var(--foreground)]"><Icon d={icons.truck} size={18} /></div><div className="min-w-[205px] flex-1"><div className="text-[13px] font-semibold text-[var(--foreground)]">{transfer.route}</div><div className="mt-1 text-[11px] text-[var(--muted-foreground)]">{transfer.id} · {transfer.items}</div></div><div className="min-w-[115px]"><div className="text-[13px] font-semibold text-[var(--foreground)]">{transfer.value}</div><div className="text-[11px] text-[var(--muted-foreground)]">{transfer.date}</div></div><Badge variant={transfer.state === "In transit" ? "info" : transfer.state === "Ready to ship" ? "warning" : "partial"}>{transfer.state}</Badge><Btn variant="ghost" size="sm">View</Btn></div>)}</div></section><div className="grid gap-4 lg:grid-cols-3"><div className="rounded-xl border border-[var(--border)] p-5 lg:col-span-2"><h2 className="text-[15px] font-semibold text-[var(--foreground)]">Transfer safeguards included in the final build</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{["Origin confirms dispatched quantities", "Destination receives full or partial shipment", "Every movement keeps a stock audit trail"].map((text, index) => <div key={text} className="rounded-lg bg-[var(--secondary)] p-3 text-[12px] leading-relaxed text-[var(--muted-foreground)]"><span className="mb-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--foreground)] text-[10px] font-bold text-[var(--background)]">{index + 1}</span>{text}</div>)}</div></div><div className="rounded-xl border border-[var(--success-border)] bg-[var(--success-bg)] p-5"><div className="text-[12px] font-semibold text-[var(--success)]">Inventory integrity</div><p className="mt-2 text-[12px] leading-relaxed text-[var(--muted-foreground)]">Quantities should not be available to sell at both the sending and receiving branch while a transfer is in transit.</p></div></div></div></div>;
}

function RegistersPage() {
  return <div className="flex-1 overflow-y-auto"><div className="mx-auto max-w-[1280px] space-y-6 p-6"><WorkspacePageHeader eyebrow="Multi-location operations" title="Registers & shifts" description="Track POS devices, cashier shifts and tender reconciliation by branch." action={<Btn iconLeft={<Icon d={icons.plus} size={14} />}>Add register</Btn>} /><div className="grid gap-4 md:grid-cols-4">{[{ label: "Open shifts", value: "7" }, { label: "Expected cash", value: "৳ 1,42,650" }, { label: "Close variance", value: "৳ 0" }, { label: "Devices online", value: "9 / 9" }].map(item => <div key={item.label} className="rounded-xl border border-[var(--border)] p-4"><div className="text-[11px] text-[var(--muted-foreground)]">{item.label}</div><div className="mt-2 text-[22px] font-bold text-[var(--foreground)]">{item.value}</div></div>)}</div><section className="overflow-hidden rounded-xl border border-[var(--border)]"><div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-3 border-b border-[var(--border)] bg-[var(--secondary)] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted-foreground)]"><span>Register</span><span>Branch & cashier</span><span>Shift balance</span><span>Status</span></div>{[{ name: "Counter 01", branch: "Main Store · Rahim", cash: "৳ 42,800", status: "Open" }, { name: "Counter 02", branch: "Main Store · Tania", cash: "৳ 31,600", status: "Open" }, { name: "Counter 01", branch: "Mirpur · Nabil", cash: "৳ 19,400", status: "Open" }, { name: "Counter 02", branch: "Uttara · Hasan", cash: "৳ 0", status: "Closed" }].map(row => <div key={`${row.branch}-${row.name}`} className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-3 border-b border-[var(--border)] px-5 py-4 text-[13px] last:border-0"><span className="font-semibold text-[var(--foreground)]">{row.name}</span><span className="text-[var(--muted-foreground)]">{row.branch}</span><span className="font-medium text-[var(--foreground)]">{row.cash}</span><span><Badge variant={row.status === "Open" ? "success" : "muted"} dot={row.status === "Open"}>{row.status}</Badge></span></div>)}</section></div></div>;
}

function SubscriptionPage({ onStartTrial }: { onStartTrial: () => void }) {
  return <div className="flex-1 overflow-y-auto"><div className="mx-auto max-w-[1180px] space-y-6 p-6"><WorkspacePageHeader eyebrow="Workspace account" title="Plan & billing" description="Manage your subscription, location capacity, payment method and billing history." action={<Btn variant="secondary" onClick={onStartTrial}>Change plan</Btn>} /><div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><section className="rounded-xl bg-[var(--foreground)] p-6 text-[var(--background)]"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">Current plan</div><h2 className="mt-2 text-[27px] font-bold">Growth</h2><p className="mt-1 text-[13px] text-white/70">For connected teams operating up to three locations.</p></div><Badge variant="success" dot>Active</Badge></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5"><div><div className="text-[11px] text-white/60">Next invoice</div><div className="mt-1 text-[15px] font-semibold">18 Dec 2026</div></div><div><div className="text-[11px] text-white/60">Monthly total</div><div className="mt-1 text-[15px] font-semibold">৳ 5,900</div></div><div><div className="text-[11px] text-white/60">Billing cycle</div><div className="mt-1 text-[15px] font-semibold">Monthly</div></div></div></section><section className="rounded-xl border border-[var(--border)] p-6"><div className="flex justify-between"><div><div className="text-[15px] font-semibold text-[var(--foreground)]">Usage & capacity</div><div className="mt-1 text-[12px] text-[var(--muted-foreground)]">Your plan limits refresh with your billing period.</div></div><Icon d={icons.activity} size={18} /></div><div className="mt-6 space-y-5">{[{ label: "Locations", used: "3", total: "3" }, { label: "Team members", used: "17", total: "20" }, { label: "POS registers", used: "7", total: "10" }].map(item => <div key={item.label}><div className="flex justify-between text-[12px]"><span className="font-medium text-[var(--foreground)]">{item.label}</span><span className="text-[var(--muted-foreground)]">{item.used} / {item.total}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--secondary)]"><div className="h-full rounded-full bg-[var(--foreground)]" style={{ width: `${(Number(item.used) / Number(item.total)) * 100}%` }} /></div></div>)}</div></section></div><div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]"><section className="overflow-hidden rounded-xl border border-[var(--border)]"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div><h2 className="text-[15px] font-semibold text-[var(--foreground)]">Billing history</h2><p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">Invoices and payment status.</p></div><Btn variant="ghost" size="sm">Download all</Btn></div>{[{ no: "INV-2026-112", date: "18 Nov 2026", amount: "৳ 5,900", state: "Paid" }, { no: "INV-2026-111", date: "18 Oct 2026", amount: "৳ 5,900", state: "Paid" }, { no: "INV-2026-110", date: "18 Sep 2026", amount: "৳ 5,900", state: "Paid" }].map(invoice => <div key={invoice.no} className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 last:border-0"><div><div className="text-[13px] font-semibold text-[var(--foreground)]">{invoice.no}</div><div className="mt-1 text-[11px] text-[var(--muted-foreground)]">{invoice.date}</div></div><div className="flex items-center gap-5"><div className="text-[13px] font-semibold text-[var(--foreground)]">{invoice.amount}</div><Badge variant="success" dot>{invoice.state}</Badge><Btn variant="ghost" size="sm">Invoice</Btn></div></div>)}</section><aside className="rounded-xl border border-[var(--border)] p-5"><h2 className="text-[15px] font-semibold text-[var(--foreground)]">Payment method</h2><div className="mt-4 flex items-center gap-3 rounded-lg bg-[var(--secondary)] p-3"><span className="flex h-9 w-11 items-center justify-center rounded-md bg-[var(--foreground)] text-[12px] font-bold text-[var(--background)]">VISA</span><div className="flex-1"><div className="text-[13px] font-medium text-[var(--foreground)]">•••• 4242</div><div className="text-[11px] text-[var(--muted-foreground)]">Expires 08/28</div></div><Badge variant="success">Default</Badge></div><Btn variant="secondary" size="sm" className="mt-4 w-full">Update payment method</Btn><div className="mt-5 rounded-lg border border-[var(--info-border)] bg-[var(--info-bg)] p-3 text-[12px] leading-relaxed text-[var(--info)]">In production, subscription changes, invoices and payment methods can open a secure customer billing portal.</div></aside></div></div></div>;
}

function SubscriptionCheckout({ initialPlan, onBack, onComplete }: { initialPlan: string; onBack: () => void; onComplete: (slug: string) => void }) {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(initialPlan);
  const [business, setBusiness] = useState({ name: "", owner: "", email: "", branch: "Main Store", slug: "my-business" });
  const [payment, setPayment] = useState("card");
  const steps = ["Plan", "Business", "Payment", "Review"];
  const selected = saasPlans.find(item => item.id === plan) || saasPlans[1];
  const next = () => step < 3 ? setStep(step + 1) : onComplete(business.slug || "my-business");
  return <main className="min-h-[100dvh] bg-slate-950 px-5 py-8 text-white sm:p-10"><div className="mx-auto max-w-[1100px]"><button onClick={step === 0 ? onBack : () => setStep(step - 1)} className="flex items-center gap-2 text-[13px] font-semibold text-slate-300 hover:text-white">← {step === 0 ? "Back to DevEngine" : "Previous step"}</button><div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><aside className="pt-2"><DevEngineLogo tone="light" className="w-[220px]" /><div className="mt-12 text-[12px] font-bold uppercase tracking-[0.16em] text-cyan-300">DevEngine onboarding</div><h1 className="mt-4 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[0.92] tracking-[-0.06em]">Launch your retail workspace.</h1><p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-300">Set up your business, secure its own URL, select billing and activate a ready-to-configure POS workspace.</p><div className="mt-10 space-y-4">{steps.map((label, index) => <button key={label} onClick={() => index <= step && setStep(index)} className={`flex w-full items-center gap-3 text-left text-[13px] ${index === step ? "text-white" : index < step ? "text-cyan-300" : "text-slate-500"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${index === step ? "bg-cyan-400 text-slate-950" : index < step ? "bg-cyan-400/15 text-cyan-300" : "bg-white/10 text-slate-400"}`}>{index < step ? "✓" : index + 1}</span>{label}</button>)}</div><div className="mt-10 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-[12px] leading-relaxed text-slate-300">Your subscription is managed by DevEngine. Payment capture, invoices and production activation are represented here as a complete UI flow; secure provider processing is added with the backend.</div></aside><section className="rounded-[28px] bg-white p-6 text-slate-950 shadow-2xl sm:p-8"><div className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">Step {step + 1} of 4</div>{step === 0 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Choose your plan</h2><p className="mt-2 text-[13px] text-slate-500">You can upgrade or add branch capacity later.</p><div className="mt-6 space-y-3">{saasPlans.map(item => <button key={item.id} onClick={() => setPlan(item.id)} className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${plan === item.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 hover:border-slate-400"}`}><span><span className="block text-[15px] font-bold">{item.name}</span><span className={`mt-1 block text-[12px] ${plan === item.id ? "text-white/70" : "text-slate-500"}`}>{item.locations}</span></span><span className="text-[15px] font-bold">{item.price}{item.price === "Custom" ? "" : "/mo"}</span></button>)}</div></>}{step === 1 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Your business workspace</h2><p className="mt-2 text-[13px] text-slate-500">This creates an independent tenant boundary for your business.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Business name" value={business.name} onChange={e => setBusiness({ ...business, name: e.target.value })} placeholder="Your retail business" /><Input label="Owner name" value={business.owner} onChange={e => setBusiness({ ...business, owner: e.target.value })} placeholder="Full name" /><Input label="Work email" type="email" value={business.email} onChange={e => setBusiness({ ...business, email: e.target.value })} placeholder="you@business.com" /><Input label="First branch" value={business.branch} onChange={e => setBusiness({ ...business, branch: e.target.value })} /><div className="sm:col-span-2"><Input label="Your workspace URL" value={business.slug} onChange={e => setBusiness({ ...business, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} iconRight={<span className="text-[11px] text-slate-400">/login</span>} /><p className="mt-2 text-[11px] text-slate-500">Your staff will sign in at <span className="font-semibold text-slate-700">/{business.slug || "your-business"}/login</span>.</p></div></div></>}{step === 2 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Payment details</h2><p className="mt-2 text-[13px] text-slate-500">No payment is charged during your 14-day trial.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{[{ id: "card", label: "Card" }, { id: "bkash", label: "bKash" }, { id: "bank", label: "Bank transfer" }].map(method => <button key={method.id} onClick={() => setPayment(method.id)} className={`rounded-xl border px-4 py-3 text-[13px] font-bold ${payment === method.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200"}`}>{method.label}</button>)}</div><div className="mt-6 space-y-4 rounded-xl bg-slate-50 p-5"><Input label={payment === "card" ? "Card number" : payment === "bkash" ? "bKash number" : "Bank account reference"} placeholder={payment === "card" ? "4242 4242 4242 4242" : "Enter payment account"} /><div className="grid grid-cols-2 gap-4"><Input label="Billing name" placeholder="Business owner" /><Input label="Billing address" placeholder="Dhaka, Bangladesh" /></div></div><label className="mt-5 flex gap-3 text-[12px] leading-relaxed text-slate-600"><input type="checkbox" className="mt-0.5" defaultChecked />I authorise DevEngine to charge the selected plan after the trial unless I cancel before renewal.</label></>}{step === 3 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Review and activate</h2><div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-[13px]"><div className="flex justify-between"><span className="text-slate-500">Plan</span><span className="font-bold">{selected.name} · {selected.price}{selected.price === "Custom" ? "" : "/month"}</span></div><div className="flex justify-between"><span className="text-slate-500">Business</span><span className="font-bold">{business.name || "Your retail business"}</span></div><div className="flex justify-between"><span className="text-slate-500">Workspace URL</span><span className="font-bold">/{business.slug || "my-business"}/login</span></div><div className="flex justify-between"><span className="text-slate-500">Payment method</span><span className="font-bold capitalize">{payment}</span></div></div><div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-[12px] leading-relaxed text-cyan-900"><span className="font-bold">Trial starts today.</span> You will receive an invoice and activation email before any plan payment is collected.</div></>}</section></div><div className="mx-auto mt-6 flex max-w-[660px] justify-end"><button onClick={next} className="rounded-xl bg-cyan-400 px-6 py-3.5 text-[14px] font-bold text-slate-950 transition hover:bg-cyan-300">{step === 3 ? "Activate workspace →" : "Continue →"}</button></div></div></main>;
}

function StartTrialPage({
  onBack,
  onContinue,
  livePlans,
  onRegisterTenant,
}: {
  onBack: () => void;
  onContinue: (slug: string) => void;
  livePlans?: PlatformPlan[];
  onRegisterTenant?: (tenant: PlatformTenant) => void;
}) {
  const initialPlan = new URLSearchParams(window.location.search).get("plan") || "growth";
  const [plan] = useState(initialPlan);
  return (
    <BusinessRegistrationWizard
      initialPlan={plan}
      onBack={onBack}
      onComplete={onContinue}
      livePlans={livePlans}
      onRegisterTenant={onRegisterTenant}
    />
  );
}

function BusinessRegistrationWizard({
  initialPlan,
  onBack,
  onComplete,
  livePlans,
  onRegisterTenant,
}: {
  initialPlan: string;
  onBack: () => void;
  onComplete: (slug: string) => void;
  livePlans?: PlatformPlan[];
  onRegisterTenant?: (tenant: PlatformTenant) => void;
}) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState(initialPlan);
  const [payment, setPayment] = useState("trial");
  const [business, setBusiness] = useState({
    name: "",
    legalName: "",
    owner: "",
    email: "",
    phone: "",
    entity: "sole-proprietorship",
    country: "Bangladesh",
    currency: "BDT",
    branch: "Main Store",
    address: "",
    slug: "my-business",
    tradeLicense: "",
    taxId: "",
    vatBin: "",
    incorporationNumber: "",
    billingContact: "",
    billingEmail: "",
    paymentReference: "",
    billingAddress: "",
  });
  const [docChecklist, setDocChecklist] = useState({
    ownerId: true,
    tradeLicense: false,
    addressProof: false,
    taxCert: false,
  });
  const [authorizedConfirmed, setAuthorizedConfirmed] = useState(true);
  const steps = ["Plan", "Account", "Business", "Compliance", "Billing", "Review"];
  const activePlanPool = livePlans && livePlans.length ? livePlans : saasPlans.map(item => ({
    id: item.id as PlanId,
    name: item.name,
    price: item.price,
    priceNumeric: item.price === "৳ 2,500" ? 2500 : item.price === "৳ 5,900" ? 5900 : 24000,
    note: item.note,
    locations: item.locations,
    locationsCap: "3",
    registersCap: "8",
    staffCap: "10",
    support: "Priority",
    features: item.features,
    includedModules: ["posCheckout", "customerCredit", "supplierPayables", "sslcommerzOnline"] as TenantModuleKey[],
  }));
  const selected = activePlanPool.find(item => item.id === plan) || activePlanPool[1] || activePlanPool[0];
  const setField = (field: keyof typeof business, value: string) => setBusiness(current => ({ ...current, [field]: value }));
  const advance = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    if (onRegisterTenant) {
      const cleanSlug = (business.slug || "my-business").toLowerCase().replace(/[^a-z0-9-]/g, "-");
      const planName = selected.name;
      const maxBranches = planName === "Scale" ? 25 : planName === "Growth" ? 3 : 1;
      const maxRegisters = planName === "Scale" ? 50 : planName === "Growth" ? 8 : 2;
      const maxStaff = planName === "Scale" ? 120 : planName === "Growth" ? 10 : 3;
      onRegisterTenant({
        id: `${cleanSlug}-${Date.now().toString().slice(-4)}`,
        name: business.name.trim() || "New Retail Business",
        slug: cleanSlug,
        owner: business.owner.trim() || "Workspace Owner",
        email: business.email.trim() || `owner@${cleanSlug}.com`,
        phone: business.phone.trim() || "+880 1700 000000",
        city: business.address.trim() || "Dhaka",
        country: business.country || "Bangladesh",
        entityType: business.entity || "sole-proprietorship",
        tradeLicense: business.tradeLicense.trim() || "Pending submission",
        vatBin: business.vatBin.trim() || "Pending submission",
        registration: {
          legalName: business.legalName.trim() || business.name.trim() || "Not provided",
          currency: business.currency || "BDT",
          firstBranchName: business.branch.trim() || "Main Store",
          businessAddress: business.address.trim() || "Not provided",
          taxId: business.taxId.trim() || "Not provided",
          incorporationNumber: business.incorporationNumber.trim() || "Not provided",
          billingMethod: payment,
          billingContact: business.billingContact.trim() || business.owner.trim() || "Not provided",
          billingEmail: business.billingEmail.trim() || business.email.trim() || "Not provided",
          paymentReference: business.paymentReference.trim() || (payment === "trial" ? "14-day Free Trial" : "Pending capture"),
          billingAddress: business.billingAddress.trim() || business.address.trim() || "Not provided",
          submittedAt: new Date().toLocaleString(),
          authorizedConfirmed,
        },
        plan: planName,
        status: payment === "trial" ? "Trialing" : "Pending",
        verification: "Awaiting review",
        verificationNote: `Registered via /signup (${payment} billing preference).`,
        docs: {
          ownerId: docChecklist.ownerId,
          tradeLicense: docChecklist.tradeLicense || Boolean(business.tradeLicense.trim()),
          addressProof: docChecklist.addressProof || Boolean(business.address.trim()),
          taxCert: docChecklist.taxCert || Boolean(business.vatBin.trim() || business.taxId.trim()),
        },
        branches: 1,
        maxBranches,
        registers: 1,
        maxRegisters,
        staff: 1,
        maxStaff,
        skusCount: 0,
        monthlySalesBdt: 0,
        onlineOrdersCount: 0,
        mrr: selected.price === "Custom" ? "৳ 24,000" : selected.price,
        mrrNumeric: selected.priceNumeric || 0,
        access: false,
        maintenance: false,
        joinedAt: "Just now",
        modules: {
          posCheckout: true,
          multiBranch: planName !== "Starter",
          storefront: planName !== "Starter",
          delivery: planName !== "Starter",
          supplierPayables: true,
          customerCredit: true,
          advancedReports: planName === "Scale",
          guestAppAddon: false,
          sslcommerzOnline: true,
        },
        policy: {
          allowNegativeStock: false,
          requireAdjustmentApproval: true,
          allowCustomerDue: true,
          enforceTwoStepStaff: planName !== "Starter",
          invoicePrefix: `${cleanSlug.slice(0, 3).toUpperCase()}-2026`,
          lowStockThreshold: 5,
        },
      });
    }
    setSubmitted(true);
  };
  if (submitted) return <main className="min-h-[100dvh] bg-slate-950 px-5 py-10 text-white"><div className="mx-auto flex min-h-[80dvh] max-w-[680px] items-center"><section className="w-full rounded-[30px] bg-white p-8 text-slate-950 shadow-2xl sm:p-12"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-[24px] font-black text-white">✓</div><div className="mt-7 text-[12px] font-bold uppercase tracking-[0.16em] text-red-600">Registration submitted</div><h1 className="mt-3 text-[clamp(2.3rem,5vw,4rem)] font-black leading-[0.94] tracking-[-0.055em]">Your workspace is pending verification.</h1><p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-600">DevEngine POS Super Admin will review your business profile, ownership declaration and compliance information before activating <strong>/{business.slug || "my-business"}/login</strong>.</p><div className="mt-7 grid gap-3 sm:grid-cols-3">{["Business profile received", "Compliance review pending", "Activation email to follow"].map((item, index) => <div key={item} className="rounded-xl bg-slate-50 p-4 text-[12px] font-semibold text-slate-700"><span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-[10px] text-white">{index + 1}</span>{item}</div>)}</div><button onClick={() => onComplete(business.slug || "my-business")} className="mt-8 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-[14px] font-bold text-white transition hover:bg-red-700">Go to workspace sign in →</button></section></div></main>;
  return <main className="min-h-[100dvh] bg-slate-950 px-5 py-8 text-white sm:p-10"><div className="mx-auto max-w-[1140px]"><button onClick={step === 0 ? onBack : () => setStep(step - 1)} className="flex items-center gap-2 text-[13px] font-semibold text-slate-300 transition hover:text-white">← {step === 0 ? "Back to DevEngine POS" : "Previous step"}</button><div className="mt-8 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><aside className="pt-2"><DevEngineLogo tone="light" className="w-[220px]" /><RegistrationJourneyPreview /><div className="mt-8 text-[12px] font-bold uppercase tracking-[0.16em] text-slate-300">Your DevEngine POS launch</div><h1 className="mt-4 text-[clamp(2.8rem,5vw,4.6rem)] font-black leading-[0.92] tracking-[-0.06em]">Build the system your business grows into.</h1><p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-300">Create your independent business workspace, reserve its private URL, configure the first branch and submit the information needed to operate with confidence.</p><div className="mt-10 space-y-3">{steps.map((label, index) => <button key={label} onClick={() => index <= step && setStep(index)} className={`flex w-full items-center gap-3 text-left text-[13px] ${index === step ? "text-white" : index < step ? "text-red-300" : "text-slate-500"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${index === step ? "bg-red-500 text-white" : index < step ? "bg-red-500/20 text-red-200" : "bg-white/10 text-slate-400"}`}>{index < step ? "✓" : index + 1}</span>{label}</button>)}</div><div className="mt-10 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-[12px] leading-relaxed text-slate-300">Country-specific legal requirements differ. This registration records the information your DevEngine POS Super Admin needs to review; it does not replace legal, tax, licensing or payment-provider advice.</div></aside><section className="rounded-[28px] bg-white p-6 text-slate-950 shadow-2xl sm:p-8"><div className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">Step {step + 1} of {steps.length} · {steps[step]}</div>{step === 0 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Choose your plan</h2><p className="mt-2 text-[13px] text-slate-500">Choose the capacity that fits your operation today. You can request changes after verification.</p><div className="mt-6 space-y-3">{activePlanPool.map(item => <button key={item.id} onClick={() => setPlan(item.id)} className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${plan === item.id ? "border-red-700 bg-red-700 text-white" : "border-slate-200 hover:border-slate-400"}`}><span><span className="block text-[15px] font-bold">{item.name}</span><span className={`mt-1 block text-[12px] ${plan === item.id ? "text-white/75" : "text-slate-500"}`}>{item.locations}</span></span><span className="text-[15px] font-bold">{item.price}{item.price === "Custom" ? "" : "/mo"}</span></button>)}</div></>}{step === 1 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Account owner</h2><p className="mt-2 text-[13px] text-slate-500">This person will be the initial authorised workspace owner.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Full legal name" value={business.owner} onChange={event => setField("owner", event.target.value)} placeholder="As shown on ID" /><Input label="Work email" value={business.email} onChange={event => setField("email", event.target.value)} type="email" placeholder="owner@business.com" /><Input label="Mobile number" value={business.phone} onChange={event => setField("phone", event.target.value)} placeholder="With country code" /><SelectField label="Country / region" value={business.country} onChange={value => setField("country", value)} options={[{ value: "Bangladesh", label: "Bangladesh" }, { value: "Other", label: "Other / configure later" }]} /></div><label className="mt-5 flex gap-3 text-[12px] leading-relaxed text-slate-600"><input type="checkbox" className="mt-0.5" defaultChecked />I confirm I am authorised to create this business account and accept platform communications about its setup.</label></>}{step === 2 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Business and first location</h2><p className="mt-2 text-[13px] text-slate-500">Your organisation gets a private data boundary and a unique sign-in address.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Trading / display name" value={business.name} onChange={event => setField("name", event.target.value)} placeholder="Your retail business" /><Input label="Registered legal name" value={business.legalName} onChange={event => setField("legalName", event.target.value)} placeholder="If different" /><SelectField label="Entity type" value={business.entity} onChange={value => setField("entity", value)} options={[{ value: "sole-proprietorship", label: "Sole proprietorship" }, { value: "partnership", label: "Partnership" }, { value: "limited-company", label: "Limited company" }, { value: "other", label: "Other legal entity" }]} /><SelectField label="Operating currency" value={business.currency} onChange={value => setField("currency", value)} options={[{ value: "BDT", label: "Bangladeshi Taka (BDT)" }, { value: "USD", label: "US Dollar (USD)" }, { value: "Other", label: "Other / configure later" }]} /><Input label="First branch / store name" value={business.branch} onChange={event => setField("branch", event.target.value)} /><Input label="Business address" value={business.address} onChange={event => setField("address", event.target.value)} placeholder="Street, city, country" /><div className="sm:col-span-2"><Input label="Choose your workspace URL" value={business.slug} onChange={event => setField("slug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} iconRight={<span className="text-[11px] text-slate-400">/login</span>} /><p className="mt-2 text-[11px] text-slate-500">Employees will use <span className="font-semibold text-slate-700">/{business.slug || "your-business"}/login</span> to access this workspace.</p></div></div></>}{step === 3 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Compliance and verification</h2><p className="mt-2 text-[13px] leading-relaxed text-slate-500">Provide identifiers and documents applicable to your jurisdiction. Required fields and approval rules are configured by DevEngine POS Super Admin.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Trade / operating licence number" value={business.tradeLicense} onChange={event => setField("tradeLicense", event.target.value)} placeholder="If applicable" /><Input label="Taxpayer / tax ID" value={business.taxId} onChange={event => setField("taxId", event.target.value)} placeholder="If applicable" /><Input label="VAT / sales-tax registration" value={business.vatBin} onChange={event => setField("vatBin", event.target.value)} placeholder="If applicable" /><Input label="Registration / incorporation number" value={business.incorporationNumber} onChange={event => setField("incorporationNumber", event.target.value)} placeholder="If applicable" /></div><div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5"><div className="text-[13px] font-semibold">Document checklist</div><p className="mt-1 text-[12px] leading-relaxed text-slate-500">In production, Super Admin can require ownership ID, proof of business address, registration certificates, licence records and tax/VAT documentation based on country, entity type and industry.</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{([{ key: "ownerId", label: "Owner identity document" }, { key: "tradeLicense", label: "Business registration / licence" }, { key: "addressProof", label: "Proof of operating address" }, { key: "taxCert", label: "Tax or VAT certificate" }] as const).map(item => <label key={item.key} className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-[12px] font-medium text-slate-700"><input type="checkbox" checked={docChecklist[item.key]} onChange={e => setDocChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))} />{item.label}</label>)}</div></div><label className="mt-5 flex cursor-pointer gap-3 text-[12px] leading-relaxed text-slate-600"><input type="checkbox" checked={authorizedConfirmed} onChange={e => setAuthorizedConfirmed(e.target.checked)} className="mt-0.5" />I confirm this information is accurate and I am authorised to submit it for account verification.</label></>}{step === 4 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Trial and billing</h2><p className="mt-2 text-[13px] text-slate-500">Start a 14-day trial or set up a payment method for post-approval billing. No charge is captured in this UI preview.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{[{ id: "trial", label: "Start free trial", detail: "No payment today" }, { id: "card", label: "Add card", detail: "Billing after trial" }, { id: "bank", label: "Bank transfer", detail: "Invoice / sales approval" }, { id: "mobile", label: "Mobile wallet", detail: "Availability by market" }].map(method => <button key={method.id} onClick={() => setPayment(method.id)} className={`rounded-xl border p-4 text-left transition ${payment === method.id ? "border-red-700 bg-red-50" : "border-slate-200 hover:border-slate-400"}`}><div className="text-[13px] font-bold">{method.label}</div><div className="mt-1 text-[11px] text-slate-500">{method.detail}</div></button>)}</div>{payment !== "trial" && <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2"><Input label="Billing contact" value={business.billingContact} onChange={event => setField("billingContact", event.target.value)} placeholder="Name on payment method" /><Input label="Billing email" value={business.billingEmail} onChange={event => setField("billingEmail", event.target.value)} placeholder="billing@business.com" /><Input label="Payment reference" value={business.paymentReference} onChange={event => setField("paymentReference", event.target.value)} placeholder="Secure provider added in backend" /><Input label="Billing address" value={business.billingAddress} onChange={event => setField("billingAddress", event.target.value)} placeholder="Street, city, country" /></div>}<label className="mt-5 flex gap-3 text-[12px] leading-relaxed text-slate-600"><input type="checkbox" className="mt-0.5" defaultChecked />I accept the selected plan, billing terms and authorise DevEngine POS to contact me about subscription setup.</label></>}{step === 5 && <><h2 className="mt-2 text-[28px] font-bold tracking-tight">Review and submit</h2><p className="mt-2 text-[13px] text-slate-500">Your account is created as pending until DevEngine POS Super Admin completes the verification review.</p><div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-[13px]"><div className="flex justify-between gap-5"><span className="text-slate-500">Plan</span><span className="text-right font-bold">{selected.name} · {selected.price}{selected.price === "Custom" ? "" : "/month"}</span></div><div className="flex justify-between gap-5"><span className="text-slate-500">Business</span><span className="text-right font-bold">{business.name || "Your retail business"}</span></div><div className="flex justify-between gap-5"><span className="text-slate-500">First location</span><span className="text-right font-bold">{business.branch}</span></div><div className="flex justify-between gap-5"><span className="text-slate-500">Workspace sign-in</span><span className="text-right font-bold">/{business.slug || "my-business"}/login</span></div><div className="flex justify-between gap-5"><span className="text-slate-500">Activation</span><span className="text-right font-bold text-amber-700">Super Admin review required</span></div></div><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[12px] leading-relaxed text-amber-900"><span className="font-bold">Verification requirement:</span> the workspace remains restricted until a DevEngine POS Super Admin validates the submitted business information and enables access.</div></>}</section></div><div className="mx-auto mt-6 flex max-w-[720px] justify-end"><button onClick={advance} className="rounded-xl bg-red-600 px-6 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-700">{step === steps.length - 1 ? "Submit for verification →" : "Continue →"}</button></div></div></main>;
}

function VerificationQueue({ onBack }: { onBack: () => void }) {
  const [requests, setRequests] = useState([{ id: "ORG-1048", business: "Urban Mart", owner: "A. Hasan", country: "Bangladesh", plan: "Growth", status: "Awaiting review" }, { id: "ORG-1047", business: "Nova Homeware", owner: "N. Rahman", country: "Bangladesh", plan: "Scale", status: "Documents requested" }, { id: "ORG-1046", business: "Bengal Lifestyle", owner: "M. Alam", country: "Bangladesh", plan: "Starter", status: "Awaiting review" }]);
  const [notice, setNotice] = useState("");
  const update = (id: string, status: string) => { setRequests(items => items.map(item => item.id === id ? { ...item, status } : item)); setNotice(status === "Active" ? "Business activated. Workspace sign-in is now enabled." : "Verification update saved and recorded for Super Admin review."); };
  return <div className="min-h-[100dvh] bg-[#f7f8fb] p-6 text-slate-950"><div className="mx-auto max-w-[1180px]"><button onClick={onBack} className="text-[13px] font-semibold text-slate-600 hover:text-slate-950">← Back to Super Admin</button><div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-red-600">DevEngine POS platform</div><h1 className="mt-1 text-[28px] font-bold tracking-tight">Business verification queue</h1><p className="mt-1 text-[13px] text-slate-500">Approve, request documents from, or restrict pending organisation registrations. This is not available to tenant admins.</p></div><Badge variant="warning" dot>{requests.filter(item => item.status !== "Active").length} pending</Badge></div>{notice && <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800"><span>{notice}</span><button onClick={() => setNotice("")}>×</button></div>}<div className="mt-6 grid gap-5 lg:grid-cols-[1fr_310px]"><section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="grid grid-cols-[1.25fr_0.7fr_0.55fr_0.65fr] gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500"><span>Business / owner</span><span>Jurisdiction</span><span>Plan</span><span>Status</span></div>{requests.map(request => <div key={request.id} className="border-b border-slate-100 px-5 py-4 last:border-0"><div className="grid grid-cols-[1.25fr_0.7fr_0.55fr_0.65fr] gap-3 text-[13px]"><span><span className="block font-semibold">{request.business}</span><span className="mt-1 block text-[11px] text-slate-500">{request.id} · Owner: {request.owner}</span></span><span className="text-slate-600">{request.country}</span><span className="text-slate-600">{request.plan}</span><span><Badge variant={request.status === "Active" ? "success" : request.status === "Documents requested" ? "warning" : "info"}>{request.status}</Badge></span></div>{request.status !== "Active" && <div className="mt-4 flex flex-wrap gap-2"><Btn size="sm" onClick={() => update(request.id, "Active")}>Approve & activate</Btn><Btn size="sm" variant="secondary" onClick={() => update(request.id, "Documents requested")}>Request documents</Btn><Btn size="sm" variant="ghost" onClick={() => update(request.id, "Restricted")}>Restrict</Btn></div>}</div>)}</section><aside className="rounded-xl border border-slate-200 bg-white p-5"><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Verification policy</div><h2 className="mt-2 text-[18px] font-bold">Platform controls</h2><div className="mt-5 space-y-4"><SettingsRow label="Manual activation" sub="Require Super Admin approval before workspace access"><Toggle checked={true} onChange={value => setNotice(value ? "Manual activation enabled." : "Manual activation disabled in UI preview.")} /></SettingsRow><SettingsRow label="Business documents" sub="Collect required files by country and entity type"><Toggle checked={true} onChange={value => setNotice(value ? "Document collection enabled." : "Document collection disabled in UI preview.")} /></SettingsRow><SettingsRow label="Payment review" sub="Hold paid subscription activation until verified"><Toggle checked={true} onChange={value => setNotice(value ? "Payment review enabled." : "Payment review disabled in UI preview.")} /></SettingsRow></div><div className="mt-6 rounded-xl bg-red-50 p-4 text-[12px] leading-relaxed text-red-900">Production implementation should use country-specific requirements, encrypted document storage, role-restricted review and a complete audit trail.</div></aside></div></div></div>;
}

function PublicSiteManager({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState("Privacy policy");
  const [title, setTitle] = useState("Privacy built into the platform.");
  const [notice, setNotice] = useState("");
  const sections = ["Hero & navigation", "Product & multi-location", "Pricing & subscription journey", "Buyer app showcase", "Trusted brands", "Trusted buyers", "About", "Journal", "Contact", "Support centre", "Privacy policy", "Terms of service", "Cookie notice", "Accessibility", "Footer & app add-on"];
  return <div className="min-h-[100dvh] bg-[#f7f8fb] p-6 text-slate-950"><div className="mx-auto max-w-[1180px]"><button onClick={onBack} className="text-[13px] font-semibold text-slate-600 hover:text-slate-950">← Back to Super Admin</button><div className="mt-5 flex flex-wrap items-end justify-between gap-4"><div><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">DevEngine POS platform</div><h1 className="mt-1 text-[28px] font-bold tracking-tight">Website content manager</h1><p className="mt-1 text-[13px] text-slate-500">Manage every public footer link, legal page, contact message and customer-app promotion from Super Admin.</p></div><button onClick={() => setNotice("Public-site content saved in this UI preview.")} className="rounded-lg bg-slate-950 px-4 py-2.5 text-[13px] font-bold text-white">Save public content</button></div>{notice && <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800"><span>{notice}</span><button onClick={() => setNotice("")}>×</button></div>}<div className="mt-6 grid gap-5 lg:grid-cols-[250px_1fr]"><aside className="rounded-xl border border-slate-200 bg-white p-3">{sections.map(item => <button key={item} onClick={() => { setSection(item); setTitle(item === "Footer & app add-on" ? "Your branded customer app" : item === "Privacy policy" ? "Privacy built into the platform." : `${item} for DevEngine POS`); }} className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] font-medium ${section === item ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{item}</button>)}</aside><section className="rounded-xl border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Editing</div><h2 className="mt-1 text-[19px] font-bold">{section}</h2></div><Badge variant="info">Public page</Badge></div><div className="mt-6 space-y-5"><Input label="Navigation / footer label" value={section} onChange={e => setSection(e.target.value)} /><Input label="Page headline" value={title} onChange={e => setTitle(e.target.value)} /><div><label className="mb-1.5 block text-[13px] font-medium">Lead message</label><textarea defaultValue="DevEngine POS provides secure, scalable software for independent retail businesses and their teams." rows={4} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[13px] outline-none focus:border-slate-950" /></div>{section === "Footer & app add-on" && <div className="grid gap-4 sm:grid-cols-2"><Input label="Google Play app link" placeholder="https://play.google.com/..." /><Input label="App Store app link" placeholder="https://apps.apple.com/..." /><Input label="Customer-app add-on price" defaultValue="৳ 1,500 / month" /><Input label="Unavailable button message" defaultValue="Available after your add-on is activated." /></div>}<div className="rounded-xl bg-slate-50 p-4"><div className="text-[12px] font-bold">Live page preview</div><div className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">DevEngine POS</div><div className="mt-2 text-[24px] font-black tracking-tight">{title}</div><p className="mt-2 text-[13px] text-slate-600">Changes will publish to the selected public footer-linked page after Save is connected to the backend.</p></div></div></section></div></div></div>;
}

function PlatformAdminModule({ active, onNavigate, onExit }: { active: string; onNavigate: (tab: string) => void; onExit: () => void }) {
  const [selectedOrg, setSelectedOrg] = useState("Selim Electronics");
  const [plan, setPlan] = useState("Growth");
  const [suspended, setSuspended] = useState(false);
  const [notice, setNotice] = useState("");
  const [flags, setFlags] = useState({ transfers: true, loyalty: false, ai: false, api: true });
  const [tickets, setTickets] = useState([{ id: "SUP-184", title: "Payment verification delay", tenant: "Urban Mart", state: "Urgent" }, { id: "SUP-183", title: "Need another branch", tenant: "Nova Homeware", state: "Open" }, { id: "SUP-182", title: "Import assistance", tenant: "Selim Electronics", state: "Open" }]);
  const menu = [{ id: "overview", label: "Overview", icon: "dashboard" }, { id: "organisations", label: "Organisations", icon: "suppliers" }, { id: "verification", label: "Verification queue", icon: "shield" }, { id: "plans", label: "Plans & billing", icon: "wallet" }, { id: "revenue", label: "Revenue", icon: "finance" }, { id: "support", label: "Support queue", icon: "notifications" }, { id: "website", label: "Website content", icon: "info" }, { id: "flags", label: "Feature flags", icon: "sliders" }, { id: "audit", label: "Audit log", icon: "activity" }];
  if (active === "website") return <PublicSiteManager onBack={() => onNavigate("overview")} />;
  if (active === "verification") return <VerificationQueue onBack={() => onNavigate("overview")} />;
  const content = active === "organisations" ? <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]"><section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-5"><div><h2 className="text-[16px] font-bold">All organisations</h2><p className="mt-1 text-[12px] text-slate-500">Create, review, suspend or impersonate a tenant workspace.</p></div><Btn onClick={() => setNotice("Organisation creation flow opened — UI ready for backend provisioning.")} iconLeft={<Icon d={icons.plus} size={13} />}>New organisation</Btn></div><div className="divide-y divide-slate-100">{[{ name: "Selim Electronics", plan: "Growth", owner: "MD. Selim", locations: 3, state: "Active" }, { name: "Nova Homeware", plan: "Scale", owner: "N. Rahman", locations: 11, state: "Active" }, { name: "Urban Mart", plan: "Starter", owner: "A. Hasan", locations: 1, state: "Trial" }].map(org => <button key={org.name} onClick={() => { setSelectedOrg(org.name); setPlan(org.plan); setSuspended(false); }} className={`grid w-full grid-cols-[1.2fr_0.6fr_0.7fr_0.5fr] gap-3 px-5 py-4 text-left text-[13px] transition ${selectedOrg === org.name ? "bg-slate-50" : "hover:bg-slate-50"}`}><span><span className="block font-semibold">{org.name}</span><span className="mt-1 block text-[11px] text-slate-500">Owner · {org.owner}</span></span><span className="text-slate-600">{org.plan}</span><span className="text-slate-600">{org.locations} branches</span><span><Badge variant={org.state === "Active" ? "success" : "info"}>{org.state}</Badge></span></button>)}</div></section><aside className="rounded-xl border border-slate-200 bg-white p-5"><div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Tenant control</div><h2 className="mt-2 text-[20px] font-bold">{selectedOrg}</h2><div className="mt-5 space-y-4"><SelectField label="Subscription plan" value={plan} onChange={setPlan} options={saasPlans.map(item => ({ value: item.name, label: item.name }))} /><SettingsRow label="Tenant access" sub={suspended ? "Workspace sign-in is blocked" : "Workspace is active"}><Toggle checked={!suspended} onChange={value => { setSuspended(!value); setNotice(value ? "Tenant access restored." : "Tenant has been suspended in this UI preview."); }} /></SettingsRow><SettingsRow label="Read-only maintenance" sub="Prevent data changes while reviewing issues"><Toggle checked={false} onChange={() => setNotice("Maintenance mode updated in UI preview.")} /></SettingsRow></div><div className="mt-5 grid grid-cols-2 gap-2"><Btn variant="secondary" size="sm" onClick={() => setNotice("Impersonation session prepared. Production must require a reason and audit log.")}>View as tenant</Btn><Btn variant="secondary" size="sm" onClick={() => setNotice(`Plan changed to ${plan} in UI preview.`)}>Save controls</Btn></div></aside></div> : active === "plans" ? <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]"><section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-[17px] font-bold">Subscription catalogue</h2><p className="mt-1 text-[12px] text-slate-500">Configure commercially available plans and their entitlements.</p><div className="mt-5 space-y-3">{saasPlans.map(item => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"><div><div className="font-semibold">{item.name}</div><div className="mt-1 text-[12px] text-slate-500">{item.locations} · {item.price}{item.price === "Custom" ? "" : "/mo"}</div></div><div className="flex gap-2"><Btn variant="secondary" size="sm" onClick={() => setNotice(`${item.name} entitlements editor opened.`)}>Edit entitlements</Btn><Btn variant="ghost" size="sm" onClick={() => setNotice(`${item.name} plan visibility updated.`)}>Published</Btn></div></div>)}</div></section><aside className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-[17px] font-bold">Billing operations</h2><div className="mt-5 space-y-3">{[{ text: "6 payment retries", action: "Run retries" }, { text: "3 invoices overdue", action: "Send reminders" }, { text: "12 trial expirations", action: "Review trials" }].map(item => <div key={item.text} className="flex items-center justify-between rounded-lg bg-slate-50 p-3"><span className="text-[13px] font-medium">{item.text}</span><Btn size="sm" variant="secondary" onClick={() => setNotice(`${item.action} action completed in UI preview.`)}>{item.action}</Btn></div>)}</div></aside></div> : active === "support" ? <section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="border-b border-slate-200 p-5"><h2 className="text-[17px] font-bold">Support queue</h2><p className="mt-1 text-[12px] text-slate-500">Track tenant requests with ownership, priority and resolution actions.</p></div>{tickets.map(ticket => <div key={ticket.id} className="flex flex-wrap items-center gap-4 border-b border-slate-100 p-5 last:border-0"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[12px] font-bold">?</div><div className="min-w-[220px] flex-1"><div className="text-[13px] font-semibold">{ticket.title}</div><div className="mt-1 text-[11px] text-slate-500">{ticket.id} · {ticket.tenant}</div></div><Badge variant={ticket.state === "Urgent" ? "error" : "info"}>{ticket.state}</Badge><Btn variant="secondary" size="sm" onClick={() => { setTickets(items => items.filter(item => item.id !== ticket.id)); setNotice(`${ticket.id} marked resolved.`); }}>Resolve</Btn></div>)}</section> : active === "flags" ? <section className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-[17px] font-bold">Feature flags</h2><p className="mt-1 text-[12px] text-slate-500">Turn controlled product capabilities on or off before broad release.</p><div className="mt-6 divide-y divide-slate-100">{[{ id: "transfers", title: "Advanced stock transfers", sub: "Partial receiving and shipment tracking" }, { id: "loyalty", title: "Customer loyalty", sub: "Points, tiers and campaign tools" }, { id: "ai", title: "AI retail insights", sub: "Experimental business recommendations" }, { id: "api", title: "Partner API access", sub: "Controlled API keys for Scale plan" }].map(item => <div key={item.id} className="flex items-center justify-between py-4"><div><div className="text-[14px] font-semibold">{item.title}</div><div className="mt-1 text-[12px] text-slate-500">{item.sub}</div></div><Toggle checked={flags[item.id as keyof typeof flags]} onChange={value => { setFlags(current => ({ ...current, [item.id]: value })); setNotice(`${item.title} ${value ? "enabled" : "disabled"}.`); }} /></div>)}</div></section> : active === "audit" ? <section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="border-b border-slate-200 p-5"><h2 className="text-[17px] font-bold">Platform audit log</h2><p className="mt-1 text-[12px] text-slate-500">Every high-risk action needs an actor, reason and immutable event record.</p></div>{["Super admin adjusted Growth location capacity", "Billing retry sent to Urban Mart", "Support ticket SUP-184 assigned to Farah", "Feature flag: Partner API access enabled"].map((event, index) => <div key={event} className="flex gap-4 border-b border-slate-100 p-5 last:border-0"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold">{index + 1}</span><div><div className="text-[13px] font-medium">{event}</div><div className="mt-1 text-[11px] text-slate-500">Today · Super Admin · IP and justification recorded in production</div></div></div>)}</section> : <section className="rounded-xl border border-slate-200 bg-white p-7"><h2 className="text-[17px] font-bold">Revenue operations</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{[{ label: "MRR", value: "৳ 18.6L" }, { label: "ARR", value: "৳ 2.23Cr" }, { label: "Net retention", value: "112%" }].map(item => <div key={item.label} className="rounded-xl bg-slate-50 p-5"><div className="text-[12px] text-slate-500">{item.label}</div><div className="mt-2 text-[24px] font-bold">{item.value}</div></div>)}</div><Btn className="mt-6" onClick={() => setNotice("Revenue export prepared in UI preview.")}>Export revenue report</Btn></section>;
  return <div className="flex h-[100dvh] bg-[#f7f8fb] text-slate-950"><aside className="flex w-[236px] shrink-0 flex-col bg-slate-950 p-4 text-white"><div className="border-b border-white/10 pb-5"><LandscapeLogo tone="light" size="panel" /><div className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-[11px] font-semibold text-slate-300">PLATFORM CONTROL</div></div><nav className="mt-4 flex-1 space-y-1">{menu.map(item => <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${active === item.id ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon d={icons[item.icon]} size={15} />{item.label}</button>)}</nav><button onClick={onExit} className="rounded-lg border border-white/15 px-3 py-2.5 text-[12px] font-semibold text-slate-300 hover:bg-white/10">← Return to branding</button></aside><main className="flex-1 overflow-y-auto"><header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-7"><div><div className="text-[14px] font-bold">Super Admin</div><div className="text-[11px] text-slate-500">Platform-wide operations and subscriptions</div></div><Badge variant="success" dot>All systems operational</Badge></header><div className="mx-auto max-w-[1280px] space-y-6 p-7"><WorkspacePageHeader eyebrow="SaaS control center" title={menu.find(item => item.id === active)?.label || "Platform"} description="Platform-level controls are isolated from every tenant workspace." />{notice && <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800"><span>{notice}</span><button onClick={() => setNotice("")} className="font-bold">×</button></div>}{content}</div></main></div>;
}

function SuperAdminControlCenter({
  state,
  onUpdateState,
  onResetState,
  onImpersonateTenant,
  onOpenStorefront,
  onExit,
  onNavigate,
  initialActive = "overview",
}: {
  state: PlatformState;
  onUpdateState: (updater: (prev: PlatformState) => PlatformState, noticeText: string, category?: AuditCategory, target?: string) => void;
  onResetState: () => void;
  onImpersonateTenant: (slug: string, route?: string) => void;
  onOpenStorefront: (slug: string) => void;
  onExit: () => void;
  onNavigate: (tab: string) => void;
  initialActive?: string;
}) {
  const [active, setActive] = useState(initialActive === "dashboard" ? "overview" : initialActive);
  const [notice, setNotice] = useState("");
  const [newTenantOpen, setNewTenantOpen] = useState(false);
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(state.tenants[0]?.id || "selim");
  const [draftTenant, setDraftTenant] = useState({
    name: "",
    slug: "",
    slugEdited: false,
    owner: "",
    email: "",
    phone: "",
    city: "Dhaka",
    plan: "Growth" as string,
    initialState: "Awaiting review" as "Awaiting review" | "Active",
  });
  const [draftTicket, setDraftTicket] = useState({
    tenant: state.tenants[0]?.name || "Selim Electronics",
    subject: "",
    category: "Verification" as SupportTicket["category"],
    priority: "High" as SupportTicket["priority"],
    message: "",
  });
  const [readNotifications, setReadNotifications] = useState<string[]>(["content-ready"]);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hoveredDockItem, setHoveredDockItem] = useState<{ label: string; badge: number; top: number } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const dockAsideRef = useRef<HTMLElement>(null);

  const tenants = state.tenants;
  const tickets = state.tickets;
  const profile = state.profile;

  const nav: readonly [SuperAdminIconName, string][] = [
    ["overview", "Overview"], ["organisations", "Organisations"], ["verification", "Verification queue"],
    ["subscriptions", "Subscriptions"], ["plans", "Plans & limits"], ["features", "Feature flags"],
    ["content", "Website content"], ["support", "Support queue"], ["audit", "Audit log"], ["profile", "My profile"], ["settings", "Platform settings"],
  ];
  useEffect(() => setActive(initialActive === "dashboard" ? "overview" : initialActive), [initialActive]);
  useEffect(() => {
    document.body.classList.add("super-admin-canvas");
    return () => document.body.classList.remove("super-admin-canvas");
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
        setNotificationsOpen(false);
        setProfileOpen(false);
        window.setTimeout(() => searchInputRef.current?.focus(), 0);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        searchInputRef.current?.blur();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inDesktopSearch = searchRef.current?.contains(target);
      const inMobileSearch = mobileSearchRef.current?.contains(target);
      if (!inDesktopSearch && !inMobileSearch) setCommandOpen(false);
      if (!notificationsRef.current?.contains(target)) setNotificationsOpen(false);
      if (!profileRef.current?.contains(target)) setProfileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const showToast = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(prev => prev === message ? "" : prev), 3600);
  };
  const go = (id: string) => { setActive(id); onNavigate(id); };
  const handleUpdateState = (updater: (prev: PlatformState) => PlatformState, noticeText: string, category: AuditCategory = "Security", target = "Platform") => {
    onUpdateState(updater, noticeText, category, target);
    showToast(noticeText);
  };
  const patchTenant = (id: string, patch: Partial<PlatformTenant>, auditAction: string, category: AuditCategory = "Tenant") => {
    const targetTenant = tenants.find(item => item.id === id);
    handleUpdateState(
      prev => ({
        ...prev,
        tenants: prev.tenants.map(item => (item.id === id ? { ...item, ...patch } : item)),
      }),
      auditAction,
      category,
      targetTenant?.name || id
    );
  };

  const pendingVerificationsCount = tenants.filter(item => item.verification !== "Verified").length;
  const openSupportCount = tickets.filter(item => item.status !== "Resolved").length;
  const overdueInvoicesCount = state.invoices.filter(item => item.status === "Overdue" || item.status === "Retrying").length;
  const notifications = [
    ...(pendingVerificationsCount > 0
      ? [{ id: "kyc-pending", title: `${pendingVerificationsCount} organisation(s) need KYC review`, detail: `${tenants.filter(t => t.verification !== "Verified").map(t => t.name).slice(0, 2).join(", ")} awaiting approval before activation.`, link: "verification", read: readNotifications.includes("kyc-pending") }]
      : []),
    ...(overdueInvoicesCount > 0
      ? [{ id: "billing-retry", title: `${overdueInvoicesCount} SSLCommerz invoice(s) need follow-up`, detail: `Gateway store ${state.gateway.storeId} (${state.gateway.environment}) has pending collection retries.`, link: "subscriptions", read: readNotifications.includes("billing-retry") }]
      : []),
    ...(openSupportCount > 0
      ? [{ id: "support-open", title: `${openSupportCount} open support ticket(s)`, detail: `${tickets.filter(t => t.status !== "Resolved")[0]?.tenant || "Tenant"} requires platform desk response.`, link: "support", read: readNotifications.includes("support-open") }]
      : []),
    { id: "content-ready", title: "Marketing & Guest App controls live", detail: "Changes in Website content update DevEngine POS landing & customer apps instantly.", link: "content", read: readNotifications.includes("content-ready") },
  ];

  const profileInitials = profile.name.trim().split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase() || "HL";

  const createOrganisation = () => {
    const businessName = draftTenant.name.trim();
    if (!businessName) return;
    const cleanSlug = (draftTenant.slug || businessName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `tenant-${Date.now().toString().slice(-4)}`;
    const matchedPlan = state.plans.find(p => p.name === draftTenant.plan) || state.plans[1];
    const isActive = draftTenant.initialState === "Active";
    const newId = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
    const maxBranches = matchedPlan.name === "Scale" ? 25 : matchedPlan.name === "Growth" ? 3 : 1;
    const maxRegisters = matchedPlan.name === "Scale" ? 50 : matchedPlan.name === "Growth" ? 8 : 2;
    const maxStaff = matchedPlan.name === "Scale" ? 120 : matchedPlan.name === "Growth" ? 10 : 3;
    const created: PlatformTenant = {
      id: newId,
      name: businessName,
      slug: cleanSlug,
      owner: draftTenant.owner.trim() || "Business Owner",
      email: draftTenant.email.trim() || `owner@${cleanSlug}.com`,
      phone: draftTenant.phone.trim() || "+880 1700 000000",
      city: draftTenant.city.trim() || "Dhaka",
      country: "Bangladesh",
      entityType: "sole-proprietorship",
      tradeLicense: isActive ? `TRAD/DNCC/${Date.now().toString().slice(-6)}` : "Pending submission",
      vatBin: isActive ? "Verified BIN" : "Pending submission",
      plan: matchedPlan.name,
      status: isActive ? "Active" : "Pending",
      verification: isActive ? "Verified" : "Awaiting review",
      verificationNote: isActive ? "Provisioned directly by Super Admin." : "Created from Super Admin · awaiting KYC review.",
      docs: { ownerId: isActive, tradeLicense: isActive, addressProof: isActive, taxCert: isActive },
      branches: 1,
      maxBranches,
      registers: 1,
      maxRegisters,
      staff: 1,
      maxStaff,
      skusCount: 0,
      monthlySalesBdt: 0,
      onlineOrdersCount: 0,
      mrr: matchedPlan.price === "Custom" ? "৳ 24,000" : matchedPlan.price,
      mrrNumeric: matchedPlan.priceNumeric || 0,
      access: isActive,
      maintenance: false,
      joinedAt: "Just now",
      modules: {
        posCheckout: true,
        multiBranch: matchedPlan.name !== "Starter",
        storefront: matchedPlan.name !== "Starter",
        delivery: matchedPlan.name !== "Starter",
        supplierPayables: true,
        customerCredit: true,
        advancedReports: matchedPlan.name === "Scale",
        guestAppAddon: false,
        sslcommerzOnline: true,
      },
      policy: {
        allowNegativeStock: false,
        requireAdjustmentApproval: true,
        allowCustomerDue: true,
        enforceTwoStepStaff: matchedPlan.name !== "Starter",
        invoicePrefix: `${cleanSlug.slice(0, 3).toUpperCase()}-2026`,
        lowStockThreshold: 5,
      },
    };
    handleUpdateState(
      prev => ({
        ...prev,
        tenants: [created, ...prev.tenants],
        invoices: [
          {
            id: `INV-${2410 + prev.invoices.length}`,
            tenantId: newId,
            tenantName: businessName,
            plan: matchedPlan.name,
            amount: matchedPlan.price === "Custom" ? "৳ 24,000" : matchedPlan.price,
            amountNumeric: matchedPlan.priceNumeric || 24000,
            dueDate: "Today",
            method: "SSLCommerz",
            status: isActive ? "Paid" : "Overdue",
            trxId: isActive ? `SSLC-SA-${Date.now().toString().slice(-6)}` : "PENDING",
          },
          ...prev.invoices,
        ],
      }),
      `Created organisation ${businessName} (/${cleanSlug})`,
      "Tenant",
      businessName
    );
    setSelectedId(newId);
    setNewTenantOpen(false);
    setDraftTenant({ name: "", slug: "", slugEdited: false, owner: "", email: "", phone: "", city: "Dhaka", plan: "Growth", initialState: "Awaiting review" });
    go("organisations");
  };

  const createSupportTicket = () => {
    if (!draftTicket.subject.trim()) return;
    const ticketId = `SUP-${1843 + tickets.length}`;
    const newItem: SupportTicket = {
      id: ticketId,
      tenant: draftTicket.tenant || tenants[0]?.name || "Selim Electronics",
      subject: draftTicket.subject.trim(),
      category: draftTicket.category,
      priority: draftTicket.priority,
      status: "Open",
      owner: profile.name,
      createdAt: "Just now",
      messages: [
        {
          author: profile.name,
          role: "Super Admin",
          text: draftTicket.message.trim() || `Platform service ticket logged for ${draftTicket.tenant}.`,
          time: "Just now",
        },
      ],
    };
    handleUpdateState(
      prev => ({ ...prev, tickets: [newItem, ...prev.tickets] }),
      `Created ticket ${ticketId} for ${newItem.tenant}`,
      "Support",
      newItem.tenant
    );
    setNewTicketOpen(false);
    setDraftTicket({ tenant: tenants[0]?.name || "Selim Electronics", subject: "", category: "Verification", priority: "High", message: "" });
    go("support");
  };

  const viewProps: SuperAdminViewProps = {
    state,
    selectedTenantId: selectedId,
    onSelectTenantId: setSelectedId,
    onNavigateTab: go,
    onOpenNewTenant: () => setNewTenantOpen(true),
    onOpenNewTicket: () => setNewTicketOpen(true),
    onImpersonateTenant,
    onOpenStorefront,
    onPatchTenant: patchTenant,
    onUpdateState: handleUpdateState,
    onResetState: () => {
      onResetState();
      showToast("Restored default platform state");
    },
  };

  const views: Record<string, React.ReactNode> = {
    overview: <OverviewView {...viewProps} />,
    organisations: <OrganisationsView {...viewProps} />,
    verification: <VerificationView {...viewProps} />,
    subscriptions: <SubscriptionsView {...viewProps} />,
    plans: <PlansView {...viewProps} />,
    features: <FeaturesView {...viewProps} />,
    content: <ContentView {...viewProps} />,
    support: <SupportView {...viewProps} />,
    audit: <AuditView {...viewProps} />,
    profile: <ProfileView {...viewProps} />,
    settings: <SettingsView {...viewProps} />,
  };
  const renderExecutiveAdminFrame = () => {
    const pageTitle = nav.find(item => item[0] === active)?.[1] || "Overview";
    const unread = notifications.filter(item => !item.read).length;
    const commandNavigation = nav.filter(([, label]) => label.toLowerCase().includes(commandQuery.toLowerCase()));
    const commandTenants = tenants.filter(item => `${item.name} ${item.owner} ${item.slug}`.toLowerCase().includes(commandQuery.toLowerCase())).slice(0, 4);
    const openSearch = () => {
      setCommandOpen(true);
      setNotificationsOpen(false);
      setProfileOpen(false);
    };
    const selectNotification = (id: string, link: string) => {
      setReadNotifications(prev => prev.includes(id) ? prev : [...prev, id]);
      setNotificationsOpen(false);
      go(link);
    };
    const navigateTo = (id: SuperAdminIconName) => {
      go(id);
      setMobileNavOpen(false);
    };
    const navGroups: { title: string; items: readonly [SuperAdminIconName, string][] }[] = [
      { title: "Workspace", items: nav.slice(0, 3) },
      { title: "Commercial", items: nav.slice(3, 6) },
      { title: "Operations", items: nav.slice(6) },
    ];
    const quickViews: readonly [SuperAdminIconName, string][] = [
      ["overview", "Command center"],
      ["organisations", "Tenant lifecycle"],
      ["verification", "Onboarding"],
      ["subscriptions", "Billing"],
      ["support", "Support"],
    ];

    const renderCommandResults = () => (
      <div className="max-h-[340px] overflow-y-auto p-1.5">
        <div className="flex items-center justify-between px-2.5 pb-1 pt-1.5">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Platform pages</p>
          {commandQuery && (
            <button
              type="button"
              onClick={() => { setCommandQuery(""); searchInputRef.current?.focus(); }}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-900"
            >
              Clear
            </button>
          )}
        </div>
        {commandNavigation.length ? (
          commandNavigation.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => { go(id); setCommandOpen(false); setCommandQuery(""); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${active === id ? "bg-slate-100 text-slate-950" : "text-slate-700 hover:bg-slate-50"}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <SuperAdminIcon name={id} size={15} />
              </span>
              <span className="text-[12px] font-bold text-slate-900">{label}</span>
              <span className="ml-auto text-[11px] font-medium text-slate-400">Open →</span>
            </button>
          ))
        ) : (
          <p className="px-3 py-3 text-[12px] text-slate-500">No platform pages match "{commandQuery}".</p>
        )}
        {commandTenants.length > 0 && (
          <>
            <p className="px-2.5 pb-1 pt-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Organisations</p>
            {commandTenants.map(tenant => (
              <button
                key={tenant.id}
                type="button"
                onClick={() => { setSelectedId(tenant.id); go("organisations"); setCommandOpen(false); setCommandQuery(""); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-[10px] font-black text-white">
                  {tenant.name.slice(0, 1)}
                </span>
                <span>
                  <b className="block text-[12px] text-slate-900">{tenant.name}</b>
                  <small className="text-[10px] text-slate-500">/{tenant.slug} · {tenant.plan}</small>
                </span>
                <span className="ml-auto text-[11px] text-slate-400">Inspect →</span>
              </button>
            ))}
          </>
        )}
      </div>
    );

    const renderDockContents = (compact: boolean) => (
      <>
        <div className={`flex items-center ${compact ? "justify-center pb-2" : "justify-between gap-2 px-1 pb-2.5"} border-b border-white/10`}>
          <button
            type="button"
            onClick={() => navigateTo("overview")}
            title={compact ? "DevEngine POS · Overview" : "Return to Overview"}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] transition hover:border-white/30 hover:bg-white/10"
          >
            <img src={devEngineFaviconImg} alt="DevEngine POS" className="h-5 w-5 object-contain" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070E22]" title="Systems operational · 99.98%" />
          </button>
          {!compact && (
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-extrabold tracking-tight text-white">Control Dock</div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/75">99.98% Live</div>
            </div>
          )}
        </div>

        <nav aria-label="Super Admin navigation" className="my-2 min-h-0 flex-1 overflow-y-auto px-0.5">
          {navGroups.map((group, groupIndex) => (
            <div key={group.title} className={groupIndex > 0 ? "mt-2 pt-2 border-t border-white/10" : ""}>
              {!compact && (
                <p className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">{group.title}</p>
              )}
              <div className="space-y-1">
                {group.items.map(([id, label]) => {
                  const isActive = active === id;
                  const countBadge =
                    id === "verification" ? pendingVerificationsCount : id === "support" ? openSupportCount : 0;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => navigateTo(id)}
                      onMouseEnter={event => {
                        if (!compact || !dockAsideRef.current) return;
                        const buttonRect = event.currentTarget.getBoundingClientRect();
                        const asideRect = dockAsideRef.current.getBoundingClientRect();
                        setHoveredDockItem({
                          label,
                          badge: countBadge,
                          top: buttonRect.top - asideRect.top + buttonRect.height / 2,
                        });
                      }}
                      onMouseLeave={() => compact && setHoveredDockItem(null)}
                      aria-label={label}
                      className={[
                        "group relative flex w-full items-center transition-all duration-150",
                        compact
                          ? "mx-auto h-9 w-9 justify-center rounded-xl"
                          : "gap-2.5 rounded-xl px-2.5 py-2 text-left text-[12px] font-semibold",
                        isActive
                          ? "bg-white text-slate-950 shadow-[0_6px_18px_-4px_rgba(255,255,255,0.28)]"
                          : "text-slate-300 hover:bg-white/[0.09] hover:text-white",
                      ].join(" ")}
                    >
                      <SuperAdminIcon name={id} size={16} strokeWidth={isActive ? 2.1 : 1.85} />
                      {!compact && <span className="truncate">{label}</span>}
                      {compact && countBadge > 0 && (
                        <span
                          className={[
                            "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-black ring-2 ring-[#070E22]",
                            isActive ? "bg-slate-950 text-white" : "bg-white text-slate-950",
                          ].join(" ")}
                        >
                          {countBadge}
                        </span>
                      )}
                      {!compact && countBadge > 0 && (
                        <span
                          className={[
                            "ml-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1.5 text-[9px] font-black",
                            isActive ? "bg-slate-950 text-white" : "bg-white/15 text-white",
                          ].join(" ")}
                        >
                          {countBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className={`flex ${compact ? "flex-col items-center gap-1.5 pt-2" : "items-center justify-between gap-2 pt-2.5"} border-t border-white/10`}>
          <button
            type="button"
            onClick={() => navigateTo("profile")}
            title={`${profile.name} (${profile.role})`}
            className={`flex items-center gap-2 rounded-xl transition ${compact ? "h-9 w-9 justify-center hover:bg-white/10" : "min-w-0 flex-1 px-1.5 py-1 hover:bg-white/10"}`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-950">
              {profileInitials}
            </span>
            {!compact && (
              <span className="min-w-0 text-left">
                <b className="block truncate text-[11px] font-bold text-white">{profile.name}</b>
                <small className="block truncate text-[9px] text-slate-400">{profile.role}</small>
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => { setDockExpanded(value => !value); setHoveredDockItem(null); }}
            title={dockExpanded ? "Compact floating dock" : "Expand floating dock"}
            aria-label={dockExpanded ? "Compact floating dock" : "Expand floating dock"}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 transition hover:border-white/30 hover:bg-white/15 hover:text-white lg:flex"
          >
            <SuperAdminIcon name={dockExpanded ? "chevronLeft" : "chevronRight"} size={14} />
          </button>
        </div>
      </>
    );

    return <div className="super-admin-executive min-h-[100dvh] bg-[#f4f6f9] text-slate-950">
      {/* Compact Floating Obsidian Pill Dock (Desktop) — Centered, not top-to-bottom */}
      <aside
        ref={dockAsideRef}
        onMouseLeave={() => setHoveredDockItem(null)}
        className={[
          "fixed left-4 top-1/2 z-30 hidden max-h-[calc(100dvh-136px)] -translate-y-1/2 flex-col rounded-[26px] border border-slate-800/80 bg-[#070E22]/95 text-white shadow-[0_24px_56px_-14px_rgba(2,6,23,0.5)] backdrop-blur-xl transition-all duration-200 lg:flex",
          dockExpanded ? "w-[228px] p-3" : "w-[62px] px-2 py-3",
        ].join(" ")}
      >
        {renderDockContents(!dockExpanded)}
        {!dockExpanded && hoveredDockItem && (
          <div
            style={{ top: hoveredDockItem.top }}
            className="pointer-events-none absolute left-[calc(100%+12px)] z-50 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-slate-800 bg-[#070E22] px-3 py-1.5 text-[12px] font-bold text-white shadow-xl"
          >
            <span>{hoveredDockItem.label}</span>
            {hoveredDockItem.badge > 0 && (
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-black text-slate-950">
                {hoveredDockItem.badge}
              </span>
            )}
          </div>
        )}
      </aside>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />
          <aside className="relative z-10 m-3 flex max-h-[calc(100dvh-24px)] w-[256px] max-w-[82vw] flex-col self-center rounded-[26px] border border-white/15 bg-[#070E22] p-3.5 text-white shadow-2xl">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                aria-label="Close drawer"
                onClick={() => setMobileNavOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
              >
                <SuperAdminIcon name="x" size={16} />
              </button>
            </div>
            {renderDockContents(false)}
          </aside>
        </div>
      )}

      <div className={`min-h-[100dvh] transition-all duration-200 ${dockExpanded ? "lg:pl-[256px]" : "lg:pl-[88px]"}`}>
        <div className="mx-auto max-w-[1380px] px-4 pt-3 sm:px-6 lg:px-8">
          <header className="sticky top-3 z-40 overflow-visible rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <div className="flex h-[58px] items-center justify-between gap-3 px-3.5 sm:px-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setMobileNavOpen(true)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-800 transition hover:bg-slate-100 lg:hidden"
                >
                  <SuperAdminIcon name="menu" size={16} />
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  title="Return to DevEngine POS site"
                  className="hidden shrink-0 items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-slate-100 sm:flex"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-[11px] font-black text-white">
                    DE
                  </span>
                  <span className="text-[13px] font-bold tracking-tight text-slate-950">DevEngine</span>
                </button>
                <span className="hidden h-5 w-px bg-slate-200 sm:block" />
                <div className="flex min-w-0 items-center gap-2">
                  <span className="hidden rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 md:inline-block">
                    Super Admin
                  </span>
                  <h1 className="truncate text-[14px] font-bold tracking-tight text-slate-950">{pageTitle}</h1>
                </div>
              </div>

              {/* Centered Compact Search */}
              <div ref={searchRef} className="relative mx-2 hidden w-full max-w-[360px] flex-1 lg:block">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SuperAdminIcon name="search" size={14} />
                </span>
                <input
                  ref={searchInputRef}
                  value={commandQuery}
                  onFocus={openSearch}
                  onClick={openSearch}
                  onChange={event => { setCommandQuery(event.target.value); openSearch(); }}
                  placeholder="Search tenants, queues or pages…"
                  className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/90 py-1.5 pl-8 pr-12 text-[12px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-2 focus:ring-slate-950/10"
                />
                {commandOpen ? (
                  <button
                    type="button"
                    onClick={() => { setCommandOpen(false); setCommandQuery(""); searchInputRef.current?.blur(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  >
                    Esc
                  </button>
                ) : (
                  <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                    ⌘K
                  </kbd>
                )}

                {commandOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)]">
                    {renderCommandResults()}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  aria-label="Open command search"
                  onClick={openSearch}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
                >
                  <SuperAdminIcon name="search" size={15} />
                </button>

                <span className="hidden items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 xl:inline-flex">
                  <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>

                <button
                  type="button"
                  onClick={() => setNewTenantOpen(true)}
                  className="hidden items-center gap-1 rounded-lg bg-slate-950 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-slate-800 md:inline-flex"
                >
                  <SuperAdminIcon name="plus" size={14} strokeWidth={2.2} />
                  New tenant
                </button>

                <div ref={notificationsRef} className="relative">
                  <button
                    type="button"
                    aria-label="Open notifications"
                    onClick={() => { setNotificationsOpen(value => !value); setProfileOpen(false); setCommandOpen(false); }}
                    className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                  >
                    <SuperAdminIcon name="bell" size={15} />
                    {unread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-950 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                        {unread}
                      </span>
                    )}
                  </button>
                  {notificationsOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(370px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                        <div>
                          <b className="block text-[13px] text-slate-950">Notifications</b>
                          <small className="text-[11px] text-slate-500">{unread ? `${unread} need your attention` : "You are all caught up"}</small>
                        </div>
                        <button type="button" onClick={() => setReadNotifications(notifications.map(item => item.id))} className="text-[11px] font-semibold text-slate-600 hover:text-slate-950">Mark all read</button>
                      </div>
                      <div className="max-h-[340px] overflow-y-auto p-2">
                        {notifications.map(item => (
                          <button key={item.id} type="button" onClick={() => selectNotification(item.id, item.link)} className={`w-full rounded-xl p-3 text-left transition hover:bg-slate-50 ${item.read ? "opacity-65" : "bg-slate-50/80"}`}>
                            <span className="flex gap-3">
                              <i className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.read ? "bg-slate-300" : "bg-slate-950"}`} />
                              <span>
                                <b className="block text-[12px] text-slate-900">{item.title}</b>
                                <small className="mt-1 block text-[11px] leading-relaxed text-slate-500">{item.detail}</small>
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                      <button type="button" onClick={() => { setNotificationsOpen(false); go("audit"); }} className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-[12px] font-semibold text-slate-700 hover:bg-slate-50">View notification history →</button>
                    </div>
                  )}
                </div>

                <div ref={profileRef} className="relative">
                  <button
                    type="button"
                    onClick={() => { setProfileOpen(value => !value); setNotificationsOpen(false); setCommandOpen(false); }}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white py-1 pl-1 pr-2 text-left transition hover:bg-slate-50"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-950 text-[10px] font-bold text-white">
                      {profileInitials}
                    </span>
                    <span className="hidden max-w-[110px] truncate text-[12px] font-semibold text-slate-900 sm:block">
                      {profile.name}
                    </span>
                    <SuperAdminIcon name="chevronDown" size={12} className="text-slate-400" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[250px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                      <div className="border-b border-slate-100 px-3 py-2.5">
                        <b className="block text-[12px] text-slate-950">{profile.name}</b>
                        <small className="mt-0.5 block text-[11px] text-slate-500">{profile.role} · {profile.email}</small>
                      </div>
                      <button type="button" onClick={() => { setProfileOpen(false); go("profile"); }} className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[12px] font-semibold text-slate-800 hover:bg-slate-50"><SuperAdminIcon name="profile" size={14} className="text-slate-500" />Manage profile &amp; security</button>
                      <button type="button" onClick={() => { setProfileOpen(false); go("settings"); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[12px] font-semibold text-slate-800 hover:bg-slate-50"><SuperAdminIcon name="settings" size={14} className="text-slate-500" />Platform settings</button>
                      <button type="button" onClick={() => { setProfileOpen(false); go("audit"); }} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[12px] font-semibold text-slate-800 hover:bg-slate-50"><SuperAdminIcon name="audit" size={14} className="text-slate-500" />View my activity</button>
                      <button type="button" onClick={() => { setProfileOpen(false); onExit(); }} className="mt-1 flex w-full items-center gap-2.5 rounded-xl border-t border-slate-100 px-3 py-2 text-left text-[12px] font-semibold text-slate-600 hover:bg-slate-50"><SuperAdminIcon name="logout" size={14} className="text-slate-400" />Exit Super Admin</button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onExit}
                  title="Exit to website"
                  className="hidden h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex"
                >
                  <SuperAdminIcon name="logout" size={12} />
                  Exit
                </button>
              </div>
            </div>

            {commandOpen && (
              <div ref={mobileSearchRef} className="border-t border-slate-200 bg-white p-3 lg:hidden">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <SuperAdminIcon name="search" size={15} className="text-slate-400" />
                  <input
                    value={commandQuery}
                    onChange={event => setCommandQuery(event.target.value)}
                    placeholder="Type a module or business name…"
                    className="w-full bg-transparent text-[12px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button type="button" onClick={() => { setCommandOpen(false); setCommandQuery(""); }} className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">Esc</button>
                </div>
                <div className="mt-2 rounded-xl border border-slate-100 bg-white">
                  {renderCommandResults()}
                </div>
              </div>
            )}
          </header>

          {/* Compact Quick Switch Strip aligned directly with content */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {quickViews.map(([id, label]) => {
                const isCurrent = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={[
                      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-medium transition",
                      isCurrent
                        ? "bg-slate-950 text-white shadow-xs"
                        : "border border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950",
                    ].join(" ")}
                  >
                    <SuperAdminIcon name={id} size={13} className={isCurrent ? "text-white" : "text-slate-500"} />
                    {label}
                  </button>
                );
              })}
            </div>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:inline">
              {tenants.length} organisations · {pendingVerificationsCount} KYC pending · SSLCommerz {state.gateway.environment}
            </span>
          </div>
        </div>

        <main className="mx-auto max-w-[1380px] px-4 pb-10 pt-5 sm:px-6 lg:px-8">{notice && <div className="mb-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-800"><span>{notice}</span><button onClick={() => setNotice("")}>×</button></div>}{views[active] || views.overview}</main>
      </div>
      <Modal open={newTenantOpen} onClose={() => setNewTenantOpen(false)} title="Create organisation" size="md">
        <div className="space-y-4">
          <p className="text-[13px] leading-relaxed text-slate-500">Provision a tenant workspace with isolated database scope, plan entitlements, and POS module configuration.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Business name"
              value={draftTenant.name}
              onChange={event => {
                const nextName = event.target.value;
                setDraftTenant(prev => ({
                  ...prev,
                  name: nextName,
                  slug: prev.slugEdited ? prev.slug : nextName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                }));
              }}
              placeholder="e.g. Dhaka Gadget Hub"
            />
            <Input
              label="Workspace slug"
              value={draftTenant.slug}
              onChange={event => setDraftTenant(prev => ({ ...prev, slugEdited: true, slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))}
              placeholder="dhaka-gadget-hub"
            />
            <Input label="Owner full name" value={draftTenant.owner} onChange={event => setDraftTenant(prev => ({ ...prev, owner: event.target.value }))} placeholder="Md. Tariqul Islam" />
            <Input label="Owner email" type="email" value={draftTenant.email} onChange={event => setDraftTenant(prev => ({ ...prev, email: event.target.value }))} placeholder="owner@business.com" />
            <Input label="Phone" value={draftTenant.phone} onChange={event => setDraftTenant(prev => ({ ...prev, phone: event.target.value }))} placeholder="+880 1711-000000" />
            <Input label="City" value={draftTenant.city} onChange={event => setDraftTenant(prev => ({ ...prev, city: event.target.value }))} placeholder="Dhaka" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Plan"
              value={draftTenant.plan}
              onChange={val => setDraftTenant(prev => ({ ...prev, plan: val }))}
              options={state.plans.map(p => ({ value: p.name, label: `${p.name} (${p.price})` }))}
            />
            <SelectField
              label="Initial state"
              value={draftTenant.initialState}
              onChange={val => setDraftTenant(prev => ({ ...prev, initialState: val as "Awaiting review" | "Active" }))}
              options={[{ value: "Awaiting review", label: "Pending verification" }, { value: "Active", label: "Active immediately" }]}
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Btn variant="secondary" onClick={() => setNewTenantOpen(false)}>Cancel</Btn>
            <Btn onClick={createOrganisation} disabled={!draftTenant.name.trim()}>Create organisation</Btn>
          </div>
        </div>
      </Modal>
      <Modal open={newTicketOpen} onClose={() => setNewTicketOpen(false)} title="Create support ticket" size="md">
        <div className="space-y-4">
          <p className="text-[13px] leading-relaxed text-slate-500">Log a support request against an organisation workspace for billing, POS hardware, KYC, or feature support.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Organisation"
              value={draftTicket.tenant}
              onChange={val => setDraftTicket(prev => ({ ...prev, tenant: val }))}
              options={tenants.map(t => ({ value: t.name, label: t.name }))}
            />
            <SelectField
              label="Category"
              value={draftTicket.category}
              onChange={val => setDraftTicket(prev => ({ ...prev, category: val as SupportTicket["category"] }))}
              options={[
                { value: "Verification", label: "Verification & KYC" },
                { value: "POS & Hardware", label: "POS & Hardware" },
                { value: "Billing & SSLCommerz", label: "Billing & SSLCommerz" },
                { value: "Branches & Stock", label: "Branches & Stock" },
                { value: "Storefront", label: "Storefront" },
              ]}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
            <Input label="Subject" value={draftTicket.subject} onChange={event => setDraftTicket(prev => ({ ...prev, subject: event.target.value }))} placeholder="e.g. Thermal printer setup on Counter 02" />
            <SelectField
              label="Priority"
              value={draftTicket.priority}
              onChange={val => setDraftTicket(prev => ({ ...prev, priority: val as SupportTicket["priority"] }))}
              options={[{ value: "Urgent", label: "Urgent" }, { value: "High", label: "High" }, { value: "Normal", label: "Normal" }, { value: "Low", label: "Low" }]}
            />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-slate-700">Initial note</span>
            <textarea
              rows={3}
              value={draftTicket.message}
              onChange={event => setDraftTicket(prev => ({ ...prev, message: event.target.value }))}
              placeholder="Describe the issue and next steps..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] outline-none focus:border-slate-950"
            />
          </label>
          <div className="flex justify-end gap-3 pt-3">
            <Btn variant="secondary" onClick={() => setNewTicketOpen(false)}>Cancel</Btn>
            <Btn onClick={createSupportTicket} disabled={!draftTicket.subject.trim()}>Submit ticket</Btn>
          </div>
        </div>
      </Modal>
    </div>;
  };
  return renderExecutiveAdminFrame();
}

function PlatformConsole({ onExit, onNavigate, initialActive = "overview" }: { onExit: () => void; onNavigate: (tab: string) => void; initialActive?: string }) {
  const [active, setActive] = useState(initialActive);
  useEffect(() => setActive(initialActive), [initialActive]);
  useEffect(() => {
    const routeForTab: Record<string, string> = { overview: "dashboard", organisations: "organizations", verification: "verification", plans: "plans", revenue: "revenue", support: "support", website: "website", flags: "settings", audit: "audit" };
    onNavigate(routeForTab[active] || active);
  }, [active]);
  if (active !== "overview") return <PlatformAdminModule active={active} onNavigate={setActive} onExit={onExit} />;
  const menu = [{ id: "overview", label: "Overview", icon: "dashboard" }, { id: "organisations", label: "Organisations", icon: "suppliers" }, { id: "verification", label: "Verification queue", icon: "shield" }, { id: "plans", label: "Plans & billing", icon: "wallet" }, { id: "revenue", label: "Revenue", icon: "finance" }, { id: "support", label: "Support queue", icon: "notifications" }, { id: "website", label: "Website content", icon: "info" }, { id: "flags", label: "Feature flags", icon: "sliders" }, { id: "audit", label: "Audit log", icon: "activity" }];
  return <div className="flex h-[100dvh] bg-[#f7f8fb] text-slate-950"><aside className="flex w-[236px] shrink-0 flex-col bg-slate-950 p-4 text-white"><div className="border-b border-white/10 pb-5"><LandscapeLogo tone="light" size="panel" /><div className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-[11px] font-semibold text-slate-300">PLATFORM CONTROL</div></div><nav className="mt-4 flex-1 space-y-1">{menu.map(item => <button key={item.id} onClick={() => setActive(item.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${active === item.id ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}><Icon d={icons[item.icon]} size={15} />{item.label}</button>)}</nav><button onClick={onExit} className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-[12px] font-semibold text-slate-300 hover:bg-white/10">← Return to branding</button></aside><main className="flex-1 overflow-y-auto"><header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-7"><div><div className="text-[14px] font-bold">Super Admin</div><div className="text-[11px] text-slate-500">Platform-wide operations and subscriptions</div></div><div className="flex items-center gap-3"><Badge variant="success" dot>All systems operational</Badge><div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold text-white">SA</div></div></header><div className="mx-auto max-w-[1380px] space-y-6 p-7"><WorkspacePageHeader eyebrow="SaaS control center" title={menu.find(item => item.id === active)?.label || "Overview"} description="Monitor tenants, subscriptions, revenue and platform health from one secure workspace." action={<Btn iconLeft={<Icon d={icons.plus} size={14} />}>Add organisation</Btn>} />{active === "overview" ? <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ label: "Monthly recurring revenue", value: "৳ 18.6L", note: "+12.4% vs last month" }, { label: "Active organisations", value: "248", note: "17 in trial" }, { label: "Payment collection", value: "98.2%", note: "6 invoices overdue" }, { label: "Platform availability", value: "99.98%", note: "Last 30 days" }].map(card => <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-[11px] font-medium text-slate-500">{card.label}</div><div className="mt-3 text-[28px] font-bold tracking-tight">{card.value}</div><div className="mt-2 text-[11px] text-emerald-600">{card.note}</div></div>)}</div><div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]"><section className="rounded-xl border border-slate-200 bg-white"><div className="flex justify-between border-b border-slate-200 p-5"><div><h2 className="text-[15px] font-semibold">Organisation growth</h2><p className="mt-1 text-[12px] text-slate-500">New paid organisations and trial conversion.</p></div><Badge variant="info">30 days</Badge></div><div className="flex h-[250px] items-end gap-2 px-6 pb-6 pt-10">{[44,58,52,74,63,86,91,78,105,112,98,127].map((height, index) => <div key={index} className="flex-1 rounded-t-md bg-slate-950/90" style={{ height: `${height * 1.5}px` }} />)}</div></section><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-[15px] font-semibold">Action center</h2><div className="mt-4 space-y-3">{[{ title: "6 payment retries due", text: "Protect subscription revenue", tone: "warning" }, { title: "4 onboarding reviews", text: "New enterprise requests", tone: "info" }, { title: "2 elevated support tickets", text: "Requires response today", tone: "error" }].map(item => <div key={item.title} className="flex gap-3 rounded-lg bg-slate-50 p-3"><span className={`mt-1 h-2 w-2 rounded-full ${item.tone === "warning" ? "bg-amber-500" : item.tone === "error" ? "bg-red-500" : "bg-blue-500"}`} /><div><div className="text-[13px] font-semibold">{item.title}</div><div className="mt-0.5 text-[11px] text-slate-500">{item.text}</div></div></div>)}</div></section></div><section className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-5"><div><h2 className="text-[15px] font-semibold">Organisation health</h2><p className="mt-1 text-[12px] text-slate-500">Latest customer and subscription activity.</p></div><Btn variant="ghost" size="sm">View all</Btn></div>{[{ name: "Selim Electronics", plan: "Growth", locations: "3 locations", status: "Active", mrr: "৳ 5,900" }, { name: "Nova Homeware", plan: "Scale", locations: "11 locations", status: "Active", mrr: "৳ 24,000" }, { name: "Urban Mart", plan: "Starter", locations: "1 location", status: "Trial", mrr: "৳ 0" }].map(row => <div key={row.name} className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr_0.6fr] gap-3 border-b border-slate-100 px-5 py-4 text-[13px] last:border-0"><span className="font-semibold">{row.name}</span><span className="text-slate-600">{row.plan}</span><span className="text-slate-600">{row.locations}</span><span><Badge variant={row.status === "Active" ? "success" : "info"}>{row.status}</Badge></span><span className="text-right font-semibold">{row.mrr}</span></div>)}</section></> : <section className="rounded-xl border border-slate-200 bg-white p-8"><div className="flex h-[360px] flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"><Icon d={icons[menu.find(item => item.id === active)?.icon || "dashboard"]} size={23} /></span><h2 className="mt-5 text-[19px] font-bold">{menu.find(item => item.id === active)?.label} workspace</h2><p className="mt-2 max-w-md text-[13px] leading-relaxed text-slate-500">This UI establishes the platform-level route and control surface. The final implementation will connect its data, approvals, audit trail and permission boundaries to the backend.</p><Btn className="mt-5">Configure module</Btn></div></section>}</div></main></div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════════════════════
function AppShell({
  onSignOut,
  guestApp,
  onGuestAppChange,
  activeRoute,
  onNavigate,
  tenant,
  tenantRecord,
  platformContent,
  impersonating = false,
  onExitImpersonation,
}: {
  onSignOut: () => void;
  guestApp: GuestAppConfig;
  onGuestAppChange: (next: GuestAppConfig) => void;
  activeRoute: string;
  onNavigate: (id: string) => void;
  tenant: string;
  tenantRecord?: PlatformTenant;
  platformContent?: PlatformContentState;
  impersonating?: boolean;
  onExitImpersonation?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(activeRoute);
  const registrationPending = new URLSearchParams(window.location.search).get("pending") === "true" || (tenantRecord ? tenantRecord.verification !== "Verified" : false);
  const businessName = tenantRecord?.name || (tenant === "your-business" ? "Your business" : tenant.replace(/-/g, " ").replace(/\b\w/g, letter => letter.toUpperCase()));
  useEffect(() => setActiveItem(activeRoute), [activeRoute]);
  const navigate = (id: string) => { setActiveItem(id); onNavigate(id); };

  const restrictedIds = tenantRecord
    ? TENANT_MODULE_META.filter(m => !tenantRecord.modules[m.key]).flatMap(m => m.sidebarIds)
    : [];
  const restrictedModule = TENANT_MODULE_META.find(m => m.sidebarIds.includes(activeItem) && !tenantRecord?.modules[m.key]);

  if (tenantRecord && !tenantRecord.access && !impersonating) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-800">
            Workspace Restricted · {tenantRecord.status}
          </div>
          <h1 className="mt-4 text-[26px] font-black tracking-tight">{businessName} POS is currently paused</h1>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
            Workspace access for <strong>/{tenantRecord.slug}</strong> is locked by DevEngine POS Super Admin ({tenantRecord.verification}). Staff sign-in and register operations will resume once approved.
          </p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-[12px] text-slate-600">
            <div><strong className="text-slate-900">Plan:</strong> {tenantRecord.plan}</div>
            <div className="mt-1"><strong className="text-slate-900">Review note:</strong> {tenantRecord.verificationNote || "Awaiting Super Admin review"}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onSignOut} className="rounded-xl bg-slate-950 px-4 py-2.5 text-[13px] font-bold text-white">
              Return to sign in
            </button>
          </div>
        </div>
      </main>
    );
  }

  const renderPage = () => {
    if (restrictedModule && activeItem !== "dashboard") {
      return (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Icon d={icons.shield} size={20} />
            </span>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Platform Entitlement Control</p>
            <h2 className="mt-2 text-[22px] font-black tracking-tight text-slate-950">{restrictedModule.label} is disabled</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
              {restrictedModule.description} This capability is currently turned off for <strong>{businessName}</strong> ({tenantRecord?.plan || "Growth"} plan) by DevEngine POS Super Admin.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate("dashboard")} className="rounded-xl bg-slate-950 px-4 py-2.5 text-[13px] font-bold text-white">
                Back to Dashboard
              </button>
              {impersonating && onExitImpersonation && (
                <button onClick={onExitImpersonation} className="rounded-xl border border-slate-200 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50">
                  Enable in Super Admin →
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (activeItem === "dashboard") return <DashboardPage onNavigate={navigate} businessName={businessName} />;
    if (activeItem === "pos") return <POSPage onNavigate={navigate} />;
    if (activeItem === "sales") return <SalesPage onNavigate={navigate} />;
    if (activeItem === "products") return <ProductsPage onNavigate={navigate} />;
    if (activeItem === "categories") return <CategoriesBrandsPage onNavigate={navigate} />;
    if (activeItem === "inventory") return <InventoryPage onNavigate={navigate} />;
    if (activeItem === "suppliers") return <SuppliersPage onNavigate={navigate} />;
    if (activeItem === "purchases") return <PurchasesPage onNavigate={navigate} />;
    if (activeItem === "supplier-payables") return <SupplierPayablesPage onNavigate={navigate} />;
    if (activeItem === "customers") return <CustomersPage onNavigate={navigate} />;
    if (activeItem === "customer-dues") return <CustomerDuesPage onNavigate={navigate} />;
    if (activeItem === "orders") return <OnlineOrdersPage onNavigate={navigate} />;
    if (activeItem === "delivery") return <DeliveryPage onNavigate={navigate} />;
    if (activeItem === "expenses") return <ExpensesPage onNavigate={navigate} />;
    if (activeItem === "finance") return <FinancePage onNavigate={navigate} />;
    if (activeItem === "reports") return <ReportsPage onNavigate={navigate} />;
    if (activeItem === "branches") return <BranchesPage onNavigate={navigate} />;
    if (activeItem === "transfers") return <TransfersPage />;
    if (activeItem === "registers") return <RegistersPage />;
    if (activeItem === "subscription") return <SubscriptionPage onStartTrial={() => window.open(`${BASE_PATH}/signup?plan=growth`, "_self")} />;
    if (activeItem === "employees") return <EmployeesPage onNavigate={navigate} />;
    if (activeItem === "notifications") return <NotificationsPage onNavigate={navigate} />;
    if (activeItem === "settings") return <SettingsPage onNavigate={navigate} guestApp={guestApp} onGuestAppChange={onGuestAppChange} />;
    return <ModulePlaceholder id={activeItem} onNavigate={navigate} />;
  };

  return (
    <div className="flex h-[100dvh] bg-[var(--background)]" style={{ fontFamily: "var(--font-inter)" }}>
      <Sidebar collapsed={collapsed} activeItem={activeItem} onNavigate={navigate} onToggle={() => setCollapsed(!collapsed)} businessName={businessName} restrictedIds={restrictedIds} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {impersonating && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 px-5 py-2 text-[12px] text-white">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-white" />
              Super Admin View · Inspecting <strong>{businessName}</strong> POS ({tenantRecord?.plan} plan)
            </span>
            {onExitImpersonation && (
              <button onClick={onExitImpersonation} className="rounded-lg bg-white px-3 py-1 text-[11px] font-bold text-slate-950 hover:bg-slate-100">
                ← Return to Super Admin
              </button>
            )}
          </div>
        )}
        <Header activeItem={activeItem} onSignOut={onSignOut} onNavigate={navigate} businessName={businessName} />
        {(tenantRecord?.maintenance || platformContent?.maintenanceBannerEnabled) && (
          <div className="mx-6 mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-[12px] text-slate-950 shadow-2xs">
            <span>
              <strong>Platform Notice:</strong>{" "}
              {tenantRecord?.maintenance
                ? `${businessName} is in read-only maintenance mode set by Super Admin.`
                : platformContent?.maintenanceBannerText}
            </span>
          </div>
        )}
        {registrationPending && <div className="mx-6 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900"><div><span className="font-bold">Workspace verification pending.</span> Your organisation is in restricted onboarding until DevEngine POS Super Admin completes its review.</div><button onClick={() => navigate("settings")} className="font-bold underline">Review business settings</button></div>}
        {renderPage()}
      </div>
    </div>
  );
}

function PlatformAccess({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = () => {
    if (!email || !password) { setError("Enter your platform administrator email and password."); return; }
    onSuccess();
  };
  return <main className="min-h-[100dvh] bg-slate-950 p-5 text-white sm:p-10"><div className="mx-auto grid min-h-[88dvh] max-w-[1120px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"><section><button onClick={onBack} className="text-[13px] font-semibold text-slate-300 hover:text-white">← Back to DevEngine POS</button><div className="mt-10"><DevEngineLogo tone="light" className="w-[220px]" /></div><div className="mt-12 text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">Platform administrator access</div><h1 className="mt-4 max-w-lg text-[clamp(3rem,5vw,5.2rem)] font-black leading-[0.9] tracking-[-0.065em]">Operate the platform with confidence.</h1><p className="mt-6 max-w-md text-[16px] leading-relaxed text-slate-300">This protected area is for DevEngine platform administrators only. Tenant owners use their own business administration URL.</p><div className="mt-8 space-y-3 text-[13px] text-slate-300"><div className="flex gap-3"><span>✓</span>Dedicated platform roles and audit history</div><div className="flex gap-3"><span>✓</span>MFA, session and access controls in production</div><div className="flex gap-3"><span>✓</span>Tenant data is never visible by default</div></div></section><section className="rounded-[28px] bg-white p-7 text-slate-950 shadow-2xl sm:p-10"><div className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">DevEngine POS</div><h2 className="mt-2 text-[28px] font-black tracking-tight">Platform sign in</h2><p className="mt-2 text-[13px] text-slate-500">Demo UI only. Production access requires server-provisioned platform roles and MFA.</p><div className="mt-7 space-y-4"><Input label="Platform email" value={email} onChange={event => { setEmail(event.target.value); setError(""); }} type="email" placeholder="admin@devengine.com" /><Input label="Password" value={password} onChange={event => { setPassword(event.target.value); setError(""); }} type="password" placeholder="••••••••" />{error && <p className="text-[12px] font-medium text-red-600">{error}</p>}<button onClick={signIn} className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-[14px] font-bold text-white transition hover:bg-slate-800">Continue to control center →</button></div><div className="mt-6 flex justify-between border-t border-slate-200 pt-5 text-[12px] font-semibold text-slate-600"><button>Forgot password?</button><button>Use recovery code</button></div></section></div></main>;
}

function TenantStorefront({
  tenant,
  page,
  onNavigate,
  tenantRecord,
  sslEnvironment = "Sandbox",
}: {
  tenant: string;
  page: string;
  onNavigate: (path: string) => void;
  tenantRecord?: PlatformTenant;
  sslEnvironment?: "Sandbox" | "Live";
}) {
  const [cart, setCart] = useState(0);
  const store = tenantRecord?.name || tenant.replace(/-/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
  const products = [{ name: "Smart LED Television", price: "৳ 48,500", category: "Electronics" }, { name: "Ceiling Fan", price: "৳ 7,100", category: "Home appliances" }, { name: "LED Bulb 12W", price: "৳ 680", category: "Lighting" }];
  const title = page === "products" ? "Browse products" : page === "cart" ? "Your shopping cart" : page === "checkout" ? "Checkout" : page === "orders" ? "Your orders" : page === "wishlist" ? "Saved items" : page === "contact" ? "Contact our store" : page === "policies" ? "Store policies" : "Everything your home needs, from one trusted store.";

  if (tenantRecord && !tenantRecord.modules.storefront) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center text-slate-950 shadow-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Powered by DevEngine POS</p>
          <h1 className="mt-3 text-[24px] font-black tracking-tight">{store} storefront is paused</h1>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600">Online storefront ordering for this business is currently turned off by DevEngine POS Super Admin.</p>
          <button onClick={() => onNavigate("/")} className="mt-6 rounded-xl bg-slate-950 px-5 py-2.5 text-[13px] font-bold text-white">Back to DevEngine POS</button>
        </div>
      </main>
    );
  }

  return <main className="min-h-[100dvh] bg-slate-50 text-slate-950"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between gap-5 px-5"><button onClick={() => onNavigate(`/${tenant}`)} className="text-left"><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Powered by DevEngine POS</div><div className="mt-1 text-[20px] font-black tracking-tight">{store}</div></button><nav className="hidden gap-5 text-[13px] font-semibold text-slate-600 md:flex"><button onClick={() => onNavigate(`/${tenant}/products`)}>Products</button><button onClick={() => onNavigate(`/${tenant}/contact`)}>Contact</button><button onClick={() => onNavigate(`/${tenant}/policies`)}>Policies</button></nav><div className="flex items-center gap-2"><button onClick={() => onNavigate(`/${tenant}/wishlist`)} className="rounded-lg px-3 py-2 text-[13px] font-semibold hover:bg-slate-100">Wishlist</button><button onClick={() => onNavigate(`/${tenant}/cart`)} className="rounded-lg bg-slate-950 px-3 py-2 text-[13px] font-semibold text-white">Cart {cart ? `(${cart})` : ""}</button></div></div></header><div className="mx-auto max-w-[1240px] px-5 py-10"><section className="rounded-[30px] bg-slate-950 p-8 text-white sm:p-12"><div className="max-w-2xl"><div className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate-400">{page === "home" ? "Official customer store" : "Customer experience"}</div><h1 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.065em]">{title}</h1><p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate-300">This storefront UI belongs to {store}. Catalog, stock, customer access, cart, checkout, and orders are controlled under tenant isolation.</p>{page === "home" && <button onClick={() => onNavigate(`/${tenant}/products`)} className="mt-8 rounded-xl bg-white px-5 py-3 text-[14px] font-bold text-slate-950">Shop products →</button>}</div></section>{["home", "products"].includes(page) && <section className="mt-10"><div className="mb-5 flex items-center justify-between"><h2 className="text-[24px] font-bold">Featured products</h2><button onClick={() => onNavigate(`/${tenant}/products`)} className="text-[13px] font-bold text-slate-600">View all →</button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map(product => <article key={product.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex h-36 items-center justify-center rounded-xl bg-slate-100 text-[30px] font-black text-slate-300">{product.name.slice(0, 2).toUpperCase()}</div><div className="mt-5 text-[12px] font-semibold text-slate-500">{product.category}</div><h3 className="mt-1 text-[17px] font-bold">{product.name}</h3><div className="mt-3 flex items-center justify-between"><span className="text-[17px] font-black">{product.price}</span><button onClick={() => setCart(count => count + 1)} className="rounded-lg bg-slate-950 px-3 py-2 text-[12px] font-bold text-white">Add to cart</button></div></article>)}</div></section>}{page === "cart" && <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7"><h2 className="text-[22px] font-bold">Cart summary</h2><p className="mt-2 text-[14px] text-slate-500">{cart ? `${cart} item(s) ready for checkout.` : "Your cart is empty. Add a product to continue."}</p>{tenantRecord?.modules.sslcommerzOnline && <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">Verified by SSLCommerz · {sslEnvironment}</div>}<div className="mt-6"><button onClick={() => onNavigate(`/${tenant}/checkout`)} disabled={!cart} className="rounded-xl bg-slate-950 px-5 py-3 text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continue to checkout →</button></div></section>}{["checkout", "orders", "wishlist", "contact", "policies"].includes(page) && <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-7"><h2 className="text-[22px] font-bold">{title}</h2><p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600">This is the routed storefront UI surface for {store}.{tenantRecord?.modules.sslcommerzOnline ? ` SSLCommerz online checkout is enabled in ${sslEnvironment} mode.` : " Online gateway checkout is currently disabled for this merchant."}</p></section>}</div></main>;
}

// ══════════════════════════════════════════════════════════════════════════════
// AUTH FLOW
// ══════════════════════════════════════════════════════════════════════════════
type AppState = "landing" | "public" | "auth" | "signup" | "app" | "platform" | "platformAuth" | "storefront";

type RouteState = { view: AppState; publicPage: PublicPage; workspacePage: string; tenant: string };
const publicPaths: Record<string, PublicPage> = { product: "about", about: "about", blog: "blog", contact: "contact", support: "support", pricing: "pricing", privacy: "privacy", terms: "terms", cookies: "cookies", accessibility: "accessibility" };
const DEFAULT_TENANT = "selim-electronics";

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/+$/, "");

function getAppPath() {
  const rawPath = window.location.pathname;
  const stripped = BASE_PATH && rawPath.startsWith(BASE_PATH) ? rawPath.slice(BASE_PATH.length) : rawPath;
  return stripped.replace(/\/+$/, "") || "/";
}

function readRoute(): RouteState {
  const appPath = getAppPath();
  const path = appPath;
  const segments = path.split("/").filter(Boolean);
  if (path === "/") return { view: "landing", publicPage: "about", workspacePage: "dashboard", tenant: DEFAULT_TENANT };
  // Legacy public entry retained for existing shared links. The canonical marketing URL is `/`.
  if (path === "/branding") return { view: "landing", publicPage: "about", workspacePage: "dashboard", tenant: DEFAULT_TENANT };
  if (path === "/workspace") return { view: "platformAuth", publicPage: "about", workspacePage: "dashboard", tenant: "devengine" };
  if (segments[0] === "workspace") return { view: "platform", publicPage: "about", workspacePage: segments[1] === "dashboard" || !segments[1] ? "overview" : segments[1], tenant: "devengine" };
  if (path === "/signin") return { view: "auth", publicPage: "about", workspacePage: "dashboard", tenant: "your-business" };
  if (path === "/platform" || path.startsWith("/platform/")) return { view: "platform", publicPage: "about", workspacePage: "overview", tenant: "devengine" };
  if (segments.length >= 2 && segments[1] === "admin") return { view: "app", publicPage: "about", workspacePage: segments[2] || "dashboard", tenant: segments[0] };
  if (segments.length >= 2 && segments[1] === "login") return { view: "auth", publicPage: "about", workspacePage: "dashboard", tenant: segments[0] };
  if (segments.length >= 3 && segments[1] === "workspace") return { view: "app", publicPage: "about", workspacePage: segments[2] || "dashboard", tenant: segments[0] };
  if (path === "/login") return { view: "auth", publicPage: "about", workspacePage: "dashboard", tenant: DEFAULT_TENANT };
  if (path === "/signup") return { view: "signup", publicPage: "about", workspacePage: "dashboard", tenant: DEFAULT_TENANT };
  const publicPage = publicPaths[path.slice(1)];
  if (publicPage) return { view: "public", publicPage, workspacePage: "dashboard", tenant: DEFAULT_TENANT };
  if (segments.length >= 1) return { view: "storefront", publicPage: "about", workspacePage: segments[1] || "home", tenant: segments[0] };
  return { view: "landing", publicPage: "about", workspacePage: "dashboard", tenant: DEFAULT_TENANT };
}

function setPageMetadata(route: RouteState) {
  const workspaceTitle = route.workspacePage === "dashboard" ? "Workspace" : route.workspacePage.replace(/-/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
  const publicTitle = route.view === "public" ? publicPageContent[route.publicPage].eyebrow : "";
  const title = route.view === "auth" ? "Workspace Sign In" : route.view === "signup" ? "Business Registration" : route.view === "platform" || route.view === "platformAuth" ? "Super Admin" : route.view === "app" ? workspaceTitle : route.view === "storefront" ? "Storefront" : publicTitle || "Retail Command Center";
  document.title = `${route.view === "landing" || route.view === "public" || route.view === "signup" || route.view === "platform" || route.view === "platformAuth" ? "DevEngine POS" : route.tenant.replace(/-/g, " ")} | ${title}`;
  const description = route.view === "public" ? publicPageContent[route.publicPage].lead : "DevEngine: a professional retail command center for sales, inventory, finance and growth.";
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

function PasswordRecoveryFlow({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sendReset = () => {
    if (email.trim()) setSubmitted(true);
  };
  const close = () => {
    setEmail("");
    setSubmitted(false);
    onClose();
  };
  return <Modal open={open} onClose={close} title="Reset your workspace password" size="sm">
    {!submitted ? <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-[16px] font-black text-white">↗</div>
      <h3 className="mt-4 text-[20px] font-bold tracking-tight text-slate-950">Get back into your workspace.</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">Enter the work email linked to your DevEngine POS workspace. We will send a password-reset link in the live backend.</p>
      <label className="mt-6 block text-[12px] font-semibold text-slate-700">Work email<input autoFocus value={email} onChange={event => setEmail(event.target.value)} onKeyDown={event => event.key === "Enter" && sendReset()} type="email" placeholder="you@business.com" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-[14px] outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5" /></label>
      <button onClick={sendReset} disabled={!email.trim()} className="mt-5 h-11 w-full rounded-xl bg-slate-950 text-[13px] font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">Send reset link →</button>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">For security, this UI never confirms whether an email belongs to a workspace.</p>
    </div> : <div className="py-2 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-[19px] font-bold text-white">✓</div>
      <h3 className="mt-4 text-[20px] font-bold tracking-tight text-slate-950">Check your inbox.</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-600">If <strong>{email}</strong> is registered, a secure password-reset link will arrive shortly.</p>
      <button onClick={() => setSubmitted(false)} className="mt-5 text-[13px] font-semibold text-slate-950 underline underline-offset-4">Use a different email</button>
      <button onClick={close} className="mt-4 h-11 w-full rounded-xl bg-slate-950 text-[13px] font-bold text-white transition hover:bg-slate-800">Return to sign in</button>
    </div>}
  </Modal>;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => readRoute());
  const [platformState, setPlatformState] = useState<PlatformState>(() => loadPlatformState());
  const [impersonatingTenant, setImpersonatingTenant] = useState<string | null>(null);
  const [passwordRecoveryOpen, setPasswordRecoveryOpen] = useState(false);

  useEffect(() => {
    savePlatformState(platformState);
  }, [platformState]);

  const updatePlatformState = (
    updater: (prev: PlatformState) => PlatformState,
    noticeText: string,
    category: AuditCategory = "Security",
    target = "Platform"
  ) => {
    setPlatformState(prev => {
      const next = updater(prev);
      const entry: AuditEntry = {
        id: `AUD-${Date.now().toString().slice(-5)}`,
        actor: next.profile.name,
        category,
        action: noticeText,
        target,
        time: "Just now",
      };
      return {
        ...next,
        audit: [entry, ...next.audit].slice(0, 80),
      };
    });
  };

  const resetPlatformState = () => {
    clearPlatformState();
    setPlatformState(loadPlatformState());
  };

  const syncRoute = () => {
    const next = readRoute();
    setRoute(next);
    setPageMetadata(next);
  };
  const navigateTo = (path: string) => {
    const normalizedPath = path;
    const targetPath = `${BASE_PATH}${normalizedPath}`;
    if (window.location.pathname !== targetPath) window.history.pushState({}, "", targetPath);
    syncRoute();
  };

  useEffect(() => {
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    const openRecovery = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (button?.textContent?.trim() === "Forgot password?") {
        event.preventDefault();
        setPasswordRecoveryOpen(true);
      }
    };
    document.addEventListener("click", openRecovery);
    return () => document.removeEventListener("click", openRecovery);
  }, []);

  const guestApp = platformState.content.guestApp;
  const setGuestApp = (next: GuestAppConfig) => {
    updatePlatformState(
      prev => ({
        ...prev,
        content: { ...prev.content, guestApp: next },
      }),
      "Updated branded guest app configuration",
      "Content",
      "Guest App"
    );
  };
  const matchedTenant =
    platformState.tenants.find(t => t.slug === route.tenant) ||
    (route.tenant === DEFAULT_TENANT ? platformState.tenants.find(t => t.id === "selim") : undefined);
  const disabledPaymentChannels = platformState.gateway.channels.filter(c => !c.enabled).map(c => c.id);

  return (
    <div className={route.view === "landing" || route.view === "public" ? "landing-canvas" : "min-h-[100dvh]"} style={{ fontFamily: "var(--font-inter)" }}>
      {route.view === "landing" && (
        <LandingPage
          onContinue={() => navigateTo("/signin")}
          onOpenPage={(page) => navigateTo(`/${page}`)}
          onStartTrial={(plan) => navigateTo(`/signup${plan ? `?plan=${plan}` : ""}`)}
          guestApp={guestApp}
          platformContent={platformState.content}
          platformPlans={platformState.plans}
          disabledPaymentChannels={disabledPaymentChannels}
          paymentEnvironment={platformState.gateway.environment}
        />
      )}
      {route.view === "public" && <PublicInfoPage page={route.publicPage} onBack={() => navigateTo("/")} onContinue={() => navigateTo("/signin")} />}
      {route.view === "auth" && <TenantWorkspaceSignInV2 tenant={route.tenant} onSuccess={() => navigateTo(`/${route.tenant}/admin/dashboard`)} onBack={() => navigateTo("/")} onRegister={() => navigateTo("/signup")} />}
      {route.view === "signup" && (
        <StartTrialPage
          onBack={() => navigateTo("/")}
          onContinue={(slug) => navigateTo(`/${slug}/login?pending=true`)}
          livePlans={platformState.plans}
          onRegisterTenant={(createdTenant) => {
            updatePlatformState(
              prev => ({
                ...prev,
                tenants: [createdTenant, ...prev.tenants],
              }),
              `Submitted registration for ${createdTenant.name} (/${createdTenant.slug})`,
              "KYC",
              createdTenant.name
            );
          }}
        />
      )}
      {route.view === "app" && (
        <AppShell
          onSignOut={() => { setImpersonatingTenant(null); navigateTo("/"); }}
          guestApp={guestApp}
          onGuestAppChange={setGuestApp}
          activeRoute={route.workspacePage}
          onNavigate={(id) => navigateTo(`/${route.tenant}/admin/${id}`)}
          tenant={route.tenant}
          tenantRecord={matchedTenant}
          platformContent={platformState.content}
          impersonating={impersonatingTenant === route.tenant}
          onExitImpersonation={() => {
            setImpersonatingTenant(null);
            navigateTo("/workspace/organisations");
          }}
        />
      )}
      {route.view === "storefront" && (
        <TenantStorefront
          tenant={route.tenant}
          page={route.workspacePage}
          onNavigate={navigateTo}
          tenantRecord={matchedTenant}
          sslEnvironment={platformState.gateway.environment}
        />
      )}
      {route.view === "platformAuth" && <PlatformAccess onSuccess={() => navigateTo("/workspace/dashboard")} onBack={() => navigateTo("/")} />}
      {route.view === "platform" && (
        <SuperAdminControlCenter
          state={platformState}
          onUpdateState={updatePlatformState}
          onResetState={resetPlatformState}
          onImpersonateTenant={(slug, targetRoute) => {
            setImpersonatingTenant(slug);
            navigateTo(`/${slug}/admin/${targetRoute || "dashboard"}`);
          }}
          onOpenStorefront={(slug) => navigateTo(`/${slug}`)}
          onExit={() => navigateTo("/")}
          onNavigate={(tab) => navigateTo(`/workspace/${tab}`)}
          initialActive={({ dashboard: "overview", organizations: "organisations", subscriptions: "subscriptions", revenue: "subscriptions", users: "organisations", settings: "settings", website: "content", flags: "features" } as Record<string, string>)[route.workspacePage] || route.workspacePage}
        />
      )}
      <PasswordRecoveryFlow open={passwordRecoveryOpen} onClose={() => setPasswordRecoveryOpen(false)} />
    </div>
  );
}
