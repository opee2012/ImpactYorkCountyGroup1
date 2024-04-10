/**
 * @module Controllers/FileUploadController
 * Controller for handling file uploads and retrieval.
 */

const multer = require('multer');
const path = require('path');
const imageDir = path.join(__dirname, '../uploads/images');
const xlsxDir = path.join(__dirname, '../uploads/xlsx');

/**
 * Configuration for storing uploaded images on disk.
 */
const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

/**
 * Middleware for uploading a single XLSX file.
 */
const xlsx = multer({ /* Configure multer for XLSX files */ });

/**
 * Uploads a single XLSX file and responds with a success message.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.uploadXLSX = (req, res) => {
    xlsx.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.send({ message: 'File uploaded successfully' });
    });
};

/**
 * Middleware for uploading a single image file.
 */
const image = multer({ storage: image_storage });

/**
 * Uploads a single image file and responds with a success message.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.uploadImage = (req, res) => {
    image.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.send({ message: 'File uploaded successfully' });
    });
};

/**
 * Retrieves and sends an image file based on the request parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getImage = (req, res) => {
    const imageName = req.params.image;
    const imagePath = path.join(imageDir, imageName);
    res.sendFile(imagePath);
};

/**
 * Retrieves and sends an XLSX file based on the request parameter.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getXLSX = (req, res) => {
    const xlsxName = req.params.xlsx;
    const xlsxPath = path.join(xlsxDir, xlsxName);
    res.sendFile(xlsxPath);
};
