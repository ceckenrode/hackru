angular.module("hackru").config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  //For any unmatched routes, redirect to /home
  $urlRouterProvider.otherwise('/');

  //Setting up states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      authenticate: false
    })
    .state('chatlist', {
      url: '/chat/:roomId',
      templateUrl: 'views/chatlist/chatlist.html',
      controller: 'chatlistController',
      authenticate: true
    })
    .state('chat', {
      url: '/chat/:roomId/:subRoomId',
      templateUrl: 'views/chatlist/chatlist.html',
      controller: 'chatController',
      authenticate: true
    })
    .state('locate', {
      url: '/locate',
      templateUrl: 'views/locate/locate.html',
      controller: 'locateController',
      authenticate: true
    });

  $locationProvider.html5Mode(true);
});
