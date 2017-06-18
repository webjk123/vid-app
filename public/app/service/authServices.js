angular.module('authService',[])
.factory('Auth',function($http,AuthToken){
  var authFactory={};
  authFactory.login = function(loginData){
    return $http.post('/api/authenticate',loginData).then(function(data){
      AuthToken.setToken(data.data.token);
      return data;
    });
    };

authFactory.getallusers=function(){
  return $http.get('/api/allvid').then(function(data){
    //  console.log(data);
     return data;
  });
};
authFactory.getallvidetyp=function(){
  return $http.get('/api/allvidetyp').then(function(data){
     console.log("u see h" + data);
     return data;
  });
};

authFactory.getallvide=function(){
  return $http.get('/api/allvide').then(function(data){
    //  console.log(data);
     return data;
  });
};

authFactory.isLogin = function(){
  if(AuthToken.getToken()){
    return true;
  }
  else{
    return false;
  }
};
authFactory.facebook = function(token){
  AuthToken.setToken(token);
};

authFactory.getUser = function(){
  if(AuthToken.getToken()){
    return $http.post('/api/me');
  }
  else {
    $q.reject({message:'No Token'});
  }

};
authFactory.logout = function(){
  AuthToken.setToken();
};
  return authFactory;
})

.factory('AuthToken',function($window){
  authFactoryToken={};
  authFactoryToken.setToken = function(token){
   if(token){
    $window.localStorage.setItem('token',token);
}
else{
$window.localStorage.removeItem('token');
  }
};
  authFactoryToken.getToken = function(){
    return $window.localStorage.getItem('token');
  };
return authFactoryToken;
})
.factory('AuthInterceptor',function(AuthToken){
  var authInterceptorFactory={};
  authInterceptorFactory.request = function(config){
    var token = AuthToken.getToken();
    if(token)
      config.headers['x-access-token'] =token;
    return config;
  };
return authInterceptorFactory;
});
