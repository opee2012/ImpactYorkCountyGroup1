const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require("fs");

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
    const logins = await Login.find({}).sort({ email: 1 });

    res.status(200).json(logins);
};

// get one login
exports.getUserLogin = async (req, res) => {
    const { email, admin } = req.params;
    console.log(`Getting ${email}'s login`);

    res.status(200).json(await Login.findOne({ email: email, admin: admin }));
};

// login a user
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
        const { email, password, admin } = req.body;
    
        try {
            const emailRegEx = '^[A-z0-9._+-]+\@[A-z0-9-_.]+\.[A-z0-9]+$';
            if (email.match(emailRegEx) == null) {
                throw new Error("email must be an email address");
            }

            // ----- Currently not possible to get email verification the way we want it (need an SMTP server) -----
            // Instead, writes the contents of the mail sending information into a json file.
            const mailText = "Here is your temporary password for your IYC account: " + password;
            let sendInfo = {
                from: 'no-reply@impactyorkcounty.org',
                to: email,
                subject: 'Temporary IYC password',
                text: mailText,
                html: '<p>' + mailText + '</p>'
            };

            // Read
            let path = "./utils/email_temp/sentEmails.json";
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log("Read from sentEmails.json failed. Reason: " + err.message);
                    return;
                }
                let sentEmails = JSON.parse(data);
                sentEmails["sent"].push(sendInfo);

                // Write
                fs.writeFile(path, JSON.stringify(sentEmails, null, 2), (err) => {
                    if (err) {
                        console.log("Write into sentEmails.json failed. Reason: " +  + err.message);
                        return;
                    }
                });
            });
            
            // Sign up user
            const user = await Login.signup(email, password, admin);
        
            // create a token
            const token = createToken(user._id);

            res.status(200).json({email, token, admin});
        } catch (error) {
            res.status(400).json({error: error.message});
        };
    };
};

// update one login
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
            //const token = createToken(user._id);
         /*   // hash the new password
            req.body.password = await Login.hash(password);

            // only update everything that the req's body has within the target user
            await Login.findOneAndUpdate({email: targetEmail}, req.body);*/
            res.status(200).json({email: updatedUser.email, token});
        }
        catch(error) {
            res.status(400).json({error: error.message});
        }
    };
};

// delete one login
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