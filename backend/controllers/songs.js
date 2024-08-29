const Song = require("../models/Song");
const User = require("../models/User");

const create = async (req, res) => {
  try {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song." });
    }
    const artist = req.user._id; // Passport populates the req.user object with the details of the authenticated user during the authentication process
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const mySongs = async (req, res) => {
  try {
    const currentUser = req.user;
    // get all songs where artist_id === currentUser._id
    const songs = await Song.find({ artist: currentUser._id }).populate("artist");
    return res.status(200).json({ data: songs });
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const artistSongs = async (req, res) => {
  try {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};
const singleSong = async (req, res) => {
  try {
    const { songName } = req.params;
    // Construct a regular expression to match any song name containing the provided pattern
    const regex = new RegExp(songName, "i"); // "i" flag for case-insensitive search
    const songs = await Song.find({ name: regex }).populate("artist");
    return res.status(200).json({ data: songs });
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { create, mySongs, artistSongs, singleSong };
