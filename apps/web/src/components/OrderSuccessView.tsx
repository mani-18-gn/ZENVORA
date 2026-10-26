import React from 'react';
import { CheckCircle2, Package, Home } from 'lucide-react';
import type { Order } from '../types';
import './OrderSuccessView.css';

interface OrderSuccessViewProps {
  order: Order;
  onTrackOrder: (order: Order) => void;
  onContinueShopping: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onTrackOrder,
  onContinueShopping
}) => {
  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  return (
    <div className="order-success-page fade-in">
      <div className="container">
        
        <div className="success-card">
          <div className="celebration-badge-wrap">
            <CheckCircle2 size={64} className="success-check-icon" />
          </div>

          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for shopping with ZENVORA. Your order has been placed and is being prepared by our verified sellers.
          </p>

          <div className="order-meta-box">
            <div className="meta-item">
              <span className="meta-label">Order Number</span>
              <span className="meta-val highlight">{order.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Estimated Delivery</span>
              <span className="meta-val">{order.expectedDelivery}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Total Amount Paid</span>
              <span className="meta-val">{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Payment Method</span>
              <span className="meta-val">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Delivery Address summary */}
          <div className="delivery-summary-box">
            <span className="delivery-summary-label">Shipping to:</span>
            <span className="delivery-summary-name">{order.shippingAddress.name}</span>
            <span className="delivery-summary-address">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </span>
          </div>

          {/* Items Preview */}
          <div className="success-items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="success-item-mini">
                <img src={item.image} alt={item.title} className="success-item-thumb" />
                <div className="success-item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-qty">Quantity: {item.quantity}</span>
                </div>
                <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="success-actions-row">
            <button 
              className="btn-primary success-track-btn"
              onClick={() => onTrackOrder(order)}
            >
              <Package size={18} />
              <span>Track Live Delivery Status</span>
            </button>

            <button 
              className="btn-outline success-home-btn"
              onClick={onContinueShopping}
            >
              <Home size={18} />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
