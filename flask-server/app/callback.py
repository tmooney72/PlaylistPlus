from app import app, cache_handler, sp_oauth
from flask import request, redirect

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Retrieve cached token if it exists
        token_info = cache_handler.get_cached_token()

        # If no cached token, request a new token
        if not token_info:
            token_info = sp_oauth.get_access_token(code)

            # If the token is a string, wrap it in a dictionary
            if isinstance(token_info, str):
                token_info = {"access_token": token_info}

        # The token is automatically stored in Flask's session via the cache handler
        return redirect("http://localhost:5173/Home")
    except Exception as e:
        print(f"Error in callback: {e}")
        return "An error occurred during the callback process", 500