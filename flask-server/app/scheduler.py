from flask_apscheduler import APScheduler
from app.firebase.firebase import db
from google.cloud.firestore_v1.base_query import FieldFilter
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import datetime
import time
from datetime import datetime, timezone, date, timedelta
from firebase_admin import firestore
from app.emailer import send_email

client_id = 'e38944e89ce74ba691862c01183972ed'
client_secret = '64176f6f86694b958ecab491209cbfd6'
client_credentials_manager = SpotifyClientCredentials(client_id=client_id,client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Now you can call public endpoints without user authorization

# Now you can use db to interact with Firestore

# Create the scheduler instance
scheduler = APScheduler()


def my_job():
    try:
        print("Starting artist check...")
        docs = (
            db.collection("artists")
            .stream()
        )
        
        for doc in docs:
            try:
                docinfo = doc.to_dict()
                
                # Only check artists that haven't been checked in the last 12 hours
                if 'lastchecked' in docinfo:
                    last_check = datetime.fromtimestamp(docinfo['lastchecked'])
                    if datetime.now() - last_check < timedelta(minutes=15):
                        print(f"Skipping {docinfo['name']} - checked recently")
                        continue
                
                print(f"Checking {docinfo['name']}...")
                doc_ref = db.collection("artists").document(doc.id)
                
                # Add delay between API calls
                time.sleep(1)
                
                try:
                    songs = sp.artist_albums(artist_id=doc.id, album_type='single', limit=5)
                    songs = songs['items']
                    
                    # Update last checked time immediately after successful API call
                    doc_ref.update({'lastchecked': time.time()})
                    
                    date_time = datetime.now().date()
                    
                    for song in songs:
                        if date_time == datetime.strptime(song['release_date'], '%Y-%m-%d').date():
                            print(f"New release found: {song['name']} by {docinfo['name']}")
                            
                            # Find users following this artist
                            notiDocs = (
                                db.collection("user")
                                .where(filter=FieldFilter('artists', 'array_contains', docinfo['name']))
                                .stream()
                            )
                            
                            for notiDoc in notiDocs:
                                noti_ref = db.collection("user").document(notiDoc.id)
                                notiDoc = notiDoc.to_dict()
                                if 'notified' not in notiDoc or song['name'] not in notiDoc['notified']:
                                    send_email(notiDoc['email'], docinfo['name'], song['name'])
                                    noti_ref.update({'notified': firestore.ArrayUnion([song['name']])})
                    
                except Exception as e:
                    print(f"Error checking artist {docinfo['name']}: {str(e)}")
                    continue
                    
            except Exception as e:
                print(f"Error processing artist document: {str(e)}")
                continue
                
        print("Completed artist check")
        
    except Exception as e:
        print(f"Critical error in job: {str(e)}")


def init_scheduler(app):
    scheduler.init_app(app)
    scheduler.start()
    # Check every 6 hours, only allow one instance
    scheduler.add_job(id='Check New Releases', func=my_job, trigger='interval', 
                     minutes = 10, max_instances=1, misfire_grace_time=None)
    print("Scheduler started - will check for new releases every 6 hours")
    