from flask_apscheduler import APScheduler
from app.firebase.firebase import db
from google.cloud.firestore_v1.base_query import FieldFilter
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import datetime
import time
from datetime import datetime, timezone, date
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
    docs = (
    db.collection("artists")
    .stream()
)
    for doc in docs:
        name = {}
        print(f"{doc.id} => {doc.to_dict()}")
        doc_ref = db.collection("artists").document(doc.id)
        songs = sp.artist_albums(artist_id=doc.id, album_type='single', limit=5)
        songs = songs['items']
        docinfo = doc.to_dict()
        if 'lastchecked' in docinfo:
            doc_ref.update({'lastchecked': time.time()})
        else:
            doc_ref.set({'lastchecked': time.time(),
                         'name': docinfo['name']})
            docinfo = doc.to_dict()
        date_time = datetime.fromtimestamp(docinfo['lastchecked'])
        date_time = date_time.date()
        print(date_time, docinfo['name'])
        for song in songs:
            release_date = song['release_date']
            print(str(date_time))
            if date_time == str(song['release_date']):
                notiDocs = (
                    db.collection("user")
                    .where(filter=FieldFilter('artists', 'array_contains', docinfo['name']))
                    .stream()
                )
                
                for notiDoc in notiDocs:
                    print('hello')
                    noti_ref = db.collection("user").document(notiDoc.id)
                    notiDoc = notiDoc.to_dict()
                    if 'notified' not in notiDoc or song['name'] not in notiDoc['notified']:
                        print('5')
                        send_email(notiDoc['email'], docinfo['name'], song['name'])
                        noti_ref.update({'notified': firestore.ArrayUnion([song['name']])})
                        print(notiDoc)
                        print("Email sent")
                print("True", release_date, song['name'])
            print(release_date, song['name'])
            name[song['name']] = song['release_date']
            
            
        # print(name)   


def init_scheduler(app):
    #send_email()
    scheduler.init_app(app)
    scheduler.start()
    scheduler.add_job(id='Scheduled Task', func=my_job, trigger='interval', seconds=5)



