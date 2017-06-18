angular.module('myApp',['appRoutes','userController','userServices','mainCtrl','ngYoutubeEmbed','authService','angular-toArrayFilter','testcontroller'])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

// console.log('testing main app');
