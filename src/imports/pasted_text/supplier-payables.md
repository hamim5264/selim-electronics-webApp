SELIM ELECTRONICS — PROMPT 11 OF 22
SUPPLIER PAYABLES & PAYMENTS

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 11 OF 22.

Previous modules:
01 — Design System + Application Shell
02 — Authentication
03 — Dashboard
04 — POS
05 — Sales
06 — Products
07 — Categories & Brands
08 — Inventory
09 — Suppliers / Dealers
10 — Purchases

This prompt extends the financial relationship created by PROMPTS 09 and 10.

DO NOT redesign the existing visual system.

Reuse exactly:
- Typography
- Black/white visual language
- Neutral grays
- Sidebar
- Header
- Buttons
- Inputs
- Tables
- Badges
- Modals
- Icons
- Spacing
- Borders
- Radius

CREDIT-EFFICIENCY RULE:
Create one primary Payables page, one Supplier Account/Statement view, and only essential payment interactions. Reuse existing components. Do not generate duplicate concepts.

==================================================
CORE BUSINESS PURPOSE
==================================================

Selim Electronics buys products from many dealers and suppliers.

When a purchase is made, the business may:

- Pay immediately
- Pay partially
- Pay later

The system must track supplier money separately from customer money.

This module manages:

- Supplier payables
- Amount paid
- Outstanding amount
- Payment history
- Supplier statements
- Purchase-linked payments

IMPORTANT:

Supplier payable is money Selim Electronics OWES to suppliers.

It is NOT customer due.

==================================================
1. PAYABLES PAGE
==================================================

Create the primary Payables page.

Page title:

"Supplier Payables"

Supporting text:

"Track outstanding supplier balances and payments."

Primary action:

"Record Payment"

Secondary action:

"Export"

==================================================
2. PAYABLE SUMMARY
==================================================

Create compact summary metrics:

Total Payables
৳2,710,000

Due This Month
৳850,000

Paid This Month
৳4,120,000

Overdue
৳320,000

Use the existing compact KPI style.

Do not create a financial dashboard.

==================================================
3. SUPPLIER PAYABLE TABLE
==================================================

Create the primary table.

Columns:

Supplier
Total Purchases
Paid
Outstanding
Last Payment
Due Status
Actions

Example:

Walton Distributor — Dhaka
৳1,850,000
৳1,600,000
৳250,000
2 Sep 2026
Outstanding

Philips Bangladesh Distributor
৳920,000
৳920,000
৳0
28 Aug 2026
Paid

Vision Distributor
৳680,000
৳500,000
৳180,000
1 Sep 2026
Outstanding

Use ৳ / BDT.

==================================================
4. SEARCH
==================================================

Search:

"Search suppliers..."

Support:

- Supplier name
- Company
- Phone

Use existing search component.

==================================================
5. FILTERS
==================================================

Create compact filters:

Status
Due Date
Supplier

Statuses:

All
Outstanding
Paid
Overdue

Do not create separate pages for these statuses.

==================================================
6. SUPPLIER ACCOUNT / STATEMENT
==================================================

Create ONE detailed supplier account view.

Header:

Supplier name
Status
Contact

Example:

Walton Distributor — Dhaka

Show financial summary:

Total Purchases
৳1,850,000

Total Paid
৳1,600,000

Outstanding
৳250,000

==================================================
7. ACCOUNT STATEMENT
==================================================

Create a transaction history.

Columns:

Date
Reference
Type
Debit
Credit
Balance

Example:

4 Sep 2026
PO-2048
Purchase
৳450,000
—
৳450,000

4 Sep 2026
PAY-0091
Payment
—
৳300,000
৳150,000

2 Sep 2026
PAY-0082
Payment
—
৳100,000
৳50,000

Use clear financial terminology.

The statement should make the supplier balance understandable.

==================================================
8. PURCHASE CONNECTION
==================================================

Each purchase should link back to its purchase record.

Example:

PO-2048
Purchase
৳450,000

Clicking it conceptually opens the Purchase Details created in PROMPT 10.

Do not redesign Purchase Details.

==================================================
9. RECORD PAYMENT
==================================================

Create ONE reusable payment modal.

Title:

"Record supplier payment"

Show:

Supplier
Outstanding balance

Fields:

Payment amount
Payment method
Reference
Payment date
Notes

Payment methods:

Cash
Bank
bKash
Nagad
Other

Example:

Outstanding:
৳250,000

Payment:
৳100,000

Remaining:
৳150,000

Primary action:

"Record Payment"

==================================================
10. PAYMENT VALIDATION
==================================================

If payment exceeds outstanding balance, show a compact validation state.

Example:

"Payment exceeds outstanding balance."

Do not allow the interface to imply an invalid balance.

==================================================
11. PAYMENT HISTORY
==================================================

Show recent payments.

Columns:

Date
Reference
Amount
Method
Recorded By

Example:

2 Sep 2026
PAY-0082
৳100,000
Bank
MD. SELIM

==================================================
12. OVERDUE STATE
==================================================

Create one compact overdue example.

Example:

Outstanding:
৳320,000

Due date:
31 Aug 2026

Status:
Overdue

Use the existing subtle semantic warning/error styling.

Do not use aggressive red-heavy design.

==================================================
13. PAID SUPPLIER
==================================================

Show how a fully settled supplier appears:

Outstanding:
৳0

Status:
Paid

Do not create another screen.

Use the existing badge component.

==================================================
14. PAYMENT SUCCESS
==================================================

Create one compact success state:

"Payment recorded"

Supplier:
Walton Distributor — Dhaka

Amount:
৳100,000

Remaining:
৳150,000

Actions:

"View Statement"
"Done"

==================================================
15. EMPTY STATE
==================================================

Create one empty state:

"No outstanding supplier payments"

Supporting text:

"All supplier balances are currently settled."

Keep it minimal.

==================================================
16. DATA INTEGRITY
==================================================

Supplier payments must be linked to actual purchases or supplier accounts.

Historical purchase values must remain unchanged.

Example:

Purchase:
৳450,000

Payment:
৳300,000

Outstanding:
৳150,000

A later payment reduces the balance but does not modify the original purchase amount.

==================================================
17. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Payment examples:

Cash
Bank
bKash
Nagad

Do not introduce international currencies or international payment systems.

==================================================
18. VISUAL DIRECTION
==================================================

Maintain the established Selim Electronics identity:

Premium
Minimal
Precise
Professional
Black and white
Neutral gray

This should feel like a serious business accounting interface.

Avoid:
- Colorful accounting dashboards
- Excessive charts
- Giant financial cards
- Decorative illustrations
- Heavy shadows
- Generic accounting templates

==================================================
19. OUTPUT LIMIT
==================================================

Generate only:

1. Supplier Payables list
2. Supplier Account / Statement
3. Record Payment modal
4. Payment success state
5. Overdue example
6. One empty state

Reuse existing components.

Do NOT generate:
- Customer dues
- Customer management
- Finance dashboard
- Purchases redesign
- Suppliers redesign
- Sales
- POS
- Inventory
- Orders
- Delivery
- Reports

Those are separate prompts.

This is PROMPT 11 OF 22.

The module must connect directly to Suppliers and Purchases.

Core relationship:

PURCHASE
→ SUPPLIER PAYABLE
→ PAYMENT
→ UPDATED BALANCE