"""
Main application entry point for the Book Finder backend.

This module initializes the Flask application, sets up logging, CORS, 
rate limiting, and registers all blueprints and error handlers. 
It also includes a health check endpoint to verify server status 
and clear the in-memory cache for the Google Books API service.
"""

import os
from flask import Flask, jsonify
from app import errors
from app.core.logging import setup_logging
from app.core.config import APP_NAME, CORS_ORIGINS
from app.extensions import cors, limiter, logger
from app.routers.books_routers import books_bp
from app.services.google_books import search_books
from requests import RequestException


def create_app():
    """
    Initialize and configure the Flask application.

    This function sets up logging, enables CORS and rate limiting,
    registers blueprints for the API routes, and attaches global 
    error handlers.

    Returns:
        Flask: The configured Flask application instance.
    """
    setup_logging()
    app = Flask(APP_NAME)

    cors.init_app(app, origins=CORS_ORIGINS, supports_credentials=True)
    limiter.init_app(app)

    @app.get("/health")
    def health():
        """
        Health check endpoint.

        Clears the search_books cache and verifies the server is running.

        Returns:
            tuple: A JSON response containing the app status and HTTP 200 code.
        """
        search_books.cache_clear()
        logger.info("Cache cleared via /health")
        app.logger.info("Cache cleared via /health")
        return jsonify({"status": "ok"}), 200
    
    app.register_blueprint(books_bp)
    app.register_error_handler(RequestException, errors.requests_handler)

    return app


app = create_app()


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port) 
