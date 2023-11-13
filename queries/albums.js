const db = require("../db/dbConfig.js");


const getAllAlbums = async (query) => {
    try{
        const allAlbums = await db.many("SELECT * FROM albums")
        return allAlbums
    }catch(error){
        console.log(error)
    }
}
const getAlbum = async (id) => {
  try {
    const targetAlbum = await db.one("SELECT * FROM albums WHERE id=$1", id);
    return targetAlbum;
  } catch (error) {
    return error;
  }
};

const createAlbum = async (album) => {
  try {
    const newAlbum = await db.one(
     "INSERT INTO albums (album_name, album_artist, debut_date, label, is_favorite) VALUE($1, $2, $3, $4, $5) RETURNING *",
    [album.album_name, album.album_artist, album.debut_date, album.lable, album.is_favorite ]);
    return newAlbum;
  } catch (error) {
    return error;
  }
};

const deleteAlbum = async (id) => {
  try {
    const deletedAlbum = await db.one(
      "DELETE FROM albums WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedAlbum;
  } catch (error) {
    throw error;
  }
};

const updateAlbum = async (id, album) => {
  try {
    const updatedAlbum = await db.one(
      "UPDATE albums SET album_name=$1, album_artist=$2, debut_date=$3, label=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [album.album_name, album.album_artist, album.debut_date, album.lable, album.is_favorite, id ]);
    console.log("Album updated successfully:", updatedAlbum);
    return updatedAlbum;
  } catch (error) {
    throw error;
  }
};

const orderAllAlbums = async (order) => {
  let sorted;
  try {
    if (order === "asc") {
      sorted = await db.any("SELECT * FROM albums ORDER by name ASC");
    } else {
      sorted = await db.any("SELECT * FROM albums ORDER by name DESC");
    }
    return sorted;
  } catch (error) {
    return error;
  }
};

const favoriteAlbums = async (is_favorite) => {
  let sorted;
  try {
    if (is_favorite === "true") {
      sorted = await db.any(
        "SELECT * FROM albums WHERE is_favorite IS true"
      );
    } else {
      sorted = await db.any(
        "SELECT * FROM albums WHERE is_favorite IS false"
      );
    }
    return sorted;
  } catch (error) {
    return error;
  }
};

module.exports = {
 getAllAlbums,
 getAlbum,
 createAlbum,
 updateAlbum,
 deleteAlbum,
 orderAllAlbums,
 favoriteAlbums
};
