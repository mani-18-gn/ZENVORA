import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AVAILABLE_COUPONS } from '../data/mockData';
import type { Coupon } from '../types';
import './AdminDashboardPreview.css';

interface AdminDashboardPreviewProps {
  onBackToCustomerSite: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const AdminDashboardPreview: React.FC<AdminDashboardPreviewProps> = ({
  onBackToCustomerSite,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'CUSTOMERS' | 'SELLERS' | 'PROMOTIONS' | 'REFUNDS'>('METRICS');
  const [coupons, setCoupons] = useState<Coupon[]>(AVAILABLE_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('20');
  const [newCouponMin, setNewCouponMin] = useState('1499');

  const [refundRequests, setRefundRequests] = useState([
    { id: 'REF-801', orderId: 'ZN-892410-IN', customer: 'Vikramaditya Rao', amount: 8499, reason: 'Defective item', status: 'PENDING' },
    { id: 'REF-798', orderId: 'ZN-771923-IN', customer: 'Ananya Sen', amount: 549, reason: 'Duplicate payment', status: 'APPROVED' }
  ]);

  const [sellersList, setSellersList] = useState([
    { id: 'SELLER-01', name: 'Aura Audio Direct', email: 'merchant@auraaudio.com', status: 'VERIFIED', sales: '₹18,45,000' },
    { id: 'SELLER-02', name: 'OmniGadgets Prime', email: 'support@omnigadgets.in', status: 'VERIFIED', sales: '₹43,20,000' },
    { id: 'SELLER-03', name: 'ZenCraft Apparel', email: 'hello@zencraft.store', status: 'PENDING_APPROVAL', sales: '₹0' }
  ]);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handleApproveRefund = (refId: string) => {
    setRefundRequests(prev => prev.map(r => r.id === refId ? { ...r, status: 'APPROVED' } : r));
    onShowToast(`Refund ${refId} approved. Webhook triggered for payment gateway reversal.`, 'success');
  };

  const handleApproveSeller = (sellerId: string) => {
    setSellersList(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'VERIFIED' } : s));
    onShowToast(`Seller ${sellerId} KYC approved for marketplace onboarding.`, 'success');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const created: Coupon = {
      code: newCouponCode.toUpperCase(),
      discountType: 'PERCENT',
      discountValue: Number(newCouponDiscount),
      minOrderValue: Number(newCouponMin),
      description: `Get ${newCouponDiscount}% Off on orders above ₹${newCouponMin}`
    };

    setCoupons([created, ...coupons]);
    setNewCouponCode('');
    onShowToast(`Promotion coupon '${created.code}' activated!`, 'success');
  };

  return (
    <div className="admin-dashboard-page fade-in">
      <div className="container">
        
        {/* Header */}
        <div className="admin-header-row">
          <div className="admin-title-wrap">
            <div className="admin-shield-badge">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="admin-page-title">Marketplace Control Center</h1>
              <span className="admin-page-sub">
                ZENVORA Enterprise Administration • Security Protocol Level 4
              </span>
            </div>
          </div>

          <button className="btn-outline" onClick={onBackToCustomerSite}>
            Exit to Customer Website
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="admin-nav-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'METRICS' ? 'active' : ''}`}
            onClick={() => setActiveTab('METRICS')}
          >
            Overview & Metrics
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'SELLERS' ? 'active' : ''}`}
            onClick={() => setActiveTab('SELLERS')}
          >
            Seller Management
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'CUSTOMERS' ? 'active' : ''}`}
            onClick={() => setActiveTab('CUSTOMERS')}
          >
            Customer Directory
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'PROMOTIONS' ? 'active' : ''}`}
            onClick={() => setActiveTab('PROMOTIONS')}
          >
            Promotions & Coupons ({coupons.length})
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'REFUNDS' ? 'active' : ''}`}
            onClick={() => setActiveTab('REFUNDS')}
          >
            Refund Requests ({refundRequests.filter(r => r.status === 'PENDING').length} Pending)
          </button>
        </div>

        {/* Tab 1: Metrics */}
        {activeTab === 'METRICS' && (
          <div className="admin-tab-content">
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <span className="metric-title">Gross Marketplace Value (GMV)</span>
                <span className="metric-val">{formatCurrency(12450890)}</span>
                <span className="metric-badge positive">+28.6% MoM</span>
              </div>
              <div className="admin-metric-card">
                <span className="metric-title">Platform Net Commission</span>
                <span className="metric-val">{formatCurrency(622540)}</span>
                <span className="metric-badge positive">5% Blended Rate</span>
              </div>
              <div className="admin-metric-card">
                <span className="metric-title">Active Customers</span>
                <span className="metric-val">142,890</span>
                <span className="metric-badge info">88% repeat orders</span>
              </div>
              <div className="admin-metric-card">
                <span className="metric-title">Onboarded Merchants</span>
                <span className="metric-val">1,240</span>
                <span className="metric-badge info">12 awaiting KYC</span>
              </div>
            </div>

            <div className="platform-compliance-box">
              <ShieldCheck size={22} className="compliance-icon" />
              <div>
                <strong>Security & Transaction Audit Status:</strong> All payment callbacks verified via server-side SHA-256 HMAC signatures. Client side price tampering checks active with 0 anomalies.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Seller Management */}
        {activeTab === 'SELLERS' && (
          <div className="admin-table-card">
            <h3 className="table-title">Merchant Approvals & Directory</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Seller ID</th>
                  <th>Legal Entity Name</th>
                  <th>Official Email</th>
                  <th>Cumulative GMV</th>
                  <th>KYC Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellersList.map(s => (
                  <tr key={s.id}>
                    <td><code>{s.id}</code></td>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.email}</td>
                    <td>{s.sales}</td>
                    <td>
                      <span className={`status-pill ${s.status === 'VERIFIED' ? 'ok' : 'pending'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      {s.status === 'PENDING_APPROVAL' ? (
                        <button className="btn-primary btn-sm" onClick={() => handleApproveSeller(s.id)}>
                          Verify & Approve
                        </button>
                      ) : (
                        <span className="verified-text">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Customer Directory */}
        {activeTab === 'CUSTOMERS' && (
          <div className="admin-table-card">
            <h3 className="table-title">Registered Customer Accounts</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Primary Phone</th>
                  <th>Tier</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>USR-CUST-001</code></td>
                  <td><strong>Vikramaditya Rao</strong></td>
                  <td>vikram.rao@zenvora.dev</td>
                  <td>+91 98765 43210</td>
                  <td><span className="badge-deal">Zenvora Prime</span></td>
                  <td><span className="status-pill ok">Active</span></td>
                </tr>
                <tr>
                  <td><code>USR-CUST-002</code></td>
                  <td><strong>Priya Sharma</strong></td>
                  <td>priya.sharma@example.com</td>
                  <td>+91 98123 45678</td>
                  <td><span>Standard</span></td>
                  <td><span className="status-pill ok">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Promotions & Coupons */}
        {activeTab === 'PROMOTIONS' && (
          <div className="admin-promotions-layout">
            <div className="admin-table-card">
              <h3 className="table-title">Active Campaign Coupons</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Promo Code</th>
                    <th>Type</th>
                    <th>Discount</th>
                    <th>Min Order Value</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c.code}>
                      <td><span className="coupon-code-pill">{c.code}</span></td>
                      <td>{c.discountType}</td>
                      <td><strong>{c.discountType === 'PERCENT' ? `${c.discountValue}%` : `₹${c.discountValue}`}</strong></td>
                      <td>₹{c.minOrderValue}</td>
                      <td>{c.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Create Coupon Form */}
            <div className="create-coupon-card">
              <h3 className="table-title">Create Campaign Coupon</h3>
              <form onSubmit={handleAddCoupon} className="coupon-form">
                <div className="form-group">
                  <label>Coupon Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. FLASH30"
                    value={newCouponCode}
                    onChange={e => setNewCouponCode(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount Percentage (%)</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={e => setNewCouponDiscount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={e => setNewCouponMin(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Deploy Promotion Code
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: Refunds */}
        {activeTab === 'REFUNDS' && (
          <div className="admin-table-card">
            <h3 className="table-title">Refund & Return Reconciliation</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Refund Ticket</th>
                  <th>Order Reference</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Reported Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {refundRequests.map(r => (
                  <tr key={r.id}>
                    <td><code>{r.id}</code></td>
                    <td><strong>{r.orderId}</strong></td>
                    <td>{r.customer}</td>
                    <td><strong>{formatCurrency(r.amount)}</strong></td>
                    <td>{r.reason}</td>
                    <td>
                      <span className={`status-pill ${r.status === 'APPROVED' ? 'ok' : 'pending'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === 'PENDING' ? (
                        <button 
                          className="btn-primary btn-sm"
                          onClick={() => handleApproveRefund(r.id)}
                        >
                          Approve Refund
                        </button>
                      ) : (
                        <span className="verified-text">Reversed to Source</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
