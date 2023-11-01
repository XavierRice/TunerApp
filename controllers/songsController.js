const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong ,createSong } = require("../queries/songs.js");


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
    const id = req.params.id;
    const targetSong = await getSong(id)
  try {
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
// create/post

songs.post("/", async (req, res ) => {
    const{ name , artist, album, time , is_favorite } = req.body;
    const song = await createSong(req.body)
    console.log(song)
     res.json(song)
});



module.exports = songs;
