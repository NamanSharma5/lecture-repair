from flask import Flask, request
from flask_cors import CORS

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
        # Process the file here
        # e.g., save it, run an image processing function, etc.
        print('File received and processed successfully!')
        return 'File processed', 200

#setup basic home page showing backend is running
@app.route('/')
def home():
    return 'Backend is running'

if __name__ == '__main__':
    app.run(debug=True, port=5000)