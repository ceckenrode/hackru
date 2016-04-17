angular.module('hackru').controller('chatController', ['$scope', 'Socket', '$stateParams', function($scope, Socket, $cookies, $rootScope, $stateParams){
  Socket.connect();

  // $scope.room = $stateParams.room;



  // Socket.emit('join-room', {room:$stateParams.room}); 
  // console.log($stateParams.room);

  $scope.users = [];

  $scope.messages = [];

  
$scope.currentMsg = '';

$scope.sendMessage = function(){
      if($scope.currentMsg !== null && $scope.currentMsg !=='' && $scope.currentMsg.length <= 140) {
        Socket.emit('message', {message:$scope.currentMsg});
        Materialize.toast('Message Sent', 4000, 'green-text');
        $scope.currentMsg = '';
      } else {
        Materialize.toast('Something went wrong', 4000, 'red-text');
      }
      $scope.currentMsg = '';

};


  // if($cookies.get('token') && $cookies.get('currentUser')){
  //   console.log($cookies.get('currentUser'));
  //   Socket.emit('add-user', {username: $rootScope.currentUser});
  // } else {
  //   bootbox.alert('You need to sign in to chat');
  // }

  // if($cookies.get('token')){
  //   $scope.sendMessage = function(msg) {
  //     if(msg != null && msg != '' && msg.length <= 140) {
  //       Socket.emit('message', {message:msg})
  //     } else {
  //       bootbox.alert("You cannot leave an empty message and it must be less than 140 characters");
  //     }
  //     $scope.msg = '';
  //   }
  // }


  Socket.emit('request-users', {});



  Socket.on('users', function(data){
    $scope.users = data.users;
  });



  Socket.on('message', function(data) {
    
    $scope.messages.push(data);
  });

  Socket.on('add-user', function(data) {
    $scope.users.push(data.username);
    $scope.messages.push({username: data.username, message: 'has arrived'});
  });

  Socket.on('remove-user', function(data){
    $scope.users.splice($scope.users.indexOf(data.username),1);
    $scope.messages.push({username: data.username, message: 'has left the building'});
  });


  $scope.$on('$locationChangeStart', function(event){
    Socket.disconnect(true);
  });
}]);