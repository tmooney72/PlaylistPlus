from app import app
from flask import session, redirect, url_for

@app.route('/api/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))