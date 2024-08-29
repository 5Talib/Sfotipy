const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  // secretOrKey: "secret"
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log(jwt_payload);
    try {
      const user = await User.findOne({ _id: jwt_payload.userId }); // my code not working becoz jwt_payload.sub was there
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
