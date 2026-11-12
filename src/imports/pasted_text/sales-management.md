SELIM ELECTRONICS — PROMPT 05 OF 22
SALES MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 05 OF 22.

This module must directly follow the POS / New Sale experience created in PROMPT 04.

Do NOT redesign the design system.

Reuse exactly the established:
- Typography
- Black/white palette
- Neutral grays
- Sidebar
- Header
- Tables
- Buttons
- Inputs
- Badges
- Modals
- Icons
- Spacing
- Radius
- Borders

Keep the generation CREDIT-EFFICIENT.

Create one primary Sales Management page, one detailed Sale/Invoice view, and only essential states. Avoid generating multiple duplicate screens.

==================================================
CORE PURPOSE
==================================================

The Sales Management module allows authorized Selim Electronics staff to:

- View all completed sales
- Search sales
- Filter sales
- Open sale details
- View invoices
- View payments
- View customer information
- Track due amounts
- Process returns
- Process refunds
- Handle exchanges
- Review sale history

The sales shown here are created through the POS workflow from PROMPT 04.

==================================================
1. SALES PAGE HEADER
==================================================

Use the existing application shell.

Page title:

"Sales"

Supporting text:

"View and manage completed sales."

Primary action:

"New Sale"

This action should visually connect to the POS created in PROMPT 04.

Do not add unnecessary actions.

==================================================
2. SALES SUMMARY
==================================================

Create a compact summary area with 4 metrics:

Today's Sales
৳284,500

Transactions
47

Paid
৳256,000

Due
৳28,500

Use the established KPI/card style.

Keep the cards compact.

Do not create a large analytics dashboard here.

==================================================
3. SALES FILTER BAR
==================================================

Create a clean filtering/search area.

Include:

Search sales...

Search should support:

- Invoice number
- Customer
- Phone
- Product

Filters:

Date
Payment method
Status
Customer
Cashier
Store

Optional quick date filters:

Today
Yesterday
7 days
30 days

Use the existing filter components.

Keep the filter area compact and professional.

==================================================
4. SALES TABLE
==================================================

Create the primary sales data table.

Columns:

Invoice
Customer
Items
Total
Paid
Due
Payment
Cashier
Date/Time
Status
Actions

Example:

#SE-20483
Walk-in Customer
3 items
৳8,450
৳8,450
৳0
Cash
MD. SELIM
11:42 AM
Paid

#SE-20482
Rahim Electronics
5 items
৳12,300
৳12,300
৳0
bKash
Mahbub
10:58 AM
Paid

#SE-20481
City Electric House
8 items
৳28,500
৳20,000
৳8,500
Due
MD. SELIM
09:45 AM
Due

Use realistic Bangladesh business examples.

Use ৳ / BDT.

==================================================
5. TABLE ACTIONS
==================================================

Each sale can have an action menu.

Actions:

View sale
View invoice
Print invoice
Send invoice
Record payment
Return items

Do not show every action as a large button.

Use a compact overflow menu.

==================================================
6. SALE DETAILS
==================================================

Create ONE detailed Sale Details page/view.

When a sale from the table is opened, show:

Invoice number
Sale date/time
Cashier
Store
Customer
Payment status

Example:

Invoice #SE-20483
4 September 2026, 11:42 AM
Cashier: MD. SELIM
Store: Main Store

Customer:
Walk-in Customer

==================================================
7. SALE ITEMS
==================================================

Show the purchased items.

Columns:

Product
SKU
Qty
Unit Price
Discount
Total

Example:

Philips LED Bulb 12W
PHI-LED-12W
3
৳150
৳0
৳450

Walton Ceiling Fan 56"
WAL-FAN-56
1
৳4,800
৳200
৳4,600

Keep the table clean.

==================================================
8. SALE TOTALS
==================================================

Show:

Subtotal
Discount
Grand Total
Paid
Due

Example:

Subtotal        ৳5,250
Discount         -৳250
────────────────────
Grand Total     ৳5,000

Paid            ৳3,000
Due             ৳2,000

Make Grand Total visually dominant.

==================================================
9. PAYMENT HISTORY
==================================================

Show payment records related to the sale.

Example:

Cash
৳3,000
4 Sep 2026 · 11:42 AM

bKash
৳2,000
4 Sep 2026 · 11:43 AM

If the sale is partially paid, clearly show the remaining due.

Allow:

"Record payment"

Do not design the complete finance system here.

==================================================
10. CUSTOMER INFORMATION
==================================================

Show compact customer information:

Name
Phone
Address if available
Outstanding due

For walk-in customer:

"Walk-in Customer"

Do not create a full customer profile page here.

==================================================
11. INVOICE PREVIEW
==================================================

Create ONE invoice preview state.

The invoice should feel professional and printable.

Include:

SELIM ELECTRONICS

Invoice number
Date
Customer
Items
Subtotal
Discount
Total
Payment
Due

Footer:

"Thank you for shopping with Selim Electronics."

Use a clean black-and-white invoice design.

Do not create a full print document system.

==================================================
12. SALES RETURN
==================================================

Create ONE return interaction.

From a completed sale, authorized staff can select:

"Return items"

Show the original sale items with selectable quantities.

Example:

Philips LED Bulb 12W
Purchased: 3
Return: [ 1 ]

Walton Ceiling Fan 56"
Purchased: 1
Return: [ 0 ]

Show:

Return subtotal
Refund amount
Return reason

Reasons:

Damaged
Customer request
Wrong item
Other

Do not create a complex returns management system in this prompt.

==================================================
13. REFUND
==================================================

After selecting return items, show a compact refund summary.

Example:

Return value
৳150

Refund method:

Original payment
Cash
bKash
Nagad
Card

Primary action:

"Confirm return"

Keep the modal clean.

==================================================
14. EXCHANGE
==================================================

Provide a lightweight exchange option.

Concept:

Original item returned
→ New product selected
→ Difference calculated

Example:

Returned:
Vision Table Fan
৳2,450

Replacement:
Walton Table Fan
৳2,900

Difference:
৳450 payable

Do not create a separate exchange module.

==================================================
15. DUE PAYMENT
==================================================

For a sale with outstanding due, show:

Original total
Paid
Remaining due

Action:

"Record payment"

After payment:

Paid amount
Remaining due
Payment method
Reference if applicable

Keep this interaction compact.

==================================================
16. SALES STATUS
==================================================

Support statuses:

Paid
Partially Paid
Due
Returned
Partially Returned
Refunded
Cancelled

Use the existing badge system from PROMPT 01.

Do not introduce new visual styles.

==================================================
17. EMPTY STATE
==================================================

Create one sales-empty state.

Example:

"No sales found"

Supporting text:

"Try changing your filters or create a new sale."

Action:

"New Sale"

Do not create a separate illustration.

==================================================
18. LOADING STATE
==================================================

Use the existing loading/skeleton system.

Do not create a new loading design.

==================================================
19. FILTERED RESULTS STATE
==================================================

Show a compact filtered-results example.

Example:

"47 sales"

"Filtered by: Today · Main Store · Cash"

Allow filters to be cleared.

==================================================
20. SALES INFORMATION HIERARCHY
==================================================

Prioritize:

1. Invoice
2. Customer
3. Total
4. Paid/Due
5. Payment status
6. Date
7. Actions

Do not overload the table.

The sales list must remain readable even when thousands of sales exist.

==================================================
21. PERFORMANCE / SCALE DIRECTION
==================================================

Selim Electronics will eventually have a large number of sales records.

The UI must therefore support:

- Pagination
- Search
- Filtering
- Sorting
- Date range
- Server-side data loading concept

Do not visually display thousands of rows.

Show a realistic paginated table.

==================================================
22. CONNECTION TO OTHER MODULES
==================================================

This Sales module connects directly to:

POS:
POS creates the sale.

Products:
Sale items reference products.

Inventory:
Completed sales reduce inventory.

Customers:
Customer purchase history is updated.

Payments:
Payments are recorded against the sale.

Finance:
Sales contribute to revenue and financial reporting.

Returns:
Returned products can affect inventory and refunds.

Future prompts will design these modules in detail.

Do not generate those modules now.

==================================================
23. BANGLADESH CONTEXT
==================================================

This system is only for Bangladesh.

Use:

৳ / BDT

Payment examples:

Cash
bKash
Nagad
Card
Bank
Due

Do not include:

USD
EUR
International payment gateways
International tax systems

SSLCommerz is reserved for the online customer checkout/payment experience in a future prompt.

==================================================
24. VISUAL DIRECTION
==================================================

Maintain the established Selim Electronics aesthetic:

Premium
Minimal
Black and white
Neutral gray
Precise
Professional
Enterprise-grade

Tables should be information-dense but elegant.

Avoid:

- Rainbow tables
- Large colorful cards
- Excessive gradients
- Heavy shadows
- Huge rounded containers
- Decorative illustrations
- Generic CRM aesthetics

==================================================
25. OUTPUT LIMIT
==================================================

Generate only:

1. Primary Sales Management page
2. One Sale Details view
3. One Invoice preview
4. One Return/Refund interaction
5. One Due Payment interaction
6. One empty/filtered state where useful

Keep the number of frames limited.

Reuse existing components.

Do NOT generate:
- POS redesign
- Product management
- Inventory management
- Customer management
- Supplier management
- Finance dashboard
- Reports
- Online orders
- Delivery
- Employees
- Settings

Those are future prompts.

This is PROMPT 05 OF 22.

The result must look like a natural continuation of PROMPTS 01–04.

POS creates the sales.
This module manages those sales.

Do not break the existing design system.