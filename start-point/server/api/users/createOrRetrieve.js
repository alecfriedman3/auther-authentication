var User = require('./user.model.js');

function createOrRetrieve(profile) {
  return User.findAll({
    where: {
      googleId: profile.id,
      email: profile.email
    }
  }).then(function (users) {
    if (users.length === 0){
       return User.create({
        googleId: profile.id,
        email: profile.email,
        name: profile.name
      })
    } else {
      return users[0]
    }
  })
}



module.exports = {
  createOrRetrieve: createOrRetrieve 
}