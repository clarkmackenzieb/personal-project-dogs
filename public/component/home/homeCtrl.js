angular.module('personalProjApp').controller('homeCtrl', function ($scope, mainSrvc, user){

    $scope.user = user.data && user.data.err ? user.data.err : user;
    
    
    


    })