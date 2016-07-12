app.factory('LoginFactory', function ($http){
  var user = {}

  return {
    login: function (email, pswd){
      return $http.post('/login', {email: email, password: pswd})
    },
    signup: function (email, pswd){
      return $http.post('/signup', {email: email, password: pswd})
    },
    logout: function (){
      return $http.put('/logout')
    }
  }

})
