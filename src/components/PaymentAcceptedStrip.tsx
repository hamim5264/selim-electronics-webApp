interface PaymentLogoProps {
  id: string;
  label: string;
  category: "Card" | "Mobile Banking" | "Internet Banking";
}

function PaymentBadgeArtwork({ id }: { id: string }) {
  switch (id) {
    case "visa":
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[16px] font-black italic tracking-[-0.06em] text-[#1A1F71]">VISA</span>
        </div>
      );
    case "mastercard":
      return (
        <div className="flex items-center gap-1.5">
          <svg width="26" height="16" viewBox="0 0 26 16" aria-hidden="true">
            <circle cx="9" cy="8" r="7" fill="#EB001B" />
            <circle cx="17" cy="8" r="7" fill="#F79E1B" fillOpacity="0.92" />
          </svg>
          <span className="text-[11px] font-bold tracking-tight text-slate-800">mastercard</span>
        </div>
      );
    case "amex":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-8 items-center justify-center rounded bg-[#006FCF] text-[9px] font-black leading-none tracking-tighter text-white">
            AMEX
          </span>
        </div>
      );
    case "unionpay":
      return (
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-5 overflow-hidden rounded text-[8px] font-black text-white">
            <span className="flex items-center bg-[#D9232A] px-1">U</span>
            <span className="flex items-center bg-[#00447C] px-1">P</span>
            <span className="flex items-center bg-[#007B84] px-1">ay</span>
          </span>
          <span className="text-[11px] font-bold text-slate-800">UnionPay</span>
        </div>
      );
    case "diners":
      return (
        <div className="flex items-center gap-1.5">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8.5" stroke="#0079BE" strokeWidth="2" fill="none" />
            <rect x="8.5" y="4" width="3" height="12" fill="#0079BE" />
          </svg>
          <span className="text-[11px] font-bold tracking-tight text-[#00598E]">Diners Club</span>
        </div>
      );
    case "nexus":
      return (
        <div className="flex items-center gap-1.5">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8" cy="10" r="5" fill="#008752" />
            <circle cx="12" cy="10" r="5" fill="#D71920" fillOpacity="0.86" />
          </svg>
          <span className="text-[11px] font-extrabold tracking-tight text-slate-900">DBBL NEXUS</span>
        </div>
      );
    case "qcash":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D92228] text-[11px] font-black text-white">
            Q
          </span>
          <span className="text-[12px] font-extrabold text-[#1E293B]">Qcash</span>
        </div>
      );
    case "takapay":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#12874B] text-[11px] font-black text-white">
            ৳
          </span>
          <span className="text-[12px] font-extrabold tracking-tight text-[#0F5132]">
            Taka<span className="text-[#D9232A]">Pay</span>
          </span>
        </div>
      );
    case "bkash":
      return (
        <div className="flex items-center gap-1.5">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <polygon points="3,4 11,9 6,15" fill="#E2136E" />
            <polygon points="10,2 17,9 11,11" fill="#C10B5C" />
            <polygon points="11,11 17,9 13,17" fill="#F0569C" />
          </svg>
          <span className="text-[13px] font-extrabold tracking-tight text-[#D12053]">bKash</span>
        </div>
      );
    case "nagad":
      return (
        <div className="flex items-center gap-1.5">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="8" fill="#F26522" />
            <path d="M6 12C8 7 13 7 14 11" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] font-extrabold tracking-tight text-[#EA4D1B]">Nagad</span>
        </div>
      );
    case "rocket":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8C3494] text-[10px] font-black text-white">
            R
          </span>
          <span className="text-[12px] font-extrabold tracking-tight text-[#7C2985]">Rocket</span>
        </div>
      );
    case "tap":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E41F26] text-[9px] font-black text-white">
            tap
          </span>
          <span className="text-[11px] font-bold text-slate-800">tappay</span>
        </div>
      );
    case "upay":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FFD400] text-[11px] font-black text-[#005BAA]">
            u
          </span>
          <span className="text-[13px] font-extrabold tracking-tight text-[#005BAA]">upay</span>
        </div>
      );
    case "okwallet":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#FF6A00] text-[9px] font-black text-white">
            OK
          </span>
          <span className="text-[11px] font-bold text-slate-800">OK Wallet</span>
        </div>
      );
    case "mcash":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#007A33] text-[10px] font-black text-white">
            m
          </span>
          <span className="text-[12px] font-extrabold text-[#007A33]">mCash</span>
        </div>
      );
    case "islamicwallet":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0E8345] text-[9px] font-black text-white">
            IW
          </span>
          <span className="text-[11px] font-bold text-[#0E8345]">Islamic Wallet</span>
        </div>
      );
    case "mycash":
      return (
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-black tracking-tight text-[#0096D6]">MYCash</span>
        </div>
      );
    case "meghnapay":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0072BC] text-[9px] font-black text-white">
            M
          </span>
          <span className="text-[11px] font-extrabold text-[#005596]">meghna pay</span>
        </div>
      );
    case "citytouch":
      return (
        <div className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded bg-[#DA291C]" />
          <span className="text-[12px] font-extrabold text-[#DA291C]">citytouch</span>
        </div>
      );
    case "cellfin":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#007A33] text-[9px] font-black text-white">
            CF
          </span>
          <span className="text-[12px] font-extrabold text-[#007A33]">CellFin</span>
        </div>
      );
    case "eblsky":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 items-center rounded bg-[#6BB72E] px-1.5 text-[9px] font-black text-white">
            EBL
          </span>
          <span className="text-[11px] font-extrabold text-[#005B9A]">SKYBANKING</span>
        </div>
      );
    case "abdirect":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 items-center rounded bg-[#ED1C24] px-1.5 text-[9px] font-black text-white">
            AB
          </span>
          <span className="text-[11px] font-bold text-slate-800">AB Direct</span>
        </div>
      );
    case "mtb":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#008751] text-[8px] font-black text-white">
            MTB
          </span>
          <span className="text-[11px] font-bold text-[#005936]">MTB Smart</span>
        </div>
      );
    case "bankasia":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#14559A] text-[9px] font-black text-white">
            BA
          </span>
          <span className="text-[11px] font-bold text-[#14559A]">Bank Asia</span>
        </div>
      );
    case "myprime":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0055A5] text-[9px] font-black text-white">
            P
          </span>
          <span className="text-[11px] font-extrabold text-[#0055A5]">MyPrime</span>
        </div>
      );
    case "ibbl":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0A7D41] text-[8px] font-black text-white">
            IB
          </span>
          <span className="text-[11px] font-bold text-[#0A7D41]">IBBL iBanking</span>
        </div>
      );
    case "ucb":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 items-center rounded bg-[#D71920] px-1.5 text-[9px] font-black text-white">
            UCB
          </span>
          <span className="text-[11px] font-bold text-slate-800">Unet</span>
        </div>
      );
    case "modhumoti":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#00843D] text-[9px] font-black text-white">
            M
          </span>
          <span className="text-[11px] font-bold text-slate-800">Modhumoti</span>
        </div>
      );
    case "sbac":
      return (
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 items-center rounded bg-[#1E56A0] px-1.5 text-[9px] font-black text-white">
            SBAC
          </span>
          <span className="text-[11px] font-bold text-slate-800">Bank</span>
        </div>
      );
    default:
      return <span className="text-[12px] font-bold text-slate-800">{id}</span>;
  }
}

const PRIMARY_PAYMENT_CHANNELS: PaymentLogoProps[] = [
  { id: "visa", label: "VISA", category: "Card" },
  { id: "mastercard", label: "Mastercard", category: "Card" },
  { id: "amex", label: "American Express", category: "Card" },
  { id: "unionpay", label: "UnionPay", category: "Card" },
  { id: "diners", label: "Diners Club", category: "Card" },
  { id: "nexus", label: "DBBL Nexus", category: "Card" },
  { id: "qcash", label: "Qcash", category: "Card" },
  { id: "takapay", label: "TakaPay", category: "Card" },
  { id: "bkash", label: "bKash", category: "Mobile Banking" },
  { id: "nagad", label: "Nagad", category: "Mobile Banking" },
  { id: "rocket", label: "Rocket", category: "Mobile Banking" },
  { id: "upay", label: "Upay", category: "Mobile Banking" },
  { id: "tap", label: "tap", category: "Mobile Banking" },
  { id: "okwallet", label: "OK Wallet", category: "Mobile Banking" },
  { id: "mcash", label: "mCash", category: "Mobile Banking" },
  { id: "islamicwallet", label: "Islamic Wallet", category: "Mobile Banking" },
  { id: "mycash", label: "MyCash", category: "Mobile Banking" },
  { id: "meghnapay", label: "Meghna Pay", category: "Mobile Banking" },
];

const BANKING_PAYMENT_CHANNELS: PaymentLogoProps[] = [
  { id: "citytouch", label: "Citytouch", category: "Internet Banking" },
  { id: "cellfin", label: "CellFin", category: "Internet Banking" },
  { id: "eblsky", label: "EBL Skybanking", category: "Internet Banking" },
  { id: "abdirect", label: "AB Direct", category: "Internet Banking" },
  { id: "mtb", label: "MTB Smart Banking", category: "Internet Banking" },
  { id: "bankasia", label: "Bank Asia", category: "Internet Banking" },
  { id: "myprime", label: "MyPrime", category: "Internet Banking" },
  { id: "ibbl", label: "IBBL iBanking", category: "Internet Banking" },
  { id: "ucb", label: "UCB Unet", category: "Internet Banking" },
  { id: "modhumoti", label: "Modhumoti Bank", category: "Internet Banking" },
  { id: "sbac", label: "SBAC Bank", category: "Internet Banking" },
];

export default function PaymentAcceptedStrip({
  disabledChannelIds,
  environment,
}: {
  disabledChannelIds?: string[];
  environment?: "Sandbox" | "Live";
} = {}) {
  const filterEnabled = (items: PaymentLogoProps[]) => {
    if (!disabledChannelIds || disabledChannelIds.length === 0) return items;
    const matched = items.filter(item => !disabledChannelIds.includes(item.id));
    return matched.length ? matched : items;
  };
  const activePrimary = filterEnabled(PRIMARY_PAYMENT_CHANNELS);
  const activeBanking = filterEnabled(BANKING_PAYMENT_CHANNELS);
  const rowOne = [...activePrimary, ...activePrimary];
  const rowTwo = [...activeBanking, ...activeBanking];

  return (
    <div className="mt-10 border-t border-white/10 pt-8" aria-label="Payment methods accepted via SSLCommerz">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
            Payment we accept
          </div>
          <p className="mt-1.5 text-[13px] text-slate-300">
            All major local &amp; international cards, mobile wallets, and internet banking supported.
          </p>
        </div>

        <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2">
          <span className="text-[11px] font-medium text-slate-300">Verified by</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#1B6AC9] px-2.5 py-1 text-[11px] font-black tracking-wide text-white shadow-sm">
            SSLCommerz
          </span>
          {environment && (
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
              {environment}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {/* Cards & Mobile Banking Rail */}
        <div className="payment-marquee overflow-hidden">
          <div className="payment-marquee-track">
            {rowOne.map((channel, index) => (
              <div
                key={`${channel.id}-${index}`}
                title={`${channel.label} (${channel.category})`}
                className="payment-logo-pill"
              >
                <PaymentBadgeArtwork id={channel.id} />
              </div>
            ))}
          </div>
        </div>

        {/* Internet Banking Rail (opposite direction) */}
        <div className="payment-marquee payment-marquee-reverse overflow-hidden">
          <div className="payment-marquee-track-reverse">
            {rowTwo.map((channel, index) => (
              <div
                key={`${channel.id}-${index}`}
                title={`${channel.label} (${channel.category})`}
                className="payment-logo-pill"
              >
                <PaymentBadgeArtwork id={channel.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
