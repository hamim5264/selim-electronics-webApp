SELIM ELECTRONICS — PROMPT 10 OF 22
PURCHASES / PROCUREMENT MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 10 OF 22.

This module must directly connect to:

PROMPT 06 — Products
PROMPT 08 — Inventory
PROMPT 09 — Suppliers / Dealers

It represents the purchasing workflow:

SUPPLIER
→ PURCHASE
→ PURCHASE ITEMS
→ RECEIVE STOCK
→ INVENTORY INCREASE
→ SUPPLIER PAYABLE

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
Create one primary Purchases list, one Add Purchase workflow, one Purchase Details view, and only essential states. Do not create duplicate purchase concepts.

==================================================
CORE BUSINESS PURPOSE
==================================================

Selim Electronics buys products from many suppliers/dealers.

A purchase record must preserve:

- Supplier
- Purchase reference
- Purchase date
- Products
- Quantities
- Unit purchase cost
- Discounts
- Additional charges if applicable
- Total purchase value
- Amount paid
- Outstanding payable
- Receiving status
- Payment status

Most importantly:

Historical purchase prices must NEVER be overwritten when a product is purchased again at a different price.

Example:

4 Aug:
Walton Fan
10 units
৳4,000 each

4 Sep:
Walton Fan
20 units
৳4,300 each

Both purchase prices must remain historically accurate.

==================================================
1. PURCHASES PAGE
==================================================

Create the primary Purchases page.

Page title:

"Purchases"

Supporting text:

"Track purchases, stock receiving and supplier payables."

Primary action:

"+ New Purchase"

==================================================
2. PURCHASE SUMMARY
==================================================

Create compact summary metrics:

Purchases This Month
৳4,850,000

Pending Receiving
6

Paid
৳4,120,000

Outstanding
৳730,000

Use existing KPI styling.

==================================================
3. PURCHASE SEARCH
==================================================

Search:

"Search purchases by purchase number, supplier or product..."

Support:

- Purchase number
- Supplier
- Product
- Reference

==================================================
4. PURCHASE FILTERS
==================================================

Filters:

Date
Supplier
Receiving Status
Payment Status
Store

Receiving statuses:

Draft
Ordered
Partially Received
Received
Cancelled

Payment statuses:

Unpaid
Partially Paid
Paid

Use existing badge components.

==================================================
5. PURCHASE TABLE
==================================================

Create the main purchase table.

Columns:

Purchase
Supplier
Items
Total
Paid
Outstanding
Receiving
Payment
Date
Actions

Example:

PO-2048
Walton Distributor — Dhaka
24 items
৳450,000
৳400,000
৳50,000
Received
Partially Paid
4 Sep 2026

PO-2047
Philips Bangladesh Distributor
12 items
৳180,000
৳180,000
৳0
Received
Paid
3 Sep 2026

PO-2046
Vision Distributor
18 items
৳320,000
৳0
৳320,000
Partially Received
Unpaid
1 Sep 2026

Use ৳ / BDT.

==================================================
6. NEW PURCHASE WORKFLOW
==================================================

Create ONE primary New Purchase screen.

Page title:

"New Purchase"

Supporting text:

"Record products purchased from a supplier."

The workflow should be clear and efficient.

==================================================
7. SUPPLIER SELECTION
==================================================

At the top:

Supplier

Search/select supplier.

Example:

Walton Distributor — Dhaka

Show compact supplier information:

Contact
Phone
Outstanding payable

Allow:

"+ Add Supplier"

This connects to PROMPT 09.

==================================================
8. PURCHASE INFORMATION
==================================================

Fields:

Purchase Reference
Purchase Date
Store / Location
Expected Receiving Date
Notes

Purchase Reference example:

PO-2049

Allow automatic reference generation.

==================================================
9. PURCHASE ITEMS
==================================================

Create the main purchase-item table.

Columns:

Product
SKU
Quantity
Unit Cost
Discount
Total
Actions

Example:

Walton Ceiling Fan 56"
WAL-FAN-56
20
৳4,300
৳0
৳86,000

Philips LED Bulb 12W
PHI-LED-12W
100
৳100
৳500
৳9,500

The interface must make it easy to add many products.

Primary action:

"+ Add Product"

==================================================
10. PRODUCT SEARCH IN PURCHASE
==================================================

Search:

"Search products..."

Allow:

- Name
- SKU
- Barcode

When selecting a product, show:

Product
Current stock
Last purchase price
New unit cost

Example:

Walton Ceiling Fan 56"

Current stock:
18

Last purchase:
৳4,200

New purchase cost:
৳4,300

This helps staff enter accurate purchase costs.

==================================================
11. PURCHASE COST
==================================================

Each purchase item must have its own unit cost.

Do NOT use only one global product cost.

Example:

Product A
Quantity: 20
Unit Cost: ৳4,300

Product B
Quantity: 100
Unit Cost: ৳100

The purchase record preserves these exact values.

==================================================
12. PURCHASE TOTALS
==================================================

Show:

Subtotal
Discount
Additional charges
Grand Total

Example:

Subtotal:
৳95,500

Discount:
-৳500

Additional charges:
৳0

Grand Total:
৳95,000

Keep this visually consistent with POS totals.

==================================================
13. RECEIVING STOCK
==================================================

Create receiving controls.

A purchase may be:

Draft
Ordered
Partially Received
Received

For a received purchase, show received quantity per item.

Example:

Walton Ceiling Fan 56"
Ordered: 20
Received: 20

Philips LED Bulb 12W
Ordered: 100
Received: 70

If partially received:

Status:
Partially Received

Remaining:
30

==================================================
14. RECEIVE PURCHASE
==================================================

Create ONE compact receiving interaction.

Show:

Purchase
Supplier
Items
Ordered quantity
Previously received
Receive now
Remaining

Primary action:

"Confirm Receiving"

When receiving is confirmed:

Inventory increases by the received quantity.

Do not show backend logic.

Only communicate the relationship through the UI.

==================================================
15. INVENTORY CONNECTION
==================================================

Make the relationship clear:

Purchase Received
↓
Inventory increases

Example:

PO-2048 received

Walton Ceiling Fan
+20 units

Philips LED Bulb
+100 units

This must connect visually with the Inventory movement history created in PROMPT 08.

==================================================
16. SUPPLIER PAYABLE
==================================================

After creating a purchase, show:

Purchase Total
Paid
Outstanding

Example:

Purchase:
৳450,000

Paid:
৳400,000

Outstanding:
৳50,000

The outstanding amount becomes supplier payable.

Use the existing financial styling.

==================================================
17. PURCHASE PAYMENT
==================================================

Create ONE compact payment interaction.

Fields:

Amount
Payment Method
Reference
Date
Notes

Payment methods:

Cash
Bank
bKash
Nagad
Other

Primary action:

"Record Payment"

Do not create a full finance system here.

==================================================
18. PURCHASE DETAILS
==================================================

Create ONE Purchase Details view.

Show:

Purchase number
Supplier
Date
Store
Receiving status
Payment status

Then:

Purchase items
Quantities
Unit costs
Discounts
Totals

Then:

Payment summary
Payment history

Then:

Receiving history

Keep the page structured and easy to audit.

==================================================
19. PURCHASE HISTORY
==================================================

Within Purchase Details, show payment records.

Example:

2 Sep 2026
PAY-0082
Bank
৳100,000

4 Sep 2026
PAY-0091
Cash
৳300,000

Remaining:
৳50,000

==================================================
20. RECEIVING HISTORY
==================================================

Show:

Date
Received by
Items
Quantity

Example:

4 Sep 2026
MD. SELIM
Walton Fan
20 units

4 Sep 2026
MD. SELIM
Philips LED Bulb
100 units

This creates an audit-friendly purchase experience.

==================================================
21. PURCHASE STATUS
==================================================

Receiving:

Draft
Ordered
Partially Received
Received
Cancelled

Payment:

Unpaid
Partially Paid
Paid

Do not combine receiving and payment into one status.

A purchase can be:

Received + Partially Paid

or:

Partially Received + Unpaid

This distinction is important.

==================================================
22. CANCEL PURCHASE
==================================================

Create ONE cancellation confirmation.

Title:

"Cancel purchase?"

Message:

"This purchase will be marked as cancelled. Received stock and historical records will remain traceable."

Actions:

Cancel
Cancel Purchase

Do not imply that historical inventory movements disappear.

==================================================
23. EMPTY STATE
==================================================

Create one empty state:

"No purchases yet"

Supporting text:

"Record your first purchase from a supplier to begin tracking procurement."

Primary action:

"New Purchase"

==================================================
24. SCALE
==================================================

The business may eventually have thousands of purchase records.

Support:

- Search
- Filtering
- Sorting
- Pagination
- Date ranges

Do not display huge amounts of data in the design.

==================================================
25. BANGLADESH CONTEXT
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
International suppliers
International tax systems
International payment gateways

SSLCommerz is for the future online customer checkout flow, not supplier purchases.

==================================================
26. VISUAL DIRECTION
==================================================

Maintain the existing Selim Electronics identity:

Premium
Minimal
Precise
Professional
Information-dense
Black and white
Neutral gray

Purchases should feel like a serious procurement/accounting system.

Avoid:

- Colorful procurement dashboards
- Excessive charts
- Giant cards
- Decorative illustrations
- Heavy shadows
- Generic ERP templates

==================================================
27. DATA INTEGRITY CONCEPT
==================================================

The UI must communicate that:

A purchase records the actual historical purchase price.

Example:

Product:
Walton Ceiling Fan 56"

Purchase on 4 Aug:
৳4,000

Purchase on 4 Sep:
৳4,300

Both historical records remain unchanged.

The Product module may display a current/latest cost, but the original purchase records retain their original values.

Do not overwrite historical transaction values.

==================================================
28. MODULE CONNECTION
==================================================

The final workflow is:

Supplier
↓
New Purchase
↓
Purchase Items
↓
Receive Purchase
↓
Inventory increases
↓
Supplier Payable created
↓
Supplier Payment
↓
Purchase becomes Paid

Products come from the Products module.

Inventory changes appear in Inventory Movement History.

Supplier history updates in Supplier Details.

This is the core procurement workflow of Selim Electronics.

==================================================
29. OUTPUT LIMIT
==================================================

Generate only:

1. Purchases list page
2. New Purchase page
3. Purchase Details view
4. Receive Purchase interaction
5. Record Supplier Payment interaction
6. Cancel Purchase confirmation
7. One empty state

Reuse existing components.

Do NOT generate:
- Inventory redesign
- Supplier redesign
- Products
- POS
- Sales
- Customers
- Orders
- Delivery
- Finance dashboard
- Reports
- Employees
- Settings

Those will be future prompts.

This is PROMPT 10 OF 22.

The Purchases module must feel like a natural continuation of PROMPTS 01–09.

Most importantly:

SUPPLIER → PURCHASE → RECEIVE → INVENTORY → PAYABLE

must be visually clear throughout the experience.