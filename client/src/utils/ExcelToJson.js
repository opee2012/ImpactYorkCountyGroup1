import * as XLSX from 'xlsx';


export function ExcelToJSON ({ file }) {
    const reader = new FileReader();
    reader.onload = (file) => {
        let binaryString = file.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary', cellNF: true, cellStyles: true});

        // for each sheet
        workbook.SheetNames.forEach(function (sheetName) {
            //console.log(sheetName);

            const worksheet = workbook.Sheets[sheetName];

            // Replace the content of cell A1 with an empty string
            worksheet['A1'] = '';

            // cell.v - raw value (number, string, Date object, boolean) for specific cell
            // cell.w - formatted text (string)
            // cell.z - number format string associated with the cell 

            for (const cell in worksheet) {
                if (!worksheet.hasOwnProperty(cell)) continue;
                //console.log(worksheet[cell].w);
                let decode = XLSX.utils.decode_cell(cell);

                //may need to comma delimit the number after 
               /*if (worksheet[cell].v && typeof worksheet[cell].v === 'number') {
                    //worksheet[cell].z = '#,##0';
                    //worksheet[cell].z = "_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)";
                    console.log(worksheet[cell].w);
                }*/
                
                // Check if the cell contains a percentage value
                if (worksheet[cell].v && typeof worksheet[cell].v === 'number' && worksheet[cell].w && worksheet[cell].w.endsWith('%')) {
                
                    worksheet[cell].v = worksheet[cell].w; // Replace the numeric value with the formatted string version of itself
                    //console.log(ws[cell].v);
                }
                // checks to see if the cell has the currency number format
                if (worksheet[cell].v && typeof worksheet[cell].v === 'number' && worksheet[cell].w && (worksheet[cell].w.startsWith('$') || worksheet[cell].w.endsWith(')'))) {

                    worksheet[cell].v = worksheet[cell].w; // Replace the numeric value with the formatted string version
                }
                // Checks to see if the number format of the cell = the accounting js string, 2 decimals and $ sign
                if (worksheet[cell].z === '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)') {
                    worksheet[cell].v = worksheet[cell].w;
                }
            }

            const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            let groups = [];
            let currentGroup = [];

            for (let key in XL_row_object) {
                if (XL_row_object.hasOwnProperty(key)) {
                    const obj = XL_row_object[key];
                    const hasYears = Object.keys(obj).some(key => /^\d{4}$/.test(key));
                    if (!hasYears && currentGroup.length > 0) {
                        groups.push(currentGroup); // Push the current group if there's no years and it's not empty
                        currentGroup = []; // Reset the current group
                    }
                    currentGroup.push(obj); // Add the object to the current group
                }
            }

            if (currentGroup.length > 0) {
                groups.push(currentGroup); // Push the last group if it's not empty
            }

            let SheetObject = [];

            for (let group of groups) {
                    //Access each group here
                    //console.log("This is group number: ", groupNumber)
                    const formattedObject = [];
                    let SubCategoryObject = {};
                    let KeyCategory = null;
            for (let row of group) {
                        // Access each row here
                        //console.log(" This is row number: ", number, row);
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

                    //console.log(individualRowDataArray);
                    let RowDataObject = {};

                    //console.log(individualRowDataArray);
                    if (individualRowDataArray.length === 0) {
                        //let KeyCategoryObject = {};
                        KeyCategory = row[""];
                        //SheetObject.push(KeyCategory);
                        //SubCategoryObject = {SubCategory: formattedObject};
                    }
                    else {
                    // Create an object for each row with row[""] being the name of the row in column a 
                    RowDataObject = {Name: row[""], Data: individualRowDataArray};
                    //console.log(rowObject);
                    
                    formattedObject.push(RowDataObject);
                    //SubCategoryObject = {SubCategory: formattedObject};
                    }

                    if (KeyCategory) {
                        //console.log(KeyCategory);
                        SubCategoryObject = {Key: KeyCategory, SubCategory: formattedObject};
                    }
                    else {
                    //console.log(KeyCategory);
                    //console.log(formattedObject);
                    SubCategoryObject = {SubCategory: formattedObject}; 
                    }
                    
                 }
                SheetObject.push(SubCategoryObject);
             }

            // Store the formatted object for the current sheet {SubCategory: formattedObject}
            const sheetData = {
                Category: sheetName, Data: SheetObject
            };

            // Convert the object to a JSON string with indentation for readability
            const json_object = JSON.stringify(sheetData, null, 2);

            console.log(json_object);

            // Sent to server for processing
            return json_object;
            
        });
    };
    reader.readAsBinaryString(file);

};