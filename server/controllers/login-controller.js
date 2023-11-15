const Login = require('../models/login-schema');
const mongoose = require('mongoose');

// get all logins
const getAllLogins = async (req, res) => {
    const logins = await Login.find({}).sort('username');

    res.status(200).json(logins);
};

// get one login
const getOneLogin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No login with that id' });
    };

    const login = await Login.findById(id);

    if (!login) {
        return res.status(404).json({ message: 'No login with that id' });
    };
};

// create login
const createLogin = async (req, res) => {
    const { username, password } = req.body;

    // add to database
    try {
        const login = await Login.create({ username, password });
        res.status(201).json(login);
    } catch (err) {
        res.status(400).json(err);
    };
};

// delete login
const deleteLogin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No login with that id' });
    };

    await Login.findByIdAndDelete(id);

    res.status(200).json({ message: 'Login deleted successfully' });
};

// update login
const updateLogin = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No login with that id' });
    };

    const login = await Login.findByIdAndUpdate(id, { username, password }, { new: true });

    res.status(200).json(login);
};

module.exports = {
    getAllLogins,
    getOneLogin,
    createLogin,
    deleteLogin,
    updateLogin
};