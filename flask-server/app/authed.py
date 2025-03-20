from app import app, cache_handler
from flask import jsonify

@app.route('/api/authed')
def authed():
    token_info = cache_handler.get_cached_token()
    if not token_info:
        return {'Authed': False}
    return {'Authed': True}