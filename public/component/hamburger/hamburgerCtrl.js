angular.module('personalProjApp').controller('hamburgerCtrl',function($scope, mainSrvc){

    $(document).ready(function() {
                // run test on initial page load
                $scope.checkSize();
            
                // run test on resize of the window
                $(window).resize($scope.checkSize);
            });
        
       
            //Function to the css rule
            $scope.checkSize = () => {
                if ($(".nav-bar").css("display") == "none" ){
                    
        //                 let sidebarBox = document.querySelector('#box'),
        //     sidebarBtn = document.querySelector('#btn'),
        //     pageWrapper = document.querySelector('#page-wrapper');
        
         document.querySelector('#btn').addEventListener('click', function (event) {
                document.querySelector('#btn').classList.toggle('active');
                document.querySelector('#box').classList.toggle('active');
        });
        
        document.querySelector('#page-wrapper').addEventListener('click', function (event) {
                if (document.querySelector('#box').classList.contains('active')) {
                        document.querySelector('#btn').classList.remove('inactive');
                        document.querySelector('#box').classList.remove('inactive');
                }
        });
        
        window.addEventListener('keydown', function (event) {
                if (document.querySelector('#box').classList.contains('active') && event.keyCode === 27) {
                         document.querySelector('#btn').classList.remove('active');
                        document.querySelector('#box').classList.remove('active');
                }
        });
                }
            }    

})