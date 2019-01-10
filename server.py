from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session

# Configure application
app = Flask(__name__)

import pyrebase

config = {
  "apiKey": "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
  "authDomain": "benji-42f8d.firebaseapp.com",
  "databaseURL": "https://benji-42f8d.firebaseio.com",
  "storageBucket": "benji-42f8d.appspot.com",
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()
print(db.child("chores").get().val())


# @app.route("/", methods=["GET", "POST"])
# def index():
