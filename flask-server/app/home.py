from app import app, sp_oauth
from flask import redirect, request, session, jsonify
from app.redisUser import redis_helper 

@app.route('/api')
def home():
    # Check if there's a valid cached token, if not, redirect to Spotify login
    uid = request.args.get('uid')
    if not uid:
        return jsonify({'error': 'No UID provided'}), 400
    auth_url = sp_oauth.get_authorize_url(state=uid)
    return redirect(auth_url)