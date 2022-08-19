const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require("dotenv").config()
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(profile)
            return done(null, profile);
    }
));