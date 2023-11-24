const jwt = require('jsonwebtoken');

const Validation = require('../utils/validation');
const loginSchema = require('../models/login-schema');
const Login = loginSchema.Login;

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

// get all logins
exports.getAllLogins = async (req, res) => {
    console.log(`Getting all logins`);
    const logins = await Login.find({}).sort({ username: 1 });

    res.status(200).json(logins);
};

// get one login
exports.getUserLogin = async (req, res) => {
    const { username } = req.params;
    console.log(`Getting ${username}'s login`);

    res.status(200).json(await Login.findOne({ username: username }));
};

// login a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Login.login(username, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ username, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
};

// create one login
exports.addNewLogin = async (req, res) => {
    console.log(`Creating new login`);
    const newLogin = new Login(req.body);

    // validate input
    const validationError = await newLogin.validate();

    if (validationError) {
        const errorMsg = Validation.getValidationErrorMessage(validationError);
        throw new Error(errorMsg);
    } else {
        const { username, password } = req.body;
    
        try {
            const user = await Login.signup(username, password);
        
            // create a token
            const token = createToken(user._id);

            res.status(200).json({username, token});
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    };
};

// update one login
exports.updateLogin = async (req, res) => {
    const { username } = req.params;
    console.log(`Updating ${username}'s login`);

    // validate input
    const validationError = await updatedLogin.validate();

    if (validationError) {
        const errorMsg = Validation.getValidationErrorMessage(validationError);
        throw new Error(errorMsg);
    } else {
        return await Login.findOneAndUpdate({ username: username }, loginData);
    };
};

// delete one login
exports.deleteLogin = async (req, res) => {
    const { username } = req.params;
    console.log(`Deleting ${username}'s login`);

    return await Login.findOneAndDelete({ username: username });
};