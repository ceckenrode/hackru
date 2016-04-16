angular.module("hackru").controller('HomeController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.getLocation = function(){
    window.navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
        console.log(res.data);
      });
    })
  };

}]);


