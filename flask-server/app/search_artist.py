from app import app, sp_oauth, sp
from flask import request, redirect
from app.redisUser import redis_helper
import json
@app.route('/api/SearchArtist', methods=['POST'])
def SearchArtist():
    data = request.get_json()
    uid = data['uid']
    token_info_str = redis_helper.get_value(uid)
    token_info = json.loads(token_info_str)
    if not sp_oauth.validate_token(token_info):
        auth_url = sp_oauth.get_authorize_url(state='uid')
        return redirect(auth_url)
    if token_info:
        try:
            if sp_oauth.is_token_expired(token_info):
                token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
                print(token_info)
                # Update both storage locations
                redis_helper.set_value(uid, token_info)
        except Exception as e:
            print(f"Error refreshing token: {e}")
            token_info = None
    results = sp.search(q=data['data'], limit=5, type='artist')
    return {"Results": results}