from flask import Flask, render_template, url_for, request, jsonify
import requests

__author__ = 'KevinGee'

app = Flask(__name__)

CLIENT_ID = 'HFF2H1AU5GGMISF3AFJFQNVWV40RZQGRFSA2U3F5SFZLK5DR'
CLIENT_SECRET = 'F0CYPMQPI0ANCT13MORDWPJABFGJPLJQ1CC1JLKGVHMSLCZQ'
VERSION = '20140101'

@app.route('/')
def first_page():
    app.logger.debug('You arrived at ' + url_for('first_page'))
    return render_template('index.html')

@app.route('/search_venues', methods=['GET'])
def search_venues():
    app.logger.debug('You arrived at ' + url_for('search_venues'))

    query = request.args.get('query', '')
    app.logger.debug('Query is ' + query)
    near = request.args.get('near', '')
    app.logger.debug('Location is ' + near)

    url = 'https://api.foursquare.com/v2/venues/search?client_id=%s'\
            '&client_secret=%s&v=%s&query=%s&near=%s' %\
            (CLIENT_ID, CLIENT_SECRET, VERSION, query, near)
    r = requests.get(url)
    if r.ok:
        venues = r.json()['response']['venues']
        venues = [v for v in venues if 'url' in v]
    else:
        venues = []

    return jsonify(data=venues)

if __name__ == '__main__':
    app.debug = True
    app.run()