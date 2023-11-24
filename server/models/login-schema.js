const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Missing username'],
        unique: [true, 'Username already in use']
    },
    password: {
        type: String,
        required: [true, 'Missing password']
    }
});

// static signup method
loginSchema.statics.signup = async function(username, password) {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hashedPassword });

    return user;
};

// static login method
loginSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw new Error('Missing username or password');
    };

    const user = await this.findOne({ username: username });

    if (!user) {
        throw new Error('Invalid username');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid password');
    };

    return user;
};

module.exports.Login = mongoose.model('Login', loginSchema);