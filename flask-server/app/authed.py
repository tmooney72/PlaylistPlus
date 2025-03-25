from app import app, sp_oauth
from flask import jsonify, session, request, redirect
from app.redisUser import redis_helper
import json
@app.route('/api/authed', methods=['POST'])
def authed():
    data = request.get_json()
    uid = data['uid']
    token_info_str = redis_helper.get_value(uid)
    token_info = json.loads(token_info_str)
    if not sp_oauth.validate_token(token_info):
        return {'Authed': False}
    return {'Authed': True, 'token': 'no'}