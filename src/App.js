import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React, {useState} from 'react';


// Create the ImageUpload component
const ImageUpload = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  // Function to handle file selection
  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      onImageUpload(file);
      setFileUploaded(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <input
        className="hidden"
        id="imageInput"
        type="file"
        onChange={handleImageChange}
      />
      {fileUploaded ? (
        <span role="img" aria-label="tick">
          ✅
        </span>
      ) : (
        imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Preview"
            className="mt-4 h-48 w-auto border-2 border-gray-300"
          />
        )
      )}
    </div>
  );
};



function App() {
  const handleImageUpload = (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        body: formData,
        // Note: When using FormData, you don't need to set the Content-Type header. It will be set automatically with the proper boundary.
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ImageUpload onImageUpload={handleImageUpload} />
  
      </header>
    </div>
  );
}

export default App;
