import React, { useState, useEffect } from "react";
import { useUpload } from "../hooks/useUpload";
import "../styles/Upload.css";
import xcelIcon from "../icons/excelIcon.png";
import { useDataHandle } from "../hooks/useData";
import * as XLSX from 'xlsx';

const UploadForm = () => {
  const { error, setError, uploadSelectedFile} = useUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const [DBdata, setData] = useState(null);
  const [tryRefresh, setTryRefresh] = useState(false);
  const { fetchData, isLoading, } = useDataHandle();

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data.out);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [tryRefresh]);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setStatus(`${file.name}`);
  };

  const filename = "IYC Dashboard Data.xlsx";

  const downloadFile = async (filename) => {
    const response = await fetch(`/downloadxlsx/${filename}`);
    const blob = await response.blob();
  
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
  }

  const generateExcelFile = () => {
    const wb = XLSX.utils.book_new();

// Initialize row index for each category
const rowIndex = {};

// Iterate over each category
DBdata.forEach((item) => {
  // Extract the category name
  const categoryName = item.Category;

  // Create a worksheet for each category with only the category name as the sheet name
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Add worksheet to the workbook with the category name as the sheet name
  XLSX.utils.book_append_sheet(wb, ws, categoryName);

  // Initialize row index for this category
  rowIndex[categoryName] = 2; // Start from row 1

  if (Array.isArray(item.Data) && item.Data.length > 0) {
    // Check if key exists in the data item
    const keyExists = item.Data.some((dataItem) => !!dataItem.Key);

    // Adjust row index if key exists
    if (keyExists) {
      rowIndex[categoryName] = 2; // Start from row 2 for categories with a key
    }

    // Iterate over each data item in the category
    item.Data.forEach((dataItem) => {
      // Add key to Excel sheet at the appropriate row if it exists
      if (dataItem.Key) {
        XLSX.utils.sheet_add_aoa(ws, [[dataItem.Key]], {origin: `A${rowIndex[categoryName]}`});
        
        // Increment row index for the next key
        rowIndex[categoryName]++;
      }

const yearsArray = [];

// Iterate over each subcategory in the data item
dataItem.SubCategory.forEach((subCategoryItem) => {
    //console.log(subCategoryItem); // Log subcategory name

    // Add subcategory name to Excel sheet at the appropriate row
    XLSX.utils.sheet_add_aoa(ws, [[subCategoryItem.Name]], { origin: `A${rowIndex[categoryName]}` });

    // Initialize an array to hold the values of each data item
    const valuesArray = [];

    // Iterate over each data item in the subcategory
    subCategoryItem.Data.forEach((data) => {
        // Add data value to the array
        valuesArray.push(data.Value);

        // Add year to the years array if it's not already added
        if (!yearsArray.includes(data.Year)) {
            yearsArray.push(data.Year);
        }
    });

    // Add values array to Excel sheet at the appropriate row and column
    XLSX.utils.sheet_add_aoa(ws, [valuesArray], { origin: `B${rowIndex[categoryName]}` });

    // Increment row index for the next subcategory
    rowIndex[categoryName]++;
});

// Add years array to Excel sheet at the first row starting from column 2
XLSX.utils.sheet_add_aoa(ws, [yearsArray], { origin: `B1` });
    });
  } else {
    // If there's no data array, still increment rowIndex to leave room for header
    rowIndex[categoryName]++;
  }
});
    // Write workbook to a file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const wbBlob = new Blob([wbout], { type: 'application/octet-stream' });

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(wbBlob);

    // Create an anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IYC Dashboard Data.xlsx');

    // Trigger download
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
};

  return (
    <div className="uploadformnonflex">
      <form onDrop={dropHandler} onDragOver={dragOverHandler}>
        <div className="dragndrop">
          <h2>Drag and Drop Excel File Here</h2>
          <br />
          <div>OR</div>
        </div>
        <label htmlFor="fileuploadinput"></label> <br />
        <input
          id="fileuploadinput"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
              setError(null);
              setStatus(`${e.target.files[0].name}`);
            }
          }}
        />
        <div className="uploadbuttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              setError(null);
              document.getElementById("fileuploadinput").click();
            }}
          >
            Browse Files
          </button> <br />
          {/*  remember to take the type=button out after testing*/}
          <button type= "button" onClick={generateExcelFile}>Download Template</button>
        </div>
        <p id="statusbar">
          {selectedFile && !error ? <img src={xcelIcon} alt="file icon" /> : null}
          {error ? error : (status ? status : selectedFile)}
        </p>
      </form>
      <div className="submitnback">
        <button onClick={() => {
          if (selectedFile) {
            uploadSelectedFile(selectedFile)
            .then(() => {
              setTimeout(() => {
                window.location.assign('/')
              }, 50);
            })
            .catch((error) => {
              console.error(error);
              setError("Upload failed");
            });
          } else {
            alert("Please select an Excel file to upload.");
          }
        }}>Submit</button> <br />
        <button onClick={() => window.location.assign('/')}>Dashboard</button>
        </div>
    </div>
  );
};

export default UploadForm;
