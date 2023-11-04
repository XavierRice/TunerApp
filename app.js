//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const songsController = require('./controllers/songsController.js')

//Middleware
app.use(cors()); //preventing failures from crossing paths w/ permission.
app.use(express.json());// we accept json data when crossing paths.
app.use('/songs', songsController)

//Routes
app.get('/', (req, res) => {
 res.send('Welcome to Tuner')
});

//404 Page
app.get('*', (req, res) => {
    res.status(404).send("Page not found")
});

module.exports = app;