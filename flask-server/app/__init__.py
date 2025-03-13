import os
from flask import Flask, session
from flask_cors import CORS
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Create Flask app and set configuration
app = Flask(__name__)
app.config['SCHEDULER_API_ENABLED'] = True  # Fixed syntax using square brackets
app.config['SECRET_KEY'] = os.urandom(64)



# Enable CORS
CORS(app)

# Spotify configuration (shared across modules)
client_id = 'e38944e89ce74ba691862c01183972ed'
client_secret = '64176f6f86694b958ecab491209cbfd6'
redirect_uri = 'http://localhost:5200/api/callback'
scope = 'playlist-read-private, playlist-modify-private, playlist-modify-public, playlist-modify-public' 

from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
from spotipy import Spotify

# Create the cache handler and Spotify objects
cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    show_dialog=True)
sp = Spotify(auth_manager=sp_oauth)

# Import the scheduler initialization function and initialize it
from app.scheduler import init_scheduler
init_scheduler(app)

# Import route modules so their routes register with the app
from app import authed
from app import home
from app import callback
from app import clean_playlist
from app import logout
from app import playlists
from app import artist_notifications
from app import search_artist



