/**
 * @module DashboardSchema
 * @description Mongoose schema and methods for dashboard data management.
 */

const mongoose = require('mongoose');

/**
 * Mongoose schema for subcategory data.
 * @type {mongoose.Schema}
 */
const subCategoryDataSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Missing sub-category name'],
    },
    Data: {
        type: Array,
        required: [true, 'Missing sub-category data'],
    }
});

/**
 * Mongoose schema for category data.
 * @type {mongoose.Schema}
 */
const categoryDataSchema = new mongoose.Schema({
    Key: {
        type: String,
        required: false,
    },
    SubCategory: {
        type: [subCategoryDataSchema],
        required: [true, 'Missing sub-category data'],
        default: () => [{}]
    }
});

/**
 * Mongoose schema for dashboard data.
 * @type {mongoose.Schema}
 */
const dashboardDataSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: [true, 'Missing category name'],
        unique: [true, 'Category already exists']
    },
    Data: {
        type: [categoryDataSchema],
        default: () => [{}]
    }
});

/**
 * Static method to initialize a new category.
 * @param {Object} json - The data to create a new category.
 * @returns {Promise<mongoose.Document>} A promise that resolves with the newly created document.
 */
dashboardDataSchema.statics.initNewCategory = async function (json) {
    return await this.create(json);
}

module.exports.DashboardData = mongoose.model('DashboardData', dashboardDataSchema, 'dashboarddata');
