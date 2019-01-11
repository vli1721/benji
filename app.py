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


# session_client = dialogflow.SessionsClient()
# DIALOGFLOW_PROJECT_ID = "benji-42f8d"
# DIALOGFLOW_LANGUAGE_CODE = "en"

firebase = pyrebase.initialize_app(config)

db = firebase.database()

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

	# print(response)

	username = str(response.query_result.parameters["name"]).lower()  # Convert username to lowercase
	transaction_type = str(response.query_result.intent.display_name)
	print(response.query_result.fulfillment_text)
	detect_confidence = float(response.query_result.intent_detection_confidence)

	# Only take action if inent detection confidence is over 80%
	if detect_confidence > 0.8:

		if transaction_type == "Deposit":
			curr_user = db.child("users").child(username).get()

			# Update current balance
			current_balance = float(curr_user.val()["balance"])
			transaction_amount = float(response.query_result.parameters["currency_amount"]["amount"])
			current_balance += transaction_amount
			db.child("users").child(username).update({ "balance": current_balance })
		elif transaction_type == "Withdraw":
			curr_user = db.child("users").child(username).get()

			# Update current balance
			current_balance = float(curr_user.val()["balance"])
			transaction_amount = float(response.query_result.parameters["currency_amount"]["amount"])
			if current_balance >= transaction_amount:
				current_balance -= transaction_amount
				db.child("users").child(username).update({ "balance": current_balance })
			else:
				print("Error: not enough money in account")
				return "Error: not enough money in account"
		elif transaction_type == "Chore_Complete":

			curr_chore = str(response.query_result.parameters["chore"])
			chores_list = db.child("users").child(username).child("chores").get().val()
			for key in chores_list:
				print(key)
				chore_desc = str(chores_list[key]["description"])
				print(chore_desc)
				if curr_chore in chore_desc:
					db.child("users").child(username).child(chore_desc).update({ "completed": True })
					print("completed " + chore_desc)
					break

			print("invalid chore")


		# 	# TODO

		return "Action completed"

	else:
		print("Intent detection confidence is too low (" + str(detect_confidence) + ")")
		return "Error: intent detection confidence is too low"

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



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
