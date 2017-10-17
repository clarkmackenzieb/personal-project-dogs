angular.module('personalProjApp').controller('homeCtrl', function ($scope, mainSrvc, user){

    $scope.user = user.data && user.data.err ? user.data.err : user;
    
    $scope.getADogPicture = function(){
        return mainSrvc.getADogPic().then(function(res){
            $scope.dogpic = res.data.message;
        });
    
    }

      

    })