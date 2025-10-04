import logging
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


cors = CORS()
logger = logging.getLogger(__name__)
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per hour"],
    storage_uri="memory://",
)
