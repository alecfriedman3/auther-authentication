'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: '/browser/app/login/login.html',
    controller: function (LoginFactory, $scope, $state, $log){
      $scope.login = function (email, password){
        LoginFactory.login(email, password)
        .then(function (){
          $state.go('stories')
        })
        .catch($log.error)
      }
    }
  });
});
