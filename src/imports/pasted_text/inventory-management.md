SELIM ELECTRONICS — PROMPT 08 OF 22
INVENTORY MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 08 OF 22.

Previous modules:
01 — Design System + Application Shell
02 — Authentication
03 — Dashboard
04 — POS / New Sale
05 — Sales Management
06 — Products / Catalog
07 — Categories & Brands

This prompt must extend those existing modules.

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
Create only the essential Inventory screens and interactions. Reuse existing components. Do not generate multiple duplicate concepts or decorative screens.

==================================================
CORE PURPOSE
==================================================

Inventory answers one critical business question:

"How many units of each product do we currently have, where are they, and why did the quantity change?"

Inventory changes can happen because of:

- Purchase received
- POS sale
- Online sale
- Customer return
- Supplier return
- Manual stock adjustment
- Damaged/lost stock
- Stock transfer in the future

Inventory must connect directly to:

Products
Purchases
POS
Sales
Returns

==================================================
1. INVENTORY PAGE
==================================================

Create the primary Inventory page.

Page title:

"Inventory"

Supporting text:

"Monitor stock levels and inventory movement."

Primary action:

"Adjust Stock"

Secondary action:

"Export"

Do not create unnecessary buttons.

==================================================
2. INVENTORY SUMMARY
==================================================

Create compact summary metrics:

Total Units
4,826

Inventory Value
৳18,450,000

Low Stock
18

Out of Stock
7

Use the existing compact KPI style.

Inventory Value should represent the current inventory valuation based on the system's configured costing approach.

Do not explain accounting methodology in the UI.

==================================================
3. INVENTORY SEARCH
==================================================

Create search:

"Search products by name, SKU or barcode..."

Support:

- Product name
- SKU
- Barcode
- Model

Use the same search component from Products/POS.

==================================================
4. INVENTORY FILTERS
==================================================

Create compact filters:

Category
Brand
Stock Status
Store
Supplier

Stock Status:

All
In Stock
Low Stock
Out of Stock

Also support:

"Only items needing attention"

Do not create separate pages for each filter.

==================================================
5. INVENTORY TABLE
==================================================

Create the primary inventory table.

Columns:

Product
SKU
Category
Current Stock
Reserved
Available
Low Stock Threshold
Stock Value
Status
Actions

Example:

Philips LED Bulb 12W
PHI-LED-12W
Lighting
86
4
82
10
৳8,600
In Stock

Walton Ceiling Fan 56"
WAL-FAN-56
Fans
18
2
16
5
৳77,400
In Stock

Walton Switch 2 Gang
WAL-SW-2G
Switches & Sockets
3
0
3
10
৳420
Low Stock

Super Star LED Tube Light 36W
SSL-TUB-36
Lighting
0
0
0
10
৳0
Out of Stock

Use ৳ / BDT.

==================================================
6. STOCK TERMINOLOGY
==================================================

Make the distinction clear:

Current Stock
= physical quantity recorded

Reserved
= quantity committed to pending orders

Available
= Current Stock - Reserved

Do not show complicated warehouse terminology.

==================================================
7. STOCK STATUS
==================================================

Use existing status components.

Statuses:

In Stock
Low Stock
Out of Stock

Do not introduce a completely new badge design.

==================================================
8. INVENTORY DETAILS
==================================================

Create ONE Inventory Details view for a selected product.

Show:

Product
SKU
Current Stock
Reserved
Available
Low Stock Threshold
Inventory Value

Also show:

Last Purchase
Last Sale
Last Stock Adjustment

Example:

Last Purchase
4 Sep 2026

Last Sale
4 Sep 2026

Last Adjustment
2 Sep 2026

==================================================
9. STOCK MOVEMENT HISTORY
==================================================

This is an important inventory feature.

Create a compact movement history table.

Columns:

Date
Type
Reference
Quantity
Stock After
User

Examples:

4 Sep
Purchase Received
PO-2048
+50
86
MD. SELIM

4 Sep
POS Sale
SE-20483
-3
83
Mahbub

3 Sep
Stock Adjustment
ADJ-018
-1
86
MD. SELIM

Use subtle positive/negative quantity indicators.

Do not create a separate stock-history page.

==================================================
10. INVENTORY SOURCE
==================================================

Each movement should visually indicate its source:

Purchase
Sale
Return
Adjustment
Supplier Return

This will make inventory auditable.

==================================================
11. STOCK ADJUSTMENT
==================================================

Create ONE reusable Stock Adjustment modal/form.

Fields:

Product
Current Stock
Adjustment Type
Quantity
Reason
Notes

Adjustment Type:

Increase
Decrease

Example:

Product:
Walton Ceiling Fan 56"

Current stock:
18

Adjustment:
Decrease 1

Reason:
Damaged

Notes:
Motor damaged during handling.

Show:

New Stock:
17

Primary action:

"Confirm Adjustment"

==================================================
12. ADJUSTMENT REASONS
==================================================

Provide predefined reasons:

Damaged
Lost
Found
Counting correction
Internal use
Other

Do not create a complicated configuration interface.

==================================================
13. STOCK ALERTS
==================================================

Create a compact stock-alert area.

Examples:

Philips LED Bulb 12W
6 remaining

Walton Switch 2 Gang
3 remaining

Super Star LED Tube Light
Out of stock

Primary action:

"View product"

Do not create colorful alert cards.

==================================================
14. STOCK VALUATION
==================================================

Show inventory value at the product level.

Example:

86 units
Current inventory value: ৳8,600

The UI must visually distinguish:

Quantity
Cost/value
Selling price

Do not imply that selling price is inventory cost.

==================================================
15. SUPPLIER RELATIONSHIP
==================================================

Inventory should show the most recent supplier/dealer for a product when available.

Example:

Last supplier:
Walton Distributor — Dhaka

This connects to PROMPT 09.

Do not create supplier management here.

==================================================
16. PURCHASE RELATIONSHIP
==================================================

Inventory quantities increase when a purchase is received.

Example:

Purchase Order:
PO-2048

Product:
Walton Ceiling Fan 56"

Received:
50 units

Inventory:
+50

This relationship must be visually consistent with the future Purchases module in PROMPT 10.

==================================================
17. SALE RELATIONSHIP
==================================================

Inventory decreases when a completed POS or online sale is finalized.

Example:

Sale:
SE-20483

Product:
Philips LED Bulb 12W

Quantity sold:
3

Inventory:
-3

Do not create another sales screen here.

==================================================
18. RETURN RELATIONSHIP
==================================================

When an eligible customer return is completed:

Returned quantity
→ Inventory increases

Refund
→ Financial record changes

Show this concept only through the movement history.

==================================================
19. EMPTY STATE
==================================================

Create one empty state:

"No inventory records found"

Supporting text:

"Inventory will appear when products are added and stock is received."

Action:

"Add Product"

==================================================
20. LOADING STATE
==================================================

Reuse the existing loading/skeleton system.

Do not create a new loading design.

==================================================
21. SCALE
==================================================

The inventory may eventually contain thousands of products.

The interface must support:

- Search
- Filters
- Sorting
- Pagination

Do not visually render hundreds of rows.

==================================================
22. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:
৳ / BDT

Do not introduce international currencies or warehouse systems designed for multinational businesses.

==================================================
23. VISUAL DIRECTION
==================================================

Maintain the established Selim Electronics visual identity:

Minimal
Premium
Precise
Black and white
Neutral gray
Information-dense

Inventory should feel like an operational control system.

Avoid:
- Colorful warehouse dashboards
- Giant cards
- Excessive charts
- Decorative illustrations
- Heavy shadows
- Generic logistics UI

==================================================
24. OUTPUT LIMIT
==================================================

Generate only:

1. Inventory list page
2. Inventory details view
3. Stock movement history
4. Stock adjustment modal
5. One stock-alert state
6. One empty/loading state where useful

Do NOT generate:
- Suppliers
- Purchases
- Products redesign
- POS
- Sales
- Customers
- Orders
- Delivery
- Finance
- Reports

Those are future prompts.

This is PROMPT 08 OF 22.

Inventory must connect naturally to the existing Products, POS and Sales modules.