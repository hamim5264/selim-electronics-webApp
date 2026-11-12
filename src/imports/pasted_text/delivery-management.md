SELIM ELECTRONICS — PROMPT 15 OF 22
DELIVERY MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 15 OF 22.

Previous module:
PROMPT 14 — Online Orders

Delivery is directly connected to Online Orders.

CORE FLOW:

ONLINE ORDER
↓
ORDER READY
↓
DELIVERY ASSIGNED
↓
OUT FOR DELIVERY
↓
DELIVERED

Possible exceptions:

Failed Delivery
Rescheduled
Cancelled
Returned

DO NOT redesign existing screens or the design system.

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
- Icons
- Spacing
- Borders
- Radius

CREDIT-EFFICIENCY RULE:
Create one primary Delivery page, one Delivery Details view, and only essential delivery interactions.

Do not create a complicated logistics platform.

==================================================
1. DELIVERY PAGE
==================================================

Create the main Delivery page.

Page title:

"Delivery"

Supporting text:

"Manage online order deliveries and fulfillment."

Primary action:

"Assign Delivery"

Secondary:

"Filter"

==================================================
2. DELIVERY SUMMARY
==================================================

Create compact metrics:

Pending
8

Ready for Delivery
5

Out for Delivery
7

Delivered Today
32

Use existing KPI components.

==================================================
3. DELIVERY SEARCH
==================================================

Search:

"Search order, customer or phone..."

Support:

Order number
Customer name
Phone

==================================================
4. DELIVERY FILTERS
==================================================

Filters:

Status
Delivery Method
Date
Area
Assigned Staff

Statuses:

Pending
Assigned
Out for Delivery
Delivered
Failed
Rescheduled
Cancelled

==================================================
5. DELIVERY TABLE
==================================================

Create the main delivery table.

Columns:

Order
Customer
Area
Delivery Method
Assigned To
Status
Expected
Actions

Example:

#ORD-4821
Farhan Ahmed
Mirpur, Dhaka
Home Delivery
Rahim
Out for Delivery
Today
Actions

#ORD-4820
Nusrat Jahan
Dhanmondi, Dhaka
Home Delivery
Mahbub
Preparing
Today
Actions

Keep the table compact.

==================================================
6. DELIVERY DETAILS
==================================================

Create ONE Delivery Details view.

Header:

Delivery
#DEL-004821

Order:

#ORD-4821

Status:

Out for Delivery

==================================================
7. CUSTOMER INFORMATION
==================================================

Show:

Customer
Phone
Delivery Address
Area

Example:

Farhan Ahmed

01712 345678

House 12, Road 4
Mirpur, Dhaka
1216

Make phone information easy to visually locate.

==================================================
8. ORDER INFORMATION
==================================================

Show:

Order number
Items
Order total
Payment status

Example:

Order:
#ORD-4821

Items:
4

Total:
৳14,200

Payment:
Paid

Provide conceptual access to Order Details.

Do not redesign Orders.

==================================================
9. ASSIGN DELIVERY
==================================================

Create ONE assignment modal.

Fields:

Order
Delivery Staff
Delivery Method
Expected Delivery Date
Expected Time
Notes

Delivery Staff examples:

Rahim
Mahbub
Karim

Delivery Methods:

Home Delivery
Store Pickup

Primary action:

"Assign Delivery"

==================================================
10. DELIVERY STATUS
==================================================

Use existing status badges.

Statuses:

Pending
Assigned
Out for Delivery
Delivered
Failed
Rescheduled
Cancelled

Do not create new badge styles.

==================================================
11. DELIVERY TIMELINE
==================================================

Create a compact timeline:

Order Ready
4 Sep · 3:00 PM

Assigned to Rahim
4 Sep · 3:15 PM

Picked Up
4 Sep · 3:40 PM

Out for Delivery
4 Sep · 3:45 PM

Delivered
Pending

Use existing timeline styling.

==================================================
12. MARK OUT FOR DELIVERY
==================================================

When assigned delivery is ready:

Action:

"Start Delivery"

After action:

Status:
Out for Delivery

Show confirmation:

"Delivery started."

Keep this interaction compact.

==================================================
13. MARK DELIVERED
==================================================

Create ONE delivery completion interaction.

Show:

Order
Customer
Delivery Staff

Optional fields:

Delivery Note
Received By

Primary action:

"Mark Delivered"

Example:

Received by:
Farhan Ahmed

Note:
Delivered successfully.

==================================================
14. FAILED DELIVERY
==================================================

Create one compact failed-delivery state.

Reasons:

Customer unavailable
Wrong address
Customer refused
Other

Action:

"Reschedule"

Do not create a large workflow.

==================================================
15. RESCHEDULE DELIVERY
==================================================

Create one compact modal.

Fields:

New Date
Time
Reason
Notes

Primary:

"Reschedule Delivery"

==================================================
16. STORE PICKUP
==================================================

Support:

"Store Pickup"

For store pickup orders:

No delivery staff required.

Status flow:

Ready for Pickup
→ Picked Up

Create only a compact representation.

==================================================
17. DELIVERY AREA
==================================================

Show a simple location field:

Area:
Mirpur, Dhaka

Do not create maps.

Do not generate GPS tracking.

Do not generate route optimization.

Those are unnecessary for the first version.

==================================================
18. PAYMENT CONNECTION
==================================================

Show payment state:

Paid

or

Cash on Delivery

If Cash on Delivery:

Amount to Collect:
৳14,200

When delivery is completed, staff can mark the amount as collected.

Do not create the entire finance system here.

==================================================
19. ORDER CONNECTION
==================================================

Delivery must reference the original online order.

Example:

Delivery:
#DEL-004821

Order:
#ORD-4821

Customer:
Farhan Ahmed

Do not duplicate order data unnecessarily.

==================================================
20. DELIVERY EMPTY STATE
==================================================

Create one empty state:

"No deliveries found"

Supporting text:

"Assigned online orders will appear here."

==================================================
21. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Example areas:

Mirpur
Dhanmondi
Uttara
Mohammadpur
Motijheel

Currency:

৳ / BDT

Do not introduce international logistics systems.

==================================================
22. VISUAL DIRECTION
==================================================

Maintain:

Premium
Minimal
Black and white
Neutral gray
Operational
Professional

Avoid:
- Delivery tracking maps
- Courier marketplace styling
- Colorful logistics dashboards
- Giant illustrations
- Excessive cards
- GPS interfaces

==================================================
23. OUTPUT LIMIT
==================================================

Generate only:

1. Delivery list
2. Delivery Details
3. Assign Delivery modal
4. Delivery timeline
5. Mark Delivered interaction
6. Failed/Reschedule state
7. Store Pickup state
8. One empty state

Do NOT generate:
- Maps
- GPS tracking
- Route optimization
- Customer mobile app
- Online Orders redesign
- Finance
- Reports
- Inventory redesign

This is PROMPT 15 OF 22.

The core relationship is:

ONLINE ORDER
→ READY
→ ASSIGN DELIVERY
→ OUT FOR DELIVERY
→ DELIVERED