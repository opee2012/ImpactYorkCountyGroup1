const e = require('express');
const loginSchema = require('../models/login-schema');
const Login = loginSchema.Login;
const Validation = require('../utils/validation');

const mongoose = require('mongoose');

// get all logins
exports.getAllLogins = async () => {
    return await Login.find({});
};

// get one login
exports.getUserLogin = async (username) => {
    console.log(`Getting ${username}'s login`);
    return await Login.findOne({ username: username });
};

// create one login
exports.addNewLogin = async (loginData) => {
    console.log('Creating new login');
    const newLogin = new Login(loginData);

    // validate input
    const validationError = await newLogin.validate();

    if (validationError) {
        const errorMsg = Validation.getValidationErrorMessage(validationError);
        throw new Error(errorMsg);
    } else {
        return await newLogin.save();
    };
};

// update one login
exports.updateLogin = async (username, loginData) => {
    console.log(`Updating ${username}'s login`);
    const updatedLogin = new Login(loginData);

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
exports.deleteLogin = async (username) => {
    console.log(`Deleting ${username}'s login`);
    return await Login.findOneAndDelete({ username: username });
};