//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const songsController = require('./controllers/songsController.js')
const albumsController = require('./controllers/albumsController.js')

//Middleware
app.use(cors()); //preventing failures from crossing paths w/ permission.
app.use(express.json());// we accept json data when crossing paths.
app.use('/songs', songsController)
app.use('/albums', albumsController)

//Routes
app.get('/', (req, res) => {
 res.send('Welcome to Tuner')
});

//404 Page
app.get('*', (req, res) => {
    res.status(404).send("Page not found")
});

module.exports = app;