angular.module('hackru').controller('locateController', ['$scope', '$http', '$state', '$stateParams', '$geolocation', 'UserService',
  function($scope, $http, $state, $stateParams, $geolocation, UserService) {
    $scope.init = function() {
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function successCallback(position) {
          var myPosition = [position.coords.latitude, position.coords.longitude];
          console.log(myPosition);
          $scope.getLocation(myPosition);
        },
        function errorCallback() {
          $scope.error = true;
        });
    };

    $scope.findOrCreateRoom = function(location) {
      $http({
        method: 'GET',
        url: '/api/findorcreateroom?location=' + location
      }).then(function successCallback(response) {
        Materialize.toast('Success!', 4000, 'green-text');
        console.log(response.data._id);
        var roomId = response.data._id;
        $state.go('chat', {roomId: roomId});
      }, function errorCallback() {
        Materialize.toast('Something went wrong', 4000, 'red-text');
      });
    };

    $scope.getLocation = function(position) {
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=en&latlng=' + position[0] + ',' + position[1]
      }).then(function successCallback(response) {
        console.log(response.data.results);
        var location = response.data.results[1].formatted_address.replace(/\s/g, "_");
        UserService.updateLocation(location);
        $scope.findOrCreateRoom(location);
      }, function errorCallback() {
        Materialize.toast('Something went wrong', 4000, 'red-text');
      });
    };

  }
]);
