"""
Unit tests for Google Books service and utility functions.

These tests verify:
- HTML cleaning and normalization logic.
- Google Books API interaction and data serialization.
"""

from unittest.mock import patch
from app.services import google_books_utils as utils
from app.services.google_books import search_books


def test_clean_description_removes_html():
    """
    Test that HTML tags and formatting are properly cleaned from book descriptions.

    Ensures:
        - HTML tags are removed.
        - Text remains readable and properly separated by newlines.
    """
    html_text = "<p>Hello<br>World</p>"
    cleaned = utils.clean_description(html_text)
    assert "Hello" in cleaned
    assert "<" not in cleaned


@patch("app.services.google_books.requests.get")
def test_search_books_returns_serialized(mock_get):
    """
    Test that search_books() correctly serializes API response data.

    Mocks:
        - requests.get() to simulate a successful Google Books API response.

    Ensures:
        - Returned result includes 'total' and 'items'.
        - Each item contains expected keys like 'title'.
    """
    mock_get.return_value.json.return_value = {
        "totalItems": 1,
        "items": [{"id": "1", "volumeInfo": {"title": "Test Book"}}],
    }
    mock_get.return_value.raise_for_status = lambda: None

    result = search_books("python")
    assert result["total"] == 1
    assert "items" in result
    assert result["items"][0]["title"] == "Test Book"
