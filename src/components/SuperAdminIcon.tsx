export type SuperAdminIconName =
  | "overview"
  | "organisations"
  | "verification"
  | "subscriptions"
  | "plans"
  | "features"
  | "content"
  | "support"
  | "audit"
  | "profile"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "chevronDown"
  | "chevronRight"
  | "chevronLeft"
  | "sidebarToggle"
  | "menu"
  | "logout"
  | "sparkles"
  | "x";

interface SuperAdminIconProps {
  name: SuperAdminIconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function SuperAdminIcon({
  name,
  size = 17,
  className = "",
  strokeWidth = 1.8,
}: SuperAdminIconProps) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...shared}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      );
    case "organisations":
      return (
        <svg {...shared}>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
          <path d="M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
        </svg>
      );
    case "verification":
      return (
        <svg {...shared}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "subscriptions":
      return (
        <svg {...shared}>
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
          <path d="M14 15h4" />
        </svg>
      );
    case "plans":
      return (
        <svg {...shared}>
          <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
          <path d="m3 12 9 4.5 9-4.5" />
          <path d="m3 16.5 9 4.5 9-4.5" />
        </svg>
      );
    case "features":
      return (
        <svg {...shared}>
          <rect x="2" y="6" width="20" height="12" rx="6" />
          <circle cx="16" cy="12" r="3" />
          <path d="M7 12h2" />
        </svg>
      );
    case "content":
      return (
        <svg {...shared}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18" />
          <path d="M9 9v11" />
          <path d="M13 13h4M13 16h3" />
        </svg>
      );
    case "support":
      return (
        <svg {...shared}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" />
        </svg>
      );
    case "audit":
      return (
        <svg {...shared}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h2l1.5-2.5L13 15l1.5-2H16" />
        </svg>
      );
    case "profile":
      return (
        <svg {...shared}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...shared}>
          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
          <path d="M2 14h4M10 8h4M18 16h4" />
        </svg>
      );
    case "search":
      return (
        <svg {...shared}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...shared}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      );
    case "plus":
      return (
        <svg {...shared}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...shared}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...shared}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case "chevronLeft":
      return (
        <svg {...shared}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case "sidebarToggle":
      return (
        <svg {...shared}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M9 4v16" />
        </svg>
      );
    case "menu":
      return (
        <svg {...shared}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "logout":
      return (
        <svg {...shared}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...shared}>
          <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...shared}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    default:
      return null;
  }
}
