/**
 * @module uploadRoutes
 * @description Routes for file upload and retrieval in the application.
 */

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

// Importing upload controller functions.
const {
    uploadImage,
    getImage,
    getXLSX
} = require('../controllers/upload-controller');

/**
 * Sets up routes for file upload and retrieval.
 * @param {object} app - The Express application instance.
 */
module.exports = function (app) {

    /**
     * Route for uploading an image.
     * @name post/uploadImage
     * @function
     * @param {string} path - The route path.
     * @param {function} uploadImage - The controller function to handle the request.
     */
    app.post('/uploadImage', uploadImage);

    /**
     * Route for retrieving an uploaded image by its filename.
     * @name get/uploadImage/:image
     * @function
     * @param {string} path - The route path with image filename parameter.
     * @param {function} getImage - The controller function to handle the request.
     */
    app.get('/uploadImage/:image', getImage);

    /**
     * Route for downloading an XLSX file by its filename.
     * @name get/downloadxlsx/:xlsx
     * @function
     * @param {string} path - The route path with xlsx filename parameter.
     * @param {function} getXLSX - The controller function to handle the request.
     */
    app.get('/downloadxlsx/:xlsx', getXLSX);
};
