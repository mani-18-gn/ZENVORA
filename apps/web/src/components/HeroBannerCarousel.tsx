import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { PROMOTIONAL_BANNERS } from '../data/mockData';
import './HeroBannerCarousel.css';

interface HeroBannerCarouselProps {
  onBannerClick: (categorySlug: string) => void;
}

export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({ onBannerClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % PROMOTIONAL_BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? PROMOTIONAL_BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % PROMOTIONAL_BANNERS.length);
  };

  return (
    <section className="zen-hero-section">
      <div className="container">
        
        {/* Carousel Slider */}
        <div className="carousel-wrapper">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {PROMOTIONAL_BANNERS.map((banner) => (
              <div 
                key={banner.id} 
                className="carousel-slide"
                style={{ background: banner.bgGradient }}
              >
                <div className="slide-content">
                  <span className="slide-badge" style={{ backgroundColor: banner.accentColor }}>
                    {banner.badge}
                  </span>
                  <h1 className="slide-title">{banner.title}</h1>
                  <p className="slide-subtitle">{banner.subtitle}</p>
                  
                  <div className="slide-cta-row">
                    <button 
                      className="btn-accent slide-cta-btn"
                      onClick={() => onBannerClick(banner.categoryTarget)}
                    >
                      <span>{banner.ctaText}</span>
                      <ChevronRight size={18} />
                    </button>
                    <span className="slide-subnote">Limited Period Offer • Terms Apply</span>
                  </div>
                </div>

                <div className="slide-image-wrap">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="slide-img" 
                    loading="eager"
                  />
                  <div className="img-glow-backdrop" style={{ background: banner.accentColor }} />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button 
            className="carousel-control prev-control" 
            onClick={handlePrev} 
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button 
            className="carousel-control next-control" 
            onClick={handleNext} 
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {PROMOTIONAL_BANNERS.map((_, idx) => (
              <button
                key={idx}
                className={`indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Value Proposition Trust Badges */}
        <div className="trust-features-bar">
          <div className="trust-feature-item">
            <div className="feature-icon-box">
              <ShieldCheck size={22} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">ZENVORA Assured</span>
              <span className="feature-desc">100% Authentic Quality Guaranteed</span>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="feature-icon-box">
              <Truck size={22} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">Free Express Shipping</span>
              <span className="feature-desc">On all orders over ₹499</span>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="feature-icon-box">
              <RotateCcw size={22} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">7-Day Easy Return</span>
              <span className="feature-desc">Hassle-free instant replacement</span>
            </div>
          </div>

          <div className="trust-feature-item">
            <div className="feature-icon-box">
              <Headphones size={22} className="feature-icon" />
            </div>
            <div className="feature-text">
              <span className="feature-title">24/7 Priority Support</span>
              <span className="feature-desc">Real-time chat & phone assistance</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
