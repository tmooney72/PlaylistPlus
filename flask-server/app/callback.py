from app import app, cache_handler, sp_oauth
from flask import request, redirect, jsonify

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return jsonify({"error": "Authorization code missing"}), 400

        # Get the access token
        token_info = sp_oauth.get_access_token(code)
        
        # If the token is a string, wrap it in a dictionary
        if isinstance(token_info, str):
            token_info = {"access_token": token_info}
        
        # Store the token using the cache handler
        cache_handler.save_token_to_cache(token_info)

        # Redirect to the local frontend
        return redirect("http://localhost:5173/playlists")
    except Exception as e:
        print(f"Error in callback: {e}")
        return jsonify({"error": str(e)}), 500