var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
var session = require('express-session');
var jwt =require('jsonwebtoken');
var secret = "jatinkaushal";
module.exports = function(app, passport) {

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'keyboard cat', resave:false, saveUninitialized:true, cookie: { secure: false}}));

passport.serializeUser(function(user, done){
 token = jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
  done(null,user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

  passport.use(new FacebookStrategy({
    clientID:'463095227366405',
    clientSecret:'d24a879ed9d1bafc7ac6be1a402f24ba',
    callbackURL:"https://video-app123.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName','photos','email']
  },
  function(accessToken, refreshToken, profile, done){
User.findOne({email:profile._json.email}).select('username password email').exec(function(err,user){
  if(err) done(err);
  if(user && user!=null) {
    done(null,user);
  }
  else{
    done(err);
  }
});

  }
));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror'}), function(req,res){
  res.redirect('/facebook/' + token);
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));
return passport;
}
