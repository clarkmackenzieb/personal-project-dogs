angular.module('personalProjApp').controller('mainCtrl', function ($scope, mainSrvc){

    $scope.submit = function(file, dogname, dogbreed, dogage, dogcity, dogstate) {
        mainSrvc.uploadImage(file, dogname, dogbreed, dogage, dogcity, dogstate)
      }
    
    $scope.dogs = mainSrvc.getDogs();  

})