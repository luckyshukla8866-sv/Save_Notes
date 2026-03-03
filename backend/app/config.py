"""
NoteVault — Application Configuration
Loads all settings from environment variables via Pydantic BaseSettings.
"""

from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache


class Settings(BaseSettings):
    # Application
    app_env: str = Field(default="development")
    app_host: str = Field(default="0.0.0.0")
    app_port: int = Field(default=8000)
    api_v1_prefix: str = Field(default="/api/v1")
    debug: bool = Field(default=False)

    # MongoDB
    mongo_host: str = Field(default="localhost:27017")
    mongo_user: str = Field(default="cluster0.w4awnjb.mongodb.net")
    mongo_password: str = Field(default="luckyshukla_db_user")
    database_name: str = Field(default="notevault")

    # Security
    allowed_origins: str = Field(default="https://save-notes-mocha.vercel.app")
    rate_limit_create: str = Field(default="3/minute")
    rate_limit_read: str = Field(default="10/minute")
    max_note_size: int = Field(default=51200)  # 50KB
    max_expiry_hours: int = Field(default=168)  # 7 days
    min_code_length: int = Field(default=8)
    max_code_length: int = Field(default=32)

    @property
    def cors_origins(self) -> list[str]:
        """Parse comma-separated origins into a list."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


@lru_cache()
def get_settings() -> Settings:
    """Cached settings singleton."""
    return Settings()
