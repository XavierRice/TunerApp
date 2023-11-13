const express = require("express");
const songs = express.Router({mergeParams: true});
const { getAlbum } = require('../queries/albums.js')

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
  const { order, is_favorite } = req.query;
  const { album_id }  = req.params;
  const allSongs = await getAllSongs(req.query, album_id);
  
  if(album_id){
    const album = await getAlbum(album_id)
    if (album.id) {
      
      res.status(200).json({...album, allSongs});
    } else {
      res.status(500).json({ status: "server error" });
    }
  } else {
    if(allSongs[0]){
      res.status(200).json(allSongs)
    }
    res.status(500).json({status: "server err"})
  }
});

//SHOW ID
songs.get("/:id", async (req, res) => {
  const { album_id, id} = req.params.id;

  const album = await getAlbum(album_id)
  const targetSong = await getSong(id);

  if (targetSong.id) {
    res.status(200).json({...album, targetSong});
  } else {
    res.status(404).json({"code":400});
  }
});

//UPDATE
songs.put(
  "/:id",
  checkName,
  checkAlbum,
  checkArtist,
  checkTime,
  checkBoolean,
  async (req, res) => {
    const { name, artist, album, time, is_favorite } = req.body;
    const {id, album_id} = req.params;
    const updatedSong = await updateSong({ album_id, id, ...req.body});
    if (updatedSong.id) {
      res.status(200).json(updatedSong);
    } else {
      res.status(404).json({ error: "me no can find song sir" });
    }
  }
);

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
    res.status(404).json({ error: "we no have song here sir" });
  }
});


module.exports = songs;
