/**
 * @module Components/MyDropzone
 * A React component that provides a drag-and-drop area for uploading images.
 * It uses the `react-dropzone` library for handling file drops.
 */

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/Dropzone.css';

/**
 * MyDropzone component for handling image uploads via drag and drop.
 * @returns {React.Component} A dropzone component for uploading images.
 */
export const MyDropzone = () => {
  // State hook for storing uploaded files
  const [files, setFiles] = useState([]);

  // Hook for configuring the dropzone
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*', // Accept only image files
    onDrop: acceptedFiles => {
      // Set the files state with the accepted files and create object URLs for preview
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    noClick: true, // Disable opening file dialog on click
    noKeyboard: true // Disable keyboard interaction
  });

  // Map the files to image elements for rendering
  const images = files.map(file => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
      </div>
    </div>
  ));

  // Render the dropzone and the uploaded images
  return (
    <div className='dropzonecontainer'>
      <div {...getRootProps()} className='dropzonebox'>
        <div className='dropzone-input'>
          <input {...getInputProps()} />
          <h2 className='dropzone-heading'>Drag and Drop Excel Image Here</h2>
          <br />
          <div className='dropzone-or'>OR</div>
          <br />
          <button onClick={open}>Browse</button>
        </div>
        <div className='images'>
          <ul>{images}</ul>
        </div>
      </div>
    </div>
  );
};
