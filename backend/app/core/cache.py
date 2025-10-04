"""
TTL-based caching utility for lightweight in-memory caching.

This module provides a decorator for caching function results using an 
LRU cache with a time-to-live (TTL) mechanism for automatic expiration.
"""

import time
import functools
from typing import Any, Callable


def ttl_cache(ttl_seconds: int = 300, maxsize: int = 128):
    """
    Decorator that applies a time-based LRU cache to a function.

    Args:
        ttl_seconds (int, optional): Time in seconds before cache entries expire. Defaults to 300.
        maxsize (int, optional): Maximum number of items to cache. Defaults to 128.

    Returns:
        Callable: Wrapped function with time-based caching.
    """
    def decorator(func: Callable):
        cached_func = functools.lru_cache(maxsize=maxsize)(func)
        expiry_times: dict[Any, float] = {}

        @functools.wraps(func)
        def wrapped(*args, **kwargs):
            key = (args, tuple(sorted(kwargs.items())))
            now = time.time()

            # Expire cache entry if TTL passed
            if now > expiry_times.get(key, 0):
                result = cached_func(*args, **kwargs)
                expiry_times[key] = now + ttl_seconds
                return result

            return cached_func(*args, **kwargs)
        
        # Utility method for manual cache clearing
        wrapped.cache_clear = cached_func.cache_clear
        return wrapped

    return decorator
