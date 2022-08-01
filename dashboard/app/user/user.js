'use strict';

angular.module('cloodApp.user', [])
.config(['$stateProvider', function($stateProvider) {
  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'user/login.html',
    controller: 'UserCtrl'
  };
  $stateProvider.state(loginState);
}])
.factory('User', ['$resource', 'ENV_CONST', function($resource, ENV_CONST) {
  return $resource(ENV_CONST.base_api_url + "/user" + '/:id', null, {
    'update': { method: 'PUT'}
  });
}])
.controller('UserCtrl', ['$scope', '$http', 'User', 'ENV_CONST', function($scope, $http, User, ENV_CONST) {
  $scope.menu.active = $scope.menu.items[0]; // ui active menu tag
  $scope.newUser = null; // new user to be saved

  if (typeof ENV_CONST.base_api_url == 'undefined' || ENV_CONST.base_api_url == '') {
    $scope.pop("warn", null, "The root API to the serverless functions is not set. You can set this up in env.js");
  }

  // log in registered user if the credentials are correct and retrieve token
  $scope.login = function(user) {
    console.log(user);
    $http.post(ENV_CONST.base_api_url + "/login", user).then(function(res) {
      console.log(res.data);
    });
  };

  // Creates new user
  $scope.addNewUser = function() {
    var item = angular.copy($scope.newUser);
    var user = new Project($scope.newUser);
    user.$save({}, function(res){
      console.log(res);
      item.id__ = res._id;
      $scope.pop("success", null, "New user created.");
    }, function(err){
      console.log(err);
      $scope.pop("error", null, "Error creating new user.");
    });
  };

}]);
