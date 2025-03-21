from app import app, cache_handler, sp_oauth
from flask import redirect, request, session, jsonify
from app.redisUser import redis_helper 

@app.route('/api')
def home():
    # Check if there's a valid cached token, if not, redirect to Spotify login
    uid = request.args.get('uid')
    if not uid:
        return jsonify({'error': 'No UID provided'}), 400
    token_info = cache_handler.get_cached_token()
    if not token_info or not sp_oauth.validate_token(token_info):
        auth_url = sp_oauth.get_authorize_url(state=uid)
        return redirect(auth_url)