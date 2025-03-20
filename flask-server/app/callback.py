from app import app, cache_handler, sp_oauth
from flask import request, redirect, session
import os

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Get the token info
        token_info = sp_oauth.get_access_token(code)
        
        # Store token info in session
        session['token_info'] = token_info
        
        # Save token to cache handler
        cache_handler.save_token_to_cache(token_info)

        # Determine the frontend URL based on environment
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
        
        # Redirect back to the frontend playlists page
        return redirect(f"{frontend_url}/playlists")
    except Exception as e:
        print(f"Error in callback: {e}")
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:5173')
        return redirect(frontend_url)