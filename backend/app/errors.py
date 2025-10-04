"""
Global error handlers for the Book Finder backend.

This module defines standardized responses for external request
errors such as Google Books API timeouts or connection failures.
"""

from flask import jsonify
from requests import RequestException, Timeout

def requests_handler(exc: RequestException):
    """
    Handle external request errors in a unified JSON format.

    Args:
        exc (RequestException): Exception raised during an external HTTP request.

    Returns:
        tuple: Flask JSON response and corresponding HTTP status code.
    """
    if isinstance(exc, Timeout):
        return jsonify({"detail": "Upstream timeout from Google Books"}), 504
    return jsonify({"detail": f"Upstream error: {exc}"}), 502
