export type Role = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  landmark?: string;
  city: string;
  state: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  isAssured: boolean;
  isBestSeller?: boolean;
  isDealOfTheDay?: boolean;
  colors?: ProductColor[];
  sizes?: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
    totalSales: number;
  };
  deliveryDays: number;
  tags: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Coupon {
  code: string;
  discountType: 'PERCENT' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export type OrderStatus =
  | 'PLACED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface TrackingStep {
  status: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  tax: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  status: OrderStatus;
  trackingHistory: TrackingStep[];
  expectedDelivery: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  subcategories: string[];
}

export type ActiveView =
  | 'home'
  | 'search'
  | 'category'
  | 'product-details'
  | 'cart'
  | 'wishlist'
  | 'checkout'
  | 'order-success'
  | 'orders'
  | 'order-details'
  | 'addresses'
  | 'seller-dashboard'
  | 'admin-dashboard';

export interface FilterState {
  category: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brands: string[];
  inStockOnly: boolean;
  isAssuredOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'newest';
}
