angular.module('userServices', [])

.factory('User',function($http){
  userFactory={};
  userFactory.create = function(regData){
    return $http.post('/api/users',regData);
  },
  userFactory.insertData = function(addData){
  return $http.post('/api/addusers',addData);
}
  userFactory.insertvid = function(addviid){
    return $http.post('/api/addvidtype',addviid);
  }
  return userFactory;
})
.factory('myService', function() {
 var savedData = {}
 function set(data) {
   sessionStorage.setItem('savedData', data);
 }
 function get() {
  return sessionStorage.getItem('savedData');
}

 return {
  set: set,
  get: get
 }
})
.service('uploadFile', function($http){
  this.upload = function(uploaddata){
console.log(uploaddata.filee);
    var fd = new FormData();
    fd.append('myfile', uploaddata.filee);
    return $http.post('/upload',fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type':undefined}
    });
  };
});
