var vdeo = angular.module('mainCtrl',['authService','userServices','ngYoutubeEmbed','fileModelDirective','ngStorage']);
vdeo.filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
vdeo.controller('mainCtrl',function(User,$http,$location,Auth,$routeParams,$rootScope,$window,uploadFile,$scope,$route,myService,$localStorage,$sessionStorage){
$scope.videoURL = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';


  var app=this;
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
  app.reloadRoutee = function() {
  $window.location.reload(true);
  };
  app.reloadRoute = function(d) {
//   console.log("Thanks" + d)
  $window.location.reload();
$localStorage.lurl = d.vlink;
};
var firstTime = localStorage.getItem("first_time");
if(!firstTime) {
    // first time loaded!
  $localStorage.lurl = $routeParams.url;
}
$scope.desiredLocation = $localStorage.lurl;
app.photoChanged = function(files){
if(files.length > 0 && files[0].name.match(/\.(png|jpg|jpeg)$/)){

    app.uploading = true;
    var file = files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function(e){

        $scope.thumbnail = {};
        $scope.thumbnail.dataUrl = e.target.result;
console.log($scope.thumbnail.dataUrl);
        app.uploading = false;
        app.message = false;
      };
  }else{
    app.thumbnail = {};
    app.message = false;
  }
};

app.Submit = function(uploaddata){
app.uploading = true;
uploadFile.upload(app.uploaddata).then(function(data){
    if(data.data.success){
      app.uploading = false;
      app.alert = 'alert alert-success';
      app.message = data.data.message;
      app.file = {};
    }
   else {
     app.uploading = false;
     app.alert = 'alert alert-danger';
     app.message = data.data.message;
     app.file = {};
   }
});
};
$rootScope.$on('$routeChangeStart',function(){

  Auth.getallvide().then(function(data){
   app.dt1 = data.data;
  console.log(data);
  });
  if(Auth.isLogin()){
   app.isloggedin=true;
  console.log('Ssuccess: User Logged in');
   Auth.getUser().then(function(data){
    //  console.log(data);
    app.username = data.data.username;
    //  app.dt=data.data;
    app.email = data.data.email;
    Auth.getallusers().then(function(data){
  //  console.log(data.data);
    app.dt = data.data;
    });

Auth.getallvidetyp().then(function(data){
 app.dt2 = data.data;
console.log("u see" + data);
});
   });

   }
  else {
    app.isloggedin=false;
 app.username='';
    console.log('Failure: User not Logged in');

  }
   if($location.hash() == '_=_') $location.hash(null);
});
this.facebook = function(){
  //  console.log($window.location.host);
  //   console.log($window.location.protocol);
  $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';

};



  this.loginUser = function(loginData){

     app.loading=true;
     app.errorMsg=false;
  Auth.login(app.loginData).then(function(dataa){

     if(dataa.data.success){
       app.loading=false;
       app.successMsg=dataa.data.message;
      $location.path('/');
       app.loginData='';
       app.successMsg=false
     }
     else {
        app.loading=false;
       app.errorMsg=dataa.data.message;
     }

    });
  };
this.logout = function(){
  Auth.logout();
  $location.path('/logout');
  $location.path('/');
  $window.location.reload();
};


});
