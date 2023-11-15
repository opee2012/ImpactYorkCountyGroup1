const express = require('express');
const {
    getAllLogins,
    getOneLogin,
    createLogin,
    deleteLogin,
    updateLogin
} = require('../controllers/login-controller');

const router = express.Router();

// GET all logins
router.get('/', getAllLogins);

// GET one login
router.get('/:id', getOneLogin);

// POST create login
router.post('/', createLogin);

// DELETE one login
router.delete('/:id', deleteLogin);

// PUT update one login
router.put('/:id', updateLogin);

module.exports = router;