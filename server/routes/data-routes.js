/**
 * @module DataRoutes
 * @description Routes for data management operations in the application.
 */

const multer = require('multer');
const path = require('path');

/**
 * Directory for storing uploaded XLSX files.
 */
const xlsxDir = path.join(__dirname, '../uploads/xlsx');

/**
 * Configuration for multer storage, specifying the destination and filename
 * for uploaded XLSX files.
 */
const xlsx_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, xlsxDir);
    },
    filename: (req, file, cb) => {
        cb(null, 'IYC Dashboard Data.xlsx');
    }
});

/**
 * Multer instance configured for handling XLSX file uploads.
 */
const xlsx = multer({ storage: xlsx_storage });

/**
 * HTTP status codes commonly used in API responses.
 * @enum {number}
 */
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

// Importing data controller functions.
const {
    getAllData,
    getOneData,
    addNewData,
    updateData,
    deleteData
} = require('../controllers/data-controller');

/**
 * Sets up routes for data management operations in the application.
 * @param {Object} app - The Express application instance.
 */
module.exports = function (app) {

    /**
     * Route for getting all data entries.
     * @name get/data
     * @function
     * @param {string} path - The route path.
     * @param {function} getAllData - The controller function to handle the request.
     */
    app.get('/data', getAllData);

    /**
     * Route for getting a specific data entry by identifier.
     * @name get/data/:data
     * @function
     * @param {string} path - The route path with data identifier parameter.
     * @param {function} getOneData - The controller function to handle the request.
     */
    app.get('/data/:data', getOneData);

    /**
     * Route for uploading new data as an XLSX file.
     * @name post/upload
     * @function
     * @param {string} path - The route path.
     * @param {function} multerMiddleware - The multer middleware for handling file uploads.
     * @param {function} addNewData - The controller function to handle the request.
     */
    app.post('/upload', xlsx.single('file'), addNewData);

    /**
     * Route for updating a specific data entry by identifier.
     * @name put/data/:data
     * @function
     * @param {string} path - The route path with data identifier parameter.
     * @param {function} updateData - The controller function to handle the request.
     */
    app.put('/data/:data', updateData);

    /**
     * Route for deleting a specific data entry by identifier.
     * @name delete/data/:data
     * @function
     * @param {string} path - The route path with data identifier parameter.
     * @param {function} deleteData - The controller function to handle the request.
     */
    app.delete('/data/:data', deleteData);
};
