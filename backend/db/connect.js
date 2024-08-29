const mongoose = require("mongoose");
const { exists } = require("../models/User");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected!");
  } catch (error) {
    console.log("not connected");
    // exit(0);
  }
};

module.exports = connectDB;
