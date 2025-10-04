import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = "Books Finder"
ENV = os.getenv("ENV", "dev")

GOOGLE_BOOKS_BASE_URL = os.getenv("GOOGLE_BOOKS_BASE_URL", "https://www.googleapis.com/books/v1").rstrip("/")

try:
    REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "10"))
    if REQUEST_TIMEOUT <= 0:
        REQUEST_TIMEOUT = 10
except ValueError:
    REQUEST_TIMEOUT = 10

origins_csv = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
CORS_ORIGINS = [o.strip() for o in origins_csv.split(",") if o.strip()]
