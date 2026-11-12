SELIM ELECTRONICS — PROMPT 06 OF 22
PRODUCTS / CATALOG MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 06 OF 22.

The previous prompts established:
01 — Design System + Application Shell
02 — Authentication
03 — Dashboard
04 — POS / New Sale
05 — Sales Management

This prompt must extend those existing screens.

DO NOT redesign or replace the existing:
- Typography
- Color system
- Black/white visual language
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
- Overall visual identity

Use the existing Selim Electronics components wherever possible.

CREDIT-EFFICIENCY RULE:
Create only the essential product-management screens and states. Reuse components instead of generating duplicate variations. Do not create decorative concept screens.

==================================================
PRODUCT CONTEXT
==================================================

Selim Electronics is a Bangladesh-only electronics and electrical retail business.

The business purchases products from many dealers/suppliers and sells them through the physical store and later through the customer application.

The catalog can contain a very large number of products.

Products may include:

- Fans
- LED bulbs
- Tube lights
- Switches
- Sockets
- Holders
- Wires and cables
- Electrical accessories
- Batteries
- Remotes
- Megaphones
- Home appliances
- Other electronics and electrical products

Products can belong to different:
- Categories
- Subcategories
- Brands
- Models
- Units
- Variants

The product system must therefore be designed for SCALE.

==================================================
1. PRODUCTS PAGE
==================================================

Create the primary Products page.

Page title:

"Products"

Supporting text:

"Manage your product catalog, pricing and availability."

Primary action:

"+ Add Product"

Secondary action:

"Import Products"

The import action is important because Selim Electronics has existing product records and spreadsheets.

Do not create the full import workflow yet.

==================================================
2. PRODUCT SUMMARY
==================================================

At the top, create a compact summary row.

Metrics:

Total Products
1,248

Active
1,182

Low Stock
18

Out of Stock
7

Keep these compact and consistent with the existing dashboard cards.

Do not create oversized colorful metric cards.

==================================================
3. PRODUCT SEARCH
==================================================

Create a prominent product search.

Placeholder:

"Search products by name, SKU, barcode or model..."

Search should conceptually support:

- Product name
- SKU
- Barcode
- Model
- Product code

Include a barcode/search icon.

==================================================
4. PRODUCT FILTERS
==================================================

Create a compact filter bar.

Filters:

Category
Brand
Status
Stock
Store
Price range

Quick stock filters:

All
In Stock
Low Stock
Out of Stock

Use existing filter components.

Allow filters to be combined.

Do not create separate pages for every filter.

==================================================
5. PRODUCT TABLE
==================================================

Create the primary product catalog table.

The table must be optimized for a large catalog.

Columns:

Product
SKU
Brand
Category
Stock
Buying Price
Selling Price
Status
Actions

Example records:

Philips LED Bulb 12W
PHI-LED-12W
Philips
Lighting
86
৳100
৳150
Active

Walton Ceiling Fan 56"
WAL-FAN-56
Walton
Fans
18
৳4,300
৳4,800
Active

Vision Table Fan 12"
VIS-TF-12
Vision
Fans
24
৳2,100
৳2,450
Active

Super Star LED Tube Light 36W
SSL-TUB-36
Super Star
Lighting
0
৳320
৳380
Out of Stock

Walton Switch 2 Gang
WAL-SW-2G
Walton
Switches
3
৳140
৳180
Low Stock

Use ৳ / BDT.

Keep the table compact enough to support hundreds or thousands of records.

==================================================
6. PRODUCT ROW ACTIONS
==================================================

Use the existing overflow action menu.

Actions:

View
Edit
Adjust Stock
Duplicate
Archive

Do not display all actions as separate buttons.

==================================================
7. PRODUCT DETAILS
==================================================

Create ONE Product Details screen/view.

Show:

Product image
Product name
Brand
Category
Model
SKU
Barcode
Unit
Status

Pricing:

Buying price
Selling price
Margin

Inventory:

Current stock
Low-stock threshold
Store/location

Online availability:

Available for POS
Available online

Keep the layout clean and structured.

==================================================
8. PRODUCT INFORMATION
==================================================

Show a structured product information section.

Example:

Product:
Philips LED Bulb 12W

Brand:
Philips

Category:
Lighting / LED Bulb

Model:
PH-12W

SKU:
PHI-LED-12W

Barcode:
8901234567890

Unit:
Piece

Description:
12W LED bulb for general household lighting.

Do not invent unnecessary technical specifications.

==================================================
9. PRODUCT PRICING
==================================================

Create a compact pricing section.

Show:

Current buying cost
Selling price
Profit amount
Margin percentage

Example:

Buying Cost
৳100

Selling Price
৳150

Gross Margin
৳50 · 33.3%

IMPORTANT:

Buying cost and selling price are different concepts.

The product's current displayed cost must not overwrite historical purchase costs.

Historical purchase prices will be managed through the Purchase and Inventory modules in later prompts.

==================================================
10. PRODUCT CREATION / EDITING
==================================================

Create ONE reusable Add/Edit Product form.

Fields:

Product Name
SKU
Barcode
Brand
Category
Subcategory
Model
Unit
Selling Price
Low Stock Threshold
Description

Options:

Show in POS
Available Online
Featured Product
Active / Archived

Do not create a giant form.

Organize fields into logical groups.

==================================================
11. PRODUCT IMAGE
==================================================

Create a compact product-image upload area.

Support:

- Upload image
- Preview
- Replace
- Remove

The design should allow multiple images conceptually, but do not generate a large image-management interface.

==================================================
12. SKU / BARCODE
==================================================

The product form should visually support:

SKU

Barcode

Actions:

Generate SKU
Scan barcode

Do not create a separate barcode-management page.

==================================================
13. PRODUCT STATUS
==================================================

Use the existing status badge system.

Possible states:

Active
Low Stock
Out of Stock
Archived

Do not create new badge styles.

Stock-based statuses should visually connect with the Inventory module that will be designed later.

==================================================
14. PRODUCT AVAILABILITY
==================================================

Create compact controls for:

Show in POS
Available Online

These are separate concepts.

A product may be:

Available in POS
but not listed online.

Or:

Listed online
but currently out of stock.

Make this distinction clear.

==================================================
15. PRODUCT ARCHIVE
==================================================

Products should generally be archived rather than permanently deleted if they have historical sales/purchase records.

Create one confirmation modal:

"Archive product?"

Message:

"This product will no longer appear as an active product, but its historical records will remain available."

Actions:

Cancel
Archive Product

Do not design permanent deletion as the primary action.

==================================================
16. EMPTY STATE
==================================================

Create one empty catalog state.

Title:

"No products found"

Supporting text:

"Try changing your filters or add a new product."

Actions:

Clear filters
Add Product

Keep it minimal.

==================================================
17. LOADING STATE
==================================================

Use the existing skeleton/loading components from PROMPT 01.

Do not create a new loading visual language.

==================================================
18. BULK ACTIONS
==================================================

The catalog should support selecting multiple products.

Show a compact bulk-action bar.

Possible actions:

Archive
Update Status
Export

Do not create the full bulk-edit workflow.

==================================================
19. PAGINATION
==================================================

The product catalog may eventually contain thousands of products.

Use:

- Pagination
- Search
- Filters
- Sorting

Create a realistic paginated table.

Do not show hundreds of rows in the design.

==================================================
20. IMPORT PRODUCTS
==================================================

Show a simple entry point:

"Import Products"

This should open or lead toward a future import workflow.

Do NOT design the complete import wizard in this prompt.

The existing Selim Electronics product spreadsheets will eventually be migrated into this catalog.

==================================================
21. CONNECTION TO OTHER MODULES
==================================================

The product system connects to:

POS:
Products are searched and added to sales.

Sales:
Sale items reference products.

Inventory:
Product stock changes through purchases, sales, returns and adjustments.

Purchases:
Products are purchased from suppliers/dealers at different costs.

Categories:
Every product can belong to a category/subcategory.

Brands:
Products can belong to a brand.

Online Store:
Products marked "Available Online" can appear in the customer application.

Customers:
Customers purchase products.

Reports:
Product performance and profitability will be reported later.

Do not design those modules now.

==================================================
22. BANGLADESH CONTEXT
==================================================

This business operates only in Bangladesh.

Use:

৳ / BDT

Do not introduce:

USD
EUR
International markets
International tax systems
International payment gateways

==================================================
23. VISUAL DIRECTION
==================================================

Maintain the existing Selim Electronics design language.

The product catalog should feel:

Premium
Minimal
Precise
Professional
Information-dense
Fast to operate

Tables should be the primary visual structure.

Avoid:

- Huge product cards
- Excessive product imagery
- Colorful e-commerce layouts
- Rainbow status systems
- Large gradients
- Excessive shadows
- Decorative illustrations
- Generic shopping website design

This is the BUSINESS product-management interface, not the customer shopping app.

==================================================
24. OUTPUT LIMIT
==================================================

Generate only:

1. Products list page
2. Product Details view
3. Add/Edit Product form
4. One Archive confirmation
5. One empty/loading state example
6. Bulk-selection example if needed

Reuse existing components.

Do NOT generate:
- Categories page
- Brands page
- Inventory page
- Purchase page
- POS
- Sales
- Customer management
- Online store
- Finance
- Reports

Those are future prompts.

This is PROMPT 06 OF 22.

The Products module must look like a natural continuation of PROMPTS 01–05.

Do not redesign the existing system.