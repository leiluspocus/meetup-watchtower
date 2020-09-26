from flask import Flask, Response
import requests
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    r = requests.get('https://github.com/timeline.json')
    print(r)
    return Response("<h1>Flask</h1><p>You visited: /%s</p>" % (path), mimetype="text/html")