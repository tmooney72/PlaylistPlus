import os
from flask import Flask, session
from flask_cors import CORS
import warnings
import redis
from datetime import timedelta
from flask_session import Session
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Create Flask app and set configuration
app = Flask(__name__)
app.config['SCHEDULER_API_ENABLED'] = True
app.config['SECRET_KEY'] = os.urandom(64)

# Redis session configuration
app.config['SESSION_TYPE'] = 'redis'
redis_url = os.getenv('REDIS_URL')
if not redis_url:
    raise ValueError("REDIS_URL environment variable is not set")
app.config['SESSION_REDIS'] = redis.from_url(redis_url)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
Session(app)  # Initialize the session interface

print('this is running') #this works

# Enable CORS
CORS(app)#this is 

# Spotify configuration (shared across modules)
client_id = 'e38944e89ce74ba691862c01183972ed'
client_secret = '64176f6f86694b958ecab491209cbfd6'
redirect_uri = 'https://desirable-emotion-production.up.railway.app/api/callback'
scope = 'playlist-read-private, playlist-modify-private, playlist-modify-public, playlist-modify-public' 

from spotipy.oauth2 import SpotifyOAuth #redis is working
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


