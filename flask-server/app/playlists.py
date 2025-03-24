from app import app, cache_handler, sp_oauth, sp
from flask import redirect, session, request
import json
from app.redisUser import redis_helper

@app.route('/api/Playlists', methods = ['post'])
def Playlists():
    uid = request.get_json()
    uid = uid['data']
    token_info_str = redis_helper.get_value(uid)
    token_info = json.loads(token_info_str)
    if not sp_oauth.validate_token(token_info):
        auth_url = sp_oauth.get_authorize_url(state='uid')
        return redirect(auth_url)
    
    
    # Try to refresh the token if it exists
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
    
    
    # Fetch the current user's playlists
    playlists = sp.current_user_playlists()
    playlists_data = []

    for pl in playlists['items']:
        playlist_name = pl['name']
        playlist_url = pl['external_urls']['spotify']
        # Get the first image if available
        playlist_image = pl['images'][0]['url'] if pl.get('images') and len(pl['images']) > 0 else None
        
        # Derive the playlist ID from the Spotify URL
        playlist_id = playlist_url.split("/")[-1].split("?")[0]
        
        # Fetch tracks for this playlist
        results = sp.playlist_tracks(playlist_id)
        all_tracks = results['items']
        while results['next']:
            try:
                results = sp.next(results)
                all_tracks.extend(results['items'])
            except Exception as e:
                print("Error fetching next batch of tracks:", e)
                break
        
        # Build the list of songs for this playlist
        songs = []
        for item in all_tracks:
            try:
                track = item["track"]
                track_name = track["name"]
                # Get the first album image if available
                track_image = track["album"]["images"][0]["url"] if track["album"].get("images") and len(track["album"]["images"]) > 0 else None
                songs.append({
                    "name": track_name,
                    "image": track_image
                })
            except Exception as e:
                print("Error processing track:", e)
        
        playlists_data.append({
            "name": playlist_name,
            "spotify_url": playlist_url,
            "image": playlist_image,
            "songs": songs
        })
    
    return {"Playlists": playlists_data}