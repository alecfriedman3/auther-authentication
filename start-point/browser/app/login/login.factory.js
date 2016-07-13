app.factory('LoginFactory', function ($http,$rootScope){
  var user = {}

  return {
    login: function (email, pswd){
      return $http.post('/login', {email: email, password: pswd})
      .then(function (response) {
        user = response.data
        return user;
      })

    },
    signup: function (email, pswd){
      return $http.post('/signup', {email: email, password: pswd})
      .then(function (response) {
        user = response.data
        return user;
    })
    },
    logout: function (){
      return $http.put('/logout')
      .then(function() {
        $rootScope.user = null;
      })
    }
  }

})
