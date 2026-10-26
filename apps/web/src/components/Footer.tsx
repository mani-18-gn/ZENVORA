import React from 'react';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  onNavigateCategory: (slug: string, name: string) => void;
  onNavigateView: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateCategory, onNavigateView }) => {
  return (
    <footer className="zen-footer">
      
      {/* Top Value Assurance Banner */}
      <div className="footer-assurance-bar">
        <div className="container assurance-grid">
          <div className="assurance-item">
            <ShieldCheck size={24} className="assurance-icon" />
            <div>
              <span className="assurance-title">100% Authentic Guarantee</span>
              <span className="assurance-sub">Every product Zenvora Assured verified</span>
            </div>
          </div>
          <div className="assurance-item">
            <Truck size={24} className="assurance-icon" />
            <div>
              <span className="assurance-title">Lightning Express Delivery</span>
              <span className="assurance-sub">Fast fulfillment across 19,000+ pincodes</span>
            </div>
          </div>
          <div className="assurance-item">
            <RotateCcw size={24} className="assurance-icon" />
            <div>
              <span className="assurance-title">Easy 7-Day Returns</span>
              <span className="assurance-sub">Zero-hassle doorstep replacement</span>
            </div>
          </div>
          <div className="assurance-item">
            <Headphones size={24} className="assurance-icon" />
            <div>
              <span className="assurance-title">24x7 Customer Support</span>
              <span className="assurance-sub">Dedicated phone & instant chat help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main-content">
        <div className="footer-links-grid">
          
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="brand-title-wrap">
              <span className="footer-brand-title">ZENVORA</span>
              <span className="footer-brand-tagline">Everything You Want. One Destination.</span>
            </div>
            <p className="brand-summary">
              ZENVORA is India's next-generation e-commerce marketplace connecting millions of customers with top-rated verified sellers across electronics, fashion, beauty, and home living.
            </p>
            <div className="app-download-note">
              <span>Android Mobile Application (React Native + Expo) in development.</span>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigateCategory('electronics', 'Electronics')}>
                  Audio & Gadgets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('mobiles-tablets', 'Mobiles & Tablets')}>
                  5G Smartphones & iPads
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('fashion', 'Fashion & Apparel')}>
                  Designer Apparel & Timepieces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('home-living', 'Home & Living')}>
                  Espresso Machines & Kitchenware
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateCategory('beauty', 'Beauty & Personal Care')}>
                  Skincare Serums & Cosmetics
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Support</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => onNavigateView('orders')}>Track Your Package</button></li>
              <li><button onClick={() => onNavigateView('orders')}>Shipping & Delivery Rates</button></li>
              <li><button onClick={() => onNavigateView('orders')}>Returns & Replacements</button></li>
              <li><button onClick={() => onNavigateView('addresses')}>Manage Addresses</button></li>
              <li><button onClick={() => onNavigateView('cart')}>Coupons & Festive Deals</button></li>
            </ul>
          </div>

          {/* Portals & Governance */}
          <div className="footer-col">
            <h4 className="footer-heading">Portals & Policy</h4>
            <ul className="footer-links-list">
              <li>
                <button className="highlight-link" onClick={() => onNavigateView('seller-dashboard')}>
                  Seller Hub & Merchant Portal
                </button>
              </li>
              <li>
                <button className="highlight-link" onClick={() => onNavigateView('admin-dashboard')}>
                  Admin Operations Console
                </button>
              </li>
              <li><span>Terms of Use & Fair Trade</span></li>
              <li><span>Security & Data Privacy</span></li>
              <li><span>Grievance Redressal Officer</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © 2026 ZENVORA Technologies Private Limited. All rights reserved.
          </div>

          <div className="payment-gateways-list">
            <span className="pay-badge">BHIM UPI</span>
            <span className="pay-badge">Google Pay</span>
            <span className="pay-badge">PhonePe</span>
            <span className="pay-badge">Visa</span>
            <span className="pay-badge">Mastercard</span>
            <span className="pay-badge">RuPay</span>
            <span className="pay-badge">Net Banking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
