"""
NoteVault — Time Utilities
UTC-based expiry calculation and helpers.
"""

from datetime import datetime, timedelta, timezone


def calculate_expiry_utc(hours: int) -> datetime:
    """Calculate expiry timestamp in UTC."""
    now = datetime.now(timezone.utc)
    return now + timedelta(hours=hours)


def get_utc_now() -> datetime:
    """Get current UTC timestamp."""
    return datetime.now(timezone.utc)


def remaining_seconds(expires_at: datetime) -> int:
    """Calculate remaining seconds until expiry."""
    now = datetime.now(timezone.utc)
    # Ensure expires_at is timezone-aware
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    delta = (expires_at - now).total_seconds()
    return max(0, int(delta))


def is_expired(expires_at: datetime) -> bool:
    """Check if a timestamp has passed."""
    now = datetime.now(timezone.utc)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    return expires_at <= now
