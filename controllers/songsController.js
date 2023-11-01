const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs.js");

const {
  checkName,
  checkAlbum,
  checkArtist,
  checkTime,
  checkBoolean,
} = require("../validations/checkSongs.js");

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
});

// create/post
songs.post(
  "/",
  checkName,
  checkAlbum,
  checkArtist,
  checkTime,
  checkBoolean,
  async (req, res) => {
    const { name, artist, album, time, is_favorite } = req.body;
    const song = await createSong(req.body);
    console.log(song);
    res.json(song);
  }
);

//Delete
songs.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json({ error: "we no have color sir" });
  }
});

// UPDATE
// songs.put(
//   "/:id",
//   checkName,
//   checkAlbum,
//   checkArtist,
//   checkTime,
//   checkBoolean,
//   async (req, res) => {
//     const { name, artist, album, time, is_favorite } = req.body;
//     const id = req.params.id;
//     const updatedSong = await updateSong(id, req.body);
//   }
// );

module.exports = songs;
