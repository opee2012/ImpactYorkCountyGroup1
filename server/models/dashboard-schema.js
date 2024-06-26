const mongoose = require('mongoose');

// The subcategory data schema
const subCategoryDataSchema = new mongoose.Schema({
    Name: { 
        type: String,
        required: [true, 'Missing sub-category name'],
    },
    Data: {
        // Data underneath here could have any unrestricted object (year - value, etc).
        type: Array,
        required: [true, 'Missing sub-category data'],
    }
});

// The category data schema
const categoryDataSchema = new mongoose.Schema({
    Key: { 
        type: String,
        required: false,
    },
    "SubCategory": {
        type: [subCategoryDataSchema],
        required: [true, 'Missing sub-category data'],
        default: () => [({})]
    }
});

// The whole schema definition
// It is assumed that the data being passed through to the DB was already
// parse checked somewhere else in the system.
// However, additional checks will be made here for missing information too
const dashboardDataSchema = new mongoose.Schema({
    Category: {
        type: String,
        required: [true, 'Missing category name'],
        unique: [true, 'There is already a category underneath this label']
    },
    // All categories need data listed underneath an array list
    Data: {
        type: [categoryDataSchema],
        default: () => [({})]
    }
});

// Initialize a new dataset. The Json parameter must exactly match the schema.
dashboardDataSchema.statics.initNewCategory = async function(json) {
    return await this.create(json);
}

module.exports.DashboardData = mongoose.model('DashboardData', dashboardDataSchema, 'dashboarddata');
