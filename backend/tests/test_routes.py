"""
Integration tests for Flask routes in the Book Finder backend.

These tests verify:
- Basic health endpoint functionality.
- Book search endpoint integration with mocked Google Books API.
"""

from unittest.mock import patch


def test_health_endpoint(client):
    """
    Verify that the /health endpoint responds successfully.

    Ensures:
        - Returns HTTP 200 OK.
        - Response JSON includes "status": "ok".
    """
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


@patch("app.services.google_books.requests.get")
def test_search_books_endpoint(mock_get, client):
    """
    Verify that /api/books/search returns serialized data from the mocked API.

    Mocks:
        - requests.get() to simulate Google Books API response.

    Ensures:
        - Returns HTTP 200 OK.
        - JSON structure includes total and items.
        - Book titles match mocked data.
    """
    mock_get.return_value.json.return_value = {
        "totalItems": 1,
        "items": [{"id": "1", "volumeInfo": {"title": "Mocked Book"}}],
    }
    mock_get.return_value.raise_for_status = lambda: None

    response = client.get("/api/books/search?q=python")

    assert response.status_code == 200
    data = response.get_json()
    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["title"] == "Mocked Book"
