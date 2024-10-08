from flask import Flask, request, jsonify
import openai

# Initialize Flask app
app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = "your-openai-api-key"

# Route to handle the chatbot API request
@app.route("/ask", methods=["POST"])
def ask():
    user_input = request.json.get("message")
    
    # Call the OpenAI API
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=user_input,
        max_tokens=150
    )
    
    # Return the generated text as a response
    return jsonify({"response": response.choices[0].text.strip()})

# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)