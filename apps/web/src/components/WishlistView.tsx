import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import './WishlistView.css';

interface WishlistViewProps {
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onContinueShopping: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onProductClick,
  onContinueShopping
}) => {
  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  return (
    <div className="wishlist-page fade-in">
      <div className="container">
        
        <div className="wishlist-header-row">
          <div className="header-titles">
            <h1 className="wishlist-title">My Wishlist</h1>
            <span className="wishlist-count-label">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item saved' : 'items saved'}
            </span>
          </div>
          {wishlistProducts.length > 0 && (
            <button className="continue-browse-btn" onClick={onContinueShopping}>
              <span>Explore More Deals</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="empty-wishlist-card">
            <div className="empty-wishlist-icon-wrap">
              <Heart size={48} className="empty-wishlist-icon" />
            </div>
            <h2 className="empty-wishlist-title">Your Wishlist is Empty</h2>
            <p className="empty-wishlist-desc">
              Save your favorite gadgets, designer outfits, and must-have lifestyle products here to keep track of deals and price drops!
            </p>
            <button className="btn-accent empty-wishlist-cta" onClick={onContinueShopping}>
              <span>Discover Products</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistProducts.map(product => (
              <div 
                key={product.id} 
                className="wishlist-item-card"
                onClick={() => onProductClick(product)}
              >
                <button 
                  className="remove-wishlist-cross"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product.id);
                  }}
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>

                <div className="wishlist-thumb-wrap">
                  <img src={product.images[0]} alt={product.title} className="wishlist-thumb" />
                  {product.discountPercent > 0 && (
                    <span className="wishlist-discount-badge">{product.discountPercent}% OFF</span>
                  )}
                </div>

                <div className="wishlist-item-content">
                  <span className="wishlist-brand">{product.brand}</span>
                  <h3 className="wishlist-prod-title" title={product.title}>{product.title}</h3>

                  <div className="wishlist-price-row">
                    <span className="wishlist-price">{formatCurrency(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="wishlist-mrp">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>

                  <div className="wishlist-stock-status">
                    {product.inStock ? (
                      <span className="in-stock-tag">In Stock</span>
                    ) : (
                      <span className="out-stock-tag">Out of Stock</span>
                    )}
                  </div>
                </div>

                <div className="wishlist-card-footer" onClick={e => e.stopPropagation()}>
                  <button 
                    className="btn-move-cart"
                    onClick={() => onMoveToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingBag size={15} />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
