angular.module('hackru').controller('locateController', ['$scope', '$http','$state', '$stateParams', '$geolocation',
  function($scope, $http, $state, $stateParams, $geolocation) {
    $scope.init = function() {
      $geolocation.getCurrentPosition({
        timeout: 60000
      }).then(function successCallback(position) {
          var myPosition = [position.coords.latitude, position.coords.longitude];
          var query = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=en&latlng=' + position[0] + ',' + position[1];
          console.log(myPosition);
          $scope.getLocation(query);
          $state.go('chat');
        },
        function errorCallback() {
          $scope.error = true;
        });
    };



    $scope.getLocation = function(query) {
      $http({
        method: 'GET',
        url: query
      }).then(function successCallback(response) {
        console.log(response.data.results[1].formatted_address);
      }, function errorCallback() {
        Materialize.toast('Something went wrong', 4000, 'red-text');
      });
    };

  }
]);
