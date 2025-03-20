from app import app, cache_handler
from flask import jsonify, session

@app.route('/api/authed')
def authed():
    # Check both session and cache handler
    session_token = session.get('token_info')
    cache_token = cache_handler.get_cached_token()
    
    if not session_token and not cache_token:
        return {'Authed': False}
    
    # Use session token if available, otherwise use cache token
    token_info = session_token if session_token else cache_token
    return {'Authed': True, 'token': token_info}