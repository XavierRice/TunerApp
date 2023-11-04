const db = require("../db/dbConfig.js");

const getAllSongs = async (query) => {
  const { order, is_favorite } = query;
  try {
    if (order) {
      const allSongs = await orderAllSongs(order);
      return allSongs;
    }
    if (is_favorite) {
      const allSongs = await favoriteSongs(is_favorite);
      return allSongs;
    } else {
      const allSongs = await db.any("SELECT * FROM songs");
      return allSongs;
    }
  } catch (error) {
    throw error;
  }
};

const getSong = async (id) => {
  try {
    const TargetSong = await db.one("SELECT * FROM Songs WHERE id=$1", [id]);
    return TargetSong;
  } catch (error) {
    return error;
  }
};

const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name , artist, album, time , is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM Songs WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedSong;
  } catch (error) {
    throw error;
  }
};

const updateSong = async (id, song) => {
  try {
    console.log("Updating song with ID:", id);
    console.log("New song data:", song);

    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite, id]
    );
    console.log("Song updated successfully:", updatedSong);
    return updatedSong;
  } catch (error) {
    throw error;
  }
};

const orderAllSongs = async (order) => {
  let sortedSongs;
  try {
    if (order === "asc") {
      sortedSongs = await db.any("SELECT * FROM songs ORDER by name ASC");
    } else {
      sortedSongs = await db.any("SELECT * FROM songs ORDER by name DESC");
    }
    return sortedSongs;
  } catch (error) {
    return error;
  }
};

const favoriteSongs = async (is_favorite) => {
  let sortedSongs;
  try {
    if (is_favorite === "true") {
      sortedSongs = await db.any(
        "SELECT * FROM songs WHERE is_favorite IS true"
      );
    } else {
      sortedSongs = await db.any(
        "SELECT * FROM songs WHERE is_favorite IS false"
      );
    }
    return sortedSongs;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
};
