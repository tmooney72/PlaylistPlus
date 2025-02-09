import os
import webbrowser
from flask import Flask, request, redirect, session, url_for, jsonify
import random, threading, webbrowser

from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

#instructions to make this work you need to open the spotipy folder and then execute the code, then open localhost:5000 
#on a web browser and log into your spotify account, then in the terminal enter the name of the playlist that you want to make clean

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

client_id = 'e38944e89ce74ba691862c01183972ed'
client_secret = '64176f6f86694b958ecab491209cbfd6'
redirect_uri = 'http://localhost:5000/api/callback'
scope = 'playlist-read-private, playlist-modify-private, playlist-modify-public, playlist-modify-public' 

cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    show_dialog=True)
sp = Spotify(auth_manager=sp_oauth)

@app.route('/api')
def home():
    # Check if there's a valid cached token, if not, redirect to Spotify login
    token_info = cache_handler.get_cached_token()
    if not token_info or not sp_oauth.validate_token(token_info):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    return redirect("http://localhost:5173/api/Playlists")

@app.route('/api/callback')
def callback():
    try:
        # Get the authorization code from the request
        code = request.args.get('code')
        if not code:
            return "Authorization code missing", 400

        # Retrieve cached token if it exists
        token_info = cache_handler.get_cached_token()

        # If no cached token, request a new token
        if not token_info:
            token_info = sp_oauth.get_access_token(code)

            # If the token is a string, wrap it in a dictionary
            if isinstance(token_info, str):
                token_info = {"access_token": token_info}

        # The token is automatically stored in Flask's session via the cache handler
        return redirect("http://localhost:5173/Playlists")
    except Exception as e:
        print(f"Error in callback: {e}")
        return "An error occurred during the callback process", 500
@app.route('/api/CleanPlaylist', methods=['POST'])
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    data = request.get_json()
    print(data['data'])
    playlists = sp.current_user_playlists()
    user_id = sp.current_user()
    playlist = data['data']
    songlist = []
    songidlist = []
    user_id = user_id['id']
    playlists_info = [(pl['name'], pl['external_urls']['spotify']) for pl in playlists['items']]
    playlists_html = '<br>'.join([f'{name}: {url}' for name, url in playlists_info])
    track_name = ""
    artist_name = ""
    playlistTitle = ""
    for title, url in playlists_info:
        if (title == str(playlist)):
            playlistTitle = title
            playlist_URI = url.split("/")[-1].split("?")[0]
            results = sp.playlist_tracks(playlist_URI)
            resultss = results['items']
            offset = 100
            counter = 0
            while (results['next']):
                try:
                    results = sp.playlist_tracks(playlist_URI, offset = offset)
                    results = sp.next(results)
                    resultss.extend(results['items'])
                    offset+=100
                except:
                    offset+=1
                    print()
            for track in range(len(resultss)):
                try:
                    name = resultss[track]["track"]["name"]
                    artist = resultss[track]["track"]["artists"][0]["name"]
                    artist_name += f'{artist}!@#'
                    track_name += f'{name}!@#'
                except:
                    print()
    names = track_name.split("!@#")
    artists = artist_name.split("!@#")
    for i in range(len(names)-1):
        track_id = sp.search(q= names[i] + ' ' + artists[i], limit = 7, type = 'track')
        dict_tracks = track_id['tracks']
        for x in dict_tracks['items']:
            if (not x['explicit']) and (x['name']== names[i]) and x['artists'][0]['name'] == artists[i]:
                if x['name'] not in songlist:
                    songlist.append(x['name'])
                    songidlist.append(x['id'])
    newPlaylistName = playlistTitle + " " + "clean"
    sp.user_playlist_create(user_id,newPlaylistName)
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']['spotify'], pl['id']) for pl in playlists['items']]
    for title, url, plid in playlists_info:
        if (title == playlistTitle + " clean"):
            playlist_URL = url
            if(len(songidlist) > 99):
                song = [""]
                for i in songidlist:
                    song[0] = i
                    sp.user_playlist_add_tracks(user_id, plid, song)
            else:
                sp.user_playlist_add_tracks(user_id, plid, songidlist)
        
    playlists_html = '<br>'.join([f'[{name}], ' for name in songlist])
    return {"Playlist": [playlist, songlist]}

@app.route('/api/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/api/Playlists')
def Playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)
    playlists = sp.current_user_playlists()
    user_id = sp.current_user()
    return {"Playlists": [(pl['name'], pl['external_urls']['spotify'], pl["images"][0]["url"]) for pl in playlists['items']]}
    



if __name__ == '__main__':
    # threading.Timer(1.25, lambda: webbrowser.open('http://127.0.0.1:5000/') ).start()
    app.run(debug=False)