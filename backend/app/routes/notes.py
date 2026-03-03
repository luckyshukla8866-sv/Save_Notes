"""
NoteVault — API Routes
POST /notes, GET /notes/{code}, GET /health
"""

import logging
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.schemas import NoteCreateRequest
from app.utils.security import limiter, normalize_access_code, validate_code_format
from app.database import is_db_available
from app.services.note_service import (
    create_note,
    get_note,
    DuplicateCodeError,
    NoteNotFoundError,
    DatabaseUnavailableError,
)
from app.config import get_settings

logger = logging.getLogger("notevault.routes")
settings = get_settings()

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    db_status = "connected" if is_db_available() else "disconnected"
    return {"status": "ok", "database": db_status}


@router.post("/notes", status_code=201)
@limiter.limit(settings.rate_limit_create)
async def create_note_endpoint(request: Request, body: NoteCreateRequest):
    """
    Create a new note.
    Rate limited: 3 creates per minute per IP.
    """
    try:
        result = await create_note(
            access_code=body.access_code,
            content=body.content,
            expiry_hours=body.expiry_hours,
        )
        return {"success": True, "data": result}

    except DuplicateCodeError as e:
        return JSONResponse(
            status_code=409,
            content={
                "success": False,
                "error": {
                    "code": "CODE_ALREADY_EXISTS",
                    "message": str(e),
                },
            },
        )
    except DatabaseUnavailableError:
        return JSONResponse(
            status_code=503,
            content={
                "success": False,
                "error": {
                    "code": "SERVICE_UNAVAILABLE",
                    "message": "Service temporarily unavailable. Please try again later.",
                },
            },
        )
    except Exception as e:
        logger.error(f"Unexpected error in create_note: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": "Something went wrong. Please try again.",
                },
            },
        )


@router.get("/notes/{access_code}")
@limiter.limit(settings.rate_limit_read)
async def get_note_endpoint(request: Request, access_code: str):
    """
    Retrieve a note by access code.
    Rate limited: 10 reads per minute per IP.
    """
    # Normalize and validate code format
    code = normalize_access_code(access_code)
    if not validate_code_format(code):
        return JSONResponse(
            status_code=422,
            content={
                "success": False,
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Invalid access code format.",
                },
            },
        )

    try:
        result = await get_note(code)
        return {"success": True, "data": result}

    except NoteNotFoundError:
        return JSONResponse(
            status_code=404,
            content={
                "success": False,
                "error": {
                    "code": "NOTE_NOT_FOUND",
                    "message": "Note not found or has expired.",
                },
            },
        )
    except DatabaseUnavailableError:
        return JSONResponse(
            status_code=503,
            content={
                "success": False,
                "error": {
                    "code": "SERVICE_UNAVAILABLE",
                    "message": "Service temporarily unavailable. Please try again later.",
                },
            },
        )
    except Exception as e:
        logger.error(f"Unexpected error in get_note: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_ERROR",
                    "message": "Something went wrong. Please try again.",
                },
            },
        )
