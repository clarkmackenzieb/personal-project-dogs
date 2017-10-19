angular.module('personalProjApp').controller('mainCtrl', function ($scope, mainSrvc, user){

    $scope.user = user.data && user.data.err ? user.data.err : user;
        
    $scope.getADogPicture = function(){
        return mainSrvc.getADogPic().then(function(res){
            $scope.dogpic = res.data.message;
        });
    
    }

//     $(document).ready(function() {
//         // run test on initial page load
//         $scope.checkSize();
    
//         // run test on resize of the window
//         $(window).resize($scope.checkSize);
//     });

    
     
//     //Function to the css rule
//     $scope.checkSize = () => {
//         if ($(".small-circle").css("overflow") == "scroll" ){
            
//                 let sidebarBox = document.querySelector('#box'),
//     sidebarBtn = document.querySelector('#btn'),
//     pageWrapper = document.querySelector('#page-wrapper');

// sidebarBtn.addEventListener('click', function (event) {
//         sidebarBtn.classList.toggle('active');
//         sidebarBox.classList.toggle('active');
// });

// pageWrapper.addEventListener('click', function (event) {

//         if (sidebarBox.classList.contains('active')) {
//                 sidebarBtn.classList.remove('active');
//                 sidebarBox.classList.remove('active');
//         }
// });

// window.addEventListener('keydown', function (event) {

//         if (sidebarBox.classList.contains('active') && event.keyCode === 27) {
//                 sidebarBtn.classList.remove('active');
//                 sidebarBox.classList.remove('active');
//         }
// });
//         }
//     }    



        
})