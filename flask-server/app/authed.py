from app import app, cache_handler, sp_oauth
from flask import jsonify, session

@app.route('/api/authed')
def authed():
    # Check both session and cache handler
    session_token = session.get('token_info')
    cache_token = cache_handler.get_cached_token()
    print(session_token, 'session token in authed')
    print(cache_token, 'cache token in authed')
    
    # Use session token if available, otherwise use cache token
    token_info = session_token if session_token else cache_token
    
    # Try to refresh the token if it exists
    if token_info:
        try:
            if sp_oauth.is_token_expired(token_info):
                token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
                # Update both storage locations
                session['token_info'] = token_info
                cache_handler.save_token_to_cache(token_info)
        except Exception as e:
            print(f"Error refreshing token: {e}")
            token_info = None
    
    if not token_info:
        return {'Authed': False}
    
    return {'Authed': True, 'token': token_info}