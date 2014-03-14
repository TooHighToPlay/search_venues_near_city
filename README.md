## App

Intelligent Web Application 3rd assignment

## Description

Searches for venues in a given or near location.

## How to run

# Demo

Demo is available on Heroku: http://iwa-3-assignment.herokuapp.com/

# Run locally

Prerequisites (must have):

	* Python

	* virtualenv

For instruction of how to install these please follow the link (http://docs.python-guide.org/en/latest/starting/install/osx/)

Perform the following steps in terminal:

	[1] git clone git@github.com:TooHighToPlay/search_venues_near_city.git

	[2] cd search_venues_near_city

	[3] virtualenv venv

	[4] source venv/bin/activate

	[5] pip install -r requirements-pip

	[6] gunicorn -w 4 myapp:app

## Uses

* Foursquare API to search for venues near location

* Google Maps API v3 to visualize results

* Python (Flask) + JQuery + HandleBars