import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  Check, 
  Search as SearchIcon 
} from 'lucide-react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import './SearchResults.css';

interface SearchResultsProps {
  searchQuery: string;
  categoryFilter?: string;
  allProducts: Product[];
  wishlistIds: string[];
  cartItemQuantities: Record<string, number>;
  onProductClick: (prod: Product) => void;
  onToggleWishlist: (prod: Product) => void;
  onAddToCart: (prod: Product) => void;
  onUpdateCartQty: (prodId: string, qty: number) => void;
  onResetSearch: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  categoryFilter,
  allProducts,
  wishlistIds,
  cartItemQuantities,
  onProductClick,
  onToggleWishlist,
  onAddToCart,
  onUpdateCartQty,
  onResetSearch
}) => {
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minRating, setMinRating] = useState<number | undefined>();
  const [assuredOnly, setAssuredOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    allProducts.forEach(p => {
      if (!categoryFilter || p.category === categoryFilter) {
        brandsSet.add(p.brand);
      }
    });
    return Array.from(brandsSet).sort();
  }, [allProducts, categoryFilter]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchBrand && !matchCategory && !matchTags) return false;
        }

        // Category filter
        if (categoryFilter && categoryFilter !== 'all' && p.category !== categoryFilter) {
          return false;
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }

        // Price filter
        if (minPrice !== undefined && p.price < minPrice) return false;
        if (maxPrice !== undefined && p.price > maxPrice) return false;

        // Rating filter
        if (minRating !== undefined && p.rating < minRating) return false;

        // Assured
        if (assuredOnly && !p.isAssured) return false;

        // In Stock
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
        return 0; // 'featured'
      });
  }, [
    allProducts,
    searchQuery,
    categoryFilter,
    selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    assuredOnly,
    inStockOnly,
    sortBy
  ]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinRating(undefined);
    setAssuredOnly(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    minPrice !== undefined || 
    maxPrice !== undefined || 
    minRating !== undefined || 
    assuredOnly || 
    inStockOnly;

  return (
    <div className="search-results-page fade-in">
      <div className="container">
        
        {/* Results Header Bar */}
        <div className="results-header-bar">
          <div className="header-titles">
            <h1 className="results-title">
              {searchQuery ? (
                <>Results for "<strong>{searchQuery}</strong>"</>
              ) : categoryFilter ? (
                <>Browsing: <strong style={{ textTransform: 'capitalize' }}>{categoryFilter}</strong></>
              ) : (
                'All Marketplace Products'
              )}
            </h1>
            <span className="results-count">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="sort-filter-actions">
            <button 
              className="mobile-filter-toggle-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter size={16} />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <div className="sort-by-group">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured Deals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
                <option value="newest">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-filters-row">
            <span className="chips-label">Active Filters:</span>
            {selectedBrands.map(b => (
              <span key={b} className="filter-chip">
                Brand: {b}
                <button onClick={() => toggleBrand(b)}><X size={12} /></button>
              </span>
            ))}
            {minRating !== undefined && (
              <span className="filter-chip">
                {minRating}★ & above
                <button onClick={() => setMinRating(undefined)}><X size={12} /></button>
              </span>
            )}
            {assuredOnly && (
              <span className="filter-chip">
                Zenvora Assured
                <button onClick={() => setAssuredOnly(false)}><X size={12} /></button>
              </span>
            )}
            {inStockOnly && (
              <span className="filter-chip">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}><X size={12} /></button>
              </span>
            )}
            {(minPrice !== undefined || maxPrice !== undefined) && (
              <span className="filter-chip">
                Price: {minPrice ? `₹${minPrice}` : '₹0'} - {maxPrice ? `₹${maxPrice}` : 'Any'}
                <button onClick={() => { setMinPrice(undefined); setMaxPrice(undefined); }}><X size={12} /></button>
              </span>
            )}
            <button className="clear-all-link" onClick={handleClearFilters}>
              Clear All
            </button>
          </div>
        )}

        {/* Main Search Layout: Filters Sidebar + Grid */}
        <div className="results-grid-layout">
          
          {/* Left Sidebar: Filters */}
          <aside className={`filters-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <div className="sidebar-title-group">
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button className="reset-filter-btn" onClick={handleClearFilters}>
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Zenvora Assured Toggle */}
            <div className="filter-group">
              <label className="toggle-label-row">
                <input 
                  type="checkbox" 
                  checked={assuredOnly} 
                  onChange={(e) => setAssuredOnly(e.target.checked)} 
                />
                <span className="badge-assured">
                  <Check size={10} strokeWidth={3} />
                  <span>Zenvora Assured</span>
                </span>
              </label>
            </div>

            {/* In Stock Only */}
            <div className="filter-group">
              <label className="toggle-label-row">
                <input 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={(e) => setInStockOnly(e.target.checked)} 
                />
                <span className="filter-checkbox-text">Exclude Out of Stock</span>
              </label>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Price Range (₹)</h3>
              <div className="price-inputs-row">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice ?? ''}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="price-filter-input"
                />
                <span className="price-dash">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice ?? ''}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="price-filter-input"
                />
              </div>

              {/* Quick price pills */}
              <div className="quick-price-pills">
                <button 
                  className="quick-price-pill" 
                  onClick={() => { setMinPrice(0); setMaxPrice(2000); }}
                >
                  Under ₹2K
                </button>
                <button 
                  className="quick-price-pill" 
                  onClick={() => { setMinPrice(2000); setMaxPrice(10000); }}
                >
                  ₹2K - ₹10K
                </button>
                <button 
                  className="quick-price-pill" 
                  onClick={() => { setMinPrice(10000); setMaxPrice(30000); }}
                >
                  ₹10K - ₹30K
                </button>
              </div>
            </div>

            {/* Customer Rating Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Customer Rating</h3>
              <div className="rating-options-list">
                {[4, 3, 2].map(stars => (
                  <label key={stars} className="rating-radio-row">
                    <input
                      type="radio"
                      name="rating-filter"
                      checked={minRating === stars}
                      onChange={() => setMinRating(stars)}
                    />
                    <div className="rating-stars-preview">
                      <span>{stars}★ & above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            {availableBrands.length > 0 && (
              <div className="filter-group">
                <h3 className="filter-heading">Brands</h3>
                <div className="brands-list-wrap">
                  {availableBrands.map(brand => (
                    <label key={brand} className="checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span className="brand-name-text">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Product Grid */}
          <main className="results-main-content">
            {filteredProducts.length === 0 ? (
              <div className="empty-search-state">
                <div className="empty-icon-box">
                  <SearchIcon size={48} className="empty-search-icon" />
                </div>
                <h2 className="empty-title">No products found</h2>
                <p className="empty-desc">
                  We couldn't find any products matching your selected criteria. Try adjusting your search keywords or resetting active filters.
                </p>
                <div className="empty-actions">
                  <button className="btn-primary" onClick={handleClearFilters}>
                    Reset All Filters
                  </button>
                  <button className="btn-outline" onClick={onResetSearch}>
                    View All Products
                  </button>
                </div>
              </div>
            ) : (
              <div className="search-products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={wishlistIds.includes(product.id)}
                    cartQuantity={cartItemQuantities[product.id] || 0}
                    onProductClick={onProductClick}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    onUpdateCartQty={onUpdateCartQty}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
