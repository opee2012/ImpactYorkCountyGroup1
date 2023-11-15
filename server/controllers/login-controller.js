const Login = require('../models/login-schema');

// login user
const login = async (req, res) => {
    res.json({ message: 'login' });
};

module.exports = { login };