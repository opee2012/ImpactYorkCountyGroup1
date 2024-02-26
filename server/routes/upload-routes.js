const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const {
    uploadData
} = require('../controllers/upload-controller');

module.exports = function(app) {
    // PUT one json file to upload
    app.put('/upload/:json', uploadData);
};