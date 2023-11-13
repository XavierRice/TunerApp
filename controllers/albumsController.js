const express = require("express");
const albums = express.Router();
const songsController = require('./songsController')

const {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  orderAllAlbums,
  favoriteAlbums
 } = require('../queries/albums')

albums.use("/:album_id/songs", songsController) /// MISSED THIS!!!!! 


//INDEX OF ALL Albums
albums.get("/", async (req, res) => {
  const { order, is_favorite } = req.query;

  const allAlbums = await getAllAlbums(req.query);
  if (allAlbums[0]) {
    console.log(allAlbums);
    res.status(200).json(allAlbums);
  } else {
    res.status(500).json({ status: "server error" });
  }
});

//SHOW ID
albums.get("/:id", async (req, res) => {
  const id = req.params.id;
  const targetAlbum = await getAlbum(id);
  if (targetAlbum.id) {
    res.status(200).json(targetAlbum);
  } else {
    res.status(404).json({ code: 400 });
  }
});

// create/post
albums.post("/", async (req, res) => {
  const album = await createAlbum(req.body);
  console.log(album);
  res.json(album);
});

//Delete
albums.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedAlbum = await deleteAlbum(id);
  if (deletedAlbum) {
    res.status(200).json(deletedAlbum);
  } else {
    res.status(404).json({ error: "No ablum here boss", id });
  }
});

//UPDATE
albums.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedAlbum = await updateAlbum(id, req.body);
  if (updatedAlbum.id) {
    res.status(200).json(updatedAlbum);
  } else {
    res.status(404).json({ error: "No album here boss!" });
  }
});

 module.exports = albums;
