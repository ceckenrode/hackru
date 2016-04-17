angular.module('hackru')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]);