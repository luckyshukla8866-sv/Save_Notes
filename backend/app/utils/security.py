"""
NoteVault — Security Utilities
Access code normalization, rate limiter setup, content safety.
"""

import re
import logging
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.config import get_settings

logger = logging.getLogger("notevault.security")

# Rate limiter instance (keyed by client IP)
limiter = Limiter(key_func=get_remote_address)

# Dangerous patterns for content filtering
DANGEROUS_PATTERNS = [
    re.compile(r"<script", re.IGNORECASE),
    re.compile(r"javascript:", re.IGNORECASE),
    re.compile(r"on\w+\s*=", re.IGNORECASE),  # onclick=, onerror=, etc.
]

CODE_PATTERN = re.compile(r"^[a-z0-9_-]+$")


def normalize_access_code(code: str) -> str:
    """Normalize access code: strip, lowercase."""
    return code.strip().lower()


def validate_code_format(code: str) -> bool:
    """Validate access code format against regex."""
    settings = get_settings()
    if len(code) < settings.min_code_length or len(code) > settings.max_code_length:
        return False
    return bool(CODE_PATTERN.match(code))


def validate_note_size(content: str) -> bool:
    """Validate note content size in bytes."""
    settings = get_settings()
    return len(content.encode("utf-8")) <= settings.max_note_size


def check_content_safety(content: str) -> bool:
    """
    Basic content safety check.
    Returns True if content appears safe, False if suspicious patterns found.
    Note: Content is always displayed as plain text, so XSS is mitigated at display layer.
    This is an additional defense-in-depth measure.
    """
    for pattern in DANGEROUS_PATTERNS:
        if pattern.search(content):
            logger.warning(f"Suspicious content pattern detected: {pattern.pattern}")
            return False
    return True
