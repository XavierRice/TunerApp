const express = require('express');
const songs = express.Router();



//INDEX OF ALL SONGS
songs.get('/', (req, res) => {
    res.json({status:"ok"})
}) 


module.exports = songs;