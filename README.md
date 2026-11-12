# Selim Electronics

**Live Web App:** https://hamim5264.github.io/selim-electronics-webApp/

Selim Electronics is a connected retail ecosystem for a Bangladesh-based electronics business. It consists of:

- A completed **React + Vite + Tailwind CSS POS and business-management UI** in this repository.
- A future **Flutter customer application** for Android and iOS.
- One secure shared backend, database, storage layer, notification service, and payment workflow.

This document is the project contract for review before feature implementation starts. It is based on the supplied [Infrastructure & Implementation Plan](requirements/Selim_Electronics_Infrastructure_Implementation_Plan.pdf) and the existing Figma Make UI specifications in `src/imports/pasted_text/`.

## Current status

The existing visual POS application is intentionally preserved in `src/App.tsx`. It already represents the Figma design system and business screens; it is **not yet connected to production data or services**.

No backend, database schema, Cloudflare deployment, mobile application, authentication provider, payment integration, or secrets are being added in this review stage.

## Run the existing UI

Prerequisite: Node.js 26+ is installed.

```bash
npm install
npm run dev
```

The Vite app uses the `PORT` environment variable when it is provided; otherwise it runs on port `8443`.

To verify the production bundle:

```bash
npm run build
```

## Approved product scope

### Staff POS and operations web app

The existing Figma Make application defines these connected areas:

1. Authentication and access
2. Business dashboard
3. POS / new sale
4. Sales and returns
5. Product catalog, categories, brands, variants, and units
6. Inventory, movements, adjustments, and low-stock awareness
7. Suppliers, purchases, supplier payables, and supplier payments
8. Customers, customer dues, collections, and returns
9. Online orders and delivery management
10. Expenses, finance, reports, and analytics
11. Employees, roles, permissions, notifications, audit activity, and settings

The product must retain the existing UI language: the black/white and neutral palette, typography, navigation shell, tables, forms, badges, icon style, spacing, and component patterns. Build integrations behind this UI; do not replace it with a new visual direction.

### Customer mobile app

Flutter will deliver the customer shopping experience on Android and iOS. Its first release includes authentication, catalog browsing and search, product detail, cart, addresses, checkout, online payment handoff, order history, delivery status, and notifications. It uses the same API and database as the staff application but can access customer-owned data only.

## Final implementation prompt

Use the following prompt as the starting instruction for every implementation phase.

> **Project:** Selim Electronics
>
> **Goal:** Turn the existing Figma Make POS UI into a secure, production-ready retail-management web application and build a connected Flutter customer app. Both clients must use one trusted backend, one relational source of truth, and the same business rules.
>
> **Do not alter the existing Figma UI design system.** Inspect the repository before editing. Preserve existing React routes, components, Tailwind styling, and screen intent. Integrate one approved module at a time.
>
> **Approved architecture:**
>
> - React + Vite + Tailwind CSS for the existing POS web frontend, hosted on Cloudflare Pages.
> - Flutter for the Android and iOS customer frontend.
> - Cloudflare Workers as the single versioned backend API (`/api/v1`).
> - Supabase PostgreSQL as the shared relational source of truth.
> - Supabase Auth for email/password, Google OAuth, verification, and password reset.
> - Supabase HTTPS Data API and PostgreSQL RPC functions for the initial Worker-to-database integration. Evaluate Cloudflare Hyperdrive only later; do not assume it is available on a free plan.
> - Cloudflare R2 for product photos, logos, invoices, and documents.
> - Firebase Cloud Messaging (FCM) for mobile and web push notifications.
> - SSLCommerz for online payments, beginning with sandbox checkout and server-side validation.
>
> **Non-negotiable rules:**
>
> - Never put service-role keys, database passwords, R2 credentials, FCM credentials, SSLCommerz secrets, or other privileged credentials in React or Flutter code.
> - Never give the browser or mobile client privileged database access. Workers must authenticate, authorize, validate, and execute protected business operations.
> - Do not trust a client-supplied role. Enforce authorization in Workers and PostgreSQL Row Level Security (RLS).
> - Manage schema changes with versioned migrations. Do not rely on manual database-only changes.
> - Use PostgreSQL transactions/RPC for atomic sales, purchase receiving, stock changes, returns, and payments.
> - Maintain append-only inventory movements. Do not mutate stock history.
> - Keep customer receivables separate from supplier payables. Keep operational expenses separate from stock purchases.
> - Preserve the historical unit cost captured on each purchase item.
> - Use idempotency keys for retryable financial operations, order creation, and payment callbacks.
> - Store money in BDT using a documented decimal precision and rounding policy; use `timestamptz` for timestamps and UUID identifiers where appropriate.
> - Keep R2 private by default. Validate MIME type, size, and image dimensions, use controlled upload/download access, and store object metadata in PostgreSQL.
> - Add authorization, failure-path, concurrency, and data-integrity tests before marking any module complete.
> - Use separate development, staging, and production configuration. Never commit real secrets or `.env` files.
>
> **Working method:**
>
> 1. Report relevant repository structure and the current feature state before code changes.
> 2. Propose the schema, API contract, migration, security model, and test plan for approval.
> 3. Implement in small, reviewable phases with migrations and tests.
> 4. Connect one business module at a time to the existing UI and verify its success, failure, retry, and authorization paths.
> 5. Document setup, required environment variables, deployment, rollback, and migration steps with placeholders only.
> 6. Do not claim a feature is complete until its acceptance criteria pass.

## Target architecture

```text
React POS web app ────────┐
                           ├── HTTPS ──> Cloudflare Workers API (/api/v1)
Flutter customer app ─────┘                    │
                                                ├── validate Supabase JWT / authorize role
                                                ├── Supabase REST + PostgreSQL RPC
                                                ├── private Cloudflare R2 files
                                                ├── FCM HTTP v1 notification requests
                                                └── SSLCommerz payment callbacks/verification

Supabase Auth ──> short-lived client access token ──> Worker validation
Supabase PostgreSQL ──> shared source of truth for staff and customers
```

The UI may use Supabase only for its public authentication configuration where necessary. All business data and privileged actions flow through Workers. Workers must independently validate the access token and permissions on every protected request.

## Data foundation

Start with normalized PostgreSQL tables, foreign keys, unique constraints, indexes, RLS policies, and migrations. The initial domain proposal is:

| Domain | Initial tables |
| --- | --- |
| Identity and access | `profiles`, `roles`, `permissions`, `role_permissions`, `user_roles`, `employee_profiles`, `device_tokens` |
| Catalog | `categories`, `brands`, `products`, `product_images`, `product_variants`, `units` |
| Inventory | `inventory_locations`, `inventory_balances`, `inventory_movements`, `stock_adjustments`, `stock_adjustment_items` |
| Procurement | `suppliers`, `purchases`, `purchase_items`, `supplier_payments`, `supplier_returns` |
| Sales and customers | `customers`, `sales`, `sale_items`, `sale_payments`, `customer_collections`, `customer_returns` |
| Online commerce | `carts`, `cart_items`, `addresses`, `orders`, `order_items`, `order_status_history`, `deliveries` |
| Finance | `expenses`, `expense_categories`, `cash_accounts`, `financial_transactions`, `payment_methods` |
| Operations | `notifications`, `audit_logs`, `app_settings`, `business_profile` |

Before generating the first migration, review and approve the ERD, naming convention, money model, inventory-location model, status enums, audit model, retention needs, and RLS policy matrix.

### Integrity rules

- A completed sale/order and its stock deduction must commit or fail together.
- Payment, collection, purchase, return, adjustment, and transfer flows must create traceable source records plus financial or inventory entries exactly once.
- Reports aggregate source transactions; reports must never create duplicate accounting entries.
- Every financial and stock-changing action needs an actor, timestamp, source document/reference, and audit record.
- Payment verification is server-side. A redirect or client success screen is never proof of payment.

## API contract direction

Workers expose JSON endpoints under `/api/v1`. Route handlers remain thin: validate input, verify token, authorize, call a service/RPC, then return a consistent error or success shape. Generate or share typed contracts between the web and Flutter clients where practical.

| Module | Initial endpoints / operations |
| --- | --- |
| Profile and permission | `GET /me`, `PATCH /me`, `GET /permissions` |
| Products | `GET /products`, `POST /products`, `PATCH /products/:id`, controlled image upload authorization |
| Inventory | `GET /inventory`, `POST /stock-adjustments`, `GET /inventory/movements` |
| Purchases | `POST /purchases`, `POST /purchases/:id/receive`, `POST /supplier-payments` |
| POS sales | `POST /sales`, `GET /sales/:id`, `POST /sales/:id/payments`, `POST /sales/:id/returns` |
| Customers | `GET /customers`, `POST /customers`, `GET /customers/:id/ledger` |
| Online orders | `POST /orders`, `GET /orders`, `PATCH /orders/:id/status` |
| Delivery | `POST /deliveries`, `PATCH /deliveries/:id/status` |
| Finance and reports | `GET /reports/sales`, `GET /reports/finance`, `GET /reports/inventory` |
| Notifications | `POST /notifications/register-device`, `POST /notifications/test` (admin only) |
| Payments | `POST /payments/sslcommerz/initiate`, `POST /payments/sslcommerz/callback` |

The full request/response schemas, validation errors, pagination, filtering, sorting, idempotency header, and authorization requirement must be approved before implementation of each endpoint group.

## Roles and access model

| Role | Intended access |
| --- | --- |
| Owner | Full business access, settings, finance, employees, roles, and reports. |
| Manager | Operational access constrained by owner-configured permissions. |
| Cashier | POS sales, customer lookup, and allowed payment collection only. |
| Inventory staff | Authorized catalog, receiving, stock, transfer, and adjustment work. |
| Delivery staff | Assigned deliveries and only the related order/customer details. |
| Customer | Only their own profile, addresses, cart, orders, payments, and support requests. |

Employee roles are assigned by an authorized owner/administrator; public sign-up must never select an employee role. The recommended onboarding model is invitation-only staff accounts and self-registration for customers.

## Environment and secret policy

Do not create or commit real environment files during review. When implementation starts, create a documented `.env.example` that contains placeholders only, and configure privileged values in Cloudflare Worker secrets.

| Variable / setting | Location | Rule |
| --- | --- | --- |
| `SUPABASE_URL` | Worker config; public client config only if required for Auth | Project URL, not a password. |
| `SUPABASE_ANON_KEY` or publishable key | Client config when required for Auth | Public key only; RLS remains mandatory. |
| `SUPABASE_SERVICE_ROLE_KEY` | Worker secret only, if needed | Never expose to a client. |
| Google OAuth client ID / secret | Supabase and Google Cloud configuration | Protect client secret and configure exact redirects. |
| R2 account ID / bucket name | Worker config | Identifiers only; bucket stays private by default. |
| R2 access key / secret | Worker secret | Never expose to a client. |
| FCM credentials | Worker secret or secure service identity | Use FCM HTTP v1; never ship a private key. |
| SSLCommerz store ID / password | Worker secret | Sandbox first, production credentials only after onboarding. |
| `APP_ORIGIN` / allowed CORS origins | Worker config | Allow known origins only. |

## Phased delivery plan

| Phase | Deliverables | Approval / acceptance gate |
| --- | --- | --- |
| 0. Accounts and environments | Cloudflare, Supabase, Firebase, Google OAuth; local and staging configuration plan | Secrets are safely located; intended environments can connect. |
| 1. Database foundation | ERD, migrations, constraints, indexes, seed data, RLS matrix, and test roles | Migrations are repeatable; unauthorized roles cannot read/write protected data. |
| 2. Authentication | Email/password, Google OAuth, verification, reset, profile creation, staff provisioning | Customer and employee sign-in work; role assignment is server-controlled. |
| 3. Worker API foundation | Routing, JWT validation, CORS, error format, logs, Supabase access | Valid protected requests succeed; invalid or unauthorized requests fail safely. |
| 4. POS integration | Products, customers, purchasing, stock, POS sales, payments | A test sale updates inventory and payment/due records atomically. |
| 5. Customer app integration | Catalog, search, cart, checkout, addresses, order history | Customers see live data and cannot reach staff-only records. |
| 6. Storage | R2 authorization, image validation, metadata, controlled delivery URLs | Authorized upload works; private assets cannot be overwritten/read without access. |
| 7. Notifications | FCM token registration and event-triggered messages | Test events reach only correct test devices. |
| 8. Payments | SSLCommerz sandbox initiation, callback validation, reconciliation, idempotency | Success, failure, cancel, timeout, duplicate callback, and mismatch cases reconcile correctly. |
| 9. QA and launch readiness | Security, concurrency, backup/restore, monitoring, production configuration | Critical flows pass, restoration is tested, domain and runbook are ready. |

## Test strategy

Every phase includes automated tests and a human acceptance checklist for:

- Authentication: registration, verification, login, Google sign-in, reset, expired token, and logout.
- Authorization: customer vs. POS, cashier vs. owner settings, delivery staff vs. unassigned orders, and RLS policy checks.
- Inventory: purchase receiving, POS sale, online order, return, adjustment, and concurrent-sale scenarios.
- Finance: partial payment, customer dues, supplier payables, collections, expenses, and report reconciliation.
- Payments: SSLCommerz success, failure, cancellation, timeout, invalid callback, duplicate callback, and amount mismatch.
- Notifications: intended recipient, denied permission, stale token, duplicate event, and preferences.
- Storage: unsupported type, oversized asset, private access, replacement, deletion, and unauthorized request.
- Reliability: API retries, network loss, database error, duplicate submission, recovery, backup, and restore.

## Decisions required before implementation

The following must be explicitly confirmed in review before Phase 0/1 begins:

1. Supabase region after measuring availability and latency from Bangladesh.
2. Production domain and subdomains, for example `pos.example.com` and `api.example.com`.
3. Staff onboarding model and secure first-owner provisioning process.
4. Inventory model: a single location first or multiple locations from day one.
5. Bangladesh tax/VAT, invoice, receipt, and reporting requirements.
6. SSLCommerz merchant onboarding, production callback URLs, and refund/settlement expectations.
7. Data retention, audit log access, backup frequency, restore objective, and production support expectations.
8. Which reports and finance rules need accountant review before launch.

## Immediate next task after approval

Do not build business features yet. The first reviewed implementation package should contain only:

1. Repository and UI integration assessment.
2. Infrastructure setup checklist for Cloudflare, Supabase, Firebase, and Google OAuth.
3. Placeholder-only `.env.example` and environment ownership documentation.
4. Initial ERD/schema proposal, RLS/permissions matrix, enum/status proposal, and migration convention.
5. Versioned API contract including response format, validation, authentication, authorization, pagination, errors, and idempotency behavior.
6. Phase 1 migration/test plan and rollback procedure.

Implementation begins only after that package is reviewed and approved.

## Deployment and cost posture

The project starts free-tier-first for development and controlled testing. Provider limits, pricing, regional availability, and feature eligibility must be checked immediately before each deployment decision. Free plans are not a substitute for production uptime, reliable backups, support, or financial-system safeguards.

Upgrade before production when database availability/backups, Worker capacity, Pages deployment needs, R2 usage, or business risk exceeds the selected free-tier guarantees. Review Cloudflare, Supabase, Firebase, and SSLCommerz documentation before production configuration.
