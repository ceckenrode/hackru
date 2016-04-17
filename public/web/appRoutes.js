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
    .state('chat',{
    url: '/chat',
    templateUrl: 'views/chat/chat.html',
    controller: 'chatController',
    authenticate: true
    });

  $locationProvider.html5Mode(true);
});
