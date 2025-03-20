FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY flask-server/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your Flask app code
COPY flask-server/ .

# Set a default port if $PORT isn't provided at runtime
ENV PORT=5000

# Expose the port (hard-coded, as $PORT might not expand here)
EXPOSE 5000

# Use shell expansion to set the port; if $PORT isn't provided, it defaults to 5000.
CMD ["sh", "-c", "gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} run:app"]