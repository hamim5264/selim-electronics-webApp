export type PlanId = string;
export type TenantStatus = "Active" | "Trialing" | "Pending" | "Paused" | "Restricted";
export type VerificationStatus = "Verified" | "Awaiting review" | "Documents requested" | "Rejected";

export type TenantModuleKey =
  | "posCheckout"
  | "multiBranch"
  | "storefront"
  | "delivery"
  | "supplierPayables"
  | "customerCredit"
  | "advancedReports"
  | "guestAppAddon"
  | "sslcommerzOnline";

export type TenantModules = Record<TenantModuleKey, boolean>;

export type TenantPolicy = {
  allowNegativeStock: boolean;
  requireAdjustmentApproval: boolean;
  allowCustomerDue: boolean;
  enforceTwoStepStaff: boolean;
  invoicePrefix: string;
  lowStockThreshold: number;
};

export type VerificationDocs = {
  ownerId: boolean;
  tradeLicense: boolean;
  addressProof: boolean;
  taxCert: boolean;
};

export type TenantRegistrationDetails = {
  legalName?: string;
  currency?: string;
  firstBranchName?: string;
  businessAddress?: string;
  taxId?: string;
  incorporationNumber?: string;
  billingMethod?: "trial" | "card" | "bank" | "mobile" | string;
  billingContact?: string;
  billingEmail?: string;
  paymentReference?: string;
  billingAddress?: string;
  submittedAt?: string;
  authorizedConfirmed?: boolean;
};

export type PlatformTenant = {
  id: string;
  name: string;
  slug: string;
  owner: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  entityType: string;
  tradeLicense: string;
  vatBin: string;
  registration?: TenantRegistrationDetails;
  plan: string;
  status: TenantStatus;
  verification: VerificationStatus;
  verificationNote: string;
  docs: VerificationDocs;
  branches: number;
  maxBranches: number;
  registers: number;
  maxRegisters: number;
  staff: number;
  maxStaff: number;
  skusCount: number;
  monthlySalesBdt: number;
  onlineOrdersCount: number;
  mrr: string;
  mrrNumeric: number;
  access: boolean;
  maintenance: boolean;
  joinedAt: string;
  modules: TenantModules;
  policy: TenantPolicy;
};

export type PlanCustomFeature = {
  id: string;
  name: string;
  description: string;
  category: "POS" | "Commerce" | "Platform" | "Security";
  enabledPlanIds: string[];
};

export type PlatformPlan = {
  id: PlanId;
  name: string;
  price: string;
  priceNumeric: number;
  note: string;
  locations: string;
  locationsCap: string;
  registersCap: string;
  staffCap: string;
  support: string;
  popular?: boolean;
  features: string[];
  includedModules: TenantModuleKey[];
};

export type PlatformFlag = {
  id: string;
  name: string;
  scope: string;
  enabled: boolean;
  detail: string;
  rolloutPct: number;
  category: "POS" | "Commerce" | "Platform" | "Security";
};

export type ContentSection = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  visible: boolean;
  state: "Published" | "Draft";
  updatedAt: string;
};

export type BuyerAppEntry = {
  tenantId: string;
  name: string;
  type: string;
  featured: boolean;
  playStoreUrl: string;
  appStoreUrl: string;
};

export type PlatformContentState = {
  heroBadge: string;
  heroHeadlineTop: string;
  heroHeadlineMuted: string;
  heroDescription: string;
  maintenanceBannerEnabled: boolean;
  maintenanceBannerText: string;
  guestApp: {
    playStoreUrl: string;
    appStoreUrl: string;
    unavailableMessage: string;
  };
  buyerApps: BuyerAppEntry[];
  sections: ContentSection[];
};

export type PlatformInvoice = {
  id: string;
  tenantId: string;
  tenantName: string;
  plan: string;
  amount: string;
  amountNumeric: number;
  dueDate: string;
  method: "SSLCommerz" | "bKash" | "Card" | "Bank transfer" | "Trial";
  status: "Paid" | "Overdue" | "Retrying" | "Trial";
  trxId: string;
};

export type PaymentChannelItem = {
  id: string;
  label: string;
  group: "Cards" | "Mobile Banking" | "Internet Banking";
  enabled: boolean;
};

export type PlatformGatewayConfig = {
  provider: "SSLCommerz";
  environment: "Sandbox" | "Live";
  storeId: string;
  storeName: string;
  baseUrl: string;
  ipnEnabled: boolean;
  ipnUrl: string;
  channels: PaymentChannelItem[];
};

export type TicketMessage = {
  author: string;
  role: "Tenant" | "Super Admin" | "System";
  text: string;
  time: string;
};

export type SupportTicket = {
  id: string;
  tenant: string;
  subject: string;
  category: "POS & Hardware" | "Billing & SSLCommerz" | "Branches & Stock" | "Verification" | "Storefront";
  priority: "Urgent" | "High" | "Normal" | "Low";
  status: "Open" | "Waiting" | "Resolved";
  owner: string;
  createdAt: string;
  messages: TicketMessage[];
};

export type AuditCategory = "Tenant" | "KYC" | "Billing" | "Feature" | "Gateway" | "Content" | "Support" | "Security";

export type AuditEntry = {
  id: string;
  actor: string;
  category: AuditCategory;
  action: string;
  target: string;
  time: string;
};

export type PlatformGovernanceSettings = {
  requireAdminMfa: boolean;
  manualTenantActivation: boolean;
  verifiedBillingWebhooks: boolean;
  allowTenantImpersonation: boolean;
  strictNegativeStockGuard: boolean;
  sessionTimeoutMins: string;
  webhookSigningNote: string;
};

export type AdminSession = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export type AdminProfileState = {
  name: string;
  email: string;
  role: string;
  phone: string;
  timezone: string;
  alerts: boolean;
  digest: boolean;
  mfaEnabled: boolean;
  sessions: AdminSession[];
};

export type PlatformState = {
  tenants: PlatformTenant[];
  plans: PlatformPlan[];
  planFeatures?: PlanCustomFeature[];
  flags: PlatformFlag[];
  content: PlatformContentState;
  invoices: PlatformInvoice[];
  gateway: PlatformGatewayConfig;
  tickets: SupportTicket[];
  audit: AuditEntry[];
  governance: PlatformGovernanceSettings;
  profile: AdminProfileState;
};

export const TENANT_MODULE_META: {
  key: TenantModuleKey;
  label: string;
  description: string;
  sidebarIds: string[];
}[] = [
  { key: "posCheckout", label: "POS Register & Barcode", description: "Fast billing, split payments, barcode scan & returns", sidebarIds: ["pos", "sales"] },
  { key: "multiBranch", label: "Branches & Stock Transfers", description: "Multiple locations, registers & inter-branch transfers", sidebarIds: ["branches", "transfers", "registers"] },
  { key: "storefront", label: "Online Storefront & Orders", description: "Public /:slug web shop and online order queue", sidebarIds: ["orders"] },
  { key: "delivery", label: "Delivery & Dispatch", description: "Home delivery fees, courier zones & status tracking", sidebarIds: ["delivery"] },
  { key: "supplierPayables", label: "Purchases & Supplier Dues", description: "Purchase orders, supplier balances & settlements", sidebarIds: ["suppliers", "purchases", "supplier-payables"] },
  { key: "customerCredit", label: "Customer Credit & Dues", description: "Allow credit sales and track receivable dues", sidebarIds: ["customers", "customer-dues"] },
  { key: "advancedReports", label: "Finance & Advanced Reports", description: "Cashflow, expenses, margin exports & profit reports", sidebarIds: ["finance", "reports", "expenses"] },
  { key: "guestAppAddon", label: "Branded Customer App Add-on", description: "Showcase mobile buyer app links on DevEngine landing", sidebarIds: [] },
  { key: "sslcommerzOnline", label: "SSLCommerz Online Checkout", description: "Accept Visa, Mastercard, bKash & Nagad via SSLCommerz", sidebarIds: [] },
];

export const DEFAULT_PLATFORM_STATE: PlatformState = {
  tenants: [
    {
      id: "selim",
      name: "Selim Electronics",
      slug: "selim-electronics",
      owner: "MD. Selim",
      email: "info@selimelectronics.com",
      phone: "01712 345678",
      city: "Dhaka",
      country: "Bangladesh",
      entityType: "Sole proprietorship",
      tradeLicense: "TRAD/DSCC/048219",
      vatBin: "001849201-0102",
      registration: {
        legalName: "Selim Electronics Enterprise",
        currency: "BDT",
        firstBranchName: "Bangla Bazar Flagship",
        businessAddress: "48 Bangla Bazar Road, Sutrapur, Dhaka 1100",
        taxId: "TIN-492018472910",
        incorporationNumber: "REG-DSCC-2019-4821",
        billingMethod: "bank",
        billingContact: "MD. Selim",
        billingEmail: "accounts@selimelectronics.com",
        paymentReference: "SSL-SUB-SE-001",
        billingAddress: "48 Bangla Bazar Road, Dhaka 1100",
        submittedAt: "18 Aug 2026, 10:15 AM",
        authorizedConfirmed: true,
      },
      plan: "Growth",
      status: "Active",
      verification: "Verified",
      verificationNote: "Trade license and Bangla Bazar showroom verified.",
      docs: { ownerId: true, tradeLicense: true, addressProof: true, taxCert: true },
      branches: 3,
      maxBranches: 3,
      registers: 7,
      maxRegisters: 8,
      staff: 18,
      maxStaff: 20,
      skusCount: 2701,
      monthlySalesBdt: 487700,
      onlineOrdersCount: 24,
      mrr: "৳ 5,900",
      mrrNumeric: 5900,
      access: true,
      maintenance: false,
      joinedAt: "18 Aug 2026",
      modules: {
        posCheckout: true,
        multiBranch: true,
        storefront: true,
        delivery: true,
        supplierPayables: true,
        customerCredit: true,
        advancedReports: true,
        guestAppAddon: true,
        sslcommerzOnline: true,
      },
      policy: {
        allowNegativeStock: false,
        requireAdjustmentApproval: false,
        allowCustomerDue: true,
        enforceTwoStepStaff: false,
        invoicePrefix: "SE-",
        lowStockThreshold: 10,
      },
    },
    {
      id: "nova",
      name: "Nova Homeware",
      slug: "nova-homeware",
      owner: "N. Rahman",
      email: "ops@novahomeware.com",
      phone: "01819 441200",
      city: "Dhaka",
      country: "Bangladesh",
      entityType: "Limited company",
      tradeLicense: "TRAD/DNCC/112940",
      vatBin: "003219401-0201",
      registration: {
        legalName: "Nova Homeware Holdings Ltd.",
        currency: "BDT",
        firstBranchName: "Banani Showroom 01",
        businessAddress: "Road 11, Block F, Banani, Dhaka 1213",
        taxId: "TIN-773190284512",
        incorporationNumber: "RJSC-C-184920/2023",
        billingMethod: "card",
        billingContact: "Nadia Rahman",
        billingEmail: "finance@novahomeware.com",
        paymentReference: "SSLCZ-NOVA-2409",
        billingAddress: "House 24, Road 11, Banani, Dhaka 1213",
        submittedAt: "04 Jul 2026, 02:40 PM",
        authorizedConfirmed: true,
      },
      plan: "Scale",
      status: "Active",
      verification: "Documents requested",
      verificationNote: "Updated VAT certificate requested for 11th branch expansion.",
      docs: { ownerId: true, tradeLicense: true, addressProof: true, taxCert: false },
      branches: 11,
      maxBranches: 99,
      registers: 24,
      maxRegisters: 99,
      staff: 64,
      maxStaff: 120,
      skusCount: 5420,
      monthlySalesBdt: 1420000,
      onlineOrdersCount: 89,
      mrr: "৳ 24,000",
      mrrNumeric: 24000,
      access: true,
      maintenance: false,
      joinedAt: "04 Jul 2026",
      modules: {
        posCheckout: true,
        multiBranch: true,
        storefront: true,
        delivery: true,
        supplierPayables: true,
        customerCredit: true,
        advancedReports: true,
        guestAppAddon: true,
        sslcommerzOnline: true,
      },
      policy: {
        allowNegativeStock: false,
        requireAdjustmentApproval: true,
        allowCustomerDue: true,
        enforceTwoStepStaff: true,
        invoicePrefix: "NH-",
        lowStockThreshold: 15,
      },
    },
    {
      id: "urban",
      name: "Urban Mart",
      slug: "urban-mart",
      owner: "A. Hasan",
      email: "founder@urbanmart.com.bd",
      phone: "01911 887766",
      city: "Chattogram",
      country: "Bangladesh",
      entityType: "Partnership",
      tradeLicense: "TRAD/CCC/77412",
      vatBin: "Pending",
      registration: {
        legalName: "Urban Mart Retail Partnership",
        currency: "BDT",
        firstBranchName: "GEC Circle Outlet",
        businessAddress: "112 CDA Avenue, GEC Circle, Chattogram 4000",
        taxId: "TIN-310948271604",
        incorporationNumber: "PART-CTG-7741/2026",
        billingMethod: "trial",
        billingContact: "Arif Hasan",
        billingEmail: "founder@urbanmart.com.bd",
        paymentReference: "14-day Free Trial",
        billingAddress: "112 CDA Avenue, Chattogram",
        submittedAt: "10 Nov 2026, 11:20 AM",
        authorizedConfirmed: true,
      },
      plan: "Growth",
      status: "Trialing",
      verification: "Awaiting review",
      verificationNote: "Initial registration submitted; trade license ready for check.",
      docs: { ownerId: true, tradeLicense: true, addressProof: false, taxCert: false },
      branches: 1,
      maxBranches: 3,
      registers: 2,
      maxRegisters: 8,
      staff: 4,
      maxStaff: 10,
      skusCount: 380,
      monthlySalesBdt: 92400,
      onlineOrdersCount: 6,
      mrr: "৳ 0",
      mrrNumeric: 0,
      access: true,
      maintenance: false,
      joinedAt: "10 Nov 2026",
      modules: {
        posCheckout: true,
        multiBranch: true,
        storefront: false,
        delivery: false,
        supplierPayables: true,
        customerCredit: true,
        advancedReports: false,
        guestAppAddon: true,
        sslcommerzOnline: false,
      },
      policy: {
        allowNegativeStock: false,
        requireAdjustmentApproval: false,
        allowCustomerDue: true,
        enforceTwoStepStaff: false,
        invoicePrefix: "UM-",
        lowStockThreshold: 8,
      },
    },
    {
      id: "bengal",
      name: "Bengal Lifestyle",
      slug: "bengal-lifestyle",
      owner: "M. Alam",
      email: "hello@bengallifestyle.com",
      phone: "01675 302190",
      city: "Sylhet",
      country: "Bangladesh",
      entityType: "Sole proprietorship",
      tradeLicense: "TRAD/SCC/39104",
      vatBin: "Pending",
      registration: {
        legalName: "Bengal Lifestyle Trading",
        currency: "BDT",
        firstBranchName: "Zindabazar Flagship",
        businessAddress: "Al-Hamra Shopping City, Zindabazar, Sylhet 3100",
        taxId: "TIN-552019384712",
        incorporationNumber: "SCC-REG-39104",
        billingMethod: "mobile",
        billingContact: "Mahmud Alam",
        billingEmail: "hello@bengallifestyle.com",
        paymentReference: "bKash-01675302190",
        billingAddress: "Zindabazar, Sylhet 3100",
        submittedAt: "14 Nov 2026, 04:05 PM",
        authorizedConfirmed: true,
      },
      plan: "Starter",
      status: "Pending",
      verification: "Awaiting review",
      verificationNote: "Awaiting KYC confirmation before workspace sign-in activation.",
      docs: { ownerId: true, tradeLicense: false, addressProof: false, taxCert: false },
      branches: 1,
      maxBranches: 1,
      registers: 1,
      maxRegisters: 2,
      staff: 2,
      maxStaff: 3,
      skusCount: 145,
      monthlySalesBdt: 0,
      onlineOrdersCount: 0,
      mrr: "৳ 0",
      mrrNumeric: 0,
      access: false,
      maintenance: false,
      joinedAt: "14 Nov 2026",
      modules: {
        posCheckout: true,
        multiBranch: false,
        storefront: false,
        delivery: false,
        supplierPayables: true,
        customerCredit: false,
        advancedReports: false,
        guestAppAddon: false,
        sslcommerzOnline: false,
      },
      policy: {
        allowNegativeStock: false,
        requireAdjustmentApproval: false,
        allowCustomerDue: false,
        enforceTwoStepStaff: false,
        invoicePrefix: "BL-",
        lowStockThreshold: 5,
      },
    },
  ],
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: "৳ 2,500",
      priceNumeric: 2500,
      note: "For a single store getting organised.",
      locations: "1 location included",
      locationsCap: "1",
      registersCap: "2",
      staffCap: "3",
      support: "Email",
      features: ["POS, products & inventory", "Sales and cash reporting", "3 staff accounts", "Email support"],
      includedModules: ["posCheckout", "supplierPayables", "customerCredit"],
    },
    {
      id: "growth",
      name: "Growth",
      price: "৳ 5,900",
      priceNumeric: 5900,
      note: "For growing retail teams.",
      locations: "Up to 3 locations",
      locationsCap: "3",
      registersCap: "8",
      staffCap: "20",
      support: "Priority",
      popular: true,
      features: ["Everything in Starter", "Transfers and branch reporting", "20 staff accounts", "Purchase orders & supplier dues", "Priority support"],
      includedModules: ["posCheckout", "multiBranch", "storefront", "delivery", "supplierPayables", "customerCredit", "advancedReports", "sslcommerzOnline"],
    },
    {
      id: "scale",
      name: "Scale",
      price: "Custom",
      priceNumeric: 24000,
      note: "For connected retail groups.",
      locations: "Unlimited locations",
      locationsCap: "Unlimited",
      registersCap: "Unlimited",
      staffCap: "Unlimited",
      support: "Dedicated",
      features: ["Everything in Growth", "Advanced roles and approval controls", "Consolidated finance & exports", "Dedicated success manager", "Custom integrations"],
      includedModules: ["posCheckout", "multiBranch", "storefront", "delivery", "supplierPayables", "customerCredit", "advancedReports", "guestAppAddon", "sslcommerzOnline"],
    },
  ],
  planFeatures: [
    {
      id: "whatsapp-receipts",
      name: "WhatsApp Digital Receipts",
      description: "Send POS invoices & payment links directly to buyer WhatsApp.",
      category: "Commerce",
      enabledPlanIds: ["growth", "scale"],
    },
    {
      id: "multi-currency-tax",
      name: "Multi-Currency & BIN Tax Rules",
      description: "Custom VAT brackets and export invoice formatting.",
      category: "POS",
      enabledPlanIds: ["scale"],
    },
    {
      id: "priority-webhook-sla",
      name: "Dedicated SSLCommerz IPN Queue",
      description: "Sub-second payment confirmation & priority retry worker.",
      category: "Platform",
      enabledPlanIds: ["growth", "scale"],
    },
  ],
  flags: [
    { id: "guest-app", name: "Branded customer app add-on", scope: "Plan add-on", enabled: true, detail: "Controls buyer app showcase carousel & Play/App Store links.", rolloutPct: 100, category: "Commerce" },
    { id: "stock-transfer", name: "Inter-branch stock transfers", scope: "Growth +", enabled: true, detail: "Origin dispatch, in-transit lock, and receiving verification.", rolloutPct: 100, category: "POS" },
    { id: "online-orders", name: "Tenant storefront online orders", scope: "Growth +", enabled: true, detail: "Enables /:slug storefront cart, checkout & online order queue.", rolloutPct: 75, category: "Commerce" },
    { id: "sslcommerz-checkout", name: "SSLCommerz online gateway", scope: "All paid plans", enabled: true, detail: "Enables Cards, bKash, Nagad & NetBanking checkout via SSLCommerz.", rolloutPct: 100, category: "Platform" },
    { id: "advanced-reporting", name: "Consolidated finance & exports", scope: "Growth +", enabled: true, detail: "Multi-branch profit, tax-ready sales & scheduled CSV exports.", rolloutPct: 100, category: "POS" },
    { id: "barcode-serial", name: "Barcode & serialised inventory", scope: "All plans", enabled: true, detail: "IMEI/serial number tracking and POS scanner billing.", rolloutPct: 100, category: "POS" },
    { id: "strict-mfa", name: "Admin 2-step verification enforcement", scope: "Platform", enabled: true, detail: "Requires MFA for platform admins and owner-level changes.", rolloutPct: 100, category: "Security" },
  ],
  content: {
    heroBadge: "Built for modern retail operations",
    heroHeadlineTop: "Run retail",
    heroHeadlineMuted: "with clarity.",
    heroDescription: "DevEngine POS gives every retailer a secure, scalable workspace for sales, inventory, customers and finance — so every decision feels faster, clearer and in control.",
    maintenanceBannerEnabled: false,
    maintenanceBannerText: "Scheduled platform maintenance is active for payment webhook upgrades. POS offline billing continues normally.",
    guestApp: {
      playStoreUrl: "",
      appStoreUrl: "",
      unavailableMessage: "Our guest app is not available for download yet. We are putting the finishing touches on a great shopping experience - please check back soon.",
    },
    buyerApps: [
      { tenantId: "selim", name: "Selim Electronics", type: "Electronics", featured: true, playStoreUrl: "", appStoreUrl: "" },
      { tenantId: "nova", name: "Nova Homeware", type: "Home & living", featured: true, playStoreUrl: "", appStoreUrl: "" },
      { tenantId: "urban", name: "Urban Mart", type: "Everyday retail", featured: true, playStoreUrl: "", appStoreUrl: "" },
    ],
    sections: [
      { id: "hero", label: "Homepage hero & messaging", title: "Run retail with clarity.", subtitle: "Primary headline, badge and CTA copy on the public landing page.", visible: true, state: "Published", updatedAt: "Today, 10:12" },
      { id: "pricing", label: "Plans & pricing table", title: "Start small. Scale with confidence.", subtitle: "Synced directly with Super Admin plan cards & limits.", visible: true, state: "Published", updatedAt: "Today, 09:40" },
      { id: "apps", label: "Customer app showcase", title: "Discover buyer apps, powered by the platform.", subtitle: "Controls BuyerAppCarousel tenants and Google Play / App Store links.", visible: true, state: "Published", updatedAt: "Yesterday" },
      { id: "payments", label: "SSLCommerz payment strip", title: "Payment channels accepted", subtitle: "Animated SSLCommerz channel strip in the public footer.", visible: true, state: "Published", updatedAt: "Today, 11:20" },
      { id: "reviews", label: "Trusted buyer reviews", title: "Retailers sharing real momentum.", subtitle: "Rotating retail testimonials displayed above the footer.", visible: true, state: "Draft", updatedAt: "13 Nov 2026" },
    ],
  },
  invoices: [
    { id: "INV-2409", tenantId: "selim", tenantName: "Selim Electronics", plan: "Growth", amount: "৳ 5,900", amountNumeric: 5900, dueDate: "18 Nov 2026", method: "SSLCommerz", status: "Paid", trxId: "SSLCZ-982144" },
    { id: "INV-2408", tenantId: "nova", tenantName: "Nova Homeware", plan: "Scale", amount: "৳ 24,000", amountNumeric: 24000, dueDate: "14 Nov 2026", method: "Bank transfer", status: "Overdue", trxId: "PENDING-IPN" },
    { id: "INV-2407", tenantId: "urban", tenantName: "Urban Mart", plan: "Growth", amount: "৳ 0", amountNumeric: 0, dueDate: "24 Nov 2026", method: "Trial", status: "Trial", trxId: "TRIAL-14D" },
    { id: "INV-2406", tenantId: "bengal", tenantName: "Bengal Lifestyle", plan: "Starter", amount: "৳ 2,500", amountNumeric: 2500, dueDate: "15 Nov 2026", method: "bKash", status: "Retrying", trxId: "RETRY-02" },
  ],
  gateway: {
    provider: "SSLCommerz",
    environment: "Sandbox",
    storeId: "deven680f75b061425",
    storeName: "testdevenn5uc",
    baseUrl: "https://devengine-three.vercel.app",
    ipnEnabled: true,
    ipnUrl: "https://devengine-three.vercel.app/api/sslcommerz/ipn",
    channels: [
      { id: "visa", label: "VISA", group: "Cards", enabled: true },
      { id: "mastercard", label: "Mastercard", group: "Cards", enabled: true },
      { id: "amex", label: "AMEX", group: "Cards", enabled: true },
      { id: "unionpay", label: "UnionPay", group: "Cards", enabled: true },
      { id: "nexus", label: "DBBL Nexus", group: "Cards", enabled: true },
      { id: "bkash", label: "bKash", group: "Mobile Banking", enabled: true },
      { id: "nagad", label: "Nagad", group: "Mobile Banking", enabled: true },
      { id: "rocket", label: "Rocket", group: "Mobile Banking", enabled: true },
      { id: "upay", label: "Upay", group: "Mobile Banking", enabled: true },
      { id: "citytouch", label: "Citytouch", group: "Internet Banking", enabled: true },
      { id: "eblsky", label: "EBL Skybanking", group: "Internet Banking", enabled: true },
      { id: "abdirect", label: "AB Direct", group: "Internet Banking", enabled: true },
    ],
  },
  tickets: [
    {
      id: "SUP-1842",
      tenant: "Urban Mart",
      subject: "Need help setting up second POS register",
      category: "POS & Hardware",
      priority: "Normal",
      status: "Open",
      owner: "Unassigned",
      createdAt: "Today, 11:05 AM",
      messages: [
        { author: "A. Hasan (Urban Mart)", role: "Tenant", text: "We added a thermal receipt printer on Counter 02 and want to enable register shifts.", time: "11:05 AM" },
      ],
    },
    {
      id: "SUP-1841",
      tenant: "Selim Electronics",
      subject: "SSLCommerz live IPN verification & invoice copy",
      category: "Billing & SSLCommerz",
      priority: "Low",
      status: "Waiting",
      owner: "Hamim Leon",
      createdAt: "Today, 09:30 AM",
      messages: [
        { author: "MD. Selim (Selim Electronics)", role: "Tenant", text: "Please confirm IPN webhook status for online storefront checkout and send INV-2409 PDF copy.", time: "09:30 AM" },
        { author: "Hamim Leon", role: "Super Admin", text: "Verified sandbox IPN endpoint; awaiting tenant confirmation to switch storefront checkout live.", time: "10:15 AM" },
      ],
    },
    {
      id: "SUP-1838",
      tenant: "Nova Homeware",
      subject: "Branch import verification for 11th location",
      category: "Verification",
      priority: "High",
      status: "Open",
      owner: "R. Karim",
      createdAt: "Yesterday",
      messages: [
        { author: "N. Rahman (Nova Homeware)", role: "Tenant", text: "Uploaded trade license for Uttara warehouse. Need VAT certificate check cleared.", time: "Yesterday" },
      ],
    },
  ],
  audit: [
    { id: "AUD-904", actor: "Hamim Leon", category: "Gateway", action: "Configured SSLCommerz IPN listener for testdevenn5uc", target: "deven680f75b061425", time: "10:42 AM" },
    { id: "AUD-903", actor: "Hamim Leon", category: "KYC", action: "Requested updated VAT certificate", target: "Nova Homeware", time: "10:18 AM" },
    { id: "AUD-902", actor: "Hamim Leon", category: "Billing", action: "Marked invoice INV-2409 Paid via SSLCommerz", target: "Selim Electronics", time: "09:51 AM" },
    { id: "AUD-901", actor: "Hamim Leon", category: "Content", action: "Published SSLCommerz payment strip to public footer", target: "Public Website", time: "Yesterday" },
  ],
  governance: {
    requireAdminMfa: true,
    manualTenantActivation: true,
    verifiedBillingWebhooks: true,
    allowTenantImpersonation: true,
    strictNegativeStockGuard: false,
    sessionTimeoutMins: "45 minutes",
    webhookSigningNote: "HMAC-SHA256 signature + SSLCommerz IPN verify_sign active",
  },
  profile: {
    name: "Hamim Leon",
    email: "hamim@devengine.com",
    role: "Platform Owner",
    phone: "+880 1712 000000",
    timezone: "Asia/Dhaka",
    alerts: true,
    digest: true,
    mfaEnabled: true,
    sessions: [
      { id: "sess-1", device: "Chrome · macOS Sequoia", location: "Dhaka, BD", lastActive: "Current session", current: true },
      { id: "sess-2", device: "Safari · iPhone 16 Pro", location: "Dhaka, BD", lastActive: "38 mins ago", current: false },
    ],
  },
};

const STORAGE_KEY = "devengine_platform_state_v1";

export function loadPlatformState(): PlatformState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PLATFORM_STATE;
    const parsed = JSON.parse(raw) as Partial<PlatformState>;
    return {
      ...DEFAULT_PLATFORM_STATE,
      ...parsed,
      content: { ...DEFAULT_PLATFORM_STATE.content, ...(parsed.content || {}) },
      gateway: { ...DEFAULT_PLATFORM_STATE.gateway, ...(parsed.gateway || {}) },
      governance: { ...DEFAULT_PLATFORM_STATE.governance, ...(parsed.governance || {}) },
      profile: { ...DEFAULT_PLATFORM_STATE.profile, ...(parsed.profile || {}) },
    };
  } catch {
    return DEFAULT_PLATFORM_STATE;
  }
}

export function savePlatformState(state: PlatformState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors in restricted browsing contexts.
  }
}

export function clearPlatformState(): PlatformState {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
  return DEFAULT_PLATFORM_STATE;
}
