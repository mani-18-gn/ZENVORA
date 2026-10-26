import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Check, 
  Clock, 
  Info,
  ChevronRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBannerCarousel } from './components/HeroBannerCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { SearchResults } from './components/SearchResults';
import { CartView } from './components/CartView';
import { WishlistView } from './components/WishlistView';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { OrdersView } from './components/OrdersView';
import { AddressManagementView } from './components/AddressManagementView';
import { AddressModal } from './components/AddressModal';
import { AuthModal } from './components/AuthModal';
import { LocationModal } from './components/LocationModal';
import { SellerDashboardPreview } from './components/SellerDashboardPreview';
import { AdminDashboardPreview } from './components/AdminDashboardPreview';
import { ToastContainer } from './components/ToastContainer';
import type { ToastMessage } from './components/ToastContainer';
import { Footer } from './components/Footer';
import './App.css';

import type { 
  Product, 
  CartItem, 
  Address, 
  Order, 
  Coupon, 
  User, 
  ActiveView 
} from './types';

import { 
  PRODUCTS, 
  CATEGORIES, 
  MOCK_USER, 
  MOCK_ORDERS, 
  AVAILABLE_COUPONS, 
  SAMPLE_DATA_NOTICE 
} from './data/mockData';

export const App: React.FC = () => {
  // Navigation & User State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>();

  // Location State
  const [selectedPincode, setSelectedPincode] = useState<string>('560034');
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');

  // E-commerce State
  const [products] = useState<Product[]>(PRODUCTS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['zen-prod-103', 'zen-prod-104']);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Midnight Obsidian'
    }
  ]);
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(MOCK_USER.addresses);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<Order | null>(null);

  // Modals & Feedback
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Notification System
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast: ToastMessage = { id: 'toast-' + Date.now(), text, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProduct]);

  // Derived Quantities
  const cartItemQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach(item => {
      map[item.product.id] = (map[item.product.id] || 0) + item.quantity;
    });
    return map;
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed '${product.title.slice(0, 28)}...' from Wishlist`, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Added '${product.title.slice(0, 28)}...' to Wishlist`, 'success');
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
    showToast('Item removed from Wishlist', 'info');
  };

  const handleWishlistMoveToCart = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: 'cart-' + Date.now(),
            product,
            quantity: 1,
            selectedColor: selectedColor || product.colors?.[0]?.name,
            selectedSize: selectedSize || product.sizes?.[0]
          }
        ];
      }
    });
    showToast(`Added '${product.title.slice(0, 25)}...' to Cart!`, 'success');
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i.product.id !== productId));
      showToast('Item removed from cart', 'info');
    } else {
      setCartItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
    }
  };

  const handleUpdateCartItemQtyById = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== cartItemId));
      showToast('Item removed from cart', 'info');
    } else {
      setCartItems(prev => prev.map(i => i.id === cartItemId ? { ...i, quantity: newQty } : i));
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const handleSaveForLater = (item: CartItem) => {
    setCartItems(prev => prev.filter(i => i.id !== item.id));
    setSavedForLaterItems(prev => [...prev, item]);
    showToast(`Moved '${item.product.title.slice(0, 25)}...' to Saved for Later`, 'info');
  };

  const handleMoveToCartFromSaved = (item: CartItem) => {
    setSavedForLaterItems(prev => prev.filter(i => i.id !== item.id));
    setCartItems(prev => [...prev, item]);
    showToast(`Moved '${item.product.title.slice(0, 25)}...' to Cart`, 'success');
  };

  const handleRemoveSavedForLater = (cartItemId: string) => {
    setSavedForLaterItems(prev => prev.filter(i => i.id !== cartItemId));
    showToast('Item removed from saved list', 'info');
  };

  // Coupon Handlers
  const handleApplyCoupon = (code: string): boolean => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Address Handlers
  const handleSaveAddress = (address: Address) => {
    setAddresses(prev => {
      const exists = prev.some(a => a.id === address.id);
      let updated: Address[];
      if (exists) {
        updated = prev.map(a => a.id === address.id ? address : a);
      } else {
        updated = [address, ...prev];
      }

      // If set default, remove default from others
      if (address.isDefault) {
        updated = updated.map(a => a.id === address.id ? a : { ...a, isDefault: false });
      }
      return updated;
    });

    showToast(`Address for ${address.name} saved successfully!`, 'success');
    setAddressToEdit(null);
  };

  const handleDeleteAddress = (addrId: string) => {
    setAddresses(prev => prev.filter(a => a.id !== addrId));
    showToast('Address deleted', 'info');
  };

  const handleSetDefaultAddress = (addrId: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === addrId })));
    showToast('Default delivery address updated', 'success');
  };

  // Order Placement
  const handlePlaceOrder = async (orderData: Partial<Order>): Promise<Order> => {
    // Simulated backend order processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newOrder: Order = {
      id: `ZN-${Math.floor(100000 + Math.random() * 900000)}-IN`,
      date: new Date().toISOString(),
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      discountAmount: orderData.discountAmount || 0,
      deliveryFee: orderData.deliveryFee || 0,
      tax: orderData.tax || 0,
      shippingAddress: orderData.shippingAddress || addresses[0],
      paymentMethod: orderData.paymentMethod || 'UPI (Google Pay)',
      paymentStatus: orderData.paymentStatus || 'PAID',
      status: 'PLACED',
      expectedDelivery: 'Expected in 2 business days',
      trackingHistory: [
        { status: 'Order Placed', date: 'Just now', description: 'Order confirmed and verified by ZENVORA system', completed: true },
        { status: 'Packed at Hub', date: 'Upcoming', description: 'Seller will pack item at local fulfillment center', completed: false },
        { status: 'Shipped & In Transit', date: 'Upcoming', description: 'Dispatch via Zenvora Express Logistics', completed: false },
        { status: 'Out for Delivery', date: 'Upcoming', description: 'Doorstep delivery executive assignment', completed: false },
        { status: 'Delivered', date: 'Upcoming', description: 'Delivery OTP verification', completed: false }
      ]
    };

    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setAppliedCoupon(null);
    setLatestPlacedOrder(newOrder);
    return newOrder;
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'CANCELLED' } : o));
  };

  // Navigation Handlers
  const handleNavigate = (view: ActiveView, extra?: any) => {
    if (view === 'category' && extra?.categorySlug) {
      setSelectedCategorySlug(extra.categorySlug);
      setSearchQuery('');
    } else if (view === 'search') {
      if (extra?.query) setSearchQuery(extra.query);
      if (extra?.category) setSelectedCategorySlug(extra.category);
    }
    setActiveView(view);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-details');
  };

  const handleSearchSubmit = (query: string, category?: string) => {
    setSearchQuery(query);
    setSelectedCategorySlug(category);
    setActiveView('search');
  };

  const handleBuyNow = (product: Product, selectedColor?: string, selectedSize?: string) => {
    handleAddToCart(product, selectedColor, selectedSize);
    setActiveView('checkout');
  };

  return (
    <div className="zenvora-app">
      
      {/* Sample Data Dev Label Notice */}
      <aside className="dev-sample-notice" aria-label="Development Mode Indicator">
        <Info size={14} className="notice-icon" />
        <span>{SAMPLE_DATA_NOTICE}</span>
      </aside>

      {/* Main Responsive Header */}
      <Navbar
        user={user}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        activeView={activeView}
        selectedPincode={selectedPincode}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onLogout={() => {
          setUser(null);
          showToast('Signed out successfully.', 'info');
        }}
      />

      {/* Main Content Router */}
      <main className="zen-main-content">
        
        {/* VIEW 1: HOMEPAGE */}
        {activeView === 'home' && (
          <div className="homepage-view fade-in">
            {/* Promotional Carousel */}
            <HeroBannerCarousel 
              onBannerClick={(catSlug) => handleNavigate('category', { categorySlug: catSlug, categoryName: catSlug })} 
            />

            {/* Deal of the Day Section */}
            <section className="container homepage-section">
              <div className="section-title-bar">
                <div className="title-with-badge">
                  <div className="badge-flame-icon">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h2 className="section-heading">Deals of the Day</h2>
                    <span className="section-tagline">Handpicked limited-time offers with maximum savings</span>
                  </div>
                </div>
                <div className="countdown-pill">
                  <Clock size={15} />
                  <span>Ends in <strong>04h 32m 19s</strong></span>
                </div>
              </div>

              <div className="products-grid-4">
                {products.filter(p => p.isDealOfTheDay).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlistIds.includes(product.id)}
                    cartQuantity={cartItemQuantities[product.id] || 0}
                    onProductClick={handleProductClick}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onUpdateCartQty={handleUpdateCartQty}
                  />
                ))}
              </div>
            </section>

            {/* Featured Categories Grid Showcase */}
            <section className="container homepage-section">
              <div className="section-title-bar">
                <div>
                  <h2 className="section-heading">Shop by Category</h2>
                  <span className="section-tagline">Browse millions of certified authentic products</span>
                </div>
              </div>

              <div className="category-showcase-grid">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className="category-showcase-card"
                    onClick={() => handleNavigate('category', { categorySlug: cat.slug, categoryName: cat.name })}
                  >
                    <div className="cat-img-box">
                      <img src={cat.image} alt={cat.name} className="cat-showcase-img" />
                      <div className="cat-overlay" />
                    </div>
                    <div className="cat-card-text">
                      <h3 className="cat-card-title">{cat.name}</h3>
                      <span className="cat-card-sub">{cat.subcategories.length}+ subcategories</span>
                      <span className="cat-browse-link">
                        Explore <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Zenvora Assured & Bestsellers Section */}
            <section className="container homepage-section">
              <div className="section-title-bar">
                <div className="title-with-badge">
                  <div className="badge-assured-icon">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <h2 className="section-heading">Zenvora Assured Bestsellers</h2>
                    <span className="section-tagline">6-Point Quality Checked • Verified Sellers • Express Shipping</span>
                  </div>
                </div>
                <button 
                  className="view-all-link"
                  onClick={() => handleNavigate('search', { query: '' })}
                >
                  <span>View All Bestsellers</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="products-grid-4">
                {products.filter(p => p.isAssured).slice(0, 4).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlistIds.includes(product.id)}
                    cartQuantity={cartItemQuantities[product.id] || 0}
                    onProductClick={handleProductClick}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onUpdateCartQty={handleUpdateCartQty}
                  />
                ))}
              </div>
            </section>

            {/* Trending Tech & Lifestyle Row */}
            <section className="container homepage-section">
              <div className="section-title-bar">
                <div className="title-with-badge">
                  <Sparkles size={20} className="sparkle-icon" />
                  <div>
                    <h2 className="section-heading">Trending Tech & Flagship Devices</h2>
                    <span className="section-tagline">Next-gen wireless audio, 120Hz curved displays, and smart gadgets</span>
                  </div>
                </div>
                <button 
                  className="view-all-link"
                  onClick={() => handleNavigate('category', { categorySlug: 'electronics', categoryName: 'Electronics' })}
                >
                  <span>Explore Tech Fest</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="products-grid-4">
                {products.filter(p => p.category === 'electronics' || p.category === 'mobiles-tablets').map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlistIds.includes(product.id)}
                    cartQuantity={cartItemQuantities[product.id] || 0}
                    onProductClick={handleProductClick}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onUpdateCartQty={handleUpdateCartQty}
                  />
                ))}
              </div>
            </section>

            {/* Brand Partners Marquee Strip */}
            <section className="container homepage-section">
              <div className="partners-strip-card">
                <span className="partners-label">OFFICIAL DIRECT MERCHANT PARTNERS:</span>
                <div className="partners-names">
                  <span>AuraSound Audio</span>
                  <span>•</span>
                  <span>Nova Technologies</span>
                  <span>•</span>
                  <span>Chrono Lux Horology</span>
                  <span>•</span>
                  <span>BrewCraft Espresso</span>
                  <span>•</span>
                  <span>DermaCare Official</span>
                  <span>•</span>
                  <span>SpeedStride Footwear</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SEARCH RESULTS & CATEGORY BROWSING */}
        {(activeView === 'search' || activeView === 'category') && (
          <SearchResults
            searchQuery={searchQuery}
            categoryFilter={selectedCategorySlug}
            allProducts={products}
            wishlistIds={wishlistIds}
            cartItemQuantities={cartItemQuantities}
            onProductClick={handleProductClick}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onResetSearch={() => {
              setSearchQuery('');
              setSelectedCategorySlug(undefined);
              setActiveView('home');
            }}
          />
        )}

        {/* VIEW 3: PRODUCT DETAILS */}
        {activeView === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            isInWishlist={wishlistIds.includes(selectedProduct.id)}
            userPincode={selectedPincode}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onNavigateCategory={(slug, name) => handleNavigate('category', { categorySlug: slug, categoryName: name })}
            onNavigateProduct={handleProductClick}
            similarProducts={products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 4: SHOPPING CART */}
        {activeView === 'cart' && (
          <CartView
            cartItems={cartItems}
            appliedCoupon={appliedCoupon}
            savedForLaterItems={savedForLaterItems}
            onUpdateQuantity={handleUpdateCartItemQtyById}
            onRemoveItem={handleRemoveCartItem}
            onSaveForLater={handleSaveForLater}
            onMoveToCart={handleMoveToCartFromSaved}
            onRemoveSavedForLater={handleRemoveSavedForLater}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            onProceedToCheckout={() => setActiveView('checkout')}
            onContinueShopping={() => setActiveView('home')}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 5: WISHLIST */}
        {activeView === 'wishlist' && (
          <WishlistView
            wishlistProducts={products.filter(p => wishlistIds.includes(p.id))}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onMoveToCart={handleWishlistMoveToCart}
            onProductClick={handleProductClick}
            onContinueShopping={() => setActiveView('home')}
          />
        )}

        {/* VIEW 6: CHECKOUT */}
        {activeView === 'checkout' && (
          <CheckoutView
            addresses={addresses}
            cartItems={cartItems}
            appliedCoupon={appliedCoupon}
            onPlaceOrder={handlePlaceOrder}
            onAddNewAddress={() => {
              setAddressToEdit(null);
              setIsAddressModalOpen(true);
            }}
            onBackToCart={() => setActiveView('cart')}
            onShowToast={showToast}
            onOrderSuccess={(order) => {
              setLatestPlacedOrder(order);
              setActiveView('order-success');
            }}
          />
        )}

        {/* VIEW 7: ORDER SUCCESS CELEBRATION */}
        {activeView === 'order-success' && latestPlacedOrder && (
          <OrderSuccessView
            order={latestPlacedOrder}
            onTrackOrder={() => setActiveView('orders')}
            onContinueShopping={() => setActiveView('home')}
          />
        )}

        {/* VIEW 8: ORDER HISTORY & DETAILS TRACKER */}
        {activeView === 'orders' && (
          <OrdersView
            orders={orders}
            onContinueShopping={() => setActiveView('home')}
            onCancelOrder={handleCancelOrder}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 9: ADDRESS MANAGEMENT */}
        {activeView === 'addresses' && (
          <AddressManagementView
            addresses={addresses}
            onAddNewAddress={() => {
              setAddressToEdit(null);
              setIsAddressModalOpen(true);
            }}
            onEditAddress={(addr) => {
              setAddressToEdit(addr);
              setIsAddressModalOpen(true);
            }}
            onDeleteAddress={handleDeleteAddress}
            onSetDefaultAddress={handleSetDefaultAddress}
            onContinueShopping={() => setActiveView('home')}
          />
        )}

        {/* VIEW 10: SELLER DASHBOARD PREVIEW */}
        {activeView === 'seller-dashboard' && (
          <SellerDashboardPreview
            onBackToCustomerSite={() => setActiveView('home')}
            onShowToast={showToast}
          />
        )}

        {/* VIEW 11: ADMIN DASHBOARD PREVIEW */}
        {activeView === 'admin-dashboard' && (
          <AdminDashboardPreview
            onBackToCustomerSite={() => setActiveView('home')}
            onShowToast={showToast}
          />
        )}

      </main>

      {/* Global Modals */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSaveAddress={handleSaveAddress}
        addressToEdit={addressToEdit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
        onShowToast={showToast}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        currentPincode={selectedPincode}
        currentCity={selectedCity}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={(pin, city) => {
          setSelectedPincode(pin);
          setSelectedCity(city);
          showToast(`Delivery location updated to ${city} (${pin})`, 'info');
        }}
      />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global E-commerce Footer */}
      <Footer 
        onNavigateCategory={(slug, name) => handleNavigate('category', { categorySlug: slug, categoryName: name })}
        onNavigateView={(view) => setActiveView(view)}
      />

    </div>
  );
};

export default App;
