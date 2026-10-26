import React, { useState } from 'react';
import { 
  Package, 
  ChevronRight, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  Printer, 
  X,
  AlertCircle
} from 'lucide-react';
import type { Order, OrderStatus } from '../types';
import './OrdersView.css';

interface OrdersViewProps {
  orders: Order[];
  onContinueShopping: () => void;
  onCancelOrder: (orderId: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onContinueShopping,
  onCancelOrder,
  onShowToast
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);
  const [cancelModalOrder, setCancelModalOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('Found a better price elsewhere');

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const filteredOrders = orders.filter(o => {
    if (activeFilter === 'IN_TRANSIT') return o.status === 'PLACED' || o.status === 'PROCESSING' || o.status === 'SHIPPED' || o.status === 'OUT_FOR_DELIVERY';
    if (activeFilter === 'DELIVERED') return o.status === 'DELIVERED';
    if (activeFilter === 'CANCELLED') return o.status === 'CANCELLED';
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="status-badge delivered">
            <CheckCircle2 size={13} />
            <span>Delivered</span>
          </span>
        );
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="status-badge in-transit">
            <Truck size={13} />
            <span>In Transit</span>
          </span>
        );
      case 'PLACED':
      case 'PROCESSING':
        return (
          <span className="status-badge processing">
            <Clock size={13} />
            <span>Order Confirmed</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="status-badge cancelled">
            <XCircle size={13} />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  const handleConfirmCancel = () => {
    if (cancelModalOrder) {
      onCancelOrder(cancelModalOrder.id);
      setCancelModalOrder(null);
      if (selectedOrder?.id === cancelModalOrder.id) {
        setSelectedOrder(prev => prev ? { ...prev, status: 'CANCELLED' } : null);
      }
      onShowToast(`Order ${cancelModalOrder.id} has been cancelled successfully.`, 'info');
    }
  };

  return (
    <div className="orders-page fade-in">
      <div className="container">
        
        <div className="orders-header-row">
          <div>
            <h1 className="orders-page-title">My Orders</h1>
            <p className="orders-subtitle">Track, return, and review past marketplace purchases</p>
          </div>

          <div className="orders-filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              All Orders ({orders.length})
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'IN_TRANSIT' ? 'active' : ''}`}
              onClick={() => setActiveFilter('IN_TRANSIT')}
            >
              In Transit
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'DELIVERED' ? 'active' : ''}`}
              onClick={() => setActiveFilter('DELIVERED')}
            >
              Delivered
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'CANCELLED' ? 'active' : ''}`}
              onClick={() => setActiveFilter('CANCELLED')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="empty-orders-card">
            <Package size={52} className="empty-orders-icon" />
            <h2 className="empty-title">No Orders Found</h2>
            <p className="empty-desc">You have not placed any orders matching this status yet.</p>
            <button className="btn-accent" onClick={onContinueShopping}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                
                {/* Order Top Bar */}
                <div className="order-card-header">
                  <div className="header-meta-group">
                    <div>
                      <span className="order-meta-sub">ORDER PLACED</span>
                      <span className="order-meta-main">
                        {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div>
                      <span className="order-meta-sub">TOTAL</span>
                      <span className="order-meta-main">{formatCurrency(order.totalAmount)}</span>
                    </div>
                    <div>
                      <span className="order-meta-sub">SHIP TO</span>
                      <span className="order-meta-main ship-to" title={order.shippingAddress.addressLine1}>
                        {order.shippingAddress.name}
                      </span>
                    </div>
                  </div>

                  <div className="header-right-group">
                    <span className="order-id-label">ORDER # {order.id}</span>
                    <button 
                      className="view-invoice-btn"
                      onClick={() => setInvoiceModalOrder(order)}
                    >
                      <FileText size={14} />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Order Content */}
                <div className="order-card-body">
                  <div className="order-status-row">
                    {getStatusBadge(order.status)}
                    <span className="expected-delivery-text">
                      {order.status === 'DELIVERED' ? order.expectedDelivery : `Expected by: ${order.expectedDelivery}`}
                    </span>
                  </div>

                  <div className="order-items-grid">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-item-tile">
                        <img src={item.image} alt={item.title} className="order-item-thumb" />
                        <div className="order-item-desc">
                          <h4 className="order-item-title">{item.title}</h4>
                          <span className="order-item-sub">
                            Qty: {item.quantity} {item.variant ? `• Variant: ${item.variant}` : ''}
                          </span>
                          <span className="order-item-price">{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="order-card-footer">
                  <button 
                    className="btn-track-order"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <span>Track Live Package</span>
                    <ChevronRight size={15} />
                  </button>

                  {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                    <button 
                      className="btn-cancel-link"
                      onClick={() => setCancelModalOrder(order)}
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === 'DELIVERED' && (
                    <button 
                      className="btn-return-link"
                      onClick={() => onShowToast('Return request window active until 7 days after delivery.', 'info')}
                    >
                      Return / Replace Item
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Live Order Tracking Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="tracking-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Live Tracking • {selectedOrder.id}</h3>
                  <span className="modal-sub">Expected by: {selectedOrder.expectedDelivery}</span>
                </div>
                <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                {/* Visual Tracker Timeline */}
                <div className="tracking-timeline">
                  {selectedOrder.trackingHistory.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`timeline-step ${step.completed ? 'completed' : ''}`}
                    >
                      <div className="step-marker-col">
                        <div className="step-circle">
                          {step.completed ? <CheckCircle2 size={16} /> : <div className="step-inner-dot" />}
                        </div>
                        {idx < selectedOrder.trackingHistory.length - 1 && (
                          <div className={`step-line ${step.completed ? 'completed' : ''}`} />
                        )}
                      </div>
                      <div className="step-content">
                        <div className="step-title-row">
                          <span className="step-status-text">{step.status}</span>
                          <span className="step-date-text">{step.date}</span>
                        </div>
                        <p className="step-desc-text">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address & Payment Info */}
                <div className="tracking-details-grid">
                  <div className="tracking-info-box">
                    <span className="box-title">Delivery Address</span>
                    <p className="box-content">
                      <strong>{selectedOrder.shippingAddress.name}</strong><br />
                      {selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.addressLine2}<br />
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}<br />
                      Phone: {selectedOrder.shippingAddress.phone}
                    </p>
                  </div>

                  <div className="tracking-info-box">
                    <span className="box-title">Payment Overview</span>
                    <p className="box-content">
                      <strong>Method:</strong> {selectedOrder.paymentMethod}<br />
                      <strong>Status:</strong> {selectedOrder.paymentStatus}<br />
                      <strong>Total Paid:</strong> {formatCurrency(selectedOrder.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoice Modal */}
        {invoiceModalOrder && (
          <div className="modal-overlay" onClick={() => setInvoiceModalOrder(null)}>
            <div className="invoice-modal" onClick={e => e.stopPropagation()}>
              <div className="invoice-header">
                <div className="brand-logo-btn">
                  <span className="brand-title">ZENVORA</span>
                  <span className="brand-tagline">Retail Invoice / Cash Memo</span>
                </div>
                <div className="invoice-actions">
                  <button className="invoice-print-btn" onClick={() => window.print()}>
                    <Printer size={16} />
                    <span>Print</span>
                  </button>
                  <button className="close-modal-btn" onClick={() => setInvoiceModalOrder(null)}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="invoice-body">
                <div className="invoice-info-grid">
                  <div>
                    <strong>Order ID:</strong> {invoiceModalOrder.id}<br />
                    <strong>Order Date:</strong> {new Date(invoiceModalOrder.date).toLocaleString('en-IN')}<br />
                    <strong>Payment Mode:</strong> {invoiceModalOrder.paymentMethod}
                  </div>
                  <div>
                    <strong>Billed & Shipped To:</strong><br />
                    {invoiceModalOrder.shippingAddress.name}<br />
                    {invoiceModalOrder.shippingAddress.addressLine1}, {invoiceModalOrder.shippingAddress.city}<br />
                    GSTIN: 29AABCU9603R1ZM (Marketplace Facilitator)
                  </div>
                </div>

                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceModalOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.title}</td>
                        <td>{it.quantity}</td>
                        <td>{formatCurrency(it.price)}</td>
                        <td>{formatCurrency(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-right"><strong>Delivery Fee:</strong></td>
                      <td>{invoiceModalOrder.deliveryFee === 0 ? 'FREE' : formatCurrency(invoiceModalOrder.deliveryFee)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right"><strong>Total Amount:</strong></td>
                      <td><strong>{formatCurrency(invoiceModalOrder.totalAmount)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Order Confirmation Modal */}
        {cancelModalOrder && (
          <div className="modal-overlay" onClick={() => setCancelModalOrder(null)}>
            <div className="cancel-modal" onClick={e => e.stopPropagation()}>
              <div className="cancel-modal-header">
                <AlertCircle size={28} className="cancel-warn-icon" />
                <h3 className="cancel-modal-title">Cancel Order #{cancelModalOrder.id}?</h3>
              </div>
              <p className="cancel-desc">
                Are you sure you want to cancel this order? If you have already paid, your refund of {formatCurrency(cancelModalOrder.totalAmount)} will be processed back to your source payment method within 2-4 business days.
              </p>
              
              <label className="reason-label">Select reason for cancellation:</label>
              <select 
                value={cancelReason} 
                onChange={(e) => setCancelReason(e.target.value)}
                className="cancel-select"
              >
                <option value="Found a better price elsewhere">Found a better price elsewhere</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Delivery time is too long">Delivery time is too long</option>
                <option value="Need to change delivery address">Need to change delivery address</option>
              </select>

              <div className="cancel-actions">
                <button className="btn-outline" onClick={() => setCancelModalOrder(null)}>
                  Keep Order
                </button>
                <button className="btn-danger-confirm" onClick={handleConfirmCancel}>
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
