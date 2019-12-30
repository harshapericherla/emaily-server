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
    proxy: true
    },(accessToken,refreshToken,profile,done) => {
        
        User.findOne({'googleId':profile.id}).then(existingUser => {
            if(existingUser){
                 done(null,existingUser);
            } 
            else
            {
                new User({googleId:profile.id})
                .save()
                .then( user => done(null,user));
            }
        })
    })
);
