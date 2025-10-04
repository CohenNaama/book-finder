import logging
from .config import ENV

def setup_logging() -> None:
    level = logging.DEBUG if ENV == "dev" else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

