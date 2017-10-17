angular.module('personalProjApp').controller('uploadCtrl', function ($scope, user, mainSrvc){
    
    $scope.user = user.data && user.data.err ? user.data.err : user;

    $scope.submit = function(file, dogname, dogbreed, dogage, dogcity, dogstate) {
        $scope.uploadcheck= true; 
        $scope.thedate = new Date();
        mainSrvc.uploadImage(file, dogname, dogbreed, dogage, dogcity, dogstate, $scope.thedate, $scope.user.authid)
      }
        
    })