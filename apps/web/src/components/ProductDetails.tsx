import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MapPin, 
  Check, 
  ThumbsUp, 
  Tag, 
  ChevronRight,
  Share2,
  Clock
} from 'lucide-react';
import type { Product, ProductReview } from '../types';
import './ProductDetails.css';

interface ProductDetailsProps {
  product: Product;
  isInWishlist: boolean;
  userPincode: string;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onBuyNow: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onNavigateCategory: (slug: string, name: string) => void;
  onNavigateProduct: (prod: Product) => void;
  similarProducts: Product[];
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  isInWishlist,
  userPincode,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onNavigateCategory,
  onNavigateProduct,
  similarProducts,
  onShowToast
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [pincodeInput, setPincodeInput] = useState(userPincode || '560034');
  const [deliveryChecked, setDeliveryChecked] = useState(true);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(product.reviews || []);

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');
  const savingsAmount = product.originalPrice - product.price;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setDeliveryChecked(true);
      onShowToast(`Delivery available for ${pincodeInput}`, 'success');
    } else {
      onShowToast('Please enter a valid 6-digit Indian pincode', 'error');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) {
      onShowToast('Please provide a review title and comment', 'error');
      return;
    }
    const createdReview: ProductReview = {
      id: 'rev-' + Date.now(),
      author: 'You (Verified Buyer)',
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle,
      comment: newReviewComment,
      isVerified: true,
      helpfulCount: 0
    };
    setLocalReviews([createdReview, ...localReviews]);
    setNewReviewTitle('');
    setNewReviewComment('');
    onShowToast('Review submitted successfully!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="product-details-page fade-in">
      <div className="container">
        
        {/* Breadcrumbs */}
        <nav className="breadcrumbs-nav">
          <button className="breadcrumb-link" onClick={() => onNavigateCategory('all', 'All Products')}>Home</button>
          <ChevronRight size={14} className="breadcrumb-arrow" />
          <button 
            className="breadcrumb-link" 
            onClick={() => onNavigateCategory(product.category, product.category)}
          >
            {product.category}
          </button>
          <ChevronRight size={14} className="breadcrumb-arrow" />
          <span className="breadcrumb-current">{product.subcategory || product.title}</span>
        </nav>

        {/* Main Details Grid */}
        <div className="details-layout-grid">
          
          {/* Left Column: Image Gallery */}
          <div className="gallery-column">
            <div className="gallery-sticky-wrap">
              <div className="main-image-viewport">
                <img 
                  src={product.images[selectedImageIndex] || product.images[0]} 
                  alt={product.title} 
                  className="main-preview-img"
                />
                
                <button 
                  className={`detail-wishlist-btn ${isInWishlist ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(product)}
                  title={isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart 
                    size={22} 
                    fill={isInWishlist ? '#EF4444' : 'none'} 
                    color={isInWishlist ? '#EF4444' : '#4B4E68'} 
                  />
                </button>

                <button className="detail-share-btn" onClick={handleShare} title="Share product">
                  <Share2 size={18} />
                </button>
              </div>

              {/* Thumbnails rail */}
              {product.images.length > 1 && (
                <div className="thumbnail-rail">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`thumb-btn ${selectedImageIndex === idx ? 'selected' : ''}`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img src={imgUrl} alt={`${product.title} preview ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Direct Action Buttons */}
              <div className="gallery-actions-row">
                <button 
                  className="btn-add-cart-large"
                  onClick={() => onAddToCart(product, selectedColor, selectedSize)}
                  disabled={!product.inStock}
                >
                  <ShoppingBag size={20} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button 
                  className="btn-buy-now-large"
                  onClick={() => onBuyNow(product, selectedColor, selectedSize)}
                  disabled={!product.inStock}
                >
                  <Zap size={20} />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Overview, Variants, Seller, & Specs */}
          <div className="info-column">
            
            {/* Brand & Title */}
            <div className="info-header">
              <span className="info-brand">{product.brand}</span>
              <h1 className="info-title">{product.title}</h1>
              
              <div className="info-rating-row">
                <div className="rating-pill large">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star size={13} fill="#FFFFFF" color="#FFFFFF" />
                </div>
                <span className="rating-text">
                  <strong>{product.rating}</strong> ({product.reviewCount.toLocaleString('en-IN')} verified ratings & reviews)
                </span>
                {product.isAssured && (
                  <span className="badge-assured">
                    <Check size={11} strokeWidth={3} />
                    <span>Zenvora Assured</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="info-price-card">
              <div className="deal-countdown-row">
                <span className="badge-deal">Limited Time Deal</span>
                <span className="deal-timer-text">
                  <Clock size={14} /> Ends in 05h 42m
                </span>
              </div>

              <div className="price-display-group">
                <span className="price-large">{formatCurrency(product.price)}</span>
                <span className="mrp-strikethrough">{formatCurrency(product.originalPrice)}</span>
                <span className="savings-badge">
                  Save {formatCurrency(savingsAmount)} ({product.discountPercent}% OFF)
                </span>
              </div>
              <div className="tax-inclusive-text">Inclusive of all taxes. Free shipping on this order.</div>
            </div>

            {/* Bank Offers & Promotions */}
            <div className="bank-offers-box">
              <div className="offers-header">
                <Tag size={16} className="tag-icon" />
                <span>Available Offers</span>
              </div>
              <ul className="offers-list">
                <li>
                  <strong>Bank Offer:</strong> Flat ₹500 instant discount on ICICI and HDFC Bank Credit Cards on min spend of ₹5,000.
                </li>
                <li>
                  <strong>Special Price:</strong> Get extra 10% off using coupon code <strong>ZENVORA100</strong> at checkout.
                </li>
                <li>
                  <strong>Partner Offer:</strong> Buy this item and get 20% off on matching accessories.
                </li>
              </ul>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="variants-section">
                <span className="variant-label">
                  Color: <strong>{selectedColor}</strong>
                </span>
                <div className="color-swatches-row">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      className={`color-swatch-btn ${selectedColor === col.name ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(col.name)}
                      title={col.name}
                    >
                      <span className="swatch-color-dot" style={{ backgroundColor: col.hex }} />
                      <span className="swatch-name">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Storage Variants */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="variants-section">
                <span className="variant-label">
                  Select Size / Variant: <strong>{selectedSize}</strong>
                </span>
                <div className="sizes-row">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pincode & Delivery Checker */}
            <div className="pincode-card">
              <div className="pincode-header">
                <MapPin size={18} className="pin-icon" />
                <span>Delivery & Services Options</span>
              </div>
              
              <form className="pincode-form" onSubmit={handleCheckPincode}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                />
                <button type="submit" className="pincode-submit-btn">Check</button>
              </form>

              {deliveryChecked && (
                <div className="delivery-perks">
                  <div className="perk-row">
                    <Truck size={16} className="perk-icon" />
                    <span>Free Delivery by <strong>Tomorrow, 4:00 PM</strong></span>
                  </div>
                  <div className="perk-row">
                    <Check size={16} className="perk-icon" />
                    <span>Cash on Delivery Available</span>
                  </div>
                  <div className="perk-row">
                    <RotateCcw size={16} className="perk-icon" />
                    <span>7-Day Replacement Policy</span>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Information */}
            <div className="seller-info-card">
              <div className="seller-left">
                <span className="seller-sub">Sold and Fulfilled by:</span>
                <span className="seller-name">{product.seller.name}</span>
                <span className="seller-stats">
                  ★ {product.seller.rating} Rating • Over {product.seller.totalSales.toLocaleString('en-IN')} units sold
                </span>
              </div>
              <div className="seller-right">
                <span className="badge-assured">Verified Merchant</span>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="highlights-section">
              <h2 className="section-title">Product Highlights</h2>
              <ul className="highlights-list">
                {product.highlights.map((item, idx) => (
                  <li key={idx}>
                    <Check size={16} className="highlight-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Description */}
            <div className="description-section">
              <h2 className="section-title">Product Description</h2>
              <p className="description-text">{product.description}</p>
            </div>

            {/* Specifications Table */}
            <div className="specs-section">
              <h2 className="section-title">Technical Specifications</h2>
              <div className="specs-table">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div key={idx} className="spec-row">
                    <span className="spec-key">{key}</span>
                    <span className="spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-header-row">
                <h2 className="section-title">Customer Ratings & Reviews</h2>
              </div>

              {/* Rating summary */}
              <div className="rating-overview-card">
                <div className="overall-score-col">
                  <span className="big-rating-number">{product.rating}</span>
                  <div className="rating-stars-cluster">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span className="total-ratings-label">{product.reviewCount.toLocaleString('en-IN')} ratings</span>
                </div>

                <div className="rating-bars-col">
                  {[
                    { stars: 5, pct: 75 },
                    { stars: 4, pct: 18 },
                    { stars: 3, pct: 4 },
                    { stars: 2, pct: 2 },
                    { stars: 1, pct: 1 }
                  ].map(bar => (
                    <div key={bar.stars} className="rating-bar-row">
                      <span className="bar-star-label">{bar.stars} ★</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${bar.pct}%` }} />
                      </div>
                      <span className="bar-pct-label">{bar.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review Form */}
              <form className="write-review-card" onSubmit={handleAddReview}>
                <h3 className="write-review-title">Share Your Experience</h3>
                <div className="star-select-row">
                  <span className="star-select-label">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      type="button"
                      key={st}
                      className="star-btn"
                      onClick={() => setNewReviewRating(st)}
                    >
                      <Star 
                        size={20} 
                        fill={st <= newReviewRating ? '#F59E0B' : 'none'} 
                        color={st <= newReviewRating ? '#F59E0B' : '#9CA3AF'} 
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Review title (e.g. Excellent sound quality & battery!)"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="review-input"
                />
                <textarea
                  placeholder="Write detailed feedback about comfort, performance, delivery..."
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="review-textarea"
                />
                <button type="submit" className="btn-primary submit-review-btn">
                  Submit Verified Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="reviews-list">
                {localReviews.length === 0 ? (
                  <p className="empty-reviews-text">No reviews yet. Be the first customer to review this product!</p>
                ) : (
                  localReviews.map(rev => (
                    <div key={rev.id} className="review-card">
                      <div className="review-top">
                        <div className="rating-pill small">
                          <span>{rev.rating}</span>
                          <Star size={10} fill="#FFFFFF" color="#FFFFFF" />
                        </div>
                        <h4 className="review-item-title">{rev.title}</h4>
                      </div>
                      <p className="review-body-text">{rev.comment}</p>
                      <div className="review-meta-row">
                        <span className="review-author">{rev.author}</span>
                        {rev.isVerified && (
                          <span className="verified-badge">
                            <ShieldCheck size={12} />
                            <span>Verified Buyer</span>
                          </span>
                        )}
                        <span className="review-date">• {rev.date}</span>
                        <button className="helpful-btn">
                          <ThumbsUp size={12} />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Similar / Recommended Products Carousel Row */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <div className="section-header-row">
              <h2 className="section-title">Similar & Recommended Products</h2>
              <span className="section-subtitle">Based on your browsing preferences</span>
            </div>
            
            <div className="similar-products-grid">
              {similarProducts.slice(0, 4).map(prod => (
                <div 
                  key={prod.id} 
                  className="similar-prod-card"
                  onClick={() => onNavigateProduct(prod)}
                >
                  <img src={prod.images[0]} alt={prod.title} className="similar-img" />
                  <span className="similar-brand">{prod.brand}</span>
                  <h4 className="similar-title">{prod.title}</h4>
                  <div className="similar-price-row">
                    <span className="similar-price">{formatCurrency(prod.price)}</span>
                    <span className="similar-discount">{prod.discountPercent}% OFF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
