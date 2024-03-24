const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        default: [true, 'Missing staff type']
    }
});

// password hashing method
loginSchema.statics.hash = async function(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
}

// static signup method
loginSchema.statics.signup = async function(email, password, admin) {

    const user = await this.create({ email, password: await this.hash(password), admin });

    try {
        await user.save();
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

// static login method
loginSchema.statics.login = async function(email, password) {

    const user = await this.findOne({ email: email });

    try {
        if (!user) {
            throw new Error('Invalid email');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Invalid password');
        };

        return user;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports.Login = mongoose.model('Login', loginSchema, 'logins');
