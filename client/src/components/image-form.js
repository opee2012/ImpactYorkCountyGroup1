import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
          <img src={file.preview} style={{width: '200px'}} alt="preview" />
        </div>
      </div>
    ));
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <aside>
          <h4>Files</h4>
          <ul>{images}</ul>
        </aside>
      </div>
    );
  }