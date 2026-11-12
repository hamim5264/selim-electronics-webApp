SELIM ELECTRONICS — PROMPT 13 OF 22
CUSTOMER DUES & COLLECTIONS

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 13 OF 22.

This module is the CUSTOMER-SIDE counterpart to PROMPT 11 — Supplier Payables & Payments.

PROMPT 11:
Selim Electronics OWES suppliers.

PROMPT 13:
Customers OWE Selim Electronics.

Do NOT mix these two financial concepts.

This module connects directly to:
- Customers from PROMPT 12
- Sales from PROMPT 05
- POS from PROMPT 04
- Future Online Orders
- Customer payment history

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
Create one primary Customer Dues page, one Customer Statement view, and one Record Payment interaction. Only essential states.

==================================================
CORE BUSINESS PURPOSE
==================================================

Customer dues represent money owed TO Selim Electronics by customers.

A customer may:

- Pay fully
- Pay partially
- Purchase on credit
- Pay later
- Make multiple payments against an outstanding balance

The system must track:

- Original sale amount
- Amount paid
- Outstanding due
- Payment history
- Customer statement
- Due dates when applicable

==================================================
1. CUSTOMER DUES PAGE
==================================================

Create the primary Customer Dues page.

Page title:

"Customer Dues"

Supporting text:

"Track outstanding customer balances and collections."

Primary action:

"Record Payment"

Secondary action:

"Export"

==================================================
2. DUE SUMMARY
==================================================

Create compact metrics:

Total Outstanding
৳3,410,200

Due Customers
184

Collected This Month
৳1,280,000

Overdue
৳420,000

Use the existing KPI/card system.

Do not create a separate financial dashboard.

==================================================
3. CUSTOMER DUE TABLE
==================================================

Create the primary table.

Columns:

Customer
Total Purchases
Paid
Outstanding
Last Payment
Due Status
Actions

Example:

Rahim Electronics
৳1,850,000
৳1,837,700
৳12,300
4 Sep 2026
Outstanding

City Electric House
৳720,000
৳691,500
৳28,500
1 Sep 2026
Overdue

Nusrat Jahan
৳48,500
৳48,500
৳0
3 Sep 2026
Paid

Use ৳ / BDT.

==================================================
4. SEARCH
==================================================

Search:

"Search customers..."

Support:

- Customer name
- Phone
- Customer ID

Use existing search components.

==================================================
5. FILTERS
==================================================

Filters:

Status
Due Date
Customer Type

Statuses:

All
Outstanding
Paid
Overdue

Do not create separate pages.

==================================================
6. CUSTOMER STATEMENT
==================================================

Create ONE Customer Statement view.

Header:

Customer name
Customer ID
Phone
Current outstanding

Example:

Rahim Electronics
CUS-000284
01712 345678

Outstanding:
৳12,300

==================================================
7. STATEMENT HISTORY
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

29 Aug 2026
SE-20420
Sale
৳12,300
—
৳12,300

4 Sep 2026
PAY-C-0081
Payment
—
৳5,000
৳7,300

4 Sep 2026
SE-20483
Sale
৳8,450
—
৳15,750

4 Sep 2026
PAY-C-0082
Payment
—
৳3,450
৳12,300

This statement should make the balance traceable.

==================================================
8. RECORD CUSTOMER PAYMENT
==================================================

Create ONE reusable payment modal.

Title:

"Record customer payment"

Show:

Customer
Outstanding balance

Fields:

Payment amount
Payment method
Reference
Payment date
Notes

Methods:

Cash
Bank
bKash
Nagad
Other

Example:

Outstanding:
৳12,300

Payment:
৳5,000

Remaining:
৳7,300

Primary action:

"Record Payment"

==================================================
9. PAYMENT VALIDATION
==================================================

If the payment exceeds the outstanding balance, show:

"Payment exceeds outstanding due."

Keep the error state subtle.

==================================================
10. PAYMENT SUCCESS
==================================================

Create one compact success state.

Example:

"Payment recorded"

Customer:
Rahim Electronics

Received:
৳5,000

Remaining due:
৳7,300

Actions:

"View Statement"
"Done"

==================================================
11. OVERDUE
==================================================

Create one overdue example.

Example:

Customer:
City Electric House

Outstanding:
৳28,500

Due date:
31 Aug 2026

Status:
Overdue

Use existing semantic styling.

Do not make the interface aggressively red.

==================================================
12. DUE SALE CONNECTION
==================================================

Customer dues originate from transactions such as:

POS sale
→ customer pays partially
→ remaining amount becomes due

Example:

Sale:
৳20,000

Paid:
৳12,000

Due:
৳8,000

The original sale must remain unchanged.

Later payment reduces the customer balance.

==================================================
13. ONLINE ORDER CONNECTION
==================================================

Future online orders may have payment statuses such as:

Paid
Partially Paid
Due

If an order legitimately creates a customer balance, it should appear in the customer's financial history.

Do not design the online order interface yet.

==================================================
14. CUSTOMER STATEMENT
==================================================

The statement should provide an auditable financial history.

A customer balance should be explainable by:

Sales
minus
Payments
plus/minus applicable adjustments

Do not create accounting logic in the UI.

Only communicate a clear transaction history.

==================================================
15. PAYMENT HISTORY
==================================================

Show recent payments.

Columns:

Date
Reference
Amount
Method
Recorded By

Example:

4 Sep 2026
PAY-C-0081
৳5,000
Cash
MD. SELIM

==================================================
16. FULLY PAID STATE
==================================================

Show how a customer with no outstanding balance appears:

Outstanding:
৳0

Status:
Paid

Use existing badge styles.

==================================================
17. EMPTY STATE
==================================================

Create one empty state:

"No outstanding customer dues"

Supporting text:

"All customer balances are currently settled."

Keep it minimal.

==================================================
18. DATA INTEGRITY
==================================================

Historical sales must never be modified when payments are recorded.

Example:

Original sale:
৳20,000

Payment 1:
৳5,000

Payment 2:
৳7,000

Remaining:
৳8,000

The original sale remains:
৳20,000

Payments are separate financial records.

==================================================
19. CUSTOMER RELATIONSHIP
==================================================

Every customer due record should connect to:

Customer
Sale / Order
Payment
Current balance

This should eventually allow the business owner to answer:

"Why does this customer owe us ৳12,300?"

The statement should provide the answer.

==================================================
20. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Payment examples:

Cash
Bank
bKash
Nagad

Do not introduce:

USD
EUR
International payment gateways
International currencies

SSLCommerz will be used for online customer checkout in a future module and should NOT be designed here.

==================================================
21. VISUAL DIRECTION
==================================================

Maintain the Selim Electronics visual identity:

Premium
Minimal
Precise
Professional
Black and white
Neutral gray

Financial information should feel calm and trustworthy.

Avoid:
- Bright colorful accounting dashboards
- Giant charts
- Excessive red
- Decorative illustrations
- Heavy shadows
- Generic accounting software styling

==================================================
22. OUTPUT LIMIT
==================================================

Generate only:

1. Customer Dues list
2. Customer Statement
3. Record Payment modal
4. Payment success state
5. Overdue example
6. One empty state

Reuse existing components.

Do NOT generate:
- Supplier Payables redesign
- Customers redesign
- Finance dashboard
- Online Orders
- Delivery
- Products
- Inventory
- Purchases
- POS
- Sales
- Reports
- Employees
- Settings

Those are future prompts.

This is PROMPT 13 OF 22.

The core relationship must be visually clear:

SALE / ORDER
→ CUSTOMER DUE
→ CUSTOMER PAYMENT
→ UPDATED BALANCE