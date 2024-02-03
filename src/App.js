import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React, {useState} from 'react';


// Create the ImageUpload component
const ImageUpload = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Function to handle file selection
  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      onImageUpload(file);
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
      {/* <label
        htmlFor="imageInput"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload Image
      </label> */}
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          className="mt-4 h-48 w-auto border-2 border-gray-300"
        />
      )}
    </div>
  );
};



function App() {
  const handleImageUpload = (file) => {
    console.log(file);
    // You can handle the file upload process here
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
