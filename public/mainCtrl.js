angular.module('personalProjApp').controller('mainCtrl', function ($scope, mainSrvc, user){

        

    // if user.data and user.data.err then user = err
    // else user = user object from database
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

    $scope.submit = function(file, dogname, dogbreed, dogage, dogcity, dogstate) {
        alert("Your dog had been uploaded! Check out the Dog Vote page to see where they rank.")
        $scope.thedate = new Date();
        mainSrvc.uploadImage(file, dogname, dogbreed, dogage, dogcity, dogstate, $scope.thedate, $scope.user.authid)
      }
    
    mainSrvc.getDogs().then(res => $scope.dogs = res.data)
    
    // .map(c=>Object.assign(c, {isClicked: false})));  

    $scope.favoriteDog = function(dogid){

        mainSrvc.favoriteDog($scope.user.authid, dogid); 
    }

    $scope.sortProp;
    
    $scope.sortDirection;
    
    $scope.upvoteDog = (dogid) => {
        
        mainSrvc.upvoteDog(dogid).then(dogs => {
            $scope.dogs = dogs;
            
            // $scope.dogs.find(dog => { return dog.dog_id == dogid}).isClicked = true;
        })
    }

    
   
    


        
})