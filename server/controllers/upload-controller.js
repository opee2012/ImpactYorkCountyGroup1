const multer = require('multer');
const path = require('path');
const xlsxDir = path.join(__dirname, '../uploads/xlsx');
const imageDir = path.join(__dirname, '../uploads/images');

const xlsx_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, xlsxDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const xlsx = multer({ storage: xlsx_storage });

exports.uploadXLSX = (req, res) => {
    xlsx.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.send({ message: 'File uploaded successfully' });
    });
};

const image = multer({ storage: image_storage });

exports.uploadImage = (req, res) => {
    image.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.send({ message: 'File uploaded successfully' });
    });
};

exports.getImage = (req, res) => {
    const imageName = req.params.image;
    const imagePath = path.join(imageDir, imageName);
    res.sendFile(imagePath);
};