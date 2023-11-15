require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const loginRoutes = require('./routes/login-routes');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/login', loginRoutes);

// connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));