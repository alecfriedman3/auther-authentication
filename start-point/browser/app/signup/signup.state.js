'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: '/browser/app/signup/signup.html',
    controller: function (LoginFactory, $scope, $rootScope, $state, $log){
      $scope.signup = function (email, password){
        LoginFactory.signup(email, password)
        .then(function (user){
          $rootScope.user = user;
          $state.go('stories')
        })
        .catch($log.error)
      }
    }
  });
});
