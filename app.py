from flask import Flask, render_template, request, json, jsonify
from flask_cors import CORS
from bedrock import chat_with_bedrock

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/')
def home():
    message = "Welcome to the Anthropic Chat Interface!"
    return render_template('index.html', message=message)

@app.route('/chat', methods=['POST'])
def chat():
    # Handle OPTIONS request explicitly (Flask-CORS will handle this automatically,
    # but we're being explicit for clarity)
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        return response
    
    # Handle POST request
    messages = request.json.get('messages')  # pyright: ignore
    return jsonify({'messages': chat_with_bedrock(messages)})
