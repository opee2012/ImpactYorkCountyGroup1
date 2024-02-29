// Controller for the upload page

const Validation = require('../utils/validation');
const dashbSchema = require('../models/dashb-data-schema');
const DashboardData = dashbSchema.DashbData;

// TODO: From upload request's body, initialize or update a dataset.

exports.uploadData = async function (req, res) {
    const { json } = req.params;
    try {
        // Is the json object going through?
        dbmsg = json;

        // Status 200 with Mongo interaction result
        res.status(200).json({ success: true, dbmsg });
    } catch(err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

// TODO: Maybe should be a regular function instead?
// Insert a new element into a dataset through the schema.
exports.insertElement = async function (req, res) {
    // Get parameters passed through request
    const { target, name } = req.params;
    try {
        const dataSet = await DashboardData.findOne({ label: target });
        const map = dataSet.data;
        if (map.get(name) == undefined) {
            const toInsert = "data." + name;
            const updateRes = await DashboardData.updateOne({label: target}, 
                { "$set": { 
                    [toInsert]: elementMapDefinition
                } });
            res.status(200).json({ success: true, dbmsg: updateRes });
        }
        else {
            throw new Error('Element already exists');
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}
