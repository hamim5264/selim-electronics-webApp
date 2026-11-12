SELIM ELECTRONICS — PROMPT 14 OF 22
ONLINE ORDERS MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 14 OF 22.

Previous modules:
01 — Design System + Application Shell
02 — Authentication
03 — Dashboard
04 — POS
05 — Sales
06 — Products
07 — Categories & Brands
08 — Inventory
09 — Suppliers
10 — Purchases
11 — Supplier Payables
12 — Customers
13 — Customer Dues

This module introduces the ONLINE CUSTOMER ORDER management layer.

The future customer mobile app will allow customers to:

Browse products
View product details
Add products to cart
Place orders
Pay online
Choose delivery
Track orders

The web application is where Selim Electronics staff manage those orders.

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
Create one primary Orders list, one Order Details view, and only essential order actions/states.

Do not generate a customer mobile app in this prompt.

==================================================
CORE ORDER FLOW
==================================================

Customer App
↓
Order Created
↓
Payment Processing / Payment Confirmed
↓
Order Confirmed
↓
Preparing
↓
Ready for Delivery
↓
Out for Delivery
↓
Delivered

Possible exceptions:

Cancelled
Payment Failed
Returned

==================================================
1. ONLINE ORDERS PAGE
==================================================

Create the main Orders page.

Page title:

"Orders"

Supporting text:

"Manage online customer orders and fulfillment."

Primary actions:

"Filter"

"Export"

Do not create unnecessary actions.

==================================================
2. ORDER SUMMARY
==================================================

Create compact summary metrics:

New Orders
12

Preparing
8

Out for Delivery
5

Today's Online Sales
৳184,500

Use existing KPI styling.

==================================================
3. ORDER SEARCH
==================================================

Search:

"Search order number, customer or phone..."

Support:

Order ID
Customer name
Phone number
Product

Use existing search component.

==================================================
4. ORDER FILTERS
==================================================

Create compact filters:

Status
Payment
Date
Delivery
Store

Order statuses:

All
New
Confirmed
Preparing
Ready
Out for Delivery
Delivered
Cancelled

Payment statuses:

Paid
Pending
Failed
Due

Do not create separate pages for statuses.

==================================================
5. ORDER TABLE
==================================================

Create the main order table.

Columns:

Order
Customer
Items
Total
Payment
Delivery
Status
Date
Actions

Example:

#ORD-4821
Farhan Ahmed
4 items
৳14,200
Paid
Standard Delivery
New
4 Sep 2026

#ORD-4820
Nusrat Jahan
2 items
৳6,800
Paid
Home Delivery
Confirmed
4 Sep 2026

#ORD-4819
Tanvir Islam
6 items
৳22,500
Paid
Express
Preparing
4 Sep 2026

Use ৳ / BDT.

==================================================
6. ORDER DETAILS
==================================================

Create ONE Order Details view.

Header:

Order #ORD-4821

Status:
New

Date:
4 Sep 2026

Show customer:

Farhan Ahmed
01712 345678

==================================================
7. ORDER ITEMS
==================================================

Show purchased products.

Columns:

Product
SKU
Quantity
Unit Price
Discount
Total

Example:

Walton Ceiling Fan 56"
WAL-FAN-56
1
৳4,800
৳0
৳4,800

Philips LED Bulb 12W
PHI-LED-12W
3
৳150
৳0
৳450

==================================================
8. ORDER TOTAL
==================================================

Show:

Subtotal
Delivery Fee
Discount
Grand Total

Example:

Subtotal:
৳5,250

Delivery:
৳100

Discount:
-৳200

Total:
৳5,150

Use the same financial hierarchy used in POS.

==================================================
9. PAYMENT INFORMATION
==================================================

Show:

Payment Method
Payment Status
Transaction Reference

Example:

Method:
SSLCommerz

Status:
Paid

Transaction:
SSL-20260904-4821

IMPORTANT:

SSLCommerz is the ONLY online payment gateway for this Bangladesh-only system.

Do not introduce:
Stripe
PayPal
Razorpay
Adyen
Other gateways

==================================================
10. DELIVERY INFORMATION
==================================================

Show:

Delivery Address
Customer Phone
Delivery Method
Delivery Fee

Example:

House 12, Road 4
Mirpur, Dhaka
1216

Phone:
01712 345678

Method:
Home Delivery

Fee:
৳100

This connects to PROMPT 15.

==================================================
11. ORDER STATUS ACTIONS
==================================================

Create contextual actions based on status.

New:

"Confirm Order"

Confirmed:

"Start Preparing"

Preparing:

"Mark Ready"

Ready:

"Assign Delivery"

Out for Delivery:

"Mark Delivered"

Do not show every action simultaneously.

==================================================
12. CANCEL ORDER
==================================================

Create ONE cancellation confirmation modal.

Title:

"Cancel order?"

Message:

"Are you sure you want to cancel this order?"

If payment has already been completed, show:

"Any eligible refund will be handled through the payment/refund workflow."

Actions:

Keep Order
Cancel Order

Do not design the full refund system here.

==================================================
13. PAYMENT FAILURE
==================================================

Create one compact failed-payment state.

Example:

Payment Failed

Order:
#ORD-4822

Amount:
৳8,400

Message:

"The payment could not be confirmed."

Do not automatically mark the order as paid.

==================================================
14. NEW ORDER INDICATOR
==================================================

New orders should be visually easy to identify.

Use:

New badge

and subtle notification/count indicator.

Do not use large colorful banners.

==================================================
15. CUSTOMER CONNECTION
==================================================

Every online order should connect to a customer.

Show:

Customer
Phone
Order history access
Outstanding due if applicable

Do not redesign the Customers module.

==================================================
16. INVENTORY CONNECTION
==================================================

Online order fulfillment must respect inventory.

Example:

Product:
Philips LED Bulb 12W

Ordered:
3

Available:
86

After confirmed fulfillment:

Inventory decreases according to the business fulfillment rule.

The UI should clearly show product availability.

Do not redesign Inventory.

==================================================
17. ORDER TIMELINE
==================================================

Create a compact order timeline.

Example:

4 Sep · 2:14 PM
Order placed

4 Sep · 2:16 PM
Payment confirmed

4 Sep · 2:25 PM
Order confirmed

4 Sep · 3:10 PM
Preparing

Use the existing minimal timeline pattern.

==================================================
18. ORDER NOTES
==================================================

Show internal order notes.

Example:

"Customer requested delivery after 6 PM."

Keep internal notes visually separate from customer-visible information.

==================================================
19. EMPTY STATE
==================================================

Create one empty state:

"No online orders"

Supporting text:

"New orders from the customer app will appear here."

Do not create a customer app screen.

==================================================
20. SCALE
==================================================

The business may eventually receive thousands of orders.

Support:

Search
Filtering
Sorting
Pagination
Date range

Do not display hundreds of rows.

==================================================
21. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Online payment:

SSLCommerz only

Payment status should distinguish:

Paid
Pending
Failed
Due

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

Orders should feel operational and trustworthy.

Avoid:
- E-commerce marketplace styling
- Colorful order cards
- Large product images
- Excessive illustrations
- Giant dashboards

==================================================
23. OUTPUT LIMIT
==================================================

Generate only:

1. Orders list
2. Order Details
3. Order timeline
4. Cancel confirmation
5. Payment failed state
6. One empty state

Reuse existing components.

Do NOT generate:
- Customer mobile app
- Delivery management
- Products redesign
- Inventory redesign
- Customers redesign
- POS redesign
- Sales redesign
- Finance
- Reports
- Settings

Those are future prompts.

This is PROMPT 14 OF 22.

The core workflow is:

CUSTOMER APP
→ ONLINE ORDER
→ PAYMENT
→ CONFIRMATION
→ FULFILLMENT
→ DELIVERY