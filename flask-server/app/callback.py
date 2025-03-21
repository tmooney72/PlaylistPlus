from app import app, cache_handler, sp_oauth
from flask import request, redirect, session

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Get new token with the authorization code
        token_info = sp_oauth.get_access_token(code)

        # If the token is a string, wrap it in a dictionary
        if isinstance(token_info, str):
            token_info = {"access_token": token_info}

        # Explicitly store the token in the session
        session['token_info'] = token_info
        session.modified = True  # Ensure the session is saved

        # The token is also stored via the cache handler
        return redirect("https://playlist-plus.vercel.app/Home")
    except Exception as e:
        print(f"Error in callback: {e}")
        return "An error occurred during the callback process", 500