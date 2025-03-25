from app import app
from flask import redirect, url_for, request
from app.redisUser import redis_helper

@app.route('/api/logout')
def logout():
    data = request.get_json()
    uid = data['uid']
    redis_helper.delete_value(uid)
    return {'success': True}