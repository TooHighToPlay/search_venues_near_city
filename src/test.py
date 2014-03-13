from flask import Flask, render_template, url_for, request, jsonify

from SPARQLWrapper import SPARQLWrapper, RDF, JSON
import requests
import json

__author__ = 'KevinGee'

app = Flask(__name__)

CLIENT_ID = 'HFF2H1AU5GGMISF3AFJFQNVWV40RZQGRFSA2U3F5SFZLK5DR'
CLIENT_SECRET = 'F0CYPMQPI0ANCT13MORDWPJABFGJPLJQ1CC1JLKGVHMSLCZQ'
VERSION = '20140101'

query = 'Melkweg'
near = 'Amsterdam'

url = 'https://api.foursquare.com/v2/venues/search?client_id=%s'\
        '&client_secret=%s&v=%s&query=%s&near=%s' %\
        (CLIENT_ID, CLIENT_SECRET, VERSION, query, near)
r = requests.get(url)
if r.ok:
    # filter out the venues with no URL
    venues = r.json()['response']['venues']
    venues = [v for v in venues if 'url' in v]
    print json.dumps(r.json())
    #print "/n"
    #print venues