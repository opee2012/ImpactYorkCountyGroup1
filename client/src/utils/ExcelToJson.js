import React from 'react';
import * as XLSX from 'xlsx';


export function ExcelToJSON ({ file }) {
   //const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (file) => {
        let binaryString = file.target.result;
        const wb = XLSX.read(binaryString, { type: 'binary' });

        wb.SheetNames.forEach(function (sheetName) {
            //console.log(sheetName);

            const ws = wb.Sheets[sheetName];

            // Replace the content of cell A1 with an empty string
            ws['A1'] = '';

            const XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            // Initialize the formatted object for the current sheet
            const formattedObject = [];

            // Process each row object
            XL_row_object.forEach(row => {
                // Copy the row object
                const rowCopy = Object.assign({}, row);
                
                // Remove the "__EMPTY" key from the row object
                delete rowCopy[""];

                // Create an object for each row with "__EMPTY" as key and corresponding value
                const rowObject = {};
                rowObject[row[""]] = rowCopy;
                formattedObject.push(rowObject);
            });

            // Store the formatted object for the current sheet
            const sheetData = {
                [sheetName]: formattedObject
            };

            // Convert the object to a JSON string with indentation for readability
            const json_object = JSON.stringify(sheetData, null, 2);

            // function to add the data to the database

            console.log(json_object);
            
        });
    };
    //console.log("This executes");
    reader.readAsBinaryString(file);

};