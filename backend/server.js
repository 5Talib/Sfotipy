require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRoute = require("./routes/auth");
const songRoute = require("./routes/songs");
const playlistRoute = require("./routes/playlist");
const passport = require("passport");
const cors = require("cors");
require("./middleware/passport");

const port = 5001;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/song", songRoute);
app.use("/api/v1/playlist", playlistRoute);
  

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
});
