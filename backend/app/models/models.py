from sqlalchemy import (
    Column, String, Integer, Float, Boolean, ForeignKey, DateTime, Text, Enum
)
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.core.database import Base


class UserRole(str, enum.Enum):
    CUSTOMER = "CUSTOMER"
    SELLER = "SELLER"
    ADMIN = "ADMIN"


class OrderStatusEnum(str, enum.Enum):
    PLACED = "PLACED"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"


class PaymentStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    PAID = "PAID"
    REFUNDED = "REFUNDED"
    FAILED = "FAILED"


class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    email = Column(String(128), unique=True, index=True, nullable=False)
    phone = Column(String(32), unique=True, index=True, nullable=False)
    hashed_password = Column(String(256), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    addresses = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="user")


class Address(Base):
    __tablename__ = "addresses"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    name = Column(String(128), nullable=False)
    phone = Column(String(32), nullable=False)
    pincode = Column(String(10), nullable=False, index=True)
    address_line_1 = Column(String(256), nullable=False)
    address_line_2 = Column(String(256), nullable=True)
    landmark = Column(String(128), nullable=True)
    city = Column(String(64), nullable=False)
    state = Column(String(64), nullable=False)
    address_type = Column(String(16), default="HOME")
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")


class Seller(Base):
    __tablename__ = "sellers"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), unique=True, nullable=False)
    business_name = Column(String(128), nullable=False)
    gstin = Column(String(32), unique=True, nullable=True)
    rating = Column(Float, default=5.0)
    total_sales = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    products = relationship("Product", back_populates="seller")


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(64), unique=True, nullable=False)
    slug = Column(String(64), unique=True, index=True, nullable=False)
    image_url = Column(String(512), nullable=True)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(String(64), primary_key=True, index=True)
    seller_id = Column(String(64), ForeignKey("sellers.id"), nullable=False)
    category_id = Column(String(64), ForeignKey("categories.id"), nullable=False)
    title = Column(String(256), nullable=False, index=True)
    brand = Column(String(64), nullable=False, index=True)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=False)
    discount_percent = Column(Integer, default=0)
    stock_count = Column(Integer, default=0)
    is_assured = Column(Boolean, default=False)
    rating = Column(Float, default=4.5)
    review_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    seller = relationship("Seller", back_populates="products")
    category = relationship("Category", back_populates="products")


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0.0)
    delivery_fee = Column(Float, default=0.0)
    tax_amount = Column(Float, default=0.0)
    status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.PLACED, nullable=False)
    payment_status = Column(Enum(PaymentStatusEnum), default=PaymentStatusEnum.PENDING, nullable=False)
    payment_method = Column(String(64), nullable=False)
    gateway_transaction_id = Column(String(128), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String(64), primary_key=True, index=True)
    order_id = Column(String(64), ForeignKey("orders.id"), nullable=False)
    product_id = Column(String(64), ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    unit_price = Column(Float, nullable=False)
    selected_variant = Column(String(64), nullable=True)

    order = relationship("Order", back_populates="items")
