"""
NoteVault — MongoDB Database Connection
Async Motor client with TTL and unique index creation.
"""

import logging
import certifi
from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from app.config import get_settings

logger = logging.getLogger("notevault.database")

# Module-level state
_client: AsyncIOMotorClient | None = None
_db = None
_db_available: bool = False


def _build_mongo_uri(settings) -> str:
    """Build a properly encoded MongoDB connection URI from config fields."""
    user = quote_plus(settings.mongo_user)
    password = quote_plus(settings.mongo_password)
    host = settings.mongo_host
    if user and password:
        return f"mongodb+srv://{user}:{password}@{host}/?appName=Cluster0"
    return f"mongodb://{host}"


async def connect_db() -> None:
    """Initialize MongoDB connection and create indexes."""
    global _client, _db, _db_available
    settings = get_settings()
    uri = _build_mongo_uri(settings)

    try:
        _client = AsyncIOMotorClient(
            uri,
            serverSelectionTimeoutMS=5000,
            maxPoolSize=50,
            **({"tlsCAFile": certifi.where()} if uri.startswith("mongodb+srv") else {}),
        )
        # Verify connection
        await _client.admin.command("ping")
        _db = _client[settings.database_name]

        # Create indexes
        notes_collection = _db.notes
        await notes_collection.create_index("access_code", unique=True)
        await notes_collection.create_index("expires_at", expireAfterSeconds=0)

        _db_available = True
        logger.info("MongoDB connected. Indexes verified.")

    except ConnectionFailure as e:
        logger.warning(f"MongoDB unavailable: {e}. Starting in degraded mode.")
        _db_available = False
    except Exception as e:
        logger.warning(f"Database startup error: {e}. Starting in degraded mode.")
        _db_available = False


async def close_db() -> None:
    """Close MongoDB connection."""
    global _client, _db, _db_available
    if _client:
        _client.close()
        _client = None
        _db = None
        _db_available = False
        logger.info("MongoDB connection closed.")


def get_database():
    """Get the database instance."""
    return _db


def get_notes_collection():
    """Get the notes collection."""
    if _db is None:
        return None
    return _db.notes


def is_db_available() -> bool:
    """Check if database is available."""
    return _db_available
