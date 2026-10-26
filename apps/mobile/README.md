# ZENVORA Android Application Architecture & Implementation Plan

> **Note**: This application is a native React Native + Expo mobile application that consumes the same ZENVORA FastAPI backend as the customer website. It is strictly separated from the customer web interface.

---

## 1. Technology Stack
- **Framework**: React Native 0.74+ with Expo SDK 51+
- **Language**: TypeScript 5+
- **Navigation**: React Navigation 6 (Native Stack + Bottom Tabs)
- **State Management**: Zustand / Redux Toolkit with AsyncStorage persistence
- **Networking**: Axios / TanStack React Query with interceptors for JWT token refresh
- **Design System**: Tailored ZENVORA Design Tokens:
  - Primary Royal Purple: `#5925DC`
  - Secondary White: `#FFFFFF`
  - Accent Electric Orange: `#FF8A00`
  - Light Neutral Gray: `#F7F7FB`

---

## 2. Directory Structure Plan
```
apps/mobile/
├── app.json                  # Expo Application Manifest
├── package.json              # Mobile Dependencies
├── tsconfig.json             # Mobile TypeScript Config
├── src/
│   ├── api/                  # API client matching FastAPI backend endpoints
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── orders.ts
│   ├── components/           # Reusable Native UI Components
│   │   ├── ProductCard.tsx
│   │   ├── OmniboxSearch.tsx
│   │   ├── BannerCarousel.tsx
│   │   ├── PriceTag.tsx
│   │   └── AddressSelector.tsx
│   ├── navigation/           # Mobile Screen Navigators
│   │   ├── RootNavigator.tsx
│   │   ├── BottomTabNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/              # Screen Views
│   │   ├── HomeScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── WishlistScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── OrderTrackingScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── store/                # Persistent Cart & Auth State
└── assets/                   # Native App Icons, Adaptive Splash Screens
```

---

## 3. Native Device Integrations
1. **Push Notifications**: Expo Notifications with Firebase Cloud Messaging (FCM) for order dispatch and live delivery updates.
2. **Camera & Barcode Scanning**: Expo Camera for QR code scanning at delivery / returns.
3. **Location Services**: Expo Location for auto-detecting delivery pincode with GPS precision.
4. **Secure Storage**: Expo SecureStore for encrypted storage of JWT refresh tokens.
