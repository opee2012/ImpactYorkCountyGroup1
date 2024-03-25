import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/Dropzone.css';

export const MyDropzone = () => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
  
    const images = files.map(file => (
      <div key={file.name}>
        <div>
          <img src={file.preview} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="preview" />
        </div>
      </div>
    ));
  
    return (
      <div className='dropzonecontainer'>
        <div {...getRootProps()} className='dropzonebox'>
          <div className='dropzone-input'>
            <input {...getInputProps()} />
            <h2 className='dropzone-heading'>Drag and Drop Excel Image Here</h2>
            <br />
            <div className='dropzone-or'>OR</div>
            <br />
            <button>Browse</button>
          </div>
          <div className='images'>
            <ul>{images}</ul>
          </div>
        </div>
      </div>
    );
  }