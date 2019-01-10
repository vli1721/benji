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
users = db.child("users")
print(users.child("bobby").get().val())
chores = db.child("chores")

# chore = "chore1"
# chores.child(chore).update({"completed": True})


@app.route("/", methods=["GET"])
def index():
	return "Hello World"

@app.route("/update_chore", methods=["POST"])
def update_chore():
	print(request.get_json())
	# if not request.args.get("username"):
	# 	return "error"
	# username = str(request.args.get("username"))

	# if not request.args.get("chore"):
	# 	return "error"
	# chore = str(request.args.get("chore"))


	# chores.child(chore).update({"completed": True})
