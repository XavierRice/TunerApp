const express = require('express');
const songs = express.Router();
const { getAllSongs } = require('../queries/songs.js')


//INDEX OF ALL SONGS
songs.get('/', async (req, res) => {
    const allSongs = await getAllSongs()
    if(allSongs[0]){
       res.status(200).json(allSongs) 
    } else {
        res.status(500).json({status:"server error"})
    }
});
//SHOW ID
songs.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const targetSong = allSongs.find(
            (song) => song.id === parseInt(id)
        );
        if (targetSong) {
            console.log(targetSong)
            res.status(200).json(targetSong)
        }else {
            res.status(404).json({message:"Couldn't find your Jam"})
        }
    } catch (error){
        console.log(error)
    }
});


module.exports = songs;