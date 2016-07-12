'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/browser/app/signup/signup.html',
    controller: function (LoginFactory, $scope, $state, $log){
      $scope.signup = function (email, password){
        LoginFactory.signup(email, password)
        .then(function (){
          $state.go('stories')
        })
        .catch($log.error)
      }
    }
  });
});
