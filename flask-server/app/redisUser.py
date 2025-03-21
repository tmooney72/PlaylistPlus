import redis
import os
from typing import Any, Dict, Optional

class RedisHelper:
    def __init__(self):
        redis_url = os.getenv('REDIS_URL')
        if not redis_url:
            raise ValueError("REDIS_URL environment variable is not set")
        self.redis_client = redis.from_url(redis_url)

    def set_value(self, key: str, value: str, expire_seconds: Optional[int] = None) -> bool:
        """Set a key-value pair, optionally with expiration"""
        if expire_seconds:
            return self.redis_client.setex(key, expire_seconds, value)
        return self.redis_client.set(key, value)

    def get_value(self, key: str) -> Optional[str]:
        """Get a value by key"""
        value = self.redis_client.get(key)
        return value.decode('utf-8') if value else None

    def set_hash(self, key: str, data: Dict[str, Any]) -> bool:
        """Set a hash (dictionary) value"""
        return self.redis_client.hset(key, mapping=data)

    def get_hash(self, key: str) -> Dict[str, str]:
        """Get a hash value"""
        data = self.redis_client.hgetall(key)
        return {k.decode('utf-8'): v.decode('utf-8') for k, v in data.items()}

    def delete_key(self, key: str) -> bool:
        """Delete a key"""
        return bool(self.redis_client.delete(key))

# Usage example:
redis_helper = RedisHelper()