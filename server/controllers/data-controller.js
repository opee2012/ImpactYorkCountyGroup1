// Controller for the upload page

const Validation = require('../utils/validation');
const dashboardSchema = require('../models/dashboard-schema');
const DashboardData = dashboardSchema.DashboardData;

// TODO: From upload request's body, initialize or update a dataset.

// TODO: Maybe should be a regular function instead?
// Insert a new element into a dataset through the schema.
// TODO: No longer matches the schema. Needs to be reworked.
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

exports.addNewData = async function (req, res) {
    // Get parameters passed through request
    const { json } = req.body;
    try {
        const dataSet = await DashboardData.initNewCategory(json);
        res.status(201).json({ success: true, dbmsg: dataSet });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}
