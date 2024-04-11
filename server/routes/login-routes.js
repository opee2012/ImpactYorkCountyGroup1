/**
 * @module loginRoutes
 * @description Routes for login operations in the application.
 */

/**
 * HTTP status codes for response handling.
 */
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409
};

// Importing login controller functions.
const {
    getAllLogins,
    getUserLogin,
    loginUser,
    addNewLogin,
    updateLogin,
    deleteLogin
} = require('../controllers/login-controller');

/**
 * Sets up routes for login operations in the application.
 * @param {Object} app - The Express application instance.
 */
module.exports = function (app) {

    /**
     * Route for getting all user logins.
     * @name get/login
     * @function
     * @param {string} path - The route path.
     * @param {function} getAllLogins - The controller function to handle the request.
     */
    app.get('/login', getAllLogins);

    /**
     * Route for getting a specific user login by username.
     * @name get/login/:username
     * @function
     * @param {string} path - The route path with username parameter.
     * @param {function} getUserLogin - The controller function to handle the request.
     */
    app.get('/login/:username', getUserLogin);

    /**
     * Route for authenticating and logging in a user.
     * @name post/login
     * @function
     * @param {string} path - The route path.
     * @param {function} loginUser - The controller function to handle the request.
     */
    app.post('/login', loginUser);

    /**
     * Route for creating a new user account.
     * @name post/signup
     * @function
     * @param {string} path - The route path.
     * @param {function} addNewLogin - The controller function to handle the request.
     */
    app.post('/signup', addNewLogin);

    /**
     * Route for updating a user's login information by target email.
     * @name put/login/:targetEmail
     * @function
     * @param {string} path - The route path with target email parameter.
     * @param {function} updateLogin - The controller function to handle the request.
     */
    app.put('/login/:targetEmail', updateLogin);

    /**
     * Route for deleting a user's login by email.
     * @name delete/login/:email
     * @function
     * @param {string} path - The route path with email parameter.
     * @param {function} deleteLogin - The controller function to handle the request.
     */
    app.delete('/login/:email', deleteLogin);
};
