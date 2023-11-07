const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'GET login'})
});


module.exports = router;