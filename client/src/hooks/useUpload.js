export const useUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  // comment
  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setStatus(`${file.name}`);
  };

  const uploadSelectedFile = () => {
    // Implement upload functionality
    console.log("Uploading file:", selectedFile);
  };

  return { selectedFile, status, dragOverHandler, dropHandler, uploadSelectedFile };
};