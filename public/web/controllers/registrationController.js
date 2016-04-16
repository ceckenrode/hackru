angular.module("hackru").controller('registrationController', ['$scope','$http', 'UserService', function($scope, $http, UserService) {
  $scope.user = {};
  console.log('got here');
  $scope.register = function (){
    $http.post('/register', $scope.user).then(function successCallback(response){
      alert('registration success');
    }, function errorCallback(){
      alert('you fucked up');
    });
  };
}]);
