from flask import Flask, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from flask_cors import CORS
import os
import json

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

# chore = "chore1"
# chores.child(chore).update({"completed": True})


@app.route("/", methods=["GET"])
def index():
	return render_template("index.html")


def detect_intent_texts(project_id, session_id, texts, language_code):
	"""Returns the result of detect intent with texts as inputs.

	Using the same `session_id` between requests allows continuation
	of the conversation."""

	session = session_client.session_path(project_id, session_id)
	# print('Session path: {}\n'.format(session))

	text_input = dialogflow.types.TextInput(
		text=texts, language_code=language_code)

	query_input = dialogflow.types.QueryInput(text=text_input)

	response = session_client.detect_intent(
		session=session, query_input=query_input)

	# print(response)

	username = str(response.query_result.parameters["name"]).lower()  # Convert username to lowercase
	transaction_type = str(response.query_result.intent.display_name)
	# print(response.query_result.fulfillment_text)
	detect_confidence = float(response.query_result.intent_detection_confidence)

	# Only take action if intent detection confidence is over 80% for deposits and withdrawals

	if transaction_type == "Deposit" and detect_confidence > 0.8:
		curr_user = db.child("users").child(username).get()

		# Update current balance
		current_balance = float(curr_user.val()["balance"])
		transaction_amount = float(response.query_result.parameters["currency_amount"]["amount"])
		current_balance += transaction_amount
		db.child("users").child(username).update({ "balance": current_balance })

		return { "status": 200, "message": "Deposit completed. You are on your way to your goal!" }

	elif transaction_type == "Withdraw" and detect_confidence > 0.8:
		curr_user = db.child("users").child(username).get()

		# Update current balance
		current_balance = float(curr_user.val()["balance"])
		transaction_amount = float(response.query_result.parameters["currency_amount"]["amount"])
		if current_balance >= transaction_amount:
			current_balance -= transaction_amount
			db.child("users").child(username).update({ "balance": current_balance })
		else:
			return {"status": 400, "message": "Benji is sorry. You do not have enough money to withdraw." }

		return { "status": 200, "message": "Withdrawal completed. Here is your money!" }


	elif transaction_type == "Chore_Complete" and detect_confidence > 0.4:
		curr_chore = str(response.query_result.parameters["chore"][0]).lower()
		curr_action = str(response.query_result.parameters["action"]).lower()
		# print(curr_chore)
		# print(curr_action)

		chores_list = db.child("users").child(username).child("chores").get()
		chore_found = False
		for chore in chores_list.each():
			chore_desc = str(chore.val()["description"])
			# print(chore_desc)
			# print(chore_desc.split())
			if curr_chore in chore_desc and (curr_action in chore_desc or chore_desc.split()[0] in curr_action):
				# Update chore completion
				db.child("users").child(username).child("chores").child(chore.key()).update({ "completed": True })

				# Update current balance
				current_balance = float(db.child("users").child(username).get().val()["balance"])
				chore_amount = float(chore.val()["reward"])
				current_balance += chore_amount
				db.child("users").child(username).update({ "balance": current_balance })

				# print("completed " + chore_desc)
				chore_found = True
				break

		if chore_found:
			return { "status": 200, "message": "Chore completed. Awesome job!" }
		else:
			return { "status": 400, "message": "I'm sorry. Are you sure you completed " + str(curr_action) + " " + str(curr_chore) + "?" }



	else:
		return {"status": 400, "message": "Benji is sorry he did not understand you."}

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
	ret_dict = detect_intent_texts(DIALOGFLOW_PROJECT_ID, 1, texts, DIALOGFLOW_LANGUAGE_CODE)
	return json.dumps(ret_dict)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
