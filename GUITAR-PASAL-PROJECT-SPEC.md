# Guitar Pasal E-commerce MVP - Complete Project Specification

This document contains the complete, copy-pasteable specification for building the "Guitar Pasal" e-commerce MVP that can be provided to Copilot Coding Agent once the `subammmm/guitar-pasal` repository is created.

## Prerequisites (User Action Required)

Before using this specification with Copilot Coding Agent:

1. **Create GitHub Repository**: `subammmm/guitar-pasal` (empty repository)
2. **Gather API Keys** (can use placeholders initially):
   - eSewa merchant code and configuration
   - Khalti public/secret keys
   - Bank account details for manual transfers

## Complete Project Specification

---

**Title: Build "Guitar Pasal" MVP with eSewa, Khalti, and bank transfer (Nepal-specific)**

**Problem statement:** Implement a production-ready MVP e-commerce site "Guitar Pasal" focused on selling basic guitar picks in Nepal with the following scope.

### Tech stack

- Next.js 14 (App Router, TypeScript), Tailwind CSS
- State: Zustand (cart)
- Database: Prisma + SQLite (file-based), easy to migrate to Postgres later
- API routes for payments and order creation
- Ready for Vercel deployment

### Core features

#### Catalog and cart
- Home page with logo/brand placeholder, hero section, and product grid for guitar picks.
- Product model: id, name, description, imageUrl, thickness (0.5, 0.73, 1.0 mm), packSize (3, 6, 12), priceNpr (integer, NPR), stock.
- Seed a few picks (3–5 SKUs) with realistic NPR prices.
- Client-side cart with add/remove/update; subtotal/total; persists in localStorage.

#### Checkout
- Checkout page collects customer name, phone, email.
- Payment methods: 
  a) **eSewa redirect flow** (sandbox by default): generate form (amt, psc=0, pdc=0, tAmt, pid, scd), redirect to eSewa sandbox, handle success/failure callbacks, verify server-side by calling eSewa verify endpoint, then mark order paid if verified. 
  b) **Khalti widget** (sandbox): use public key on client to get token, verify server-side using secret key (Khalti verify endpoint), then mark order paid. 
  c) **Bank transfer** (Direct bank deposit): show bank details from env; create order with status=PENDING; allow optional note/transaction id.
- Success/failure pages with clear messaging and order reference.

#### Orders
Prisma models:
- **Product**
- **Order**: id (cuid), pid (public id), customerName, phone, email, amountNpr, paymentMethod (ESEWA|KHALTI|BANK), status (PENDING|PAID|FAILED|CANCELLED), providerRef (nullable), createdAt, updatedAt
- **OrderItem**: orderId, productId, quantity, unitPriceNpr

On checkout:
- Create an Order + OrderItems before redirect/initiating payment.
- For eSewa/Khalti, store a pid and pass it through the flow for matching/verification.
- Update status on verification webhooks/callbacks.

#### Admin (minimal)
- /admin route listing latest orders with filters and detail page.
- Guard via simple Basic Auth using env ADMIN_USERNAME and ADMIN_PASSWORD.
- Ability to manually set a PENDING bank order to PAID or FAILED.

### Payments integration details

#### eSewa (sandbox):
- Use env: ESEWA_ENV=sandbox|live, ESEWA_MERCHANT_CODE, ESEWA_SUCCESS_URL, ESEWA_FAILURE_URL.
- Redirect URL for sandbox: https://rc-epay.esewa.com.np/api/epay/main
- Verification endpoint (sandbox): https://uat.esewa.com.np/epay/transrec
- Verify server-side with amt, rid, pid, scd and mark PAID if verified; otherwise FAILED.

#### Khalti (sandbox):
- Client uses NEXT_PUBLIC_KHALTI_PUBLIC_KEY.
- Server verifies with KHALTI_SECRET_KEY via https://khalti.com/api/v2/payment/verify/ (sandbox host automatically handled by headers/keys).
- On success, mark PAID; store idx in providerRef.

#### Bank transfer:
- Show env-driven details: BANK_NAME, BANK_ACCOUNT_NAME, BANK_ACCOUNT_NUMBER, BANK_BRANCH, OPTIONAL_BANK_NOTES.
- Create PENDING order immediately; success page instructs user to send proof via email or WhatsApp (from env).

### UX and styling
- Clean, fast UI with Tailwind.
- Mobile-first responsive layout.
- Brand color defaults: brand blue (#0ea5e9) with a dark background; use placeholders if no logo.
- Basic accessibility (labels, focus states).

### Configuration and docs
Provide .env.example with:
```
NEXT_PUBLIC_SITE_NAME=Guitar Pasal
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ESEWA_ENV=sandbox
ESEWA_MERCHANT_CODE=your_scd
ESEWA_SUCCESS_URL=http://localhost:3000/checkout/success
ESEWA_FAILURE_URL=http://localhost:3000/checkout/failure
NEXT_PUBLIC_KHALTI_PUBLIC_KEY=test_public_key_xxx
KHALTI_SECRET_KEY=test_secret_key_xxx
BANK_NAME=Your Bank
BANK_ACCOUNT_NAME=Guitar Pasal
BANK_ACCOUNT_NUMBER=1234567890
BANK_BRANCH=Kathmandu
OPTIONAL_BANK_NOTES=Send slip via email/WhatsApp after transfer
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_me
DATABASE_URL=file:./dev.db
```

README with setup steps, migration command, and how to switch sandbox->live.
Add scripts: dev, build, start, prisma migrate.

### Folder structure (suggested)
- src/app: pages (/, /cart, /checkout, /checkout/success, /checkout/failure, /admin)
- src/app/api:
  - /orders/create (POST) – creates order + items and returns pid
  - /esewa/verify (POST) – verifies and updates order
  - /khalti/verify (POST) – verifies and updates order
- src/components: Header, Footer, ProductCard, Cart UI
- src/data: seed for products
- src/lib: utils (currency, id gen, payment helpers)
- prisma/schema.prisma with models listed above

### Acceptance criteria

1. Can browse seeded picks, add to cart, and see totals.
2. Checkout supports 3 methods; eSewa and Khalti complete in sandbox and set order to PAID; bank creates PENDING order and shows instructions.
3. Server-side verification prevents marking PAID unless provider verifies.
4. Admin route lists orders with filters (status) and detail; Basic Auth gate.
5. README and .env.example present; local dev works with npm install && npm run dev; prisma migrations included.
6. Code is typed (TypeScript), lint-clean, and deployable to Vercel.
7. All payment secrets read from env; no secrets committed.

### **Non-goals for this PR**
- Inventory management, coupons, shipping rates, email receipts, multi-currency.

### **Deliverables**
- One pull request against the default branch with all code, schema, and docs.
- Screenshots in the PR description of home, cart, checkout, success, admin orders list.

### **Notes**
- Use sandbox/test keys by default. Leave placeholders and document where to put live keys.
- Use robust error handling on verification routes; log provider responses.

---

## Usage Instructions

1. Create the empty repository `subammmm/guitar-pasal` on GitHub
2. Copy the specification above (everything after "Complete Project Specification")
3. Paste it as instructions to Copilot Coding Agent in the new repository
4. Copilot will implement the complete e-commerce solution
5. After implementation, add your real API keys to the environment variables
6. Deploy to Vercel or your preferred platform

This specification provides everything needed for a complete, production-ready e-commerce MVP focused on the Nepal market.