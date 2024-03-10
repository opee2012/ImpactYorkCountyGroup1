// Controller for the upload page

const Validation = require('../utils/validation');
const dashboardSchema = require('../models/dashboard-schema');
const DashboardData = dashboardSchema.DashboardData;

// GET all data
// Retrieves all categories stored
exports.getAllData = async function (req, res) {
    // Query parameter is optional
    const { query } = req.body
    try {
        const categories = await DashboardData.find(query);
        res.status(200).json({ success: true, out: categories });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}

// GET one data
// Retrieve a specific category
exports.getOneData = async function(req, res) {
    // Get parameters passed through request
    const { query } = req.body
    try {
        const category = await DashboardData.findOne(query);
        res.status(200).json({ success: true, out: category });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}

// POST update data
// Create a new category
exports.addNewData = async function (req, res) {
    // Get parameters passed through request (pass the category data through the json attribute in the req's body):
    const json = req.body;
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
        const updatedCategory = await DashboardData.findOneAndUpdate(query, json);
        res.status(200).json({ success: true, dbmsg: updatedCategory });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}

// DELETE one data
// Delete a category
exports.deleteData = async function(req, res) {
    // Get parameters passed through request
    const { query } = req.body
    try {
        const deletedCategory = await DashboardData.findOneAndDelete(query);
        res.status(200).json({ success: true, dbmsg: deletedCategory });
    } catch (err) {
        res.status(400).json({ success: false,  message: err.message });
    }
}
