from app import app, cache_handler, sp_oauth
from flask import jsonify, session

@app.route('/api/authed')
def authed():
    try:
        # First check session
        token_info = session.get('token_info')
        
        # If no token in session, check cache
        if not token_info:
            token_info = cache_handler.get_cached_token()
            if token_info:
                session['token_info'] = token_info

        if not token_info:
            return jsonify({"Authed": False})

        # Check if token needs refresh
        if sp_oauth.is_token_expired(token_info):
            try:
                token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
                session['token_info'] = token_info
                cache_handler.save_token_to_cache(token_info)
            except:
                return jsonify({"Authed": False})

        return jsonify({"Authed": True})
    except Exception as e:
        print(f"Error in authed endpoint: {e}")
        return jsonify({"Authed": False})