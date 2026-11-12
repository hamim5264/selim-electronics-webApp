SELIM ELECTRONICS — PROMPT 09 OF 22
SUPPLIERS / DEALERS MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 09 OF 22.

Previous modules established:
Products
Categories & Brands
Inventory
POS
Sales
Dashboard
Authentication
Application Shell

This module must connect directly to Products, Inventory and the future Purchases module.

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
Create one primary supplier management page, one supplier detail view, and only essential forms/states.

Do not generate duplicate supplier screens.

==================================================
CORE BUSINESS CONTEXT
==================================================

Selim Electronics purchases products from many dealers, distributors and suppliers.

A supplier is not simply a contact.

The system needs to track:

- Supplier identity
- Contact information
- Address
- Products supplied
- Purchase history
- Total purchased amount
- Amount paid
- Outstanding payable
- Last purchase
- Payment history
- Notes

Different suppliers may supply different products.

The same product may potentially be purchased from different suppliers at different costs.

Historical purchase records must remain unchanged.

==================================================
1. SUPPLIERS PAGE
==================================================

Create the main Suppliers page.

Page title:

"Suppliers"

Supporting text:

"Manage dealers, distributors and supplier relationships."

Primary action:

"+ Add Supplier"

==================================================
2. SUPPLIER SUMMARY
==================================================

Create compact metrics:

Total Suppliers
48

Active Suppliers
42

Outstanding Payables
৳2,710,000

Purchases This Month
৳4,850,000

Use existing compact KPI cards.

==================================================
3. SUPPLIER SEARCH
==================================================

Search:

"Search suppliers by name, phone or company..."

Support:

- Supplier name
- Company name
- Phone
- Contact person

==================================================
4. SUPPLIER FILTERS
==================================================

Create compact filters:

Status
Outstanding Balance
Supplier Type

Supplier Type examples:

Dealer
Distributor
Manufacturer
Other

Do not create a complicated supplier classification system.

==================================================
5. SUPPLIER TABLE
==================================================

Create the primary supplier table.

Columns:

Supplier
Contact
Phone
Products
Purchases
Paid
Outstanding
Last Purchase
Status
Actions

Example:

Walton Distributor — Dhaka
Abdul Karim
01712 345678
126 products
৳1,850,000
৳1,600,000
৳250,000
4 Sep 2026
Active

Philips Bangladesh Distributor
Rahman Ahmed
01812 456789
48 products
৳920,000
৳920,000
৳0
28 Aug 2026
Active

Use ৳ / BDT.

Keep the table optimized for many suppliers.

==================================================
6. SUPPLIER STATUS
==================================================

Statuses:

Active
Inactive
On Hold

Use existing badges.

Do not create new status styles.

==================================================
7. ADD SUPPLIER
==================================================

Create ONE reusable Add/Edit Supplier form.

Fields:

Supplier / Company Name
Contact Person
Phone
Alternative Phone
Email
Address
City
Supplier Type
Notes
Status

Keep the form structured and compact.

Do not require unnecessary fields.

==================================================
8. SUPPLIER DETAILS
==================================================

Create ONE Supplier Details view.

Header:

Supplier name
Status
Contact information

Example:

Walton Distributor — Dhaka

Contact:
Abdul Karim

Phone:
01712 345678

Address:
Dhaka, Bangladesh

==================================================
9. SUPPLIER FINANCIAL SUMMARY
==================================================

Within Supplier Details, show:

Total Purchases
Total Paid
Outstanding
Last Payment

Example:

Total Purchases
৳1,850,000

Paid
৳1,600,000

Outstanding
৳250,000

Last Payment
৳100,000 · 2 Sep 2026

Use the established financial styling.

==================================================
10. SUPPLIER PRODUCTS
==================================================

Show products associated with this supplier.

Compact table:

Product
SKU
Last Purchase Price
Last Purchase Date
Total Purchased

Example:

Walton Ceiling Fan 56"
WAL-FAN-56
৳4,300
4 Sep 2026
120 units

Walton Table Fan
WAL-TF-12
৳2,100
28 Aug 2026
80 units

Important:

"Last Purchase Price" is historical purchase information.

Do not overwrite the product's selling price.

==================================================
11. SUPPLIER PURCHASE HISTORY
==================================================

Show recent purchase records.

Columns:

Purchase
Date
Items
Total
Paid
Due
Status

Example:

PO-2048
4 Sep 2026
24 items
৳450,000
৳400,000
৳50,000
Partially Paid

PO-2031
28 Aug 2026
18 items
৳280,000
৳280,000
৳0
Paid

This will connect directly to PROMPT 10.

==================================================
12. SUPPLIER PAYMENT
==================================================

Create ONE compact "Record Payment" interaction.

Show:

Supplier
Outstanding balance
Payment amount
Payment method
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

Do not design the entire finance module here.

==================================================
13. SUPPLIER PAYMENT HISTORY
==================================================

Within Supplier Details, show a compact history:

Date
Reference
Amount
Method
Recorded by

Example:

2 Sep 2026
PAY-0082
৳100,000
Bank
MD. SELIM

Keep this compact.

==================================================
14. SUPPLIER BALANCE
==================================================

Clearly distinguish:

Total purchased
Amount paid
Outstanding payable

Do not call supplier outstanding balances "customer dues".

Use:

"Payable"

or

"Outstanding payable"

==================================================
15. SUPPLIER NOTES
==================================================

Allow a simple internal notes area.

Example:

"Usually supplies Walton fans and switches. Payment terms: 30 days."

This is internal business information.

Keep it simple.

==================================================
16. EMPTY STATE
==================================================

Create one empty state:

"No suppliers yet"

Supporting text:

"Add your first dealer or supplier to start tracking purchases."

Primary action:

"Add Supplier"

==================================================
17. INACTIVE SUPPLIER
==================================================

An inactive supplier should remain visible in historical purchase records.

Do not imply that deactivating a supplier deletes historical data.

==================================================
18. RELATIONSHIP WITH PRODUCTS
==================================================

A supplier can supply many products.

A product can have purchase history from different suppliers.

The UI must NOT imply that every product has only one permanent supplier.

The latest supplier can be shown where useful, but historical purchases must preserve their original supplier.

==================================================
19. RELATIONSHIP WITH PURCHASES
==================================================

Future Purchases module will create:

Supplier
→ Purchase
→ Purchase Items
→ Inventory

Supplier details should therefore expose purchase history.

Do not create the full Purchase module here.

==================================================
20. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Use:

৳ / BDT

Example phone format:

01712 345678

Do not introduce international currencies or multinational supplier systems.

==================================================
21. VISUAL DIRECTION
==================================================

Maintain the Selim Electronics design language:

Premium
Minimal
Professional
Black and white
Neutral gray
Information-dense

Avoid:
- CRM-style colorful contact cards
- Large profile images
- Decorative supplier illustrations
- Excessive charts
- Heavy shadows

This is a serious procurement/business relationship module.

==================================================
22. OUTPUT LIMIT
==================================================

Generate only:

1. Suppliers list page
2. Add/Edit Supplier form
3. Supplier Details view
4. Supplier payment interaction
5. Supplier purchase history section
6. Supplier product section
7. One empty/inactive state where useful

Do NOT generate:
- Purchases page
- Inventory redesign
- Products redesign
- POS
- Sales
- Customers
- Orders
- Delivery
- Finance
- Reports

Those are future prompts.

This is PROMPT 09 OF 22.

The Supplier module must connect naturally to Products, Inventory and Purchases.