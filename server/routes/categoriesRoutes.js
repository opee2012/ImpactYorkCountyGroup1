//categoriesRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../models/categories');

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
