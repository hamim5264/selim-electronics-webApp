SELIM ELECTRONICS — PROMPT 02 OF 22
AUTHENTICATION & ACCESS EXPERIENCE

Continue building the existing SELIM ELECTRONICS web application in the SAME Figma file.

IMPORTANT:
This is PROMPT 02 OF 22. Do NOT redesign, replace, or reinterpret the design system created in PROMPT 01.

Reuse the exact existing:
- Typography
- Font family
- Black and white visual language
- Spacing system
- Border treatment
- Corner radius
- Button styles
- Input styles
- Icon style
- Overall premium visual language

The goal is to extend the existing product, not create a new visual direction.

Keep the design minimal and credit-efficient: create only the necessary authentication screens and states. Do not generate unnecessary decorative screens or duplicate variations.

==================================================
PRODUCT CONTEXT
==================================================

Selim Electronics is a premium business management platform for a long-established electronics and electrical retail business in Bangladesh.

The web application is used by:
- Owner
- Manager
- Cashier
- Inventory staff
- Accountant
- Delivery staff
- Other authorized employees

Authentication will use Google Sign-In through Firebase Authentication.

Business data and application authorization will be handled by the application backend.

This prompt is ONLY for the authentication and access experience.

==================================================
1. LOGIN SCREEN
==================================================

Create the primary desktop login screen.

Keep it extremely clean and premium.

Use a centered or carefully balanced authentication panel.

Brand:

SELIM ELECTRONICS

Supporting text:

"Business management, simplified."

Login option:

[ Continue with Google ]

The Google button should be visually clear but still follow the monochrome design system.

Also provide a subtle alternative area for future authentication methods without actually adding unnecessary methods.

Include:
- Business branding
- Login action
- Small security/trust statement
- Terms and privacy links

Do not create a marketing landing page.

This is an application login screen, not a website homepage.

==================================================
2. AUTHENTICATION STATES
==================================================

Create reusable states for the same login component rather than completely separate screens.

States:

A. Default
B. Google sign-in loading
C. Authentication failed
D. Network error
E. Session expired

Examples of concise messages:

"Unable to sign in. Please try again."

"Your session has expired. Please sign in again."

"Something went wrong. Please check your connection."

Keep error presentation subtle and consistent with the existing design system.

==================================================
3. ACCESS / AUTHORIZATION STATES
==================================================

Create minimal screens for:

A. Account pending approval

Title:
"Account access pending"

Message:
"Your account is awaiting approval from a business administrator."

B. Account disabled

Title:
"Account unavailable"

Message:
"Your account has been disabled. Please contact a business administrator."

C. Unauthorized page

Title:
"Access restricted"

Message:
"You don't have permission to view this page."

Primary action:
"Back to dashboard"

Do not use dramatic illustrations.

Use typography, whitespace, and simple iconography.

==================================================
4. FIRST-TIME BUSINESS USER STATE
==================================================

Create a lightweight first-time setup screen for an authorized owner/admin.

Purpose:

Allow the business owner to begin configuring Selim Electronics.

Show a simple setup checklist:

Business profile
Store information
Product catalog
Employees
Payment settings

Show progress:

"1 of 5 steps"

Primary action:

"Continue setup"

Keep this screen compact.

Do not design the detailed setup forms yet. Those belong to later prompts.

==================================================
5. SIGN-OUT CONFIRMATION
==================================================

Create one reusable confirmation modal:

Title:
"Sign out?"

Message:
"You will need to sign in again to access Selim Electronics."

Actions:
Cancel
Sign out

Use the existing modal/dialog component from PROMPT 01.

==================================================
6. SESSION / LOADING EXPERIENCE
==================================================

Create only reusable loading states needed during authentication:

- Signing in
- Checking account
- Loading application

Use the existing loading components.

Do not create elaborate loading animations.

==================================================
7. VISUAL DIRECTION
==================================================

The authentication experience must feel:

Premium
Minimal
Trustworthy
Quiet
Professional

Maintain the established black/white aesthetic.

Use generous whitespace.

Avoid:
- Large gradients
- Colorful illustrations
- Excessive shadows
- Decorative graphics
- Generic SaaS illustrations
- Excessive rounded cards

==================================================
8. RESPONSIVE FOUNDATION
==================================================

The primary design is desktop-first.

Also show how the login panel adapts to a narrower viewport without creating a completely separate mobile design.

Do not design the Flutter customer app here.

==================================================
9. REUSABILITY
==================================================

Reuse the existing components from PROMPT 01 wherever possible.

Do not create new button styles, input styles, colors, typography, or icon systems.

If an authentication-specific component is required, make it consistent with the existing system.

==================================================
10. OUTPUT
==================================================

Create only the necessary frames/components for:

1. Login
2. Login loading
3. Login error
4. Account pending
5. Account disabled
6. Unauthorized
7. First-time setup
8. Sign-out confirmation

Keep the number of generated frames intentionally limited.

This is PROMPT 02 OF 22.

Everything created here must remain compatible with PROMPT 01 and the future Selim Electronics prompts.

Do not redesign the existing foundation.

Do not design dashboard, POS, products, inventory, purchases, sales, customers, orders, finance, reports, or settings in this prompt.

The next prompt will build directly on this authentication system and the existing application shell.