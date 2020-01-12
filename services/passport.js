const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

/* This method gets called from the done function in the googleStrategy */
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

/* This function is used to deserialize the user from the browser cookie */
/* req -> cookie-session -> passport -> deserialize user -> req.user */
passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    /* Used proxy true becuase servers like heroku uses proxy to map request to the server, 
       therefore the browser inherently cannot trust a proxy and converts the https to htpp */
    proxy: true
    },
    async (accessToken,refreshToken,profile,done) => {        
        const existingUser = await User.findOne({'googleId':profile.id});
        if(existingUser){
               return done(null,existingUser);
        } 
        const user = await new User({googleId:profile.id}).save();
        done(null,user);
    }
));
