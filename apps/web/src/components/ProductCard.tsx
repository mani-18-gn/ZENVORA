import React from 'react';
import { Star, Heart, ShoppingBag, Plus, Minus, Check, Zap } from 'lucide-react';
import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  cartQuantity: number;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  cartQuantity,
  onProductClick,
  onToggleWishlist,
  onAddToCart,
  onUpdateCartQty
}) => {
  const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleDecQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateCartQty(product.id, cartQuantity - 1);
  };

  const handleIncQty = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateCartQty(product.id, cartQuantity + 1);
  };

  return (
    <div className="zen-product-card" onClick={() => onProductClick(product)}>
      {/* Top Badges & Wishlist Toggle */}
      <div className="card-top-bar">
        <div className="badge-cluster">
          {product.isDealOfTheDay && (
            <span className="badge-deal">
              <Zap size={11} />
              <span>Deal</span>
            </span>
          )}
          {product.isBestSeller && !product.isDealOfTheDay && (
            <span className="badge-bestseller">Best Seller</span>
          )}
          {product.isAssured && (
            <span className="badge-assured">
              <Check size={10} strokeWidth={3} />
              <span>Assured</span>
            </span>
          )}
        </div>

        <button 
          className={`wishlist-heart-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        >
          <Heart 
            size={18} 
            fill={isInWishlist ? '#EF4444' : 'none'} 
            color={isInWishlist ? '#EF4444' : '#6B7280'} 
          />
        </button>
      </div>

      {/* Image Thumbnail with zoom effect */}
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="product-thumbnail" 
          loading="lazy"
        />
        {product.discountPercent > 0 && (
          <span className="discount-tag">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="card-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-title" title={product.title}>
          {product.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="product-rating-row">
          <div className="rating-pill">
            <span className="rating-score">{product.rating.toFixed(1)}</span>
            <Star size={11} fill="#FFFFFF" color="#FFFFFF" />
          </div>
          <span className="review-count">({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>

        {/* Pricing */}
        <div className="price-row">
          <div className="price-stack">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
        </div>

        <div className="delivery-note">
          <span>Free delivery by <strong>{product.deliveryDays === 1 ? 'Tomorrow' : '2 Days'}</strong></span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="card-footer" onClick={e => e.stopPropagation()}>
        {cartQuantity > 0 ? (
          <div className="qty-control-row">
            <button 
              className="qty-btn" 
              onClick={handleDecQty}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="qty-value">{cartQuantity} in cart</span>
            <button 
              className="qty-btn" 
              onClick={handleIncQty}
              aria-label="Increase quantity"
              disabled={cartQuantity >= product.stockCount}
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button 
            className="btn-add-to-cart"
            onClick={handleAddClick}
            disabled={!product.inStock}
          >
            <ShoppingBag size={15} />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
