"""
Service layer for interacting with the Google Books API.

This module handles communication with Google's API endpoints, 
performs request validation and error handling, and returns 
structured, serialized book data to the application layer.
"""

import logging
import requests
from requests import Timeout, RequestException
from app.core.config import GOOGLE_BOOKS_BASE_URL, REQUEST_TIMEOUT
from app.core.cache import ttl_cache
from app.services.google_books_utils import _pick_image, serialize_book, clean_description
from typing import Any


logger = logging.getLogger(__name__)
BASE = GOOGLE_BOOKS_BASE_URL


@ttl_cache(ttl_seconds=300, maxsize=100)
def search_books(query: str, start_index: int = 0, max_results: int = 20) -> dict[str, Any]:
    """
    Search for books using the Google Books API.

    Args:
        query (str): Search keyword or phrase.
        start_index (int, optional): Pagination start index. Defaults to 0.
        max_results (int, optional): Maximum number of results to return. Defaults to 20.

    Returns:
        dict[str, Any]: A dictionary containing total results and serialized book items.

    Raises:
        Timeout: If the Google Books API request times out.
        RequestException: For other HTTP or connection-related errors.
    """
    params = {
        "q": query,
        "startIndex": start_index,
        "maxResults": max_results,
        "printType": "books",  
        "fields": "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks)",
    }
    try:
        response = requests.get(f"{BASE}/volumes", params=params, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        
        data = response.json()
        items = data.get("items", [])

        return {
                "total": data.get("totalItems", 0),
                "items": [serialize_book(item) for item in items],
            }

    except Timeout as e:
        logger.warning("Google Books search timeout: %s", e)
        return {
            "total": 0,
            "items": [],
            "error": "Request to Google Books API timed out. Please try again."
        }

    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code if e.response else None
        if status_code == 429:
            logger.error("Google Books API rate limit reached (429 Too Many Requests)")
            return {
                "total": 0,
                "items": [],
                "error": "Google Books API rate limit reached. Please try again later."
            }
        else:
            logger.error("HTTP error from Google Books API: %s", e)
            return {
                "total": 0,
                "items": [],
                "error": f"HTTP error from Google Books API (status {status_code})."
            }

    except RequestException as e:
        logger.error("Google Books search error: %s", e)
        return {
            "total": 0,
            "items": [],
            "error": "Failed to connect to Google Books API."
        }


@ttl_cache(ttl_seconds=600, maxsize=200)
def get_book(volume_id: str) -> dict:
    """
    Retrieve a single book's detailed information from the Google Books API.

    Args:
        volume_id (str): Unique Google Books volume identifier.

    Returns:
        dict: Serialized book data including description and metadata.

    Raises:
        Timeout: If the API request exceeds the timeout threshold.
        RequestException: For other HTTP or connection-related errors.
    """
    try:
        response = requests.get(f"{BASE}/volumes/{volume_id}", timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        data = response.json()

        book = serialize_book(data)

        info = data.get("volumeInfo", {})
        description = clean_description(info.get("description", ""))
        if description:
            book["description"] = description

        return book
    
    except Timeout as e:
        logger.warning("Google Books get timeout: %s", e)
        raise
    except RequestException as e:
        logger.error("Google Books get error: %s", e)
        raise
