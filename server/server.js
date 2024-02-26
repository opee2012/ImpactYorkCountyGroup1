require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const categoriesRoutes = require('./routes/categoriesRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

function MongoConnect(dbString) {
    mongoose.connect(process.env.DB_URI + dbString)
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log(`Connected to MongoDB`);
        
        http.createServer(app).listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    });
};

app.use('/api', categoriesRoutes);

if (process.argv[2] === 'dev') {
    MongoConnect('IMPACT_DEV?retryWrites=true&w=majority');
} else if (process.argv[2] === 'prod') {
    db = 'IMPACT_PROD?retryWrites=true&w=majority';
};
