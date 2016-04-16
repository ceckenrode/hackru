angular.module("hackru").controller('registrationController', ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
  $scope.user = {};
  console.log('got here');
  $scope.register = function() {
    console.log($scope.user);
    $http.post('/register', $scope.user).then(function successCallback(response) {
      Materialize.toast('You have successfully registered', 4000, 'green-text');
    }, function errorCallback(response) {
      $scope.user = {};
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });
  };
}]);
