"use client";
import React, { useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioGraph = () => {
  const [waveSurfer, setWaveSurfer] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const audioData = e.target.result;
        console.log(new Blob([audioData]));
        if (waveSurfer) {
          waveSurfer.destroy();
        }

        const wavesurferInstance = WaveSurfer.create({
          container: "#waveform",
          waveColor: "violet",
          progressColor: "purple",
          height: 'auto',
          width: 500,

        });

        wavesurferInstance.loadBlob(new Blob([audioData]));
        setWaveSurfer(wavesurferInstance);
      };

      reader.readAsArrayBuffer(file);
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
    </div>
  );
};

export default AudioGraph;
