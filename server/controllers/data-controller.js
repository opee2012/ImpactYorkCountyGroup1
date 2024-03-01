// Controller for the upload page

const Validation = require('../utils/validation');
const dashboardSchema = require('../models/dashboard-schema');
const DashboardData = dashboardSchema.DashboardData;

// GET one data
// Retrieve a specific category
exports.getOneData = async function(req, res) {
    // Get parameters passed through request
    const { query } = req.body
    try {
        category = await DashboardData.findOne(query);
        res.status(200).json({ success: true, out: category });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}

// POST update data
// Create a new category
exports.addNewData = async function (req, res) {
    // Get parameters passed through request (pass the category data through the json attribute in the req's body):
    const { json } = req.body;
    try {
        const createdCategory = await DashboardData.initNewCategory(json);
        res.status(201).json({ success: true, dbmsg: createdCategory });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}

// PUT one data
// Try to update an existing category
exports.updateData = async function(req, res) {
    // Get parameters passed through request
    const { query, json } = req.body
    try {
        updatedCategory = await DashboardData.findOneAndUpdate(query, json);
        res.status(200).json({ success: true, dbmsg: updatedCategory });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}


