from app import app, sp_oauth, sp
from flask import request, redirect
from app.redisUser import redis_helper
import json
@app.route('/api/CleanPlaylist', methods=['POST'])
def get_playlists():
   
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
                    results = sp.playlist_tracks(playlist_URI, offset=offset)
                    results = sp.next(results)
                    resultss.extend(results['items'])
                    offset += 100
                except:
                    offset += 1
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
        track_id = sp.search(q=names[i] + ' ' + artists[i], limit=7, type='track')
        dict_tracks = track_id['tracks']
        for x in dict_tracks['items']:
            if (not x['explicit']) and (x['name'] == names[i]) and x['artists'][0]['name'] == artists[i]:
                if x['name'] not in songlist:
                    songlist.append(x['name'])
                    songidlist.append(x['id'])
    newPlaylistName = playlistTitle + " " + "clean"
    sp.user_playlist_create(user_id, newPlaylistName)
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']['spotify'], pl['id']) for pl in playlists['items']]
    for title, url, plid in playlists_info:
        if (title == playlistTitle + " clean"):
            playlist_URL = url
            if (len(songidlist) > 99):
                song = [""]
                for i in songidlist:
                    song[0] = i
                    sp.user_playlist_add_tracks(user_id, plid, song)
            else:
                sp.user_playlist_add_tracks(user_id, plid, songidlist)
        
    playlists_html = '<br>'.join([f'[{name}], ' for name in songlist])
    return {"Playlist": [playlist, songlist]}