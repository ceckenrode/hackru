angular.module('hackru').controller('chatController', ['$scope', '$http', 'Socket', '$stateParams', '$geolocation', function($scope, $http, Socket, $stateParams, $geolocation) {
  $scope.roomId = $stateParams.roomId;
  Socket.connect();

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
