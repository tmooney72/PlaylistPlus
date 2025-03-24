from app import app, sp_oauth
from flask import request, redirect
from app.redisUser import redis_helper
import json

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        uid = request.args.get('state')
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Get new token with the authorization code
        token_info = sp_oauth.get_access_token(code)

        # If the token is a string, wrap it in a dictionary
        if isinstance(token_info, str):
            token_info = {"access_token": token_info}

        # Explicitly store the token in the session
        token_info_str = json.dumps(token_info)
        redis_helper.set_value(uid, token_info_str, expire_seconds = 1800)
        return redirect("https://playlist-plus.vercel.app/Home")
    except Exception as e:
        print(f"Error in callback: {e}")
        return "An error occurred during the callback process", 500