import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="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")  # Replace with your actual API key

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Formicaio Macte API!"

@app.route("/ask", methods=["POST"])
def ask():
    try:
        user_input = request.json.get("message")
        if not user_input:
            return jsonify({"error": "No message provided"}), 400
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        return jsonify({"response": response.choices[0].message.content.strip()})
    except Exception as e:
        app.logger.error(f"Error processing request: {str(e)}")
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5021, debug=True)