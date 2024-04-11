require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const dataRoutes = require('./routes/data-routes');
const uploadRoutes = require('./routes/upload-routes');
const loginRoutes = require('./routes/login-routes');

/**
 * Express application instance.
 * This is the main application object where middleware and routes are registered.
 */
const app = express();

/**
 * Middleware setup.
 * These middleware functions process incoming requests before they reach the routes.
 */
// Middleware to parse JSON bodies in requests.
app.use(express.json());

// Middleware to parse URL-encoded bodies in requests.
app.use(express.urlencoded({ extended: true }));

// Logging middleware that logs the request path and method to the console.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

/**
 * Route setup.
 * Registers route handlers for different paths and HTTP methods.
 */
dataRoutes(app);
uploadRoutes(app);
loginRoutes(app);

/**
 * Connects to MongoDB using Mongoose.
 * @param {string} dbString - The database connection string.
 */
function MongoConnect(dbString) {
    mongoose.connect(process.env.DB_URI + dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let db = mongoose.connection;

    // Log errors to the console if the connection fails.
    db.on('error', console.error.bind(console, 'connection error:'));

    // Log a message to the console once the connection is open.
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
};

// Check if the database environment is development or production.
if (process.argv[2] === 'dev') {
    MongoConnect('IMPACT_DEV?retryWrites=true&w=majority');
} else if (process.argv[2] === 'prod') {
    MongoConnect('IMPACT_PROD?retryWrites=true&w=majority');
} else {
    console.error('Please specify the environment: dev or prod');
    process.exit(1);
}

/**
 * Starts the HTTP server and listens for incoming requests.
 */
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
