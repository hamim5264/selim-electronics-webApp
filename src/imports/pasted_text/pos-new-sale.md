SELIM ELECTRONICS — PROMPT 04 OF 22
POS / NEW SALE WORKSPACE

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 04 OF 22.

This screen must directly continue the design language established in PROMPTS 01, 02 and 03.

DO NOT redesign the existing:
- Typography
- Colors
- Sidebar
- Header
- Buttons
- Inputs
- Tables
- Badges
- Radius
- Borders
- Iconography
- Spacing

Reuse the existing design system exactly.

Keep this generation CREDIT-EFFICIENT.
Create one excellent primary POS workspace and only the essential supporting states/modals. Do not generate multiple duplicate POS concepts.

==================================================
CORE PURPOSE
==================================================

The POS is one of the most important parts of Selim Electronics.

It is used by cashiers, managers and the owner to quickly create an in-store/counter sale.

The workflow should be extremely fast:

SEARCH PRODUCT
→ ADD TO CART
→ SELECT CUSTOMER
→ REVIEW SALE
→ APPLY DISCOUNT IF NEEDED
→ SELECT PAYMENT
→ COMPLETE SALE
→ GENERATE INVOICE

This is a real electronics/electrical retail POS in Bangladesh.

Currency:
৳ / BDT

Payment methods may include:
- Cash
- bKash
- Nagad
- Card
- Bank
- Customer Due

Do not introduce international currencies or international payment gateways.

==================================================
1. POS PAGE STRUCTURE
==================================================

Use the existing application shell.

The POS page should feel more focused and operational than the normal dashboard.

Keep unnecessary navigation distractions low while still retaining the main application sidebar.

Page title:

"New Sale"

Supporting text:

"Create a counter sale"

At the top provide:

- Current store/location
- Current cashier/user
- Optional sale/invoice number
- Date/time

Example:

Main Store
Cashier: MD. SELIM

==================================================
2. PRODUCT SEARCH AREA
==================================================

Create the primary product search area.

Search placeholder:

"Search product by name, SKU or barcode..."

The search field should be prominent and fast to access.

Support the concept of:

- Product name search
- SKU search
- Barcode search
- Product code search

Add a barcode scan icon/action.

When searching, show a compact result dropdown/list.

Example:

Philips LED Bulb 12W
SKU: PHI-LED-12W
Stock: 86
৳150

Walton Ceiling Fan 56"
SKU: WAL-FAN-56
Stock: 18
৳4,800

Vision Table Fan 12"
SKU: VIS-TF-12
Stock: 24
৳2,450

Do not create a full product-management interface here.

==================================================
3. PRODUCT QUICK ADD AREA
==================================================

Below or beside the search area, provide a compact product selection area.

Use a simple grid/list showing a few frequently sold products.

Examples:

LED Bulbs
Fans
Switches
Sockets
Cables
Holders

The purpose is quick access, not product browsing.

Keep it compact.

==================================================
4. CART
==================================================

Create the main sale cart.

The cart should clearly show:

Product
SKU
Quantity
Unit price
Discount
Total
Remove action

Example:

Philips LED Bulb 12W
SKU: PHI-LED-12W

Qty: 3
Unit: ৳150
Total: ৳450

Walton Ceiling Fan 56"
Qty: 1
Unit: ৳4,800
Total: ৳4,800

Quantity controls must be quick to use.

Support:

- Increase quantity
- Decrease quantity
- Direct quantity entry
- Remove item

If stock is insufficient, show a subtle warning.

Example:

"Only 2 units available"

Do not allow the visual design to imply unlimited stock.

==================================================
5. CUSTOMER SELECTION
==================================================

Add a customer selector near the cart/payment area.

Default:

"Walk-in Customer"

Allow:

- Search existing customer
- Select customer
- Add new customer

Example:

Customer
Walk-in Customer

Change

For a registered customer, show:

Name
Phone
Outstanding due

Example:

Rahim Electronics
01712 345678
Due: ৳12,300

Do not create the complete customer management page here.

That will come later.

==================================================
6. SALE SUMMARY
==================================================

Create a clean summary panel.

Show:

Subtotal
Discount
Additional charge if applicable
Grand Total

Example:

Subtotal                 ৳5,250
Discount                   -৳250
──────────────────────────────
Total                    ৳5,000

Make the final total visually dominant.

Do not use giant colorful cards.

==================================================
7. PAYMENT SECTION
==================================================

Create a clear payment area.

Payment method selector:

Cash
bKash
Nagad
Card
Bank
Due

For Cash, show:

Amount received
Change

Example:

Total:
৳5,000

Received:
৳5,500

Change:
৳500

For partial/mixed payment, allow the concept of multiple payment methods.

Example:

Cash        ৳3,000
bKash       ৳2,000
Total       ৳5,000

Keep this interaction compact.

Do not design payment gateway configuration here.

SSLCommerz belongs to the online-order/payment flow later.

==================================================
8. CUSTOMER DUE
==================================================

If payment method is "Due", show:

Total
Paid
Due

Example:

Invoice total: ৳10,000
Paid today: ৳6,000
Remaining due: ৳4,000

Use the existing subtle warning/financial styling.

Do not create a separate financial page here.

==================================================
9. COMPLETE SALE
==================================================

Create a strong primary action:

"Complete Sale"

Secondary actions:

"Hold Sale"
"Clear Cart"

The Complete Sale action should be visually dominant but remain consistent with the existing monochrome design system.

==================================================
10. SALE SUCCESS STATE
==================================================

Create ONE compact successful-sale modal/state.

Example:

"Sale completed"

Invoice:
#SE-20483

Total:
৳5,000

Payment:
Cash

Actions:

"Print Invoice"
"Send Invoice"
"New Sale"

Do not create a separate large success page.

==================================================
11. HOLD SALE
==================================================

Create a lightweight "Hold sale" interaction.

Purpose:

A cashier may temporarily save the current cart and continue later.

Show:

Sale #H-1024
Customer
Items
Total
Time

Actions:

Resume
Delete

Keep this compact.

==================================================
12. EMPTY POS STATE
==================================================

Create one empty-cart state.

Show:

"No products added"

Supporting text:

"Search for a product or scan a barcode to start a sale."

Keep it minimal.

==================================================
13. OUT-OF-STOCK STATE
==================================================

Create one compact product warning state.

Example:

"Out of stock"

"Walton Ceiling Fan 56\" is currently unavailable."

Do not make a large error page.

==================================================
14. LOW-STOCK STATE
==================================================

When a product is almost out of stock, show a subtle warning.

Example:

"Low stock — 3 remaining"

This should use the existing semantic warning style from PROMPT 01.

==================================================
15. DISCOUNT INTERACTION
==================================================

Create one compact discount interaction.

Allow:

- Fixed amount
- Percentage

Example:

Discount
[ 5 ] %

Do not create a separate discount management module.

==================================================
16. POS KEYBOARD / SPEED DIRECTION
==================================================

Because this is a professional desktop POS, the interface should feel optimized for fast cashier operation.

Visually support the idea of keyboard shortcuts:

F2 Search
F4 Customer
F8 Payment
Enter Complete Sale
Esc Clear/Close

These can appear subtly near relevant actions.

Do not make keyboard shortcuts visually dominant.

==================================================
17. POS INFORMATION HIERARCHY
==================================================

Prioritize:

1. Product search
2. Cart
3. Grand total
4. Payment
5. Complete Sale

Everything else is secondary.

The cashier should be able to understand the screen immediately.

==================================================
18. DESKTOP LAYOUT
==================================================

Primary target:

1440px desktop.

The POS should use the available screen efficiently.

Prefer a two-part workspace:

LEFT:
Product search / product selection

RIGHT:
Cart / customer / totals / payment

The exact proportions should feel balanced.

Do not waste large amounts of screen space on decoration.

==================================================
19. VISUAL DIRECTION
==================================================

Maintain the established Selim Electronics visual identity:

Black
White
Neutral gray
Subtle semantic colors

Premium
Minimal
Precise
Professional

Avoid:

- Rainbow POS UI
- Large colorful buttons
- Excessive gradients
- Heavy shadows
- Excessive rounded cards
- Decorative illustrations
- Generic restaurant POS patterns

This is an electronics retail POS.

==================================================
20. DATA EXAMPLES
==================================================

Use realistic Bangladesh-oriented examples.

Products:

Philips LED Bulb 12W
Walton Ceiling Fan 56"
Vision Table Fan 12"
Super Star LED Tube Light 36W
Walton Switch 2 Gang
Electrical Holder

Currency:

৳

Customers:

Walk-in Customer
Rahim Electronics
City Electric House

Payment examples:

Cash
bKash
Nagad
Card
Due

Do not use USD or international examples.

==================================================
21. RELATIONSHIP WITH FUTURE PROMPTS
==================================================

This POS creates the actual sales that will appear in the future Sales Management module.

Therefore the following concepts must be visually and structurally consistent:

POS Sale
→ Invoice
→ Sale Items
→ Customer
→ Payment
→ Inventory deduction
→ Sale record

PROMPT 05 will design the Sales Management experience for viewing, filtering and managing these completed sales.

Do not design the full Sales Management page in this prompt.

==================================================
22. OUTPUT LIMIT
==================================================

Generate only:

1. Primary POS screen
2. Product search result state
3. Payment interaction
4. Sale success modal
5. Empty cart state
6. Essential stock warning state
7. Hold sale interaction

Keep the number of frames limited.

Reuse components wherever possible.

Do NOT generate:
- Product management
- Inventory management
- Sales management
- Customer management
- Supplier management
- Finance
- Reports
- Online orders

Those are separate future prompts.

This is PROMPT 04 OF 22.

Extend the existing Selim Electronics system exactly as established in PROMPTS 01–03.