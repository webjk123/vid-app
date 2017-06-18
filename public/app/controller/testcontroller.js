var vdeo = angular.module('testcontroller',[]);
vdeo.controller('testCtrl',function($route){
var app = this;
  app.reloadRoute = function() {
     $route.reload();
  }

});
