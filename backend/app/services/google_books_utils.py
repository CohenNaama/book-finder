"""
Utility functions for processing and normalizing Google Books API data.

This module provides helper methods for cleaning book descriptions,
selecting appropriate image links, and serializing book metadata
into a consistent JSON-friendly structure.
"""

import re
import html


def _pick_image(image_links: dict | None) -> str:
    """
    Select the best available image URL from Google Books' imageLinks.

    The function prioritizes higher-quality images and ensures the URL
    uses HTTPS instead of HTTP.

    Args:
        image_links (dict | None): Dictionary containing image URLs by size.

    Returns:
        str: Selected image URL or an empty string if unavailable.
    """
    if not image_links:
        return ""
    for key in ["extraLarge", "large", "medium", "small", "thumbnail", "smallThumbnail"]:
        url = image_links.get(key)
        if url:
            return url.replace("http://", "https://")
    return ""


def clean_description(raw_html: str | None) -> str:
    """
    Clean and normalize a raw book description from Google Books API.

    Converts basic HTML formatting to readable text and removes unnecessary tags.

    Args:
        raw_html (str | None): Raw HTML description retrieved from the API.

    Returns:
        str: Cleaned, human-readable plain text description.
    """
    if not raw_html:
        return ""

    text = raw_html
    text = re.sub(r"(?i)<br\s*/?>", "\n", text)
    text = re.sub(r"(?i)</p>", "\n\n", text)
    text = re.sub(r"(?i)<li[^>]*>\s*", "• ", text)
    text = re.sub(r"(?i)</li>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text or ""


def serialize_book(item: dict) -> dict:
    """
    Serialize a Google Books API response item into a standardized dictionary.

    Args:
        item (dict): Single book entry from the Google Books API.

    Returns:
        dict: Simplified and uniform book representation.
    """
    info = item.get("volumeInfo", {})
    images = info.get("imageLinks", {})
    return {
        "id": item.get("id", ""),
        "title": info.get("title", "Unknown"),
        "authors": info.get("authors", []),
        "thumbnail": _pick_image(images),
    }
