from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    """
    ZENVORA Marketplace Core Environment Configuration.
    Credentials and secrets must always be supplied via environment variables.
    """
    PROJECT_NAME: str = "ZENVORA Marketplace API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")

    # Security & JWT Tokens
    SECRET_KEY: str = Field(
        default="development_secret_key_change_in_production_environment", 
        env="JWT_SECRET_KEY"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days

    # Database Configuration (PostgreSQL)
    DATABASE_URL: str = Field(
        default="postgresql+asyncpg://zenvora_user:zenvora_password@localhost:5432/zenvora_db",
        env="DATABASE_URL"
    )

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]

    # Payment Gateway Credentials (e.g. Razorpay / Stripe / PhonePe)
    PAYMENT_GATEWAY_KEY: str = Field(default="", env="PAYMENT_GATEWAY_KEY")
    PAYMENT_GATEWAY_SECRET: str = Field(default="", env="PAYMENT_GATEWAY_SECRET")
    PAYMENT_WEBHOOK_SECRET: str = Field(default="", env="PAYMENT_WEBHOOK_SECRET")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
