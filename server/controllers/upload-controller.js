const multer = require('multer');
const path = require('path');
const imageDir = path.join(__dirname, '../uploads/images');

const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

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

exports.getXLSX = (req, res) => {
    const xlsxName = req.params.xlsx;
    const xlsxPath = path.join(xlsxDir, xlsxName);
    res.sendFile(xlsxPath);
};