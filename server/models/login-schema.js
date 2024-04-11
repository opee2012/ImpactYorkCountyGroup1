/**
 * @module loginSchema
 * @description Mongoose schema and methods for user authentication.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Mongoose schema for user login.
 * @type {mongoose.Schema}
 */
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Missing email'],
        unique: [true, 'Email already in use']
    },
    password: {
        type: String,
        required: [true, 'Missing password']
    },
    admin: {
        type: Boolean,
        default: false // Indicates non-admin users by default
    }
});

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
loginSchema.statics.hash = async function (password) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
}

/**
 * Creates a new user and saves it to the database.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {boolean} [admin=false] - Whether the user is an admin.
 * @returns {Promise<mongoose.Document>} A promise that resolves with the newly created user.
 */
loginSchema.statics.signup = async function (email, password, admin = false) {
    const user = await this.create({ email, password: await this.hash(password), admin });

    try {
        await user.save();
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

/**
 * Authenticates a user based on their email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<mongoose.Document>} A promise that resolves with the authenticated user.
 */
loginSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    try {
        if (!user) {
            throw new Error('Invalid email');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid password');
        }

        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports.Login = mongoose.model('Login', loginSchema, 'logins');
