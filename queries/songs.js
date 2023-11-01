const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSong = async (id) => {
  try {
    const TargetSong = await db.one("SELECT * FROM colors WHERE id=$1", id);
    return TargetSong;
  } catch (error) {
    return error;
  }
};

const createSong = async (song) =>{
  try{
    const newSong = await db.one(
      "INSERT INTO songs (name , artist, album, time , is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name , song.artist, song.album, song.time , song.is_favorite]
    )
    return newSong
} catch(error){
  return error;
}
}


module.exports = {
  getAllSongs, getSong, createSong
};
