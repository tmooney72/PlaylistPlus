FROM python:3.9-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of your Flask app code
COPY . .

# Set environment variables
ENV PORT=5000
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose the port
EXPOSE 5000

# Add a health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT:-5000}/ || exit 1

# Use shell expansion to set the port and add logging
CMD ["sh", "-c", "python -c 'import app; print(\"App imported successfully\")' && gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} --log-level debug run:app"] 