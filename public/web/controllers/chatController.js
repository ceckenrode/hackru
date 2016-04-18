angular.module('hackru').controller('chatController', ['$scope', '$http', 'Socket', '$stateParams', '$geolocation', 'UserService', function($scope, $http, Socket, $stateParams, $geolocation, UserService) {
  Socket.connect();
  $scope.init = function() {
    $scope.user = UserService.currentUser();

    $scope.currentMsg = '';
    $scope.roomId = $stateParams.roomId;
    $http({
      method: 'GET',
      url: '/api/getSubRoom/' + $stateParams.subRoomId
    }).then(function successCallback(response) {
      console.log($stateParams.subRoomId);
      $scope.subRoom = response.data;
      console.log($scope.subRoom);
    }, function errorCallback() {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });
  };

  $scope.updateScroll = function() {
    var element = document.getElementById("chat-history");
    element.scrollTop = element.scrollHeight - 20;
  };



  $scope.messages = [];




  $scope.sendMessage = function() {
    if ($scope.currentMsg !== null && $scope.currentMsg !== '' && $scope.currentMsg.length <= 140) {
      var message = {
        user: $scope.user.username,
        message: $scope.currentMsg,
        room: $stateParams.subRoomId
      };
      Socket.emit('message', message);
      Materialize.toast('Message Sent', 4000, 'green-text');
      $scope.currentMsg = '';
    } else {
      Materialize.toast('Something went wrong', 4000, 'red-text');
      $scope.currentMsg = '';
    }
  };

  Socket.on('update', function(data) {
    console.log('message');
    $http({
      method: 'GET',
      url: '/api/getSubRoom/' + $stateParams.subRoomId
    }).then(function successCallback(response) {
      console.log($stateParams.subRoomId);
      $scope.subRoom = response.data;
      $scope.updateScroll();
    }, function errorCallback() {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });
  });



  Socket.on('message', function(data) {
    console.log('message');
    $http({
      method: 'GET',
      url: '/api/getSubRoom/' + $stateParams.subRoomId
    }).then(function successCallback(response) {
      console.log($stateParams.subRoomId);
      $scope.subRoom = response.data;
    }, function errorCallback() {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });
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
