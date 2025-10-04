from flask import jsonify
from requests import RequestException, Timeout

def requests_handler(exc: RequestException):
    if isinstance(exc, Timeout):
        return jsonify({"detail": "Upstream timeout from Google Books"}), 504
    return jsonify({"detail": f"Upstream error: {exc}"}), 502
