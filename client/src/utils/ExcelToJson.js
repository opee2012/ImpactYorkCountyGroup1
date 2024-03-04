import * as XLSX from 'xlsx';


export function ExcelToJSON ({ file }) {
    const reader = new FileReader();
    reader.onload = (file) => {
        let binaryString = file.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });

        // for each sheet
        workbook.SheetNames.forEach(function (sheetName) {
            //console.log(sheetName);

            const worksheet = workbook.Sheets[sheetName];

            // Replace the content of cell A1 with an empty string
            worksheet['A1'] = '';

            const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            // Initialize the formatted object for the current sheet
            const formattedObject = [];

            // Process each row object
            XL_row_object.forEach(row => {
                //const formattedObject = ["Sub-Category: " , []];

                // Copy the row object
                const rowCopy = Object.assign({}, row);
                
                // Remove the "" empty string key from the row object
                // The empty string comes from cell A1, maps to the string or sub-cat in column a 
                delete rowCopy[""];

                // Array for the data in each row
                const individualRowDataArray = [];

                // For loop that goes through the data in the row copy object, pulls the key and value and formats to be put into the individual data object
                for (let key in rowCopy) {
                    if (rowCopy.hasOwnProperty(key)) {
                        //console.log("Key:", key, "Value:", rowCopy[key]);
                        const individualDataObject = {
                            "Year": key,
                            "Value": rowCopy[key]
                        };
                        individualRowDataArray.push(individualDataObject)
                    }
                }

                // Create an object for each row with row[""] being the name of the row in column a 
                const RowDataObject = {Name: row[""], Data: individualRowDataArray};
                //console.log(rowObject);
                formattedObject.push(RowDataObject);
            });


            // Store the formatted object for the current sheet
            const sheetData = {
                Category: sheetName, Data: [{SubCategory: formattedObject}]
            };

            // Remove empty keys from the formatted object (italicized cells in the Excel sheet)
            // and adds them back in as a value of "Key".
            /*for (const [key, value] of Object.entries(sheetData)) {
                for (const element of value) {
                    for (let [ikey, ivalue] of Object.entries(element)) {
                        if (Object.values(ivalue).length === 0) {
                            delete element[ikey];
                            element["Key"] = ikey;
                        }
                    }
                }
            }*/

            // Convert the object to a JSON string with indentation for readability
            const json_object = JSON.stringify(sheetData, null, 2);

            console.log(json_object);

            // Sent to server for processing
            return json_object;
            
        });
    };
    reader.readAsBinaryString(file);

};