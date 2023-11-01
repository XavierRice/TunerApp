const checkName = (req, res, next) => {
  const name = req.body.name;
  if (name) {
    console.log("Name is good!");
    return next();
  } else {
    res.status(400).json({ error: "Name is busted!" });
  }
};

const checkArtist = (req, res, next) => {
  const artist = req.body.artist;
  if (artist) {
    console.log("That's a jam!");
    return next();
  } else {
    res.status(400).json({ error: "Song is busted!" });
  }
};

const checkAlbum = (req, res, next) => {
  const album = req.body.album;
  if (album) {
    console.log("That's a jam!");
    return next();
  } else {
    res.status(400).json({ error: "Song is busted!" });
  }
};

const checkTime = (req, res, next) => {
  const time = req.body.time;
  if (time) {
    console.log("That's too long");
    return next();
  } else {
    res.status(400).json({ error: "The time is busted!" });
  }
};

const checkBoolean = (req, res, next) => {
  const fav = req.body.is_favorite;
  if (typeof fav === "boolean" || fav === "true" || fav === "false") {
    next();
  } else {
    res.status(400).json({ error: "is fav needs to be a boolean fool!" });
  }
};

module.exports = { checkName, checkAlbum, checkArtist, checkTime, checkBoolean };
