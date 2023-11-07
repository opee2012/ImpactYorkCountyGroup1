const express = require('express');
const router = express.Router();

// GET login information
router.get('/', (req, res) => {
    res.json({
        message: 'GET login'})
});

// router.post('/', (req, res) => {});

// router.put('/', (req, res) => {});

// router.delete('/', (req, res) => {});

module.exports = router;