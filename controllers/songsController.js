const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong ,createSong, deleteSong } = require("../queries/songs.js");

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
    const targetSong = await getSong(id);
    if (targetSong) {
      res.status(200).json(targetSong);
    } else {
      res.status(404).json({ error: "we no have color sir" });
    }
  });;
// create/post

songs.post("/", async (req, res ) => {
    const{ name , artist, album, time , is_favorite } = req.body;
    const song = await createSong(req.body)
    console.log(song)
     res.json(song)
});

//Delete
songs.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const targetSong = await deleteSong(id);
    if (targetSong) {
      res.status(200).json(targetSong);
    } else {
      res.status(404).json({ error: "we no have color sir" });
    }
  });

module.exports = songs;
