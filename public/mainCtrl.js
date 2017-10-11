angular.module('personalProjApp').controller('mainCtrl', function ($scope, mainSrvc){

    $scope.submit = function(file, dogname, dogbreed, dogage, dogcity, dogstate) {
        mainSrvc.uploadImage(file, dogname, dogbreed, dogage, dogcity, dogstate)
      }
    
    mainSrvc.getDogs().then(res => $scope.dogs = res.data);  

    $scope.favorite = function(user, dog){
        mainSrvc.favoriteDog(user, dog); 
    }

    $scope.sortProp;
    
    $scope.sortDirection;

        
})