from flask_apscheduler import APScheduler

# Create the scheduler instance
scheduler = APScheduler()

def my_job():
    print('Hello World')

def init_scheduler(app):
    # Initialize the scheduler with the Flask app
    scheduler.init_app(app)
    scheduler.start()
    
    # Add your job(s)
    scheduler.add_job(id='Scheduled Task', func=my_job, trigger='interval', seconds=5)