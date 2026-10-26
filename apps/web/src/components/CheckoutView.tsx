import React, { useState } from 'react';
import { 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Lock, 
  QrCode, 
  Building2, 
  Banknote,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import type { Address, CartItem, Coupon, Order } from '../types';
import './CheckoutView.css';

interface CheckoutViewProps {
  addresses: Address[];
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onPlaceOrder: (orderData: Partial<Order>) => Promise<Order>;
  onAddNewAddress: () => void;
  onBackToCart: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  addresses,
  cartItems,
  appliedCoupon,
  onPlaceOrder,
  onAddNewAddress,
  onBackToCart,
  onShowToast,
  onOrderSuccess
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [deliverySpeed, setDeliverySpeed] = useState<'STANDARD' | 'EXPRESS'>('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('vikram@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  // Bill totals
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.product.originalPrice * item.quantity), 0);
  const totalActual = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalDiscount = totalMrp - totalActual;

  let couponSavings = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENT') {
      couponSavings = Math.round((totalActual * appliedCoupon.discountValue) / 100);
    } else {
      couponSavings = appliedCoupon.discountValue;
    }
  }

  const deliveryFee = deliverySpeed === 'EXPRESS' ? 99 : (totalActual > 499 ? 0 : 40);
  const platformFee = 5;
  const totalPayable = Math.max(0, totalActual - couponSavings + deliveryFee + platformFee);

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      onShowToast('Please select or add a delivery address', 'error');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Simulate backend payment verification & order creation
      const paymentMethodLabel = 
        paymentMethod === 'UPI' ? `UPI (${upiId})` :
        paymentMethod === 'CARD' ? `Credit Card (** ${cardNumber.slice(-4)})` :
        paymentMethod === 'NETBANKING' ? `Net Banking (${selectedBank})` :
        'Cash on Delivery';

      const newOrder = await onPlaceOrder({
        items: cartItems.map(i => ({
          productId: i.product.id,
          title: i.product.title,
          image: i.product.images[0],
          price: i.product.price,
          quantity: i.quantity,
          variant: i.selectedColor || i.selectedSize
        })),
        totalAmount: totalPayable,
        discountAmount: totalDiscount + couponSavings,
        deliveryFee,
        tax: Math.round(totalPayable * 0.05),
        shippingAddress: selectedAddress,
        paymentMethod: paymentMethodLabel,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        status: 'PLACED'
      });

      onOrderSuccess(newOrder);
    } catch (err) {
      onShowToast('Order placement failed. Please try again.', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-page fade-in">
      <div className="container">
        
        {/* Navigation */}
        <div className="checkout-top-bar">
          <button className="back-to-cart-btn" onClick={onBackToCart}>
            <ArrowLeft size={16} />
            <span>Return to Shopping Cart</span>
          </button>
          <div className="secure-checkout-badge">
            <Lock size={14} />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>

        <div className="checkout-grid-layout">
          
          {/* Left Column: Multi-step checkout details */}
          <div className="checkout-steps-column">
            
            {/* Step 1: Delivery Address */}
            <section className="checkout-step-card">
              <div className="step-header">
                <div className="step-number">1</div>
                <div className="step-title-wrap">
                  <h2 className="step-title">Select Delivery Address</h2>
                  <span className="step-desc">Where should we deliver your order?</span>
                </div>
                <button className="btn-add-address-quick" onClick={onAddNewAddress}>
                  <Plus size={14} />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="addresses-selector-grid">
                {addresses.map(addr => (
                  <label 
                    key={addr.id} 
                    className={`address-radio-box ${selectedAddressId === addr.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="deliveryAddress"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                    <div className="address-content-box">
                      <div className="addr-top">
                        <span className="addr-name">{addr.name}</span>
                        <span className="addr-type-pill">{addr.type}</span>
                        {addr.isDefault && <span className="addr-default-pill">Default</span>}
                      </div>
                      <p className="addr-lines">
                        {addr.addressLine1}, {addr.addressLine2}
                      </p>
                      <p className="addr-city-pin">
                        {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                      <span className="addr-phone">Phone: {addr.phone}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Step 2: Delivery Speed */}
            <section className="checkout-step-card">
              <div className="step-header">
                <div className="step-number">2</div>
                <div className="step-title-wrap">
                  <h2 className="step-title">Delivery Options</h2>
                  <span className="step-desc">Choose your preferred shipping speed</span>
                </div>
              </div>

              <div className="delivery-speed-grid">
                <label className={`speed-option-box ${deliverySpeed === 'STANDARD' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'STANDARD'}
                    onChange={() => setDeliverySpeed('STANDARD')}
                  />
                  <div className="speed-info">
                    <div className="speed-title-row">
                      <Truck size={18} className="speed-icon" />
                      <span className="speed-name">Standard Express Delivery</span>
                      <span className="speed-price">{totalActual > 499 ? 'FREE' : '₹40'}</span>
                    </div>
                    <p className="speed-eta">Estimated Delivery: <strong>Tomorrow by 4:00 PM</strong></p>
                  </div>
                </label>

                <label className={`speed-option-box ${deliverySpeed === 'EXPRESS' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="deliverySpeed"
                    checked={deliverySpeed === 'EXPRESS'}
                    onChange={() => setDeliverySpeed('EXPRESS')}
                  />
                  <div className="speed-info">
                    <div className="speed-title-row">
                      <Truck size={18} className="speed-icon accent" />
                      <span className="speed-name">Priority Morning Delivery</span>
                      <span className="speed-price">₹99</span>
                    </div>
                    <p className="speed-eta">Guaranteed Delivery: <strong>Tomorrow by 10:00 AM</strong></p>
                  </div>
                </label>
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="checkout-step-card">
              <div className="step-header">
                <div className="step-number">3</div>
                <div className="step-title-wrap">
                  <h2 className="step-title">Payment Method</h2>
                  <span className="step-desc">Select how you would like to complete your purchase</span>
                </div>
              </div>

              {/* Security Sandbox Notice */}
              <div className="payment-security-notice">
                <ShieldCheck size={18} className="sec-shield" />
                <div className="notice-text">
                  <strong>Production Security Compliance:</strong> Client-side credentials are never stored. In accordance with security best practices, mock sandbox simulated gateways are provided during initial integration.
                </div>
              </div>

              <div className="payment-methods-tabs">
                
                {/* UPI Option */}
                <label className={`payment-method-row ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                  <div className="method-left">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                    />
                    <QrCode size={18} className="method-icon" />
                    <div>
                      <span className="method-name">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                      <span className="method-sub">Instant zero-fee payment</span>
                    </div>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="method-details-pane">
                      <label className="input-label">Enter UPI VPA / ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="payment-input"
                        placeholder="yourname@okhdfcbank"
                      />
                      <span className="helper-text">You will receive a simulated collect request on your UPI app</span>
                    </div>
                  )}
                </label>

                {/* Credit / Debit Card Option */}
                <label className={`payment-method-row ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                  <div className="method-left">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                    />
                    <CreditCard size={18} className="method-icon" />
                    <div>
                      <span className="method-name">Credit / Debit Card</span>
                      <span className="method-sub">Visa, Mastercard, RuPay, Amex</span>
                    </div>
                  </div>
                  {paymentMethod === 'CARD' && (
                    <div className="method-details-pane">
                      <div className="card-fields-grid">
                        <div className="field-group full">
                          <label className="input-label">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="payment-input"
                            maxLength={19}
                          />
                        </div>
                        <div className="field-group">
                          <label className="input-label">Valid Thru (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="payment-input"
                            maxLength={5}
                          />
                        </div>
                        <div className="field-group">
                          <label className="input-label">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="payment-input"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* Net Banking */}
                <label className={`payment-method-row ${paymentMethod === 'NETBANKING' ? 'selected' : ''}`}>
                  <div className="method-left">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'NETBANKING'}
                      onChange={() => setPaymentMethod('NETBANKING')}
                    />
                    <Building2 size={18} className="method-icon" />
                    <div>
                      <span className="method-name">Net Banking</span>
                      <span className="method-sub">All major Indian banks supported</span>
                    </div>
                  </div>
                  {paymentMethod === 'NETBANKING' && (
                    <div className="method-details-pane">
                      <label className="input-label">Choose Your Bank:</label>
                      <select 
                        value={selectedBank} 
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="payment-input"
                      >
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="KOTAK">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </label>

                {/* Cash on Delivery */}
                <label className={`payment-method-row ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <div className="method-left">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <Banknote size={18} className="method-icon" />
                    <div>
                      <span className="method-name">Cash on Delivery (COD)</span>
                      <span className="method-sub">Pay via Cash / QR at doorstep upon delivery</span>
                    </div>
                  </div>
                </label>

              </div>
            </section>

          </div>

          {/* Right Column: Order Review & Confirmation */}
          <div className="checkout-summary-column">
            <div className="order-review-card">
              <h3 className="review-title">Review Order</h3>

              {/* Items preview */}
              <div className="checkout-items-preview">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item-mini">
                    <img src={item.product.images[0]} alt={item.product.title} className="mini-thumb" />
                    <div className="mini-info">
                      <span className="mini-title">{item.product.title}</span>
                      <span className="mini-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="mini-price">{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="checkout-bill-rows">
                <div className="bill-row">
                  <span>Items Total ({cartItems.length})</span>
                  <span>{formatCurrency(totalMrp)}</span>
                </div>
                <div className="bill-row green">
                  <span>Product Discounts</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>
                {couponSavings > 0 && (
                  <div className="bill-row green">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>- {formatCurrency(couponSavings)}</span>
                  </div>
                )}
                <div className="bill-row">
                  <span>Shipping Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="green-text">FREE</strong> : formatCurrency(deliveryFee)}</span>
                </div>
                <div className="bill-row">
                  <span>Platform Fee</span>
                  <span>{formatCurrency(platformFee)}</span>
                </div>

                <div className="bill-divider" />

                <div className="bill-row total">
                  <span>Total Payable</span>
                  <span className="total-amount">{formatCurrency(totalPayable)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button 
                className="btn-accent place-order-btn"
                onClick={handleConfirmOrder}
                disabled={isPlacingOrder || !selectedAddress}
              >
                {isPlacingOrder ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <>
                    <span>Place Order & Pay {formatCurrency(totalPayable)}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="guarantee-box">
                <CheckCircle2 size={16} className="guarantee-icon" />
                <span>100% Purchase Protection with ZENVORA Assured</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
