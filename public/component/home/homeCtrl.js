angular.module('personalProjApp').controller('homeCtrl', function ($scope, mainSrvc){
    
    $scope.getADogPicture = function(){
        return mainSrvc.getADogPic().then(function(res){
            $scope.dogpic = res.data.message;
        });
    
    }

      

    })