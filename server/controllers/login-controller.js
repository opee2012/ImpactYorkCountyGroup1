const Login = require('../models/login-schema');

// login user
const login = async (req, res) => {
    res.json({msg: 'login user'});
};

module.exports = { login };