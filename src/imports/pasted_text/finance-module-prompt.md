SELIM ELECTRONICS — PROMPT 17 OF 22
FINANCE MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 17 OF 22.

The following modules already exist and MUST be reused:

Products
Inventory
Purchases
Supplier Payables
POS
Sales
Customers
Customer Dues
Online Orders
Delivery
Expenses

This Finance module is an AGGREGATION layer.

DO NOT create duplicate financial transaction systems.

Finance should summarize financial data already created by:
- Sales
- Customer Payments
- Customer Dues
- Purchases
- Supplier Payments
- Supplier Payables
- Expenses

DO NOT redesign existing modules.

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
- Cards
- Charts
- Icons
- Spacing
- Borders
- Radius

CREDIT-EFFICIENCY RULE:
Create only the essential Finance Dashboard, Cash Flow view, and Financial Transactions view. Reuse existing components and patterns.

==================================================
CORE PURPOSE
==================================================

Finance answers:

"How is Selim Electronics performing financially?"

The owner should quickly understand:

Revenue
Expenses
Gross Profit
Net Profit
Customer Receivables
Supplier Payables
Cash In
Cash Out

Finance must NOT create a second version of sales, purchases, expenses or dues.

It summarizes those modules.

==================================================
1. FINANCE PAGE
==================================================

Create the main Finance page.

Page title:

"Finance"

Supporting text:

"Monitor revenue, expenses, profit and outstanding balances."

Top controls:

Date Range
Store

Default:

Today

Allow:

7 Days
30 Days
3 Months
1 Year
Custom

Use existing filter patterns.

==================================================
2. FINANCIAL SUMMARY
==================================================

Create compact KPI cards:

Revenue
৳2,84,500

Cost of Goods Sold
৳2,21,700

Gross Profit
৳62,800

Expenses
৳18,500

Net Profit
৳44,300

Do not make the cards oversized.

Keep the visual hierarchy consistent with the Dashboard.

==================================================
3. REVENUE
==================================================

Show revenue generated from completed sales.

Revenue can originate from:

POS Sales
Online Orders

Do not count cancelled transactions.

Show:

Revenue
৳2,84,500

Optional comparison:

↑ 8.6% vs previous period

Use the existing subtle comparison styling.

==================================================
4. COST OF GOODS SOLD
==================================================

Show:

"Cost of Goods Sold"

Example:

৳2,21,700

This represents the cost associated with products sold.

Do not confuse it with:

Current Inventory Value
Purchase Total
Selling Price

Keep terminology precise.

==================================================
5. GROSS PROFIT
==================================================

Show:

Gross Profit

Example:

৳62,800

Conceptually:

Revenue
minus
Cost of Goods Sold

Do not display accounting formulas everywhere.

==================================================
6. OPERATING EXPENSES
==================================================

Show:

Expenses

Example:

৳18,500

Expense data comes from the Expenses module.

Do not create another expense-entry system.

==================================================
7. NET PROFIT
==================================================

Show:

Net Profit

Example:

৳44,300

Keep the visual hierarchy strong but minimal.

Do not claim this is a tax/accounting statement.

==================================================
8. FINANCIAL TREND
==================================================

Create ONE compact line chart.

Title:

"Financial Overview"

Show:

Revenue
Expenses
Net Profit

Time ranges:

7d
30d
3m
1y

Keep the chart extremely clean.

No 3D charts.
No decorative gradients.
No excessive colors.

Use the existing black/white visual language and subtle semantic indicators.

==================================================
9. CASH FLOW
==================================================

Create ONE compact Cash Flow section.

Show:

Money In
Money Out
Net Cash Flow

Example:

Money In
৳3,120,000

Money Out
৳2,680,000

Net Cash Flow
৳440,000

Money In may include:

Customer payments
Sales payments
Other legitimate receipts

Money Out may include:

Supplier payments
Expenses
Other legitimate business payments

Do not create a bank-accounting system.

==================================================
10. RECEIVABLES
==================================================

Show:

Customer Receivables

Example:

৳3,410,200

Supporting text:

"Money currently owed by customers."

Provide conceptual access to:

"View Customer Dues"

Do not redesign Customer Dues.

==================================================
11. PAYABLES
==================================================

Show:

Supplier Payables

Example:

৳2,710,000

Supporting text:

"Money currently owed to suppliers."

Provide conceptual access:

"View Supplier Payables"

Do not redesign Supplier Payables.

==================================================
12. FINANCIAL POSITION
==================================================

Create a compact section:

Customer Receivables
৳3,410,200

Supplier Payables
৳2,710,000

Inventory Value
৳18,450,000

Do not call this a formal balance sheet.

Use the heading:

"Business Position"

==================================================
13. RECENT FINANCIAL TRANSACTIONS
==================================================

Create a compact table.

Columns:

Date
Reference
Type
Description
Amount

Examples:

4 Sep 2026
SE-20483
Sale
POS Sale
+৳8,450

4 Sep 2026
PAY-C-0081
Customer Payment
Rahim Electronics
+৳5,000

4 Sep 2026
PAY-0091
Supplier Payment
Walton Distributor
-৳300,000

4 Sep 2026
EXP-00982
Expense
Electricity Bill
-৳18,500

Use positive/negative semantics without excessive color.

==================================================
14. TRANSACTION FILTER
==================================================

Allow filtering:

Sales
Customer Payments
Supplier Payments
Expenses

Do not create duplicate transaction entry screens.

==================================================
15. DATE RANGE
==================================================

Finance must support:

Today
This Week
This Month
Last Month
3 Months
1 Year
Custom Range

Use the existing date/filter component.

==================================================
16. EXPORT
==================================================

Add a compact:

"Export"

action.

Do not design a complex export builder.

==================================================
17. EMPTY STATE
==================================================

Create one empty state:

"No financial activity"

Supporting text:

"Financial activity will appear here as sales, payments and expenses are recorded."

==================================================
18. DATA RELATIONSHIPS
==================================================

Finance aggregates existing records.

Sales
→ Revenue

Sales
→ Cost of Goods Sold

Expenses
→ Operating Expenses

Customer Payments
→ Money In

Supplier Payments
→ Money Out

Customer Dues
→ Receivables

Supplier Payables
→ Payables

Inventory
→ Inventory Value

Do NOT create separate duplicate records inside Finance.

==================================================
19. IMPORTANT DATA RULE
==================================================

Do not modify source transactions from Finance.

Finance is a reporting/aggregation layer.

For example:

Original Sale:
৳20,000

Finance may summarize it.

Finance must NOT edit the sale amount.

==================================================
20. BANGLADESH CONTEXT
==================================================

Bangladesh only.

Currency:

৳ / BDT

Payment methods:

Cash
Bank
bKash
Nagad
SSLCommerz for online customer payments

Do not introduce international currencies.

==================================================
21. VISUAL DIRECTION
==================================================

Finance should feel:

Premium
Minimal
Calm
Precise
Trustworthy
Professional

Use:

Black
White
Neutral gray
Subtle semantic states

Avoid:

Colorful accounting dashboards
Giant charts
Excessive gradients
Decorative illustrations
Heavy shadows
Generic accounting templates

==================================================
22. OUTPUT LIMIT
==================================================

Generate only:

1. Finance Dashboard
2. Financial Overview chart
3. Cash Flow section
4. Business Position section
5. Recent Financial Transactions
6. One empty state

Reuse existing components.

Do NOT generate:

- New sales system
- New purchase system
- New expense system
- Customer Dues redesign
- Supplier Payables redesign
- Inventory redesign
- Online Orders
- Delivery
- Employees
- Settings

Those already exist or are future prompts.

This is PROMPT 17 OF 22.

Finance must summarize the existing business data rather than create duplicate financial records.