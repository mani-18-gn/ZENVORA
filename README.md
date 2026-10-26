# ZENVORA — Everything You Want. One Destination.

![Brand Primary](https://img.shields.io/badge/Primary%20Color-%235925DC-blueviolet)
![Accent](https://img.shields.io/badge/Accent%20Color-%23FF8A00-orange)
![Quality](https://img.shields.io/badge/Quality-Zenvora%20Assured-purple)
![Architecture](https://img.shields.io/badge/Architecture-Modular%20Full--Stack-brightgreen)

ZENVORA is a modern e-commerce marketplace combining the operational usability of Amazon, Flipkart, Meesho, and Shopsy with a unique, high-polish brand identity.

---

## 🎨 Brand Identity & Design Tokens

- **Brand Name**: ZENVORA
- **Tagline**: *Everything You Want. One Destination.*
- **Primary Color**: Royal Purple (`#5925DC`) — symbolizes trust, premium curation, and royalty
- **Secondary Color**: Clean White (`#FFFFFF`) — for high contrast and readability
- **Accent Color**: Electric Orange (`#FF8A00`) — drives urgency, CTAs, flash sales, and badges
- **Background**: Light Neutral Gray (`#F7F7FB`) — soft, modern canvas with zero visual clutter
- **Typography**: Plus Jakarta Sans & Outfit (Google Fonts)

---

## 📂 Project Architecture

```
d:/Zenvora/
├── apps/
│   ├── web/                    # Customer Website (React 19 + Vite + TypeScript + Custom Design System)
│   │   ├── src/
│   │   │   ├── components/     # Reusable modular UI components (Navbar, Cards, Cart, Checkout, etc.)
│   │   │   ├── data/           # Verified realistic product catalog, coupons, and mock persistence
│   │   │   ├── types/          # Strict TypeScript interfaces
│   │   │   ├── App.tsx         # Central application state router
│   │   │   └── index.css       # ZENVORA Design System & CSS variables
│   │   └── package.json
│   │
│   └── mobile/                 # Native Android Application (React Native + Expo)
│       ├── app.json            # Expo app manifest
│       ├── package.json        # Native dependencies
│       └── README.md           # Mobile app architecture & device integration plan
│
├── backend/                    # Modular Python + FastAPI REST API
│   ├── app/
│   │   ├── api/v1/             # Endpoints (auth, products, orders, cart, seller, admin)
│   │   ├── core/               # Security, JWT tokens, config, database sessions
│   │   ├── models/             # SQLAlchemy PostgreSQL ORM models
│   │   ├── schemas/            # Pydantic v2 validation schemas
│   │   └── main.py             # FastAPI entry point
│   └── requirements.txt        # Backend dependencies
│
└── README.md                   # Marketplace Architecture & Documentation
```

---

## 🚀 Customer Website Features (`apps/web`)

1. **Responsive Omnibox Navigation**:
   - Location delivery picker modal with instant pincode validation.
   - Omnibox search bar with category filtering and real-time live autocomplete suggestions.
   - Quick counters for Wishlist and Cart items.
   - Role switcher / portal shortcuts for Seller Hub and Admin Portal.
   - User account menu with My Orders, Saved Addresses, and Logout.

2. **Promotional Hero Carousel & Badges**:
   - Dynamic slide transitions with Deal tags, custom typography, and action buttons.
   - Four trust badges: 100% Authentic Zenvora Assured, Free Express Shipping, 7-Day Easy Return, 24/7 Dedicated Support.

3. **Product Catalog & Cards**:
   - Deal of the Day countdown timer.
   - High-resolution product images with hover zoom.
   - Badges: *Zenvora Assured*, *Best Seller*, *Limited Time Deal*.
   - Star ratings and verified review counts.
   - Interactive animated Wishlist heart toggle.
   - Quick Add to Cart with live quantity stepper `(- 1 +)`.

4. **Product Details View**:
   - Breadcrumb navigation path.
   - Multi-thumbnail gallery rail.
   - Savings calculator with inclusive tax notice.
   - Bank offers & clickable coupon cards.
   - Interactive Color swatch and Size/Storage variant selectors.
   - Pincode delivery & COD availability checker.
   - Verified seller scorecard.
   - Technical specifications breakdown.
   - Verified buyer review list with rating distribution bars and review submission form.

5. **Search Results & Multi-Facet Filtering**:
   - Sorting by: Featured, Price (Low to High / High to Low), Customer Rating, Discount %, Most Popular.
   - Multi-facet sidebar filters: Category, Price range slider/inputs, Brand checkboxes, Minimum Customer Rating, Zenvora Assured toggle, In-Stock only.
   - Active filter chips with quick 'x' removal and Clear All link.

6. **Shopping Cart**:
   - Itemized list with thumbnail, selected variant, line total, and original MRP.
   - Quantity stepper and Save for Later section.
   - Coupon promo input with validator and quick coupon chips (`ZENVORA100`, `FESTIVE15`, `WELCOME50`).
   - Order summary bill: Total MRP, Discount on MRP, Coupon Savings, Delivery Fee, Platform Fee, Total Payable.

7. **Multi-Step Checkout Flow**:
   - Step 1: Delivery Address (Select saved address or inline Add New Address).
   - Step 2: Delivery Speed (Standard Free vs Priority Morning ₹99).
   - Step 3: Payment Method (UPI PhonePe/GPay, Credit/Debit Card, Net Banking, COD) with clear security notice.
   - Step 4: Order Review & Confirmation.
   - Order Success celebration view with confetti animation and Order ID.

8. **Order Tracking & Management**:
   - Past orders list with status badges (Placed, Shipped, Delivered, Cancelled).
   - Interactive visual tracking milestone timeline (Order Placed -> Packed -> Shipped -> Out for Delivery -> Delivered).
   - Printable retail cash memo invoice view.
   - Order cancellation and return request dialogs.

9. **Address Management**:
   - Saved addresses grid with Default tag, Edit, and Delete actions.
   - Modal form with strict validation (Name, 10-digit Phone, 6-digit Pincode, Flat/Building, Locality, Landmark, City, State, Type: Home/Work).

10. **Seller & Admin Portal Previews**:
    - **Seller Hub**: Overview metrics, product catalog management, add product listing form, inventory health tracker, fulfillment list, sales reports.
    - **Admin Control Center**: Gross Marketplace Value (GMV), platform commission, merchant KYC approvals, customer directory, campaign coupons deployer, refund reconciliation manager.

---

## 🔒 Security Principles

- **Zero Hardcoded Secrets**: Credentials, database URLs, and API keys are strictly configured via environment variables (`.env`).
- **Server-Side Price Validation**: Never trusts client-side prices or payment statuses. All cart prices are recomputed server-side from PostgreSQL records before payment confirmation.
- **Payment Gateway Webhook Verification**: Paid orders are only marked fulfilled upon cryptographic signature validation (e.g. SHA-256 HMAC) from the payment provider.
- **No Raw Card Storage**: Card details are never stored on marketplace servers.
- **Role-Based Authorization**: RBAC dependencies protect administrative and seller endpoints (`require_roles(['ADMIN', 'SELLER'])`).

---

## 🛠️ Running Locally

### 1. Customer Website
```bash
cd apps/web
npm install
npm run dev
# Running at: http://127.0.0.1:5173/
```

### 2. Backend API
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# OpenAPI Docs available at: http://127.0.0.1:8000/docs
```

### 3. Android Mobile Application
```bash
cd apps/mobile
npm install
npx expo start --android
```
