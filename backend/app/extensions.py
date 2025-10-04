"""
Application extensions for the Book Finder backend.

This module initializes reusable Flask extensions such as:
- CORS (Cross-Origin Resource Sharing)
- Rate Limiter (for API throttling)
- Logger (application-level logging)

Each extension is initialized here and later configured within `app.py`.
"""

import logging
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize CORS support
cors = CORS()

# Initialize a base logger
logger = logging.getLogger(__name__)

# Configure global rate limiter
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per hour"],
    storage_uri="memory://",
)
