const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const {
    uploadXLSX,
    uploadImage,
    getImage
} = require('../controllers/upload-controller');

module.exports = function(app) {

    // POST upload
    app.post('/uploadxlsx', uploadXLSX);

    app.post('/uploadImage', uploadImage);

    app.get('/uploadImage/:image', getImage);
};