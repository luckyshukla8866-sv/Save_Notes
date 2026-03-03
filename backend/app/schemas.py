"""
NoteVault — Pydantic Schemas
Strict input validation with security-first defaults.
"""

import re
from pydantic import BaseModel, Field, field_validator
from app.config import get_settings

# Allowed characters: lowercase alphanumeric, underscore, hyphen
CODE_PATTERN = re.compile(r"^[a-z0-9_-]+$")

# Allowed expiry options in hours
ALLOWED_EXPIRY_HOURS = [1, 6, 24, 168]


class NoteCreateRequest(BaseModel):
    """Request schema for creating a note."""
    access_code: str = Field(
        ...,
        description="Unique access code (lowercase, 8-32 chars)",
        examples=["my_secret_note"],
    )
    content: str = Field(
        ...,
        description="Note content (max 50KB)",
        examples=["This is my private note content."],
    )
    expiry_hours: int = Field(
        ...,
        description="Expiry time in hours (1, 6, 24, or 168)",
        examples=[24],
    )

    @field_validator("access_code")
    @classmethod
    def validate_access_code(cls, v: str) -> str:
        settings = get_settings()
        # Strip whitespace
        v = v.strip()
        # Force lowercase
        v = v.lower()
        # Length check
        if len(v) < settings.min_code_length:
            raise ValueError(
                f"Access code must be at least {settings.min_code_length} characters."
            )
        if len(v) > settings.max_code_length:
            raise ValueError(
                f"Access code must be at most {settings.max_code_length} characters."
            )
        # Pattern check
        if not CODE_PATTERN.match(v):
            raise ValueError(
                "Access code must contain only lowercase letters, numbers, underscores, and hyphens."
            )
        return v

    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        settings = get_settings()
        # Strip whitespace
        v = v.strip()
        # Empty check
        if not v:
            raise ValueError("Note content cannot be empty.")
        # Size check (in bytes)
        content_size = len(v.encode("utf-8"))
        if content_size > settings.max_note_size:
            max_kb = settings.max_note_size // 1024
            raise ValueError(
                f"Note content exceeds maximum size of {max_kb}KB."
            )
        return v

    @field_validator("expiry_hours")
    @classmethod
    def validate_expiry_hours(cls, v: int) -> int:
        if v not in ALLOWED_EXPIRY_HOURS:
            raise ValueError(
                f"Expiry must be one of: {', '.join(str(h) for h in ALLOWED_EXPIRY_HOURS)} hours."
            )
        return v


class NoteCreateResponse(BaseModel):
    """Response schema after creating a note."""
    success: bool = True
    data: dict = Field(
        ...,
        description="Response data with access_code, expires_at, expires_in_seconds",
    )


class NoteRetrieveResponse(BaseModel):
    """Response schema for retrieving a note."""
    success: bool = True
    data: dict = Field(
        ...,
        description="Response data with content, expires_at, remaining_seconds",
    )


class ErrorResponse(BaseModel):
    """Standardized error response."""
    success: bool = False
    error: dict = Field(
        ...,
        description="Error details with code and message",
    )
