angular.module('personalProjApp').controller('votingCtrl', function ($scope, user, mainSrvc){
    
    $scope.user = user.data && user.data.err ? user.data.err : user;

    mainSrvc.getDogs().then(res => $scope.dogs = res.data)

    $scope.favoriteDog = function(dogid){
        mainSrvc.favoriteDog($scope.user.authid, dogid);
        alert("Dog favorited!") 
            }
        
    $scope.sortProp;
            
    $scope.sortDirection;
            
    $scope.upvoteDog = (dogid) => {
        mainSrvc.upvoteDog(dogid).then(dogs => {
            $scope.dogs = dogs;
                 })}
            
            
            
            
});