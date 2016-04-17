angular.module("hackru").controller('loginController', ['$scope', '$http', 'UserService', '$state', function($scope, $http, UserService, $state) {
  $scope.initLogin = function() {
    $scope.email = "";
    $scope.password = "";
  };

  $scope.login = function() {
    console.log($scope.email, $scope.password);
    return UserService.login($scope.email, $scope.password).then(function(response) {
      if (response.data._id) {
        $scope.email = $scope.password = "";
        $("#loginModal").closeModal();
        Materialize.toast("Weclome, " + response.data.username + "!", 4000, "green-text");
        $state.go('locate');
      } else {
        $scope.credentials = {};
        return Materialize.toast("Invalid email and/or password. Please try again.", 4000, "red-text");
      }
    });
  };

}]);
