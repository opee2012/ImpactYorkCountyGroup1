const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

// express app
const app = express();

app.locals.pretty = true;

app.set('port', process.env.PORT); // set the port
app.use(cookieParser()); // parse cookies automatically
app.use(bodyParser.json()); // parse json automatically
app.use(bodyParser.urlencoded({ extended: true })); // parse forms automatically
app.use('/client', express.static(path.join(__dirname, 'public'))); // serve static files from client folder

// build mongo connection string
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;
const dataDB = process.env.DB_NAME;
const dbString = `mongodb://${dbHost}:${dbPort}/${dataDB}`;

console.log('Connecting to', dbString);

// connect to mongodb
mongoose.connect(dbString);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    require('./server/server')(app);
    http.createServer(app).listen(process.env.PORT);
    console.log('Running on port:', process.env.PORT);
});