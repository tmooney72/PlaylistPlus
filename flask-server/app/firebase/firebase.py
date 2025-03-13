import firebase_admin
from firebase_admin import credentials, firestore

# Update the path to your service account key JSON file
cred = credentials.Certificate("/Users/tylermooney/Desktop/PlaylistPlus/flask-server/app/firebase/firebaseinfo.json")
firebase_admin.initialize_app(cred)
db = firestore.client()