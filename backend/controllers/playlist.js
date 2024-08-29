const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

const create = async (req, res) => {
  try {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ err: "Insufficient Data" });
    }
    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const getArtistPlaylist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Invalid Aritist ID" });
    }
    const playlist = await Playlist.find({ owner: artistId });
    return res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};
const getPlaylistByMe = async (req, res) => {
  try {
    const artistId = req.user._id;
    const playlist = await Playlist.find({ owner: artistId }).populate("owner");
    return res.status(200).json({ data: playlist });
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const addSong = async (req, res) => {
  try {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    // console.log(playlistId,songId);

    // if playlist is valid
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(404).json({ err: "Playlist does not exist" });
    }

    // console.log(playlist);

    // if current user is owner or collaborator than only he/she can add song to playlist
    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ err: "Not Allowed" });
    }

    // if song is valid
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(404).json({ err: "Song does not exist" });
    }

    // console.log(song);

    // Check if the song already exists in the playlist
    if (playlist.songs.includes(songId)) {
      return res.status(200).json(playlist);
    }

    // add song to playlist
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

module.exports = {
  create,
  getPlaylist,
  getArtistPlaylist,
  addSong,
  getPlaylistByMe,
};
