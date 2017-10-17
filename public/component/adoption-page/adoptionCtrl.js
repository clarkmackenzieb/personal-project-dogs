angular.module('personalProjApp').controller('adoptionCtrl', function ($scope, user, mainSrvc){
    
    $scope.user = user.data && user.data.err ? user.data.err : user;
    

    $scope.getAdopt = function(location, size, breed, age){
        mainSrvc.getAdopt(location, size, breed, age).then(res => {
            $scope.adoptdogs = res.data.petfinder.pets.pet
            console.log($scope.adoptdogs)
        })
        //$scope.adoptdogs = res.data.petfinder.pets.pet
        // dog.media.photo[0].$t
        
    }

    $scope.getShelter = function(shelterlocation){
        mainSrvc.getShelter(shelterlocation).then(res => $scope.shelters = res.data.petfinder.shelters.shelter, console.log($scope.shelters))
    }

    
        
    })