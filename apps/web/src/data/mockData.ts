import type { Product, CategoryItem, Order, Coupon, User } from '../types';

export const SAMPLE_DATA_NOTICE = 'SAMPLE DATA: Running in development mode with simulated catalog and mock persistence.';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    iconName: 'Tv',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Audio & Headphones', 'Wearables & Smartwatches', 'Laptops & Computers', 'Gaming & Consoles', 'Cameras & Photography']
  },
  {
    id: 'cat-mobiles',
    name: 'Mobiles & Tablets',
    slug: 'mobiles-tablets',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Flagship Smartphones', 'Budget 5G Phones', 'Tablets & iPads', 'Power Banks & Chargers', 'Cases & Covers']
  },
  {
    id: 'cat-fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80',
    subcategories: ["Men's Wear", "Women's Ethnic", "Women's Western", 'Footwear & Sneakers', 'Watches & Accessories']
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    slug: 'home-living',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Kitchen Appliances', 'Smart Home & Lighting', 'Bedding & Furnishing', 'Cookware & Dining', 'Home Decor']
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Skincare Essentials', 'Fragrances & Perfumes', 'Hair Care & Styling', 'Makeup & Cosmetics', "Grooming for Men"]
  },
  {
    id: 'cat-groceries',
    name: 'Groceries & Gourmet',
    slug: 'groceries',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Organic Staples', 'Dry Fruits & Nuts', 'Tea, Coffee & Beverages', 'Snacks & Packaged Food', 'Chocolates & Sweets']
  },
  {
    id: 'cat-sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    iconName: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    subcategories: ['Gym Equipment', 'Yoga & Aerobics', 'Sports Footwear', 'Activewear', 'Outdoor & Camping']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'zen-prod-101',
    title: 'AuraSound Pro ANC Wireless Noise-Cancelling Headphones with Spatial Audio',
    brand: 'AuraSound',
    category: 'electronics',
    subcategory: 'Audio & Headphones',
    price: 8499,
    originalPrice: 14999,
    discountPercent: 43,
    rating: 4.7,
    reviewCount: 3840,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience studio-grade audio with AuraSound Pro. Equipped with Hybrid 4-mic Active Noise Cancellation, custom 40mm beryllium drivers, and up to 55 hours of battery life with ultra-fast Type-C charging.',
    highlights: [
      'Industry-leading Hybrid Active Noise Cancellation up to 42dB',
      '55 Hours playtime on single charge (10 mins charge = 8 hours play)',
      'Multi-device seamless Bluetooth 5.4 multipoint pairing',
      'Ultra-plush memory foam earcups with sweat-resistant protein leather',
      '1 Year Official ZENVORA Assured Replacement Warranty'
    ],
    specifications: {
      'Driver Size': '40mm Custom High-Res Dynamic',
      'Frequency Response': '16Hz - 40,000Hz',
      'Bluetooth Version': 'v5.4 with LDAC & AAC codec',
      'Battery Life': '55 Hours (ANC off), 42 Hours (ANC on)',
      'Weight': '248 grams',
      'Microphones': '6-mic array with AI ENC voice clarity'
    },
    inStock: true,
    stockCount: 42,
    isAssured: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    colors: [
      { name: 'Midnight Obsidian', hex: '#1C1917' },
      { name: 'Platinum Silver', hex: '#E2E8F0' },
      { name: 'Royal Indigo', hex: '#3730A3' }
    ],
    seller: {
      id: 'seller-tech-01',
      name: 'Aura Audio Direct',
      rating: 4.8,
      totalSales: 18450
    },
    deliveryDays: 1,
    tags: ['headphones', 'wireless', 'anc', 'bestseller', 'audio', 'bluetooth'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Rohan Mehra',
        rating: 5,
        date: '2 days ago',
        title: 'Mindblowing ANC and comfort',
        comment: 'I travel daily by metro and these completely eliminate track and rumble noise. Soundstage is punchy without muddying the vocals. Highly recommended!',
        isVerified: true,
        helpfulCount: 48
      },
      {
        id: 'rev-2',
        author: 'Priya Sharma',
        rating: 4,
        date: '1 week ago',
        title: 'Great battery, looks super sleek',
        comment: 'Battery lasts almost 2 weeks with 3-4 hours daily listening. Cushioning is exceptionally soft.',
        isVerified: true,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'zen-prod-102',
    title: 'Nova Apex 5G (12GB RAM, 256GB Storage, 120Hz AMOLED, 68W TurboCharge)',
    brand: 'Nova',
    category: 'mobiles-tablets',
    subcategory: 'Flagship Smartphones',
    price: 24999,
    originalPrice: 32999,
    discountPercent: 24,
    rating: 4.6,
    reviewCount: 5210,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nova Apex 5G delivers cutting-edge speed powered by the Dimensity 8200 Ultra processor, gorgeous 6.67" 120Hz 1.5K CrystalRes AMOLED display, and a 64MP OIS main camera with 4K HDR video.',
    highlights: [
      '6.67-inch 120Hz 1.5K Curved AMOLED Display with Dolby Vision',
      'MediaTek Dimensity 8200-Ultra 4nm Processor',
      '64MP Sony IMX sensor with Optical Image Stabilization (OIS)',
      '5000mAh Battery with 68W Turbo Charger in-box',
      'Corning Gorilla Glass Victus protection'
    ],
    specifications: {
      'RAM / Storage': '12GB LPDDR5X + 256GB UFS 3.1',
      'Display': '6.67" 1.5K OLED, 1800 nits peak',
      'Processor': 'Dimensity 8200 Ultra Octa-Core',
      'Camera': '64MP OIS + 8MP Ultra-wide + 16MP Selfie',
      'OS': 'NovaOS 4.0 based on Android 14'
    },
    inStock: true,
    stockCount: 19,
    isAssured: true,
    isBestSeller: true,
    colors: [
      { name: 'Cosmic Titanium', hex: '#475569' },
      { name: 'Aurora Emerald', hex: '#065F46' },
      { name: 'Sunset Gold', hex: '#D97706' }
    ],
    sizes: ['128GB', '256GB', '512GB'],
    seller: {
      id: 'seller-retail-02',
      name: 'OmniGadgets Prime',
      rating: 4.9,
      totalSales: 43200
    },
    deliveryDays: 1,
    tags: ['mobile', 'smartphone', '5g', 'nova', 'flagship', 'android'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Arjun Verma',
        rating: 5,
        date: '3 days ago',
        title: 'Best phone under ₹30K hands down',
        comment: 'Display is gorgeous, camera takes crisp pictures in low light, and battery easily lasts 1.5 days. 68W charging tops it up in 35 minutes.',
        isVerified: true,
        helpfulCount: 63
      }
    ]
  },
  {
    id: 'zen-prod-103',
    title: 'Titanium Chrono Master Automatic Mechanical Watch with Sapphire Crystal',
    brand: 'Chrono Lux',
    category: 'fashion',
    subcategory: 'Watches & Accessories',
    price: 4999,
    originalPrice: 11999,
    discountPercent: 58,
    rating: 4.8,
    reviewCount: 1420,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision handcrafted automatic mechanical timepiece. Crafted from aerospace-grade 316L stainless steel, scratch-resistant double-domed sapphire crystal, and waterproof up to 100 meters.',
    highlights: [
      'Japanese 24-Jewel self-winding mechanical automatic movement',
      'Double-domed anti-reflective scratch-proof sapphire crystal',
      '100M / 10 ATM Water Resistance with screw-down crown',
      'Interchangeable Italian full-grain leather strap + stainless steel link bracelet included',
      '2 Years International Movement Warranty'
    ],
    specifications: {
      'Case Diameter': '41mm',
      'Case Thickness': '11.8mm',
      'Band Width': '20mm',
      'Movement': 'Miyota 9015 Automatic, 28,800 bph',
      'Water Resistance': '100m / 330ft'
    },
    inStock: true,
    stockCount: 15,
    isAssured: true,
    isDealOfTheDay: true,
    colors: [
      { name: 'Rose Gold & Royal Brown', hex: '#B45309' },
      { name: 'Silver Slate & Onyx Black', hex: '#18181B' }
    ],
    seller: {
      id: 'seller-chrono-03',
      name: 'Horology House India',
      rating: 4.9,
      totalSales: 9800
    },
    deliveryDays: 2,
    tags: ['watch', 'luxury', 'mechanical', 'automatic', 'fashion', 'men'],
    reviews: []
  },
  {
    id: 'zen-prod-104',
    title: 'BrewCraft Smart Barista Espresso Maker & Milk Frother (20-Bar Italian Pump)',
    brand: 'BrewCraft',
    category: 'home-living',
    subcategory: 'Kitchen Appliances',
    price: 11499,
    originalPrice: 19999,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 960,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bring the third-wave cafe experience right to your countertop. Featuring a commercial 20-bar Italian ULKA pump, PID thermal control, stainless steel dual-wall filters, and a high-velocity microfoam steam wand.',
    highlights: [
      '20-Bar High Pressure Italian ULKA Extraction Pump',
      'Thermo-block heating system heats in just 35 seconds',
      'Commercial-style 360-degree stainless steel micro-foam steam wand',
      'Digital touch interface with customizable single and double shot dosing',
      'Includes tamper, milk pitcher, and 2 portafilter baskets'
    ],
    specifications: {
      'Pump Pressure': '20 Bar',
      'Water Tank Capacity': '1.8 Liters (Removable)',
      'Power Consumption': '1450 Watts',
      'Material': 'Brushed Food-Grade SUS304 Stainless Steel'
    },
    inStock: true,
    stockCount: 28,
    isAssured: true,
    colors: [
      { name: 'Brushed Chrome', hex: '#CBD5E1' },
      { name: 'Matte Obsidian', hex: '#27272A' }
    ],
    seller: {
      id: 'seller-home-04',
      name: 'KitchenCraft Appliances',
      rating: 4.7,
      totalSales: 12400
    },
    deliveryDays: 2,
    tags: ['coffee', 'espresso', 'kitchen', 'appliance', 'barista', 'home'],
    reviews: []
  },
  {
    id: 'zen-prod-105',
    title: 'GlowRadiance 10% Niacinamide + Zinc Daily Clarifying Serum (30ml)',
    brand: 'GlowRadiance',
    category: 'beauty',
    subcategory: 'Skincare Essentials',
    price: 549,
    originalPrice: 899,
    discountPercent: 38,
    rating: 4.5,
    reviewCount: 8940,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f73fba8809?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clinically proven daily serum formulated with pure 10% Vitamin B3 (Niacinamide) and 1% Zinc PCA to balance sebum, minimize enlarged pores, reduce blemishes, and strengthen the epidermal barrier.',
    highlights: [
      'Reduces dark spots, acne scars, and blemish frequency',
      'Non-sticky, lightweight watery formula absorbs in 15 seconds',
      'Dermatologically tested, fragrance-free, cruelty-free, and vegan',
      'Formulated with soothing Aloe Vera extract and Hyaluronic Acid'
    ],
    specifications: {
      'Volume': '30 ml (Glass Dropper Bottle)',
      'Skin Type': 'Oily, Combination, Acne-Prone & Sensitive',
      'Key Actives': '10% Niacinamide, 1% Zinc PCA, Hyaluronic Acid',
      'Country of Origin': 'India'
    },
    inStock: true,
    stockCount: 150,
    isAssured: true,
    isBestSeller: true,
    seller: {
      id: 'seller-beauty-05',
      name: 'DermaCare Official',
      rating: 4.8,
      totalSales: 89000
    },
    deliveryDays: 1,
    tags: ['skincare', 'serum', 'niacinamide', 'glow', 'beauty', 'acne'],
    reviews: []
  },
  {
    id: 'zen-prod-106',
    title: 'UrbanFlex Ultra-Lightweight Breathable Running Shoes (Impact Cushioning)',
    brand: 'UrbanFlex',
    category: 'fashion',
    subcategory: 'Footwear & Sneakers',
    price: 1899,
    originalPrice: 3999,
    discountPercent: 52,
    rating: 4.4,
    reviewCount: 2150,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for maximum athletic performance and all-day street style. Made with seamless 3D circular knit mesh, responsive EVA bouncy foam midsole, and slip-resistant rubber outsole.',
    highlights: [
      'Featherlight construction at just 210 grams per shoe',
      'High-energy return rebound foam absorbs shock during sprints',
      'Moisture-wicking anti-odor OrthoLite insole',
      'Reflective heel accents for nighttime running safety'
    ],
    specifications: {
      'Upper Material': 'Engineered FlyKnit Mesh',
      'Sole Material': 'Phylon Rebound EVA + Grip Rubber',
      'Closure': 'Lace-Up',
      'Toe Style': 'Round Toe with Protective Bumper'
    },
    inStock: true,
    stockCount: 65,
    isAssured: true,
    colors: [
      { name: 'Fire Engine Crimson', hex: '#DC2626' },
      { name: 'Stealth Carbon Black', hex: '#18181B' },
      { name: 'Electric Royal Blue', hex: '#2563EB' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    seller: {
      id: 'seller-footwear-06',
      name: 'SpeedStride Footwear',
      rating: 4.6,
      totalSales: 21500
    },
    deliveryDays: 2,
    tags: ['shoes', 'sneakers', 'running', 'sports', 'footwear', 'fashion'],
    reviews: []
  },
  {
    id: 'zen-prod-107',
    title: 'Himalayan Golden Royal Valley Whole Leaf Green Tea (100g Vintage Tin)',
    brand: 'Himalayan Bloom',
    category: 'groceries',
    subcategory: 'Tea, Coffee & Beverages',
    price: 389,
    originalPrice: 650,
    discountPercent: 40,
    rating: 4.7,
    reviewCount: 1820,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'First flush single-estate organic green tea harvested at 6,500 feet in the pristine valleys of Kangra, Himachal Pradesh. Packed with natural antioxidants, catechins, and subtle floral aroma.',
    highlights: [
      '100% Whole Long Leaf tea, zero dust or fannings',
      'Certified 100% Organic, non-GMO, zero chemical pesticides',
      'Packed at source in food-grade airtight keepsake tin canister',
      'Yields up to 50 fragrant aromatic cups'
    ],
    specifications: {
      'Weight': '100 Grams',
      'Form': 'Whole Leaf Loose Tea',
      'Caffeine Content': 'Low Natural Caffeine',
      'Shelf Life': '24 Months'
    },
    inStock: true,
    stockCount: 88,
    isAssured: true,
    seller: {
      id: 'seller-tea-07',
      name: 'Estate Direct Organics',
      rating: 4.9,
      totalSales: 34000
    },
    deliveryDays: 2,
    tags: ['green tea', 'organic', 'grocery', 'tea', 'healthy', 'beverage'],
    reviews: []
  },
  {
    id: 'zen-prod-108',
    title: 'Cast Iron Dutch Oven 5.5 Quart with Enamelled Porcelain Coating',
    brand: 'RusticKitchen',
    category: 'home-living',
    subcategory: 'Cookware & Dining',
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 1340,
    images: [
      'https://images.unsplash.com/photo-1584990347449-a2e6f47702f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavyweight enamelled cast iron Dutch oven that retains heat evenly and locks in moisture with self-basting condensation bumps under the lid. Oven safe up to 260°C (500°F).',
    highlights: [
      'Superior heat retention and gentle even cooking for braises, stews, and sourdough bread',
      'Non-reactive smooth vitreous enamel interior prevents sticking',
      'Induction, gas, ceramic, and oven compatible',
      'Heavy-duty stainless steel knob and wide ergonomic loop handles'
    ],
    specifications: {
      'Capacity': '5.5 Quarts (5.2 Liters)',
      'Weight': '5.8 Kilograms',
      'Max Temperature': '260°C (500°F)',
      'Coating': 'Triple-layer porcelain enamel'
    },
    inStock: true,
    stockCount: 30,
    isAssured: true,
    isBestSeller: true,
    colors: [
      { name: 'Cobalt Royal Blue', hex: '#1D4ED8' },
      { name: 'Cherry Ruby Red', hex: '#B91C1C' },
      { name: 'Sage Olive Green', hex: '#4D7C0F' }
    ],
    seller: {
      id: 'seller-cookware-08',
      name: 'Artisan Culinary Store',
      rating: 4.8,
      totalSales: 15300
    },
    deliveryDays: 2,
    tags: ['cookware', 'dutch oven', 'cast iron', 'kitchen', 'home'],
    reviews: []
  }
];

export const MOCK_USER: User = {
  id: 'usr-customer-001',
  name: 'Vikramaditya Rao',
  email: 'vikram.rao@zenvora.dev',
  phone: '+91 98765 43210',
  role: 'CUSTOMER',
  addresses: [
    {
      id: 'addr-1',
      name: 'Vikramaditya Rao',
      phone: '+91 98765 43210',
      pincode: '560034',
      addressLine1: 'Flat 402, Zenvora Serene Towers',
      addressLine2: '80 Feet Road, 4th Block, Koramangala',
      landmark: 'Near Sony World Signal',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'HOME',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Vikramaditya Rao (Office)',
      phone: '+91 98765 43210',
      pincode: '560103',
      addressLine1: 'Level 5, Ecospace Tech Park, Outer Ring Road',
      addressLine2: 'Bellandur Suburb',
      landmark: 'Behind Central Mall',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'WORK',
      isDefault: false
    }
  ]
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ZN-892410-IN',
    date: '2026-10-24T14:30:00Z',
    items: [
      {
        productId: 'zen-prod-101',
        title: 'AuraSound Pro ANC Wireless Noise-Cancelling Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        price: 8499,
        quantity: 1,
        variant: 'Midnight Obsidian'
      }
    ],
    totalAmount: 8499,
    discountAmount: 6500,
    deliveryFee: 0,
    tax: 425,
    shippingAddress: MOCK_USER.addresses[0],
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'PAID',
    status: 'SHIPPED',
    expectedDelivery: 'Tomorrow, Oct 27 by 4:00 PM',
    trackingHistory: [
      {
        status: 'Order Placed',
        date: 'Oct 24, 02:30 PM',
        description: 'Order confirmed and verified by ZENVORA system',
        completed: true
      },
      {
        status: 'Packed at Hub',
        date: 'Oct 25, 09:15 AM',
        description: 'Seller Aura Audio Direct packaged the item at Bengaluru Fulfillment Hub',
        completed: true
      },
      {
        status: 'Shipped & In Transit',
        date: 'Oct 26, 06:45 AM',
        description: 'Dispatched via Zenvora Express Logistics (Tracking: ZX-99124)',
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: 'Expected Oct 27, 09:00 AM',
        description: 'Delivery executive assigned for doorstep delivery',
        completed: false
      },
      {
        status: 'Delivered',
        date: 'Expected Oct 27, 04:00 PM',
        description: 'Package delivered with OTP verification',
        completed: false
      }
    ]
  },
  {
    id: 'ZN-771923-IN',
    date: '2026-10-18T10:15:00Z',
    items: [
      {
        productId: 'zen-prod-105',
        title: 'GlowRadiance 10% Niacinamide + Zinc Daily Clarifying Serum (30ml)',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
        price: 549,
        quantity: 2
      }
    ],
    totalAmount: 1098,
    discountAmount: 700,
    deliveryFee: 0,
    tax: 55,
    shippingAddress: MOCK_USER.addresses[0],
    paymentMethod: 'Credit Card (Visa ** 4092)',
    paymentStatus: 'PAID',
    status: 'DELIVERED',
    expectedDelivery: 'Delivered on Oct 20, 2:40 PM',
    trackingHistory: [
      { status: 'Order Placed', date: 'Oct 18', description: 'Order confirmed', completed: true },
      { status: 'Packed', date: 'Oct 18', description: 'Packed securely', completed: true },
      { status: 'Shipped', date: 'Oct 19', description: 'In transit', completed: true },
      { status: 'Delivered', date: 'Oct 20, 02:40 PM', description: 'Delivered to resident', completed: true }
    ]
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'ZENVORA100',
    discountType: 'FLAT',
    discountValue: 100,
    minOrderValue: 999,
    description: 'Flat ₹100 Off on orders above ₹999'
  },
  {
    code: 'FESTIVE15',
    discountType: 'PERCENT',
    discountValue: 15,
    minOrderValue: 1999,
    description: 'Get 15% Off up to ₹600 on Festive Season Orders'
  },
  {
    code: 'WELCOME50',
    discountType: 'FLAT',
    discountValue: 50,
    minOrderValue: 499,
    description: 'Flat ₹50 Off on your first Zenvora order'
  }
];

export const PROMOTIONAL_BANNERS = [
  {
    id: 'banner-1',
    badge: 'GRAND MEGA SALE',
    title: 'Next-Gen Audio & Smart Tech',
    subtitle: 'Up to 60% OFF on Flagship ANC Headphones, 5G Phones & Wearables',
    ctaText: 'Explore Tech Deals',
    categoryTarget: 'electronics',
    bgGradient: 'linear-gradient(135deg, #371B8F 0%, #5925DC 50%, #7C3AED 100%)',
    accentColor: '#FF8A00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'banner-2',
    badge: 'FESTIVE WARDROBE',
    title: 'Premium Footwear & Horology',
    subtitle: 'Up to 55% OFF on Automatic Mechanical Timepieces & Streetwear',
    ctaText: 'Shop Fashion',
    categoryTarget: 'fashion',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
    accentColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'banner-3',
    badge: 'HOME MAKEOVER DAYS',
    title: 'Gourmet Kitchen & Barista Living',
    subtitle: 'Flat 40% OFF on 20-Bar Espresso Machines & Cast Iron Cookware',
    ctaText: 'Upgrade Your Home',
    categoryTarget: 'home-living',
    bgGradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)',
    accentColor: '#10B981',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80'
  }
];
