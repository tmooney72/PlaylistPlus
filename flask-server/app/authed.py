from app import app, sp_oauth
from flask import jsonify, session

@app.route('/api/authed')
def authed():
    # Check both session and cache handler
    
    
    return {'Authed': True, 'token': 'no'}