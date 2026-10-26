import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Bookmark, 
  Plus, 
  Minus, 
  Tag, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  ArrowLeft 
} from 'lucide-react';
import type { CartItem, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';
import './CartView.css';

interface CartViewProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  savedForLaterItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onSaveForLater: (item: CartItem) => void;
  onMoveToCart: (item: CartItem) => void;
  onRemoveSavedForLater: (cartItemId: string) => void;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  appliedCoupon,
  savedForLaterItems,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  onMoveToCart,
  onRemoveSavedForLater,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  onContinueShopping,
  onShowToast
}) => {
  const [couponInput, setCouponInput] = useState('');

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  // Calculate bill amounts
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const totalActual = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalMrpDiscount = totalMrp - totalActual;

  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENT') {
      couponSavings = Math.round((totalActual * appliedCoupon.discountValue) / 100);
    } else {
      couponSavings = appliedCoupon.discountValue;
    }
  }

  const deliveryFee = totalActual > 499 ? 0 : 40;
  const platformFee = cartItems.length > 0 ? 5 : 0;
  const totalPayable = Math.max(0, totalActual - couponSavings + deliveryFee + platformFee);

  const handleApplyCoupon = (code: string) => {
    const success = onApplyCoupon(code);
    if (success) {
      setCouponInput('');
      onShowToast(`Coupon '${code}' applied successfully!`, 'success');
    } else {
      onShowToast(`Invalid coupon or minimum order value not met for '${code}'`, 'error');
    }
  };

  return (
    <div className="cart-page fade-in">
      <div className="container">
        
        {/* Breadcrumb / Back button */}
        <div className="cart-nav-row">
          <button className="back-link-btn" onClick={onContinueShopping}>
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </button>
          <span className="cart-total-badge">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items in Cart
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="empty-cart-card">
            <div className="empty-cart-icon-wrap">
              <ShoppingBag size={52} className="empty-cart-icon" />
            </div>
            <h2 className="empty-cart-title">Your Shopping Cart is Empty</h2>
            <p className="empty-cart-desc">
              Explore our marketplace to discover incredible deals, trending tech, premium fashion, and home essentials.
            </p>
            <button className="btn-accent empty-cart-cta" onClick={onContinueShopping}>
              <span>Start Shopping</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Main Cart Layout */
          <div className="cart-layout-grid">
            
            {/* Left Column: Items List */}
            <div className="cart-items-column">
              
              <div className="cart-items-card">
                <div className="cart-card-header">
                  <h1 className="cart-heading">Items in Your Cart</h1>
                  <span className="cart-subnote">Price</span>
                </div>

                <div className="items-list">
                  {cartItems.map((item) => {
                    const linePrice = item.product.price * item.quantity;
                    const lineOriginal = item.product.originalPrice * item.quantity;

                    return (
                      <div key={item.id} className="cart-item-row">
                        <div className="cart-item-thumb-box">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.title} 
                            className="cart-item-thumb" 
                          />
                        </div>

                        <div className="cart-item-details">
                          <span className="cart-item-brand">{item.product.brand}</span>
                          <h3 className="cart-item-title">{item.product.title}</h3>
                          
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="cart-item-variants">
                              {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                              {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                            </div>
                          )}

                          <div className="stock-notice">In Stock • Eligible for FREE Express Delivery</div>

                          <div className="cart-item-actions">
                            {/* Quantity Controls */}
                            <div className="item-qty-stepper">
                              <button 
                                className="qty-step-btn"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="qty-display">{item.quantity}</span>
                              <button 
                                className="qty-step-btn"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stockCount}
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <button 
                              className="item-action-link"
                              onClick={() => onSaveForLater(item)}
                            >
                              <Bookmark size={13} />
                              <span>Save for Later</span>
                            </button>

                            <button 
                              className="item-action-link remove"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Trash2 size={13} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        <div className="cart-item-pricing">
                          <span className="item-total-price">{formatCurrency(linePrice)}</span>
                          {lineOriginal > linePrice && (
                            <span className="item-original-price">{formatCurrency(lineOriginal)}</span>
                          )}
                          <span className="item-discount-pct">{item.product.discountPercent}% OFF</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Saved For Later Section */}
              {savedForLaterItems.length > 0 && (
                <div className="saved-later-card">
                  <h3 className="saved-later-heading">
                    Saved for Later ({savedForLaterItems.length})
                  </h3>
                  <div className="saved-items-list">
                    {savedForLaterItems.map(item => (
                      <div key={item.id} className="saved-item-row">
                        <img src={item.product.images[0]} alt={item.product.title} className="saved-thumb" />
                        <div className="saved-info">
                          <h4 className="saved-title">{item.product.title}</h4>
                          <span className="saved-price">{formatCurrency(item.product.price)}</span>
                        </div>
                        <div className="saved-actions">
                          <button 
                            className="btn-primary btn-sm"
                            onClick={() => onMoveToCart(item)}
                          >
                            Move to Cart
                          </button>
                          <button 
                            className="remove-saved-btn"
                            onClick={() => onRemoveSavedForLater(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Coupons & Price Summary */}
            <div className="cart-summary-column">
              
              {/* Promo Coupon Card */}
              <div className="coupon-card">
                <div className="coupon-header">
                  <Tag size={16} className="coupon-icon" />
                  <span>Coupons & Bank Offers</span>
                </div>

                {appliedCoupon ? (
                  <div className="applied-coupon-box">
                    <div className="applied-coupon-info">
                      <span className="applied-code">{appliedCoupon.code}</span>
                      <span className="applied-desc">
                        {appliedCoupon.description} (Saved {formatCurrency(couponSavings)})
                      </span>
                    </div>
                    <button className="remove-coupon-btn" onClick={onRemoveCoupon}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter coupon code (e.g. ZENVORA100)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="coupon-input"
                    />
                    <button 
                      className="apply-coupon-btn"
                      onClick={() => handleApplyCoupon(couponInput)}
                      disabled={!couponInput.trim()}
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Quick available coupons */}
                {!appliedCoupon && (
                  <div className="available-coupons-list">
                    <span className="avail-label">Available Coupons:</span>
                    {AVAILABLE_COUPONS.map(c => (
                      <button
                        key={c.code}
                        className="quick-coupon-pill"
                        onClick={() => handleApplyCoupon(c.code)}
                      >
                        <span className="pill-code">{c.code}</span>
                        <span className="pill-save">
                          {c.discountType === 'PERCENT' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary Bill */}
              <div className="order-summary-card">
                <h2 className="summary-heading">Order Summary</h2>

                <div className="summary-rows-wrap">
                  <div className="summary-row">
                    <span className="row-label">Price ({cartItems.length} items)</span>
                    <span className="row-value">{formatCurrency(totalMrp)}</span>
                  </div>

                  <div className="summary-row green">
                    <span className="row-label">Discount on MRP</span>
                    <span className="row-value">- {formatCurrency(totalMrpDiscount)}</span>
                  </div>

                  {couponSavings > 0 && (
                    <div className="summary-row green">
                      <span className="row-label">Coupon Discount ({appliedCoupon?.code})</span>
                      <span className="row-value">- {formatCurrency(couponSavings)}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span className="row-label">Delivery Fee</span>
                    <span className="row-value">
                      {deliveryFee === 0 ? <span className="free-tag">FREE</span> : formatCurrency(deliveryFee)}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span className="row-label">Platform Convenience Fee</span>
                    <span className="row-value">{formatCurrency(platformFee)}</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-row total-row">
                    <span className="total-label">Total Amount</span>
                    <span className="total-value">{formatCurrency(totalPayable)}</span>
                  </div>
                </div>

                <div className="savings-total-banner">
                  You will save {formatCurrency(totalMrpDiscount + couponSavings)} on this order
                </div>

                <button 
                  className="btn-accent checkout-cta-btn"
                  onClick={onProceedToCheckout}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <div className="security-guarantee-note">
                  <ShieldCheck size={16} className="sec-icon" />
                  <span>Safe and Secure Payments • 100% Authentic Products</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
