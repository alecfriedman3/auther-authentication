var router = require('express').Router();
var chalk = require('chalk')
var session = require('express-session');
var User = require('../api/users/user.model.js')



router.use(session({

  secret: 'YZ-CiCsSbIiA25sK-arXI_Om'

}));

router.get('/auth/me', function(req, res, next) {
  User.findOne({
    where: {
      id: req.session.userId
    }
  })
  .then(function (user) {
    console.log('requested auth/me')
    res.send(user)
  })
  .catch(next)
})

router.use('/api', function (req, res, next){

  if (!req.session.counter) req.session.counter = 0;
  console.log(chalk.blue('counter: ', ++req.session.counter,' sesion: \n'), req.session, chalk.blue('\n /session'));
  next();

});

router.post('/login', function (req, res, next){

  User.findOne({
    where:{
      email: req.body.email,
      password: req.body.password
    }
  })
  .then(function (user){
    console.log('found the user', req.session, req.body, chalk.blue('user \n'), user)
    req.session.userId = user.id;
    res.send(user)
  })
  .catch(next)

})

router.post('/signup', function(req,res,next){

  User.create(req.body)
  .then(function (user){
    req.session.userId = user.id
    console.log(chalk.green('user created'))
    res.send(user)
  })
  .catch(next)
})

router.put('/logout', function (req, res, next){

  req.session.userId = null;
  res.send(200)

})
module.exports = router
