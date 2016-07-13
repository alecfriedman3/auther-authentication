'use strict'

app.controller('getMe', function($rootScope, $http, $log) {
      $http.get('/auth/me')
      .then(function(user) {
        $rootScope.user = user.data;
      }).catch($log.error)

    });