const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
};

const MONGO_ERRORS = {
    DUPLICATE_KEY: 11000,
};

require('dotenv').config();

const loginRoutes = require('./routes/login-routes');

module.exports = function(app) {

    // register view engine (middleware)
    app.use((req, res, next) => {
        console.log(req.path, req.method);
        next();
    });

    // routes
    app.use(loginRoutes);   
}