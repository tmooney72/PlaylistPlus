FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY flask-server/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy your Flask app code
COPY flask-server/ .

# Set a default port if $PORT is not defined at runtime
ENV PORT=5000

# Expose the port
EXPOSE $PORT

# Run the app using Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:$PORT", "app:app"]