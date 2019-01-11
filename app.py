from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from flask_cors import CORS


# Configure application
app = Flask(__name__)
CORS(app) # enable cross-origin requests

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
	return render_template("stt_test.html")

@app.route("/post_stt", methods=["POST"])
def post_stt():
	request_json = request.get_json()
	print(request_json)
	return "Request received post_stt"

@app.route("/update_chore", methods=["POST"])
def update_chore():
	request_json = request.get_json()
	print(request_json)
	# if not request.args.get("username"):
	# 	return "error"
	# username = str(request.args.get("username"))

	# if not request.args.get("chore"):
	# 	return "error"
	# chore = str(request.args.get("chore"))


	# chores.child(chore).update({"completed": True})
	return "Request received"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
