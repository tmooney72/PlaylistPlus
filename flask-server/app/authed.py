from app import app, cache_handler, sp_oauth
from flask import jsonify

@app.route('/api/authed')
def authed():
    try:
        token_info = cache_handler.get_cached_token()
        if not token_info:
            return jsonify({"Authed": False})

        # Check if token needs refresh
        if sp_oauth.is_token_expired(token_info):
            try:
                token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
                cache_handler.save_token_to_cache(token_info)
            except:
                return jsonify({"Authed": False})

        return jsonify({"Authed": True})
    except Exception as e:
        print(f"Error in authed endpoint: {e}")
        return jsonify({"Authed": False})