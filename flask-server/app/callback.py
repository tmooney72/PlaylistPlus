from app import app, cache_handler, sp_oauth
from flask import request, redirect

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Get the token info
        token_info = sp_oauth.get_access_token(code)
        
        # The token is automatically stored in Flask's session via the cache handler
        return redirect("http://localhost:5173/playlists")
    except Exception as e:
        print(f"Error in callback: {e}")
        return redirect("http://localhost:5173")