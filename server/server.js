const express = require('express');
const loginRoutes = require('./routes/login-routes');

require('dotenv').config();

// express app
const app = express();

// register view engine (middleware)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use(loginRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});