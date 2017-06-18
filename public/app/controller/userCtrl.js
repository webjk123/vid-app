angular.module('userController', ['userServices'])
.controller('regCtrl',function($http,$location,User) {
  var app=this;
  app.reloadRoute = function(d) {
  // $window.location.reload();
  console.log("Thanks" + d)
}
//Register User Starts
  this.regUser = function(regData){
     app.loading=true;
     app.errorMsg=false;
  User.create(app.regData).then(function(data){
 if(data.data.success){
       app.loading=false;
       app.successMsg=data.data.message;
       $location.path('/');
     }
     else {
        app.loading=false;
       app.errorMsg=data.data.message;
     }

    });
  };
// Register user ends

// Add Details Start
  this.addDetails = function(addData){
console.log(app.addData);
     app.loading=true;
     app.errorMsg=false;
  User.insertData(app.addData).then(function(data){

      if(data.data.success){
       app.loading=false;
       app.successMsg=data.data.message;
       $location.path('/');
     }
     else {
        app.loading=false;
       app.errorMsg=data.data.message;
     }

    });
  };
  //Add Details ends
  this.addVid = function(addviid){
     app.loading=true;
     app.errorMsg=false;
  User.insertvid(app.addviid).then(function(data){

      if(data.data.success){
       app.loading=false;
       app.successMsg=data.data.message;
       $location.path('/');
     }
     else {
        app.loading=false;
       app.errorMsg=data.data.message;
     }

    });
  };
})

.controller('facebookCtrl',function($routeParams,Auth,$location,$window){
  var app=this;
  if($window.location.pathname=='/facebookerror'){
    app.errorMsg="No facebook user present";
  }
else
  {
    Auth.facebook($routeParams.token);
    $location.path('/');
   }
});
