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

        console.log(user.email, token, user.admin);

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
        const {email, password} = req.body;

        try {
            // find the target user (needs a check for new email conflicting with existing emails?)
            const user = await Login.findOne({email: targetEmail});

            // create a token
            const token = createToken(user._id);
            // hash the new password
            req.body.password = await Login.hash(password);

            // only update everything that the req's body has within the target user
            await Login.findOneAndUpdate({email: targetEmail}, req.body);
            res.status(200).json({email, token});
        }
        catch(error) {
            res.status(400).json({error: error.message});
        }
    };
};

// delete one login
exports.deleteLogin = async (req, res) => {
    const { email } = req.params;
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