from app import app, sp_oauth, sp
from flask import request, redirect

@app.route('/api/ArtistNotifications', methods=['POST'])
def ArtistNotifications():
    data = request.get_json()
    print(data)
    print(data['data'])
    stuff = []
    for artist in data['data']:
        songs = sp.artist_albums(artist_id=artist, album_type='single', limit=5)
        albums = sp.artist_albums(artist_id=artist, album_type='album', limit=5)
        print(artist)
        print(songs)
        stuff.append(songs)
    return {"Results": stuff}