import React, { useState } from 'react';
import { 
  Store, 
  Plus, 
  AlertTriangle, 
  Trash2, 
  X
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import type { Product } from '../types';
import './SellerDashboardPreview.css';

interface SellerDashboardPreviewProps {
  onBackToCustomerSite: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SellerDashboardPreview: React.FC<SellerDashboardPreviewProps> = ({
  onBackToCustomerSite,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'INVENTORY' | 'ORDERS' | 'REPORTS'>('OVERVIEW');
  const [sellerProducts, setSellerProducts] = useState<Product[]>(PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('AuraSound');
  const [newCategory, setNewCategory] = useState('electronics');
  const [newPrice, setNewPrice] = useState('4999');
  const [newMrp, setNewMrp] = useState('9999');
  const [newStock, setNewStock] = useState('50');

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onShowToast('Please enter a product title', 'error');
      return;
    }

    const priceNum = Number(newPrice);
    const mrpNum = Number(newMrp);
    const discount = Math.round(((mrpNum - priceNum) / mrpNum) * 100);

    const created: Product = {
      id: 'zen-prod-' + Date.now(),
      title: newTitle,
      brand: newBrand,
      category: newCategory,
      subcategory: 'New Arrivals',
      price: priceNum,
      originalPrice: mrpNum,
      discountPercent: discount,
      rating: 5.0,
      reviewCount: 0,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
      description: 'Newly listed product by seller.',
      highlights: ['Zenvora Assured verified item', 'Ready for instant dispatch'],
      specifications: { 'Listing Date': 'Today', 'Warranty': '1 Year' },
      inStock: true,
      stockCount: Number(newStock),
      isAssured: true,
      deliveryDays: 2,
      seller: { id: 'seller-tech-01', name: 'Aura Audio Direct', rating: 4.8, totalSales: 18451 },
      tags: ['new', newCategory]
    };

    setSellerProducts([created, ...sellerProducts]);
    setIsAddProductOpen(false);
    setNewTitle('');
    onShowToast(`Product '${created.title}' added to catalog!`, 'success');
  };

  const handleDeleteProduct = (id: string) => {
    setSellerProducts(prev => prev.filter(p => p.id !== id));
    onShowToast('Product deleted from inventory.', 'info');
  };

  return (
    <div className="seller-dashboard-page fade-in">
      <div className="container">
        
        {/* Top Header */}
        <div className="seller-dash-header">
          <div className="seller-title-group">
            <div className="seller-badge-icon">
              <Store size={22} />
            </div>
            <div>
              <h1 className="seller-dash-title">Seller Hub • Aura Audio Direct</h1>
              <span className="seller-dash-sub">
                Merchant ID: <strong>SELLER-TECH-01</strong> • Status: <span className="verified-status">Active & Verified</span>
              </span>
            </div>
          </div>

          <div className="seller-header-actions">
            <button className="btn-primary add-prod-btn" onClick={() => setIsAddProductOpen(true)}>
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
            <button className="btn-outline" onClick={onBackToCustomerSite}>
              Customer Website
            </button>
          </div>
        </div>

        {/* Seller Navigation Tabs */}
        <div className="seller-nav-tabs">
          <button 
            className={`seller-tab-btn ${activeTab === 'OVERVIEW' ? 'active' : ''}`}
            onClick={() => setActiveTab('OVERVIEW')}
          >
            Overview & Metrics
          </button>
          <button 
            className={`seller-tab-btn ${activeTab === 'PRODUCTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('PRODUCTS')}
          >
            Product Catalog ({sellerProducts.length})
          </button>
          <button 
            className={`seller-tab-btn ${activeTab === 'INVENTORY' ? 'active' : ''}`}
            onClick={() => setActiveTab('INVENTORY')}
          >
            Inventory Tracker
          </button>
          <button 
            className={`seller-tab-btn ${activeTab === 'ORDERS' ? 'active' : ''}`}
            onClick={() => setActiveTab('ORDERS')}
          >
            Orders & Fulfillment
          </button>
          <button 
            className={`seller-tab-btn ${activeTab === 'REPORTS' ? 'active' : ''}`}
            onClick={() => setActiveTab('REPORTS')}
          >
            Sales Reports & Payouts
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'OVERVIEW' && (
          <div className="seller-overview-view">
            {/* Stat Cards */}
            <div className="seller-stats-grid">
              <div className="stat-card">
                <span className="stat-sub">Gross Sales (This Month)</span>
                <span className="stat-val">{formatCurrency(489200)}</span>
                <span className="stat-change positive">↑ +18.4% vs last month</span>
              </div>
              <div className="stat-card">
                <span className="stat-sub">Orders Pending Dispatch</span>
                <span className="stat-val">14</span>
                <span className="stat-change info">Requires packaging today</span>
              </div>
              <div className="stat-card">
                <span className="stat-sub">Catalog Listings</span>
                <span className="stat-val">{sellerProducts.length}</span>
                <span className="stat-change positive">All 100% compliant</span>
              </div>
              <div className="stat-card">
                <span className="stat-sub">Seller Rating</span>
                <span className="stat-val">4.8 ★</span>
                <span className="stat-change positive">Top Tier Merchant</span>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="seller-quick-alert">
              <AlertTriangle size={20} className="alert-icon" />
              <div className="alert-text">
                <strong>Inventory Notice:</strong> 2 SKUs are running below threshold (under 20 units). Restock before the upcoming Weekend Flash Sale to prevent unlisting.
              </div>
              <button className="btn-outline btn-sm" onClick={() => setActiveTab('INVENTORY')}>
                Manage Stock
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Product Management */}
        {activeTab === 'PRODUCTS' && (
          <div className="seller-table-card">
            <div className="table-header-row">
              <h3 className="table-title">Product Catalog</h3>
              <button className="btn-primary btn-sm" onClick={() => setIsAddProductOpen(true)}>
                <Plus size={14} />
                <span>Add Product</span>
              </button>
            </div>

            <table className="seller-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Selling Price</th>
                  <th>MRP</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-prod-info">
                        <img src={p.images[0]} alt={p.title} className="table-thumb" />
                        <div>
                          <strong className="table-prod-title">{p.title}</strong>
                          <span className="table-sku">SKU: {p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td><strong>{formatCurrency(p.price)}</strong></td>
                    <td className="strikethrough">{formatCurrency(p.originalPrice)}</td>
                    <td><span className="discount-pill">{p.discountPercent}%</span></td>
                    <td>{p.stockCount} units</td>
                    <td>
                      <span className="badge-assured">Active</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="table-action-btn delete" 
                          onClick={() => handleDeleteProduct(p.id)}
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Inventory */}
        {activeTab === 'INVENTORY' && (
          <div className="seller-table-card">
            <h3 className="table-title">Inventory & Stock Tracking</h3>
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Product Title</th>
                  <th>Warehouse Location</th>
                  <th>Current Units</th>
                  <th>Safety Threshold</th>
                  <th>Health Status</th>
                  <th>Quick Restock</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.title}</strong></td>
                    <td>Bengaluru FC-04</td>
                    <td><strong>{p.stockCount}</strong></td>
                    <td>25 units</td>
                    <td>
                      {p.stockCount < 25 ? (
                        <span className="stock-health low">Low Stock Warning</span>
                      ) : (
                        <span className="stock-health ok">Optimal</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn-outline btn-sm"
                        onClick={() => {
                          setSellerProducts(prev => prev.map(item => item.id === p.id ? { ...item, stockCount: item.stockCount + 50 } : item));
                          onShowToast(`Restocked +50 units for ${p.title}`, 'success');
                        }}
                      >
                        +50 Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Orders */}
        {activeTab === 'ORDERS' && (
          <div className="seller-table-card">
            <h3 className="table-title">Recent Customer Orders for Fulfillment</h3>
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Item Details</th>
                  <th>Order Value</th>
                  <th>Fulfillment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ZN-892410-IN</strong></td>
                  <td>Vikramaditya Rao</td>
                  <td>AuraSound Pro ANC Wireless Headphones (Midnight)</td>
                  <td>{formatCurrency(8499)}</td>
                  <td><span className="badge-assured">Shipped & Dispatched</span></td>
                  <td>
                    <button className="btn-outline btn-sm" onClick={() => onShowToast('Manifest & Courier slip generated', 'info')}>
                      Print Shipping Label
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><strong>ZN-771923-IN</strong></td>
                  <td>Ananya Sen</td>
                  <td>AuraSound Pro ANC (Platinum Silver)</td>
                  <td>{formatCurrency(8499)}</td>
                  <td><span className="status-badge delivered">Delivered</span></td>
                  <td>
                    <button className="btn-outline btn-sm" onClick={() => onShowToast('Order completed & settled', 'info')}>
                      View Settlement
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Reports */}
        {activeTab === 'REPORTS' && (
          <div className="seller-table-card">
            <h3 className="table-title">Sales Analytics & Payout Settlements</h3>
            <div className="reports-summary-grid">
              <div className="report-box">
                <span className="rep-label">Next Payout Cycle</span>
                <span className="rep-val">Thursday, Oct 29</span>
                <span className="rep-note">Automatic NEFT Transfer to HDFC Bank **** 8821</span>
              </div>
              <div className="report-box">
                <span className="rep-label">Net Settlement Amount</span>
                <span className="rep-val">{formatCurrency(142500)}</span>
                <span className="rep-note">After 4% platform fee deduction</span>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {isAddProductOpen && (
          <div className="modal-overlay" onClick={() => setIsAddProductOpen(false)}>
            <div className="add-product-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">List New Product on Zenvora</h3>
                <button className="close-modal-btn" onClick={() => setIsAddProductOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="add-product-form">
                <div className="form-group">
                  <label>Product Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. AuraSound Studio Wireless Earbuds with ANC"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Brand Name</label>
                    <input
                      type="text"
                      value={newBrand}
                      onChange={e => setNewBrand(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                      <option value="electronics">Electronics</option>
                      <option value="mobiles-tablets">Mobiles & Tablets</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="home-living">Home & Living</option>
                      <option value="beauty">Beauty & Personal Care</option>
                      <option value="groceries">Groceries</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Deal Price (₹) *</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Original MRP (₹) *</label>
                    <input
                      type="number"
                      value={newMrp}
                      onChange={e => setNewMrp(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Initial Units *</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={e => setNewStock(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="add-prod-actions">
                  <button type="button" className="btn-outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
