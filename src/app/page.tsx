"use client";
import React, { useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioGraph = () => {
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [patientPhoto, setPatientPhoto] = useState(null);
  const inputRef = useRef(null);
  const photoInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const audioData = e.target.result;

        if (waveSurfer) {
          waveSurfer.destroy();
        }

        const wavesurferInstance = WaveSurfer.create({
          container: "#waveform",
          waveColor: "violet",
          progressColor: "purple",
          height: 'auto',
          width: 500,
          backend: 'MediaElement',
        });

        wavesurferInstance.loadBlob(new Blob([audioData]));
        setWaveSurfer(wavesurferInstance);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const photoData = e.target.result;
        setPatientPhoto(photoData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".wav"
        onChange={handleFileChange}
        ref={inputRef}
      />
      <div id="waveform"></div>
      <button onClick={handlePlayPause}>Play/Pause</button>

      <div>
        <label>Upload Patient Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          ref={photoInputRef}
        />
        {patientPhoto && (
          <img
            src={patientPhoto}
            alt="Patient"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>
    </div>
  );
};

export default AudioGraph;
