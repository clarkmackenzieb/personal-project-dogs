angular.module('personalProjApp').service('mainSrvc', function($http){

    this.getADogPic = function(){
        var promise = $http({
            method: "GET",
            url: "https://dog.ceo/api/breeds/image/random",
        })
        return promise;
    }

    this.getUser = () => $http.get('/login');

});