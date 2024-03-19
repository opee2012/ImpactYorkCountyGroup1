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
    }
});

// password hashing method
loginSchema.statics.hash = async function(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
}

// static signup method
loginSchema.statics.signup = async function(email, password) {

    const user = await this.create({ email, password: await this.hash(password) });

    return user;
};

// static login method
loginSchema.statics.login = async function(email, password) {

    const user = await this.findOne({ email: email });

    if (!user) {
        throw new Error('Invalid email');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid password');
    };

    return user;
};

module.exports.Login = mongoose.model('Login', loginSchema, 'logins');
