from app import app, cache_handler, sp_oauth
from flask import request, redirect, session
import os

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code and state from the request
        code = request.args.get('code')
        state = request.args.get('state', 'playlists')  # Default to playlists if no state provided
        
        if not code:
            return "Authorization code missing", 400

        # Get new token
        token_info = sp_oauth.get_access_token(code)
        
        # Store token in both session and cache
        session['token_info'] = token_info
        cache_handler.save_cached_token(token_info)

        # Get frontend URL from environment variable or default to localhost
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
        
        # Redirect to the appropriate route based on state
        return redirect(f"{frontend_url}/{state}")
    except Exception as e:
        print(f"Error in callback: {e}")
        return "An error occurred during the callback process", 500