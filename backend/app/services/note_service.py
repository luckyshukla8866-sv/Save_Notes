"""
NoteVault — Note Service
Business logic for creating and retrieving notes.
"""

import logging
from datetime import datetime, timezone
from pymongo.errors import DuplicateKeyError
from app.database import get_notes_collection, is_db_available
from app.utils.security import normalize_access_code
from app.utils.time_utils import calculate_expiry_utc, remaining_seconds, is_expired

logger = logging.getLogger("notevault.service")


class NoteServiceError(Exception):
    """Base service error."""
    pass


class DatabaseUnavailableError(NoteServiceError):
    """Raised when database is not connected."""
    pass


class DuplicateCodeError(NoteServiceError):
    """Raised when access code already exists."""
    pass


class NoteNotFoundError(NoteServiceError):
    """Raised when note is not found or expired."""
    pass


async def create_note(access_code: str, content: str, expiry_hours: int) -> dict:
    """
    Create a new note.
    
    Returns dict with access_code, expires_at, expires_in_seconds.
    Raises DuplicateCodeError if code already exists.
    Raises DatabaseUnavailableError if DB is down.
    """
    if not is_db_available():
        raise DatabaseUnavailableError("Database is currently unavailable.")

    collection = get_notes_collection()
    code = normalize_access_code(access_code)
    expires_at = calculate_expiry_utc(expiry_hours)
    now = datetime.now(timezone.utc)

    document = {
        "access_code": code,
        "content": content,
        "created_at": now,
        "expires_at": expires_at,
        "content_size": len(content.encode("utf-8")),
    }

    try:
        await collection.insert_one(document)
        logger.info(f"Note created: code='{code}', expires_in={expiry_hours}h")
        return {
            "access_code": code,
            "expires_at": expires_at.isoformat(),
            "expires_in_seconds": remaining_seconds(expires_at),
        }
    except DuplicateKeyError:
        logger.warning(f"Duplicate code attempt: '{code}'")
        raise DuplicateCodeError("This access code is already in use. Please choose a different one.")


async def get_note(access_code: str) -> dict:
    """
    Retrieve a note by access code.
    
    Returns dict with content, expires_at, remaining_seconds.
    Raises NoteNotFoundError if not found or expired.
    Raises DatabaseUnavailableError if DB is down.
    """
    if not is_db_available():
        raise DatabaseUnavailableError("Database is currently unavailable.")

    collection = get_notes_collection()
    code = normalize_access_code(access_code)

    document = await collection.find_one({"access_code": code})

    if document is None:
        logger.info(f"Note not found: code='{code}'")
        raise NoteNotFoundError("Note not found or has expired.")

    # Double-check expiry (MongoDB TTL has up to 60s lag)
    if is_expired(document["expires_at"]):
        logger.info(f"Note expired (TTL lag): code='{code}'")
        raise NoteNotFoundError("Note not found or has expired.")

    return {
        "content": document["content"],
        "expires_at": document["expires_at"].isoformat(),
        "remaining_seconds": remaining_seconds(document["expires_at"]),
    }
