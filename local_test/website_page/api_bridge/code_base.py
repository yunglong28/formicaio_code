<<<<<<< HEAD
=======
from flask import Flask, request, jsonify
import os
import os
import openai

# Initialize Flask app
app = Flask(__name__)

# Set your OpenAI API key from environment variable
openai.api_key = os.getenv("sk-D6EhmIt67gWqzA9F9qQBU1lzdppF2XCYahDyNPHzCBT3BlbkFJhRGWzifSS32gR7rZ1dXzhX2jGbt6hx3t7IHuqIXNEA")
<<<<<<< HEAD
# Set your OpenAI API key
openai.api_key = "your-openai-api-key"
=======
# Set your OpenAI API key from environment variable
openai.api_key = os.getenv("sk-D6EhmIt67gWqzA9F9qQBU1lzdppF2XCYahDyNPHzCBT3BlbkFJhRGWzifSS32gR7rZ1dXzhX2jGbt6hx3t7IHuqIXNEA")
>>>>>>> 5482672 (Updated Flask app to use environment variables and error handling)

# Route to handle the chatbot API request
@app.route("/ask", methods=["POST"])
def ask():
    try:
        user_input = request.json.get("message")
        if not user_input:
            return jsonify({"response": "No input provided"}), 400

        # Call the OpenAI API using the correct method for GPT-3.5-turbo
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_input}],
            max_tokens=150
        )

        return jsonify({"response": response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    try:
        user_input = request.json.get("message")
        if not user_input:
            return jsonify({"response": "No input provided"}), 400

        # Call the OpenAI API
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=user_input,
            max_tokens=150
        )

        return jsonify({"response": response.choices[0].text.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Use port provided by Heroku or default to 5000 for local development
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
>>>>>>> 5482672 (Updated Flask app to use environment variables and error handling)

<<<<<<< HEAD
    app.run(host="0.0.0.0", port=5000)
=======
    # Use port provided by Heroku or default to 5000 for local development
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
>>>>>>> 5482672 (Updated Flask app to use environment variables and error handling)
