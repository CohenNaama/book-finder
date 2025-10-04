import time
import functools
from typing import Any, Callable


def ttl_cache(ttl_seconds: int = 300, maxsize: int = 128):
    def decorator(func: Callable):
        cached_func = functools.lru_cache(maxsize=maxsize)(func)
        expiry_times: dict[Any, float] = {}

        @functools.wraps(func)
        def wrapped(*args, **kwargs):
            key = (args, tuple(sorted(kwargs.items())))
            now = time.time()

            if now > expiry_times.get(key, 0):
                result = cached_func(*args, **kwargs)
                expiry_times[key] = now + ttl_seconds
                return result

            return cached_func(*args, **kwargs)

        wrapped.cache_clear = cached_func.cache_clear
        return wrapped

    return decorator
