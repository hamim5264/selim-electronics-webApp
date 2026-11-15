import { useEffect, useRef, useState } from "react";
import devEngineFaviconImg from "../../asstes/images/devengine_favicons.png";

export type LogoStoryPointId = "A" | "B" | "C" | "D";

interface LogoStoryItem {
  id: LogoStoryPointId;
  code: string;
  title: string;
  text: string;
  detail: string;
  dot: { x: number; y: number };
  path: string;
  pathLength: number;
  endDot: { x: number; y: number };
  cardPositionClass: string;
}

const LOGO_STORY_ITEMS: LogoStoryItem[] = [
  {
    id: "A",
    code: "01",
    title: "Connected geometry",
    text: "Two modular blocks interlock cleanly into one balanced silhouette.",
    detail: "Modular hardware and cloud retail layers unified without seams.",
    dot: { x: 595, y: 238 },
    path: "M 595 238 L 527 170 L 328 170",
    pathLength: 296,
    endDot: { x: 328, y: 170 },
    cardPositionClass: "left-[2%] top-[25%] -translate-y-1/2 w-[25.5%]",
  },
  {
    id: "B",
    code: "02",
    title: "Continuous flow",
    text: "The central channel represents uninterrupted data flow across billing, stock, and reporting.",
    detail: "Real-time sync from checkout counter to back-office ledger.",
    dot: { x: 647, y: 330 },
    path: "M 647 330 L 807 170 L 872 170",
    pathLength: 292,
    endDot: { x: 872, y: 170 },
    cardPositionClass: "right-[2%] top-[25%] -translate-y-1/2 w-[25.5%]",
  },
  {
    id: "C",
    code: "03",
    title: "Precision & structure",
    text: "Sharp 90-degree edges express control, reliability, and engineering discipline.",
    detail: "Deterministic tax rules, role permissions, and audit-ready invoices.",
    dot: { x: 553, y: 349 },
    path: "M 553 349 L 407 495 L 328 495",
    pathLength: 286,
    endDot: { x: 328, y: 495 },
    cardPositionClass: "left-[2%] top-[72.8%] -translate-y-1/2 w-[25.5%]",
  },
  {
    id: "D",
    code: "04",
    title: "One connected ecosystem",
    text: "Sales, inventory, customers, and analytics operate as a single system.",
    detail: "Every branch and storefront working from one source of truth.",
    dot: { x: 647, y: 441 },
    path: "M 647 441 L 701 495 L 872 495",
    pathLength: 248,
    endDot: { x: 872, y: 495 },
    cardPositionClass: "right-[2%] top-[72.8%] -translate-y-1/2 w-[25.5%]",
  },
];

// Loop phases: -1 = reset sweep (420ms), 0..3 = sequential point reveal (1650ms each), 4 = unified system hold (2400ms)
const PHASE_DURATIONS_MS: Record<number, number> = {
  [-1]: 420,
  0: 1650,
  1: 1650,
  2: 1650,
  3: 1650,
  4: 2400,
};

export default function LogoStorytellingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [loopPhase, setLoopPhase] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<LogoStoryPointId | null>(null);
  const [pinnedId, setPinnedId] = useState<LogoStoryPointId | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const manualId = hoveredId ?? pinnedId;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      const prefersReduced = mediaQuery.matches;
      setReducedMotion(prefersReduced);
      if (prefersReduced) {
        setHasEntered(true);
        setLoopPhase(4);
      }
    };
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasEntered) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasEntered]);

  // Continuous loop timer — pauses when user inspects a point or prefers reduced motion
  useEffect(() => {
    if (!hasEntered || reducedMotion || manualId !== null) return;

    const delay = PHASE_DURATIONS_MS[loopPhase] ?? 1650;
    const timer = window.setTimeout(() => {
      setLoopPhase((prev) => {
        if (prev === -1) return 0;
        if (prev >= 4) return -1;
        return prev + 1;
      });
    }, delay);

    return () => window.clearTimeout(timer);
  }, [hasEntered, reducedMotion, manualId, loopPhase]);

  const currentFocusIndex =
    manualId !== null
      ? LOGO_STORY_ITEMS.findIndex((item) => item.id === manualId)
      : loopPhase >= 0 && loopPhase <= 3
        ? loopPhase
        : -1;

  const activeItemLabel =
    manualId !== null
      ? LOGO_STORY_ITEMS.find((item) => item.id === manualId)?.title ?? ""
      : loopPhase === 4
        ? "All connected systems aligned"
        : loopPhase >= 0
          ? LOGO_STORY_ITEMS[loopPhase]?.title ?? ""
          : "Initializing sequence";

  return (
    <section
      id="brand-architecture"
      ref={sectionRef}
      aria-labelledby="logo-story-heading"
      className="logo-story-section relative my-12 overflow-hidden rounded-[36px] bg-[#050B1C] py-20 text-white shadow-2xl shadow-slate-950/20 sm:my-16 lg:my-20 lg:py-24"
    >
      <div className="logo-story-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00D4F0] animate-pulse" aria-hidden="true" />
            Identity Architecture
          </p>
          <h2
            id="logo-story-heading"
            className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            More than a symbol. A connected system.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            Every element of the DevEngine identity represents a connected, intelligent retail ecosystem —
            designed to bring businesses, operations, and commerce together.
          </p>
        </div>

        <div className={`logo-story-stage relative mx-auto mt-12 w-full max-w-[1200px] ${hasEntered ? "is-revealed" : ""}`}>
          {/* Desktop Auto-Playing Interactive Blueprint Diagram */}
          <div className="relative hidden aspect-[1200/680] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#060D21]/90 shadow-[0_32px_90px_-30px_rgba(0,0,0,0.9)] lg:block">
            <div className="logo-story-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="logo-story-ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />

            {/* Subtle calibration ring */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-cyan-300/12" aria-hidden="true">
              <span className="absolute -left-px -top-px h-4 w-4 rounded-tl-[12px] border-l-2 border-t-2 border-cyan-400/45" />
              <span className="absolute -right-px -top-px h-4 w-4 rounded-tr-[12px] border-r-2 border-t-2 border-cyan-400/45" />
              <span className="absolute -bottom-px -left-px h-4 w-4 rounded-bl-[12px] border-b-2 border-l-2 border-cyan-400/45" />
              <span className="absolute -bottom-px -right-px h-4 w-4 rounded-br-[12px] border-b-2 border-r-2 border-cyan-400/45" />
            </div>

            {/* Original DevEngine favicon artwork — stationary, unrotated, unmodified */}
            <div className="logo-story-mark pointer-events-none absolute left-1/2 top-1/2 z-10 h-[38.235%] w-[21.667%] -translate-x-1/2 -translate-y-1/2">
              <img
                src={devEngineFaviconImg}
                alt="DevEngine POS official symbol"
                className="h-full w-full select-none object-contain drop-shadow-[0_18px_36px_rgba(0,169,204,0.22)]"
                draggable={false}
              />
            </div>

            {/* Responsive Technical Connection SVG */}
            <svg
              viewBox="0 0 1200 680"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="logoStoryCyanGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <line x1="600" y1="72" x2="600" y2="190" stroke="#00D4F0" strokeOpacity="0.12" strokeDasharray="3 5" />
              <line x1="600" y1="490" x2="600" y2="608" stroke="#00D4F0" strokeOpacity="0.12" strokeDasharray="3 5" />

              {LOGO_STORY_ITEMS.map((item, idx) => {
                const isDrawn = manualId !== null || (hasEntered && loopPhase >= idx);
                const isHighlighted =
                  manualId !== null
                    ? manualId === item.id
                    : loopPhase === idx || loopPhase === 4;
                const isDimmed =
                  manualId !== null
                    ? manualId !== item.id
                    : loopPhase >= 0 && loopPhase <= 3 && loopPhase !== idx && idx < loopPhase;

                return (
                  <g
                    key={item.id}
                    className={`logo-story-svg-group ${isDrawn ? "is-drawn" : ""} ${isHighlighted ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""}`}
                  >
                    <path
                      d={item.path}
                      stroke="#00D4F0"
                      strokeWidth={isHighlighted ? 4.4 : 2.2}
                      strokeOpacity={isHighlighted ? 0.34 : 0.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="logo-story-line"
                      style={{
                        strokeDasharray: item.pathLength,
                        "--line-length": `${item.pathLength}`,
                      } as React.CSSProperties}
                    />

                    <path
                      d={item.path}
                      stroke={isHighlighted ? "#7AF5FF" : "#00D4F0"}
                      strokeWidth={isHighlighted ? 2 : 1.25}
                      strokeOpacity={isDimmed ? 0.36 : isHighlighted ? 1 : 0.78}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="logo-story-line"
                      style={{
                        strokeDasharray: item.pathLength,
                        "--line-length": `${item.pathLength}`,
                      } as React.CSSProperties}
                    />

                    {/* Neon cyan node anchored directly on logo geometry */}
                    <g className="logo-story-origin-node">
                      <circle
                        cx={item.dot.x}
                        cy={item.dot.y}
                        r={isHighlighted ? 14 : 9}
                        fill="#00D4F0"
                        fillOpacity={isHighlighted ? 0.3 : 0.14}
                        className="logo-story-pulse-ring"
                      />
                      <circle
                        cx={item.dot.x}
                        cy={item.dot.y}
                        r={5.5}
                        fill="#050B1C"
                        stroke={isHighlighted ? "#7AF5FF" : "#00D4F0"}
                        strokeWidth={isHighlighted ? 2.2 : 1.5}
                        filter="url(#logoStoryCyanGlow)"
                      />
                      <circle
                        cx={item.dot.x}
                        cy={item.dot.y}
                        r={isHighlighted ? 3.2 : 2.2}
                        fill="#E6FCFF"
                      />
                    </g>

                    <circle
                      cx={item.endDot.x}
                      cy={item.endDot.y}
                      r={isHighlighted ? 3.8 : 2.5}
                      fill={isHighlighted ? "#7AF5FF" : "#00D4F0"}
                      className="logo-story-end-node"
                    />
                  </g>
                );
              })}
            </svg>

            {/* 4 Surrounding Explanatory Cards */}
            {LOGO_STORY_ITEMS.map((item, idx) => {
              const isHighlighted =
                manualId !== null
                  ? manualId === item.id
                  : loopPhase === idx || loopPhase === 4;
              const isVisibleInSequence = manualId !== null || (hasEntered && loopPhase >= idx);

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => setPinnedId((prev) => (prev === item.id ? null : item.id))}
                  aria-pressed={pinnedId === item.id}
                  className={[
                    "logo-story-card absolute z-30 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                    item.cardPositionClass,
                    isHighlighted
                      ? "border-cyan-300/80 bg-[#0A1838]/95 opacity-100 shadow-[0_0_30px_-6px_rgba(0,212,240,0.48)]"
                      : isVisibleInSequence
                        ? "border-white/15 bg-[#081228]/88 opacity-75 hover:border-cyan-400/50 hover:opacity-100"
                        : "border-white/10 bg-[#081228]/70 opacity-45 hover:border-cyan-400/45 hover:opacity-95",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      <span
                        className={[
                          "h-2 w-2 rounded-full transition-all",
                          isHighlighted ? "bg-cyan-200 shadow-[0_0_10px_#00D4F0]" : "bg-[#00A9CC]",
                        ].join(" ")}
                      />
                      {item.id} · Point {item.code}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                      {pinnedId === item.id ? "Pinned" : isHighlighted ? "Active" : "Inspect"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300">{item.text}</p>
                </button>
              );
            })}

            {/* Subtle Autoplay Sequence Bar */}
            <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#050B1C]/85 px-4 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                {LOGO_STORY_ITEMS.map((item, idx) => {
                  const isCurrent =
                    manualId !== null ? currentFocusIndex === idx : loopPhase === idx || loopPhase === 4;
                  return (
                    <span
                      key={item.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${isCurrent ? "w-5 bg-cyan-300 shadow-[0_0_8px_#00D4F0]" : "w-1.5 bg-white/25"}`}
                    />
                  );
                })}
              </div>
              <span className="text-[11px] font-medium text-slate-300">
                {manualId !== null ? `Paused · ${activeItemLabel}` : activeItemLabel}
              </span>
            </div>
          </div>

          {/* Mobile & Tablet Auto-Playing Blueprint Sequence */}
          <div className="rounded-[28px] border border-white/10 bg-[#060D21]/95 p-5 sm:p-7 lg:hidden">
            <div className="logo-story-mobile-stage relative mx-auto flex aspect-square max-w-[260px] items-center justify-center rounded-3xl border border-cyan-400/15 bg-[#050B1C] p-6">
              <div className="logo-story-ambient-glow pointer-events-none absolute inset-3 rounded-full" aria-hidden="true" />
              <img
                src={devEngineFaviconImg}
                alt="DevEngine POS official symbol"
                className="relative z-10 h-40 w-40 object-contain drop-shadow-[0_14px_30px_rgba(0,169,204,0.22)] sm:h-44 sm:w-44"
                draggable={false}
              />

              <svg viewBox="455 195 290 290" className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden="true">
                {LOGO_STORY_ITEMS.map((item, idx) => {
                  const isHighlighted =
                    manualId !== null
                      ? manualId === item.id
                      : loopPhase === idx || loopPhase === 4;
                  const isDrawn = manualId !== null || (hasEntered && loopPhase >= idx);
                  return (
                    <g key={item.id} opacity={isDrawn ? (isHighlighted ? 1 : 0.45) : 0.2}>
                      {isHighlighted && (
                        <circle cx={item.dot.x} cy={item.dot.y} r={14} fill="#00D4F0" fillOpacity={0.3} />
                      )}
                      <circle
                        cx={item.dot.x}
                        cy={item.dot.y}
                        r={isHighlighted ? 7.5 : 5}
                        fill="#050B1C"
                        stroke="#00D4F0"
                        strokeWidth={isHighlighted ? 2.4 : 1.5}
                      />
                      <circle
                        cx={item.dot.x}
                        cy={item.dot.y}
                        r={isHighlighted ? 3.5 : 2.1}
                        fill="#E6FCFF"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-6 space-y-3">
              {LOGO_STORY_ITEMS.map((item, index) => {
                const isSelected =
                  manualId !== null
                    ? manualId === item.id
                    : loopPhase === index || loopPhase === 4;
                const isExpanded = pinnedId === item.id || (manualId === null && loopPhase === index);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPinnedId((prev) => (prev === item.id ? null : item.id))}
                    aria-expanded={isExpanded}
                    className={[
                      "flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300",
                      isSelected
                        ? "border-cyan-400/75 bg-[#0B1938] shadow-[0_0_24px_-8px_rgba(0,212,240,0.45)]"
                        : "border-white/10 bg-white/[0.03] opacity-75 hover:border-white/25 hover:opacity-100",
                    ].join(" ")}
                  >
                    <div className="flex flex-col items-center pt-1" aria-hidden="true">
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full border border-cyan-300 transition-all",
                          isSelected ? "bg-cyan-300 shadow-[0_0_10px_#00D4F0]" : "bg-[#00A9CC]",
                        ].join(" ")}
                      />
                      {index < LOGO_STORY_ITEMS.length - 1 && (
                        <span className="mt-1.5 h-6 w-px bg-gradient-to-b from-cyan-400/60 to-transparent" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                          {item.id} · {item.code}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {pinnedId === item.id ? "Pinned" : isSelected ? "Active" : "Tap to inspect"}
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{item.text}</p>
                      {isExpanded && (
                        <p className="mt-2 border-t border-cyan-400/20 pt-2 text-xs leading-5 text-cyan-100/90">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
