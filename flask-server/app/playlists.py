from app import app, cache_handler, sp_oauth, sp
from flask import jsonify, session
from spotipy import Spotify

@app.route('/api/Playlists')
def Playlists():
    try:
        # Get token from session
        token_info = session.get('token_info')
        if not token_info:
            return jsonify({"error": "Not authenticated"}), 401

        # Check if token needs refresh
        if sp_oauth.is_token_expired(token_info):
            try:
                token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
                session['token_info'] = token_info
                cache_handler.save_token_to_cache(token_info)
            except:
                return jsonify({"error": "Token refresh failed"}), 401

        # Create a new Spotify client with the current token
        current_sp = Spotify(auth=token_info['access_token'])
    
        # Fetch the current user's playlists
        playlists = current_sp.current_user_playlists()
        playlists_data = []

        for pl in playlists['items']:
            playlist_name = pl['name']
            playlist_url = pl['external_urls']['spotify']
            # Get the first image if available
            playlist_image = pl['images'][0]['url'] if pl.get('images') and len(pl['images']) > 0 else None
            
            # Derive the playlist ID from the Spotify URL
            playlist_id = playlist_url.split("/")[-1].split("?")[0]
            
            # Fetch tracks for this playlist
            results = current_sp.playlist_tracks(playlist_id)
            all_tracks = results['items']
            while results['next']:
                try:
                    results = current_sp.next(results)
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
    except Exception as e:
        print(f"Error in Playlists endpoint: {e}")
        return jsonify({"error": str(e)}), 500