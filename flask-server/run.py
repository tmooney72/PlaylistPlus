from app import app
import webbrowser

# Optionally, you can uncomment the following line to open your browser automatically:
# threading.Timer(1.25, lambda: webbrowser.open('http://127.0.0.1:5000/')).start()

if __name__ == '__main__':
    app.run(port=5200, debug=False)