const multer = require('multer');
const path = require('path');
const xlsxDir = path.join(__dirname, '../uploads/xlsx');

const xlsx_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, xlsxDir);
    },
    filename: (req, file, cb) => {
        cb(null, 'IYC Dashboard Data.xlsx');
    }
});

const xlsx = multer({ storage: xlsx_storage });

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
    app.post('/upload', xlsx.single('file'), addNewData);

    // PUT one data
    app.put('/data/:data', updateData);

    // DELETE one data
    app.delete('/data/:data', deleteData);
};