import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

def send_email(recipient_email, artist_name, song_name):
    load_dotenv()
    sender_email = os.getenv("sender_email")
    sender_password = os.getenv("sender_password")
    """
    Sends an email using SMTP_SSL.

    Parameters:
    - subject: The email subject.
    - body: The plain text content of the email.
    - recipient_email: The recipient's email address.
    - sender_email: Your email address.
    - sender_password: Your email password or app-specific password.
    - smtp_server: The SMTP server address (default: 'smtp.gmail.com').
    - port: The port to use (default: 465 for SSL).
    
    Returns:
    - A tuple (success, message) where success is a boolean and message is a status string.
    """
    port=465
    smtp_server='smtp.gmail.com'
    subject = ("New Song Alert")
    recipient_email = recipient_email
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = 'playlistplus91@gmail.com'
    msg['To'] = recipient_email
    body = (f"New song by {artist_name} has been released! The song is called {song_name}.")
    msg.set_content(body)
    
    # Optionally, you can add an HTML version:
    # msg.add_alternative(f"<p>{body}</p>", subtype='html')
    
    try:
        with smtplib.SMTP_SSL(smtp_server, port) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)
        return True, "Email sent successfully!"
    except Exception as e:
        return False, f"Error sending email: {e}"
