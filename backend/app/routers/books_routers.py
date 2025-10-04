"""
Books API routes for the Book Finder backend.

This module defines HTTP endpoints for searching and retrieving book
data via the Google Books API service layer.
"""

from flask import Blueprint, jsonify, request
from app.services.google_books import search_books, get_book
from app.services.google_books_utils import clean_description, _pick_image
from app.extensions import limiter


books_bp = Blueprint("books", __name__, url_prefix="/api/books")


@books_bp.get("/search")
@limiter.limit("5 per second")
def search():
    """
    Search for books by query string.

    Accepts pagination parameters (start, limit) and delegates
    the search to the Google Books service.

    Query Parameters:
        q (str): Search term (required).
        start (int): Pagination start index (optional).
        limit (int): Maximum number of results to return (optional).

    Returns:
        tuple: JSON response with book list and HTTP 200 status code.
    """
    q = (request.args.get("q") or "").strip()
    if not q:
        return jsonify({"detail": "Query parameter 'q' is required"}), 400
    try:
        start_index = int(request.args.get("start", 0))
        max_results = int(request.args.get("limit", 20))
    except ValueError:
        return jsonify({"detail": "Invalid pagination parameters"}), 400

    results = search_books(q, start_index=start_index, max_results=max_results)
    return jsonify(results), 200


@books_bp.get("/<string:volume_id>")
def details(volume_id):
    """
    Retrieve detailed book information by volume ID.

    Args:
        volume_id (str): The Google Books volume identifier.

    Returns:
        tuple: JSON response with book details and HTTP status code.
    """
    book = get_book(volume_id)
    if not book:
        return jsonify({"detail": "Book not found"}), 404

    return jsonify(book), 200
