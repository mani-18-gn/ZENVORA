import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User as UserIcon, 
  MapPin, 
  ChevronDown, 
  Store, 
  ShieldCheck, 
  X, 
  TrendingUp, 
  Clock, 
  LogOut, 
  Package, 
  Menu
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import type { User, ActiveView } from '../types';
import './Navbar.css';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  wishlistCount: number;
  activeView: ActiveView;
  selectedPincode: string;
  selectedCity: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string, category?: string) => void;
  onNavigate: (view: ActiveView, extra?: any) => void;
  onOpenAuth: () => void;
  onOpenLocation: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  cartCount,
  wishlistCount,
  activeView,
  selectedPincode,
  selectedCity,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  onOpenAuth,
  onOpenLocation,
  onLogout
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const recentSearches = ['AuraSound Pro ANC', 'Titanium Automatic Watch', 'Barista Espresso Machine', 'Running Shoes'];
  const trendingSearches = ['5G Phones under ₹25K', 'Niacinamide Serum', 'Cast Iron Dutch Oven', 'Wireless Earbuds'];

  // Handle outside click for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    onSearchSubmit(searchQuery, selectedCategory === 'all' ? undefined : selectedCategory);
  };

  const handleSuggestionClick = (term: string) => {
    onSearchChange(term);
    setIsSearchFocused(false);
    onSearchSubmit(term, selectedCategory === 'all' ? undefined : selectedCategory);
  };

  return (
    <header className="zen-header">
      {/* Top Banner Notice */}
      <div className="zen-top-banner">
        <div className="container top-banner-content">
          <div className="banner-left">
            <span className="banner-tag">FESTIVE MEGA DEALS</span>
            <span className="banner-text">
              Free Express Delivery on orders over ₹499 | Extra 15% OFF with code: <strong>FESTIVE15</strong>
            </span>
          </div>
          <div className="banner-right">
            <button 
              className={`portal-link-btn ${activeView === 'seller-dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('seller-dashboard')}
              title="Open Seller Portal Interface"
            >
              <Store size={14} />
              <span>Seller Hub</span>
            </button>
            <span className="banner-divider">|</span>
            <button 
              className={`portal-link-btn ${activeView === 'admin-dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('admin-dashboard')}
              title="Open Admin Operations Interface"
            >
              <ShieldCheck size={14} />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="zen-main-nav">
        <div className="container nav-container">
          
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="brand-section">
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>

            <button className="brand-logo-btn" onClick={() => onNavigate('home')}>
              <div className="brand-emblem">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="#5925DC"/>
                  <path d="M14 16H34L20 32H34" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="34" cy="16" r="3.5" fill="#FF8A00"/>
                  <circle cx="14" cy="32" r="2.5" fill="#FF8A00"/>
                </svg>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-title">ZENVORA</span>
                <span className="brand-tagline">Everything You Want. One Destination.</span>
              </div>
            </button>
          </div>

          {/* Delivery Location Picker */}
          <button className="location-btn" onClick={onOpenLocation} title="Change delivery location">
            <MapPin size={18} className="location-icon" />
            <div className="location-info">
              <span className="location-sub">Deliver to</span>
              <span className="location-val">{selectedCity} {selectedPincode}</span>
            </div>
            <ChevronDown size={14} className="location-chevron" />
          </button>

          {/* Search Bar Omnibox */}
          <div className="nav-search-container" ref={searchContainerRef}>
            <form className={`search-form ${isSearchFocused ? 'focused' : ''}`} onSubmit={handleSearchSubmit}>
              <div className="search-category-select">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Select search category"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="select-arrow" />
              </div>

              <div className="search-input-wrap">
                <input
                  type="text"
                  placeholder="Search 1,000,000+ products, electronics, fashion, brands..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn" 
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search text"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <button type="submit" className="search-submit-btn" aria-label="Submit search">
                <Search size={18} />
                <span>Search</span>
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="search-suggestions-dropdown">
                {searchQuery.trim().length > 0 ? (
                  <div className="suggestions-list">
                    <div className="dropdown-section-header">Direct Matches</div>
                    <button 
                      type="button" 
                      className="suggestion-item active-match"
                      onClick={() => handleSuggestionClick(searchQuery)}
                    >
                      <Search size={14} />
                      <span>Search for "<strong>{searchQuery}</strong>"</span>
                    </button>
                    {trendingSearches
                      .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((item, idx) => (
                        <button 
                          key={idx} 
                          type="button" 
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <TrendingUp size={14} className="trend-icon" />
                          <span>{item}</span>
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="suggestions-grid">
                    <div className="suggestion-col">
                      <div className="dropdown-section-header">
                        <Clock size={13} />
                        <span>Recent Searches</span>
                      </div>
                      {recentSearches.map((term, i) => (
                        <button 
                          key={i} 
                          type="button" 
                          className="suggestion-item"
                          onClick={() => handleSuggestionClick(term)}
                        >
                          <Search size={13} />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>

                    <div className="suggestion-col">
                      <div className="dropdown-section-header">
                        <TrendingUp size={13} className="trend-icon" />
                        <span>Trending on Zenvora</span>
                      </div>
                      {trendingSearches.map((term, i) => (
                        <button 
                          key={i} 
                          type="button" 
                          className="suggestion-item trending-item"
                          onClick={() => handleSuggestionClick(term)}
                        >
                          <span className="trending-rank">#{i + 1}</span>
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="nav-actions">
            
            {/* Wishlist */}
            <button 
              className={`nav-action-btn ${activeView === 'wishlist' ? 'active' : ''}`}
              onClick={() => onNavigate('wishlist')}
              title="Saved items in Wishlist"
            >
              <div className="icon-badge-wrap">
                <Heart size={21} />
                {wishlistCount > 0 && <span className="counter-badge">{wishlistCount}</span>}
              </div>
              <span className="action-label">Wishlist</span>
            </button>

            {/* Cart */}
            <button 
              className={`nav-action-btn ${activeView === 'cart' ? 'active' : ''}`}
              onClick={() => onNavigate('cart')}
              title="Shopping Cart"
            >
              <div className="icon-badge-wrap">
                <ShoppingCart size={21} />
                {cartCount > 0 && <span className="counter-badge cart-badge">{cartCount}</span>}
              </div>
              <span className="action-label">Cart</span>
            </button>

            {/* Account / User Menu */}
            <div className="user-menu-container" ref={userMenuRef}>
              {user ? (
                <button 
                  className="user-profile-btn" 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-text-info">
                    <span className="user-hello">Hello,</span>
                    <span className="user-name">{user.name.split(' ')[0]}</span>
                  </div>
                  <ChevronDown size={14} className="user-chevron" />
                </button>
              ) : (
                <button className="btn-sign-in" onClick={onOpenAuth}>
                  <UserIcon size={18} />
                  <span>Sign In</span>
                </button>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && user && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="header-name">{user.name}</div>
                    <div className="header-email">{user.email}</div>
                    <span className="header-role-badge">{user.role}</span>
                  </div>
                  <div className="dropdown-divider" />
                  <button 
                    className="dropdown-menu-item" 
                    onClick={() => { setIsUserMenuOpen(false); onNavigate('orders'); }}
                  >
                    <Package size={16} />
                    <span>My Orders & History</span>
                  </button>
                  <button 
                    className="dropdown-menu-item" 
                    onClick={() => { setIsUserMenuOpen(false); onNavigate('wishlist'); }}
                  >
                    <Heart size={16} />
                    <span>My Wishlist ({wishlistCount})</span>
                  </button>
                  <button 
                    className="dropdown-menu-item" 
                    onClick={() => { setIsUserMenuOpen(false); onNavigate('addresses'); }}
                  >
                    <MapPin size={16} />
                    <span>Saved Addresses</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button 
                    className="dropdown-menu-item logout-item" 
                    onClick={() => { setIsUserMenuOpen(false); onLogout(); }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <nav className="zen-categories-bar">
        <div className="container categories-container">
          <button 
            className={`cat-pill-btn ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            All Products
          </button>
          
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${activeView === 'category' ? 'active' : ''}`}
              onClick={() => onNavigate('category', { categorySlug: cat.slug, categoryName: cat.name })}
            >
              <span>{cat.name}</span>
            </button>
          ))}

          <button 
            className="cat-pill-btn deal-pill"
            onClick={() => onNavigate('search', { query: 'deal', filterDeal: true })}
          >
            <span className="deal-spark">⚡</span>
            <span>Deals of the Day</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-logo-btn">
                <span className="brand-title">ZENVORA</span>
              </div>
              <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              <div className="mobile-section-title">Shop by Category</div>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className="mobile-category-item"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate('category', { categorySlug: cat.slug, categoryName: cat.name });
                  }}
                >
                  <span>{cat.name}</span>
                </button>
              ))}

              <div className="mobile-divider" />
              <div className="mobile-section-title">Portals & Workspaces</div>
              <button 
                className="mobile-category-item"
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('seller-dashboard'); }}
              >
                <Store size={18} />
                <span>Seller Dashboard</span>
              </button>
              <button 
                className="mobile-category-item"
                onClick={() => { setIsMobileMenuOpen(false); onNavigate('admin-dashboard'); }}
              >
                <ShieldCheck size={18} />
                <span>Admin Operations</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
