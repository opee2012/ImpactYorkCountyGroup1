require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();

// middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Log route and method
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to MongoDB
function MongoConnect(dbString) {
    mongoose.connect(process.env.DB_URI + dbString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');

            // Routes
            require('./routes/login-routes')(app);

            const portNum = process.env.PORT;
            app.listen(portNum, () => {
            console.log(`Server is listening on port ${portNum}`); });
        })
        .catch(error => console.error('MongoDB connection error:', error));
}

// Check if db is dev or prod
if (process.argv[2] === 'dev') {
    MongoConnect('IMPACT_DEV?retryWrites=true&w=majority');
} else if (process.argv[2] === 'prod') {
    MongoConnect('IMPACT_PROD?retryWrites=true&w=majority');
}
