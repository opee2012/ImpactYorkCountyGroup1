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

  const generateExcelFile = () => {
    const wb = XLSX.utils.book_new();

    DBdata.forEach((item) => {
        const ws = XLSX.utils.aoa_to_sheet([]);
        const categoryName = item.Category;
        XLSX.utils.book_append_sheet(wb, ws, categoryName);

        // Get all unique years across all subcategories in this category
        const allYears = new Set();
        item.Data.forEach((dataItem) => {
            dataItem.SubCategory.forEach((subCategoryItem) => {
                subCategoryItem.Data.forEach((data) => {
                    allYears.add(data.Year);
                });
            });
        });

        // Sort the years
        const sortedYears = Array.from(allYears).sort();

        // Write years in the first row starting from column A
        const yearsArray = ['']; // Start with an empty cell in the first column
        sortedYears.forEach((year) => {
            yearsArray.push(year);
        });
        XLSX.utils.sheet_add_aoa(ws, [yearsArray], { origin: `A1` });

        let rowIndex = 2; // Start from row 2 for subcategories

        item.Data.forEach((dataItem) => {
            let keyAdded = false; // Track if the key has been added for this data item
            dataItem.SubCategory.forEach((subCategoryItem) => {
                // Add key if it exists and hasn't been added yet
                if (dataItem.Key && !keyAdded) {
                    XLSX.utils.sheet_add_aoa(ws, [[dataItem.Key]], { origin: `A${rowIndex}` });
                    keyAdded = true;
                }

                // Add subcategory name to Excel sheet
                XLSX.utils.sheet_add_aoa(ws, [[subCategoryItem.Name]], { origin: `A${rowIndex + (keyAdded ? 1 : 0)}` });

                // Initialize an array to hold the values of each data item
                const valuesArray = Array.from({ length: sortedYears.length }, () => "");

                // Fill in values for each year
                subCategoryItem.Data.forEach((data) => {
                    const yearIndex = sortedYears.indexOf(data.Year);
                    if (yearIndex !== -1) {
                        // If the year exists in the sorted list, place the value in the corresponding column
                        valuesArray[yearIndex] = data.Value;
                    }
                });

                // Add values array to Excel sheet
                XLSX.utils.sheet_add_aoa(ws, [valuesArray], { origin: `B${rowIndex + (keyAdded ? 1 : 0)}` }); // Start from column B

                // Increment row index for the next subcategory
                rowIndex++;
            });

            // Add an empty row after each subcategory
            rowIndex++;
        });

        // Auto-size columns after adding data
        for (let i = 0; i < ws['!ref'].split(':')[1].charCodeAt(0) - 65; i++) {
            let maxContentLength = 0;
            XLSX.utils.sheet_to_json(ws, { header: 1 }).forEach((row) => {
                const cellValue = row[i];
                if (cellValue && cellValue.toString().length > maxContentLength) {
                    maxContentLength = cellValue.toString().length;
                }
            });

            // Add extra padding
            const columnWidth = maxContentLength + 2;

            // Set the column width
            ws['!cols'] = ws['!cols'] || [];
            ws['!cols'][i] = { wch: columnWidth };
        }
    });

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const wbBlob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(wbBlob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IYC Dashboard Data.xlsx');
    link.click();

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
          <button onClick={generateExcelFile}>Download Template</button>
        </div>
        <p id="statusbar">
          {selectedFile && !error ? <img src={xcelIcon} alt="file icon" /> : null}
          {error ? error : (status ? status : selectedFile)}
        </p>
      </form>
      <div className="submitnback">
        <button onClick={() => {
          if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
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
