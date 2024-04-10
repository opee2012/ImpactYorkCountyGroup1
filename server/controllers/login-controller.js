/**
 * @module Controllers/LoginController
 * Controller for handling user authentication and login operations.
 */

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Validation = require('../utils/validation');
const loginSchema = require('../models/login-schema');
const Login = loginSchema.Login;

/**
 * Creates a JWT token for a user.
 * @param {string} _id - The user's ID.
 * @returns {string} A JWT token.
 */
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

/**
 * Retrieves all logins stored in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getAllLogins = async (req, res) => {
    console.log(`Getting all logins`);
    const logins = await Login.find({}).sort({ email: 1 });

    res.status(200).json(logins);
};

/**
 * Retrieve a specific user's login information from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getUserLogin = async (req, res) => {
    const { email, admin } = req.params;
    console.log(`Getting ${email}'s login`);

    res.status(200).json(await Login.findOne({ email: email, admin: admin }));
};

/**
 * Authenticates a user and returns a JWT token if successful.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.loginUser = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await Login.login(email, password);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ email: user.email, token, admin: user.admin});
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
};

/**
 * Creates a new login entry in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.addNewLogin = async (req, res) => {
    console.log(`Creating new login`);
    const newLogin = new Login(req.body);

    // validate input
    const validationError = await newLogin.validate();

    if (validationError) {
        const errorMsg = Validation.getValidationErrorMessage(validationError);
        throw new Error(errorMsg);
    } else {
        const { email, password, admin } = req.body;
    
        try {
            const emailRegEx = '.+\@.+\..+';
            if (email.match(emailRegEx) == null) {
                // Might need to send a validation link to ensure the email provided is valid
                throw new Error("email must be an email address");
            }
            
            const user = await Login.signup(email, password, admin);
        
            // create a token
            const token = createToken(user._id);

            res.status(200).json({email, token, admin});
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    };
};

/**
 * Updates an existing login entry in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.updateLogin = async (req, res) => {
    const { targetEmail } = req.params;
    console.log(`Updating ${targetEmail}'s login`);
    const updatedLogin = new Login(req.body);

    // validate input
    const validationError = await updatedLogin.validate();

    if (validationError) {
        const errorMsg = Validation.getValidationErrorMessage(validationError);
        throw new Error(errorMsg);
    } else {
        const {email, password, admin} = req.body;

        try {
            // Update fields
            const updateFields = {};
            if (req.body.email) updateFields.email = req.body.email;
            if (req.body.password) updateFields.password = await Login.hash(req.body.password);
            if (req.body.admin !== undefined) updateFields.admin = req.body.admin;

            // Update the user
            const updatedUser = await Login.findOneAndUpdate(
                { email: targetEmail },
                updateFields,
                { new: true } // Return the updated document
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // create a token
            const token = createToken(updatedUser._id);
            res.status(200).json({email: updatedUser.email, token});
        }
        catch(error) {
            res.status(400).json({error: error.message});
        }
    };
};

/**
 * Deletes a login entry from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.deleteLogin = async (req, res) => {
    const { email } = req.body;
    console.log(`Deleting ${email}'s login`);
    try {
        // Attempt to delete the login with the provided email
        const deletedLogin = await Login.findOneAndDelete({ email: email });

        // If login is successfully deleted, send a success response with status 200
        if (deletedLogin) {
            res.status(200).json({ message: `Login for ${email} deleted successfully.` });
        } else {
            // If login is not found, send a response with status 404 (Not Found)
            res.status(404).json({ error: `Login for ${email} not found.` });
        }
    } catch (error) {
        // If an error occurs during the deletion process, send an error response with status 400 (Bad Request)
        console.error('Error deleting login:', error);
        res.status(400).json({ error: 'Failed to delete login.' });
    }
};
