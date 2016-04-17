angular.module('hackru').controller('chatController', ['$scope', '$http', 'Socket', '$stateParams', '$geolocation', function($scope, $http, Socket, $stateParams, $geolocation) {
  Socket.connect();
  $geolocation.getCurrentPosition({
    timeout: 60000
  }).then(function(position) {
    var myPosition = [position.coords.latitude, position.coords.longitude];
    console.log(myPosition);
    $scope.getLocation(myPosition);
  });
  $scope.users = [];

  // Simple GET request example:
  $scope.getLocation = function(position) {
    $http({
      method: 'GET',
      url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=en&latlng=' +position[0]+','+ position[1]
    }).then(function successCallback(response) {
      console.log(response.data.results[1].formatted_address);
    }, function errorCallback() {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });
  };

  $scope.messages = [];


  $scope.currentMsg = '';

  $scope.sendMessage = function() {
    if ($scope.currentMsg !== null && $scope.currentMsg !== '' && $scope.currentMsg.length <= 140) {
      Socket.emit('message', {
        message: $scope.currentMsg
      });
      Materialize.toast('Message Sent', 4000, 'green-text');
      $scope.currentMsg = '';
    } else {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    }
    $scope.currentMsg = '';

  };


  Socket.emit('request-users', {});



  Socket.on('users', function(data) {
    $scope.users = data.users;
  });



  Socket.on('message', function(data) {

    $scope.messages.push(data);
  });

  Socket.on('add-user', function(data) {
    $scope.users.push(data.username);
    $scope.messages.push({
      username: data.username,
      message: 'has arrived'
    });
  });

  Socket.on('remove-user', function(data) {
    $scope.users.splice($scope.users.indexOf(data.username), 1);
    $scope.messages.push({
      username: data.username,
      message: 'has left the building'
    });
  });


  $scope.$on('$locationChangeStart', function(event) {
    Socket.disconnect(true);
  });
}]);
