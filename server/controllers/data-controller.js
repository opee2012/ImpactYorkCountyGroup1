/**
 * @module DataController
 * @description Controller for handling data management operations.
 */

/**
 * Controller for the upload page.
 */
const { ExcelToJSON } = require("../utils/ExcelToJson");
const Validation = require('../utils/validation');
const dashboardSchema = require('../models/dashboard-schema');
const DashboardData = dashboardSchema.DashboardData;
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads/xlsx');

/**
 * Retrieves all categories stored in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAllData = async function (req, res) {
    const { query } = req.body; // Query parameter is optional.
    try {
        const categories = await DashboardData.find(query);
        res.status(200).json({ success: true, out: categories });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

/**
 * Retrieve a specific category from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getOneData = async function (req, res) {
    const { query } = req.body; // Get parameters passed through request.
    try {
        const category = await DashboardData.findOne(query);
        res.status(200).json({ success: true, out: category });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

/**
 * Create a new category or update an existing one in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.addNewData = async function (req, res) {
    try {
        const json_files = await ExcelToJSON(uploadDir + '/IYC Dashboard Data.xlsx');

        for (let i in json_files) {
            let json = json_files[i];
            await DashboardData.findOneAndUpdate({ Category: json.Category }, json, { upsert: true, new: true });
        }

        res.status(200).json({ success: true, message: "Data uploaded successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Update an existing category in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.updateData = async function (req, res) {
    const { query, json } = req.body; // Get parameters passed through request.
    try {
        const updatedCategory = await DashboardData.findOneAndUpdate(query, json);
        res.status(200).json({ success: true, dbmsg: updatedCategory });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

/**
 * Delete a category from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.deleteData = async function (req, res) {
    const { query } = req.body; // Get parameters passed through request.
    try {
        const deletedCategory = await DashboardData.findOneAndDelete(query);
        res.status(200).json({ success: true, dbmsg: deletedCategory });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
