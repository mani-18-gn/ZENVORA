from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=128)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[0-9]{10,14}$")


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    role: Optional[str] = "CUSTOMER"


class UserResponse(UserBase):
    id: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str


class LoginPayload(BaseModel):
    username_or_email: str
    password: str


# Address Schemas
class AddressBase(BaseModel):
    name: str
    phone: str
    pincode: str = Field(..., min_length=6, max_length=6)
    address_line_1: str
    address_line_2: Optional[str] = None
    landmark: Optional[str] = None
    city: str
    state: str
    address_type: str = "HOME"
    is_default: bool = False


class AddressCreate(AddressBase):
    pass


class AddressResponse(AddressBase):
    id: str
    user_id: str

    class Config:
        from_attributes = True


# Product Schemas
class ProductBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=256)
    brand: str
    description: str
    price: float = Field(..., gt=0)
    original_price: float = Field(..., gt=0)
    stock_count: int = Field(default=0, ge=0)
    is_assured: bool = False


class ProductCreate(ProductBase):
    category_id: str
    seller_id: str


class ProductResponse(ProductBase):
    id: str
    discount_percent: int
    rating: float
    review_count: int
    is_active: bool

    class Config:
        from_attributes = True


# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: str
    quantity: int = Field(..., gt=0)
    selected_variant: Optional[str] = None


class OrderCreate(BaseModel):
    shipping_address_id: str
    payment_method: str
    items: List[OrderItemCreate]
    coupon_code: Optional[str] = None


class OrderResponse(BaseModel):
    id: str
    total_amount: float
    discount_amount: float
    delivery_fee: float
    tax_amount: float
    status: str
    payment_status: str
    payment_method: str
    created_at: datetime

    class Config:
        from_attributes = True
