from app import app, cache_handler, sp_oauth, sp
from flask import request, redirect

@app.route('/api/SearchArtist', methods=['POST'])
def SearchArtist():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    data = request.get_json()
    results = sp.search(q=data['data'], limit=5, type='artist')
    return {"Results": results}