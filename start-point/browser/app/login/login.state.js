'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/browser/app/login/login.html',
    controller: function (LoginFactory, $scope, $rootScope, $state, $log){
      $scope.login = function (email, password){
        LoginFactory.login(email, password)
        .then(function (user){
          $rootScope.user = user;
          $state.go('stories')
        })
        .catch($log.error)
      }
    }
  });
});
