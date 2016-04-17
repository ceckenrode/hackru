angular.module('hackru').controller('chatlistController', ['$scope', '$http', 'Socket', '$stateParams', '$geolocation', function($scope, $http, Socket, $stateParams, $geolocation) {
  Socket.connect();

  $scope.init = function(){
    $http({
      method: 'GET',
      url: '/api/getSubRooms/' + $stateParams.roomId
    }).then(function successCallback(response) {
      console.log(response.data);
    }, function errorCallback() {
      Materialize.toast('Something went wrong', 4000, 'red-text');
    });

    $scope.newRoom = "";
  };

  $scope.addRoom = function(){
    if ($scope.newRoom!== ""){
      Materialize.toast('New Room', 4000, 'green-text');
      $scope.newRoom = "";
    }
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
