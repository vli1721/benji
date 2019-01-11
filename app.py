from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from flask_cors import CORS
import os

import pyrebase  # Python firebase API

import dialogflow_v2 as dialogflow  # Dialogflow Python SDK

# Configure application
app = Flask(__name__)
CORS(app) # enable cross-origin requests

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "benji-079497d6e906.json"

config = {
  "apiKey": "AIzaSyDa8Xluwh_e0fp-vVjyoZxDqekd7IcAoCk",
  "authDomain": "benji-42f8d.firebaseapp.com",
  "databaseURL": "https://benji-42f8d.firebaseio.com",
  "storageBucket": "benji-42f8d.appspot.com",
}


session_client = dialogflow.SessionsClient()
DIALOGFLOW_PROJECT_ID = "benji-42f8d"
DIALOGFLOW_LANGUAGE_CODE = "en"

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


def detect_intent_texts(project_id, session_id, texts, language_code):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""

    session = session_client.session_path(project_id, session_id)
    print('Session path: {}\n'.format(session))

    text_input = dialogflow.types.TextInput(
        text=texts, language_code=language_code)

    query_input = dialogflow.types.QueryInput(text=text_input)

    response = session_client.detect_intent(
        session=session, query_input=query_input)

    print('=' * 20)
    print(response)
    # print('Query text: {}'.format(response.query_result.query_text))
    # print('Detected intent: {} (confidence: {})\n'.format(
    #     response.query_result.intent.display_name,
    #     response.query_result.intent_detection_confidence))
    # print('Fulfillment text: {}\n'.format(
    #     response.query_result.fulfillment_text))


@app.route("/post_stt", methods=["POST"])
def post_stt():
	request_json = request.get_json()
	# print(request_json)
	texts = "My name is " + str(request_json["name"]) + ". " + str(request_json["query"])
	detect_intent_texts(DIALOGFLOW_PROJECT_ID, 1, texts, DIALOGFLOW_LANGUAGE_CODE)
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
