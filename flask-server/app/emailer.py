import smtplib
from email.message import EmailMessage

def send_email(recipient_email):
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
    sender_email = 'playlistplus91@gmail.com'
    sender_password='zxwc vbfj call soxp'
    port=465
    smtp_server='smtp.gmail.com'
    subject = "Test Email from python"
    recipient_email = recipient_email
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = 'playlistplus91@gmail.com'
    msg['To'] = recipient_email
    body = "This is a test email"
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
