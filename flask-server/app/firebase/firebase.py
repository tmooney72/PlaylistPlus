import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
import json

# Update the path to your service account key JSON file
load_dotenv()
firebase_info = os.environ.get('FIREBASE_INFO')
if not firebase_info:
    raise ValueError("FIREBASE_INFO environment variable is not set.")
firebase_info_dict = json.loads(firebase_info)
cred = credentials.Certificate(firebase_info_dict)
firebase_admin.initialize_app(cred)
db = firestore.client()