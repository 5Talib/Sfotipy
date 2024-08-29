const User = require("../models/User");
const Song = require("../models/Song");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, username } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ error: "A user already exists with this email" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newUserData = {
    //   email,
    //   password: hashedPassword,
    //   firstName,
    //   lastName,
    //   username,
    // };
    // const newUser = await User.create(newUserData);
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      username,
    });
    // console.log(newUserData);

    const token = await newUser.generateToken();

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }
    //  console.log(password,user.password);
    // console.log(user);
    const isPasswordValid = await user.comparePassword(password);
    // console.log(isPasswordValid);
    // const isPasswordValid = await bcrypt.compare(password,user.password);

    if (isPasswordValid) {
      const token = await user.generateToken();
      const userToReturn = { ...user.toJSON(), token };
      delete userToReturn.password;
      return res.status(200).json(userToReturn);
    } else {
      return res.status(401).json({ err: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const users = async (req, res) => {
  try {
    const users = await User.find();
    const usersWithSongs = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const songs = await Song.find({ artist: user._id }); // Find songs associated with the user

      if (songs.length > 0) {
        usersWithSongs.push(user); // Add user to the list if they have associated songs
      }
    }
    return res.status(200).json(usersWithSongs);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { register, login, users };
