SELIM ELECTRONICS — PROMPT 07 OF 22
CATEGORIES & BRANDS MANAGEMENT

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 07 OF 22.

This module must directly connect to the Product Catalog created in PROMPT 06.

Products created in PROMPT 06 use:
- Category
- Subcategory
- Brand

This prompt now designs how authorized staff manage those classifications.

DO NOT redesign the existing design system.

Reuse exactly the existing:
- Typography
- Black/white palette
- Sidebar
- Header
- Buttons
- Tables
- Inputs
- Badges
- Modals
- Icons
- Spacing
- Borders
- Radius

CREDIT-EFFICIENCY RULE:
Keep this module compact.

Create one primary Categories & Brands management page with reusable panels/modals rather than generating many duplicate pages.

==================================================
PRODUCT CONTEXT
==================================================

Selim Electronics sells a large variety of electronics and electrical products.

The catalog needs a clear classification system.

Examples:

Electrical
├── Lighting
│   ├── LED Bulb
│   ├── Tube Light
│   └── Panel Light
│
├── Switches & Sockets
│   ├── Switch
│   ├── Socket
│   └── Extension
│
├── Wires & Cables
│   ├── House Wire
│   └── Cable
│
Home Appliances
├── Fans
│   ├── Ceiling Fan
│   ├── Wall Fan
│   ├── Pedestal Fan
│   └── Table Fan
│
└── Other Appliances

These are examples only.

The interface must allow the actual Selim Electronics catalog to grow beyond these examples.

==================================================
1. PAGE STRUCTURE
==================================================

Page title:

"Categories & Brands"

Supporting text:

"Organize your product catalog."

Use two clear sections/tabs:

Categories
Brands

Keep both within the same management experience.

Do not create two unrelated application sections.

==================================================
2. CATEGORIES SECTION
==================================================

Create a category-management interface.

Support:

- Parent categories
- Subcategories
- Product count
- Active/inactive status
- Search
- Add category

Display categories in a clean hierarchy.

Example:

Electrical
  Lighting
    LED Bulb
    Tube Light
    Panel Light

Home Appliances
  Fans
    Ceiling Fan
    Wall Fan
    Table Fan

The hierarchy should be visually easy to scan.

==================================================
3. CATEGORY ROW INFORMATION
==================================================

Each category should show:

Category name
Parent category
Number of products
Status
Actions

Example:

Lighting
Parent: Electrical
184 products
Active

==================================================
4. CATEGORY ACTIONS
==================================================

Use the existing compact overflow menu.

Actions:

Edit
Add subcategory
View products
Archive

Do not create large action buttons.

==================================================
5. ADD / EDIT CATEGORY
==================================================

Create ONE reusable modal/form.

Fields:

Category Name
Parent Category
Description
Status

Example:

Category Name:
LED Bulb

Parent:
Lighting

Status:
Active

Keep it compact.

==================================================
6. CATEGORY ARCHIVE
==================================================

Create one reusable confirmation modal.

Title:

"Archive category?"

Message:

"Products in this category will remain available, but the category will no longer be active."

Actions:

Cancel
Archive

Do not imply that historical products or sales records are deleted.

==================================================
7. BRANDS SECTION
==================================================

Create a clean brand-management table/list.

Columns:

Brand
Products
Status
Actions

Example brands:

Walton
Philips
Vision
Super Star
Havells
Panasonic

Use realistic electronics/electrical brands.

Do not imply that all these brands are necessarily currently sold by Selim Electronics; they are interface examples.

==================================================
8. BRAND SEARCH
==================================================

Add:

"Search brands..."

Allow filtering/searching.

Primary action:

"+ Add Brand"

==================================================
9. ADD / EDIT BRAND
==================================================

Create ONE compact reusable modal/form.

Fields:

Brand Name
Description
Status

Optional:

Brand logo/image

Do not create a complex brand identity system.

==================================================
10. BRAND DETAILS
==================================================

When a brand is selected, show a compact detail view:

Brand name
Product count
Active status
Recent products

Provide:

"View products"

This should connect back to the Products module created in PROMPT 06.

Do not create a completely separate analytics page.

==================================================
11. PRODUCT COUNT RELATIONSHIP
==================================================

Show product counts beside categories and brands.

Example:

Lighting
184 products

Walton
126 products

These counts help staff understand catalog structure.

The counts are demonstration data only.

==================================================
12. EMPTY STATES
==================================================

Create one reusable empty state for:

No categories

Example:

"No categories yet"

"Create a category to organize your products."

Primary action:

"Add Category"

Use the same visual philosophy for Brands.

Do not generate separate decorative illustrations.

==================================================
13. SEARCH / FILTER STATE
==================================================

Show one compact example of filtered results.

Example:

Search:
"fan"

Result:

Fans
Ceiling Fan
Wall Fan
Pedestal Fan
Table Fan

Keep it simple.

==================================================
14. RELATIONSHIP WITH PRODUCTS
==================================================

This module must connect directly with PROMPT 06.

Product creation/editing uses:

Category
Subcategory
Brand

When a category or brand is archived:

- Existing historical product records must remain intact.
- Products should not be visually presented as deleted.
- Future product creation should not use archived classifications.

Do not design the backend behavior.

Only reflect the concept in the UI.

==================================================
15. VISUAL DIRECTION
==================================================

Maintain the same Selim Electronics visual language:

Black
White
Neutral gray
Minimal semantic colors

Premium
Quiet
Precise
Professional

Do not turn this into a colorful taxonomy-management interface.

Use hierarchy, whitespace, typography and subtle borders.

==================================================
16. DESKTOP LAYOUT
==================================================

Primary target:

1440px desktop.

Use the existing application shell.

Keep the content width comfortable.

Do not waste screen space.

The category hierarchy and brand table should be easy to scan.

==================================================
17. BANGLADESH CONTEXT
==================================================

This is a Bangladesh-only business.

Do not introduce international currencies or unrelated regional systems.

No need for tax configuration or international marketplace features here.

==================================================
18. OUTPUT LIMIT
==================================================

Generate only:

1. Categories & Brands main management screen
2. Category hierarchy
3. Add/Edit Category modal
4. Brands list
5. Add/Edit Brand modal
6. One archive confirmation
7. One empty/search state where useful

Reuse existing components.

Do NOT generate:
- Product management redesign
- Inventory
- Purchases
- Sales
- POS
- Customers
- Suppliers
- Orders
- Delivery
- Finance
- Reports
- Settings

Those will be designed in later prompts.

This is PROMPT 07 OF 22.

The result must look like it belongs to the same Selim Electronics application created through PROMPTS 01–06.

Do not introduce a new design language.