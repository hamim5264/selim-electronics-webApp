SELIM ELECTRONICS — PROMPT 19 OF 22
EMPLOYEES, ROLES & PERMISSIONS

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 19 OF 22.

Previous modules already exist:

Dashboard
POS
Products
Inventory
Purchases
Suppliers
Sales
Customers
Customer Dues
Orders
Delivery
Expenses
Finance
Reports

This module manages the people who operate the Selim Electronics system.

DO NOT redesign the existing application shell or design system.

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
Create one Employees page, one Add/Edit Employee form, one Roles & Permissions view, and only essential confirmation states.

Do not create duplicate employee-management screens.

==================================================
CORE PURPOSE
==================================================

Different people work at Selim Electronics.

Not everyone should have access to every module.

The system needs:

Employees
Roles
Permissions
Account Status
Activity attribution

Every important action should eventually be associated with the employee who performed it.

==================================================
1. EMPLOYEES PAGE
==================================================

Create the main Employees page.

Page title:

"Employees"

Supporting text:

"Manage staff access and system permissions."

Primary action:

"+ Add Employee"

==================================================
2. EMPLOYEE SUMMARY
==================================================

Create compact metrics:

Total Employees
12

Active
10

Inactive
2

Roles
5

Use existing KPI styling.

==================================================
3. EMPLOYEE SEARCH
==================================================

Search:

"Search employees by name, phone or email..."

Support:

Name
Phone
Email
Employee ID

==================================================
4. EMPLOYEE FILTERS
==================================================

Filters:

Role
Status

Status:

Active
Inactive

Role:

Owner
Manager
Cashier
Inventory Staff
Delivery Staff

==================================================
5. EMPLOYEE TABLE
==================================================

Create the primary employee table.

Columns:

Employee
Employee ID
Role
Phone
Status
Last Active
Actions

Example:

Mahbub Rahman
EMP-00012
Cashier
01712 345678
Active
Today

Rahim Ahmed
EMP-00013
Delivery Staff
01812 456789
Active
Today

Karim Hasan
EMP-00014
Inventory Staff
01912 567890
Inactive
28 Aug 2026

Keep the table compact.

==================================================
6. ADD EMPLOYEE
==================================================

Create ONE reusable Add/Edit Employee form.

Fields:

Full Name
Phone
Email
Role
Employee ID
Status

Optional:

Notes

Employee ID should be generated automatically where possible.

Do not ask users to manage technical authentication identifiers.

==================================================
7. ACCOUNT STATUS
==================================================

Statuses:

Active
Inactive

Inactive employees cannot access the system.

Historical records created by them must remain intact.

==================================================
8. ROLE SYSTEM
==================================================

Create ONE Roles & Permissions view.

Show roles:

Owner
Manager
Cashier
Inventory Staff
Delivery Staff

Do not create a complex custom-role builder yet.

==================================================
9. OWNER ROLE
==================================================

Owner permissions:

Dashboard
POS
Products
Inventory
Purchases
Suppliers
Sales
Customers
Customer Dues
Orders
Delivery
Expenses
Finance
Reports
Employees
Notifications
Settings

Owner has full access.

==================================================
10. MANAGER ROLE
==================================================

Manager permissions:

Dashboard
POS
Products
Inventory
Purchases
Suppliers
Sales
Customers
Customer Dues
Orders
Delivery
Expenses
Finance
Reports

Do NOT give employee-management or system-settings access by default.

==================================================
11. CASHIER ROLE
==================================================

Cashier permissions:

Dashboard
POS
Sales
Customers

Optional:

View Products

Cashier should NOT have access to:

Purchases
Supplier Payables
Finance
Reports
Employees
Settings

Keep permissions understandable.

==================================================
12. INVENTORY STAFF ROLE
==================================================

Inventory Staff permissions:

Dashboard
Products
Inventory
Purchases

Optional:

Suppliers — View only

They should NOT have access to:

Finance
Customer Dues
Employees
Settings

==================================================
13. DELIVERY STAFF ROLE
==================================================

Delivery Staff permissions:

Dashboard
Orders
Delivery

They should only access delivery-related customer/order information required for fulfillment.

Do not expose unnecessary financial information.

==================================================
14. PERMISSION MATRIX
==================================================

Create a compact permission matrix.

Rows:

Dashboard
POS
Products
Inventory
Purchases
Suppliers
Sales
Customers
Customer Dues
Orders
Delivery
Expenses
Finance
Reports
Employees
Notifications
Settings

Columns:

Owner
Manager
Cashier
Inventory
Delivery

Use simple:

Allowed
View Only
No Access

Do not use a huge complicated matrix.

==================================================
15. VIEW VS ACTION PERMISSIONS
==================================================

Where useful, distinguish:

View
Create
Edit
Delete

Example:

Cashier:

Sales
View + Create

Products
View Only

Purchases
No Access

Do not create dozens of individual permissions.

Keep the first version understandable.

==================================================
16. EMPLOYEE DETAILS
==================================================

Create ONE compact employee detail view.

Show:

Name
Employee ID
Role
Phone
Email
Status
Last Active

Also show:

Recent Activity

Example:

Created Sale SE-20483
4 Sep · 2:14 PM

Updated Customer
4 Sep · 1:48 PM

Do not create a separate activity-management module here.

==================================================
17. ROLE CHANGE
==================================================

Create one compact confirmation interaction.

Example:

Change role?

Mahbub Rahman

Current:
Cashier

New:
Manager

Message:

"Changing this role will update the employee's system access."

Actions:

Cancel
Update Role

==================================================
18. DEACTIVATE EMPLOYEE
==================================================

Create one compact confirmation.

Title:

"Deactivate employee?"

Message:

"The employee will lose access to the system. Historical activity will remain available."

Actions:

Cancel
Deactivate

==================================================
19. ACTIVITY ATTRIBUTION
==================================================

Important:

Existing modules should display the employee responsible for important actions.

Examples:

Purchase received by:
MD. SELIM

Sale created by:
Mahbub Rahman

Stock adjusted by:
Rahim Ahmed

Payment recorded by:
MD. SELIM

Do not redesign those modules.

This prompt only establishes the employee relationship.

==================================================
20. SECURITY PRINCIPLE
==================================================

The interface should never imply that hiding a navigation item alone provides security.

Permissions will eventually be enforced by the backend.

The UI should simply represent the permission model.

Do not display technical security implementation details.

==================================================
21. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Use realistic names and phone formats.

Example:

01712 345678

Do not introduce international employee systems.

==================================================
22. VISUAL DIRECTION
==================================================

Maintain:

Premium
Minimal
Professional
Black and white
Neutral gray
Security-conscious
Information-dense

Avoid:

Social-media-style employee profiles
Large avatars
Colorful HR dashboards
Decorative illustrations
Heavy shadows

This is an operational access-control system, not an HR social platform.

==================================================
23. EMPTY STATE
==================================================

Create one empty state:

"No employees found"

Supporting text:

"Add an employee to start managing system access."

Primary action:

"Add Employee"

==================================================
24. OUTPUT LIMIT
==================================================

Generate only:

1. Employees list
2. Add/Edit Employee form
3. Employee Details
4. Roles & Permissions
5. Permission matrix
6. Role change confirmation
7. Deactivate confirmation
8. One empty state

Reuse existing components.

Do NOT generate:

- Authentication redesign
- Dashboard redesign
- POS redesign
- Products
- Inventory
- Purchases
- Suppliers
- Customers
- Orders
- Delivery
- Finance
- Reports
- Settings

Those already exist or are future prompts.

This is PROMPT 19 OF 22.

The core principle is:

EMPLOYEE
→ ROLE
→ PERMISSIONS
→ SYSTEM ACCESS

And important actions throughout the application should be attributable to the employee who performed them.