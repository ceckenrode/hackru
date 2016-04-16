angular.module("hackru").controller('NavbarController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.showLogin = true;

  $scope.$watch(function() {
    return UserService.isLoggedIn();
  }, function() {
    if (UserService.isLoggedIn()) {
      $scope.showLogin = false;
    } else {
      $scope.showLogin = true;
    }
  });
  $scope.openLoginModal = function() {
    $("#loginModal").openModal();
  };
  $scope.openRegisterModal = function() {
    $("#registrationModal").openModal();
  };
  $scope.logout = function() {
    return UserService.logout();
  };
}]);
