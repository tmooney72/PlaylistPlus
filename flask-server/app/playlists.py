from app import app, cache_handler, sp_oauth, sp
from flask import redirect

@app.route('/api/Playlists')
def Playlists():
    # Validate the token
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url) #changed
    
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