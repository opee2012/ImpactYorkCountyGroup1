const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const {
    uploadImage,
    getImage,
    getXLSX
} = require('../controllers/upload-controller');

module.exports = function(app) {

    // POST upload
    app.post('/uploadImage', uploadImage);

    app.get('/uploadImage/:image', getImage);

    app.get('/downloadxlsx/:xlsx', getXLSX);
};