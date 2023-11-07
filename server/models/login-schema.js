const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Login', loginSchema);