"""
Logging configuration for the Book Finder backend.

This module sets up global logging behavior for the Flask application.
Log level and format are adjusted dynamically based on the current environment.
"""

import logging
from .config import ENV

def setup_logging() -> None:
    """
    Configure the global logging settings.

    Uses DEBUG level for development and INFO for production.
    Defines a consistent log message format with timestamps and module names.
    """
    level = logging.DEBUG if ENV == "dev" else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )
