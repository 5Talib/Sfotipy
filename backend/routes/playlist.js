const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  create,
  getPlaylist,
  getPlaylistByMe,
  getArtistPlaylist,
  addSong,
} = require("../controllers/playlist");

router
  .route("/create")
  .post(passport.authenticate("jwt", { session: false }), create); // create playlist
router
  .route("/get/playlist/:playlistId")
  .get(passport.authenticate("jwt", { session: false }), getPlaylist); // get playlist by id
router
  .route("/get/artist/:artistId")
  .get(passport.authenticate("jwt", { session: false }), getArtistPlaylist); // get playlist made by an artist
router
  .route("/get/me")
  .get(passport.authenticate("jwt", { session: false }), getPlaylistByMe); // get playlist made by me
router
  .route("/add/song")
  .post(passport.authenticate("jwt", { session: false }), addSong); // add song to a playlist

module.exports = router;
