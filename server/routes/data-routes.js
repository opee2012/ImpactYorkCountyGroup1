const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

const {
    getAllData,
    getOneData,
    addNewData,
    updateData,
    deleteData
} = require('../controllers/data-controller');

module.exports = function(app) {

    // GET all data
    app.get('/data', getAllData);

    // GET one data
    app.get('/data/:data', getOneData);

    // POST upload data
    app.post('/upload', addNewData);

    // PUT one data
    app.put('/data/:data', updateData);

    // DELETE one data
    app.delete('/data/:data', deleteData);
};