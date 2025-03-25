from app import app, sp_oauth, sp
from flask import request, jsonify
import json
from app.redisUser import redis_helper

@app.route('/api/reorder-playlists', methods=['post'])
def reorder_playlists():
    try:
        data = request.get_json()
        uid = data.get('uid')
        new_order = data.get('playlists')
        
        # Get user's token
        token_info_str = redis_helper.get_value(uid)
        token_info = json.loads(token_info_str)
        
        if not sp_oauth.validate_token(token_info):
            return jsonify({"error": "Invalid token"}), 401
            
        # Update playlist order in Spotify
        for index, playlist_id in enumerate(new_order):
            sp.playlist_reorder_items(playlist_id, range_start=index, range_length=1)
            
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500 