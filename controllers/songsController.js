const express = require("express");
const songs = express.Router();
const { getAllSongs } = require("../queries/songs.js");


let allTheSongs = [];


//INDEX OF ALL SONGS
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ status: "server error" });
  }
});
//SHOW ID
songs.get("/:id", async (req, res) => {
    const allSongs = await getAllSongs();
  try {
    const id = req.params.id;
    const targetSong = allSongs.find((song) => song.id === parseInt(id));
    if (targetSong) {
      console.log(targetSong);
      res.status(200).json(targetSong);
    } else {
      res.status(404).json({ message: "Couldn't find your Jam" });
    }
  } catch (error) {
    console.log(error);
  }
});
// UPDATE/PUT

songs.put("/:id", (req, res , next) => {
  try {
    const clientSongId = parseInt(req.params.id);
    const songUpdate = req.body;
    const targetSong = allSongs.find((song) => song.id === clientSongId);

    if (!targetSong) {
      console.log(clientSongId);
      res.status(404).json({ message: "Couldn't find your Jam" });
    } else {
      console.log(targetSong);
    }
  } catch (error) {
    console.log(error);
  }
});


// songs.post('/', (req, res) => {
//     const{ name , artist, album, time , is_favorite } = req.body;
    
//     const sql = 'INSERT INTO songs ( name, artist, album, time, is_favorite) VALUES 
    
// })

module.exports = songs;
