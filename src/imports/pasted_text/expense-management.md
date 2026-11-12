SELIM ELECTRONICS — PROMPT 16 OF 22
EXPENSE MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 16 OF 22.

Previous modules:
01–15 are already established.

This module introduces operational business expenses.

IMPORTANT BUSINESS DISTINCTION:

PURCHASES
= products purchased for inventory/resale.

EXPENSES
= operating costs of running Selim Electronics.

Do NOT mix Purchase and Expense records.

DO NOT redesign the existing design system.

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
Create one primary Expenses page, one Add Expense interaction, and one Expense Details view. Reuse existing components.

==================================================
1. EXPENSES PAGE
==================================================

Create the main Expenses page.

Page title:

"Expenses"

Supporting text:

"Track operating costs and business expenses."

Primary action:

"+ Add Expense"

Secondary:

"Export"

==================================================
2. EXPENSE SUMMARY
==================================================

Create compact metrics:

This Month
৳248,500

Today
৳12,800

Unpaid
৳35,000

Largest Category
Rent

Use existing KPI styling.

==================================================
3. EXPENSE SEARCH
==================================================

Search:

"Search expenses by description, category or reference..."

Support:

Description
Category
Reference
Payee

==================================================
4. EXPENSE FILTERS
==================================================

Filters:

Date
Category
Payment Method
Status
Store

Statuses:

Paid
Unpaid
Partially Paid

==================================================
5. EXPENSE TABLE
==================================================

Create the primary expense table.

Columns:

Expense
Category
Payee
Amount
Payment
Status
Date
Recorded By
Actions

Examples:

Shop Rent
Rent
Building Owner
৳80,000
Bank
Paid
1 Sep 2026
MD. SELIM

Electricity Bill
Utilities
DESCO
৳18,500
bKash
Paid
2 Sep 2026
MD. SELIM

Delivery Fuel
Delivery
Rahim
৳4,800
Cash
Paid
4 Sep 2026
Mahbub

Use ৳ / BDT.

==================================================
6. EXPENSE CATEGORIES
==================================================

Use practical categories:

Rent
Utilities
Salaries
Delivery
Transport
Maintenance
Packaging
Marketing
Internet
Office
Other

Do not create a complicated accounting chart.

==================================================
7. ADD EXPENSE
==================================================

Create ONE reusable Add/Edit Expense form or modal.

Fields:

Expense Title
Category
Amount
Payee
Payment Method
Expense Date
Reference
Notes

Payment methods:

Cash
Bank
bKash
Nagad
Other

Primary action:

"Save Expense"

==================================================
8. EXPENSE DETAILS
==================================================

Create ONE Expense Details view.

Show:

Expense title
Category
Amount
Date
Payee
Payment method
Reference
Status
Notes
Recorded by

Example:

Electricity Bill

Category:
Utilities

Amount:
৳18,500

Payee:
DESCO

Payment:
bKash

Date:
2 Sep 2026

Reference:
EXP-00982

Status:
Paid

==================================================
9. PARTIAL PAYMENT
==================================================

Support:

Expense Amount
Paid
Outstanding

Example:

Expense:
৳35,000

Paid:
৳20,000

Outstanding:
৳15,000

Status:

Partially Paid

Keep the interaction simple.

==================================================
10. RECORD EXPENSE PAYMENT
==================================================

Create ONE compact interaction.

Fields:

Payment amount
Payment method
Reference
Date
Notes

Primary:

"Record Payment"

Do not create a separate finance system.

==================================================
11. EXPENSE STATUS
==================================================

Statuses:

Paid
Unpaid
Partially Paid

Use existing badges.

==================================================
12. DELETE / VOID
==================================================

Create one confirmation modal.

Title:

"Remove expense?"

Message:

"This expense record will no longer be included in expense totals."

Actions:

Cancel
Remove Expense

Use careful wording.

Do not imply that accounting history is physically erased if the eventual backend uses soft deletion.

==================================================
13. EXPENSE REPORTING CONNECTION
==================================================

Expenses will later contribute to:

Total Expenses
Net Profit
Financial Reports

Do not create the Finance dashboard yet.

Simply make the relationship clear through labels and totals.

==================================================
14. EXPENSE VS PURCHASE
==================================================

Do not mix these concepts.

Example Purchase:

Walton Ceiling Fan
20 units
৳86,000

This enters Inventory.

Example Expense:

Shop Electricity
৳18,500

This does NOT enter Inventory.

The UI should make this distinction intuitive.

==================================================
15. EXPENSE RECEIPT / REFERENCE
==================================================

Allow:

Reference

Example:

DESCO-SEP-2026

Optionally show:

"Attachment"

but do not build a full document-management interface.

==================================================
16. EXPENSE DATE
==================================================

Allow selecting the actual expense date.

Support historical expense entry.

Use Bangladesh date formatting consistently with the existing application.

==================================================
17. STORE / LOCATION
==================================================

If multiple stores are supported in the future, expenses may be associated with a store.

Show:

Store:
Main Store

Do not create multi-store management yet.

==================================================
18. EMPTY STATE
==================================================

Create one empty state:

"No expenses recorded"

Supporting text:

"Add an expense to start tracking business operating costs."

Primary action:

"Add Expense"

==================================================
19. LOADING STATE
==================================================

Reuse the existing loading/skeleton components.

Do not create a new loading design.

==================================================
20. SCALE
==================================================

Support:

Search
Filters
Sorting
Pagination
Date range

Do not show hundreds of records.

==================================================
21. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Payment methods:

Cash
Bank
bKash
Nagad
Other

Use realistic Bangladesh examples.

Do not introduce international currencies.

==================================================
22. VISUAL DIRECTION
==================================================

Maintain:

Premium
Minimal
Professional
Black and white
Neutral gray
Information-dense

Expenses should feel trustworthy and operational.

Avoid:
- Colorful accounting dashboards
- Giant charts
- Decorative illustrations
- Excessive financial widgets
- Generic bookkeeping templates

==================================================
23. OUTPUT LIMIT
==================================================

Generate only:

1. Expenses list
2. Add/Edit Expense interaction
3. Expense Details
4. Record Payment interaction
5. Partially Paid example
6. Remove confirmation
7. One empty state

Reuse existing components.

Do NOT generate:
- Finance dashboard
- Reports
- Supplier Payables redesign
- Customer Dues redesign
- Purchases redesign
- Products
- Inventory
- POS
- Orders
- Delivery
- Employees
- Settings

Those are future prompts.

This is PROMPT 16 OF 22.

The core distinction must remain:

PURCHASE
→ INVENTORY

EXPENSE
→ OPERATING COST
→ FINANCIAL REPORTING