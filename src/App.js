import logo from './logo.svg';
import './App.css';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import React, { useEffect, useState } from 'react';
import { SplendidGrandPiano, Reverb } from "smplr";

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
  const context = new AudioContext();
  const piano = new SplendidGrandPiano(context);
  piano.output.addEffect("reverb", new Reverb(context), 0.2);
  const [img, setImg] = useState();
  const [uploaded, setUploaded] = useState();
  const [text, setText] = useState();
  const [pianoo, setPiano] = useState();

  const fetchImage = async (imageBlob) => {
    if (!imageBlob) {
      const res = await fetch('https://i.imgur.com/uZwdvnZ.png');
      imageBlob = await res.blob();
    }
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  const formatText = (array) => {
    var text = '';
    if (array)
    {
      JSON.parse(array).forEach(element => {
        text += 'Measure: ' + element.measure + ' Beat: ' + element.beat + ' Dynamic: ' + element.dynamic + ' | ';
      });
      setText(text);
    }
  };

  const valePiano = () => {
    if (uploaded){
    setPiano(
    <Piano
          className={"piano"}
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            piano.start({ note: midiNumber});
          }}
          stopNote={(midiNumber) => {
            piano.stop({note: midiNumber});
          }}
          width={1000}
          keyboardShortcuts={keyboardShortcuts}
        />
    );
    }
  }

  useEffect(() => {
    fetchImage(uploaded);
    formatText(text);
    valePiano();
  }, [uploaded]);

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload-image', {
      method: 'POST',
      body: formData,
      // Note: When using FormData, you don't need to set the Content-Type header. It will be set automatically with the proper boundary.
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setUploaded(file);
        setText(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const firstNote = MidiNumbers.fromNote('a0');
  const lastNote = MidiNumbers.fromNote('c8');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: MidiNumbers.fromNote('c3'),
    lastNote: MidiNumbers.fromNote('f5'),
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={img} alt="icons" />
        <p>{text}</p>
        {pianoo}
        <ImageUpload onImageUpload={handleImageUpload} />
      </header>
    </div>
  );
}

export default App;
