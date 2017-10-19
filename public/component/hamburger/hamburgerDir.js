angular.module('personalProjApp').directive('hamburgerDir', function(){

    return {
        restrict: 'E',
        templateUrl: "./component/hamburger/hamburgerTmpl.html",
        //link, scope, controller
        controller: "hamburgerCtrl"
            
          

        }
    });