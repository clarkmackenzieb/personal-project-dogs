angular.module('personalProjApp').controller('mainCtrl', function ($scope, mainSrvc, user){

    $scope.user = user.data && user.data.err ? user.data.err : user;
    
    
  

        
})