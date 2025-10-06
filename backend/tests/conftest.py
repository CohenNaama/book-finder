"""
Pytest fixture configuration for the Book Finder backend.

This module defines reusable test fixtures used across the test suite,
including a Flask test client for integration-style tests.
"""

import pytest
from app.main import create_app

@pytest.fixture
def client():
    """
    Create and configure a Flask test client.

    Yields:
        FlaskClient: A test client instance for sending requests to the app.
    """
    app = create_app()
    app.config.update({"TESTING": True})
    with app.test_client() as client:
        yield client
