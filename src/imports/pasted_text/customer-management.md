SELIM ELECTRONICS — PROMPT 12 OF 22
CUSTOMER MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 12 OF 22.

Previous modules established the complete product, inventory, supplier, purchase, POS and sales foundations.

This module creates the customer relationship layer.

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
Create one primary Customers page, one Customer Details view, and one Add/Edit Customer form/modal. Only create essential states.

==================================================
CORE PURPOSE
==================================================

Customers may purchase from Selim Electronics through:

- Physical POS
- Future online customer application

The customer record should connect to:

- Sales
- Online orders
- Payments
- Outstanding dues
- Addresses
- Contact information
- Purchase history

A customer may also be a walk-in customer.

==================================================
1. CUSTOMERS PAGE
==================================================

Create the primary Customers page.

Page title:

"Customers"

Supporting text:

"Manage customer profiles, purchase history and outstanding balances."

Primary action:

"+ Add Customer"

Secondary action:

"Export"

==================================================
2. CUSTOMER SUMMARY
==================================================

Create compact summary metrics:

Total Customers
2,840

Active Customers
2,610

Customers With Due
184

Outstanding Dues
৳3,410,200

Use existing compact KPI styling.

==================================================
3. CUSTOMER SEARCH
==================================================

Search:

"Search customers by name, phone or email..."

Support:

- Name
- Phone
- Email
- Customer ID

Use the existing global/search design language.

==================================================
4. CUSTOMER FILTERS
==================================================

Create compact filters:

Status
Due
Customer Type
Date Joined

Customer types:

Regular
Business

Status:

Active
Inactive

Do not create unnecessary customer segmentation.

==================================================
5. CUSTOMER TABLE
==================================================

Create the primary customer table.

Columns:

Customer
Phone
Type
Orders
Total Spent
Outstanding
Last Purchase
Status
Actions

Example:

Rahim Electronics
01712 345678
Business
84
৳1,850,000
৳12,300
4 Sep 2026
Active

Nusrat Jahan
01812 456789
Regular
12
৳48,500
৳0
3 Sep 2026
Active

City Electric House
01912 567890
Business
46
৳720,000
৳28,500
1 Sep 2026
Active

Use ৳ / BDT.

==================================================
6. CUSTOMER DETAILS
==================================================

Create ONE Customer Details view.

Header:

Customer name
Customer type
Status

Contact:

Phone
Email
Address

Show:

Customer ID

Example:

Customer ID:
CUS-002841

==================================================
7. CUSTOMER FINANCIAL SUMMARY
==================================================

Show compact summary:

Total Purchases
৳1,850,000

Total Paid
৳1,837,700

Outstanding
৳12,300

Use existing financial styling.

Do not create a separate finance dashboard.

==================================================
8. CUSTOMER PURCHASE HISTORY
==================================================

Create a compact sales/order history.

Columns:

Reference
Date
Items
Total
Paid
Due
Status

Example:

SE-20483
4 Sep 2026
3 items
৳8,450
৳8,450
৳0
Paid

SE-20420
29 Aug 2026
5 items
৳12,300
৳0
৳12,300
Due

This should connect to Sales from PROMPT 05.

Future online orders will also appear through the customer's relationship.

==================================================
9. CUSTOMER PAYMENT HISTORY
==================================================

Show customer payments.

Columns:

Date
Reference
Amount
Method
Remaining Due

Example:

4 Sep 2026
PAY-C-0081
৳5,000
Cash
৳7,300

Use existing table patterns.

==================================================
10. CUSTOMER ADDRESS
==================================================

Customers may have delivery addresses.

Show:

Address
City
Area
Postal Code
Address Type

Types:

Home
Business
Other

Example:

House 12, Road 4
Mirpur, Dhaka
1216
Business

Keep the address section compact.

==================================================
11. ADD CUSTOMER
==================================================

Create ONE reusable Add/Edit Customer form.

Fields:

Full Name
Phone
Email
Customer Type
Address
City
Area
Postal Code
Notes

Optional:

Customer ID

Customer ID should be generated automatically.

Do not create a large complicated form.

==================================================
12. CUSTOMER TYPE
==================================================

Support:

Regular
Business

A business customer may have:

- Larger order volume
- Purchase history
- Outstanding due

Do not create a complex CRM system.

==================================================
13. WALK-IN CUSTOMER
==================================================

The existing POS uses:

"Walk-in Customer"

Keep this as a special customer concept.

Do not require a full customer profile for every walk-in sale.

A cashier should still be able to convert/add a customer when needed.

==================================================
14. CUSTOMER STATUS
==================================================

Statuses:

Active
Inactive

Inactive customers remain visible in historical sales and order records.

Do not imply historical records are deleted.

==================================================
15. CUSTOMER ACTIONS
==================================================

Use the existing overflow action menu.

Actions:

View
Edit
Record Payment
View Sales
View Orders
Deactivate

Do not display all actions as large buttons.

==================================================
16. CUSTOMER DEACTIVATION
==================================================

Create one compact confirmation modal.

Title:

"Deactivate customer?"

Message:

"The customer will no longer be available for new transactions, but historical records will remain available."

Actions:

Cancel
Deactivate

==================================================
17. EMPTY STATE
==================================================

Create one empty state:

"No customers found"

Supporting text:

"Add a customer or change your search and filters."

Actions:

Clear Filters
Add Customer

==================================================
18. CUSTOMER DUE CONNECTION
==================================================

A customer can have outstanding dues.

The Customers module should expose the current outstanding balance.

Detailed due collection will be designed in PROMPT 13.

Do not duplicate the full dues management system here.

==================================================
19. POS CONNECTION
==================================================

Customers can be selected during POS sales.

The POS should be able to show:

Customer name
Phone
Outstanding due

Do not redesign POS.

==================================================
20. ONLINE ORDER CONNECTION
==================================================

Future online customer orders will reference the same customer identity where possible.

Customer history should eventually combine:

POS purchases
Online orders
Payments
Dues

Do not design the online order module yet.

==================================================
21. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Use realistic Bangladesh examples.

Phone example:

01712 345678

Currency:

৳ / BDT

Do not introduce international customer systems.

==================================================
22. VISUAL DIRECTION
==================================================

Maintain the established Selim Electronics identity:

Premium
Minimal
Professional
Black and white
Neutral gray
Information-dense

Avoid:
- Colorful CRM cards
- Giant customer avatars
- Social-media-style profiles
- Decorative illustrations
- Excessive charts

This is a business customer management system.

==================================================
23. OUTPUT LIMIT
==================================================

Generate only:

1. Customers list
2. Customer Details
3. Add/Edit Customer form
4. Deactivate confirmation
5. One empty state

Reuse existing components.

Do NOT generate:
- Customer Dues management
- Finance dashboard
- Orders
- Delivery
- Products
- Inventory
- Purchases
- Suppliers
- POS redesign
- Sales redesign
- Reports

Those are future prompts.

This is PROMPT 12 OF 22.

The customer record must connect naturally to POS, Sales and future Online Orders.