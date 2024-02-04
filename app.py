#MUST RUN FROM THIS DIRECTORY (piano-dynamics) TO WORK
from flask import Flask, request, jsonify
from flask_cors import CORS
from dynamics_logic import send_image_to_gpt, encode_image

app = Flask(__name__)
CORS(app)

@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        dynamics = send_image_to_gpt(file)
        # dynamics is a string in 
        print(dynamics)
        return jsonify(data=dynamics), 200

#setup basic home page showing backend is running
@app.route('/')
def home():
    return 'Backend is running'

if __name__ == '__main__':
    app.run(debug=True, port=5000)