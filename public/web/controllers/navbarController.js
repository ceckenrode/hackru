angular.module("hackru").controller('NavbarController', ['$scope', 'UserService', function($scope, UserService) {
  // $scope.showLogin = false;
  // $scope.$watch(function() {
  //   return UserService.isLoggedIn();
  // }, function() {
  //   if (UserService.isLoggedIn()) {
  //     $scope.showLogin = false;
  //   } else {
  //     $scope.showLogin = true;
  //   }
  // });
  $scope.openLoginModal = function() {
    $("#loginModal").openModal({ dismissible: false });
  };
  $scope.openRegisterModal = function() {
    $("#registrationModal").openModal({ dismissible: false });
  };
  $scope.logout = function() {
    return UserService.logout();
  };
}]);
