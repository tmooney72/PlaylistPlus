from app import app, cache_handler, sp_oauth
from flask import redirect

@app.route('/api')
def home():
    # Check if there's a valid cached token, if not, redirect to Spotify login
    token_info = cache_handler.get_cached_token()
    if not token_info or not sp_oauth.validate_token(token_info):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return redirect("http://localhost:5173/Home")