from flask import Flask, jsonify
from app import errors
from app.core.logging import setup_logging
from app.core.config import APP_NAME, CORS_ORIGINS
from app.extensions import cors, limiter, logger
from app.routers.books_routers import books_bp
from app.services.google_books import search_books
from requests import RequestException


def create_app():
    setup_logging()
    app = Flask(APP_NAME)

    cors.init_app(app, origins=CORS_ORIGINS, supports_credentials=True)
    limiter.init_app(app)

    @app.get("/health")
    def health():
        search_books.cache_clear()
        logger.info("Cache cleared via /health")
        app.logger.info("Cache cleared via /health")
        return jsonify({"status": "ok"}), 200
    
    app.register_blueprint(books_bp)
    app.register_error_handler(RequestException, errors.requests_handler)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
    