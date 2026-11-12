SELIM ELECTRONICS — PROMPT 20 OF 22
NOTIFICATIONS & ACTIVITY / AUDIT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 20 OF 22.

All previous modules already exist:

Dashboard
POS
Sales
Products
Categories & Brands
Inventory
Purchases
Suppliers
Supplier Payables
Customers
Customer Dues
Online Orders
Delivery
Expenses
Finance
Reports
Employees
Roles & Permissions

This module adds:

1. Notifications
2. Activity / Audit History

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
- Icons
- Spacing
- Borders
- Radius

CREDIT-EFFICIENCY RULE:
Create only one Notifications experience and one Activity/Audit page with essential states. Reuse existing components.

==================================================
CORE PURPOSE
==================================================

The system needs to tell staff when something important happens.

Examples:

New online order
Payment received
Low stock
Out of stock
Purchase received
Supplier payment due
Customer payment received
Delivery update
New employee
System alert

The Activity/Audit section records important actions performed inside the system.

==================================================
1. NOTIFICATION PANEL
==================================================

Create a compact notification dropdown/panel accessible from the existing header notification icon.

Title:

"Notifications"

Show:

Unread count

Example:

4 unread

==================================================
2. NOTIFICATION EXAMPLES
==================================================

Create realistic notifications:

New online order
#ORD-4821 · ৳14,200
2 minutes ago

Low stock
Philips LED Bulb 12W has only 6 units remaining.
18 minutes ago

Payment received
Rahim Electronics paid ৳5,000.
42 minutes ago

Purchase received
PO-2048 was received and inventory updated.
1 hour ago

Delivery update
Order #ORD-4818 is out for delivery.
2 hours ago

Use compact rows.

Do not create giant notification cards.

==================================================
3. NOTIFICATION TYPES
==================================================

Support:

Orders
Inventory
Payments
Purchases
Delivery
Customers
System

Use existing semantic indicators.

Do not introduce a completely new visual language.

==================================================
4. MARK AS READ
==================================================

Allow:

Mark as read

Also provide:

"Mark all as read"

Keep these actions compact.

==================================================
5. NOTIFICATION NAVIGATION
==================================================

Notifications should conceptually link to the relevant module.

Examples:

New order
→ Orders

Low stock
→ Inventory

Payment received
→ Customer Dues

Purchase received
→ Purchases

Do not redesign destination pages.

==================================================
6. NOTIFICATIONS PAGE
==================================================

Create one full Notifications page.

Page title:

"Notifications"

Supporting text:

"Stay updated on important business activity."

Filters:

All
Unread
Orders
Inventory
Payments
Purchases
Delivery

Use the existing filter component.

==================================================
7. EMPTY STATE
==================================================

Create:

"You're all caught up"

Supporting text:

"No new notifications."

Keep it minimal.

==================================================
8. ACTIVITY / AUDIT PAGE
==================================================

Create a full Activity page.

Page title:

"Activity"

Supporting text:

"Review important actions and changes across the business."

==================================================
9. ACTIVITY SEARCH
==================================================

Search:

"Search activity..."

Support:

Employee
Reference
Action
Module

==================================================
10. ACTIVITY FILTERS
==================================================

Filters:

Date
Employee
Module
Action

Modules:

Sales
Inventory
Purchases
Customers
Orders
Delivery
Expenses
Payments
Employees
Settings

==================================================
11. ACTIVITY TABLE
==================================================

Create the main activity table.

Columns:

Date & Time
Employee
Action
Module
Reference
Details

Examples:

4 Sep · 2:14 PM
Mahbub Rahman
Created Sale
Sales
SE-20483
POS sale ৳8,450

4 Sep · 1:50 PM
MD. SELIM
Received Purchase
Purchases
PO-2048
240 units received

4 Sep · 1:20 PM
Rahim Ahmed
Stock Adjustment
Inventory
ADJ-018
Walton Fan -1

4 Sep · 12:40 PM
MD. SELIM
Recorded Payment
Customers
PAY-C-0081
৳5,000 received

==================================================
12. AUDIT DETAIL
==================================================

When an activity is opened, show a compact detail view.

Show:

Employee
Action
Date & Time
Module
Reference
Description

Example:

Employee:
MD. SELIM

Action:
Stock Adjustment

Reference:
ADJ-018

Product:
Walton Ceiling Fan 56"

Change:
18 → 17

Reason:
Damaged

Keep the view compact.

==================================================
13. IMPORTANT AUDIT EVENTS
==================================================

Track visually important actions such as:

Created
Updated
Deleted/Removed
Payment Recorded
Purchase Received
Stock Adjusted
Order Status Changed
Customer Added
Employee Added
Role Changed
Settings Changed

Do not attempt to show every tiny UI interaction.

==================================================
14. SECURITY PRINCIPLE
==================================================

Activity history should be read-only.

Users cannot edit historical activity records.

Do not create edit buttons inside Activity.

==================================================
15. ROLE CONNECTION
==================================================

Respect employee permissions from PROMPT 19.

For example:

Owner:
Full activity visibility

Manager:
Business activity visibility

Cashier:
Relevant operational activity

Delivery Staff:
Delivery-related activity where permitted

Do not expose sensitive financial information to unauthorized roles.

==================================================
16. NOTIFICATION PREFERENCES
==================================================

Do not build a separate preferences system here.

Settings will handle notification preferences in PROMPT 21.

==================================================
17. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Use existing local examples.

==================================================
18. VISUAL DIRECTION
==================================================

Maintain:

Premium
Minimal
Professional
Black and white
Neutral gray
Information-dense

Notifications should feel quiet and useful.

Activity should feel trustworthy and audit-oriented.

Avoid:
- Social media notification designs
- Large colorful cards
- Excessive animations
- Decorative illustrations
- Giant timelines

==================================================
19. OUTPUT LIMIT
==================================================

Generate only:

1. Notification dropdown
2. Notifications page
3. Activity/Audit page
4. Activity detail view
5. Notification empty state

Reuse existing components.

Do NOT generate:

- New Dashboard
- Orders redesign
- Inventory redesign
- Payments redesign
- Employee redesign
- Settings
- Finance
- Reports

Those already exist or are covered by other prompts.

This is PROMPT 20 OF 22.

Core relationship:

BUSINESS EVENT
→ NOTIFICATION

IMPORTANT USER ACTION
→ AUDIT ACTIVITY
→ EMPLOYEE + TIMESTAMP + REFERENCE