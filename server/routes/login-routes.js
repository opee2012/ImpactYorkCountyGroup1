const express = require('express');

// controller functions
const { login } = require('../controllers/login-controller');

const router = express.Router();

// login route
router.post('/login', login);

module.exports = router;