const mongoose = require('mongoose');

// Each element contains an object that is mapped to Date(Year) : Value.
// Here, it is called DataByDate (dbd).
// Not *required* to be set, but it should be populated from the data we are
// working with.
const dbdMapDefinition = {
    type: Map,
    of: {
        // Keys = dates in years

        value: {
            // Of type formatted string (could be a percentage, rounded float, etc).
            type: String,
            required: [true, 'Missing value']
        }
    }
}
// The definition of each element in the data
const elementMapDefinition = {
    type: Map,
    // Keys = data element label (e.g. "Coalition Meetings")

    dbd: dbdMapDefinition
}
// The schema definition
// It is assumed that the data being passed through to the DB was already
// parse checked somewhere else in the system.
// However, additional checks will be made here for missing information too
const dashbDataSchema = new mongoose.Schema({
    // All datasets needs a label (e.g. "Coalition Information")
    label: {
        type: String,
        required: [true, 'Missing data label'],
        unique: [true, 'There is already data underneath this label']
    },
    // All labeled data needs a data map beneath it.
    data: {
        type: Map,
        of: elementMapDefinition,
        required: [true, 'Missing data'],
    }
});

// Initialize a new dataset. You can have data or not there, but it must match the schema
dashbDataSchema.statics.initNewData = async function(dataName, data = {}) {
    return await this.create({label: dataName, data});
}

module.exports.DashbData = mongoose.model('DashbData', dashbDataSchema, 'dashbdata');

// REMOVE ME - TESTING FROM SOMEWHERE ELSE
// console.log(`Adding new data`);
// const dbSchema = require('../server/models/dashb-data-schema');
// const DashbSchema = dbSchema.DashbData;
// const testData = DashbSchema.initNewData("testData", {
//     "some-info": {
//         dbd: {
//             "2020": "100.0"
//         }
//     }
// });
// DashbSchema.insertElement("testData", "new-element");
// console.log(`Data added`);
