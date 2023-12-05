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
          waveColor: "#ad3737", // Blue color
          progressColor: "#2980b9", // Darker blue for progress
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
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1" }}>
      <div style={{ float: "left", marginRight: "20px", marginBottom: "20px" }}>
        <label style={{ color: "#3498db" }}>Upload Patient Photo:</label>
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
            style={{ width: "100px", height: "100px", marginTop: "10px" }}
          />
        )}
      </div>
      <div id="waveform" style={{ float: "left", clear: "both", marginBottom: "20px" }}></div>
      <button
        onClick={handlePlayPause}
        style={{
          width: "200px",
          float: "left",
          clear: "both",
          marginBottom: "20px",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Play/Pause
      </button>
      <input
        type="file"
        accept=".wav"
        onChange={handleFileChange}
        ref={inputRef}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
};

export default AudioGraph;
