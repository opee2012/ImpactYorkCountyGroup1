const express = require('express');

require('dotenv').config();

// express app
const app = express();

// routes
// req = request - info about the request
// res = response - info about what we send back to the browser
app.get('/', (req, res) => {
    res.json({msg: 'Hello World'});
});

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});