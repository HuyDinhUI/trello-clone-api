import { User } from '../../modules/users.js'
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import 'dotenv/config'

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5024/v1/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({googleId: profile.id})
         if (!user){
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                username: profile.displayName,
                password: null
              });
         }
         done(null, user);
    } catch(err){
        done(err,null)
    }
  
}));