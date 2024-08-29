const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  create,
  mySongs,
  artistSongs,
  singleSong,
} = require("../controllers/songs");

router
  .route("/create")
  .post(passport.authenticate("jwt", { session: false }), create); // to create a song
router
  .route("/get/mysongs")
  .get(passport.authenticate("jwt", { session: false }), mySongs); // get all songs I have published/created
router
  .route("/get/artist/:artistId")
  .get(passport.authenticate("jwt", { session: false }), artistSongs); // get all songs any artist has published
router
  .route("/get/songname/:songName")
  .get(passport.authenticate("jwt", { session: false }), singleSong); // get a song by name

module.exports = router;
