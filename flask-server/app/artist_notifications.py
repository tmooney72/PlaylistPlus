from app import app, cache_handler, sp_oauth, sp
from flask import request, redirect

@app.route('/api/ArtistNotifications', methods=['POST'])
def ArtistNotifications():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    data = request.get_json()
    print(data['data'])
    stuff = []
    for artist in data['data']:
        songs = sp.artist_albums(artist_id=artist, album_type='single', limit=5)
        albums = sp.artist_albums(artist_id=artist, album_type='album', limit=5)
        print(songs)
        stuff.append(songs)
    return {"Results": 'blah'}