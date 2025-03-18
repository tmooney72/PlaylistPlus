# Use an official lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy only the requirements file first (to take advantage of Docker layer caching)
COPY flask-server/requirements.txt ./

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your Flask app code from the flask-server directory
COPY flask-server/ .

# Expose the port that Railway sets in the $PORT environment variable
EXPOSE $PORT

# Use Gunicorn to serve your Flask app. Adjust "app:app" if your module or app name differs.
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:$PORT", "app:app"]
