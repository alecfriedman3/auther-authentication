var router = require('express').Router();
var chalk = require('chalk')
var session = require('express-session');
var User = require('../api/users/user.model.js')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var chalk = require('chalk')
var createOrRetrieve = require('../api/users/createOrRetrieve').createOrRetrieve;


router.use(session({

  secret: 'YZ-CiCsSbIiA25sK-arXI_Om'

}));

router.get('/auth/me', function(req, res, next) {

  User.findOne({
      where: {
        id: req.session.userId
      }
    })
    .then(function(user) {
      console.log('requested auth/me')
      res.send(user)
    })
    .catch(next)
})


router.use(passport.initialize());
router.use(passport.session());


router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/stories',
    failureRedirect: '/login'
  })
);


passport.use(
  new GoogleStrategy({
      clientID: '770864779381-q35su81camndlu4u9fg968f35qhk59ub.apps.googleusercontent.com',
      clientSecret: 'YZ-CiCsSbIiA25sK-arXI_Om',
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    function(token, refreshToken, profile, done) {
      // console.log(chalk.green('profile'), profile)
      createOrRetrieve({ id: profile.id, email: profile.emails[0].value, name: profile.name.givenName })
        .then(function(user) {
          console.log(chalk.red('USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'), user)
          done(null, user)
        })
        .catch(function(err) {
          done(err);
        });
    })
)

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  User.findById(user.id)
    .then(function(user) {
      done(null, user)
    }).catch(function(err) {
      done(err)
    });
});


router.use('/api', function(req, res, next) {

  if (!req.session.counter) req.session.counter = 0;
  console.log(chalk.blue('counter: ', ++req.session.counter, ' sesion: \n'), req.session, chalk.blue('\n /session'));
  next();

});

router.post('/login', function(req, res, next) {

  User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    .then(function(user) {
      console.log('found the user', req.session, req.body, chalk.blue('user \n'), user)
      req.session.userId = user.id;
      res.send(user)
    })
    .catch(next)

})

router.post('/signup', function(req, res, next) {

  User.create(req.body)
    .then(function(user) {
      req.session.userId = user.id
      console.log(chalk.green('user created'))
      res.send(user)
    })
    .catch(next)
})

router.put('/logout', function(req, res, next) {

  req.session.userId = null;
  res.send(200)

})
module.exports = router
