import * as XLSX from 'xlsx';


export function ExcelToJSON ({ file }) {
   //const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (file) => {
        let binaryString = file.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });

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
                //console.log(rowCopy);
                //console.log(row);
                
                // Remove the "" empty string key from the row object
                delete rowCopy[""];

                // Create an object for each row with the empty string "" as key and corresponding value
                const RowDataObject = {Name: row[""], Data: [rowCopy]};
                //rowObject["Data"] = rowCopy;
                //console.log(rowObject);
                formattedObject.push(RowDataObject);
            });


            // Store the formatted object for the current sheet
            const sheetData = {
                Category: sheetName, Data: [{SubCategory: formattedObject}]
            };

            // Remove empty keys from the formatted object (italicized cells in the Excel sheet)
            // and adds them back in as a value of "Key".
            for (const [key, value] of Object.entries(sheetData)) {
                for (const element of value) {
                    for (let [ikey, ivalue] of Object.entries(element)) {
                        if (Object.values(ivalue).length === 0) {
                            delete element[ikey];
                            element["Key"] = ikey;
                        }
                    }
                }
            }

            // Convert the object to a JSON string with indentation for readability
            const json_object = JSON.stringify(sheetData, null, 2);

            console.log(json_object);

            // Sent to server for processing
            return json_object;
            
        });
    };
    reader.readAsBinaryString(file);

};